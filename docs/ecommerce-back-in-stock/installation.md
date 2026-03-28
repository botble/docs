# Installation

## Requirements

- Botble CMS version 7.5.0 or higher
- PHP version 8.2 or higher
- Active E-commerce plugin
- MySQL 5.7+ or MariaDB 10.3+

## Installation Steps

### Step 1: Download the Plugin

Download the Ecommerce Back in Stock plugin from [CodeCanyon](https://codecanyon.net/user/botble/portfolio) after purchase.

### Step 2: Upload to Server

Extract the downloaded zip file and upload the `ecommerce-back-in-stock` folder to:

```
platform/plugins/ecommerce-back-in-stock
```

Your directory structure should look like:

```
platform/
└── plugins/
    └── ecommerce-back-in-stock/
        ├── config/
        ├── database/
        ├── resources/
        ├── routes/
        ├── src/
        └── plugin.json
```

### Step 3: Activate the Plugin

1. Go to **Admin > Plugins**
2. Find **Ecommerce: Back in Stock Notifications** in the plugins list
3. Click the **Activate** button

The plugin will run database migrations automatically and create the `back_in_stock_subscriptions` table.

### Step 4: Activate Your License

1. Go to **Back in Stock > Settings** in the admin sidebar
2. Enter your purchase code in the license field at the top of the page
3. Click **Activate**

### Step 5: Verify Installation

1. Go to **Back in Stock** in the admin sidebar — you should see an empty subscriptions list
2. Go to **Back in Stock > Settings** — you should see the settings form
3. Visit an out-of-stock product on the frontend — the "Notify Me" form should appear

## Troubleshooting

### Plugin not appearing in the Plugins list

- Ensure the folder is named exactly `ecommerce-back-in-stock`
- Check that all files were uploaded correctly
- Clear the cache: go to **Admin > Platform Administration > Cache management** and click **Clear all CMS cache**

### Dependency error

The E-commerce plugin must be installed and activated first. Back in Stock requires it to function.

### Notification form not showing on product pages

- Verify the plugin is enabled at **Back in Stock > Settings**
- Confirm the product is actually out of stock (quantity = 0)
- Clear the cache and test in an incognito browser window

### Database migration issues

Run migrations manually:

```bash
php artisan migrate
```

Or deactivate and reactivate the plugin in **Admin > Plugins** to re-run migrations.

## Next Steps

1. [Configure back-in-stock settings](/ecommerce-back-in-stock/configuration)
2. [Understand the subscription workflow](/ecommerce-back-in-stock/usage/)
3. [Manage customer subscriptions](/ecommerce-back-in-stock/usage/subscriptions)
