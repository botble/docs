---
title: FAQ
description: Frequently asked questions about the Landing Funnel plugin.
---

# FAQ

## Does this replace my theme's product page?

No. Landing Funnel runs alongside your theme. Each funnel lives at `/landing/{slug}` and ships its own standalone layout — your theme's product pages at `/products/{slug}` are untouched.

Funnels are for paid-ad traffic. The product page is for organic traffic and SEO. Both can coexist for the same product.

## Will it work with my custom theme?

Yes — the plugin's funnel pages don't load any theme assets. The standalone layout, CSS, JS, and SVG icons are owned by the plugin. Funnels render identically on Shofy, Martfury, Ecomi, FashionShop, and custom themes.

This also means: theme updates don't break funnels, and funnel updates don't affect your theme.

## How does this differ from regular Botble product pages?

| | Product page | Landing funnel |
|---|---|---|
| URL | `/products/{slug}` | `/landing/{slug}` |
| Theme | Your active theme | Plugin-owned, standalone |
| Checkout | Add to cart → checkout (2-3 pages) | Inline form → 1 page |
| Tracking | Standard pixels | Per-funnel pixels + webhook + attribution |
| Use case | Organic / SEO | Paid ads / COD |
| Templates | One per theme | 4 to choose from |
| Visual styles | One per theme | 8 to choose from |

## Can I use the plugin without Ecommerce?

No. Landing Funnel depends on Botble Ecommerce for cart, product model, checkout pipeline, and order events. Make sure Ecommerce is activated before activating Landing Funnel.

## Does it support multi-currency / multi-language?

**Multi-currency:** yes — the plugin uses the standard `format_price()` helper, which respects the active currency. Funnels show prices in whatever currency the visitor's locale resolves to.

**Multi-language:** yes — translations ship for English, Vietnamese, Simplified Chinese, French. Add more by dropping a `landing-funnel.php` file under `resources/lang/{locale}/` in the plugin directory.

## Does the plugin support variations?

Yes — use the `variation-grid-checkout` template. Buyers can pick multiple variations (size, color, flavor) with quantity steppers in one order. Each selected variation becomes its own `OrderProduct` row using existing Botble cart math.

For single-variation products, the other 3 templates use the default variation automatically.

## Can I A/B test funnels?

Yes. Two common patterns:

1. **Duplicate funnels** — admin offers a one-click "Duplicate" action. Create two copies with different slugs (`hero-v1`, `hero-v2`) + different styles or content, then route ad traffic separately. Compare via the Reports page.
2. **UTM tagging** — use the same funnel slug but tag your ads with different `utm_content` values. The funnel captures UTM into the visit log and onto the webhook payload, so your CRM can attribute conversions per creative.

## Do I need a queue worker?

For **webhooks** — yes. Conversion webhook delivery uses Laravel jobs that need a `queue:work` process running.

For everything else — no. Funnel pages render synchronously, visit logs write synchronously, attribution cache writes are synchronous.

## How big is the public bundle?

- Plugin CSS: ~25 KB gzipped (one file, vanilla CSS)
- Plugin JS: ~6 KB gzipped (vanilla JS, no jQuery)
- SVG icons: inline, ~2 KB total
- Pixel scripts (per-platform): ~30 KB each from external CDN

Total funnel page: ~70–100 KB on first load depending on which pixels are configured. Lighthouse mobile performance scores 90+ on every template.

## Does the plugin support webhooks for cart abandonment?

Not currently. Only `funnel.conversion` events fire on completed orders. To add cart abandonment, hook into Botble's existing cart events from a separate plugin.

## Can I customize the templates?

Yes — copy the relevant view file from `platform/plugins/landing-funnel/resources/views/public/templates/` to `resources/views/vendor/plugins/landing-funnel/public/templates/` and edit your copy. Laravel will load your override.

The view receives `$funnel`, `$product`, `$content`, and `$hasStickyCta` — see the original template for what's available.

## Can I add a new template?

Yes — three steps:

1. Create a Blade file under `resources/views/public/templates/{your-key}.blade.php`
2. Register it in `Botble\LandingFunnel\Services\TemplateRegistry` with a label, view path, and section list
3. (Optional) Add a translation entry under `templates.{your_key}` in `resources/lang/en/landing-funnel.php`

The new template auto-appears in the dropdown on the funnel edit form.

## Can I add a new visual style?

Yes — two steps:

1. Register the style in `Botble\LandingFunnel\Services\StyleRegistry` with `colors` and `theme` metadata
2. Add a `.lf-style-{your-key}` CSS block in `resources/assets/css/landing-funnel.css` overriding the CSS variables

The new style auto-appears in the picker with an SVG preview generated from your `colors` metadata.

## What happens to funnels when the linked product is deleted?

The funnel returns 404 to visitors. The funnel row stays in the database (along with its visit log and attribution rows) so historical analytics remain intact.

To restore access, attach a new product to the funnel from the Basics tab.

## How do I export visit and order data?

Two CSV exports are available under **Admin > Landing Funnels**:

- **Export visits** — visits with UTM, referrer, user-agent, hashed IP
- **Export orders** — funnel-attributed orders with subtotal, currency, and customer info

Both use date-range filtering. Files are downloaded in standard CSV format.

## Is the plugin GDPR-compliant?

The plugin captures:

- Hashed IP (not raw IP) — `sha256(ip)` stored in visits
- User-Agent string
- UTM parameters
- Session ID
- Customer name, phone, email, address, city (on form submit only — same as standard ecommerce checkout)

No third-party cookies are set by the plugin itself. Tracking pixels (Meta, GA4, TikTok) set their own cookies — those fall under your existing ecommerce privacy policy.

## How long is data retained?

- **Visit logs** — controlled by `Visit log retention (days)` setting; auto-purged by `landing-funnel:purge-visits` command. Default 90 days.
- **Order attribution** — kept forever (never auto-purged). Cascades on funnel delete.
- **Webhook delivery log** — kept forever (no auto-purge).
- **Attribution cache** — 48 hours.

## Where do I report bugs?

Open a support ticket from your CodeCanyon downloads page. Include:

- Botble CMS version
- Landing Funnel plugin version
- Browser / device info (for frontend issues)
- Relevant entries from `storage/logs/laravel-*.log`
- Steps to reproduce

[Troubleshooting common issues &rarr;](/landing-funnel/troubleshooting)
