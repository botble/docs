# Migration from LicenseBox

This guide helps you migrate from the original LicenseBox PHP script to the new License Manager.

## Overview

License Manager is a modern, standalone replacement for LicenseBox with:
- Standalone application (no CMS required)
- Modern Laravel 12 architecture
- Enhanced security features
- Better API design
- Admin panel management
- Customer self-service portal

::: tip NO CLIENT UPDATES REQUIRED
With the **licensebox-legacy-api** plugin, your existing client applications continue working **without any code changes**. The legacy plugin provides full backward compatibility with original LicenseBox API endpoints, headers, and response formats.
:::

## Migration Options

License Manager provides two ways to migrate from LicenseBox:

| Method | Best For |
|--------|----------|
| **Settings Page Migration** | GUI-based, step-by-step, progress tracking |
| **Command Line Migration** | Automated via plugin activation |

## Option 1: Settings Page Migration (Recommended)

The Settings Page provides a visual interface for migration with progress tracking.

### Steps

1. **Import LicenseBox tables** into your database:
   ```bash
   mysqldump -u user -p licensebox_db > licensebox_backup.sql
   mysql -u user -p your_cms_db < licensebox_backup.sql
   ```

2. **Copy version files** to the new location:
   ```bash
   cp -r /old/licensebox/version-files/* /new/storage/app/version-files/
   ```

3. **Navigate to migration settings:**
   - Go to **Admin Panel → Settings → License Manager → Legacy Migration**

4. **Configure Legacy Encryption Key:**
   - Enter your old LicenseBox encryption key
   - Click **Save**

5. **Review detected tables:**
   - The page shows all detected LicenseBox tables with record counts
   - Verify the tables are correctly detected

6. **Start migration:**
   - Click **Start Migration**
   - Watch progress as each step completes (100 records per batch)

7. **Delete legacy tables:**
   - After successful migration, click **Delete Legacy Tables**
   - This removes all old LicenseBox tables

### What Gets Migrated

| Step | Source Table | Target | Description |
|------|--------------|--------|-------------|
| Products | `product_details` | `lm_products` | Product definitions |
| Customers | `product_licenses` | `lm_customers` | Customers with valid emails only |
| Licenses | `product_licenses` | `lm_licenses` | License records |
| Activations | `product_activations` | `lm_activations` | License activations |
| Versions | `product_versions` | `lm_product_versions` | Product versions |
| Activity Logs | `activity_logs` | `lm_activity_logs` | Activity history |
| Update Downloads | `update_downloads` | `lm_update_downloads` | Download records |
| API Keys | `api_keys` | `lm_api_keys` | API key configurations |
| Settings | `app_settings` | `settings` | Blacklists, rate limits, etc. |

### Legacy Tables Detected

The migration detects and can delete these tables:
- `product_details`, `product_licenses`, `product_activations`, `product_versions`
- `activity_logs`, `update_downloads`
- `api_keys`, `app_settings`, `api_limits`, `api_logs`
- `auth_users`, `cron_mails`

### Migration Features

- **Batched processing**: 100 records per request to prevent timeouts
- **Re-runnable**: Skips existing records, only adds new ones
- **Progress tracking**: Shows records processed per step
- **Error handling**: Displays detailed error messages if issues occur
- **Deadlock retry**: Automatically retries on database deadlocks

::: tip CUSTOMER MIGRATION
Only customers with valid email addresses are migrated. Customers without emails are skipped since they couldn't log in to the old LicenseBox anyway.
:::

## Option 2: Command Line Migration

The migration process via plugin activation:

```bash
# 1. Backup your current database
mysqldump -u user -p your_cms_database > backup.sql

# 2. Export your LicenseBox database
mysqldump -u user -p licensebox_database > licensebox_backup.sql

# 3. Import LicenseBox tables into your CMS database
mysql -u user -p your_cms_database < licensebox_backup.sql

# 4. Activate License Manager plugin
php artisan cms:plugin:activate license-manager

# 5. Activate Legacy API plugin (runs migrations to convert data)
php artisan cms:plugin:activate licensebox-legacy-api

# 6. Configure Legacy Encryption Key (IMPORTANT!)
# Go to: Settings → License Manager → Legacy Migration
# Enter your old LicenseBox encryption key in "Legacy Encryption Key" field

# 7. Done! Data migrated and legacy API endpoints available
#    Your existing client applications will continue working without any changes!
```

