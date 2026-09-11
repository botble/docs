---
title: Artisan commands
description: Every tenancy:* console command — arguments, options, when to run it, and whether it belongs on a cron schedule.
---

# Artisan commands

All commands live under `platform/packages/tenancy/src/Console/` and share the
`tenancy:` prefix.

## Summary

| Command | Purpose | Scheduled |
|---|---|---|
| `tenancy:preflight` | Check the server can run the SaaS | No — run after any config change |
| `tenancy:activate-plugins` | Activate every plugin a new store can be seeded with, platform-wide | Every deploy |
| `tenancy:migrate-tenants` | Apply a release's pending migrations to every existing store | Every upgrade |
| `tenancy:create-tenant` | Create and provision a store | No — manual, or via signup / the API |
| `tenancy:billing-maintenance` | Suspend past-due stores, purge cancelled ones past retention | Daily |
| `tenancy:send-lifecycle-emails` | Trial-ending reminders and pre-purge warnings | Daily, `0 8 * * *` |
| `tenancy:notify-pending-orders` | Digest of bank-transfer requests awaiting review | Daily, `0 9 * * *` |
| `tenancy:collect-usage` | Refresh dashboard usage counters | Daily, `0 3 * * *` |
| `tenancy:schedule` | Per-store scheduled maintenance | Cron per `--frequency` (hourly/daily/everyFiveMinutes) |
| `tenancy:verify-domains` | Re-check pending custom domains via DNS | Every 10 min, `*/10 * * * *` |
| `tenancy:repair-storage` | Recreate missing per-tenant storage directories | No — run when storage goes missing |
| `tenancy:backfill-plugins` | Align stores' enabled apps with their plan | No — run after curating the catalog |
| `tenancy:webhooks-deliver` | Deliver due webhook retries, prune history | **Every minute** — required |
| `tenancy:themes` | List installed themes: presets, assets, plugins, catalog, stores | No — run to verify |
| `tenancy:publish-theme-assets` | Publish theme assets into `public/themes` | Every deploy |
| `tenancy:register-theme` | Validate an installed theme and add it to the catalog | No — one-off per theme |

## `tenancy:preflight`

```bash
php artisan tenancy:preflight
```

Checks this server can run Ecommerce SaaS. No arguments or options. Run it after any
config change — before creating stores, and again after a Botble upgrade to confirm the
[upstream patches](./upstream-patches.md) are still intact. It also fails if signup
email verification is on but mail goes nowhere (`log`/`array` mailer), fails when any
plugin a new store can be seeded with is not active platform-wide (and names it), and
turns any theme the catalog actively offers into a hard failure if its assets or required
plugins are missing.

## `tenancy:activate-plugins`

```bash
php artisan tenancy:activate-plugins
```

Activates, platform-wide, every plugin a new store can be seeded with: each theme's
`required_plugins` plus every plugin the preset dumps switch on, in `plugin.json` `require`
order. No arguments or options. It is the same step the browser installer's automated setup
runs, so a CLI deploy and a browser install end up with the same set.

Plugin code is loaded only from the central activated list, and provisioning migrates every
plugin on disk — so a platform that activated only `ecommerce` fails its first store with
`Class "Botble\Location\Models\City" not found`. Plugins that are already active are skipped
(re-activating one would clear the whole cache), so it is safe on every deploy. Exits non-zero,
naming the plugin, if any activation fails.

## `tenancy:migrate-tenants`

```bash
php artisan tenancy:migrate-tenants --pretend      # report only, writes nothing
php artisan tenancy:migrate-tenants --pretend -v   # + per-directory counts
php artisan tenancy:migrate-tenants                # apply to every provisioned store
php artisan tenancy:migrate-tenants --tenants=acme # one store (repeatable)
```

| Option | Meaning |
|---|---|
| `--tenants=` | Limit to specific store ids; defaults to every provisioned store |
| `--pretend` | Report what would run without applying anything |

**The** way to apply a release's pending migrations to stores that already exist. It runs the
same migration set provisioning runs — core, packages, the theme's own migrations and every
plugin — inside each store's own database, so a store created today and a store upgraded
tomorrow end up with the same schema. One broken store is reported and skipped; it does not
abort the sweep for the others.

## `tenancy:create-tenant`

