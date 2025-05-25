# Upgrading Affiliate Pro

This guide explains how to upgrade your Affiliate Pro plugin to the latest version safely and efficiently.

## Before You Begin

Before upgrading, we strongly recommend taking the following precautions:

### 1. Create Backups

**Database Backup:**
- Create a full backup of your database to prevent data loss
- Pay special attention to affiliate-related tables:
  - `affiliates`
  - `affiliate_commissions`
  - `affiliate_withdrawals`
  - `affiliate_transactions`
  - `affiliate_clicks`
  - `affiliate_short_links`
  - `affiliate_coupons`

**File Backup:**
- Make a copy of your website files, especially the `/platform/plugins/affiliate-pro` directory
- Backup any custom modifications you've made to the plugin
- Save your current plugin configuration settings

### 2. Check Compatibility

- Ensure the new version is compatible with your current Botble CMS version
- Review the [release notes](/affiliate-pro/releases) for any breaking changes
- Check PHP version requirements (minimum PHP 8.2)
- Verify database compatibility (MySQL 5.7+ or MariaDB 10.3+)

### 3. Maintenance Mode

- Put your website in maintenance mode during the upgrade
- Notify affiliates about the scheduled maintenance
- Plan the upgrade during low-traffic periods

## Upgrade Process

### Method 1: Standard Upgrade

This is the recommended method for most users:

