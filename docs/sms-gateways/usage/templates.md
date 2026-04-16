---
title: SMS Templates
description: Create and manage SMS message templates with variable injection.
---

# SMS Templates

Admin-editable templates let you customize SMS messages sent from integrations without editing code.

## Create a template

1. Go to **Admin → SMS Gateways → Templates**
2. Click **Add new**
3. Fill in:
   - **Name**: Machine-readable slug (e.g., `order_status`)
   - **Title**: Human-readable label (e.g., "Order Status Notification")
   - **Subject**: The triggering event (e.g., `ecommerce.order_status`)
   - **Body**: The SMS text with variables

4. Click **Save**

![Template editor](./images/sms-templates-form.png)

## Variables

Each template can inject dynamic data using `{variable_name}` syntax. Available variables depend on the template subject:

### Order Status (ecommerce)
- `{order_id}` — the order number
- `{customer_name}` — customer full name
- `{status}` — new status (e.g., "Processing", "Shipped")
- `{brand}` — your site name

Example:
```
Hi {customer_name}, your order #{order_id} is now {status}. Track it at {brand}.
```

### Vendor Alert (marketplace)
- `{vendor_name}` — store name
- `{order_id}` — order number
- `{amount}` — order total
- `{items}` — item count

### Booking Confirmation (car/hotel)
- `{guest_name}` — reservation name
- `{check_in}` — arrival date (YYYY-MM-DD)
- `{check_out}` — departure date
- `{booking_id}` — confirmation number

See the [integration pages](../integration/ecommerce.md) for the full variable list per subject.

## Preview and character count

The editor shows:

- **Character count**: How many SMS parts needed (1 SMS = 160 chars GSM-7, 70 chars UCS-2)
- **SMS parts**: If your message is 161–320 chars, it counts as 2 SMS (billed as 2)
- **Character encoding**: Auto-detects GSM-7 (basic Latin) or UCS-2 (emoji, accents)

Example:
```
Hi {customer_name}, your order #{order_id} is {status}.
```
Character count: 61 (1 SMS part, GSM-7)

If you add emoji:
```
Hi {customer_name}! 🎉 Your order #{order_id} is {status}.
```
Character count: 67 (1 SMS part, UCS-2) — but each UCS-2 SMS costs more than GSM-7 on some providers.

## GSM-7 vs UCS-2

**GSM-7**: Standard characters (A–Z, 0–9, punctuation, accents). 160 chars per SMS.
**UCS-2**: Full Unicode (emoji, Chinese, Arabic, etc.). 70 chars per SMS.

Keep messages under 160 chars if possible to stay in GSM-7 (cheaper on most providers).

## Disable a template

To stop using a template without deleting it:

1. Open the template
2. Toggle **Active** to OFF
3. Click **Save**

Integrations will skip disabled templates and fall back to default SMS text.

## Built-in templates

Some templates are shipped with the plugin and cannot be deleted:

| Template | Subject | Use |
|----------|---------|-----|
| **OTP Verification** | `otp.verify` | Phone verification codes |
| **Opt-in Confirmation** | `sms.opted_in` | User confirms SMS consent |
| **Opt-out Confirmation** | `sms.opted_out` | User cancels SMS consent |

These follow the same variable rules but must always be active.

## Testing a template

In the template editor, click **Send test SMS**:

1. Enter a test phone number
2. Select a test subject (if applicable) to pre-fill variables
3. Click **Send**

You'll receive the rendered template in real SMS within 10 seconds.

## Common gotchas

### Variables not rendering

If `{order_id}` appears as literal text in the SMS, check:

1. Is the template name exactly `order_status` (no typos)?
2. Does the integration support this template subject? (see integration page)
3. Does the triggering event include this variable? (some subjects may be missing optional fields)

### Message too long

Keep body under 160 chars. If you need more:

- Split into two SMS (customer gets two messages)
- Use a shortened link instead of full URL
- Move details to a web dashboard link

### Special characters break the message

Avoid these characters in GSM-7 templates (they trigger UCS-2, doubling the SMS cost):
- Emoji (😀, 🎉, etc.)
- Non-Latin accents (é, ñ, ü beyond the GSM-7 set)
- Chinese, Arabic, Hebrew, Cyrillic

## Next step

See [Consent & STOP/START](./consent.md) to manage opt-in/opt-out.
