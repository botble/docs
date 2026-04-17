---
title: Plesk Setup
description: Configure SMS Gateways on Plesk shared hosting.
---

# Plesk Setup

Step-by-step Plesk configuration for SMS Gateways.

## Set up scheduled tasks

1. Log in to Plesk
2. Go to **Subscriptions → (your domain) → Scheduled Tasks**
3. Click **Add New Task**
4. Fill in:
   - **Name**: `SMS Scheduler`
   - **Type**: `Command`
   - **Command**: `cd /var/www/vhosts/yourdomain.com && php artisan schedule:run`
     (Replace `yourdomain.com` with your actual domain)
   - **Schedule**: `Every minute`
5. Click **Add**


This runs Laravel's scheduler every minute, executing SMS cleanup and retry tasks.

## Enable HTTPS (Let's Encrypt)

1. Log in to Plesk
2. Go to **Subscriptions → (your domain)**
3. Click **SSL Certificates**
4. Click **Add Let's Encrypt Certificate**
5. Choose your domain and click **Install**

Plesk offers **free Let's Encrypt SSL**. Enable it to ensure SMS providers can reach your inbound webhook endpoints.

## Verify installation

1. Log in to your Botble admin panel
2. Go to **Admin → Settings → SMS Gateways**
3. Enter SMS driver credentials
4. Click **Send test SMS**
5. You should receive an SMS within 10 seconds

## PHP version selection (if needed)

If SMS tests fail, verify your PHP version:

1. Go to **Subscriptions → (your domain) → Hosting & Resources**
2. Select **PHP 8.2 or higher** from the PHP version dropdown
3. Verify these PHP extensions are enabled:
   - `openssl`
   - `curl`
   - `json`
   - `mbstring`

4. Click **Apply**

## File permissions

Plesk sets permissions automatically. Ensure:

- `storage/app/` is writable (755)
- `storage/logs/` is writable (755)
- `database/` is writable (755)

If permissions are wrong, you'll see "Permission denied" errors in the admin panel.

## Database access

SMS Gateways uses your existing Botble database. No additional setup needed.

## Troubleshooting

### SMS test fails with "connection timeout"

1. Check HTTPS is enabled (see above)
2. Verify your shared host allows outbound HTTPS (contact Plesk support)
3. Test from Plesk terminal: `curl https://api.twilio.com/` (should not timeout)

### Scheduled tasks not running

1. Go to **Subscriptions → (your domain) → Scheduled Tasks → Edit**
2. Check the task is **Active** (toggle on)
3. Check the schedule is **Every minute**
4. Look at the **Last run status** to see if there were errors
5. Test manually: `cd /var/www/vhosts/yourdomain.com && php artisan schedule:run`

### SMS logs growing too large

1. Manually purge via Plesk file manager (File Manager → storage/logs)
2. Or use the command: `php artisan sms:purge --days=90`
3. Ensure the scheduled task (above) is running to auto-purge nightly

## Next step

See [Troubleshooting](./troubleshooting.md) for common issues or [Overview](./overview.md) for general shared-hosting guidance.
