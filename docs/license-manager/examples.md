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
| [.NET / C#](#net-c) | Console app, ASP.NET Core API & Blazor Server dashboard | Desktop apps, cloud APIs, Blazor |
| [Java](#java) | Maven project with HttpClient and interactive CLI | Desktop apps, Spring Boot |
| [Python](#python) | Client using `requests` library with CLI demo | Django, Flask, FastAPI, scripts |
| [Node.js](#node-js) | Zero-dependency client, CLI demo & Express.js server | Express, Fastify, Electron |
| [Ruby on Rails](#ruby-on-rails) | Client, Rails controller & Rack middleware | Rails applications |

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

## .NET / C#

A shared `LicenseManagerClient` class with three example projects targeting .NET 8.0.

**Examples included:**
- **Console App** - Interactive CLI, suitable for WPF, WinForms or MAUI desktop apps
- **ASP.NET Core API** - Minimal API endpoints wrapping the license client
- **Blazor Server** - Interactive web dashboard with Bootstrap UI

**Quick usage:**

```csharp
using LicenseManager;

var options = new LicenseManagerOptions
{
    ServerUrl = "https://license.yoursite.com",
    ApiKey = "your-api-key",
    ApplicationUrl = "https://your-app.com",
};

using var client = new LicenseManagerClient(options);

// Activate
var result = await client.ActivateLicenseAsync("PRODUCT_ID", "LICENSE-CODE", "Client Name");

// Verify
var verify = await client.VerifyLicenseAsync("PRODUCT_ID");

// Check for updates
var update = await client.CheckForUpdateAsync("PRODUCT_ID", "1.0.0");

// Download update
var path = await client.DownloadUpdateAsync(update.UpdateId, "./updates");
```

[View .NET example on GitHub](https://github.com/botble/license-manager-examples/tree/main/dotnet)

## Java

A Maven project using Java's built-in `HttpClient` (Java 11+) and Jackson for JSON parsing.

**Features:**
- Reusable `LicenseManagerClient` class
- Interactive CLI sample application
- Works with any Java app: desktop (Swing/JavaFX), Spring Boot, Android

**Quick usage:**

```java
import com.licensemanager.LicenseManagerClient;
import com.licensemanager.LicenseManagerClient.Config;

var config = new Config(
    "https://license.yoursite.com",
    "your-api-key",
    "https://your-app.com"
);

try (var client = new LicenseManagerClient(config)) {
    // Activate
    var result = client.activateLicense("PRODUCT_ID", "LICENSE-CODE", "Client Name");

    // Verify
    var verify = client.verifyLicense("PRODUCT_ID");

    // Check for updates
    var update = client.checkForUpdate("PRODUCT_ID", "1.0.0");

    // Download update
    var path = client.downloadUpdate(update.updateId, "./updates", "main");
}
```

[View Java example on GitHub](https://github.com/botble/license-manager-examples/tree/main/java)

## Python

A client using the `requests` library with an interactive CLI demo.

**Features:**
- Single-file client (`license_manager_client.py`)
- Interactive CLI sample application
- Works with Django, Flask, FastAPI, or standalone scripts

**Quick usage:**

```python
from license_manager_client import LicenseManagerClient

client = LicenseManagerClient(
    server_url="https://license.yoursite.com",
    api_key="your-api-key",
    application_url="https://your-app.com",
)

# Activate
result = client.activate_license("PRODUCT_ID", "LICENSE-CODE", "Client Name")

# Verify
result = client.verify_license("PRODUCT_ID")

# Check for updates
update = client.check_for_update("PRODUCT_ID", "1.0.0")

# Download update
path = client.download_update(update["update_id"], "./updates")
```

[View Python example on GitHub](https://github.com/botble/license-manager-examples/tree/main/python)

## Node.js

A zero-dependency client using built-in `fetch` (Node 18+) with CLI demo and Express.js server.

**Features:**
- Zero external dependencies (uses built-in `fetch`)
- Interactive CLI sample application
- Express.js API server example with optional license-gating middleware

**Quick usage:**

```javascript
const { LicenseManagerClient } = require('./license-manager-client');

const client = new LicenseManagerClient({
  serverUrl: 'https://license.yoursite.com',
  apiKey: 'your-api-key',
  applicationUrl: 'https://your-app.com',
});

// Activate
const result = await client.activateLicense('PRODUCT_ID', 'LICENSE-CODE', 'Client Name');

// Verify
const verify = await client.verifyLicense('PRODUCT_ID');

// Check for updates
const update = await client.checkForUpdate('PRODUCT_ID', '1.0.0');

// Download update
const path = await client.downloadUpdate(update.update_id, './updates');
```

[View Node.js example on GitHub](https://github.com/botble/license-manager-examples/tree/main/nodejs)

## Ruby on Rails

A standalone client using Ruby's `Net::HTTP` (zero dependencies), Rails controller, and Rack middleware.

**Features:**
- Zero-dependency client (`license_manager_client.rb`)
- Rails controller with activate/verify/deactivate/update endpoints
- Rack middleware for license-gating with TTL-based caching

**Quick usage:**

```ruby
require_relative "lib/license_manager_client"

client = LicenseManagerClient.new(
  server_url: "https://license.yoursite.com",
  api_key: "your-api-key",
  application_url: "https://your-app.com"
)

# Activate
result = client.activate_license("PRODUCT_ID", "LICENSE-CODE", "Client Name")

# Verify
result = client.verify_license("PRODUCT_ID")

# Check for updates
update = client.check_for_update("PRODUCT_ID", "1.0.0")

# Download update
path = client.download_update(update["update_id"], "./updates")
```

**Rack middleware (optional license gating):**

```ruby
# config/application.rb
config.middleware.use LicenseMiddleware,
  product_id: ENV.fetch("LM_PRODUCT_ID"),
  cache_ttl: 300
```

[View Rails example on GitHub](https://github.com/botble/license-manager-examples/tree/main/rails)

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
