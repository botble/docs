# Theme SEO Optimization

Search Engine Optimization (SEO) is crucial for improving your website's visibility in search engine results. Botble CMS provides several tools and techniques to optimize your theme for better SEO performance.

## Basic SEO Setup

### SEO Helper

Botble CMS includes a powerful SEO Helper that simplifies the process of adding meta tags, Open Graph data, and other SEO elements to your pages.

#### Setting Page Title

```php
SeoHelper::setTitle('Page Title');
```

#### Setting Page Description

```php
SeoHelper::setDescription('Page description goes here. Keep it under 160 characters for optimal display in search results.');
```

#### Setting Canonical URL

```php
SeoHelper::setCanonicalUrl(url()->current());
```

#### Setting Open Graph Data

```php
SeoHelper::openGraph()->setTitle('Open Graph Title');
SeoHelper::openGraph()->setDescription('Open Graph description for social sharing.');
SeoHelper::openGraph()->setUrl(url()->current());
SeoHelper::openGraph()->setImage(RvMedia::getImageUrl($post->image));
SeoHelper::openGraph()->setType('article');
```

#### Setting Twitter Card Data

```php
SeoHelper::twitter()->setTitle('Twitter Card Title');
SeoHelper::twitter()->setDescription('Twitter Card description.');
SeoHelper::twitter()->setImage(RvMedia::getImageUrl($post->image));
```

### Implementing SEO in Theme Views

In your theme's views, you should include the SEO meta tags in the head section:

```blade
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    {!! SeoHelper::render() !!}
    
    <!-- Other head elements -->
</head>
<body>
    <!-- Page content -->
</body>
</html>
```

## Advanced SEO Techniques

### Structured Data (Schema.org)

Structured data helps search engines understand the content of your pages better. Botble CMS supports adding structured data through the SEO Helper or directly in your theme.

#### Article Schema

For blog posts or articles:

```blade
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{{ $post->name }}",
    "image": [
        "{{ RvMedia::getImageUrl($post->image, null, false, RvMedia::getDefaultImage()) }}"
    ],
    "datePublished": "{{ $post->created_at->toIso8601String() }}",
    "dateModified": "{{ $post->updated_at->toIso8601String() }}",
    "author": {
        "@type": "Person",
        "name": "{{ $post->author->name }}"
    },
    "publisher": {
        "@type": "Organization",
        "name": "{{ theme_option('site_title') }}",
        "logo": {
            "@type": "ImageObject",
            "url": "{{ RvMedia::getImageUrl(theme_option('logo')) }}"
        }
    },
    "description": "{{ $post->description }}"
}
</script>
```

#### Breadcrumb Schema

For breadcrumb navigation:

```blade
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        @foreach (Theme::breadcrumb()->getCrumbs() as $i => $crumb)
        {
            "@type": "ListItem",
            "position": {{ $i + 1 }},
            "name": "{{ $crumb['label'] }}",
            "item": "{{ $crumb['url'] }}"
        }@if ($i < count(Theme::breadcrumb()->getCrumbs()) - 1),@endif
        @endforeach
    ]
}
</script>
```

#### Local Business Schema

For business websites:

```blade
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "{{ theme_option('site_title') }}",
    "image": "{{ RvMedia::getImageUrl(theme_option('logo')) }}",
    "url": "{{ url('/') }}",
    "telephone": "{{ theme_option('phone') }}",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "{{ theme_option('address') }}",
        "addressLocality": "{{ theme_option('city') }}",
        "postalCode": "{{ theme_option('zip_code') }}",
        "addressCountry": "{{ theme_option('country') }}"
    },
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
        ],
        "opens": "09:00",
        "closes": "17:00"
    }
}
</script>
```

### XML Sitemaps

Botble CMS automatically generates XML sitemaps for your content. You can customize the sitemap generation in your theme.

#### Enabling Sitemaps

Sitemaps are enabled by default. You can check the setting in the admin panel under Settings > General.

#### Customizing Sitemaps

You can customize which content types are included in the sitemap by modifying the `SiteMapManager` in a service provider:

```php
use Botble\Sitemap\Sitemap;
use Botble\Sitemap\SitemapManager;

app()->booted(function () {
    // Get the sitemap manager
    $sitemapManager = app(SitemapManager::class);
    
    // Add custom sitemap
    $sitemapManager->add(function (Sitemap $sitemap) {
        $sitemap->add(route('custom.route'), '2023-01-01', '0.8', 'daily');
    });
});
```

### Robots.txt

Botble CMS allows you to customize the robots.txt file through the admin panel under Appearance > Robots.txt.

You can also programmatically modify the robots.txt content:

