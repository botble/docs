# How to Update Product Gifts

This guide shows you how to update Product Gifts to the newest version.

## Before You Update

::: warning Make a Backup First!
Always save a copy of your website before updating. Ask your hosting provider if you need help.
:::

## Easy Update (Recommended)

If you bought the plugin and activated your license:

1. Go to **Admin** → **Plugins**
2. Find **Product Gifts** in the list
3. Click the **Update** button
4. Wait for it to finish
5. Go to **Admin** → **Platform Administration** → **Cache management**
6. Click **Clear all CMS cache**

That's it! You're done.

## Manual Update

If automatic update doesn't work:

1. **Download** the latest version from CodeCanyon
2. **Extract** the zip file
3. **Upload** and replace files in `platform/plugins/ecommerce-product-gifts/`
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
| Admin panel | Go to Ecommerce > Product Gifts - does it load? |
| Gift rules | Can you see and edit existing rules? |
| Settings | Can you access the settings page? |
| Frontend | Add products to cart - do gifts appear? |

### Test Gift Flow

If you want to be extra sure:

1. Add products to cart (meet minimum value)
2. Verify gift options appear
3. Select a gift
4. Proceed to checkout
5. Confirm gift shows at checkout
6. Complete a test order
7. Verify gift is in the order

### Test Different Scenarios

| Scenario | What to Check |
|----------|---------------|
| Below minimum | Gifts should NOT appear |
| At minimum | Gifts SHOULD appear |
| Multiple tiers | Multiple gift sections should show |
| Product targeting | Gifts only show with targeted products |

## Having Problems?

### Page looks broken or old

Clear the cache:
1. Go to **Admin** → **Platform Administration** → **Cache management**
2. Click **Clear all CMS cache**
3. Also clear your browser cache (Ctrl+Shift+Delete)

### Gifts not appearing after update

1. Clear all caches (admin + browser)
2. Check rule status is "Published"
3. Verify dates are valid
4. Test in incognito mode
5. Check browser console for errors

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

### Something not working

1. Check our [Troubleshooting Guide](/product-gifts/troubleshooting)
2. See if there are known issues in [Release Notes](/product-gifts/releases)
3. Contact support if you need help

### Need to go back to old version

If the update caused problems and you have a backup:
1. Contact your hosting provider or developer
2. They can restore from your backup

## Version Compatibility

| Plugin Version | Minimum Botble Version |
|----------------|----------------------|
| 1.0.x | 7.6.4 |

## Checking Your Version

To find your current version:

1. Go to **Admin** → **Plugins**
2. Find **Product Gifts** in the list
3. Version number is shown next to the plugin name

Or check the file:
```bash
cat platform/plugins/ecommerce-product-gifts/plugin.json
```

## Update Tips

### Before Major Updates

1. **Full backup** of database and files
2. **Test on staging** if possible
3. **Read release notes** for breaking changes
4. **Schedule downtime** if needed

### After Updates

1. **Test thoroughly** before announcing to customers
2. **Monitor error logs** for 24 hours
3. **Check customer feedback** for issues
4. **Document any custom changes** that may need reapplication

### Maintaining Customizations

If you've customized the plugin:

1. **Note all customizations** before updating
2. **Compare files** after update
3. **Reapply customizations** carefully
4. **Consider using theme overrides** instead of direct edits

## Getting Help

If you're stuck, contact support with:

- Your Product Gifts version number
- Your Botble CMS version
- What's not working
- Any error messages you see
- Screenshot of the problem (if possible)

## Related

- [Release Notes](/product-gifts/releases) - See what changed
- [Troubleshooting](/product-gifts/troubleshooting) - Fix common problems
- [FAQ](/product-gifts/faq) - Common questions
