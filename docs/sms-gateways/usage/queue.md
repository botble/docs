---
title: Queue Setup (Async SMS)
description: Run SMS sends in the background so checkout, login, and order-confirm responses return instantly.
---

# Queue Setup

Out of the box `DispatchSmsJob` and `RetryFailedSmsJob` implement Laravel's `ShouldQueue` and target a dedicated `sms-gateways` queue. What this means in practice:

- **Default install (shared hosting)** — `QUEUE_CONNECTION=sync` in `.env` (Laravel's default). Jobs run inline, exactly as they did before. **No setup required.**
- **VPS / dedicated server** — switch `QUEUE_CONNECTION` to `database` / `redis` / `sqs` and run a worker. The carrier HTTP call moves off the request, and the checkout / login response returns immediately.

## When you should turn the queue on

| Symptom | Verdict |
|---|---|
| Order-confirm page takes 1–3 s to load and SMS notifications are enabled | Turn the queue on |
| Customer login takes >1 s when login OTP is enabled | Turn the queue on |
| Site already runs queue workers for mail / notifications | Turn the queue on — point a worker at `sms-gateways` too |
| Shared host with no SSH / no Supervisor | Leave it on `sync` — there's nothing to gain |

`sync` is not "broken" — it is the safe default for shared hosting. The reason `ShouldQueue` ships enabled is so VPS customers don't have to edit plugin files (which would be wiped on the next composer update).

## How `sync` keeps shared hosting safe

Laravel's `sync` queue driver executes `ShouldQueue` jobs inline as soon as `dispatch()` is called — they never get written to the `jobs` table, and no worker process is needed. So with the default `.env`:

```env
QUEUE_CONNECTION=sync
```

The order-confirm flow blocks on the SMS HTTP call exactly as it did pre-v1.0.33. No risk of "Queued forever" rows.

## Enabling async on a VPS

### 1. Choose a queue driver

```env
# .env
QUEUE_CONNECTION=database
```

`database` is the simplest — no extra service to run. For high-throughput sites (>500 SMS / hour) use `redis` or `sqs` instead.

### 2. Run the migration once

```bash
php artisan queue:table
php artisan migrate
```

Skip this if your project already has the `jobs` table (most Botble installs do).

### 3. Start a worker scoped to the `sms-gateways` queue

```bash
php artisan queue:work --queue=sms-gateways,default --sleep=3 --tries=3 --max-time=3600
```

The comma-separated list reads `sms-gateways` first, then falls back to `default`. This keeps SMS sends prioritised without starving other jobs (mail, notifications, etc.).

> **Why `--tries=3`?** It only protects against fatal exceptions inside the worker (e.g. PHP OOM, DB lost connection). The plugin's own retry ladder runs separately via `SmsRetryCommand` + `RetryFailedSmsJob` and re-queues failed sends on the configured backoff. `DispatchSmsJob::$tries = 1` so Laravel never retries on top of that ladder.

### 4. Keep the worker alive with Supervisor

Workers exit cleanly every `--max-time=3600` seconds (one hour) or on signal. Supervisor restarts them.

`/etc/supervisor/conf.d/sms-worker.conf`:

```ini
[program:sms-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/your-site.com/artisan queue:work --queue=sms-gateways,default --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/log/sms-worker.log
stopwaitsecs=3600
```

Apply:

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start sms-worker:*
```

Replace `/var/www/your-site.com` with your install path. `numprocs=2` runs two workers in parallel — bump to 4–8 if you push >1 SMS / second sustained.

### 5. Clear cache

```
Admin → Platform Administration → Cache Management → Clear all caches
```

Or via CLI:

```bash
php artisan optimize:clear
```

## Verifying it works

1. Place a test order (or trigger an OTP). The success page should return in under 200 ms — no visible carrier-call delay.
2. Open **Admin → SMS Gateways → Delivery Logs**. The latest row should transition `Queued → Sending → Sent` within 1–3 seconds (worker picks the job up on its 3-second sleep cycle).
3. Tail the worker log:

   ```bash
   tail -f /var/log/sms-worker.log
   ```

   Each processed job logs one `Processed: Botble\SmsGateways\Jobs\DispatchSmsJob` line.

## Switching back to sync

If you need to roll back to inline sends (e.g. for debugging without a worker), just change `.env`:

```env
QUEUE_CONNECTION=sync
```

Then clear cache. Already-queued jobs in the `jobs` table will sit untouched — drain them by running `queue:work --once` repeatedly or `php artisan queue:flush` (destructive; drops all pending jobs across queues).

## Multi-queue, multi-worker layouts

If your site already runs workers for other queues (`default`, `mail`, etc.), choose one pattern:

**Pattern A — one worker, multiple queues** (low volume):

```bash
php artisan queue:work --queue=sms-gateways,mail,default
```

**Pattern B — dedicated SMS worker** (high volume / strict latency):

```bash
php artisan queue:work --queue=sms-gateways    # SMS-only worker
php artisan queue:work --queue=mail,default    # everything else
```

Pattern B is recommended once you push >100 SMS / hour — slow mail jobs (large attachments, SMTP retries) can otherwise block fresh OTP sends.

## Common pitfalls

| Symptom | Cause | Fix |
|---|---|---|
| SMS status stays `Queued` for hours | Worker not running, or worker started before `.env` was updated | `sudo supervisorctl restart sms-worker:*` then `php artisan optimize:clear` |
| Worker process dies after one job | `--max-time` is missing or too low | Add `--max-time=3600` to the command |
| Worker uses old code after deploys | Workers cache the bootstrapped app in memory | Send `php artisan queue:restart` after every deploy; Supervisor will respawn with fresh code |
| SMS sent twice | Two workers picking up the same queue — second worker started before first was killed | Use `numprocs=N` in Supervisor (single program) instead of starting workers manually |
| Latency creeps up over time | Worker leaking memory or default queue starving SMS jobs | Use Pattern B above (dedicated SMS worker) |

## Related

- [Delivery Logs](./delivery-logs.md) — verify the worker actually picks up jobs
- [Artisan Commands](./commands.md) — `sms:retry`, `sms:purge`, `sms:import-fob`
- [Shared Hosting Overview](../shared-hosting/overview.md) — why `sync` is the safe default
