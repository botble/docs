---
title: Custom SMS Driver
description: Register a third-party SMS provider by extending AbstractSmsDriver and wiring the smsg_driver_register filter hook.
---

# Custom SMS Driver

Extend SMS Gateways with a third-party provider by subclassing `Botble\SmsGateways\AbstractSmsDriver` and registering a factory through the `smsg_driver_register` filter hook.

## Contract

Every driver implements `Botble\SmsGateways\Contracts\SmsDriverContract`. The abstract base class `AbstractSmsDriver` wraps error catching, logging, and the `SmsDeliveryLog` write for you — subclasses only implement `performSend()`.

```php
abstract protected function performSend(SmsMessageRequest $request): SmsDriverResponse;
```

Additional methods you can override:

| Method | Default | When to override |
|---|---|---|
| `getKey(): string` | *required* | Snake-case identifier (e.g. `my_provider`) |
| `getName(): string` | *required* | Display name for admin UI |
| `getSettingForm(): FormAbstract` | throws | Return a `FormAbstract` with credential fields |
| `normalizePhoneNumber(string $phone): string` | identity | Convert to provider-expected format |
| `parseWebhook(Request $request): ?SmsStatusResult` | `null` | Map inbound delivery receipts |
| `verifySignature(Request $request, string $raw): bool` | `true` | Validate provider webhook HMAC |
| `supportsInboundReplies(): bool` | `false` | Enable inbound STOP/START parsing |
| `parseInboundReply(Request $request): ?array` | `null` | Return `['phone' => ..., 'keyword' => ..., 'body' => ...]` |

## DTOs

**`SmsMessageRequest`** — dispatched to your driver:

```php
final readonly class SmsMessageRequest
{
    public string $phone;
    public string $body;
    public string $driver;
    public ?string $event;      // e.g. 'order_placed', 'otp_login'
    public ?string $senderId;
    public array $metadata;
    public ?Model $recipient;   // Customer, Vendor, etc.
}
```

**`SmsDriverResponse`** — return from `performSend()`:

```php
final readonly class SmsDriverResponse
{
    public bool $accepted;
    public ?string $providerMessageId;
    public ?string $status;
    public ?float $cost;
    public ?string $currency;
    public array $rawResponse;
    public ?string $errorCode;
    public ?string $errorMessage;
}
```

## Example implementation

```php
<?php

namespace App\SmsDrivers;

use Botble\Base\Forms\FormAbstract;
use Botble\SmsGateways\AbstractSmsDriver;
use Botble\SmsGateways\DTOs\SmsDriverResponse;
use Botble\SmsGateways\DTOs\SmsMessageRequest;
use Illuminate\Support\Facades\Http;

class MyProviderDriver extends AbstractSmsDriver
{
    public function getKey(): string
    {
        return 'my_provider';
    }

    public function getName(): string
    {
        return 'My Provider';
    }

    public function getSettingForm(): FormAbstract
    {
        return app(MyProviderGatewayForm::class);
    }

    protected function performSend(SmsMessageRequest $request): SmsDriverResponse
    {
        $apiKey = setting('smsg_driver_my_provider_api_key');
        $senderId = setting('smsg_driver_my_provider_sender_id');

        $response = Http::asJson()
            ->timeout(15)
            ->post('https://api.myprovider.com/v1/sms', [
                'api_key' => $apiKey,
                'to' => $request->phone,
                'from' => $request->senderId ?? $senderId,
                'body' => $request->body,
            ]);

        if ($response->successful()) {
            return new SmsDriverResponse(
                accepted: true,
                providerMessageId: $response->json('message_id'),
                status: 'sent',
                cost: (float) $response->json('cost'),
                currency: 'USD',
                rawResponse: $response->json() ?? [],
            );
        }

        return new SmsDriverResponse(
            accepted: false,
            providerMessageId: null,
            status: 'failed',
            errorCode: (string) $response->status(),
            errorMessage: $response->json('error.message', 'Unknown provider error'),
            rawResponse: $response->json() ?? [],
        );
    }
}
```

::: tip
The base class's `send()` wraps `performSend()` with try/catch — any `Throwable` you throw is caught, logged as a `failed` delivery row, and converted to an error response. You don't need your own try/catch unless you want custom error mapping.
:::

