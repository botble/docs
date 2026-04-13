---
title: Payments, Tax & Invoices
description: Configure payment gateways, coupons, tax rules, and invoice settings in Auxero.
---

# Payments, Tax & Invoices

## Payment Gateways

Go to `Admin Panel` -> `Payments` -> `Payment Methods`.

Auxero supports the following gateways out of the box:

| Gateway | Notes |
|---|---|
| Stripe | Card payments, supports 3D Secure |
| PayPal | PayPal account and guest card checkout |
| Razorpay | Popular in India, supports UPI and cards |
| SSLCommerz | Widely used in Bangladesh |
| Paystack | Covers Africa — Nigeria, Ghana, Kenya, South Africa |

### Enabling a Gateway

1. Click the gateway name to open its settings.
2. Toggle **Status** to `Enabled`.
3. Enter the required API keys (found in the gateway's dashboard).
4. Set the environment: `Sandbox` for testing, `Live` for production.
5. Save.

::: warning
Never share or commit your live API keys. Use sandbox/test keys during development and testing.
:::

### Stripe Setup

| Field | Description |
|---|---|
| Publishable Key | Starts with `pk_live_` or `pk_test_` |
| Secret Key | Starts with `sk_live_` or `sk_test_` |
| Webhook Secret | From the Stripe dashboard Webhooks section |

### PayPal Setup

| Field | Description |
|---|---|
| Client ID | From PayPal developer app |
| Client Secret | From PayPal developer app |
| Mode | Sandbox or Live |

For Razorpay, SSLCommerz, and Paystack, enter the Key ID/Secret or API key pairs provided by each gateway.

## Coupon / Discount Codes

Go to `Admin Panel` -> `Bookings` -> `Coupons`.

| Field | Description |
|---|---|
| Code | The coupon string customers enter at checkout |
| Type | `Percentage` (e.g. 20%) or `Fixed amount` |
| Value | Discount amount or percentage |
| Minimum order amount | Booking subtotal required before coupon applies |
| Usage limit | Max number of times the coupon can be used |
| Expiry date | Date after which the coupon is invalid |
| Status | Enable or disable |

::: tip
Leave the usage limit blank for unlimited uses. Set it to `1` for single-use promo codes.
:::

## Tax Configuration

Go to `Admin Panel` -> `Bookings` -> `Tax`.

You can define multiple tax rules applied to bookings at checkout.

| Field | Description |
|---|---|
| Name | Display name (e.g. VAT, GST, Sales Tax) |
| Rate (%) | Tax percentage applied to the booking subtotal |
| Priority | Order in which taxes are applied (lower = first) |
| Status | Enable or disable the tax rule |

Taxes are shown as a line item on the checkout page and on invoices.

::: warning
Taxes are calculated on the booking subtotal before coupon discounts are applied unless you configure otherwise in `Admin Panel` -> `Settings` -> `Booking`.
:::

## Invoice Settings

Go to `Admin Panel` -> `Settings` -> `Invoice`.

| Setting | Description |
|---|---|
| Company Name | Appears in the invoice header |
| Company Address | Billing address on the invoice |
| Company Logo | Logo displayed at the top of the invoice PDF |
| Invoice Prefix | Prefix for invoice numbers (e.g. `INV-`) |
| Footer Note | Optional text shown at the bottom of invoices |

Invoices are generated automatically when a booking is created. They can be downloaded as PDF from the booking detail page by both admin and the customer.

## Currency Management

Go to `Admin Panel` -> `Settings` -> `Currency`.

- Set the default currency (symbol, code, position).
- Enable currency switcher if you support multiple currencies.
- Exchange rates can be set manually or updated automatically if an exchange rate provider is configured.
