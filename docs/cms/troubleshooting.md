# Troubleshooting

This guide covers common issues you may encounter when using Botble CMS and how to resolve them.

## CSRF Token Mismatch

If you see `{"error":true,"data":null,"message":"CSRF token mismatch."}` when submitting forms or making AJAX requests:

### Causes

- **Expired session**: The page was open too long and the session expired.
- **Session storage permissions**: The web server cannot write to the session directory.
- **CDN/proxy stripping cookies**: A CDN or reverse proxy is removing session cookies from requests.
- **Multiple tabs**: Having multiple tabs open can sometimes cause token conflicts.

### Solutions

1. **Refresh the page** — This is the most common fix. If your session expired, refreshing will generate a new CSRF token.

2. **Clear cache**:
   - Go to **Admin → Platform Administration → Cache Management** and clear all cache.
   - Or run: `php artisan cache:clear`

3. **Fix session directory permissions**:
   ```bash
   chmod -R 775 storage
   chown -R www-data:www-data storage
   ```
   Replace `www-data` with your web server user (e.g., `nginx`, `apache`).

4. **Check CDN/proxy settings**: If you use Cloudflare, Varnish, or another CDN/proxy, ensure it is not stripping cookies from requests. Session cookies (`laravel_session`, `XSRF-TOKEN`) must be forwarded.

5. **Disable CSRF verification** (last resort): Add to your `.env` file:
   ```
   CMS_DISABLE_VERIFY_CSRF_TOKEN=true
   ```
   ::: warning
   This disables CSRF protection entirely and is not recommended for production. Use only for debugging.
   :::

## 419 Page Expired

This is the same as CSRF token mismatch but displayed as an error page. Follow the same solutions above.

## 500 Internal Server Error

### Check the Error Log

Enable debug mode to see the actual error:

1. Set `APP_DEBUG=true` in your `.env` file.
2. Reproduce the error — you will see a detailed error page.
3. Or check the log file at `storage/logs/laravel-*.log`.

::: warning
Remember to set `APP_DEBUG=false` after debugging. Never leave debug mode enabled in production.
:::

### Common Causes

- **Missing PHP extensions**: Check [installation requirements](/cms/installation-requirements).
- **File permissions**: Run `chmod -R 775 storage bootstrap/cache`.
- **Corrupted cache**: Delete `bootstrap/cache/services.php` and `bootstrap/cache/packages.php`, then run `php artisan config:clear`.

## File Upload Issues

### Upload Size Limit

If file uploads fail with size errors, increase PHP limits in your `php.ini` or hosting panel:

```ini
upload_max_filesize = 128M
post_max_size = 128M
```

You can also enable chunked uploads in **Admin → Settings → Media**.

### tempnam() Error

If you see a `tempnam()` error during upload, the storage directory lacks write permissions:

```bash
chmod -R 775 storage bootstrap/cache
```

## Email Not Sending

