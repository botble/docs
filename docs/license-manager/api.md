# API Reference

The License Manager provides two API sets: External API for client applications and Internal API for admin operations.

## Authentication

All API requests require authentication via API keys.

### API Key Types

| Type | Purpose | Header |
|------|---------|--------|
| External | Client applications | `X-API-KEY` |
| Internal | Admin/backend operations | `X-API-KEY` |

### Creating API Keys

1. Go to **License Manager → Settings → API Keys**
2. Click **Create**
3. Select type (Internal/External)
4. Set expiration (optional)
5. Save and copy the key

### Request Headers

```
X-API-KEY: your-api-key
X-API-URL: https://client-domain.com
X-API-IP: 192.168.1.100
X-API-LANGUAGE: en
Content-Type: application/json
Accept: application/json
```

### Legacy Header Support

For backward compatibility with LicenseBox, these legacy headers are also supported:

| Modern Header | Legacy Header |
|---------------|---------------|
| `X-API-KEY` | `LB-API-KEY` |
| `X-API-URL` | `LB-URL` |
| `X-API-IP` | `LB-IP` |
| `X-API-LANGUAGE` | `LB-LANG` |

::: tip
Legacy headers work with both new and legacy API endpoints. Useful during migration.
:::

## External API

Base URL: `/api/external`

Used by client applications for license operations.

### Connection Check

Verify API connectivity.

```http
GET /api/external/connection-check
```

**Response:**
```json
{
  "status": true,
  "message": "Connection successful"
}
```

### Health Check

Simple health check endpoint (no authentication required).

```http
GET /api/health-check
```

**Response:**
```json
{
  "status": "ok"
}
```

### Activate License

Activate a license on a domain/IP.

```http
POST /api/external/license/activate
```

**Headers:**
```
X-API-KEY: external-key
X-API-URL: https://client-site.com
X-API-IP: 192.168.1.100
```

**Body:**
```json
{
  "product_id": "PROD-001",
  "license_code": "LICENSE-CODE-HERE",
  "client_name": "Customer Name",
  "verify_type": "non_envato"
}
```

| Field | Description | Required |
|-------|-------------|----------|
| `product_id` | Product reference ID | Yes |
| `license_code` | License code to activate | Yes |
| `client_name` | Customer/buyer name | No |
| `verify_type` | `non_envato` or `envato` | No |

**Response (Success):**
```json
{
  "is_active": true,
  "message": "Activated.",
  "lic_response": "<encrypted-license-data>",
  "data": {
    "license_data": "<encrypted-license-data>"
  }
}
```

**Response (Error):**
```json
{
  "is_active": false,
  "message": "Your license code is invalid.",
  "lic_response": null,
  "data": null
}
```

::: tip
The `lic_response` and `data.license_data` contain encrypted activation data that should be stored locally by the client for subsequent verify/deactivate calls.
:::

### Verify License

Check if a license is valid for current domain/IP.

```http
POST /api/external/license/verify
```

**Body:**
```json
{
  "product_id": "PROD-001",
  "license_data": "<encrypted-license-data>",
  "client_name": "Customer Name"
}
```

| Field | Description | Required |
|-------|-------------|----------|
| `product_id` | Product reference ID | Yes |
| `license_data` | Encrypted data from activation (or `license_file` for legacy) | Yes |
| `client_name` | Customer/buyer name | No |

**Response (Valid):**
```json
{
  "is_active": true,
  "message": "Verified.",
  "data": null
}
```

**Response (Invalid):**
```json
{
  "is_active": false,
  "message": "License is invalid or not assigned to you.",
  "data": null
}
```

### Deactivate License

Remove activation from current domain/IP.

```http
POST /api/external/license/deactivate
```

**Body:**
```json
{
  "product_id": "PROD-001",
  "license_data": "<encrypted-license-data>",
  "client_name": "Customer Name"
}
```

