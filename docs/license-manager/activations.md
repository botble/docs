# Activations

Activations track where and when licenses are being used. Each activation represents a licensed installation on a specific domain and IP address.

## Understanding Activations

An activation record contains:

| Field | Description |
|-------|-------------|
| Product | Associated product |
| License Code | The activated license |
| Customer ID | Customer identifier |
| URL | Full URL where activated |
| Domain | Extracted domain from URL |
| IP Address | Client IP at activation |
| Activated At | Timestamp of activation |
| User Agent | Client browser/application info |
| Is Valid | Whether activation succeeded |
| Is Active | Currently active status |

## Activation Flow

1. **Client Request**: Application sends activation request with license code
2. **Validation**: System validates:
   - License exists and is valid (not blocked)
   - Product is active
   - License not expired
   - Domain/IP allowed (if whitelisted)
   - Parallel use limit not exceeded
3. **Recording**: Activation recorded with full context
4. **Response**: Success/failure returned to client

## Viewing Activations

### Admin Panel

Navigate to **License Manager → Activations** to see:

- All activations across products
- Filter by product, license, domain, IP
- Search by license code or URL
- View activation history

### Per-License View

1. Go to **Licenses**
2. Click on a license
3. View **Activations** tab

### Per-Product View

1. Go to **Products**
2. Click on a product
3. View **Activations** tab

## Activation Status

### Is Valid

- **true**: Activation succeeded
- **false**: Activation failed (recorded for security tracking)

Failed activations are logged when "Log Failed Attempts" is enabled in settings.

### Is Active

- **true**: Installation currently authorized
- **false**: Installation deactivated

## Managing Activations

### Deactivating an Activation

From admin panel:
1. Find the activation
2. Click **Delete** or use bulk action

This frees up a parallel use slot for the license.

### Bulk Deactivation

1. Select multiple activations
2. Choose "Delete" bulk action
3. Confirm deletion

### Deactivate All for License

Via API:
```bash
DELETE /api/internal/activated-product-activations/{activation_id}
```

## Parallel Use Enforcement

When parallel uses are limited:

### Scenario: License allows 3 parallel uses

1. Activation 1 (domain-a.com) → Success (1/3)
2. Activation 2 (domain-b.com) → Success (2/3)
3. Activation 3 (domain-c.com) → Success (3/3)
4. Activation 4 (domain-d.com) → Behavior depends on settings:

**If "Deactivate Old" enabled:**
- Oldest activation (domain-a.com) deactivated
- New activation succeeds (3/3)

**If "Deactivate Old" disabled:**
- New activation rejected
- Error returned to client

## Domain Normalization

Domains are normalized for consistent tracking:

| Original URL | Normalized Domain |
|--------------|------------------|
| `https://www.example.com/app` | `example.com` |
| `http://Example.Com` | `example.com` |
| `https://subdomain.example.com` | `subdomain.example.com` |

Normalization ensures:
- www is removed
- Lowercase conversion
- Protocol stripped
- Path removed

## Failed Activation Tracking

When enabled, failed attempts are recorded:

### Reasons for Failure

- Invalid license code
- Expired license
- Blocked license
- Inactive product
- Domain not whitelisted
- IP not whitelisted
- Parallel limit exceeded

### Security Benefits

- Detect abuse attempts
- Identify unauthorized usage
- Auto-blacklist repeat offenders

## Auto-Blacklisting

When thresholds are configured:

### Domain Blacklisting

```
Setting: lm_blacklist_domain_after_failed_attempts = 10
```

After 10 failed attempts from a domain:
1. Domain added to blacklist
2. All future requests from domain rejected
3. Activity logged

### IP Blacklisting

```
Setting: lm_blacklist_ip_after_failed_attempts = 20
```

After 20 failed attempts from an IP:
1. IP added to blacklist
2. All future requests from IP rejected
3. Activity logged

### Managing Blacklists

In **Settings → General**:
- View blacklisted domains
- View blacklisted IPs
- Manually add/remove entries

## API Operations

### External API (Client-facing)

#### Activate License

```bash
POST /api/external/license/activate
Headers:
  X-API-KEY: your-external-api-key
  X-API-URL: https://client-domain.com
  X-API-IP: 192.168.1.100
Body:
{
  "product_id": "PROD-001",
  "license_code": "LICENSE-CODE",
  "client_name": "Customer Name",
  "verify_type": "non_envato"
}
```

Response (Success):
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

Response (Error):
```json
{
  "is_active": false,
  "message": "Your license code is invalid.",
  "lic_response": null,
  "data": null
}
```

#### Verify License

```bash
POST /api/external/license/verify
Headers:
  X-API-KEY: your-external-api-key
  X-API-URL: https://client-domain.com
  X-API-IP: 192.168.1.100
Body:
{
  "product_id": "PROD-001",
  "license_data": "<encrypted-license-data>",
  "client_name": "Customer Name"
}
```

Response:
```json
{
  "is_active": true,
  "message": "Verified.",
  "data": null
}
```

#### Deactivate License

```bash
POST /api/external/license/deactivate
Headers:
  X-API-KEY: your-external-api-key
  X-API-URL: https://client-domain.com
  X-API-IP: 192.168.1.100
Body:
{
  "product_id": "PROD-001",
  "license_data": "<encrypted-license-data>",
  "client_name": "Customer Name"
}
```

Response:
```json
{
  "is_active": true,
  "message": "Deactivated."
}
```

### Internal API (Admin)

#### List Activations

```bash
GET /api/internal/product-activations
Headers:
  X-API-KEY: your-internal-api-key
```

#### Delete Activation

```bash
DELETE /api/internal/activated-product-activations/{activation_id}
```

## Customer Self-Service

Customers can manage their activations via the Customer Portal:

1. Login at `/customer/login`
2. Navigate to **Activations**
3. View all active installations
4. Deactivate unwanted installations

## Activity Logging

All activation events are logged:

- Successful activations
- Failed attempts (with reason)
- Deactivations
- Blacklist additions

View logs at **License Manager → Activity Logs**

## Reporting

### Activation Statistics

Dashboard widgets show:
- Total activations
- Activations over time
- Top products by activations
- Failed attempt trends

### Export Data

From Activations list:
1. Apply desired filters
2. Click **Export**
3. Download CSV/Excel file

## Best Practices

1. **Monitor Failed Attempts**: Check activity logs regularly
2. **Set Reasonable Limits**: Balance security with user convenience
3. **Use Auto-Blacklist**: Protect against brute force
4. **Clean Old Activations**: Remove stale entries periodically
5. **Track User Agents**: Identify unauthorized clients
6. **Enable Logging**: Keep records for support issues
