---
title: POS Pro Add-on
description: Point-of-sale screen in the store admin, available as an add-on each store switches on from its Apps screen.
---

# POS Pro

A point-of-sale screen inside the store admin: staff ring up in-person sales against the
store's own products, stock and customers, and take payment at the counter.

## SaaS setup

**Minimum version:** POS Pro 1.2.20+

### Installation

Follow [Installing an add-on](./addons-overview.md#installing-an-add-on) with the plugin
folder `pos-pro`, then enter the purchase code once in **Operator console → Add-ons**.

### Catalog entry

When you add POS Pro in **Operator console → Apps & Themes**, the values the add-on
declares for itself are:

| Field | Value |
|---|---|
| Sidebar menu ids | `cms-plugins-pos-pro` |
| Route name prefixes | `pos-pro.`, `pos-devices.`, `marketplace.vendor.pos.`, `stripe.terminal.` |
| Settings panel item ids | `settings.ecommerce.pos` |

The catalog form does not read them: it only proposes route prefixes that contain
the folder name, so add the others yourself. A prefix left off stays reachable in stores
whose plan does not include POS Pro.

### Per-store configuration

Once a store switches POS Pro on from its **Apps** screen, the store admin gets a **POS**
menu with **POS**, **POS Orders**, **POS Reports**, **Register History** and **POS Settings**.
Each store configures its own POS settings. **POS Devices** (local network printers and
devices) is hidden on the platform, because the server cannot reach a shop's LAN.

### Scheduled tasks

None.

## Features

- POS checkout screen in the store admin
- POS orders list, reports and cash-register history
- Tender types: cash, card, bank transfer, gift card, store credit, check; split payments
- Refunds from POS orders
- Receipt printing
- Stripe Terminal card readers
- A vendor POS screen when the store runs the Marketplace plugin

## Troubleshooting

### Store owners can't find POS

**Cause:** POS Pro is not switched on for the store, or the store's plan does not include it.

**Fix:** Tick the store's plan on POS Pro's row in **Operator console → Apps & Themes**,
then have the store owner switch it on from **Apps**.

## Learn more

- [Add-ons Overview](./addons-overview.md) — how add-ons work
- [Payment Gateways](./payment-gateways.md) — storefront checkout gateways
