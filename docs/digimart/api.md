---
title: REST API
description: Public API for product management and licensing
---

# REST API

DigiMart provides a REST API for programmatic access to marketplace data, product downloads, and license management.

## Authentication

All API requests require a public access token in the `Authorization` header:

```bash
Authorization: Token {access_token}
```

### Create an Access Token

Generate a token via command line:

```bash
php artisan api:public-access-token-create
```

Or via Admin → Public API Access Tokens → Create.

Store your token securely; you cannot retrieve it if lost.

## Base URL

```
https://your-marketplace.com/api/v1
```

## Content Types

- **Request:** `Content-Type: application/json`
- **Response:** JSON

## Common Response Structure

Success:
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

Error:
```json
{
  "success": false,
  "errors": { "field": ["error message"] },
  "message": "Validation failed"
}
```

## Endpoints

### Products

#### List Products

```http
GET /api/v1/products
Authorization: Token {access_token}
```

Query parameters:
- `page` — Page number (default: 1)
- `per_page` — Results per page (default: 15)
- `category` — Filter by category slug
- `tag` — Filter by tag slug
- `search` — Search by name
- `sort` — Sort order (newest, popular, rated)

Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "My Plugin",
      "slug": "my-plugin",
      "type": "plugin",
      "category": "wordpress-plugins",
      "short_description": "A useful plugin",
      "price": 29.99,
      "author": {
        "id": 1,
        "name": "John Doe"
      },
      "rating": 4.8,
      "downloads": 1250,
      "created_at": "2025-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 15,
    "total": 245
  }
}
```

#### Get Product Details

```http
GET /api/v1/products/{id}
Authorization: Token {access_token}
```

Response:
```json
{
  "id": 1,
  "name": "My Plugin",
  "slug": "my-plugin",
  "type": "plugin",
  "category": "wordpress-plugins",
  "short_description": "A useful plugin",
  "long_description": "Detailed description...",
  "price": 29.99,
  "author": {
    "id": 1,
    "name": "John Doe",
    "avatar_url": "https://..."
  },
  "rating": 4.8,
  "reviews_count": 45,
  "downloads": 1250,
  "versions": [
    {
      "id": 1,
      "number": "1.2.0",
      "released_at": "2025-06-10T10:00:00Z",
      "compatibility": "WordPress 6.0+, PHP 8.0+"
    }
  ],
  "dependencies": [],
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-06-10T10:30:00Z"
}
```

#### Check for Updates

```http
POST /api/v1/products/check-update
Authorization: Token {access_token}
Content-Type: application/json

{
  "product_id": "my-plugin",
  "current_version": "1.0.0"
}
```

Response:
```json
{
  "has_update": true,
  "latest_version": "1.2.0",
  "download_url": "https://your-marketplace.com/api/v1/products/1/download",
  "changelog": "Fixed security issues, improved performance"
}
```

#### Get Embeddable Product View

```http
GET /api/v1/products/{id}/iframe
Authorization: Token {access_token}
```

Returns HTML iframe code for embedding product page on external sites.

#### Download Product

```http
POST /api/v1/products/{id}/download
Authorization: Token {access_token}
Content-Type: application/json

{
  "license_key": "optional-license-key",
  "purchase_code": "optional-purchase-code"
}
```

Response: File download (ZIP) or error if license required.

### Categories & Tags

#### List Categories

```http
GET /api/v1/category
Authorization: Token {access_token}
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "WordPress Plugins",
      "slug": "wordpress-plugins",
      "parent_id": null,
      "children": [
        {
          "id": 2,
          "name": "SEO Plugins",
          "slug": "seo-plugins"
        }
      ]
    }
  ]
}
```

#### List Tags

```http
GET /api/v1/tags
Authorization: Token {access_token}
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Featured",
      "slug": "featured"
    }
  ]
}
```

### Licensing

#### Validate ZIP File

```http
POST /api/v1/products/validate-zipfile
Authorization: Token {access_token}

{
  "file": <binary-file-data>
}
```

Used to validate product archives before upload. Returns validation result.

#### Activate License

```http
POST /api/v1/products/license/activate
Authorization: Token {access_token}
Content-Type: application/json

{
  "product_id": "my-plugin",
  "purchase_code": "abc12def34ghi56",
  "domain": "example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "License activated",
  "activation": {
    "id": "act_123",
    "domain": "example.com",
    "activated_at": "2025-06-15T10:30:00Z",
    "expires_at": "2026-06-15T10:30:00Z"
  }
}
```

#### Deactivate License

```http
POST /api/v1/products/license/deactivate
Authorization: Token {access_token}
Content-Type: application/json

{
  "product_id": "my-plugin",
  "purchase_code": "abc12def34ghi56",
  "domain": "example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "License deactivated",
  "remaining_activations": 4
}
```

#### Check License Status

```http
GET /api/v1/products/license/status?product_id=my-plugin&domain=example.com&purchase_code=abc12def34ghi56
Authorization: Token {access_token}
```

Response:
```json
{
  "valid": true,
  "status": "active",
  "domain": "example.com",
  "activated_at": "2025-06-15T10:30:00Z",
  "expires_at": "2026-06-15T10:30:00Z",
  "remaining_activations": 4
}
```

## Rate Limiting

API requests are rate-limited:

- **Free tier:** 500 requests per day
- **Paid tier:** 10,000 requests per day

Responses include rate-limit headers:
```
X-RateLimit-Limit: 500
X-RateLimit-Remaining: 450
X-RateLimit-Reset: 1623859200
```

## Error Handling

Common error responses:

| Code | Message | Meaning |
|------|---------|---------|
| 400 | Bad Request | Invalid parameters |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | Token lacks permission |
| 404 | Not Found | Resource not found |
| 422 | Unprocessable Entity | Validation error |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Internal error |

## Usage Examples

### List Available Products

```bash
curl -H "Authorization: Token abc123..." \
  https://your-marketplace.com/api/v1/products
```

### Download a Product

```bash
curl -X POST -H "Authorization: Token abc123..." \
  -H "Content-Type: application/json" \
  -d '{"license_key":"optional-key"}' \
  https://your-marketplace.com/api/v1/products/1/download \
  --output product.zip
```

### Activate License

```bash
curl -X POST -H "Authorization: Token abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": "my-plugin",
    "purchase_code": "abc12def34ghi56",
    "domain": "example.com"
  }' \
  https://your-marketplace.com/api/v1/products/license/activate
```

## Webhook Events (Optional)

Set up webhooks to receive notifications for:
- Product published
- Product updated
- License activated
- License deactivated

Contact admin to configure webhook endpoints.

::: tip
For production integrations, store tokens securely (env variables, secrets manager). Rotate tokens periodically and revoke unused ones.
:::

See [Licensing](./licensing.md) for license management details.
