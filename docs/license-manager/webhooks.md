# Webhooks

Webhooks allow you to receive real-time notifications when license events occur. Configure an endpoint to receive HTTP POST requests with event data.

## Configuration

### Enable Webhooks

1. Go to **License Manager → Settings → General**
2. Enable **Webhooks**
3. Enter your **Webhook URL**
4. Optionally set a **Webhook Secret** for signature verification
5. Save settings

### Settings

| Setting | Description |
|---------|-------------|
| Enable Webhooks | Turn webhook notifications on/off |
| Webhook URL | The endpoint URL on **your server** that will receive webhook HTTP POST requests (e.g., `https://yourapp.com/api/license-webhook`) |
| Webhook Secret | A shared secret key used to sign payloads with HMAC-SHA256 for authenticity verification (optional but recommended) |

### Webhook URL

The **Webhook URL** is the endpoint on your external server where License Manager sends HTTP POST requests when license events occur. This is a "push" notification system — instead of your application polling License Manager for changes, License Manager proactively notifies your server.

**Requirements:**
- Must be a publicly accessible HTTPS URL
- Must accept POST requests with JSON body
- Must respond within 10 seconds
- Should return HTTP 2xx status code on success

**Example URLs:**
- `https://yourapp.com/api/webhooks/license-manager`
- `https://api.yourcompany.com/webhooks/licenses`

**Common use cases:**
- Sync license status to your own database or CRM
- Send custom email notifications when licenses expire
- Update billing/subscription systems
- Trigger automated workflows (e.g., Slack alerts, Zapier integrations)

### Webhook Secret

The **Webhook Secret** is an optional (but strongly recommended) shared secret key that License Manager uses to **sign** each webhook payload. This lets your receiving server verify that the request genuinely came from License Manager and hasn't been tampered with.

**How it works:**

1. You set a secret string in License Manager settings (e.g., `my-super-secret-key-123`)
2. On every webhook dispatch, License Manager computes an HMAC-SHA256 signature over the JSON payload using this secret
3. The signature is sent in the `X-Webhook-Signature` HTTP header
4. Your server re-computes the same HMAC-SHA256 hash using the same secret and compares it — if they match, the request is authentic

**Choosing a secret:**
- Use a long, random string (32+ characters recommended)
- You can generate one with: `openssl rand -hex 32`
- Store it securely on both License Manager and your receiving server
- Rotate periodically by updating both sides simultaneously

::: warning
Without a webhook secret, anyone who discovers your webhook URL could send fake events to your server. Always configure a secret in production.
:::

## When Are Webhooks Triggered?

Webhooks are dispatched during the daily cron job that processes license expirations. They are **not** triggered in real-time when a license is created or modified in the admin panel.

**Trigger flow:**
1. The cronjob runs: `php artisan cms:license-manager:process-expirations`
2. It checks for licenses that are expiring soon, already expired, or have expired update support
3. For each matching license, a webhook is sent to your configured URL

