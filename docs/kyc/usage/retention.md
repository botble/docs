---
title: Retention & Expiry
description: How the KYC plugin automatically cleans up rejected, approved, and expired submissions.
---

# Retention & Expiry

KYC documents are sensitive personal data. The plugin ships **automatic retention** and **expiry flipping** so you don't accumulate identity documents beyond what your compliance policy allows.

## The three retention buckets

| Bucket | What's kept | What's deleted | When |
|---|---|---|---|
| **Rejected submissions** | Nothing (row + files) | Everything — row and all uploaded files | After `kyc_rejected_retention_days` (default **7**) |
| **Approved submissions** | Row kept as audit trail | Files only — uploaded documents are purged from disk | After `kyc_approved_file_retention_days` (default **7**) |
| **Expired submissions** | Row kept as audit trail | Files already purged at approval retention | No further action — status just flips |

## Why approved rows are kept

Regulated verticals (finance, crypto, age-gated retail) usually require proof that a subject **was** verified at a given date, even if the documents themselves must be deleted. Keeping the row (with reviewer ID, review note, timestamps) satisfies audit requirements while still purging the raw documents.

If your jurisdiction requires full deletion of approved submissions too, you can hard-delete rows through a scheduled task or a manual admin action.

## Expiry (optional)

Some document types have an implicit expiry — e.g. a passport is only valid until its printed expiry date, an annual business licence expires yearly. You can store an `expires_at` timestamp on a submission and the plugin's nightly `kyc:expire` command flips approved rows whose `expires_at` has passed to status `expired`.

An expired subject loses `hasApprovedKyc()` status immediately, so any [gate](../integration/gates.md) re-blocks them until they resubmit.

## Scheduled commands

Both retention and expiry run through Artisan commands registered with Laravel's scheduler. See [Scheduled Commands](./commands.md) for the full list.

| Command | Schedule | What it does |
|---|---|---|
| `kyc:cleanup` | Daily at 02:00 | Two-pass: delete rejected row+files past retention, then purge approved files past retention |
| `kyc:expire` | Daily at 02:15 | Flip approved → expired when `expires_at` has passed |

The scheduler invokes them automatically as long as you have the standard Laravel cron entry in place:

```bash
* * * * * cd /var/www/site && php artisan schedule:run >> /dev/null 2>&1
```

## Manual runs

During development or incident response you can invoke the commands directly:

```bash
php artisan kyc:cleanup
php artisan kyc:expire
```

Both commands are idempotent and safe to run multiple times.

## Changing retention windows

Go to **Admin → KYC Verification → Settings** and adjust:

- **Rejected retention (days)** — 1 to 365
- **Approved file retention (days)** — 1 to 365

Changes take effect on the next scheduled run.

::: warning
Shortening the retention window does not retroactively delete submissions — it only affects future scheduled runs. The nightly command always uses the current setting.
:::

## Two-pass cleanup explained

The `kyc:cleanup` command runs two independent passes inside a single transaction:

1. **Pass 1 — Rejected:** select `kyc_submissions` where `status = rejected AND updated_at < now() - rejected_days`. For each match: delete files from disk, delete the row.
2. **Pass 2 — Approved files:** select `kyc_submissions` where `status = approved AND files_purged_at IS NULL AND reviewed_at < now() - approved_file_days`. For each match: delete files from disk, set `files_purged_at = now()`, keep the row.

Files are deleted via the configured storage disk (`config/kyc.php → storage.disk`), so S3, DigitalOcean Spaces, etc. work transparently.

## GDPR right to erasure

If a subject invokes their GDPR right to erasure, an admin can immediately delete all of their KYC rows and files through the admin panel (select all their submissions and use the bulk delete action). The `KycSubmission::deleting` model event ensures files on disk are purged whenever a row is deleted.

## Next step

- [Scheduled Commands](./commands.md) — cron schedule and manual invocations
- [GDPR Data Export](../integration/gdpr-export.md) — subject-facing JSON export
