# Troubleshooting Wholesale

This guide will help you resolve common issues that may arise when using the Wholesale plugin.

## Common Issues

### Plugin Not Appearing in Admin

If the Wholesale plugin doesn't show in the admin panel:

1. **Check File Permissions**:
   ```bash
   chmod -R 755 platform/plugins/ecommerce-wholesale
   ```

2. **Verify plugin.json**:
   ```bash
   cat platform/plugins/ecommerce-wholesale/plugin.json
   ```

3. **Clear Cache**:
   ```bash
   php artisan cache:clear
   php artisan config:clear
   ```

4. **Check Core Version**:
   - Verify Botble CMS is version 7.6.0 or higher

### Wholesale Prices Not Showing

If wholesale customers can't see special pricing:

1. **Check Customer Group Assignment**:
   - Go to **Customers** in admin
   - Edit customer account
   - Verify group assignment exists
   - Check expiration date (if set)

2. **Verify Group Status**:
   - Go to **Ecommerce** > **Wholesale** > **Customer Groups**
   - Ensure group status is **Published**

3. **Check Customer Login**:
   - Customer must be logged in
   - Test with correct credentials
   - Check session isn't expired

4. **Verify Pricing Rules** (if using tiered pricing):
   - Go to **Ecommerce** > **Wholesale** > **Pricing Rules**
   - Ensure rules are **Published**
   - Check quantity ranges are correct

5. **Clear All Caches**:
   ```bash
   php artisan cache:clear
   php artisan config:clear
   php artisan view:clear
   ```

6. **Test in Incognito Mode**:
   - Rule out browser cache issues
   - Rule out cookie problems

### Pricing Table Not Displaying on Product Page

If the pricing table doesn't appear:

1. **Check Product Visibility**:
   - Edit product in admin
   - Verify visibility allows wholesale customers
   - Check group access restrictions

2. **Verify Pricing Rules Exist**:
   - Product must have active pricing rules
   - Rules must be for correct customer group
   - Status must be "Published"

3. **Check Hook Integration**:
   - Theme must support `ecommerce_after_product_description` filter
   - Most Botble themes support this by default

4. **Check JavaScript**:
   - Open browser console (F12)
   - Look for JavaScript errors
   - Ensure jQuery is loaded

5. **Clear Browser Cache**:
   - Hard refresh: Ctrl+Shift+R
   - Clear all site data

### MOQ Not Being Enforced

If minimum order quantities aren't working:

1. **Verify MOQ Settings**:
   - Edit product in admin
   - Check "Wholesale Settings" tab
   - Ensure MOQ values are set

2. **Check Customer Group Match**:
   - MOQ can be group-specific
   - Verify customer is in correct group
   - Test with "All Wholesale" MOQ

3. **Clear Cart**:
   - Empty cart completely
   - Try adding product fresh

4. **Check JavaScript Console**:
   - Open developer tools (F12)
   - Look for validation errors
   - Check for AJAX request failures

5. **Test Quantity Increment**:
   - Try valid quantities (multiples)
   - Verify system adjusts invalid amounts

### Wrong Discount Applied

If customers get incorrect discounts:

1. **Multiple Groups Conflict**:
   - Check customer's group assignments
   - Review discount resolution strategy in settings
   - Verify group priorities

2. **Overlapping Pricing Rules**:
   - Check for multiple rules on same product
   - Ensure quantity ranges don't overlap
   - Review rule priorities

3. **Cache Issues**:
   - Clear all caches (server and browser)
   - Log out and log back in
   - Test in incognito mode

4. **Price Calculation**:
   - Verify discount type is correct
   - Check discount value
   - Test calculation manually

### Product Visibility Issues

If products aren't showing/hiding correctly:

1. **Check Visibility Setting**:
   - Edit product in admin
   - Verify visibility option selected
   - Save product

2. **Verify Customer Status**:
   - Customer must be approved wholesale customer
   - Must be logged in
   - Group must be active

