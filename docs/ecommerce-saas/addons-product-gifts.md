---
title: Product Gifts Add-on
description: Free gifts with purchase — rule-based gift offers on products, carts and checkout — as a per-store add-on.
---

# Product Gifts

Free gifts with purchase for each store: the store defines gift rules, and customers pick
an eligible gift on the product page, in the cart or at checkout.

## SaaS setup

**Minimum version:** Product Gifts 1.0.7+

### Installation

Follow [Installing an add-on](./addons-overview.md#installing-an-add-on) with the plugin
folder `ecommerce-product-gifts`, then enter the purchase code once in
**Operator console → Add-ons**.

### Catalog entry

| Field | Value |
|---|---|
| Sidebar menu ids | `cms-plugins-product-gifts`, `marketplace.vendor.product-gifts` |
| Route name prefixes | `product-gifts.`, `public.product-gifts.`, `marketplace.vendor.product-gifts.` |
| Settings panel item ids | `settings.ecommerce.product_gifts` |

These are the values the add-on declares. The catalog form does not read them: it only
proposes route prefixes that contain the folder name, so add any missing ones yourself. A
prefix left off stays reachable in stores whose plan does not include the add-on.

### Per-store configuration

Each store configures its own gifts under **Ecommerce → Product Gifts** and
**Settings → Ecommerce → Product Gifts**, including:

- Gift rules: which products or categories qualify, minimum order value, and the gift items
- Maximum number of gifts per order
- Gift section title, style, colour, icon, image and original-price display
- Vendor-managed gift rules, when the Marketplace plugin is active

### Scheduled tasks

None.

## Features

- Gift rules by product, category or the whole catalog, each with a minimum order value and optional start and end dates (several rules make spend tiers)
- Gift selector on product pages, in the cart and at checkout
- Gifts recorded on the order and shown in the admin
- Optional gift rules managed by marketplace vendors

## Learn more

- [Add-ons Overview](./addons-overview.md) — how add-ons work
- [Add-on Developer Contract](./addons-developer-contract.md) — the hooks this add-on implements
