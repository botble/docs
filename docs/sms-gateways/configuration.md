---
title: Configuration
description: Configure SMS drivers, defaults, and settings.
---

# Configuration

After installation, wire up your SMS drivers in **Admin → Settings → SMS Gateways**.

## Step 1 — Pick your driver(s)

Select one or more providers from the **Active Drivers** checkbox list. You can run multiple drivers simultaneously for redundancy.

| Driver | Best for | Priority |
|--------|----------|----------|
| **Twilio** | Worldwide coverage, reliable | Default |
| **Vonage** (formerly Nexmo) | EU/Asia, good rates | Secondary |
| **AWS SNS** | AWS-hosted apps | AWS-native |
| **Plivo** | India, Southeast Asia | Regional |
| **Msg91** | India OTP + DLT Flow templates | India-specific |
| **Fast2SMS** | India, requires DLT approval | India-specific |
| **BulkSMSBD** | Bangladesh | Bangladesh-specific |
| **eSMS.vn** | Vietnam — Brandname, CSKH/OTP, Advertising | Vietnam-specific |


## Step 2 — Enter driver credentials

For each active driver, expand its section and enter:

- **API Key / Token** — from the provider's dashboard
- **Secondary credentials** — e.g., Account SID for Twilio, API Secret for Vonage
- **Sender ID** — the "from" number or alphanumeric ID (provider-specific)

See [Drivers](./drivers/twilio.md) for step-by-step credential setup per provider.

## Step 3 — OTP defaults

Set these for phone verification across all integrations:

| Setting | Default | Notes |
|---------|---------|-------|
| **Code length** | 6 digits | Range 4–8 |
| **OTP TTL** | 300 seconds (5 min) | How long the code is valid |
| **Max verify attempts** | 5 | Lockout after N wrong tries |
| **Per-phone requests/hour** | 10 | Max OTP requests per phone per hour |
| **Global rate limit** | 60/min | Plugin-wide send ceiling |


## Step 4 — Subject toggles

Enable/disable SMS for each host plugin:

- **Ecommerce** — Order SMS, customer OTP
- **Marketplace** — Vendor alerts, customer + vendor OTP
- **Real estate** — Listing inquiry alerts
- **Job board** — Application status SMS
- **Car manager** — Booking SMS
- **Hotel** — Reservation SMS

Unchecking a subject disables SMS entirely for that plugin, even if templates are defined.

## Step 5 — Outbound webhooks (optional)

Add endpoints for delivery notifications in **Admin → SMS Gateways → Webhooks**.

Each webhook receives 6 event types:

- `sms.queued` — SMS accepted by provider
- `sms.sent` — Provider confirmed sending
- `sms.delivered` — Recipient received SMS
- `sms.failed` — Delivery failed
- `sms.opted_out` — Recipient sent STOP
- `otp.verified` — OTP code confirmed

All webhooks are signed with HMAC-SHA256. See [Outbound Webhooks](./usage/outbound-webhooks.md) for payload format and verification.


## Step 6 — Retention policy

Auto-purge logs older than **90 days** (configurable):

```bash
php artisan sms:purge --days=90
```

This runs nightly via scheduler if configured.

## Step 7 — Test your setup

Send a test SMS to verify driver credentials:

1. Go to **Admin → SMS Gateways → Settings**.
2. Scroll to "Test SMS" and enter your phone number.
3. Click **Send test SMS**.
4. Check your phone for the test message within 10 seconds.

If the test fails, see [Troubleshooting](./troubleshooting.md).

## Environment variables (optional)

You can also set driver credentials via `.env`:

```bash
SMS_DRIVERS=twilio,vonage
SMS_TWILIO_ACCOUNT_SID=ACxxxxx
SMS_TWILIO_AUTH_TOKEN=your_token
SMS_VONAGE_API_KEY=your_key
SMS_VONAGE_API_SECRET=your_secret
```

Admin settings take precedence over `.env` values.

## Next step

Configure your first integration in [Ecommerce](./integration/ecommerce.md) or jump to [Usage](./usage/otp.md) for admin workflows.
