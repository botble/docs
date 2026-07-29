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
| Shortcode cache time | `1800` | TTL in seconds for shortcode output. |
| Cache widgets | `On`/`Off` per install | Cache rendered widget output for sidebars and footers. |
| Widget cache time | `1800` | TTL in seconds for widget output. |
| Plugin cache | `On` | Cache the activated-plugin list. Leave on. |
| Cache sitemap | `On` | Cache generated sitemap XML. Shown only when the sitemap is enabled. |
| Sitemap cache time | `60` | Sitemap cache duration in minutes. |

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