::: warning IMPORTANT
**Step 6 is critical!** Without the Legacy Encryption Key, existing license files from your LicenseBox installation cannot be decrypted and verified. Find this key in your old LicenseBox `config.php` file.
:::

The `licensebox-legacy-api` plugin:
- **Converts** imported LicenseBox tables to new `lm_*` format
- **Renames** columns to modern Laravel conventions
- **Provides** backward-compatible API endpoints
- **Supports** original `LB-*` headers

## Prerequisites

Before migrating:

1. **Backup Everything**
   - Export your LicenseBox database
   - Backup all configuration files
   - Save encryption keys

2. **Note Your Settings**
   - API keys
   - Encryption keys
   - Webhook URLs
   - Blacklist entries

3. **Install License Manager**
   - Follow the [Installation Guide](installation-requirements.md)

## Database Migration

### Step 1: Import LicenseBox Database

First, import your LicenseBox database tables into your License Manager database:

```bash
# Export from LicenseBox server
mysqldump -u user -p licensebox_db \
  products product_versions licenses activations \
  activity_logs update_downloads settings \
  > licensebox_export.sql

# Import into your CMS database
mysql -u user -p your_cms_db < licensebox_export.sql
```

::: tip
If your LicenseBox tables have `ls_` prefix, they will be handled automatically.
:::

### Step 2: Activate Plugins

```bash
# Activate License Manager first (creates new table structure)
php artisan cms:plugin:activate license-manager

# Activate Legacy API plugin (migrates imported data)
php artisan cms:plugin:activate licensebox-legacy-api
```

### What Happens During Migration

When `licensebox-legacy-api` is activated, its migrations:

1. **Detect** existing LicenseBox tables (with or without `ls_` prefix)
2. **Rename** tables to use `lm_` prefix
3. **Convert** column names to Laravel conventions
4. **Add** missing timestamps and indexes
5. **Migrate** settings to new format

The legacy API plugin migrations automatically handle:
- Renaming tables from legacy names to `lm_*` prefix
- Converting column names (e.g., `pd_pid` → `reference_id`)
- Adding timestamps (`created_at`, `updated_at`)
- Creating performance indexes
- Migrating settings from old format

### Fresh Install vs Migration

| Scenario | What Happens |
|----------|--------------|
| **Fresh install** (no LicenseBox data) | Migrations skip conversion, tables already in new format |
| **Migration** (LicenseBox data imported) | Migrations detect old tables and convert them |

The migrations are **idempotent** - they check if conversion is needed before making changes.

### What Gets Migrated

| Data | Source | Destination |
|------|--------|-------------|
| Products | `products` / `ls_products` | `lm_products` |
| Versions | `product_versions` | `lm_product_versions` |
| Licenses | `licenses` | `lm_licenses` |
| Activations | `activations` | `lm_activations` |
| Activity Logs | `activity_logs` | `lm_activity_logs` |
| Downloads | `update_downloads` | `lm_update_downloads` |
| API Keys | `api_keys` / `ls_api_keys` | `lm_api_keys` |
| Customers | `customers` / `ls_customers` | `lm_customers` |
| Settings | `settings` / `options` | `settings` (with `lm_` prefix) |

### Table Name Mapping

| LicenseBox Table | License Manager Table |
|------------------|----------------------|
| `products` / `ls_products` | `lm_products` |
| `product_versions` / `ls_product_versions` | `lm_product_versions` |
| `licenses` / `ls_licenses` | `lm_licenses` |
| `activations` / `ls_activations` | `lm_activations` |
| `activity_logs` / `ls_activity_logs` | `lm_activity_logs` |
| `update_downloads` / `ls_update_downloads` | `lm_update_downloads` |

### Column Name Mapping

#### Products Table

| LicenseBox | License Manager |
|------------|-----------------|
| `pd_id` | `id` |
| `pd_pid` | `reference_id` |
| `pd_envid` | `envato_id` |
| `pd_name` | `name` |
| `pd_desc` | `description` |
| `pd_licup` | `license_update` |
| `pd_status` | `is_active` |

#### Licenses Table

| LicenseBox | License Manager |
|------------|-----------------|
| `pid` | `product_reference_id` |
| `license_type` | `type` |
| `client` | `customer_id` |
| `expiry` | `expires_at` |
| `updates_till` | `updates_until` |
| `supported_till` | `support_until` |
| `validity` | `is_valid` |
| `added_on` | `created_at` |

