---
title: Landing Funnel
description: Build high-converting, single-product ads landing pages with one-page COD checkout for Botble Ecommerce.
---

# Landing Funnel

Build high-converting, single-product ads landing pages with built-in one-page Cash-on-Delivery checkout — optimized for Facebook / TikTok / Google ad campaigns. Works on **any** Botble Ecommerce theme without touching a single theme file.

## What You Can Do

### Pick from 4 conversion-tested templates

Each template targets a specific ad-traffic pattern: `single-product-hero` (image-led), `video-hero-cod` (auto-playing video), `variation-grid-checkout` (multi-variant), `minimal-product-ads` (ultra-stripped). Switch templates per-funnel — no code edits.

[Templates and visual styles &rarr;](/landing-funnel/usage/templates-and-styles)

### Apply one of 8 visual style presets

Sky & Sunset, Indigo Bold, Emerald Fresh, Noir, Rose Pop, Mint Minimal, Sunset Warm, Cyber Neon. Same markup, instant theming via CSS variables. Admins pick visually via SVG card previews — no dropdowns.

[See all style presets &rarr;](/landing-funnel/usage/templates-and-styles#visual-styles)

### Override colors and Google Fonts at brand level

On top of any preset, override the **primary color**, **sale color**, **heading font** (Google Fonts), and **body font**. Empty fields fall back to the style's defaults. Fonts auto-load with `display=swap`.

Go to **Landing Funnels > Settings > Branding** in admin.

[Configure branding &rarr;](/landing-funnel/configuration#branding)

### Run one-page COD checkout that respects ecommerce settings

The inline form collects name, phone, email, address, city — submits via AJAX and lands the customer on the standard `/checkout/{token}` page with all fields pre-filled. Cart, shipping methods, payment gateways, taxes, and coupons all work normally.

A dedicated middleware allows guest checkout for **funnel-originated orders only**, even when your store-wide setting has guest checkout disabled. Country and state are auto-filled from your store settings so visitors never see a second form.

[How the checkout flow works &rarr;](/landing-funnel/usage/checkout-and-cod)

### Track campaigns with FB / GA4 / TikTok pixels

Per-funnel and plugin-wide default Pixel IDs for Meta, GA4, and TikTok. UTM parameters from ad clicks are captured on every visit and stitched to the resulting order. A 48-hour attribution cache survives off-site payment redirects.

[Tracking setup &rarr;](/landing-funnel/usage/tracking-and-webhooks#tracking-pixels)

### Send conversion webhooks to your CRM

Per-funnel webhook URL with optional HMAC-SHA256 signing secret. Failed deliveries are logged with the full payload and can be retried from the admin UI.

[Webhook integration &rarr;](/landing-funnel/usage/tracking-and-webhooks#webhooks)

## Quick Start

1. **Activate the plugin** at **Admin > Plugins** ([Installation guide](/landing-funnel/installation))
2. **Set defaults** at **Landing Funnels > Settings** — default template, style, and tracking pixels ([Configuration](/landing-funnel/configuration))
3. **Create a funnel** at **Landing Funnels > New** — pick a product, template, and style ([Creating a funnel](/landing-funnel/usage/creating-funnels))
4. **Drive traffic** to `/landing/{your-slug}` — Pixel events fire automatically as visitors interact

## Key Features

- **4 templates** × **8 visual styles** = 32 ready-to-publish layouts
- **One-page COD checkout** with conflict-safe guest-checkout override middleware
- **Custom branding** — primary color, sale color, heading font, body font (Google Fonts) on top of any style
- **Tracking pixels** — Facebook (Meta), GA4, TikTok with per-funnel + global defaults
- **48h attribution cache** — funnel ↔ order mapping survives payment-gateway redirects
- **HMAC-signed webhooks** — `X-LF-Signature: sha256=...` per delivery
- **Bot filtering** — admin-managed user-agent keywords excluded from analytics
- **Visit log retention** — `landing-funnel:purge-visits` artisan command
- **Custom thank-you page** — per-funnel headline, body, CTA
- **42+ locale support** — including Vietnamese, Simplified Chinese, French translations shipped

## Requirements

- Botble CMS version 7.5.0 or higher
- Botble Ecommerce plugin activated
- PHP 8.2+
- At least one published product in your store

## Security Model

- Public funnel routes are throttled (120/min GET, 30/min POST)
- Webhook payloads are HMAC-SHA256 signed when a secret is configured
- `custom_js` field is gated by a separate `landing-funnel.use-custom-js` permission; unprivileged admins can edit funnels but the field is stripped server-side
- `custom_css` is HTML-sanitized AND has `</style>` / `</script>` substrings stripped before render
- A plugin-wide kill-switch disables all custom CSS and JS at once
- A restrictive Content-Security-Policy meta tag constrains the blast radius of custom scripts

[See troubleshooting if you hit unexpected behavior &rarr;](/landing-funnel/troubleshooting)
