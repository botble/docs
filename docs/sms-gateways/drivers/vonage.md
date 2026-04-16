---
title: Vonage Driver
description: Set up SMS delivery through Vonage (formerly Nexmo).
---

# Vonage Driver

Send SMS through Vonage with global reach and competitive rates for Asia and Europe.

## Get Vonage credentials

1. Sign up at [vonage.com](https://www.vonage.com/)
2. Go to **Account → API Credentials**
3. Copy your:
   - **API Key**
   - **API Secret**
4. Optionally, buy a dedicated **Virtual Number** from **Numbers → Buy Numbers**

![Vonage credentials](./images/vonage-credentials.png)

## Configure in Botble

1. Go to **Admin → Settings → SMS Gateways**
2. Check **Vonage** under **Active Drivers**
3. Expand the **Vonage** section and enter:
   - **API Key**: Your API Key
   - **API Secret**: Your API Secret
   - **Sender ID**: Your virtual number or alphanumeric sender ID (e.g., `MyBrand`)
4. Click **Test SMS** to verify credentials
5. Click **Save**

![Vonage configuration](./images/vonage-settings-tab.png)

## Test the connection

1. Click **Send test SMS** in the Vonage settings tab
2. Enter your personal phone number (with country code, e.g., `+44-7700-900000`)
3. Click **Send**
4. You should receive an SMS within 5 seconds

## SMS costs

Vonage charges per SMS sent:

- **UK/Europe**: ~$0.03–$0.05 per SMS
- **North America**: ~$0.01–$0.02 per SMS
- **International**: $0.01–$0.20+ per SMS

Prices vary by country and volume discounts apply.

## Alphanumeric sender ID

Unlike Twilio, Vonage allows **alphanumeric sender IDs** (e.g., "MyBrand" instead of a phone number):

1. In the Vonage settings tab, set **Sender ID** to your brand name (max 11 characters)
2. SMS will appear to come from "MyBrand" instead of a phone number
3. Note: Some countries don't support alphanumeric IDs; use a phone number for those

## Troubleshooting

### "Invalid API Key or Secret" error

1. Double-check API Key and API Secret from [Vonage Dashboard](https://dashboard.vonage.com/)
2. Ensure no trailing spaces
3. Regenerate credentials if needed: **Account → API Credentials → Regenerate**

### SMS not delivered

1. Verify recipient phone number includes country code (e.g., `+44-7700-900000`)
2. Check account balance (top up via Dashboard)
3. For specific countries, Vonage may require additional compliance documents
4. Check **Admin → SMS Gateways → Delivery Logs** for error details

### "Invalid sender ID" error

1. If using alphanumeric sender ID, keep it under 11 characters
2. Some countries require numeric sender ID (phone number); check Vonage docs for your country
3. Try with a phone number instead of alphanumeric ID

## Next step

See [Configuration](../configuration.md) to activate additional drivers or [Twilio](./twilio.md) for comparison.
