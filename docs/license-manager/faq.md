# Frequently Asked Questions

## General

### Does the License Manager only work with Envato/CodeCanyon?

No. The License Manager is a **fully standalone license system**. Envato integration is just one optional feature. You can generate and manage your own license codes (UUID, ULID, or custom patterns) completely independently — no Envato account required.

### Can I use it to create a license system for my own products?

Absolutely. That's the primary use case. Create products in the admin panel, generate license codes, and use the REST API to activate and verify licenses from any of your applications — whether it's a WordPress plugin, Laravel package, SaaS app, or desktop software.

### Can I sell licenses from my store and verify them on another site?

Yes. A typical workflow:

1. Customer purchases from your store (e.g., Shofy, WooCommerce, or any e-commerce platform)
2. Your store calls the [Internal API](/license-manager/api#internal-api) to generate a license code
3. Customer enters the code on another site (e.g., a blog or news site)
4. That site calls the [External API](/license-manager/api#external-api) to activate and verify the license

The API handles activation, verification, and deactivation across sites.

### What Botble CMS version is required?

License Manager requires **Botble CMS v7.5.0+** running on Laravel 12.x with PHP 8.2 or higher. It installs as a standard Botble plugin — upload the zip through the admin panel or extract it to `platform/plugins/license-manager`.

## Licensing & Activation

### Can I limit how many sites a single license can be used on?

Yes. Each license has a **parallel uses** setting that controls the maximum number of simultaneous activations. You can also restrict licenses to specific domains or IP addresses for tighter control. See [Licenses](/license-manager/licenses) for details.

### What license code formats are supported?

Four formats are available:

| Format | Example |
|--------|---------|
| **UUID** (default) | `550e8400-e29b-41d4-a716-446655440000` |
| **ULID** | `01ARZ3NDEKTSV4RRFFQ69G5FAV` |
| **Random** | Configurable length (up to 100 characters) |
| **Custom pattern** | `%Z%Z%Z%Z-%Z%Z%Z%Z-%Z%Z%Z%Z` where `%X` = number, `%Y` = letter, `%Z` = mixed |

Configure the format in **Settings > License > General**.

## Subscriptions & Payments

### Does it support subscriptions or recurring billing?

The License Manager handles license expiration and renewal dates but does **not include payment processing**. You'd pair it with your existing payment system (Stripe, PayPal, etc.) — when a subscription renews, your payment webhook calls the API to extend the license's `expires_at` date.

### How do I handle license renewals?

Use the [Internal API](/license-manager/api#internal-api) to update the `expires_at` field when a customer renews. For example, your Stripe webhook handler would call the API to extend the expiration date upon successful payment.

## Security & API

### Is the REST API secure?

Yes. The API uses **scoped API keys** with fine-grained permissions, AES-128/256 encryption for license data, rate limiting, IP blacklisting, and full audit logging. Internal and external APIs are separated with different authentication layers. See [API Reference](/license-manager/api) for details.

## Customer Portal

### Do my customers get a self-service portal?

Yes. Customers can register, log in (including via Envato OAuth), view their licenses, manage activations (add/remove domains), update their profile, and reset their password — all from a built-in customer portal. See [Customers](/license-manager/customers) for details.

## Updates & Distribution

### Can I distribute software updates through the License Manager?

Yes. Upload product versions with changelogs and files. Licensed users can check for updates and download them via the API. You can control update access with the `updates_until` date on each license. See [Products](/license-manager/products) and [API Reference](/license-manager/api#update-endpoints) for details.
