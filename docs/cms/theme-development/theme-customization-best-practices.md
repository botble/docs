# Theme Customization Best Practices

This guide provides best practices for customizing themes in Botble CMS, helping you create maintainable, performant, and user-friendly themes.

## General Principles

### 1. Use Child Themes for Minor Customizations

If you only need to make minor changes to an existing theme, consider creating a child theme instead of modifying the parent theme directly. This allows you to receive updates to the parent theme without losing your customizations.

### 2. Create a New Theme for Major Customizations

If you need to make significant changes, it's better to create a new theme:

```bash
php artisan cms:theme:create your-theme-name
```

### 3. Follow the Theme Structure

Maintain the standard theme structure to ensure compatibility with Botble CMS:

```
platform/themes/<your-theme>/
├── assets/                 # Theme assets (CSS, JS, images)
├── functions/              # Theme functions
├── layouts/                # Theme layouts
├── partials/               # Theme partials
├── routes/                 # Theme routes
├── src/                    # Theme PHP classes
├── views/                  # Theme views
├── composer.json           # Composer configuration
├── config.php              # Theme configuration
└── theme.json              # Theme metadata
```

### 4. Use Version Control

Always use version control (like Git) when customizing themes to track changes and collaborate with others.

## Code Organization

### 1. Separate Concerns

Follow the MVC pattern to separate concerns:
- Models: Data structure and business logic
- Views: Presentation logic
- Controllers: Request handling and coordination

### 2. Use Partials for Reusable Components

Extract reusable components into partials:

```blade
{!! Theme::partial('components.button', ['text' => 'Submit', 'type' => 'primary']) !!}
```

### 3. Use Layouts for Page Structure

Create different layouts for different page types:

```php
// Register layouts in functions/functions.php
register_page_template([
    'default' => __('Default'),
    'full-width' => __('Full Width'),
    'sidebar-left' => __('Left Sidebar'),
    'sidebar-right' => __('Right Sidebar'),
]);
```

### 4. Organize CSS and JavaScript

Organize your CSS and JavaScript files logically:

```
assets/
├── css/
│   ├── base/              # Base styles (reset, typography, etc.)
│   ├── components/        # Component styles (buttons, forms, etc.)
│   ├── layouts/           # Layout styles
│   └── pages/             # Page-specific styles
└── js/
    ├── components/        # Component scripts
    ├── utils/             # Utility functions
    └── pages/             # Page-specific scripts
```

## Performance Optimization

### 1. Optimize Assets

Minimize and combine CSS and JavaScript files:

```php
// In config.php
'beforeRenderTheme' => function (Theme $theme): void {
    // Use minified versions in production
    if (app()->environment('production')) {
        $theme->asset()->usePath()->add('app-css', 'css/app.min.css');
        $theme->asset()->container('footer')->usePath()->add('app-js', 'js/app.min.js');
    } else {
        $theme->asset()->usePath()->add('app-css', 'css/app.css');
        $theme->asset()->container('footer')->usePath()->add('app-js', 'js/app.js');
    }
},
```

### 2. Lazy Load Images

Use lazy loading for images to improve page load times:

```blade
<img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" 
     data-src="{{ RvMedia::getImageUrl($image) }}" 
     class="lazy" 
     alt="{{ $alt }}">
```

### 3. Use Caching

Cache expensive operations:

```php
// Cache menu for 1 hour
$menu = cache()->remember('main-menu', 60 * 60, function () {
    return Menu::renderMenuLocation('main-menu');
});
```

### 4. Optimize Database Queries

Minimize database queries by using eager loading:

```php
// Bad: N+1 query problem
$posts = Post::query()->get();
foreach ($posts as $post) {
    echo $post->category->name; // This causes a separate query for each post
}

// Good: Eager loading
$posts = Post::query()->with('category')->get();
foreach ($posts as $post) {
    echo $post->category->name; // No additional queries
}
```

## Responsive Design

### 1. Mobile-First Approach

Design for mobile devices first, then enhance for larger screens:

```css
/* Base styles for mobile */
.container {
    padding: 15px;
}

/* Tablet styles */
@media (min-width: 768px) {
    .container {
        padding: 30px;
    }
}

/* Desktop styles */
@media (min-width: 1024px) {
    .container {
        padding: 50px;
        max-width: 1200px;
        margin: 0 auto;
    }
}
```

### 2. Use Flexible Layouts

