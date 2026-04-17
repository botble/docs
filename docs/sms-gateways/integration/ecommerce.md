---
title: Ecommerce Integration
description: SMS for customer OTP verification and order notifications.
---

# Ecommerce Integration

Send OTP codes for customer registration and SMS notifications for orders.

## What fires SMS

| Event | SMS Template | Recipient | When |
|-------|---|---|---|
| **Customer Registration** | `customer.registration_otp` | Customer phone | Customer enters phone on signup form |
| **Phone Verification** | `customer.phone_verify_otp` | Customer phone | Customer clicks "verify phone" |
| **Order Placed** | `order.confirmation` | Customer phone | Order created |
| **Order Status Changed** | `order.status_change` | Customer phone | Admin updates order status |
| **Order Shipped** | `order.shipped` | Customer phone | Order marked shipped |
| **Refund Processed** | `order.refunded` | Customer phone | Admin refunds order |

## Configuration

### Step 1 — Enable ecommerce SMS

1. Go to **Admin → Settings → SMS Gateways**
2. Under **Subjects**, check **Ecommerce** to enable
3. Click **Save**

### Step 2 — Create or edit templates

1. Go to **Admin → SMS Gateways → Templates**
2. For each event above, ensure a template exists (or create one)
3. Use the available variables (see below)

### Step 3 — Configure OTP (optional)

If using customer phone verification:

1. Go to **Admin → Settings → SMS Gateways**
2. Set **OTP Code Length** (default: 6)
3. Set **OTP TTL** (default: 300 seconds / 5 minutes)
4. Set **Max OTP Attempts** (default: 3)
5. Click **Save**

## Template variables

### Order Confirmation

Available in `order.confirmation` template:

- `{order_id}` — order number
- `{customer_name}` — customer full name
- `{total}` — order total (e.g., "$99.99")
- `{items_count}` — number of items
- `{shop_name}` — your site name

Example:

```
Hi {customer_name}, thanks for your order #{order_id}! Total: {total}. Track it at [yoursite].
```

### Order Status Change

Available in `order.status_change` template:

- `{order_id}`
- `{customer_name}`
- `{old_status}` — previous status (e.g., "pending")
- `{new_status}` — new status (e.g., "processing")
- `{shop_name}`

Example:

```
Hi {customer_name}, your order #{order_id} is now {new_status}.
```

### Order Shipped

Available in `order.shipped` template:

- `{order_id}`
- `{customer_name}`
- `{tracking_number}` — carrier tracking URL or number
- `{carrier}` — carrier name (e.g., "FedEx")
- `{shop_name}`

Example:

```
{customer_name}, your order #{order_id} shipped with {carrier}. Track: {tracking_number}
```

### Refund Processed

Available in `order.refunded` template:

- `{order_id}`
- `{customer_name}`
- `{refund_amount}` — refund total
- `{reason}` — refund reason (if provided)
- `{shop_name}`

Example:

```
{customer_name}, we've refunded ${refund_amount} to your original payment method.
```

## OTP in Ecommerce

### Registration OTP

When a customer signs up on your site:

1. They enter their phone number on the signup form
2. System sends OTP via SMS
3. Customer enters the 6-digit code on the form
4. If correct, phone is marked verified and account is created

### Phone Verification (Post-Signup)

If you want customers to verify their phone later:

1. Customer goes to **Account → Phone Verification**
2. Clicks **Send verification code**
3. SMS is sent with the OTP
4. Customer enters code
5. If correct, phone is marked verified

Both flows use the same OTP settings (TTL, max attempts, rate limits).

## Consent & Opt-out

When creating an order, the system checks:

1. Is the customer phone opted out? (see [Consent](../usage/consent.md))
   - If yes, SMS is not sent (marked as `opted_out` in logs)
   - If no, SMS is sent

To opt-in/opt-out customers, admins can:

1. Go to **Admin → SMS Gateways → Consents**
2. Find the phone number
3. Click **Opt-in** or **Opt-out**

Customers can self-opt-out by replying **STOP** to any SMS.

## Delivery logs

Monitor SMS delivery in **Admin → SMS Gateways → Delivery Logs**:

1. Filter by **Subject** = "Ecommerce"
2. See all customer SMS (OTP, order updates, etc.)
3. Check status (Sent, Delivered, Failed, Opted-out)
4. Retry failed SMS if needed

## Outbound webhooks (optional)

Configure webhooks in **Admin → SMS Gateways → Webhooks** to receive real-time delivery notifications:

```json
{
  "event": "sms.sent",
  "to": "+1-555-1234",
  "subject": "ecommerce",
  "context": {
    "order_id": "12345",
    "template": "order.confirmation"
  },
  "timestamp": "2025-01-15T10:30:05Z"
}
```

See [Outbound Webhooks](../usage/outbound-webhooks.md) for verification and examples.

## Troubleshooting

### SMS not being sent to customers

1. Check **Admin → Settings → SMS Gateways** → **Subjects** → **Ecommerce** is checked
2. Verify SMS driver is configured and active
3. Check customer phone is not opted out (**Admin → SMS Gateways → Consents**)
4. Look in **Delivery Logs** for failed SMS (may show error reason)

### OTP code not arriving

1. Verify SMS driver has working credentials (send test SMS from Settings)
2. Check phone number format (must include country code, e.g., +1-555-1234)
3. Check delivery logs for the OTP SMS (may show driver error)

### OTP verification always fails

1. Ensure OTP template is active and not edited to wrong length
2. Check OTP TTL is set correctly (default 300 seconds = 5 minutes)
3. Try generating a new code (old code may have expired)

## Next step

See [Marketplace Integration](./marketplace.md) for vendor SMS or [Delivery Logs](../usage/delivery-logs.md) to monitor all SMS.
