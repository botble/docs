---
title: Outbound Webhooks
description: Real-time delivery notifications and webhook signature verification.
---

# Outbound Webhooks

Receive real-time notifications on SMS delivery status by configuring outbound webhook endpoints.

## Add a webhook endpoint

1. Go to **Admin → SMS Gateways → Webhooks**
2. Click **Add new**
3. Enter:
   - **Name**: Human-readable label (e.g., "Production webhook")
   - **URL**: Your HTTPS endpoint (e.g., `https://api.mysite.com/sms/webhook`)
   - **Secret**: Random string for HMAC signing (generate one or use a UUID)
   - **Active**: Toggle to enable/disable

4. Click **Save**

![Webhook configuration](./images/sms-webhooks-config.png)

## Webhook events

Your endpoint will receive POST requests for these 6 events:

| Event | When | Payload example |
|-------|------|---|
| `sms.queued` | SMS accepted by plugin, queued for sending | `{ "event": "sms.queued", "sms_id": "uuid", "to": "+1-555-1234", "driver": "twilio" }` |
| `sms.sent` | SMS sent to provider | `{ "event": "sms.sent", "sms_id": "uuid", "to": "+1-555-1234", "provider_id": "SMxxxxxx" }` |
| `sms.delivered` | Provider confirmed delivery to phone | `{ "event": "sms.delivered", "sms_id": "uuid", "to": "+1-555-1234" }` |
| `sms.failed` | Delivery failed | `{ "event": "sms.failed", "sms_id": "uuid", "to": "+1-555-1234", "error": "Invalid number" }` |
| `sms.opted_out` | SMS blocked (phone opted out) | `{ "event": "sms.opted_out", "sms_id": "uuid", "to": "+1-555-1234" }` |
| `otp.verified` | OTP code successfully verified | `{ "event": "otp.verified", "phone": "+1-555-1234", "timestamp": "2025-01-15T10:30:00Z" }` |

## Webhook payload format

All webhooks are POST requests with:

- **Content-Type**: `application/json`
- **Body**: JSON object with event data
- **Header `X-SmsGateways-Signature`**: HMAC-SHA256 signature

Example request:

```
POST /sms/webhook HTTP/1.1
Host: api.mysite.com
Content-Type: application/json
X-SmsGateways-Signature: sha256=abcdef0123456789...

{
  "event": "sms.sent",
  "sms_id": "550e8400-e29b-41d4-a716-446655440000",
  "to": "+1-555-1234",
  "from": "MyBrand",
  "driver": "twilio",
  "provider_id": "SMxxxxxxxxxxxxxxxxxxxxx",
  "sent_at": "2025-01-15T10:30:05Z",
  "timestamp": "2025-01-15T10:30:06Z"
}
```

## Verify webhook signatures

Always verify the `X-SmsGateways-Signature` header to ensure the webhook came from SMS Gateways (not a spoofed request).

**PHP example:**

```php
<?php

$secret = 'your-webhook-secret'; // from webhook settings
$signature = request()->header('X-SmsGateways-Signature');
$rawBody = file_get_contents('php://input');

// Verify HMAC-SHA256
$expected = 'sha256=' . hash_hmac('sha256', $rawBody, $secret);

if (! hash_equals($expected, $signature)) {
    abort(401, 'Invalid signature');
}

// Webhook is authentic, process it
$payload = json_decode($rawBody, true);
// ... handle $payload['event'], $payload['sms_id'], etc.
```

**Node.js example:**

```javascript
const crypto = require('crypto');

const secret = 'your-webhook-secret';
const signature = req.headers['x-smsgateways-signature'];
const rawBody = req.rawBody; // ensure body is not parsed yet

const expected = 'sha256=' + crypto
  .createHmac('sha256', secret)
  .update(rawBody)
  .digest('hex');

if (!crypto.timingSafeEqual(expected, signature)) {
  return res.status(401).send('Invalid signature');
}

// Webhook is authentic
const payload = JSON.parse(rawBody);
// ... handle payload.event, payload.sms_id, etc.
```

**Python example:**

```python
import hmac
import hashlib
import json

secret = 'your-webhook-secret'
signature = request.headers.get('X-SmsGateways-Signature')
raw_body = request.get_data()

expected = 'sha256=' + hmac.new(
    secret.encode(), raw_body, hashlib.sha256
).hexdigest()

if not hmac.compare_digest(expected, signature):
    return 'Invalid signature', 401

payload = json.loads(raw_body)
# ... handle payload['event'], payload['sms_id'], etc.
```

## Webhook response

Your endpoint should respond with HTTP **200 OK** within 10 seconds. Response body is ignored.

If your endpoint returns any non-2xx status or doesn't respond in time, `DispatchSmsWebhookJob` will retry up to 3 times with a 60-second backoff between attempts. After 3 failed attempts, the job is dead-lettered to `failed_jobs` — inspect with `php artisan queue:failed` or restart with `php artisan queue:retry all`.

## Testing webhooks

1. Go to **Admin → SMS Gateways → Webhooks**
2. Click the webhook entry
3. Click **Send test webhook**
4. Choose an event type (e.g., `sms.sent`)
5. Click **Send**

Your endpoint will receive a test POST with a real HMAC signature. Check your server logs to verify receipt.

## Webhook logs

Click a webhook entry to view:

- **Delivered webhooks**: timestamp, event, response status
- **Failed webhooks**: error message and retry count
- **Upcoming retries**: if a webhook failed and is queued for retry

## Disable a webhook

Toggle **Active** = OFF to stop sending webhooks without deleting it.

## Common use cases

### Real-time order status updates

Receive `sms.sent` and `sms.delivered` events to update your order dashboard in real-time.

### Compliance auditing

Log all 6 event types (including `sms.failed` and `sms.opted_out`) to an external compliance system for regulatory records.

### Billing / usage tracking

Parse `sms.sent` events to calculate SMS usage and bill customers accordingly.

### Error alerting

Subscribe to `sms.failed` events and send admin alerts when delivery fails for critical messages (e.g., password resets).

## Next step

See [Commands](./commands.md) for bulk operations and data import.
