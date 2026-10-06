---
title: Affiliate Pro Add-on
description: Affiliate program for a store's customers — referral links, commissions and withdrawals — as a per-store add-on.
---

# Affiliate Pro

An affiliate program for each store: customers register as affiliates, share referral
links, earn commissions on referred orders and request withdrawals.

## SaaS setup

**Minimum version:** Affiliate Pro 1.2.11+

### Installation

Follow [Installing an add-on](./addons-overview.md#installing-an-add-on) with the plugin
folder `affiliate-pro`, then enter the purchase code once in **Operator console → Add-ons**.

### Catalog entry

| Field | Value |
|---|---|
| Sidebar menu ids | `cms-plugins-affiliate-pro` |
| Route name prefixes | `affiliate-pro.` |
| Settings panel item ids | `affiliate-pro` |

These are the values the add-on declares. The catalog form does not read them: it only
proposes route prefixes that contain the folder name, so add any missing ones yourself. A
prefix left off stays reachable in stores whose plan does not include the add-on.

### Per-store configuration

Each store configures its own program under **Affiliate → Affiliate Settings**, including:

- Default commission percentage, and optional per-category commission rates
- Minimum withdrawal amount and the withdrawal methods affiliates may choose (bank
  transfer, PayPal, Stripe, other)
- Cookie lifetime, open registration, auto-approval of affiliates and of commissions
- Program rules text and promotional banners

### Scheduled tasks

| Command | Schedule | Runs on |
|---|---|---|
| `affiliate:send-digest` | Weekly, Monday 08:00 | `tenancy:schedule --frequency=hourly` |

It sends the weekly affiliate performance digest email, per store. A retried run within six
days does not send twice.

## Features

- Affiliate registration with approval, plus pending-request review
- Referral links and short links
- Commission tracking, with per-category commission rates
- Withdrawal requests, reviewed by the store
- Affiliate coupons and member levels
- Affiliate reports
- Banning an affiliate

## Troubleshooting

### Affiliates don't receive the weekly digest

**Cause:** The hourly `tenancy:schedule` cron line is missing.

**Fix:** Add the `tenancy:schedule --frequency=hourly` line from [Cron jobs](./cronjob.md).

## Learn more

- [Add-ons Overview](./addons-overview.md) — how add-ons work
- [Loyalty Points](./addons-loyalty-points.md) — referral points for affiliates' customers
