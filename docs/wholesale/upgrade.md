# How to Update Wholesale

This guide shows you how to update Wholesale to the newest version.

## Before You Update

::: warning Make a Backup First!
Always save a copy of your website before updating. Ask your hosting provider if you need help.
:::

## Easy Update (Recommended)

If you bought the plugin and activated your license:

1. Go to **Admin** → **Plugins**
2. Find **Wholesale** in the list
3. Click the **Update** button
4. Wait for it to finish
5. Go to **Admin** → **Platform Administration** → **Cache management**
6. Click **Clear all CMS cache**

That's it! You're done.

## Manual Update

If automatic update doesn't work:

1. **Download** the latest version from CodeCanyon
2. **Extract** the zip file
3. **Upload** and replace files in `platform/plugins/ecommerce-wholesale/`
4. **Run migrations**:
   ```bash
   php artisan migrate
   ```
5. **Publish assets**:
   ```bash
   php artisan vendor:publish --tag=cms-public --force
   ```
6. **Clear cache**:
   ```bash
   php artisan cache:clear
   php artisan config:clear
   php artisan view:clear
   ```

## After Updating

### Quick Check

Make sure everything still works:

| Check This | How to Test |
|------------|-------------|
| Admin panel | Go to Ecommerce > Wholesale - does it load? |
| Customer groups | Can you see and edit existing groups? |
| Pricing rules | Can you access pricing rules? |
| Settings | Can you access the settings page? |
| Frontend | View product as wholesale customer - do prices show? |

### Test Wholesale Flow

If you want to be extra sure:

1. Log in as wholesale customer
2. View product page
3. Verify pricing table appears
4. Add product to cart (meet MOQ)
5. Verify wholesale price in cart
6. Proceed to checkout
7. Complete a test order
8. Verify pricing in order

### Test Different Scenarios

| Scenario | What to Check |
|----------|---------------|
| Group discounts | Prices reflect correct percentage/amount |
| Tiered pricing | Quantity breaks apply correctly |
| MOQ enforcement | Invalid quantities are rejected |
| Product visibility | Wholesale-only products properly hidden/shown |
| Multiple groups | Conflict resolution works as configured |

## Having Problems?

### Page looks broken or old

Clear the cache:
1. Go to **Admin** → **Platform Administration** → **Cache management**
2. Click **Clear all CMS cache**
3. Also clear your browser cache (Ctrl+Shift+Delete)

### Wholesale prices not showing after update

1. Clear all caches (admin + browser)
2. Check customer group status is "Published"
3. Check pricing rule status is "Published"
4. Verify customer is assigned to group
5. Test in incognito mode
6. Check browser console for errors

### Database errors

If you see migration errors:

```bash
# Run migrations manually
php artisan migrate

# If that fails, try:
php artisan migrate:status

# Force migrations if needed (careful!)
php artisan migrate --force
```

### Assets not loading

If styles look wrong:

```bash
# Re-publish assets
php artisan vendor:publish --tag=cms-public --force

# Clear view cache
php artisan view:clear
```

### MOQ not working

1. Clear all caches
2. Verify MOQ settings saved correctly
3. Check customer group assignment
4. Test with different products
5. Check browser console for JavaScript errors

### Something not working

1. Check our [Troubleshooting Guide](/wholesale/troubleshooting)
2. See if there are known issues in [Release Notes](/wholesale/releases)
3. Contact support if you need help

### Need to go back to old version

If the update caused problems and you have a backup:
1. Contact your hosting provider or developer
2. They can restore from your backup

## Version Compatibility

| Plugin Version | Minimum Botble Version |
|----------------|----------------------|
| 1.0.x | 7.6.0 |

## Checking Your Version

To find your current version:

1. Go to **Admin** → **Plugins**
2. Find **Wholesale** in the list
3. Version number is shown next to the plugin name

Or check the file:
```bash
cat platform/plugins/ecommerce-wholesale/plugin.json
```

## Update Tips

### Before Major Updates

1. **Full backup** of database and files
2. **Test on staging** if possible
3. **Read release notes** for breaking changes
4. **Schedule downtime** if needed
5. **Notify wholesale customers** if affecting prices

### After Updates

1. **Test thoroughly** before announcing to customers
2. **Monitor error logs** for 24 hours
3. **Check customer feedback** for issues
4. **Verify pricing accuracy** on key products
5. **Test checkout flow** completely

### Maintaining Customizations

If you've customized the plugin:

1. **Note all customizations** before updating
2. **Compare files** after update
3. **Reapply customizations** carefully
4. **Consider using theme overrides** instead of direct edits

## Data Migration Notes

### Upgrading from Beta

If upgrading from a beta or development version:

1. Export customer group assignments
2. Note all pricing rules
3. Backup MOQ settings
4. Run fresh migration
5. Re-import data carefully
6. Verify all assignments

### Preserving Customer Groups

Customer groups and assignments are preserved during updates:
- Group settings maintained
- Customer assignments kept
- Pricing rules preserved
- MOQ settings retained

::: tip Safe Migration
The plugin uses standard Laravel migrations that are designed to preserve existing data.
:::

## Getting Help

If you're stuck, contact support with:

- Your Wholesale version number
- Your Botble CMS version
- What's not working
- Any error messages you see
- Screenshot of the problem (if possible)

## Related

- [Release Notes](/wholesale/releases) - See what changed
- [Troubleshooting](/wholesale/troubleshooting) - Fix common problems
- [FAQ](/wholesale/faq) - Common questions
