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
| **TTL (time-to-live)** | 600 seconds | 60–3600 |
| **Max attempts** | 3 wrong tries | 1–10 |
| **Resend delay** | 30 seconds | 10–300 |
| **Per-phone rate limit** | 5 requests/hour | 1–100 |

## Per-integration customization

Each host integration (ecommerce, marketplace, etc.) can override these defaults. See the integration page for details:

- [Ecommerce OTP](../integration/ecommerce.md#otp)
- [Marketplace OTP](../integration/marketplace.md#otp)
- [Real Estate OTP](../integration/real-estate.md#otp)

## OTP template

The system sends OTP using a built-in template. Customize it in **Admin → SMS Gateways → Templates → OTP**:

```
Your verification code is: {code}
```

Available variables:
- `{code}` — the 6-digit code
- `{minutes}` — TTL in minutes (e.g., "10")
- `{brand}` — your site name (from settings)

Example customization:
```
{brand}: Your code is {code}. Valid for {minutes} minutes. Do not share.
```

## Rate limiting

The plugin enforces **per-phone limits** to prevent SMS flooding:

1. **Per-phone resend delay**: Customer must wait 30 seconds between "send code" clicks
2. **Per-phone hourly cap**: Max 5 OTP requests per phone number per hour
3. **Per-IP daily cap**: Max 50 OTP requests per IP per day (prevents automated attacks)

If a user hits the rate limit, they see:
```
Too many attempts. Please wait 30 seconds before trying again.
```

## Lockout and unlock

After 3 wrong attempts (configurable), the phone is locked for **30 minutes**. The user sees:
```
Too many wrong codes. Try again in 30 minutes, or request a new code.
```

Admin can manually unlock a phone in **Admin → SMS Gateways → OTP Attempts** (if licensed).

## OTP in delivery logs

All OTP attempts appear in **Admin → SMS Gateways → Delivery Logs** with event `otp.queued`, `otp.sent`, `otp.delivered`, or `otp.failed`.

Filter by "Event Type" = "OTP" to see only verification codes.

## Troubleshooting

### OTP not arriving

1. Check the phone number format (must include country code, e.g., +1-555-1234)
2. Verify the SMS driver is configured and active
3. Check **Delivery Logs** for "failed" or "rejected" status
4. Test with a personal phone number first

### Customer can't re-request code

If hitting rate limit, customer must wait the resend delay (default 30 seconds) or wait for TTL to expire to request a new code.

### OTP is arriving but integration doesn't accept it

Check that the integration's OTP template matches the configured code length. If configured for 8 digits but template generates 6, verification will fail.

## Next step

See [OTP in Ecommerce](../integration/ecommerce.md#otp) for checkout-specific OTP setup.
