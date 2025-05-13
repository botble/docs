# Affiliate Pro Plugin - Usage Guide

This guide provides detailed instructions on how to configure and use the Affiliate Pro plugin for your e-commerce store.

## Table of Contents

1. [Admin Configuration](#admin-configuration)
2. [Managing Affiliates](#managing-affiliates)
3. [Commission Management](#commission-management)
4. [Withdrawal Management](#withdrawal-management)
5. [Marketing Tools](#marketing-tools)
6. [Reports and Analytics](#reports-and-analytics)
7. [Affiliate Dashboard Usage](#affiliate-dashboard-usage)

## Admin Configuration

### Accessing Plugin Settings

1. Log in to your admin dashboard
2. Navigate to **Settings > Affiliate Settings**
3. Configure the following settings:

### General Settings

- **Default Commission Percentage**: Set the default commission rate (e.g., 10%) that affiliates will earn on referred sales
- **Cookie Lifetime (days)**: Define how long the affiliate tracking cookie remains active (e.g., 30 days)
- **Minimum Withdrawal Amount**: Set the minimum amount required for withdrawal requests (e.g., $50)
- **Enable Affiliate Registration**: Toggle to allow customers to register as affiliates
- **Auto Approve Affiliates**: Toggle to automatically approve new affiliate registrations
- **Auto Approve Commissions**: Toggle to automatically approve commissions when orders are completed

### Category-Based Commission Settings

1. Enable **Commission for Each Category** to set different commission rates based on product categories
2. Click **Add New** to create a category group
3. Set the **Commission Percentage** for the group
4. Select the **Categories** that belong to this group
5. Add additional category groups as needed
6. Click **Save** to apply your settings

## Managing Affiliates

### Viewing Affiliates

1. Navigate to **Affiliate Pro > Affiliates**
2. View the list of all affiliate accounts with their status, balance, and performance metrics

### Approving Affiliate Applications

1. Navigate to **Affiliate Pro > Pending Requests**
2. Review pending affiliate applications
3. Click **Approve** to accept an application or **Reject** to decline
4. Approved affiliates will receive an email notification and can begin promoting your products

### Editing Affiliate Details

1. Navigate to **Affiliate Pro > Affiliates**
2. Click on an affiliate's name to view their details
3. Edit their information as needed
4. Click **Save** to update the affiliate's record

## Commission Management

### Viewing Commissions

1. Navigate to **Affiliate Pro > Commissions**
2. View all commission transactions with details on amount, order, and status

### Approving Commissions

1. Navigate to **Affiliate Pro > Commissions**
2. Filter for commissions with "Pending" status
3. Click on a commission to view details
4. Click **Approve** to approve the commission
   - This will add the commission amount to the affiliate's balance
   - A transaction record will be created
   - The affiliate will be notified

### Rejecting Commissions

1. Navigate to **Affiliate Pro > Commissions**
2. Click on a pending commission
3. Click **Reject** if the commission doesn't meet your criteria
4. Provide a reason for rejection
5. The affiliate will be notified of the rejection

## Withdrawal Management

### Viewing Withdrawal Requests

1. Navigate to **Affiliate Pro > Withdrawals**
2. View all withdrawal requests with their status and details

### Processing Withdrawals

1. Click on a pending withdrawal request
2. Review the payment details provided by the affiliate
3. Click **Approve** to approve the withdrawal
   - This will deduct the amount from the affiliate's balance
   - The affiliate's total withdrawn amount will be updated
   - A transaction record will be created
   - The affiliate will be notified

### Rejecting Withdrawals

1. Click on a pending withdrawal request
2. Click **Reject** if you need to decline the request
3. Provide a reason for rejection
4. The affiliate will be notified and the amount will remain in their balance

## Marketing Tools

### Managing Affiliate Coupons

1. Navigate to **Affiliate Pro > Coupons**
2. View all affiliate discount coupons
3. Click **Create** to generate a new coupon:
   - Select an affiliate
   - Set the discount amount and type (percentage or fixed)
   - Set an expiration date (optional)
   - Add a description
4. Click **Save** to create the coupon
5. The coupon will be available in the affiliate's dashboard

### Promotional Materials

1. Navigate to **Affiliate Pro > Materials**
2. Add promotional banners and materials for affiliates to use
3. Upload banner images and set destination URLs
4. These materials will be available in the affiliate's dashboard

## Reports and Analytics

### Viewing Performance Reports

1. Navigate to **Affiliate Pro > Reports**
2. View comprehensive reports on:
   - Top performing affiliates
   - Commission trends
   - Conversion rates
   - Traffic sources
   - Product performance
   - Referral paths
   - Geographic distribution

### Traffic Source Analysis

1. Navigate to **Affiliate Pro > Reports > Traffic Sources**
2. View detailed breakdowns of:
   - Referring websites
   - Social media platforms
   - Search engines
   - Direct traffic
   - Email campaigns
3. Filter data by date range, affiliate, or campaign
4. Export reports for further analysis

### Dashboard Widgets

1. The admin dashboard includes widgets showing:
   - Recent affiliate registrations
   - Recent commissions
   - Recent withdrawals
   - Top performing affiliates

## Affiliate Dashboard Usage

### For Affiliates: Getting Started

1. Log in to your customer account
2. Navigate to **Affiliate Dashboard**
3. If not already an affiliate, click **Register as Affiliate**
4. Complete the registration form
5. Wait for approval (if auto-approval is not enabled)

### Generating Affiliate Links

1. From the affiliate dashboard, locate the **Your Affiliate Link** section
2. Copy your main affiliate link to share on websites, social media, or emails
3. Use your affiliate code in offline promotions

### Creating Short Links

1. Navigate to **Short Links** in your affiliate dashboard
2. Click **Create Short Link**
3. Choose a link type:
   - Product link: Select a specific product to promote
   - Homepage link: Create a link to the store homepage
   - Custom URL: Enter any URL on the store
4. Add a title for your reference
5. Click **Create** to generate the short link
6. Copy and share the generated link

### Creating and Managing Coupons

1. Navigate to **Coupons** in your affiliate dashboard
2. View your existing coupons
3. Share coupon codes with potential customers
4. Track coupon usage and performance

### Tracking Performance

1. The dashboard homepage shows key metrics:
   - Current balance
   - Total commission earned
   - Total withdrawn
   - This month's commission
   - Click statistics
   - Conversion rate

### Requesting Withdrawals

1. Navigate to **Withdrawals** in your affiliate dashboard
2. Click **Request Withdrawal**
3. Enter the amount you wish to withdraw
   - Must meet the minimum withdrawal amount
4. Select your preferred payment method
5. Enter your payment details
6. Submit your request
7. Track the status of your withdrawal requests

### Viewing Commission History

1. Navigate to **Commissions** in your affiliate dashboard
2. View all your commission transactions
3. Check the status of each commission
4. See details about the associated orders

### Using Promotional Materials

1. Navigate to **Promotional Materials** in your affiliate dashboard
2. Browse available banners and marketing materials
3. Copy the HTML code for banners
4. Implement these materials on your website or marketing channels

## Email Notifications

### Managing Email Templates

1. Navigate to **Affiliate Pro > Settings > Email Templates**
2. View and edit available email templates:
   - Affiliate registration notification
   - Affiliate approval notification
   - Commission earned notification
   - Withdrawal status notification
   - Performance digest
3. Customize the content, subject, and formatting of each template
4. Use available variables to personalize emails

### Configuring Notification Settings

1. Navigate to **Settings > Affiliate Settings > Notifications**
2. Enable/disable different types of notifications:
   - Admin notifications
   - Affiliate notifications
3. Set frequency for digest emails
4. Configure email sender information

## API Integration

### Accessing API Documentation

1. Navigate to **Affiliate Pro > API > Documentation**
2. View available API endpoints and methods
3. Read documentation on request/response formats
4. Test API calls directly from the documentation interface

### Managing API Keys

1. Navigate to **Affiliate Pro > API > Keys**
2. Generate new API keys for third-party integrations
3. View existing API keys and their permissions
4. Revoke API keys that are no longer needed

### Configuring Webhooks

1. Navigate to **Affiliate Pro > API > Webhooks**
2. Create new webhook endpoints for real-time notifications
3. Select events that trigger webhook calls:
   - New affiliate registration
   - Commission earned
   - Withdrawal requested/processed
4. Test webhook delivery to ensure proper integration

## Best Practices for Affiliates

1. Use short links for cleaner, more professional-looking URLs
2. Create product-specific links for targeted promotions
3. Offer exclusive coupons to incentivize purchases
4. Regularly check your dashboard for performance insights
5. Optimize your marketing based on conversion data
6. Request withdrawals only when you've accumulated a significant amount
7. Use the provided promotional materials for professional marketing
8. Track which traffic sources convert best and focus your efforts there
9. Utilize UTM parameters to better understand your audience
10. Stay informed through email notifications about your performance
