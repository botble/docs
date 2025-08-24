# Upgrade Guide

This guide will help you upgrade your Restoria theme to the latest version safely and efficiently.

## Before You Upgrade

### Pre-Upgrade Checklist

1. **Check Current Version**
   - Go to **Dashboard** → **System Information**
   - Note your current Restoria version
   - Review changelog for your target version

2. **Review Requirements**
   - Verify PHP version (8.2+ required)
   - Check Laravel compatibility
   - Ensure sufficient disk space
   - Confirm database backup capability

3. **Backup Everything**
   ```bash
   # Database backup
   mysqldump -u username -p database_name > backup_$(date +%Y%m%d).sql
   
   # Files backup
   tar -czf backup_files_$(date +%Y%m%d).tar.gz /path/to/restoria
   ```

4. **Test Environment**
   - Set up staging environment if possible
   - Test upgrade process first
   - Verify functionality before production

## Upgrade Methods

### Method 1: Web Interface (Recommended for Minor Updates)

1. **Download Update**
   - Get latest version from CodeCanyon
   - Extract update files

2. **Upload Files**
   - Access cPanel or FTP
   - Navigate to Restoria directory
   - Upload and overwrite files
   - Preserve `.env` file

3. **Run Update Script**
   - Visit `yourdomain.com/update`
   - Follow on-screen instructions
   - Complete database migrations

4. **Clear Cache**
   ```bash
   php artisan cache:clear
   php artisan config:clear
   php artisan view:clear
   php artisan route:clear
   ```

### Method 2: Command Line (Recommended for Major Updates)

1. **Maintenance Mode**
   ```bash
   php artisan down
   ```

2. **Backup Current Installation**
   ```bash
   # Create backup directory
   mkdir -p backups/$(date +%Y%m%d)
   
   # Backup database
   php artisan backup:run --only-db
   
   # Backup files
   cp -r . backups/$(date +%Y%m%d)/
   ```

3. **Download and Extract Update**
   ```bash
   # Download from your account
   wget your-download-link
   
   # Extract files
   unzip restoria-update.zip
   ```

4. **Update Files**
   ```bash
   # Copy new files (preserve .env and custom files)
   rsync -av --exclude='.env' --exclude='storage' \
         --exclude='public/uploads' update-files/ ./
   ```

5. **Update Dependencies**
   ```bash
   # Update PHP dependencies
   composer install --no-dev --optimize-autoloader
   
   # Update Node dependencies
   npm install
   npm run prod
   ```

6. **Run Migrations**
   ```bash
   # Run database migrations
   php artisan migrate --force
   
   # Update plugins
   php artisan cms:plugin:update
   ```

7. **Publish Assets**
   ```bash
   php artisan cms:publish:assets
   php artisan storage:link
   ```

8. **Clear All Caches**
   ```bash
   php artisan optimize:clear
   php artisan cache:clear
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

9. **Exit Maintenance Mode**
   ```bash
   php artisan up
   ```

### Method 3: Git Update (For Developers)

1. **Stash Local Changes**
   ```bash
   git stash
   ```

2. **Pull Latest Changes**
   ```bash
   git fetch origin
   git pull origin main
   ```

3. **Update Dependencies**
   ```bash
   composer update
   npm update
   npm run prod
   ```

4. **Run Migrations**
   ```bash
   php artisan migrate
   ```

5. **Apply Stashed Changes**
   ```bash
   git stash pop
   ```

## Version-Specific Upgrades

### Upgrading to 2.0 from 1.x

**Breaking Changes:**
- New reservation system structure
- Updated menu database schema
- Widget area changes

**Migration Steps:**

1. **Backup Menu Data**
   ```bash
   php artisan restoria:export:menus
   ```

2. **Run Special Migration**
   ```bash
   php artisan migrate:restoria-v2
   ```

3. **Reconfigure Widgets**
   - Note current widget positions
   - Re-add widgets after upgrade

4. **Update Custom Code**
   - Review custom templates
   - Update deprecated functions
   - Test custom shortcodes

### Upgrading from Beta Versions

1. **Export Content**
   ```bash
   php artisan cms:export
   ```

2. **Fresh Installation**
   - Perform clean install
   - Import exported content

## Post-Upgrade Tasks

### 1. Verify Installation

```bash
# Check system status
php artisan about

