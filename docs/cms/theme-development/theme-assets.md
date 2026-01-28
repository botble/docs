# Theme Assets

Theme assets in Botble CMS allow you to manage and organize CSS, JavaScript, images, and other resources for your theme. This documentation covers how to add, manage, and render assets in your theme.

## Adding Assets

### Basic Asset Management

You can add assets to your theme using the `asset()` method. Assets can be added to different containers (default or footer) and can have dependencies on other assets.

```php
// Add a CSS file from the public directory
// Path: public/css/style.css
Theme::asset()->add('core-style', 'css/style.css');

// Add a JavaScript file to the footer container
// Path: public/js/script.js
Theme::asset()->container('footer')->add('core-script', 'js/script.js');

// Add a CSS file from the current theme's assets directory with a dependency
// Path: public/themes/[current theme]/assets/css/custom.css
Theme::asset()->usePath()->add('custom', 'css/custom.css', ['core-style']);

// Add a JavaScript file from the current theme's assets directory with a dependency
// Path: public/themes/[current theme]/assets/js/custom.js
Theme::asset()->container('footer')->usePath()->add('custom', 'js/custom.js', ['core-script']);
```

### Adding Assets with Version

You can add a version parameter to your assets to help with cache busting:

```php
$version = get_cms_version();

Theme::asset()->usePath()->add('style', 'css/style.css', [], [], $version);
```

### Adding Assets with Attributes

You can specify HTML attributes for your assets:

```php
// Add defer attribute to a script
Theme::asset()->container('footer')->add('app-js', 'js/app.js', [], ['defer' => true]);

// Add media attribute to a stylesheet
Theme::asset()->add('mobile-css', 'css/mobile.css', [], ['media' => 'screen and (max-width: 768px)']);
```

### Using Theme Path

The `usePath()` method tells the asset manager to look in the current theme's assets directory:

```php
// Look in public/themes/[current theme]/assets/css/
Theme::asset()->usePath()->add('theme-style', 'css/style.css');
```

You can also specify a different theme to look in:

```php
// Look in public/themes/default/assets/css/
Theme::asset()->usePath('default')->add('default-style', 'css/style.css');
```

### Shorthand Methods

There are shorthand methods for adding assets:

```php
// Add a stylesheet
Theme::asset()->style('custom', 'css/custom.css');

// Add a script
Theme::asset()->script('custom', 'js/custom.js');

// Add a stylesheet using theme path
Theme::asset()->styleUsingPath('custom', 'css/custom.css');

// Add a script using theme path
Theme::asset()->scriptUsingPath('custom', 'js/custom.js');
```

## Inline Assets

### Adding Inline Styles and Scripts

You can add inline styles and scripts to your theme:

```php
// Add inline script
Theme::asset()->writeScript('inline-script', '
    $(function() {
        console.log("Hello World");
    });
');

// Add inline style
Theme::asset()->writeStyle('inline-style', '
    h1 {
        font-size: 2rem;
        color: #333;
    }
');

// Add raw content (without tag wrapper)
Theme::asset()->writeContent('custom-content', '
    <script>
        console.log("Custom content");
    </script>
');
```

## Rendering Assets

### Rendering Styles and Scripts

To render your assets in your layout, use the following methods:

```php
// In your layout file (e.g., platform/themes/your-theme/layouts/default.blade.php)
<!DOCTYPE html>
<html>
<head>
    {!! Theme::asset()->styles() !!}
    {!! Theme::asset()->scripts() !!}
</head>
<body>
    <!-- Your content here -->

    <!-- Footer scripts -->
    {!! Theme::asset()->container('footer')->scripts() !!}
</body>
</html>
```

### Getting Asset URLs

To get the URL to a theme asset:

```php
<img src="{{ Theme::asset()->url('images/logo.png') }}" alt="Logo">
```

## Managing Assets

### Removing Assets

You can remove previously added assets:

```php
// Remove a stylesheet
Theme::asset()->remove('core-style');

// Remove a script from the footer container
Theme::asset()->container('footer')->remove('core-script');
```

Example in a theme's functions file:

