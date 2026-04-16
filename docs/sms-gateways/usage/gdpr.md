---
title: GDPR & Data Export
description: Customer data export, erasure, and compliance.
---

# GDPR & Data Export

Handle customer data requests (export, erasure) and maintain compliance with GDPR, CCPA, and similar regulations.

## Customer data export

Customers can request a copy of their SMS data in **Account → My Data → SMS Export** (if your site offers data export):

1. Customer logs in
2. Goes to their dashboard's "My Data" or "Privacy" section
3. Clicks **Export SMS data**
4. Receives a JSON file with all their SMS records

The export includes:

```json
{
  "export_date": "2025-01-15T10:30:00Z",
  "phone": "+1-555-1234",
  "sms_sent": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "to": "+1-555-1234",
      "body": "Your order #123 has been shipped",
      "status": "delivered",
      "sent_at": "2025-01-10T08:00:00Z",
      "delivered_at": "2025-01-10T08:00:05Z",
      "driver": "twilio"
    }
  ],
  "otp_attempts": [
    {
      "phone": "+1-555-1234",
      "status": "verified",
      "created_at": "2025-01-05T12:00:00Z",
      "verified_at": "2025-01-05T12:01:30Z"
    }
  ],
  "consents": [
    {
      "phone": "+1-555-1234",
      "status": "opted_in",
      "changed_at": "2025-01-01T00:00:00Z",
      "changed_by": "customer"
    }
  ]
}
```

**Rate limit**: Customers can request an export once per 30 days.

## Admin data export

Admins can export SMS data for multiple customers in **Admin → SMS Gateways → Delivery Logs → Export**:

1. Filter by phone number, date range, or status
2. Click **Export**
3. Choose format: CSV or JSON
4. Download the file

## Customer data erasure (right to be forgotten)

### Self-service erasure

Customers can erase their own data in **Account → Privacy → Erase my data**:

1. Customer logs in
2. Goes to Privacy settings
3. Clicks **Erase all my SMS data**
4. Confirms the action (irreversible)

This deletes:
- All SMS logs for this customer's phone
- All OTP attempts for this phone
- All consent records for this phone
- Webhook logs (if any)

The deletion is **permanent and cannot be undone**.

### Admin-initiated erasure

Admins with `sms.consents.manage` permission can erase a customer's SMS data:

1. Go to **Admin → SMS Gateways → Consents**
2. Find the phone number
3. Click **Erase all data for this phone**
4. Confirm (irreversible)

This erases the same data as self-service erasure.

![Erasure confirmation dialog](./images/sms-gdpr-erase.png)

## Audit trail retention

After customer data is erased, we retain:

- **Webhook logs**: "SMS was sent to +1-555-1234 and delivered" (no body text or personal details)
- **Summary counts**: "100 SMS sent in 2024" (no individual records)

This allows compliance auditing without retaining personal data.

## Compliance checkpoints

### GDPR (Europe)

- ✓ Customer can request export (Article 15)
- ✓ Customer can request erasure (Article 17)
- ✓ 30-day response deadline (our exports are immediate)
- ✓ No non-consensual SMS (use Consent/STOP-START)
- ✓ Data breach notification (if applicable, use webhooks to log)

### CCPA (California)

- ✓ Customer right to know (export)
- ✓ Customer right to delete (erasure)
- ✓ Customer right to opt-out (STOP/START)
- ✓ Non-discrimination (we don't penalize deletes)

### PIPEDA (Canada)

- ✓ Consent management (Consent/STOP-START)
- ✓ Access to personal info (export)
- ✓ Right to erasure (erase)
- ✓ Breach notification (via webhooks)

## Data retention policy

**Default**: SMS logs are retained for **90 days**, then auto-deleted via `sms:purge`.

**Customization**: Modify in **Admin → Settings → SMS Gateways → Retention Days**.

**Manual retention**: Before auto-purge, export logs to a data warehouse for long-term storage (for billing/audit).

## Per-subject data management

Different integrations may have different data retention needs:

- **Ecommerce orders**: Retain SMS logs as long as order exists
- **OTP verification**: Purge OTP attempts after 30 days
- **Marketing campaigns**: Purge after 90 days if no purchase

Use `sms:purge-subject` command to selectively delete SMS for one integration:

```bash
php artisan sms:purge-subject ecommerce --force
```

This does NOT erase per-phone data; it only removes logs for that subject.

## Compliance documentation

To generate GDPR/CCPA documentation:

1. **Data Inventory**: Run `php artisan sms:list-drivers` to document active drivers and providers
2. **Privacy Impact Assessment**: Document consent mechanisms in each integration (see integration pages)
3. **Data Processing Agreement (DPA)**: With your SMS providers (Twilio, Vonage, etc.) — not managed by this plugin
4. **Breach Notification**: Configure webhooks to log all delivery failures and opt-outs

## Data processor agreements

SMS Gateways acts as a **processor** (not controller) of SMS data. Your SMS providers (Twilio, Vonage, AWS, etc.) are **sub-processors**.

For GDPR compliance, ensure:

1. You have a **Data Processing Agreement** with each SMS provider
2. You document the **data flow** (Botble → Provider → Carrier → Phone)
3. You have a **Data Retention Policy** (configured in this plugin)
4. You enable **customer erasure** (use the right-to-be-forgotten flows)

Links to provider DPAs:

- [Twilio Data Processing Agreement](https://www.twilio.com/en-us/legal/data-processing-agreement)
- [Vonage DPA](https://www.vonage.com/communications/legal/data-processing-agreement/)
- [AWS SNS DPA](https://aws.amazon.com/service-terms/)

## Next step

See [Troubleshooting](../troubleshooting.md) if you have compliance questions or technical issues.