3. **Check Group Access**:
   - If group access is set, verify customer is in allowed groups
   - Empty group access = all wholesale customers

4. **Clear Caches**:
   - Clear server cache
   - Clear browser cache
   - Test in incognito

### Wholesale Application Issues

If applications aren't working:

1. **Check Settings**:
   - Verify wholesale system is enabled
   - Check approval requirements setting
   - Confirm registration form is accessible

2. **Test Form Submission**:
   - Fill out form completely
   - Check for validation errors
   - Verify CSRF token exists

3. **Check Email Configuration**:
   - Verify email settings in `.env`
   - Test email sending with any order
   - Check spam folder

4. **Review in Admin**:
   - Go to **Ecommerce** > **Wholesale** > **Applications**
   - Check if application was recorded
   - Look for error messages

5. **Check Permissions**:
   - Verify user has permission to view applications
   - Check approval permissions

## Settings Issues

### Settings Not Saving

1. **Check File Permissions**:
   ```bash
   chmod -R 775 storage
   chown -R www-data:www-data storage
   ```

2. **Clear Config Cache**:
   ```bash
   php artisan config:clear
   ```

3. **Check Database**:
   - Verify database connection
   - Check `settings` table exists
   - Look for constraint errors

4. **Review Error Logs**:
   - Check `storage/logs/laravel.log`
   - Look for save failures

### Display Style Not Changing

1. **Clear All Caches**:
   - Server cache: `php artisan cache:clear`
   - View cache: `php artisan view:clear`
   - Browser cache: Ctrl+Shift+Delete

2. **Check CSS Conflicts**:
   - Theme CSS may override plugin styles
   - Use browser inspector to debug
   - Check CSS specificity

3. **Verify Asset Publishing**:
   ```bash
   php artisan vendor:publish --tag=cms-public --force
   ```

## Database Issues

### Migration Errors

If you encounter migration errors:

```bash
# Rollback wholesale migrations
php artisan migrate:rollback --path=platform/plugins/ecommerce-wholesale/database/migrations

# Re-run migrations
php artisan migrate --path=platform/plugins/ecommerce-wholesale/database/migrations
```

### Verify Tables Exist

```sql
SHOW TABLES LIKE 'ws_%';
```

Expected tables:
- `ws_customer_groups`
- `ws_customer_group_assignments`
- `ws_group_pricing_rules`
- `ws_product_moq`
- `ws_product_visibility`
- `ws_product_group_access`
- `ws_wholesale_applications`

### Data Integrity Check

```sql
-- Check customer groups
SELECT * FROM ws_customer_groups WHERE status = 'published';

-- Check pricing rules
SELECT pr.*, p.name as product_name, cg.name as group_name
FROM ws_group_pricing_rules pr
JOIN ec_products p ON pr.product_id = p.id
JOIN ws_customer_groups cg ON pr.customer_group_id = cg.id
WHERE pr.status = 'published';

-- Check customer assignments
SELECT ca.*, c.name as customer_name, cg.name as group_name
FROM ws_customer_group_assignments ca
JOIN ec_customers c ON ca.customer_id = c.id
JOIN ws_customer_groups cg ON ca.customer_group_id = cg.id;
```

## Performance Issues

### Slow Product Pages

1. **Add Database Indexes**:
   ```sql
   CREATE INDEX idx_pricing_product_group ON ws_group_pricing_rules(product_id, customer_group_id);
   CREATE INDEX idx_moq_product_group ON ws_product_moq(product_id, customer_group_id);
   CREATE INDEX idx_visibility_product ON ws_product_visibility(product_id);
   ```

2. **Enable Caching**:
   - Configure Redis or Memcached
   - Set cache driver in `.env`
   - Enable query caching

3. **Optimize Rules**:
   - Remove unused pricing rules
   - Archive old customer groups
   - Clean up expired assignments

### High Database Queries

1. **Check Query Count**:
   - Use Laravel Debugbar
   - Monitor N+1 query issues
   - Review eager loading

