---
title: Custom SMS Driver
description: Build a custom SMS driver by implementing the driver interface.
---

# Custom SMS Driver

Extend SMS Gateways with a custom SMS provider by implementing the driver contract.

## Driver interface

Every driver must implement `Botble\SmsGateways\Contracts\SmsDriver`:

```php
namespace Botble\SmsGateways\Contracts;

interface SmsDriver
{
    /**
     * Send an SMS message.
     *
     * @param string $phone Recipient phone number (e.g., "+1-555-1234")
     * @param string $body SMS message text
     * @return SmsResult Result with status, provider_id, error details
     */
    public function send(string $phone, string $body): SmsResult;

    /**
     * Get driver name (e.g., "my_provider").
     */
    public function getName(): string;

    /**
     * Get driver display name for admin UI.
     */
    public function getDisplayName(): string;

    /**
     * Get form fields for the admin settings page.
     */
    public function getFormFields(): array;

    /**
     * Validate and save configuration.
     */
    public function saveConfiguration(array $data): void;

    /**
     * Load configuration from storage.
     */
    public function loadConfiguration(): void;
}
```

## Example implementation

```php
<?php

namespace App\SmsGateway\Drivers;

use Botble\SmsGateways\Contracts\SmsDriver;
use Botble\SmsGateways\DTOs\SmsResult;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CustomSmsDriver implements SmsDriver
{
    private string $apiKey = '';
    private string $senderId = '';

    public function getName(): string
    {
        return 'custom_provider';
    }

    public function getDisplayName(): string
    {
        return 'Custom SMS Provider';
    }

    public function send(string $phone, string $body): SmsResult
    {
        try {
            $response = Http::post('https://api.custom-provider.com/send', [
                'api_key' => $this->apiKey,
                'to' => $phone,
                'from' => $this->senderId,
                'message' => $body,
            ]);

            if ($response->successful()) {
                return SmsResult::success(
                    providerMessageId: $response->json('message_id'),
                    phone: $phone,
                );
            }

            return SmsResult::failed(
                phone: $phone,
                error: $response->json('error', 'Unknown error'),
            );
        } catch (\Exception $e) {
            Log::error('Custom SMS driver error', ['exception' => $e]);
            return SmsResult::failed(
                phone: $phone,
                error: $e->getMessage(),
            );
        }
    }

    public function getFormFields(): array
    {
        return [
            [
                'name' => 'api_key',
                'label' => 'API Key',
                'type' => 'password',
                'required' => true,
            ],
            [
                'name' => 'sender_id',
                'label' => 'Sender ID',
                'type' => 'text',
                'required' => true,
                'placeholder' => 'e.g., MyBrand',
            ],
        ];
    }

    public function saveConfiguration(array $data): void
    {
        $this->apiKey = $data['api_key'] ?? '';
        $this->senderId = $data['sender_id'] ?? '';
        
        // Save to database or config file
        setting()->set([
            'sms_gateways_custom_provider_api_key' => $this->apiKey,
            'sms_gateways_custom_provider_sender_id' => $this->senderId,
        ]);
    }

    public function loadConfiguration(): void
    {
        $this->apiKey = setting('sms_gateways_custom_provider_api_key', '');
        $this->senderId = setting('sms_gateways_custom_provider_sender_id', '');
    }
}
```

## Register your driver

In your plugin or theme's service provider, register the driver:

```php
use Botble\SmsGateways\Facades\SmsGateway;
use App\SmsGateway\Drivers\CustomSmsDriver;

SmsGateway::registerDriver(new CustomSmsDriver());
```

Or use the `smsg_driver_register` filter:

```php
add_filter('smsg_driver_register', function () {
    return new CustomSmsDriver();
});
```

## Test your driver

1. Go to **Admin → Settings → SMS Gateways**
2. Your driver should appear in the **Active Drivers** list
3. Expand it and fill in the form fields
4. Click **Send test SMS** to verify
5. Check **Admin → SMS Gateways → Delivery Logs** for the result

## SmsResult DTO

Return `SmsResult` from the `send()` method:

```php
// Success
SmsResult::success(
    providerMessageId: 'msg_12345',
    phone: '+1-555-1234',
);

// Failed
SmsResult::failed(
    phone: '+1-555-1234',
    error: 'Invalid phone number',
);
```

## Handling delivery callbacks

If your SMS provider supports delivery confirmations (webhooks), implement:

```php
public function handleDeliveryCallback(Request $request): void
{
    $messageId = $request->input('message_id');
    $status = $request->input('status'); // delivered, failed, etc.
    
    $log = SmsLog::whereProviderMessageId($messageId)->firstOrFail();
    $log->update(['status' => $status]);
}
```

Then register the webhook route in your plugin's `routes.php`.

## Next step

See [Hooks](./hooks.md) for event hooks that trigger during SMS sending.
