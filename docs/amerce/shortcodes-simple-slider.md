# Shortcodes — Simple Slider Override

Amerce overrides the `[simple-slider]` shortcode shipped by the **simple-slider** plugin so the homepage hero renders using the theme's swiper-based partial — full-bleed slide with subtitle + display title + CTA button.

## `[simple-slider]`

Render a slider managed in **Admin → Simple Sliders**. The shortcode references the slider by `key`.

| Field | Default | Description |
|-------|---------|-------------|
| `style` | `style-1` | Layout preset — `style-1` (default) or `style-2` (split). |
| `key` | — | Slider key (set when creating the slider in admin). |
| `is_autoplay` | `yes` | `yes` / `no` — cycle automatically. |
| `autoplay_speed` | `5000` | Milliseconds between slides — `3000`, `4000`, `5000`, `6000`, `7000`, `8000`, `9000`, `10000`. |
| `show_arrows` | `yes` | Show prev/next arrows. |
| `show_dots` | `yes` | Show pagination dots. |

```html
[simple-slider style="style-1" key="home-hero" is_autoplay="yes" autoplay_speed="5000"][/simple-slider]
```

## How the override works

1. The theme hooks `SIMPLE_SLIDER_VIEW_TEMPLATE` (priority `120`) to point at `partials/shortcodes/simple-slider/index.blade.php` inside the theme.
2. `Shortcode::modifyAdminConfig('simple-slider', …)` adds the `style`, `is_autoplay`, `autoplay_speed`, `show_arrows`, and `show_dots` fields to the existing plugin form (it does **not** replace the form — the plugin's original `key` field is preserved).
3. The shortcode is excluded from the shortcode cache (`Shortcode::ignoreCaches(['simple-slider'])`) so admin edits are reflected immediately on the storefront.

If the `simple-slider` plugin is inactive, all of the above is skipped — the original plugin shortcode (when re-enabled) continues to behave as it did upstream.

## Managing slides

Slide records are managed via the plugin UI:

1. Go to **Admin → Simple Sliders**.
2. Create a slider with a unique `key`.
3. Add slides with image, title, subtitle, button text, button URL.
4. Reference the slider via the `[simple-slider]` shortcode in a UI Block (or in raw page content).

See the [simple-slider plugin docs](/cms/simple-slider) for the underlying data model.

## See also

- [UI Block overview](./usage-ui-block.md)
- [Hero & Banners](./shortcodes-hero-banners.md) — for `[hero-slideshow]`, the theme's native slider that does not depend on the plugin.
