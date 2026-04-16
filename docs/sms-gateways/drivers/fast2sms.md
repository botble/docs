---
title: Fast2SMS Driver
description: Set up SMS delivery through Fast2SMS (India).
---

# Fast2SMS Driver

Send SMS in India through Fast2SMS with DLT registration and competitive rates.

## Get Fast2SMS credentials

1. Sign up at [fast2sms.com](https://www.fast2sms.com/)
2. Go to **Settings → API Credentials**
3. Copy your:
   - **Authorization Token**
4. Register your **Sender ID** and **Templates** with DLT (India's Distributed Ledger Technology system)

![Fast2SMS API credentials](./images/fast2sms-credentials.png)

## DLT registration (required for India)

India requires all SMS senders to register:

1. Go to **TRAI DLT Portal** ([https://www.indiastack.org/](https://www.indiastack.org/))
2. Register as **Principal Entity** (your business)
3. Register **Sender ID** (your brand name, 6 characters)
4. Register **SMS Templates** (the exact message text you'll send)
   - Each template must be approved (24–48 hours)
5. Get your **Entity ID** and **Template ID**

Fast2SMS provides templates, but you must register them with TRAI first.

## Configure in Botble

1. Go to **Admin → Settings → SMS Gateways**
2. Check **Fast2SMS** under **Active Drivers**
3. Expand the **Fast2SMS** section and enter:
   - **Authorization Token**: Your API token
   - **Sender ID**: Your registered DLT sender ID (6 characters)
   - **Route**: Select route type:
     - `OTP` for OTP/verification codes
     - `Transactional` for order/delivery notifications
     - `Promotional` for marketing SMS
4. Click **Test SMS** to verify credentials
5. Click **Save**

![Fast2SMS configuration](./images/fast2sms-settings-tab.png)

## SMS costs

Fast2SMS charges per SMS sent:

- **India OTP**: ~0.50–1 INR (~$0.006–$0.012 per SMS)
- **India Transactional**: ~0.70–1.50 INR per SMS
- **India Promotional**: ~0.30–0.50 INR per SMS

Cheapest rates for India if templates are pre-registered.

## Route selection

- **OTP**: For phone verification, password resets (priority delivery)
- **Transactional**: For order confirmations, shipping updates (slightly slower)
- **Promotional**: For marketing campaigns (slowest, often filtered)

Choose the correct route or SMS may be delayed/filtered.

## Template registration

Before sending SMS, register the exact message template with DLT:

1. Go to **TRAI DLT Portal**
2. Register template (e.g., "Your order {order_id} has been shipped")
3. Get the **Template ID**
4. In Fast2SMS settings, map your SMS template name to the TRAI Template ID
5. Wait for TRAI approval (24–48 hours)

Without DLT registration, SMS will be rejected.

## Testing

1. Click **Send test SMS** in the Fast2SMS settings tab
2. Enter an Indian phone number (e.g., `+91-9876-543210`)
3. Click **Send**
4. You should receive an SMS within 10 seconds (if templates are registered)

## Troubleshooting

### "Invalid Authorization Token" error

1. Double-check your Authorization Token from [Fast2SMS Dashboard](https://www.fast2sms.com/)
2. Ensure no trailing spaces
3. Regenerate if needed

### SMS not delivered

1. Verify phone number is Indian (starts with `+91`)
2. Check if your SMS template is DLT-registered and approved
3. Ensure you selected the correct route (OTP vs Transactional vs Promotional)
4. Check account balance
5. Check **Admin → SMS Gateways → Delivery Logs** for error details

### "Template not registered" error

1. Register your SMS template with TRAI DLT Portal
2. Wait for approval (24–48 hours)
3. Map the template in Fast2SMS settings once approved

## Best for

- **India-only SMS**: Use Fast2SMS for lowest rates with DLT compliance
- **Multi-country with India**: Use Twilio or Vonage as primary, Fast2SMS as fallback for India

## Next step

See [BulkSMSBD](./bulksmsbd.md) for Bangladesh-specific SMS or [Configuration](../configuration.md) to activate additional drivers.
