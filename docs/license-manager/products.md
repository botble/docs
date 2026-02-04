# Products

Products represent the software items you're licensing. Each product can have multiple versions and licenses.

## Creating a Product

1. Navigate to **License Manager → Products**
2. Click **Create**
3. Fill in the product details:

| Field | Description | Required |
|-------|-------------|----------|
| Name | Display name of the product | Yes |
| Reference ID | Unique identifier for API (auto-generated if empty) | Yes |
| Envato ID | Envato marketplace item ID (for Envato integration) | No |
| Description | Product description | No |
| Enable Updates | Allow serving software updates | No |
| Serve Latest | Automatically serve latest version | No |
| Status | Active or Inactive | Yes |

4. Click **Save**

## Product Reference ID

The Reference ID is a unique identifier used in API calls and license associations:

- Must be unique across all products
- Auto-generated if not provided (e.g., `PROD-ABC123`)
- Cannot be changed after creation
- Used in license codes and API endpoints

## Managing Versions

Each product can have multiple versions for update delivery.

### Creating a Version

1. Go to **Products** and click on a product
2. Navigate to **Versions** tab
3. Click **Create**
4. Fill in version details:

| Field | Description | Required |
|-------|-------------|----------|
| Version ID | Unique version identifier | Yes |
| Version | Version number (e.g., 1.2.0) | Yes |
| Release Date | When the version was released | No |
| Summary | Brief version description | No |
| Changelog | Detailed changes (supports HTML) | No |
| Main File | Downloadable update file (ZIP) | No |
| SQL File | Database update script | No |
| Status | Active or Inactive | Yes |

### Version Files

Upload files for update delivery:

- **Main File**: Primary update package (typically ZIP)
- **SQL File**: Optional database migration script

Files are stored in `storage/app/version-files/{reference_id}/`

### Downloading Version Files

Authorized users can download version files:

```
GET /license-manager/products/{product}/versions/download-files/{version}
GET /license-manager/products/{product}/versions/download-sql/{version}
```

## Envato Integration

For products sold on Envato marketplace:

1. Enter your **Envato ID** (item ID from Envato)
2. Licenses can be created from Envato purchase codes
3. Buyer information is automatically validated

### Creating License from Envato

```bash
POST /api/internal/product-licenses
{
  "product_reference_id": "YOUR-PRODUCT",
  "license_code": "envato-purchase-code",
  "is_envato": true,
  "customer_id": "buyer-username"
}
```

## Product Statistics

View product analytics:

- **Total Licenses**: Number of licenses issued
- **Active Licenses**: Currently valid licenses
- **Total Activations**: Number of active installations
- **Top Customers**: Customers with most licenses

Access via **Dashboard Widgets** or **Products** list view.

## API Operations

### List Products

```bash
GET /api/internal/products
Headers:
  X-API-KEY: your-internal-api-key
```

Response:
```json
{
  "data": [
    {
      "id": 1,
      "reference_id": "PRODUCT-001",
      "name": "My Software",
      "is_active": true,
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

### Get Product

```bash
GET /api/internal/products/{reference_id}
```

### Create Product

```bash
POST /api/internal/products
{
  "name": "My New Product",
  "reference_id": "NEW-PROD-001",
  "description": "Product description",
  "license_update": true,
  "is_active": true
}
```

### Update Product

```bash
PUT /api/internal/products/{reference_id}
{
  "name": "Updated Name",
  "is_active": false
}
```

### Activate/Deactivate Product

```bash
# Activate
POST /api/internal/activated-products/{reference_id}

# Deactivate
DELETE /api/internal/activated-products/{reference_id}
```

## Bulk Operations

From the Products list:

1. Select multiple products using checkboxes
2. Choose bulk action:
   - **Activate**: Set all selected as active
   - **Deactivate**: Set all selected as inactive
   - **Delete**: Remove selected products

::: warning
Deleting a product will also delete all associated versions, licenses, and activations.
:::

## Best Practices

1. **Use Meaningful Reference IDs**: Make them descriptive (e.g., `THEME-STARTER-PRO`)
2. **Version Numbering**: Follow semantic versioning (MAJOR.MINOR.PATCH)
3. **Changelog Format**: Document all changes for customer reference
4. **Backup Files**: Keep version files backed up separately
5. **Test Updates**: Verify update files before publishing
