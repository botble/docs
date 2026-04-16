---
title: Sepay Driver
description: Set up SMS delivery through Sepay (Vietnam).
---

# Sepay Driver

Send SMS in Vietnam through Sepay with local rates and reliable delivery.

## Get Sepay credentials

1. Sign up at [sepay.vn](https://sepay.vn/)
2. Go to **Account → API Settings**
3. Copy your:
   - **API Token**
   - **Phone Number** (your registered sending number)
4. Ensure your account is verified and funded

![Sepay API settings](./images/sepay-settings.png)

## Configure in Botble

1. Go to **Admin → Settings → SMS Gateways**
2. Check **Sepay** under **Active Drivers**
3. Expand the **Sepay** section and enter:
   - **API Token**: Your API Token
   - **Sender ID**: Your registered phone number
4. Click **Test SMS** to verify credentials
5. Click **Save**

![Sepay configuration](./images/sepay-settings-tab.png)

## Test the connection

1. Click **Send test SMS** in the Sepay settings tab
2. Enter a Vietnamese phone number (e.g., `+84-123-456-789`)
3. Click **Send**
4. You should receive an SMS within 5 seconds

## SMS costs

Sepay charges per SMS sent:

- **Vietnam**: ~500–800 VND per SMS (~$0.02–$0.03)

Competitive local rates for Vietnam-only SMS.

## Vietnam phone numbers

Sepay works only with Vietnamese phone numbers:

- Format: `+84-XXX-XXX-XXXX`
- Carriers: Viettel, Vinaphone, MobiFone

International recipients are not supported.

## Troubleshooting

### "Invalid API Token" error

1. Double-check API Token from [Sepay Dashboard](https://sepay.vn/)
2. Ensure no trailing spaces
3. Verify your Sepay account is active and verified

### SMS not delivered to Vietnam

1. Verify phone number format (must start with `+84`)
2. Check recipient is on a Vietnamese carrier (Viettel, Vinaphone, MobiFone)
3. Check account balance (top up via Dashboard)
4. Check **Admin → SMS Gateways → Delivery Logs** for error details

## Best for

- **Vietnam-only SMS**: Use Sepay for competitive local rates
- **Multi-country with Vietnam**: Use Twilio or Vonage as primary, Sepay as fallback for Vietnam

## Next step

See [Fast2SMS](./fast2sms.md) for India-specific SMS or [Configuration](../configuration.md) to activate additional drivers.
