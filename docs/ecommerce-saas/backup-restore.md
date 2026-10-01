---
title: Backup and Restore
description: Back up the central database, every store database and store files. Restore a single store without touching the others.
---

# Backup and Restore

Each store has its own database and its own storage directory, so a backup can cover
everything or one store, and one store can be restored without touching the others.

The platform ships no backup tool for this — Botble's **Backups** screen is blocked for
store owners, and it would not cover every store database anyway. Use your own
`mysqldump` / snapshot tooling as below.

## What to back up

1. **Central database** — the control plane: stores (`tenants` table), domains, plans,
   subscriptions, plan orders, API keys, webhooks, operator accounts
2. **Store databases** — one per store, named `tenant_<store id>` (the prefix is
   `TENANCY_DB_PREFIX`, default `tenant_`). The store id is the subdomain the store was
   created with, e.g. `tenant_acme`
3. **Store files** — each store's storage directory, `storage/tenants/tenant<store id>/`
   (e.g. `storage/tenants/tenantacme/`), which holds its uploads on the local disk
4. **Central files and `.env`** — `storage/app/` (central uploads such as landing-page
   branding) and your `.env`

If media is on [cloud storage](./cloud-storage.md), store uploads live in your bucket
under per-store prefixes; back them up with your provider's versioning or replication.

## A daily backup script

Adapt to your credentials handling (a `~/.my.cnf` avoids passwords on the command line):

```bash
#!/bin/bash
set -euo pipefail
APP=/path/to/app
BACKUP_DIR=/backups/ecommerce-saas
DATE=$(date +%Y%m%d-%H%M%S)
mkdir -p "$BACKUP_DIR"

# Central database
mysqldump --single-transaction saas_central > "$BACKUP_DIR/central-$DATE.sql"

# Every store database
mysql -N -e "SHOW DATABASES LIKE 'tenant\_%';" | while read -r db; do
  mysqldump --single-transaction "$db" > "$BACKUP_DIR/backup-$db-$DATE.sql"
done

# Store files, central files and .env
tar -czf "$BACKUP_DIR/storage-$DATE.tar.gz" -C "$APP" storage/tenants storage/app .env

# Keep 30 days locally
find "$BACKUP_DIR" -type f -mtime +30 -delete
```

```bash
0 1 * * * /path/to/backup.sh >> /var/log/ecommerce-saas-backup.log 2>&1
```

Copy the backups off the server (object storage, another host). A backup on the same disk
does not survive losing that disk.

## Before you upgrade

**Always back up before upgrading.** See the [Upgrade Guide](./upgrade.md).

## Restore the central database

```bash
php artisan down
mysql saas_central < central-<timestamp>.sql
php artisan optimize:clear
php artisan up
```

Restore the central database and the store databases **from the same backup run**. The
central database lists which stores exist; a store created after the central backup was
taken has a database the restored control plane knows nothing about.

## Restore one store's database

Find the store id (the subdomain it was created with, shown on **Operator console →
Stores**), then:

```bash
mysql tenant_acme < backup-tenant_acme-<timestamp>.sql
```

Other stores are unaffected. If the restore is older than the current release, bring its
schema up to date:

```bash
php artisan tenancy:migrate-tenants --tenants=acme
```

## Restore one store's files

```bash
tar -xzf storage-<timestamp>.tar.gz -C /path/to/app storage/tenants/tenantacme
```

Then run `php artisan tenancy:repair-storage --tenant=acme`: it recreates any missing
per-store storage directories (cache, sessions, logs, public uploads), which the store
admin needs.

## Verifying a restore

- Open the store's storefront and admin, and check recent orders and images
- `php artisan tenancy:migrate-tenants --pretend` should report nothing pending
- `php artisan tenancy:preflight` for the platform as a whole

## Learn more

- [Upgrade Guide](./upgrade.md) — backup before upgrading, rollback plan
- [Cloud storage](./cloud-storage.md) — media on S3-compatible storage
- [Troubleshooting](./troubleshooting.md) — common issues
