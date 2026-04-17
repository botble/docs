---
title: Consent & STOP/START
description: Handle SMS opt-in and opt-out (STOP/START) requests.
---

# Consent & STOP/START

Manage customer SMS opt-in/opt-out and handle inbound STOP/START requests per carrier regulations.

## Overview

**Consent** means the customer has agreed to receive SMS. **STOP/START** is an inbound SMS command:
- **STOP** — customer opts out (no more SMS)
- **START** — customer re-opts in (resume SMS)

The plugin tracks consent per phone number and blocks sending to opted-out numbers.

## Inbound webhook setup

To receive STOP/START commands, configure an inbound webhook endpoint in **Admin → SMS Gateways → Settings → Inbound Webhook URL**:

```
https://yoursite.com/api/sms/inbound
```

When a customer replies with STOP, their SMS provider (Twilio, Vonage, etc.) posts a webhook to your endpoint:

```json
{
  "event": "sms.inbound",
  "from": "+1-555-1234",
  "text": "STOP",
  "driver": "twilio",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

The plugin automatically parses STOP/START and updates the customer's consent status.

## Manual consent management

Admin can view and modify consent in **Admin → SMS Gateways → Consents**:

| Action | Effect |
|--------|--------|
| **Opt-in** | Resume SMS to this phone |
| **Opt-out** | Block SMS to this phone |
| **Delete** | Remove consent record (resets to "unknown") |

![Consent audit log](./images/sms-consents-tab.png)

The log shows:
- Phone number
- Consent status (opted in / opted out)
- Changed by (inbound, admin action, integration)
- Timestamp

## Integration-level opt-in

When customers sign up, ecommerce/marketplace/real-estate integrations can:

1. **Auto-opt-in** — assume consent and add them to SMS list
2. **Explicit opt-in** — show checkbox ("Send me order updates via SMS")
3. **Explicit opt-out** — show checkbox ("Do NOT send SMS")

See the [integration pages](../integration/ecommerce.md#consent) for per-host opt-in flow.

## STOP/START keywords

The plugin recognizes these inbound SMS keywords (case-insensitive):

| Keyword | Effect |
|---------|--------|
| STOP | Opt out of all SMS |
| UNSUBSCRIBE | Opt out |
| OPT OUT | Opt out |
| START | Re-opt in |
| RESUME | Re-opt in |
| OPT IN | Re-opt in |
| YES | Re-opt in (context-dependent) |

Any other text (including replies like "OK" or "Thanks") is logged as an inbound message but does not change consent.

## Consent audit trail

Each opt-in, opt-out, and STOP/START is logged with:

- Timestamp
- Phone number
- Action (inbound STOP, admin opt-in, integration opt-in)
- Who triggered it
- Any associated message or note

Export the audit log in **Admin → SMS Gateways → Consents → Export** for compliance records.

## GDPR compliance

Under GDPR, customers have the right to erasure. See [GDPR & Data Export](./gdpr.md) for:

- Per-phone data export
- Per-phone data erasure (cascade delete across logs, consents, OTP attempts)
- Automated retention policies

## Testing inbound webhooks

1. Go to **Admin → SMS Gateways → Settings → Test Inbound Webhook**
2. Enter a phone number and text (e.g., "STOP")
3. Click **Send test**

The system simulates an inbound STOP and logs it. Check **Admin → SMS Gateways → Consents** to verify the phone is now opted out.

## Troubleshooting

### STOP not being recognized

1. Check that your SMS driver supports inbound webhooks (Twilio, Vonage/Nexmo, Plivo do; Msg91, Fast2SMS, BulkSMSBD do not)
2. Verify the inbound webhook URL is set in **Admin → SMS Gateways → Settings**
3. Test with a known phone number using the "Test Inbound" button
4. Check **Delivery Logs** for any inbound webhook errors

### Customer can't re-opt-in

After STOP, customer must:

1. Reply with "START" via SMS, or
2. Use your site's SMS preferences page (if available) to re-opt-in, or
3. Ask admin to manually opt them back in

Most regulations require explicit START to reverse a STOP (not automatic).

### Consent check is blocking legitimate SMS

If a customer is opted out but should receive SMS (e.g., they never opted out, or you have a different contact), admin can:

1. Go to **Admin → SMS Gateways → Consents**
2. Find the phone number
3. Click **Opt-in** to resume SMS

This will not be sent automatically until the next event triggers it.

## Next step

See [Delivery Logs](./delivery-logs.md) to monitor sent SMS and track delivery status.
