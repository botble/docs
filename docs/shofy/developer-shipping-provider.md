# Shipping Provider Integration

Integrating a new shipping provider that is not included by default requires developing a custom plugin. This guide explains the available options and walks you through building one from scratch.

## Before You Start: Check the Marketplace

Before writing any code, check if someone has already built a plugin for your shipping provider.

We have **free shipping plugins** on the [Botble Marketplace](https://marketplace.botble.com/products?q=shipping) built by our community authors. To install one:

1. Go to **Admin Panel** → **Plugins** → **Add new plugin**
2. Search for your shipping provider name
3. Click **Install** and then **Activate**

If your provider is available on the marketplace, you can start shipping in minutes without any coding.

::: tip
Browse all available shipping plugins at [marketplace.botble.com/products?q=shipping](https://marketplace.botble.com/products?q=shipping). New plugins are added regularly by the community.
:::

## Reference Examples in the Codebase

If you need to develop a custom plugin, the best way to learn the structure is by studying the existing Shippo shipping plugin included in your project at `platform/plugins/shippo`. It's a full-featured multi-carrier integration (USPS, FedEx, UPS, DHL, etc.) with rate calculation, label generation, tracking, and webhooks.

You will need to make the same structure and handle events during checkout to implement a new shipping option. The key files to study are:

- **`src/Providers/HookServiceProvider.php`** — The main integration file. This is where the plugin hooks into the checkout rate calculation (`handle_shipping_fee` filter), registers the shipping method enum, and adds the settings UI. Start here to understand how everything connects.

- **`resources/views/settings.blade.php`** — The admin settings form displayed under **Ecommerce → Settings → Shipping**. Shows how to build the configuration UI for API keys, sandbox mode, etc.

- **`resources/views/rate.blade.php`** — The shipping option displayed at the checkout page. Shows how individual rates are rendered for the customer to select.

- **`src/Shippo.php`** — The core service class that calls the Shippo API to get rates, create labels, and track shipments. Replace this with your provider's API logic.

- **`helpers/constants.php`** — Defines the `SHIPPO_SHIPPING_METHOD_NAME` constant used throughout the plugin.

- **`routes/web.php`** — Admin routes for managing shipments and webhook routes for tracking updates.

- **`src/Plugin.php`** — Cleanup logic that removes all settings when the plugin is uninstalled.

You can copy the entire `platform/plugins/shippo` folder, rename it, and modify it to work with your provider's API.

## Overview

Integrating a new shipping provider requires building a plugin that hooks into the ecommerce shipping system. Every shipping plugin follows the same pattern:

1. **HookServiceProvider** — registers hooks for rate calculation, settings UI, and enum integration
2. **Shipping Service** — handles API calls to your provider for rates, labels, and tracking
3. **Settings View** — provides the admin settings UI (API keys, mode toggle, etc.)
4. **Controller** — handles admin actions (view rates, create labels) and webhooks
5. **Plugin.php** — cleans up settings when the plugin is uninstalled

The shipping flow looks like this:

```
Customer enters address → HandleShippingFeeService::execute()
    → handle_shipping_fee filter → YourPlugin::getRates() → Provider API
    → Rates returned to checkout → Customer selects rate
    → Order created → Admin generates label → Webhook updates tracking
```

### How It Works

When a customer enters their shipping address at checkout, the core `HandleShippingFeeService` calculates available rates. It first loads the built-in shipping rules from the database, then fires the `handle_shipping_fee` filter. Your plugin hooks into this filter to call your provider's API and add its rates to the response. All rates (built-in + your plugin) are merged and displayed to the customer.

## Prerequisites

- The **Ecommerce** plugin must be activated
- PHP 8.2+, Laravel 12.x
- An account with your shipping provider and API credentials

## Plugin Directory Structure

```
platform/plugins/my-shipping/
├── plugin.json
├── helpers/
│   └── constants.php
├── config/
│   └── general.php
├── resources/
│   ├── lang/en/
│   │   └── my-shipping.php
│   └── views/
│       └── settings.blade.php
├── routes/
│   └── web.php
├── src/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── MyShippingController.php
│   │   │   └── MyShippingWebhookController.php
│   │   └── Middleware/
│   │       └── WebhookMiddleware.php
│   ├── Providers/
│   │   ├── MyShippingServiceProvider.php
│   │   └── HookServiceProvider.php
│   ├── MyShippingService.php
│   └── Plugin.php
└── public/
    └── images/
        └── my-shipping.png
```

## Step-by-Step Implementation

### Step 1: Plugin Metadata

Create `plugin.json`:

```json
{
    "id": "botble/my-shipping",
    "name": "My Shipping Provider",
    "namespace": "Botble\\MyShipping\\",
    "provider": "Botble\\MyShipping\\Providers\\MyShippingServiceProvider",
    "author": "Your Name",
    "url": "https://yoursite.com",
    "version": "1.0.0",
    "description": "My Shipping Provider integration for real-time rates and tracking",
    "minimum_core_version": "7.3.0"
}
```

::: info
Unlike payment plugins, shipping plugins do not need to declare `"require": ["botble/payment"]`. They depend on the ecommerce plugin, which is checked at runtime via `is_plugin_active('ecommerce')`.
:::

### Step 2: Shipping Method Constant

Create `helpers/constants.php`:

```php
<?php

if (! defined('MY_SHIPPING_METHOD_NAME')) {
    define('MY_SHIPPING_METHOD_NAME', 'my_shipping');
}
```

This constant identifies your shipping method throughout the system (settings keys, enum values, rate responses).

### Step 3: Service Provider

Create `src/Providers/MyShippingServiceProvider.php`:

```php
<?php

namespace Botble\MyShipping\Providers;

use Botble\Base\Traits\LoadAndPublishDataTrait;
use Illuminate\Contracts\Support\DeferrableProvider;
use Illuminate\Support\ServiceProvider;

class MyShippingServiceProvider extends ServiceProvider implements DeferrableProvider
{
    use LoadAndPublishDataTrait;

    public function register(): void
    {
        if (! is_plugin_active('ecommerce')) {
            return;
        }

        $this->setNamespace('plugins/my-shipping')->loadHelpers();
    }

    public function boot(): void
    {
        if (! is_plugin_active('ecommerce')) {
            return;
        }

        $this
            ->loadAndPublishTranslations()
            ->loadAndPublishViews()
            ->loadRoutes()
            ->loadAndPublishConfigurations(['general'])
            ->publishAssets();

        $this->app->register(HookServiceProvider::class);
    }
}
```

### Step 4: Hook Service Provider

Create `src/Providers/HookServiceProvider.php`. This is the core file — it hooks your plugin into the shipping rate calculation and admin settings.

```php
<?php

namespace Botble\MyShipping\Providers;

use Botble\Ecommerce\Enums\ShippingMethodEnum;
use Botble\MyShipping\MyShippingService;
use Illuminate\Support\Arr;
use Illuminate\Support\ServiceProvider;

class HookServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // 1. Hook into rate calculation — this is the main integration point
        add_filter('handle_shipping_fee', [$this, 'handleShippingFee'], 12, 2);

        // 2. Add settings UI to the shipping methods page
        add_filter(SHIPPING_METHODS_SETTINGS_PAGE, [$this, 'addSettings'], 3);

        // 3. Add to ShippingMethodEnum
        add_filter(BASE_FILTER_ENUM_ARRAY, function ($values, $class) {
            if ($class == ShippingMethodEnum::class) {
                $values['MY_SHIPPING'] = MY_SHIPPING_METHOD_NAME;
            }

            return $values;
        }, 3, 2);

        // 4. Set enum display label
        add_filter(BASE_FILTER_ENUM_LABEL, function ($value, $class) {
            if ($class == ShippingMethodEnum::class && $value == MY_SHIPPING_METHOD_NAME) {
                return trans('plugins/my-shipping::my-shipping.name');
            }

            return $value;
        }, 3, 2);
    }

    public function handleShippingFee(array $result, array $data): array
    {
        if ($this->app->runningInConsole() || setting('shipping_my_shipping_status') != 1) {
            return $result;
        }

        $rates = app(MyShippingService::class)->getRates($data);

        if (! empty($rates)) {
            $result[MY_SHIPPING_METHOD_NAME] = $rates;
        }

        return $result;
    }

    public function addSettings(?string $settings): string
    {
        return $settings . view('plugins/my-shipping::settings')->render();
    }
}
```

**Hook priority**: Use a unique number that doesn't conflict with existing plugins. Shippo uses priority `11` for `handle_shipping_fee` and `2` for enums. Pick a higher number (e.g., `12`, `3`) to avoid conflicts.

### Step 5: Shipping Service

Create `src/MyShippingService.php`. This class calls your provider's API to get shipping rates.

```php
<?php

namespace Botble\MyShipping;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class MyShippingService
{
    public function getRates(array $data): array
    {
        try {
            $destination = [
                'country' => Arr::get($data, 'address_to.country'),
                'state' => Arr::get($data, 'address_to.state'),
                'city' => Arr::get($data, 'address_to.city'),
                'zip_code' => Arr::get($data, 'address_to.zip_code'),
            ];

            $weight = Arr::get($data, 'weight', 0);
            $orderTotal = Arr::get($data, 'order_total', 0);

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->getApiKey(),
            ])->post($this->getApiUrl('/rates'), [
                'destination' => $destination,
                'origin' => $this->getOriginAddress(),
                'weight' => $weight,
                'order_total' => $orderTotal,
            ]);

            if (! $response->successful()) {
                Log::error('MyShipping rate request failed: ' . $response->body());

                return [];
            }

            return $this->formatRates($response->json('rates', []));
        } catch (Throwable $e) {
            Log::error('MyShipping getRates error: ' . $e->getMessage());

            return [];
        }
    }

    protected function formatRates(array $apiRates): array
    {
        $rates = [];

        foreach ($apiRates as $rate) {
            $rates[$rate['service_code']] = [
                'name' => $rate['service_name'],
                'price' => (float) $rate['total_price'],
                'carrier' => $rate['carrier_name'] ?? 'My Shipping',
                'delivery_days' => $rate['estimated_days'] ?? null,
                'description' => $rate['description'] ?? null,
            ];
        }

        return $rates;
    }

    public function createLabel(string $rateId, array $orderData): ?array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->getApiKey(),
            ])->post($this->getApiUrl('/labels'), [
                'rate_id' => $rateId,
                'order_id' => $orderData['order_id'],
            ]);

            if ($response->successful()) {
                return [
                    'tracking_number' => $response->json('tracking_number'),
                    'tracking_url' => $response->json('tracking_url'),
                    'label_url' => $response->json('label_url'),
                ];
            }

            return null;
        } catch (Throwable $e) {
            Log::error('MyShipping createLabel error: ' . $e->getMessage());

            return null;
        }
    }

    public function getTrackingInfo(string $trackingNumber): ?array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->getApiKey(),
            ])->get($this->getApiUrl("/tracking/{$trackingNumber}"));

            return $response->successful() ? $response->json() : null;
        } catch (Throwable $e) {
            Log::error('MyShipping tracking error: ' . $e->getMessage());

            return null;
        }
    }

    protected function getApiKey(): string
    {
        if (setting('shipping_my_shipping_sandbox')) {
            return setting('shipping_my_shipping_test_key', '');
        }

        return setting('shipping_my_shipping_production_key', '');
    }

    protected function getApiUrl(string $path): string
    {
        $baseUrl = setting('shipping_my_shipping_sandbox')
            ? 'https://sandbox-api.myshipping.com/v1'
            : 'https://api.myshipping.com/v1';

        return $baseUrl . $path;
    }

    protected function getOriginAddress(): array
    {
        return [
            'country' => get_ecommerce_setting('store_country'),
            'state' => get_ecommerce_setting('store_state'),
            'city' => get_ecommerce_setting('store_city'),
            'zip_code' => get_ecommerce_setting('store_zip_code'),
            'address' => get_ecommerce_setting('store_address'),
        ];
    }
}
```

### Step 6: Settings View

Create `resources/views/settings.blade.php`:

```blade
<div class="card mb-3">
    <div class="card-header">
        <h4 class="card-title">
            {{ trans('plugins/my-shipping::my-shipping.name') }}
        </h4>
    </div>
    <div class="card-body">
        <form action="{{ route('ecommerce.shipments.my-shipping.settings.update') }}" method="POST">
            @csrf

            <div class="mb-3">
                <label class="form-label">
                    {{ trans('plugins/my-shipping::my-shipping.status') }}
                </label>
                <select name="shipping_my_shipping_status" class="form-select">
                    <option value="1" @if (setting('shipping_my_shipping_status') == 1) selected @endif>
                        {{ trans('core/base::base.yes') }}
                    </option>
                    <option value="0" @if (setting('shipping_my_shipping_status') != 1) selected @endif>
                        {{ trans('core/base::base.no') }}
                    </option>
                </select>
            </div>

            <div class="mb-3">
                <label class="form-label">
                    {{ trans('plugins/my-shipping::my-shipping.test_key') }}
                </label>
                <input
                    type="text"
                    class="form-control"
                    name="shipping_my_shipping_test_key"
                    value="{{ setting('shipping_my_shipping_test_key') }}"
                    placeholder="test_*************"
                >
            </div>

            <div class="mb-3">
                <label class="form-label">
                    {{ trans('plugins/my-shipping::my-shipping.production_key') }}
                </label>
                <input
                    type="password"
                    class="form-control"
                    name="shipping_my_shipping_production_key"
                    value="{{ setting('shipping_my_shipping_production_key') }}"
                    placeholder="live_*************"
                >
            </div>

            <div class="mb-3">
                <label class="form-label">
                    {{ trans('plugins/my-shipping::my-shipping.sandbox') }}
                </label>
                <select name="shipping_my_shipping_sandbox" class="form-select">
                    <option value="1" @if (setting('shipping_my_shipping_sandbox', 1) == 1) selected @endif>
                        {{ trans('core/base::base.yes') }}
                    </option>
                    <option value="0" @if (setting('shipping_my_shipping_sandbox') != 1) selected @endif>
                        {{ trans('core/base::base.no') }}
                    </option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary">
                {{ trans('core/base::forms.save') }}
            </button>
        </form>
    </div>
</div>
```

### Step 7: Routes

Create `routes/web.php`:

```php
<?php

use Botble\Base\Facades\AdminHelper;
use Botble\MyShipping\Http\Controllers\MyShippingController;
use Botble\MyShipping\Http\Controllers\MyShippingWebhookController;
use Illuminate\Support\Facades\Route;

AdminHelper::registerRoutes(function (): void {
    Route::group([
        'prefix' => 'shipments/my-shipping',
        'as' => 'ecommerce.shipments.my-shipping.',
        'permission' => 'ecommerce.shipments.index',
    ], function (): void {
        // Save settings
        Route::post('settings/update', [MyShippingController::class, 'updateSettings'])
            ->name('settings.update')
            ->middleware('preventDemo');

        // Get rates for a shipment
        Route::get('rates/{id}', [MyShippingController::class, 'getRates'])
            ->name('rates');

        // Create shipping label
        Route::post('labels/create/{id}', [MyShippingController::class, 'createLabel'])
            ->name('labels.create')
            ->middleware('permission:ecommerce.shipments.edit');
    });
});

// Webhook route (public, no auth)
Route::post('my-shipping/webhooks', [MyShippingWebhookController::class, 'handle'])
    ->name('my-shipping.webhooks')
    ->middleware('api');
```

### Step 8: Webhook Controller

Create `src/Http/Controllers/MyShippingWebhookController.php`:

```php
<?php

namespace Botble\MyShipping\Http\Controllers;

use Botble\Base\Http\Controllers\BaseController;
use Botble\Ecommerce\Enums\ShippingStatusEnum;
use Botble\Ecommerce\Models\Shipment;
use Botble\Ecommerce\Models\ShipmentHistory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MyShippingWebhookController extends BaseController
{
    public function handle(Request $request): Response
    {
        // 1. Verify webhook signature
        $signature = $request->header('X-MyShipping-Signature');
        $secret = setting('shipping_my_shipping_webhook_secret');

        if ($secret && ! hash_equals(hash_hmac('sha256', $request->getContent(), $secret), $signature)) {
            return response('Invalid signature', 403);
        }

        $event = $request->json()->all();

        // 2. Handle tracking updates
        if (($event['type'] ?? '') === 'tracking.updated') {
            $this->handleTrackingUpdate($event['data']);
        }

        return response('OK', 200);
    }

    protected function handleTrackingUpdate(array $data): void
    {
        $trackingNumber = $data['tracking_number'] ?? null;

        if (! $trackingNumber) {
            return;
        }

        $shipment = Shipment::query()
            ->where('tracking_id', $trackingNumber)
            ->first();

        if (! $shipment) {
            return;
        }

        // Map provider status to ShippingStatusEnum
        $statusMap = [
            'in_transit' => ShippingStatusEnum::DELIVERING,
            'delivered' => ShippingStatusEnum::DELIVERED,
            'returned' => ShippingStatusEnum::RETURNED,
            'exception' => ShippingStatusEnum::NOT_DELIVERED,
        ];

        $newStatus = $statusMap[$data['status']] ?? null;

        if ($newStatus && $shipment->status !== $newStatus) {
            $shipment->update(['status' => $newStatus]);

            ShipmentHistory::query()->create([
                'action' => 'update_status',
                'description' => "Status updated to {$newStatus->label()} via webhook",
                'shipment_id' => $shipment->id,
                'order_id' => $shipment->order_id,
            ]);
        }
    }
}
```

### Step 9: Translations

Create `resources/lang/en/my-shipping.php`:

```php
<?php

return [
    'name' => 'My Shipping Provider',
    'status' => 'Enable My Shipping',
    'test_key' => 'Test API Key',
    'production_key' => 'Production API Key',
    'sandbox' => 'Sandbox Mode',
];
```

### Step 10: Plugin Lifecycle

Create `src/Plugin.php`:

```php
<?php

namespace Botble\MyShipping;

use Botble\PluginManagement\Abstracts\PluginOperationAbstract;
use Botble\Setting\Facades\Setting;

class Plugin extends PluginOperationAbstract
{
    public static function remove(): void
    {
        Setting::delete([
            'shipping_my_shipping_status',
            'shipping_my_shipping_test_key',
            'shipping_my_shipping_production_key',
            'shipping_my_shipping_sandbox',
            'shipping_my_shipping_webhook_secret',
        ]);
    }
}
```

### Step 11: Publish and Activate

```bash
php artisan cms:publish:assets
php artisan cms:plugin:activate my-shipping
```

After activation, go to **Ecommerce** → **Settings** → **Shipping** to configure your API keys.

## Hooks Reference

### Filters

| Hook | Purpose | Args |
|------|---------|------|
| `handle_shipping_fee` | Add your rates to checkout calculation | `$result`, `$data` |
| `SHIPPING_METHODS_SETTINGS_PAGE` | Add settings UI to shipping config page | `$settings` |
| `BASE_FILTER_ENUM_ARRAY` | Add value to `ShippingMethodEnum` | `$values`, `$class` |
| `BASE_FILTER_ENUM_LABEL` | Set display label for enum value | `$value`, `$class` |
| `shipment_buttons_detail_order` | Add action buttons to shipment detail view | `$content`, `$shipment` |

### Rate Calculation Data

The `$data` array passed to `handle_shipping_fee` contains:

```php
[
    'weight' => 2.5,                          // Total package weight
    'order_total' => 99.99,                   // Order total amount
    'address_to' => [
        'country' => 'US',                    // Destination country code
        'state' => 'California',              // Destination state
        'city' => 'Los Angeles',              // Destination city
        'zip_code' => '90001',                // Destination ZIP code
    ],
    'items' => [                              // Product items
        [
            'name' => 'Product Name',
            'weight' => 1.25,
            'qty' => 2,
            'price' => 49.99,
        ],
    ],
    'payment_method' => 'stripe',             // Selected payment method
    'extra' => [                              // Provider-specific extras
        'COD' => [...],                       // Cash on delivery details
    ],
]
```

### Rate Response Structure

Your `handleShippingFee` callback must return rates in this format:

```php
$result['my_shipping'] = [
    'service_standard' => [
        'name' => 'Standard Shipping',       // Display name
        'price' => 9.99,                      // Shipping cost
        'carrier' => 'My Carrier',            // Carrier name (optional)
        'delivery_days' => 5,                 // Estimated days (optional)
        'description' => '5-7 business days', // Description (optional)
        'disabled' => false,                  // Disable this option (optional)
        'error_message' => '',                // Reason if disabled (optional)
    ],
    'service_express' => [
        'name' => 'Express Shipping',
        'price' => 19.99,
        'carrier' => 'My Carrier',
        'delivery_days' => 2,
        'description' => '1-2 business days',
    ],
];
```

## Settings Convention

All settings use the prefix `shipping_{plugin_name}_{setting}`:

```php
// Read a setting
setting('shipping_my_shipping_status');
setting('shipping_my_shipping_test_key');
setting('shipping_my_shipping_sandbox', 1); // with default

// Write a setting
setting()->set(['shipping_my_shipping_status' => 1]);
setting()->save();
```

## Database

Shipping plugins typically do **not** create their own tables. All shipment data is stored in the core ecommerce tables:

### `ec_shipments` Table

| Column | Type | Description |
|--------|------|-------------|
| `order_id` | foreignId | Associated order |
| `shipment_id` | string | Provider-specific shipment ID |
| `rate_id` | string | Provider rate reference |
| `status` | string | ShippingStatusEnum value |
| `tracking_id` | string | Tracking number |
| `tracking_link` | string | Provider tracking URL |
| `label_url` | string | Downloadable label URL |
| `metadata` | json | Provider-specific data |
| `note` | text | Admin notes |

### `ec_shipment_histories` Table

| Column | Type | Description |
|--------|------|-------------|
| `shipment_id` | foreignId | Associated shipment |
| `order_id` | foreignId | Associated order |
| `action` | string | Action type (e.g., `update_status`) |
| `description` | string | Human-readable description |
| `user_id` | foreignId | Who performed the action |

### Shipping Status Values

```php
ShippingStatusEnum::PENDING
ShippingStatusEnum::READY_TO_BE_SHIPPED_OUT
ShippingStatusEnum::DELIVERING
ShippingStatusEnum::DELIVERED
ShippingStatusEnum::CANCELED
ShippingStatusEnum::NOT_DELIVERED
ShippingStatusEnum::RETURNING
ShippingStatusEnum::RETURNED
ShippingStatusEnum::EXCEPTION
```

## Testing Checklist

Before submitting your plugin:

- [ ] Shipping rates appear at checkout when plugin is enabled
- [ ] Settings form saves and loads correctly in admin
- [ ] Rates return correctly for valid addresses
- [ ] Empty rates returned gracefully on API errors (no checkout crash)
- [ ] Sandbox/production mode toggle works
- [ ] Currency handling is correct
- [ ] Webhook processes tracking updates correctly
- [ ] Webhook verifies signatures and rejects invalid requests
- [ ] Label generation works (if supported)
- [ ] Plugin uninstall cleans up all settings
- [ ] COD restrictions handled (if provider doesn't support COD)

## Troubleshooting

### Rates not showing at checkout

1. Verify `shipping_my_shipping_status` setting equals `1`
2. Ensure `handle_shipping_fee` hook is registered
3. Check that your `getRates()` returns a non-empty array
4. Verify API key is correct (test vs production)
5. Check `storage/logs/laravel.log` for API errors
6. Ensure the ecommerce plugin is active

### Webhook not updating shipment status

1. Webhook URL must be publicly accessible
2. Verify signature validation matches your provider's docs
3. Check that `tracking_id` in `ec_shipments` matches the tracking number from the webhook
4. Ensure status mapping covers all your provider's statuses

### Settings form not showing

1. Ensure `SHIPPING_METHODS_SETTINGS_PAGE` filter is registered
2. Verify the view file exists at `resources/views/settings.blade.php`
3. `HookServiceProvider` must be registered in the main `ServiceProvider`

## Additional Resources

- **Marketplace plugins**: [marketplace.botble.com/products?q=shipping](https://marketplace.botble.com/products?q=shipping) — Free community-built shipping plugins you can install directly
- **Reference plugin**: Study `platform/plugins/shippo` as a starting point — it's a complete, production-ready implementation covering rates, labels, tracking, and webhooks
- **Official docs**: [docs.botble.com](https://docs.botble.com) — General CMS documentation
