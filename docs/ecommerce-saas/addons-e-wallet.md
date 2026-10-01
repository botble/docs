---
title: E-Wallet Add-on
description: Customer wallets with top-ups, wallet checkout, refunds to wallet and gift cards, as a per-store add-on.
---

# E-Wallet

A customer wallet for each store: customers top up a balance, pay from it at checkout, and
can receive refunds into it. Staff can adjust balances by hand.

## SaaS setup

**Minimum version:** E-Wallet 1.1.3+

### Installation

Follow [Installing an add-on](./addons-overview.md#installing-an-add-on) with the plugin
folder `e-wallet`, then enter the purchase code once in **Operator console → Add-ons**.

### Catalog entry

| Field | Value |
|---|---|
| Sidebar menu ids | `cms-plugins-e-wallet` |
| Route name prefixes | `e-wallet.`, `customer.e-wallet.`, `public.gift-card.` |

These are the values the add-on declares. The catalog form does not read them: it only
proposes route prefixes that contain the folder name, so add any missing ones yourself. A
prefix left off stays reachable in stores whose plan does not include the add-on.

### Per-store configuration

Each store configures its wallet under **E-Wallet → Settings**:

- **Enable E-Wallet** — lets customers pay from their balance
- **Balance** — whether a balance may go below zero
- **Refund behaviour** — refund to the wallet or to the original payment method
- **Top-ups** — on/off, minimum and maximum amount, code prefix, which payment methods
  may be used to top up
- **Webhooks** — optional URLs called when a top-up is created, completed, failed or
  cancelled, signed with a per-store secret

On the platform, webhook URLs that point at private, loopback, link-local or cloud
metadata addresses are refused when saved and again before each call.

### Scheduled tasks

None.

## Features

- Wallet top-ups by the customer, paid through the store's checkout gateways
- Wallet as a payment method at checkout
- Refunds credited to the wallet
- Manual credit and debit adjustments by staff
- Transaction history, withdrawals and wallet-to-wallet transfers
- Gift cards, with optional expiry dates

## Troubleshooting

### Wallet payment doesn't appear at checkout

**Cause:** The store has not switched on **Enable E-Wallet**.

**Fix:** Have the store owner turn it on in **E-Wallet → Settings**.

### A store can't save a webhook URL

**Cause:** The URL's host resolves to a private or reserved address, which the platform
refuses.

**Fix:** Use a publicly reachable URL.

## Learn more

- [Add-ons Overview](./addons-overview.md) — how add-ons work
- [Payment Gateways](./payment-gateways.md) — storefront checkout gateways