| Field | Description | Required |
|-------|-------------|----------|
| `product_id` | Product reference ID | Yes |
| `license_data` | Encrypted data from activation (or `license_file` for legacy) | Yes |
| `client_name` | Customer/buyer name | No |

**Response (Success):**
```json
{
  "is_active": true,
  "message": "Deactivated."
}
```

**Response (Error):**
```json
{
  "is_active": false,
  "message": "License is invalid or not assigned to you."
}
```

### Check License

Check license status without activating.

```http
POST /api/external/license/check
```

**Body:**
```json
{
  "license_code": "LICENSE-CODE-HERE"
}
```

### Check for Updates

Get available updates for a product.

```http
POST /api/external/update/check
```

**Body:**
```json
{
  "product_id": "PROD-001",
  "current_version": "1.0.0"
}
```

**Response (Update Available):**
```json
{
  "is_active": true,
  "message": "A new update is available.",
  "update_available": true,
  "version": "1.2.0",
  "released_at": "2024-01-15",
  "summary": "New features and improvements",
  "changelog": "<ul><li>Feature A</li><li>Bug fix B</li></ul>",
  "update_id": "v1.2.0",
  "has_sql": false
}
```

**Response (No Update):**
```json
{
  "is_active": true,
  "message": "You are using the latest version.",
  "update_available": false,
  "version": null
}
```

### Get Latest Version

Get latest version info.

```http
POST /api/external/update/latest
```

**Body:**
```json
{
  "product_id": "PROD-001"
}
```

**Response:**
```json
{
  "data": {
    "version": "1.2.0",
    "released_at": "2024-01-15",
    "summary": "New features",
    "changelog": "...",
    "update_id": "v1.2.0",
    "has_sql": false
  }
}
```

### Download Update

Download update file.

```http
POST /api/external/update/{version}/download/{type}
```

**Parameters:**
- `version`: Version ID to download
- `type`: `main` or `sql`

**Body:**
```json
{
  "product_id": "PROD-001",
  "license_data": "<encrypted-license-data>"
}
```

::: tip
Returns the file as a binary download stream.
:::

### Get Download Size

Get file size before downloading.

```http
GET /api/external/update/{version}/download/{type}/size
```

**Response Headers:**
```
Content-Length: 1048576
Content-Type: application/zip
```

## Internal API

Base URL: `/api/internal`

Used for admin/backend operations.

### Products

#### List Products

```http
GET /api/internal/products
```

#### Get Product

```http
GET /api/internal/products/{reference_id}
```

#### Create Product

```http
POST /api/internal/products
```

**Body:**
```json
{
  "name": "My Product",
  "reference_id": "MY-PROD-001",
  "envato_id": "12345678",
  "description": "Product description",
  "license_update": true,
  "serve_latest_updates": true,
  "is_active": true
}
```

#### Update Product

```http
PUT /api/internal/products/{reference_id}
```

#### Activate/Deactivate Product

```http
POST /api/internal/activated-products/{reference_id}
DELETE /api/internal/activated-products/{reference_id}
```

### Product Versions

#### List Versions

```http
GET /api/internal/products/{reference_id}/versions
```

#### Create Version

```http
POST /api/internal/products/{reference_id}/versions
```

**Body:**
```json
{
  "version_id": "v1.2.0",
  "version": "1.2.0",
  "summary": "New features release",
  "changelog": "<ul><li>Feature A</li><li>Bug fix B</li></ul>",
  "released_at": "2024-01-15",
  "is_active": true
}
```

#### Get Version

```http
GET /api/internal/products/{reference_id}/versions/{version_id}
```

#### Update Version

```http
POST /api/internal/products/{reference_id}/versions/{version_id}
```

### Licenses

#### List Licenses

```http
GET /api/internal/product-licenses
```

**Query Parameters:**
- `search`: Search term
- `product_reference_id`: Filter by product
- `customer_id`: Filter by customer

#### Get License

```http
GET /api/internal/product-licenses/{id}
```

#### Create License