```bash
php artisan tenancy:create-tenant {subdomain}
    [--name=]
    [--email=]
    [--password=]
    [--theme=]
    [--preset=]
    [--sync]
```

| Argument/Option | Meaning |
|---|---|
| `subdomain` | Required. Subdomain label, e.g. `acme` for `acme.example.com` |
| `--name=` | Store display name |
| `--email=` | Store owner admin email |
| `--password=` | Store owner admin password (generated when omitted) |
| `--theme=` | Storefront theme slug; defaults to the platform default theme |
| `--preset=` | Theme preset to seed, e.g. `home-fashion`; omit for a bare store |
| `--sync` | Provision inline instead of queueing |

Creates and provisions a store. Without `--sync`, provisioning is queued —
`TENANCY_PROVISION_SYNC=true` (or a `sync` queue driver) makes any invocation inline
regardless of the flag. A store created this way has no subscription row, so it's
entitled to the whole [apps and themes catalog](./usage-apps-themes.md) until you
assign it a plan.

## `tenancy:billing-maintenance`

```bash
php artisan tenancy:billing-maintenance [--dry-run]
```

Suspends stores past their grace period and purges cancelled stores past retention.
`--dry-run` reports what a run would suspend or drop without changing anything. Cron it
daily.

## `tenancy:send-lifecycle-emails`

```bash
php artisan tenancy:send-lifecycle-emails [--dry-run]
```

Sends trial-ending reminders and pre-purge retention warnings. `--dry-run` lists who
would be emailed without sending. Every send is recorded in central
`tenant_notifications` (unique per tenant+type+key), so re-runs never double-send.

```cron
0 8 * * * php artisan tenancy:send-lifecycle-emails
```

## `tenancy:notify-pending-orders`

```bash
php artisan tenancy:notify-pending-orders [--dry-run]
```

Emails every operator a digest of bank-transfer requests awaiting review. Deliberately
not deduped — it's a work queue, not a one-time notification, so it fires daily while
requests are waiting. `--dry-run` reports without sending.

```cron
0 9 * * * php artisan tenancy:notify-pending-orders
```

## `tenancy:collect-usage`

```bash
php artisan tenancy:collect-usage [--tenant=*]
```

Rolls per-tenant usage counters (products, orders, storage, staff users) into the
central `tenant_usage` table for the dashboard. `--tenant=` limits the run to specific
tenant ids (repeatable). Cron it daily:

```cron
0 3 * * * php artisan tenancy:collect-usage
```

Live counts for a single store are always available from the store's own database via
`GET /stores/{id}/usage?refresh=1`.

## `tenancy:schedule`

```bash
php artisan tenancy:schedule [--frequency=hourly] [--tenant=*]
```

Runs per-store scheduled maintenance across every tenant. `--frequency=` accepts
`hourly`, `daily` or `everyFiveMinutes` (default `hourly`) and selects which per-tenant
tasks that invocation runs; `--tenant=` limits it to specific tenant ids. Past a few
hundred stores this is O(stores) — shard it with `--tenant=` across parallel cron
entries.

## `tenancy:verify-domains`

```bash
php artisan tenancy:verify-domains [--domain=] [--all]
```

| Option | Meaning |
|---|---|
| `--domain=` | Verify a single hostname only (repeatable to verify multiple) |
| `--all` | Also re-check domains already verified |

Re-checks pending custom domains via DNS. Cron it every 10 minutes so a customer's DNS
change is picked up without them clicking **Verify** by hand:

```cron
*/10 * * * * php artisan tenancy:verify-domains
```

## `tenancy:repair-storage`

```bash
php artisan tenancy:repair-storage [--tenant=*]
```

Recreates missing per-tenant storage directories under `storage/tenants/tenant<id>/`.
`--tenant=` limits the run to specific tenant ids. Not scheduled — run it when a store's
uploads or generated assets start 404ing after a lost storage directory.

## `tenancy:backfill-plugins`

```bash
php artisan tenancy:backfill-plugins [--tenant=*] [--enable-all] [--write]
```

Aligns each store's enabled apps with its plan entitlement. `--tenant=` limits it to
specific stores; `--enable-all` also switches on every entitled app a store is
currently missing; without `--write` the command only reports what it would change. Run
it after curating the [apps catalog](./usage-apps-themes.md) or reassigning apps to a
plan.

