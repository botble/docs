---
title: Hooks & Events
description: SMS hooks for extending the plugin's behavior.
---

# Hooks & Events

Extend SMS Gateways by hooking into SMS lifecycle events.

## Available hooks

### sms_before_send

Fires before an SMS is sent. Use to modify the message or phone number.

```php
add_filter('sms_before_send', function (array $data) {
    // $data = [
    //     'phone' => '+1-555-1234',
    //     'body' => 'Your order #123 is shipped',
    //     'subject' => 'ecommerce',
    //     'template_name' => 'order.shipped',
    // ]
    
    // Modify phone or body
    $data['body'] = strtoupper($data['body']);
    
    return $data;
});
```

**When it fires**: Just before SMS is queued

**Use cases**:
- Add branding to SMS text
- Normalize phone numbers
- Log SMS for audit purposes

### sms_after_send

Fires after SMS is sent successfully.

```php
add_filter('sms_after_send', function (array $data) {
    // $data = [
    //     'phone' => '+1-555-1234',
    //     'body' => 'Your order #123 is shipped',
    //     'status' => 'sent', // or 'failed'
    //     'log_id' => 'uuid',
    //     'provider_id' => 'msg_12345', // provider's message ID
    //     'error' => null, // error message if failed
    // ]
    
    // Log to external system
    Log::info('SMS sent', ['data' => $data]);
    
    return $data;
});
```

**When it fires**: After SMS is sent (success or failure)

**Use cases**:
- Log to external CRM
- Update custom database tables
- Trigger downstream processes

### sms_template_variables

Customize template variables before rendering.

```php
add_filter('sms_template_variables', function (array $variables, string $subject) {
    if ($subject === 'ecommerce') {
        $variables['custom_field'] = 'custom value';
    }
    
    return $variables;
}, 10, 2);
```

**When it fires**: When rendering SMS template variables

**Use cases**:
- Add custom variables to templates
- Override existing variables

### smsg_driver_register

Register a custom SMS driver.

```php
add_filter('smsg_driver_register', function () {
    return new MyCustomDriver();
});
```

See [Custom Driver](./custom-driver.md) for details.

## Events (Laravel events)

If you prefer Laravel events over hooks, use:

```php
use Botble\SmsGateways\Events\SmsSending;
use Botble\SmsGateways\Events\SmsSent;

// Listen to SmsSending event
Event::listen(SmsSending::class, function (SmsSending $event) {
    $event->sms; // SMS data
    $event->preventDefault(); // Cancel SMS sending
});

// Listen to SmsSent event
Event::listen(SmsSent::class, function (SmsSent $event) {
    $event->log; // SMS log record
    $event->result; // SmsResult DTO
});
```

## OTP events

### otp_before_verify

Fires before OTP code is verified.

```php
add_filter('otp_before_verify', function (array $data) {
    // $data = ['phone' => '+1-555-1234', 'code' => '123456']
    return $data;
});
```

### otp_after_verify

Fires after OTP is verified successfully.

```php
add_filter('otp_after_verify', function (array $data) {
    // $data = ['phone' => '+1-555-1234', 'verified' => true]
    return $data;
});
```

## Consent hooks

### consent_changed

Fires when a customer's SMS consent status changes.

```php
add_filter('consent_changed', function (array $data) {
    // $data = [
    //     'phone' => '+1-555-1234',
    //     'status' => 'opted_in', // or 'opted_out'
    //     'reason' => 'inbound', // 'inbound', 'admin', 'integration'
    // ]
    
    // Log to compliance system
    Log::info('Consent changed', $data);
    
    return $data;
});
```

## Webhook hooks

### sms_webhook_payload

Modify outbound webhook payload before sending.

```php
add_filter('sms_webhook_payload', function (array $payload) {
    // $payload = [
    //     'event' => 'sms.sent',
    //     'sms_id' => 'uuid',
    //     'to' => '+1-555-1234',
    //     ...
    // ]
    
    // Add custom fields
    $payload['custom_field'] = 'custom value';
    
    return $payload;
});
```

## Examples

### Log SMS to Slack

```php
add_filter('sms_after_send', function (array $data) {
    if ($data['status'] === 'failed') {
        Notification::send(auth()->user(), new SmsSendFailed($data));
    }
    return $data;
});
```

### Sanitize phone numbers

```php
add_filter('sms_before_send', function (array $data) {
    // Remove all non-digits
    $data['phone'] = preg_replace('/\D/', '', $data['phone']);
    // Re-add country code if missing
    if (! str_starts_with($data['phone'], '+')) {
        $data['phone'] = '+1' . $data['phone'];
    }
    return $data;
});
```

### Sync SMS logs to external system

```php
add_filter('sms_after_send', function (array $data) {
    Http::post('https://analytics.example.com/sms', $data);
    return $data;
});
```

## Next step

See [Webhook Consumer](./webhook-consumer.md) to handle inbound webhooks.
