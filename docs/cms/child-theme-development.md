# Child Theme Development

Child themes allow you to customize an existing theme without modifying its original files. This approach makes it easy to update the parent theme while preserving your customizations.

## Overview

A child theme inherits all functionality, assets, and views from its parent theme. You only need to include the files you want to modify or add.

**Benefits:**
- Safe updates: Parent theme can be updated without losing customizations
- Minimal code: Only override what you need to change
- Easy maintenance: Clear separation between original and custom code
- Multiple variations: Create different theme variants from one parent

## Creating a Child Theme

### Step 1: Create the Child Theme Folder

Create a new folder next to the parent theme. Start with only the files below and add more as you need them:

```
platform/themes/shofy-custom/
├── config.php            # Required - with 'inherit' setting
├── theme.json            # Required - theme metadata
├── public/               # Your own CSS/JS/images (e.g. public/css/custom.css)
├── partials/             # Only partials you want to override
├── views/                # Only views you want to override
└── screenshot.png        # Theme screenshot for admin (optional)
```

::: warning Do not copy the whole parent theme
The parent theme's `functions/`, `src/`, `routes/` and `widgets/` are already loaded for a child theme (see
[What a Child Theme Inherits](#what-a-child-theme-inherits)). If you copy those folders into the child theme, the same
code is loaded twice, which can register things twice or fail with a `Cannot redeclare function` error. Copy only
the individual files you want to change.
:::

### Step 2: Create theme.json

Create `platform/themes/shofy-custom/theme.json`:

```json
{
    "id": "botble/shofy-custom",
    "name": "Shofy Custom",
    "namespace": "Theme\\ShofyCustom\\",
    "author": "Your Name",
    "url": "https://yoursite.com",
    "version": "1.0.0",
    "description": "Custom child theme based on Shofy",
    "required_plugins": ["ecommerce"]
}
```

::: warning Important
- Change the `id` to a unique value
- Change the `name` to your theme name
- Update the `namespace` to match (use PascalCase, no hyphens)
:::

### Step 3: Configure Inheritance

Create `platform/themes/shofy-custom/config.php`:

```php
<?php

use Botble\Theme\Theme;

return [
    'inherit' => 'shofy',  // Parent theme folder name

    'events' => [
        'beforeRenderTheme' => function (Theme $theme): void {
            // Add your custom assets (files in platform/themes/shofy-custom/public/)
            $theme->asset()->usePath()->add('custom-theme', 'css/custom.css');
        },
    ],
];
```

The parent theme's events run first, so the parent's CSS and JS still load. Your `events` only need to add or change
what is different.

### Step 4: Activate the Theme

1. Go to **Admin → Appearance → Themes**
2. Find your child theme
3. Click **Activate**

Or use the command line:

```bash
php artisan cms:theme:activate shofy-custom
```

When you switch from the parent theme to the child theme, your current **Theme Options** and **widgets** are copied to
the child theme automatically.

::: tip Custom CSS is saved per theme
The CSS from **Admin → Appearance → Custom CSS** is stored in a file inside the active theme's public folder
(`public/themes/{theme}/css/style.integration.css`), so it is not carried over. Copy it before you switch themes and
paste it again after activating the child theme.
:::

## Theme Inheritance Mechanism

When a theme has `'inherit' => 'parent-theme'` in its config, Botble CMS:

1. First looks for views/partials in the child theme
2. Falls back to the parent theme if not found
3. Applies parent theme's events before child theme's events

See [What a Child Theme Inherits](#what-a-child-theme-inherits) for everything else that is loaded from the parent.

```php
// In Theme.php - simplified view lookup
$hints[] = platform_path($childThemePath);   // First priority
$hints[] = platform_path($parentThemePath);  // Fallback
```

## Overriding Views

### Override a Partial

To override a partial, create the same file path in your child theme:

**Parent:** `platform/themes/shofy/partials/header.blade.php`
**Child:** `platform/themes/shofy-custom/partials/header.blade.php`

```blade
{{-- platform/themes/shofy-custom/partials/header.blade.php --}}
<header class="custom-header">
    {{-- Your custom header content --}}
</header>
```

### Override a View

Similarly for views:

**Parent:** `platform/themes/shofy/views/page.blade.php`
**Child:** `platform/themes/shofy-custom/views/page.blade.php`

### Override Shortcode Templates

To customize shortcode appearance:

```
platform/themes/shofy-custom/partials/shortcodes/
├── ecommerce-categories/
│   ├── index.blade.php
│   └── grid.blade.php
└── ecommerce-product-groups/
    └── tabs.blade.php
```

## Customizing Assets

### Adding Custom CSS/JS

In `config.php`:

```php
'events' => [
    'beforeRenderTheme' => function (Theme $theme): void {
        // Add custom CSS
        $theme->asset()->usePath()->add('custom-styles', 'css/custom.css');

        // Add custom JS (in footer)
        $theme->asset()->container('footer')->usePath()->add(
            'custom-scripts',
            'js/custom.js',
            attributes: ['defer']
        );
    },
],
```

### Overriding Parent Assets

```php
'beforeRenderTheme' => function (Theme $theme): void {
    // Remove parent asset
    $theme->asset()->remove('parent-style');

    // Add your version
    $theme->asset()->usePath()->add('parent-style', 'css/my-version.css');
},
```

## Working with Theme Options

Child themes inherit all parent theme options. To customize default values:

```php
'beforeRenderTheme' => function (Theme $theme): void {
    $theme->partialComposer('header.*', function (View $view): void {
        // Override default theme option values
        $headerBackgroundColor = theme_option('header_background_color', '#ffffff');
        $headerTextColor = theme_option('header_text_color', '#000000');

        $view->with(compact('headerBackgroundColor', 'headerTextColor'));
    });
},
```

## Minimal Child Theme Example

Here's a complete minimal child theme structure:

```
platform/themes/shofy-beauty/
├── assets/
│   └── sass/
│       └── custom.scss         # Custom styles (source)
├── partials/
│   ├── footer.blade.php        # Overridden footer
│   └── section-title.blade.php # Overridden section title
├── public/
│   └── css/
│       └── custom.css          # Compiled CSS
├── config.php                  # Theme configuration
├── screenshot.png              # 1200x900px recommended
├── theme.json                  # Theme metadata
└── vite.build.mjs              # Asset compilation (optional)
```

**config.php:**

```php
<?php

use Botble\Theme\Theme;
use Illuminate\View\View;

return [
    'inherit' => 'shofy',

    'events' => [
        'beforeRenderTheme' => function (Theme $theme): void {
            $theme->asset()->usePath()->add('shofy-beauty', 'css/custom.css');

            $theme->partialComposer('header.*', function (View $view): void {
                $headerTopBackgroundColor = theme_option('header_top_background_color', '#fff');
                $headerTopTextColor = theme_option('header_top_text_color', '#010f1c');
                $headerMainBackgroundColor = theme_option('header_main_background_color', 'transparent');
                $headerMainTextColor = theme_option('header_main_text_color', '#010f1c');

                $view->with(compact(
                    'headerTopBackgroundColor',
                    'headerTopTextColor',
                    'headerMainBackgroundColor',
                    'headerMainTextColor'
                ));
            });
        },
    ],
];
```

**theme.json:**

```json
{
    "id": "botble/shofy-beauty",
    "name": "Shofy Beauty",
    "namespace": "Theme\\ShofyBeauty\\",
    "author": "Botble Technologies",
    "url": "https://botble.com",
    "version": "1.0.0",
    "description": "Beauty variant of Shofy theme",
    "required_plugins": ["ecommerce"]
}
```

## Including Parent Partials

You can include parent theme partials within your overridden views:

```blade
{{-- Call a different style from parent theme --}}
{!! Theme::partial('footer.style-2') !!}

{{-- Include parent theme's original partial --}}
@include(Theme::getThemeNamespace('partials.section-title-inner'))
```

## Building Assets

If your child theme has custom SCSS/JS, ship a **`vite.build.mjs`** inside the theme directory. The project-wide runner discovers it automatically.

**platform/themes/my-child-theme/vite.build.mjs:**

```js
export default {
    js:   [{ src: 'assets/js/custom.js',     out: 'custom.js' }],
    sass: [{ src: 'assets/sass/custom.scss', out: 'custom.css' }],
}
```

Build from the project root:

```bash
# Development (unminified)
npm run dev

# Production (minified + ships compiled assets inside the theme's public/ folder)
npm run production
```

For the full descriptor spec, SFC Vue support, RTL CSS variants, and migrating from the old Laravel Mix setup, see [Asset Compilation (Vite)](/cms/asset-compilation).

## What a Child Theme Inherits

A child theme loads all of the parent theme's code and adds its own on top. You only add the files you want to change.

| Part of the theme | How it works in a child theme |
|---|---|
| `views/`, `partials/`, `layouts/` | The child's file is used first. If it does not exist, the parent's file is used. Page templates from both themes are listed in the page editor. |
| `functions/*.php` | The parent's files load first, then the child's. Shortcodes, theme options and hooks registered by the parent keep working. |
| `src/` classes | The parent's namespace (from its `theme.json`) stays registered, and the child's namespace is added for the child's own `src/` folder. |
| `routes/web.php` | Routes from both themes are loaded. |
| `widgets/` | Widgets from both themes are registered. |
| `lang/*.json` | Translations from both themes are loaded. The child's strings override the parent's. |
| `config.php` events | The parent's events run first, then the child's. |
| `public/` assets | On publish, the parent's public files are copied into `public/themes/{child}/`, then the child's own files are added. If an asset is missing from the child folder, the parent's file is used. |
| Theme Options and widget content | Copied from the previously active theme when you activate the child theme. |
| Custom CSS (Appearance → Custom CSS) | Not copied. It is saved per theme, so paste it again after switching. |

::: warning Use unique names for your own asset files
When assets are published, a file in the child's `public/` folder does **not** replace a parent file with the same path.
If your child theme ships `css/theme.css` and the parent also has `css/theme.css`, the parent's version is the one
served. Name your files differently, for example `css/custom.css` and `js/custom.js`.
:::

For customizations beyond views and assets, you can:
- Register your own functions, shortcodes and hooks in your child theme's `functions/` folder
- Use hooks and filters to modify behavior
- Create a custom plugin for major functionality

## Troubleshooting

### Theme Not Appearing

1. Verify `theme.json` syntax is valid JSON
2. Check file permissions (755 for folders, 644 for files)
3. Clear cache: `php artisan cache:clear`

### Views Not Overriding

1. Ensure file path matches exactly (case-sensitive)
2. Clear view cache: `php artisan view:clear`
3. Verify `'inherit'` is set correctly in `config.php`

### Assets Not Loading

1. Run `php artisan cms:theme:assets:publish`
2. Check asset paths in browser developer tools
3. Verify `public_theme_name` config if using custom public folder

### Parent Theme Updates

Updating the parent theme does not touch the child theme folder. The System Updater republishes the assets of every
theme, so your child theme's public folder receives the parent's new CSS and JS automatically. After updating the parent
theme:

1. Check for breaking changes in views you've overridden
2. Compare your overridden files with new parent versions
3. Test thoroughly before deploying

## Best Practices

1. **Override minimally** - Only copy files you need to change
2. **Document changes** - Comment why each file is overridden
3. **Version control** - Track child theme separately from parent
4. **Test updates** - Always test parent theme updates in staging
5. **Use hooks** - Prefer hooks over view overrides when possible
6. **Keep screenshot** - Update screenshot to reflect child theme appearance

## Video Tutorial

For a visual walkthrough, watch the official tutorial:
- [Creating Child Themes in Botble CMS](https://www.youtube.com/watch?v=2v9U337CtVU)