```http
POST /api/internal/product-licenses
```

**Body:**
```json
{
  "product_reference_id": "PROD-001",
  "license_code": "LIC-ABC-123",
  "type": "perpetual",
  "customer_id": "CUST-001",
  "email": "customer@example.com",
  "parallel_uses": 3,
  "expires_at": "2025-12-31",
  "updates_until": "2025-12-31",
  "domains": ["example.com", "*.example.com"],
  "ips": ["192.168.1.100"],
  "is_valid": true,
  "is_envato": false
}
```

#### Update License

```http
PUT /api/internal/product-licenses/{id}
```

#### Block/Unblock License

```http
POST /api/internal/blocked-product-licenses/{id}
DELETE /api/internal/blocked-product-licenses/{id}
```

### Activations

#### Create Activation

```http
POST /api/internal/activated-product-activations/{id}
```

#### Delete Activation

```http
DELETE /api/internal/activated-product-activations/{id}
```

## Error Responses

All errors follow this format:

```json
{
  "status": false,
  "message": "Error description",
  "errors": {
    "field_name": ["Validation error message"]
  }
}
```

### Common Error Codes

| HTTP Code | Description |
|-----------|-------------|
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid or missing API key |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 422 | Validation Error - Invalid input data |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Server Error - Internal error |

## Rate Limiting

Configure in **Settings → API**:

- **Rate limit period**: Number of requests allowed per minute (default: 3000)
- **Rate limit method**: How to track limits:
  - `ip_address` - Limit by client IP
  - `api_key` - Limit by API key
  - `api_key_ip_address` - Limit by both (strictest)

Setting: `lm_requests_rate_limiting_period` (requests per minute)

When exceeded:
```json
{
  "status": false,
  "message": "Rate limit exceeded. Try again later."
}
```

## Encryption

For secure license data transmission:

### Encrypted License Format

```json
{
  "license_file": "base64-encoded-encrypted-data"
}
```

### Decryption

The system supports:
- AES-128-CBC
- AES-256-CBC
- AES-128-GCM
- AES-256-GCM
- Legacy encryption (for migration)

## Webhooks

See [Webhooks Documentation](webhooks.md) for event notifications.

## SDK Examples

### PHP Client

```php
class LicenseClient
{
    private string $apiKey;
    private string $baseUrl;

    public function __construct(string $apiKey, string $baseUrl)
    {
        $this->apiKey = $apiKey;
        $this->baseUrl = $baseUrl;
    }

    public function activate(string $licenseCode, string $domain): array
    {
        return $this->request('POST', '/license/activate', [
            'license_code' => $licenseCode,
        ], [
            'X-API-URL' => $domain,
            'X-API-IP' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
        ]);
    }

    public function verify(string $licenseCode): array
    {
        return $this->request('POST', '/license/verify', [
            'license_code' => $licenseCode,
        ]);
    }

    private function request(string $method, string $endpoint, array $data, array $headers = []): array
    {
        $ch = curl_init($this->baseUrl . '/api/external' . $endpoint);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => array_merge([
                'Content-Type: application/json',
                'Accept: application/json',
                'X-API-KEY: ' . $this->apiKey,
            ], array_map(fn($k, $v) => "$k: $v", array_keys($headers), $headers)),
        ]);
        $response = curl_exec($ch);
        curl_close($ch);
        return json_decode($response, true);
    }
}
```

### JavaScript Client

```javascript
class LicenseClient {
    constructor(apiKey, baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    async activate(licenseCode, domain) {
        return this.request('POST', '/license/activate', {
            license_code: licenseCode
        }, {
            'X-API-URL': domain
        });
    }

    async verify(licenseCode) {
        return this.request('POST', '/license/verify', {
            license_code: licenseCode
        });
    }

    async request(method, endpoint, data, extraHeaders = {}) {
        const response = await fetch(`${this.baseUrl}/api/external${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': this.apiKey,
                ...extraHeaders
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
}
```
