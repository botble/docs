# Frequently Asked Questions

## General Questions

### What is Loyalty Points?

Loyalty Points is a comprehensive loyalty program and rewards system designed for e-commerce stores built with Botble CMS. It enables store owners to create and manage a loyalty program where customers earn points from purchases and activities, then redeem them for discounts at checkout.

### What are the system requirements for Loyalty Points?

- Botble CMS version 7.5.0 or higher
- PHP version 8.2 or higher
- Active E-commerce plugin (required)
- MySQL 5.7+ or MariaDB 10.3+

### Does this plugin work with WooCommerce, Shopify, or other platforms?

No. Loyalty Points is specifically designed to work **only with Botble e-commerce scripts** (MartFury, Shofy, Nest, Ninico, Farmart, Wowy, etc.). It is not compatible with other e-commerce platforms like WooCommerce, Shopify, Magento, or OpenCart.

### How does the points system work?

Customers earn points when they make purchases. The earning rate is configurable (e.g., 1 point per $1 spent). Customers can then redeem their accumulated points for discounts on future purchases.

## Points Earning

### How do customers earn points?

Customers can earn points through:
- **Purchases**: Points awarded based on order total
- **Registration**: Welcome bonus for new accounts
- **Product Reviews**: Points for writing reviews
- **Photo Reviews**: Extra points for reviews with photos
- **Referrals**: Points when referred friends make purchases
- **Birthdays**: Annual birthday bonus

### When are points awarded for purchases?

Points are awarded when orders reach the configured eligible status. This is typically when orders are "Completed" or "Delivered" - you can configure this in the settings.

### Can I set different earning rates for different products?

Currently, the earning rate is applied uniformly based on order total. However, with member levels, different customer tiers can earn at different rates (using earning multipliers).

### Are points awarded on the full order amount?

Points are typically calculated on the order subtotal (product prices), excluding taxes and shipping costs. This prevents customers from earning points on non-product charges.

## Points Redemption

### How do customers redeem points?

Customers can redeem points at checkout. They'll see their available balance and can enter the number of points they want to apply. The system converts points to a discount and applies it to the order total.

### Can I limit how many points customers can redeem?

Yes, you can set:
- **Minimum redeemable points**: Minimum points required per redemption
- **Maximum redeemable points**: Maximum points allowed per order
- **Maximum redemption percentage**: Cap on what percentage of the order can be paid with points

### What happens if an order is cancelled?

If an order is cancelled, any points that were awarded for that order are automatically reversed (deducted) from the customer's balance. Points they redeemed remain returned to their balance.

## Member Levels

### What are member levels?

Member levels (or tiers) allow you to create a tiered loyalty program. Customers progress through levels based on their lifetime points, with each level offering better benefits like higher earning rates.

### How do customers move up levels?

Customers automatically progress to higher levels when their lifetime points (total points ever earned) reach the tier threshold. This happens automatically after each transaction.

### Do customers lose their level if they redeem points?

No. Levels are based on **lifetime points** (total ever earned), not current balance. A customer who has earned 5,000 points will stay at that tier level even if they redeem all their points.

### Can I create unlimited member levels?

Yes, you can create as many levels as you need. However, we recommend keeping it simple with 3-5 levels for easier customer understanding.

## Points Expiry

### Do points expire?

Points can be configured to expire after a set period (in months). You can also set points to never expire by setting the expiry period to 0.

### When do points expire?

If configured, points expire after the specified number of months from when they were earned. The expiry process runs automatically via Laravel's scheduled tasks.

### Are customers notified before points expire?

The system can be configured to send reminder emails before points expire. Make sure your email system is properly configured.

### Can I extend or restore expired points?

Expired points cannot be automatically restored. However, admins can manually add points as a goodwill gesture using the point adjustment feature.

## Technical Questions

### How do I update Loyalty Points to the latest version?

To update Loyalty Points:
1. Download the latest version from CodeCanyon
2. Extract the files
3. Replace the files in the `platform/plugins/loyalty-points` directory
4. Clear the application cache using `php artisan cache:clear`

See the [Upgrade Guide](/loyalty-points/upgrade) for detailed instructions.

### Can I customize the customer dashboard?

Yes, you can customize the views by modifying the template files in your theme. The plugin uses standard Blade templates that can be overridden in your theme's views directory.

### Is Loyalty Points compatible with other Botble plugins?

Yes, Loyalty Points is designed to work seamlessly with other Botble plugins, especially the E-commerce plugin which is required for it to function.

### Does it support multiple currencies?

Yes, Loyalty Points works with whatever currency your store uses. The points system is currency-agnostic - you configure how many points equal your store's base currency.

### Does it support multiple languages?

Yes, Loyalty Points includes translations for 30+ languages. You can also add your own translations or customize existing ones from the admin panel.

## Troubleshooting

### Points are not being awarded for orders

If points are not being generated:
- Check if the loyalty program is enabled in settings
- Verify the order has reached an eligible status (e.g., Completed)
- Ensure the customer was logged in during checkout
- Check if the earning rate is properly configured
- Clear cache and try again

### Customers can't redeem points at checkout

If customers can't redeem points:
- Verify the customer has sufficient points balance
- Check minimum redeemable points setting
- Verify redemption doesn't exceed maximum limits
- Ensure maximum percentage limit isn't being hit
- Check for JavaScript errors on the checkout page

### Member levels are not updating

If levels aren't updating correctly:
- Remember levels are based on lifetime points, not current balance
- Verify tier thresholds don't overlap or have gaps
- Check that all tiers have status enabled
- Clear cache after making tier configuration changes

### Birthday points are not awarded

If birthday points aren't working:
- Ensure the birthday bonus is configured (not set to 0)
- Verify customers have birthdays set in their profiles
- Check that Laravel's scheduler is running
- Verify the birthday command is scheduled

### Points are showing incorrectly

If point calculations seem wrong:
- Double-check earning rate configuration
- Verify member level multipliers if applicable
- Check for any manual adjustments in transaction history
- Verify no duplicate transactions occurred

For more detailed troubleshooting, see the [Troubleshooting Guide](/loyalty-points/troubleshooting).
