---
title: BulkSMSDhaka Driver
description: Send SMS through bulksmsdhaka.net (Bangladesh) using the Custom HTTP Driver preset.
---

# BulkSMSDhaka Driver

BulkSMSDhaka is a Bangladeshi SMS provider on the `bulksmsdhaka.net` domain — a different vendor from BulkSMSBD (`bulksmsbd.net`) and BulkSMS Bangladesh (`bulksmsbd.com`). SMS Gateways ships a `bulksmsdhaka` preset that pre-fills the GET-based send-text API.

::: warning Vendor disambiguation
Three Bangladeshi providers have similar names:

- **BulkSMSDhaka** (`bulksmsdhaka.net`) — this driver
- **BulkSMSBD** (`bulksmsbd.net`) — covered by the [BulkSMSBD driver](./bulksmsbd.md), a native PHP driver
- **BulkSMS Bangladesh** (`bulksmsbd.com`) — not currently shipped; admins can create a Custom HTTP Driver manually

Pick the one matching the URL where you registered the account; routing traffic to the wrong vendor will return authentication errors.
:::

::: tip
This driver is **preset-based**. It uses the [Custom HTTP Driver](../developer/custom-driver.md) framework added in v1.0.2 rather than a native PHP class, so the entire configuration lives in the admin form and can be edited at any time.
:::

## Get BulkSMSDhaka credentials

