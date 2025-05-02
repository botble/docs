# Theme Performance Optimization

Performance is a critical aspect of user experience and SEO. This guide covers techniques to optimize your Botble CMS theme for maximum performance.

## Why Performance Matters

- **User Experience**: Faster sites provide a better user experience
- **SEO Ranking**: Page speed is a ranking factor for search engines
- **Conversion Rates**: Faster sites typically have higher conversion rates
- **Bounce Rates**: Slow sites have higher bounce rates

## Asset Optimization

### Minify and Combine CSS and JavaScript

Minifying and combining CSS and JavaScript files reduces file size and HTTP requests.

#### Using Asset Containers

```php
// In your theme's config.php
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

#### Using Laravel Mix

You can use Laravel Mix to compile, minify, and version your assets:

```javascript
// webpack.mix.js
const mix = require('laravel-mix');

mix.js('platform/themes/your-theme/assets/js/app.js', 'public/themes/your-theme/js')
   .sass('platform/themes/your-theme/assets/sass/app.scss', 'public/themes/your-theme/css')
   .version();
```

Then in your theme:

```blade
<link rel="stylesheet" href="{{ mix('themes/your-theme/css/app.css') }}">
<script src="{{ mix('themes/your-theme/js/app.js') }}"></script>
```

### Optimize Loading Order

Load critical CSS inline and defer non-critical CSS and JavaScript:

```blade
<head>
    <!-- Critical CSS inline -->
    <style>
        /* Critical CSS here */
        body { font-family: sans-serif; margin: 0; padding: 0; }
        .header { background: #fff; padding: 20px; }
        /* ... */
    </style>
    
    <!-- Defer non-critical CSS -->
    <link rel="preload" href="{{ Theme::asset()->url('css/app.css') }}" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="{{ Theme::asset()->url('css/app.css') }}"></noscript>
    
    <!-- Defer JavaScript -->
    <script defer src="{{ Theme::asset()->url('js/app.js') }}"></script>
</head>
```

### Use Modern Image Formats

Use modern image formats like WebP with fallbacks for older browsers:

```blade
<picture>
    <source srcset="{{ RvMedia::getImageUrl($image, null, false, RvMedia::getDefaultImage()) }}.webp" type="image/webp">
    <img src="{{ RvMedia::getImageUrl($image, null, false, RvMedia::getDefaultImage()) }}" alt="{{ $alt }}">
</picture>
```

### Implement Lazy Loading

Lazy load images and videos that are not immediately visible:

```blade
<img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" 
     data-src="{{ RvMedia::getImageUrl($image) }}" 
     class="lazy" 
     alt="{{ $alt }}">
```

Add JavaScript to handle lazy loading:

```javascript
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for browsers without IntersectionObserver support
    }
});
```

## Database Optimization

### Eager Loading

Use eager loading to prevent N+1 query problems:

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

### Pagination

Use pagination for large datasets:

```php
// In your controller
$posts = Post::query()->paginate(10);

// In your view
@foreach ($posts as $post)
    <!-- Display post -->
@endforeach

{!! $posts->links() !!}
```

### Caching

Cache expensive database queries:

```php
// Cache for 1 hour
$categories = cache()->remember('categories', 60 * 60, function () {
    return Category::query()->where('status', 'published')->get();
});
```

## Server-Side Optimization

### Enable Compression

Enable GZIP compression in your web server configuration:

For Apache (.htaccess):
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/x-javascript application/json
</IfModule>
```

For Nginx:
```nginx
gzip on;
gzip_comp_level 5;
gzip_min_length 256;
gzip_proxied any;
gzip_vary on;
gzip_types
    application/javascript
    application/json
    application/x-javascript
    application/xml
    application/xml+rss
    text/css
    text/javascript
    text/plain
    text/xml;
```

### Browser Caching

Implement browser caching for static assets:

For Apache (.htaccess):
```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType text/x-javascript "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/x-javascript "access plus 1 month"
    ExpiresByType application/x-shockwave-flash "access plus 1 month"
    ExpiresByType image/x-icon "access plus 1 year"
    ExpiresDefault "access plus 2 days"
</IfModule>
```

For Nginx:
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|webp)$ {
    expires 1y;
    add_header Cache-Control "public, no-transform";
}
```

### Use a Content Delivery Network (CDN)

Configure your theme to use a CDN for static assets:

```php
// In your .env file
ASSET_URL=https://your-cdn.com

