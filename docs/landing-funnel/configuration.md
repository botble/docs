---
title: Configuration
description: Plugin-wide settings — defaults, branding, privacy, and tracking pixels.
---

# Configuration

All plugin-wide settings live under **Admin > Landing Funnels > Settings**. They're organized into four sections matching the order of typical setup.

## General Defaults

Defaults applied when creating a new funnel — admins can still override per funnel.

| Setting | Purpose |
|---|---|
| **Default template** | The template pre-selected on the new-funnel form. Options: `single-product-hero`, `video-hero-cod`, `variation-grid-checkout`, `minimal-product-ads`. |
| **Default page style** | Visual style pre-selected on the new-funnel form. Picker shows SVG previews of all 8 styles. |

## Branding

Optional brand overrides applied on top of every funnel's selected style. Empty fields = use the style's preset defaults.

| Setting | Format | Effect |
|---|---|---|
| **Primary brand color** | Hex (e.g. `#0ea5e9`) | Replaces the style's `--lf-accent`, used for primary CTAs, focus rings, accent surfaces. Hover/soft/ring variants are auto-derived via `color-mix()`. |
| **Sale / urgency color** | Hex | Replaces `--lf-sale`, used for sale badges, urgency kicker, discount tags. |
| **Heading font** | Google Font family name | Applied to hero title, product title, and section headings. Auto-loaded from Google Fonts. |
| **Body font** | Google Font family name | Applied to body text and form fields across funnel pages. |

::: tip
When any branding override is set, the layout emits a `<link rel="preconnect">` and a Google Fonts stylesheet with `display=swap` for both fonts. Empty branding = zero extra HTTP requests.
:::

::: info
Brand color hex values are validated server-side; malformed input (e.g. with HTML tags) is silently dropped. Font names accept only `[A-Za-z0-9 ]` characters, 2–60 chars.
:::

## Privacy & Content Protection

Controls how funnels behave in search engines, manage visit-log retention, and filter crawler traffic.

| Setting | Default | Effect |
|---|---|---|
| **Hide new funnels from search engines by default** | ON | Sets `noindex,nofollow` on all new funnels so paid-ad pages don't compete with your main store in organic search. Override per funnel in the SEO tab. |
| **Disable per-funnel Custom CSS + JS site-wide** | OFF | Kill-switch — when ON, neither `custom_css` nor `custom_js` is rendered on any public funnel page, regardless of per-funnel content. |
| **Visit log retention (days)** | 90 | Number of days `landing-funnel:purge-visits` retains visit records. Set to 0 to disable auto-purge. |
| **Bot user-agent keywords** | (preset list) | Newline-separated user-agent substrings excluded from visit logs. Defaults cover Google, Bing, Facebook, TikTok, ahrefs, semrush. |

::: warning
The custom-asset kill-switch is for emergency use (e.g. a per-funnel script breaks every page). Per-funnel custom code remains stored — toggle the switch off again to restore.
:::

## Default Tracking Pixels

Pre-fill these IDs so your team doesn't paste them on every new funnel. Per-funnel values still take precedence.

| Field | Format | Example |
|---|---|---|
| **Default Facebook Pixel ID** | 15–16 digits | `123456789012345` |
| **Default TikTok Pixel ID** | 20 uppercase alphanumeric | `C8XXXXXXXXXXXXXXXXXX` |
| **Default GA4 Measurement ID** | `G-` + 10 uppercase alphanumeric | `G-XXXXXXXXXX` |

::: tip
Each pixel field validates against the platform's actual ID format. If your IDs are rejected, double-check the format — TikTok IDs are uppercase only, GA4 IDs always start with `G-`.
:::

## Saving the License

A separate "License" section at the top of the Settings page activates and deactivates the plugin license. The plugin will run in trial mode until a valid license is activated.

## Where Settings Are Stored

All landing-funnel settings live in the standard Botble `core_settings` table with the prefix `landing_funnel_` (e.g. `landing_funnel_default_template`). They're cached via the Botble setting facade and survive plugin deactivation.

[Now create your first funnel &rarr;](/landing-funnel/usage/creating-funnels)
