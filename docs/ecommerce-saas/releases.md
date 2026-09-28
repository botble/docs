---
title: Release Notes
description: Version history and feature releases.
---

# Release Notes

## Version 1.0.1 - September 2026

### Added

- **Brand image uploads** — the operator console's Landing page takes an uploaded logo, favicon and social-sharing image (PNG, JPG, WebP or GIF up to 2 MB; ICO for the favicon), stored like any other upload. Pasting a URL still works. See [Marketing site](./usage-marketing-site.md#landing-page)
- **More editable landing copy** — hero badge labels, the "What you get" and "What you can sell" section headings, and all nine "What you can sell" cards, per language
- **Legal pages** — seven editable templates (terms, privacy, cookies, imprint, refunds, DPA, acceptable use) filled from a new **Legal & cookies** screen with your company details
- **Cookie consent (GDPR / ePrivacy)** — Accept all / Reject all / Customise with per-category toggles, scripts that load only after consent, Google Consent Mode v2 and an exportable consent log
- **Signup consent** — a required Terms agreement and an optional marketing opt-in, recorded on the store
- **Design previews** — screenshots for all 20 storefront designs in the signup picker and on the landing page
- **`tenancy:operator-password`** — reset a forgotten operator console password from the shell. See [Artisan commands](./commands.md#tenancy-operator-password)
- **Preflight** — warns when uploaded images cannot be reached over the web

### Improved

- **Signup security** — the email verification step can no longer be skipped, and the verification link only launches the store after you confirm it
- **Operator sessions** — changing an operator's password signs out that operator's other browsers
- **Footer** — Product, Company and Legal link columns
- Recovery when Google Fonts fail to download

### Fixed

- Stores on a free (0-priced) plan being marked past due after the first billing period
- Marketing pages breaking after `php artisan route:cache`
- Cookie notice reappearing after rejecting cookies
- Phone country list closing after a tap on touch devices
- Media library root folder listing files from other folders
- Image width and height detection in page content
- Vietnamese labels for the landing page hero fields

## Version 1.0.0 - September 2026

Initial release of Ecommerce SaaS — a multi-tenant platform built on Botble CMS.

### Features

- **Database-per-tenant isolation** — each store gets its own MySQL database; cache, filesystem, mail and settings are re-bootstrapped per tenant so nothing leaks between stores
- **Self-serve provisioning** — public signup imports a chosen theme's demo preset into a fresh database, usually within a minute
- **Plans and quotas** — define subscription tiers with limits on products, storage, staff users, custom domains and app/theme access (orders per month are tracked, not capped); pricing and limits are frozen at purchase
- **Billing integration** — Stripe Checkout and Billing Portal via Laravel Cashier, or bank transfer for platforms with no Stripe
- **Custom domains** — store owners attach their own domain, verified over DNS
- **Apps and themes catalog** — control which apps and themes each plan includes; store owners toggle them on and off per store
- **Control-plane REST API** — versioned API at `/api/platform/v1` for managing stores, subscriptions, domains, apps and webhooks
- **Webhooks** — 27 signed outbound events plus test delivery, tracking store lifecycle, subscriptions, domains, apps and orders
- **Multi-language** — 43 locales (English included) for operator, store owner and shopper interfaces; every string is translatable
- **Theme presets** — one bundled theme (Amerce) with 20 homepage presets; any Botble-published ecommerce theme can be added
- **Operator console** — dedicated admin panel for managing stores, plans, subscriptions, coupons, operators, API keys and webhooks
- **Store impersonation** — operators can enter a store as an admin with a 60-second single-use token, audited for compliance
- **Upstream patches** — Botble core changes are additive and documented one by one, so a core upgrade carries them along
- **183 tables per tenant** — optimized schema for store isolation and performance at scale

