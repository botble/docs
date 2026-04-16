---
title: Extending KYC
description: Add new subject scopes, document types, notification channels, and custom behaviour.
---

# Extending KYC

The plugin is designed to be extended without forking. Here are the three most common extension points.

## Adding a new subject scope

By default the plugin ships `customer` and `vendor`. You can add any number of additional scopes — e.g. `affiliate`, `corporate_buyer`, `driver` — by editing the config.

### Step 1 — Register the scope

Publish the config:

```bash
php artisan vendor:publish --tag=kyc-config
```

Then edit `config/kyc.php`:

```php
'subjects' => [
    // ... existing customer + vendor entries

    'affiliate' => [
        'model'                 => \App\Models\Affiliate::class,
        'guard'                 => 'affiliate',
        'label'                 => 'Affiliate Partner',
        'enabled_setting'       => 'kyc_affiliate_enabled',
        'listing_gate_setting'  => null,
        'checkout_gate_setting' => null,
        'required_documents'    => ['passport', 'national_id', 'tax_certificate'],
        'dashboard_route'       => 'affiliate.kyc.submission.index',
        'submit_route'          => 'affiliate.kyc.submission.store',
        'notification_channel'  => 'mail',
        'dashboard_link_label'  => 'Verify your affiliate account',
    ],
],
```

### Step 2 — Apply the Kycable macro

The plugin auto-applies macros to `Customer` and `Store`. For a custom model, register the macro yourself in your own service provider:

```php
use Botble\Kyc\Supports\KycMacroRegistrar;

public function boot(): void
{
    app(KycMacroRegistrar::class)->applyTo(
        \App\Models\Affiliate::class,
        'affiliate',
    );
}
```

### Step 3 — Add a setting toggle

Add a new checkbox to the KYC settings form. Either publish and edit `KycSettingForm`, or add a custom form-builder section via Botble's form-builder hooks.

### Step 4 — Add the dashboard link

In your affiliate's dashboard view, add:

```blade
@if (setting('kyc_affiliate_enabled'))
    <a href="{{ route('kyc.submission.index', ['subjectKey' => 'affiliate']) }}">
        {{ trans('plugins/kyc::kyc.title') }}
    </a>
@endif
```

No new routes needed — the plugin's generic `kyc.submission.*` routes handle any registered subject key.

## Adding new document types

Extend `KycDocumentTypeEnum` by creating a child class:

```php
namespace App\Enums;

use Botble\Kyc\Enums\KycDocumentTypeEnum as BaseEnum;

class MyKycDocumentTypeEnum extends BaseEnum
{
    public const TRADE_LICENCE = 'trade_licence';
    public const PROOF_OF_ADDRESS = 'proof_of_address';
}
```

Then register the new types in `config/kyc.php → subjects → {scope} → required_documents`:

```php
'required_documents' => [
    'passport',
    'national_id',
    'trade_licence',      // ← new
    'proof_of_address',   // ← new
],
```

Because the plugin's validation rule uses `Rule::in(array_keys(KycDocumentTypeEnum::labels()))`, you must also rebind the validator's request class OR add a custom validator via Laravel's container:

```php
$this->app->bind(
    \Botble\Kyc\Http\Requests\StoreKycSubmissionRequest::class,
    \App\Http\Requests\MyStoreKycSubmissionRequest::class,
);
```

Your custom request extends the plugin's and overrides `rules()` to accept the new types.

Finally, add translation keys in `resources/lang/{locale}/kyc.php → enums.kyc_document_types.trade_licence`.

## Custom notification channels

Notifications extend Laravel's `Notification` class and route through the `mail` channel by default. To add Slack, Vonage, or Discord:

### Step 1 — Override the subject model's `routeNotificationForChannel`

If you're routing to Slack:

```php
public function routeNotificationForSlack($notification): string
{
    return $this->slack_webhook_url;
}
```

### Step 2 — Extend the plugin's notification class

```php
namespace App\Notifications;

use Botble\Kyc\Notifications\KycSubmissionApprovedNotification as BaseNotification;

class MyKycApprovedNotification extends BaseNotification
{
    public function via($notifiable): array
    {
        return ['mail', 'slack'];
    }

    public function toSlack($notifiable)
    {
        // Build a SlackMessage here
    }
}
```

### Step 3 — Bind your subclass

```php
$this->app->bind(
    \Botble\Kyc\Notifications\KycSubmissionApprovedNotification::class,
    \App\Notifications\MyKycApprovedNotification::class,
);
```

## Overriding blade views

Publish the views:

```bash
php artisan vendor:publish --tag=kyc-views
```

Customised views are loaded from `resources/views/vendor/plugins/kyc/` before the plugin's own views. The standalone layout (`layouts/standalone.blade.php`) can also be overridden.

::: warning
If you override a view, you own it — future plugin upgrades won't touch your copy. Track upstream changes manually.
:::

## Custom approval logic

To reject submissions automatically when they fail a third-party check (e.g. IDNow, Onfido), listen to `KycSubmitted` and throw a domain exception:

```php
use Botble\Kyc\Events\KycSubmitted;

public function handle(KycSubmitted $event): void
{
    $result = app(OnfidoClient::class)->verify($event->submission);

    if ($result->isRejected()) {
        app(KycReviewService::class)->reject(
            $event->submission,
            reviewer: null, // System-triggered
            note: 'Auto-rejected by Onfido: ' . $result->reason,
        );
    }
}
```

## Next step

- [Routes Reference](./routes.md) — full route list
- [Webhook Schema](./webhooks.md) — outgoing webhook format
