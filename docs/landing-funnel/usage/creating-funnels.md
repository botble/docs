---
title: Creating a Funnel
description: Step-by-step guide to creating, editing, duplicating, and scheduling a funnel.
---

# Creating a Funnel

Funnels are created from **Admin > Landing Funnels > New**. The form has six tabs — only the **Basics** tab is required to publish.

## Basics Tab

| Field | Required | Notes |
|---|---|---|
| **Name** | Yes | Internal label — never shown to visitors |
| **Slug** | Yes | URL fragment (`/landing/{slug}`). Lowercase letters, numbers, hyphens only. Max 191 chars. |
| **Template** | Yes | Pick one of 4 — drives which sections render |
| **Page style** | Yes | Pick one of 8 visual style presets via SVG card preview |
| **Product** | Recommended | The product the funnel sells. Drives price, image, and variations. Funnels without a product return 404 to visitors. |

::: tip
If guest checkout is disabled store-wide, an informational banner appears in this tab explaining that the funnel will override the setting for its own orders. No action required from the admin.
:::

## Content Tab

The plugin renders default content from the chosen template, but you can override any section using shortcode-keyed JSON. Sections you can override:

- `lf-hero` — headline, subheadline, CTA label, hero image override
- `lf-product` — product name, price, description override
- `lf-features` — list of feature items with label + sub
- `lf-faq` — accordion items with question + answer
- `lf-testimonials` — customer testimonials with optional ratings
- `lf-variation-grid` — variation labels and qty defaults (variation-grid template only)
- `lf-sticky-cta` — sticky bottom CTA label override

Each section is optional. Empty section = use template default.

## Tracking Tab

Set per-funnel tracking IDs. Each falls back to the corresponding plugin-wide default if left blank.

| Field | Format |
|---|---|
| **Facebook Pixel ID** | 15–16 digits |
| **TikTok Pixel ID** | 20 uppercase alphanumeric |
| **GA4 Measurement ID** | `G-` + 10 uppercase alphanumeric |
| **Conversion webhook URL** | Full URL (max 500 chars) — POSTs signed JSON when an order converts |
| **Webhook signing secret** | Optional. When set, payloads are signed `X-LF-Signature: sha256=<hex>` |

[Webhook payload format &rarr;](./tracking-and-webhooks#webhook-payload)

## Thank-you Tab

Per-funnel post-purchase page. If you set any of these fields, the standard ecommerce "order success" page is bypassed and visitors land on `/landing/{slug}/thanks?order={token}` instead.

| Field | Purpose |
|---|---|
| **Headline** | Overrides "Thank you for your order!" |
| **Body** | Free-text message (up to 5000 chars) |
| **CTA label** | E.g. "Track your order", "See related products" |
| **CTA URL** | Where the CTA button links to |

Leave all fields blank to fall back to the standard ecommerce success page.

## SEO Tab

| Field | Default | Notes |
|---|---|---|
| **Meta title** | Product name | Used in `<title>` and OG tags |
| **Meta description** | First 160 chars of product description | Used in `<meta>` and OG tags |
| **Social share image** | Product image | OG image (1200×630 recommended) |
| **Hide from search engines (noindex)** | ON | Sets `noindex,nofollow` — recommended for paid-ad pages |

## Advanced Tab

- **Schedule** — `Starts at` / `Ends at` timestamps. Outside the window the funnel URL returns 404 — perfect for time-bound flash sales.
- **Custom CSS** — appended to the page. HTML-sanitized + `</style>` / `</script>` substring-stripped before render.
- **Custom JS** — appended to the page. Gated by `landing-funnel.use-custom-js` permission; unprivileged admins won't see the field.

::: warning
Custom JS runs on every visitor's browser. Use it only for trusted ad-pixel snippets or your own analytics. The Content-Security-Policy meta limits external script sources but does not prevent inline JS from running.
:::

## Save and Publish

1. Set status to **Published** in the right-hand sidebar
2. Click **Save**
3. Visit `/landing/{your-slug}` to preview

Funnels with status `Draft` return 404 to visitors but remain editable.

## Duplicating a Funnel

To create variants for A/B testing:

1. Go to **Landing Funnels** in admin
2. Click the dropdown next to the funnel
3. Select **Duplicate**

The copy uses the original name + " (Copy)" and a slug suffix to keep URLs unique. Visit counts and orders are **not** copied — only the configuration.

## Deleting a Funnel

Deleting a funnel cascades the delete to its visit log and order attribution records. Real ecommerce orders are **not** deleted — they keep their `funnel_id` reference, but the funnel row is gone, so analytics for that funnel become inaccessible.

::: warning
Use **Status: Draft** or schedule `Ends at` instead of deleting if you might want the data later.
:::

[Now configure tracking pixels and webhooks &rarr;](./tracking-and-webhooks)
