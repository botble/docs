# Quick Start

Integrate license validation into your software in 5 minutes.

## TL;DR

```php
// 1. Create client
$client = new LicenseClient('YOUR_API_KEY', 'https://license.yoursite.com', 'PRODUCT_ID');

// 2. Activate (user enters license code once)
$result = $client->activate($licenseCode);
file_put_contents('license.dat', $result['lic_response']);

// 3. Verify (on every app start)
$result = $client->verify(file_get_contents('license.dat'));
if (!$result['is_active']) die('License invalid');
```

## Step 1: Get Your Credentials

From your License Manager admin panel:

| Credential | Where to Find |
|------------|---------------|
| **API URL** | Your License Manager URL (e.g., `https://license.yoursite.com`) |
| **API Key** | Settings → API Keys → Create "External" type |
| **Product ID** | Products → Copy Reference ID |

## Step 2: Add the Client Class

Copy this into your project:

::: code-group

```php [PHP]
class LicenseClient {
    private $apiKey, $baseUrl, $productId;

    public function __construct($apiKey, $baseUrl, $productId) {
        $this->apiKey = $apiKey;
        $this->baseUrl = rtrim($baseUrl, '/');
        $this->productId = $productId;
    }

    public function activate($code) {
        return $this->call('POST', '/license/activate', [
            'product_id' => $this->productId,
            'license_code' => $code,
            'verify_type' => 'non_envato',
        ]);
    }

    public function verify($licenseData) {
        return $this->call('POST', '/license/verify', [
            'product_id' => $this->productId,
            'license_data' => $licenseData,
        ]);
    }

    public function deactivate($licenseData) {
        return $this->call('POST', '/license/deactivate', [
            'product_id' => $this->productId,
            'license_data' => $licenseData,
        ]);
    }

    private function call($method, $endpoint, $data) {
        $ch = curl_init($this->baseUrl . '/api/external' . $endpoint);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'X-API-KEY: ' . $this->apiKey,
                'X-URL: ' . ($_SERVER['HTTP_HOST'] ?? ''),
                'X-IP: ' . ($_SERVER['REMOTE_ADDR'] ?? ''),
            ],
        ]);
        $response = curl_exec($ch);
        curl_close($ch);
        return json_decode($response, true) ?: ['is_active' => false, 'message' => 'Connection failed'];
    }
}
```

```javascript [JavaScript]
class LicenseClient {
    constructor(apiKey, baseUrl, productId) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl.replace(/\/+$/, '');
        this.productId = productId;
    }

    async activate(code) {
        return this.call('POST', '/license/activate', {
            product_id: this.productId,
            license_code: code,
            verify_type: 'non_envato',
        });
    }

    async verify(licenseData) {
        return this.call('POST', '/license/verify', {
            product_id: this.productId,
            license_data: licenseData,
        });
    }

    async deactivate(licenseData) {
        return this.call('POST', '/license/deactivate', {
            product_id: this.productId,
            license_data: licenseData,
        });
    }

    async call(method, endpoint, data) {
        const res = await fetch(`${this.baseUrl}/api/external${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': this.apiKey,
            },
            body: JSON.stringify(data),
        });
        return res.json();
    }
}
```

```python [Python]
import requests

class LicenseClient:
    def __init__(self, api_key, base_url, product_id):
        self.api_key = api_key
        self.base_url = base_url.rstrip('/')
        self.product_id = product_id

    def activate(self, code):
        return self._call('/license/activate', {
            'product_id': self.product_id,
            'license_code': code,
            'verify_type': 'non_envato',
        })

    def verify(self, license_data):
        return self._call('/license/verify', {
            'product_id': self.product_id,
            'license_data': license_data,
        })

    def deactivate(self, license_data):
        return self._call('/license/deactivate', {
            'product_id': self.product_id,
            'license_data': license_data,
        })

    def _call(self, endpoint, data):
        res = requests.post(
            f"{self.base_url}/api/external{endpoint}",
            json=data,
            headers={'X-API-KEY': self.api_key}
        )
        return res.json()
```

:::

## Step 3: Implement the Flow

### Activation (One-time)

Show a license form to users. On submit:

```php
$client = new LicenseClient('YOUR_API_KEY', 'https://license.yoursite.com', 'PRODUCT_ID');

$result = $client->activate($_POST['license_code']);

if ($result['is_active']) {
    // Save this! Required for verify/deactivate
    file_put_contents('license.dat', $result['lic_response']);
    echo 'Activated!';
} else {
    echo 'Error: ' . $result['message'];
}
```

### Verification (Every Request)

Add this to your app's bootstrap:

```php
$licenseData = @file_get_contents('license.dat');

if (!$licenseData) {
    header('Location: /activate.php');
    exit;
}

$client = new LicenseClient('YOUR_API_KEY', 'https://license.yoursite.com', 'PRODUCT_ID');
$result = $client->verify($licenseData);

if (!$result['is_active']) {
    unlink('license.dat');
    header('Location: /activate.php');
    exit;
}

// License valid - continue app
```

::: tip Performance Tip
Cache verification results for 6-24 hours to avoid API calls on every request.
:::

### Deactivation (Optional)

Let users release their license:

```php
$client->deactivate(file_get_contents('license.dat'));
unlink('license.dat');
```

## That's It!

Your software now requires a valid license to run.

## Next Steps

- [Integration Examples](examples.md) - Ready-to-use code for PHP, Laravel & WordPress ([GitHub](https://github.com/botble/license-manager-examples))
- [Integration Guide](integration.md) - Detailed implementation patterns
- [API Reference](api.md) - All API endpoints
- [Demo Playground](demo-playground.md) - Test your setup interactively
- [Troubleshooting](troubleshooting.md) - Common issues
