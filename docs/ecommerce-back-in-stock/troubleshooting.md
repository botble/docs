# Troubleshooting

## Notification Form Not Showing on Out-of-Stock Products

If the "Notify Me" form doesn't appear on a product page when the product is out of stock:

1. **Check the plugin is enabled:** Go to **Back in Stock > Settings**, make sure **Enable Back in Stock Notifications** is on.

2. **Confirm the product is actually out of stock:** The form only appears when the product's stock quantity is exactly 0. If it has any quantity remaining, no form is shown.

3. **Clear cache:** Go to **Admin > Platform Administration > Cache management**, click **Clear all CMS cache**. Also try clearing your browser cache (Ctrl+Shift+Delete).

4. **Test in incognito mode:** Open a private browser window and visit the product. This rules out browser cache issues.

5. **Check theme compatibility:** Some themes may need a template override to show the notification form. Verify your active theme supports the back-in-stock form hook.

## Emails Not Being Sent When Product Is Restocked

If subscriptions remain Pending after a product's stock is updated:

1. **Check your queue worker is running:**
   ```bash
   php artisan queue:work
   ```
   Notifications are dispatched as queued jobs. If no worker is running, jobs accumulate in the queue but are never processed.

2. **Check failed jobs:**
   ```bash
   php artisan queue:failed
   ```
   If jobs are failing, inspect the error and retry:
   ```bash
   php artisan queue:retry all
   ```

3. **Check your mail configuration:** Verify your mail driver settings in `.env` (`MAIL_MAILER`, `MAIL_HOST`, `MAIL_PORT`, etc.) are correct. Test by sending a test email from **Admin > Email > Test**.

4. **Check server logs for errors:**
   ```bash
   tail -f storage/logs/laravel.log
   ```

5. **Verify the email template exists:** Go to **Admin > Email Templates** and confirm the `back_in_stock_notification` template is present and not empty.

## Unsubscribe Link Not Working

If customers report that the unsubscribe link shows an error or doesn't cancel their subscription:

1. **Check the token is intact:** Email clients sometimes wrap long URLs and break them. Ask the customer to copy and paste the full URL into the browser.

2. **Check the subscription still exists:** The token corresponds to a specific subscription record. If the subscription was deleted from the admin panel, the unsubscribe link is no longer valid.

3. **Check your `APP_URL` in `.env`:** The unsubscribe URL is generated using `APP_URL`. If this is set incorrectly, the link will point to the wrong domain.

## Subscription Not Created After Form Submission

If a customer submits the form but no subscription appears in the admin list:

1. **Check for validation errors:** The email field is required and must be a valid email format. Phone number format is also validated if provided.

2. **Check for duplicate subscription:** If the customer already has a Pending or Notified subscription for the same product with the same email, a duplicate is not created. Search the subscriptions list for that email address.

3. **Check server logs:**
   ```bash
   tail -f storage/logs/laravel.log
   ```

4. **Check CSRF token issues:** If the form submission fails silently, a CSRF token mismatch may be the cause. Clear cache and reload the product page before retrying.

## Plugin Not Appearing in Admin

1. **Check the folder name** is exactly `ecommerce-back-in-stock` at `platform/plugins/ecommerce-back-in-stock/`

2. **Check the E-commerce plugin** is installed and activated (Back in Stock depends on it)

3. **Clear cache:**
   ```bash
   php artisan cache:clear
   php artisan config:clear
   ```

4. **Check Botble CMS version** is 7.5.0 or higher

## Database Issues

### Verify the table exists

```sql
SHOW TABLES LIKE 'back_in_stock_subscriptions';
```

### Re-run migrations

```bash
php artisan migrate
```

If that doesn't work:

```bash
php artisan migrate:rollback --path=platform/plugins/ecommerce-back-in-stock/database/migrations
php artisan migrate --path=platform/plugins/ecommerce-back-in-stock/database/migrations
```

## Settings Not Saving

1. **Check file permissions:**
   ```bash
   chmod -R 775 storage
   ```

2. **Clear config cache:**
   ```bash
   php artisan config:clear
   ```

3. **Check error logs:**
   ```bash
   tail -f storage/logs/laravel.log
   ```

## Getting Support

Before contacting support, gather:

1. Botble CMS version and Back in Stock plugin version (check at **Admin > Plugins**)
2. PHP version
3. Screenshot of the issue
4. Relevant entries from `storage/logs/laravel.log`
5. Steps to reproduce the issue

**Contact:**
- Support Tickets: [botble.ticksy.com](https://botble.ticksy.com)
- Email: [contact@botble.com](mailto:contact@botble.com)
