# Performance Optimization

A checklist for site owners whose site feels slow. Work through it top to bottom — the first two items alone resolve
the large majority of "my site is slow" reports.

## 1. Turn off debug mode

This is the single most common cause of a slow production site. With `APP_DEBUG=true`, Laravel collects and holds a
full debug payload for every request, which typically pushes TTFB past one second.

In `.env`:

```
APP_DEBUG=false
APP_ENV=production
```

Then clear the cache at **Admin → Platform Administration → Cache Management**.

::: warning
Leaving `APP_DEBUG=true` in production also exposes stack traces, file paths, and environment values to visitors when
an error occurs. Turn it off even if performance is acceptable.
:::

## 2. Clear and rebuild the cache

Go to **Admin → Platform Administration → Cache Management** and:

1. **Clear all caches** — removes stale framework, view, config, and route caches.
2. Use the **Performance Optimization** card to pre-cache config, routes, and views.

From the CLI, the equivalents are:

```bash
php artisan optimize:clear
php artisan optimize
```

See [Cache Management](/cms/cache-management) for the full reference.

## 3. Enable the granular caches

**Admin → Settings → Cache** exposes caches that are off by default because they trade freshness for speed. On a site
with a large navigation menu or many page-builder blocks, these make a visible difference.

| Setting | Default | Enable when |
| --- | --- | --- |
| Cache front menu | On | Keep on. Skips rebuilding the navigation tree on every request. |
| Cache admin menu | Off | The admin sidebar is slow to render. |
| Cache shortcodes (UI blocks) | Off | Pages built with many shortcodes/UI blocks. Set a TTL (default `1800` seconds). |
| Cache widgets | Off | Sidebars and footers with several widgets. TTL default `1800` seconds. |
| Cache user avatar | On | Keep on. |
| Plugin cache | On | Keep on. |
| Cache sitemap | On | Large sitemaps. Timeout default `60` minutes. |

::: warning Shortcode and widget caching hold stale output
Once enabled, edits to a shortcode or widget will not appear on the frontend until its TTL expires or you clear the
cache. If content looks stale after an edit, clear all caches first before assuming a bug.
:::

## 4. Use a real cache and session driver

The default `file` driver writes into `storage/framework/cache`, which on a busy site can grow past 100 MB and start
costing more time than it saves. Redis (or Memcached) has automatic eviction and is much faster.

In `.env`:

```
CACHE_STORE=redis
SESSION_DRIVER=redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

If Redis is not available on your hosting, keep the `file` driver but watch the cache size — see below.

## 5. Keep the framework cache from growing

Check the current size on **Admin → Platform Administration → Cache Management**; a warning banner appears once it
passes the threshold.

To automate cleanup, go to **Admin → Settings → Cache** and:

- Set **Cache size warning threshold (MB)** (default `50`).
- Turn on **Auto-clear cache when size exceeds threshold**.

This runs `cms:cache:auto-clear` hourly, so it requires a working
[cronjob](/cms/cronjob). Without the scheduler entry, the setting does nothing.

## 6. Enable HTML output optimization

**Admin → Settings → Optimize** tunes the rendered HTML. Turn on **Enable optimize page speed**, then pick from these
seven options:

- Collapse white space
- Elide attributes
- Inline CSS
- Insert DNS prefetch
- Remove comments
- Remove quotes
- Defer JavaScript

::: tip What this page does *not* do
There is no lazy-load, no CSS/JS minification, and no cache-header setting here. Page, menu, shortcode, and widget
caching live under **Admin → Settings → Cache** instead. Asset minification happens at build time — see
[Asset Compilation](/cms/asset-compilation).
:::

Test **Defer JavaScript** carefully. Some themes and third-party widgets assume synchronous script execution and can
break when it is enabled.

## 7. Enable OPcache and set sane PHP limits

In your hosting PHP settings (cPanel → Select PHP Version, Plesk → PHP Settings → Performance, or `php.ini`):

```ini
opcache.enable = 1
memory_limit = 256M
max_execution_time = 300
```

OPcache alone typically cuts request time substantially, because PHP stops re-compiling every file on every request.

## 8. Serve media from a CDN

Images are usually the heaviest part of a page. Options, in order of effort:

- Point the media driver at object storage with a CDN in front — **Admin → Settings → Media → Driver**
  (S3, Cloudflare R2, DigitalOcean Spaces, Wasabi, BunnyCDN, Backblaze). See [Media](/cms/media).
- Turn on **Convert image to WebP** on the same page to shrink new uploads.
- Turn on **Reduce large image size** and set a max width/height so oversized originals are resized on upload.

## 9. Cache full pages at the edge

If your traffic is mostly anonymous visitors, full-page caching gives the largest win. See
[Public Cache Control](/cms/usage-public-cache-control).

Note that a page containing a CSRF-protected form (contact, inquiry, newsletter) emits a `Set-Cookie` header, and most
CDNs refuse to cache such a response. Loading those forms over AJAX after the initial render lets the HTML stay
cacheable.

## What is not built in

- **`Content-Security-Policy`, `Strict-Transport-Security`, and `Permissions-Policy`** are not emitted by the CMS. Add
  them at the web server (nginx `add_header`, Apache `Header set`) or at your CDN. Do not apply a strict CSP without
  auditing your own deployment first — themes and plugins load inline scripts and styles. Note that
  `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, and `Referrer-Policy` **are** already sent by the
  built-in middleware — see [Security Settings](/cms/security-cookies).
- **LiteSpeed LSCache tag-based purging** is not integrated. Standard Laravel caching works on LiteSpeed, but purging
  is not tag-aware.

## Related

- [Cache Management](/cms/cache-management)
- [Public Cache Control](/cms/usage-public-cache-control)
- [Setup cronjob](/cms/cronjob)
- [Troubleshooting](/cms/troubleshooting)
