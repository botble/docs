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

## Social Login Fails — "InvalidStateException" or "Missing required parameter: code"

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
- **cPanel** — Select PHP Version → Options → find `output_buffering` (or `zlib.output_compression`) → change the value → Save.
- **Plesk** — Websites & Domains → PHP Settings → set `output_buffering` to `4096` → OK.
- **Shared hosting without a PHP settings UI** — add to `.htaccess` in your project root:

  ```apache
  php_value output_buffering 4096
  ```

- **VPS / dedicated server with php-fpm** — edit your pool file (for example `/etc/php/8.3/fpm/pool.d/www.conf`):

  ```ini
  php_admin_value[output_buffering] = 4096
  ```

  Then restart php-fpm: `sudo systemctl restart php8.3-fpm`.

After saving the change, clear your browser cookies for the domain and retry the login — you should now stay authenticated.
