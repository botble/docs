# Upgrade Guide

This guide will walk you through the process of upgrading Botble CMS based products. There are three ways to upgrade
your product:

1. **Automatic Update** (in-app updater) — easiest, recommended for most users.
2. **Command Line Update** (`php artisan cms:update`) — most reliable, recommended if you have SSH access.
3. **Manual Update** (download and extract) — last resort when neither of the above works.

## Automatic Update

To update your product automatically, follow these steps:

1. Log in to your admin panel.
2. Go to `Platform Administration` -> `System Updater`.
3. If there is a new version available, you will see a `Download & Install Update` button. Click on it to start the
   automatic update process.

![Automatic Update](../cms/images/upgrade-1.png)

::: tip
If the automatic update fails with errors like **HTTP 504**, **Invalid or uninitialized Zip object**, or a **500 error
mid-progress**, use the [Command Line Update](#command-line-update) method below — it bypasses the web-server timeouts
that cause these failures. See [Troubleshooting - System Updater Errors](/cms/troubleshooting#system-updater-errors)
for more details.
:::

## Command Line Update

If you have SSH access to your server, this is the most reliable way to update. The CLI command bypasses every web-tier
timeout (Cloudflare's proxy timeout, nginx and php-fpm proxy timeouts, browser request limits) that
typically causes the in-app updater to fail mid-progress on slower connections or behind a reverse proxy. It also
retries the update download up to 3 times automatically and bumps PHP execution time and memory limits at runtime.

1. SSH into your server and `cd` to your project root:

   ```bash
   cd /path/to/your/project
   ```

2. Run the update command:

   ```bash
   php artisan cms:update
   ```

3. Confirm the prompts. The command will download the latest update, extract files, run database migrations, publish
   assets, and clear caches in a single pass with live progress output. If anything fails, you will see the exact step
   and error message in the terminal.

::: tip
The command does the same work as the in-app updater (download → extract → migrate → publish → clear cache) but as a
CLI process it is not subject to web request timeouts. This is the recommended path for any update that fails in the
browser.
:::

::: warning
Increasing `max_execution_time` in `php.ini` does **not** raise Cloudflare's proxy timeout or
upstream proxy timeouts in nginx / php-fpm — those limits live above PHP. Use the command line method when you hit
those.
:::

## Manual Update

::: danger Warning: Backup `.env` first
The current download package uses `.env.example` for new installations. When upgrading, preserve your existing `.env` regardless of the package contents: an older or repackaged archive may contain a `.env` file. Extracting that file over your live `.env` replaces your database credentials, `APP_KEY`, and other settings. Back up `.env` first, extract to a temporary directory, and exclude `.env` when copying files.

The in-app updater and `php artisan cms:update` both refuse to apply any update that contains a `.env` file, exactly
to prevent this. Manual extraction has no such guard. If you have already overwritten `.env`, see
[Troubleshooting - .env Overwritten After Manual Update](/cms/troubleshooting#env-overwritten-after-manual-update).
:::

This way is a bit more complex, but it gives you more control over the upgrade process. Here are the steps:

1. **Back up your `.env` file** before doing anything else.
2. Download the latest version of the product from CodeCanyon.
3. Extract the downloaded file.
4. Upload the extracted files to your server, overwrite the following directories and files (and **never** the `.env`
   file in your project root):
   * `app`
   * `database`
   * `config`
   * `platform`
   * `public/themes`
   * `public/vendor`
   * `bootstrap`
   * `vendor`
   * `composer.json`
   * `composer.lock`
   * `public/index.php`
5. Verify your `.env` file is unchanged. If it was overwritten, restore it from your backup before reloading the site.
6. Update the database (see [Database Migrations](#database-migrations) below). **Do not skip this step.** New versions
   usually add or change tables and columns, and the automatic and command line updaters run these migrations for you.
   A manual update does not.
7. Clear the cache by navigating to `Platform Administration` -> `Cache Management` and clicking on
   the `Clear all CMS cache` button.

   ![Clear Cache](../cms/images/upgrade-2.png)
8. Update the translations by going to `Settings` -> `Localization` -> `Other Translations` and click to the `here` link
   to update the translations.

   ![Translations](../cms/images/upgrade-3.png)

### Database Migrations

::: danger Back up your database first
Migrations change your database structure. Take a full database backup before you run them on a live site.
:::

**With SSH access (recommended).** Run these commands from your project root:

```bash
php artisan migrate --force
php artisan cms:publish:assets
php artisan optimize:clear
```

- `migrate --force` runs only the migrations that are not yet recorded in your `migrations` table, so it is safe to
  run on a site with existing data. It covers the core, packages and every **activated** plugin. A plugin you activate
  later runs its own migrations when you activate it.
- `cms:publish:assets` copies the new CSS, JS and images from `platform/` into `public/vendor`.
- `optimize:clear` clears the config, route, view and application caches.

**Without SSH access.** Use the step-by-step buttons in the System Updater. Log in as a super admin and go to
`Platform Administration` -> `System Updater`. In the **Manual System Updater** box, click **Run** on these steps only,
in this order:

1. **Update databases** - runs the core, package and active plugin migrations.
2. **Publish core assets**
3. **Publish packages assets**

Skip **Download update files** and **Update system files**. You have already uploaded the new files yourself, and
running those two steps would download the update again and overwrite your files.

::: tip
The Manual System Updater box only appears when your site can reach the Botble update server. If it is missing, go to
`Plugins` -> `Installed Plugins`, deactivate all plugins, then activate them again. Activating a plugin runs that
plugin's migrations, but not the core and package migrations, so ask your hosting provider to run
`php artisan migrate --force` for you as well.
:::

::: tip Check for pending migrations
Run `php artisan migrate:status` to see which migrations have run. Any migration listed as **Pending** has not been
applied yet. A site can look fine with pending migrations until a page or feature touches the changed tables, so
check this on your staging copy before you deploy to production.
:::
