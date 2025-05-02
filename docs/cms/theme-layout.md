# Theme Layouts

Layouts are the foundation of your theme's structure, defining how content is organized and displayed on your website. Botble CMS provides a flexible layout system that allows you to create multiple layouts for different types of pages.

## Understanding Layouts

Layouts in Botble CMS are Blade templates that define the overall structure of your pages. They typically include:

- Header and footer sections
- Content areas
- Sidebars
- Navigation elements
- Common scripts and styles

The default layout is located at `/platform/themes/<theme-name>/layouts/default.blade.php`.

## Layout Structure

A basic layout file includes:

```blade
<!DOCTYPE html>
<html>
<head>
    {!! Theme::header() !!}
</head>
<body>
    {!! Theme::partial('header') !!}

    {!! Theme::content() !!}

    {!! Theme::partial('footer') !!}

    {!! Theme::footer() !!}
</body>
</html>
```

Key components:

- `Theme::header()`: Renders meta tags, CSS, and JavaScript in the head section
- `Theme::content()`: Displays the main content of the page
- `Theme::partial('header')`: Includes the header partial
- `Theme::partial('footer')`: Includes the footer partial
- `Theme::footer()`: Renders JavaScript at the end of the body

## Creating Custom Layouts

### Step 1: Create a Layout File

Create a new layout file in `/platform/themes/<theme-name>/layouts/` directory. For example, `no-sidebar.blade.php`:

```blade
{!! Theme::partial('header') !!}

<div class="container">
    <div class="row">
        <div class="col-12">
            {!! Theme::content() !!}
        </div>
    </div>
</div>

{!! Theme::partial('footer') !!}
```

### Step 2: Register the Layout for Pages (Optional)

To make your layout available as a template option for pages, register it in `/platform/themes/<theme-name>/functions/functions.php`:

```php
register_page_template([
    'no-sidebar' => __('No sidebar'),
]);
```

This will add the layout as a template option in the page editor.

## Using Layouts

### In Pages

After registering a layout as a page template, you can select it when creating or editing a page in the admin panel:

1. Go to **Admin Panel → Pages**
2. Create a new page or edit an existing one
3. In the page editor, select your custom template from the **Template** dropdown
4. Save the page

### In Views

You can specify which layout to use directly in a view file:

```blade
@php Theme::layout('no-sidebar'); @endphp

<h1>Page Content</h1>
<p>This page uses the no-sidebar layout.</p>
```

### In Controllers

You can set the layout in a controller method:

```php
public function getExample()
{
    return Theme::layout('no-sidebar')
        ->scope('example', ['data' => 123])
        ->render();
}
```

## Sharing Data with Layouts

### Using Theme::set() and Theme::get()

You can pass data from views to layouts using the `Theme::set()` and `Theme::get()` methods:

```blade
{{-- In your view file (e.g., platform/themes/<theme-name>/views/page.blade.php) --}}
@php
    Theme::set('page', $page);
    Theme::set('title', $page->title);
@endphp
```

Then access this data in your layout:

```blade
{{-- In your layout file (e.g., platform/themes/<theme-name>/layouts/default.blade.php) --}}
@php
    $page = Theme::get('page');
    $title = Theme::get('title');
@endphp

<h1>{{ $title }}</h1>
```

### Using View Composers

For more complex data sharing, you can use view composers in your theme's `functions/functions.php` file:

```php
Theme::composer(['index', 'page'], function($view) {
    $view->with('categories', get_categories());
});
```

This makes the `$categories` variable available in both the `index` and `page` views.

## Layout Events

Botble CMS provides events that fire before rendering a layout, allowing you to add assets or perform other actions:

```php
// In platform/themes/<theme-name>/config.php
return [
    'events' => [
        // Event fires before rendering a specific layout
        'beforeRenderLayout' => [
            'default' => function($theme) {
                $theme->asset()->usePath()->add('layout-css', 'css/layouts/default.css');
            },
            'no-sidebar' => function($theme) {
                $theme->asset()->usePath()->add('layout-css', 'css/layouts/no-sidebar.css');
            },
        ],
    ],
];
```

## Layout Best Practices

1. **Keep layouts DRY**: Extract common elements into partials
2. **Create purpose-specific layouts**: Design layouts for specific content types (blog, landing page, etc.)
3. **Use semantic HTML**: Structure your layouts with proper HTML5 elements
4. **Make layouts responsive**: Ensure your layouts work well on all device sizes
5. **Optimize for performance**: Load critical CSS inline and defer non-essential scripts
