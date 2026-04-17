---
title: GDPR & Data Export
description: Customer-facing SMS data export and erasure endpoints, plus admin purge commands.
---

# GDPR & Data Export

The plugin ships ready-made GDPR primitives — two customer-facing endpoints and an admin per-subject erasure command. No host-theme edits are required; the endpoints are registered by the plugin when the `ecommerce` plugin (customer guard) is active.

## Customer-facing endpoints

Both endpoints require the `auth:customer` middleware.

### Export customer SMS data

```
GET /account/sms-preferences/export
```

Returns a JSON bundle containing:

- Consent rows (per-channel opt-in/opt-out history)
- Delivery logs (last 2 years, body included)
- OTP attempt history — **codes never included**; only purpose, status, attempt counts, and timestamps

Example response:

```json
{
  "generated_at": "2026-04-17T09:15:00+00:00",
  "subject": {
    "type": "Botble\\Ecommerce\\Models\\Customer",
    "id": 42
  },
  "consents": [
    { "channel": "transactional", "opted_in": true, "opted_in_at": "2025-03-10T08:00:00Z", "source": "checkout" },
    { "channel": "marketing", "opted_in": false, "opted_out_at": "2025-11-01T14:22:00Z", "source": "sms_stop_reply" }
  ],
  "delivery_logs": [
    {
      "event": "order_placed",
      "phone": "+12025550001",
      "driver": "twilio",
      "status": "delivered",
      "body": "Hi John, your order ORD-10042 has been placed…",
      "sent_at": "2025-12-01T08:00:02Z",
      "delivered_at": "2025-12-01T08:00:08Z"
    }
  ],
  "otp_history": [
    {
      "purpose": "checkout",
      "status": "verified",
      "attempt_count": 1,
      "created_at": "2025-12-01T07:58:00Z",
      "verified_at": "2025-12-01T07:58:42Z"
    }
  ]
}
```

::: info Codes never exported
The `body` field in delivery logs includes rendered template text that may contain `{otp_code}` substitution. However, the plugin redacts the code before writing to the log (stores only the hashed code in `smsg_otps`). The export pulls the log body as-is.
:::

### Delete customer SMS data

```
POST /account/sms-preferences/delete
```

Cascade-deletes every `smsg_*` row for the authenticated customer:

- All delivery logs
- All OTP records
- All consent rows
- Webhook send history for that recipient

Keeps a single anonymised audit stub (`source=gdpr_delete`) with no personal data so compliance auditors can verify the request was processed. Returns a JSON receipt with deleted row counts.

```json
{
  "success": true,
  "deleted": {
    "delivery_logs": 47,
    "otps": 12,
    "consents": 3
  },
  "audit_stub_id": "01JXYZ..."
}
```

### Update customer preferences

```
POST /account/sms-preferences/update
```

Toggles per-channel opt-in (transactional / OTP / marketing) from the customer account's **SMS Preferences** widget. Mirrors the STOP/START reply flow — no SMS is sent to confirm.

## Admin per-subject erasure

For subjects that are not the authenticated customer (vendors, agents, job candidates, hotel guests, car customers), use the artisan command:

```bash
php artisan sms:purge-subject "Botble\Marketplace\Models\Store" 15
php artisan sms:purge-subject "Botble\Ecommerce\Models\Customer" 42
```

**Arguments:**

- `subject_type` — Fully-qualified model class (e.g. `Botble\\Ecommerce\\Models\\Customer`)
- `subject_id` — Primary key of the subject row

Deletes rows from `smsg_delivery_logs`, `smsg_otps`, and `smsg_consents` matching the `(recipient_type, recipient_id)` or `(subject_type, subject_id)` pair. Output example:

```
[sms:purge-subject] Erased subject Botble\Marketplace\Models\Store#15: 23 log(s), 4 OTP(s), 3 consent(s).
```

## Global log purge

Retire logs older than the configured retention window:

```bash
php artisan sms:purge --days=90   # default
php artisan sms:purge --days=30   # stricter
```

Schedule in `app/Console/Kernel.php` for automatic nightly enforcement — see [Artisan Commands](./commands.md).

## Customer account widget

When the `ecommerce` plugin is active, the **SMS Preferences** widget injects into the customer account page automatically (via form macros — no theme edit). Customers can:

- Toggle per-channel consent
- Trigger the export endpoint (downloads JSON)
- Trigger the delete endpoint (cascade erasure + confirmation)

The widget honours the site language and routes to the three endpoints above.

## Compliance checkpoints

### GDPR (Europe)

- Article 15 (access): `GET /account/sms-preferences/export`
- Article 17 (erasure): `POST /account/sms-preferences/delete` + `sms:purge-subject`
- Article 21 (objection): STOP keyword → `smsg_consents.opted_out_at`
- Consent proof: `smsg_consents.source` + `ip_address` + `user_agent` captured on every opt-in

### CCPA (California)

- Right to know: export endpoint
- Right to delete: delete endpoint
- Right to opt-out: STOP/START reply or SMS Preferences widget

## Sub-processor documentation

SMS Gateways acts as a **processor** of customer phone numbers and message bodies. Your SMS providers are **sub-processors**. Document the chain in your privacy policy:

- [Twilio DPA](https://www.twilio.com/en-us/legal/data-processing-agreement)
- [Vonage DPA](https://www.vonage.com/communications/legal/data-processing-agreement/)
- [AWS SNS DPA](https://aws.amazon.com/service-terms/)
- [Plivo DPA](https://www.plivo.com/legal/data-processing-addendum/)
- [Msg91 privacy](https://msg91.com/privacy)
- [Fast2SMS terms](https://www.fast2sms.com/dashboard/terms)

## Next step

See [Consent & STOP/START](./consent.md) for opt-in/opt-out mechanics, or [Troubleshooting](../troubleshooting.md) for compliance-related issues.
