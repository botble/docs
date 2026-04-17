---
title: FAQ
description: Frequently asked questions about SMS Gateways.
---

# FAQ

## General

### Can I use SMS Gateways without a queue worker?

Yes. On shared hosting (cPanel, Plesk), SMS sends synchronously without a queue worker. On VPS/dedicated servers, you can optionally use a queue worker for background processing.

### How much does SMS Gateways cost?

The plugin itself is a one-time purchase on CodeCanyon. SMS delivery costs depend on your chosen provider (Twilio, Vonage, etc.) and are per-SMS sent.

### Does SMS Gateways work on shared hosting?

Yes. It works on cPanel, Plesk, and any shared host with PHP 8.2+ and HTTPS. See [Shared Hosting](./shared-hosting/overview.md).

### Can I use multiple SMS drivers at the same time?

Yes. You can activate multiple drivers (e.g., Twilio + Vonage) and SMS Gateways will distribute SMS across them for redundancy or load balancing.

## Installation & Setup

### How do I activate the plugin?

1. Download from CodeCanyon
2. Upload to `platform/plugins/sms-gateways/`
3. Go to **Admin → Platform Administration → Plugins**
4. Find SMS Gateways and click **Activate**

See [Installation](./installation.md).

### Do I need to run migrations manually?

No. Activation runs migrations automatically. If migrations fail, run manually:
```bash
php artisan migrate --path=plugins/sms-gateways/database/migrations
```

### How do I get SMS provider credentials?

See the [Drivers](./drivers/twilio.md) section for step-by-step setup per provider.

## OTP & Verification

### How long is the OTP code valid?

Default: 300 seconds (5 minutes). Configure in **Admin → Settings → SMS Gateways → OTP TTL**.

### Can customers resend OTP?

Yes, up to **10 requests per phone per hour** by default (`smsg_otp_max_phone_attempts_per_hour`). Exceeding the cap short-circuits the send and writes a `rejected` row to the delivery log.

### What happens after 5 wrong OTP attempts?

The code is marked exhausted and can't be reused. The customer must request a new OTP — the previous code is dead. Configure the cap via `smsg_otp_default_max_attempts` (default `5`).

### Can I customize the OTP message?

Yes. Go to **Admin → SMS Gateways → Templates** and edit the per-event templates (`otp_login`, `otp_checkout`, `otp_phone_verify`, etc.). Use variables like `{otp_code}`, `{otp_ttl_minutes}`, `{shop_name}`, `{customer_name}`.

## SMS Sending

### Why is my SMS not being sent?

Check these in order:

1. Is the SMS driver configured? (Admin → Settings → SMS Gateways)
2. Is the subject enabled? (e.g., "Ecommerce" checked)
3. Is the customer opted out? (Admin → SMS Gateways → Consents)
4. Is there an error in Delivery Logs? (Admin → SMS Gateways → Delivery Logs)

### Can I schedule SMS to be sent later?

No, currently SMS are sent immediately. Feature request: open a support ticket.

### How long does SMS delivery take?

- Sync SMS (shared hosting): 2–5 seconds
- Queue SMS (VPS): 1–2 seconds
- Carrier delivery: 5–30 seconds
- Total: 10–60 seconds from send to delivery

### Can I send SMS in bulk?

Yes. SMS are sent individually but can be triggered in bulk via integrations (order status changes, batch campaigns, etc.).

## Webhooks & Delivery

### What are outbound webhooks?

Real-time notifications sent by SMS Gateways to your backend when SMS is sent, delivered, failed, etc. See [Outbound Webhooks](./usage/outbound-webhooks.md).

### What are inbound webhooks?

POST requests sent by SMS providers to your endpoint when customers reply (e.g., STOP). See [Consent & STOP/START](./usage/consent.md).

### Can I see SMS delivery status in real-time?

Yes. Configure outbound webhooks, or check **Admin → SMS Gateways → Delivery Logs** (refreshes within 5 seconds).

## Compliance & Privacy

### Is SMS Gateways GDPR compliant?

Yes. See [GDPR & Data Export](./usage/gdpr.md) for:
- Customer data export
- Customer data erasure (right to be forgotten)
- Consent audit logs
- Data retention policies

### How do I handle STOP/START requests?

Automatically via inbound webhooks. Configure your SMS provider's webhook endpoint in SMS Gateways settings. See [Consent & STOP/START](./usage/consent.md).

### Can customers export their SMS data?

Yes. If your site offers data export, customers can download their SMS history in JSON format.

### How long are SMS logs retained?

Default: 90 days. Configure in **Admin → Settings → SMS Gateways → Retention Days**. Auto-purged nightly via scheduler.

## Troubleshooting

### SMS test fails with "timeout"

Check:
1. Is HTTPS enabled on your domain?
2. Can you reach the SMS provider? Test: `curl https://api.twilio.com/`
3. Does your host allow outbound HTTPS?

See [Troubleshooting](./troubleshooting.md).

### SMS logs are growing too large

Purge old logs:
```bash
php artisan sms:purge --days=90
```

Or configure cron job to auto-purge nightly. See [Commands](./usage/commands.md).

### My SMS provider account was suspended

Log in to your provider dashboard and check account status. Contact provider support if needed.

### I'm being charged for failed SMS

You're likely sending to invalid phone numbers. See [Troubleshooting](./troubleshooting.md) for solutions.

## Advanced

### Can I build a custom SMS driver?

Yes. See [Custom Driver](./developer/custom-driver.md) for implementation details.

### Can I hook into SMS sending events?

Yes. See [Hooks & Events](./developer/hooks.md) for filters (`smsg_driver_register`, `sms_before_send`, `sms_template_variables`) and Laravel events (`SmsSent`, `SmsDelivered`, `OtpVerified`, etc.).

### Can I migrate from another SMS plugin?

Yes. See [Migration](./migration.md) to import from FOB SMS Gateway.

### How do I debug SMS issues?

1. Check **Admin → SMS Gateways → Delivery Logs** for errors
2. Check **Admin → SMS Gateways → Webhooks → Log** for webhook failures
3. Enable Laravel debug mode in `.env`: `APP_DEBUG=true`
4. Check `storage/logs/laravel.log` for error messages

## Support

### Where do I get support?

- **Documentation**: This site (docs.botble.com/sms-gateways)
- **CodeCanyon support**: Contact via CodeCanyon ticket system
- **Community forums**: Botble forums (botble.com/forums)

### How do I report a bug?

1. Check [Troubleshooting](./troubleshooting.md) first
2. Open a CodeCanyon support ticket with:
   - Error message (from logs or admin panel)
   - Steps to reproduce
   - PHP version, Botble version, SMS driver used

### Can I request a feature?

Yes. Open a feature request via CodeCanyon support with:
- Description of the feature
- Use case / benefit
- Proposed implementation (if technical)

## Next step

See [Configuration](./configuration.md) to get started or [Drivers](./drivers/twilio.md) for provider-specific setup.
