# FAQ

## Setup

### How do I get wholesale pricing working?

The minimum setup is:

1. Activate the plugin at **Admin > Plugins**
2. Create a customer group at **Wholesale > Customer Groups > Create** (set a name and discount percentage)
3. Assign a customer to the group at **Ecommerce > Customers > Edit customer > Wholesale Groups**
4. That customer now sees discounted prices when logged in

### Do I need to set prices on every product?

No. When you create a customer group with a 20% discount, that discount applies to **all products** automatically for customers in that group.

Pricing rules (quantity-based tiers) are optional and only needed if you want different prices at different quantities for specific products.

### Is the plugin compatible with my theme?

Yes. Wholesale works with all Botble e-commerce themes including Farmart, Martfury, Shofy, Ninico, Nest, and others.

### What are the system requirements?

- Botble CMS 7.6.0+
- PHP 8.2+
- Active E-commerce plugin
- MySQL 5.7+ or MariaDB 10.3+

## Customer Groups

### Can a customer be in multiple groups?

Yes, if you enable it in **Wholesale > Settings > Allow Customers in Multiple Groups**. When enabled, the [discount resolution strategy](/wholesale/configuration#discount-resolution-strategy) determines which discount applies.

### What's the difference between Percentage and Fixed Amount discounts?

- **Percentage** (e.g., 20%) - Scales with product price. 20% off a $100 product = $80. 20% off a $50 product = $40.
- **Fixed Amount** (e.g., $10 off) - Same dollar amount off every product. $10 off a $100 product = $90. $10 off a $50 product = $40.

### What does the Priority field do?

Priority is only used when **Discount Resolution Strategy** is set to "Priority" and a customer is in multiple groups. Lower priority number = higher importance. A group with priority 1 takes precedence over priority 2.

## Pricing Rules

### What's the difference between group discounts and pricing rules?

- **Group discounts** apply the same percentage/amount to ALL products for everyone in the group.
- **Pricing rules** are product-specific and quantity-based - different discounts for different quantities of a specific product.

Both can work together. The system gives the customer the best price.

### Can I have pricing rules without customer groups?

Pricing rules can target "All Groups" (any wholesale customer) or a specific group. But the customer must be in at least one wholesale group to see wholesale pricing.

### What happens if quantity ranges overlap?

Avoid overlapping ranges. If you create two rules for the same product with overlapping quantity ranges, the behavior is unpredictable. Use distinct ranges like 10-49, 50-99, 100+.

## Products

### Can the same product have retail and wholesale prices?

Yes. The same product shows its regular price to retail customers and the wholesale price to wholesale customers. You don't need separate products.

### What does "Wholesale Only" visibility do?

Products with "Wholesale Only" visibility are completely hidden from retail customers and guests. Only logged-in customers who are assigned to a wholesale group can see them in the catalog and search results.

### How does MOQ (Minimum Order Quantity) work?

When you set a minimum quantity (e.g., 12) and increment (e.g., 6) on a product, wholesale customers must order at least 12 units and in multiples of 6 (12, 18, 24, etc.). If they try to order an invalid quantity, it's automatically adjusted.

## Applications

### How do customers apply?

Customers visit `/wholesale/register` on your site, fill out a form with their business details, and submit. You review applications at **Wholesale > Applications**.

### Can I skip the approval process?

Yes. Disable **Require Approval** in **Wholesale > Settings**. Applications will be auto-approved, and customers get wholesale access immediately.

### Can customers reapply after rejection?

Yes. Rejected customers can reapply at `/customer/wholesale/reapply`. They can submit one reapplication per day.

## Display

### How do I show the pricing table on product pages?

Enable it at **Wholesale > Settings > Display Options > Show Pricing Table**. The table shows automatically on products that have pricing rules.

### Can I change how the pricing table looks?

Yes. Go to **Wholesale > Settings** to choose the visual style (Modern, Minimal, Classic, Elegant), colors, display mode, and whether to show savings amounts.

### Can guests see wholesale prices?

By default, no. Enable **Show Wholesale Prices to Guests** in **Wholesale > Settings** to let non-logged-in visitors see the pricing table.

## Technical

### Will this slow down my site?

No. The plugin uses efficient database queries and supports caching. It has no performance impact on retail customers who aren't in wholesale groups.

### Does it work with multi-store?

Yes. You can create different pricing rules per store if using Botble's multi-store feature.

### Does it work with multiple currencies?

Yes. Discounts are calculated in the customer's selected currency.

## Support

### How do I get support?

Visit [botble.ticksy.com](https://botble.ticksy.com) to submit a support ticket.

### Are updates free?

Yes. Your purchase includes lifetime free updates.
