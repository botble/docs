---
title: eSMS.vn Driver
description: Set up SMS delivery through eSMS.vn (Vietnam).
---

# eSMS.vn Driver

Send Brandname, transactional, OTP, and advertising SMS in Vietnam via [eSMS.vn](https://esms.vn/).

## Get eSMS.vn credentials

1. Sign up at [esms.vn](https://esms.vn/) and top up credit.
2. Open the dashboard and go to **Quản lý API**.
3. Copy your **ApiKey** and **SecretKey**.

## Register a Brandname

Vietnamese carriers require a pre-approved sender name (Brandname) on every CSKH
and transactional SMS. Without one, eSMS returns error code `104`.

1. Submit a Brandname registration via the eSMS portal.
2. Choose the **type** carefully:
   - **CSKH / Brandname** — for transactional SMS, OTP, order updates, password reset (this is what most sites need).
   - **Advertising** — for bulk marketing.
3. Wait for carrier approval (usually 3–5 business days).
4. Register your SMS content templates in the portal too — unregistered content
   fails with error `146`.

## Configure in Botble

1. Go to **Admin → Settings → SMS Gateways**.
2. Check **eSMS.vn** under **Active Drivers**.
3. Expand the **eSMS.vn** section and enter:
   - **API Key** — from your eSMS.vn dashboard.
   - **Secret Key** — from your eSMS.vn dashboard.
   - **Brandname** — exact approved sender string (e.g. `MYSHOP`).
   - **Default SMS Type** — select **CSKH / Brandname (2)** for transactional + OTP, or **Advertising (1)** for marketing.
   - **Sandbox Mode** — enable during integration testing; eSMS returns a simulated response without billing.
4. Click **Save**.
5. The **Delivery Callback URL** field auto-populates after the first enabled save — copy it.

## Configure delivery callback (optional but recommended)

eSMS pushes delivery status as an HTTP GET to the Callback URL. This updates
`Delivery Logs` from `queued` → `delivered` / `rejected` automatically.

1. Copy the value from **Delivery Callback URL** on the driver settings page.
2. In your eSMS.vn portal, paste the URL into the **CallbackUrl** setting for
   your account (or pass it per-request; Botble sends it on every message).
3. Optional hardening: in the eSMS portal, add your server's public IP to the
   API whitelist so only your own server can call the eSMS API.

:::warning Callback security
eSMS callbacks are **unsigned** HTTP GET requests. The random token embedded in
the URL path is the only authentication. Keep the Callback URL secret and
regenerate the token (by clearing the setting and re-saving) if it leaks.
:::

## Test

1. Click **Send test SMS** in the eSMS.vn settings tab.
2. Enter a Vietnamese phone number — either format works:
   - `+84901234567`
   - `84901234567`
   - `0901234567`
3. Click **Send**. You should receive an SMS within 10 seconds (or a simulated
   response when Sandbox is on).

## SMS costs

eSMS.vn charges per SMS sent (rates vary by carrier and SMS type):

- **CSKH / Brandname (VN)** — from ~300 VND per SMS.
- **Advertising (VN)** — from ~200 VND per SMS.
- **Non-Unicode (ASCII)** — 160 characters per segment.
- **Unicode (Vietnamese with diacritics)** — 70 characters per segment. The
  driver auto-detects diacritics and sends `IsUnicode=1` when needed.

Contact eSMS.vn sales for bulk pricing.

## Error codes

The driver maps the most common eSMS error codes to human-readable messages:

| Code | Meaning                                                    |
|------|------------------------------------------------------------|
| 99   | Phone number is blocked in eSMS                            |
| 101  | Invalid ApiKey or SecretKey                                |
| 103  | Insufficient account balance                               |
| 104  | Brandname not registered or inactive                       |
| 108  | Phone number format invalid                                |
| 118  | Unsupported SmsType                                        |
| 124  | Duplicate RequestId (24-hour dedup window)                 |
| 140  | Caller IP is not whitelisted in the eSMS portal            |
| 146  | Unregistered customer-care template for this content       |

See the official [error code table](https://developers.esms.vn/en/esms-api/table-of-error-codes.md) for the full list.

## Troubleshooting

### "eSMS error 101 — Invalid ApiKey or SecretKey"

1. Re-copy both keys from **Quản lý API** in the eSMS dashboard.
2. Ensure no trailing spaces.
3. Regenerate the Secret Key if you suspect it leaked.

### "eSMS error 104 — Brandname not registered or inactive"

1. Check the spelling of the Brandname field — it must match exactly.
2. Confirm with eSMS support that the brandname is **active** (approval may
   have expired or been revoked).
3. Verify the brandname **type** matches your SMS Type — an advertising
   brandname cannot send CSKH/transactional SMS and vice versa.

### "eSMS error 140 — IP not whitelisted"

1. Find your server's public IP (`curl ifconfig.me`).
2. Add it to the IP whitelist in the eSMS portal.

### "eSMS error 146 — Unregistered template"

1. Register the exact message content (with placeholders) as a template in
   the eSMS portal.
2. Wait for carrier approval (1–3 business days).
3. Ensure the rendered SMS body matches the approved template exactly —
   placeholder names, spacing, and punctuation all matter.

### SMS delivered but status stays "queued"

1. Verify the **Delivery Callback URL** was pasted into the eSMS portal.
2. Check the server is reachable over HTTPS from the public internet.
3. eSMS retries the callback up to 5 times on timeout, then gives up —
   the "queued" state is not a send failure, just a missing delivery report.

## Best for

- **Vietnam-only SMS** with brandname, OTP, or advertising.
- **Multi-region setups**: pair eSMS.vn with Twilio / Vonage using the
  [Country Routes](../configuration.md#country-routes) feature to route
  Vietnamese numbers through eSMS and others through global providers.

## Next step

See [Configuration](../configuration.md) to activate additional drivers, or
[Country Routes](../configuration.md#country-routes) to route Vietnamese
numbers through eSMS.vn automatically.
