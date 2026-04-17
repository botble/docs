---
title: Migration from FOB SMS Gateway
description: Import FOB SMS Gateway logs, OTPs, and settings into SMS Gateways.
---

# Migration from FOB SMS Gateway

SMS Gateways can run alongside `friendsofbotble/fob-sms-gateway` without conflict (see [Coexistence](#coexistence) below). When you're ready to retire FOB, import its data with the `sms:import-fob` artisan command.

## What gets migrated

| Source | → | Destination |
|---|---|---|
| `fob_sms_logs` | → | `smsg_delivery_logs` (driver/status mapped) |
| `fob_otps` | → | `smsg_otps` (codes re-hashed with SHA-256) |
| `fob_sms_*` setting rows | → | `smsg_*` setting rows (credentials re-encrypted) |

The command is **idempotent** — rows already present in the destination tables are skipped, so it's safe to re-run.

## Dry run (recommended first step)

Preview how many rows will move without writing anything:

```bash
php artisan sms:import-fob --dry-run
```

Sample output:

```
[DRY-RUN] No rows will be written.
+---------------------------------------+-----------------+
| Resource                              | Rows to migrate |
+---------------------------------------+-----------------+
| fob_sms_logs → smsg_delivery_logs     | 2,345           |
| fob_otps → smsg_otps                  | 123             |
| fob_sms_* settings → smsg_* settings  | 14              |
+---------------------------------------+-----------------+
Dry-run complete. Re-run without --dry-run to apply.
```

## Apply the import

```bash
php artisan sms:import-fob
```

Run it on a production host only after:

1. Backing up the database
2. Activating SMS Gateways (its migrations must have run)
3. Reviewing the dry-run diff

After success the command reports the migrated counts:

```
Import complete: 2345 logs, 123 OTPs, 14 settings migrated.
```

## Drop FOB tables after import

Once you've verified the destination data, pass `--delete-after` on a subsequent run (or combine with the first pass) to drop the FOB source tables and clear `fob_sms_*` setting rows:

```bash
php artisan sms:import-fob --delete-after
```

::: warning
`--delete-after` is irreversible. Only run it after verifying the migrated data in **Admin → SMS Gateways → Delivery Logs** and **Admin → Settings → SMS Gateways**.
:::

## Status mapping

FOB status strings are normalised to SMS Gateways delivery status values:

| FOB status | → | SMS Gateways |
|---|---|---|
| `success` / `sent` | → | `sent` |
| `delivered` | → | `delivered` |
| `failed` | → | `failed` |
| `rejected` | → | `rejected` |

Unmapped statuses are logged and imported as `failed`.

## OTP re-hashing

FOB stored OTP tokens in plaintext or with a different hash. The importer re-hashes every code with SHA-256 (our standard) so verification continues to work with existing unverified attempts — though any in-flight codes will need to be re-requested by the user.

## Credential re-encryption

FOB driver credentials stored under `fob_sms_*` settings are decrypted with FOB's encryption key and re-encrypted with the current Laravel `APP_KEY` before being saved under `smsg_*` keys. Keep your `APP_KEY` stable between the two plugins — rotating keys mid-migration will orphan existing cipher text.

## Coexistence

Until you run the importer, both plugins can stay active on the same host. The `HostSmsConflictGuard` service engages on boot:

- Detects FOB's `SmsManager` binding
- Defers the `SendRegistrationOtpListener` so registration OTPs are not double-sent

This guard is automatic — no configuration needed. Once FOB is uninstalled or its tables dropped, the guard disengages and SMS Gateways takes over the registration OTP listener.

## Rollback

If the import produced bad data:

1. Restore the database from your pre-migration backup, **or**
2. Run `php artisan sms:purge --days=0` to wipe all `smsg_delivery_logs`, then delete rows from `smsg_otps` and `smsg_consents` as needed
3. Fix the underlying issue and re-run `sms:import-fob`

The importer's idempotency means a second run is safe — it won't re-create rows that already exist.

## Verify the import

After importing, verify in the admin panel:

1. **Admin → SMS Gateways → Delivery Logs** — check row count and filter by driver
2. **Admin → SMS Gateways → OTP History** — confirm OTP rows are present (codes are hashed)
3. **Admin → Settings → SMS Gateways** — verify driver credentials are populated
4. Send a **Test SMS** to confirm credentials decrypt correctly under the new encryption key

## Next step

See [Troubleshooting](./troubleshooting.md) if a migration step fails, or [Configuration](./configuration.md) to adjust settings after the cutover.
