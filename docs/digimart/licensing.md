---
title: Product Licensing
description: Manage licenses, activations, and access tokens
---

# Product Licensing

DigiMart provides a complete licensing system to control product distribution, enforce license requirements, and manage per-domain activations.

**Access:** Admin → Product Licensing

## Licensing Overview

A license grants a customer the right to use a product on one domain. Each license supports:

- **Domain Activation** — Activate the license on specific domains
- **Multiple Activations** — Activate the same license on different domains (up to a limit)
- **Deactivation** — Release a license slot to use it on another domain
- **Verification** — Check if a license is valid before download

License verification uses either:
- **Envato Purchase Code** — CodeCanyon purchase code from the original sale
- **Custom License Key** — Generated key issued by the marketplace

## License Activation Workflow

### 1. Customer Purchases Product

Customer buys a licensed product. A license record is created with:
- Product identifier
- License key or purchase code
- Issue date and expiration
- Maximum domain activations (e.g., 5 domains)

### 2. Activate License for a Domain

Customer activates the license on their site:

**Via Admin Panel:**
Admin → Product Licensing → License Activations → Create

**Via Public API:**
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

**Response:**
```json
{
  "success": true,
  "message": "License activated for domain example.com",
  "activation": {
    "id": "act_123",
    "domain": "example.com",
    "activated_at": "2025-06-15T10:30:00Z",
    "expires_at": "2026-06-15T10:30:00Z"
  }
}
```

### 3. Verify License Status

Check if a license is valid and active:

**Via Public API:**
```http
GET /api/v1/products/license/status?product_id=my-plugin&domain=example.com&purchase_code=abc12def34ghi56
Authorization: Token {access_token}
```

**Response:**
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

### 4. Deactivate License

Release a domain activation to use the license elsewhere:

**Via Admin Panel:**
Admin → Product Licensing → License Activations → Click activation → Deactivate

**Via Public API:**
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

## Admin License Management

### Product Licenses

View and manage all licenses issued for your products:

1. Go to **Product Licensing** → **Product Licenses**
2. See licenses by:
   - Product
   - Customer
   - Status (Active, Expired, Revoked)
   - Issue date

**Actions:**
- View license details and activation history
- Revoke a license (invalidates all activations)
- Extend expiration date
- Adjust maximum activation count

### License Activations

Track which domains have activated licenses:

1. Go to **Product Licensing** → **License Activations**
2. See all activations with:
   - Product and domain
   - Customer and activation date
   - Expiration date
   - Status (Active, Expired, Deactivated)

**Actions:**
- Deactivate a domain
- Extend activation expiration
- Manually create activations (for support purposes)

## Public API Access Tokens

The public API (`/api/v1/*`) requires a bearer token for authentication.

### Create an Access Token

```bash
php artisan api:public-access-token-create
```

Follow the prompts to:
- Enter a name for the token (e.g., "Mobile App", "CI/CD Pipeline")
- Confirm creation

The CLI outputs your token:
```
Token: abc123def456ghi789jkl012mno345pqr678
```

**Save this token securely.** You cannot retrieve it again if lost.

### Manage Tokens (Admin UI)

1. Go to Admin → **Public API Access Tokens**
2. See all issued tokens with:
   - Name and creation date
   - Last used date
   - Scope (permissions)
   - Status (Active, Revoked)

**Actions:**
- Revoke a token (invalidates all API calls using it)
- View token usage statistics
- Regenerate a token (creates a new token, invalidates the old one)

### Using the API Token

Send the token as a Bearer token in the `Authorization` header:

```bash
curl -H "Authorization: Token abc123def456ghi789jkl012mno345pqr678" \
  https://your-marketplace.com/api/v1/products
```

## License Verification Flow

```
Customer requests download
         ↓
Check: marketplace_requires_license enabled?
         ├─ No → Allow download
         └─ Yes → Request license key/purchase code
                   ↓
              Verify via API or database
                   ├─ Valid & active → Allow download
                   └─ Invalid/expired → Block download, show error
```

## Integration with Products

When creating a product, authors can specify:

- **Requires License** — Toggle whether license verification is needed
- **License Type** — Envato purchase code, custom key, or none
- **Max Activations Per License** — How many domains can activate one license (default: 1)

## Troubleshooting

**License activation fails:**
- Verify purchase code is correct (8 characters, no spaces)
- Ensure the domain is not blacklisted (see [Settings](./settings.md))
- Check that the product is published and requires licenses
- Verify the license has remaining activation slots

**API token rejected:**
- Verify the token has not been revoked
- Check Authorization header format: `Token {token}`
- Ensure you're using the correct base URL for API calls

**License expired:**
- Renewal/extension is handled by the marketplace admin
- Customers cannot extend their own licenses via the API
- Envato handles renewal for CodeCanyon purchases

::: tip
For client-side license verification, create a dedicated public API token with minimal scopes. Rotate tokens periodically and revoke unused tokens.
:::

See [REST API](./api.md) for complete API reference.