```php
// In platform/themes/your-theme/functions/functions.php
app()->booted(function () {
    // Remove language assets added by the language plugin
    Theme::asset()->remove('language-css');
    Theme::asset()->container('footer')->remove('language-public-js');
});
```

### Asset Groups

You can prepare groups of assets that can be loaded conditionally:

```php
// Define a group of assets
Theme::asset()->cook('slider', function($asset) {
    $asset->add('owl-carousel-css', 'libraries/owl-carousel/owl.carousel.css');
    $asset->add('owl-carousel-js', 'libraries/owl-carousel/owl.carousel.js', ['jquery']);
    $asset->add('slider-js', 'js/slider.js', ['owl-carousel-js']);
});

// Later, load the group when needed
Theme::asset()->serve('slider');
```

### Global Asset Configuration

You can configure assets globally in your theme's config file:

```php
// In platform/themes/your-theme/config.php
return [
    'events' => [
        // This event fires before rendering the theme
        'beforeRenderTheme' => function (Theme $theme) {
            // Add theme assets
            $theme->asset()->usePath()->add('bootstrap-css', 'plugins/bootstrap/css/bootstrap.min.css');
            $theme->asset()->container('footer')->usePath()->add('jquery', 'plugins/jquery/jquery.min.js');
            $theme->asset()->container('footer')->usePath()->add('bootstrap-js', 'plugins/bootstrap/js/bootstrap.min.js', ['jquery']);

            // Prepare asset groups
            $theme->asset()->cook('datatables', function($asset) {
                $asset->add('datatables-css', 'plugins/datatables/datatables.min.css');
                $asset->add('datatables-js', 'plugins/datatables/datatables.min.js', ['jquery']);
            });
        },
    ],
];
```

## Publishing Theme Assets

After creating or updating assets in `platform/themes/your-theme/public/`, you need to publish them to make them accessible via the web.

### Using Artisan Command

```bash
# Publish assets for all themes
php artisan cms:theme:assets:publish

# Publish assets for a specific theme
php artisan cms:theme:assets:publish theme-name
```

This command copies files from `platform/themes/{name}/public/` to `public/themes/{name}/`.

### Automatic Publishing

Theme assets are automatically published when:

1. Activating a theme
2. Saving theme options
3. Running `php artisan cms:publish:assets`

### Building Assets (Optional)

If your theme uses a build process (SCSS, TypeScript, etc.), run:

```bash
# Navigate to theme directory
cd platform/themes/your-theme

# Build assets (compiles assets/ → public/)
npm run prod
# or for development with watch mode
npm run watch
```

Then publish the compiled assets:

```bash
php artisan cms:theme:assets:publish your-theme
```

## Asset Structure

::: tip IMPORTANT
Only files in the `public/` subfolder of your theme get published to `public/themes/`. The `assets/` folder (if used) is for source files like SCSS that need compilation.
:::

The recommended structure for theme assets is:

```
platform/themes/your-theme/
├── assets/                    # Source files (optional) - NOT published
│   ├── sass/                  # SCSS source files
│   │   └── style.scss
│   └── js/                    # JS source files before compilation
│       └── app.js
├── public/                    # PUBLISHED ASSETS - gets copied to public/themes/
│   ├── css/
│   │   └── style.css          # Compiled CSS
│   ├── js/
│   │   └── app.js             # Final JS
│   ├── images/
│   │   └── logo.png
│   ├── fonts/
│   │   └── font.woff
│   └── plugins/               # Third-party libraries
│       └── bootstrap/
├── webpack.mix.js             # Compiles assets/ → public/
└── ...
```

### How Assets Get Published

When you activate a theme or run `php artisan cms:theme:assets:publish`, the CMS:

1. Copies **all contents** from `platform/themes/your-theme/public/` to `public/themes/your-theme/`
2. Also copies `screenshot.png` to `public/themes/your-theme/`

The published assets will be available at:

```
public/themes/your-theme/
├── css/
├── js/
├── images/
├── fonts/
├── plugins/
└── screenshot.png
```

::: warning
Never edit files directly in `public/themes/`. Your changes will be overwritten when assets are republished. Always edit in `platform/themes/your-theme/public/`.
:::
