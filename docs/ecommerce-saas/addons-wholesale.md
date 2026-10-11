---
title: Wholesale Add-on
description: B2B wholesale for a store - customer groups, tiered pricing, minimum order quantities and wholesale applications - as a per-store add-on.
---

# Wholesale

B2B wholesale for each store: customers apply for wholesale access, are placed in customer
groups, and see group discounts, tiered prices and minimum order quantities on products.

## SaaS setup

**Minimum version:** Wholesale 1.0.17+

### Installation

Follow [Installing an add-on](./addons-overview.md#installing-an-add-on) with the plugin
folder `ecommerce-wholesale`, then enter the purchase code once in **Operator console → Add-ons**.

### Catalog entry

| Field | Value |
|---|---|
| Sidebar menu ids | `cms-plugins-wholesale`, `cms-customer-wholesale`, `wholesale.vendor.wholesale-products` |
| Route name prefixes | `wholesale.`, `public.wholesale.`, `customer.wholesale.`, `marketplace.vendor.wholesale-products.` |
| Settings panel item ids | none |

These are the values the add-on declares. The catalog form does not read them: it only
proposes route prefixes that contain the folder name, so add any missing ones yourself. A
prefix left off stays reachable in stores whose plan does not include the add-on.

### Per-store configuration

Each store configures its own program under **Wholesale → Settings**, including:

- Whether wholesale pricing is enabled, and whether guests can see wholesale prices
- Whether applications need approval, open registration, and multiple groups per customer
- The default customer group
- Display style, colours and the pricing table on product pages
- The vendor dashboard, when the Marketplace plugin is active

### Scheduled tasks

None. Wholesale registers no cron tasks, so no `tenancy:schedule` line is needed for it.

## Features

- Customer groups with a discount type and value, priority, and minimum order quantity or value
- Pricing rules per product or category, with quantity tiers
- Minimum order quantity and quantity increments per product
- Product visibility limited to chosen groups
- Wholesale applications with review, approval and rejection
- Customer wholesale dashboard and company profile
- Vendor wholesale products screen (with Marketplace)

## Troubleshooting

### A store owner sees a licence section in Wholesale settings

**Cause:** The Wholesale version predates the add-on contract.

**Fix:** Update to Wholesale 1.0.17 or later.

### A store errors on the Wholesale screens after install

**Cause:** The store was created before the add-on was installed, so its database lacks
the `ws_*` tables.

**Fix:** `php artisan tenancy:migrate-tenants` (use `--tenants=<store id>` for one store).

## Learn more

- [Add-ons Overview](./addons-overview.md) — how add-ons work
- [Add-on Developer Contract](./addons-developer-contract.md) — the hooks every add-on implements
