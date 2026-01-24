# Frequently Asked Questions

## General Questions

### What is Product Gifts plugin?

Product Gifts is a premium plugin for Botble CMS that allows you to offer free gift products to customers when they meet certain conditions like minimum order value, purchasing specific products, or products from specific categories.

### Is this plugin compatible with my theme?

Yes! Product Gifts works with all Botble e-commerce themes available on CodeCanyon including Farmart, Martfury, Shofy, Ninico, Nest, and others. The gift display automatically integrates with your theme's cart and checkout pages.

### What are the requirements?

- Botble CMS version 7.6.4 or higher
- PHP version 8.2 or higher
- Active E-commerce plugin (required dependency)
- MySQL 5.7+ or MariaDB 10.3+

## Features

### Can I offer multiple gift options?

Yes! You can add multiple products as gift options for each rule. Customers can choose their preferred gift from the available options. You can also set different quantities for each gift item.

### Can I create multiple gift tiers?

Absolutely! Create multiple rules with different minimum order values. For example:
- Orders over $50: Choose from basic gifts
- Orders over $100: Choose from premium gifts
- Orders over $200: Choose from luxury gifts

### Can I target specific products or categories?

Yes, you have three targeting options:
1. **All Products** - Gift applies to any order meeting the minimum value
2. **Specific Products** - Gift only triggers when certain products are in cart
3. **Product Categories** - Gift triggers when products from specific categories are in cart

### Can I schedule gift promotions?

Yes! Each gift rule has optional start and end date fields. Use these to:
- Run limited-time promotions
- Schedule seasonal campaigns in advance
- Create urgency with deadline-based offers

## Display & Customization

### How are gifts displayed to customers?

Gifts appear in multiple locations:
- On product pages showing available gifts
- In the cart sidebar/page when customers qualify
- During checkout for final confirmation

### Can I customize the appearance?

Yes! The settings page offers:
- Multiple visual styles (Modern, Minimal, Classic, Elegant)
- Custom primary colors
- Emoji icon selection
- Toggle product images
- Toggle original price display
- Custom section titles

### Does it support multiple languages?

Yes! Product Gifts includes translations for 30+ languages including English, French, German, Spanish, Vietnamese, Japanese, Korean, Chinese, Arabic, and many more.

## Orders & Integration

### How are gifts shown in the order?

Gift products appear as line items with $0 price in the order. They are clearly marked as gifts in both the customer's order summary and the admin order details for easy tracking and fulfillment.

### Does it affect inventory?

Yes, when a gift is included in an order, the inventory for that product is reduced just like any other order item. Make sure to maintain adequate stock for your gift products.

### What happens if a gift product is out of stock?

If a gift product is out of stock, it will be automatically hidden from the gift options. Customers will only see available (in-stock) gift products.

## Purchase & Support

### Do I get free updates?

Yes! Your purchase includes lifetime free updates. We regularly release updates with new features, improvements, and compatibility updates for the latest Botble CMS versions.

### How do I get support?

For support, please visit our [Support Center](https://botble.ticksy.com). You can submit a ticket and our team will assist you.

### Can I use this on multiple sites?

Each license is valid for one domain. If you need to use the plugin on multiple sites, you'll need to purchase additional licenses.

## Troubleshooting

### Why aren't gifts appearing?

Check the following:
1. The gift rule status is "Published"
2. The current date is within the rule's date range (if set)
3. The cart subtotal meets the minimum order value
4. The cart contains qualifying products (if targeting is configured)
5. The gift products are in stock

### Why can't customers select a gift?

Ensure:
1. JavaScript is enabled in the browser
2. There are no JavaScript errors (check browser console)
3. The page has fully loaded before attempting selection
4. Browser cache is cleared

### The gift wasn't added to the order

This can happen if:
1. The customer didn't select a gift before checkout
2. The gift product went out of stock during checkout
3. The cart value dropped below the threshold before order completion
