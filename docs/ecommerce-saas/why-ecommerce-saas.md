---
title: Why Ecommerce SaaS
description: Design decisions, use cases, and why database-per-tenant with frozen plan terms matters.
---

# Why Ecommerce SaaS

This document explains the design choices behind Ecommerce SaaS and when to use it.

## Problem: one shared database

A multi-store platform can keep every store's rows in one set of tables, told apart by a store id column. That works, but:

1. **One missed filter leaks data** — a query that forgets the store id reads another store's orders
2. **Backups and restores cover every store at once** — restoring one store's tables means untangling its rows from everyone else's

## Solution: database-per-tenant

Ecommerce SaaS gives each store its own **MySQL database**:

```
Control Plane (central DB)
├── Stores table
├── Plans table
├── Billing
└── Webhooks

Store A Database
├── Products
├── Orders
├── Customers
└── Settings

Store B Database
├── Products
├── Orders
├── Customers
└── Settings
```

### Why this matters

| Benefit | Impact |
|---|---|
| **Isolation by architecture** | Store code runs against that store's database only; there is no store id filter to forget |
| **Restore one store** | Each store is its own database, so it can be dumped and restored on its own — see [Backup and restore](./backup-restore.md) |
| **Clean removal** | Deleting a store drops its database |

### Trade-off: more operational overhead

Database-per-tenant requires:
- A queue worker running continuously (provisioning and lifecycle mail are queued)
- Cron jobs that run per-store (`tenancy:schedule`)
- More MySQL connections and disk space
- Applying each release's migrations to every store (`tenancy:migrate-tenants`)

## Frozen plan terms

When a store subscribes to a plan, **its terms are frozen at that moment**. Changing the plan later doesn't affect existing subscribers:

```
Plan "Professional" exists at $49/month with 1000 products

Store A subscribes → $49/month, 1000 products (frozen)

Operator updates plan to $99/month with 500 products

Store A still pays $49/month, still gets 1000 products
Store B (new subscriber) pays $99/month, gets 500 products
```

### Why this matters

- **Fairness** — stores aren't surprised by price changes mid-subscription
- **Retention** — unhappy customers don't leave when a plan you promised them suddenly shrinks
- **Transparency** — editing a plan for new signups is clearly separate from existing subscriptions

A store owner's own downgrade is refused only when the store has more products or staff users than the smaller plan allows, and the refusal names the number.

## API + signed webhooks

The platform's **control-plane API** lets you integrate with your own systems. Every webhook is signed with HMAC-SHA256 in the `X-Tenancy-Signature` header (`t=<timestamp>,v1=<signature>`, computed over `"<timestamp>.<raw body>"`). See [Webhooks](./webhooks.md#verifying-the-signature) for verification code.

### Why this matters

- **No forged events** — a receiver that verifies the signature ignores requests that did not come from your platform
- **Replay protection** — reject a timestamp more than 300 seconds from your clock
- **Delivery log** — every delivery is recorded, failed ones are retried, and any delivery can be retried by hand

27 webhook events cover the store lifecycle, subscriptions, domains, apps and bank-transfer plan orders.

## 43 languages

The platform's screens ship in 43 languages. The marketing site can publish in several languages, with a language switcher and `hreflang` tags for SEO.

## Marketplace add-ons

Six add-ons, sold separately, implement the platform's add-on contract:
- **POS Pro** — point of sale
- **E-Wallet** — customer wallets
- **Affiliate Pro** — affiliate programs
- **Loyalty Points** — customer rewards
- **Live Chat** — storefront chat
- **SMS Gateways** — SMS and OTP

Each is installed and licensed once by the operator and switched on per store. The platform side of this ships in 1.0.2. See [Add-ons](./addons-overview.md).

## When to use Ecommerce SaaS

Ecommerce SaaS is right for you if:

- ✅ You want to run a **multi-store platform** (2+ stores in one install)
- ✅ You need **real data isolation** (each store has its own database)
- ✅ You're building on **Botble CMS** (not WordPress or Shopify)
- ✅ You have **server access** (VPS, not shared hosting)
- ✅ You want **frozen billing terms** (fair pricing, no surprises)

Ecommerce SaaS is **not** the right fit if:

- ❌ You only need **one store** (single-site Botble is simpler)
- ❌ You don't have **server control** (need VPS-grade hosting)
- ❌ You want **zero ops overhead** (multi-tenant scales, but not automatically)
- ❌ You need **per-store plugin code** (plugins are installed platform-wide; stores only switch catalog apps on and off)
- ❌ Your stores need to **share data** (stores can't read other stores' databases)

## Learn more

- [Quick Start](./quick-start.md) — get running from the command line
- [Features](./features.md) — what operators, store owners, and developers can do
- [Architecture](./architecture.md) — how multi-tenancy works under the hood
- [Add-ons](./addons-overview.md) — add-on plugins stores can switch on
