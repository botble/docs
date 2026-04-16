---
title: Real Estate Integration (Agent KYC)
description: Add agent identity verification to any Botble real-estate theme — Homzen, Hasa, or Flex-Home.
---

# Real Estate Integration (Agent KYC)

This guide applies to any Botble real-estate theme that ships on `plugins/real-estate` — for example **Homzen**, **Hasa**, and **Flex-Home**. Agents log in with the `account` guard and publish property listings through their own dashboard. The KYC plugin adds a self-service identity verification flow for those agents and lets you optionally gate property publishing on approval.

The plugin ships a **plugin-owned standalone UI**. You add one dashboard link to your theme. No views to copy. No host-plugin edits.

## Prerequisites

- `plugins/real-estate` installed and active
- `plugins/kyc` installed and active (`php artisan cms:plugin:activate kyc`)

![KYC settings page — the Real Estate Agent KYC section appears when plugins/real-estate is installed](../images/kyc-settings.png)

## Step 1 — Enable real-estate KYC

In **Admin → KYC Verification → Settings** the **Real Estate Agent KYC** section appears automatically when the host plugin is installed:

- **Enable real-estate agent KYC** → `ON`
- **Require KYC to publish property listings** (optional) → `ON` if you want the middleware to block the publish action until the agent has an approved submission
- **Admin notification email** → defaults to your system admin email if blank

On save, the plugin registers Eloquent macros on `Botble\RealEstate\Models\Account`. **No host-plugin or theme file is modified.**

## Step 2 — Add a dashboard link

Open your theme's agent dashboard view — typically `platform/themes/{theme}/views/real-estate/dashboard/index.blade.php` or similar. Add:

```blade
@if (setting('kyc_realestate_enabled') && auth('account')->check())
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">
                {{ trans('plugins/kyc::kyc.name') }}
                {!! auth('account')->user()->kycStatusBadge('realestate_account') !!}
            </h5>
            <a href="{{ route('kyc.submission.index', ['subjectKey' => 'realestate_account']) }}"
               class="btn btn-primary">
                {{ trans('plugins/kyc::kyc.action.verify_identity') ?? 'Verify your identity' }}
            </a>
        </div>
    </div>
@endif
```

Clicking the link opens the plugin-owned submission form in the standalone Tabler layout — no theme blade changes beyond this one block.

## Step 3 — Gate property publishing (optional)

Wrap the property store route with the `kyc.required` middleware:

```php
// platform/themes/{theme}/routes/web.php (or your end-product's route file)
use Illuminate\Support\Facades\Route;

Route::middleware(['kyc.required:realestate_account:publishing'])->group(function () {
    Route::post('account/properties', [AccountPropertyController::class, 'store'])
        ->name('public.account.properties.store');
});
```

The middleware:

1. Checks `kyc_realestate_enabled` → if OFF, passes through
2. Checks `kyc_realestate_required_for_publishing` → if OFF, passes through
3. Resolves the authenticated agent via `auth('account')->user()`
4. Checks `$account->hasApprovedKyc('realestate_account')` → if true, passes through
5. Otherwise redirects to the KYC submission page with an error flash

::: tip
The middleware composes with `plugins/real-estate`'s existing `EnsureAccountIsApproved` middleware and the credits-based publishing gate. Place `kyc.required` **after** those so unapproved agents hit the account-approval redirect first.
:::

## Step 4 — Host column mirror

When an admin approves a `realestate_account` submission, the plugin writes the decision back to `re_accounts.is_verified + verified_at + verified_by` so the existing real-estate admin UI reflects the KYC state without any edits to the host plugin.

On rejection, the plugin reverts `is_verified = false` **only when no other approved `realestate_account` submission remains for the same agent**. Admin-set manual verifications (set outside the KYC flow) are never touched — they cannot trigger a rejection event.

See [Events & Hooks](../developer/events.md) for the listener implementation.

## What this plugin does NOT modify

- `plugins/real-estate` — untouched
- `Botble\RealEstate\Models\Account` — untouched (macros attached via `MacroableModels::addMacro` at runtime)
- Your theme views — untouched except for the one dashboard link above
- The credits system — untouched (KYC composes with credits, doesn't replace it)

## Compatibility note

`plugins/real-estate` binds the Laravel `account` guard at service-provider boot. `plugins/job-board` also binds `account`. A single Botble installation can therefore run **either** real-estate **or** job-board — not both simultaneously. This is a pre-existing Botble constraint, not a KYC limitation.

## Troubleshooting

- **"Verify your identity link doesn't appear"** — confirm `kyc_realestate_enabled` is ON and the agent is logged in under the `account` guard. Clear config cache: `php artisan config:clear`.
- **"Middleware doesn't block publishing"** — run `php artisan route:list | grep properties.store` to confirm the `kyc.required:realestate_account:publishing` middleware actually landed on the route. Route caching may need clearing: `php artisan route:clear`.
- **"`is_verified` flipped by KYC disagrees with an earlier admin-set value"** — the mirror listener only writes on explicit KYC events. If both the listener and an admin touch the column out-of-order, the last writer wins. Document your team's verification process.

## Next step

- [Job Board Integration](./job-board.md) — dual-scope employer + candidate flow
- [Checkout & Listing Gates](./gates.md) — full middleware reference
