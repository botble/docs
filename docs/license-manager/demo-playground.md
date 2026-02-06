# API Demo Playground

Test License Manager APIs without writing code.

**Live Demo:** [https://license-app-demo.botble.com](https://license-app-demo.botble.com)

## What You Can Test

| Page | API Type | Operations |
|------|----------|------------|
| [External API](https://license-app-demo.botble.com/index.php) | Client-side | Activate, Verify, Deactivate, Check Updates |
| [Internal API](https://license-app-demo.botble.com/internal.php) | Server-side | List/Create Products, Manage Licenses |

## Setup

You'll need these from your License Manager admin panel:

| Credential | Where to Find | Used For |
|------------|---------------|----------|
| API URL | Your installation URL | Both APIs |
| External API Key | Settings → API Keys (External type) | External API |
| Internal API Key | Settings → API Keys (Internal type) | Internal API |
| Product ID | Products → Reference ID | Both APIs |
| License Code | Licenses → Code | External API |

## External API Demo

Test the license flow your software will use.

### Operations

| Button | What It Does | API Endpoint |
|--------|--------------|--------------|
| **Test Connection** | Verify API is reachable | `GET /api/external/connection-check` |
| **Activate** | Register license for domain/IP | `POST /api/external/license/activate` |
| **Verify** | Check if activation is valid | `POST /api/external/license/verify` |
| **Deactivate** | Release activation slot | `POST /api/external/license/deactivate` |

### Updates Manager

| Button | What It Does | API Endpoint |
|--------|--------------|--------------|
| **Get Latest Version** | Get newest version info | `POST /api/external/update/latest` |
| **Check Update** | Compare with current version | `POST /api/external/update/check` |
| **Get Size** | Get file size before download | `GET /api/external/update/{v}/download/{type}/size` |

### Typical Flow

1. Enter API URL, Key, Product ID, License Code
2. Click **Save Configuration**
3. Click **Test Connection** → should show "OK"
4. Click **Activate** → stores encrypted token
5. Click **Verify** → confirms activation is valid
6. Click **Deactivate** → releases the slot

## Internal API Demo

Test admin operations (use **Internal** API key).

### Operations

| Section | Operations |
|---------|------------|
| **Products** | List All, Get by ID |
| **Licenses** | List All, Get by ID, Create, Block, Unblock |

### Create License Fields

| Field | Required | Description |
|-------|----------|-------------|
| Product ID | Yes | Product reference ID |
| License Code | No | Auto-generated if empty |
| Client Name | No | Customer name |
| Client Email | No | Customer email |
| Parallel Uses | No | Max simultaneous activations (default: 1) |

## Response Panel

The playground shows:

- **Request** - Method, URL, headers, body
- **Response** - Syntax-highlighted JSON with HTTP status
- **Copy** - Copy response to clipboard

## Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| Connection Failed | Wrong URL or key | Check API URL has `https://`, key is correct type |
| 401 Unauthorized | Invalid API key | Regenerate key, check External vs Internal |
| License not found | Wrong code/product | Verify code exists and matches product |
| Already activated | Max uses reached | Deactivate elsewhere or increase parallel uses |
| 422 Validation | Missing fields | Check response for specific field errors |

## Self-Hosting

The demo app is included in License Manager at `/demo-app/`:

```
demo-app/
├── index.php      # External API demo
├── internal.php   # Internal API demo
├── api.php        # Shared functions
└── .htaccess      # Security config
```

Deploy to any PHP-enabled web server. Data is stored in sessions only (no persistence).

## See Also

- [Quick Start](quick-start.md) - 5-minute integration guide
- [API Reference](api.md) - Complete endpoint documentation
- [Troubleshooting](troubleshooting.md) - More error solutions
