---
title: GDPR Data Export
description: Customer self-service JSON export of their KYC data.
---

# GDPR Data Export

To help store operators comply with **GDPR Article 15 — Right of access**, the plugin ships a self-service JSON export endpoint. Customers (and vendors) can download a full record of their own KYC data at any time — no admin action required.

## What's in the export

The export is a single JSON file containing:

- `subject_type` and `subject_label` (the registry definition the export was generated for)
- `exported_at` ISO 8601 timestamp
- `lockout_state` — the `kyc_subject_states` row for this subject/scope, or `null` if none exists yet
- `submissions` — every `kyc_submissions` row belonging to the subject in this scope, each with:
  - `id`, `document_type`, `document_number`, `status`
  - `submitted_at`, `reviewed_at`, `expires_at`, `review_note`
  - `files` — keyed object with the uploaded fields (`front_image`, `back_image`, `selfie_image`, `additional_document`) each containing `filename`, `mime_type`, and a **signed download URL** (TTL = `config/kyc.php → storage.signed_url_ttl_minutes`, default 15)

The signed URL uses the same `kyc.file.show` route as the admin panel, so it is rate-limited, auth-guarded, and expires quickly. The JSON body itself does not include file contents — consumers must fetch each file through the signed URL before it expires.

## The route

```text
GET /account/kyc/{subjectKey}/export
Name: kyc.submission.export
```

Middleware stack: `web`, `customer`, `throttle:10,60`, `kyc.enabled`

**Parameters:**
- `subjectKey` — `customer` or `vendor`

**Rate limit:** 10 requests per hour per authenticated user.

## Adding a download link to your theme

Add to your theme's customer dashboard view:

```blade
@if (setting('kyc_customer_enabled'))
    <a href="{{ route('kyc.submission.export', ['subjectKey' => 'customer']) }}"
       class="btn btn-outline-secondary">
        {{ trans('plugins/kyc::kyc.export_my_data') }}
    </a>
@endif
```

For marketplace vendors, add the same link with `subjectKey=vendor` on the vendor dashboard.

## Response format

```json
{
  "exported_at": "2026-04-15T14:22:09+00:00",
  "subject_type": "customer",
  "subject_label": "Customer",
  "lockout_state": {
    "locked": false,
    "rejection_count": 1,
    "locked_at": null
  },
  "submissions": [
    {
      "id": 42,
      "document_type": "passport",
      "document_number": "AB1234567",
      "status": "approved",
      "submitted_at": "2026-04-10T09:32:11+00:00",
      "reviewed_at": "2026-04-10T10:15:04+00:00",
      "review_note": null,
      "expires_at": null,
      "files": {
        "front_image": {
          "filename": "passport-front.jpg",
          "mime_type": "image/jpeg",
          "url": "https://store.example.com/kyc/file/42/front_image?signature=..."
        }
      }
    }
  ]
}
```

The file is served with:

- `Content-Type: application/json`
- `Content-Disposition: attachment; filename="kyc-export-{subjectKey}-{YYYYMMDD-HHMMSS}.json"`
- `Cache-Control: private, no-store`

## Signed URLs in the export

The export includes short-lived (default 15-minute) signed URLs to each uploaded file. Those URLs route through `kyc.file.show`, so they are guarded by the same multi-guard auth + throttle that admin file previews use. If the JSON export is opened by someone who is NOT signed in as the subject OR an admin with the file permission, the URLs return 403.

::: warning
The signed URLs expire quickly, but during their validity window anyone who has the URL **and** an active session in the correct guard can fetch the file. Treat the JSON export as sensitive — don't forward it over unencrypted email.
:::

## Rate limiting

The 10-per-hour limit is intentionally generous for legitimate use but tight enough to prevent abuse (for example, a compromised account being used to scrape KYC data). If you need to increase or decrease the limit, edit `platform/plugins/kyc/routes/customer.php`:

```php
Route::get('kyc/{subjectKey}/export', [SubmissionController::class, 'export'])
    ->middleware(['throttle:10,60', 'kyc.enabled'])
    ->name('submission.export');
```

## Combined with GDPR erasure

GDPR Article 17 (right to erasure) is handled separately. Admins can delete all of a subject's KYC rows and files through the review queue — the `KycSubmission::deleting` model event purges files on disk whenever a row is deleted.

## Next step

- [Events & Hooks](../developer/events.md) — react to exports programmatically
- [Translations](../developer/translations.md) — customise the export link label
