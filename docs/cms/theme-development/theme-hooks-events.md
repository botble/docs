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

## Using Event Listeners

You can also use Laravel's event system to listen for theme events:

```php
// In your theme's functions/functions.php
use Botble\Theme\Events\RenderingTheme;
use Illuminate\Support\Facades\Event;

app()->booted(function (): void {
    Event::listen(RenderingTheme::class, function (RenderingTheme $event) {
        // Access the theme instance
        $theme = $event->theme;

        // Add assets or modify the theme
        $theme->asset()->usePath()->add('custom-css', 'css/custom.css');
    });
});
```

## Theme Filters

Filters allow you to modify data at specific points in the theme rendering process.

### BASE_FILTER_THEME_HEADER

This filter allows you to modify the theme header content:

```php
add_filter(BASE_FILTER_THEME_HEADER, function ($header) {
    // Modify the header content
    return $header . '<meta name="custom-meta" content="value">';
}, 120);
```

### BASE_FILTER_THEME_FOOTER

This filter allows you to modify the theme footer content:

```php
add_filter(BASE_FILTER_THEME_FOOTER, function ($footer) {
    // Modify the footer content
    return $footer . '<script>console.log("Custom footer script");</script>';
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
    add_action('theme_header', function () {
        // Check if current page is the contact page
        if (Route::currentRouteName() == 'public.contact' || request()->segment(1) == 'contact') {
            echo '<style>
                .contact-form { background-color: #f5f5f5; padding: 20px; border-radius: 5px; }
                .contact-form input, .contact-form textarea { width: 100%; margin-bottom: 10px; }
            </style>';
        }
    });
});
```

### Checking Current Page Type

Here are different ways to check the current page type in Botble CMS:

```php
// Check if current page is a blog post
if (in_array(Route::currentRouteName(), ['public.single', 'public.post']) && $post = get_object_instance()) {
    // This is a blog post page
}

// Check if current page is a category page
if (Route::currentRouteName() == 'public.category' && $category = get_object_instance()) {
    // This is a category page
}

// Check if current page is the homepage
if (Route::currentRouteName() == 'public.index') {
    // This is the homepage
}

// Check by URL segment
if (request()->segment(1) == 'products') {
    // URL contains /products
}
```

### Modifying the Breadcrumb

```php
// In your theme's functions/functions.php
app()->booted(function (): void {
    add_filter('theme_breadcrumb_template', function ($template) {
        // Return a custom breadcrumb template
        return '<nav aria-label="breadcrumb">
            <ol class="breadcrumb custom-breadcrumb">
                {!! $crumbs !!}
            </ol>
        </nav>';
    });
});
```

## Best Practices

1. **Keep event handlers focused**: Each event handler should have a single responsibility.
2. **Use appropriate events**: Choose the right event for your needs to ensure your code runs at the correct time.
3. **Consider performance**: Heavy operations in event handlers can slow down your site. Use caching when appropriate.
4. **Organize your code**: Keep related event handlers together in your theme's files.
5. **Document your events**: If you create custom events, document them for future reference.