#### Activations Table

| LicenseBox | License Manager |
|------------|-----------------|
| `pi_id` | `id` |
| `pi_product` | `product_reference_id` |
| `pi_client` | `customer_id` |
| `pi_license_code` | `license_code` |
| `pi_url` | `url` |
| `pi_ip` | `ip_address` |
| `pi_date` | `activated_at` |
| `pi_agent` | `user_agent` |
| `pi_isvalid` | `is_valid` |
| `pi_isactive` | `is_active` |

#### Product Versions Table

| LicenseBox | License Manager |
|------------|-----------------|
| `vid` | `version_id` |
| `pid` | `product_reference_id` |
| `release_date` | `released_at` |
| `status` | `is_active` |

#### Activity Logs Table

| LicenseBox | License Manager |
|------------|-----------------|
| `al_id` | `id` |
| `al_log` | `message` |
| `al_date` | `created_at` |

#### Update Downloads Table

| LicenseBox | License Manager |
|------------|-----------------|
| `did` | `download_id` |
| `product` | `product_reference_id` |
| `vid` | `version_id` |
| `ip` | `ip_address` |
| `isvalid` | `is_valid` |
| `download_date` | `downloaded_at` |

## Settings Migration

### Encryption Keys (Critical Step)

::: danger REQUIRED
Without configuring the Legacy Encryption Key, existing license files cannot be verified. This will cause all your customers' licenses to fail validation!
:::

**Steps to migrate encryption key:**

1. **Find your LicenseBox encryption key** in one of these locations:
   - `config.php` → Look for `LB_ENCRYPTION_KEY` or `ENCRYPTION_KEY`
   - Database `options` or `settings` table → Look for `license_key` or `encryption_key`

2. **Navigate to Legacy Migration settings:**
   - Go to **Admin Panel → Settings → License Manager → Legacy Migration**

3. **Enter the Legacy Encryption Key:**
   - Paste your old LicenseBox encryption key in the **"Legacy Encryption Key (LicenseBox)"** field
   - Click **Save**

4. **Test verification:**
   - Try verifying an existing license from a client application
   - If it works, the key is configured correctly

**Example LicenseBox config.php:**
```php
// Old LicenseBox config.php
define('LB_ENCRYPTION_KEY', 'your-secret-key-here');
// OR
$config['encryption_key'] = 'your-secret-key-here';
```

Copy the key value (e.g., `your-secret-key-here`) to the Legacy Encryption Key field.

### Settings Mapping

| LicenseBox Setting | License Manager Setting |
|--------------------|------------------------|
| `LB_API_KEYS` | Settings → API Keys |
| `LB_ENCRYPTION_KEY` | `lm_license_encryption_key` |
| `LB_BLOCK_AFTER_FAILED` | `lm_blacklist_domain_after_failed_attempts` |
| `LB_BLACKLIST_DOMAINS` | `lm_blacklisted_domains` |
| `LB_BLACKLIST_IPS` | `lm_blacklisted_ips` |
| `LB_RATE_LIMIT` | `lm_requests_rate_limiting_period` |

### Manual Settings Import

```bash
# Import settings from LicenseBox database
php artisan tinker

# Example: Import blacklisted domains
>>> $oldBlacklist = DB::connection('licensebox')->table('settings')->where('key', 'blacklisted_domains')->value('value');
>>> Setting::set('lm_blacklisted_domains', $oldBlacklist);
```

## API Migration

::: tip USING LEGACY API PLUGIN?
If you're using `licensebox-legacy-api` plugin, you can **skip this entire section**. Your existing API calls will continue to work exactly as before. The endpoint and header changes below are only relevant if you want to migrate to the new API format.
:::

### Endpoint Changes (New API Format)

#### External API

| LicenseBox | License Manager |
|------------|-----------------|
| `/api/check_connection_ext` | `/api/external/connection-check` |
| `/api/activate_license` | `/api/external/license/activate` |
| `/api/verify_license` | `/api/external/license/verify` |
| `/api/deactivate_license` | `/api/external/license/deactivate` |
| `/api/check_update` | `/api/external/update/check` |
| `/api/download_update/{v}/{t}` | `/api/external/update/{v}/download/{t}` |

#### Internal API