::: tip
You can also trigger the command manually to test webhooks. See [Testing Webhooks](#testing-webhooks) below.
:::

## Event Types

### License Events

| Event | Description |
|-------|-------------|
| `license.expiring` | License approaching expiration (based on configured warning days) |
| `license.expired` | License has expired |
| `license.update_support_expired` | Update support period ended |

## Webhook Payload

All webhooks send a JSON payload with this structure:

```json
{
  "event_type": "license.expiring",
  "timestamp": "2024-01-15T10:30:00+00:00",
  "payload": {
    "license_code": "LIC-ABC-123",
    "product_reference_id": "My Product",
    "product_id": "PROD-001",
    "customer": 42,
    "email": "customer@example.com",
    "expires_at": "2024-01-22",
    "days_until_expiry": 7
  }
}
```

### Payload Fields

| Field | Type | Description |
|-------|------|-------------|
| `event_type` | string | The event name (e.g., `license.expiring`) |
| `timestamp` | string | ISO 8601 timestamp when the webhook was dispatched |
| `payload.license_code` | string | The license code |
| `payload.product_reference_id` | string | The product **name** (for display purposes) |
| `payload.product_id` | string | The product **reference ID** (unique identifier) |
| `payload.customer` | int | The customer ID |
| `payload.email` | string | The customer's email address |
| `payload.expires_at` | string | License expiration date (YYYY-MM-DD format) |
| `payload.is_valid` | boolean | Whether the license is currently valid (on `expired` and `update_support_expired` events) |
| `payload.days_until_expiry` | int | Days until license expires (only on `expiring` events) |

::: tip
Note: `product_id` contains the product reference ID, while `product_reference_id` contains the product name for display purposes.
:::

## Request Headers

Each webhook request includes:

```
Content-Type: application/json
X-Webhook-Event: license.expiring
X-Webhook-Signature: abc123def456... (if secret configured)
```

::: tip
The signature is a raw HMAC-SHA256 hex digest without a `sha256=` prefix.
:::

## Signature Verification

When a webhook secret is configured, verify requests using the `X-Webhook-Signature` header:

### PHP Example

```php
function verifyWebhookSignature($payload, $signature, $secret): bool
{
    $expected = hash_hmac('sha256', $payload, $secret);
    return hash_equals($expected, $signature);
}

// In your webhook handler
$payload = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_WEBHOOK_SIGNATURE'] ?? '';
$secret = 'your-webhook-secret';

if (!verifyWebhookSignature($payload, $signature, $secret)) {
    http_response_code(401);
    exit('Invalid signature');
}

$data = json_decode($payload, true);
// Process the webhook...
```

### Node.js Example

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
    const expected = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');
    return crypto.timingSafeEqual(
        Buffer.from(expected),
        Buffer.from(signature || '')
    );
}

// In your Express handler
app.post('/webhook', (req, res) => {
    const signature = req.headers['x-webhook-signature'];
    const secret = 'your-webhook-secret';

    if (!verifyWebhookSignature(req.rawBody, signature, secret)) {
        return res.status(401).send('Invalid signature');
    }

    const data = req.body;
    // Process the webhook...
    res.status(200).send('OK');
});
```

### Python Example

```python
import hmac
import hashlib

def verify_webhook_signature(payload: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode(), payload, hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)
```

## Event Details

### license.expiring

Triggered when a license is approaching expiration (based on the **Expiration Warning Days** setting, e.g., `7,1` means warnings at 7 days and 1 day before expiry).

```json
{
  "event_type": "license.expiring",
  "timestamp": "2024-01-15T10:30:00+00:00",
  "payload": {
    "license_code": "LIC-ABC-123",
    "product_reference_id": "My Product",
    "product_id": "PROD-001",
    "customer": 42,
    "email": "customer@example.com",
    "expires_at": "2024-01-22",
    "days_until_expiry": 7
  }
}
```

### license.expired

Triggered when a license expires.

```json
{
  "event_type": "license.expired",
  "timestamp": "2024-01-15T10:30:00+00:00",
  "payload": {
    "license_code": "LIC-ABC-123",
    "product_reference_id": "My Product",
    "product_id": "PROD-001",
    "customer": 42,
    "email": "customer@example.com",
    "expires_at": "2024-01-15",
    "is_valid": false
  }
}
```

### license.update_support_expired

Triggered when update support period ends.

```json
{
  "event_type": "license.update_support_expired",
  "timestamp": "2024-01-15T10:30:00+00:00",
  "payload": {
    "license_code": "LIC-ABC-123",
    "product_reference_id": "My Product",
    "product_id": "PROD-001",
    "customer": 42,
    "email": "customer@example.com",
    "expires_at": "2024-01-15",
    "is_valid": true
  }
}
```

## Retry Policy

If your endpoint fails to respond or returns a server error:

| Attempt | Delay After Failure |
|---------|---------------------|
| 1st | Immediate |
| 2nd | 1 second |
| 3rd | 2 seconds |

After 3 failed attempts, the webhook is marked as failed and logged in the activity log.

### Expected Response

Your endpoint should return:
- **HTTP 200-299**: Success, webhook processed
- **Any other status**: Failure, will retry (up to 3 attempts)

### Timeout

Webhooks timeout after **10 seconds**. Ensure your endpoint responds quickly. If you need to do heavy processing, acknowledge the webhook immediately with HTTP 200 and process the data asynchronously (e.g., via a queue).

## Activity Logging

Every webhook dispatch attempt is recorded in the **Activity Logs** (License Manager → Activity Logs):

```
Webhook license.expiring succeeded for license LIC-ABC-123 (My Product).
Webhook license.expired failed for license LIC-DEF-456 (Another Product).
```

Use these logs to monitor webhook delivery and troubleshoot failures.

## Testing Webhooks

### Using ngrok

For local development:

```bash
# Install ngrok
brew install ngrok

