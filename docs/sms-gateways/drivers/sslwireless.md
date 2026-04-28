---
title: SSL Wireless Driver
description: Send SMS through SSL Wireless (Bangladesh) using the Custom HTTP Driver preset.
---

# SSL Wireless Driver

SSL Wireless is Bangladesh's largest enterprise SMS aggregator, used by banks, government agencies, and insurance companies. SMS Gateways ships an `sslwireless` preset for the Custom HTTP Driver that pre-fills the v3 REST API configuration — no code required.

::: tip
This driver is **preset-based**. It uses the [Custom HTTP Driver](../developer/custom-driver.md) framework added in v1.0.2 rather than a native PHP class, so the entire configuration lives in the admin form and can be edited at any time.
:::

## Get SSL Wireless credentials

1. Sign up at [sslwireless.com](https://www.sslwireless.com/) and request the SMS Plus service.
2. Open the **My SSL Wireless** portal and go to **SMS API → API Token**.
3. Copy your **API Token** and **SID** (sender ID).
4. Register your sender ID with SSL Wireless (required by Bangladesh BTRC regulations); approval takes 1–3 business days.

## Add SSL Wireless from the preset

1. Go to **Admin → SMS Gateways → Custom Drivers**.
2. Click **Create**, then visit `/admin/sms-gateways/custom-drivers/create?preset=sslwireless` (or open the **Help** page and click **Use this preset → SSL Wireless**).
3. The form pre-fills with these values:
   - **Name**: SSL Wireless
   - **Slug**: `custom_sslwireless`
   - **HTTP method**: `POST_JSON`
   - **Endpoint URL**: `https://smsplus.sslwireless.com/api/v3/send-sms`
   - **Headers**: `Content-Type: application/json`, `Accept: application/json`
   - **Body template**:
     ```json
     {"api_token": "{api_key}", "sid": "{sender_id}", "sms": "{message}", "msisdn": "{phone}"}
     ```
   - **Auth type**: `none` (token is in the body)
   - **Success indicator**: HTTP `200–299` + JSON path `status` equals `SUCCESS`
   - **Provider message ID path**: `smsinfo.0.sms_id`
   - **Phone format**: `STRIPPED_PLUS` (renders `+8801XXX...` as `8801XXX...`)
4. Paste your **API Token** into the **API key** field.
5. Paste your registered sender ID into the **Sender ID** field.
6. Click **Save**.

## Test the connection

1. Go to **Admin → SMS Gateways → Test Send**.
2. Pick the new **SSL Wireless** driver from the dropdown.
3. Enter a Bangladeshi phone number in E.164 (`+8801XXXXXXXXX`).
4. Click **Send**. The response shows `status: SUCCESS` and a `sms_id` on success.

## Set as default or country-routed driver

- **Default everywhere**: **Admin → SMS Gateways → Settings → Default driver → SSL Wireless**.
- **Bangladesh only** (recommended if you also serve other countries): **Admin → SMS Gateways → Country Routes → Add → Country code +880 → Driver SSL Wireless**. Other countries fall back to the global default.

## Phone number format

SSL Wireless v3 expects 13-digit MSISDN without `+`:
- Customer phone in DB: `+8801712345678`
- Sent to API: `8801712345678`

The `STRIPPED_PLUS` phone format does this transformation automatically; no extra wiring needed.

## Response handling

A successful send returns:

```json
{
  "status": "SUCCESS",
  "status_code": 200,
  "smsinfo": [
    { "sms_status": "SUCCESS", "msisdn": "8801712345678", "sms_id": "ABC123XYZ" }
  ]
}
```

A failure returns `status: FAILED` with a numeric `status_code` (e.g. `4001`, `4022`) and an `error_message` field. Failed messages are visible at **Admin → SMS Gateways → Delivery Logs** with the full provider response body.

## SMS costs

SSL Wireless charges per SMS sent:

- **Bangladesh transactional**: ~0.30–0.45 BDT per SMS (~$0.003)
- **Bangladesh promotional**: ~0.25–0.35 BDT per SMS (~$0.002–0.003)

Volume discounts apply at 100k+ messages/month. Contact SSL Wireless sales for custom rates.

## Transactional vs promotional

SSL Wireless segregates traffic by sender ID:

- **Transactional senders** (alphanumeric, e.g. `MyShop`) — for OTP, order confirmations, shipment updates. Higher delivery priority.
- **Promotional senders** (numeric short code) — for marketing campaigns. Subject to BTRC time-of-day restrictions and Do-Not-Disturb (DND) lists.

Configure separate sender IDs in the SSL Wireless portal and create two preset-based drivers if you need both — set the transactional one as default and the promotional one as a country-route override or per-message flag.

## Bangladesh phone numbers

SSL Wireless works only with Bangladeshi phone numbers:

- Format: `+880-1X-XXXX-XXXX` (E.164)
- Carriers: Grameenphone, Banglalink, Robi, Teletalk, Airtel

International recipients are not supported via this provider — use Twilio or Vonage for cross-border SMS.

## Troubleshooting

### `status_code: 4022` — "The api token field is required"

The API token in the **API key** field is empty or invalid. Re-paste it from **My SSL Wireless → SMS API**. Tokens are masked after save (shown as `••••••••`); leave the field blank on subsequent saves to keep the existing token.

### `status_code: 4001` — "Authentication failed"

Token is wrong, expired, or your IP is not whitelisted. Check the SSL Wireless portal's **API → IP Whitelist** section; SSL Wireless requires server IP whitelisting for production accounts.

### `status: SUCCESS` but no SMS received

1. Confirm the sender ID is **Active** in the SSL Wireless portal (not pending or rejected).
2. Confirm your account has prepaid balance.
3. Check the recipient's carrier has not blocked the sender ID.
4. Check **Admin → SMS Gateways → Delivery Logs → Provider Response** — the `smsinfo[].sms_status` per recipient may differ from the top-level `status`.

### "Invalid sender ID"

The sender ID you entered does not match any **Active** record on your SSL Wireless account. Verify the exact text (case-sensitive) in the portal's **Sender ID** section. Pending or rejected sender IDs cause this error.

### Delivery delayed

- Bangladesh BTRC restricts promotional SMS to 10:00–17:00 local time.
- Carrier-side DND lists block marketing senders for opted-out subscribers.
- Use a transactional sender ID for OTPs and order updates to bypass these restrictions.

## Best for

- **Bangladesh-only ecommerce**: SSL Wireless is the standard choice for stores, banks, and enterprises that need high-trust delivery and BTRC-compliant sender registration.
- **High-volume OTP**: 1M+ messages/month with sub-second delivery via direct carrier connections.
- **Multi-country with Bangladesh**: Use SSL Wireless via country routing for `+880` numbers; fall back to Twilio or Vonage for international recipients.

## Next step

See [Custom Driver](../developer/custom-driver.md) for the underlying framework, [BulkSMSDhaka](./bulksmsdhaka.md) for an alternative BD provider, or [Country Routing](../usage/otp.md) to mix multiple drivers per country.
