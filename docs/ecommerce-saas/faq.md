---
title: FAQ
description: Frequently asked questions about hosting, licensing, billing, stores, themes and support.
---

# FAQ

## Hosting and requirements

### Can it run on shared hosting?

**Realistically, no.** Three things block it, and shared hosting rarely offers any of them:

- a MySQL user with **global `CREATE DATABASE` / `DROP DATABASE`** — each store gets its own database;
- a **real queue connection and a long-lived worker** — without one, a new store stays `pending` forever;
- **wildcard DNS and a wildcard TLS certificate** — stores are subdomains, and Let's Encrypt wildcards are DNS-01 only.

**Redis is not a blocker.** Cache isolation is prefix-based, and `CACHE_STORE=database` is the shipped default, so no extra service is required.

Note this is about *shared hosting*, not about control panels. aaPanel, CloudPanel, cPanel/WHM, Plesk and DirectAdmin all run fine on a VPS where you hold root and the three capabilities above — though we have no tested installs on them. See [Choosing a server](./installation-hosting.md).

### Does each store really get its own database?

Yes. Built on [stancl/tenancy v3](https://tenancyforlaravel.com). Each store has its own MySQL database (`tenant_<id>`), storage folder, cache namespace, and session. Nothing is shared between stores.

### How many stores can I run on one server?

Depends on your server and on how much catalog and media each store carries, so treat any single number with suspicion. What we can state precisely: each store is **183 tables** in its own database plus its own `storage/tenants/<id>` tree, and `tenancy:schedule` iterates every store, so scheduled work grows linearly and wants sharding past a few hundred stores.

Plan by watching MySQL `max_connections`, `table_open_cache` and the open-file ulimit — those bind before CPU does. Stores are independent, but they share the box: if it runs out of disk or RAM, every store degrades together. See [Sizing](./installation-requirements.md#sizing).

## Licensing

### Do I need the Extended License if I'm not charging customers?

No. If you run the stores yourself and nobody pays for access, the Regular License is sufficient. The Extended License is only required if you charge for store access under any model (subscription, pay-per-product, transaction %, etc.). See [License](./license.md).

### Can I run this on multiple servers?

Each production installation needs its own license. You can run **dev and staging copies** for free on the same license. A second production `CENTRAL_DOMAINS` = a second installation = a second license.

## Billing

### Is Stripe required?

**No.** Leave `STRIPE_KEY`, `STRIPE_SECRET` and `STRIPE_WEBHOOK_SECRET` empty in your `.env`, and the platform works perfectly. Stores sign up, start their free trial (if any), and serve traffic. Entitlement is tracked locally in the `tenant_subscriptions` table. You can also accept bank transfers (a built-in Botble feature) or manage subscriptions entirely by hand from the operator console.

With Stripe configured, you get automated checkout and billing portal. See [Billing with Stripe](./usage-billing-stripe.md) to set it up.

### Can customers use payment gateways other than Stripe?

Yes. Store owners can configure Stripe Connect, PayPal, Mollie, Razorpay and other payment methods in their store's **Payment Methods** admin. These are independent of the billing integration — a store's subscription plan is separate from what payment methods its shoppers use at checkout.

### What payment methods does the platform support for subscriptions?

- **Stripe** — Checkout and Billing Portal (recommended for high volume)
- **Bank transfer** — offline, operator-approved
- **Manual** — operator assigns, extends, changes or cancels a plan from the console with no payment integration

## Stores and themes

### How many themes can I add to the platform?

Unlimited. Drop any Botble ecommerce theme into `platform/themes/`, register it, and assign it to plans. Store owners pick their theme at signup. See [Adding a storefront theme](./adding-a-theme.md).

### How many themes are included?

One: **Amerce**, with **21 homepage presets**. Each preset is a different demo layout — fashion, sneaker, furniture, decor and so on — that a customer picks at signup. They are presets of a single theme rather than 21 separate themes, which is exactly why they all stay upgradable together.

### Can customers use their own domains?

Yes, if the plan permits it. Each plan has an **Allows custom domain** checkbox. Plans that disable it give store owners subdomains only (`store1.yourdomain.com`). See [Custom domains](./usage-domains.md).

### Can I help a store owner get into their store?

Yes. The operator console has **Store → Impersonate** — it generates a 60-second single-use token that logs you into their admin. Every login is audited in the audit log. Never share the store owner's actual password; always impersonate instead.

### What's NOT included in Ecommerce SaaS?

**Not shipped:**
- POS (point-of-sale) system
- Mobile app
- Storefront drag-and-drop page builder (you can add custom pages; builders require setup)
- Wallet or store credit features
- Affiliate, loyalty or gift card systems
- Live chat or WhatsApp/SMS notifications
- Per-tenant backup/restore (you manage backups for the whole platform)

These can be added as Botble plugins if you write them or hire a developer. The platform does not block them.

## Support

### What does support cover?

The **product as shipped** — configuration, operation, troubleshooting, and the code. Support **does not cover:**
- Your server infrastructure, DNS, TLS or hosting provider
- Modifications you make to the source
- Store owner data recovery or backups
- Third-party plugins or themes you add

### How long is support included?

Support and updates are provided for the period stated at purchase (usually 1 year). After that, you can renew or manage the platform yourself.

### Where do I contact support?

Through your [Envato user page](https://codecanyon.net) — Botble replies to support requests there. Include your domain, what you tried, and the exact error message or symptom.

## Updates

### How do I know when a new version is released?

Check your Envato purchase page for update notifications. The product does not auto-update. You pull the new version, run migrations, and restart the queue worker. See [Upgrade Guide](./upgrade.md).

### Will an update break my stores?

No, if you follow the upgrade steps. Central and tenant migrations are versioned and tested. The test suite (run during upgrade) catches breaking changes. Run upgrades during off-peak hours and keep a backup handy.

### Can I skip a version (e.g., go from 1.0 to 1.2)?

Yes. Migrations are cumulative. Running `php artisan migrate --force` and `php artisan tenants:migrate` applies all pending migrations in order.

### Do I need to restart anything after an upgrade?

Yes: the queue worker. See [Upgrade Guide](./upgrade.md) — it holds the old code in memory, so provisioning, mail and webhooks will use stale code until you restart it.