Use flexible layouts that adapt to different screen sizes:

```css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}
```

### 3. Test on Multiple Devices

Regularly test your theme on different devices and browsers to ensure compatibility.

## Accessibility

### 1. Use Semantic HTML

Use semantic HTML elements to improve accessibility:

```html
<!-- Bad -->
<div class="header">...</div>
<div class="nav">...</div>
<div class="main">...</div>
<div class="footer">...</div>

<!-- Good -->
<header>...</header>
<nav>...</nav>
<main>...</main>
<footer>...</footer>
```

### 2. Add ARIA Attributes

Use ARIA attributes to enhance accessibility:

```html
<button aria-label="Close" aria-expanded="false" class="close-button">
    <span class="icon-close"></span>
</button>
```

### 3. Ensure Sufficient Color Contrast

Ensure text has sufficient contrast against its background:

```css
/* Good contrast */
.button {
    background-color: #2c3e50;
    color: #ffffff;
}

/* Poor contrast - avoid */
.button-low-contrast {
    background-color: #7f8c8d;
    color: #95a5a6;
}
```

## SEO Optimization

### 1. Use Proper Heading Structure

Maintain a proper heading hierarchy (H1, H2, H3, etc.):

```blade
<h1>{{ $page->name }}</h1>

<div class="content">
    <h2>Section Title</h2>
    <p>Content...</p>
    
    <h3>Subsection Title</h3>
    <p>More content...</p>
</div>
```

### 2. Optimize Images

Add descriptive alt text to images:

```blade
<img src="{{ RvMedia::getImageUrl($post->image) }}" 
     alt="{{ $post->name }}" 
     width="800" 
     height="600">
```

### 3. Use Schema Markup

Implement schema markup for better search engine understanding:

```blade
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{{ $post->name }}",
    "image": "{{ RvMedia::getImageUrl($post->image, null, false, RvMedia::getDefaultImage()) }}",
    "datePublished": "{{ $post->created_at->toIso8601String() }}",
    "dateModified": "{{ $post->updated_at->toIso8601String() }}",
    "author": {
        "@type": "Person",
        "name": "{{ $post->author->name }}"
    }
}
</script>
```

## Internationalization

### 1. Use Translation Functions

Make your theme translatable by using translation functions:

```blade
<h1>{{ __('Welcome to our website') }}</h1>
<p>{{ __('This is a sample text that can be translated.') }}</p>
```

### 2. Support RTL Languages

Add support for right-to-left (RTL) languages:

```css
/* LTR styles */
.sidebar {
    float: left;
    margin-right: 20px;
}

/* RTL styles */
html[dir="rtl"] .sidebar {
    float: right;
    margin-right: 0;
    margin-left: 20px;
}
```

## Security

### 1. Sanitize User Input

Always sanitize user input to prevent XSS attacks:

```blade
<div class="comment-content">
    {!! BaseHelper::clean($comment->content) !!}
</div>
```

### 2. Use CSRF Protection

Use CSRF protection for forms:

```blade
<form method="POST" action="{{ route('contact.send') }}">
    @csrf
    <!-- Form fields -->
</form>
```

### 3. Validate Data

Validate data on both client and server sides:

```php
// In your controller
$request->validate([
    'name' => 'required|string|max:255',
    'email' => 'required|email|max:255',
    'message' => 'required|string',
]);
```

## Documentation

### 1. Document Your Theme

Create documentation for your theme, including:
- Installation instructions
- Configuration options
- Customization guidelines
- Changelog

### 2. Comment Your Code

Add comments to explain complex code:

```php
/**
 * Get related posts based on category and tags.
 *
 * @param \Botble\Blog\Models\Post $post
 * @param int $limit
 * @return \Illuminate\Database\Eloquent\Collection
 */
function get_related_posts($post, $limit = 5)
{
    // Implementation...
}
```

## Testing

### 1. Test Across Browsers

Test your theme on different browsers (Chrome, Firefox, Safari, Edge) to ensure compatibility.

### 2. Test Responsiveness

Test your theme at different screen sizes to ensure it's responsive.

### 3. Test Performance

Use tools like Google PageSpeed Insights to test and optimize performance.

## Conclusion

Following these best practices will help you create high-quality, maintainable themes for Botble CMS. Remember that a good theme not only looks good but also performs well, is accessible to all users, and is easy to maintain and extend.
