# Webhooks

Webhooks allow your store to send real-time order data to external services when specific events occur. This enables integrations with CRMs, notification systems, automation platforms, and custom applications.

## Overview

When an event happens (e.g., a new order is placed), the system sends an HTTP **POST** request with JSON data to the URL you configure. This is an **outgoing** notification to external systems — it does not create in-app notifications for admin users.

### Common Use Cases

- Send order notifications to Slack or Discord channels
- Trigger automations in Zapier, Make.com, or n8n
- Sync order data with a CRM or ERP system
- Push data to a custom backend API
- Track abandoned carts in marketing tools

## Configuration

Navigate to **Settings** -> **Ecommerce** -> **Webhook** in the admin panel.

You will see input fields for each webhook event. Paste a valid HTTPS URL into the field for each event you want to track, then click **Save**.

Leave a field empty to disable that webhook.

### Available Webhook Events

| Event | Trigger |
|---|---|
| **Order Placed** | A customer places a new order |
| **Order Updated** | An admin updates an order in the admin panel |
| **Order Completed** | Order status changes to completed |
| **Order Cancelled** | An order is cancelled |
| **Shipping Status Updated** | Shipment status changes (e.g., shipped, delivered) |
| **Payment Status Updated** | Payment is confirmed |
| **Abandoned Cart** | Abandoned cart reminder fires (requires [cronjob setup](/shofy/cronjob)) |

## Testing Webhooks

Each webhook type has a **Test Webhook** button. Click it to send sample data to your configured URL and verify that your endpoint receives the data correctly.

The test will show:
- The HTTP response status code from your endpoint
- The response body (if any)
- Success or error message

::: tip
Use a service like [webhook.site](https://webhook.site) or [RequestBin](https://requestbin.com) to inspect webhook payloads during development.
:::

## Payload Format

All webhooks send a JSON payload via HTTP POST with `Content-Type: application/json`.

### Order Webhooks

The following structure applies to **Order Placed**, **Order Updated**, **Order Completed**, and **Order Cancelled** events:

```json
{
  "id": 12345,
  "status": {
    "value": "pending",
    "text": "Pending"
  },
  "shipping_status": {
    "value": "not_shipped",
    "text": "Not shipped"
  },
  "payment_method": {
    "value": "stripe",
    "text": "Stripe"
  },
  "payment_status": {
    "value": "pending",
    "text": "Pending"
  },
  "customer": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": {
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "country": "US",
      "zip_code": "10001"
    }
  },
  "sub_total": 99.99,
  "tax_amount": 9.99,
  "shipping_method": "standard",
  "shipping_option": "Standard Shipping (5-7 days)",
  "shipping_amount": 5.00,
  "amount": 114.98,
  "coupon_code": "SAVE10",
  "discount_amount": 10.00,
  "discount_description": "10% off discount",
  "note": "Please deliver to the back door",
  "is_confirmed": true
}
```

**Additional fields by event:**

- **Order Cancelled** — includes `cancellation_reason`
- **Shipping Status Updated** — includes `previous_shipping_status` with the prior status

### Abandoned Cart Webhook

```json
{
  "id": 123,
  "customer": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "cart_items": [
    {
      "product_id": 10,
      "product_name": "T-Shirt",
      "product_sku": "TS-001",
      "quantity": 2,
      "price": 25.00,
      "total": 50.00
    }
  ],
  "total_amount": 125.00,
  "items_count": 3,
  "abandoned_at": "2025-01-15T10:30:00Z",
  "hours_since_abandoned": 2,
  "reminders_sent": 0,
  "recovery_url": "https://example.com/cart/recover?token=abc123"
}
```

## Integration Examples

### Slack

1. In Slack, go to **Apps** -> **Incoming Webhooks** -> **Add New Webhook to Workspace**
2. Select a channel for notifications
3. Copy the webhook URL (e.g., `https://hooks.slack.com/services/T00/B00/xxxx`)
4. Paste into the **Order Placed** webhook URL field
5. Click **Test Webhook** to verify

### Zapier

1. Create a new Zap in Zapier
2. Choose **Webhooks by Zapier** as the trigger
3. Select **Catch Hook**
4. Copy the webhook URL provided by Zapier
5. Paste into the desired webhook URL field
6. Click **Test Webhook**, then test the trigger in Zapier
7. Add actions (send email, update spreadsheet, etc.)

### Custom API Endpoint

Your endpoint should:
- Accept HTTP POST requests
- Parse JSON body
- Return a `200` status code on success

```php
// Example Laravel endpoint
Route::post('/webhooks/order-placed', function (Request $request) {
    $orderData = $request->all();

    // Process order data
    Log::info('New order received', ['order_id' => $orderData['id']]);

    return response()->json(['status' => 'ok']);
});
```

::: warning
Webhook requests are sent synchronously. If your endpoint is slow or unresponsive, it may delay order processing. Keep your webhook handler fast and offload heavy processing to a queue.
:::
