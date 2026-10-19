---
title: Page Cache (Beta)
description: Serve guest page views from a built-in, server-side HTML cache that works on any hosting, including shared hosting.
---

# Page Cache (Beta)

::: info Beta, off by default
Available since Botble CMS **7.6.13**. Page cache is a beta feature. It is **off** on every site until you turn it on. Test it in **shadow** mode first (see below), then decide whether to switch it on.
:::

## Overview

Every page view normally runs the whole application: routes, database queries, theme views, widgets and shortcodes. Page cache stores the finished HTML of a page the first time a guest opens it and serves the next guests from that copy, skipping the controller and view rendering entirely.

- **Works on any hosting.** It stores pages as files in `storage/framework/page-cache`. No Redis, Varnish, CDN, nginx configuration or root access is needed, so it runs on shared hosting.
- **Safe by default.** Only plain guest page views are cached. Logged-in users, carts, form errors, searches and filters are always rendered live (see [What is never cached](#what-is-never-cached)).
- **Every visitor keeps their own session.** A cached page still runs the full middleware stack: each visitor gets their own session cookie and CSRF token, so forms on a cached page work normally.
- **Cleared automatically.** Editing content, settings, menus, widgets or theme options clears the cache (see [When the cache is cleared](#when-the-cache-is-cleared)).

In our tests a cached page responded 3-6× faster than an uncached one (for example a product listing page went from ~340 ms to ~55 ms server time).

::: tip Page cache vs. Public Cache Control
[Public Cache Control](./usage-public-cache-control.md) lets an *external* cache (Cloudflare, Varnish) store pages, which needs a CDN or server access. Page cache is *built in* and needs nothing extra. You can use either one, or both.
:::

## Turn it on

Go to **Admin → Settings → Cache** and find **Page cache (server-side) - Beta**.

| Setting | Default | Description |
|---------|---------|-------------|
| Page cache | `Off` | `Off`, `Test (shadow)` or `On` - see [Modes](#modes). |
| Page cache duration (seconds) | `600` | How long a stored page is served before it is rendered again, even without edits. Minimum `60`. |
| Never cache these URLs | empty | One path per line, without the domain. `*` is a wildcard, e.g. `landing/*`. |

You can also control the mode from `.env`. When `CMS_PAGE_CACHE_MODE` is set, it wins over the admin setting and the select box in the admin panel is disabled:

```bash
CMS_PAGE_CACHE_MODE=shadow   # off | shadow | on
CMS_PAGE_CACHE_TTL=600       # default duration, used when the admin setting is empty
CMS_PAGE_CACHE_MAX_BODY_KB=2048  # pages larger than this are never stored
```

::: tip Instant kill switch
If anything looks wrong after you turn it on, set `CMS_PAGE_CACHE_MODE=off` in `.env` (or pick **Off** in the admin panel). The site goes back to rendering every page immediately.
:::

## Modes

### Off

Nothing is stored or served. This is the default.

### Test (shadow)

Pages are stored as if the cache were on, but **never served**. Every later visit renders the page normally and compares the fresh HTML with the stored copy, then writes the result to `storage/logs/page-cache-shadow-YYYY-MM-DD.log`. Visitors see exactly what they would see with the cache off.

Use it for a few days to find out, on your own site and theme, whether a cached page would ever show something different from a fresh one:

```bash
php artisan cms:page-cache:report            # last 24 hours
php artisan cms:page-cache:report --days=7   # last 7 days
```

The report shows:

- **Would-hit ratio** for browsers and bots: how many page views the cache would have answered.
- **Outcomes and skip reasons**: `match`, `match-volatile` (identical once random IDs are ignored), `mismatch`, `miss`, `bypass: <reason>`.
- **Mismatches**: for each page that differed, the first place where the stored and fresh HTML diverge.

Review every mismatch before switching to **On**. Harmless ones are random content (a rotating announcement, a "random posts" block) and view counters. A mismatch that shows a price, stock, cart, currency or a user's name means that page must not be cached: add it to **Never cache these URLs** (or ask your theme developer to fix it) before turning the cache on.

### On

Stored pages are served to guests. The response carries an `X-Page-Cache` header:

| Header value | Meaning |
|--------------|---------|
| `HIT` | Served from the cache. `X-Page-Cache-Age` shows the age in seconds. |
| `MISS` | Rendered and stored for the next visitor. |
| `BYPASS` | Rendered live; this request is not cacheable (logged in, has a cart, filter in the URL...). With `APP_DEBUG=true` an `X-Page-Cache-Skip` header shows the reason. |

In shadow mode the header is `SHADOW-MATCH`, `SHADOW-MISMATCH`, `MISS` or `BYPASS`.

Check a page from the command line:

```bash
curl -s -o /dev/null -D - https://your-site.com/ | grep -i x-page-cache
```

## What is cached

Only `GET` requests for public pages rendered by the theme:

- The homepage, pages, blog posts and categories, and other content opened by its slug (`/{slug}`, `/{prefix}/{slug}`)
- With Ecommerce: the products listing page, product pages and product categories
- With Marketplace: the stores listing and store pages
- Pagination (`?page=2` up to `?page=500`)

Tracking parameters (`utm_*`, `fbclid`, `gclid`, `gbraid`, `wbraid`, `msclkid`, `mc_cid`, `mc_eid`, `_ga`) are ignored when looking up a page, so a link shared on social media is still served from the cache.

## What is never cached

A request is always rendered live when any of these is true:

- The visitor is logged in (admin, customer, vendor or any other account)
- The visitor has personal state in their session: a cart, wishlist, compare list, chosen currency, flash message, form errors, old form input
- The request carries a cookie that can change the page (anything other than analytics and consent cookies)
- The URL has a query string other than `page` and the tracking parameters above: search, filters, sorting, currency switchers
- It is not a `GET` request, or it is an AJAX/JSON request
- The URL is in the admin panel or in **Never cache these URLs**
- The URL is not the site's canonical address (`APP_URL`): a different host, port, `/index.php/...` or `/public/...`

A rendered page is **not stored** when:

- The status is not `200`, or the response is not HTML
- The page sets a cookie or writes to the session while rendering
- The page shows a flash message
- The page is larger than `CMS_PAGE_CACHE_MAX_BODY_KB`
- The HTML contains anything private to the visitor (their session ID, cookie values or token). The page is refused as a safety net.

With Ecommerce, the cache also turns itself off while **Auto detect visitor currency** is enabled, because the currency would then come from the visitor's browser language.

## When the cache is cleared

The whole cache is invalidated (pages are re-rendered on their next visit) when:

- A post, page, product, category, tag or any other content is created, updated or deleted
- Anything is saved in the admin panel: settings, theme options, menus, widgets, sliders, prices and stock edited inline, imports. Admin areas that never affect public pages (orders, customers, payments, reports, users) are ignored.
- A product sells out (its stock reaches zero)
- A vendor edits their store or products from the vendor dashboard
- A plugin is activated, deactivated, updated or removed, or a slug or permalink setting changes
- Any cache is cleared: **Platform Administration → Cache Management → Clear all CMS cache**, `php artisan cache:clear` or `php artisan optimize:clear`

You can also clear it yourself:

```bash
php artisan cms:page-cache:clear
```

Even without any edit, a page is re-rendered once its duration (default 10 minutes) expires. This keeps time-based content (sale prices with an end date, "new" badges, stock changed outside the admin panel) at most one duration out of date.

## Disk usage

Expired pages are deleted automatically:

- `cms:page-cache:prune` runs daily through the scheduler ([Setup cronjob](./cronjob.md))
- Without a cronjob, the site also removes expired pages by itself, on average once every 500 pages it stores

Pages are stored gzip-compressed, and only canonical URLs with a limited set of query parameters get an entry, so bots requesting random URLs cannot fill the disk. On our demo sites the page cache folder stays under 5 MB per site.

## Known limitations

| Limitation | Details |
|------------|---------|
| View counters | Post and product view counts only increase on rendered views, so they count fewer views while the cache is on. |
| Recently viewed products | For guests, the "recently viewed" list is not updated by cached product pages. Logged-in customers are not affected. |
| Content up to one duration old | Changes that do not happen through the admin panel (stock synced by an external system, a scheduled sale starting) show after the duration expires. Lower the duration if this matters, or clear the cache from your sync job. |
| Per-device markup | A theme that renders different HTML for phones and desktops on the server must add the device to the cache key (see [For developers](#for-developers)). |
| Random content | Blocks that pick random items on every render show the same items to every visitor until the page is re-rendered. |

## Troubleshooting

**Every page says `BYPASS`.** Open the page in a private window: a logged-in session or a cart cookie bypasses the cache. With `APP_DEBUG=true`, the `X-Page-Cache-Skip` header names the reason, for example `session-state`, `query`, `cookie:<name>` or `app-url` (check that `APP_URL` matches the address you are visiting, including `https` and `www`).

**`MISS` on every visit, never `HIT`.** The page writes to the session or sets a cookie while rendering (often a theme or plugin feature such as a popup counter). Run shadow mode and `php artisan cms:page-cache:report` to see the skip reasons.

**An edit does not show.** Content edits clear the cache automatically. If the change was made outside the admin panel (database, import script, API), run `php artisan cms:page-cache:clear`.

**Something looks wrong on a cached page.** Turn the cache off, note the URL, and run shadow mode for a day: the report shows exactly what differed. Add the URL to **Never cache these URLs** if it must always be rendered live.

## For developers

Plugins and themes can adjust the cache through [filters](./filters.md) and [actions](./actions.md).

| Hook | Type | Use it to |
|------|------|-----------|
| `cms_page_cache_cacheable_routes` | filter | Add route names or `Controller@method` actions of your plugin's public pages. |
| `cms_page_cache_excluded_paths` | filter | Add path patterns that must never be cached. |
| `cms_page_cache_allowed_query_keys` | filter | Allow more query parameters into the cache key (default `['page']`). |
| `cms_page_cache_key_parts` | filter | Add values to the cache key when your markup depends on something besides the URL, e.g. the device. |
| `cms_page_cache_ignorable_cookies` | filter | Declare cookies that never change the HTML, so they do not bypass the cache. |
| `cms_page_cache_inert_session_keys` | filter | Declare session keys that never change the HTML. |
| `cms_page_cache_ignorable_session_writes` | filter | Declare session writes during rendering that do not make the page personal. |
| `cms_page_cache_should_store` | filter | Veto storing a specific response: return anything but `true`. |
| `cms_page_cache_leak_markers` | filter | Add per-visitor values that must never appear in a stored page. |
| `cms_page_cache_compat_guards` | filter | Return a non-empty list of reason strings to turn the cache off site-wide, e.g. while a setting makes pages depend on the visitor. |
| `cms_page_cache_flush_ignored_models` | filter | Models whose changes never reach public pages (no flush). |
| `cms_page_cache_flush_ignored_routes` | filter | Admin routes whose writes never reach public pages (no flush). |
| `cms_page_cache_flush` | action | Clear the page cache from your code. |

Make a plugin's public page cacheable:

```php
add_filter('cms_page_cache_cacheable_routes', function (array $routes): array {
    $routes[] = 'public.events.index';

    return $routes;
});
```

Store phones and desktops separately when a view checks the user agent on the server:

```php
add_filter('cms_page_cache_key_parts', function (array $parts): array {
    $detect = new \Detection\MobileDetect();
    $parts['phone'] = $detect->isMobile() && ! $detect->isTablet();

    return $parts;
});
```

Clear the cache after changing data outside the admin panel:

```php
do_action('cms_page_cache_flush');
```

::: warning Render-time side effects
A cached page skips the controller and views. Code that runs *during rendering* to record something (counting a view, logging, adding to "recently viewed") does not run on a cache hit. Move such work to JavaScript or a separate request if it must happen on every view.
:::
