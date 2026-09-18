---
title: Credits
description: Framework, libraries, multi-tenancy, billing and fonts used in Ecommerce SaaS.
---

# Credits

Ecommerce SaaS stands on the shoulders of excellent open-source projects and frameworks. Here are the foundational components and their licenses.

## Framework and core

| Component | Version | License | Purpose |
|---|---|---|---|
| **Laravel Framework** | 13.0+ | MIT | Web framework, routing, database ORM |
| **Botble CMS** | bundled | Proprietary (Envato) | Core CMS, admin panel, ecommerce features |
| **Laravel Sanctum** | 4.0+ | MIT | Token-based API authentication |

## Multi-tenancy

| Component | Version | License | Purpose |
|---|---|---|---|
| **Stancl/Tenancy** | 3.10+ | MIT | Database-per-tenant isolation, context switching |

Stancl's Tenancy provides the foundational architecture for running many independent stores on one codebase with no data bleeding between them. Every store's cache, filesystem, mail settings and database connection are bootstrapped on every request.

## Billing and payments

| Component | Version | License | Purpose |
|---|---|---|---|
| **Laravel Cashier** | 16.7+ | MIT | Stripe Checkout and Billing Portal integration |

Cashier handles recurring subscriptions, payment method management, and invoice generation via Stripe. The platform can run without it (using local or bank transfer billing).

## Caching and queues

| Component | Version | License | Purpose |
|---|---|---|---|
| **Predis** | 3.0+ | MIT | Pure-PHP Redis client; no extension required |
| **Redis** | (external) | BSD | Cache store and job queue backend (optional; recommended for production) |

Predis is the Redis client, used when Redis is the configured cache or queue driver. Tenant cache is isolated on every cache store (by tag on Redis and Memcached, by prefix on `file` and `database`), so any cache store works; Redis is recommended for performance once you have real traffic.

## HTTP and data

| Component | Version | License | Purpose |
|---|---|---|---|
| **Guzzle HTTP** | 7.9+ | MIT | HTTP client for outbound requests (webhooks, external APIs) |
| **Doctrine DBAL** | 4.2+ | MIT | Database schema inspection and modification |

Doctrine DBAL powers the migration system and schema builder.

## Fonts

Both fonts are self-hosted and bundled; nothing is loaded from a CDN.

| Font | License | Used for |
|---|---|---|
| **Playfair Display** | SIL OFL 1.1 | Headings and display text on the storefront |
| **Inter** | SIL OFL 1.1 | Body text and UI throughout |

Fonts are located in `platform/packages/tenancy/public/fonts/` and served locally.

## Full dependency tree

For a complete list of every package, version and license, run:

```bash
composer licenses
```

Or inspect individual packages:

```bash
cat vendor/{vendor}/{package}/composer.json | grep -E '"license"|"version"'
```

All core dependencies listed above are MIT licensed. Botble's proprietary components (themes, plugins, CMS core) are covered under the Envato license you purchased.
