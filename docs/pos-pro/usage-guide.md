# Using POS Pro

This guide covers the day-to-day operations of using POS Pro for your store.

## Accessing the POS Interface

1. Log in to your admin panel
2. Click on the **POS** menu item in the main navigation
3. The POS interface will load with products on the left and cart on the right

## Interface Overview

The POS interface is divided into two main sections:

- **Left Side**: Product catalog with search functionality
- **Right Side**: Shopping cart and checkout options

### Top Navigation

- **Language Switcher**: Change interface language
- **Currency Switcher**: Change display currency
- **Fullscreen Button**: Toggle full screen mode
- **Customer Display**: Open customer-facing display in new window

## Starting Your Shift

If your store requires open registers (configured in settings):

1. Click **Open Register** when prompted
2. Enter the starting cash amount in the drawer
3. Click **Open** to begin your shift

See [Cash Register Management](usage-cash-register.md) for detailed register operations.

## Product Management

### Browsing Products

1. Products are displayed in a grid layout with images, prices, and stock information
2. Scroll down to load more products (infinite scrolling)
3. Use the search bar to find products by name, SKU, or barcode
4. Use the barcode scanner to quickly find products (see [Barcode Scanner](usage-barcode-scanner.md))

### Adding Products to Cart

**Simple Products:**
1. Click the **Add to Cart** button on the product

**Products with Variations:**
1. Click the **Select Options** button
2. Choose the desired attributes (size, color, etc.)
3. Set the quantity
4. Click **Add to Cart**

## Cart Management

### Viewing the Cart

The cart displays:
- Product name and image
- Unit price
- Quantity controls
- Subtotal for each item
- Cart total with tax and shipping

### Modifying Cart Items

| Action | How To |
|--------|--------|
| Adjust Quantity | Use the +/- buttons next to each product |
| Remove Item | Click the trash icon next to the product |
| Clear Cart | Click the **Clear Cart** button to remove all items |

### Applying Discounts and Coupons

**Apply Coupon:**
1. Click **Have a coupon?**
2. Enter the coupon code
3. Click **Apply**

**Add Manual Discount:**
1. Click the discount icon
2. Choose discount type (fixed amount or percentage)
3. Enter the discount value
4. Optionally add a description/reason
5. Click **Apply Discount**

### Setting Shipping

1. Click the shipping icon
2. Enter shipping amount
3. Click **Update Shipping**

## Working with Multiple Orders (Order Slots)

POS Pro allows you to work on up to 10 orders simultaneously.

### Creating a New Order Slot

1. Click the **+** button in the order tabs area
2. A new empty order is created
3. The new order becomes active

### Switching Between Orders

1. Click on any order tab to switch to it
2. Each order maintains its own cart, customer, and payment state

### Closing an Order Slot

1. Switch to the order you want to close
2. Click the **X** on the order tab
3. Confirm if prompted (clears the cart)

::: tip
Use order slots to park a sale while helping another customer, then return to complete it later.
:::

## Customer Management

### Selecting a Customer

1. Use the customer dropdown to search for existing customers
2. Select a customer from the results
3. The customer is assigned to the current order

### Creating a New Customer

1. Click **Create Customer**
2. Fill in the required information:
   - Name
   - Email
   - Phone
   - Address (optional)
3. Click **Save**

### Managing Customer Addresses

1. Select a customer
2. Choose from their existing addresses in the dropdown
3. Or click **Add Address** to enter a new one
4. The selected address will be used for the order

## Payment Processing

### Single Payment Method

1. Select a payment method (Cash, Card, Bank Transfer, etc.)
2. Click **Complete Order**
3. For card payments, follow the card reader prompts
4. For bank transfers, scan the QR code

### Split Payments (Multi-Tender)

POS Pro supports splitting payment across multiple methods:

1. Click **Split Payment**
2. Enter the amount for the first payment method
3. Click **Add Tender**
4. Repeat for additional payment methods
5. Ensure the total equals the order amount
6. Click **Complete Order**

### Payment Methods

| Method | Description |
|--------|-------------|
| **Cash** | Direct cash payment from customer |
| **Card** | Credit/debit card via Stripe Terminal |
| **Bank Transfer** | QR code for bank transfer |
| **Gift Card** | Gift card tender |
| **Store Credit** | Apply customer store credit |
| **Check** | Accept check payment |

## Checkout Process

1. Add products to the cart
2. Select or create a customer
3. Choose a payment method
4. Add any order notes if needed
5. Review the order summary
6. Click **Complete Order**

### After Checkout

After completing an order:

1. A success message appears with the order number
2. Click **Print Receipt** to print (or auto-prints if configured)
3. Click **New Order** to start a fresh order

## Printing Receipts

### Automatic Printing

If **Auto Print** is enabled in settings, the print dialog opens automatically after checkout.

### Manual Printing

1. Click **Print Receipt** on the success screen
2. Or go to **POS** > **Orders**
3. Find the order and click the print icon

### Receipt Content

The receipt includes:
- Store logo (if enabled)
- Store information (if enabled)
- Order number and date
- Cashier name (if enabled)
- Customer details (if enabled)
- List of purchased items
- Subtotal, tax, discounts
- Shipping (if applicable)
- Total amount
- Payment method
- Custom footer text

For printer setup instructions, see [Printer Setup](usage-printer-setup.md).

## Additional Features

### Barcode Scanner

1. Click the barcode icon next to the search bar to activate the camera scanner
2. Scan product barcodes to quickly find and add products
3. Both camera-based scanning and hardware barcode scanners are supported
4. See [Barcode Scanner](usage-barcode-scanner.md) for detailed instructions

### Full Screen Mode

1. Click the **Fullscreen** button in the top navigation
2. The POS interface expands to fill the entire screen
3. Click **Exit Fullscreen** or press Escape to return to normal view

### Language Switching

If your store supports multiple languages:

1. Click the language icon in the top navigation
2. Select your preferred language
3. The interface updates to the selected language

### Currency Switching

If your store supports multiple currencies:

1. Click the currency icon in the top navigation
2. Select the desired currency
3. Prices update to the selected currency

### Customer Display

Open a separate window for customer-facing display:

1. Click **Customer Display** in the top navigation
2. A new window opens showing the cart
3. Position this on a customer-facing monitor
4. The display updates in real-time as items are added

## End of Shift

When ending your shift:

1. Go to the register section
2. Click **Close Register**
3. Count your cash drawer
4. Enter the actual cash amount
5. Review any variance
6. Add notes if needed
7. Click **Close Register**

See [Cash Register Management](usage-cash-register.md) for detailed instructions.

## Quick Reference

| Task | Action |
|------|--------|
| Search products | Type in search bar or scan barcode |
| Add to cart | Click product or scan barcode |
| Change quantity | Use +/- buttons in cart |
| Apply discount | Click discount icon |
| Select customer | Use customer dropdown |
| Switch orders | Click order tabs |
| Complete sale | Click **Complete Order** |
| Print receipt | Click **Print Receipt** |
| Open register | Click **Open Register** |
| Close register | Click **Close Register** |
| Process refund | Go to POS > Refunds |
