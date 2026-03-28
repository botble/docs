# FAQ

## Setup

### How do I get back-in-stock notifications working?

The minimum setup is:

1. Activate the plugin at **Admin > Plugins**
2. Enable notifications at **Back in Stock > Settings**
3. Choose your display mode (Inline or Modal)
4. The notification form now appears automatically on any out-of-stock product page

### Is the plugin compatible with my theme?

Yes. Ecommerce Back in Stock works with all Botble e-commerce themes including Shofy, Farmart, Martfury, Ninico, Nest, and others.

### What are the system requirements?

- Botble CMS 7.5.0+
- PHP 8.2+
- Active E-commerce plugin
- MySQL 5.7+ or MariaDB 10.3+

## Notifications

### How are notifications triggered?

The `SendBackInStockNotifications` listener detects when a product's stock quantity changes from `0` to any positive value. At that point it automatically dispatches email notification jobs for all Pending subscribers of that product. No manual action is required.

### What if the product goes out of stock again after notifications are sent?

Notified subscriptions are not reactivated. Customers who received a notification but didn't purchase in time will need to re-subscribe using the form that reappears on the product page.

### Can I send notifications manually without restocking the product?

No. The notification system is triggered by actual stock changes. There is no manual "send now" button in the current version.

### How long does it take for notifications to be sent?

Notifications are dispatched as queued jobs. With a running queue worker (`php artisan queue:work`), emails are typically sent within seconds of the stock update. The exact timing depends on your server's queue processing speed and mail provider.

## Subscriptions

### Can a customer subscribe multiple times to the same product?

No. The system prevents duplicate subscriptions for the same product and email combination. If a customer submits the form again with the same email, a new subscription is not created.

### Can I see how many customers are waiting for a specific product?

Yes. Go to **Back in Stock** in the admin sidebar, filter by the product, and filter by **Pending** status. The count shown represents customers actively waiting for that product.

### Can I export the subscriptions list?

Export functionality depends on your Botble CMS version and any additional export plugins you have installed. The subscriptions table is a standard Botble table and supports the platform's built-in export features if available.

## Email

### Can I customize the notification email template?

Yes. Go to **Admin > Email Templates** and find the `back_in_stock_notification` template. You can edit the subject line, body content, and HTML layout. The available variables are: `{{ customer_name }}`, `{{ product_name }}`, `{{ product_url }}`, `{{ product_image }}`, and `{{ unsubscribe_url }}`.

### Do customers receive a confirmation email when they subscribe?

No. The plugin sends only one email: the notification when the product is back in stock. There is no subscription confirmation email in the current version.

### What email address sends the notifications?

Notifications are sent using your store's default mail configuration (`MAIL_FROM_ADDRESS` and `MAIL_FROM_NAME` in `.env`). Configure this in your server environment or hosting panel.

## Privacy & Data

### What customer data is collected?

Only email address (required) and phone number (optional, if enabled in settings). No other personal data is stored.

### How long is subscription data kept?

Subscriptions remain in the database indefinitely unless manually deleted by an admin. There is no automatic expiry or cleanup.

### Can customers delete their own data?

Customers can cancel their subscription via the unsubscribe link in the notification email, which sets the status to Cancelled. For full data deletion, the admin must delete the subscription record from the **Back in Stock** panel.

## Compatibility

### Does it work with product variations?

Yes. When a customer subscribes from a product page that has variations, the subscription is associated with the parent product. The notification triggers when the parent product's stock changes, regardless of which variant was out of stock.

### Does it work with the Marketplace plugin (vendors)?

The back-in-stock notification system applies to all products in the store, including vendor products. Subscriptions are managed centrally by the site admin. Vendors do not have access to the subscriptions dashboard in the current version.

### Does it support multiple languages?

Yes. The plugin is translation-ready with locale support. You can add or customize translations in `resources/lang/`.

## Support

### How do I get support?

Visit [botble.ticksy.com](https://botble.ticksy.com) to submit a support ticket.

### Are updates free?

Yes. Your purchase includes lifetime free updates.
