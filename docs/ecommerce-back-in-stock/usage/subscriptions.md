# Managing Subscriptions

The subscriptions list is the central place to monitor and manage all back-in-stock notification requests from your customers. Go to **Back in Stock** in the admin sidebar to access it.

## Subscriptions Table

The table shows all subscriptions across all products:

| Column | What it shows |
|--------|-------------|
| **Product** | Product name and thumbnail image |
| **Email** | Subscriber's email address |
| **Phone** | Phone number if collected (blank if not provided) |
| **Status** | Current subscription status (Pending, Notified, or Cancelled) |
| **Notified At** | Timestamp when the notification email was sent |
| **Created** | When the customer submitted the subscription form |

## Subscription Statuses

| Status | Description |
|--------|-------------|
| **Pending** | Customer is waiting; product is still out of stock or hasn't been restocked yet |
| **Notified** | Notification email has been sent; product became available |
| **Cancelled** | Customer clicked the unsubscribe link in their notification email |

## Filtering Subscriptions

Use the filter controls above the table to narrow results by:

- **Status** — Show only Pending, Notified, or Cancelled subscriptions
- **Product** — Find all subscriptions for a specific product
- **Date range** — Filter by subscription creation date

This is useful for checking how many customers are waiting for a specific product before you decide to restock it.

## Actions

### Delete a subscription

Click the delete action on any subscription row to permanently remove it. This cannot be undone.

::: warning
Deleting a Pending subscription means the customer will not receive a notification when the product is restocked, even if they submitted the form. Use this only when necessary (e.g., spam or invalid email addresses).
:::

## How Automatic Notifications Work

The notification system runs entirely in the background — no manual action is required once a product is restocked.

### The trigger

The `SendBackInStockNotifications` listener is registered for the stock change event on products. When a product's stock quantity is updated from `0` to any value greater than `0`, the listener fires automatically.

### What happens next

1. The listener queries all subscriptions for that product with status **Pending**
2. For each pending subscription, it dispatches a `SendBackInStockNotificationJob` to the queue
3. Each job sends the notification email using the `back_in_stock_notification` template
4. After sending, the subscription status is updated to **Notified** and `notified_at` is set to the current timestamp

### Queue processing

Notifications are dispatched as queued jobs. Make sure your queue worker is running:

```bash
php artisan queue:work
```

If you're using the sync driver (no queue), notifications are sent immediately during the stock update request.

::: tip
For stores with many subscribers per product, using a proper queue driver (Redis, database) is strongly recommended to avoid timeouts during stock updates.
:::

### Checking if notifications were sent

After restocking a product, filter the subscriptions table by that product and check that subscriptions have moved from **Pending** to **Notified** with a `notified_at` timestamp.

If subscriptions remain Pending after restocking, check:

1. Your queue worker is running (`php artisan queue:work`)
2. The `back_in_stock_notification` email template is configured correctly
3. Your mail driver settings in `.env` are correct
4. Server logs for errors: `storage/logs/laravel.log`
