# Upgrade Guide

## Before Updating

::: warning
Always back up your database and files before updating.
:::

## Automatic Update (Recommended)

If you've activated your license:

1. Go to **Admin > Plugins**
2. Find **Ecommerce Preorder** in the list
3. Click the **Update** button
4. Wait for it to finish
5. Go to **Admin > Platform Administration > Cache management**
6. Click **Clear all CMS cache**

## Manual Update

If automatic update doesn't work:

1. Download the latest version from CodeCanyon
2. Extract the zip file
3. Upload and replace files in `platform/plugins/ecommerce-preorder/`
4. Run migrations and clear cache:

```bash
php artisan migrate && php artisan vendor:publish --tag=cms-public --force && php artisan cache:clear && php artisan config:clear && php artisan view:clear
```

## After Updating

Verify everything works:

| Check | How |
|-------|-----|
| Admin panel loads | Go to **Preorder > Products** |
| Products exist | Your existing preorder products should still be listed |
| Orders intact | Go to **Preorder > Orders** — verify your orders are there |
| Settings saved | Go to **Preorder > Settings** — verify your configuration |
| Frontend works | Visit a preorder product page — verify badge and pricing appear |

## Version Compatibility

| Plugin Version | Minimum Botble Version |
|----------------|----------------------|
| 1.0.x | 7.6.0 |

## Checking Your Version

Go to **Admin > Plugins**, find Ecommerce Preorder — the version is shown next to the plugin name.

Or check the file:
```bash
cat platform/plugins/ecommerce-preorder/plugin.json
```

## Troubleshooting After Update

### Page looks broken

Clear cache: **Admin > Platform Administration > Cache management > Clear all CMS cache**. Also clear browser cache (Ctrl+Shift+Delete).

### Database errors

```bash
php artisan migrate
```

### Assets not loading

```bash
php artisan vendor:publish --tag=cms-public --force
```

### Need to roll back

If the update caused problems and you have a backup, restore from your backup. Contact your hosting provider if you need help.
