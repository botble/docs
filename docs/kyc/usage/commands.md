---
title: Scheduled Commands
description: Artisan commands shipped with the KYC Verification plugin — schedule, purpose, and manual invocation.
---

# Scheduled Commands

The plugin ships three Artisan commands.

## `kyc:cleanup`

Purge rejected submissions and approved files that have passed their retention windows.

**Usage:**
```bash
php artisan kyc:cleanup
```

**Options:**
| Flag | Description |
|---|---|
| `--dry-run` | Report what would be deleted without touching the database or disk |

**Scheduled:** Daily at **02:00** (configurable in `src/Providers/KycServiceProvider.php` via the `schedule()` method).

**What it does:**
1. Pass 1 — delete rejected submission rows and their files where `updated_at < now() - kyc_rejected_retention_days`.
2. Pass 2 — delete only files (not rows) for approved submissions where `reviewed_at < now() - kyc_approved_file_retention_days` and `files_purged_at IS NULL`; mark `files_purged_at = now()`.

**Safe to run repeatedly.**

## `kyc:expire`

Flip approved submissions to status `expired` once their `expires_at` timestamp has passed.

**Usage:**
```bash
php artisan kyc:expire
```

**Scheduled:** Daily at **02:15**.

**What it does:**
Updates `kyc_submissions` rows where `status = approved AND expires_at IS NOT NULL AND expires_at < now()` setting `status = expired`. Subjects whose only approved submission is now expired lose `hasApprovedKyc()` on the next request — any integration gate re-blocks them until they resubmit. Each expired row dispatches a `KycExpired` event which fans out to webhook endpoints subscribed to `kyc.expired`.

## `kyc:demo-seed`

Seed demo subjects, submissions, webhook endpoints, and lockout state rows for development and demo sites.

**Usage:**
```bash
php artisan kyc:demo-seed
```

**Options:**
| Flag | Description |
|---|---|
| `--fresh` | Wipe existing KYC rows before seeding |
| `--count={n}` | Number of submissions to seed (default: 25) |

::: danger
Never run `kyc:demo-seed` on a production site. It creates fake customers and submissions that will pollute your real data.
:::

## Scheduler setup

All scheduled commands run through Laravel's scheduler. You need a single cron entry on the server:

```bash
* * * * * cd /var/www/site && php artisan schedule:run >> /dev/null 2>&1
```

Verify the KYC commands are actually registered:

```bash
php artisan schedule:list | grep kyc
```

Expected output:

```
  0 2 * * * php artisan kyc:cleanup   Next Due: YYYY-MM-DD 02:00:00
  15 2 * * * php artisan kyc:expire   Next Due: YYYY-MM-DD 02:15:00
```

## Queue worker

Webhook dispatch and queued emails use the `kyc` queue. Configure a worker:

```bash
php artisan queue:work --queue=kyc,default --tries=3 --timeout=60
```

Or use Laravel Horizon if you have it configured.

## Logging

All three commands write structured lines to `storage/logs/laravel.log` under the `kyc` channel. Tail while debugging:

```bash
tail -f storage/logs/laravel.log | grep kyc
```

## Next step

- [Retention & Expiry](./retention.md) — policy details behind the commands
- [Troubleshooting](../troubleshooting.md) — common scheduler issues