| LicenseBox | License Manager |
|------------|-----------------|
| `/api/check_connection_int` | `/api/internal/connection-check` |
| `/api/add_product` | `POST /api/internal/products` |
| `/api/get_product` | `GET /api/internal/products/{id}` |
| `/api/get_products` | `GET /api/internal/products` |
| `/api/create_license` | `POST /api/internal/product-licenses` |
| `/api/get_license` | `GET /api/internal/product-licenses/{id}` |
| `/api/edit_license` | `PUT /api/internal/product-licenses/{id}` |
| `/api/block_license` | `POST /api/internal/blocked-product-licenses/{id}` |
| `/api/unblock_license` | `DELETE /api/internal/blocked-product-licenses/{id}` |

### Header Changes (New API Format)

| LicenseBox (Legacy) | License Manager (New) |
|---------------------|----------------------|
| `LB-API-KEY` | `X-API-KEY` |
| `LB-URL` | `X-API-URL` |
| `LB-IP` | `X-API-IP` |
| `LB-LANG` | `X-API-LANGUAGE` |

::: tip
With `licensebox-legacy-api` plugin, **both header formats are supported**. You can use either `LB-API-KEY` or `X-API-KEY`.
:::

### Legacy API Support (No Code Changes Required!)

::: tip ZERO CLIENT CHANGES
With the `licensebox-legacy-api` plugin activated, your existing client applications **continue working without any code changes**. You don't need to update endpoints, headers, or request formats.
:::

The `licensebox-legacy-api` plugin provides both **migration** and **backward compatibility**. Once activated, it enables:
- Original LicenseBox endpoints (`/api/check_connection_ext`, `/api/activate_license`, `/api/verify_license`, etc.)
- Original header names (`LB-API-KEY`, `LB-URL`, `LB-IP`, `LB-LANG`)
- Original request/response format
- Original encryption support (with Legacy Encryption Key configured)

**This means:**
- ✅ Existing PHP/JavaScript clients work as-is
- ✅ No need to update installed software on customer sites
- ✅ Gradual migration at your own pace
- ✅ Both old and new APIs work simultaneously

## Client Application Updates

::: warning OPTIONAL - ONLY IF NOT USING LEGACY API PLUGIN
The following updates are **only required if you choose NOT to use the `licensebox-legacy-api` plugin**. If you have the legacy plugin activated, your existing client code works without any changes.
:::

### PHP Client

**Before (LicenseBox):**
```php
$ch = curl_init('https://license-server.com/api/activate_license');
curl_setopt_array($ch, [
    CURLOPT_HTTPHEADER => [
        'LB-API-KEY: ' . $apiKey,
        'LB-URL: ' . $domain,
        'LB-IP: ' . $ip,
    ],
    CURLOPT_POSTFIELDS => [
        'license_code' => $license,
        'client_name' => $client,
    ],
]);
```

**After (License Manager):**
```php
$ch = curl_init('https://license-server.com/api/external/license/activate');
curl_setopt_array($ch, [
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'X-API-KEY: ' . $apiKey,
        'X-API-URL: ' . $domain,
        'X-API-IP: ' . $ip,
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'product_id' => $productId,
        'license_code' => $license,
        'client_name' => $client,
    ]),
]);
```

### Gradual Migration

Use both endpoints during transition:

```php
class LicenseClient
{
    public function activate($license, $domain)
    {
        // Try new endpoint first
        $response = $this->callNewApi('/license/activate', [
            'license_code' => $license,
        ]);

        // Fall back to legacy if needed
        if (!$response) {
            $response = $this->callLegacyApi('/activate_license', [
                'license_code' => $license,
            ]);
        }

        return $response;
    }
}
```

## File Migration

### Version Files

::: warning IMPORTANT
Copy version files **before** running the migration. The Legacy Migration settings page reminds you that version files should be placed in `storage/app/version-files/` before migrating.
:::

Move version files to new location:

```bash
# Old location
/licensebox/uploads/versions/{product_id}/
# OR
/licensebox/version-files/{product_id}/

# New location
/storage/app/version-files/{reference_id}/
```

Migration script:
```bash
# Copy files (adjust source path based on your LicenseBox setup)
cp -r /old/licensebox/version-files/* /new/storage/app/version-files/

# Update permissions
chmod -R 755 storage/app/version-files
chown -R www-data:www-data storage/app/version-files
```

### Symbolic Links

If using symbolic links:
```bash
php artisan storage:link
```

## Webhook Migration

