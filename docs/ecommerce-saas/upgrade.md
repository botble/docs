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

**Never overwrite your `.env` file.** The updater will exit if you try. If you do overwrite it, restore from backup and repeat.

### 3. Install dependencies

```bash
composer install --no-dev
npm install && npm run build
```

### 4. Migrate the central database

```bash
php artisan migrate --force
```

This runs only central migrations. If it fails, rollback (see below).

### 5. Migrate every tenant database

```bash
php artisan tenants:migrate
```

This runs every pending migration on every tenant in sequence. Tenants are locked during their migration (the store is unavailable for ~10 seconds per tenant, depending on migration count). On a platform with 100 stores, this takes 15–20 minutes.

**Do not interrupt this command.** If it hangs, check your queue and Redis connection; if it truly hung, kill the process and check the last tenant's migration log:

```bash
tail -100 storage/logs/laravel.log
```

### 6. Publish theme assets

```bash
php artisan tenancy:publish-theme-assets
```

Theme CSS, JS and images are copied to each tenant's public folder. This is fast (seconds) but critical — without it, storefronts have broken styling.

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

The platform applies non-destructive Botble patches. Verify they survived the upgrade by running the package test suite:

```bash
vendor/bin/phpunit -c platform/packages/tenancy/phpunit.xml
```

All tests must pass. If any fail, see [Upstream patches](./upstream-patches.md).

### 9. Run the preflight check

```bash
php artisan tenancy:preflight
```

This asserts:
- Central control-plane tables exist
- Tenant cache isolation is working (writes a probe value under one tenant, asserts another cannot read it)
- Theme assets are published
- The queue worker is running

If any check fails, fix it before going live.

### 10. Exit maintenance mode

```bash
php artisan up
```

Visitors can now access the platform and all stores.

## Rollback plan

If anything fails after step 4, **do not continue**. Rollback:

```bash
php artisan down
git reset --hard HEAD@{1}
# OR restore your backed-up source
composer install --no-dev
php artisan migrate:rollback --force
php artisan tenants:rollback
php artisan up
```

This rolls back the central and all tenant databases to their pre-migration state. Tenant user sessions are unaffected; they log back in normally.

The queue worker does not need to be restarted for a rollback — it will re-process any failed jobs.

## Timing

On a platform with:
- 10 stores: 5–10 minutes total
- 50 stores: 15–25 minutes total
- 100+ stores: 30–45 minutes total

Most of this is tenant migration time. Run upgrades during off-peak hours. The central database migration is fast (usually under 1 minute).

