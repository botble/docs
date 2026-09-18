---
title: Release Notes
description: Version history and feature releases.
---

# Release Notes

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

