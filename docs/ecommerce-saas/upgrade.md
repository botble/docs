---
title: Upgrade Guide
description: Upgrade the platform codebase and every tenant database without losing data or downtime.
---

# Upgrade Guide

Upgrading a multi-tenant platform differs materially from a single-site Botble install. Every store has its own database and queue, and the queue worker holds stale code in memory if not restarted. Follow these steps exactly.

## Before you upgrade

**Back up everything.** You cannot recover from a corrupted backup, but you can recover from an incomplete upgrade.

### Back up the central database

```bash
mysqldump -u root -p saas_central > central-$(date +%Y%m%d-%H%M%S).sql
```

### Back up every tenant database

Tenant databases follow the naming convention `tenant_<id>`. List them all:

```bash
mysql -u root -p -e "SHOW DATABASES LIKE 'tenant_%';" | tail -n +2 | while read db; do
  mysqldump -u root -p "$db" > backup-"$db"-$(date +%Y%m%d-%H%M%S).sql
done
```

Save these dumps outside the server, not just in the project folder.

### Back up tenant storage and the .env file

Tenant uploads live in `storage/tenants/`:

```bash
tar -czf storage-tenants-$(date +%Y%m%d-%H%M%S).tar.gz storage/tenants/
```

Back up your `.env` file:

```bash
cp .env .env.backup-$(date +%Y%m%d-%H%M%S)
```

## Update from the operator console

From version 1.0.2, **Console → System update** installs a new release from the browser. It
shows the installed and latest version and, when an update exists, runs the same steps as the
command-line upgrade below, one at a time with a live log:

1. Download the release from the licence server (your licence must be active)
2. Replace the platform files
3. Migrate the central database, including the platform's own control-plane tables
4. Activate plugins the release adds (`tenancy:activate-plugins`)
5. Migrate every store database, one store at a time in 20-second slices (`tenancy:migrate-tenants`)
6. Publish core, package and theme assets
7. Clear caches and restart the queue workers (`queue:restart`)

A store that fails, or is left with unresolved migrations, is named in the log and skipped; the
others still update. Fix it and run `php artisan tenancy:migrate-tenants --tenants=<id>`.

Storefronts stay online during the update (the console does not switch on maintenance mode, which
would also lock you out of it). Run it in a quiet hour. If a step fails, **Retry this step**
continues from where it stopped; only one update can run at a time.

