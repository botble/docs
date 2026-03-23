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
| [Python](#python) | Client using `requests` library with CLI demo | Flask, FastAPI, scripts |
| [Django](#django) | Django app with client, middleware, commands & views | Django applications |
| [Node.js](#node-js) | Zero-dependency client, CLI demo & Express.js server | Express, Fastify, Electron |
| [Ruby on Rails](#ruby-on-rails) | Client, Rails controller & Rack middleware | Rails applications |

## PHP

Standalone PHP scripts using cURL with no framework dependencies. Includes both **External API** (client-facing) and **Internal API** (server-to-server management).

**Features:**
- License activation, verification, and deactivation (External API)
- Product and license management (Internal API)
- Works with any PHP 7.4+ application

**External API usage (client applications):**

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

**Internal API usage (server-to-server):**

```php
$config = [
    'api_url'    => 'https://your-license-server.com',
    'api_key'    => 'your-internal-api-key',  // Internal API key (different from External)
    'server_url' => 'https://your-backend-server.com',
    'server_ip'  => '127.0.0.1',
];

// Operations: list/create products, list/create/block/unblock licenses
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

```bash
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
- Admin settings page under **Settings > License Manager**
- License activation, verification, and deactivation from WordPress admin
- Automatic **plugin** update checking via `pre_set_site_transient_update_plugins`
- One-click update installation with license-authenticated downloads
- WP-Cron daily license verification
- Admin notices for license status

**File structure:**

```
wordpress/
├── license-manager-wp.php              # Main plugin file (constants & bootstrap)
├── includes/
│   ├── class-lm-api-client.php         # Reusable API client (works in any WP plugin/theme)
│   ├── class-lm-admin.php              # Admin settings page & license actions
│   └── class-lm-updater.php            # WordPress plugin auto-updater
├── assets/
│   ├── css/admin.css
│   └── js/admin.js
└── README.md
```

**Installation (as a plugin):**

1. Copy the `wordpress/` folder to `wp-content/plugins/license-manager-client/`
2. Activate the plugin in **Plugins > Installed Plugins**
3. Go to **Settings > License Manager** to enter your API URL, API Key, and Product ID
4. Enter your license code and client name, then click **Activate**

**Using the API client in your own code:**

The `LM_API_Client` class can be used independently in any WordPress plugin or theme:

```php
$client = new LM_API_Client(
    'https://license.example.com',  // API URL
    'your-api-key',                 // API Key
    'PRODUCT_ID'                    // Product ID
);

// Activate a license
$result = $client->activate_license('XXXX-XXXX-XXXX-XXXX', 'John Doe');
if ($result['is_active']) {
    // Save $result['lic_response'] for future verification
    update_option('my_license_data', $result['lic_response']);
}

// Verify a license
$result = $client->verify_license($license_data);

// Deactivate
$result = $client->deactivate_license($license_data);

// Check for updates
$result = $client->check_update('1.0.0');
if (!empty($result['update_available'])) {
    // New version: $result['version']
}
```

### Adapting for Theme Updates

::: warning
The example is built as a **plugin** updater. If you want to use it for **theme** updates, you need to make these changes:
:::

**1. Define constants in your theme's `functions.php`:**

```php
define('LM_WP_VERSION', wp_get_theme()->get('Version'));
define('LM_WP_PLUGIN_DIR', get_template_directory() . '/license-manager-wp/');
define('LM_WP_PLUGIN_URL', get_template_directory_uri() . '/license-manager-wp/');
define('LM_WP_PLUGIN_BASENAME', get_template()); // theme slug

require_once LM_WP_PLUGIN_DIR . 'license-manager-wp.php';
```

::: danger Important
Only define the constants **once** — either in `functions.php` or in `license-manager-wp.php`, not both. Duplicate `define()` calls cause a PHP fatal error.
:::

**2. Change update hooks in `class-lm-updater.php`:**

```php
// Change FROM (plugin hooks):
add_filter('pre_set_site_transient_update_plugins', [$this, 'check_for_update']);
add_filter('plugins_api', [$this, 'plugin_info'], 10, 3);

// Change TO (theme hooks):
add_filter('pre_set_site_transient_update_themes', [$this, 'check_for_update']);
add_filter('themes_api', [$this, 'plugin_info'], 10, 3);
```

**3. Change transient response format (themes use arrays, not objects):**

```php
// Change FROM (plugin format — object):
$transient->response[$this->plugin_slug] = (object) [
    'slug' => dirname($this->plugin_slug),
    'plugin' => $this->plugin_slug,
    'new_version' => $result['version'],
    // ...
];

// Change TO (theme format — array):
$transient->response['your-theme-slug'] = [
    'theme' => 'your-theme-slug',
    'new_version' => $result['version'],
    'url' => get_option('lm_api_url', ''),
    'package' => $download_url,
];
```

**4. Change `plugin_info` action check:**

```php
// Change FROM:
if ($action !== 'plugin_information') { return $result; }

// Change TO:
if ($action !== 'theme_information') { return $result; }
```

**5. Change `maybe_rename_source` hook key:**

```php
// Change FROM:
$plugin = $hook_extra['plugin'] ?? '';

// Change TO:
$plugin = $hook_extra['theme'] ?? '';
```

**6. Replace activation/deactivation hooks (plugins only → theme hooks):**

```php
// Change FROM (only works for plugins):
register_activation_hook(__FILE__, [$this, 'activate']);
register_deactivation_hook(__FILE__, [$this, 'deactivate']);

// Change TO (works for themes):
add_action('after_switch_theme', [$this, 'activate']);
add_action('switch_theme', [$this, 'deactivate']);
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

**Examples included:**
- **Console App** — Interactive CLI, suitable for WPF, WinForms, or .NET MAUI desktop apps
- **ASP.NET Core API** — Minimal API endpoints wrapping the license client
- **Blazor Server** — Interactive web dashboard with Bootstrap UI

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

**Integration tips:**
- **Spring Boot**: Register `LicenseManagerClient` as a `@Bean` and inject via constructor
- **Android**: Use on a background thread (network calls block the calling thread)
- **Desktop (Swing/JavaFX)**: Call from a background thread, update UI on the event dispatch thread

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

**Integration tips:**
- **Django**: Create a service class or use in a management command
- **Flask/FastAPI**: Register as a dependency and inject into route handlers
- **Desktop (Tkinter/PyQt)**: Call from a background thread to avoid blocking the UI

[View Python example on GitHub](https://github.com/botble/license-manager-examples/tree/main/python)

## Django

A drop-in Django app with API client, middleware, management commands, and JSON API views.

**Features:**
- Reusable Django app (`license_manager/`)
- `VerifyLicenseMiddleware` for global license enforcement
- `@license_required` decorator for per-view protection
- Management commands: `license_activate`, `license_verify`, `license_deactivate`, `license_status`
- JSON API views for activate/verify/deactivate/update-check
- Django cache framework integration for verification caching

**Installation:**

1. Copy the `license_manager/` directory into your Django project
2. Add to `INSTALLED_APPS` in `settings.py`:

```python
INSTALLED_APPS = [
    # ...
    'license_manager',
]
```

3. Configure in `settings.py`:

```python
LICENSE_MANAGER = {
    "SERVER_URL": os.environ.get("LICENSE_MANAGER_SERVER_URL", "https://license.example.com"),
    "API_KEY": os.environ.get("LICENSE_MANAGER_API_KEY", ""),
    "PRODUCT_ID": os.environ.get("LICENSE_MANAGER_PRODUCT_ID", ""),
    "APP_URL": os.environ.get("LICENSE_MANAGER_APP_URL", "https://your-app.com"),
}
```

**Management commands:**

```bash
./manage.py license_activate XXXX-XXXX-XXXX-XXXX "John Doe"
./manage.py license_verify
./manage.py license_status
./manage.py license_deactivate
```

**Middleware (protect all routes):**

```python
MIDDLEWARE = [
    # ...
    'license_manager.middleware.VerifyLicenseMiddleware',
]
```

**Decorator (protect individual views):**

```python
from license_manager.middleware import license_required

@license_required
def premium_feature(request):
    return JsonResponse({"message": "Premium content"})
```

**Quick usage:**

```python
from license_manager.client import LicenseManagerClient

client = LicenseManagerClient()

# Activate
result = client.activate_license("XXXX-XXXX-XXXX", "John Doe")

# Verify (uses cached result when available)
result = client.verify_license()

# Quick boolean check
if client.is_licensed():
    print("License is valid")

# Check for updates
update = client.check_for_update("1.0.0")

# Download update
path = client.download_update(update["update_id"], "./updates")
```

[View Django example on GitHub](https://github.com/botble/license-manager-examples/tree/main/django)

## Node.js

A zero-dependency client using built-in `fetch` (Node 18+) with CLI demo and Express.js server.

**Features:**
- Zero external dependencies (uses built-in `fetch`)
- Interactive CLI sample application
- Express.js API server example with license-gating middleware

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

**Express.js server:**

```bash
LM_SERVER_URL=https://your-server.com LM_API_KEY=your-key LM_APP_URL=https://your-app.com node express-example.js
```

Provides REST endpoints: `POST /license/activate`, `GET /license/verify/:productId`, `POST /license/deactivate/:productId`, `POST /license/update-check`, and more.

**Integration tips:**
- **Express/Fastify/NestJS**: Register client as middleware or service
- **Electron**: Use in the main process; communicate with renderer via IPC
- **Serverless (Lambda)**: Create client per invocation or use a warm instance

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
