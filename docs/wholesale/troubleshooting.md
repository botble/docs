# Troubleshooting

## Wholesale Prices Not Showing

If wholesale customers can't see discounted prices:

1. **Check the customer is in a group:** Go to **Ecommerce > Customers**, edit the customer, check the **Wholesale Groups** field has a group selected.

2. **Check the group is Published:** Go to **Wholesale > Customer Groups**, make sure the group's status is **Published** (not Draft).

3. **Check the customer is logged in:** Wholesale prices only show to logged-in customers (unless guest pricing is enabled in settings).

4. **Clear cache:** Go to **Admin > Platform Administration > Cache management**, click **Clear all CMS cache**. Also try clearing your browser cache (Ctrl+Shift+Delete).

5. **Test in incognito mode:** Open a private browser window, log in as the customer, and check. This rules out browser cache issues.

## Pricing Table Not Showing on Product Page

1. **Check the setting:** Go to **Wholesale > Settings > Display Options**, make sure **Show Pricing Table** is enabled.

2. **Check the product has pricing rules:** The table only shows when a product has at least one active pricing rule. Go to the product edit page and check the **Wholesale** section for rules.

3. **Check rule status:** All pricing rules must be **Published** to appear.

4. **Check customer group:** If the rule targets a specific customer group, verify the customer is in that group.

## Wrong Discount Applied

1. **Multiple groups:** If the customer is in multiple groups, the [discount resolution strategy](/wholesale/configuration#discount-resolution-strategy) determines which discount applies. Check: **Wholesale > Settings > Discount Resolution Strategy**.

2. **Pricing rule overrides:** A pricing rule may give a different discount than the group discount. The system picks the better deal for the customer. Check: edit the product, look at the **Wholesale** section for pricing rules.

3. **Check the math:** For percentage discounts, the discount is off the retail price. For fixed amount, it's a flat reduction. For fixed price, it replaces the price entirely.

## MOQ Not Being Enforced

1. **Check MOQ is set:** Edit the product, scroll to the **Wholesale** section. Verify **Minimum Quantity** and **Quantity Increment** are set.

2. **Clear cart:** Empty the cart completely, then try adding the product fresh.

3. **Check browser console:** Press F12, go to the Console tab, look for JavaScript errors that might prevent MOQ validation.

## Product Visibility Not Working

If a "Wholesale Only" product is visible to non-wholesale customers, or not visible to wholesale customers:

1. **Check the product's visibility setting:** Edit the product, scroll to **Wholesale** section, check **Visibility Type**.

2. **For "Specific Groups" visibility:** Make sure the correct groups are selected in **Allowed Customer Groups**.

3. **Check the customer's group:** **Ecommerce > Customers > Edit customer > Wholesale Groups**.

4. **Clear cache:** Cache can cause visibility to not update immediately.

## Wholesale Application Issues

### Applications not appearing in admin

1. Check wholesale is enabled: **Wholesale > Settings > Enable Wholesale**
2. Check registration is enabled: **Wholesale > Settings > Enable Wholesale Registration**
3. Check the database has the application: the form at `/wholesale/register` should submit successfully

### Customer didn't receive approval email

1. Check email settings are configured in your `.env` file
2. Test email sending by creating a test order
3. Check the customer's spam folder
4. Check **Admin > Platform Administration > Email logs** (if email logging is enabled)

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

1. **Check the folder name** is exactly `ecommerce-wholesale` at `platform/plugins/ecommerce-wholesale/`

2. **Check the E-commerce plugin** is activated (Wholesale depends on it)

3. **Clear cache:**
   ```bash
   php artisan cache:clear
   php artisan config:clear
   ```

4. **Check Botble CMS version** is 7.6.0 or higher

## Display Style Not Changing

1. **Clear all caches:** Admin cache + browser cache
2. **Re-publish assets:**
   ```bash
   php artisan vendor:publish --tag=cms-public --force
   ```
3. **Check for theme CSS conflicts:** Your theme's CSS may override the pricing table styles. Use browser inspector (F12) to debug.

## Database Issues

### Verify tables exist

```sql
SHOW TABLES LIKE 'ws_%';
```

Expected tables: `ws_customer_groups`, `ws_customer_group_assignments`, `ws_group_pricing_rules`, `ws_product_moq`, `ws_product_visibility`, `ws_product_group_access`, `ws_wholesale_applications`

### Re-run migrations

```bash
php artisan migrate
```

If that doesn't work:
```bash
php artisan migrate:rollback --path=platform/plugins/ecommerce-wholesale/database/migrations
php artisan migrate --path=platform/plugins/ecommerce-wholesale/database/migrations
```

## Performance Issues

If product pages load slowly:

1. **Enable caching** - Configure Redis or Memcached in your `.env` file
2. **Remove unused pricing rules** - Old or draft rules still get queried
3. **Clean up expired assignments** - Expired group assignments add database queries

## Advanced: Testing in Tinker

### Test discount calculation

```bash
php artisan tinker
```

```php
$group = \Botble\EcommerceWholesale\Models\CustomerGroup::find(1);
echo "Discount: " . $group->calculateDiscount(100);
echo "Final price: " . $group->calculateFinalPrice(100);
```

### Test MOQ validation

```php
$moq = \Botble\EcommerceWholesale\Models\ProductMOQ::where('product_id', 1)->first();
echo "Is 15 valid? " . ($moq->isValidQuantity(15) ? 'Yes' : 'No');
echo "Next valid: " . $moq->getNextValidQuantity(15);
```

## Getting Support

Before contacting support, gather:

1. Botble CMS version and Wholesale plugin version (check at **Admin > Plugins**)
2. PHP version
3. Screenshot of the issue
4. Relevant entries from `storage/logs/laravel.log`
5. Steps to reproduce the issue

**Contact:**
- Support Tickets: [botble.ticksy.com](https://botble.ticksy.com)
- Email: [contact@botble.com](mailto:contact@botble.com)
