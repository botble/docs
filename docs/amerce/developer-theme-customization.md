# Theme Customization (Developer Guide)

Reference for **agencies and developers** rebuilding Amerce for end-clients. Covers the tech stack, file map, SCSS architecture, JS build pipeline, and the supported recipes for extending Theme Options without forking the theme.

For the end-user field-by-field walkthrough, see **[Theme options](./usage-theme-options.md)**.

## Tech Stack

| Layer | Used |
|---|---|
| Framework | **Botble CMS 7.x** on **Laravel 13** (PHP 8.3.0+ / 8.4) |
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

Theme assets are versioned with `get_cms_version()` in `platform/themes/amerce/config.php` (the `?v=` query changes on each CMS update). After a custom rebuild, hard-refresh or purge any CDN cache so browsers pull the fresh CSS.

## File Map

```
platform/themes/amerce/
├── theme.json                  # Manifest: presets, required plugins, version
├── config.php                  # Asset declarations (versioned with get_cms_version())
├── functions/
│   ├── functions.php           # Composers, body-class wiring, mode switching
│   ├── theme-options.php       # ⭐ All Theme Options fields registered here
│   ├── shortcodes*.php         # All shortcodes registered here
│   └── ...
├── layouts/                    # base + page templates: default, homepage, full-width, landing, without-layout
├── partials/
│   ├── header/styles/*.blade   # One file per header style (14 styles)
│   ├── footer/styles/*.blade   # One file per footer style (9 styles)
│   ├── shortcodes/*.blade      # Public render template per shortcode
│   └── ...
├── views/
│   ├── templates/              # Blog post-list templates
│   └── ecommerce/              # PDP, gallery, quick-view, cart, checkout overrides
├── widgets/                    # Custom widgets (newsletter, recent products, etc.)
├── assets/
│   ├── sass/                   # SCSS source
│   └── js/script.js            # Theme JS entry
├── public/                     # Built CSS/JS (ships in package)
├── routes/                     # Theme AJAX/public routes (product search, cart fragment, brands, collections...)
└── lang/                       # Translations
```

## SCSS Architecture

```
platform/themes/amerce/assets/sass/
├── abstracts/        # variables, mixins, functions (breakpoints, transitions)
├── core/             # reset, typography, base utility classes
├── component/
│   ├── header/       # _header.scss, _topbar.scss (all header styles)
│   ├── footer/       # _footer.scss (all footer styles)
│   ├── blog/
│   ├── elements/     # product card, cart, quick-view, lookbook, etc.
│   ├── layout/
│   ├── shop/
│   └── _index.scss   # forwards all components
├── _dark-mode.scss
├── app.scss          # abstracts + core + components
├── theme.scss        # main entry (imports app + dark-mode) → theme.css
├── theme-account.scss, theme-compare.scss, theme-product-extras.scss  # route-scoped bundles
├── ecommerce.scss    # ecommerce-only styles
├── marketplace.scss  # marketplace-only styles
└── rtl.scss          # RTL overrides
```

### Common knobs

- **Brand colors:** prefer **Theme Options → Colors** (CSS vars). For deeper changes edit `abstracts/_variable.scss` then `npm run prod`.
- **Typography:** prefer **Theme Options → Typography**. For deeper changes edit `core/_typography.scss`.
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
        // Route-scoped bundles split out of theme.css
        { src: 'assets/sass/theme-account.scss',        out: 'theme-account.css' },
        { src: 'assets/sass/theme-compare.scss',        out: 'theme-compare.css' },
        { src: 'assets/sass/theme-product-extras.scss', out: 'theme-product-extras.css' },
    ],
};
```

Keep new theme JS vanilla / jQuery — no webpack imports. After edits, run `npm run prod`. The compiled file outputs to:

- `platform/themes/amerce/public/js/script.js` *(ships with the package)*
- `public/themes/amerce/js/script.js` *(served by Laravel — gitignored, generated by the build)*

The theme hooks into Botble's ecommerce JS via `data-bb-toggle="add-to-cart|add-to-wishlist|add-to-compare|quick-shop"`. Quick View buttons use `data-bs-toggle="modal" data-bs-target="#product-quick-view-modal"` with <code v-pre>data-url="{{ route('public.ajax.quick-view', $product) }}"</code>. AJAX endpoints are wired in `routes/public.php` of the **ecommerce** plugin — keep those data-attrs intact when copying actions.

## Per-Page Customization

### Page templates

Editable in admin **Page → Template** field. Templates are registered with `register_page_template()` in `functions/functions.php` and map to files in `layouts/`:

- `default` — standard page
- `homepage` — homepage with shortcodes
- `full-width` — full-width content
- `landing` — landing page
- `without-layout` — no container, no breadcrumb
- `blog-with-sidebar`, `blog-no-sidebar` — blog listing pages

### Body class

**Theme Options → Miscellaneous → Homepage body class** (`homepage_body_class`) adds a CSS class to `<body>` (rendered in `layouts/base.blade.php`). Useful for preset-specific styling (e.g. `home-fashion`).

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

## Typography

Path: **Appearance → Theme Options → Typography**.

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
| Header menus | **Appearance → Menus** → location `main-menu` (the mobile drawer clones the desktop menu) |
| Footer menus | **Footer Menu** widget placed in the footer sidebars |
| Widgets | **Appearance → Widgets** — 16 sidebars, e.g. `header_top_sidebar`, `blog_sidebar`, `footer_top_sidebar`, `footer_features_sidebar`, `footer_company_sidebar`, `footer_customer_sidebar`, `footer_bottom_sidebar`, `product_details_sidebar`, `products_listing_top_sidebar` / `_bottom_sidebar` (see `functions/functions.php`) |
| Translations | **Settings → Languages** + **Settings → Theme translations**; per-key strings under `lang/<locale>.json` |
| String overrides | Drop a `lang/<locale>.json` into the theme — overrides `__()` calls |

## Troubleshooting

| Symptom | Check |
|---|---|
| Theme Options panel empty | `php artisan cache:clear && php artisan optimize:clear` |
| Built CSS not updating | Re-run `npm run prod`. Confirm timestamps on `public/themes/amerce/css/theme.css`. |
| Homepage falls back to old layout | Hard-refresh; check `homepage_body_class` value matches your preset. |
| Mini-cart shows no progress bar | `mini_cart_freeship_threshold` may be 0. |
| Compare button missing on cards | `EcommerceHelper::isCompareEnabled()` must be true (admin → Settings → Ecommerce → Shopping → compare toggle, `compare_enabled`). |
| Quick View modal won't open | Ensure `enable_quick_view` is on and the `#product-quick-view-modal` shell is present (it is — in the layout). |
