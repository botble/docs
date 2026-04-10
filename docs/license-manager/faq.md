# Frequently Asked Questions

## General

### Is the License Manager a SaaS product?

No. The License Manager is a **self-hosted solution**. You install it on your own server and you own the entire system — the server, database, and all license data. The API settings you see in the admin panel are for your plugins/products to communicate with your License Manager installation, not for connecting to an external service.

### Subdomain vs Plugin: Which deployment should I choose?

You have two deployment options:

| Approach | Admin Panel | Customer Frontend | Database |
|----------|------------|-------------------|----------|
| **Subdomain** (recommended) | Separate admin at `license.yourdomain.com` | Full customer portal (login, manage licenses, self-service) | Separate database |
| **Plugin in existing CMS** | Same admin panel as your CMS | **Not available** unless your theme supports it | Shared database |

**We recommend the subdomain approach** because:
- Full customer-facing frontend works out of the box
- Customers can self-manage their licenses (activate, deactivate, view history)
- Independent from your main site — if your main site goes down for maintenance, license verification still works

If you install it as a plugin, the admin dashboard works fine, but the frontend customer portal will **only work if your theme has been built to support the License Manager plugin views**. Most themes (e.g., Iori, Shofy, Nest) do not include these views.

::: tip
You can link to your subdomain License Manager from your main site's menu or footer so customers can easily access it.
:::

### Does the License Manager only work with Envato?

No. The License Manager is a **fully standalone license system**. Envato integration is just one optional feature. You can generate and manage your own license codes (UUID, ULID, or custom patterns) completely independently — no Envato account required.

### Does it only work with Laravel or PHP?

No. The License Manager **server** is built on Laravel, but your **client application** can be written in any language. The API is a standard REST API — any app that can make HTTP requests can integrate with it. We provide ready-to-use examples for PHP, Laravel, WordPress, .NET/C#, Java, Python, Django, Node.js, and Ruby on Rails. See [Integration Examples](/license-manager/examples) for details.

### Can I use it to license my WordPress plugins or themes?

Yes. We provide a complete [WordPress example](https://github.com/botble/license-manager-examples/tree/main/wordpress) with admin settings page, license activation/deactivation, automatic plugin update checking, one-click updates, and WP-Cron daily verification. It also includes instructions for adapting it for theme updates.

### Can I use it to create a license system for my own products?

Absolutely. That's the primary use case. Create products in the admin panel, generate license codes, and use the REST API to activate and verify licenses from any of your applications — whether it's a WordPress plugin, Laravel package, SaaS app, desktop software, or mobile app.

### Can I sell licenses from my store and verify them on another site?

Yes. A typical workflow:

1. Customer purchases from your store (e.g., Shofy, WooCommerce, or any e-commerce platform)
2. Your store calls the [Internal API](/license-manager/api#internal-api) to generate a license code
3. Customer enters the code on another site (e.g., a blog or news site)
4. That site calls the [External API](/license-manager/api#external-api) to activate and verify the license

The API handles activation, verification, and deactivation across sites.

### Can I install it as a Botble CMS plugin?

Yes. If you want to install License Manager as a plugin inside an existing Botble CMS site (instead of as a standalone app), it requires **Botble CMS v7.5.0+** running on Laravel 13.x with PHP 8.3 or higher. Upload the zip through the admin panel or extract it to `platform/plugins/license-manager`. Note: the standalone deployment is recommended for most use cases — see [Subdomain vs Plugin](#subdomain-vs-plugin-which-deployment-should-i-choose).

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

### Can users deactivate a license and reactivate it on another domain?

Yes. The API supports license deactivation and reactivation. Users can deactivate their license on one domain (freeing up a parallel use slot) and then activate it on a new domain. Use the [deactivate](/license-manager/api#deactivate-license) and [activate](/license-manager/api#activate-license) API endpoints. If you use the subdomain deployment, the customer portal provides a UI for this out of the box.

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