## Form class

Mirror the built-in drivers by extending `Botble\Base\Forms\FormAbstract`:

```php
<?php

namespace App\Forms\Drivers;

use Botble\Base\Forms\FieldOptions\TextFieldOption;
use Botble\Base\Forms\FormAbstract;
use Botble\SmsGateways\Forms\Drivers\Traits\HasDriverFormFields;

class MyProviderGatewayForm extends FormAbstract
{
    use HasDriverFormFields;

    public function setup(): void
    {
        $this
            ->setUrl(route('sms-gateways.drivers.save', 'my_provider'))
            ->add('smsg_driver_my_provider_api_key', 'text', TextFieldOption::make()
                ->label(__('API Key'))
                ->value(setting('smsg_driver_my_provider_api_key'))
                ->required()
                ->toArray())
            ->add('smsg_driver_my_provider_sender_id', 'text', TextFieldOption::make()
                ->label(__('Sender ID'))
                ->value(setting('smsg_driver_my_provider_sender_id'))
                ->toArray());

        $this->addEnabledToggle('my_provider');
        $this->addSubmitButton();
    }
}
```

## Register via filter hook

Add the filter callback in any service provider's `boot()` method:

```php
use App\SmsDrivers\MyProviderDriver;
use Illuminate\Contracts\Foundation\Application;

public function boot(): void
{
    add_filter('smsg_driver_register', function (array $drivers): array {
        $drivers['my_provider'] = fn (Application $app) => new MyProviderDriver();

        return $drivers;
    });
}
```

The factory receives the Laravel container. Return an instance of your driver keyed by the snake_case identifier — the plugin calls `SmsManager::extend($key, $factory)` on boot.

## Test your driver

1. Rebuild autoload (`composer dump-autoload`) if you added a new namespace.
2. Visit **Admin → Settings → SMS Gateways** — your driver appears in the driver tabs.
3. Enter credentials via the form and click **Save**.
4. Open the **Test SMS** tab, pick your driver, and send a test.
5. Inspect the result in **Admin → SMS Gateways → Delivery Logs**.

## Delivery callbacks (webhooks)

If your provider supports push delivery receipts, override `parseWebhook()` and `verifySignature()`:

```php
public function parseWebhook(Request $request): ?SmsStatusResult
{
    $providerId = $request->input('message_id');
    $providerStatus = $request->input('status');

    $status = match ($providerStatus) {
        'delivered' => SmsDeliveryStatusEnum::DELIVERED,
        'failed', 'undelivered' => SmsDeliveryStatusEnum::FAILED,
        default => SmsDeliveryStatusEnum::SENT,
    };

    return new SmsStatusResult(
        providerMessageId: $providerId,
        status: $status,
        errorCode: $request->input('error_code'),
        errorMessage: $request->input('error_message'),
    );
}

public function verifySignature(Request $request, string $rawBody): bool
{
    $secret = setting('smsg_driver_my_provider_webhook_secret');
    $signature = $request->header('X-MyProvider-Signature');
    $expected = hash_hmac('sha256', $rawBody, $secret);

    return hash_equals($expected, $signature);
}
```

Drivers do **not** register their own routes — the shared inbound endpoint `POST /sms-gateways/webhooks/{driver}` dispatches to your `parseWebhook()` automatically, running signature verification first.

## Custom subject registry

Register new SMS subjects (your own customer model) via the `smsg_subject_register` filter:

```php
add_filter('smsg_subject_register', function (array $subjects): array {
    $subjects['my_subject'] = [
        'model' => \App\Models\MyCustomer::class,
        'guard' => 'my_guard',
        'label' => 'My Custom Subject',
        'enabled_setting' => 'sms_subject_my_subject_enabled',
        'phone_column' => 'phone',
        'default_country' => null,
        'events' => [
            'App\\Events\\OrderPlaced' => ['order_placed', 'transactional'],
        ],
    ];

    return $subjects;
});
```

## Next step

See [Hooks](./hooks.md) for the full list of action/filter hooks, or [Webhook Consumer](./webhook-consumer.md) to process outbound webhooks on the receiving end.
