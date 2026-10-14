# Renaming Your Theme

## Introduction

There are two main reasons you might want to rename a theme in Botble CMS:

1. **Customization**: You want to customize an existing theme and prevent losing your changes when upgrading to a new version
2. **Branding**: You want to change the theme name to match your brand or project name

This guide provides two approaches to rename your theme, depending on your needs.

## Method 1: Complete Theme Rename

::: warning Important Note
With this method, you won't be able to automatically upgrade the theme through the System Updater. You'll need to manage updates manually.
:::

### Option A: Using Command Line (Recommended)

This is the easiest and most reliable method if you have command line access to your server.

1. **Prepare your environment**:
   ```bash
   # Remove vendor directory
   rm -rf vendor

   # Reinstall dependencies
   composer install
   ```

2. **Run the theme rename command**:
   ```bash
   php artisan cms:theme:rename {current_theme} {new_theme}
   ```

   For example, to rename the "ripple" theme to "shop":
   ```bash
   php artisan cms:theme:rename ripple shop
   ```

3. **Update theme information**:
   Edit the file `platform/themes/{new_theme}/theme.json` to update:
   - Theme name
   - Description
   - Author information
   - Version number

### Option B: Manual Rename

If you don't have command line access, you can rename the theme manually:

1. **Rename theme directories**:
   - Rename `platform/themes/{current_theme}` to `platform/themes/{new_theme}`
   - Rename `public/themes/{current_theme}` to `public/themes/{new_theme}`

2. **Update database records**:
   - In the `settings` table: Replace all keys starting with `theme-{current_theme}` to `theme-{new_theme}`
   - In the `widgets` table: Update all values in the `theme` column to the new theme name

3. **Update theme information**:
   Edit `platform/themes/{new_theme}/theme.json` to update theme details

4. **Clear cache**:
   - Delete all files in the `storage/framework/cache` directory
   - Or run `php artisan cache:clear` if you have command line access

## Method 2: Public Theme Name Only

::: tip Recommended for Theme Updates
This method allows you to keep receiving theme updates through the System Updater while changing how the theme appears publicly.
:::

With this approach, you only change the theme name in public-facing areas while keeping the original theme files intact for updates:

1. **Rename the public theme directory**:
   ```bash
   mv public/themes/{current_theme} public/themes/{new_theme}
   ```

2. **Configure environment variable**:
   Add the following line to your `.env` file:
   ```
   CMS_THEME_PUBLIC_NAME={new_theme}
   ```

3. **Create custom theme information**:
   - Copy the theme.json file:
     ```bash
     cp platform/themes/{current_theme}/theme.json public/themes/{new_theme}/theme.json
     ```
   - Edit `public/themes/{new_theme}/theme.json` to update theme details

## Verifying the Theme Rename

After renaming your theme, verify that everything works correctly:

1. **Clear cache**:
   ```bash
   php artisan cache:clear
   ```

2. **Check admin panel**:
   - Go to Admin → Appearance → Themes
   - Confirm your theme appears with the new name

3. **Check frontend**:
   - Visit your website
   - Verify that all styles and functionality work correctly

## Troubleshooting

If you encounter issues after renaming your theme:

- **Missing styles**: Run `php artisan cms:theme:assets:publish`
- **Blank pages**: Check your error logs in `storage/logs`
- **Database errors**: Verify all database updates were completed correctly

For more detailed information, check this article: [Rename Theme in Botble CMS](https://botble.com/rename-theme-in-botble-cms)
