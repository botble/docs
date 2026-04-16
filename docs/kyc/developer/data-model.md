---
title: Data Model
description: Database tables used by the KYC Verification plugin.
---

# Data Model

The plugin uses three tables. The first two are polymorphic so they can store data for any subject type defined in the registry.

## `kyc_submissions`

One row per submission. Created when the subject POSTs the form; subsequently updated for status transitions and reviewer metadata.

| Column | Type | Description |
|---|---|---|
| `id` | bigint | Primary key |
| `verifiable_type` | string(120) | FQN of the subject model (e.g. `Botble\Ecommerce\Models\Customer`) |
| `verifiable_id` | unsignedBigInteger | Primary key of the subject row |
| `submission_type` | string(32) | Registry subject key — `customer`, `vendor`, or any key registered via `SubjectRegistry` |
| `document_type` | string(80) | Enum value — `passport`, `national_id`, `business_license`, ... |
| `document_number` | string(120) \| null | Optional document number the subject typed into the form |
| `front_image` | char(32) \| null | 32-char hex token (stored filename with no extension, no path) |
| `front_image_name` | string(255) \| null | Slug-sanitised display name used in the download `Content-Disposition` header |
| `front_image_mime` | string(127) \| null | RFC-7231 media type |
| `back_image` | char(32) \| null | Same as front_image — only required for `national_id` / `driving_license` |
| `back_image_name` | string(255) \| null | |
| `back_image_mime` | string(127) \| null | |
| `selfie_image` | char(32) \| null | Optional selfie holding the document |
| `selfie_image_name` | string(255) \| null | |
| `selfie_image_mime` | string(127) \| null | |
| `additional_document` | char(32) \| null | Fourth optional slot (e.g. vendor supporting doc) |
| `additional_document_name` | string(255) \| null | |
| `additional_document_mime` | string(127) \| null | |
| `status` | string(20) | Enum value — `pending` / `approved` / `rejected` / `expired`. Default `pending` |
| `submitted_at` | timestamp \| null | When the subject POSTed the form |
| `reviewed_at` | timestamp \| null | When the admin acted on it |
| `reviewed_by` | foreignId (users) \| null | Admin user ID, `nullOnDelete` to preserve the audit trail |
| `review_note` | text \| null | Rejection reason or approval note |
| `expires_at` | date \| null | Optional expiry date used by `kyc:expire` |
| `ip_address` | string(45) \| null | IPv6-safe (RFC 4291 max = 45) |
| `user_agent` | string(500) \| null | Browser UA captured at submission |
| `created_at`, `updated_at` | timestamps | — |

**Indexes:**
- `(verifiable_type, verifiable_id, status)` — subject-side lookups
- `(status, submitted_at)` — admin review queue, ordered within a status bucket
- `(status, reviewed_at)` — retention cleanup scans
- `(submission_type, status)` — admin dual filter

## `kyc_subject_states`

Tracks the lockout counter for each subject. Created lazily on the first rejection.

| Column | Type | Description |
|---|---|---|
| `id` | bigint | Primary key |
| `subject_type` | string(120) | Polymorphic subject FQN — mirrors `kyc_submissions.verifiable_type` |
| `subject_id` | unsignedBigInteger | Subject PK |
| `submission_type` | string(32) | Registry subject key |
| `locked` | boolean | Lock flag, default `false`. Flipped true on auto-lock OR admin lock |
| `rejection_count` | unsignedInteger | Number of rejections since last unlock, default `0` |
| `locked_at` | timestamp \| null | Timestamp of the lock |
| `locked_by` | foreignId (users) \| null | Admin who triggered the lock; `null` = system auto-lock. `nullOnDelete` |
| `unlock_note` | text \| null | Admin unlock note, stored for audit |
| `created_at`, `updated_at` | timestamps | — |

**Unique index:** `(subject_type, subject_id, submission_type)` as `uq_kyc_subject_states` — one state row per subject per scope. Byte budget inside MySQL's 1000-byte cap: `120×4 + 8 + 32×4 = 616` bytes.

## `bb_kyc_webhooks`

Outgoing webhook endpoints managed via **Admin → KYC Verification → Webhooks**. Table is prefixed `bb_` to isolate from any pre-existing `kyc_webhooks` table in custom apps.

| Column | Type | Description |
|---|---|---|
| `id` | bigint | Primary key |
| `name` | string(120) | Human-readable label |
| `url` | string(500) | HTTPS endpoint URL |
| `secret` | string(255) \| null | HMAC-SHA256 signing secret. When null, the `X-Kyc-Signature` header is omitted |
| `events` | json \| null | Array subset of `[kyc.submitted, kyc.approved, kyc.rejected, kyc.expired]` — only matching events are delivered |
| `is_enabled` | boolean | Disable without deleting; default `true` |
| `created_at`, `updated_at` | timestamps | — |

## Relationships

```
Customer (Ecommerce)           Store (Marketplace)
    │                                │
    │ morphMany via                  │ morphMany via
    │ kycSubmissions() macro         │ kycSubmissions() macro
    ▼                                ▼
         kyc_submissions
                │
                │ status transitions drive rejection_count bumps
                ▼
         kyc_subject_states  ←── unique per (subject, subject type)
```

Both macros are added at runtime — neither `Customer` nor `Store` has a file-level model modification.

## File storage layout

Files live on the configured disk at:

```
{disk_root}/private/kyc/
├── {subjectHash}/
│   ├── 32-char-hex-token           ← front_image (no extension, no filename)
│   ├── 32-char-hex-token           ← back_image
│   └── 32-char-hex-token           ← selfie_image / additional_document
├── {subjectHash}/
│   └── ...
```

- `subjectHash = sha1("{morphClass}|{id}")` truncated to **40 chars** — deterministic per subject, non-enumerable, not stored as a DB column.
- Filenames are 32-char hex tokens generated per file. They are stored in `{field}` columns on `kyc_submissions`, not on disk with the original name.
- The original filename is stored in `{field}_name` (slug-sanitised, used only for `Content-Disposition`). The MIME type is stored in `{field}_mime`.
- `KycSubmissionStorage` refuses any path containing `..` or not rooted under `private/kyc/` — traversal is impossible.

On the default `local` disk this resolves to `storage/app/private/kyc/{subjectHash}/{token}`. If `config/kyc.php → storage.disk` is set to a remote disk (S3, DigitalOcean Spaces), the same relative layout is used on that disk.

## Migration safety

All three migrations are idempotent — `Schema::hasTable()` guards wrap `Schema::create()` so you can deactivate and re-activate the plugin without dropping data.

## Next step

- [Routes Reference](./routes.md) — full route list
- [Events & Hooks](./events.md) — how data changes propagate
