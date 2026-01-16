# Configuring Affiliate Pro

This guide will walk you through the process of configuring the Affiliate Pro plugin for your Botble E-commerce store.

## Accessing Affiliate Settings

1. Log in to your admin panel
2. Navigate to **Settings** > **E-commerce** > **Affiliate Settings**
3. You will see the Affiliate Pro configuration page

## Available Settings

### General Settings

- **Default Commission Percentage**: Set the default commission rate (e.g., 10%) that affiliates will earn on referred sales.
- **Cookie Lifetime (days)**: Define how long the affiliate tracking cookie remains active (e.g., 30 days).
- **Minimum Withdrawal Amount**: Set the minimum amount required for withdrawal requests (e.g., $50).
- **Enable Affiliate Registration**: Toggle to allow customers to register as affiliates.
- **Auto Approve Affiliates**: Toggle to automatically approve new affiliate registrations.
- **Auto Approve Commissions**: Toggle to automatically approve commissions when orders are completed.

### Commission Settings

- **Commission for Each Category**: Enable to set different commission rates based on product categories.
- **Category Commission Groups**: Create category groups with specific commission rates:
  - Set the commission percentage for each group
  - Select the categories that belong to each group
  - Add multiple category groups as needed
- **Product-Specific Commissions**: Set different commission rates for specific products, overriding the default and category-based rates.

### Withdrawal Settings

- **Available Payment Methods**: Select which payment methods are available for affiliate withdrawals:
  - Bank Transfer: For direct bank deposits
  - PayPal: For PayPal account transfers
  - Other: For alternative payment methods

- **Withdrawal Processing Time**: Set the estimated number of days for processing withdrawal requests.

### Marketing Materials

- **Enable Promotional Materials**: Toggle to enable/disable the promotional materials feature.
- **Manage Banners and Materials**: Upload and manage promotional banners and materials for affiliates to use.

### Email Notification Settings

- **Admin Notifications**: Configure email notifications for administrators:
  - New affiliate registrations
  - New withdrawal requests
  - Commission milestones
- **Affiliate Notifications**: Configure email notifications for affiliates:
  - Account approval status
  - Commission earned notifications
  - Withdrawal status updates
  - Performance digests
- **Email Templates**: Customize the content of notification emails sent to admins and affiliates.

### Promotional Banner Settings

Configure promotional banners that affiliates can use for marketing:

- **Banner 1 Settings**:
  - **Name**: Display name for the banner (e.g., "Banner 1 (468x60)")
  - **Image**: Upload banner image file
  - Recommended size: 468x60 pixels

- **Banner 2 Settings**:
  - **Name**: Display name for the second banner (e.g., "Banner 2 (728x90)")
  - **Image**: Upload second banner image
  - Recommended size: 728x90 pixels

- **Banner 3 Settings**:
  - **Name**: Display name for the third banner (e.g., "Banner 3 (300x250)")
  - **Image**: Upload third banner image
  - Recommended size: 300x250 pixels

### Short Link Settings

- **Enable Short Links**: Allow affiliates to create shortened tracking links for easier sharing
- Short links are automatically generated and tracked
- Useful for social media and messaging platforms

### API Integration

- **API Access**: Enable/disable API access for third-party integrations.
- **API Keys**: Generate and manage API keys for secure access.
- **Webhook Settings**: Configure webhooks for real-time data synchronization with external systems.

## Permissions

Affiliate Pro includes comprehensive permissions that can be assigned to user roles:

### Core Permissions
- **affiliate.index**: View affiliate list and basic information
- **affiliate.create**: Create new affiliate accounts
- **affiliate.edit**: Edit affiliate information and settings
- **affiliate.destroy**: Delete affiliate accounts

### Commission Permissions
- **affiliate.commissions.index**: View commission records
- **affiliate.commissions.approve**: Approve or reject commission payments

### Withdrawal Permissions
- **affiliate.withdrawals.index**: View withdrawal requests
- **affiliate.withdrawals.approve**: Approve or reject withdrawal requests

### Reporting Permissions
- **affiliate.reports**: Access to affiliate reports and analytics

### Coupon Permissions
- **affiliate.coupons.index**: View affiliate-specific coupons
- **affiliate.coupons.create**: Create affiliate coupons
- **affiliate.coupons.destroy**: Delete affiliate coupons

### Settings Permissions
- **affiliate.settings**: Access to affiliate configuration settings

