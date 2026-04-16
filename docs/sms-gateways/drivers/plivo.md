---
title: Plivo Driver
description: Set up SMS delivery through Plivo.
---

# Plivo Driver

Send SMS through Plivo with strong coverage in Asia and competitive international rates.

## Get Plivo credentials

1. Sign up at [plivo.com](https://www.plivo.com/)
2. Go to **Account → Auth Credentials**
3. Copy your:
   - **Auth ID**
   - **Auth Token**
4. Optionally, buy a **Phone Number** from **Numbers → Buy Numbers** for a specific country

![Plivo credentials](./images/plivo-credentials.png)

## Configure in Botble

1. Go to **Admin → Settings → SMS Gateways**
2. Check **Plivo** under **Active Drivers**
3. Expand the **Plivo** section and enter:
   - **Auth ID**: Your Auth ID
   - **Auth Token**: Your Auth Token
   - **Sender ID**: Your Plivo phone number or alphanumeric ID
4. Click **Test SMS** to verify credentials
5. Click **Save**

![Plivo configuration](./images/plivo-settings-tab.png)

## Test the connection

1. Click **Send test SMS** in the Plivo settings tab
2. Enter your personal phone number (with country code, e.g., `+1-555-5678`)
3. Click **Send**
4. You should receive an SMS within 5 seconds

## SMS costs

Plivo charges per SMS sent:

- **Asia**: ~$0.01–$0.02 per SMS (lower than global providers)
- **USA/Europe**: ~$0.005–$0.01 per SMS
- **International**: $0.01–$0.15+ per SMS

Volume discounts available for high-volume users.

## Alphanumeric sender ID

Plivo supports alphanumeric sender IDs in some countries:

1. Set **Sender ID** to your brand name (max 11 characters)
2. Available in USA, UK, EU, and some other countries
3. Not available in all countries; check Plivo docs

## Troubleshooting

### "Invalid Auth ID or Token" error

1. Double-check Auth ID and Auth Token from [Plivo Dashboard](https://manage.plivo.com/)
2. Ensure no trailing spaces
3. Regenerate credentials if needed

### SMS not delivered

1. Verify phone number includes country code (e.g., `+1-555-5678`)
2. Check account balance (top up via Dashboard)
3. For specific countries, verify the number is in a supported destination
4. Check **Admin → SMS Gateways → Delivery Logs** for error details

## Next step

See [Sepay](./sepay.md) for Vietnam-specific SMS or [Configuration](../configuration.md) to activate additional drivers.
