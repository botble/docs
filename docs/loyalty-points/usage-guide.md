# Loyalty Points Plugin - Usage Guide

This guide provides detailed instructions on how to use the Loyalty Points plugin for your e-commerce store.

## Table of Contents

1. [Admin Dashboard Overview](#admin-dashboard-overview)
2. [Managing Customer Points](#managing-customer-points)
3. [Managing Member Levels](#managing-member-levels)
4. [Viewing Transactions](#viewing-transactions)
5. [Reports and Analytics](#reports-and-analytics)
6. [Customer Experience](#customer-experience)
7. [Checkout Integration](#checkout-integration)

## Admin Dashboard Overview

### Accessing Loyalty Points

1. Log in to your admin dashboard
2. Click on **Loyalty Points** in the main navigation
3. You'll see an overview of your loyalty program

### Dashboard Widgets

The main dashboard displays:

- **Total Customers**: Number of customers with points
- **Total Points Earned**: Lifetime points issued
- **Total Points Redeemed**: Points used for discounts
- **Points in Circulation**: Current unredeemed points

## Managing Customer Points

### Viewing Customer Points

1. Navigate to **Loyalty Points** > **Customer Points**
2. View all customers with their:
   - Current balance
   - Lifetime points earned
   - Current member level
   - Last activity date

### Searching and Filtering

- Use the search box to find specific customers by name or email
- Filter by member level
- Sort by balance, lifetime points, or activity date

### Viewing Customer Details

1. Click on a customer's name to view details
2. See complete information:
   - Current points balance
   - Lifetime points earned
   - Total points redeemed
   - Current member level
   - Transaction history

### Adjusting Customer Points

To manually add or deduct points:

1. Navigate to **Loyalty Points** > **Customer Points**
2. Find the customer you want to adjust
3. Click **Adjust Points** button
4. Fill in the adjustment form:
   - **Adjustment Type**: Add Points or Deduct Points
   - **Points Amount**: Number of points to add/deduct
   - **Note**: Reason for adjustment (optional but recommended)
5. Click **Save** to apply the adjustment

![Admin Order Detail](https://botble.com/storage/envato/loyalty-points/loyalty-points-info-in-admin-order-detail-page.png)

::: tip When to Adjust Points
Common reasons for manual adjustments:
- Customer service goodwill gestures
- Correcting errors
- Promotional bonuses
- Resolving disputes
:::

## Managing Member Levels

### Viewing Member Levels

1. Navigate to **Loyalty Points** > **Member Levels**
2. View all configured tiers with their settings

### Creating a New Level

1. Click **Create** button
2. Fill in the level details:
   - **Name**: Display name (e.g., "Gold Member")
   - **Minimum Points**: Lifetime points to reach this tier
   - **Maximum Points**: Upper limit (empty for top tier)
   - **Earning Rate**: Points multiplier (e.g., 1.5 = 50% bonus)
   - **Benefits**: List benefits, one per line
   - **Status**: Enable or disable

3. Click **Save** to create the level

### Editing Member Levels

1. Click on the level name or **Edit** button
2. Modify the settings as needed
3. Click **Save** to update

### Deleting Member Levels

1. Click the **Delete** button on the level
2. Confirm the deletion

::: warning
Deleting a level will not affect customers' points, but they may be reassigned to a different tier based on remaining levels.
:::

### Best Practices for Member Levels

1. **Clear Progression**: Make tier thresholds achievable but rewarding
2. **Meaningful Benefits**: Offer real value at each tier
3. **No Gaps**: Ensure point ranges don't overlap or have gaps
4. **Communication**: Clearly display tier benefits to customers

## Viewing Transactions

### Transaction List

1. Navigate to **Loyalty Points** > **Transactions**
2. View all point transactions with:
   - Customer name
   - Transaction type
   - Points amount
   - Description
   - Date/time

### Transaction Types

| Type | Description |
|------|-------------|
| **Earned** | Points earned from purchases |
| **Redeemed** | Points used for discounts |
| **Adjusted** | Manual admin adjustments |
| **Reversed** | Points taken back from cancelled orders |
| **Expired** | Points removed due to expiration |
| **Bonus** | Points from activities (registration, reviews, etc.) |

### Filtering Transactions

- Filter by transaction type
- Filter by date range
- Search by customer name
- Sort by date, amount, or type

## Reports and Analytics

### Accessing Reports

1. Navigate to **Loyalty Points** > **Reports**
2. View comprehensive program analytics

![Reports Page](https://botble.com/storage/envato/loyalty-points/loyalty-points-report-page.png)

### Available Metrics

**Overview Statistics:**
- Total customers with points
- Total points earned (all time)
- Total points redeemed (all time)
- Points currently in circulation
- Redemption rate percentage
- Average points per customer

**Charts and Graphs:**
- Points activity over time (last 30 days)
- Points earned vs redeemed comparison
- Member level distribution

**Top Customers:**
- Customers with highest current balance
- Customers with highest lifetime points
- Most active point redeemers

**Recent Activity:**
- Latest transactions
- Recent point redemptions
- New member level achievements

### Using Reports for Optimization

1. **Low Redemption Rate**: Consider reminding customers about their points or lowering redemption thresholds
2. **High Expiry Rate**: Points may be expiring too quickly or customers aren't engaged
3. **Few High-Tier Members**: Adjust tier thresholds to make progression more achievable

## Customer Experience

### Customer Dashboard

Customers can access their loyalty points information from their account dashboard:

![Customer Dashboard](https://botble.com/storage/envato/loyalty-points/loyalty-points-in-customer-dashboard.png)

**Dashboard Features:**
- Current points balance
- Lifetime points earned
- Current member level with badge
- Benefits of current tier
- Progress to next tier
- Complete transaction history
- How to earn points guide
- How to redeem points guide

### Customer Order Detail

After placing an order, customers can see points information:

![Customer Order Detail](https://botble.com/storage/envato/loyalty-points/loyalty-points-info-in-customer-order-detail-page.png)

- Points earned from the order
- Points redeemed (if any)
- Discount applied from points

### Product Page Display

On product pages, customers see:

![Product Detail Page](https://botble.com/storage/envato/loyalty-points/loyalty-points-info-at-product-detail-page.png)

- Points they can earn from purchasing
- Maximum discount available with their points

## Checkout Integration

### Points Display at Checkout

During checkout, the system displays:

1. **Points to Earn**: How many points the customer will earn from this order
2. **Current Balance**: Customer's available points
3. **Redemption Option**: If customer has points, option to apply them

### Redeeming Points

![Redeem Points at Checkout](https://botble.com/storage/envato/loyalty-points/redeem-points-at-the-checkout-page.png)

Customers can redeem points at checkout:

1. View available points balance
2. Enter points amount to redeem, or use quick buttons:
   - 25% of available points
   - 50% of available points
   - 75% of available points
   - 100% of available points
3. System validates against:
   - Minimum redeemable points
   - Maximum redeemable points
   - Maximum discount percentage
4. Discount is applied to order total

![Points Applied](https://botble.com/storage/envato/loyalty-points/points-applied-and-discounted-order-amount.png)

### Order Confirmation

After checkout, the confirmation page shows:

![Checkout Success](https://botble.com/storage/envato/loyalty-points/points-info-at-checkout-success-page.png)

- Points earned from the order
- Points redeemed (if any)
- New points balance

## Automatic Processes

### Points Earning

Points are automatically awarded when:
- Orders reach eligible status (configurable)
- Customers complete activities (registration, reviews)
- Referred customers make first purchase
- Customer's birthday occurs

### Points Reversal

Points are automatically reversed when:
- Orders are cancelled
- Orders are refunded
- Fraudulent activity is detected

### Points Expiry

Points expire automatically when:
- Expiry period is configured (not set to 0)
- Points have been held beyond the expiry period
- Laravel scheduler is running

### Level Upgrades

Customer tiers are automatically updated when:
- Lifetime points increase past tier thresholds
- Member levels are reconfigured

## Email Notifications

The plugin can send notifications for:

- Points earned from orders
- Points about to expire
- Level upgrades
- Promotional point bonuses

Configure email templates in **Settings** > **Email Templates**.

## Best Practices

### For Store Owners

1. **Set Appropriate Rates**: Balance earning/redemption rates to be attractive but sustainable
2. **Communicate Benefits**: Display points information prominently
3. **Create Urgency**: Use expiry periods to encourage redemption
4. **Offer Bonus Opportunities**: Use bonus points to drive specific behaviors
5. **Monitor Analytics**: Regularly review reports to optimize the program

### For Customer Engagement

1. **Welcome Bonus**: Offer registration points to encourage sign-ups
2. **Review Incentives**: Award points for reviews to build social proof
3. **Birthday Rewards**: Make customers feel special with birthday points
4. **Tier Benefits**: Create compelling reasons to reach higher tiers
5. **Reminder Emails**: Notify customers of expiring points

### Program Optimization

1. **Track Redemption Rate**: Healthy programs have 20-40% redemption
2. **Monitor Customer Retention**: Compare repeat purchase rates
3. **Analyze Tier Distribution**: Ensure progression is achievable
4. **Test Point Values**: A/B test different earning/redemption rates
5. **Gather Feedback**: Ask customers about the program

## Troubleshooting Common Issues

### Points Not Appearing for Customer

1. Verify customer is logged in
2. Check order has reached eligible status
3. Verify loyalty program is enabled
4. Clear cache if recently configured

### Redemption Errors at Checkout

1. Check minimum points requirement
2. Verify maximum discount percentage
3. Ensure customer has sufficient balance
4. Check for JavaScript errors

### Member Level Not Updating

1. Tiers are based on lifetime points, not current balance
2. Verify tier thresholds don't overlap
3. Check tier status is enabled
4. Clear cache after configuration changes

For more detailed troubleshooting, see the [Troubleshooting](/loyalty-points/troubleshooting) section.
