---
title: Usage Overview
description: How to use the Landing Funnel plugin day-to-day.
---

# Usage Overview

Landing Funnel adds a new **Landing Funnels** group to your admin sidebar (under Ecommerce). From here you create funnels, monitor their performance, and ship them to ad campaigns.

## Admin Sidebar Structure

| Menu | Purpose |
|---|---|
| **All Funnels** | List, create, edit, duplicate, delete funnels |
| **Orders** | View orders attributed to each funnel |
| **Reports** | Cross-funnel analytics — visits, conversions, revenue, conversion rate |
| **Webhooks** | Webhook delivery log with retry from UI |
| **Settings** | Plugin-wide defaults, branding, tracking pixels |

## Typical Workflow

1. [Create a funnel](./creating-funnels) — pick product, template, style
2. Copy the funnel URL (`/landing/{slug}`) into your ad campaign
3. As visitors land, Pixel events (`PageView`, `ViewContent`, `InitiateCheckout`, `Purchase`) fire automatically
4. Orders convert via standard ecommerce checkout — but with funnel-friendly defaults (guest-allowed, pre-filled fields)
5. Monitor performance in **Reports** — drill down per funnel
6. Optional: connect a CRM via [conversion webhooks](./tracking-and-webhooks#webhooks)

## Concepts

### Template vs Style

- **Template** = structural layout (which sections appear: hero, video, variation grid, etc.). Picked per funnel.
- **Style** = visual theme (colors, gradients, accents). Picked per funnel from 8 presets. Same markup across all styles.

You can apply any of 8 styles to any of 4 templates — 32 combinations out of the box.

[See all templates and styles &rarr;](./templates-and-styles)

### Funnel Content

Each funnel stores a JSON `content` field with shortcode-keyed sections (`lf-hero`, `lf-features`, `lf-faq`, `lf-testimonials`, etc.). Override sections in the **Content** tab on the edit form — anything you leave blank falls back to the template's defaults.

### Attribution

Each funnel visit gets a session-scoped record with UTM parameters, referrer, user-agent, and hashed IP. When the visitor converts via the standard checkout, a 48-hour attribution cache key stitches the resulting order back to the funnel — even if the visitor's session cookies are dropped by an off-site payment redirect.

[How the COD checkout flow works &rarr;](./checkout-and-cod)

### Custom Code

Each funnel has a `custom_css` field (HTML-sanitized + style-tag-stripped) and a `custom_js` field (gated by `landing-funnel.use-custom-js` permission). Use these for ad-pixel snippets, tag managers, or page-specific tweaks.

The plugin also emits a restrictive Content-Security-Policy meta tag that whitelists Meta, GA4, and TikTok pixel domains. Custom JS that tries to call other external endpoints will be blocked.

## What's Not in Scope

- **Multi-step funnels** — Landing Funnel is single-page by design. For multi-step lead-gen flows, use the BB Form Builder plugin.
- **Email marketing** — connect your ESP via [webhooks](./tracking-and-webhooks#webhooks).
- **A/B testing** — duplicate a funnel with a different slug + style and route ad traffic separately. Compare via the Reports page.

[Start by creating your first funnel &rarr;](./creating-funnels)
