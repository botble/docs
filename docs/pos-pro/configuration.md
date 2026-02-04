# Configuring POS Pro

This guide covers all configuration options available in the POS Pro plugin.

## Accessing POS Settings

1. Log in to your admin panel
2. Navigate to **POS** > **Settings**
3. You will see the POS Pro configuration page with multiple sections

## General Settings

### Basic Configuration

| Setting | Description |
|---------|-------------|
| **Enable POS** | Turn the POS system on or off. When disabled, the POS interface will not be accessible. |
| **Active Payment Methods** | Select which payment methods are available in the POS interface (Cash, Card, Bank Transfer, Other). |
| **Default Payment Method** | Set the default payment method pre-selected when processing orders. Must be one of the active payment methods. |

### Automation Settings

| Setting | Description |
|---------|-------------|
| **Auto Apply Discount** | When enabled, product discounts are automatically applied when adding items to cart. |
| **Auto Add Shipping** | When enabled, shipping costs are automatically added to orders based on the default amount. |
| **Default Shipping Amount** | The default shipping amount for POS orders when auto-add shipping is enabled. |

### Behavior Settings

| Setting | Description |
|---------|-------------|
| **Remember Customer Selection** | When enabled, the system remembers the last selected customer for new orders. |
| **Require Open Register** | When enabled, users must open a cash register before processing orders. |

## Receipt & Printer Settings

Configure how receipts are generated and printed.

| Setting | Description |
|---------|-------------|
| **Print Receipt After Checkout** | Automatically open print dialog after successful checkout. |
| **Receipt Width** | Paper size for thermal printers: 58mm (compact), 80mm (standard), or A4 (full page). |
| **Auto Print Thermal** | Automatically trigger print when receipt page loads. |
| **Show Logo** | Display store logo on receipts. |
| **Show Store Info** | Display store address and contact information on receipts. |
| **Show VAT** | Display tax breakdown on receipts. |
| **Show Cashier** | Display the cashier name who processed the order. |
| **Show Customer** | Display customer name on receipts. |
| **Receipt Footer Text** | Custom message displayed at the bottom of receipts. |

For detailed printer setup instructions, see the [Printer Setup](usage-printer-setup.md) guide.

## Refund Settings

Configure refund processing behavior.

| Setting | Description |
|---------|-------------|
| **Enable POS Refunds** | Turn refund functionality on or off. |
| **Approval Threshold** | Refund amounts above this value require manager approval. Set to 0 to disable. |
| **Refund Window (Days)** | Number of days after purchase that refunds are allowed. Set to 0 for unlimited. |
| **Auto Restock Items** | Automatically return refunded items to inventory. |

For detailed refund instructions, see the [Refunds](usage-refunds.md) guide.

## Stripe Terminal Settings

Configure Stripe Terminal for card reader integration. These settings only appear if the Stripe plugin is active.

| Setting | Description |
|---------|-------------|
| **Enable Stripe Terminal** | Turn card reader integration on or off. |
| **Stripe Secret Key** | Your Stripe secret API key for Terminal operations. |
| **Stripe Location ID** | Optional location ID for your Terminal readers. |
| **Webhook Signing Secret** | Secret for validating Stripe webhook events. |

For detailed Stripe Terminal setup, see the [Stripe Terminal](usage-stripe-terminal.md) guide.

## Marketplace Settings

These settings only appear if the Marketplace plugin is active.

| Setting | Description |
|---------|-------------|
| **Separate Orders by Vendor** | When enabled, orders with products from multiple vendors are split into separate orders. |
| **Enable POS for Vendors** | Allow vendors to access POS from their dashboard. |
| **Enable Register History for Vendors** | Allow vendors to view their cash register shift history. |
| **Enable Refunds for Vendors** | Allow vendors to process refunds for their orders. |
| **Enable Stripe Terminal for Vendors** | Allow vendors to use card readers (requires Stripe Terminal enabled). |

For detailed marketplace setup, see the [Marketplace Integration](usage-marketplace.md) guide.

## Permissions

POS Pro includes permissions that can be assigned to user roles:

| Permission | Description |
|------------|-------------|
| **POS Pro** | Main permission group |
| **POS** | Access to the main POS interface |
| **Reports** | Access to POS analytics and reports |
| **Settings** | Access to POS configuration |
| **Devices** | Manage printer/device configurations |
| **Registers** | Manage cash register operations |
| **Orders** | View POS orders |
| **Refunds** | Process refunds |
| **Approve High-Value Refunds** | Approve refunds above the approval threshold |

### Managing Permissions

1. Go to **Users** > **Roles**
2. Edit a role
3. Find the **POS Pro** section in permissions
4. Check/uncheck permissions as needed
5. Save changes

## Device Management

Configure network printers and local devices.

1. Go to **POS** > **Devices**
2. Click **Create** to add a new device
3. Configure:
   - **User**: Select which user this device belongs to
   - **Device IP**: Local network IP address (e.g., 192.168.1.100)
   - **Device Name**: Friendly name for the device
   - **Is Active**: Enable or disable the device

For detailed device setup, see the [Printer Setup](usage-printer-setup.md) guide.

## Applying Changes

After making changes to the POS settings:

1. Click the **Save Settings** button at the bottom of the page
2. Changes are applied immediately
3. Refresh the POS interface if you have it open in another tab

## Troubleshooting Configuration Issues

| Problem | Solution |
|---------|----------|
| Payment methods not showing | Ensure at least one payment method is active |
| Default payment not working | Verify default is included in active payment methods |
| Shipping not adding | Check shipping amount is a valid number |
| Users can't access POS | Verify users have the appropriate POS permissions |
| Refunds disabled | Enable refunds in settings and assign refund permissions |
| Card reader not working | Check Stripe Terminal configuration and API keys |
