---
title: Queue worker and cron
description: Crontab entries for every tenancy:* scheduled command, what each one does and what breaks if it stops running.
---

# Queue worker and cron

Ecommerce SaaS needs a running queue worker plus several `tenancy:*`
scheduled commands. None of this is optional in production — skipping any of
it silently breaks a specific feature rather than throwing an error you'd
notice.

## Queue worker

Provisioning is queued, so **nothing gets provisioned without a worker** — a
store registered through the browser sits on "Preparing…" forever until a
worker picks the job up.

```bash
php artisan queue:work --queue=default --tries=1 --timeout=900
```

Run it under a process manager so it restarts on crash and after deploys. No
worker available (local dev, or a small single-server deploy)? Set
`TENANCY_PROVISION_SYNC=true` and provisioning runs inline on the signup
request instead (~1–2s).

### systemd unit

If the server has no Supervisor, systemd is enough. `/etc/systemd/system/saas-queue.service`:

```ini
[Unit]
Description=Ecommerce SaaS queue worker
After=network.target redis.service mysqld.service

[Service]
User=www-data
Group=www-data
Restart=always
RestartSec=5
WorkingDirectory=/var/www/ecommerce-saas
ExecStart=/usr/bin/php artisan queue:work --queue=default --tries=1 --timeout=900

[Install]
WantedBy=multi-user.target
```

```bash
systemctl daemon-reload
systemctl enable --now saas-queue
journalctl -u saas-queue -f      # watch a store provision
```

::: warning Restart the worker on every deploy
A worker holds the old code in memory. Add `systemctl restart saas-queue` to
your deploy script, next to the theme-asset publish step below.
:::

### Supervisor

Alternatively, use Supervisor as the process manager. `/etc/supervisor/conf.d/saas-queue.conf`:

```ini
[program:saas-queue]
process_name=%(program_name)s_%(process_num)02d
directory=/var/www/ecommerce-saas
command=/usr/bin/php artisan queue:work --queue=default --tries=1 --timeout=900
autostart=true
autorestart=true
numprocs=1
redirect_stderr=true
stdout_logfile=/var/log/supervisor/saas-queue.log
user=www-data
stopwaitsecs=920
```

```bash
supervisorctl reread
supervisorctl update
supervisorctl status saas-queue:*
```

`stopwaitsecs` must exceed the worker's `--timeout` (900 seconds), so use at least 920.
On deploy, reload with `supervisorctl restart saas-queue:*` alongside the theme-asset
publish step.

### Common setup for both

Run the worker as the **same user as PHP-FPM**. Provisioning creates the store's
directory under `storage/tenants/`, and if the worker runs as `root` those
directories end up unwritable by the web process.

One worker is plenty for provisioning (~1–2s per store). `--tries=1` matches the
package's own `provisioning.tries`: a store that fails has no schema and cannot
be resumed, so it must be reprovisioned rather than retried.

## Do not use stock schedule:run

Don't rely on Laravel's stock `schedule:run` for store work: Botble registers
its schedules at boot, so they would run **once against the central
database** instead of once per store — and settings-gated tasks would read
the wrong answer. Use the `tenancy:schedule` wrapper below instead.

## Crontab

```cron
*/5 *  * * * cd /path/to/app && php artisan tenancy:schedule --frequency=everyFiveMinutes
0   *  * * * cd /path/to/app && php artisan tenancy:schedule --frequency=hourly
0   2  * * * cd /path/to/app && php artisan tenancy:schedule --frequency=daily
0   3  * * * cd /path/to/app && php artisan tenancy:collect-usage
0   4  * * * cd /path/to/app && php artisan tenancy:billing-maintenance
*/10 * * * * cd /path/to/app && php artisan tenancy:verify-domains
*    *  * * * cd /path/to/app && php artisan tenancy:webhooks-deliver
0   8  * * * cd /path/to/app && php artisan tenancy:send-lifecycle-emails
0   9  * * * cd /path/to/app && php artisan tenancy:notify-pending-orders
```

::: danger tenancy:webhooks-deliver must run every minute
It is the **only** retry driver for outbound webhooks: the queued job makes
the first delivery attempt and nothing more, and every retry comes from this
sweep. **Without it, a webhook that fails once is never retried.** It takes a
cache lock, so overlapping runs simply exit, and it prunes `delivered` /
`exhausted` rows older than `TENANCY_WEBHOOKS_RETENTION_DAYS` (default 30;
`0` keeps them).
:::

## Queue configuration

The worker command above hardcodes `--queue=default` and `--timeout=900`. These
correspond to config variables:

| Variable | Default | Purpose |
|---|---|---|
| `TENANCY_PROVISION_QUEUE` | `default` | The queue the provisioning job listens on |
| `TENANCY_PROVISION_TIMEOUT` | `900` | Worker timeout in seconds; must not exceed Supervisor's `stopwaitsecs` |

If you run workers on different queues, set `TENANCY_PROVISION_QUEUE` to match
the queue your worker listens on. A worker listening on a different queue leaves
new stores in `pending` status forever with no error.

## Deploy step

```bash
php artisan tenancy:publish-theme-assets
```

::: warning Run this on every deploy
`public/themes/{slug}` is shared by every store, so no customer request is
ever allowed to write there — which means an unpublished theme renders an
unstyled shop and nothing self-heals. `tenancy:preflight` fails on any theme
the catalog offers whose assets are missing.
:::

## What each scheduled command does

| Command | Cadence | What breaks if it doesn't run |
|---|---|---|
| `tenancy:schedule --frequency=everyFiveMinutes` | every 5 min | Per-store scheduled tasks registered at that frequency never run for any store. |
| `tenancy:schedule --frequency=hourly` | hourly | Per-store hourly maintenance never runs. |
| `tenancy:schedule --frequency=daily` | daily | Per-store daily maintenance never runs. |
| `tenancy:collect-usage` | daily | Dashboard usage counters (`tenant_usage`) go stale. |
| `tenancy:billing-maintenance` | daily | Past-due stores are never suspended, cancelled stores are never purged past retention, and the daily MRR history point is never captured — the MRR chart cannot be back-filled. |
| `tenancy:verify-domains` | every 10 min | Pending custom domains never become verified — they stay unroutable and get no TLS certificate. |
| `tenancy:webhooks-deliver` | **every minute** | Failed webhook deliveries are never retried. See warning above. |
| `tenancy:send-lifecycle-emails` | daily | Trial-ending reminders and pre-purge retention warnings are never sent. |
| `tenancy:notify-pending-orders` | daily | Operators never get a digest of bank-transfer requests awaiting review — a paid transfer can sit unnoticed. |

## Related

- [Control-plane API and webhooks](./webhooks.md) — event catalog, retry schedule and signature verification
- [Commands reference](./commands.md) — every `tenancy:*` command in full, including flags
