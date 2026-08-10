# Filters, Actions & Events

License Manager exposes hooks so you can change API responses, add your own activation rules, and
react to license events **without patching plugin files**. Code written against these hooks survives
updates; edits to `platform/plugins/license-manager` do not.

## Where your code goes

Put your hooks in your own plugin, and register them in that plugin's service provider `boot()`:

```php
namespace Botble\YourPlugin\Providers;

use Illuminate\Support\ServiceProvider;

class YourPluginServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        add_filter('lm_api_verification_response', function (array $response, $activation = null, $product = null) {
            // ...
            return $response;
        }, 20, 3);
    }
}
```

::: danger The fourth argument is not optional in practice
`add_filter(string $hook, callable $callback, int $priority = 20, int $arguments = 1)` passes
**one** argument by default. A filter documented with three parameters will silently receive only
the first unless you pass `3`. This is the single most common mistake with these hooks - the symptom
is a "too few arguments" error, or a callback that quietly sees `null` where it expected a model.
:::

A filter **must return a value** - whatever it returns replaces the original. An action returns
nothing.

### Null arguments

The hook dispatcher collects arguments with `isset()`, which is false for `null`. Two consequences,
and both bite the filters below:

- **A null argument is dropped, and every later argument shifts left.** `lm_api_verification_response`
  is documented as `array $response, ?ProductActivation $activation, Product $product`, but on a
  *failed* verification the activation is null, so your listener receives two arguments with the
  product sitting in the activation position.
- **A null starting value arrives as an empty string.** Every `lm_resolve_*_header` filter starts
  from null, so `$value` reaches you as `''`, never `null`.

Write listeners that tolerate both. Give trailing parameters defaults, leave them untyped, and test
with `instanceof` rather than a type hint:

```php
add_filter('lm_api_verification_response', function (array $response, $activation = null, $product = null) {
    if (! $activation instanceof ProductActivation) {
        return $response; // failed verification, or a shifted argument list
    }

    return $response;
}, 20, 3);
```

Signatures in the tables below describe what each hook *intends* to pass. A parameter that can be
null may not arrive in the position shown.

## Worked example: per-license custom fields

A common need is licensing your own software with per-license entitlements - a feature flag, a seat
count, a plugin limit - and having your client read them at verification time. License Manager
stores no arbitrary data against a license, so you keep the values in your own table and append them
to the verify response.

**1. Your table**, keyed by license code:

```php
Schema::create('my_license_features', function (Blueprint $table) {
    $table->id();
    $table->string('license_code', 100)->unique();
    $table->unsignedInteger('max_plugins')->default(0);
    $table->boolean('can_export')->default(false);
    $table->timestamps();
});
```

**2. Append them to the verify response:**

```php
use Botble\LicenseManager\Models\ProductActivation;

// Note the defaults and the absent type hints - see "Null arguments" below for why they matter.
add_filter('lm_api_verification_response', function (array $response, $activation = null, $product = null) {
    // Never add entitlements to a failed verification.
    if (! $activation instanceof ProductActivation) {
        return $response;
    }

    $features = DB::table('my_license_features')
        ->where('license_code', $activation->license_code)
        ->first();

    $response['features'] = [
        'max_plugins' => (int) ($features->max_plugins ?? 0),
        'can_export' => (bool) ($features->can_export ?? false),
    ];

    return $response;
}, 20, 3);
```

Your client then reads `features` from the verify response it already receives.

**3. Invalidate the cache when you change a value.** See the section below - without this your client
keeps the old entitlements for up to an hour.

::: warning Entitlements are advisory unless your client enforces them
The verify response is transport, not enforcement. A modified client can ignore any field in it.
Treat these values as configuration for a cooperative client, and keep anything security-critical
server-side.
:::

## Response caching and your filters

Successful verify responses are cached, **including whatever your filter added**. The key is derived
from the product, the encrypted license payload, the caller IP and the locale, so it is per
installation - appending per-license data is safe and never leaks between licenses.

What it does mean:

- Changing a row in **your own** table does not invalidate anything. The client keeps seeing the old
  values until the entry expires (`lm_verify_cache_ttl`, default 3600 seconds).
- Editing the license or activation **in admin** does invalidate, automatically.

So flush the product's cached responses whenever you change your own data:

```php
use Botble\LicenseManager\Support\VerifyCache;

VerifyCache::flush($product->reference_id);
```

That bumps a per-product epoch, making every cached response for the product unreachable at once.
Alternatively set the verify cache TTL to `0` in **Admin → Settings → License Manager → General**
while you are developing.

The same applies to `lm_api_update_check_response`, cached under `lm_update_check_cache_ttl`
(default 1800 seconds).

## API response filters

Each returns the response array, which is sent to the client as JSON.

| Filter | Arguments | Fires on |
|--------|-----------|----------|
| `lm_api_verification_response` | `array $response, ?ProductActivation $activation, Product $product` | Every verify call. `$activation` is `null` when verification failed |
| `lm_api_activation_success_response` | `array $response, ProductActivation $activation, Product $product, ProductLicense $license` | Successful activation |
| `lm_api_activation_failed_response` | `array $response, Product $product, Request $request` | Failed activation |
| `lm_api_deactivation_response` | `array $response, ProductActivation $activation, Product $product` | Deactivation |
| `lm_api_license_check_response` | `array $response, mixed $data` | Purchase-code check |
| `lm_api_update_check_response` | `array $response, ProductVersion $version, Product $product` | Update check |
| `lm_api_update_latest_response` | `array $response, ProductVersion $version, Product $product` | Latest-version lookup |