1. Sign up at [bulksmsdhaka.net](https://bulksmsdhaka.net/).
2. Open the **Account → API Settings** panel and generate an **API Key**.
3. Note your **Caller ID** — either a numeric `1234`-style ID for non-masking SMS, or your registered brand name for masking SMS.
4. If your account requires IP whitelisting, add your server's outbound IP under **Account → API Settings → IP Whitelist**.

## Add BulkSMSDhaka from the preset

1. Go to **Admin → SMS Gateways → Custom Drivers**.
2. Click **Create**, then visit `/admin/sms-gateways/custom-drivers/create?preset=bulksmsdhaka` (or open the **Help** page and click **Use this preset → BulkSMSDhaka**).
3. The form pre-fills with these values:
   - **Name**: BulkSMSDhaka
   - **Slug**: `custom_bulksmsdhaka`
   - **HTTP method**: `GET`
   - **Endpoint URL**: `https://bulksmsdhaka.net/api/sendtext`
   - **Body template** (used as query string):
     ```
     apikey={api_key}&callerID={sender_id}&number={phone}&message={message}
     ```
   - **Auth type**: `none`
   - **Success indicator**: HTTP `200–299` + JSON path `Status` equals `1000`
   - **Phone format**: `STRIPPED_PLUS` (renders `+8801XXX...` as `8801XXX...`)
4. Paste your **API key** into the **API key** field.
5. Paste your **Caller ID** into the **Sender ID** field.
6. Click **Save**.

## Test the connection

1. Go to **Admin → SMS Gateways → Test Send**.
2. Pick the new **BulkSMSDhaka** driver.
3. Enter a Bangladeshi phone number in E.164 (`+8801XXXXXXXXX`).
4. Click **Send**. The response shows `Status: 1000`, `Success: true` on success.

## Set as default or country-routed driver

- **Default everywhere**: **Admin → SMS Gateways → Settings → Default driver → BulkSMSDhaka**.
- **Bangladesh only**: **Admin → SMS Gateways → Country Routes → Add → Country code +880 → Driver BulkSMSDhaka**.

## Phone number format

The vendor documentation samples `017XXXXXXXX` (local format with leading `0`). The default preset uses `STRIPPED_PLUS`, which renders `8801XXXXXXXXX` (without the `+` and the trunk prefix `0`). Most BulkSMSDhaka accounts accept both formats:

- E.164 in DB: `+8801712345678`
- Sent to API with `STRIPPED_PLUS`: `8801712345678`

If your specific account requires the **strict local format** (`01712345678` with leading `0`), edit the driver after saving and change the `body_template` to apply a regex transform — for example use `{phone}` then strip the leading `880` via a custom helper, or pre-store local-format numbers. Open a support ticket if you need guidance.

## Response handling

A successful send returns:

```json
{
  "Status": "1000",
  "Success": "true",
  "Message": "Your sms request successful!!"
}
```

Common error codes:

| Code   | Meaning |
|--------|---------|
| `1005` | SPAM detected — review message text and resubmit. |
| `1006` | SMS content validation failed (length, character set, blocked words). |
| `1008` | IP not whitelisted — add your server IP at the BulkSMSDhaka portal. |
| `1015` | Authorization failed — check API key and Caller ID. |
| `2001` | Insufficient balance — top up your BulkSMSDhaka account. |

Failed messages appear at **Admin → SMS Gateways → Delivery Logs** with the full JSON response body.

## SMS costs

BulkSMSDhaka publishes:

- **Per-SMS rate**: ~0.34 BDT (~$0.003)
- **Minimum top-up**: 500 BDT
- **Validity**: 3 months from purchase

Pricing is competitive with other BD niche providers; SSL Wireless and BulkSMSBD typically offer better volume discounts above 100k messages/month.

## Transactional vs promotional

BulkSMSDhaka does not require separate sender IDs for transactional vs promotional traffic, but BTRC time-of-day rules still apply to marketing sends:

- **Transactional** (OTP, order, shipping): no time restriction.
- **Promotional** (offers, marketing): allowed only 10:00–17:00 Bangladesh local time.

Use the OTP / templates pipeline to avoid accidentally sending marketing-flagged content during restricted hours.

## Bangladesh phone numbers

BulkSMSDhaka works only with Bangladeshi phone numbers:

- Format: `+880-1X-XXXX-XXXX` (E.164) or `01X-XXXX-XXXX` (local)
- Carriers: Grameenphone, Banglalink, Robi, Teletalk, Airtel

International recipients are not supported.

## Troubleshooting

### `Status: 1015` — "Authorization failed"

The API key, Caller ID, or both are wrong.

1. Open the BulkSMSDhaka portal → **Account → API Settings** and re-copy the API key.
2. Confirm the Caller ID exists under **Account → Caller IDs** and is **Active** (not Pending or Rejected).
3. Re-paste both into Botble and click **Save**.
4. Re-run **Test Send**.

### `Status: 1008` — "IP not whitelisted"

Your server's outbound public IP isn't on the BulkSMSDhaka allowlist.

1. Find your server's outbound IP — run `curl ifconfig.me` from the server, or copy the IP from the error message if shown.
2. Open BulkSMSDhaka portal → **Account → API Settings → IP Whitelist** → **Add IP**.
3. Wait 1–5 minutes for the firewall rule to apply, then re-run **Test Send**.

### `Status: 1006` — "SMS content validation failed"

The message contains characters or content the vendor blocks.

- Avoid repeated capital letters, excessive `!`, URL shorteners.
- Keep OTP messages under 160 characters when using GSM-7; under 70 chars for Unicode/Bengali.
- The `/api/otpsend` endpoint enforces a 70-character limit specifically for OTPs — if you primarily send OTPs, edit the preset's endpoint to `https://bulksmsdhaka.net/api/otpsend`.

### `Status: 1005` — "SPAM detected"

Vendor's spam filter rejected the content. Rephrase to remove suspicious patterns (consecutive special characters, unverified shortener URLs, banned keywords). The exact pattern that triggered the filter is not surfaced in the response — adjust progressively.

### `Status: 2001` — "Insufficient balance"

Top up at the BulkSMSDhaka portal → **Wallet → Top Up**. Bank transfer or bKash typically settles within an hour.

### Message arrives garbled or with wrong sender ID

- Bengali messages: BulkSMSDhaka uses Unicode SMS; ensure your template is saved with UTF-8 encoding.
- Wrong sender ID: confirm the Caller ID field in Botble matches the active record on bulksmsdhaka.net exactly (case-sensitive for masking IDs).

## Best for

- **Bangladesh ecommerce on a budget**: lower entry barrier than SSL Wireless (no enterprise contract).
- **Backup driver**: pair as a country-route fallback after BulkSMSBD or SSL Wireless to gain redundancy.

## Next step

See [SSL Wireless](./sslwireless.md) for the higher-tier BD option, [BulkSMSBD](./bulksmsbd.md) for a native PHP driver alternative, or [Custom Driver](../developer/custom-driver.md) for the underlying framework.
