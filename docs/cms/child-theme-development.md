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

### Step 1: Copy Parent Theme

The simplest way to create a child theme is to copy the parent theme folder:

```bash
# Copy the parent theme to a new folder
cp -r platform/themes/shofy platform/themes/shofy-custom
```

### Step 2: Update theme.json

Edit `platform/themes/shofy-custom/theme.json`:

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

Edit `platform/themes/shofy-custom/config.php`:

```php
<?php

use Botble\Theme\Theme;

return [
    'inherit' => 'shofy',  // Parent theme folder name

    'events' => [
        'beforeRenderTheme' => function (Theme $theme): void {
            // Add your custom assets
            $theme->asset()->usePath()->add('custom-theme', 'css/theme.css');
        },
    ],
];
```

### Step 4: Clean Up (Optional but Recommended)

For a minimal child theme, you can remove most files and keep only:

```
platform/themes/shofy-custom/
├── assets/               # Your custom assets (if any)
├── config.php            # Required - with 'inherit' setting
├── partials/             # Only partials you want to override
├── views/                # Only views you want to override
├── public/               # Compiled public assets
├── screenshot.png        # Theme screenshot for admin
└── theme.json            # Required - theme metadata
```

### Step 5: Activate the Theme

1. Go to **Admin → Appearance → Themes**
2. Find your child theme
3. Click **Activate**

Or use the command line:

```bash
php artisan cms:theme:activate shofy-custom
```

## Theme Inheritance Mechanism

When a theme has `'inherit' => 'parent-theme'` in its config, Botble CMS:

1. First looks for views/partials in the child theme
2. Falls back to the parent theme if not found
3. Applies parent theme's events before child theme's events

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
│   └── css/
│       └── theme.css           # Custom styles
├── partials/
│   ├── footer.blade.php        # Overridden footer
│   └── section-title.blade.php # Overridden section title
├── public/
│   └── css/
│       └── theme.css           # Compiled CSS
├── config.php                  # Theme configuration
├── screenshot.png              # 1200x900px recommended
├── theme.json                  # Theme metadata
└── webpack.mix.js              # Asset compilation (optional)
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
            $theme->asset()->usePath()->add('shofy-theme', 'css/theme.css');

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

If your child theme has custom SCSS/JS:

**webpack.mix.js:**

```js
const mix = require('laravel-mix');
const path = require('path');

const directory = path.basename(path.resolve(__dirname));
const source = `platform/themes/${directory}`;
const dist = `public/themes/${directory}`;

mix
    .sass(`${source}/assets/sass/theme.scss`, `${dist}/css`)
    .js(`${source}/assets/js/theme.js`, `${dist}/js`);
```

Build:

```bash
# From project root
npm run prod
```

## Current Limitations

::: warning
The theme package currently supports view file inheritance only. These are **not** inherited:
- PHP class files (functions, helpers)
- Language files
- Widget configurations
- Some asset paths
:::

For complex customizations beyond view overrides, consider:
- Registering custom functions in your child theme's `functions/functions.php`
- Using hooks and filters to modify behavior
- Creating custom plugins for major functionality

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

After updating the parent theme:

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
