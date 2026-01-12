# Domain Migration

This guide covers everything you need to know when migrating your Botble CMS installation to a new domain, subdomain, or server.

## Overview

Domain migration involves moving your website from one domain (e.g., `example.com`) to another (e.g., `new-example.com` or `subdomain.example.com`). This process requires careful handling of:

- License management
- Database configuration
- Media files and assets
- URL references in content
- SSL certificates

## Migration Methods

There are two approaches to domain migration:

| Method | Best For | Complexity |
|--------|----------|------------|
| **Full Migration** | Preserving all content, settings, and configurations | Medium |
| **Fresh Install + Content Migration** | Starting clean with selective content transfer | Simple |

## Pre-Migration Checklist

Before starting the migration, complete these steps:

### 1. License Management

::: warning Important
Your license is tied to your domain. You must handle it properly before migration.
:::

**Option A: Deactivate Before Migration (Recommended)**

1. Go to **Admin Panel** → **Settings** → **General**
2. Click **Deactivate License**
3. Proceed with migration
4. Activate license on the new domain after migration

**Option B: Backup License File**

1. Download `/storage/.license` file from your current installation
2. After migration, upload this file to the new server
3. If activation issues occur, reset your license at https://license.botble.com

### 2. Create Full Backup

Create a complete backup before any migration:

```bash
php artisan cms:backup:create "pre-migration-backup" --description="Full backup before domain migration"
```

Or through the admin panel:
1. Go to **Admin Panel** → **System Administration** → **Backups**
2. Click **Create**
3. Select both database and uploaded files
4. Download the backup to your local machine

### 3. Document Current Configuration

Note down your current settings:

- Active theme name
- Installed and activated plugins
- Custom configurations in `.env`
- Third-party integrations (payment gateways, email services, etc.)
- Custom code modifications (if any)

## Method 1: Full Migration (Recommended)

This method preserves all your content, settings, and configurations.

### Step 1: Prepare the New Server

1. Set up your new server/hosting with the required environment:
   - PHP 8.2+
   - MySQL 8.0+ or MariaDB 10.3+
   - Required PHP extensions

2. Point your new domain to the server

### Step 2: Transfer Files

Transfer all files to the new server:

```bash
# Using rsync (recommended)
rsync -avz --progress /path/to/old-site/ user@new-server:/path/to/new-site/

# Or using SCP
scp -r /path/to/old-site/* user@new-server:/path/to/new-site/
```

### Step 3: Export and Import Database

**On the old server:**

```bash
mysqldump -u username -p database_name > database_backup.sql
```

**On the new server:**

```bash
mysql -u username -p new_database_name < database_backup.sql
```

### Step 4: Update Configuration

Edit the `.env` file on the new server:

```bash
APP_URL=https://your-new-domain.com

# Database credentials (update if changed)
DB_HOST=localhost
DB_DATABASE=your_new_database
DB_USERNAME=your_new_username
DB_PASSWORD=your_new_password
```

### Step 5: Update URLs in Database

Run the following command to update old domain references in the database:

```bash
php artisan cms:domain:change old-domain.com new-domain.com
```

If this command is not available, you can manually update URLs using SQL:

```sql
-- Update site settings
UPDATE settings SET value = REPLACE(value, 'old-domain.com', 'new-domain.com')
WHERE value LIKE '%old-domain.com%';

-- Update media URLs (if using full URLs)
UPDATE media_files SET url = REPLACE(url, 'old-domain.com', 'new-domain.com')
WHERE url LIKE '%old-domain.com%';

-- Update page content
UPDATE pages SET content = REPLACE(content, 'old-domain.com', 'new-domain.com')
WHERE content LIKE '%old-domain.com%';

-- Update post content
UPDATE posts SET content = REPLACE(content, 'old-domain.com', 'new-domain.com')
WHERE content LIKE '%old-domain.com%';
```

### Step 6: Clear Cache and Optimize

```bash
php artisan cache:clear
php artisan config:clear
php artisan view:clear
php artisan route:clear
php artisan optimize
```

### Step 7: Set Permissions

```bash
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### Step 8: Activate License

1. Go to **Admin Panel** → **Settings** → **General**
2. Enter your purchase code
3. Click **Activate**

If activation fails:
1. Visit https://license.botble.com
2. Reset your license
3. Try activating again

## Method 2: Fresh Install + Content Migration

This method is simpler and recommended when:
- You want to start with a clean installation
- Your current site has issues or bloat
- You're upgrading to a significantly newer version

### Step 1: Fresh Installation

1. Install Botble CMS on your new domain following the [installation guide](installation-web-interface.md)
2. Activate your license on the new domain
3. Install the same plugins you had on the old site

### Step 2: Export Content from Old Site

**Database Export:**
```bash
# Export specific tables
mysqldump -u username -p database_name \
  posts post_translations post_categories post_tags \
  pages page_translations \
  categories category_translations \
  tags tag_translations \
  menus menu_nodes menu_locations \
  widgets widget_areas \
  > content_export.sql
