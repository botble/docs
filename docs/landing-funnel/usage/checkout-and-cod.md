---
title: Checkout & COD Flow
description: How the one-page Cash-on-Delivery checkout works, including the guest-checkout middleware override.
---

# Checkout & COD Flow

Landing Funnel ships an inline checkout form that funnels visitors into the standard Botble Ecommerce checkout — but with several friction-removing defaults to optimize for COD-heavy markets.

## End-to-End Flow

1. Visitor lands on `/landing/{slug}` from an ad
2. Visitor fills the inline form: `name`, `phone`, `email` (optional unless mandatory in store config), `address`, `city`
3. JavaScript submits via `POST /landing/{slug}/prepare` with CSRF token
4. Server prepares the cart, stores customer info in the order session, returns a checkout token + URL
5. Browser redirects to `/checkout/{token}` — the standard ecommerce checkout page
6. Customer reviews their pre-filled info + shipping method + payment method, then confirms
7. Order is created via the standard ecommerce pipeline; payment runs through whatever gateway the customer selected (COD, Stripe, PayPal, SePay, VNPay, etc.)
8. Customer lands on the funnel-branded thank-you page (or standard ecommerce success page if no custom thank-you set)

## Conflict-Safe Guest Checkout

A common store configuration disables guest checkout to force customer accounts. This is **incompatible** with landing-funnel UX (a COD funnel is one-form, no-login by design).

The plugin solves this with a dedicated middleware (`EnsureFunnelGuestCheckout`):

- Runs early in the `web` middleware group on every checkout request
- Inspects the URL's checkout token against the funnel attribution cache
- If the token came from a funnel: temporarily flips `ecommerce_enable_guest_checkout` to `'1'` in memory for the current request
- Store-wide setting is **untouched** — only funnel-originated checkouts get guest access

Non-funnel checkouts (cart, direct product purchase) still respect your store-wide setting and redirect to login if guest checkout is off.

::: info
The override applies to a single HTTP request scope. There's no security exposure: the attribution cache key only exists for tokens the funnel itself just issued.
:::

## Auto-Filled Defaults

When the customer reaches `/checkout/{token}`, several fields are already filled to minimize friction:

| Field | Source |
|---|---|
| Name, phone, email | From the funnel form |
| Address, city | From the funnel form |
| Country, state, zip code | From store settings (`store_country`, `store_state`, `store_zip_code`) |
| `address_id` | `'new'` — prevents overwriting a logged-in customer's saved address |

The result: most visitors confirm without typing anything else.

## Email-Required Sync

If your store config marks `email` as a mandatory checkout field, the funnel form does too:

- Public form shows the email field as required (with red `*`)
- Server-side `PrepareFunnelCartRequest::rules()` mirrors `EcommerceHelper::getEnabledMandatoryFieldsAtCheckout()`
- Submissions missing required fields get a 422 with field-level errors

If `email` is optional in your store, the funnel form shows it as optional too — visitors can submit without an email.

## Digital Products

The funnel flow does **not** support digital products. Digital products in Botble force a login at the standard checkout (`EcommerceHelper::canCheckoutForDigitalProducts()` requires an authenticated customer).

If the funnel's product is digital, the `prepare` endpoint returns:

```json
{
  "message": "This funnel is not available for digital products. Please contact support."
}
```

with HTTP 422. Visitors see an inline error on the form.

::: warning
Plan ahead: if you want to sell a digital product, set up a normal Botble product page with the standard add-to-cart flow. Landing Funnel is for physical, COD-friendly products.
:::

## Attribution Cache

Standard ecommerce checkouts use session cookies for state. Payment gateways often redirect off-site and back, sometimes dropping the session cookie. Landing Funnel routes around this:

- During `prepare()`, the plugin writes `cache.put('landing-funnel.attribution.{token}', $funnel_id, 48h)`
- When `OrderCreated` fires, the listener checks the cache key first, falling back to the order session
- This means even orders that complete on a fresh session (cookies dropped during 3DS / OTP redirect) still get correctly attributed to their funnel

The cache key expires after 48 hours — long enough for any delayed gateway redirect, short enough to keep the cache tight.

## Conversion-Focused Checkout UI

The inline form is tuned for mobile COD UX:

- **Step indicator** ("2 · Final step — delivery details")
- **Paired-fields grid** — `name` + `phone` on row 1, `city` + `email` on row 2 (collapses to single column under 560px)
- **Mobile keyboard hints** — `inputmode="tel"` on phone, `inputmode="email"` on email, `enterkeyhint="next"`/`"done"` chains the keyboard's "Next" button across fields
- **Rich summary card** — product thumbnail, sale ribbon when on sale, `You save` line, total in accent color
- **Split-layout submit button** — "Place order" on the left, vertical divider, total + arrow on the right — total stays visible by the thumb
- **Trust assurance row** — Pay on delivery · 7-day free returns · Encrypted submission
- **Sticky bottom-CTA** — fixed-position re-CTA with safe-area inset on all four sides for iOS notch / Dynamic Island

## Public Routes Reference

| Method | Path | Throttle | Purpose |
|---|---|---|---|
| GET  | `/landing/{slug}`         | 120/min | Render funnel page |
| POST | `/landing/{slug}/prepare` | 30/min  | Submit form → returns checkout token + URL |
| GET  | `/landing/{slug}/thanks`  | (no throttle) | Custom thank-you page |

## What Stays Standard

- **Cart, taxes, coupons, shipping methods** — all driven by the existing ecommerce stack
- **Payment gateways** — every gateway you've configured (COD, Stripe, PayPal, SePay, etc.) works without modification
- **Order email notifications** — standard ecommerce templates fire as usual
- **Tax exemptions, B2B pricing, loyalty points** — work normally if the plugins are installed

[Next: tracking pixels and conversion webhooks &rarr;](./tracking-and-webhooks)
