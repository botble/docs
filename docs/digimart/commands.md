---
title: Console Commands
description: Artisan commands for marketplace management
---

# Console Commands

DigiMart provides Laravel Artisan console commands for automated tasks, batch operations, and maintenance.

Run commands via:

```bash
php artisan {command} {arguments} {options}
```

## Product Management

### Approve Product

Approve a product by package name:

```bash
php artisan marketplace:product-approve {package}
```

**Arguments:**
- `package` — Product package name (slug)

**Example:**
```bash
php artisan marketplace:product-approve my-awesome-plugin
```

Sets product status to Published. Admin notification is sent to the author.

### Reject Product

Reject a pending product:

```bash
php artisan marketplace:product-reject {package}
```

**Arguments:**
- `package` — Product package name (slug)

**Options:**
- `--reason=TEXT` — Rejection reason (sent to author)

**Example:**
```bash
php artisan marketplace:product-reject my-awesome-plugin --reason="Malware detected in version 1.0"
```

Sets product status to Rejected. Author is notified and can revise.

## Statistics & Downloads

### Update Download Counts

Recalculate download statistics for all products:

```bash
php artisan marketplace:product-downloads-count-update
```

**Purpose:**
- Reconciles download counts after deletions or corrections
- Rebuilds historical statistics
- Takes effect immediately on product pages

**Example:**
```bash
php artisan marketplace:product-downloads-count-update
# Output: Updated 147 products
```

**Tip:** Run this command in a cron job weekly to keep statistics fresh.

## Thumbnails & Media

### Generate Missing Thumbnails

Generate thumbnail images for products without them:

```bash
php artisan marketplace:product-thumbnail-generate
```

**Purpose:**
- Creates thumbnail images from product media
- Used for product listings and previews
- Improves visual consistency

**Options:**
- `--force` — Regenerate all thumbnails (even existing ones)

**Example:**
```bash
php artisan marketplace:product-thumbnail-generate --force
# Output: Generated 23 thumbnails
```

**Tip:** Run after uploading product images or theme updates.

## Version Management

### Update Product Version Metadata

Refresh version compatibility information:

```bash
php artisan marketplace:product-version-update
```

**Purpose:**
- Updates version metadata from GitHub releases
- Refreshes compatibility information
- Syncs version numbers

Used when integrating with GitHub repositories.

### Update Product Identifiers

Refresh or recalculate product identifiers:

```bash
php artisan marketplace:product-id-update
```

**Purpose:**
- Regenerates product identifiers (slugs, IDs)
- Useful after imports or migrations
- Ensures uniqueness

**Example:**
```bash
php artisan marketplace:product-id-update
# Output: Updated 89 products
```

## Virus Scanning

### Process Pending Virus Scans

Scan product versions awaiting VirusTotal results:

```bash
php artisan marketplace:virus-scan-pending
```

**Purpose:**
- Checks scan status for Pending/Scanning versions
- Updates status from VirusTotal
- Frees versions for download if Clean
- Quarantines if Malicious

**Options:**
- `--limit=N` — Process max N versions (default: 100)

**Example:**
```bash
php artisan marketplace:virus-scan-pending
# Output: Processed 12 versions (10 Clean, 2 Malicious)
```

**Automation:**
Add to crontab to process scans automatically:

```bash
*/10 * * * * cd /path/to/marketplace && php artisan marketplace:virus-scan-pending
```

This runs every 10 minutes, checking for scan results.

## General Commands

### List All Commands

View all available marketplace commands:

```bash
php artisan list marketplace
```

### Get Command Help

View detailed help for any command:

```bash
php artisan help {command}
```

**Example:**
```bash
php artisan help marketplace:product-approve
```

## Cron Job Setup

Automate recurring tasks using cron:

```bash
# Edit crontab
crontab -e

# Add these lines:

# Update download counts daily at 2 AM
0 2 * * * cd /path/to/marketplace && php artisan marketplace:product-downloads-count-update

# Process virus scans every 10 minutes
*/10 * * * * cd /path/to/marketplace && php artisan marketplace:virus-scan-pending

# Generate missing thumbnails daily at 3 AM
0 3 * * * cd /path/to/marketplace && php artisan marketplace:product-thumbnail-generate
```

Or use Laravel Scheduler (Kernel.php):

```php
protected function schedule(Schedule $schedule)
{
    $schedule->command('marketplace:product-downloads-count-update')
        ->dailyAt('02:00');
    
    $schedule->command('marketplace:virus-scan-pending')
        ->everyTenMinutes();
    
    $schedule->command('marketplace:product-thumbnail-generate')
        ->dailyAt('03:00');
}
```

Then run the scheduler:

```bash
php artisan schedule:run
```

## Best Practices

1. **Run during low-traffic hours** — Scanning and statistics updates can be resource-intensive
2. **Use `--force` carefully** — Regenerating all thumbnails takes time
3. **Monitor command output** — Check logs for errors or warnings
4. **Test first** — Run commands manually before adding to cron
5. **Backup database** — Before running batch operations (approve/reject)

## Troubleshooting

**Command not found:**
```bash
# Clear command cache
php artisan cache:clear

# Regenerate autoloader
composer dump-autoload
```

**Virus scan hangs:**
- Increase timeout in settings (see [Settings](./settings.md))
- Check VirusTotal API quota
- Review firewall/proxy blocking

**Download counts incorrect:**
- Check database integrity
- Run update command with `--fresh` flag
- Review download logs for anomalies

::: tip
Use the scheduler for recurring tasks. It's more reliable than cron for Laravel apps and handles server downtime gracefully.
:::

See [Virus Scanning](./virus-scanning.md) for scanning details.
