# Upgrading POS Pro

This guide explains how to upgrade your POS Pro plugin to the latest version.

## Before You Begin

Before upgrading, we recommend:

1. **Backup your database**: Create a full backup of your database to prevent data loss
2. **Backup your files**: Make a copy of your website files, especially the `/platform/plugins/pos-pro` directory
3. **Check compatibility**: Ensure the new version is compatible with your current Botble CMS version

## Upgrade Process

### Method 1: Standard Upgrade

1. Download the latest version from [CodeCanyon downloads page](https://codecanyon.net/downloads)
2. Extract the downloaded zip file
3. Replace the entire `/platform/plugins/pos-pro` folder with the new version
4. Go to **Admin** > **Plugins** > **Installed plugins**
5. Deactivate the POS Pro plugin
6. Activate the POS Pro plugin again to update changes

### Method 2: Manual Upgrade (Advanced)

If you've made custom modifications to the plugin files:

1. Download the latest version from [CodeCanyon downloads page](https://codecanyon.net/downloads)
2. Extract the downloaded zip file
3. Compare your modified files with the new version files
4. Merge your custom changes with the new files
5. Replace the `/platform/plugins/pos-pro` folder with your merged version
6. Go to **Admin** > **Plugins** > **Installed plugins**
7. Deactivate the POS Pro plugin
8. Activate the POS Pro plugin again to update changes

## Post-Upgrade Steps

After upgrading:

1. Clear your browser cache
2. Clear your application cache:
   - Go to **Admin** > **Platform Administration** > **Cache management**
   - Click on "Clear all CMS cache" button
3. Test the POS functionality to ensure everything works correctly

## Troubleshooting

If you encounter issues after upgrading:

1. Check the error logs in `/storage/logs`
2. Ensure all dependencies are up to date
3. Verify that your server meets the requirements for the new version
4. If problems persist, revert to your backup and contact our support team

## Version-Specific Upgrade Notes

Some versions may have specific upgrade instructions or breaking changes. Always check the [release notes](/pos-pro/releases) for the version you're upgrading to for any additional steps or considerations.

If you need assistance with upgrading, please contact our support team.
