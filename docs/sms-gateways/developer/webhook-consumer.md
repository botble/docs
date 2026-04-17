---
title: Webhook Consumer
description: Receive and process outbound webhooks from SMS Gateways.
---

# Webhook Consumer

Handle real-time SMS delivery notifications by setting up a webhook consumer endpoint.

## Setting up your endpoint

Create a controller to receive webhooks:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SmsWebhookController extends Controller
{
    public function handle(Request $request): Response
    {
        // 1. Verify HMAC signature
        $secret = 'your-webhook-secret'; // from SMS Gateways settings
        $signature = $request->header('X-SmsGateways-Signature');
        $rawBody = $request->getContent();

        $expected = 'sha256=' . hash_hmac('sha256', $rawBody, $secret);

        if (! hash_equals($expected, $signature)) {
            return response('Unauthorized', 401);
        }

        // 2. Parse payload
        $payload = $request->json()->all();
        $event = $payload['event'] ?? null;

        // 3. Process event
        match ($event) {
            'sms.queued' => $this->handleQueued($payload),
            'sms.sent' => $this->handleSent($payload),
            'sms.delivered' => $this->handleDelivered($payload),
            'sms.failed' => $this->handleFailed($payload),
            'sms.opted_out' => $this->handleOptedOut($payload),
            'otp.verified' => $this->handleOtpVerified($payload),
            default => null,
        };

        // 4. Return 200 OK
        return response('OK', 200);
    }

    private function handleQueued(array $payload): void
    {
        // SMS accepted, waiting to send
        // $payload = ['event' => 'sms.queued', 'sms_id' => 'uuid', 'to' => '+1-555-1234', ...]
        
        // Log to database
        DB::table('sms_webhooks_log')->insert([
            'event' => 'sms.queued',
            'sms_id' => $payload['sms_id'],
            'phone' => $payload['to'],
            'received_at' => now(),
        ]);
    }

    private function handleSent(array $payload): void
    {
        // SMS sent to provider
        // $payload = ['event' => 'sms.sent', 'sms_id' => 'uuid', 'to' => '+1-555-1234', 'provider_id' => 'msg_123', ...]
        
        // Update order status, dashboard, etc.
        Order::where('sms_id', $payload['sms_id'])->update(['sms_status' => 'sent']);
    }

    private function handleDelivered(array $payload): void
    {
        // SMS confirmed delivered to phone
        Order::where('sms_id', $payload['sms_id'])->update(['sms_status' => 'delivered']);
    }

    private function handleFailed(array $payload): void
    {
        // SMS delivery failed
        // $payload = [..., 'error' => 'Invalid phone number', ...]
        
        Order::where('sms_id', $payload['sms_id'])->update([
            'sms_status' => 'failed',
            'sms_error' => $payload['error'],
        ]);
        
        // Alert admin
        Log::error('SMS delivery failed', $payload);
    }

    private function handleOptedOut(array $payload): void
    {
        // Customer opted out
        Customer::where('phone', $payload['to'])->update(['sms_opted_out' => true]);
    }

    private function handleOtpVerified(array $payload): void
    {
        // OTP code was verified
        Customer::where('phone', $payload['phone'])->update(['phone_verified_at' => now()]);
    }
}
```

## Register the webhook route

In `routes/web.php`:

```php
Route::post('/webhooks/sms', [SmsWebhookController::class, 'handle'])->name('webhook.sms');
```

## Configure webhook in SMS Gateways

1. Go to **Admin → SMS Gateways → Webhooks**
2. Click **Add new**
3. Enter:
   - **Name**: `My Webhook`
   - **URL**: `https://yoursite.com/webhooks/sms`
   - **Secret**: Generate a random string (e.g., `sha256=...`)
   - **Active**: Toggle ON
4. Copy the secret and paste it in your controller's `$secret` variable
5. Click **Save**

## Verify webhook signature (PHP)

Always verify the HMAC signature to ensure the webhook came from SMS Gateways:

```php
$secret = 'your-webhook-secret';
$signature = $request->header('X-SmsGateways-Signature');
$rawBody = $request->getContent(); // NOT $request->all()

// Compute expected signature
$expected = 'sha256=' . hash_hmac('sha256', $rawBody, $secret);

// Compare safely (timing-safe comparison)
if (! hash_equals($expected, $signature)) {
    return response('Unauthorized', 401);
}
```

## Webhook payload examples

### SMS Queued

```json
{
  "event": "sms.queued",
  "sms_id": "550e8400-e29b-41d4-a716-446655440000",
  "to": "+1-555-1234",
  "from": "MyBrand",
  "subject": "ecommerce",
  "template": "order.confirmation",
  "queued_at": "2025-01-15T10:30:00Z",
  "timestamp": "2025-01-15T10:30:01Z"
}
```

### SMS Delivered

```json
{
  "event": "sms.delivered",
  "sms_id": "550e8400-e29b-41d4-a716-446655440000",
  "to": "+1-555-1234",
  "delivered_at": "2025-01-15T10:30:05Z",
  "timestamp": "2025-01-15T10:30:06Z"
}
```

### SMS Failed

```json
{
  "event": "sms.failed",
  "sms_id": "550e8400-e29b-41d4-a716-446655440000",
  "to": "+1-555-1234",
  "error": "Invalid phone number",
  "error_code": "21614",
  "timestamp": "2025-01-15T10:30:05Z"
}
```

### OTP Verified

```json
{
  "event": "otp.verified",
  "phone": "+1-555-1234",
  "verified_at": "2025-01-15T10:30:05Z",
  "timestamp": "2025-01-15T10:30:06Z"
}
```

## Webhook failure handling

If your endpoint returns non-2xx or times out, the dispatcher job (`DispatchSmsWebhookJob`) retries up to 3 times with a 60-second backoff between attempts. After 3 failures the job is dead-lettered to Laravel's `failed_jobs` table — inspect with `php artisan queue:failed`.

## Testing webhooks

1. Go to **Admin → SMS Gateways → Webhooks**
2. Click your webhook
3. Click **Send test webhook**
4. Choose an event type
5. Click **Send**

Your endpoint will receive a test POST with a real HMAC signature. Check your server logs to verify receipt.

## Best practices

1. **Always verify signatures** — Never trust webhooks without HMAC verification
2. **Use raw body** — Don't use `$request->all()` or parsed JSON; use `$request->getContent()`
3. **Handle idempotently** — Process the same webhook twice without side effects (use `sms_id` as unique key)
4. **Respond quickly** — Return 200 OK immediately, process asynchronously if needed
5. **Log everything** — Log all webhooks for debugging and compliance

## Next step

See [Custom Driver](./custom-driver.md) to build a custom SMS provider.
