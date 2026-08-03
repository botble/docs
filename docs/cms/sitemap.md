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

Go to **Admin → Settings → Sitemap**.

| Setting | Default | Purpose |
| --- | --- | --- |
| Enable sitemap | On | Master switch. When off, `/sitemap.xml` returns 404 and all child sitemaps are disabled. |
| Sitemap items per page | `1000` | Maximum URLs per sitemap file. Range 10–100,000. Google's hard limit is 50,000 URLs / 50 MB per file. |
| Enable llms.txt | On | Serves a dynamic `/llms.txt` following the [llmstxt.org](https://llmstxt.org) specification, so AI assistants can discover your content. Only used when a static `public/llms.txt` file does not already exist. |
| Pages listed in llms.txt | `100` | Maximum pages listed. Range 1–1000. When there are more, llms.txt links to the XML sitemap for full coverage instead of silently cutting the list short. |
| Blog posts listed in llms.txt | `50` | Same, for blog posts. |
| Enable llms-full.txt | Off | Serves `/llms-full.txt` with the **full text** of your pages and posts rather than just links. Only published content is included, but it does republish complete article bodies — leave this off unless you want that. Returns 404 while disabled. |
| AI crawler policy | Allow all crawlers | Which AI crawlers may access the site. See [AI crawlers](#ai-crawlers) below. |

### llms.txt and llms-full.txt

`/llms.txt` is an index: your site name, a one-line description, then linked lists of pages and posts. It is cached for
one hour.

`/llms-full.txt` is the full-text variant and is **off by default**. When enabled it streams content with a 5 MB
output budget; if that budget is reached, the file ends with a note pointing at the sitemap. It never answers with an
empty body — while disabled or when there is nothing published, it returns 404.

::: tip Adding your own content types
Plugins can add their own sections to both files through the `FILTER_LLMS_TXT_SECTIONS` filter:

```php
add_filter(FILTER_LLMS_TXT_SECTIONS, function (array $sections): array {
    $sections[] = [
        'model' => \Botble\Ecommerce\Models\Product::class,
        'heading' => 'Products',
        'limit' => 100,
    ];

    return $sections;
});
```

The model needs a `wherePublished()` scope, a `name`, a `description` and a slugable `url`. Limits are capped at 1000.
:::

### AI crawlers

**AI crawler policy** writes crawler rules into `public/robots.txt` when you save the settings page. The three options
separate two very different groups of bots:

| Policy | Effect |
| --- | --- |
| Allow all crawlers | No crawler is disallowed. |
| Block training crawlers | Disallows crawlers that collect content to train models — GPTBot, ClaudeBot, CCBot, Amazonbot, Bytespider, Google-Extended, Applebot-Extended and others. AI search and citations keep working. |
| Block all AI crawlers | The above, plus retrieval crawlers that fetch a page to answer a question and normally link back — OAI-SearchBot, ChatGPT-User, Claude-User, PerplexityBot, DuckAssistBot and others. |

Blocking the retrieval group also gives up AI citations and the referral traffic that comes with them, so prefer
**Block training crawlers** if you only want to stay out of training data.

#### How the rules are written

Saving the settings page updates `public/robots.txt` in place, inside a managed block:

```
User-agent: *
Disallow:
Disallow: /my-private-area/

# BEGIN Botble AI crawler policy
# Generated from Admin -> Settings -> Sitemap -> AI crawler policy.
# Edits between these markers are overwritten; add your own rules outside them.
User-agent: GPTBot
Disallow: /
...
# END Botble AI crawler policy
```

Only the block between the markers is managed. Anything you write outside it — by hand or through
**Admin → Theme → Robots.txt** — is preserved on every save, and switching back to *Allow all crawlers* removes the
block and leaves the rest of your file exactly as it was.

::: warning
- Edits **between** the markers are overwritten the next time settings are saved. Put your own rules outside them.
- If `public/robots.txt` is not writable, the policy cannot be applied. The settings page warns you, and saving
  reports the failure instead of silently doing nothing.
- If you delete `public/robots.txt` entirely, Botble serves a generated `robots.txt` from the policy instead.
- `robots.txt` is advisory: crawlers choose whether to honour it. Enforcement needs a rule at your web server, CDN, or
  firewall (for example a Cloudflare WAF rule).
:::

### Content types

The **Sitemap content types** section lets you exclude a content type from the sitemap entirely. When a type is turned
off, its `{key}.xml` returns 404 and the entry is dropped from the sitemap index.

Core ships the **Pages** toggle. Active plugins contribute their own:

| Toggle | Contributed by |
| --- | --- |
| Pages | Core (`sitemap` package) |
| Blog posts | Blog plugin |
| Blog categories | Blog plugin |
| Blog tags | Blog plugin |

Other plugins (Ecommerce, Real Estate, and so on) register their content types the same way when active.

### IndexNow

Turn on **IndexNow** and supply an API key (a UUID) to have new and updated URLs submitted automatically to Bing,
Yandex, and other IndexNow participants. The inline info panel on the settings page explains where to host the key
verification file.

### Sitemap caching

Sitemap cache settings live on a different page: **Admin → Settings → Cache**.

| Setting | Default | Purpose |
| --- | --- | --- |
| Cache sitemap | On | Cache the generated sitemap output. |
| Sitemap cache time | `60` | Cache duration in minutes. |

## What Appears in the Sitemap

- Only **published** items. Drafts and pending items are excluded.
- The sitemap index splits into per-type child files (`pages.xml`, `blog-posts.xml`, plugin types), and each child is
  itself paginated once it approaches the per-file limit. If your site has thousands of items and `sitemap.xml` looks
  short, inspect the child files it references — not just the index.
- Sitemap output is cached. After publishing new content, clear caches at
  **Platform Administration → Cache Management** before checking.

::: warning `noindex` items are still listed
Items whose SEO meta box is set to **No index** are currently **not** filtered out of the sitemap. SEO audit tools flag
this as "Noindex page in sitemap". Until this is addressed in core, unpublish or delete the item if it must not appear.
:::

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
