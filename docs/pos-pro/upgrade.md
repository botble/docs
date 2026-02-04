# Upgrading POS Pro

This guide explains how to upgrade your POS Pro plugin to the latest version.

## Before You Begin

Before upgrading, we recommend:

1. **Backup your database**: Create a full backup of your database
2. **Backup your files**: Copy the `/platform/plugins/pos-pro` directory
3. **Check compatibility**: Verify the new version is compatible with your Botble CMS version
4. **Review release notes**: Check the [changelog](releases.md) for breaking changes

## Upgrade Process

### Method 1: Standard Upgrade

1. Download the latest version from [CodeCanyon downloads page](https://codecanyon.net/downloads)
2. Extract the downloaded zip file
3. Replace the entire `/platform/plugins/pos-pro` folder with the new version
4. Run database migrations:
   ```bash
   php artisan migrate
   ```
5. Clear all caches:
   ```bash
   php artisan cache:clear
   php artisan config:clear
   php artisan view:clear
   ```
6. Rebuild assets (if needed):
   ```bash
   npm run build
   php artisan cms:publish:assets
   ```

### Method 2: Admin Panel Upgrade

1. Download the latest version from [CodeCanyon downloads page](https://codecanyon.net/downloads)
2. Go to **Admin** > **Plugins** > **Add New**
3. Upload the zip file
4. The system will detect an existing installation and offer to upgrade
5. Clear cache from **Admin** > **Platform Administration** > **Cache Management**

### Method 3: Manual Upgrade (Advanced)

If you've made custom modifications:

1. Download the latest version
2. Extract and compare files with your modified version
3. Merge your custom changes carefully
4. Replace the `/platform/plugins/pos-pro` folder
5. Run migrations and clear caches as above

::: warning
Custom modifications may be lost during upgrades. Consider using hooks and events instead of modifying plugin files directly.
:::

## Post-Upgrade Steps

After upgrading:

1. **Clear Browser Cache**: Hard refresh (Ctrl+Shift+R) on POS pages
2. **Test POS Functions**:
   - Open the POS interface
   - Add a product to cart
   - Complete a test transaction
   - Test receipt printing
3. **Verify Settings**: Check POS settings are preserved
4. **Test Integrations**: If using Stripe Terminal or other integrations, verify they work

## Database Migrations

Some upgrades include database changes. Always run:

```bash
php artisan migrate
```

If you encounter migration errors:

1. Check the error message
2. Verify database connection
3. Ensure you have database write permissions
4. Contact support if issues persist

## Troubleshooting

### Assets Not Loading

If CSS/JS doesn't load after upgrade:

```bash
npm run build
php artisan cms:publish:assets
php artisan cache:clear
```

### Features Missing

If features seem missing:

1. Check the plugin is activated
2. Verify user permissions
3. Review settings - some may reset

### Interface Looks Wrong

If the POS interface displays incorrectly:

1. Clear browser cache completely
2. Try incognito/private mode
3. Rebuild assets as above

### Errors After Upgrade

If you see errors:

1. Check `/storage/logs/laravel.log` for details
2. Verify PHP version meets requirements (8.2+)
3. Ensure all dependencies are up to date
4. Restore from backup if necessary

## Rolling Back

If you need to revert to a previous version:

1. Restore your file backup to `/platform/plugins/pos-pro`
2. Restore your database backup
3. Clear all caches
4. Verify the POS works correctly

::: danger
Database rollback may cause data loss for any transactions made after the upgrade. Only roll back if absolutely necessary.
:::

## Version-Specific Notes

Check the [changelog](releases.md) for version-specific upgrade notes. Major versions may include:

- Database schema changes
- New required settings
- Deprecated features
- Breaking API changes

## Getting Help

If you need assistance:

1. Review the [troubleshooting](troubleshooting.md) guide
2. Check the [FAQ](faq.md)
3. Contact support: [support@botble.com](mailto:support@botble.com)

Include in your support request:
- Current POS Pro version
- Version you're upgrading to
- Botble CMS version
- Error messages (if any)
- Steps you've taken
