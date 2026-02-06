# Integration Guide

This guide explains how to integrate License Manager into your software to enforce license activation and verification.

::: warning Important
The generated API code (e.g., `LicenseManagerExternalAPI.php`) is an **API client helper** — it does not enforce licensing by itself. You must call its methods at the right places in your application to activate, verify, and deactivate licenses.
:::

## How It Works

License Manager uses a 3-step flow:

1. **Activate** — User enters their license code on first install. Your software sends it to License Manager and receives encrypted license data.
2. **Verify** — On every application startup or page load, your software sends the stored license data to confirm it's still valid.
3. **Deactivate** — When the user wants to move the license to another server, your software removes the activation.

```
┌─────────────┐     activate(code)      ┌──────────────────┐
│  Your App   │ ───────────────────────► │  License Manager │
│             │ ◄─────────────────────── │     Server       │
│  stores     │   encrypted license data │                  │
│  lic data   │                          │                  │
│             │     verify(lic data)     │                  │
│  on every   │ ───────────────────────► │  checks validity │
│  request    │ ◄─────────────────────── │  domain, IP,     │
│             │   is_active: true/false  │  expiration      │
└─────────────┘                          └──────────────────┘
```

## Prerequisites

Before integrating, ensure you have:

1. **License Manager server** deployed and accessible (e.g., `https://license.yourdomain.com`)
2. **External API Key** — created in **License Manager → Settings → API Keys**
3. **Product** — created in **License Manager → Products** with a reference ID (e.g., `PROD-001`)
4. **License** — created in **License Manager → Licenses** with a license code

## Step 1: Add the API Client

Add the API client class to your software. You can use the SDK examples from the [API Reference](api.md#sdk-examples) or use the code below.

### PHP

```php
class LicenseManagerClient
{
    private string $apiKey;
    private string $baseUrl;
    private string $productId;

    public function __construct(string $apiKey, string $baseUrl, string $productId)
    {
        $this->apiKey = $apiKey;
        $this->baseUrl = rtrim($baseUrl, '/');
        $this->productId = $productId;
    }

    public function activate(string $licenseCode, string $clientName = ''): array
    {
        return $this->request('POST', '/license/activate', [
            'product_id' => $this->productId,
            'license_code' => $licenseCode,
            'client_name' => $clientName,
            'verify_type' => 'non_envato',
        ]);
    }

    public function verify(string $licenseData): array
    {
        return $this->request('POST', '/license/verify', [
            'product_id' => $this->productId,
            'license_data' => $licenseData,
        ]);
    }

    public function deactivate(string $licenseData): array
    {
        return $this->request('POST', '/license/deactivate', [
            'product_id' => $this->productId,
            'license_data' => $licenseData,
        ]);
    }

    private function request(string $method, string $endpoint, array $data): array
    {
        $url = $this->baseUrl . '/api/external' . $endpoint;

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'Accept: application/json',
                'X-API-KEY: ' . $this->apiKey,
                'X-API-URL: ' . ($_SERVER['HTTP_HOST'] ?? ''),
                'X-API-IP: ' . ($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'),
            ],
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $result = json_decode($response, true);

        if (!is_array($result)) {
            return ['is_active' => false, 'message' => 'Connection failed'];
        }

        return $result;
    }
}
```

### JavaScript (Node.js)

```javascript
class LicenseManagerClient {
    constructor(apiKey, baseUrl, productId) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl.replace(/\/+$/, '');
        this.productId = productId;
    }

    async activate(licenseCode, clientName = '') {
        return this.request('POST', '/license/activate', {
            product_id: this.productId,
            license_code: licenseCode,
            client_name: clientName,
            verify_type: 'non_envato',
        });
    }

    async verify(licenseData) {
        return this.request('POST', '/license/verify', {
            product_id: this.productId,
            license_data: licenseData,
        });
    }

    async deactivate(licenseData) {
        return this.request('POST', '/license/deactivate', {
            product_id: this.productId,
            license_data: licenseData,
        });
    }

    async request(method, endpoint, data) {
        const response = await fetch(`${this.baseUrl}/api/external${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': this.apiKey,
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }
}
```

## Step 2: Implement License Activation

Create an activation page or form in your software where users enter their license code. Call `activate()` when they submit.

### PHP Example

```php
// Initialize the client
$client = new LicenseManagerClient(
    apiKey: 'your-external-api-key',
    baseUrl: 'https://license.yourdomain.com',
    productId: 'PROD-001'
);

// When user submits the license form
if ($_POST['action'] === 'activate') {
    $result = $client->activate($_POST['license_code'], $_POST['client_name'] ?? '');

    if ($result['is_active']) {
        // SUCCESS: Save the encrypted license data locally
        file_put_contents('/path/to/license.dat', $result['lic_response']);

        echo 'License activated successfully!';
    } else {
        // FAILED: Show error message
        echo 'Activation failed: ' . $result['message'];
    }
}
```

::: tip
The `lic_response` (or `data.license_data`) field contains encrypted activation data. You **must store this locally** — it is required for all subsequent verify and deactivate calls.
:::

### Where to Store License Data

| Storage Method | Best For |
|----------------|----------|
| File (e.g., `license.dat`) | Simple PHP/Node apps |
| Database table | Web applications with database |
| Config file | Desktop or CLI applications |
| Environment variable | Containerized deployments |

## Step 3: Verify License on Every Request

This is the most important step. Without verification, your software will not enforce the license.

Add license verification to your application's bootstrap, middleware, or startup code so it runs on **every request or application start**.

### PHP Example (Middleware/Bootstrap)

```php
// Run this on every request (e.g., in middleware or bootstrap file)
function checkLicense(): bool
{
    $licenseFile = '/path/to/license.dat';

    // No license file = not activated
    if (!file_exists($licenseFile)) {
        return false;
    }

    $licenseData = file_get_contents($licenseFile);

    if (empty($licenseData)) {
        return false;
    }

    $client = new LicenseManagerClient(
        apiKey: 'your-external-api-key',
        baseUrl: 'https://license.yourdomain.com',
        productId: 'PROD-001'
    );

    $result = $client->verify($licenseData);

    return !empty($result['is_active']);
}