```

**Media Files:**
```bash
# Archive the uploads folder
tar -czvf media_backup.tar.gz storage/app/public/
```

### Step 3: Import to New Site

**Import Content:**
```bash
mysql -u username -p new_database < content_export.sql
```

**Import Media:**
```bash
tar -xzvf media_backup.tar.gz -C /path/to/new-site/storage/app/
php artisan storage:link
```

### Step 4: Reconfigure Settings

Manually reconfigure:
- Theme settings
- Widget positions
- Menu structures
- Site settings
- Plugin configurations

## Post-Migration Tasks

### 1. Verify Site Functionality

- [ ] Homepage loads correctly
- [ ] All pages accessible
- [ ] Admin panel works
- [ ] Media files display properly
- [ ] Forms submit successfully
- [ ] Email notifications work

### 2. Update External Services

Update your domain in:
- Google Analytics
- Google Search Console
- Social media integrations
- Payment gateways
- Email service providers
- CDN configurations

### 3. Set Up Redirects

Configure 301 redirects from old domain to new domain:

**Apache (.htaccess on old server):**
```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^(www\.)?old-domain\.com$ [NC]
RewriteRule ^(.*)$ https://new-domain.com/$1 [R=301,L]
```

**Nginx (on old server):**
```nginx
server {
    server_name old-domain.com www.old-domain.com;
    return 301 https://new-domain.com$request_uri;
}
```

### 4. Update DNS Records

If keeping the same domain but changing servers:
1. Lower TTL values 24-48 hours before migration
2. Update A records to point to new server IP
3. Update any other relevant records (MX, CNAME, etc.)

### 5. SSL Configuration

Set up SSL on the new domain:

```bash
# Using Let's Encrypt with Certbot
certbot --nginx -d new-domain.com -d www.new-domain.com
```

Update `.env`:
```bash
APP_URL=https://new-domain.com
ENABLE_HTTPS_SUPPORT=true
```

## Subdomain Migration

When migrating to a subdomain (e.g., `site.example.com` to `app.example.com`):

1. Follow the same steps as domain migration
2. Ensure subdomain DNS is properly configured
3. Update `APP_URL` in `.env` to include the full subdomain

Example:
```bash
# Old
APP_URL=https://site.example.com

# New
APP_URL=https://app.example.com
```

## Troubleshooting

### License Activation Failed

1. Ensure old domain license is deactivated
2. Reset license at https://license.botble.com
3. Clear browser cache and try again
4. Contact support at contact@botble.com if issues persist

### Images Not Displaying

1. Run `php artisan storage:link`
2. Check file permissions on `storage/app/public`
3. Verify symlink exists: `ls -la public/storage`
4. If using CDN, update CDN origin settings

### 500 Internal Server Error

1. Check Laravel logs: `storage/logs/laravel.log`
2. Verify `.env` configuration
3. Run `php artisan config:clear`
4. Ensure all required PHP extensions are installed

### Mixed Content Warnings

If seeing HTTPS/HTTP mixed content warnings:

1. Ensure `APP_URL` uses `https://`
2. Add `ENABLE_HTTPS_SUPPORT=true` to `.env`
3. Run database URL replacement queries
4. Clear all caches

### Database Connection Errors

1. Verify database credentials in `.env`
2. Ensure database server is running
3. Check if database user has proper permissions
4. Test connection: `php artisan db:show`

## Rollback Plan

If migration fails, you can restore from backup:

1. Restore files from your backup archive
2. Restore database:
   ```bash
   mysql -u username -p database_name < backup.sql
   ```
3. Update `.env` with old domain settings
4. Activate license on old domain

## Best Practices

1. **Test First**: Set up a staging environment to test the migration process
2. **Schedule Wisely**: Migrate during low-traffic periods
3. **Communicate**: Notify users of planned downtime
4. **Keep Backups**: Maintain backups of both old and new installations for at least 30 days
5. **Monitor**: Watch error logs and analytics after migration

## Quick Reference: Migration from `site-a.com` to `subdomain.site-b.com`

Example scenario: Moving from `jombitcoin.com` to `unwind.jomplan.com`

```bash
# 1. Deactivate license on jombitcoin.com (Admin → Settings → General)

# 2. Create backup
php artisan cms:backup:create "pre-migration"

# 3. Transfer files to new server

# 4. Update .env on new server
APP_URL=https://unwind.jomplan.com

# 5. Import database and update URLs
mysql -u user -p database < backup.sql

# Run URL replacement if needed
UPDATE settings SET value = REPLACE(value, 'jombitcoin.com', 'unwind.jomplan.com');

# 6. Clear caches
php artisan optimize:clear

# 7. Set permissions
chmod -R 755 storage bootstrap/cache

# 8. Activate license on unwind.jomplan.com
```

::: tip
For assistance with domain migration, contact our support team at contact@botble.com or create a ticket at https://botble.ticksy.com
:::