## `tenancy:webhooks-deliver`

```bash
php artisan tenancy:webhooks-deliver [--limit=100] [--endpoint=]
```

::: danger Required every minute
`tenancy:webhooks-deliver` is the **only** retry driver. The queued job that fires a
webhook makes just the first attempt; every retry after that is driven by this command
reading `next_attempt_at` off the delivery row — not a queue delay, so it retries the
same way whether the queue driver is `sync` or a real worker. **Without this cron
entry, a failed delivery is never retried**, and a delivery whose worker died
mid-attempt is never picked up again.

```cron
* * * * * cd /path/to/app && php artisan tenancy:webhooks-deliver
```
:::

`--limit=` caps rows attempted per run (default 100); `--endpoint=` sweeps deliveries
for one endpoint id only. Two runs can't trip over each other — the sweep takes a cache
lock and a second invocation that finds it held exits immediately. Each run also prunes
finished history: `delivered`/`exhausted` rows older than
`TENANCY_WEBHOOKS_RETENTION_DAYS` (default 30) are deleted. See
[Webhooks](./webhooks.md) for delivery states and retry schedule.

## `tenancy:themes`

```bash
php artisan tenancy:themes
```

Lists every installed theme with its preset count, whether assets are published,
whether its required plugins are present, its catalog status, and how many stores run
it. No arguments or options — run it any time to verify a theme before or after
registering it.

## `tenancy:publish-theme-assets`

```bash
php artisan tenancy:publish-theme-assets [theme]
```

::: warning Belongs on every deploy
Publishes storefront theme assets into `public/themes`. `theme` is optional — omit it
to publish every installed theme, or pass a slug to publish just one.
`public/themes` is shared by every store and no customer request may write there, so an
unpublished theme after a deploy renders an unstyled shop and nothing self-heals until
this runs.
:::

## `tenancy:register-theme`

```bash
php artisan tenancy:register-theme {theme} [--publish] [--inactive]
```

| Argument/Option | Meaning |
|---|---|
| `theme` | Required. Theme slug — the directory name under `platform/themes` |
| `--publish` | Publish the theme's assets first if they're missing |
| `--inactive` | Create the catalog row switched off |

Validates an installed theme and adds it to the tenant-facing catalog. Refuses when the
theme isn't installed, a required plugin is missing, or assets couldn't be published.
Deliberately does not assign plans — that's a separate pricing step. See
[Adding a storefront theme](./adding-a-theme.md) for the full runbook.

## The stock `tenants:*` commands you must not use

`php artisan list` shows `tenants:*` commands from the underlying stancl/tenancy package that look
like they belong to this product. They do not: stancl configures them with
`--path => database_path('migrations/tenant')`, a directory this build does not have, so they cannot
reach the migrations this product uses. A store's schema is built by Botble's own migrator instead.

This build therefore **replaces the dangerous ones with a refusal**. Running any of them prints an
error, points at the right command and exits non-zero — nothing is touched:

| Command | What happens here |
|---|---|
| `tenants:migrate` | Refused — use `tenancy:migrate-tenants` |
| `tenants:migrate-fresh` | Refused. Stock, it wipes every store's database and restores nothing |
| `tenants:rollback` | Refused — it would roll back from the same missing path, undoing nothing |
| `tenants:seed` | Refused — not configured for this product's seeders |
| `tenants:run` | Refused |
| `tenants:list` | Harmless — lists tenant ids |

Use the `tenancy:*` commands documented above instead. For upgrades, see
[Upgrade guide](./upgrade.md) — `tenancy:migrate-tenants` is the step that migrates existing stores.

## A command not to run

`php artisan list` also shows **`tenancy:install`**. That one belongs to the underlying
stancl/tenancy vendor package, not to Ecommerce SaaS. The platform ships already
configured, so running it only republishes vendor scaffolding over working config.
Leave it alone.

## Related

- [Cron jobs](./cronjob.md) — the full crontab for the platform
- [Webhooks](./webhooks.md) — delivery states, retry schedule, signature verification
- [Adding a storefront theme](./adding-a-theme.md) — where the theme commands fit in the five-step runbook
