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

## DELETE Method Not Allowed

Some shared hosting providers disable the `DELETE` HTTP method. If you cannot delete items:

- Contact your hosting provider to enable the `DELETE` method.
- Reference: [How to enable DELETE method](https://stackoverflow.com/questions/37484888).

## System Updater Errors

If you encounter errors during the automatic update process:

### HTTP 504 Gateway Timeout

The server timed out while downloading the update files. This usually happens due to slow server connection or low PHP timeout limits.

### Invalid or Uninitialized Zip Object

The update file download was incomplete or corrupted, resulting in an invalid zip file.

### Solution

For both errors above, use the [manual update](/cms/upgrade#manual-update) method instead:

1. Download the latest version from CodeCanyon.
2. Extract the zip file.
3. Upload and overwrite files on your server using File Manager or FTP.
4. Go to **Admin → Platform Administration → System Updater** and run steps 3–6 (database migration, publish assets, etc.).

::: tip
If the issue persists, try increasing your PHP `max_execution_time` and `memory_limit` values in your hosting configuration.
:::

## Session / Login Issues

If you are being logged out frequently or cannot stay logged in:

1. Ensure `storage/framework/sessions` is writable.
2. Check your `SESSION_DRIVER` in `.env` — `file` is the default and works on most setups.
3. If using `redis` or `database` driver, ensure the connection is properly configured.
4. Clear browser cookies for your domain and try again.
5. Check that `SESSION_DOMAIN` in `.env` matches your domain (or remove it to use the default).
