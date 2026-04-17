---
title: Msg91 Driver
description: Set up SMS delivery through Msg91 (India-first, DLT Flow API).
---

# Msg91 Driver

Send SMS in India (and internationally where enabled) through Msg91's DLT-compliant **Flow API v5**. Ideal for OTPs, order alerts, and transactional messaging to Indian numbers where DLT registration is mandatory.

## Get Msg91 credentials

1. Sign up at [msg91.com](https://msg91.com/).
2. Go to **API Management → API Keys** and copy your **Auth Key**.
3. Go to **Flows** and create (or pick) a DLT-registered Flow template.
   - The template body must contain **one variable placeholder** (default: `##OTP##`). That variable will receive the full rendered SMS body from Botble.
4. Copy the **Flow ID** from the flow detail screen.
5. Configure your **DLT-registered Sender ID** under **Sender ID Management** (6 characters, all caps).


## DLT registration (required for India)

India's TRAI requires all SMS senders to register via the DLT framework:

1. Register as **Principal Entity** (your business) on the TRAI DLT portal.
2. Register a **Sender ID** (6-character brand, e.g. `MSGIND`).
3. Register each **SMS Template** you'll send — the exact wording is approved by TRAI (24–48 hours).
4. Associate approved templates with Msg91 flows.

Msg91's UI walks you through DLT onboarding if your account is new.

## Configure in Botble

1. Go to **Admin → Settings → SMS Gateways**.
2. Check **Msg91** under **Active Drivers**.
3. Expand the **Msg91** section and fill in:
   - **Auth Key**: your Msg91 auth key.
   - **Flow ID**: the Flow template ID from your dashboard.
   - **Sender ID**: your DLT-registered 6-character sender (e.g. `MSGIND`).
   - **Body Variable Name**: the variable name used in your Msg91 flow template. Default: `OTP`. Must match the placeholder in your flow exactly.
4. Click **Test SMS** to verify.
5. Click **Save**.


## How body rendering works

Botble fully renders the SMS template (variables substituted, OTP injected) **before** calling Msg91. The Msg91 flow then receives the rendered body as the value of your configured variable. Your flow template should therefore be as simple as:

```
##OTP##
```

or with a small wrapper:

```
##OTP## - from MSGIND. Do not share this code.
```

The whole rendered body lands in `##OTP##`; Msg91 does no further variable substitution.

## SMS costs

Msg91 charges per SMS sent:

- **India OTP**: ~0.15 INR per segment
- **India Transactional**: ~0.18 INR per segment
- **International**: variable; enable **International SMS** on your account first

Volume discounts apply beyond 100k SMS/month.

## Test the connection

1. In the Msg91 settings tab, click **Send test SMS**.
2. Enter an Indian phone number in E.164 format (e.g. `+91-98765-43210`).
3. Click **Send**.
4. You should receive the SMS within 10 seconds.

## Troubleshooting

### `"Invalid flow_id"` error

- Confirm the Flow ID in Botble matches the one in your Msg91 dashboard exactly (copy-paste — no trailing spaces).
- Ensure the flow is **published** in Msg91, not a draft.

### `"Variable not found"` error

- The **Body Variable Name** in Botble must match the variable placeholder in your Msg91 flow template exactly (case-sensitive).
- Default is `OTP` → matches `##OTP##` in Msg91 flows.

### SMS not delivered

- Verify the Sender ID is DLT-registered and attached to your flow.
- Check the template is TRAI-approved (not pending).
- Verify account balance on the Msg91 dashboard.
- Check **Admin → SMS Gateways → Delivery Logs** for the provider error message.

### `"Country not enabled"` error

- For non-Indian numbers, enable **International SMS** on your Msg91 account under **Account Settings → Preferences**.

## Best for

- **India-only OTP + transactional** — Msg91 has strong DLT tooling and competitive OTP pricing.
- **Multi-country with India as primary** — pair with country routing: Msg91 for `+91`, Twilio/Vonage for everything else.

## Next step

See [Fast2SMS](./fast2sms.md) for an alternative India-focused provider, [BulkSMSBD](./bulksmsbd.md) for Bangladesh, or [Configuration](../configuration.md) to activate additional drivers.
