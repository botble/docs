# FAQ

## Setup

### How do I get preorders working?

The minimum setup is:

1. Activate the plugin at **Admin > Plugins**
2. Enable preorder at **Preorder > Settings**
3. Create a preorder product at **Preorder > Products > Create** (select a product, set availability date and pricing)
4. The product now shows a preorder badge and button on the frontend

### Is the plugin compatible with my theme?

Yes. Ecommerce Preorder works with all Botble e-commerce themes including Shofy, Farmart, Martfury, Ninico, Nest, and others.

### What are the system requirements?

- Botble CMS 7.6.0+
- PHP 8.2+
- Active E-commerce plugin
- MySQL 5.7+ or MariaDB 10.3+

## Products

### Can I set different preorder settings for product variants?

No. Preorder settings are configured at the **parent product** level. All variants share the same preorder configuration (pricing strategy, availability date, stock limit). However, the variant's own base price is used for calculating the deposit amount.

### What happens when a product reaches its stock limit?

The product stops accepting new preorder requests. Existing preorders are unaffected. The current count vs. limit is visible in the **Preorder > Products** table.

### Can I disable preorder without deleting the configuration?

Yes. Edit the preorder product and change its status to **Draft**. This preserves all settings but hides the preorder from the frontend. Change back to **Published** to reactivate.

### How does the auto-disable feature work?

When **Auto-Disable** is enabled on a preorder product, the daily `preorder:disable-expired` command automatically sets the product to Draft status after the availability date passes. Make sure your [cronjob is configured](/ecommerce-preorder/configuration#cronjob).

## Orders

### Can customers cancel their preorder?

Yes, customers can cancel from their dashboard when the order is in **Requested**, **Accepted**, or **Prepayment Requested** status. Once the deposit is paid (Prepayment Confirmed), cancellation is no longer available from the dashboard — contact the admin.

### How do refunds work?

Refunds require two conditions: the order must be **Cancelled** and the product must have **Is Refundable** enabled. The customer submits a request from their dashboard, the admin approves or rejects it, and then processes the actual refund through the payment provider.

### What is the order code format?

Preorder orders use the format `YYYYMMDD-XXXXXXXX` (e.g., `20260324-A1B2C3D4`). This is separate from the main ecommerce order number.

## Pricing

### What payment methods are supported?

The plugin supports COD, bank transfer, Stripe, and PayPal for preorder payments. Additional payment methods can be integrated via filters.

### Can I use preorder with the Wholesale plugin?

Yes, but both plugins modify product pricing. Test thoroughly to ensure prices display correctly. If both apply discounts, check for conflicts in the cart.

### What's the difference between the three price types?

- **Full Price** — Customer pays the entire preorder price at checkout. No deposit split.
- **Deposit Percentage** — Customer pays a percentage now (e.g., 30% of $180 = $54), balance later.
- **Deposit Fixed** — Customer pays a fixed amount now (e.g., $50), balance later.

## Display

### Can I customize the preorder badge?

Yes. Go to **Preorder > Settings** to change the badge text (default: "Pre-Order"), badge color (default: amber), and button text (default: "Add to Pre-Order").

### What's the difference between "Detailed" and "Minimal" display styles?

- **Detailed** shows a full info card with pricing breakdown, availability date, discount label, and custom message
- **Minimal** shows a compact badge with brief text

## Marketplace

### Do vendors need any setup?

The admin must enable **Vendor Management** at **Preorder > Settings**. After that, vendors see preorder options in their vendor dashboard automatically.

### Can vendors change order statuses?

No. Order status changes are managed by the site admin only. Vendors have read-only access to order statuses for their products.

## Technical

### Does preorder work with digital products?

The plugin is designed primarily for physical products with shipping stages. While it works with any product type, the lifecycle (In Shipping, Delivered) is most relevant for physical goods.

### Does it support multiple languages?

Yes. The plugin ships with translations for 42+ locales including English, Vietnamese, Chinese, Japanese, Korean, Arabic, French, German, Spanish, Portuguese, Russian, and many more. You can add or customize translations in `resources/lang/`.

## Support

### How do I get support?

Visit [botble.ticksy.com](https://botble.ticksy.com) to submit a support ticket.

### Are updates free?

Yes. Your purchase includes lifetime free updates.
