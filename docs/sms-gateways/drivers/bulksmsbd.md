---
title: BulkSMSBD Driver
description: Set up SMS delivery through BulkSMSBD (Bangladesh).
---

# BulkSMSBD Driver

Send SMS in Bangladesh through BulkSMSBD with local rates and sender ID registration.

## Get BulkSMSBD credentials

1. Sign up at [bulksmsbd.com](https://www.bulksmsbd.com/)
2. Go to **Account → API Settings**
3. Copy your:
   - **API Token**
4. Register your **Sender ID** in the BulkSMSBD portal (required by Bangladesh regulations)


## Sender ID registration

Bangladesh requires sender ID registration:

1. Go to **BulkSMSBD → Sender ID Management**
2. Register your sender ID (your business name, max 11 characters)
   - Examples: `MyShop`, `FastDelivery`
3. SMS will appear to come from your sender ID instead of a phone number
4. Approval takes 24–48 hours

Without a registered sender ID, SMS may be delayed or rejected.

## Configure in Botble

1. Go to **Admin → Settings → SMS Gateways**
2. Check **BulkSMSBD** under **Active Drivers**
3. Expand the **BulkSMSBD** section and enter:
   - **API Token**: Your API Token
   - **Sender ID**: Your registered sender ID (e.g., `MyShop`)
4. Click **Test SMS** to verify credentials
5. Click **Save**


## Test the connection

1. Click **Send test SMS** in the BulkSMSBD settings tab
2. Enter a Bangladeshi phone number (e.g., `+880-1700-000000`)
3. Click **Send**
4. You should receive an SMS within 10 seconds

## SMS costs

BulkSMSBD charges per SMS sent:

- **Bangladesh**: ~1–2 BDT (~$0.01–$0.02 per SMS)

Cheapest rates for Bangladesh SMS.

## Transactional vs Promotional

BulkSMSBD categorizes SMS:

- **Transactional**: Order confirmations, OTP, shipping updates (priority delivery)
- **Promotional**: Marketing campaigns, discounts (may be filtered)

Choose the correct category or SMS may be delayed.

## Bangladesh phone numbers

BulkSMSBD works only with Bangladeshi phone numbers:

- Format: `+880-XXXX-XXXXXX`
- Carriers: Grameenphone, Banglalink, Robi, Teletalk

International recipients are not supported.

## Troubleshooting

BulkSMSBD surfaces errors through `response_code` values in the provider response. Open **Admin → SMS Gateways → Delivery Logs → (row) → Provider Response** to see the exact code.

### `response_code: 1032` — "Your ip X not Whitelisted"

BulkSMSBD rejected the request because your server's public IP is not on its API whitelist.

1. Copy the IP shown in the error (the server making the outbound call).
2. Log in to [bulksmsbd.com](https://www.bulksmsbd.com/) → **Phonebook → IP White List**.
3. Set **Source IP Checking** to **Enable**, choose **Type: API**, paste the IP, and click **Submit**.
4. Confirm the row shows **Active**, then re-run **Send test SMS**.

If your server has multiple outbound IPs (load balancer, NAT pool), whitelist each one — the next request may exit through a different IP.

### `response_code: 1005` — "Attempt to read property is_masking on null"

This is an internal BulkSMSBD error. Their server tried to load the Sender ID record you submitted and got no match — the Sender ID does not exist / is not approved on your account.

1. On bulksmsbd.com open **Sender ID** in the left menu.
2. Confirm your Sender ID is listed with status **Approved / Active** (pending or rejected entries trigger this error).
3. Copy it exactly as shown — no extra spaces, correct case:
   - Non-masking: 11-digit number like `01XXXXXXXXX`
   - Masking: the approved text mask (e.g. `MyShop`)
4. Paste it into **Admin → SMS Gateways → Settings → BulkSMSBD → Sender ID** and save.
5. Re-run **Send test SMS**.

If 1005 still comes back with the exact Sender ID shown on bulksmsbd.com, their database record is missing — contact BulkSMSBD support and quote the error; only they can fix it.

### "Invalid API Token" error

1. Double-check API Token from [BulkSMSBD Dashboard](https://www.bulksmsbd.com/) → **API Settings**
2. Ensure no trailing spaces
3. Verify your account is active and funded

The API Token field always renders empty after save — the stored value is encrypted and never echoed back. If a token is stored, the field shows `••••••••` as a placeholder. Leave it blank on subsequent saves to keep the existing token; enter a new value only to replace it.

### SMS not delivered to Bangladesh

1. Verify phone number format (starts with `+880`)
2. Check recipient is on a supported Bangladeshi carrier
3. Ensure your sender ID is registered and approved
4. Check account balance
5. Check **Admin → SMS Gateways → Delivery Logs** for error details

### "Sender ID not verified" error

1. Register your sender ID in **BulkSMSBD → Sender ID Management**
2. Wait for approval (24–48 hours)
3. Verify the sender ID matches exactly in your Botble settings

## Best for

- **Bangladesh-only SMS**: Use BulkSMSBD for lowest rates with local compliance
- **Multi-country with Bangladesh**: Use Twilio or Vonage as primary, BulkSMSBD as fallback for Bangladesh

## Next step

See [Configuration](../configuration.md) to activate additional drivers or [Shared Hosting](../shared-hosting/overview.md) for deployment guides.
