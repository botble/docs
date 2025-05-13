# Configuring Affiliate Pro

This guide will walk you through the process of configuring the Affiliate Pro plugin for your Botble E-commerce store.

## Accessing Affiliate Settings

1. Log in to your admin panel
2. Navigate to **Settings** > **Affiliate Settings**
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

### API Integration

- **API Access**: Enable/disable API access for third-party integrations.
- **API Keys**: Generate and manage API keys for secure access.
- **Webhook Settings**: Configure webhooks for real-time data synchronization with external systems.

## Permissions

Affiliate Pro includes the following permissions that can be assigned to user roles:

- **Affiliate**: Access to the affiliate management system
- **Create**: Ability to create affiliates and related data
- **Edit**: Ability to edit affiliate information and settings
- **Delete**: Ability to delete affiliate-related data
- **Settings**: Access to affiliate settings

To manage permissions:

1. Go to **Users** > **Roles**
2. Edit a role
3. Find the Affiliate Pro section in permissions
4. Check/uncheck permissions as needed
5. Save changes

## Applying Changes

After making changes to the Affiliate settings:

1. Click the "Save Changes" button at the bottom of the settings page
2. The changes will be applied immediately
3. You may need to refresh the affiliate dashboard if you have it open in another tab

## Troubleshooting

If you encounter issues with the Affiliate Pro configuration:

1. Ensure that the default commission percentage is a valid number between 0 and 100
2. Check that the cookie lifetime is a positive integer
3. Verify that the minimum withdrawal amount is a valid number
4. Make sure that users have the appropriate permissions to access the affiliate system
