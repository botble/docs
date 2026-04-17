---
title: cPanel Setup
description: Configure SMS Gateways on cPanel shared hosting.
---

# cPanel Setup

Step-by-step cPanel configuration for SMS Gateways.

## Set up cron jobs

1. Log in to cPanel
2. Go to **Advanced → Cron Jobs**
3. Under "Add New Cron Job", fill in:
   - **Common Settings**: Select "Once Per Minute"
   - **Command**: `cd /home/username/public_html && php artisan schedule:run`
     (Replace `username` with your cPanel username, `public_html` with your Botble root)

4. Click **Add New Cron Job**


This runs Laravel's scheduler every minute, which executes:

- `sms:purge` — Delete logs older than 90 days (nightly at 2 AM)
- `sms:retry` — Retry failed SMS (every 30 minutes)
- `otp:cleanup` — Remove expired OTP codes (nightly at 3 AM)

## Enable HTTPS (SSL)

1. Log in to cPanel
2. Go to **Domains**
3. Click **Manage** on your domain
4. Click **Automatic HTTPS** (if available)
5. Or manually add SSL via **Security → SSL/TLS**

Most shared hosts offer **free Let's Encrypt SSL**. Enable it to ensure SMS providers can reach your inbound webhook endpoints.

## Verify installation

1. Log in to your Botble admin panel
2. Go to **Admin → Settings → SMS Gateways**
3. Enter SMS driver credentials (Twilio, Vonage, etc.)
4. Click **Send test SMS**
5. You should receive an SMS within 10 seconds

## PHP version selection (if needed)

If SMS tests fail, verify your PHP version:

1. Go to **Home → Select PHP Version** (or **Software → PHP Selector** in newer cPanel)
2. Ensure you're running **PHP 8.2 or higher**
3. Verify these extensions are enabled:
   - `openssl`
   - `curl`
   - `json`
   - `mbstring`

4. Click **Save**

## File permissions

cPanel handles file permissions automatically. Ensure:

- `storage/app/` is writable (for temporary files)
- `storage/logs/` is writable (for SMS logs)
- `database/` is writable (for migrations)

If permissions are wrong, you'll see "Permission denied" errors in admin panel.

## Database access

SMS Gateways uses your existing Botble database. No additional setup needed.

## Troubleshooting

### SMS test fails with "connection timeout"

1. Check HTTPS is enabled (see above)
2. Verify your shared host allows outbound HTTPS (contact support)
3. Test from command line: `curl https://api.twilio.com/` (should not timeout)

### Cron jobs not running

1. Go to **cPanel → Cron Jobs → Error Log**
2. Check for errors in the cron output
3. Ensure the command path is correct (replace `username` with your actual cPanel username)
4. Test manually: `cd /home/username/public_html && php artisan schedule:run`

### SMS logs growing too large

1. Manually purge via cPanel File Manager:
   - You can delete `storage/logs/` files older than 90 days
2. Or use the command: `php artisan sms:purge --days=90`
3. Set up the cron job (see above) to auto-purge nightly

## Next step

See [Plesk Setup](./plesk.md) for Plesk-specific instructions or [Troubleshooting](./troubleshooting.md) for common issues.
