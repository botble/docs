# Troubleshooting Product Gifts

This guide will help you resolve common issues that may arise when using the Product Gifts plugin.

## Common Issues

### Plugin Not Appearing in Admin

If the Product Gifts plugin doesn't show in the admin panel:

1. **Check File Permissions**:
   ```bash
   chmod -R 755 platform/plugins/ecommerce-product-gifts
   ```

2. **Verify plugin.json**:
   ```bash
   cat platform/plugins/ecommerce-product-gifts/plugin.json
   ```

3. **Clear Cache**:
   ```bash
   php artisan cache:clear
   php artisan config:clear
   ```

4. **Check Core Version**:
   - Verify Botble CMS is version 7.6.4 or higher

### Gift Options Not Appearing in Cart

If customers can't see gift options:

1. **Check Rule Status**:
   - Go to **Ecommerce** > **Product Gifts**
   - Ensure rule status is **Published**

2. **Verify Minimum Value**:
   - Check cart subtotal vs rule minimum
   - Cart must meet or exceed minimum

3. **Check Targeting**:
   - If "Specific Products" - cart must contain listed products
   - If "Specific Categories" - cart must contain products from listed categories

4. **Verify Dates**:
   - Check Start Date hasn't passed
   - Check End Date hasn't expired

5. **Check Gift Product Stock**:
   - Ensure gift products are in stock
   - Zero-stock gifts are automatically hidden

6. **Clear Cache**:
   ```bash
   php artisan cache:clear
   ```

### Gift Not Appearing at Checkout

If gifts show in cart but not checkout:

1. **Verify Cart-to-Checkout Sync**:
   - Check browser console for JavaScript errors
   - Ensure page loads completely

2. **Check Cookie Settings**:
   - Ensure cookies are enabled
   - Clear cookies and try again

3. **Test in Incognito Mode**:
   - Rule out browser extension issues
   - Rule out cached data issues

4. **Review Theme Integration**:
   - Some themes may need hooks added
   - Contact support if theme-specific

### Gift Selection Not Saving

If customer selections don't persist:

1. **Cookie Issues**:
   - Verify browser accepts cookies
   - Check cookie settings in browser
   - Cookie name: `product_gift_selections`

2. **JavaScript Errors**:
   - Open browser developer tools (F12)
   - Check Console tab for errors
   - Fix any reported issues

3. **CSRF Token**:
   - Verify meta tag exists: `<meta name="csrf-token">`
   - Check session hasn't expired

4. **Clear Browser Cache**:
   - Hard refresh: Ctrl+Shift+R
   - Clear all site data

### Gift Not Included in Order

If gifts appear in cart/checkout but not in final order:

1. **Check Order Processing**:
   - Review order creation logs
   - Verify hooks are firing

2. **Verify Cart State**:
   - Gift should be in cart before order creation
   - Check cart items during checkout

3. **Review Logs**:
   - Check `storage/logs/laravel.log` for errors
   - Look for gift-related exceptions

### Wrong Gift Appearing

If the wrong gift shows up:

1. **Multiple Rules**:
   - Check if multiple rules match the cart
   - Review rule priorities and targeting

2. **Recently Edited Rules**:
   - Changes take effect immediately
   - Clear cache after editing

3. **Cookie Persistence**:
   - Old selections may persist in cookies
   - Clear cookies to reset

## Settings Issues

### Settings Not Saving

1. **Check Permissions**:
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
   - Check `settings` table for entries

4. **Review Error Logs**:
   - Check `storage/logs/laravel.log`

### Style Changes Not Appearing

1. **Clear Browser Cache**:
   - Ctrl+Shift+Delete
   - Clear cached images and files

2. **Clear CMS Cache**:
   - Admin > Platform Administration > Cache
   - Click "Clear all CMS cache"

3. **Check CSS Conflicts**:
   - Theme CSS may override plugin styles
   - Use browser inspector to debug

## Database Issues

### Migration Errors

If you encounter migration errors:

