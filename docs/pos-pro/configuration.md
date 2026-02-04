# Configuring POS Pro

This guide will walk you through the process of configuring the POS Pro plugin for your Botble E-commerce store.

## Accessing POS Settings

1. Log in to your admin panel
2. Navigate to **Settings** > **E-commerce** > **POS Settings**
3. You will see the POS Pro configuration page

## Available Settings

### General Settings

- **Enable POS**: Turn the POS system on or off. When disabled, the POS interface will not be accessible.

### Payment Methods

- **Active Payment Methods**: Select which payment methods are available in the POS interface:
  - Cash: For cash payments at the counter
  - Card: For credit/debit card payments
  - Other: For alternative payment methods

- **Default Payment Method**: Set the default payment method that will be pre-selected when processing orders. This must be one of the active payment methods.

### Discount Settings

- **Auto Apply Discount**: When enabled, discounts will be automatically applied to products when added to cart. This applies to products that have discounts configured in the product settings.

### Shipping Settings

- **Auto Add Shipping**: When enabled, shipping costs will be automatically added to orders based on the default shipping amount.
- **Default Shipping Amount**: Set the default shipping amount for POS orders. This amount will be used when auto-add shipping is enabled or when manually adding shipping.

### Customer Settings

- **Remember Customer Selection**: When enabled, the system will remember the last selected customer for new orders. This can be useful for stores that frequently serve the same customers.

### Receipt Settings

- **Print Receipt After Checkout**: When enabled, the print dialog will automatically open after successful checkout, allowing for immediate printing of receipts.
- **Receipt Width**: Choose the paper size for thermal printers (58mm, 80mm) or standard printers (A4).
- **Auto Print**: Automatically trigger the print dialog when the receipt page loads.
- **Show Logo/Store Info/VAT/Cashier/Customer**: Toggle what information appears on receipts.

For detailed printer setup instructions including USB and network thermal printers, see the [Printer Setup](usage-printer-setup.md) guide.

## Permissions

POS Pro includes the following permissions that can be assigned to user roles:

- **POS**: Access to the POS system
- **Create**: Ability to create orders through POS
- **Edit**: Ability to edit POS settings
- **Delete**: Ability to delete POS-related data
- **Settings**: Access to POS settings

To manage permissions:

1. Go to **Users** > **Roles**
2. Edit a role
3. Find the POS section in permissions
4. Check/uncheck permissions as needed
5. Save changes

## Applying Changes

After making changes to the POS settings:

1. Click the "Save Changes" button at the bottom of the settings page
2. The changes will be applied immediately
3. You may need to refresh the POS interface if you have it open in another tab

## Troubleshooting

If you encounter issues with the POS configuration:

1. Ensure that at least one payment method is active
2. Check that the default payment method is included in the active payment methods
3. Verify that the shipping amount is a valid number if auto-add shipping is enabled
4. Make sure that users have the appropriate permissions to access the POS system