// In your theme
<img src="{{ asset('themes/your-theme/images/logo.png') }}" alt="Logo">
```

Botble CMS supports various CDN providers like Amazon S3, Wasabi, and BunnyCDN. You can configure these in the admin panel under Settings > Media.

## Front-End Optimization

### Critical CSS

Extract and inline critical CSS for above-the-fold content:

```blade
<head>
    <style>
        /* Critical CSS here */
        body { font-family: sans-serif; margin: 0; padding: 0; }
        .header { background: #fff; padding: 20px; }
        /* ... */
    </style>
    
    <link rel="preload" href="{{ Theme::asset()->url('css/app.css') }}" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="{{ Theme::asset()->url('css/app.css') }}"></noscript>
</head>
```

### Optimize JavaScript

Defer non-critical JavaScript:

```blade
<script defer src="{{ Theme::asset()->url('js/app.js') }}"></script>
```

Use async for scripts that don't depend on other scripts:

```blade
<script async src="{{ Theme::asset()->url('js/analytics.js') }}"></script>
```

### Reduce DOM Size

Keep your DOM size small by avoiding unnecessary elements:

```blade
<!-- Bad: Unnecessary divs -->
<div class="wrapper">
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="content">
                    <p>Content</p>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Good: Simplified structure -->
<div class="container">
    <div class="row">
        <div class="content col">
            <p>Content</p>
        </div>
    </div>
</div>
```

### Use CSS Efficiently

Avoid inefficient CSS selectors:

```css
/* Bad: Deep nesting and inefficient selectors */
body .container .row .col .card .card-body .card-title span { color: red; }

/* Good: Simplified selectors */
.card-title { color: red; }
```

## Caching Strategies

### Page Cache

Use page caching for static or semi-static pages:

```php
// In your controller
public function index()
{
    return cache()->remember('home-page', 60 * 60, function () {
        return Theme::scope('index')->render();
    });
}
```

### Fragment Cache

Cache specific parts of your views:

```blade
@php
    $cacheKey = 'featured-posts-' . md5(json_encode(request()->all()));
    $cacheDuration = 60 * 60; // 1 hour
@endphp

@if (cache()->has($cacheKey))
    {!! cache()->get($cacheKey) !!}
@else
    @php
        $html = view('theme.your-theme::partials.featured-posts', ['posts' => $featuredPosts])->render();
        cache()->put($cacheKey, $html, $cacheDuration);
    @endphp
    {!! $html !!}
@endif
```

### API Response Cache

Cache API responses:

```php
// In your API controller
public function getPosts()
{
    return cache()->remember('api-posts', 60 * 15, function () {
        return Post::query()->with('category')->get();
    });
}
```

## Monitoring Performance

### Use Browser DevTools

Use browser developer tools to identify performance bottlenecks:
- Network tab to analyze loading times
- Performance tab to analyze rendering performance
- Lighthouse for overall performance audit

### Google PageSpeed Insights

Regularly test your site with Google PageSpeed Insights to get performance recommendations.

### Web Vitals

Monitor Core Web Vitals metrics:
- Largest Contentful Paint (LCP): measures loading performance
- First Input Delay (FID): measures interactivity
- Cumulative Layout Shift (CLS): measures visual stability

## Performance Checklist

Use this checklist to ensure your theme is optimized for performance:

- [ ] Minify and combine CSS and JavaScript files
- [ ] Optimize images (compression, proper formats, dimensions)
- [ ] Implement lazy loading for images and videos
- [ ] Use proper caching strategies
- [ ] Enable GZIP compression
- [ ] Implement browser caching
- [ ] Use a CDN for static assets
- [ ] Optimize database queries with eager loading
- [ ] Implement pagination for large datasets
- [ ] Reduce DOM size
- [ ] Use efficient CSS selectors
- [ ] Defer non-critical JavaScript
- [ ] Inline critical CSS
- [ ] Monitor performance regularly

## Conclusion

Optimizing your Botble CMS theme for performance is an ongoing process. By implementing these techniques, you can significantly improve your site's loading speed, user experience, and search engine rankings. Remember to regularly test and monitor your site's performance to identify and address any new issues that arise.
