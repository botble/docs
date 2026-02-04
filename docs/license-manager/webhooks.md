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
| Webhook URL | Your endpoint to receive events |
| Webhook Secret | Secret key for HMAC signature (optional) |

## Event Types

### License Events

| Event | Description |
|-------|-------------|
| `license.expiring` | License approaching expiration |
| `license.expired` | License has expired |
| `license.update_support_expired` | Update support period ended |

## Webhook Payload

All webhooks send a JSON payload:

```json
{
  "event_type": "license.expiring",
  "timestamp": "2024-01-15T10:30:00Z",
  "payload": {
    "license_id": 123,
    "license_code": "LIC-ABC-123",
    "product_id": "PROD-001",
    "product_reference_id": "My Product",
    "customer_id": "CUST-001",
    "email": "customer@example.com",
    "expires_at": "2024-01-22T10:30:00Z",
    "days_until_expiry": 7
  }
}
```

::: tip
Note: `product_id` contains the product reference ID, while `product_reference_id` contains the product name for display purposes.
:::

## Request Headers

Each webhook request includes:

```
Content-Type: application/json
X-Webhook-Event: license.expiring
X-Webhook-Signature: abc123def456... (if secret configured)
User-Agent: LicenseManager-Webhook/1.0
```

::: tip
The signature is a raw HMAC-SHA256 hash without a `sha256=` prefix.
:::

## Signature Verification

When a webhook secret is configured, verify requests:

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

## Event Details

### license.expiring

Triggered when a license is approaching expiration (based on warning days setting).

```json
{
  "event_type": "license.expiring",
  "timestamp": "2024-01-15T10:30:00Z",
  "payload": {
    "license_id": 123,
    "license_code": "LIC-ABC-123",
    "product_id": "PROD-001",
    "product_reference_id": "My Product",
    "customer_id": "CUST-001",
    "email": "customer@example.com",
    "expires_at": "2024-01-22T10:30:00Z",
    "days_until_expiry": 7
  }
}
```

### license.expired

Triggered when a license expires.

```json
{
  "event_type": "license.expired",
  "timestamp": "2024-01-15T10:30:00Z",
  "payload": {
    "license_id": 123,
    "license_code": "LIC-ABC-123",
    "product_id": "PROD-001",
    "product_reference_id": "My Product",
    "customer_id": "CUST-001",
    "email": "customer@example.com",
    "expired_at": "2024-01-15T00:00:00Z"
  }
}
```

### license.update_support_expired

Triggered when update support period ends.

```json
{
  "event_type": "license.update_support_expired",
  "timestamp": "2024-01-15T10:30:00Z",
  "payload": {
    "license_id": 123,
    "license_code": "LIC-ABC-123",
    "product_id": "PROD-001",
    "product_reference_id": "My Product",
    "customer_id": "CUST-001",
    "email": "customer@example.com",
    "updates_until": "2024-01-15T00:00:00Z"
  }
}
```

## Retry Policy

If your endpoint fails to respond:

| Attempt | Delay |
|---------|-------|
| 1st | Immediate |
| 2nd | 1 second |
| 3rd | 2 seconds |
| 4th | 4 seconds |

After 3 retries, the webhook is abandoned and logged.

### Expected Response

Your endpoint should return:
- **HTTP 200-299**: Success, webhook processed
- **HTTP 4xx**: Client error, no retry
- **HTTP 5xx**: Server error, will retry

### Timeout

Webhooks timeout after **10 seconds**. Ensure your endpoint responds quickly.

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

## Best Practices

1. **Always Verify Signatures**: Protect against spoofed requests
2. **Respond Quickly**: Return 200 immediately, process async if needed
3. **Handle Duplicates**: Same event may be sent multiple times
4. **Log Everything**: Keep records for debugging
5. **Use HTTPS**: Secure your webhook endpoint
6. **Monitor Failures**: Alert on repeated webhook failures
7. **Idempotent Handlers**: Process same event multiple times safely