1. Go to **Admin → Settings → Email** and configure your SMTP or API settings.
2. For **Gmail**: Use an [App Password](https://support.google.com/accounts/answer/185833), not your real password. Use port `465` (SSL) or `587` (TLS).
3. Click **Send test email** to verify the configuration.
4. If emails go to spam, consider using a dedicated service like **Mailgun**, **SendGrid**, or **Amazon SES**.

## Dates Show UTC Instead of Local Time

Orders, posts, and every other timestamp in the admin panel render in UTC, even though you are in another timezone.

### Cause

`config/app.php` hardcodes `'timezone' => 'UTC'`. It does **not** read `APP_TIMEZONE` from `.env`, so adding that
variable has no effect on its own.

The real control is a database setting. At boot, the CMS reads the `time_zone` setting and calls PHP's
`date_default_timezone_set()`, which is why all model timestamps then render in your chosen zone automatically.

### Fix

1. Go to **Admin → Settings → General → Time zone** and pick your timezone.
2. Save.
3. Go to **Admin → Platform Administration → Cache Management** and clear all caches.

::: warning The cache step is required
Boot settings are cached for one hour. Without clearing the cache, your new timezone will not take effect until the
cache expires on its own.
:::

## License Section Missing from General Settings

You open **Admin → Settings → General** to activate or re-activate your license, and the entire license block is
absent — no purchase code field, no activation button. This commonly surfaces after moving an install to a new domain,
when you expect to re-activate.

### Cause

The license section only renders when `core.base.general.hide_activated_license_info` is `false`. Two things set it to
`true`:

- The free **White Label** plugin (FriendsOfBotble) has a **Hide license activation info** toggle that sets this config.
- `CMS_HIDE_ACTIVATED_LICENSE_INFO=true` in `.env` sets the same config directly.

### Fix

**If the White Label plugin is installed:**

1. Go to **Admin → Settings → Others → White Label**.
2. Turn **Hide license activation info** off.
3. Save.
4. Clear all caches at **Admin → Platform Administration → Cache Management**.
5. Reload **Settings → General** — the activation form is back at the bottom.

**If it is not installed:** open `.env`, remove `CMS_HIDE_ACTIVATED_LICENSE_INFO=true`, and clear the caches.

::: tip Moving to a new domain
No reinstall and no data loss is needed. Release the old domain at
[license.botble.com](https://license.botble.com), then activate with the same purchase code on the new one. You do not
need to delete `storage/.license` — server-side verification fails on the new domain, so the activation form renders as
soon as the block is visible again. See [Domain Migration](/cms/domain-migration).
:::

## Captcha Enabled but Not Rendering (All Forms Blocked)

You turn on a captcha in **Admin → Settings → Captcha**, the widget never appears on the form, and now every submission
fails — login, contact, newsletter, and registration are all blocked, because validation still expects the captcha
field.

Check these in order:

1. **The theme does not render the captcha type you chose.** Math captcha needs the theme's form partial to output the
   math-question markup. If the form was built for reCAPTCHA only, the Math widget has nowhere to render. Switch back
   to reCAPTCHA v2/v3, or have the theme add Math captcha support. Confirm which type your theme supports before
   enabling it.
2. **Missing or wrong keys.** With reCAPTCHA selected but the site key or secret key empty or incorrect, the widget
   silently fails to load. Re-check both in **Settings → Captcha**.
3. **Stale cache.** Clear all caches after changing the captcha type or keys.
4. **Blocked JavaScript.** An ad blocker, a strict Content Security Policy, or no outbound access prevents Google's
   reCAPTCHA script from loading.

::: tip
reCAPTCHA v3 is invisible, which also sidesteps a class of layout problems — an overflowing widget on narrow vendor and
sidebar forms, or the widget rendering above the email field on newsletter and coming-soon forms.
:::

## ModSecurity Blocking Requests

Some hosting providers have ModSecurity enabled, which can block legitimate admin requests. You may see `403 Forbidden` errors.

**Solution**: Disable ModSecurity in your hosting control panel, or add to `.htaccess`:

```apache
<IfModule mod_security.c>
    SecFilterEngine Off
    SecFilterScanPOST Off
</IfModule>
```

::: tip
ModSecurity does not always return a `403`. It can also **silently strip the query string** from a request — the page still loads, but `$_GET` arrives empty. This breaks OAuth callbacks. See [Social Login Fails](#social-login-fails-invalidstateexception-or-missing-required-parameter-code) below.
:::

## Social Login Fails — "InvalidStateException" or "Missing required parameter: code" {#social-login-fails-invalidstateexception-or-missing-required-parameter-code}

When setting up Google (or Facebook) social login, you click the provider button, pick an account, and get bounced back to `/login`. Depending on the stage, you may see:

- `InvalidStateException occurred while trying to login`
- A browser console error (`Uncaught SyntaxError: Invalid or unexpected token`) on the `/login` page after the redirect
- `POST https://www.googleapis.com/oauth2/v4/token resulted in a 400 Bad Request` with `"error_description": "Missing required parameter: code"`

### Cause

The OAuth callback query string is being stripped before it reaches Laravel. Google appends parameters such as `code`, `state`, `scope`, and `iss=https://accounts.google.com` to the callback URL. Because `scope` and `iss` contain full `https://` URLs **embedded inside the query string**, ModSecurity's Remote File Inclusion (RFI) rules — enabled by default on most cPanel shared hosts — flag the request and silently drop the query string. Laravel then receives an empty request, Socialite has no `code` to exchange, and the token request fails.

A second, less common cause is a **double `.htaccess` rewrite** (root `public_html/.htaccess` rewrites into a `public/` subfolder, then `public/.htaccess` rewrites to `index.php`) dropping the query string on some Apache versions.

### Diagnosis

1. Confirm the correct callback URL in Google Cloud Console is `https://your-domain.com/auth/callback/google` — note the path order is `auth/callback/google`, **not** `auth/google/callback`.
2. Temporarily add this as the first line of `handleProviderCallback()` in `platform/plugins/social-login/src/Http/Controllers/SocialLoginController.php`:

   ```php
   dd(request()->fullUrl(), request()->all());
   ```

3. In an incognito window, open a **synthetic** callback URL with simple values:

   ```
   https://your-domain.com/auth/callback/google?code=ABC123&state=XYZ&scope=email
   ```

   Laravel should receive all three parameters.
4. Now perform a **real** Google login. If the synthetic test passed but the real callback arrives with an empty query string, the only difference is the embedded `https://` URLs in `scope`/`iss` — confirming ModSecurity is stripping them.
5. Remove the `dd()` line afterwards.

### Fix

1. **Disable ModSecurity for the domain** — in cPanel → Security → ModSecurity, toggle it OFF for your domain. (If you cannot disable it globally, ask your host to whitelist the RFI rules for `/auth/callback/*` paths.)
2. **Preserve the query string through `.htaccess` rewrites** — if your root `public_html/.htaccess` rewrites into a `public/` subfolder, add the `QSA` (Query String Append) flag:

   ```apache
   RewriteRule ^(.*)$ public/$1 [L,QSA]
   ```

3. Clear all caches in **Admin → Platform Administration → Cache Management**, then retry social login in an incognito window.

::: tip
The console `SyntaxError` after the redirect is a side effect, not the root cause — the toast that displays the Google error contains a newline that breaks the inline script. Fixing the query-string stripping removes the Google error, and the toast (and its syntax error) disappears with it.
:::

## DELETE Method Not Allowed

Some shared hosting providers disable the `DELETE` HTTP method. If you cannot delete items:

- Contact your hosting provider to enable the `DELETE` method.
- Reference: [How to enable DELETE method](https://stackoverflow.com/questions/37484888).

## System Updater Errors

If you encounter errors during the automatic update process:

### HTTP 504 Gateway Timeout

The server timed out while downloading the update files. This usually happens due to slow server connection, a reverse
proxy in front of your site (Cloudflare, nginx), or low PHP timeout limits.

### Invalid or Uninitialized Zip Object

The update file download was incomplete or corrupted, resulting in an invalid zip file.

### 500 Error Mid-Progress (around 10–20%)

The web request was killed by an upstream proxy before the update could finish. Cloudflare's free plan caps connections
at 100 seconds regardless of your `max_execution_time`, and nginx / php-fpm have their own proxy timeouts above PHP.

### Solution: Use the Command Line Updater

For all three errors above, the most reliable fix is to run the update from SSH instead of the browser. The CLI command
bypasses every web-tier timeout, retries the download up to 3 times, and bumps PHP execution and memory limits at
runtime:

```bash
cd /path/to/your/project
php artisan cms:update
```

See [Command Line Update](/cms/upgrade#command-line-update) for details. This is the recommended path whenever the
in-app updater fails mid-progress.

::: tip
Increasing `max_execution_time` and `memory_limit` in your `php.ini` only affects PHP itself — it does **not** override
Cloudflare's 100s connection cap or web-server proxy timeouts. The command line method is the only reliable fix when
those upstream limits are the cause.
:::

### Fallback: Manual Update (No SSH Access)

If you do not have SSH access, you can fall back to the [manual update](/cms/upgrade#manual-update) method. **Always
back up your `.env` file before extracting the package** — see the warning in the manual update section, and the
[.env Overwritten After Manual Update](#env-overwritten-after-manual-update) section below if you have already lost
your `.env`.

## .env Overwritten After Manual Update

### Symptom

After a manual update extraction, your site goes down with an error like:

```
SQLSTATE[HY000] [1045] Access denied for user 'root'@'localhost'
(Connection: mysql, Host: 127.0.0.1, Port: 3306, Database: laravel)
```

The credentials in the error message (`root`, `laravel`, `127.0.0.1`) are Laravel's stock `.env` defaults. This means
your real `.env` file has been overwritten by the default `.env` shipped inside the CodeCanyon package.

### Why It Happens

When you extract a fresh CodeCanyon package on top of your live install with a tool that does not skip `.env`, the
default `.env` from the package overwrites your real one. Your database credentials, `APP_KEY`, mail settings, and
everything else in `.env` are lost.

The in-app updater and `php artisan cms:update` both explicitly refuse to apply any update zip that contains a `.env`
file, exactly to prevent this. Manual extraction has no such guard.

### Fix

1. Edit `.env` in your project root via SSH, SFTP, or your hosting file manager.
2. Restore your real database credentials. They should look like this (use the values from your hosting control panel
   or your previous backup):

   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_actual_db_name
   DB_USERNAME=your_actual_db_user
   DB_PASSWORD=your_actual_db_password
   ```

3. Restore `APP_KEY`, `APP_URL`, and any mail / storage / queue settings that were in your previous `.env`.
4. Clear caches:

   ```bash
   php artisan cache:clear
   php artisan config:clear
   php artisan view:clear
   php artisan route:clear
   ```

5. Reload your site — the database error should be gone.

If you do not have a backup of `.env`, your hosting control panel (cPanel, Plesk, DirectAdmin) shows the database name,
user, and host under the **Databases** section. The password is the one you set when you created the database.

::: danger Critical: APP_KEY warning
If `APP_KEY` is missing or different from the original value, **all existing user sessions will be invalidated** and
**any encrypted database columns will become unreadable**. You must restore the original `APP_KEY` from a backup. If
you do not have a backup, you will need to log everyone out and re-encrypt any encrypted columns with the new key.
:::

### Prevention

For future updates, use the [Command Line Update](/cms/upgrade#command-line-update) (`php artisan cms:update`) or the
[Automatic Update](/cms/upgrade#automatic-update) (in-app updater) instead of manual extraction. Both methods refuse
update zips that contain a `.env` file, so this scenario cannot happen.

## "Unknown Column" / "Column Not Found" After Install or Update

You see an error such as `SQLSTATE[42S22]: Column not found: 1054 Unknown column 'users.sessions_invalidated_at'`.

### Cause

You installed from an older package, so the `database.sql` you imported predates migrations that added those columns.
The code is newer than the schema.

### Fix

Go to **Admin → Platform Administration → System Updater** and click **Re-install the latest version**. This pulls the
latest core and runs every outstanding migration.

If the error blocks the admin panel entirely and you have SSH access:

```bash
cd /path/to/your/project
php artisan migrate
```

## Site Breaks After Upgrading PHP

After switching your hosting to PHP 8.3 or 8.4, the site returns a fatal error naming a vendor package — for example
`Declaration of Maatwebsite\Excel\... must be compatible with ...`.

### Cause

The packages in `composer.lock` were resolved against your previous PHP version. They need to be rebuilt for the new
one. This is not a CMS bug.

### Fix

With SSH access:

```bash
cd /path/to/your/project
composer install
```

Without SSH, use **Admin → Platform Administration → System Updater → Re-install the latest version**, which ships an
updated `vendor` folder.

Do not downgrade PHP as a workaround — current versions require PHP 8.3 or higher, and the updater will keep refusing
to run.

## Update Fails with a Generic "Update error"

When the System Updater reports a vague error with no traceable cause, a third-party plugin is the most common culprit.

1. Go to **Admin → Plugins → Installed Plugins**.
2. Deactivate recently added third-party plugins — two-factor authentication plugins are a known offender.
3. Re-run the updater.
4. Reactivate the plugins.

If the update then succeeds, report the conflict to that plugin's author.

## Plugins Page Fails to Load Marketplace Plugins

**Admin → Plugins → Add New Plugin** shows a toast reading `Cannot read properties of undefined (reading 'status')`, and
the browser's Network tab shows `ERR_HTTP2_PROTOCOL_ERROR` or `ERR_INCOMPLETE_CHUNKED_ENCODING` on the
`/admin/plugins/marketplace/ajax/plugins` request.

### Cause

The marketplace plugin list response is roughly 1.2 MB, which exceeds nginx's in-memory FastCGI buffers. nginx tries to
spill the response to `/var/lib/nginx/fastcgi/`, and on some stacks (CloudPanel's defaults in particular) the worker
process cannot write there, so it drops the connection mid-stream. The JavaScript toast is the admin error handler
masking the real network failure.

Confirm it in the nginx error log for the site:

```
[crit] open() "/var/lib/nginx/fastcgi/N/NN/000..." failed (13: Permission denied) while reading upstream
```

### Fix

Either option works.

**Option 1 — fix the spill directory permissions:**

```bash
ps -o user= -p $(pgrep -f "nginx: worker" | head -1)   # find the worker user
chown -R <user>:<user> /var/lib/nginx
chmod -R u+rwX /var/lib/nginx
systemctl reload nginx
```

**Option 2 — raise the buffers so the response never spills to disk.** In the `http` block of `nginx.conf`:

```nginx
fastcgi_buffer_size 256k;
fastcgi_buffers 16 256k;
fastcgi_busy_buffers_size 512k;
```

Then reload nginx.

The same root cause affects any admin endpoint returning a response larger than the configured buffers. If you disabled
a CDN or proxy while debugging, you can re-enable it afterwards — it was not the cause.

## Data Synchronize Import Errors

### Import fails with a file naming mismatch

Delete the `storage/app/data-synchronize` folder and re-run the import.

### "Not a text field" when importing translations

The importer rejects cells that Excel has formatted as numbers. A translation whose value is numeric — `404`, for
example — must be stored as text.

In Excel: right-click the cell → **Format Cells** → **Text** → re-enter the value → save → re-import.

## Missing Security Headers in a Site Audit

Scanners such as Mozilla Observatory and securityheaders.com flag missing security headers.

### What the CMS already sends

Four headers are emitted by the built-in `HttpSecurityHeaders` middleware, **enabled by default**:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

If a scanner reports these as missing, they are being stripped or overridden downstream — check your CDN, reverse
proxy, or a conflicting `add_header` block in your web server config. You can also confirm the toggle is on at
**Admin → Platform Administration → Security Settings**, or that `ENABLE_HTTP_SECURITY_HEADERS` is not set to `false`
in `.env`. See [Security Settings](/cms/security-cookies) for the full reference.

### What you must add yourself

`Strict-Transport-Security`, `Content-Security-Policy`, and `Permissions-Policy` are **not** emitted by the CMS. Add
them at your web server (nginx `add_header`, Apache `Header set`) or at your CDN (Cloudflare → Rules → Transform Rules
→ Modify Response Header):

```nginx
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
```

::: danger Do not add a strict CSP without auditing your own site first
Themes and plugins load inline scripts and styles. A strict `Content-Security-Policy` will break the admin panel and
most frontends unless you tailor it to your specific deployment.
:::

## Session / Login Issues

### Cannot Login — Wrong URL

Botble CMS has two separate login pages:

- **`/admin/login`** — Admin panel login (for site administrators)
- **`/login`** — Customer/member dashboard login (for registered users)

If your credentials are correct but login fails, make sure you are using the right URL. Admin accounts cannot log in at `/login`, and customer accounts cannot log in at `/admin/login`.

### Frequent Logouts

If you are being logged out frequently or cannot stay logged in:

1. Ensure `storage/framework/sessions` is writable.
2. Check your `SESSION_DRIVER` in `.env` — `file` is the default and works on most setups.
3. If using `redis` or `database` driver, ensure the connection is properly configured.
4. Clear browser cookies for your domain and try again.
5. Check that `SESSION_DOMAIN` in `.env` matches your domain (or remove it to use the default).

### Admin Login Redirect Loop (No Error Shown)

#### Symptom

You submit the admin login form and the page reloads back to `/admin/login` with no error message, no success flash, and no entry in `storage/logs/laravel-*.log`. Your credentials are correct, the database is reachable, and nothing in debug mode reveals the problem. The same symptom can block a **fresh install** from completing the first-time admin sign-in.

#### Cause

Your PHP installation has `output_buffering` set to `0` (disabled). Without an output buffer, PHP flushes response headers to the browser before Laravel has a chance to write the `Set-Cookie` header for the new authenticated session. The browser never receives the auth cookie, so on the next request it is treated as unauthenticated and bounced back to the login page.

You can confirm the setting with:

```bash
php -i | grep -E 'output_buffering|zlib.output_compression'
```

Or by creating a file `phpinfo.php` with `<?php phpinfo();` in your web root and checking the **output_buffering** row.

#### Fix

Enable output buffering using **either** of the two options below — one is enough.

**Option 1 — Set `output_buffering`:**

```ini
output_buffering = 4096
```

Any non-zero value works (`On` is also accepted).

**Option 2 — Enable `zlib.output_compression`:**

```ini
zlib.output_compression = On
```

This implicitly enables output buffering and also gzip-compresses responses.

#### Where to apply the change

- **SiteGround** — Site Tools → Devs → PHP Manager → PHP Variables → set `output_buffering` to `4096` (click **CUSTOM**), then Save.
- **cPanel** — Select PHP Version → Options → find `output_buffering` (or `zlib.output_compression`) → change the value → Save. On **LiteSpeed / lsphp** hosts the basic MultiPHP INI editor often exposes only `zlib.output_compression` (not `output_buffering`) — toggling that On is enough, or use the `.htaccess` method below.
- **Plesk** — Websites & Domains → PHP Settings → set `output_buffering` to `4096` → OK.
- **Shared hosting without a PHP settings UI** — add to `.htaccess` in your project root:

  ```apache
  <IfModule LiteSpeed>
  php_value output_buffering 4096
  php_value zlib.output_compression On
  </IfModule>
  ```

  On LiteSpeed this takes effect on the very next request. If your host ignores `.htaccess` PHP values, use a `.user.ini` file in the project root instead (`output_buffering=4096`) — note it is only re-read every `user_ini.cache_ttl` seconds (300 by default), so the change can take a few minutes to apply.

- **VPS / dedicated server with php-fpm** — edit your pool file (for example `/etc/php/8.3/fpm/pool.d/www.conf`):

  ```ini
  php_admin_value[output_buffering] = 4096
  ```

  Then restart php-fpm: `sudo systemctl restart php8.3-fpm`.

After saving the change, clear your browser cookies for the domain and retry the login — you should now stay authenticated.
