# Theme Customization (Developer Guide)

Reference for **agencies and developers** rebuilding Amerce for end-clients. Covers the tech stack, file map, SCSS architecture, JS build pipeline, and the supported recipes for extending Theme Options without forking the theme.

For the end-user field-by-field walkthrough, see **[Theme options](./usage-theme-options.md)**.

## Tech Stack

| Layer | Used |
|---|---|
| Framework | **Botble CMS 7.x** on **Laravel 13** (PHP 8.3+ / 8.4) |
| Templating | Blade (`platform/themes/amerce/views`, `partials`, `layouts`) |
| Front-end CSS | **Bootstrap 5.3** + custom **SCSS** (Dart Sass) |
| Front-end JS | jQuery 4 + Bootstrap 5 bundle + Swiper + theme `script.js` |
| Build | **Vite 8** (entry: `platform/themes/amerce/vite.build.mjs`) |
| Icons | icomoon webfont (`assets/fonts`) + `<x-core::icon>` Tabler Icons (admin) |
| Theme Options engine | `Botble\Theme\ThemeOption` (registered in `functions/theme-options.php`) |
| Shortcode engine | `Botble\Shortcode` (registered in `functions/shortcodes*.php`) |
| Required plugins | `ecommerce` (declared in `theme.json`) |
| Optional plugins | `marketplace`, `blog`, `simple-slider`, `faq`, `contact`, `newsletter`, `payment`, `language` |

## Build Commands

Rebuild assets after changing SCSS or JS:

```bash
# from project root
npm install              # one-time
npm run prod             # production build (writes platform/themes/amerce/public/css|js + public/themes/amerce/css|js)
npm run dev              # development build (no minify)
```

The production build also auto-bumps the cache-buster suffix in `platform/themes/amerce/config.php` so customer browsers pull the fresh CSS.

## File Map

```
platform/themes/amerce/
├── theme.json                  # Manifest: presets, required plugins, version
├── config.php                  # Asset declarations + cache-buster suffix
├── functions/
│   ├── functions.php           # Composers, body-class wiring, mode switching
│   ├── theme-options.php       # ⭐ All Theme Options fields registered here
│   ├── shortcodes*.php         # All shortcodes registered here
│   └── ...
├── layouts/                    # base.blade.php, fullscreen.blade.php
├── partials/
│   ├── header/styles/*.blade   # One file per header style (14 styles)
│   ├── footer/styles/*.blade   # One file per footer style (4 styles)
│   ├── shortcodes/*.blade      # Public render template per shortcode
│   └── ...
├── views/
│   ├── templates/              # Page templates exposed in admin
│   └── ecommerce/              # PDP, gallery, quick-view, cart, checkout overrides
├── widgets/                    # Custom widgets (newsletter, recent products, etc.)
├── assets/
│   ├── sass/                   # SCSS source
│   └── js/script.js            # Theme JS entry
├── public/                     # Built CSS/JS (ships in package)
├── routes/                     # Theme-only routes (404, demo, etc.)
└── lang/                       # Translations
```

## SCSS Architecture

```
platform/themes/amerce/assets/sass/
├── abstracts/        # variables, mixins, functions (breakpoints, transitions)
├── core/             # reset, typography, base utility classes
├── component/
│   ├── header/       # 14 header style partials
│   ├── footer/       # 4 footer style partials
│   ├── blog/
│   ├── elements/     # product card, cart, quick-view, lookbook, etc.
│   ├── landing/
│   └── _index.scss   # forwards all components
├── _dark-mode.scss
├── app.scss          # main entry  → theme.css
├── ecommerce.scss    # ecommerce-only styles
├── marketplace.scss  # marketplace-only styles
└── rtl.scss          # RTL overrides
```

### Common knobs

- **Brand colors:** prefer **Theme Options → Colors** (CSS vars). For deeper changes edit `abstracts/_variables.scss` then `npm run prod`.
- **Typography:** prefer **Font Picker**. For deeper changes edit `core/_typography.scss`.
- **Breakpoints:** mobile-first. Mixin `@include res(xl, min)` = `min-width: 1200px`. See `abstracts/_mixin.scss`.
- **Dark mode:** `_dark-mode.scss` flips palette via `[data-bs-theme="dark"]`. Add overrides scoped under this selector to retheme any component.

### Adding a custom CSS bundle

1. Drop a new file under `assets/sass/`.
2. Reference it from `app.scss` (or create a new entry in `vite.build.mjs` and load it from a layout).
3. Run `npm run prod`.

## JS Build Pipeline

Single Vite entry: `assets/js/script.js`. It imports the per-feature JS modules (`main.js`, `shop.js`, `product-gallery.js`, etc.) and Vite concatenates the result into `public/js/script.js`.

