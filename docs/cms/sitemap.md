# Sitemap

## Introduction

Botble CMS provides a powerful sitemap generation system that automatically creates XML sitemaps for your website. The sitemap functionality is implemented through two packages:

1. **Sitemap Package** (`platform/packages/sitemap`): Provides the core sitemap generation functionality.
2. **Theme Package** (`platform/packages/theme`): Includes the `SiteMapManager` class that makes it easy to add URLs to your sitemap.

Sitemaps help search engines like Google discover and index your content more efficiently, which can improve your site's visibility in search results.

## Basic Usage

### Accessing Your Sitemap

By default, your sitemap is available at:

```
http://your-domain.com/sitemap.xml
```

This is the main sitemap index that links to other sitemaps for different sections of your website.

### Adding URLs to the Sitemap

The most common way to add URLs to your sitemap is by listening for the `RenderingSiteMapEvent` event. You can add this code to your theme's `functions.php` file or in your plugin's service provider:

```php
use Botble\Theme\Events\RenderingSiteMapEvent;
use Botble\Theme\Facades\SiteMapManager;

\Event::listen(RenderingSiteMapEvent::class, function (RenderingSiteMapEvent $event) {
    // Add a single URL
    SiteMapManager::add('https://your-domain.com/custom-page', now(), '0.8', 'monthly');

    // Add multiple URLs from a collection
    $items = YourModel::query()
        ->wherePublished()
        ->with('slugable')
        ->get();

    foreach ($items as $item) {
        SiteMapManager::add($item->url, $item->updated_at, '0.8', 'weekly');
    }
});
```

#### Parameters for `SiteMapManager::add()`

```php
SiteMapManager::add(string $url, ?string $date = null, string $priority = '1.0', string $sequence = 'daily')
```

- **$url**: The full URL to add to the sitemap
- **$date**: The last modified date (can be a string or DateTime object)
- **$priority**: The priority of this URL relative to other URLs (0.0 to 1.0)
- **$sequence**: How frequently the page is likely to change (always, hourly, daily, weekly, monthly, yearly, never)

## Advanced Usage

### Creating Sitemap Sections

Botble CMS organizes sitemaps into sections. Each section is a separate sitemap file that contains related URLs. For example, you might have separate sitemaps for blog posts, pages, products, etc.

To create a new sitemap section, you need to:

1. Register the sitemap key
2. Create a listener for the `RenderingSiteMapEvent` event

```php
// In your plugin's service provider
use Botble\Theme\Events\ThemeRoutingBeforeEvent;
use Botble\Theme\Facades\SiteMapManager;

$this->app['events']->listen(ThemeRoutingBeforeEvent::class, function () {
    // Register sitemap keys
    SiteMapManager::registerKey([
        'your-custom-section',
        // Add more sections if needed
    ]);
});
```

Then create a listener for the `RenderingSiteMapEvent` event:

```php
use Botble\Theme\Events\RenderingSiteMapEvent;
use Botble\Theme\Facades\SiteMapManager;

class RenderingSiteMapListener
{
    public function handle(RenderingSiteMapEvent $event): void
    {
        // Get the last updated item for the sitemap index
        $lastUpdated = YourModel::query()
            ->wherePublished()
            ->latest('updated_at')
            ->value('updated_at');

        // If this is the main sitemap index, add your section
        if (! $event->key) {
            SiteMapManager::addSitemap(SiteMapManager::route('your-custom-section'), $lastUpdated);
            return;
        }

        // If this is your custom section, add the URLs
        if ($event->key === 'your-custom-section') {
            $items = YourModel::query()
                ->wherePublished()
                ->with('slugable')
                ->get();

            foreach ($items as $item) {
                SiteMapManager::add($item->url, $item->updated_at, '0.8', 'weekly');
            }
        }
    }
}
```

Register your listener in your plugin's event service provider:

```php
protected $listen = [
    RenderingSiteMapEvent::class => [
        RenderingSiteMapListener::class,
    ],
];
```

### Handling Large Sitemaps with Pagination

For large websites with many URLs, you can use pagination to split your sitemap into multiple files. Botble CMS provides built-in support for paginated sitemaps:

```php
use Botble\Theme\Facades\SiteMapManager;

// Create paginated sitemaps for a section with many items
$totalItems = YourModel::query()->wherePublished()->count();
SiteMapManager::createPaginatedSitemaps('your-section', $totalItems, now());
```

This will automatically create multiple sitemap files if needed, based on the `sitemap_items_per_page` setting.

### Monthly Archives for Blog Posts

For blog posts or other time-based content, you can organize your sitemaps by month:

```php
use Botble\Theme\Facades\SiteMapManager;

// Register monthly archives for blog posts
SiteMapManager::registerMonthlyArchives('blog-posts', 2, 5);
```

This will create sitemap sections for each month, going back 2 years, with up to 5 pages per month.

## Sitemap Settings

Botble CMS provides several settings for configuring your sitemaps:

- **Enable Sitemap**: Enable or disable the sitemap feature
- **Sitemap Items Per Page**: Maximum number of URLs per sitemap file
- **Enable Sitemap Cache**: Enable or disable caching of sitemaps
- **Sitemap Cache Duration**: How long to cache sitemaps (in minutes)

You can access these settings in the admin panel under Settings > General > Sitemap.

## Clearing the Sitemap Cache

Sitemap caches are automatically cleared when content is created, updated, or deleted. If you need to manually clear the cache, you can use the following code:

```php
use Botble\Theme\Facades\SiteMapManager;

SiteMapManager::clearCache();
```

## Real-World Examples

### Adding Pages to Sitemap

```php
use Botble\Page\Models\Page;
use Botble\Theme\Events\RenderingSiteMapEvent;
use Botble\Theme\Facades\SiteMapManager;

class RenderingSiteMapListener
{
    public function handle(RenderingSiteMapEvent $event): void
    {
        if ($event->key == 'pages') {
            $pages = Page::query()
                ->wherePublished()
                ->orderByDesc('created_at')
                ->with('slugable')
                ->get();

            foreach ($pages as $page) {
                SiteMapManager::add($page->url, $page->updated_at, '0.8');
            }
        }
    }
}
```

### Adding Blog Categories and Posts

```php
use Botble\Blog\Models\Category;
use Botble\Blog\Models\Post;
use Botble\Theme\Events\RenderingSiteMapEvent;
use Botble\Theme\Facades\SiteMapManager;

class RenderingSiteMapListener
{
    public function handle(RenderingSiteMapEvent $event): void
    {
        if ($key = $event->key) {
            switch ($key) {
                case 'blog-categories':
                    $categories = Category::query()
                        ->with('slugable')
                        ->wherePublished()
                        ->get();

                    foreach ($categories as $category) {
                        SiteMapManager::add($category->url, $category->updated_at, '0.8');
                    }
                    break;

                case 'blog-posts':
                    $posts = Post::query()
                        ->with('slugable')
                        ->wherePublished()
                        ->get();

                    foreach ($posts as $post) {
                        SiteMapManager::add($post->url, $post->updated_at, '0.8', 'daily');
                    }
                    break;
            }
        } else {
            // This is the main sitemap index
            SiteMapManager::addSitemap(SiteMapManager::route('blog-categories'), now());
            SiteMapManager::addSitemap(SiteMapManager::route('blog-posts'), now());
        }
    }
}
```