# Verify database
php artisan migrate:status

# Test email
php artisan tinker
>>> Mail::raw('Test email', function($message) {
>>>     $message->to('test@example.com')->subject('Test');
>>> });
```

### 2. Update Configuration

- Review `.env` settings
- Update mail configuration
- Check payment gateway settings
- Verify API keys

### 3. Test Critical Features

**Restaurant Features:**
- [ ] Menu display and ordering
- [ ] Reservation system
- [ ] Gallery functionality
- [ ] Contact forms
- [ ] Payment processing

**Admin Features:**
- [ ] Dashboard access
- [ ] Content management
- [ ] Media uploads
- [ ] User management
- [ ] Settings save correctly

### 4. Performance Optimization

```bash
# Optimize autoloader
composer dump-autoload --optimize

# Cache configuration
php artisan config:cache

# Cache routes
php artisan route:cache

# Optimize images
php artisan media:optimize
```

### 5. Security Updates

- Change admin password
- Review user permissions
- Update security keys
- Enable two-factor authentication
- Check file permissions

## Troubleshooting

### Common Issues

#### White Screen After Upgrade

```bash
# Check error logs
tail -f storage/logs/laravel.log

# Clear all caches
php artisan optimize:clear

# Regenerate autoload
composer dump-autoload
```

#### Database Migration Errors

```bash
# Reset migrations (CAUTION: Data loss)
php artisan migrate:fresh

# Or rollback specific migration
php artisan migrate:rollback --step=1
```

#### Missing Assets

```bash
# Republish assets
php artisan cms:publish:assets --force

# Rebuild frontend
npm run prod

# Fix permissions
chmod -R 755 public/
```

#### Plugin Compatibility Issues

```bash
# Deactivate all plugins
php artisan cms:plugin:deactivate:all

# Activate one by one
php artisan cms:plugin:activate plugin-name
```

### Error Recovery

If upgrade fails:

1. **Restore from Backup**
   ```bash
   # Restore database
   mysql -u username -p database_name < backup.sql
   
   # Restore files
   tar -xzf backup_files.tar.gz -C /
   ```

2. **Check Logs**
   - Laravel logs: `storage/logs/`
   - Server logs: `/var/log/`
   - PHP error logs

3. **Seek Support**
   - Document error messages
   - Note upgrade steps taken
   - Contact support team

## Upgrade Best Practices

### Planning

1. **Schedule Downtime**
   - Choose low-traffic period
   - Notify customers in advance
   - Prepare maintenance page

2. **Test First**
   - Use staging environment
   - Test all critical paths
   - Verify third-party integrations

### During Upgrade

1. **Monitor Progress**
   - Watch error logs
   - Check system resources
   - Keep backup ready

2. **Document Changes**
   - Note custom modifications
   - Track configuration changes
   - Log any issues encountered

### After Upgrade

1. **Monitor Performance**
   - Check page load times
   - Monitor error rates
   - Watch server resources

2. **Gather Feedback**
   - Test with staff first
   - Soft launch to limited users
   - Collect user feedback

## Rollback Procedure

If you need to rollback:

1. **Enable Maintenance Mode**
   ```bash
   php artisan down
   ```

2. **Restore Database**
   ```bash
   mysql -u username -p database_name < backup.sql
   ```

3. **Restore Files**
   ```bash
   rm -rf current_files/
   tar -xzf backup_files.tar.gz
   ```

4. **Clear Caches**
   ```bash
   php artisan optimize:clear
   ```

5. **Exit Maintenance Mode**
   ```bash
   php artisan up
   ```

## Getting Help

### Support Channels

- **Documentation**: Check upgrade notes
- **Support Tickets**: https://botble.ticksy.com
- **Community Forum**: Share experiences
- **Emergency Support**: contact@botble.com

### Information to Provide

When seeking help, include:
- Current version number
- Target version number
- Error messages (full text)
- Server environment details
- Steps taken so far
- Backup status

::: danger Critical
Never upgrade directly on production without testing. Always maintain current backups before starting any upgrade process.
:::

::: tip Pro Tip
Set up automated backups before upgrades. Use version control (Git) to track changes and make rollbacks easier.
:::