# Licenses

Licenses authorize customers to use your software products. Each license is tied to a product and can have various restrictions and validity periods.

## Creating a License

1. Navigate to **License Manager → Licenses**
2. Click **Create**
3. Fill in the license details:

| Field | Description | Required |
|-------|-------------|----------|
| Product | Select the product | Yes |
| License Code | Unique license key (auto-generated if empty) | Yes |
| Type | License type (perpetual, subscription, etc.) | No |
| Customer ID | Customer identifier (client_id) | No |
| Email | License holder's email | No |
| Invoice | Invoice/order reference | No |
| Parallel Uses | Max concurrent activations (empty = unlimited) | No |
| Expires At | License expiration date | No |
| Updates Until | Update support end date | No |
| Support Until | Support end date | No |
| Domains | Allowed domains (JSON array) | No |
| IPs | Allowed IP addresses (JSON array) | No |
| Comments | Internal notes | No |
| Is Valid | License status (valid/blocked) | Yes |
| Is Envato | From Envato marketplace | No |

4. Click **Save**

## License Code Format

License codes can be:

- **Auto-generated**: Random alphanumeric string (e.g., `ABC12-DEF34-GHI56`)
- **Custom**: Any unique string you define
- **Envato**: Purchase code from Envato marketplace

## License Types

Common license types:

| Type | Description |
|------|-------------|
| `perpetual` | Never expires |
| `subscription` | Requires renewal |
| `trial` | Limited trial period |
| `lifetime` | Permanent with updates |

## Parallel Uses

Control concurrent activations:

- **Empty/Null**: Unlimited activations allowed
- **1**: Single installation only
- **N**: Up to N simultaneous installations

When a new activation exceeds the limit:
- If "Deactivate Old" is enabled: Oldest activation is deactivated
- Otherwise: Activation is rejected

## Domain & IP Whitelisting

Restrict license usage to specific domains or IPs:

```json
// Domains field
["example.com", "*.example.com", "subdomain.example.com"]

// IPs field
["192.168.1.100", "10.0.0.*"]
```

Features:
- Wildcard support with `*`
- Domain normalization (www removed automatically)
- Case-insensitive matching

## License Expiration

### Expiration Dates

| Field | Purpose |
|-------|---------|
| Expires At | Full license expiration |
| Updates Until | Update delivery ends |
| Support Until | Support coverage ends |

### Expiration Notifications

When enabled, the system sends email warnings:

1. Configure warning days in Settings (e.g., "7,1")
2. Emails sent at X days before expiry
3. Webhooks triggered for automated workflows

### Processing Expirations

Run manually or via cron:

```bash
php artisan cms:license-manager:process-expirations
```

This command:
- Logs expired licenses
- Sends warning emails
- Triggers webhooks
- Updates activity logs

## License Status

### Valid vs Blocked

- **Valid (is_valid = true)**: License can be used
- **Blocked (is_valid = false)**: License is blacklisted

### Blocking a License

From admin panel:
1. Edit the license
2. Uncheck "Is Valid"
3. Save

Via API:
```bash
POST /api/internal/blocked-product-licenses/{license_id}
```

### Unblocking a License

From admin panel:
1. Edit the license
2. Check "Is Valid"
3. Save

Via API:
```bash
DELETE /api/internal/blocked-product-licenses/{license_id}
```

## Searching Licenses

Search by multiple criteria:

- License code
- Email
- Customer ID
- Product
- Status

### Advanced Search

```bash
GET /api/internal/product-licenses?search=keyword&product_reference_id=PROD-001
```

## API Operations

### List Licenses

```bash
GET /api/internal/product-licenses
Headers:
  X-API-KEY: your-internal-api-key
```

### Get License

```bash
GET /api/internal/product-licenses/{license_id}
```

### Create License

```bash
POST /api/internal/product-licenses
{
  "product_reference_id": "PROD-001",
  "license_code": "CUSTOM-LICENSE-KEY",
  "email": "customer@example.com",
  "customer_id": "CUST-001",
  "parallel_uses": 3,
  "expires_at": "2025-12-31",
  "is_valid": true
}
```

### Update License

```bash
PUT /api/internal/product-licenses/{license_id}
{
  "parallel_uses": 5,
  "expires_at": "2026-12-31"
}
```

::: tip
Licenses can be deleted from the admin panel. This will also remove all associated activations.
:::

## Sending License Emails

Send license details to customers:

1. From Licenses list, click the email icon
2. Or use the "Send Email" action

The email includes:
- License code
- Product name
- Expiration dates
- Activation instructions

## Bulk Operations

Available bulk actions:

- **Block**: Block selected licenses
- **Unblock**: Unblock selected licenses
- **Delete**: Remove selected licenses

## License Verification Flow

When a client verifies a license:

1. Client sends license code and domain/IP
2. System checks:
   - License exists and is valid
   - Product is active
   - Not expired
   - Domain/IP allowed (if whitelisted)
   - Activation limit not exceeded
3. Returns verification result

## Best Practices

1. **Use Meaningful Codes**: Include product prefix (e.g., `THEME-ABC123`)
2. **Set Expiration Dates**: Prevent indefinite usage for subscriptions
3. **Limit Parallel Uses**: Control concurrent installations
4. **Use Domain Whitelisting**: For enterprise licenses
5. **Keep Comments**: Document special arrangements
6. **Regular Cleanup**: Remove expired/unused licenses
