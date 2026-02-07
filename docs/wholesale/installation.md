# Installation

## Requirements

- Botble CMS version 7.6.0 or higher
- PHP version 8.2 or higher
- Active E-commerce plugin (required dependency)
- MySQL 5.7+ or MariaDB 10.3+

## Installation Steps

### Step 1: Download the Plugin

Download the Wholesale plugin from [CodeCanyon](https://codecanyon.net/user/botble/portfolio) after purchase.

### Step 2: Upload to Server

Extract the downloaded zip file and upload the `ecommerce-wholesale` folder to:

```
platform/plugins/ecommerce-wholesale
```

Your directory structure should look like:

```
platform/
└── plugins/
    └── ecommerce-wholesale/
        ├── config/
        ├── database/
        ├── resources/
        ├── routes/
        ├── src/
        └── plugin.json
```

### Step 3: Activate the Plugin

1. Go to **Admin > Plugins**
2. Find **Wholesale** in the plugins list
3. Click the **Activate** button

The plugin will run database migrations automatically and create the required tables.

### Step 4: Activate Your License

1. Go to **Wholesale > Settings** in the admin sidebar
2. Enter your purchase code in the license field at the top of the page
3. Click **Activate**

### Step 5: Verify Installation

1. Go to **Wholesale > Customer Groups** - you should see an empty list ready for groups
2. Go to **Wholesale > Settings** - you should see the settings form

![Wholesale Settings](./images/settings.png)

## Troubleshooting

### Plugin not appearing in the Plugins list

- Ensure the folder is named exactly `ecommerce-wholesale`
- Check that all files were uploaded correctly
- Clear the cache: go to **Admin > Platform Administration > Cache management** and click **Clear all CMS cache**

### Dependency error

The E-commerce plugin must be installed and activated first. Wholesale requires it to function.

### Database migration issues

Run migrations manually:

```bash
php artisan migrate
```

Or deactivate and reactivate the plugin in **Admin > Plugins** to re-run migrations.

## Next Steps

1. [Configure wholesale settings](/wholesale/configuration)
2. [Create your first customer group](/wholesale/usage/customer-groups)
3. [Set up pricing rules](/wholesale/usage/pricing-rules)
