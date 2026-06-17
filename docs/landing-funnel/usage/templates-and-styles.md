---
title: Templates and Visual Styles
description: 4 conversion-tested templates × 8 visual style presets — when to use which.
---

# Templates and Visual Styles

Landing Funnel separates **structural layout** (template) from **visual theme** (style). Pick one of each per funnel. Same markup, different vibes — 32 combinations from 4 + 8.

## Templates

Templates control which sections render and how the page is structured for ad traffic.

### Single Product Hero

**Use case:** Image-led product launch, beauty/fashion/gadget ads.

**Layout:** Hero image (left) + headline + price + CTA (right) → product details → trust badges → checkout form → sticky CTA.

Best when your product image is the hook. The hero takes the full viewport on mobile so first impression = the product.

### Video Hero + COD

**Use case:** Video-led demos, infomercial-style ads, "how it works" creatives.

**Layout:** Auto-playing video hero (mutes by default; plays-on-visible via IntersectionObserver) → COD form below the fold → product details → checkout.

Best when motion sells better than a static image (food, gadgets, fitness products). The video pauses automatically when it scrolls out of view to save bandwidth.

### Variation Grid Checkout

**Use case:** Multi-variant products (size, color, flavor), bundle promotions.

**Layout:** Hero → variation grid with qty steppers → live subtotal recalc → checkout. Each variation is a checkbox + quantity stepper; buyers can pick multiple variations and quantities in one order.

Best when buyers commonly purchase 2+ variations together (e.g. "buy 2 get 1 free" bundles).

### Minimal Product Ads

**Use case:** High-velocity ad creatives, retargeting, mobile-only campaigns.

**Layout:** Centered product image + headline + price + single CTA + minimal trust strip. No long-scroll content.

Best for retargeting visitors who already know the product — the page strips everything except the conversion action.

## Visual Styles

Each style is a CSS-variable variant applied via a `body.lf-style-{key}` class. Same markup, instant theming. Admins pick visually via SVG card previews on the funnel edit form.

### Sky & Sunset (default)
**Palette:** Sky blue `#0ea5e9` + warm sunset orange `#f97316` on white.
**Vibe:** Universal e-commerce — the safe default for any product type.

### Indigo Bold
**Palette:** Deep indigo `#4f46e5` + amber `#f59e0b` on white.
**Vibe:** Premium / SaaS — best for digital products, software, premium services.

### Emerald Fresh
**Palette:** Emerald `#059669` + coral `#ef4444` on mint cream `#f7fdf9`.
**Vibe:** Health, organic, natural — supplements, organic food, eco brands.

### Noir
**Palette:** Electric lime `#a3e635` + rose `#f43f5e` on dark slate `#0b1120`. **(Dark theme)**
**Vibe:** Fashion & luxury — high-end apparel, sneakers, premium watches.

### Rose Pop
**Palette:** Rose `#e11d48` → violet `#7c3aed` gradient hero title, on white with rose-cream wash.
**Vibe:** Lifestyle, DTC consumer — beauty, lifestyle accessories, social-first brands.

### Mint Minimal
**Palette:** Soft mint `#10b981` + amber `#f59e0b` on warm cream `#fdfcf7`.
**Vibe:** Wellness, supplements, skincare — calm, clean, trustworthy.

### Sunset Warm
**Palette:** Terracotta `#c2410c` + golden `#facc15` on warm `#fff7ed`.
**Vibe:** Artisanal food, coffee, gifts — warmth and craftsmanship.

### Cyber Neon
**Palette:** Cyan `#22d3ee` → magenta `#f0abfc` gradient CTA & hero title, on near-black `#020617`. **(Dark theme)**
**Vibe:** Gaming, tech, gadgets — futuristic, energetic, attention-grabbing.

## Style Picker UX

When editing a funnel, the **Page style** field renders as a grid of 4 cards per row. Each card shows:

- A miniature SVG mockup of the funnel page with the style's actual palette
- The style name
- Click to select — the form submits the slug (`indigo-bold`, `cyber-neon`, etc.)

The same picker appears on the plugin Settings page under **Default page style**.

## Branding Overrides on Top of Styles

Plugin Settings exposes four optional overrides that layer on top of any style:

- **Primary brand color** — replaces `--lf-accent`
- **Sale / urgency color** — replaces `--lf-sale`
- **Heading font** (Google Fonts) — applied to titles
- **Body font** (Google Fonts) — applied to body text

Empty fields = use the style's preset defaults. When set, they emit an inline `<style>` tag with `:root` overrides that win over any per-style variant.

[Configure branding overrides &rarr;](/landing-funnel/configuration#branding)

## How Styles Are Implemented

If you're customizing further:

- Each style is a CSS block in `platform/plugins/landing-funnel/resources/assets/css/landing-funnel.css` keyed by `.lf-style-{key}`.
- The block sets CSS custom properties (`--lf-accent`, `--lf-sale`, `--lf-bg`, etc.).
- Markup never changes between styles — the same Blade templates render for all 8.
- To add a custom style, register it in `Botble\LandingFunnel\Services\StyleRegistry` and add the matching CSS variant. The picker auto-detects new entries.

::: tip
Both dark themes (`noir` and `cyber-neon`) share extra rules under "DARK-STYLE SHARED REFINEMENTS" in the CSS bundle so cards, summary, and sticky CTA blend with the dark canvas. Add new dark styles by joining those selectors.
:::

[Next: how the COD checkout flow works &rarr;](./checkout-and-cod)
