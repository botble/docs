# Installing POS Pro

This guide walks you through installing the POS Pro plugin for your Botble E-commerce store.

## Requirements

Before installing POS Pro, ensure your system meets these requirements:

- Botble CMS version 7.5.0 or higher
- PHP version 8.2 or higher
- Active E-commerce plugin
- MySQL 5.7+ or MariaDB 10.3+

### Optional Dependencies

For additional features:

| Plugin | Feature Enabled |
|--------|-----------------|
| Stripe | Card payments via Stripe Terminal |
| SePay | Bank transfer QR codes |
| PayFS | Bank transfer QR codes |
| Marketplace | Multi-vendor POS support |

## Installation Steps

### Method 1: Manual Installation

1. Download the plugin from [CodeCanyon downloads page](https://codecanyon.net/downloads)
2. Extract the downloaded zip file
3. Upload the extracted `pos-pro` folder to `platform/plugins/` directory
4. Run database migrations:
   ```bash
   php artisan migrate
   ```
5. Go to **Admin** > **Plugins** and activate the POS Pro plugin
6. Build assets (if not already done):
   ```bash
   npm run build
   php artisan cms:publish:assets
   ```

### Method 2: Admin Panel Installation

1. Download the plugin from [CodeCanyon downloads page](https://codecanyon.net/downloads)
2. Log in to your admin panel
3. Navigate to **Plugins** > **Add New**
4. Click **Upload Plugin**
5. Select the downloaded zip file
6. Click **Install Now**
7. After installation, activate the plugin

## Post-Installation Setup

After installing and activating POS Pro:

### 1. Configure Settings

1. Go to **POS** > **Settings**
2. Enable POS and configure:
   - Active payment methods
   - Default payment method
   - Receipt settings
   - Refund settings

See [Configuration](configuration.md) for detailed settings.

### 2. Set Up Permissions

1. Go to **Users** > **Roles**
2. Edit roles that need POS access
3. Enable appropriate POS permissions:
   - POS (interface access)
   - Registers (cash drawer)
   - Refunds (return processing)
   - Reports (analytics)
   - Settings (configuration)

### 3. Configure Printers (Optional)

If you plan to print receipts:

1. Go to **POS** > **Devices**
2. Add printer configurations
3. Configure receipt width and content

See [Printer Setup](usage-printer-setup.md) for details.

### 4. Set Up Stripe Terminal (Optional)

For card payments:

1. Ensure Stripe plugin is active
2. Go to **POS** > **Settings**
3. Enable Stripe Terminal
4. Enter your Stripe API credentials
5. Sync your card readers

See [Stripe Terminal](usage-stripe-terminal.md) for details.

## Verifying Installation

To verify POS Pro is installed correctly:

1. Log in to your admin panel
2. Check that **POS** appears in the main navigation
3. Click **POS** to access the interface
4. Verify:
   - Products are displayed
   - Cart functionality works
   - Payment methods are available

### Quick Test

1. Add a product to cart
2. Select a customer (or create one)
3. Choose a payment method
4. Click **Complete Order**
5. Verify the order appears in **POS** > **Orders**

## Directory Structure

After installation, files are located at:

```
platform/plugins/pos-pro/
├── config/           # Configuration files
├── database/         # Migrations
├── resources/        # Views, JS, CSS, translations
├── routes/           # Route definitions
├── src/              # PHP source code
└── plugin.json       # Plugin metadata
```

## License Activation

POS Pro requires license activation:

1. Go to **POS** > **License**
2. Enter your purchase code from CodeCanyon
3. Click **Activate**

::: info
Your purchase code is found in your CodeCanyon downloads page under "License certificate & purchase code".
:::

## Troubleshooting Installation

### Plugin Not Appearing

If POS doesn't appear in the menu:

1. Clear application cache:
   ```bash
   php artisan cache:clear
   ```
2. Verify the plugin is activated in **Plugins** list
3. Check user has POS permissions

### Migration Errors

If database migrations fail:

1. Check database connection
2. Verify database user has CREATE/ALTER permissions
3. Check PHP error logs
4. Run migrations with verbose output:
   ```bash
   php artisan migrate -v
   ```

### Assets Not Loading

If CSS/JS doesn't load:

1. Rebuild assets:
   ```bash
   npm run build
   php artisan cms:publish:assets
   ```
2. Clear browser cache
3. Check browser console for errors

### Products Not Showing

If products don't appear in POS:

1. Verify E-commerce plugin is active
2. Check products are published
3. Ensure products have stock (if tracking)
4. Verify user permissions

## Uninstalling

To remove POS Pro:

1. Go to **Admin** > **Plugins**
2. Find POS Pro in the list
3. Click **Deactivate**
4. Click **Remove**

::: warning
Uninstalling will remove POS-specific data. Standard e-commerce orders remain intact.
:::

## Next Steps

After installation:

1. [Configure settings](configuration.md)
2. [Learn the POS interface](usage-guide.md)
3. [Set up printers](usage-printer-setup.md)
4. [Configure cash register](usage-cash-register.md)
