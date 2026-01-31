# Frequently Asked Questions

## General Questions

### What is the Wholesale plugin?

Wholesale is a premium B2B plugin for Botble CMS that allows you to offer different prices to different customer groups, enforce minimum order quantities, control product visibility, and manage wholesale customer applications. It's perfect for businesses selling to both retail and wholesale customers.

### Is this plugin compatible with my theme?

Yes! Wholesale works with all Botble e-commerce themes available on CodeCanyon including Farmart, Martfury, Shofy, Ninico, Nest, and others. The pricing display automatically integrates with your theme's product and cart pages.

### What are the requirements?

- Botble CMS version 7.6.0 or higher
- PHP version 8.2 or higher
- Active E-commerce plugin (required dependency)
- MySQL 5.7+ or MariaDB 10.3+

## Features

### Can I create multiple customer groups?

Yes! You can create unlimited customer groups with different discount rates, minimum order requirements, and priorities. Customers can belong to one or multiple groups depending on your configuration.

### Can I set different prices for different quantity ranges?

Absolutely! The tiered pricing system allows you to create multiple price breaks based on quantity. For example:
- 1-49 units: Regular price
- 50-99 units: 10% off
- 100-499 units: 15% off
- 500+ units: 20% off

### Can I enforce minimum order quantities?

Yes, the MOQ (Minimum Order Quantity) feature allows you to set:
- Minimum quantity per product
- Quantity increments (e.g., must order in multiples of 12)
- Different MOQs for different customer groups

### Can I hide products from retail customers?

Yes! The product visibility feature allows you to:
- Show products only to wholesale customers
- Restrict specific products to specific customer groups
- Keep wholesale catalog separate from retail

### Can I require approval for wholesale accounts?

Yes, you can enable approval requirements where wholesale applications go to "pending" status until an admin reviews and approves them. You can also disable approval for instant access.

## Pricing & Discounts

### How are discounts calculated?

Discounts can be configured in three ways:

1. **Percentage Discount** - Reduces price by a percentage (e.g., 20% off)
2. **Fixed Amount Discount** - Reduces price by fixed dollar amount (e.g., $10 off)
3. **Fixed Price** - Sets absolute price regardless of original (e.g., always $40)

### What happens if a customer belongs to multiple groups?

You can configure the conflict resolution strategy:
- **Highest Discount** - Customer gets the best deal
- **Lowest Discount** - Customer gets the smallest discount
- **Priority** - Group with highest priority number wins

### Can I have group-level discounts AND tiered pricing?

Yes! Group-level discounts apply store-wide, while tiered pricing rules provide additional quantity-based discounts for specific products. Both can work together.

### Do discounts apply automatically?

Yes, once a customer is assigned to a group and logs in, all applicable discounts are calculated and displayed automatically on product pages, in cart, and at checkout.

## Product Management

### Can I set different MOQs for different customer groups?

Yes! When setting MOQ on a product, you can specify which customer group it applies to, or apply it to all wholesale customers.

### What happens if a customer tries to order less than the MOQ?

The system will automatically adjust the quantity to the minimum allowed. For example, if MOQ is 12 and the customer tries to order 5, it will be adjusted to 12.

### Can I have retail and wholesale versions of the same product?

You don't need separate products. The same product can have regular retail pricing for normal customers and wholesale pricing for wholesale customers based on their group assignment.

### How do I bulk-update MOQ settings?

Currently, MOQ must be set per product in the product edit page. For bulk updates, consider using database queries or contact support for assistance.

## Customer Management

### How do customers apply for wholesale accounts?

Customers visit the wholesale registration page, fill out an application form with their business details, and submit. Admins receive a notification and can approve or reject the application.

### Can I manually create wholesale customers?

Yes! In the admin, edit any customer account, assign them to a customer group, and they instantly become a wholesale customer.

### Can I set expiration dates for wholesale access?

Yes, when assigning customers to groups, you can set an optional expiration date. After that date, the customer loses wholesale access.

### What information do I collect in applications?

The application form collects:
- Company name
- Tax ID (optional)
- Business address
- Phone number
- Business type (optional)
- Website (optional)

## Display & Customization

### How are wholesale prices displayed?

Wholesale customers see:
- Pricing table on product pages showing all tiers
- Discounted prices in product listings
- Special pricing in cart and checkout
- Regular price with discount applied

### Can I customize the pricing table appearance?

Yes! Settings allow you to:
- Choose from multiple visual styles (Modern, Minimal, Classic, Elegant)
- Set display mode (Full or Compact)
- Show/hide savings amounts
- Customize section title

### Can guests see wholesale prices?

This is configurable. You can:
- Show pricing tables to everyone (guests see the rates available)
- Hide wholesale prices from guests (only logged-in wholesale customers see them)

Default is to hide from guests for privacy.

### Does it work on mobile devices?

Yes! All pricing tables, cart integration, and checkout features are fully responsive and work perfectly on mobile devices.

## Orders & Integration

### How do wholesale orders appear in admin?

Wholesale orders appear just like regular orders, but you can identify them by:
- Customer's group membership
- Applied discount amounts
- Special wholesale pricing in line items

### Does it affect inventory?

Yes, wholesale orders reduce inventory just like retail orders. Stock management works identically for both order types.

### Can I export wholesale orders separately?

The standard order export includes all orders. You can filter by customer group or use date ranges to export wholesale orders specifically.

### Does it integrate with existing plugins?

Wholesale is designed to work alongside other Botble e-commerce plugins. It integrates seamlessly with:
- Standard checkout
- Payment gateways
- Shipping methods
- Tax calculations

## Technical Questions

### Will this slow down my site?

No. The plugin is optimized for performance:
- Efficient database queries
- Caching support
- Minimal JavaScript
- No impact on retail customers

### Can I use this with multi-store?

Yes! Wholesale supports Botble's multi-store functionality. You can set different pricing rules per store.

### Does it support multiple currencies?

Yes, wholesale pricing works with Botble's multi-currency system. Discounts are calculated in the customer's selected currency.

### Is the code customizable?

Yes! As with all Botble plugins, you can customize templates, styling, and functionality. The codebase follows Laravel best practices.

## Purchase & Support

### Do I get free updates?

Yes! Your purchase includes lifetime free updates. We regularly release updates with new features, improvements, and compatibility updates for the latest Botble CMS versions.

### How do I get support?

For support, please visit our [Support Center](https://botble.ticksy.com). You can submit a ticket and our team will assist you.

### Can I use this on multiple sites?

Each license is valid for one domain. If you need to use the plugin on multiple sites, you'll need to purchase additional licenses.

### Is there a refund policy?

Please refer to CodeCanyon's refund policy. Generally, refunds are available if the plugin doesn't work as described and we cannot resolve the issue.

## Troubleshooting

### Why aren't wholesale prices showing?

Check the following:
1. Customer is assigned to an active customer group
2. Customer is logged in
3. Group status is "Published"
4. Pricing rule status is "Published" (if using tiered pricing)
5. Clear all caches (admin and browser)

### Why is MOQ not being enforced?

Ensure:
1. MOQ is set on the product in admin
2. Customer group matches the MOQ setting
3. JavaScript is enabled in browser
4. Clear cart and try again
5. Check browser console for errors

### Pricing tiers not working correctly

Verify:
1. Pricing rules are "Published"
2. Quantity ranges don't overlap
3. Customer is in the correct group
4. Rules apply to correct product
5. Clear all caches

### Application form not working

Check:
1. Wholesale registration is enabled in settings
2. Email settings are configured correctly
3. Application appears in admin area
4. User has permission to approve applications
