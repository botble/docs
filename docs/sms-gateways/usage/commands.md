---
title: Artisan Commands
description: CLI commands shipped by SMS Gateways.
---

# Artisan Commands

Use these CLI commands for bulk operations, retries, and housekeeping.

## `sms:retry`

Re-dispatch delivery logs stuck in `failed` that are eligible for retry (based on `retry_at`).

```bash
php artisan sms:retry
```

Runs on a scheduled tick automatically — manual invocation is only needed for ad-hoc catch-up.

## `sms:purge`

Delete delivery logs older than a retention window.

```bash
php artisan sms:purge --days=90   # default window
php artisan sms:purge --days=30   # stricter window
```

Schedule nightly in `app/Console/Kernel.php`:

```php
$schedule->command('sms:purge', ['--days=90'])->daily();
```

## `sms:purge-subject`

GDPR per-subject erasure — cascade-deletes delivery logs, OTPs, and consents for one subject.

```bash
php artisan sms:purge-subject "Botble\\Ecommerce\\Models\\Customer" 42
php artisan sms:purge-subject "Botble\\Marketplace\\Models\\Store" 15
```

See [GDPR & Data Export](./gdpr.md) for the full erasure flow and customer-facing endpoints.

## `sms:import-fob`

Migrate data from `friendsofbotble/fob-sms-gateway` into SMS Gateways tables.

```bash
php artisan sms:import-fob --dry-run        # preview
php artisan sms:import-fob                   # apply
php artisan sms:import-fob --delete-after   # apply + drop fob_* tables
```

See [Migration from FOB](../migration.md) for status mapping, OTP re-hashing, and credential re-encryption details.

## `sms:status-poll`

Poll drivers without push delivery receipts (e.g. BulkSMSBD) for the latest status of `sent` rows and update the delivery log.

```bash
php artisan sms:status-poll
```

Scheduled automatically every few minutes while rows remain in `sent`.

## `sms:recover-abandoned-carts`

Scan recent carts that never reached checkout and dispatch an abandoned-cart SMS to customers who have opted in. Uses the `smsg_abandoned_cart_sent` idempotency table to avoid duplicate sends.

```bash
php artisan sms:recover-abandoned-carts
```

Scheduled every 15 minutes by default.

## `sms:verify-driver`

Send a synthetic test SMS through a configured driver and print the provider response.

```bash
php artisan sms:verify-driver twilio --to=+12025550001
php artisan sms:verify-driver msg91  --to=+919876543210
```

Useful for smoke-testing credentials after rotating API keys.

## `sms:heartbeat`

Write a runtime ping to `smsg_runtime_pings`. Used by the admin dashboard to confirm the scheduler is running.

```bash
php artisan sms:heartbeat
```

Scheduled every minute alongside Laravel's `schedule:run`.

## `sms:import-email-templates`

One-off import that mirrors legacy email templates into SMS templates. Matches event keys across the two systems and seeds `smsg_templates` rows with equivalent bodies. Safe to re-run — duplicates are skipped.

```bash
php artisan sms:import-email-templates
```

## Scheduling

Make sure your server's crontab runs Laravel's scheduler every minute:

```bash
* * * * * cd /path/to/botble && php artisan schedule:run >> /dev/null 2>&1
```

The plugin registers its scheduled commands automatically via the service provider — no kernel edits required.

## Next step

See [Permissions](./permissions.md) for the admin permission flags that gate these commands' admin UI equivalents.
