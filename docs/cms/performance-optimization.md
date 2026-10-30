# Performance Optimization

A checklist for site owners whose site feels slow. Work through it top to bottom — the first three items alone resolve
the large majority of "my site is slow" reports. Everything here is configuration; none of it requires changing
Botble's code.

The advice comes from support tickets and from tuning the 112 Botble demo sites we host ourselves, dozens per server.
The full write-up is on our blog:
[Speeding up Botble CMS: what we learned tuning 112 demo sites](https://botble.com/speeding-up-botble-cms-what-we-learned-tuning-112-demo-sites).

## 0. Measure first

Find out where the time goes before changing anything. Time to first byte (TTFB) for a typical slow page:

```bash
curl -s -o /dev/null -w 'TTFB: %{time_starttransfer}s\n' https://example.com/products/some-product
```

To see what happens inside a request, set `APP_DEBUG=true` on a **staging copy** (never on the live site) and open the
page — the debug bar shows queries, views, and timings.

On the demo sites, database queries took about **30 ms** in total on the profiled pages. Most of the request time went to
PHP itself: framework boot, view rendering, shortcodes, and widgets. That is why the caches below, OPcache, and
full-page caching matter far more than database tuning for most sites.

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

## 6. Block bots that bring no customers

On the demo servers this was **the biggest single win**: blocking unwanted crawlers cut CPU load on the busiest server
by more than 80% within minutes.

Crawlers walk every combination of filters, sort orders, and languages on a shop. Each of those URLs is unique, so no
cache helps, and every one is a full PHP render. Invented URLs are no cheaper — a 404 page still renders the whole
theme.

Decide which bots you actually want (search engines that send you visitors, usually) and block the rest as early as
possible:

- **Behind Cloudflare:** turn on its built-in AI crawler blocking setting, and add custom WAF rules for other
  user agents you do not want. The request never reaches your server.
- **At nginx:** return `403` on a user-agent match before PHP runs. Adjust the list to your own policy:

```nginx
# http {} block
map $http_user_agent $blocked_bot {
    default 0;
    ~*(Bytespider|PetalBot|MJ12bot|DotBot|AhrefsBot|SemrushBot) 1;
}

# server {} block
if ($blocked_bot) {
    return 403;
}
```

Also redirect `/index.php/<path>` to `/<path>`, so bots probing junk URLs under `/index.php/` never reach PHP. Place
this **before** your `location ~ \.php$` block — nginx checks regex locations in order:

```nginx
location ~ ^/index\.php/(.*)$ {
    return 301 /$1$is_args$args;
}
```

## 7. Enable OPcache and make sure it is not full

In your hosting PHP settings (cPanel → Select PHP Version, Plesk → PHP Settings → Performance, or `php.ini`):

```ini
opcache.enable = 1
memory_limit = 256M
max_execution_time = 300
```

OPcache alone typically cuts request time substantially, because PHP stops re-compiling every file on every request.

### Check that OPcache is not full

The PHP defaults (`opcache.memory_consumption=128`, `opcache.max_accelerated_files=10000`) are small for a Botble
install, and on a server hosting several sites each site caches its own copy of the code. Once the cache is full, PHP
recompiles scripts on every request — which shows up as random slowness that is hard to pin down.

OPcache status must be read through the web server (the CLI has its own separate cache). Create a temporary file in
`public/` with a hard-to-guess name, for example `public/opcache-check-7f3a.php`:

```php
<?php
$status = opcache_get_status(false);
header('Content-Type: text/plain');
echo 'cache_full: ', var_export($status['cache_full'], true), PHP_EOL;
echo 'hit_rate: ', round($status['opcache_statistics']['opcache_hit_rate'], 2), '%', PHP_EOL;
echo 'cached_scripts: ', $status['opcache_statistics']['num_cached_scripts'], PHP_EOL;
echo 'free_memory_mb: ', round($status['memory_usage']['free_memory'] / 1048576, 1), PHP_EOL;
```

Open it in the browser, note the numbers, then **delete the file**.

If `cache_full` is `true` or the hit rate is below 99%, raise the limits and restart PHP-FPM:

```ini
opcache.memory_consumption = 256
opcache.interned_strings_buffer = 32
opcache.max_accelerated_files = 50000
```

### Add the OPcache file cache (VPS)

On a VPS, `opcache.file_cache` keeps compiled scripts on disk, so a PHP-FPM restart or a cold worker loads them instead
of recompiling. On the multi-site demo server this cut average response time by about a third.

```ini
opcache.file_cache = /var/cache/php-opcache
```

The directory must exist and be writable by the PHP-FPM user. Stale entries are never removed on their own, so add a
weekly cron job to prune them:

```bash
0 3 * * 0 find /var/cache/php-opcache -type f -mtime +14 -delete
```

### Leave JIT off

JIT gained only about 4% on the demo sites — web requests spend their time loading classes and rendering templates, not
on heavy computation. Worse, with `opcache.jit=tracing` PHP stopped writing to the OPcache file cache, losing a much
larger gain. Keep it disabled (the PHP 8.4 default):

```ini
opcache.jit = disable
```

## 8. Cache full pages for guests

If your traffic is mostly anonymous visitors, full-page caching gives the largest win after bot blocking: a cached page
is returned in about 10 ms instead of a full render.

- **No CDN or server access (shared hosting):** turn on the built-in [Page Cache (Beta)](/cms/usage-page-cache). It
  stores whole pages on disk and serves guests without rendering. Forms on cached pages keep working.
- **With nginx, Varnish, or a CDN:** turn on **Admin → Settings → Cache → Public cache headers (CDN / reverse proxy)**
  (or `CMS_PUBLIC_CACHE_CONTROL_ENABLED=true` in `.env`). Guest pages then get `Cache-Control: public` and their
  per-visitor cookies are dropped, so the proxy can store them. Pages containing a CSRF token (contact, newsletter,
  checkout forms) are never made public. See [Public Cache Control](/cms/usage-public-cache-control).

Without public cache headers, Laravel marks every response `no-cache, private` and no proxy will store it.

### nginx FastCGI cache example

```nginx
# http {} block
fastcgi_cache_path /var/cache/nginx/botble levels=1:2 keys_zone=botble:50m inactive=60m max_size=1g;
fastcgi_cache_key "$scheme$request_method$host$request_uri";

# server {} block
set $skip_cache 0;
if ($request_method !~ ^(GET|HEAD)$) {
    set $skip_cache 1;
}
if ($http_cookie ~* "botble_session") {
    set $skip_cache 1;
}
if ($request_uri ~* "^/(admin|cart|checkout|customer|vendor|login|register|ajax|api)") {
    set $skip_cache 1;
}

location ~ \.php$ {
    # ... your existing fastcgi_pass / fastcgi_param lines ...
    fastcgi_cache botble;
    fastcgi_cache_bypass $skip_cache;
    fastcgi_no_cache $skip_cache;
    add_header X-Cache $upstream_cache_status;
}
```

- Replace `admin` with your custom admin path if you changed it.
- `botble_session` is the default session cookie name. If you set `CMS_SESSION_COOKIE_KEY_NAME` in `.env`, use that
  value instead.
- Check the `X-Cache` response header: `MISS` on the first request, `HIT` afterwards.

::: danger Never ignore Set-Cookie
Do **not** add `fastcgi_ignore_headers Set-Cookie;` (or the equivalent in Varnish or Cloudflare). nginx would store one
visitor's session cookie together with the page and hand it to every following visitor — a session leak. Never tell a
proxy to ignore `Set-Cookie` or `Cache-Control` on a Botble site; Public cache headers already removes the cookies on
pages that are safe to share.
:::

## 9. Behind Cloudflare

Cloudflare's main value for a Botble site is TLS, serving static assets from the edge, and the bot rules from
[step 6](#_6-block-bots-that-bring-no-customers).

**Restore real visitor IPs.** Without this, your logs show only Cloudflare addresses and per-IP rate limits treat all
visitors as a handful of clients. In nginx, add one `set_real_ip_from` line for every range published at
[cloudflare.com/ips](https://www.cloudflare.com/ips/) (IPv4 and IPv6):

```nginx
set_real_ip_from 173.245.48.0/20;
# ... one line per Cloudflare range ...
real_ip_header CF-Connecting-IP;
```

**If Cloudflare caches HTML**, all three of these are required:

1. **Public cache headers** turned on (see [step 8](#_8-cache-full-pages-for-guests)).
2. A **Cache Rule** with Edge TTL set to **Use origin cache-control header**.
3. A cache **bypass** for requests carrying the `botble_session` cookie.

Without the bypass, a logged-in customer can be served a guest's cached page.

## 10. Size PHP-FPM by memory, not by CPU

If the server is CPU-bound, raising `pm.max_children` does not help — more workers just compete for the same cores and
every request gets slower. Size the pool by memory instead: a Botble worker typically uses 100–200 MB, so

```
pm.max_children ≈ RAM available for PHP ÷ average worker memory
```

and reduce the CPU load itself with bot blocking and caching.

To find which requests are slow, turn on the slow log in the pool config:

```ini
request_slowlog_timeout = 5s
slowlog = /var/log/php-fpm/www-slow.log
```

## 11. Enable HTML output optimization

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

## 12. Serve media from a CDN

Images are usually the heaviest part of a page. Options, in order of effort:

- Point the media driver at object storage with a CDN in front — **Admin → Settings → Media → Driver**
  (S3, Cloudflare R2, DigitalOcean Spaces, Wasabi, BunnyCDN, Backblaze). See [Media](/cms/media).
- Turn on **Convert image to WebP** on the same page to shrink new uploads.
- Turn on **Reduce large image size** and set a max width/height so oversized originals are resized on upload.

## What did not help

| Tried | Result |
| --- | --- |
| PHP JIT | About 4% faster, and `opcache.jit=tracing` stopped the OPcache file cache from working. Leave it off. |
| Raising `pm.max_children` on a CPU-bound server | More contention, slower requests. Fix the load instead. |
| `fastcgi_ignore_headers Set-Cookie` | Leaks one visitor's session to others. Never use it. |

Keep the install up to date as well — caching improvements ship regularly in CMS updates.

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
- [Page Cache (Beta)](/cms/usage-page-cache)
- [Public Cache Control](/cms/usage-public-cache-control)
- [Setup cronjob](/cms/cronjob)
- [Troubleshooting](/cms/troubleshooting)
- [Speeding up Botble CMS: what we learned tuning 112 demo sites](https://botble.com/speeding-up-botble-cms-what-we-learned-tuning-112-demo-sites)
