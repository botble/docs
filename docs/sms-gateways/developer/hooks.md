---
title: Hooks & Events
description: Filter hooks, action hooks, and Laravel events emitted by SMS Gateways.
---

# Hooks & Events

Extend SMS Gateways by hooking into dispatch, template rendering, and lifecycle events.

## Filter hooks

### `smsg_driver_register`

Register a third-party driver factory. Called once on application boot.

```php
use Botble\SmsGateways\AbstractSmsDriver;
use Illuminate\Contracts\Foundation\Application;

add_filter('smsg_driver_register', function (array $drivers): array {
    $drivers['my_provider'] = fn (Application $app) => new MyProviderDriver();

    return $drivers;
});
```

**Signature:** `array $drivers → array`
**Fires in:** `SmsGatewaysServiceProvider::boot()`
**See also:** [Custom Driver](./custom-driver.md)

### `sms_before_send`

Inspect or rewrite the outbound message just before it hits the driver. Return `false` to cancel the send (the delivery log is flagged `rejected`).

```php
use Botble\SmsGateways\DTOs\SmsMessageRequest;
use Botble\SmsGateways\Models\SmsDeliveryLog;

add_filter('sms_before_send', function (SmsMessageRequest $request, SmsDeliveryLog $log) {
    // Rewrite body
    return new SmsMessageRequest(
        phone: $request->phone,
        body: '[BRAND] ' . $request->body,
        driver: $request->driver,
        event: $request->event,
        senderId: $request->senderId,
        metadata: $request->metadata,
        recipient: $request->recipient,
    );

    // ...or return false to cancel:
    // return false;
}, 10, 2);
```

**Signature:** `SmsMessageRequest $request, SmsDeliveryLog $log → SmsMessageRequest|false`
**Fires in:** `DispatchSmsJob::handle()`, `SmsDispatcher`

### `sms_template_variables`

Add or override variables available to the `TemplateRenderer` when a host event resolves.

```php
use Botble\SmsGateways\Supports\SmsSubjectDefinition;

add_filter('sms_template_variables', function (array $vars, $event, SmsSubjectDefinition $def) {
    if ($def->key === 'customer') {
        $vars['loyalty_points'] = $event->customer->loyalty_points ?? 0;
    }

    return $vars;
}, 10, 3);
```

**Signature:** `array $vars, object|null $event, SmsSubjectDefinition $def → array`
**Fires in:** `HandleHostEventListener::buildVariables()`

### `sms_resolve_recipient_{subject_key}`

Override recipient resolution for a subject. Useful when the host event doesn't expose the subject model directly.

```php
add_filter('sms_resolve_recipient_customer', function ($recipient, $event, $def) {
    return $recipient ?? $event->order?->customer;
}, 10, 3);
```

**Signature:** `Model|null $recipient, object $event, SmsSubjectDefinition $def → Model|null`
**Fires in:** `HandleHostEventListener::resolveRecipient()`

## Action hooks

### `sms_after_send`

Fires after every dispatch attempt — success, failure, or rejection. Inspect the log and driver response for analytics, Slack alerts, or CRM sync.

```php
use Botble\SmsGateways\Models\SmsDeliveryLog;
use Botble\SmsGateways\DTOs\SmsDriverResponse;

add_action('sms_after_send', function (SmsDeliveryLog $log, SmsDriverResponse $response) {
    if ($log->status === 'failed') {
        Log::warning('SMS send failed', [
            'event' => $log->event,
            'driver' => $log->driver,
            'phone' => $log->phone,
            'error' => $response->errorMessage,
        ]);
    }
}, 10, 2);
```

**Signature:** `SmsDeliveryLog $log, SmsDriverResponse $response`
**Fires in:** `DispatchSmsJob::handle()`, `SmsDispatcher`

## Laravel events

The plugin dispatches standard Laravel events from `Botble\SmsGateways\Events` — listen with `Event::listen()` or an `EventServiceProvider` mapping.

| Event | Fires when |
|---|---|
| `SmsQueued` | Delivery log created, job queued |
| `SmsSent` | Driver accepted the message |
| `SmsDelivered` | Inbound webhook reports delivery |
| `SmsFailed` | Driver rejected or threw |
| `SmsOptedOut` | Inbound STOP/HELP reply parsed |
| `OtpRequested` | Generic login OTP requested |
| `OtpCheckoutRequested` | Checkout OTP requested |
| `OtpOrderTrackingRequested` | Order-tracking OTP requested |
| `OtpJobApplyRequested` | Job-apply OTP requested |
| `OtpCarBookingRequested` | Car-booking OTP requested |
| `OtpHotelBookingRequested` | Hotel-booking OTP requested |
| `OtpConsultRequested` | Real-estate consult OTP requested |
| `OtpVerified` | OTP code verified successfully — triggers `otp.verified` webhook |
| `OptOutReceived` | Legacy alias; use `SmsOptedOut` |

Example:

```php
use Botble\SmsGateways\Events\OtpVerified;

Event::listen(OtpVerified::class, function (OtpVerified $event) {
    $event->phone;   // '+12025550001'
    $event->purpose; // 'login' | 'checkout' | ...
    $event->subject; // Customer | Vendor | Account model
});
```

## Examples

### Block SMS to a blacklist

```php
add_filter('sms_before_send', function ($request) {
    $blacklist = cache()->get('sms_blacklist', []);

    return in_array($request->phone, $blacklist, true) ? false : $request;
});
```

### Mirror all sends to Slack

```php
add_action('sms_after_send', function ($log) {
    if ($log->status === 'failed') {
        Http::post(env('SLACK_WEBHOOK'), [
            'text' => "SMS failed: {$log->event} → {$log->phone}: {$log->error_message}",
        ]);
    }
});
```

### Inject extra template variables

```php
add_filter('sms_template_variables', function (array $vars, $event, $def) {
    $vars['support_phone'] = setting('support_phone', '+1-800-000-0000');
    $vars['support_url'] = url('/support');

    return $vars;
}, 10, 3);
```

## Next step

See [Webhook Consumer](./webhook-consumer.md) to process outbound webhooks on the receiving end.
