---
title: Shared Hosting Overview
description: SMS Gateways on shared hosting (cPanel, Plesk) without queue workers.
---

# Shared Hosting Setup

SMS Gateways works on shared hosting (cPanel, Plesk, etc.) with or without a queue worker. This guide covers zero-queue setup.

## The issue with shared hosting

Most shared hosts don't allow background queue workers (PHP processes running continuously). The plugin handles this transparently:

- **With queue worker (VPS / dedicated)**: SMS dispatch is queued and the request returns immediately. The worker sends in the background. See [Queue Setup](../usage/queue.md).
- **Without queue worker (shared hosting)**: With Laravel's default `QUEUE_CONNECTION=sync`, the plugin's `ShouldQueue` jobs execute inline — exactly as if the queue feature didn't exist. Order-confirm / login responses block on the carrier HTTP call (1–5 s typical).

Both paths use the same code. The only difference is `QUEUE_CONNECTION` in `.env` — leave it on `sync` and you'll never see a "Queued forever" row.

## What you need

- **PHP 8.2+** with extensions: `openssl`, `curl`, `json`, `mbstring`
- **MySQL 5.7+**
- **HTTPS** (most SMS providers require it)
- **Cron jobs** (optional, for cleanup and retries)

## Setup steps

### 1. Upload and activate the plugin

1. Download `sms-gateways.zip` from CodeCanyon
2. Upload to your shared host via cPanel File Manager or SFTP
3. Extract to `platform/plugins/sms-gateways/`
4. Go to admin panel and activate: **Admin → Platform Administration → Plugins → SMS Gateways → Activate**

### 2. Run migrations

```bash
php artisan migrate --path=plugins/sms-gateways/database/migrations
```

If SSH access isn't available, use a web-based command runner or ask hosting support.

### 3. Configure SMS drivers

1. Go to **Admin → Settings → SMS Gateways**
2. Enter your SMS provider credentials (Twilio, Vonage, etc.)
3. Test with a test SMS

### 4. Set up cron jobs (optional but recommended)

Cron jobs handle SMS cleanup and retries. Set up in **cPanel → Cron Jobs** or **Plesk → Scheduled Tasks**:

```bash
* * * * * cd /path/to/botble && php artisan schedule:run
```

Run this once per minute. It will automatically execute SMS cleanup and retry tasks.

Without cron, logs will grow indefinitely and failed SMS won't auto-retry.

## Testing on shared hosting

1. Go to **Admin → SMS Gateways → Settings**
2. Click **Send test SMS**
3. Enter your personal phone number
4. You should receive an SMS within 10 seconds

If it fails, see [Troubleshooting](./troubleshooting.md).

## Limitations on shared hosting

| Feature | Works? | Notes |
|---------|--------|-------|
| **Sync SMS sending** | ✓ | Default with `QUEUE_CONNECTION=sync`; no setup |
| **Async SMS sending** | ✗ | Requires `QUEUE_CONNECTION=database/redis` + a long-running worker — most shared hosts don't allow that |
| **Cron cleanup** | ✓ | Set in cPanel/Plesk, runs once per minute |
| **Inbound webhooks** | ✓ | SMS providers can POST to your endpoint |
| **Outbound webhooks** | ✓ | Plugin sends webhooks synchronously |
| **SSL/HTTPS** | ✓ | Most shared hosts offer free Let's Encrypt SSL |

## Performance expectations

- **SMS sending time**: 2–5 seconds per SMS (synchronous)
- **Delivery logs**: Appear in admin panel within 5 seconds
- **Outbound webhooks**: Sent within 1–2 seconds

If your site gets high SMS volume (100+/minute), consider a VPS with queue workers.

## Database backups

Before enabling SMS, ensure your host backs up the database regularly. SMS logs can grow large; you may need to archive or purge logs older than 90 days.

```bash
php artisan sms:purge --days=90
```

## Next step

Follow [cPanel Setup](./cpanel.md) or [Plesk Setup](./plesk.md) for hosting-specific cron job configuration.
