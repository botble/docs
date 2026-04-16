---
title: Migration from FOB SMS Gateway
description: Migrate SMS logs from legacy FOB SMS Gateway to SMS Gateways.
---

# Migration from FOB SMS Gateway

If you're upgrading from FOB SMS Gateway to SMS Gateways, use the migration command to import your existing SMS logs.

## Overview

The migration command:

1. Reads your `fob_sms_logs` table (if it exists)
2. Maps columns to SMS Gateways schema
3. Imports SMS logs, OTP records, and consent data
4. Skips duplicates (based on provider message ID)

## Run the migration

```bash
php artisan sms:import-fob
```

This command runs in **dry-run mode** by default — it shows what would be imported without making changes.

## Options

- `--force` — Actually import (skip dry-run mode)
- `--driver=vonage` — Reassign all imported SMS to a different driver (optional)
- `--limit=1000` — Import only the first 1000 SMS (default: all)

## Examples

### Preview what will be imported

```bash
php artisan sms:import-fob
```

Output:

```
Found 2,345 SMS logs to import
Found 123 OTP records
Found 45 consent records

Preview mode: No changes made. Run with --force to import.
```

### Actually import

```bash
php artisan sms:import-fob --force
```

### Import and reassign all SMS to Vonage

```bash
php artisan sms:import-fob --force --driver=vonage
```

This is useful if you want to change providers after importing.

### Import only the last 1000 SMS

```bash
php artisan sms:import-fob --force --limit=1000
```

## What gets imported

### SMS Logs

From `fob_sms_logs`:

| FOB column | Maps to | Notes |
|---|---|---|
| `id` | `id` | Preserved as UUID |
| `phone` | `to` | Recipient phone |
| `message` | `body` | SMS text |
| `status` | `status` | queued/sent/delivered/failed |
| `driver` | `driver` | SMS provider (twilio, vonage, etc.) |
| `provider_message_id` | `provider_message_id` | Used for deduplication |
| `created_at` | `created_at` | Timestamp |
| `updated_at` | `updated_at` | Timestamp |

### OTP Records

From `fob_otp_attempts`:

| FOB column | Maps to |
|---|---|
| `id` | `id` |
| `phone` | `phone` |
| `code` | `code` |
| `status` | `status` (pending/verified/expired) |
| `created_at` | `created_at` |
| `verified_at` | `verified_at` |

### Consent Data

From `fob_sms_consents`:

| FOB column | Maps to |
|---|---|
| `phone` | `phone` |
| `status` | `status` (opted_in/opted_out) |
| `changed_at` | `changed_at` |

## Deduplication

The command checks for existing SMS by `provider_message_id`. If found, the SMS is skipped (not re-imported).

This prevents duplicate logs if you run the migration multiple times.

## Rollback

If something goes wrong, you can rollback:

1. Delete imported records from the `sms_logs`, `otp_attempts`, and `sms_consents` tables
2. Or restore from a backup and re-run the migration

SMS Gateways does not delete FOB tables, so your original data is preserved.

## Verify the import

After importing, verify in the admin panel:

1. Go to **Admin → SMS Gateways → Delivery Logs**
2. Check the log count and date range
3. Filter by different statuses and drivers
4. Export a sample to verify data accuracy

## Next step

See [Troubleshooting](./troubleshooting.md) if you encounter issues during migration.
