---
title: Common backend configuration errors
description: Server and admin-side settings that stop popups rendering, tracking or capturing signups
---

# Common backend configuration errors

Most "the popup does not work" reports are a server or admin setting, not a bug in the plugin. Each section below is symptom, cause, fix.

If the popup simply does not appear for you personally, start with [Troubleshooting](./troubleshooting.md) instead - that covers frequency capping and display rules, which are far more common.

## Quick reference

| What you see | Likely cause |
|---|---|
| Popups never render on any page | Plugin not activated, or assets not published |
| Popups render but styling is missing | `cms:publish:assets` not run after an update |
| Cannot create or edit popups | Licence not activated |
| Signups return an error | CSRF, WAF, or the POST endpoint blocked |
| Impressions stay at zero | Tracking POST blocked by a WAF or ad blocker |
| Wrong popup on a cached page | Full-page cache without cache-safe delivery |
| Statistics never shrink | Scheduler not installed |
| Image-mode popup shows a broken image | Wrong `APP_URL` or missing storage symlink |
| Embed on another site does nothing | Embedding disabled, or CORS/CSP on the host page |

---

## 1. The plugin is not activated

**Symptom:** no popup markup in the page source anywhere, and there is no **Popups** entry in the admin sidebar.

**Cause:** the plugin was uploaded but never activated, so its service provider never boots.

**Fix:**

1. Go to **Admin → Plugins**.
2. Find **BB Popup** and click **Activate**.
3. Reload the front end.

Activation also creates the database tables. If activation fails, check that the database user has `CREATE TABLE` permission.

---

## 2. Assets were not published after an update

**Symptom:** popups appear as unstyled blocks of text, or the countdown and close button do not work.

**Cause:** the compiled CSS and JavaScript live under `public/vendor/core/plugins/bb-popup`. A deploy that copies only the source tree leaves that directory stale or missing.

**Fix:**

```bash
php artisan cms:publish:assets
```

Then hard-refresh the browser. Assets are cache-busted by plugin version, so a normal refresh is usually enough.

::: tip Check it directly
Open `https://your-site.com/vendor/core/plugins/bb-popup/css/popup-public.css` in a browser. A `404` means the publish step never ran.
:::

---

## 3. Licence not activated: cannot create or edit popups

**Symptom:** opening **Popups → Create** or editing a popup redirects back to the settings page with a warning.

**Cause:** creating and editing are gated behind licence activation. Rendering is not - popups already on the site keep working.

**Fix:**

1. Go to **Popups → Settings**.
2. Enter your CodeCanyon purchase code in the **License Activation** panel.
3. If activation fails, confirm the server can reach the licence endpoint over HTTPS. Outbound firewall rules on locked-down hosts commonly block it.

One licence covers one domain at a time. Deactivate before moving the site to a new domain.

---

## 4. A WAF or firewall blocks the tracking and subscribe endpoints

**Symptom:** popups display correctly, but Reports stays at zero impressions, or the signup form returns "Sorry, we could not save that."

**Cause:** the runtime sends `POST` requests to `/api/bb-popup/track` and `/api/bb-popup/subscribe`. Cloudflare, ModSecurity, or a security plugin can reject a POST that carries no browser navigation, especially one sent during page unload.

**Fix:**

1. Open the browser devtools **Network** tab and reload with the popup showing.
2. Look for `track` and `subscribe`. A `403`, `503` or a challenge page means a WAF is intercepting.
3. Allow `POST /api/bb-popup/*` in your WAF rules.
4. On Cloudflare, add a **Firewall rule** with **Skip → Managed rules** for the path `/api/bb-popup/*`.

::: warning Ad blockers
Some ad blockers block any request whose path suggests analytics. That affects the visitor's own browser only, not your reporting for everyone else. Test in a clean profile before changing server rules.
:::

---

## 5. Full-page caching serves the wrong popup

**Symptom:** visitors see a popup meant for someone else, or a popup that should be excluded by a rule appears anyway.

**Cause:** a full-page cache is serving one HTML document to everyone. BB Popup handles this by splitting the decision - page-level rules on the server, visitor-level rules in the browser - but if the cached HTML must not contain popup markup at all, you need cache-safe delivery.

**Fix:**

1. Go to **Popups → Settings**.
2. Turn on **Cache-safe delivery**. Popups are then fetched over AJAX after the page loads.
3. Clear both the site cache and the CDN cache.

Leave it off if you are not using a full-page cache - embedding is one request fewer.

---

## 6. Statistics grow forever: the scheduler is not running

**Symptom:** the `bb_popup_stats` table keeps growing and old rows are never removed.

**Cause:** pruning runs through Laravel's scheduler, which needs a cron entry.

**Fix:**

```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

Verify the retention window under **Popups → Settings → Keep statistics for**. To prune immediately:

```bash
php artisan bb-popup:prune-stats
```

---

## 7. Image-mode popup shows a broken image

**Symptom:** an image-only popup renders as an empty box or a broken-image icon.

**Cause:** either `APP_URL` in `.env` does not match the real site URL, so the generated URL points at the wrong host, or the storage symlink is missing.

**Fix:**

1. Set `APP_URL` to the exact public URL, including `https://` and no trailing slash.
2. Recreate the symlink:

   ```bash
   php artisan storage:link
   ```

3. Clear the cache: **Admin → Platform Administration → Cache Management → Clear all caches**.
4. Re-select the image on the popup's Content tab so the path is stored fresh.

---

## 8. The embed on another site does nothing

**Symptom:** the script snippet is on the other site, but no popup appears and the browser console shows a CORS or CSP error.

**Cause:** one of three things - embedding is turned off for that popup, the host page's Content-Security-Policy blocks the script, or the request never reaches your site.

**Fix:**

1. On the popup's **Advanced** tab, confirm **Allow this popup to be embedded elsewhere** is ticked.
2. Confirm the popup is **Published** and inside its start and end dates.
3. Check the host page's CSP allows your domain in `script-src` and `connect-src`.
4. If the host forbids third-party scripts entirely, use the iframe embed at `https://your-site.com/popup/{code}` instead.

---

## 9. Everything works locally but not behind a proxy or load balancer

**Symptom:** popups render, but rules based on device, referrer or login status behave inconsistently, or HTTPS assets are requested over HTTP.

**Cause:** Laravel does not trust the proxy headers, so it sees the wrong scheme and client address.

**Fix:** configure trusted proxies in `bootstrap/app.php` (or `app/Http/Middleware/TrustProxies.php` on older layouts) so `X-Forwarded-Proto` and `X-Forwarded-For` are honoured. Then clear the cache.

---

## 10. Mixed content warnings after moving to HTTPS

**Symptom:** the popup stylesheet or script is blocked and the browser reports mixed content.

**Cause:** `APP_URL` still starts with `http://`.

**Fix:** update `APP_URL` to `https://`, clear the cache, and re-run `php artisan cms:publish:assets` if the asset URLs were cached.

---

## Still stuck?

Collect these before opening a ticket - they resolve most cases in one reply:

- The output of `BbPopup.has(<popup id>)` in the browser console on the affected page
- Whether `https://your-site.com/vendor/core/plugins/bb-popup/js/popup-public.js` returns `200`
- The Network tab entry for `track` or `subscribe`, including its status code
- Whether a full-page cache or CDN sits in front of the site

Support: [https://botble.ticksy.com](https://botble.ticksy.com)
