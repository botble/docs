# Theme Hooks and Events

Botble CMS provides a powerful event system that allows you to customize your theme's behavior at various points in the rendering process. This documentation covers the available hooks and events in the theme system.

## Introduction to Theme Events

Theme events are triggered at specific points during the theme rendering process, allowing you to modify the behavior or add functionality. These events are defined in your theme's `config.php` file.

## Core Theme Events

### before

Triggered before the theme is set up. This is useful for setting up global variables or configurations.

```php
'before' => function (Theme $theme): void {
    // Set up global variables or configurations
    $theme->set('globalVariable', 'value');
},
```

### beforeRenderTheme

Triggered before rendering the theme. This is the ideal place to add assets, set up breadcrumbs, or prepare data for the theme.

```php
'beforeRenderTheme' => function (Theme $theme): void {
    // Add theme assets
    $theme->asset()->usePath()->add('main-css', 'css/main.css');
    $theme->asset()->container('footer')->usePath()->add('main-js', 'js/main.js');

    // Set up breadcrumbs
    $theme->breadcrumb()->add('Home', route('public.index'));

    // Set global variables
    $theme->set('categories', get_categories());
},
```

### beforeRenderLayout

Triggered before rendering a specific layout. This allows you to add layout-specific assets or configurations.

```php
'beforeRenderLayout' => [
    'default' => function (Theme $theme): void {
        // Add assets specific to the default layout
        $theme->asset()->usePath()->add('default-layout-css', 'css/layouts/default.css');
    },
    'blog' => function (Theme $theme): void {
        // Add assets specific to the blog layout
        $theme->asset()->usePath()->add('blog-layout-css', 'css/layouts/blog.css');
    },
],
```

### after

Triggered after the theme has been set up but before it's rendered. This is useful for final adjustments.

```php
'after' => function (Theme $theme): void {
    // Make final adjustments before rendering
},
```

## Custom Events

You can also create and trigger custom events in your theme. This is useful for creating modular, event-driven themes.

### Creating a Custom Event

```php
// In your theme's functions/functions.php
app()->booted(function (): void {
    add_action('theme_custom_event', function ($param) {
        // Handle the custom event
        echo "Custom event triggered with: " . $param;
    });
});
```

### Triggering a Custom Event

```php
// Trigger the custom event
do_action('theme_custom_event', 'parameter');
```

## Laravel Event Classes

Botble CMS dispatches Laravel event classes at key points in the theme lifecycle. You can listen to these in your theme's `functions/functions.php` or in a plugin's service provider.

### RenderingThemeOptionSettings

Fired when the theme options settings page is rendered in admin. This is where you register theme option fields.

```php
use Botble\Theme\Events\RenderingThemeOptionSettings;

app('events')->listen(RenderingThemeOptionSettings::class, function (): void {
    theme_option()
        ->setField([
            'id' => 'my_option',
            'section_id' => 'opt-text-subsection-general',
            'type' => 'text',
            'label' => __('My Option'),
            'attributes' => [
                'name' => 'my_option',
                'value' => null,
            ],
        ]);
});
```

### RenderingTheme

Fired during global asset rendering (via `fireEventGlobalAssets()`). Use this to add assets that should be loaded on every page.

```php
use Botble\Theme\Events\RenderingTheme;

app('events')->listen(RenderingTheme::class, function (): void {
    Theme::asset()->usePath()->add('custom-css', 'css/custom.css');
});
```

### RenderingHomePageEvent

Fired when the homepage is being rendered. Use this to load homepage-specific data or assets.

```php
use Botble\Theme\Events\RenderingHomePageEvent;

app('events')->listen(RenderingHomePageEvent::class, function (): void {
    // Load homepage-specific data
});
```

### RenderingSingleEvent

Fired when a single content page is rendered (post, page, etc.). The event carries the `Slug` model.

```php
use Botble\Theme\Events\RenderingSingleEvent;

app('events')->listen(RenderingSingleEvent::class, function (RenderingSingleEvent $event): void {
    $slug = $event->slug;
    // Customize rendering for this specific content
});
```

### RenderingSiteMapEvent

Fired when generating the sitemap. Optionally carries a key to identify the sitemap section.

```php
use Botble\Theme\Events\RenderingSiteMapEvent;

app('events')->listen(RenderingSiteMapEvent::class, function (RenderingSiteMapEvent $event): void {
    $key = $event->key; // null for main sitemap, or a specific section key
    // Add custom URLs to sitemap
});
```

### RenderingAdminBar

Fired when the frontend admin bar is being rendered. Use this to add custom links.

```php
use Botble\Theme\Events\RenderingAdminBar;

app('events')->listen(RenderingAdminBar::class, function (): void {
    admin_bar()
        ->registerLink('Custom Link', route('my.route'), 'add-new', 'my.permission');
});
```

### ThemeRoutingBeforeEvent / ThemeRoutingAfterEvent

Fired before and after theme routes are registered. The event carries the `Router` instance.