```js
// vite.build.mjs
export default {
    js:   [{ src: 'assets/js/script.js', out: 'script.js' }],
    sass: [
        { src: 'assets/sass/theme.scss',       out: 'theme.css' },
        { src: 'assets/sass/ecommerce.scss',   out: 'ecommerce.css' },
        { src: 'assets/sass/marketplace.scss', out: 'marketplace.css' },
        { src: 'assets/sass/rtl.scss',         out: 'rtl.css' },
    ],
};
```

Keep new theme JS vanilla / jQuery — no webpack imports. After edits, run `npm run prod`. The compiled file outputs to:

- `platform/themes/amerce/public/js/script.js` *(ships with the package)*
- `public/themes/amerce/js/script.js` *(served by Laravel — gitignored, generated by the build)*

The theme hooks into Botble's ecommerce JS via `data-bb-toggle="add-to-cart|add-to-wishlist|add-to-compare|quick-shop|quick-view"`. AJAX endpoints are wired in `routes/public.php` of the **ecommerce** plugin — keep those data-attrs intact when copying actions.

## Per-Page Customization

### Page templates

Editable in admin **Page → Template** field. Templates live in `views/templates/`:

- `default` — full-width content
- `homepage` — homepage with shortcodes
- `homepage-v2`, `homepage-v3` … — preset-specific layouts
- `contact`, `about`, `faq`, `landing` — page styles
- `coming-soon`, `maintenance` — special pages

### Per-page body class

Each Page record exposes `body_class` via `Theme::set('bodyClass', …)` in `functions.php`. Useful for ad-hoc one-page styling.

### Page builder (shortcodes)

The Page editor uses the **Visual Builder** (drag-and-drop shortcodes) when the **Shortcode** package is active. Toggle per-page with the *"Use the editor with shortcodes"* switch above the editor.

For the full shortcode catalogue see **[UI Block & Shortcodes](./usage-ui-block.md)**.

## Extending Theme Options

To **add** a field without forking, listen to `RenderingThemeOptionSettings` from a plugin or the theme's `functions.php`:

```php
use Botble\Theme\Events\RenderingThemeOptionSettings;

app('events')->listen(RenderingThemeOptionSettings::class, function (): void {
    theme_option()->setField([
        'id' => 'my_custom_flag',
        'section_id' => 'opt-text-subsection-misc',
        'type' => 'onOff',
        'label' => __('My custom flag'),
        'attributes' => ['name' => 'my_custom_flag', 'value' => false],
    ]);
});
```

Then read it anywhere with `theme_option('my_custom_flag', false)`.

### Section IDs you can target

| Section | `section_id` |
|---|---|
| General | `opt-text-subsection-general` |
| Header | `opt-text-subsection-header` |
| Colors | `opt-text-subsection-colors` |
| Footer | `opt-text-subsection-footer` |
| Ecommerce | `opt-text-subsection-ecommerce` |
| Miscellaneous | `opt-text-subsection-misc` |
| Logo extras | `opt-text-subsection-logo` |

### Removing a field

Same listener pattern — call `theme_option()->removeField('field_id')`.

## Typography (Font Picker)

Path: **Appearance → Theme Options → Font Picker**.

Registered families (see `functions/theme-options.php` top):

| Key | Role | Default |
|---|---|---|
| `primary` | Body text | DM Sans |
| `heading` | h1–h6 | DM Sans |
| `secondary` | Accents | Urbanist |
| `display` | Display headings | Red Hat Display |
| `accent` | UI accents | Outfit |

Default font sizes are registered too (`h1` 60px … `body` 16px). Override in the admin — values write CSS variables consumed by `_typography.scss`.

## Menus, Widgets, Translations

| Concern | Where |
|---|---|
| Header menus | **Appearance → Menus** → locations `main-menu`, `mobile-menu` |
| Footer menus | locations `footer-1`, `footer-2`, `footer-3` |
| Widgets | **Appearance → Widgets** — sidebars: `primary_sidebar`, `footer_sidebar`, `ecommerce_sidebar` |
| Translations | **Plugins → Language** + per-key strings under `lang/<locale>.json` |
| String overrides | Drop a `lang/<locale>.json` into the theme — overrides `__()` calls |

## Troubleshooting

| Symptom | Check |
|---|---|
| Theme Options panel empty | `php artisan cache:clear && php artisan optimize:clear` |
| Built CSS not updating | Re-run `npm run prod`. Confirm timestamps on `public/themes/amerce/css/theme.css`. |
| Homepage falls back to old layout | Hard-refresh; check `homepage_body_class` value matches your preset. |
| Mini-cart shows no progress bar | `mini_cart_freeship_threshold` may be 0. |
| Compare button missing on cards | `EcommerceHelper::isCompareEnabled()` must be true (admin → Ecommerce → Settings → Compare). |
| Quick View modal won't open | Ensure `enable_quick_view` is on and the `#product-quick-view-modal` shell is present (it is — in the layout). |