1. **Download the Latest Version**
   - Download the latest version from [CodeCanyon downloads page](https://codecanyon.net/downloads)
   - Verify the download integrity

2. **Prepare for Upgrade**
   - Put your website in maintenance mode
   - Clear all caches before starting

3. **Replace Plugin Files**
   - Extract the downloaded zip file
   - Replace the entire `/platform/plugins/affiliate-pro` folder with the new version
   - Ensure proper file permissions (755 for directories, 644 for files)

4. **Update Plugin**
   - Go to **Admin** > **Plugins** > **Installed plugins**
   - Deactivate the Affiliate Pro plugin
   - Activate the Affiliate Pro plugin again to apply updates
   - Run any required database migrations

5. **Clear Caches**
   ```bash
   php artisan cache:clear
   php artisan config:clear
   php artisan view:clear
   php artisan route:clear
   ```

### Method 2: Manual Upgrade (Advanced)

Use this method if you've made custom modifications to the plugin files:

1. **Download and Extract**
   - Download the latest version from [CodeCanyon downloads page](https://codecanyon.net/downloads)
   - Extract the downloaded zip file to a temporary location

2. **Compare and Merge**
   - Compare your modified files with the new version files
   - Use a file comparison tool (like WinMerge, Beyond Compare, or diff)
   - Carefully merge your custom changes with the new files
   - Document all custom modifications for future upgrades

3. **Test Locally**
   - Test the merged files in a local or staging environment first
   - Verify all custom functionality still works
   - Check for any conflicts or issues

4. **Deploy Changes**
   - Replace the `/platform/plugins/affiliate-pro` folder with your merged version
   - Follow steps 4-5 from Method 1

### Method 3: Command Line Upgrade

For advanced users comfortable with command line:

1. **Backup Current Installation**
   ```bash
   cp -r platform/plugins/affiliate-pro platform/plugins/affiliate-pro-backup
   ```

2. **Download and Extract**
   ```bash
   wget [download-url] -O affiliate-pro-latest.zip
   unzip affiliate-pro-latest.zip
   ```

3. **Replace Files**
   ```bash
   rm -rf platform/plugins/affiliate-pro
   mv affiliate-pro platform/plugins/
   ```

4. **Run Artisan Commands**
   ```bash
   php artisan plugin:deactivate affiliate-pro
   php artisan plugin:activate affiliate-pro
   php artisan migrate
   php artisan cache:clear
   ```

## Post-Upgrade Steps

After completing the upgrade process:

### 1. Clear All Caches

**Application Cache:**
- Go to **Admin** > **Platform Administration** > **Cache management**
- Click on "Clear all CMS cache" button

**Browser Cache:**
- Clear your browser cache and cookies
- Test with incognito/private browsing mode

**CDN Cache (if applicable):**
- Clear CDN cache if you're using a content delivery network
- Update any cached static assets

### 2. Verify Functionality

**Core Features:**
- Test affiliate registration process
- Verify tracking link functionality
- Check commission calculation accuracy
- Test withdrawal request process
- Confirm email notifications are working

**Dashboard Access:**
- Verify admin dashboard loads correctly
- Check affiliate dashboard functionality
- Test all reporting features
- Confirm data integrity

**Integration Testing:**
- Test e-commerce integration
- Verify payment gateway connections
- Check third-party integrations (PayPal, Stripe, etc.)
- Test API endpoints if used

### 3. Update Configuration

**Review Settings:**
- Check all plugin settings are preserved
- Update any new configuration options
- Verify email template customizations
- Review permission settings

**Update Documentation:**
- Update any internal documentation
- Inform team members of new features
- Update affiliate onboarding materials

## Troubleshooting

If you encounter issues after upgrading:

### Common Issues and Solutions

**Plugin Not Loading:**
- Check file permissions (755 for directories, 644 for files)
- Verify all files were uploaded correctly
- Check error logs in `/storage/logs`

**Database Errors:**
- Run migrations manually: `php artisan migrate`
- Check database user permissions
- Verify database connection settings

**Missing Features:**
- Clear all caches
- Deactivate and reactivate the plugin
- Check for conflicting plugins

**Performance Issues:**
- Clear all caches
- Check database indexes
- Monitor server resources

### Recovery Process

If the upgrade fails:

1. **Immediate Recovery:**
   - Restore from your file backup
   - Restore database from backup
   - Put site back online

2. **Investigate Issues:**
   - Check error logs for specific problems
   - Review upgrade steps for missed items
   - Contact support with detailed error information

3. **Retry Upgrade:**
   - Address identified issues
   - Attempt upgrade again with fixes
   - Consider staging environment testing

## Version-Specific Upgrade Notes

### Upgrading to Version 1.2.0

**New Features:**
- PayPal Payout integration requires API credentials setup
- Stripe Connect integration needs configuration
- QR code generation may require additional PHP extensions

**Breaking Changes:**
- None in this version

**Additional Steps:**
- Configure new payment method integrations
- Update affiliate notification templates
- Test new QR code functionality

### Upgrading to Version 1.1.0

**New Features:**
- Category-specific commissions require configuration
- Affiliate coupon system needs permission setup
- Marketing materials library requires file storage setup

**Breaking Changes:**
- Commission calculation logic updated (backward compatible)

**Additional Steps:**
- Configure category commission rates
- Set up marketing materials directory
- Update affiliate permissions for coupon creation

### Upgrading from Version 1.0.x

**Database Changes:**
- New tables for short links and coupons
- Additional columns for enhanced tracking
- Updated indexes for better performance

**Configuration Updates:**
- New settings for advanced features
- Updated email templates
- Enhanced security options

## Getting Help

If you need assistance with upgrading:

### Before Contacting Support

- Review this upgrade guide thoroughly
- Check the [troubleshooting section](/affiliate-pro/troubleshooting)
- Review [release notes](/affiliate-pro/releases) for version-specific information
- Gather relevant error messages and logs

### Support Information

**What to Include:**
- Current plugin version
- Target upgrade version
- Botble CMS version
- PHP version and server environment
- Specific error messages
- Steps already attempted

**Contact Methods:**
- Email support with detailed information
- Include relevant log files
- Provide access to staging environment if possible

### Emergency Support

For critical issues affecting live sites:
- Restore from backup immediately
- Contact support with "URGENT" in subject line
- Provide detailed timeline of upgrade steps
- Include complete error logs

Remember: A successful upgrade requires careful planning, proper backups, and thorough testing. When in doubt, test the upgrade process in a staging environment first.
