---
title: Marketplace Integration
description: SMS for vendor alerts and customer/vendor OTP verification.
---

# Marketplace Integration

Send SMS to vendors for new orders, customer inquiries, and OTP verification for both customers and vendors.

## What fires SMS

| Event | SMS Template | Recipient | When |
|-------|---|---|---|
| **Customer Registration OTP** | `customer.registration_otp` | Customer phone | Customer signs up |
| **Vendor Registration OTP** | `vendor.registration_otp` | Vendor phone | Vendor applies to marketplace |
| **New Order for Vendor** | `vendor.new_order` | Vendor phone | Customer purchases from vendor |
| **Vendor Response Needed** | `vendor.action_required` | Vendor phone | Admin marks order needing vendor action |
| **Vendor Commission Payout** | `vendor.commission_payout` | Vendor phone | Commission transferred to vendor |

## Configuration

### Step 1 — Enable marketplace SMS

1. Go to **Admin → Settings → SMS Gateways**
2. Under **Subjects**, check **Marketplace** to enable
3. Click **Save**

### Step 2 — Create templates

1. Go to **Admin → SMS Gateways → Templates**
2. Create templates for each event above
3. Use the available variables (see below)

### Step 3 — Configure OTP

1. Go to **Admin → Settings → SMS Gateways**
2. Set **OTP Code Length**, **TTL**, **Max Attempts**
3. Click **Save**

## Template variables

### New Order for Vendor

Available in `vendor.new_order` template:

- `{vendor_name}` — store/vendor name
- `{order_id}` — order number
- `{customer_name}` — buyer name
- `{items_count}` — number of items purchased from vendor
- `{total}` — vendor's portion of order total
- `{brand}` — marketplace name

Example:

```
{vendor_name}, you have a new order #{order_id} from {customer_name} for {total}. {items_count} items.
```

### Vendor Action Required

Available in `vendor.action_required` template:

- `{vendor_name}`
- `{order_id}`
- `{action}` — what needs to be done (e.g., "ship", "confirm", "respond")
- `{brand}`

Example:

```
{vendor_name}, order #{order_id} needs your attention: {action}. Log in to respond.
```

### Commission Payout

Available in `vendor.commission_payout` template:

- `{vendor_name}`
- `{amount}` — payout amount
- `{period}` — payout period (e.g., "January 2025")
- `{brand}`

Example:

```
{vendor_name}, your {period} commission of {amount} has been paid out.
```

## OTP in Marketplace

### Customer Registration OTP

Same as ecommerce — customer phone verification on signup.

### Vendor Registration OTP

When a vendor applies to your marketplace:

1. Vendor enters their phone on the vendor signup form
2. System sends OTP via SMS
3. Vendor enters the 6-digit code
4. If correct, vendor account is created

Both customer and vendor OTP use the same settings (TTL, max attempts, rate limits).

## Vendor Consent

When sending SMS to vendors:

1. System checks if vendor phone is opted out
2. If yes, SMS is not sent (marked as `opted_out`)
3. If no, SMS is sent

Vendors can opt-out by replying **STOP** to any SMS.

To manually manage vendor consent:

1. Go to **Admin → SMS Gateways → Consents**
2. Find the vendor phone number
3. Click **Opt-in** or **Opt-out**

## Delivery logs

Monitor SMS in **Admin → SMS Gateways → Delivery Logs**:

1. Filter by **Subject** = "Marketplace"
2. See all vendor and customer SMS
3. Check status and retry failed SMS

## Outbound webhooks

Configure webhooks to track vendor SMS delivery:

```json
{
  "event": "sms.sent",
  "to": "+1-555-1234",
  "subject": "marketplace",
  "context": {
    "vendor_id": "789",
    "order_id": "456",
    "template": "vendor.new_order"
  },
  "timestamp": "2025-01-15T10:30:05Z"
}
```

See [Outbound Webhooks](../usage/outbound-webhooks.md) for details.

## Troubleshooting

### Vendor SMS not being sent

1. Check **Admin → Settings → SMS Gateways** → **Subjects** → **Marketplace** is enabled
2. Verify vendor phone is not opted out (**Admin → SMS Gateways → Consents**)
3. Check SMS driver is configured and active
4. Look in **Delivery Logs** for failed SMS

### Vendor OTP not arriving

1. Verify SMS driver credentials (test from Settings)
2. Check phone format (must include country code, e.g., +1-555-1234)
3. Check delivery logs for the OTP SMS

### OTP verification fails

1. Ensure OTP TTL has not expired (default 10 minutes)
2. Check OTP template is active and correct length
3. Try generating a new code

## Next step

See [Real Estate Integration](./real-estate.md) for agent SMS or [Permissions](../usage/permissions.md) to control vendor access to SMS settings.
