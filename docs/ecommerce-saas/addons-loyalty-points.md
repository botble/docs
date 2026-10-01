---
title: Loyalty Points Add-on
description: Points on purchases and customer activity, redemption at checkout and member levels, as a per-store add-on.
---

# Loyalty Points

A points program for each store: customers earn points on orders and other activity,
redeem them for a discount, and move up member levels.

## SaaS setup

**Minimum version:** Loyalty Points 1.0.20+

### Installation

Follow [Installing an add-on](./addons-overview.md#installing-an-add-on) with the plugin
folder `loyalty-points`, then enter the purchase code once in **Operator console → Add-ons**.

### Catalog entry

| Field | Value |
|---|---|
| Sidebar menu ids | `cms-plugins-loyalty-points` |
| Route name prefixes | `loyalty-points.`, `customer.loyalty-points.`, `public.loyalty-points.` |

These are the values the add-on declares. The catalog form does not read them: it only
proposes route prefixes that contain the folder name, so add any missing ones yourself. A
prefix left off stays reachable in stores whose plan does not include the add-on.

### Per-store configuration

Each store configures its program under **Loyalty Points → Settings**:

- **Earning** — points per currency amount spent, the exchange rate, and which order
  statuses earn points
- **Bonus points** — for registration, product reviews, photo reviews, referrals (needs
  Affiliate Pro) and birthdays
- **Redemption** — the value of points at checkout, minimum and maximum points per order
- **Expiry** — months after which earned points expire (0 = never)

Member levels are managed under **Loyalty Points → Member Levels**: point range, an
earning-rate multiplier, a badge and a list of benefits per level.

### Scheduled tasks

| Command | Schedule | Runs on |
|---|---|---|
| `loyalty:award-birthday-points` | Daily | `tenancy:schedule --frequency=daily` |
| `loyalty:expire-points` | Daily | `tenancy:schedule --frequency=daily` |

Points for orders, reviews and registration are awarded when the event happens, not by
a scheduled task.

## Features

- Points earned on orders, with configurable eligible order statuses
- Bonus points for registration, reviews, referrals and birthdays
- Redemption at checkout with per-order limits
- Point expiry
- Member levels with earning multipliers
- Customer points page, members list and reports
- Optional email notifications when customers earn or redeem points

## Troubleshooting

### Birthday points are not awarded, or points never expire

**Cause:** The `tenancy:schedule --frequency=daily` cron line is missing.

**Fix:** Add it from [Cron jobs](./cronjob.md).

### Points don't appear after a purchase

**Cause:** The order's status is not one of the store's eligible order statuses.

**Fix:** Have the store owner check **Eligible Order Statuses** in **Loyalty Points → Settings**.

## Learn more

- [Add-ons Overview](./addons-overview.md) — how add-ons work
- [Affiliate Pro](./addons-affiliate.md) — needed for referral points
