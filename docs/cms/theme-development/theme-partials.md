# Theme Partials

Theme partials are reusable components that can be included in multiple views and layouts. They help you maintain a DRY (Don't Repeat Yourself) codebase by extracting common elements into separate files.

## Introduction to Partials

Partials in Botble CMS are Blade templates that represent a specific part of your theme, such as headers, footers, sidebars, or any other reusable component. They are stored in the `partials` directory of your theme.

## Creating Partials

Partials are stored in the `platform/themes/<your-theme>/partials` directory. You can create as many partials as needed to modularize your theme.

### Basic Partial Structure

A basic partial is simply a Blade template file. For example, a header partial (`platform/themes/<your-theme>/partials/header.blade.php`) might look like this:

```blade
<header class="site-header">
    <div class="container">
        <div class="logo">
            <a href="{{ route('public.index') }}">
                <img src="{{ RvMedia::getImageUrl(theme_option('logo')) }}" alt="{{ theme_option('site_title') }}">
            </a>
        </div>
        
        <nav class="main-navigation">
            {!! Menu::renderMenuLocation('main-menu', [
                'view' => 'main-menu',
                'options' => ['class' => 'menu'],
            ]) !!}
        </nav>
    </div>
</header>
```

### Organizing Partials

You can organize partials into subdirectories for better organization:

```
platform/themes/<your-theme>/partials/
├── header.blade.php
├── footer.blade.php
├── sidebar.blade.php
├── components/
│   ├── alert.blade.php
│   ├── button.blade.php
│   └── card.blade.php
├── home/
│   ├── featured-posts.blade.php
│   ├── hero-banner.blade.php
│   └── testimonials.blade.php
└── blog/
    ├── post-card.blade.php
    ├── post-meta.blade.php
    └── related-posts.blade.php
```

## Using Partials

### Basic Usage

To include a partial in a view or layout, use the `Theme::partial()` method:

```blade
{!! Theme::partial('header') !!}
```

### Including Partials from Subdirectories

To include a partial from a subdirectory, specify the path relative to the `partials` directory:

```blade
{!! Theme::partial('components.alert') !!}
```

### Passing Data to Partials

You can pass data to partials as an array of variables:

```blade
{!! Theme::partial('blog.post-card', ['post' => $post]) !!}
```

Then, in your partial (`platform/themes/<your-theme>/partials/blog/post-card.blade.php`), you can access the variables:

```blade
<div class="post-card">
    <div class="post-thumbnail">
        <img src="{{ RvMedia::getImageUrl($post->image, 'medium') }}" alt="{{ $post->name }}">
    </div>
    <div class="post-content">
        <h3 class="post-title">
            <a href="{{ $post->url }}">{{ $post->name }}</a>
        </h3>
        <div class="post-meta">
            <span class="post-date">{{ $post->created_at->format('M d, Y') }}</span>
        </div>
        <div class="post-excerpt">
            {{ Str::limit($post->description, 150) }}
        </div>
    </div>
</div>
```

## Partial Composers

Partial composers allow you to attach data to a partial whenever it's rendered. This is useful for partials that need the same data every time they're included.

### Defining a Partial Composer

You can define partial composers in your theme's `functions/functions.php` file:

```php
Theme::composer(['header'], function ($view) {
    $categories = get_categories(['status' => \Botble\Base\Enums\BaseStatusEnum::PUBLISHED]);
    $view->with('categories', $categories);
});
```

Now, every time the `header` partial is rendered, it will have access to the `$categories` variable.

### Multiple Partials

You can attach the same data to multiple partials:

```php
Theme::composer(['header', 'footer', 'sidebar'], function ($view) {
    $socialLinks = theme_option('social_links');
    $view->with('socialLinks', $socialLinks);
});
```

### Wildcard Composers

You can use wildcards to attach data to all partials in a subdirectory:

```php
Theme::composer('blog.*', function ($view) {
    $popularPosts = get_popular_posts(5);
    $view->with('popularPosts', $popularPosts);
});
```

## Dynamic Partials

You can create dynamic partials that change based on conditions:

```blade
@php
    $headerStyle = theme_option('header_style', 'default');
    echo Theme::partial('headers.' . $headerStyle);
@endphp
```

This allows you to have multiple header styles (`partials/headers/default.blade.php`, `partials/headers/transparent.blade.php`, etc.) and switch between them using theme options.

## Nested Partials

Partials can include other partials, allowing for a modular structure:

```blade
<!-- In partials/header.blade.php -->
<header class="site-header">
    <div class="container">
        {!! Theme::partial('header.logo') !!}
        {!! Theme::partial('header.navigation') !!}
        {!! Theme::partial('header.search') !!}
    </div>
</header>
```

## Conditional Partials

You can conditionally include partials based on certain conditions:

```blade
@if (is_plugin_active('blog'))
    {!! Theme::partial('blog.recent-posts') !!}
@endif

@if (theme_option('show_featured_posts', 'yes') == 'yes')
    {!! Theme::partial('home.featured-posts') !!}
@endif
```

## Overriding Plugin Partials

Some plugins provide their own partials that you can override in your theme. To override a plugin partial, create a file with the same name in your theme's `partials` directory.

For example, to override the blog post partial from the Blog plugin, create a file at:

```
platform/themes/<your-theme>/partials/blog/post.blade.php
```

## Best Practices

1. **Keep partials focused**: Each partial should represent a single component or section.
2. **Use meaningful names**: Name your partials according to their purpose for better organization.
3. **Pass only necessary data**: Only pass the data that the partial needs to render.
4. **Use subdirectories**: Organize related partials into subdirectories.
5. **Document your partials**: Add comments to explain complex partials or required variables.
6. **Consider performance**: Avoid heavy database queries in frequently used partials.
7. **Use caching**: For partials that don't change often, consider caching their output.