// Usage in your application
if (!checkLicense()) {
    // Redirect to license activation page
    // or show "License required" message
    // or restrict functionality
    header('Location: /activate-license');
    exit;
}
```

### Laravel Middleware Example

```php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyLicense
{
    public function handle(Request $request, Closure $next)
    {
        $licenseData = cache()->get('license_data');

        if (!$licenseData) {
            $licenseData = file_get_contents(storage_path('license.dat'));
        }

        if (empty($licenseData)) {
            return redirect()->route('license.activate');
        }

        $client = new LicenseManagerClient(
            config('license.api_key'),
            config('license.server_url'),
            config('license.product_id')
        );

        $result = $client->verify($licenseData);

        if (empty($result['is_active'])) {
            // Clear cached data and redirect
            cache()->forget('license_data');
            return redirect()->route('license.activate')
                ->with('error', $result['message'] ?? 'License verification failed.');
        }

        // Cache the result to avoid checking on every single request
        cache()->put('license_data', $licenseData, now()->addHours(6));

        return $next($request);
    }
}
```

::: tip Performance
Verifying on **every single HTTP request** can be slow. Consider caching the verification result for a period (e.g., 6–24 hours) and only re-verifying when the cache expires.
:::

## Step 4: Implement Deactivation

Provide a way for users to deactivate their license (e.g., when migrating to a new server). This frees up a parallel use slot.

### PHP Example

```php
if ($_POST['action'] === 'deactivate') {
    $licenseData = file_get_contents('/path/to/license.dat');

    $result = $client->deactivate($licenseData);

    if (!empty($result['is_active'])) {
        // Remove stored license data
        unlink('/path/to/license.dat');
        echo 'License deactivated. You can now activate on another domain.';
    } else {
        echo 'Deactivation failed: ' . $result['message'];
    }
}
```

## Complete Integration Example

Here's a minimal but complete PHP example showing all three operations:

```php
<?php
require_once 'LicenseManagerClient.php';

$client = new LicenseManagerClient(
    apiKey: 'your-external-api-key',
    baseUrl: 'https://license.yourdomain.com',
    productId: 'PROD-001'
);

$licenseFile = __DIR__ . '/license.dat';
$action = $_POST['action'] ?? '';

// Handle activation
if ($action === 'activate' && !empty($_POST['license_code'])) {
    $result = $client->activate($_POST['license_code']);

    if ($result['is_active']) {
        file_put_contents($licenseFile, $result['lic_response']);
        $message = 'License activated successfully!';
    } else {
        $error = $result['message'];
    }
}

// Handle deactivation
if ($action === 'deactivate' && file_exists($licenseFile)) {
    $client->deactivate(file_get_contents($licenseFile));
    unlink($licenseFile);
    $message = 'License deactivated.';
}

// Check license status
$isLicensed = false;
if (file_exists($licenseFile)) {
    $result = $client->verify(file_get_contents($licenseFile));
    $isLicensed = !empty($result['is_active']);
}
?>

<?php if ($isLicensed): ?>
    <!-- Your application content here -->
    <h1>Welcome! Your software is licensed.</h1>

    <form method="post">
        <input type="hidden" name="action" value="deactivate">
        <button type="submit">Deactivate License</button>
    </form>
<?php else: ?>
    <!-- License activation form -->
    <h1>Enter Your License Code</h1>

    <?php if (!empty($error)): ?>
        <p style="color: red;"><?= htmlspecialchars($error) ?></p>
    <?php endif; ?>

    <form method="post">
        <input type="hidden" name="action" value="activate">
        <input type="text" name="license_code" placeholder="XXXX-XXXX-XXXX-XXXX" required>
        <button type="submit">Activate</button>
    </form>
<?php endif; ?>
```

## Checklist

Use this checklist to ensure your integration is complete:

- [ ] API client class added to your software
- [ ] API key, server URL, and product ID configured
- [ ] Activation form/page created for users to enter license codes
- [ ] `lic_response` saved locally after successful activation
- [ ] License verification runs on application startup or every request
- [ ] Application blocks access or shows a warning when verification fails
- [ ] Deactivation option available for users to migrate licenses
- [ ] Error messages displayed to users on activation/verification failure

## Common Issues

### "I added the code but nothing happens"

The API client class alone does not enforce licensing. You must:
1. Call `activate()` when a user submits their license code
2. Store the returned `lic_response` locally
3. Call `verify()` on every startup/request and block access if it fails

### "Activation succeeds but verification fails"

- Ensure you stored the `lic_response` value (not the full API response)
- Verify the domain sending the request matches the domain used during activation
- Check that the license has not expired

### "Connection failed"

- Verify the License Manager server URL is correct and accessible
- Check that the External API Key is valid and not expired
- Ensure your server can make outbound HTTPS requests (firewall/proxy)

### "License code is invalid"

- Confirm the license code exists in **License Manager → Licenses**
- Check the license is marked as **Is Valid = Yes**
- Verify the product reference ID matches the license's product

For more troubleshooting, see [Troubleshooting](troubleshooting.md).
