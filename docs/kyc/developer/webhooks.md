---
title: Webhook Schema
description: HMAC-signed outgoing webhook payload and signature verification reference.
---

# Webhook Schema

When one or more webhook endpoints are configured in **Admin → KYC Verification → Webhooks**, the plugin POSTs a JSON payload on every lifecycle event the endpoint subscribes to. Each payload is signed with HMAC-SHA256 so your receiver can verify it wasn't tampered with.

## Supported events

The plugin exposes four event names in the webhook admin UI. Each webhook endpoint can subscribe to any subset.

| Event | Fired when |
|---|---|
| `kyc.submitted` | A subject POSTs a new submission |
| `kyc.approved` | An admin approves a submission |
| `kyc.rejected` | An admin rejects or unverifies a submission |
| `kyc.expired` | The nightly `kyc:expire` command flips an approved submission to expired |

## Headers

| Header | Example | Purpose |
|---|---|---|
| `Content-Type` | `application/json` | — |
| `X-Kyc-Event` | `kyc.approved` | The lifecycle event name — lets the receiver dispatch without parsing the body |
| `X-Kyc-Timestamp` | `2026-04-15T09:32:11+00:00` | ISO 8601 timestamp of when the payload was built |
| `X-Kyc-Signature` | `sha256=<hex>` | HMAC-SHA256 of the raw request body, keyed on the endpoint's `secret`. Only present when the endpoint has a secret configured |

## Payload

```json
{
  "event": "kyc.approved",
  "submission_id": 42,
  "verifiable_type": "Botble\\Ecommerce\\Models\\Customer",
  "verifiable_id": 123,
  "submission_type": "customer",
  "document_type": "passport",
  "status": "approved",
  "submitted_at": "2026-04-14T09:32:11+00:00",
  "reviewed_at": "2026-04-14T10:15:04+00:00",
  "timestamp": "2026-04-14T10:15:04+00:00"
}
```

### Field reference

| Field | Type | Description |
|---|---|---|
| `event` | string | One of `kyc.submitted`, `kyc.approved`, `kyc.rejected`, `kyc.expired` |
| `submission_id` | int | Primary key of the `kyc_submissions` row |
| `verifiable_type` | string | Fully-qualified subject model class name |
| `verifiable_id` | int | Subject model primary key |
| `submission_type` | string | Registry key — `customer`, `vendor`, etc. |
| `document_type` | string | One of the `KycDocumentTypeEnum` values (`passport`, `national_id`, `business_license`, ...) |
| `status` | string | The submission's status after the event — `pending`, `approved`, `rejected`, `expired` |
| `submitted_at` | ISO 8601 \| null | When the submission was created |
| `reviewed_at` | ISO 8601 \| null | When the admin reviewed; null for `kyc.submitted` and for `kyc.expired` rows that were never re-reviewed |
| `timestamp` | ISO 8601 | When this specific webhook payload was built |

## Signature verification

### PHP

```php
$body      = file_get_contents('php://input');
$header    = $_SERVER['HTTP_X_KYC_SIGNATURE'] ?? '';
$expected  = 'sha256=' . hash_hmac('sha256', $body, $secret);

if (! hash_equals($expected, $header)) {
    http_response_code(401);
    exit;
}

// Signature OK — parse and act
$payload = json_decode($body, true);
```

### Node.js

```js
const crypto = require('crypto');

function verifyKycSignature(rawBody, headerValue, secret) {
    const expected = 'sha256=' + crypto
        .createHmac('sha256', secret)
        .update(rawBody)
        .digest('hex');
    return crypto.timingSafeEqual(
        Buffer.from(expected),
        Buffer.from(headerValue)
    );
}
```

### Python

```python
import hmac, hashlib

def verify_kyc_signature(raw_body: bytes, header_value: str, secret: str) -> bool:
    expected = 'sha256=' + hmac.new(
        secret.encode(),
        raw_body,
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, header_value)
```

::: warning
Always use a timing-safe comparison (`hash_equals` / `timingSafeEqual` / `hmac.compare_digest`). Plain `==` is vulnerable to timing attacks.
:::

::: tip
Hash the **raw** request body — never parse and re-serialise. Any whitespace normalisation will break the signature.
:::

## Delivery

- **Async dispatch** — webhooks are queued via `DispatchKycWebhookJob` on the `kyc` queue, so the subject's HTTP request never blocks on webhook delivery.
- **Retries** — 3 attempts with a 60-second backoff per attempt.
- **Timeout** — 10 seconds per HTTP request.
- **Failures** — logged to `storage/logs/laravel.log` under the default channel.
- **Only enabled endpoints fire** — webhooks with `is_enabled = false` are skipped.
- **Per-event subscription** — each endpoint only receives the subset of events it has opted into via the admin UI.

Make sure a queue worker is running so webhooks actually get delivered:

```bash
php artisan queue:work --queue=kyc,default --tries=3 --timeout=60
```

## Multi-endpoint management

From **Admin → KYC Verification → Webhooks** you can create multiple named webhook endpoints. Each endpoint has:

- **Name** — human-readable label
- **URL** — HTTPS target
- **Secret** — optional HMAC signing key (the `X-Kyc-Signature` header is only sent when a secret is set)
- **Events** — subset of `[kyc.submitted, kyc.approved, kyc.rejected, kyc.expired]`
- **Enabled flag** — `is_enabled` column, toggle on/off without deleting

Use this when you need different downstream systems to receive different subsets of events — for example, your CRM only cares about `kyc.approved` while your compliance dashboard wants all four.

## Testing webhooks locally

Use a tunnelling tool such as [ngrok](https://ngrok.com/) or [Expose](https://expose.dev/):

```bash
ngrok http 8000
```

Then set the webhook URL in the admin page to the ngrok HTTPS URL and trigger a submission.

From the admin **Webhooks** page you can also click **Send test payload** on any endpoint to POST a synthetic `kyc.submitted` (or the first subscribed event) payload — this runs synchronously so you immediately see the HTTP status and error message in the UI.

## Next step

- [Events & Hooks](./events.md) — Laravel event counterparts
- [Translations](./translations.md) — localise webhook event labels
