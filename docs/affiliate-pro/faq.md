# Frequent Questions

## General Questions

### What is Affiliate Pro?

Affiliate Pro is a comprehensive affiliate marketing system designed for e-commerce stores built with Botble CMS. It enables store owners to create and manage an affiliate program where users can earn commissions by referring customers to the store.

### What are the system requirements for Affiliate Pro?

- Botble CMS version 7.3.0 or higher
- PHP version 8.0 or higher
- Active e-commerce plugin

### How does the affiliate tracking work?

Affiliate Pro uses cookie-based tracking to attribute sales to affiliates. When a visitor clicks on an affiliate link, a cookie is stored in their browser. If they make a purchase within the cookie lifetime, the affiliate receives a commission for the sale.

## Features and Functionality

### Can I set different commission rates for different products?

Yes, Affiliate Pro allows you to set category-based commission rates. You can create category groups with specific commission percentages, giving you flexibility in your commission structure.

### How do affiliates get paid?

Affiliates can request withdrawals through their dashboard once they reach the minimum withdrawal amount. Store owners can then process these requests through the admin panel and pay affiliates using their preferred payment method (bank transfer, PayPal, etc.).

### Can affiliates create their own discount coupons?

Yes, Affiliate Pro allows you to create affiliate-specific coupon codes. These coupons can be used by the affiliate's referrals to get discounts, and the system will track these sales and attribute them to the correct affiliate.

### How are commissions calculated?

Commissions are calculated based on the order subtotal (excluding taxes and shipping) and the commission rate set for the affiliate or product category. The system automatically calculates the commission amount when an order is placed through an affiliate link.

## Technical Questions

### How do I update Affiliate Pro to the latest version?

To update Affiliate Pro:
1. Download the latest version from CodeCanyon
2. Extract the files
3. Replace the files in the `platform/plugins/affiliate-pro` directory
4. Clear the application cache using `php artisan cache:clear`

### Can I customize the affiliate dashboard?

Yes, you can customize the affiliate dashboard by modifying the view files located in the `platform/plugins/affiliate-pro/resources/views` directory. You can add or remove sections, change the layout, or modify the styling to match your brand.

### Is Affiliate Pro compatible with other Botble plugins?

Yes, Affiliate Pro is designed to work seamlessly with other Botble plugins, especially the E-commerce plugin which is required for Affiliate Pro to function.

### How does the traffic source tracking work?

Affiliate Pro tracks the source of traffic by capturing referrer information when a visitor clicks on an affiliate link. It can identify traffic from different sources such as social media platforms, search engines, direct visits, and referring websites. This data is stored and made available in detailed reports, allowing both affiliates and administrators to analyze which traffic sources are most effective.

### Can I integrate Affiliate Pro with external systems?

Yes, Affiliate Pro provides a RESTful API that allows you to integrate with external systems. You can access affiliate data, commission information, and other metrics programmatically. The plugin also supports webhooks for real-time notifications of important events like new registrations, commissions earned, and withdrawal requests.

## Troubleshooting

### Affiliate links are not tracking properly

If affiliate links are not tracking properly:
- Check if cookies are enabled in the visitor's browser
- Verify that the cookie lifetime is set correctly in the affiliate settings
- Ensure that the affiliate's account is active and approved
- Check for any JavaScript errors in the browser console

### Commissions are not being generated for orders

If commissions are not being generated for orders:
- Check if the order was placed through a valid affiliate link
- Verify that the cookie was still active when the order was placed
- Ensure that the products in the order are eligible for commissions
- Check if there are any exclusions or restrictions in place for the affiliate
