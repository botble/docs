# Integration Examples

Ready-to-use example code for integrating License Manager into your applications. All examples are available on GitHub:

::: tip
**GitHub Repository:** [github.com/botble/license-manager-examples](https://github.com/botble/license-manager-examples)
:::

## Available Examples

| Example | Description | Best For |
|---------|-------------|----------|
| [PHP](#php) | Standalone PHP scripts using cURL | Any PHP application |
| [Laravel](#laravel) | Laravel package with service provider, middleware & Artisan commands | Laravel applications |
| [WordPress](#wordpress) | WordPress plugin with admin UI, auto-updates & WP-Cron | WordPress plugins/themes |

## PHP

A standalone PHP client class that works with any PHP application. Uses cURL for HTTP requests with no framework dependencies.

**Features:**
- License activation, verification, and deactivation
- Update checking and downloading
- Works with any PHP 7.4+ application

**Quick usage:**

```php
require_once 'LicenseManagerExternalAPI.php';

$client = new LicenseManagerExternalAPI(
    apiKey: 'your-api-key',
    apiUrl: 'https://license.yoursite.com',
    productId: 'your-product-id'
);

// Activate
$result = $client->activate($licenseCode);

// Verify
$result = $client->verify($licenseData);

// Deactivate
$result = $client->deactivate($licenseData);

// Check for updates
$result = $client->checkUpdate($currentVersion);
```

[View PHP example on GitHub](https://github.com/botble/license-manager-examples/tree/main/php)

## Laravel

A full Laravel package with service provider, middleware, Artisan commands, and configuration file.

**Features:**
- Service provider with auto-discovery
- `VerifyLicense` middleware for route protection
- Artisan commands: `license:activate`, `license:verify`, `license:deactivate`
- Configuration file for API credentials
- License data caching for performance

**Installation:**

1. Copy the `laravel/` folder into your Laravel project
2. Register the service provider or use auto-discovery
3. Publish the config file:

```bash
php artisan vendor:publish --tag=license-config
```

4. Set your credentials in `config/license.php` or `.env`:

```env
LICENSE_API_KEY=your-api-key
LICENSE_API_URL=https://license.yoursite.com
LICENSE_PRODUCT_ID=your-product-id
```

**Middleware usage:**

```php
// In routes/web.php
Route::middleware('license.verify')->group(function () {
    // Protected routes
});
```

**Artisan commands:**

```bash
php artisan license:activate YOUR-LICENSE-CODE
php artisan license:verify
php artisan license:deactivate
```

[View Laravel example on GitHub](https://github.com/botble/license-manager-examples/tree/main/laravel)

## WordPress

A WordPress plugin with admin settings page, auto-update integration, and scheduled license verification.

**Features:**
- Admin settings page under Settings menu
- License activation/deactivation from WordPress admin
- Automatic plugin/theme update checking via WordPress updates API
- WP-Cron scheduled license verification
- Admin notices for license status

**Installation:**

1. Copy the `wordpress/` folder to `wp-content/plugins/`
2. Activate the plugin in WordPress admin
3. Go to **Settings > License Manager** to enter your credentials
4. Enter your license code and click **Activate**

**Hooks for developers:**

```php
// Check if license is active in your plugin/theme
if (function_exists('is_license_active') && is_license_active()) {
    // Licensed features
}
```

[View WordPress example on GitHub](https://github.com/botble/license-manager-examples/tree/main/wordpress)

## Customizing the Examples

These examples are starting points. You should customize them for your specific needs:

1. **Error handling** - Add proper error handling and user-friendly messages
2. **Storage** - Choose the appropriate storage method for license data (file, database, options table)
3. **Caching** - Cache verification results to reduce API calls (recommended: 6-24 hours)
4. **Security** - Store API keys securely (environment variables, encrypted config)
5. **UI** - Build license activation forms that match your application's design

## Next Steps

- [Quick Start](quick-start.md) - 5-minute integration guide
- [Integration Guide](integration.md) - Detailed implementation patterns
- [API Reference](api.md) - All API endpoints
- [Webhooks](webhooks.md) - Real-time event notifications