```php
use Botble\Theme\Events\ThemeRoutingBeforeEvent;
use Botble\Theme\Events\ThemeRoutingAfterEvent;

app('events')->listen(ThemeRoutingBeforeEvent::class, function (ThemeRoutingBeforeEvent $event): void {
    $router = $event->router;
    // Modify routing before theme routes load
});

app('events')->listen(ThemeRoutingAfterEvent::class, function (ThemeRoutingAfterEvent $event): void {
    $router = $event->router;
    // Add routes after theme routes are loaded
});
```

### ThemeRemoveEvent

Fired when a theme is removed via the `cms:theme:remove` command. Carries the theme name.

```php
use Botble\Theme\Events\ThemeRemoveEvent;

app('events')->listen(ThemeRemoveEvent::class, function (ThemeRemoveEvent $event): void {
    $themeName = $event->theme;
    // Clean up theme-specific data
});
```

### Event Lifecycle Order

The following shows the order events fire during a typical page request:

```
1. ThemeRoutingBeforeEvent    → Before routes are registered
2. ThemeRoutingAfterEvent     → After routes are registered
3. before (config.php)        → Theme setup begins
4. beforeRenderTheme          → Before theme renders (add assets here)
5. RenderingTheme             → Global asset event
6. beforeRenderLayout         → Before specific layout renders
7. RenderingHomePageEvent     → (Homepage only)
8. RenderingSingleEvent       → (Single content pages only)
9. after (config.php)         → Final adjustments
10. RenderingAdminBar         → Admin bar renders (logged-in admins)
```

## Theme Filters

Filters allow you to modify data at specific points in the theme rendering process.

### THEME_FRONT_HEADER

This filter allows you to append HTML to the theme `<head>` (output by `Theme::header()`):

```php
add_filter(THEME_FRONT_HEADER, function (?string $html): string {
    return $html . '<meta name="custom-meta" content="value">';
}, 120);
```

### THEME_FRONT_FOOTER

This filter allows you to append HTML before `</body>` (output by `Theme::footer()`):

```php
add_filter(THEME_FRONT_FOOTER, function (?string $html): string {
    return $html . '<script>console.log("Custom footer script");</script>';
}, 120);
```

### THEME_FRONT_BODY

This filter allows you to inject HTML right after the opening `<body>` tag:

```php
add_filter(THEME_FRONT_BODY, function (?string $html): string {
    return $html . '<div id="top-banner"></div>';
}, 120);
```

### BASE_FILTER_GROUP_PUBLIC_ROUTE

This filter allows you to modify the public route group attributes:

```php
add_filter(BASE_FILTER_GROUP_PUBLIC_ROUTE, function ($attributes) {
    // Add middleware to all public routes
    $attributes['middleware'][] = 'custom.middleware';
    return $attributes;
}, 120);
```

## Practical Examples

### Adding Google Analytics

```php
// In your theme's config.php
'beforeRenderTheme' => function (Theme $theme): void {
    // Add Google Analytics script to the footer
    $googleAnalyticsId = theme_option('google_analytics_id');

    if ($googleAnalyticsId) {
        $theme->asset()->container('footer')->writeScript('google-analytics', '
            <!-- Google Analytics -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=' . $googleAnalyticsId . '"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag("js", new Date());
                gtag("config", "' . $googleAnalyticsId . '");
            </script>
            <!-- End Google Analytics -->
        ');
    }
},
```

### Adding Custom CSS for Specific Pages

```php
// In your theme's functions/functions.php
app()->booted(function (): void {
    add_filter(THEME_FRONT_HEADER, function (?string $html): ?string {
        // Check if current page is the contact page
        if (request()->segment(1) == 'contact') {
            $html .= '<style>
                .contact-form { background-color: #f5f5f5; padding: 20px; border-radius: 5px; }
                .contact-form input, .contact-form textarea { width: 100%; margin-bottom: 10px; }
            </style>';
        }

        return $html;
    }, 120);
});
```

### Checking Current Page Type

Here are different ways to check the current page type in Botble CMS:

```php
// Check the content type of a slug-based page (post, category, page...)
app('events')->listen(\Botble\Theme\Events\RenderingSingleEvent::class, function ($event): void {
    if ($event->slug->reference_type === \Botble\Blog\Models\Post::class) {
        // This is a blog post page
    }

    if ($event->slug->reference_type === \Botble\Blog\Models\Category::class) {
        // This is a category page
    }
});

// Check if current page is the homepage
if (Route::currentRouteName() == 'public.index' || BaseHelper::isHomepage()) {
    // This is the homepage
}

// Check by URL segment
if (request()->segment(1) == 'products') {
    // URL contains /products
}
```

### Modifying the Breadcrumb

There is no breadcrumb filter. Render the crumbs with your own view instead (see [Breadcrumb](theme-breadcrumb.md)):

```blade
{{-- Uses packages/theme::partials.breadcrumb by default --}}
{!! Theme::breadcrumb()->render(Theme::getThemeNamespace('partials.breadcrumbs')) !!}
```

## Best Practices

1. **Keep event handlers focused**: Each event handler should have a single responsibility.
2. **Use appropriate events**: Choose the right event for your needs to ensure your code runs at the correct time.
3. **Consider performance**: Heavy operations in event handlers can slow down your site. Use caching when appropriate.
4. **Organize your code**: Keep related event handlers together in your theme's files.
5. **Document your events**: If you create custom events, document them for future reference.
