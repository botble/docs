# Payment Gateway Integration

Integrating a new payment gateway that is not included by default requires developing a custom plugin. This guide explains the available options and walks you through building one from scratch.

## Before You Start: Check the Marketplace

Before writing any code, check if someone has already built a plugin for your payment gateway.

We have many **free payment plugins** on the [Botble Marketplace](https://marketplace.botble.com/products?q=payment) built by our community authors. To install one:

1. Go to **Admin Panel** → **Plugins** → **Add new plugin**
2. Search for your payment gateway name
3. Click **Install** and then **Activate**

If your gateway is available on the marketplace, you can start accepting payments in minutes without any coding.

::: tip
Browse all available payment plugins at [marketplace.botble.com/products?q=payment](https://marketplace.botble.com/products?q=payment). New plugins are added regularly by the community.
:::

## Reference Examples in the Codebase

If you need to develop a custom plugin, the best way to learn the structure is by studying the existing payment gateway plugins included in your project. Good starting points are `platform/plugins/razorpay` or `platform/plugins/paystack` — they are the simplest and cleanest examples.

You will need to make the same structure and handle events during checkout to implement a new payment gateway. The key files to study (using Stripe as example):

- **`src/Providers/HookServiceProvider.php`** — The main integration file. This is where the plugin registers itself with the checkout flow (`PAYMENT_FILTER_AFTER_POST_CHECKOUT` filter), adds the payment method to the enum, renders the settings form, and shows payment details in admin. Start here to understand how everything connects.

- **`src/Forms/StripePaymentMethodForm.php`** — The admin settings form displayed under **Settings → Payment → Payment methods**. Shows how to build the configuration UI for API keys, webhook secrets, etc. using the `PaymentMethodForm` base class.

- **`resources/views/methods.blade.php`** — The payment option displayed at the checkout page. Shows how the radio button and payment method description are rendered for the customer to select.

- **`src/Services/Gateways/StripePaymentService.php`** — The core service class that calls the gateway API to process payments, verify transactions, and handle refunds. Replace this with your gateway's API logic.

- **`src/Http/Controllers/StripeController.php`** — Handles webhooks from the gateway (payment succeeded, failed, refunded) and callback routes (success/error pages after redirect).

- **`helpers/constants.php`** — Defines the `STRIPE_PAYMENT_METHOD_NAME` constant used throughout the plugin.

- **`routes/web.php`** — Webhook route (with CSRF bypass) and frontend callback routes.

- **`src/Plugin.php`** — Cleanup logic that removes all settings when the plugin is uninstalled.

You can copy any payment plugin folder (e.g., `platform/plugins/razorpay`), rename it, and modify it to work with your gateway's API.

::: info
For a general overview of the integration process, see the [community tutorial on the forums](https://forums.botble.com/d/1-tutorial-integrate-a-new-payment-gateway).
:::

## Overview

Integrating a new payment gateway requires building a plugin that hooks into the core payment system. Every gateway plugin follows the same pattern:

1. **HookServiceProvider** — registers 8-9 filters to integrate with checkout, admin settings, and order display
2. **PaymentService** — handles the actual payment processing via the gateway API
3. **PaymentMethodForm** — provides the admin settings UI (API keys, mode toggle, etc.)
4. **Controller** — handles webhooks and callbacks from the gateway
5. **Plugin.php** — cleans up settings when the plugin is uninstalled

The payment flow looks like this:

```
Checkout Form → PAYMENT_FILTER_PAYMENT_DATA → PAYMENT_FILTER_AFTER_POST_CHECKOUT
    → YourPaymentService::execute() → Gateway API
    → Webhook/Callback → PAYMENT_ACTION_PAYMENT_PROCESSED → Payment record saved
```

### Gateway Types

| Type | Flow | Examples |
|------|------|----------|
| **Direct Charge** | Card details → API call → instant result | Stripe API Charge, Razorpay |
| **Redirect-Based** | Create session → redirect to gateway → webhook callback | PayPal, Mollie |
| **Hybrid** | Supports both direct and redirect flows | Stripe (API Charge + Checkout) |

## Prerequisites

- The core **Payment** plugin must be activated (`platform/plugins/payment/`)
- PHP 8.2+, Laravel 12.x
- Familiarity with Laravel service providers and Blade views

## Plugin Directory Structure

```
platform/plugins/my-gateway/
├── plugin.json
├── helpers/
│   └── constants.php
├── resources/
│   ├── lang/en/
│   │   └── my-gateway.php
│   └── views/
│       ├── methods.blade.php
│       ├── detail.blade.php
│       └── instructions.blade.php
├── routes/
│   └── web.php
├── src/
│   ├── Forms/
│   │   └── MyGatewayPaymentMethodForm.php
│   ├── Http/
│   │   └── Controllers/
│   │       └── MyGatewayController.php
│   ├── Providers/
│   │   ├── MyGatewayServiceProvider.php
│   │   └── HookServiceProvider.php
│   ├── Services/
│   │   └── Gateways/
│   │       └── MyGatewayPaymentService.php
│   └── Plugin.php
└── public/
    └── images/
        └── my-gateway.svg
```

## Step-by-Step Implementation

### Step 1: Plugin Metadata

Create `plugin.json`:

```json
{
    "id": "botble/my-gateway",
    "name": "My Gateway Payment",
    "namespace": "Botble\\MyGateway\\",
    "provider": "Botble\\MyGateway\\Providers\\MyGatewayServiceProvider",
    "author": "Your Name",
    "url": "https://yoursite.com",
    "version": "1.0.0",
    "description": "My Gateway payment integration",
    "minimum_core_version": "7.3.0",
    "require": [
        "botble/payment"
    ]
}
```

::: warning
The `require` array **must** include `"botble/payment"`. Your plugin will not work without the core payment plugin.
:::

### Step 2: Gateway Constant

Create `helpers/constants.php`:

```php
<?php

if (! defined('MY_GATEWAY_PAYMENT_METHOD_NAME')) {
    define('MY_GATEWAY_PAYMENT_METHOD_NAME', 'my_gateway');
}
```

This constant identifies your gateway throughout the system (settings keys, enum values, payment records).

### Step 3: Service Provider

Create `src/Providers/MyGatewayServiceProvider.php`:

```php
<?php

namespace Botble\MyGateway\Providers;

use Botble\Base\Traits\LoadAndPublishDataTrait;
use Illuminate\Support\ServiceProvider;

class MyGatewayServiceProvider extends ServiceProvider
{
    use LoadAndPublishDataTrait;

    public function boot(): void
    {
        if (! is_plugin_active('payment')) {
            return;
        }

        $this->setNamespace('plugins/my-gateway')
            ->loadHelpers()
            ->loadRoutes()
            ->loadAndPublishTranslations()
            ->loadAndPublishViews()
            ->publishAssets();

        $this->app->register(HookServiceProvider::class);
    }
}
```

### Step 4: Hook Service Provider

Create `src/Providers/HookServiceProvider.php`. This is the most important file - it integrates your gateway with the payment system through hooks.

```php
<?php

namespace Botble\MyGateway\Providers;

use Botble\Base\Facades\Html;
use Botble\MyGateway\Forms\MyGatewayPaymentMethodForm;
use Botble\MyGateway\Services\Gateways\MyGatewayPaymentService;
use Botble\Payment\Enums\PaymentMethodEnum;
use Botble\Payment\Facades\PaymentMethods;
use Botble\Payment\Supports\PaymentFeeHelper;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;

class HookServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // 1. Register payment method in checkout UI
        add_filter(PAYMENT_FILTER_ADDITIONAL_PAYMENT_METHODS, [$this, 'registerMethod'], 30, 2);

        // 2. Handle checkout processing (must be in booted callback)
        $this->app->booted(function (): void {
            add_filter(PAYMENT_FILTER_AFTER_POST_CHECKOUT, [$this, 'checkoutWithMyGateway'], 30, 2);
        });

        // 3. Add settings form to admin
        add_filter(PAYMENT_METHODS_SETTINGS_PAGE, [$this, 'addPaymentSettings'], 30);

        // 4. Add to PaymentMethodEnum
        add_filter(BASE_FILTER_ENUM_ARRAY, function ($values, $class) {
            if ($class == PaymentMethodEnum::class) {
                $values['MY_GATEWAY'] = MY_GATEWAY_PAYMENT_METHOD_NAME;
            }

            return $values;
        }, 30, 2);

        // 5. Set enum display label
        add_filter(BASE_FILTER_ENUM_LABEL, function ($value, $class) {
            if ($class == PaymentMethodEnum::class && $value == MY_GATEWAY_PAYMENT_METHOD_NAME) {
                $value = 'My Gateway';
            }

            return $value;
        }, 30, 2);

        // 6. Set enum HTML rendering (admin badge)
        add_filter(BASE_FILTER_ENUM_HTML, function ($value, $class) {
            if ($class == PaymentMethodEnum::class && $value == MY_GATEWAY_PAYMENT_METHOD_NAME) {
                $value = Html::tag(
                    'span',
                    PaymentMethodEnum::getLabel($value),
                    ['class' => 'label-success status-label']
                )->toHtml();
            }

            return $value;
        }, 30, 2);

        // 7. Map method to service class
        add_filter(PAYMENT_FILTER_GET_SERVICE_CLASS, function ($data, $value) {
            if ($value == MY_GATEWAY_PAYMENT_METHOD_NAME) {
                $data = MyGatewayPaymentService::class;
            }

            return $data;
        }, 30, 2);

        // 8. Show payment details in admin order view
        add_filter(PAYMENT_FILTER_PAYMENT_INFO_DETAIL, function ($data, $payment) {
            if ($payment->payment_channel == MY_GATEWAY_PAYMENT_METHOD_NAME) {
                $paymentDetail = (new MyGatewayPaymentService())->getPaymentDetails($payment->charge_id);

                if ($paymentDetail) {
                    $data .= view('plugins/my-gateway::detail', ['payment' => $paymentDetail])->render();
                }
            }

            return $data;
        }, 30, 2);
    }

    public function addPaymentSettings(?string $settings): string
    {
        return $settings . MyGatewayPaymentMethodForm::create()->renderForm();
    }

    public function registerMethod(?string $html, array $data): string
    {
        PaymentMethods::method(MY_GATEWAY_PAYMENT_METHOD_NAME, [
            'html' => view('plugins/my-gateway::methods', $data)->render(),
        ]);

        return $html;
    }

    public function checkoutWithMyGateway(array $data, Request $request): array
    {
        if ($data['type'] !== MY_GATEWAY_PAYMENT_METHOD_NAME) {
            return $data;
        }

        $service = $this->app->make(MyGatewayPaymentService::class);

        $paymentData = apply_filters(PAYMENT_FILTER_PAYMENT_DATA, [], $request);

        // Calculate payment fee
        $paymentFee = PaymentFeeHelper::calculateFee(MY_GATEWAY_PAYMENT_METHOD_NAME, $paymentData['amount'] ?? 0);
        $paymentData['payment_fee'] = $paymentFee;

        if (! isset($paymentData['currency'])) {
            $paymentData['currency'] = get_application_currency()->title;
        }

        // Validate supported currencies
        $supportedCurrencies = $service->supportedCurrencyCodes();
        if (! in_array($paymentData['currency'], $supportedCurrencies)) {
            $data['error'] = true;
            $data['message'] = trans('plugins/payment::payment.currency_not_supported', [
                'name' => 'My Gateway',
                'currency' => $paymentData['currency'],
                'currencies' => implode(', ', $supportedCurrencies),
            ]);

            return $data;
        }

        // Execute payment
        $result = $service->execute($paymentData);

        if ($service->getErrorMessage()) {
            $data['error'] = true;
            $data['message'] = $service->getErrorMessage();
        } elseif ($result) {
            // For direct charge: set charge_id
            // $data['charge_id'] = $result;

            // For redirect-based: set checkoutUrl
            $data['checkoutUrl'] = $result;
        }

        return $data;
    }
}
```

**Hook priority**: Use a unique number (e.g., `30`) that doesn't conflict with existing gateways. Built-in priorities: Stripe=1, PayPal=2, Razorpay=11, Mollie=17. Lower number = higher priority in checkout display order.

### Step 5: Payment Service

Create `src/Services/Gateways/MyGatewayPaymentService.php`:

```php
<?php

namespace Botble\MyGateway\Services\Gateways;

use Botble\Payment\Enums\PaymentStatusEnum;
use Botble\Payment\Services\Traits\PaymentErrorTrait;
use Botble\Payment\Supports\PaymentHelper;
use Exception;
use Illuminate\Support\Facades\Http;

class MyGatewayPaymentService
{
    use PaymentErrorTrait;

    public function execute(array $data): ?string
    {
        try {
            // Log the API request
            do_action('payment_before_making_api_request', MY_GATEWAY_PAYMENT_METHOD_NAME, $data);

            // Call your gateway's API to create a payment
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . get_payment_setting('secret_key', MY_GATEWAY_PAYMENT_METHOD_NAME),
            ])->post('https://api.mygateway.com/payments', [
                'amount' => (int) ($data['amount'] * 100), // amount in cents
                'currency' => $data['currency'],
                'description' => $data['description'] ?? 'Order payment',
                'return_url' => PaymentHelper::getRedirectURL($data['checkout_token']),
                'cancel_url' => PaymentHelper::getCancelURL($data['checkout_token']),
                'webhook_url' => route('payments.my-gateway.webhook'),
                'metadata' => [
                    'order_id' => json_encode($data['order_id']),
                    'customer_id' => $data['customer_id'],
                    'customer_type' => $data['customer_type'],
                    'payment_fee' => $data['payment_fee'] ?? 0,
                    'amount' => $data['amount'],
                ],
            ]);

            // Log the API response
            do_action('payment_after_api_response', MY_GATEWAY_PAYMENT_METHOD_NAME, $data, $response->json());

            if (! $response->successful()) {
                $this->setErrorMessage($response->json('error.message', 'Payment creation failed'));

                return null;
            }

            $paymentResponse = $response->json();

            // For redirect-based gateways, return the checkout URL
            return $paymentResponse['checkout_url'];

            // For direct charge gateways, store payment and return charge ID:
            // do_action(PAYMENT_ACTION_PAYMENT_PROCESSED, [
            //     'amount' => $data['amount'],
            //     'currency' => $data['currency'],
            //     'charge_id' => $paymentResponse['transaction_id'],
            //     'order_id' => $data['order_id'],
            //     'customer_id' => $data['customer_id'],
            //     'customer_type' => $data['customer_type'],
            //     'payment_channel' => MY_GATEWAY_PAYMENT_METHOD_NAME,
            //     'status' => PaymentStatusEnum::COMPLETED,
            //     'payment_fee' => $data['payment_fee'] ?? 0,
            // ]);
            // return $paymentResponse['transaction_id'];
        } catch (Exception $exception) {
            $this->setErrorMessage($exception->getMessage());

            return null;
        }
    }

    public function getPaymentDetails(string $chargeId): ?array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . get_payment_setting('secret_key', MY_GATEWAY_PAYMENT_METHOD_NAME),
            ])->get("https://api.mygateway.com/payments/{$chargeId}");

            return $response->successful() ? $response->json() : null;
        } catch (Exception) {
            return null;
        }
    }

    public function supportedCurrencyCodes(): array
    {
        return ['USD', 'EUR', 'GBP'];
    }

    /**
     * Optional: Support online refunds.
     */
    public function refundOrder(string $paymentId, float|string $totalAmount, array $options = []): array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . get_payment_setting('secret_key', MY_GATEWAY_PAYMENT_METHOD_NAME),
            ])->post("https://api.mygateway.com/payments/{$paymentId}/refunds", [
                'amount' => (int) ($totalAmount * 100),
            ]);

            if ($response->successful()) {
                return [
                    'error' => false,
                    'message' => 'succeeded',
                    'data' => $response->json(),
                ];
            }

            return [
                'error' => true,
                'message' => $response->json('error.message', 'Refund failed'),
            ];
        } catch (Exception $exception) {
            return [
                'error' => true,
                'message' => $exception->getMessage(),
            ];
        }
    }

    public function getSupportRefundOnline(): bool
    {
        return true;
    }
}
```

### Step 6: Settings Form

Create `src/Forms/MyGatewayPaymentMethodForm.php`:

```php
<?php

namespace Botble\MyGateway\Forms;

use Botble\Base\Facades\BaseHelper;
use Botble\Base\Forms\FieldOptions\TextFieldOption;
use Botble\Base\Forms\Fields\TextField;
use Botble\Payment\Concerns\Forms\HasAvailableCountriesField;
use Botble\Payment\Forms\PaymentMethodForm;

class MyGatewayPaymentMethodForm extends PaymentMethodForm
{
    use HasAvailableCountriesField;

    public function setup(): void
    {
        parent::setup();

        $this
            ->paymentId(MY_GATEWAY_PAYMENT_METHOD_NAME)
            ->paymentName('My Gateway')
            ->paymentDescription(trans('plugins/my-gateway::my-gateway.description'))
            ->paymentLogo(url('vendor/core/plugins/my-gateway/images/my-gateway.svg'))
            ->paymentFeeField(MY_GATEWAY_PAYMENT_METHOD_NAME)
            ->paymentUrl('https://mygateway.com')
            ->paymentInstructions(view('plugins/my-gateway::instructions')->render())
            ->add(
                'payment_' . MY_GATEWAY_PAYMENT_METHOD_NAME . '_public_key',
                TextField::class,
                TextFieldOption::make()
                    ->label(trans('plugins/my-gateway::my-gateway.public_key'))
                    ->value(BaseHelper::hasDemoModeEnabled() ? '***' : get_payment_setting('public_key', MY_GATEWAY_PAYMENT_METHOD_NAME))
                    ->placeholder('pk_*************')
            )
            ->add(
                'payment_' . MY_GATEWAY_PAYMENT_METHOD_NAME . '_secret_key',
                'password',
                TextFieldOption::make()
                    ->label(trans('plugins/my-gateway::my-gateway.secret_key'))
                    ->value(BaseHelper::hasDemoModeEnabled() ? '***' : get_payment_setting('secret_key', MY_GATEWAY_PAYMENT_METHOD_NAME))
                    ->placeholder('sk_*************')
            )
            ->add(
                'payment_' . MY_GATEWAY_PAYMENT_METHOD_NAME . '_webhook_secret',
                'password',
                TextFieldOption::make()
                    ->label(trans('plugins/my-gateway::my-gateway.webhook_secret'))
                    ->value(BaseHelper::hasDemoModeEnabled() ? '***' : get_payment_setting('webhook_secret', MY_GATEWAY_PAYMENT_METHOD_NAME))
                    ->placeholder('whsec_*************')
            )
            ->addAvailableCountriesField(MY_GATEWAY_PAYMENT_METHOD_NAME);
    }
}
```

**Setting key convention**: All settings fields must use the naming pattern `payment_{gateway}_{key}`. The base form handles saving automatically.

### Step 7: Routes

Create `routes/web.php`:

```php
<?php

use Botble\MyGateway\Http\Controllers\MyGatewayController;
use Botble\Theme\Facades\Theme;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

// Webhook route - must bypass CSRF
Route::prefix('payment/my-gateway')
    ->name('payments.my-gateway.')
    ->group(function (): void {
        Route::post('webhook', [MyGatewayController::class, 'webhook'])
            ->withoutMiddleware([VerifyCsrfToken::class])
            ->name('webhook');
    });

// Frontend callback routes (success/error pages)
Theme::registerRoutes(function (): void {
    Route::prefix('payment/my-gateway')
        ->name('payments.my-gateway.')
        ->group(function (): void {
            Route::get('success', [MyGatewayController::class, 'success'])->name('success');
            Route::get('error', [MyGatewayController::class, 'error'])->name('error');
        });
});
```

::: warning
Webhook routes **must** use `->withoutMiddleware([VerifyCsrfToken::class])` since gateway servers cannot provide a CSRF token.
:::

### Step 8: Webhook Controller

Create `src/Http/Controllers/MyGatewayController.php`:

```php
<?php

namespace Botble\MyGateway\Http\Controllers;

use Botble\Base\Http\Controllers\BaseController;
use Botble\Payment\Enums\PaymentStatusEnum;
use Botble\Payment\Models\Payment;
use Botble\Payment\Supports\PaymentHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MyGatewayController extends BaseController
{
    public function webhook(Request $request): Response
    {
        // 1. Verify webhook signature
        $signature = $request->header('X-MyGateway-Signature');
        $webhookSecret = get_payment_setting('webhook_secret', MY_GATEWAY_PAYMENT_METHOD_NAME);
        $payload = $request->getContent();

        $expectedSignature = hash_hmac('sha256', $payload, $webhookSecret);

        if (! hash_equals($expectedSignature, $signature)) {
            return response('Invalid signature', 403);
        }

        // 2. Log the webhook
        do_action('payment_before_making_api_request', MY_GATEWAY_PAYMENT_METHOD_NAME, ['webhook' => $payload]);

        $event = $request->json()->all();

        do_action('payment_after_api_response', MY_GATEWAY_PAYMENT_METHOD_NAME, ['webhook' => $payload], $event);

        // 3. Handle event types
        match ($event['type'] ?? null) {
            'payment.completed' => $this->handlePaymentCompleted($event['data']),
            'payment.failed' => $this->handlePaymentFailed($event['data']),
            'payment.refunded' => $this->handlePaymentRefunded($event['data']),
            default => null,
        };

        return response('OK', 200);
    }

    protected function handlePaymentCompleted(array $data): void
    {
        $chargeId = $data['transaction_id'];

        // Prevent duplicate processing
        $existingPayment = Payment::query()->where('charge_id', $chargeId)->first();

        if ($existingPayment && $existingPayment->status === PaymentStatusEnum::COMPLETED) {
            return;
        }

        $metadata = $data['metadata'] ?? [];

        do_action(PAYMENT_ACTION_PAYMENT_PROCESSED, [
            'amount' => $metadata['amount'] ?? $data['amount'],
            'currency' => strtoupper($data['currency']),
            'charge_id' => $chargeId,
            'order_id' => json_decode($metadata['order_id'] ?? '[]', true),
            'customer_id' => $metadata['customer_id'] ?? null,
            'customer_type' => $metadata['customer_type'] ?? null,
            'payment_channel' => MY_GATEWAY_PAYMENT_METHOD_NAME,
            'status' => PaymentStatusEnum::COMPLETED,
            'payment_fee' => $metadata['payment_fee'] ?? 0,
        ]);
    }

    protected function handlePaymentFailed(array $data): void
    {
        $chargeId = $data['transaction_id'];
        $payment = Payment::query()->where('charge_id', $chargeId)->first();

        if ($payment) {
            $payment->update(['status' => PaymentStatusEnum::FAILED]);
        }
    }

    protected function handlePaymentRefunded(array $data): void
    {
        $chargeId = $data['transaction_id'];
        $payment = Payment::query()->where('charge_id', $chargeId)->first();

        if ($payment) {
            $payment->update([
                'status' => PaymentStatusEnum::REFUNDED,
                'refunded_amount' => $data['refunded_amount'] ?? $payment->amount,
            ]);
        }
    }

    public function success(Request $request)
    {
        return PaymentHelper::handleAfterPaymentSuccess($request);
    }

    public function error(Request $request)
    {
        return PaymentHelper::handleAfterPaymentError($request);
    }
}
```

### Step 9: Blade Views

**`resources/views/methods.blade.php`** - Checkout UI:

```blade
@if (get_payment_setting('status', MY_GATEWAY_PAYMENT_METHOD_NAME) == 1)
    <li class="list-group-item">
        <input
            class="magic-radio js_payment_method"
            type="radio"
            name="payment_method"
            id="payment_{{ MY_GATEWAY_PAYMENT_METHOD_NAME }}"
            value="{{ MY_GATEWAY_PAYMENT_METHOD_NAME }}"
            @if ($selecting == MY_GATEWAY_PAYMENT_METHOD_NAME) checked @endif
        >
        <label for="payment_{{ MY_GATEWAY_PAYMENT_METHOD_NAME }}">
            {{ get_payment_setting('name', MY_GATEWAY_PAYMENT_METHOD_NAME, 'My Gateway') }}
        </label>
        <div
            class="payment_{{ MY_GATEWAY_PAYMENT_METHOD_NAME }}_wrap payment_collapse_wrap"
            style="display: {{ $selecting == MY_GATEWAY_PAYMENT_METHOD_NAME ? 'block' : 'none' }};"
        >
            <p>{!! BaseHelper::clean(get_payment_setting('description', MY_GATEWAY_PAYMENT_METHOD_NAME)) !!}</p>
        </div>
    </li>
@endif
```

**`resources/views/detail.blade.php`** - Admin payment detail:

```blade
@if ($payment)
    <p>
        <strong>{{ trans('plugins/my-gateway::my-gateway.transaction_id') }}:</strong>
        {{ $payment['id'] ?? 'N/A' }}
    </p>
    <p>
        <strong>{{ trans('plugins/my-gateway::my-gateway.status') }}:</strong>
        {{ $payment['status'] ?? 'N/A' }}
    </p>
@endif
```

**`resources/views/instructions.blade.php`** - Admin setup guide:

```blade
<ol>
    <li>
        <p>{{ trans('plugins/my-gateway::my-gateway.instructions.register') }}</p>
    </li>
    <li>
        <p>{{ trans('plugins/my-gateway::my-gateway.instructions.get_credentials') }}</p>
    </li>
    <li>
        <p>{{ trans('plugins/my-gateway::my-gateway.instructions.enter_credentials') }}</p>
    </li>
</ol>
```

### Step 10: Translations

Create `resources/lang/en/my-gateway.php`:

```php
<?php

return [
    'description' => 'Pay with My Gateway',
    'public_key' => 'Public Key',
    'secret_key' => 'Secret Key',
    'webhook_secret' => 'Webhook Secret',
    'transaction_id' => 'Transaction ID',
    'status' => 'Status',
    'instructions' => [
        'register' => 'Register for an account at <a href="https://mygateway.com" target="_blank">mygateway.com</a>.',
        'get_credentials' => 'Get your API keys from the dashboard.',
        'enter_credentials' => 'Enter your Public Key and Secret Key below.',
    ],
];
```

### Step 11: Plugin Lifecycle

Create `src/Plugin.php`:

```php
<?php

namespace Botble\MyGateway;

use Botble\PluginManagement\Abstracts\PluginOperationAbstract;
use Botble\Setting\Facades\Setting;

class Plugin extends PluginOperationAbstract
{
    public static function remove(): void
    {
        Setting::delete([
            'payment_' . MY_GATEWAY_PAYMENT_METHOD_NAME . '_name',
            'payment_' . MY_GATEWAY_PAYMENT_METHOD_NAME . '_description',
            'payment_' . MY_GATEWAY_PAYMENT_METHOD_NAME . '_public_key',
            'payment_' . MY_GATEWAY_PAYMENT_METHOD_NAME . '_secret_key',
            'payment_' . MY_GATEWAY_PAYMENT_METHOD_NAME . '_webhook_secret',
            'payment_' . MY_GATEWAY_PAYMENT_METHOD_NAME . '_status',
        ]);
    }
}
```

### Step 12: Publish Assets

After creating your plugin, publish assets and activate:

```bash
php artisan cms:publish:assets
php artisan cms:plugin:activate my-gateway
```

## Hooks Reference

These hooks are defined in `platform/plugins/payment/helpers/constants.php`.

### Filters (return modified value)

| Hook | Purpose | Args |
|------|---------|------|
| `PAYMENT_FILTER_ADDITIONAL_PAYMENT_METHODS` | Register method in checkout | `$html`, `$data` |
| `PAYMENT_FILTER_AFTER_POST_CHECKOUT` | Process payment on checkout submit | `$data`, `$request` |
| `PAYMENT_METHODS_SETTINGS_PAGE` | Add settings form to admin | `$settings` |
| `PAYMENT_FILTER_GET_SERVICE_CLASS` | Map method name to service class | `$data`, `$value` |
| `PAYMENT_FILTER_PAYMENT_INFO_DETAIL` | Show payment detail in admin | `$data`, `$payment` |
| `PAYMENT_FILTER_PAYMENT_DATA` | Collect payment data before checkout | `$data`, `$request` |
| `PAYMENT_FILTER_HEADER_ASSETS` | Include CSS in checkout page head | `$data` |
| `PAYMENT_FILTER_FOOTER_ASSETS` | Include JS in checkout page footer | `$data` |
| `BASE_FILTER_ENUM_ARRAY` | Add value to PaymentMethodEnum | `$values`, `$class` |
| `BASE_FILTER_ENUM_LABEL` | Set display label for enum value | `$value`, `$class` |
| `BASE_FILTER_ENUM_HTML` | Render enum as HTML badge | `$value`, `$class` |

### Actions (fire-and-forget)

| Hook | Purpose | Data |
|------|---------|------|
| `PAYMENT_ACTION_PAYMENT_PROCESSED` | Record payment in database | See [Payment Data](#payment-processed-data) |

### Payment Processed Data {#payment-processed-data}

Data array passed to `PAYMENT_ACTION_PAYMENT_PROCESSED`:

```php
[
    'amount' => 99.99,                                    // Payment amount
    'currency' => 'USD',                                  // 3-letter currency code
    'charge_id' => 'txn_abc123',                          // Gateway transaction ID
    'order_id' => [1, 2],                                 // Array of order IDs
    'customer_id' => 123,                                 // Customer ID
    'customer_type' => 'Botble\Ecommerce\Models\Customer', // Customer model FQCN
    'payment_channel' => 'my_gateway',                    // Your gateway constant
    'status' => PaymentStatusEnum::COMPLETED,             // Payment status
    'payment_fee' => 5.00,                                // Fee amount
]
```

## Helper Functions

```php
// Get a payment setting value
get_payment_setting('secret_key', 'my_gateway');
get_payment_setting('secret_key', 'my_gateway', 'default_value');

// Get the full setting key (for form fields)
get_payment_setting_key('secret_key', 'my_gateway');
// Returns: 'payment_my_gateway_secret_key'

// Check if a payment method supports online refunds
get_payment_is_support_refund_online($payment);

// Get redirect/cancel URLs for checkout flow
PaymentHelper::getRedirectURL($checkoutToken);
PaymentHelper::getCancelURL($checkoutToken);

// Calculate payment fee
PaymentFeeHelper::calculateFee('my_gateway', $orderAmount);
```

## Database

Payment gateways do **not** create their own tables. All data is stored in the core `payments` and `payment_logs` tables.

### `payments` Table

| Column | Type | Description |
|--------|------|-------------|
| `charge_id` | string(60) | Gateway transaction ID |
| `payment_channel` | string(60) | Your gateway method name |
| `amount` | decimal(15) | Payment amount |
| `payment_fee` | decimal(15) | Fee charged |
| `currency` | string(120) | Currency code |
| `status` | string(60) | pending, completed, failed, refunded |
| `order_id` | foreignId | Associated order |
| `customer_id` | foreignId | Customer (polymorphic) |
| `customer_type` | string | Customer model FQCN |
| `metadata` | json | Gateway-specific data |

## Testing Checklist

Before submitting your plugin:

- [ ] Payment method appears in checkout when enabled
- [ ] Settings form saves and loads correctly in admin
- [ ] Successful payment flow completes and creates payment record
- [ ] Failed payment shows error message to customer
- [ ] Webhook processes payment status updates correctly
- [ ] Webhook verifies signatures and rejects invalid requests
- [ ] Duplicate webhooks are handled (idempotency)
- [ ] Currency validation works for unsupported currencies
- [ ] Payment details show correctly in admin order view
- [ ] Refund processes correctly (if supported)
- [ ] Plugin uninstall cleans up all settings
- [ ] Country restriction filters work correctly

## Troubleshooting

### Payment method not appearing in checkout

1. Verify the `payment` plugin is active: `is_plugin_active('payment')`
2. Check `payment_{gateway}_status` setting equals `1`
3. Ensure `PAYMENT_FILTER_ADDITIONAL_PAYMENT_METHODS` hook is registered
4. Check country restrictions via `Available countries` setting

### Webhook not processing

1. Route must exclude CSRF: `->withoutMiddleware([VerifyCsrfToken::class])`
2. Webhook URL must be publicly accessible (not behind auth)
3. Verify signature validation logic matches gateway's docs
4. Check `storage/logs/laravel.log` for errors
5. Use logging hooks (`payment_before_making_api_request`, `payment_after_api_response`) for debugging

### Settings form not showing

1. Ensure `PAYMENT_METHODS_SETTINGS_PAGE` filter is registered
2. Form class must extend `Botble\Payment\Forms\PaymentMethodForm`
3. Setting field names must follow `payment_{gateway}_{key}` convention
4. `HookServiceProvider` must be registered in the main `ServiceProvider`

## Additional Resources

- **Marketplace plugins**: [marketplace.botble.com/products?q=payment](https://marketplace.botble.com/products?q=payment) — Free community-built payment plugins you can install directly
- **Forum tutorial**: [forums.botble.com/d/1-tutorial-integrate-a-new-payment-gateway](https://forums.botble.com/d/1-tutorial-integrate-a-new-payment-gateway) — Community discussion and tips
- **Reference plugins**: Study `platform/plugins/razorpay` or `platform/plugins/paystack` as starting points — they are the simplest and cleanest examples to follow
- **Official docs**: [docs.botble.com](https://docs.botble.com) — General CMS documentation
