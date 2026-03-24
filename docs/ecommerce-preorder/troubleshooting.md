# Troubleshooting

## Preorder Badge Not Showing on Products

If the preorder badge doesn't appear on product cards or the product detail page:

1. **Check the plugin is enabled:** Go to **Preorder > Settings**, make sure **Enable Preorder** is on.

2. **Check the product has an active preorder:** Go to **Preorder > Products**, verify the product is listed with status **Published**.

3. **Clear cache:** Go to **Admin > Platform Administration > Cache management**, click **Clear all CMS cache**. Also try clearing your browser cache (Ctrl+Shift+Delete).

4. **Test in incognito mode:** Open a private browser window and visit the product. This rules out browser cache issues.

## "Cannot Mix Preorder and Regular Items" Error

1. **Check the setting:** Go to **Preorder > Settings**, check if **Allow Mixed Cart** is disabled.

2. **Solution:** Either enable mixed cart, or have the customer complete separate orders for regular and preorder items.

## Preorder Products Not Auto-Disabling

1. **Check cronjob:** Verify your server's cronjob is configured:
   ```bash
   * * * * * cd /path-to-project && php artisan schedule:run >> /dev/null 2>&1
   ```

2. **Check auto-disable is enabled:** Edit the preorder product and verify **Auto-Disable** is toggled on.

3. **Test manually:**
   ```bash
   php artisan preorder:disable-expired
   ```

## Customer Can't See Preorder Dashboard

1. **Check the customer has preorders:** The preorder menu only appears when the customer has at least one preorder order.

2. **Check the plugin is enabled:** **Preorder > Settings > Enable Preorder**

3. **Clear cache:** **Admin > Platform Administration > Cache management**

## Payment Not Linking to Preorder Order

1. **Check payment gateway callbacks:** Verify your payment gateway (Stripe, PayPal) callback URLs are configured correctly.

2. **Check payment records:** Go to **Ecommerce > Payments** and verify the payment completed successfully.

3. **Check server logs:**
   ```bash
   tail -f storage/logs/laravel.log
   ```

4. **Manual fix:** If the payment succeeded but the link failed, manually update the preorder order status.

## Preorder Price Showing Incorrectly in Cart

1. **Check for plugin conflicts:** Other price-modifying plugins (e.g., Wholesale) may interfere. Temporarily disable them to test.

2. **Verify pricing configuration:** Edit the preorder product and check the preorder price, price type, and prepayment amount.

3. **Clear cart:** Empty the cart completely, then re-add the product.

## Vendor Preorder Menu Not Appearing

1. **Check the Marketplace plugin** is active: **Admin > Plugins**
2. **Check Vendor Management** is enabled: **Preorder > Settings**
3. **Clear cache:** **Admin > Platform Administration > Cache management**

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

## Plugin Not Appearing in Admin

1. **Check the folder name** is exactly `ecommerce-preorder` at `platform/plugins/ecommerce-preorder/`

2. **Check the E-commerce plugin** is activated (Preorder depends on it)

3. **Clear cache:**
   ```bash
   php artisan cache:clear
   php artisan config:clear
   ```

4. **Check Botble CMS version** is 7.6.0 or higher

## Database Issues

### Verify tables exist

```sql
SHOW TABLES LIKE 'po_%';
```

Expected tables: `po_preorder_products`, `po_preorder_orders`

### Re-run migrations

```bash
php artisan migrate
```

If that doesn't work:
```bash
php artisan migrate:rollback --path=platform/plugins/ecommerce-preorder/database/migrations
php artisan migrate --path=platform/plugins/ecommerce-preorder/database/migrations
```

## Getting Support

Before contacting support, gather:

1. Botble CMS version and Preorder plugin version (check at **Admin > Plugins**)
2. PHP version
3. Screenshot of the issue
4. Relevant entries from `storage/logs/laravel.log`
5. Steps to reproduce the issue

**Contact:**
- Support Tickets: [botble.ticksy.com](https://botble.ticksy.com)
- Email: [contact@botble.com](mailto:contact@botble.com)