Take the backups in [Before you upgrade](#before-you-upgrade) first, and keep the page open until
it says the update finished. If a step fails, the page names it: fix the cause and finish the
remaining steps from the command line below.

::: tip Store admins cannot update
Botble's own updater (Admin → System → Updater) is blocked for store admins, because an update
replaces the code under every store. Only operators can update, from the console.
:::

::: warning Updating to 1.0.2 itself
Installs on 1.0.0 or 1.0.1 do not have this screen yet. Install 1.0.2 with the command-line steps
below once; every later release can then be installed from the console.
:::

The screen honours `CMS_ENABLE_SYSTEM_UPDATER=false` and is disabled in demo mode. It needs PHP
memory of 256 MB or more and a max execution time of 300 s or more; the screen shows both.

## Upgrade steps

### 1. Enable maintenance mode

```bash
php artisan down
```

Visitors see a 503 page. The queue worker continues to run, so avoid this during heavy traffic or long-running jobs.

### 2. Replace the source code

```bash
# Pull from your repository or download the new version
git pull origin main
# OR
unzip ecommerce-saas-1.x.x.zip
```

**Never overwrite your `.env` file** — the zip ships only `.env.example`, so unzipping over your install leaves it alone. If you do overwrite it, restore it from the backup above.

### 3. Install dependencies (git clones only)

The release zip ships `vendor/` and the compiled assets, so a zip upgrade has nothing to install.
From a git clone:

```bash
composer install --no-dev
```

### 4. Migrate the central database and activate plugins

```bash
php artisan migrate --force
php artisan tenancy:activate-plugins
```

`migrate` runs only central migrations. If it fails, roll back (see below).
`tenancy:activate-plugins` activates any plugin the new release adds to what a store can be seeded
with; plugins already active are skipped, so on most upgrades it changes nothing. It must run
before step 5: a store's migrations call into plugin code, which only loads once the plugin is
active platform-wide.

### 5. Migrate every tenant database

```bash
php artisan tenancy:migrate-tenants --pretend   # see what each store would get, writes nothing
php artisan tenancy:migrate-tenants             # apply
```

This applies the release's pending migrations to every existing store, running the same set
provisioning runs, inside each store's own database. A store that fails is reported and skipped —
the others still migrate — so read the summary and re-run with `--tenants=<id>` once you have fixed
the one it names. See [Artisan commands](./commands.md#tenancy-migrate-tenants).

::: warning Not `tenants:migrate`
stancl/tenancy's own `tenants:migrate`, `tenants:migrate-fresh` and `tenants:rollback` point at a
migration path this build does not have. They are refused on this platform — they print an error and
touch nothing. See [Artisan commands](./commands.md#the-stock-tenants-commands-you-must-not-use).
:::

### 6. Publish theme assets

```bash
php artisan tenancy:publish-theme-assets
```

Copies each theme's CSS, JS and images into the shared `public/themes` directory. Fast, but
critical — without it, storefronts have broken styling.

### 7. Restart the queue worker

::: danger Critical step
The queue worker holds the old code in memory. Restarting it ensures new jobs use the new code.
:::

```bash
systemctl restart queue-worker
```

Or, if you use Supervisor:

```bash
supervisorctl restart tenancy-queue-worker:*
```

Wait 5 seconds and check the worker is running:

```bash
systemctl status queue-worker
# or
ps aux | grep "queue:work"
```

If the worker fails to start, check the logs:

```bash
tail -50 storage/logs/laravel.log
sudo journalctl -u queue-worker -n 50
```

### 8. Verify upstream patches

The platform applies non-destructive Botble patches. The package ships a test suite that covers
them, but **it is not in the release zip** — the build excludes `tests/` and installs with
`composer install --no-dev`, so neither `vendor/bin/phpunit` nor the tests are present on a customer
install. (The `phpunit.xml` you may notice in the zip is an orphan.)

Verify the patches by hand instead — each is a small, greppable change:

```bash
php artisan tenancy:preflight
```

Preflight asserts the conditions the patches exist to guarantee. For the patches themselves, see
[Upstream patches](./upstream-patches.md), which lists each one with the file and what to look for.

If you are working from a git clone rather than the release zip, the suite is available:

```bash
composer install            # restores dev dependencies
vendor/bin/phpunit -c platform/packages/tenancy/phpunit.xml
```

### 9. Run the preflight check

```bash
php artisan tenancy:preflight
```

Among other things, this asserts:
- Central control-plane tables exist
- Every plugin a new store can be seeded with is active platform-wide
- The configured cache store can keep two keyspaces apart
- Theme assets are published
- The queue is on a real connection, not `sync`

If any check fails, fix it before going live.

### 10. Exit maintenance mode

```bash
php artisan up
```

Visitors can now access the platform and all stores.

## Rollback plan

If anything fails after step 4, **do not continue**. There is no rollback command for store
databases — stancl's `tenants:rollback` is refused here — so the backups you took above are the
rollback:

```bash
php artisan down
# restore the previous source (git reset --hard HEAD@{1}, or your backed-up files)
mysql -u root -p saas_central < central-<timestamp>.sql
# restore each store that step 5 had reached, from its backup-tenant_<id>-<timestamp>.sql
php artisan optimize:clear
php artisan up
```

Tenant user sessions are unaffected; they log back in normally.

Restart the queue worker after a rollback too (step 7) — it keeps running whichever code it booted
with until it is restarted.

## Timing

On a platform with:
- 10 stores: 5–10 minutes total
- 50 stores: 15–25 minutes total
- 100+ stores: 30–45 minutes total

Most of this is tenant migration time. Run upgrades during off-peak hours. The central database migration is fast (usually under 1 minute).

