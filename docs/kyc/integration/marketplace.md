---
title: Marketplace Integration (Customer + Vendor KYC)
description: Add customer and vendor KYC to a Botble marketplace — Martfury-style.
---

# Marketplace Integration

This guide applies to Botble ecommerce scripts that also run `plugins/marketplace` — for example **Martfury**, **Shopwise**, **Wowy**, **Ninico**, etc. You get customer KYC (buyer identity) **and** vendor KYC (seller business verification) from the same plugin. Each scope has its own setting toggle, document type list, and publish gate.

The plugin ships a **plugin-owned standalone UI**. There are no theme views to copy.

## Prerequisites

- `plugins/ecommerce` installed and active
- `plugins/marketplace` installed and active
- `plugins/kyc` installed and active (`php artisan cms:plugin:activate kyc`)

## Step 1 — Enable both scopes

In **Admin → KYC Verification → Settings**:

- **Enable customer KYC** → `ON` (buyer identity check)
- **Required for checkout** (optional) → `OFF` for most marketplaces
- **Enable vendor KYC** → `ON` (business verification before listing)
- **Required for product listings** → `ON` to block vendors from publishing until approved
- **Admin notification email** → defaults to the system admin

The plugin detects marketplace at boot and registers Eloquent macros on **both** `Botble\Ecommerce\Models\Customer` AND `Botble\Marketplace\Models\Store`. No host-plugin file is modified.

## Step 2 — Customer dashboard link (buyer KYC)

In your theme's customer dashboard view, add:

```blade
@if (setting('kyc_customer_enabled'))
    <a href="{{ route('kyc.submission.index', ['subjectKey' => 'customer']) }}">
        {{ trans('plugins/kyc::kyc.title') }}
    </a>
@endif
```

## Step 3 — Vendor dashboard link (seller KYC)

In your theme's **vendor** dashboard view — typically `platform/themes/{theme}/views/marketplace/dashboard/...` — add a second link pointing at the `vendor` subject:

```blade
@if (setting('kyc_vendor_enabled'))
    <a href="{{ route('kyc.submission.index', ['subjectKey' => 'vendor']) }}">
        {{ trans('plugins/kyc::kyc.title') }}
    </a>
@endif
```

The plugin's `SubjectRegistry::authenticatedSubject('vendor', $request)` automatically resolves the authenticated customer's owned `Store` via the marketplace `Customer → Store` relation.

Optional status badge next to the store's name:

```blade
{!! auth('customer')->user()?->store?->kycStatusBadge('vendor') !!}
```

## Step 4 — Gate vendor product listings

Wrap the marketplace "create product" or "publish product" route with the vendor listing gate:

```php
use Illuminate\Support\Facades\Route;

Route::middleware(['kyc.required:vendor:listing'])->group(function () {
    Route::post('marketplace/vendor/products', [VendorProductController::class, 'store']);
    // Or your marketplace's status-transition endpoint if it uses a separate publish action
});
```

Alternatively, add the middleware in `platform/themes/{theme}/routes/web.php` wrapping the relevant marketplace routes. See [Checkout & Listing Gates](./gates.md) for the full middleware reference.

The middleware:

1. Checks `kyc_vendor_enabled` → if OFF, passes through
2. Checks `kyc_vendor_required_for_listing` → if OFF, passes through
3. Resolves the authenticated customer's store via `auth('customer')->user()?->store`
4. Checks `$store->hasApprovedKyc('vendor')` → if true, passes through
5. Otherwise redirects to the vendor KYC submission page with an error flash

## Vendor document types

Vendors submit business documents (distinct from customer ID docs):

- Business licence
- Tax certificate
- Utility bill
- Articles of incorporation
- Bank statement
- VAT certificate
- Passport (for director identity verification)

The customer-scope KYC uses only passport / national ID / driving licence. Both scopes are enforced server-side via `SubjectDefinition::$requiredDocuments`.

## Dual-subject flow summary

| Scope | Who submits | What they upload | Gated action |
|---|---|---|---|
| `customer` | Any logged-in customer | ID documents | Checkout (optional) |
| `vendor` | Customer who owns a Store | Business documents | Product listing publish |

A single customer who also owns a store can (and usually must) complete **both** flows. They are independent: approving `customer` KYC does not approve `vendor` KYC — they are separate compliance paths.

## Retention, lockout, webhook, GDPR

Same as [ecommerce integration](./ecommerce.md):

- 7-day retention for rejected + approved files (configurable)
- Auto-lock after 3 rejections, admin unlock action
- Optional HMAC-signed webhooks on submit/approve/reject/expire (see [Webhook Schema](../developer/webhooks.md))
- GDPR self-service export per subject type (see [GDPR Export](./gdpr-export.md))

## Route names reference

| Route | Use |
|---|---|
| `kyc.submission.index` | Customer/vendor submission form (pass `subjectKey=customer` or `subjectKey=vendor`) |
| `kyc.submission.store` | POST target for the form |
| `kyc.submission.locked` | Lockout state page |
| `kyc.submission.export` | GDPR JSON export |
| `kyc.submissions.index` | Admin review queue |
| `kyc.submissions.view` | Admin detail page |
| `kyc.submissions.approve` | Admin approve POST |
| `kyc.submissions.reject` | Admin reject POST |
| `kyc.submissions.unverify` | Admin revoke approval POST |
| `kyc.submissions.unlock` | Admin unlock POST |
| `kyc.settings.edit` | Admin settings page |
| `kyc.file.show` | Signed URL file serve (15-min TTL) |

## What this plugin does NOT modify

- `plugins/ecommerce` — untouched
- `plugins/marketplace` — untouched
- Your theme views — untouched except for the two `<a>` tags above
- Your routes file — untouched except for the optional `kyc.required:vendor:listing` middleware wrapping the product publish route

All Eloquent relations are injected via Botble's `MacroableModels::addMacro()` at runtime in the plugin service provider. Upgrade the host plugins freely — your KYC integration keeps working.

## Troubleshooting

- **"Vendor KYC link doesn't show"** — the authenticated customer must have a marketplace `Store` record. A customer who hasn't upgraded to vendor yet has no store, so the vendor flow is hidden by design.
- **"Listing gate doesn't block"** — verify the middleware is actually applied to the exact route your vendor uses to publish. Test with `php artisan route:list | grep product` and check the middleware column.
- **"Customer and vendor subjects share a status"** — they don't. Approving customer KYC leaves vendor KYC in its own state.

## Next step

- [Checkout & Listing Gates](./gates.md) — full middleware reference
- [Theme Integration](./theme.md) — optional theming
