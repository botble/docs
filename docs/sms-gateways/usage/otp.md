---
title: OTP Verification
description: Phone number verification with one-time passwords.
---

# OTP Verification

Use OTP to verify customer phone numbers in ecommerce, marketplace, real estate, job board, car rental, and hotel bookings.

## Overview

An OTP (one-time password) is a 6-digit code sent via SMS. The customer enters the code on your site to prove they own the phone number.

**Flow:**
1. Customer enters their phone number in a form (checkout, profile, registration)
2. System generates a 6-digit code and sends it via SMS
3. Customer receives SMS and enters the code
4. System validates the code and marks phone as verified

## Default settings

Configure OTP defaults in **Admin → Settings → SMS Gateways**:

| Setting | Default | Range |
|---------|---------|-------|
| **Code length** | 6 digits | 4–8 |
| **TTL (time-to-live)** | 300 seconds (5 min) | 60–3600 |
| **Max verify attempts** | 5 wrong tries | 1–10 |
| **Per-phone requests/hour** | 10 | 1–100 |
| **Global rate limit** | 60/min | 1–1000 |

## Per-integration customization

Each host integration (ecommerce, marketplace, etc.) can override these defaults. See the integration page for details:

- [Ecommerce OTP](../integration/ecommerce.md#otp)
- [Marketplace OTP](../integration/marketplace.md#otp)
- [Real Estate OTP](../integration/real-estate.md#otp)

## OTP template

The system sends OTP using built-in templates (one per OTP event). Customize them in **Admin → SMS Gateways → Templates** — filter by `otp_login`, `otp_checkout`, `otp_phone_verify`, `otp_password_reset`, `otp_order_tracking`, `otp_job_apply`, `otp_car_booking`, `otp_hotel_booking`, or `otp_consult_request`:

```
Your {shop_name} login code is: {otp_code}. Valid for {otp_ttl_minutes} minutes. Do not share this code.
```

Common variables:
- `{otp_code}` — the generated code
- `{otp_ttl_minutes}` — TTL in minutes (e.g., `5`)
- `{shop_name}` — your site name (from settings)
- `{customer_name}` — recipient's name when available

Template rendering also supports `{if_present variable}...{endif}` conditional blocks for optional fields.

## Rate limiting

The plugin enforces **per-phone limits** through `RateLimiter`:

1. **Per-phone hourly cap**: Max 10 OTP requests per phone number per hour (`smsg_otp_max_phone_attempts_per_hour`)
2. **Per-recipient dispatch cap**: 5 SMS per phone per hour across all events (`smsg_per_recipient_per_hour`)
3. **Global dispatch cap**: 60 SMS per minute plugin-wide (`smsg_global_per_minute`)

Exceeding any limit short-circuits the send and writes a `rejected` row to the delivery log.

## Lockout

After 5 wrong verify attempts on the same code (configurable via `smsg_otp_default_max_attempts`), the code is exhausted. The user must request a new one — the previous code cannot be retried. Codes also expire after the TTL (default 5 minutes).

## OTP storage

OTP codes are stored as **SHA-256 hashes** — the plaintext code never persists. The hash is only compared during verification. A successful verification dispatches the `OtpVerified` event, which fires the `otp.verified` outbound webhook.

## OTP in delivery logs

OTP sends appear in **Admin → SMS Gateways → Delivery Logs** with event keys prefixed `otp_` (e.g. `otp_login`, `otp_checkout`, `otp_phone_verify`). Filter by event in the table filters to isolate OTP traffic.

## Troubleshooting

### OTP not arriving

1. Check the phone number format (must include country code, e.g., +1-555-1234)
2. Verify the SMS driver is configured and active
3. Check **Delivery Logs** for "failed" or "rejected" status
4. Test with a personal phone number first

### Customer can't re-request code

If hitting the hourly cap (10 requests/hour by default), customer must wait until the window rolls forward. Adjust `smsg_otp_max_phone_attempts_per_hour` in settings for stricter or looser limits.

### OTP is arriving but integration doesn't accept it

Check that the integration's OTP template matches the configured code length. If configured for 8 digits but template generates 6, verification will fail.

## Next step

See [OTP in Ecommerce](../integration/ecommerce.md#otp) for checkout-specific OTP setup.
