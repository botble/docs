---
title: Shared Hosting Troubleshooting
description: Debug common SMS issues on cPanel and Plesk.
---

# Shared Hosting Troubleshooting

## SMS test fails with "connection timeout"

**Symptom**: Clicking "Send test SMS" shows a timeout error after 10 seconds.

**Causes**:

1. Shared host blocks outbound HTTPS (firewall)
2. SMS provider is unreachable from your IP
3. SSL certificate is invalid or self-signed

**Fixes**:

1. Verify HTTPS is enabled on your domain:
   - cPanel: **Security → SSL/TLS** (should show valid Let's Encrypt cert)
   - Plesk: **SSL Certificates** (should show installed)
2. Test outbound HTTPS from command line:
   ```bash
   curl https://api.twilio.com/
   ```
   If timeout, contact hosting support — your host may block outbound HTTPS.
3. Check firewall rules in cPanel/Plesk — whitelist your SMS provider's IP range

## SMS test fails with "Invalid credentials"

**Symptom**: SMS provider rejects your credentials (API key, token, etc.).

**Causes**:

1. Credentials are wrong (typo, copy/paste error)
2. API key has expired or been revoked
3. Account is not active or verified

**Fixes**:

1. Re-copy credentials from your SMS provider dashboard
2. Ensure no trailing spaces in the credential field
3. Log in to your SMS provider account and verify it's active
4. Regenerate API key if it's old (>6 months)

## Cron jobs not running (logs not being cleaned)

**Symptom**: `php artisan sms:purge --days=90` never runs automatically; logs grow indefinitely.

**Causes**:

1. Cron job is not configured
2. Cron job is disabled or has wrong schedule
3. Cron job command is incorrect

**Fixes**:

1. cPanel:
   - Go to **Advanced → Cron Jobs**
   - Add: `* * * * * cd /home/username/public_html && php artisan schedule:run`
   - Replace `username` with your cPanel username
2. Plesk:
   - Go to **Subscriptions → (domain) → Scheduled Tasks**
   - Add new task with command: `cd /var/www/vhosts/yourdomain.com && php artisan schedule:run`
   - Set schedule to **Every minute**
3. Test manually: `cd /path/to/botble && php artisan schedule:run`

## Inbound webhooks not working (STOP/START not recognized)

**Symptom**: Customer replies STOP to SMS, but consent is not updated.

**Causes**:

1. Inbound webhook URL is not set in settings
2. Firewall/mod_security is blocking webhook requests
3. Webhook URL is not publicly accessible

**Fixes**:

1. Configure inbound webhook:
   - Go to **Admin → Settings → SMS Gateways**
   - Set **Inbound Webhook URL** to your endpoint (e.g., `https://yoursite.com/api/sms/inbound`)
2. Test webhook:
   - Click **Test Inbound Webhook** in SMS Settings
   - Enter a test phone and "STOP"
   - Check **Admin → SMS Gateways → Consents** to verify the phone was opted out
3. Check mod_security (common on shared hosts):
   - Disable temporarily: Add this to `.htaccess`:
     ```
     <IfModule mod_security.c>
       SecFilterEngine Off
     </IfModule>
     ```
   - If SMS works, re-enable and whitelist the webhook endpoint in mod_security rules
4. Verify webhook URL is accessible from the internet (not localhost)

## SMS stuck in "Queued" status

**Symptom**: SMS shows "Queued" in logs for hours but never changes to "Sent" or "Failed".

**Causes**:

1. No queue worker running (expected on shared hosting, SMS should send synchronously)
2. Queue job is stuck

**Fixes**:

1. Verify queue is not required:
   - Go to **Admin → Settings → SMS Gateways**
   - SMS should send immediately (synchronous) without a queue worker
2. If SMS is queued but not processing:
   - Try manually processing the queue: `php artisan queue:work --queue=sms --once`
   - Most shared hosts don't allow background queue workers; contact support if you need queue support

## High SMS latency (slow delivery)

**Symptom**: SMS takes 10+ seconds to be marked as "Sent".

**Causes**:

1. Synchronous sending (expected on shared hosting)
2. Network latency to SMS provider
3. High server load

**Fixes**:

1. On shared hosting, 2–5 second latency is normal (synchronous)
2. If latency is 10+ seconds, check:
   - SMS provider status (may be slow)
   - Server load: `top` command (if you have SSH)
3. To speed up, consider:
   - Upgrading to a VPS with a queue worker
   - Using a faster SMS provider (compare API response times)

## "Connection refused" when connecting to database

**Symptom**: SMS fails with database connection error.

**Causes**:

1. Database connection settings are wrong
2. Database server is down
3. Maximum connections exceeded

**Fixes**:

1. Verify database credentials in `.env`:
   ```bash
   DB_HOST=localhost
   DB_DATABASE=botble_db
   DB_USERNAME=botble_user
   DB_PASSWORD=your_password
   ```
2. Test database connection:
   - cPanel: **Databases → MySQL Databases** (check connection)
   - Plesk: **Subscriptions → (domain) → Databases** (check status)
3. If database is down, contact hosting support
4. If max connections exceeded, reduce the connection pool in `.env`

## PHP extensions missing (openssl, curl, etc.)

**Symptom**: SMS fails with "openssl extension required" or similar.

**Causes**:

1. PHP extensions are not installed or enabled
2. Wrong PHP version is selected

**Fixes**:

1. Select correct PHP version:
   - cPanel: **Software → PHP Selector** (select 8.2+)
   - Plesk: **Hosting & Resources** (select 8.2+)
2. Enable required extensions:
   - `openssl`, `curl`, `json`, `mbstring`
   - Usually enabled by default; if not, contact hosting support
3. Verify extensions are loaded:
   ```bash
   php -m | grep openssl
   php -m | grep curl
   ```

## Next step

See [Overview](./overview.md) for general shared-hosting guidance or [Configuration](../configuration.md) to set up SMS drivers.