## Activation policy filters

These decide whether an activation is allowed. Return a boolean.

| Filter | Arguments | Purpose |
|--------|-----------|---------|
| `lm_is_domain_allowed` | `bool $allowed, ?string $clientDomain, array $domains, Product $product, ProductLicense $license` | Override domain matching - useful when the identifier is not really a domain, e.g. a hardware fingerprint |
| `lm_is_ip_allowed` | `bool $allowed, ?string $clientIp, array $ips, Product $product, ProductLicense $license` | Override IP matching |
| `lm_activation_license_resolvers` | `array $resolvers` | Register a `verify_type => callable` resolver that turns a request into a `ProductLicense`. This is how the Envato, Gumroad and Lemon Squeezy companion plugins attach |
| `lm_verify_types` | `array $types` | Add a `verify_type` value accepted by validation. Register the matching resolver above, or activation will fail with a missing-companion error |
| `lm_verify_purchase_code` | `mixed $data, string $purchaseCode` | Resolve a purchase code through your own provider |

### Licensing desktop software by hardware ID

There is no separate hardware-binding field. The activation identity is whatever the client sends in
the `X-API-URL` header, and that value is stored as the licensed "domain", so a desktop client can
send a machine fingerprint as a URL:

```
X-API-URL: https://a1b2c3d4e5f6.local
```

`parallel_uses` on the license then caps how many machines may run it, and
**Add domain of first activation as licensed domain** in settings registers the first machine
automatically. Use `lm_is_domain_allowed` if you need matching rules of your own.

Be aware this reuses the domain field: fingerprints appear in a column and a UI labelled *Domains*.

## Request resolution filters

Return the value when the standard header is absent - useful behind proxies that rewrite headers.

`$value` is the value resolved so far. It starts as null and therefore reaches your listener as an
**empty string** - see "Null arguments" above. Do not type-hint it as `?string` and do not compare
it with `=== null`.

| Filter | Arguments | Replaces |
|--------|-----------|----------|
| `lm_resolve_url_header` | `string $value, Request $request` | `X-API-URL` |
| `lm_resolve_ip_header` | `string $value, Request $request` | `X-API-IP` |
| `lm_resolve_api_key_header` | `string $value, Request $request` | `X-API-KEY` |
| `lm_resolve_language_header` | `string $value, Request $request` | `X-API-LANGUAGE` |
| `lm_resolve_rate_limit_key` | `string $value, Request $request` | The rate-limit bucket key |

## Admin and model filters

| Filter | Arguments | Purpose |
|--------|-----------|---------|
| `lm_product_fillable` | `array $fields` | Add mass-assignable fields to `Product` |
| `lm_product_request_rules` | `array $rules` | Add validation rules to the product form |
| `lm_settings_request_rules` | `array $rules` | Add validation rules to the settings form |
| `lm_webhook_payload` | `array $payload, string $eventType` | Change an outgoing webhook body |
| `lm_customer_account_upload_folder` | `string $folder, Customer $customer` | Change a customer's upload folder |

## Actions

Actions return nothing. Use them for side effects - logging, notifications, syncing to another
system.

| Action | Arguments |
|--------|-----------|
| `lm_license_activated` | `ProductActivation $activation, Product $product, ProductLicense $license` |
| `lm_license_activation_failed` | `Product $product, Request $request, string $message` |
| `lm_license_verified` | `ProductActivation $activation, Product $product` |
| `lm_license_verification_failed` | `Product $product, Request $request` |
| `lm_license_deactivated` | `ProductActivation $activation, Product $product` |
| `lm_update_downloaded` | `ProductVersion $version, Product $product, string $type` |
| `lm_product_form` | `FormAbstract $form, ?Product $product` |
| `lm_settings_integrations_form` | `FormAbstract $form` |

## Events

The same moments are also Laravel events, in `Botble\LicenseManager\Events`. Prefer these when you
want queued listeners or Laravel's event tooling; prefer actions for simple inline callbacks.

Every constructor argument is a public promoted property, so the name in the signature is the name
you read off the event.

| Event | Public properties |
|-------|-------------------|
| `LicenseActivated` | `$activation`, `$product`, `$licenseCode` |
| `LicenseActivationFailed` | `$product`, `$request`, `$reason` |
| `LicenseVerified` | `$activation`, `$product` |
| `LicenseVerificationFailed` | `$product`, `$request` |
| `LicenseDeactivated` | `$activation`, `$product` |
| `UpdateDownloaded` | `$productVersion`, `$product`, `$type` |

```php
use Botble\LicenseManager\Events\LicenseActivated;
use Illuminate\Support\Facades\Event;

Event::listen(function (LicenseActivated $event) {
    // $event->activation, $event->product
});
```

Actions and events fire together for the same moment, so listen to one or the other, not both, or
your side effect runs twice.
