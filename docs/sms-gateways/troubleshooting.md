---
title: Troubleshooting
description: Common SMS Gateways issues and solutions.
---

# Troubleshooting

## SMS not being sent

**Symptom**: SMS is created but never sent; status remains "Queued".

**Causes**:
1. SMS driver is not configured or inactive
2. SMS is queued but no queue worker is running (on VPS/dedicated server)
3. SMS is blocked by consent (customer opted out)
4. SMS subject is disabled in settings

**Fixes**:

1. Check driver is configured:
   - Go to **Admin → Settings → SMS Gateways**
   - Verify at least one driver is checked under **Active Drivers**
   - Verify credentials are filled in (not empty)

2. Check subject is enabled:
   - In SMS Settings, verify the integration (Ecommerce, Marketplace, etc.) is checked

3. Check consent:
   - Go to **Admin → SMS Gateways → Consents**
   - Search for the phone number
   - If status is "Opted out", customer won't receive SMS

4. If using queue:
   - Run: `php artisan queue:work --queue=sms` (on VPS/dedicated server only)
   - Check logs for queue errors: `tail -f storage/logs/laravel.log`

## SMS test fails with "Invalid credentials"

**Symptom**: Clicking "Send test SMS" shows credential error.

**Causes**:
1. API key or token is wrong
2. API key has expired or been revoked
3. SMS provider account is not active

**Fixes**:

1. Re-copy credentials from your SMS provider dashboard
2. Check for typos or extra spaces
3. Regenerate API key if it's old (>6 months)
4. Log in to your SMS provider account and verify it's active and has balance

## SMS delivery is very slow (10+ seconds)

**Symptom**: SMS takes 10+ seconds to be marked as "Sent".

**Causes**:
1. On shared hosting, SMS sends synchronously (2–5 seconds is normal)
2. Network latency to SMS provider
3. Server is under heavy load
4. Queue is backed up (if using queue)

**Fixes**:

1. For shared hosting, 2–5 second latency is normal
2. Check SMS provider status page for downtime
3. If latency is consistent 10+ seconds, consider:
   - Upgrading to a VPS with optimized queue workers
   - Switching to a faster SMS provider
4. Check server load: `top` or `htop` (SSH access required)

## Inbound webhooks not working (STOP not recognized)

**Symptom**: Customer replies STOP, but consent is not updated.

**Causes**:
1. Inbound webhook URL is not configured
2. Firewall or mod_security is blocking webhook POST requests
3. Webhook URL is not publicly accessible
4. SMS provider is not sending webhooks

**Fixes**:

1. Configure inbound webhook URL:
   - Go to **Admin → Settings → SMS Gateways**
   - Set **Inbound Webhook URL** to your endpoint
   - Example: `https://yoursite.com/api/sms/inbound`

2. Test webhook:
   - Click **Test Inbound Webhook**
   - Enter a test phone and "STOP"
   - Check **Admin → SMS Gateways → Consents** to verify the phone was opted out

3. Check firewall/mod_security:
   - If test webhook fails, add this to `.htaccess`:
     ```
     <IfModule mod_security.c>
       SecFilterEngine Off
     </IfModule>
     ```
   - If SMS works, re-enable and whitelist the webhook endpoint

4. Verify webhook URL is publicly accessible (not localhost)

5. Verify your SMS provider supports inbound webhooks:
   - Twilio: Yes
   - Vonage (formerly Nexmo): Yes
   - AWS SNS: Limited (no MO support)
   - Plivo: Yes
   - Msg91: No (polling only)
   - Fast2SMS: No
   - BulkSMSBD: No (status polled via `/api/smsapidl`)

## OTP code not arriving

**Symptom**: Customer requests OTP, but SMS is never received.

**Causes**:
1. SMS driver credentials are wrong
2. Phone number format is invalid
3. Customer is opted out
4. OTP SMS is failing (check delivery logs)

**Fixes**:

1. Verify SMS driver works:
   - Go to **Admin → Settings → SMS Gateways**
   - Click **Send test SMS** to your personal phone
   - You should receive SMS within 10 seconds

2. Check phone number format:
   - Must include country code: `+1-555-1234` ✓
   - Without country code: `555-1234` ✗

3. Check delivery logs:
   - Go to **Admin → SMS Gateways → Delivery Logs**
   - Filter by phone number
   - Look for OTP SMS and check status (Failed, Opted out, etc.)
   - Read error message for details

4. Verify OTP is not rate-limited:
   - Check **Max OTP Attempts** setting (default: 5 wrong verify attempts exhausts the code)
   - Check **Per-phone rate limit** (default: 5 OTP requests/hour)

## "Permission denied" errors

**Symptom**: Errors like "storage/logs is not writable" or "database directory is not writable".

**Causes**:
1. File permissions are incorrect
2. Shared hosting permissions issue

**Fixes**:

1. Set correct permissions (via SSH or SFTP):
   ```bash
   chmod 755 storage/app/
   chmod 755 storage/logs/
   chmod 755 database/
   ```

2. Contact hosting support if you can't fix permissions

## Database connection fails

**Symptom**: "Could not connect to database" error when sending SMS.

**Causes**:
1. Database connection settings are wrong in `.env`
2. Database server is down or unreachable
3. Max connections exceeded

**Fixes**:

1. Verify `.env` database settings:
   ```bash
   DB_HOST=localhost
   DB_DATABASE=botble_db
   DB_USERNAME=botble_user
   DB_PASSWORD=your_password
   ```

2. Test database connection:
   ```bash
   php artisan db:show
   ```

3. If database is down, contact hosting support

4. If max connections exceeded, contact hosting support or reduce pool size in `.env`

## High SMS costs

**Symptom**: SMS bill is unexpectedly high.

**Causes**:
1. SMS are being sent to invalid numbers (rejected by provider, still charged)
2. Multi-part SMS (>160 characters) count as multiple SMS
3. High volume of failed SMS being retried

**Fixes**:

1. Monitor delivery logs:
   - Go to **Admin → SMS Gateways → Delivery Logs**
   - Filter by status "Failed"
   - Check error reasons (invalid numbers, etc.)
   - Fix the root cause (e.g., customer validation)

2. Optimize SMS templates:
   - Keep under 160 characters (GSM-7)
   - Avoid emoji and accents (trigger UCS-2, more expensive)
   - See [SMS Templates](./usage/templates.md)

3. Reduce retry frequency:
   - Go to **Admin → Settings → SMS Gateways**
   - Adjust retry policy (default: 3 retries)

## Queue jobs stuck

**Symptom**: SMS status is "Queued" for hours, never changes to "Sent".

**Causes** (VPS/dedicated only):
1. Queue worker is not running
2. Queue job is stuck or crashed

**Fixes**:

1. Start queue worker:
   ```bash
   php artisan queue:work --queue=sms
   ```

2. Check queue status:
   ```bash
   php artisan queue:work --queue=sms --verbose
   ```

3. Clear stuck jobs (use with caution):
   ```bash
   php artisan queue:flush
   ```

4. Use supervisor or systemd to keep queue worker running automatically

## Next step

See [FAQ](./faq.md) for more questions or [Support](../index.md) for contacting developers.
