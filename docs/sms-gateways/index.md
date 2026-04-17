---
title: SMS Gateways for Botble
description: Multi-provider SMS plugin for Botble CMS — OTP verification, SMS templates, delivery logs, opt-in/STOP handling, outbound webhooks, and 7 pre-built drivers (Twilio, Vonage/Nexmo, AWS SNS, Plivo, Msg91, Fast2SMS, BulkSMSBD).
---

# SMS Gateways

Professional SMS delivery across e-commerce, marketplace, real estate, job board, car rental, and hotel platforms.

The **SMS Gateways** plugin lets you send SMS notifications from any Botble host plugin using multiple providers. One unified admin interface manages OTP verification, customer notifications, STOP/STOP handling, and delivery logs — with optional webhooks for downstream systems.

![SMS delivery overview](./images/sms-overview.png)

## Highlights

- **7 pre-built drivers** — Twilio, Vonage (formerly Nexmo), AWS SNS, Plivo, Msg91 (India), Fast2SMS (India), BulkSMSBD (Bangladesh)
- **Flexible OTP delivery** — Phone verification, TTL/attempt limits, per-phone rate limiting
- **SMS templates** — Admin-editable templates with variable injection, GSM-7 & UCS-2 preview
- **STOP/START consent** — Auto-opt-in/opt-out, audit logs, per-subject erasure
- **Delivery logs** — Filter, retry, export, webhook tracking
- **Outbound webhooks** — HMAC-SHA256 signed, 6 event types (queued/sent/delivered/failed/opted-out, otp.verified)
- **Bulk Artisan commands** — retry, purge, migrate from legacy SMS providers
- **GDPR-ready** — Data export, cascade delete, per-subject erasure
- **Role-based permissions** — Admin gating per task
- **42-language support** — English + 41 machine-translated locales
- **Shared-hosting friendly** — Works on cPanel, Plesk, queue-free alternatives

## Who should use this plugin

| You run… | You get… |
|---|---|
| **Ecommerce** (Shofy, Nest, Farmart) | OTP verification, order status SMS |
| **Marketplace** (Martfury, Shopwise) | Vendor alerts, customer + vendor OTP |
| **Real estate** (Homzen, Hasa, Flex-Home) | Listing inquiry SMS, agent notifications |
| **Job board** (Jobcy, Jobzilla) | Application status SMS, candidate alerts |
| **Car rental** (Auxero, Carento) | Booking confirmation, driver SMS |
| **Hotel/booking** | Reservation SMS, check-in reminders |

## How it works

1. Admin picks one or more SMS drivers in **Admin → Settings → SMS Gateways**.
2. Host plugins (ecommerce, marketplace, etc.) fire their own events; SMS Gateways's `HandleHostEventListener` resolves the matching subject + template and calls `Sms::send()` internally.
3. SMS is queued and delivered through the selected driver(s).
4. Admin reviews delivery logs in **Admin → SMS Gateways → Delivery Logs**.
5. Optional: Outgoing webhooks notify your backend of delivery status.

## Next steps

- [Requirements](./requirements.md) — PHP, Botble, MySQL versions
- [Installation](./installation.md) — upload and activate
- [Configuration](./configuration.md) — wire drivers and set defaults
- [Usage](./usage/otp.md) — OTP, templates, logs, webhooks
- [Drivers](./drivers/twilio.md) — per-provider setup guides
- [Integration](./integration/ecommerce.md) — host plugin walkthroughs
