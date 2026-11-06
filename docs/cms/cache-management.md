# Cache Management

The CMS caches a lot of data (database queries, compiled views, menu trees, widgets, etc.) to keep the site fast. Over time the framework cache folder (`storage/framework/cache`) can grow large and start to slow things down instead of speeding them up. The **Cache Management** panel lets you inspect and clear each cache on demand, and configure an automatic cleanup.

## Open the panel

Go to **Admin → Platform Administration → Cache Management**.

You will see:

- The **current size** of the framework cache folder
- A row for each cache type (CMS cache, compiled views, config cache, route cache, logs)
- A **Performance Optimization** card to pre-cache config/routes/views

If the cache exceeds the warning threshold, a yellow banner appears at the top of the page recommending that you clear it.

## Configure cache behavior

Go to **Admin → Settings → Cache**.

::: tip Two different pages
**Settings → Cache** *configures* caching. **Platform Administration → Cache Management** *clears* it. Neither page
sets the cache driver — that is `CACHE_STORE` in `.env`.
:::

### What gets cached

| Setting | Default | Purpose |
|---------|---------|---------|
| Cache admin menu | `Off` | Cache the rendered admin sidebar. Enable if the admin panel feels slow. |
| Cache front menu | `On` | Cache the frontend navigation tree. Leave on — rebuilding a large menu on every request is expensive. |
| Cache user avatar | `On` | Cache resolved avatar URLs. |
| Cache shortcodes (UI blocks) | `Off` | Cache rendered shortcode output. Big win on page-builder pages. |
| Cache duration (seconds) | `1800` | TTL in seconds for shortcode output (shown when shortcode caching is on). |
| Cache widgets | `Off` | Cache rendered widget output for sidebars and footers. |
| Cache duration (seconds) | `1800` | TTL in seconds for widget output (shown when widget caching is on). |
| Cache installed plugins | `On` | Cache the activated-plugin list. Leave on. |
| Cache sitemap | `On` | Cache generated sitemap XML. Shown only when the sitemap is enabled. |
| Sitemap cache timeout (in minutes) | `60` | Sitemap cache duration in minutes. |
| Public cache headers (CDN / reverse proxy) | `Off` | Send public `Cache-Control` headers so a CDN or reverse proxy can cache pages. |
| Public cache duration (seconds) | `600` | `max-age` sent with public cache headers. |
| Page cache (server-side) - Beta | `Off` | `Off`, `Test (shadow)` or `On`. Store whole pages for guests and serve them without rendering. See [Page Cache](./usage-page-cache.md). |

::: warning Shortcode and widget caching hold stale output
Once enabled, an edit to a shortcode or widget does not show on the frontend until its TTL expires or you clear the
cache. If content looks stale right after an edit, clear all caches before assuming a bug.
:::

### Size monitoring and auto-cleanup

| Setting | Default | Purpose |
|---------|---------|---------|
| Cache size warning threshold (MB) | `50` | Size (MB) above which the Cache Management page shows a warning banner. |
| Auto-clear cache when size exceeds threshold | `Off` | When enabled, the cache is cleared automatically if it grows past the warning threshold. |

### Auto-clear cache

When **Auto-clear cache when size exceeds threshold** is turned on, the CMS runs the `cms:cache:auto-clear` command **every hour**. If the framework cache folder exceeds the configured warning threshold, the command clears it — the same action as pressing **Clear all CMS cache** manually (framework cache + Google Fonts cache + HTML Purifier cache + debugbar storage).

If the cache is below the threshold, the command does nothing.

::: warning Requires a working scheduler
The hourly auto-clear depends on Laravel's scheduler. You must have this cron entry on your server:

```bash
* * * * * /usr/local/bin/php /path-to-your-project/artisan schedule:run >> /dev/null 2>&1
```

See [Setup cronjob](./cronjob.md) for instructions on common hosts (cPanel, Hostinger).
:::

## Manual command

You can trigger the check at any time from the CLI:

```bash
php artisan cms:cache:auto-clear
```

Output depending on state:

