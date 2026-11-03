# Commands

License Manager provides several Artisan commands for automation and maintenance tasks.

::: tip Scheduling is built in
The plugin registers its own schedule: `process-expirations` daily at 02:00, `process-auto-blacklist` hourly,
`activity-log:clear` and `download-log:clear` weekly. You only need the single `schedule:run` cron entry — see
[Setup cronjob](/license-manager/cronjob). Do not add the same commands again in `routes/console.php`, or they run twice.
:::

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

Runs automatically every day at 02:00 through `schedule:run`.

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
| `lm_blacklist_domain_after_failed_attempts` | Domain threshold | 0 (disabled) until saved; the API settings form pre-fills `200` |
| `lm_blacklist_ip_after_failed_attempts` | IP threshold | 0 (disabled) until saved; the API settings form pre-fills `100` |

### Example

If domain threshold is 10:
- Domain `suspicious.com` has 15 failed attempts
- Command adds `suspicious.com` to blacklist
- All future requests from domain are rejected

### Scheduling

Runs automatically every hour through `schedule:run`.

## Clear Activity Logs

Remove old activity log entries.

```bash
php artisan cms:license-manager:activity-log:clear
```

### What it does

1. Counts existing log entries
2. Truncates the activity logs table (all rows, not only old ones)
3. Reports number of deleted entries

### When to use

- Periodic cleanup of old logs
- Before database backup to reduce size
- After resolving historical issues

### Scheduling

Runs automatically **weekly** through `schedule:run`.

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

Runs automatically **weekly** through `schedule:run`.

## Generate a Signing Keypair

Generates an Ed25519 keypair for signing update releases. See
[Update Integrity](/license-manager/update-integrity).

```bash
php artisan cms:license-manager:keys:generate
```

| Option | Purpose |
|--------|---------|
| `--output=` | Path to write the private key to (default `./lm-signing.key`) |

Writes the private key with mode `0600` and prints the public key and key ID. Refuses to overwrite
an existing key file.

::: danger Run this on your release machine, never the license server
Only the public key belongs on the license server. A private key stored next to the update files
lets anyone who can replace an update also re-sign it.
:::

## Sign a Release

Signs an update archive and prints the manifest and detached signature to upload with it.

```bash
php artisan cms:license-manager:release:sign update-1.2.0.zip PROD-001 1.2.0
```

Arguments are positional - **file**, **product reference id**, **version string exactly as it will
be stored**. `--version` could not be used as an option because Symfony reserves it for the console
application itself.

| Option | Purpose |
|--------|---------|
| `--key=` | Path to the private key (default `./lm-signing.key`) |
| `--json` | Emit machine-readable JSON for CI |

Touches no database and makes no network calls, so it runs on a machine that holds the private key
and nothing else.

## Backfill Version Checksums

Computes SHA-256 digests for versions uploaded before checksums existed.

```bash
php artisan cms:license-manager:versions:backfill-checksums
```

| Option | Purpose |
|--------|---------|
| `--dry-run` | Report what would change without writing |

Safe to re-run: only rows with no digest are touched, and a version whose archive is missing from
disk is reported and left null rather than failing the run.

## Generate Licenses

Bulk-generates license keys for a product from the shell (the CLI counterpart of **Bulk Generate**).

```bash
php artisan cms:license-manager:generate {product?} {quantity?}
```

`product` is the product reference ID and `quantity` is 2–500; both are prompted for when omitted.

| Option | Purpose |
|--------|---------|
| `--type=` | License type |
| `--uses=` | Number of uses |
| `--parallel-uses=` | Parallel uses limit |
| `--expiry-days=` | Days until expiration |
| `--expires-at=` | Expiration date (`Y-m-d`) |
| `--updates-until=` | Updates valid until (`Y-m-d`) |
| `--support-until=` | Support valid until (`Y-m-d`) |
| `--customer-id=` | Customer ID |
| `--email=` | Customer email |
| `--invoice=` | Invoice number |
| `--comments=` | Comments |

## Send License Details

Emails a customer their license details.

```bash
php artisan cms:license-manager:send-license-details {email?} {license_code?} [--dry-run]
```

## Domain Violation Notices

Two commands email customers who use one license on a second domain or switched domains.

```bash
# One customer, by license/purchase code or customer email
php artisan cms:license-manager:notify-domain-switch {identifier} [--dry-run] [--force] [--no-confirm] [--locale=]

# Scan the most recent activations and notify every violation found
php artisan cms:license-manager:scan-domain-violations [--limit=50] [--dry-run] [--force] [--no-confirm] [--locale=]
```

| Option | Purpose |
|--------|---------|
| `--dry-run` | Show what would be sent without sending |
| `--force` | Resend even if a notice was already sent |
| `--no-confirm` | Skip the confirmation prompt for each email |
| `--locale=` | Send the email in a specific locale (e.g. `vi`, `en`) |
| `--limit=` | (`scan-domain-violations` only) number of recent activations to scan, default 50 |

Neither is scheduled — run them by hand.

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

No scheduler code is needed — the plugin registers its schedule when it boots. Check it with:

```bash
php artisan schedule:list
```

### Via Admin Panel

Navigate to **License Manager → Run Manual Cron** and click **Run**. It runs the expiration check and the
auto-blacklist check together and shows the result of each.

## Complete Cron Setup

### Built-in Schedule

| Command | Frequency | Purpose |
|---------|-----------|---------|
| `process-expirations` | Daily at 02:00 | Check and notify expirations |
| `process-auto-blacklist` | Hourly | Block abusive clients |
| `activity-log:clear` | Weekly | Empty the activity log table |
| `download-log:clear` | Weekly | Empty the update download history |

### Sample Crontab

```bash
# Laravel scheduler (runs every command above on its schedule)
* * * * * cd /var/www/html && php artisan schedule:run >> /dev/null 2>&1
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
