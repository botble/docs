---
title: Changelog
description: SMS Gateways release history and version updates.
---

# Changelog

All notable changes to SMS Gateways are documented here.

## Version 1.0.0 — 2026-04-16

Initial public release.

### Features

- **7 built-in SMS drivers**: Twilio, Vonage (formerly Nexmo), AWS SNS, Plivo, Msg91, Fast2SMS, BulkSMSBD
- **OTP verification**: Phone verification with TTL, rate limiting, and attempt tracking
- **SMS templates**: Admin-editable templates with variable injection and character preview
- **Delivery logs**: Comprehensive SMS tracking with filters, retry, and export
- **Consent management**: STOP/START handling, opt-in/opt-out audit logs, GDPR erasure
- **Outbound webhooks**: Real-time delivery notifications with HMAC-SHA256 verification
- **Host integrations**: Ecommerce, Marketplace, Real Estate, Job Board, Car Manager, Hotel
- **Scheduled commands**: Automatic cleanup, retry, and purge tasks
- **GDPR compliance**: Data export, cascade delete, per-subject erasure, retention policies
- **42 languages**: English source + 41 machine-translated locales
- **Shared hosting support**: Works on cPanel, Plesk without queue workers
- **Role-based permissions**: Admin gating for all SMS features

### Known limitations

- Fast2SMS and Msg91 require DLT template registration (India regulation)
- BulkSMSBD supports only domestic SMS (Bangladesh)
- AWS SNS does not support delivery confirmation (marked as "Sent" only)
- Queue workers only supported on VPS/dedicated servers (not shared hosting)

### Breaking changes

None (initial release).

## Support

- **Documentation**: [docs.botble.com/sms-gateways](https://docs.botble.com/sms-gateways)
- **Issues**: Open a CodeCanyon support ticket
- **Feature requests**: Submit via CodeCanyon support
