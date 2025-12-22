# Installing E-Wallet

This guide will walk you through the process of installing the E-Wallet plugin for your Botble E-commerce store.

## Requirements

Before installing E-Wallet, ensure your system meets the following requirements:

- Botble CMS version 7.5.0 or higher
- PHP version 8.2 or higher
- MySQL 5.7+ or MariaDB 10.3+
- Botble E-commerce plugin (required)
- At least one payment gateway configured (for top-ups)

::: warning Important
This plugin **requires the E-commerce plugin** to be installed and activated. E-Wallet is designed to work **only with Botble e-commerce scripts**.
:::

## Installation Steps

1. Download the plugin from [CodeCanyon downloads page](https://codecanyon.net/downloads)
2. Extract the downloaded zip file
3. Upload the extracted folder to `platform/plugins/e-wallet` directory
4. Go to **Admin** > **Plugins** and activate the E-Wallet plugin
5. Refresh your website

## Post-Installation Setup

After installing and activating the E-Wallet plugin:

### 1. Activate Your License

- Navigate to **E-Wallet** > **License Activation**
- Enter your purchase code from CodeCanyon
- Click "Activate license"

### 2. Run Database Migrations

The migrations should run automatically during activation. If not, run manually:

```bash
php artisan migrate
```

This creates the following tables:
- `ec_wallets` - Stores wallet information
- `ec_wallet_transactions` - Stores all wallet transactions
- `ec_wallet_topups` - Stores top-up requests

### 3. Publish Assets

Publish the plugin's public assets:

```bash
php artisan vendor:publish --tag=cms-public --force
```

### 4. Clear Cache

Clear the application cache to ensure everything loads correctly:

```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### 5. Access Admin Interface

- The **E-Wallet** menu item will appear in your admin panel
- Click on **E-Wallet** to access the management system

### 6. Configure Basic Settings

- Navigate to **Settings** > **E-Wallet**
- Enable the e-wallet functionality
- Set minimum and maximum top-up amounts
- Configure withdrawal settings
- Select allowed payment methods for top-ups

### 7. Enable Wallet Payment Method

- Go to **Admin** > **Payments** > **Payment methods**
- Find "Wallet" in the payment methods list
- Click **Edit** and enable it
- Configure display name and description

### 8. Configure Permissions

Assign permissions to admin roles:

1. Go to **Admin** > **System** > **Roles**
2. Edit roles that should have access to e-wallet features
3. Grant the following permissions as needed:
   - `e-wallet.index` - Access E-Wallet menu
   - `e-wallet.wallets.index` - View wallets
   - `e-wallet.wallets.adjust` - Adjust wallet balances
   - `e-wallet.transactions.index` - View transactions
   - `e-wallet.topups.index` - View top-ups
   - `e-wallet.topups.complete` - Complete top-ups
   - `e-wallet.topups.cancel` - Cancel top-ups
   - `e-wallet.withdrawals.index` - View withdrawals
   - `e-wallet.withdrawals.approve` - Approve withdrawals
   - `e-wallet.withdrawals.reject` - Reject withdrawals
   - `e-wallet.settings` - Manage settings

## Verifying Installation

To verify that the plugin has been installed correctly:

1. Log in to your admin panel
2. Verify the **E-Wallet** menu item appears in the main navigation
3. Click on **E-Wallet** to access the management interface
4. Check that all sub-menus are accessible:
   - Dashboard
   - Wallets
   - Transactions
   - Top-ups
   - Settings
5. Go to **Settings** > **E-Wallet** and verify settings are accessible

### Customer Verification

1. Log in as a customer (or create a test customer account)
2. Navigate to `/customer/e-wallet`
3. You should see:
   - Current balance (initially 0)
   - Transaction history (empty)
   - Top-up button

### Test Top-up Flow

1. As a customer, click **Top Up Wallet**
2. Enter an amount
3. Select a payment method
4. Complete the payment
5. Verify the wallet balance is updated

### Test Checkout Payment

1. Add a product to cart
2. Proceed to checkout
3. Select "Wallet" as payment method
4. Complete the order
5. Verify the wallet balance is deducted

## Troubleshooting Installation

### Plugin Not Appearing

If the plugin doesn't appear in the plugins list:

1. Check file permissions:
   ```bash
   chmod -R 755 platform/plugins/e-wallet
   ```

2. Verify the `plugin.json` file exists and is valid

3. Clear cache:
   ```bash
   php artisan cache:clear
   ```

### Migration Errors

If you encounter migration errors:

```bash
# Rollback migrations
php artisan migrate:rollback --path=platform/plugins/e-wallet/database/migrations

# Re-run migrations
php artisan migrate --path=platform/plugins/e-wallet/database/migrations
```

### Assets Not Loading

If CSS/JS assets are not loading:

```bash
# Re-publish assets
php artisan vendor:publish --tag=cms-public --force

# Clear view cache
php artisan view:clear
```

### Permission Denied Errors

If you see permission errors:

```bash
# Fix storage permissions
chmod -R 775 storage
chmod -R 775 bootstrap/cache

# Fix ownership (replace www-data with your web server user)
chown -R www-data:www-data storage
chown -R www-data:www-data bootstrap/cache
```

## Need Help?

If you encounter any issues during installation, please contact our support team at [contact@botble.com](mailto:contact@botble.com) with:

- Description of the issue
- Any error messages you see
- Your Botble CMS version
