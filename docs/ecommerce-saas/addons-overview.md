---
title: Add-ons Overview
description: Extend your platform with add-on plugins such as POS Pro, E-Wallet and SMS Gateways. Install once, license centrally, toggle per store.
---

# Add-ons

An add-on is a Botble plugin sold separately from the platform. Six add-ons implement the
platform's [add-on contract](./addons-developer-contract.md), so they behave correctly on
a multi-store install: POS Pro, Affiliate Pro, E-Wallet, Loyalty Points, Live Chat and
SMS Gateways.

::: info Requires Ecommerce SaaS 1.0.2 or later
Platform-side add-on support (the **Add-ons** console screen, per-store add-on cron, the
hidden licence screens) needs Ecommerce SaaS 1.0.2 or later. On 1.0.1 and earlier the add-ons run as on a
single site: stores see licence screens and add-on cron runs against the central
database only.
:::

## How add-ons work

| Step | Who | What |
|---|---|---|
| **1. Install** | You (platform owner) | Put the plugin in `platform/plugins/<add-on>/` and activate it platform-wide |
| **2. Migrate stores** | You | Run `php artisan tenancy:migrate-tenants` so stores created before the add-on get its tables |
| **3. License** | You | Enter the purchase code once in **Operator console → Add-ons** — one licence covers every store |
| **4. Offer** | You | Add the add-on to the catalog in **Operator console → Apps & Themes** and tick the plans that include it |
| **5. Toggle** | Store owner | Each store turns the add-on on or off from its **Apps** screen, if its plan includes it |
| **6. Use** | Store owner | The store's staff use the add-on from their admin; customers use its storefront parts |

### Installing an add-on

Store owners cannot open Botble's Plugins screen, and neither can operators reach the
central Botble admin, so install from the shell:

```bash
cp -R ~/downloads/pos-pro platform/plugins/pos-pro
composer dump-autoload
php artisan cms:plugin:activate pos-pro
php artisan tenancy:migrate-tenants --pretend   # see what existing stores would get
php artisan tenancy:migrate-tenants             # apply
php artisan queue:restart                       # workers load the new code
```

New stores need nothing extra: provisioning migrates every plugin on disk into the new
store's database. Then add the add-on to the catalog — see
[Apps and themes](./usage-apps-themes.md). Stores that already exist switch it on from their **Apps** screen, or run
`php artisan tenancy:backfill-plugins --enable-all` (a dry run; add `--write` to apply) to
switch it on in every store whose plan includes it. Without `--enable-all` the command only
switches off apps a store's plan no longer includes.

## Available add-ons

| Add-on | Purpose | Per-store setup |
|---|---|---|
| [POS Pro](./addons-pos-pro.md) | Point of sale in the store admin | POS settings and devices, per store |
| [E-Wallet](./addons-e-wallet.md) | Customer wallets, top-ups, refunds to wallet, gift cards | E-Wallet settings, per store |
| [Affiliate Pro](./addons-affiliate.md) | Affiliate program with commissions and withdrawals | Affiliate settings, per store |
| [Loyalty Points](./addons-loyalty-points.md) | Points on purchases, redemption, member levels | Loyalty settings and levels, per store |
| [Live Chat](./addons-live-chat.md) | Storefront chat widget with agents | Chat settings and agents, per store |
| [SMS Gateways](./addons-sms-gateways.md) | SMS and OTP through several providers | Provider credentials and templates, per store |

## Minimum versions for SaaS mode

- **POS Pro 1.2.20+**
- **Affiliate Pro 1.2.10+**
- **E-Wallet 1.1.3+**
- **Loyalty Points 1.0.20+**
- **Live Chat 1.0.9+**
- **SMS Gateways 1.0.35+**

Older builds do not ask the platform the contract's questions, so they keep showing
licence screens to stores and register their cron on the central scheduler.

## How stores see add-ons

Store owners do **not**:
- See licence screens or purchase codes
- Buy or renew licences (you manage them centrally)
- Install, update or remove plugin code

Store owners can:
- Turn an add-on on or off from their **Apps** screen if their plan includes it
- Configure the add-on's own settings from their admin
- Use the add-on's features in their store

An add-on their plan does not include, or whose catalog row you switched off, is not
listed on their Apps screen, and its screens return 404 in their admin.

## Scheduled tasks

Add-ons that have scheduled tasks hand them to the platform instead of Laravel's
`schedule:run`. `tenancy:schedule` runs them **once per store**, only in stores that have
the add-on switched on. A task that fails is logged and does not stop other tasks or
stores.

Tasks run on the `tenancy:schedule` cron lines you already have — see
[Cron jobs](./cronjob.md):

| Task frequency | Runs on |
|---|---|
| every minute / two minutes / five minutes | `--frequency=everyFiveMinutes` (so never more often than every five minutes) |
| every fifteen minutes | `--frequency=everyFiveMinutes`, in the first five minutes of each quarter hour |
| hourly | `--frequency=hourly` |
| daily / weekly with a time | `--frequency=hourly`, in that hour |
| daily / weekly without a time | `--frequency=daily` |

A task only runs if the matching cron line exists. Each add-on page lists its tasks.

## Getting more add-ons

**Operator console → Add-ons → Get more add-ons** opens
[marketplace.botble.com/plugins](https://marketplace.botble.com/plugins). A plugin only
behaves correctly on the platform if it follows the
[Add-on Developer Contract](./addons-developer-contract.md); ask its author before
offering one that does not.

## Troubleshooting add-ons

### An add-on is missing from Operator console → Add-ons

**Cause:** The plugin is not in `platform/plugins/`, was never activated platform-wide, or
its version predates the add-on contract.

**Fix:** Check the minimum versions above, then run `php artisan cms:plugin:activate <add-on>`.

### An add-on doesn't appear in a store's Apps screen

**Cause:** It is not in the catalog, its catalog row is switched off, or the store's plan
is not ticked on that row.

**Fix:** **Operator console → Apps & Themes** — add the add-on (installed-but-not-offered
items are listed at the bottom), then tick the plans that include it.

### A store errors on the add-on's screens after install

**Cause:** The store was created before the add-on was installed, so its database lacks
the add-on's tables.

**Fix:** `php artisan tenancy:migrate-tenants` (use `--tenants=<store id>` for one store).

### Scheduled tasks are not running

**Cause:** The `tenancy:schedule` cron line for that frequency is missing, or the store
has the add-on switched off.

**Fix:** Add the three `tenancy:schedule` lines from [Cron jobs](./cronjob.md).

### Store owners see an add-on's licence screen

**Cause:** The add-on version predates the contract.

**Fix:** Update it to the minimum version listed above.