# Expose local server
ngrok http 8000

# Use ngrok URL as webhook endpoint
# https://abc123.ngrok.io/webhook
```

### Using RequestBin

1. Go to [requestbin.com](https://requestbin.com)
2. Create a new bin
3. Use the bin URL as webhook endpoint
4. Trigger events to see payloads

### Manual Trigger

Run the cron command to trigger expiration webhooks:

```bash
php artisan cms:license-manager:process-expirations
```

This will process all licenses and dispatch webhooks for any that match the expiring/expired criteria.

## Webhook Receiver Example

### Laravel Controller

```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WebhookController extends Controller
{
    public function handle(Request $request)
    {
        // Verify signature
        $signature = $request->header('X-Webhook-Signature');
        $payload = $request->getContent();

        if (!$this->verifySignature($payload, $signature)) {
            return response('Invalid signature', 401);
        }

        $eventType = $request->input('event_type');
        $data = $request->input('payload');

        match ($eventType) {
            'license.expiring' => $this->handleExpiring($data),
            'license.expired' => $this->handleExpired($data),
            'license.update_support_expired' => $this->handleUpdateExpired($data),
            default => null,
        };

        return response('OK', 200);
    }

    private function handleExpiring(array $data): void
    {
        // Send reminder email
        // Update CRM
        // Notify sales team
    }

    private function handleExpired(array $data): void
    {
        // Mark subscription as inactive
        // Send renewal offer
        // Update analytics
    }

    private function handleUpdateExpired(array $data): void
    {
        // Notify customer about renewal
        // Offer upgrade options
    }

    private function verifySignature(string $payload, ?string $signature): bool
    {
        if (!$signature) {
            return config('services.license_manager.require_signature') === false;
        }

        $secret = config('services.license_manager.webhook_secret');
        $expected = hash_hmac('sha256', $payload, $secret);

        return hash_equals($expected, $signature);
    }
}
```

### Express.js Handler

```javascript
const express = require('express');
const crypto = require('crypto');
const app = express();

// Capture raw body for signature verification
app.use('/webhook', express.raw({ type: 'application/json' }));

app.post('/webhook', (req, res) => {
    const signature = req.headers['x-webhook-signature'];
    const secret = process.env.WEBHOOK_SECRET;

    // Verify signature
    const expected = crypto
        .createHmac('sha256', secret)
        .update(req.body)
        .digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature || ''))) {
        return res.status(401).send('Invalid signature');
    }

    const data = JSON.parse(req.body);
    const { event_type, payload } = data;

    switch (event_type) {
        case 'license.expiring':
            handleExpiring(payload);
            break;
        case 'license.expired':
            handleExpired(payload);
            break;
        case 'license.update_support_expired':
            handleUpdateExpired(payload);
            break;
    }

    res.status(200).send('OK');
});

function handleExpiring(payload) {
    console.log(`License ${payload.license_code} expiring in ${payload.days_until_expiry} days`);
    // Send notification, update CRM, etc.
}
```

## Customizing Webhook Payloads

You can modify webhook payloads using the `lm_webhook_payload` filter hook:

```php
add_filter('lm_webhook_payload', function (array $payload, string $eventType) {
    // Add custom data to the payload
    $payload['custom_field'] = 'custom_value';

    return $payload;
}, 20, 2);
```

## Best Practices

1. **Always Verify Signatures**: Protect against spoofed requests
2. **Respond Quickly**: Return 200 immediately, process async if needed
3. **Handle Duplicates**: Same event may be sent multiple times
4. **Log Everything**: Keep records for debugging
5. **Use HTTPS**: Secure your webhook endpoint
6. **Monitor Failures**: Check Activity Logs for repeated webhook failures
7. **Idempotent Handlers**: Process same event multiple times safely
8. **Use a Queue**: For heavy processing, queue the work and respond immediately