```php
// In your theme's service provider
app()->booted(function () {
    add_filter(BASE_FILTER_ROBOTS_TXT, function ($content) {
        return $content . PHP_EOL . 'Disallow: /private-section/';
    });
});
```

## SEO Best Practices for Themes

### 1. Optimize Page Speed

Page speed is a crucial ranking factor. Optimize your theme for speed:

- Minimize and combine CSS and JavaScript files
- Optimize images
- Use lazy loading for images and videos
- Implement browser caching
- Use a content delivery network (CDN)

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

### 2. Use Responsive Design

Ensure your theme is fully responsive, as mobile-friendliness is a ranking factor:

```css
/* Use responsive design */
@media (max-width: 768px) {
    .container {
        width: 100%;
        padding: 0 15px;
    }
}
```

### 3. Implement Proper Heading Structure

Use a proper heading structure (H1, H2, H3, etc.) to help search engines understand your content hierarchy:

```blade
<h1>{{ $page->name }}</h1>

<article>
    <h2>Section Title</h2>
    <p>Content...</p>
    
    <h3>Subsection Title</h3>
    <p>More content...</p>
</article>
```

### 4. Optimize Images

Optimize images for SEO:

- Use descriptive file names
- Add alt text
- Specify dimensions
- Compress images for faster loading

```blade
<img src="{{ RvMedia::getImageUrl($post->image) }}" 
     alt="{{ $post->name }}" 
     width="800" 
     height="600">
```

### 5. Use Semantic HTML

Use semantic HTML elements to help search engines understand your content:

```html
<article>
    <header>
        <h1>Article Title</h1>
        <time datetime="2023-01-01">January 1, 2023</time>
    </header>
    
    <section>
        <h2>Section Title</h2>
        <p>Content...</p>
    </section>
    
    <footer>
        <p>Author: John Doe</p>
    </footer>
</article>
```

### 6. Implement Social Sharing

Make it easy for users to share your content on social media:

```blade
<div class="social-share">
    <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode(url()->current()) }}" target="_blank" rel="noopener">
        <i class="ti ti-brand-facebook"></i> Share on Facebook
    </a>
    
    <a href="https://twitter.com/intent/tweet?url={{ urlencode(url()->current()) }}&text={{ urlencode($post->name) }}" target="_blank" rel="noopener">
        <i class="ti ti-brand-twitter"></i> Share on Twitter
    </a>
    
    <a href="https://www.linkedin.com/sharing/share-offsite/?url={{ urlencode(url()->current()) }}" target="_blank" rel="noopener">
        <i class="ti ti-brand-linkedin"></i> Share on LinkedIn
    </a>
</div>
```

### 7. Add Breadcrumbs

Implement breadcrumbs for better navigation and SEO:

```blade
<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        @foreach (Theme::breadcrumb()->getCrumbs() as $i => $crumb)
            @if ($i != (count(Theme::breadcrumb()->getCrumbs()) - 1))
                <li class="breadcrumb-item">
                    <a href="{{ $crumb['url'] }}">{!! $crumb['label'] !!}</a>
                </li>
            @else
                <li class="breadcrumb-item active" aria-current="page">
                    {!! $crumb['label'] !!}
                </li>
            @endif
        @endforeach
    </ol>
</nav>
```

### 8. Implement Pagination

Use proper pagination for multi-page content:

```blade
{!! $posts->links('pagination::bootstrap-4') !!}
```

### 9. Use Canonical URLs

Implement canonical URLs to prevent duplicate content issues:

```blade
<link rel="canonical" href="{{ url()->current() }}">
```

### 10. Implement Hreflang Tags

For multilingual sites, implement hreflang tags:

```blade
@foreach (Language::getSupportedLocales() as $localeCode => $properties)
    <link rel="alternate" hreflang="{{ $localeCode }}" href="{{ url($localeCode) }}">
@endforeach
```

## Monitoring SEO Performance

### 1. Google Search Console

Integrate Google Search Console to monitor your site's performance in Google search results:

```blade
<!-- Add this to your theme's header -->
<meta name="google-site-verification" content="{{ theme_option('google_site_verification') }}" />
```

### 2. Google Analytics

Integrate Google Analytics to track user behavior:

```blade
<!-- Add this to your theme's header -->
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id={{ theme_option('google_analytics') }}"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '{{ theme_option('google_analytics') }}');
</script>
<!-- End Google Analytics -->
```

### 3. SEO Audit Tools

Regularly audit your site using tools like:
- Google PageSpeed Insights
- Lighthouse
- SEMrush
- Ahrefs

## Conclusion

Implementing these SEO techniques in your Botble CMS theme will help improve your website's visibility in search engine results. Remember that SEO is an ongoing process, and you should regularly monitor and optimize your site for the best results.
