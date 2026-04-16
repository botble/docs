---
title: Events & Hooks
description: Laravel events dispatched by the KYC Verification plugin and how to listen to them.
---

# Events & Hooks

All side effects (notifications, webhooks, counters) in the plugin are triggered by Laravel events. You can listen to them to run your own custom logic — activate a vendor, send a Slack message, update a CRM, etc.

## Events

| Event | Dispatched when | Payload |
|---|---|---|
| `Botble\Kyc\Events\KycSubmitted` | A new submission is POSTed by the subject | `$submission` (KycSubmission) |
| `Botble\Kyc\Events\KycApproved` | An admin approves a submission | `$submission`, `$reviewer` (admin user), `$note` (string \| null) |
| `Botble\Kyc\Events\KycRejected` | An admin rejects a submission OR an approved submission is revoked via Unverify | `$submission`, `$reviewer`, `$note`, `$unverified` (bool) |
| `Botble\Kyc\Events\KycExpired` | The nightly `kyc:expire` command flips an approved submission | `$submission` |

All four events implement Laravel's standard `dispatch()` contract and are synchronous by default — the plugin's own listeners run before your request returns.

## Listening to an event

Register listeners in your own app's `EventServiceProvider`:

```php
namespace App\Providers;

use Botble\Kyc\Events\KycApproved;
use Botble\Kyc\Events\KycRejected;
use Botble\Kyc\Events\KycExpired;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        KycApproved::class => [
            \App\Listeners\ActivateVendorStoreListener::class,
        ],
        KycRejected::class => [
            \App\Listeners\NotifySalesTeamListener::class,
        ],
        KycExpired::class => [
            \App\Listeners\SuspendExpiredVendorListener::class,
        ],
    ];
}
```

## Example listener: activate a vendor store on approval

```php
namespace App\Listeners;

use Botble\Kyc\Events\KycApproved;
use Botble\Marketplace\Models\Store;

class ActivateVendorStoreListener
{
    public function handle(KycApproved $event): void
    {
        $submission = $event->submission;

        if ($submission->subject_key !== 'vendor') {
            return;
        }

        $store = $submission->verifiable; // Resolves via polymorphic relation

        if ($store instanceof Store && ! $store->is_verified) {
            $store->forceFill(['is_verified' => true])->save();
        }
    }
}
```

## Example listener: ping Slack on rejection

```php
namespace App\Listeners;

use Botble\Kyc\Events\KycRejected;
use Illuminate\Support\Facades\Http;

class NotifySalesTeamListener
{
    public function handle(KycRejected $event): void
    {
        Http::post(config('services.slack.kyc_webhook_url'), [
            'text' => sprintf(
                ':x: KYC rejected for %s (%s). Reason: %s',
                $event->submission->verifiable?->getAttribute('name') ?? 'Unknown',
                $event->submission->subject_key,
                $event->note ?? 'no note',
            ),
        ]);
    }
}
```

## Queueing listeners

If your listener makes network calls, make it implement `ShouldQueue` so it doesn't block the HTTP response:

```php
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifySalesTeamListener implements ShouldQueue
{
    public $queue = 'kyc';
    // ...
}
```

## Botble hooks vs Laravel events

The plugin primarily uses **Laravel events** (not Botble's `apply_filters` / `do_action` hooks) because:
- Events are strongly typed — IDE autocomplete works on the listener's `handle()` signature
- Events integrate with Laravel's queue worker out of the box
- Events are easier to unit test

Botble hooks are still available if you need them — the plugin exposes `kyc.before_approve`, `kyc.after_approve`, `kyc.before_reject`, `kyc.after_reject` as filter points you can modify the submission payload through:

```php
add_filter('kyc.before_approve', function ($submission) {
    // Mutate $submission here
    return $submission;
});
```

## Overriding plugin listeners

The plugin's own listeners (webhook dispatcher, admin notification sender) are registered in `Botble\Kyc\Providers\EventServiceProvider`. You can rebind them via the service container in your `AppServiceProvider::register()`:

```php
$this->app->bind(
    \Botble\Kyc\Listeners\DispatchKycApprovedWebhookListener::class,
    \App\Listeners\MyCustomKycApprovedWebhookListener::class,
);
```

## Next step

- [Extending KYC](./extending.md) — add new scopes, document types, channels
- [Webhook Schema](./webhooks.md) — outgoing webhook payload format