2. **Enable Query Caching**:
   - Cache pricing rules per product
   - Cache customer group assignments
   - Use Redis for session storage

## JavaScript Debugging

### Finding Console Errors

1. **Open Developer Tools**:
   - Press F12 or right-click > Inspect
   - Go to Console tab

2. **Common Errors**:
   - `TypeError` - Missing element or method
   - `ReferenceError` - Undefined variable
   - `SyntaxError` - Malformed code

### Network Issues

1. **Check Network Tab**:
   - Look for failed requests (red)
   - Check API endpoints
   - Verify response codes

2. **Common Network Issues**:
   - 403 - CSRF token invalid
   - 404 - Route not found
   - 422 - Validation error
   - 500 - Server error (check logs)

### Testing Without Cache

```javascript
// In browser console, check elements
document.querySelector('.wholesale-pricing-table')
document.querySelector('[data-moq]')
```

## Advanced Troubleshooting

### Clearing All Caches

```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

Or via admin panel:
1. Go to **Admin** > **Platform Administration** > **Cache management**
2. Click "Clear all CMS cache"

### Checking Logs

Review Laravel logs for errors:

```bash
tail -f storage/logs/laravel.log
```

Look for:
- "wholesale" or "ws_" mentions
- Stack traces
- Timestamp correlation with issue

### Testing Discount Calculation

```php
// In tinker: php artisan tinker
$group = \Botble\EcommerceWholesale\Models\CustomerGroup::find(1);
$originalPrice = 100;
$discount = $group->calculateDiscount($originalPrice);
$finalPrice = $group->calculateFinalPrice($originalPrice);
echo "Original: $originalPrice, Discount: $discount, Final: $finalPrice";
```

### Testing MOQ Validation

```php
// In tinker
$moq = \Botble\EcommerceWholesale\Models\ProductMOQ::where('product_id', 1)->first();
$quantity = 15;
$isValid = $moq->isValidQuantity($quantity);
$nextValid = $moq->getNextValidQuantity($quantity);
echo "Quantity: $quantity, Valid: " . ($isValid ? 'Yes' : 'No') . ", Next Valid: $nextValid";
```

### Resetting Customer Groups

```php
// In tinker - CAUTION: This removes all group assignments
\Botble\EcommerceWholesale\Models\CustomerGroupAssignment::truncate();
```

## Error Messages

### "Customer group not found"

**Cause**: Group ID doesn't exist or was deleted

**Solution**:
- Verify group exists in admin
- Check customer's group assignments
- Re-assign customer if needed

### "Minimum order quantity not met"

**Cause**: Cart quantity below MOQ

**Solutions**:
- Increase quantity to meet minimum
- Check MOQ setting is correct
- Verify customer group matches

### "Minimum order value not met"

**Cause**: Cart total below group's minimum

**Solutions**:
- Add more items to cart
- Check if discounts reduced total
- Verify minimum value setting

### "Product not available for your customer group"

**Cause**: Product restricted to different groups

**Solutions**:
- Check product group access settings
- Verify customer's group assignments
- Contact admin to request access

## Getting Support

### Before Contacting Support

1. Review this troubleshooting guide
2. Check the [FAQ](/wholesale/faq)
3. Gather relevant error messages and logs

### Information to Provide

1. **Environment Details**:
   - Botble CMS version
   - PHP version
   - Wholesale plugin version
   - Browser and version
   - Theme name

2. **Issue Description**:
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior

3. **Screenshots/Logs**:
   - Screenshots of error messages
   - Relevant log entries from `storage/logs/laravel.log`
   - Browser console errors
   - Database query errors

### Contact Methods

- **Documentation**: [https://docs.botble.com/wholesale](https://docs.botble.com/wholesale)
- **Support Tickets**: [https://botble.ticksy.com](https://botble.ticksy.com)
- **Email**: [contact@botble.com](mailto:contact@botble.com)

We typically respond within 12-24 hours during business days.