To manage permissions:

1. Go to **Users** > **Roles**
2. Edit a role (e.g., "Staff", "Manager")
3. Find the "Affiliate" section in permissions
4. Check/uncheck permissions based on role requirements
5. Save changes

## Product-Level Configuration

### Setting Product Commission Rates (Admin)

1. Navigate to **Products** > **All Products**
2. Edit a product
3. Go to the **Affiliate Settings** section
4. Configure:
   - **Enable Affiliate**: Toggle affiliate program for this product
   - **Use Custom Commission**: Enable to set a custom commission rate
   - **Commission Percentage**: Override default/category commission rate

### Vendor Product Configuration (Marketplace)

When using the Marketplace plugin, vendors can also configure affiliate settings:

1. Log in to **Vendor Dashboard**
2. Navigate to **Products**
3. Edit a product
4. Find the **Affiliate Settings** section
5. Configure:
   - **Enable Affiliate**: Toggle affiliate program for this product
   - **Use Custom Commission**: Enable to set a custom commission rate
   - **Commission Percentage**: Set a product-specific commission rate

::: tip Vendor Control
Vendors have full control over affiliate settings for their products. This allows them to:
- Disable affiliate for low-margin products
- Set higher commissions for products they want to promote
- Balance profitability with affiliate marketing benefits
:::

### Category Commission Configuration

1. Go to **Settings** > **E-commerce** > **Affiliate Settings**
2. Enable **Commission for Each Category**
3. Add category groups:
   - Set commission percentage for the group
   - Select categories to include
   - Save configuration

## Applying Configuration Changes

### Saving Settings
1. After making changes, click the **"Save Changes"** button
2. Changes are applied immediately
3. Clear cache if needed: `php artisan cache:clear`

### Testing Configuration
1. Test affiliate registration process
2. Verify commission calculations
3. Test withdrawal process
4. Check email notifications
5. Validate tracking functionality

## Advanced Configuration

### Performance Optimization
- **Database Indexing**: Ensure proper indexing for large datasets
- **Cache Configuration**: Configure Redis/Memcached for better performance
- **CDN Setup**: Use CDN for promotional materials

### Security Settings
- **IP Restrictions**: Limit affiliate access by IP address
- **Fraud Detection**: Enable automatic fraud detection
- **Click Validation**: Validate legitimate clicks vs. bot traffic

## Troubleshooting Configuration Issues

### Common Issues and Solutions

**Commission calculations incorrect:**
- Verify commission percentages are set correctly (0-100)
- Check category-specific settings
- Ensure product-level overrides are configured properly

**Tracking not working:**
- Check cookie lifetime settings (must be positive integer)
- Verify middleware is properly installed
- Test with different browsers/devices

**Email notifications not sending:**
- Check email template configuration
- Verify SMTP settings in **Settings** > **Email**
- Test email functionality

**Withdrawal issues:**
- Check minimum withdrawal amount (must be positive number)
- Verify payment method configuration
- Ensure sufficient affiliate balance

**Permission errors:**
- Review role permissions carefully
- Check user role assignments
- Verify permission inheritance

**Performance issues:**
- Monitor database query performance
- Check server resource usage
- Consider caching optimization

If you continue to encounter configuration issues, please refer to the Troubleshooting section or contact our support team with specific error details and system information.

## Marketplace Configuration

When using Affiliate Pro with the Marketplace plugin, additional configuration options are available.

### Commission Deduction from Vendor Revenue

Affiliate commissions are automatically deducted from vendor revenue when orders are completed. The calculation is:

```
Vendor Revenue = Order Amount - Shipping - Tax - Payment Fee - Marketplace Fee - Affiliate Commission
```

This is handled automatically - no additional configuration is required.

### Revenue Tracking

The `mp_customer_revenues` table includes an `affiliate_commission` field that tracks the commission deducted from each vendor revenue record.

### Database Migration

If upgrading from an older version, run the migration to add the affiliate commission field:

```bash
php artisan migrate
```

### Hook for Custom Integration

Developers can customize the affiliate commission calculation using the filter:

```php
add_filter('marketplace_calculate_vendor_revenue', function (array $data, Order $order) {
    // $data contains: sub_amount, fee, affiliate_commission, amount
    // Modify as needed
    return $data;
}, 10, 2);
```

For detailed information on marketplace integration, see the [Marketplace Integration Guide](/affiliate-pro/marketplace-integration).
