---
title: Checkout & Listing Gates
description: Route middleware that blocks gated actions until a subject has an approved KYC submission.
---

# Checkout & Listing Gates

The plugin ships a single configurable middleware, `kyc.required`, which you can apply to any route that should be gated on KYC approval. There are two preset contexts — **checkout** (customer scope) and **listing** (vendor scope) — but the middleware is generic enough to guard any custom route.

## Middleware signature

```php
Route::middleware(['kyc.required:{subjectKey}:{gateContext}'])->group(...);
```

| Parameter | Values | Meaning |
|---|---|---|
| `subjectKey` | `customer`, `vendor` | Which subject registry entry to resolve from the authenticated user |
| `gateContext` | `checkout`, `listing`, or any custom string | Determines which setting flag is checked and which redirect URL is used |

## Checkout gate (customer KYC)

```php
Route::middleware(['kyc.required:customer:checkout'])->group(function () {
    Route::post('checkout', [CheckoutController::class, 'process'])
        ->name('public.checkout.process');
});
```

**Checks performed in order:**

1. `kyc_customer_enabled` setting → if OFF, skip
2. `kyc_customer_required_for_checkout` setting → if OFF, skip
3. Resolve authenticated customer via `auth('customer')->user()`
4. Call `$customer->hasApprovedKyc('customer')`
5. If true, pass through; otherwise flash an error and redirect to `kyc.submission.index` with `subjectKey=customer`

**Apply it to:**
- The POST checkout route (recommended — does not block browsing the cart)
- Or the entire `/checkout` prefix if you want to prevent even viewing the checkout page

## Real-estate publishing gate (agent KYC)

```php
Route::middleware(['kyc.required:realestate_account:publishing'])->group(function () {
    Route::post('account/properties', [AccountPropertyController::class, 'store'])
        ->name('public.account.properties.store');
});
```

**Checks:**

1. `kyc_realestate_enabled` setting
2. `kyc_realestate_required_for_publishing` setting
3. Resolves the authenticated agent via `auth('account')->user()`
4. `$agent->hasApprovedKyc('realestate_account')`

**Apply it to:** the property store route. The middleware composes with the existing `EnsureAccountIsApproved` middleware and any credits-based gate — chain them in the order you want.

## Job-board posting gate (employer KYC)

```php
Route::middleware(['kyc.required:jobboard_company:posting'])->group(function () {
    Route::post('account/jobs', [AccountJobController::class, 'store'])
        ->name('public.account.jobs.store');
});
```

**Checks:**

1. `kyc_jobboard_company_enabled` setting
2. `kyc_jobboard_required_for_posting` setting
3. Resolves the employer's company via the `Account → companies` many-to-many pivot (default `->first()`, honours `?company_id=N`)
4. `$company->hasApprovedKyc('jobboard_company')`

**Apply it to:** the "post a new job" route. Multi-company employers targeting a specific company use the `?company_id=N` URL parameter — see [job-board integration](./job-board.md#multi-company-employers).

## Listing gate (vendor KYC)

```php
Route::middleware(['kyc.required:vendor:listing'])->group(function () {
    Route::post('marketplace/vendor/products', [VendorProductController::class, 'store']);
    Route::put('marketplace/vendor/products/{id}/publish', [VendorProductController::class, 'publish']);
});
```

**Checks:**

1. `kyc_vendor_enabled` setting
2. `kyc_vendor_required_for_listing` setting
3. Resolves the customer's `Store` via `auth('customer')->user()?->store` (marketplace owner_relation)
4. `$store->hasApprovedKyc('vendor')`

**Apply it to:**
- The vendor "create product" POST
- The vendor "publish" status transition (if your marketplace uses a separate publish action)
- NOT the vendor dashboard index — vendors should be able to see the dashboard even without KYC so they can click the KYC link

## Middleware in a group

You can nest the KYC gate inside an existing auth group:

```php
Route::middleware(['web', 'customer', 'kyc.required:customer:checkout'])
    ->group(function () {
        // All routes here require a logged-in customer with approved customer KYC
    });
```

## Redirect target

When the gate fails, the middleware flashes an error and redirects to:

- **Customer scope** → `route('kyc.submission.index', ['subjectKey' => 'customer'])`
- **Vendor scope** → `route('kyc.submission.index', ['subjectKey' => 'vendor'])`

Customise the redirect target by overriding the `KycRequiredMiddleware` class in your `AppServiceProvider`.

## Custom gate contexts

You can pass any string as `gateContext`. The middleware uses this value when flashing the error message (`'plugins/kyc::kyc.gate_required.{gate}'` translation key) but the approval check itself is scope-wide — any approved submission in the scope satisfies the gate.

Example — guard a premium "request vendor payout" endpoint with a custom gate context:

```php
Route::middleware(['kyc.required:vendor:payout'])
    ->post('marketplace/vendor/payouts', [PayoutController::class, 'request']);
```

Add the translation key `plugins/kyc::kyc.gate_required.payout` if you want a custom error message; otherwise the plugin falls back to a generic "KYC approval required" message.

## Check in Blade

To pre-emptively show / hide UI without hitting the middleware, check in Blade:

```blade
@if (auth('customer')->user()?->hasApprovedKyc('customer'))
    <button>Proceed to checkout</button>
@else
    <a href="{{ route('kyc.submission.index', ['subjectKey' => 'customer']) }}">
        Verify your identity first
    </a>
@endif
```

## Check in controller

```php
use Illuminate\Http\Request;

public function checkout(Request $request)
{
    $customer = $request->user('customer');

    if (! $customer->hasApprovedKyc('customer')) {
        return redirect()
            ->route('kyc.submission.index', ['subjectKey' => 'customer'])
            ->with('error', __('plugins/kyc::kyc.gate_required.checkout'));
    }

    // ... proceed
}
```

## Next step

- [GDPR Data Export](./gdpr-export.md) — the subject-facing data export endpoint
- [Events & Hooks](../developer/events.md) — react to approve/reject events