### Endpoint Changes

Update your webhook receivers for new event format:

**Before (LicenseBox):**
```json
{
  "type": "license_expiring",
  "license_code": "ABC123",
  "days": 7
}
```

**After (License Manager):**
```json
{
  "event_type": "license.expiring",
  "timestamp": "2024-01-15T10:30:00Z",
  "payload": {
    "license_id": 123,
    "license_code": "ABC123",
    "days_until_expiry": 7
  }
}
```

### Signature Verification

Update signature verification:

**Before:**
```php
$valid = hash_equals($signature, md5($payload . $secret));
```

**After:**
```php
$expected = hash_hmac('sha256', $payload, $secret);
$valid = hash_equals($expected, $signature);
```

## Testing Migration

### Verify Data

```bash
php artisan tinker

# Check products migrated
>>> \Botble\LicenseManager\Models\Product::count()

# Check licenses migrated
>>> \Botble\LicenseManager\Models\ProductLicense::count()

# Check activations migrated
>>> \Botble\LicenseManager\Models\ProductActivation::count()
```

### Test API Endpoints

```bash
# Test connection
curl -X GET "https://your-domain.com/api/external/connection-check" \
  -H "X-API-KEY: your-api-key"

# Test license verification
curl -X POST "https://your-domain.com/api/external/license/verify" \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: your-api-key" \
  -H "X-API-URL: https://test-domain.com" \
  -d '{"product_id": "PROD-001", "license_data": "<encrypted-license-data>"}'
```

### Test Legacy Compatibility

The `licensebox-legacy-api` plugin provides backward-compatible endpoints:

```bash
# Test legacy endpoint (same as original LicenseBox)
curl -X POST "https://your-domain.com/api/verify_license" \
  -H "LB-API-KEY: your-api-key" \
  -H "LB-URL: https://test-domain.com" \
  -d "license_code=YOUR-LICENSE"

# Test legacy internal endpoint
curl -X POST "https://your-domain.com/api/check_connection_int" \
  -H "LB-API-KEY: your-api-key"
```

This means your existing client applications continue working without code changes.

## Rollback Plan

If issues occur:

1. **Keep LicenseBox Running**: Run both systems in parallel initially
2. **Database Backup**: Restore from backup if needed
3. **DNS Failover**: Point back to old server if critical

```bash
# Restore database
mysql -u user -p database < licensebox_backup.sql

# Deactivate new plugin
php artisan cms:plugin:deactivate license-manager
```

## Post-Migration Checklist

- [ ] Version files copied to `storage/app/version-files/`
- [ ] Legacy Encryption Key configured
- [ ] All products migrated
- [ ] All licenses migrated
- [ ] All activations migrated
- [ ] Activity logs migrated
- [ ] Update downloads migrated
- [ ] API keys migrated
- [ ] Settings migrated (blacklists, rate limits)
- [ ] Legacy tables deleted (via Settings page)
- [ ] Webhook endpoints updated
- [ ] Client applications updated (if not using legacy API)
- [ ] Cron jobs configured
- [ ] Legacy API tested (if using `licensebox-legacy-api`)
- [ ] New API tested
- [ ] Customer portal accessible
- [ ] Admin panel functional

## Common Migration Issues

### License Decryption Failing

**Problem**: Old license files can't be verified. Customers get "Invalid license" errors.

**Solution**:
1. Go to **Settings → License Manager → API**
2. Enter your old LicenseBox encryption key in **"Legacy Encryption Key (LicenseBox)"**
3. Save settings
4. Clear cache: `php artisan cache:clear`

**Finding your old key:**
- Check `config.php` for `LB_ENCRYPTION_KEY` or `ENCRYPTION_KEY`
- Check database `options`/`settings` table for `encryption_key`

### Missing Products

**Problem**: Some products not migrated.

**Solution**: Check for products with null/empty reference IDs in old database.

### Activation Count Mismatch

**Problem**: Activation counts don't match.

**Solution**: Run cleanup to remove invalid activations:
```bash
php artisan tinker
>>> \Botble\LicenseManager\Models\ProductActivation::where('is_active', false)->delete()
```

### API Key Not Working

**Problem**: Old API keys rejected.

**Solution**: Create new API keys in License Manager settings.

## Support

For migration assistance:
- Email: [contact@botble.com](mailto:contact@botble.com)
- Include: LicenseBox version, database size, specific errors