```bash
# Rollback migrations
php artisan migrate:rollback --path=platform/plugins/ecommerce-product-gifts/database/migrations

# Re-run migrations
php artisan migrate --path=platform/plugins/ecommerce-product-gifts/database/migrations
```

### Verify Tables Exist

```sql
SHOW TABLES LIKE 'ec_product_gift%';
```

Expected tables:
- `ec_product_gift_rules`
- `ec_product_gift_rule_items`
- `ec_product_gift_rule_products`
- `ec_product_gift_rule_categories`

### Data Integrity Check

```sql
-- Check rules
SELECT * FROM ec_product_gift_rules WHERE status = 'published';

-- Check items
SELECT ri.*, p.name as product_name
FROM ec_product_gift_rule_items ri
JOIN ec_products p ON ri.product_id = p.id;
```

## Performance Issues

### Slow Cart/Checkout

1. **Add Database Indexes**:
   ```sql
   CREATE INDEX idx_gift_rules_status ON ec_product_gift_rules(status);
   CREATE INDEX idx_gift_rules_dates ON ec_product_gift_rules(start_date, end_date);
   ```

2. **Enable Caching**:
   - Configure Redis or Memcached
   - Ensure cache driver is set

3. **Optimize Rules**:
   - Remove unused rules
   - Archive old promotions

### High Database Queries

1. **Check Query Count**:
   - Use Laravel Debugbar
   - Monitor N+1 query issues

2. **Review Eager Loading**:
   - Rules load items and products together
   - Should minimize additional queries

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
   - Check `/product-gifts/select` endpoint

2. **Common Network Issues**:
   - 403 - CSRF token invalid
   - 404 - Route not found
   - 500 - Server error (check logs)

### Testing Without Cache

```javascript
// In browser console, check if selector initializes
document.querySelector('.checkout-gift-selector')
document.querySelector('[data-gift-selector]')
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
- "gift" or "product-gift" mentions
- Stack traces
- Timestamp correlation with issue

### Testing Gift Selection API

```bash
# Test selection endpoint (adjust CSRF token)
curl -X POST /product-gifts/select \
  -H "Content-Type: application/json" \
  -H "X-CSRF-TOKEN: your-token" \
  -d '{"tier_id": 1, "product_id": 123}'
```

### Resetting Gift Selections

```php
// In tinker or custom command
use Botble\Ecommerce\Facades\Cart;

$cart = Cart::instance('cart');
foreach ($cart->rawContent() as $rowId => $item) {
    if (!empty($item->options['is_gift'])) {
        $cart->remove($rowId);
    }
}
```

## Error Messages

### "Gift rule not found"

**Cause**: Rule ID doesn't exist or was deleted

**Solution**:
- Verify rule exists in admin
- Clear cookies to reset selection
- Check for recently deleted rules

### "Product not available for this gift"

**Cause**: Selected product not in rule's gift list

**Solutions**:
- Verify product is in rule's gift items
- Product may have been removed
- Rule may have changed

### "Minimum order value not met"

**Cause**: Cart total below rule's minimum

**Solutions**:
- Add more items to cart
- Check if discounts reduced total
- Verify minimum value setting

### "Gift product out of stock"

**Cause**: Gift product has zero inventory

**Solutions**:
- Restock the gift product
- Choose a different gift option
- Admin: add alternative gift products

## Getting Support

### Before Contacting Support

1. Review this troubleshooting guide
2. Check the [FAQ](/product-gifts/faq)
3. Gather relevant error messages and logs

### Information to Provide

1. **Environment Details**:
   - Botble CMS version
   - PHP version
   - Product Gifts plugin version
   - Browser and version
   - Theme name

2. **Issue Description**:
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior

3. **Screenshots/Logs**:
   - Screenshots of error messages
   - Relevant log entries
   - Browser console errors

### Contact Methods

- **Documentation**: [https://docs.botble.com/product-gifts](https://docs.botble.com/product-gifts)
- **Support Tickets**: [https://botble.ticksy.com](https://botble.ticksy.com)
- **Email**: [contact@botble.com](mailto:contact@botble.com)

We typically respond within 12-24 hours during business days.
