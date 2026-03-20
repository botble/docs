# Public Cache Control (Varnish / CDN)

## Overview

By default, Laravel sets `Cache-Control: no-cache, private` on every response because it starts a session for CSRF protection. This prevents Varnish, Cloudflare, and other shared caches from caching public pages, resulting in every visitor hitting Laravel directly.

The Public Cache Control feature overrides these headers for anonymous public page requests, enabling shared caches to serve cached responses and significantly reducing TTFB (Time to First Byte).

## Configuration

Add the following to your `.env` file:

```bash
CMS_PUBLIC_CACHE_CONTROL_ENABLED=true
CMS_PUBLIC_CACHE_MAX_AGE=600
```

| Variable | Default | Description |
|----------|---------|-------------|
| `CMS_PUBLIC_CACHE_CONTROL_ENABLED` | `false` | Enable or disable public cache headers |
| `CMS_PUBLIC_CACHE_MAX_AGE` | `600` | Cache duration in seconds (600 = 10 minutes) |

## How It Works

When enabled, the feature listens to Laravel's `RequestHandled` event (after all middleware have processed the response) and applies the following logic:

### Cache headers applied when ALL conditions are met:

- Feature is enabled via config
- Request method is safe (GET or HEAD)
- Response status is 2xx (successful)
- Request is NOT for the admin panel
- User is NOT authenticated
- Request does NOT expect JSON

When these conditions are met, the response headers are changed to:

```
Cache-Control: public, max-age=600, s-maxage=600
```

### Session cookie handling

The feature performs **content-aware cookie stripping**:

- **Pages WITHOUT forms/CSRF tokens**: Session cookies (`XSRF-TOKEN` and session cookie) are removed from the response. This allows Varnish to cache the response (Varnish skips caching when `Set-Cookie` is present).
- **Pages WITH forms/CSRF tokens**: Session cookies are preserved so forms continue to work. The `Cache-Control: public` header is still set, but Varnish will not cache these responses due to the `Set-Cookie` header.

The detection looks for `name="_token"`, `X-CSRF-TOKEN`, or `csrf_token` in the response body.

## What Gets Cached vs What Doesn't

| Page Type | Cache-Control | Cookies | Cacheable by Varnish? |
|-----------|--------------|---------|----------------------|
| Public page without forms | `public, s-maxage=600` | Stripped | **Yes** |
| Public page with forms | `public, s-maxage=600` | Preserved | No (Set-Cookie) |
| Admin panel | `no-cache, private` | Preserved | No |
| Authenticated user | `no-cache, private` | Preserved | No |
| Error pages (4xx, 5xx) | `no-cache, private` | Preserved | No |
| Redirects (3xx) | `no-cache, private` | Preserved | No |
| AJAX / JSON requests | `no-cache, private` | Preserved | No |
| POST / PUT / DELETE | `no-cache, private` | Preserved | No |

## Varnish Configuration

### Minimal VCL

No special Varnish VCL is required. The default Varnish behavior works correctly:

- Responses with `Cache-Control: public, s-maxage=600` and no `Set-Cookie` → **cached**
- Responses with `Set-Cookie` → **not cached** (pass through)

### Recommended VCL additions

For better cache hit rates, add these to your `vcl_recv`:

```txt
sub vcl_recv {
    # Strip cookies from requests to public pages (improves cache key)
    if (req.url !~ "^/admin" && req.http.Cookie) {
        # Keep only essential cookies, strip session cookies
        set req.http.Cookie = regsuball(req.http.Cookie, "(^|;\s*)(XSRF-TOKEN|botble_session|laravel_session)=[^;]*", "");
        # Clean up empty cookie header
        if (req.http.Cookie ~ "^\s*$") {
            unset req.http.Cookie;
        }
    }
}
```

## Cloudflare Configuration

If using Cloudflare, you may need additional configuration since Cloudflare only caches static assets by default:

1. Create a **Cache Rule** for your public pages:
   - Match: `hostname equals example.com`
   - Cache eligibility: **Eligible for cache**
   - Edge TTL: **Use origin cache-control header**

2. Or create a **Page Rule**:
   - URL: `example.com/*`
   - Cache Level: **Cache Everything**

## Performance Impact

With caching enabled:

| Metric | Before | After |
|--------|--------|-------|
| Cold visitor TTFB | ~5s (Laravel render) | ~50ms (Varnish HIT) |
| Warm visitor TTFB | ~600ms (Redis session) | ~50ms (Varnish HIT) |
| Origin load | Every request | Only cache misses |

## Troubleshooting

### Verify headers with curl

```bash
# Check public page headers (use -s -o /dev/null -D - for GET, not -I which sends HEAD)
curl -s -o /dev/null -D - https://example.com/ | grep -iE 'cache-control|set-cookie'

# Expected for cacheable page:
# Cache-Control: max-age=600, public, s-maxage=600
# (no XSRF-TOKEN or session Set-Cookie)

# Expected for page with forms:
# Cache-Control: max-age=600, public, s-maxage=600
# Set-Cookie: XSRF-TOKEN=...
# Set-Cookie: botble_session=...
```

### Common issues

**Headers still show `no-cache, private`:**
- Ensure `CMS_PUBLIC_CACHE_CONTROL_ENABLED=true` is in `.env`
- Run `php artisan config:clear`
- Check you're not logged in (authenticated users always get private)
- Ensure the page returns HTTP 200

**Varnish shows MISS despite public headers:**
- Check if the response has `Set-Cookie` headers (page may contain forms)
- Verify Varnish VCL isn't stripping the `Cache-Control` header
- Check `varnishlog -g request -q "ReqURL eq '/'"` for details

**Forms return 419 error:**
- This should not happen with the CSRF-aware cookie handling
- If it does, check that the form page's HTML contains `name="_token"` or `csrf_token`
- The middleware preserves session cookies when these patterns are detected

## Source Code

- Handler: `platform/core/base/src/Http/Middleware/PublicCacheControl.php`
- Registration: `platform/core/base/src/Providers/BaseServiceProvider.php` (`registerPublicCacheControl`)
- Config: `platform/core/base/config/general.php` (`enable_public_cache_control`, `public_cache_max_age`)
- Tests: `platform/core/base/tests/Feature/PublicCacheControlTest.php`
