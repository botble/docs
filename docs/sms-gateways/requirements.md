---
title: Requirements
description: System requirements for SMS Gateways plugin.
---

# Requirements

## Server

- **PHP**: 8.2 or higher
- **Laravel**: 10 or higher (via Botble 7.3+)
- **Botble CMS**: 7.3 or higher
- **MySQL/MariaDB**: 5.7 or higher
- **Web server**: Apache or Nginx with URL rewriting enabled

## PHP Extensions

Required extensions (typically pre-installed on shared hosting):

- `openssl` — HMAC-SHA256 signature verification for webhooks
- `curl` — outbound HTTPS requests to SMS providers
- `json` — JSON parsing for API responses
- `mbstring` — Unicode string handling for SMS templates

## Database

- **InnoDB** storage engine (default)
- Enough storage for delivery logs (roughly 1 KB per SMS sent)
- At least one database with `utf8mb4` charset

## Disk Space

- **Installation**: ~500 KB for plugin files
- **Logs**: Variable; we recommend archiving logs older than 90 days

## Driver-Specific

Each SMS provider has its own credentials format:

| Driver | What you need |
|--------|---|
| **Twilio** | Account SID, Auth Token |
| **Vonage** (formerly Nexmo) | API Key, API Secret |
| **AWS SNS** | Access Key, Secret Key, region |
| **Plivo** | Auth ID, Auth Token |
| **Msg91** | Auth Key, Flow ID, Sender ID |
| **Fast2SMS** | API Authorization token |
| **BulkSMSBD** | API Token, sender ID |

See [Drivers](./drivers/twilio.md) for per-provider signup and credential setup.

## Queue Worker (Optional)

For production, run a queue worker to process SMS in the background:

```bash
php artisan queue:work --queue=sms
```

On shared hosting without queue support, SMS sends synchronously (add 2–5 seconds latency per SMS).

## Permissions

The plugin requires file write access to:

- `storage/app/` — temporary files
- `storage/logs/` — SMS delivery logs
- `database/` — migrations
