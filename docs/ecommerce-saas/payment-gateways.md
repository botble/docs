---
title: Payment Gateways
description: Understand the difference between storefront checkout gateways and platform plan billing gateways.
---

# Payment Gateways

The platform has two separate payment systems: **storefront checkout** (customers buying products) and **plan billing** (stores paying for their subscription).

## Storefront checkout gateways

Store owners accept payments from their customers at checkout, with their own gateway
accounts.

### Switched on in every new store

New stores are provisioned with these payment methods active:
- **Stripe**
- **PayPal**
- **Mollie**
- **Paystack**
- **Razorpay**
- **SSLCommerz**
- **Bank transfer**
- **Cash on delivery (COD)**

A gateway only appears at checkout once the store owner has entered their own credentials
and enabled it under **Payments → Payment methods** in their store admin. Credentials
are stored in each store's own database — store A's Stripe key is separate from store B's.

### Vendor payouts

If a store runs the Marketplace (multi-vendor) plugin, the Stripe Connect and PayPal Payout
plugins handle paying vendors their withdrawals. They are payout methods, not checkout
gateways: shoppers still pay through the gateways above.

### Adding more gateways

Stores cannot install plugins. To offer another gateway, the platform owner installs its
Botble plugin on the server and offers it through **Operator console → Apps & Themes**,
like any other app.

## Plan billing gateways

Store owners pay for their subscription plan from the **Billing** screen in their store
admin. This is configured by the platform owner, not by stores. Three rails exist:

- **Stripe** — Stripe Checkout and the Stripe Billing Portal, enabled by setting
  `STRIPE_KEY` / `STRIPE_SECRET` / `STRIPE_WEBHOOK_SECRET` in `.env` — see
  [Billing with Stripe](./usage-billing-stripe.md)
- **Bank transfer** — the store raises a plan order, you approve it once the money
  arrives — set up in **Operator console → Bank transfer**, see
  [Bank transfer](./usage-bank-transfer.md)
- **PayPal, Razorpay, Paystack, Mollie** (from 1.0.2) — the store pays one plan period at a
  time and the order is approved automatically once the gateway confirms the payment. Nothing
  renews by itself. Set up in **Operator console → Plan billing gateways**
  (Razorpay: keep **automatic capture** on in your Razorpay account; a payment captured
  later by hand is not seen by the platform and must be approved by hand)

With none configured, plans are assigned by the operator from the console.

## Key differences

| | Storefront checkout | Plan billing |
|---|---|---|
| **Who sets it up** | Each store owner (their own credentials) | Platform owner |
| **Who pays** | Store customers (shoppers) | Store owners (subscription) |
| **Configured in** | Store admin → Payments → Payment methods | `.env` (Stripe), Operator console → Bank transfer and → Plan billing gateways |
| **Gateways** | 8 switched on per new store, more via the catalog | Stripe, bank transfer, PayPal, Razorpay, Paystack, Mollie |

## Troubleshooting

### Shoppers can't pay at checkout

**Issue:** Payment method not configured by store owner.

**Fix:** Have the store owner open **Payments → Payment methods** in their store admin, choose a gateway (e.g., Stripe), and enter their API keys.

### Store can't pay for subscription

**Issue:** Neither Stripe, bank transfer nor a plan billing gateway is configured, so the Billing screen says online payment is not enabled.

**Fix:** Set the Stripe keys in `.env` ([Billing with Stripe](./usage-billing-stripe.md)) or enable **Operator console → Bank transfer** or **Operator console → Plan billing gateways**.

### A payment gateway doesn't appear in store checkout

**Cause:** The gateway is in your app catalog and the store's plan is not ticked on its row, or the store switched it off on its **Apps** screen.

**Fix:** Tick the plan on the gateway's row in **Operator console → Apps & Themes**, or have the store owner switch it on.

## Learn more

- [Billing with Stripe](./usage-billing-stripe.md) — how to set up Stripe for plan subscriptions
- [Bank transfer](./usage-bank-transfer.md) — offline plan payments
- [Add-ons Overview](./addons-overview.md) — add-ons like POS Pro and E-Wallet that interact with payments