- Setting disabled → `Auto-clear cache is disabled. Skipping.`
- Size ≤ threshold → `Cache size (X MB) is within the N MB threshold. No action taken.`
- Size > threshold → `Cache size (X MB) exceeded the N MB threshold. Clearing cache...` followed by `Framework cache cleared successfully.`

## Related commands

| Command | What it does |
|---------|--------------|
| `php artisan cms:cache:auto-clear` | Check framework cache size and clear it if it exceeds the configured threshold (only runs if auto-clear is enabled in settings). |
| `php artisan cms:cache:clear-expired` | Remove only expired cache files. Runs daily on its own if the scheduler is configured. |
| `php artisan cache:clear` | Flush all framework cache entries (Laravel built-in). |
| `php artisan optimize:clear` | Clear every Laravel cache (config, routes, views, events, compiled). |

## Developer APIs for Shortcode and Widget Caches

Shortcode and widget output caches are controlled independently by `shortcode_cache_enabled` and `widget_cache_enabled`. Their TTL settings are `shortcode_cache_ttl` and `widget_cache_ttl` (default `1800` seconds). These APIs extend fragment caching; they do not change full-page cache rules.

### Cache Key Context

Both filters receive an array of extra key parts (initially `[]`) and a string identifier. Return an array of serializable values. Filters run from lower to higher priority.

| Filter | Second argument | Existing key dimensions |
| --- | --- | --- |
| `shortcode_cache_key_parts` | Registered shortcode name | Name, application URL, shortcode attributes/content, locale, logged-in versus anonymous state |
| `widget_cache_key_parts` | Widget's full class name (`getId()`) | Class, sidebar, position, application URL, theme, locale, logged-in state, serializable configuration |

For example, content whose output changes with a setting can include that setting's value:

```php
add_filter('shortcode_cache_key_parts', function (array $parts, string $name): array {
    if ($name === 'featured-posts') {
        $parts['display_mode'] = setting('my_plugin_display_mode', 'grid');
    }

    return $parts;
}, 20, 2);

add_filter('widget_cache_key_parts', function (array $parts, string $widgetClass): array {
    $parts['display_mode'] = setting('my_plugin_display_mode', 'grid');

    return $parts;
}, 20, 2);
```

Authentication state distinguishes logged-in visitors from guests, **not individual users**. If output is personal, bypass caching or add the required bounded context. Avoid using the current URL as a key dimension: it creates one cache entry per URL. Query-string requests already bypass both caches.

### Bypass Caching

Register cache exclusions during application boot, before the affected fragment renders:

```php
use Botble\Shortcode\Compilers\ShortcodeCompiler;
use Botble\Widget\AbstractWidget;

ShortcodeCompiler::ignoreCaches(['account-summary']);
AbstractWidget::ignoreCaches([\Theme\YourTheme\Widgets\AccountSummary::class]);
```

Replace those names/classes with your registered shortcode and widget. `ignoreCaches(array $identifiers)` appends to each exclusion list. Both also honor the fragment's `enable_caching='no'` configuration. Shortcodes bypass cache for JSON requests, visual-builder requests, query strings, and excluded form shortcodes. Widgets bypass AJAX and query-string requests; rendered form content is not written to cache.

For a widget whose view depends on the current request (such as a menu's active link), mark it during rendering:

```php
use Botble\Widget\AbstractWidget;

// In the widget's rendering/data code, before returning its output.
AbstractWidget::markRenderAsRequestDependent();
```

The marker increments a render counter. A widget that observes the counter change while rendering does not write its result to cache; this also protects surrounding widget renders. It does not prevent reads of an existing cache entry. If an old entry exists, clear it when introducing the marker. Use `ignoreCaches()` before lookup when a widget must always render freshly.

### Behavior on Cache Hits

A cache hit returns stored HTML without invoking the shortcode callback or widget content rendering again. Do not depend on those callbacks for per-request side effects. Current cache entries also store assets added during rendering and restore them on a hit; legacy string-only entries return their HTML without asset restoration. Key-part filters still run before lookup when caching is eligible.
