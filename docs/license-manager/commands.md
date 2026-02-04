# Commands

License Manager provides several Artisan commands for automation and maintenance tasks.

## Process Expirations

Process license expirations and send notifications.

```bash
php artisan cms:license-manager:process-expirations
```

### What it does

1. **Expiring Licenses**: Finds licenses expiring within warning period
   - Sends warning emails (if enabled)
   - Triggers `license.expiring` webhook

2. **Expired Licenses**: Finds licenses that expired today
   - Logs expiration to activity log
   - Triggers `license.expired` webhook

3. **Update Support Expired**: Finds licenses with update support ended
   - Logs to activity log
   - Triggers `license.update_support_expired` webhook

### Configuration

Settings that affect this command:

| Setting | Purpose |
|---------|---------|
| `lm_send_expiration_warnings` | Enable/disable warning emails |
| `lm_expiration_warning_days` | Days before expiry to warn (e.g., "7,1") |
| `lm_enable_webhooks` | Enable/disable webhook notifications |

### Scheduling

Add to your cron or Laravel scheduler:

```php
// app/Console/Kernel.php
protected function schedule(Schedule $schedule)
{
    $schedule->command('cms:license-manager:process-expirations')
        ->daily()
        ->at('08:00');
}
```

Or via crontab:

```bash
0 8 * * * cd /path/to/project && php artisan cms:license-manager:process-expirations >> /dev/null 2>&1
```

## Process Auto-Blacklist

Automatically blacklist domains/IPs with excessive failed attempts.

```bash
php artisan cms:license-manager:process-auto-blacklist
```

### What it does

1. **Analyzes Failed Attempts**: Queries failed activations and downloads
2. **Domain Blacklisting**: Blocks domains exceeding threshold
3. **IP Blacklisting**: Blocks IPs exceeding threshold
4. **Logging**: Records blacklist additions to activity log

### Configuration

| Setting | Purpose | Default |
|---------|---------|---------|
| `lm_blacklist_domain_after_failed_attempts` | Domain threshold | 0 (disabled) |
| `lm_blacklist_ip_after_failed_attempts` | IP threshold | 0 (disabled) |

### Example

If domain threshold is 10:
- Domain `suspicious.com` has 15 failed attempts
- Command adds `suspicious.com` to blacklist
- All future requests from domain are rejected

### Scheduling

```php
$schedule->command('cms:license-manager:process-auto-blacklist')
    ->hourly();
```

## Clear Activity Logs

Remove old activity log entries.

```bash
php artisan cms:license-manager:activity-log:clear
```

### What it does

1. Counts existing log entries
2. Truncates the activity logs table
3. Reports number of deleted entries

### When to use

- Periodic cleanup of old logs
- Before database backup to reduce size
- After resolving historical issues

### Scheduling

```php
$schedule->command('cms:license-manager:activity-log:clear')
    ->monthly();
```

## Clear Download Logs

Remove old update download records.

```bash
php artisan cms:license-manager:download-log:clear
```

### What it does

1. Counts existing download records
2. Truncates the update downloads table
3. Reports number of deleted entries

### When to use

- Periodic cleanup of download history
- After exporting analytics data
- To free up database space

### Scheduling

```php
$schedule->command('cms:license-manager:download-log:clear')
    ->quarterly();
```

## LicenseBox Setting Sync

Sync settings with LicenseBox service.

```bash
php artisan cms:lb:setting:sync
```

### What it does

Synchronizes local settings with external LicenseBox service (if integrated).

## Running Commands

### Via Terminal

```bash
# Run directly
php artisan cms:license-manager:process-expirations

# With verbose output
php artisan cms:license-manager:process-expirations -v

# See all available commands
php artisan list cms:license-manager
```

### Via Scheduler

```php
// app/Console/Kernel.php
protected function schedule(Schedule $schedule)
{
    // Daily expiration check at 8 AM
    $schedule->command('cms:license-manager:process-expirations')
        ->daily()
        ->at('08:00')
        ->appendOutputTo(storage_path('logs/license-expirations.log'));

    // Hourly auto-blacklist check
    $schedule->command('cms:license-manager:process-auto-blacklist')
        ->hourly()
        ->appendOutputTo(storage_path('logs/license-blacklist.log'));

    // Monthly log cleanup
    $schedule->command('cms:license-manager:activity-log:clear')
        ->monthly()
        ->appendOutputTo(storage_path('logs/license-cleanup.log'));
}
```

### Via Admin Panel

Navigate to **License Manager → Manual Cron** to run commands manually:

1. Select command to run
2. Click **Run**
3. View output in interface

## Complete Cron Setup

### Recommended Schedule

| Command | Frequency | Purpose |
|---------|-----------|---------|
| `process-expirations` | Daily | Check and notify expirations |
| `process-auto-blacklist` | Hourly | Block abusive clients |
| `activity-log:clear` | Monthly | Cleanup old logs |
| `download-log:clear` | Quarterly | Cleanup download history |

### Sample Crontab

```bash
# Laravel scheduler (handles all commands)
* * * * * cd /var/www/html && php artisan schedule:run >> /dev/null 2>&1

# Or individual commands
0 8 * * * cd /var/www/html && php artisan cms:license-manager:process-expirations
0 * * * * cd /var/www/html && php artisan cms:license-manager:process-auto-blacklist
0 0 1 * * cd /var/www/html && php artisan cms:license-manager:activity-log:clear
```

### Using Supervisor

For long-running processes, use Supervisor:

```ini
[program:license-scheduler]
process_name=%(program_name)s
command=php /var/www/html/artisan schedule:work
autostart=true
autorestart=true
user=www-data
redirect_stderr=true
stdout_logfile=/var/log/license-scheduler.log
```

## Troubleshooting

### Command Not Found

```bash
# Clear command cache
php artisan cache:clear
php artisan config:clear

# Verify plugin is active
php artisan cms:plugin:list
```

### Permission Errors

```bash
# Fix storage permissions
chmod -R 775 storage
chown -R www-data:www-data storage
```

### Memory Issues

For large datasets:

```bash
# Increase memory limit
php -d memory_limit=512M artisan cms:license-manager:process-expirations
```

### Logging Output

```bash
# Redirect output to log file
php artisan cms:license-manager:process-expirations >> storage/logs/cron.log 2>&1

# View logs
tail -f storage/logs/cron.log
```
