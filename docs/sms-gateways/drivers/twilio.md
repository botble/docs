---
title: Twilio Driver
description: Set up SMS delivery through Twilio.
---

# Twilio Driver

Send SMS through Twilio's REST API with worldwide coverage and reliable delivery.

## Get Twilio credentials

1. Sign up at [twilio.com](https://www.twilio.com/)
2. Go to **Console → Account**
3. Copy your:
   - **Account SID** (starts with "AC")
   - **Auth Token** (long alphanumeric string)
4. Get a **Phone Number** from **Phone Numbers → Manage Active Numbers**
   - Twilio provides a test number, or you can buy one per country

![Twilio console](./images/twilio-console.png)

## Configure in Botble

1. Go to **Admin → Settings → SMS Gateways**
2. Check **Twilio** under **Active Drivers**
3. Expand the **Twilio** section and enter:
   - **Account SID**: Your Account SID
   - **Auth Token**: Your Auth Token
   - **Sender ID**: Your Twilio phone number (e.g., `+1-555-1234`)
4. Click **Test SMS** to verify credentials
5. Click **Save**

![Twilio configuration](./images/twilio-settings-tab.png)

## Test the connection

1. In the Twilio settings tab, click **Send test SMS**
2. Enter your personal phone number (with country code, e.g., `+1-555-5678`)
3. Click **Send**
4. You should receive an SMS within 5 seconds

If the test fails:

- Verify Account SID and Auth Token are copied correctly (no extra spaces)
- Check that your Twilio account is active (not suspended)
- Ensure your phone number is registered in Twilio

## SMS costs

Twilio charges per SMS sent:

- **Domestic (USA/Canada)**: ~$0.0075 per SMS
- **International**: ~$0.01–$0.20 per SMS depending on country

Multi-part SMS (>160 characters) count as multiple SMS.

No setup fees or monthly minimums; you pay only for SMS sent.

## Troubleshooting

### "Invalid credentials" error

1. Double-check Account SID and Auth Token
2. Go to [Twilio Console](https://www.twilio.com/console) and verify your account is active
3. Regenerate Auth Token if needed: **Account → Regenerate Auth Token**

### SMS not delivered

1. Check recipient phone number format (must include country code, e.g., `+1-555-1234`)
2. Verify your Twilio account has sufficient balance (top up via Console)
3. Check **Admin → SMS Gateways → Delivery Logs** for the SMS status and error message

### "Phone number is not assigned" error

You must have an active Twilio phone number. Go to **Twilio Console → Phone Numbers → Manage Active Numbers** and assign one to your project.

## Next step

See [Configuration](../configuration.md) to activate additional drivers or [Delivery Logs](../usage/delivery-logs.md) to monitor SMS.
