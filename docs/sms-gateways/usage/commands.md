---
title: Artisan Commands
description: CLI commands for bulk operations, retries, and data management.
---

# Artisan Commands

Use these CLI commands to manage SMS in bulk from your server terminal.

## Retry failed SMS

Retry all SMS that failed delivery:

```bash
php artisan sms:retry
```

Options:

- `--days=7` — Only retry SMS from last 7 days (default: 30)
- `--driver=twilio` — Only retry through a specific driver
- `--phone=+1-555-1234` — Only retry to a specific phone number

Example:

```bash
php artisan sms:retry --days=1 --driver=twilio
```

Retries up to 3 times per SMS, respecting the retry backoff policy.

## Purge old logs

Delete logs older than N days:

```bash
php artisan sms:purge --days=90
```

This also deletes associated OTP attempts and consent records. **This cannot be undone**, so export first if needed for compliance.

Options:

- `--days=90` — Delete older than 90 days (default)
- `--dry-run` — Show what would be deleted without actually deleting

Example (preview):

```bash
php artisan sms:purge --days=90 --dry-run
```

This command runs automatically nightly via scheduler.

## Purge subject SMS

Delete all SMS for a specific subject (integration):

```bash
php artisan sms:purge-subject ecommerce
```

Valid subjects:

- `ecommerce`
- `marketplace`
- `real-estate`
- `job-board`
- `car-manager`
- `hotel`

Options:

- `--force` — Skip confirmation prompt

Example:

```bash
php artisan sms:purge-subject ecommerce --force
```

**Warning**: This deletes all SMS logs for that subject. Associated OTP attempts and consents are preserved if still needed by other subjects.

## Migrate from legacy SMS provider

If you previously used another SMS plugin (e.g., FOB SMS Gateway), import those SMS logs:

```bash
php artisan sms:import-fob
```

This:

1. Reads `fob_sms_logs` table (if it exists)
2. Maps to SMS Gateways schema
3. Imports driver, status, phone, message text
4. Skips duplicates (based on provider message ID)

Options:

- `--driver=vonage` — Reassign all imported SMS to a different driver
- `--dry-run` — Preview what would be imported

Example:

```bash
php artisan sms:import-fob --driver=vonage --dry-run
```

After import, verify the count in **Admin → SMS Gateways → Delivery Logs**.

## List available drivers

Show all registered SMS drivers and their status:

```bash
php artisan sms:list-drivers
```

Output:

```
Registered SMS Drivers:

✓ twilio       (active)      - Twilio REST API
✓ vonage       (active)      - Vonage SMS
✗ aws-sns      (inactive)    - Amazon SNS
✗ plivo        (inactive)    - Plivo SMS
...
```

## Test driver credentials

Verify that a driver's credentials are valid:

```bash
php artisan sms:test-driver twilio
```

This sends a test SMS to the number configured in settings. Check your phone within 10 seconds.

If it fails, the command shows the provider's error message (e.g., "Invalid API token").

## Queue background jobs

If using queue workers, manually trigger job processing:

```bash
php artisan queue:work --queue=sms
```

This processes SMS in the background. For production, run this in a supervisor/systemd daemon. See [Shared Hosting](../shared-hosting/overview.md) for queue setup on cPanel and Plesk.

## Scheduled tasks

The plugin automatically registers these with Laravel's scheduler:

- **`sms:purge`** — Runs nightly at 2 AM (purges logs > 90 days)
- **`sms:retry`** — Runs every 30 minutes (retries failed SMS)
- **`otp:cleanup`** — Runs nightly at 3 AM (removes expired OTP attempts)
- **`consent:cleanup`** — Runs nightly at 3 AM (removes old consent records)

These run automatically if you have `php artisan schedule:run` in your crontab:

```bash
* * * * * cd /path/to/botble && php artisan schedule:run >> /dev/null 2>&1
```

## Next step

See [Permissions](./permissions.md) to control who can access SMS features.
