# Installing Affiliate Pro

This guide will walk you through the process of installing the Affiliate Pro plugin for your Botble E-commerce store.

## Requirements

Before installing Affiliate Pro, ensure your system meets the following requirements:

- Botble CMS version 7.5.0 or higher
- PHP version 8.2 or higher
- Active E-commerce plugin
- MySQL 5.7+ or MariaDB 10.3+
- Sufficient disk space for plugin files and database tables

## Installation Steps

### Method 1: Manual Installation

1. Download the plugin from [CodeCanyon downloads page](https://codecanyon.net/downloads)
2. Extract the downloaded zip file
3. Upload the extracted folder to `platform/plugins/affiliate-pro` directory
4. Ensure proper file permissions (755 for directories, 644 for files)
5. Go to **Admin** > **Plugins** and activate the Affiliate Pro plugin
6. The plugin will automatically run database migrations
7. Refresh your website

### Method 2: Installation via Admin Panel

If your Botble CMS supports plugin installation via the admin panel:

1. Download the plugin from [CodeCanyon downloads page](https://codecanyon.net/downloads)
2. Log in to your admin panel
3. Navigate to **Plugins** > **Add New**
4. Click on the "Upload Plugin" button
5. Select the downloaded zip file
6. Click "Install Now"
7. After installation, activate the plugin
8. The system will automatically handle database setup

## Database Setup

The Affiliate Pro plugin will automatically create the following database tables:

- `affiliates` - Stores affiliate information
- `affiliate_commissions` - Tracks commission records
- `affiliate_withdrawals` - Manages withdrawal requests
- `affiliate_transactions` - Records all transactions
- `affiliate_clicks` - Tracks click data
- `affiliate_short_links` - Manages shortened links
- `affiliate_coupons` - Stores affiliate-specific coupons

## Post-Installation Setup

After installing and activating the Affiliate Pro plugin:

### 1. Access Admin Interface
- The **Affiliates** menu item will appear in your admin panel's main navigation
- Click on **Affiliates** to access the affiliate management system

### 2. Configure Basic Settings
- Navigate to **Settings** > **E-commerce** > **Affiliate Settings**
- Set up your default commission percentage
- Configure cookie lifetime for tracking
- Set minimum withdrawal amounts
- Enable/disable affiliate registration

### 3. Set Up Email Templates
- Go to **Settings** > **Email Templates**
- Configure affiliate-related email templates:
  - Affiliate Application Approved
  - Affiliate Application Rejected
  - Commission Earned
  - Withdrawal Approved
  - Withdrawal Rejected

### 4. Configure Permissions
- Navigate to **Users** > **Roles**
- Assign appropriate affiliate permissions to user roles:
  - Affiliate management
  - Commission management
  - Withdrawal management
  - Reports access
  - Settings management

## Verifying Installation

To verify that the Affiliate Pro plugin has been installed correctly:

### 1. Admin Panel Check
1. Log in to your admin panel
2. Verify the **Affiliates** menu item appears in the main navigation
3. Click on **Affiliates** to access the management interface
4. Check that all sub-menus are accessible:
   - Affiliates
   - Commissions
   - Withdrawals
   - Coupons
   - Reports
   - Settings

### 2. Frontend Check
1. Visit your website frontend
2. Navigate to `/customer/affiliate` to access the affiliate registration page
3. Ensure the page loads without errors
4. Test the affiliate registration process (if enabled)

### 3. Database Check
1. Access your database management tool
2. Verify all affiliate tables have been created
3. Check that the tables are properly structured

### 4. Settings Check
1. Go to **Settings** > **E-commerce** > **Affiliate Settings**
2. Verify all settings are accessible and configurable
3. Test saving settings to ensure proper functionality

## Troubleshooting Installation Issues

### Common Issues and Solutions

**Plugin not appearing in admin menu:**
- Clear cache: `php artisan cache:clear`
- Clear config cache: `php artisan config:clear`
- Refresh the page

**Database migration errors:**
- Check database permissions
- Ensure MySQL/MariaDB version compatibility
- Run migrations manually: `php artisan migrate`

**Permission errors:**
- Check file permissions on the plugin directory
- Ensure web server has write access to storage directories

**Memory or timeout errors:**
- Increase PHP memory limit
- Increase PHP execution time
- Consider using command line for installation

If you continue to encounter issues during installation, please refer to the Troubleshooting section or contact our support team with detailed error messages and system information.
