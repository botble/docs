# Installation

## Requirements

- Botble CMS version 7.6.0 or higher
- PHP version 8.2 or higher
- Active E-commerce plugin
- MySQL 5.7+ or MariaDB 10.3+

## Installation Steps

### Step 1: Download the Plugin

Download the Ecommerce Preorder plugin from [CodeCanyon](https://1.envato.market/L005E0) after purchase.

### Step 2: Upload to Server

Extract the downloaded zip file and upload the `ecommerce-preorder` folder to:

```
platform/plugins/ecommerce-preorder
```

Your directory structure should look like:

```
platform/
└── plugins/
    └── ecommerce-preorder/
        ├── config/
        ├── database/
        ├── resources/
        ├── routes/
        ├── src/
        └── plugin.json
```

### Step 3: Activate the Plugin

1. Go to **Admin > Plugins**
2. Find **Ecommerce Preorder** in the plugins list
3. Click the **Activate** button

The plugin will run database migrations automatically and create the required tables.

### Step 4: Activate Your License

1. Go to **Preorder > Settings** in the admin sidebar
2. Enter your purchase code in the license field at the top of the page
3. Click **Activate**

### Step 5: Verify Installation

1. Go to **Preorder > Products** — you should see an empty list ready for preorder products
2. Go to **Preorder > Settings** — you should see the settings form

## Troubleshooting

### Plugin not appearing in the Plugins list

- Ensure the folder is named exactly `ecommerce-preorder`
- Check that all files were uploaded correctly
- Clear the cache: go to **Admin > Platform Administration > Cache management** and click **Clear all CMS cache**

### Dependency error

The E-commerce plugin must be installed and activated first. Preorder requires it to function.

### Database migration issues

Run migrations manually:

```bash
php artisan migrate
```

Or deactivate and reactivate the plugin in **Admin > Plugins** to re-run migrations.

## Next Steps

1. [Configure preorder settings](/ecommerce-preorder/configuration)
2. [Create your first preorder product](/ecommerce-preorder/usage/preorder-products)
3. [Manage preorder orders](/ecommerce-preorder/usage/preorder-orders)
