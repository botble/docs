# Printer Setup

This guide explains how to configure and use receipt printing in POS Pro.

## Printing Methods

POS Pro supports two printing methods:

| Method | Best For | Setup Difficulty |
|--------|----------|------------------|
| **Browser Printing** | USB printers, any standard printer | Easy |
| **Network Printing** | Dedicated thermal receipt printers with IP | Advanced |

## Browser Printing (Recommended)

This is the simplest method and works with any printer connected to your computer, including USB thermal printers.

### How to Use

1. Complete a sale in POS
2. Click **Print Receipt** button on the success screen
3. A new browser tab opens with the receipt
4. Your browser's print dialog appears automatically (if auto-print is enabled)
5. Select your printer and click **Print**

### Configuration

Go to **Admin > Settings > E-commerce > POS Settings** and configure the receipt settings:

| Setting | Description |
|---------|-------------|
| **Enable Print Receipt** | Turn printing on/off |
| **Receipt Width** | Choose paper size: 58mm, 80mm (thermal), or A4 |
| **Auto Print** | Automatically open print dialog when receipt loads |
| **Show Logo** | Display your store logo on receipts |
| **Show Store Info** | Display store address and contact information |
| **Show VAT** | Display tax amount on receipts |
| **Show Cashier** | Display cashier name who processed the order |
| **Show Customer** | Display customer name on receipts |

### Receipt Width Options

- **58mm**: Compact thermal paper, ideal for small receipt printers
- **80mm**: Standard thermal paper, most common for receipt printers
- **A4**: Standard paper size for regular printers

### Tips for USB Thermal Printers

1. Set your thermal printer as the **default printer** in your operating system
2. In browser print settings, set **margins to "None"** for proper alignment
3. Select the correct paper size (58mm or 80mm) in printer preferences
4. Enable **Auto Print** in POS settings for faster checkout

## Network/IP Printing (Advanced)

For businesses with network-connected thermal printers that need automatic printing without browser dialogs.

### Requirements

::: warning Important
This method requires a **Print Server Application** running on your local network. POS Pro sends order data to this server, which then communicates with your printer.
:::

**You will need:**
- A thermal printer with network connectivity (Ethernet or WiFi)
- A print server application installed on a local computer
- The printer must have a static IP address on your local network

### Setup Steps

#### Step 1: Configure Your Printer's IP Address

1. Access your printer's settings (usually via a built-in web interface or control panel)
2. Assign a static IP address (e.g., `192.168.1.100`)
3. Ensure the printer is on the same network as your POS computer
4. Test connectivity by pinging the printer IP from your computer

#### Step 2: Install a Print Server Application

The print server application must:
- Listen on HTTP port 80 at the `/api` endpoint
- Accept JSON data and convert it to ESC/POS printer commands
- Communicate with your physical printer

::: info Note
The print server software is not included with POS Pro. You will need to install a compatible print server application that can receive HTTP requests and send ESC/POS commands to your printer.
:::

#### Step 3: Configure in POS Pro

1. Go to **Admin > POS > Devices**
2. Click **Create** to add a new device
3. Fill in the configuration:
   - **User**: Select which cashier uses this printer
   - **Device IP**: Your printer's IP address (e.g., `192.168.1.100`)
   - **Device Name**: A friendly name (e.g., "Counter 1 Printer")
   - **Is Active**: Turn on to enable the device

4. Click **Save** to save the configuration

### How Network Printing Works

When a sale is completed:
1. POS Pro automatically sends order details to your printer's IP address
2. The print server receives the JSON data containing:
   - Order ID and code
   - Customer information
   - Line items with prices and quantities
   - Totals, tax, and discounts
3. The print server converts this data to ESC/POS commands
4. The receipt prints automatically without any browser dialog

### Supported IP Ranges

For security, only local network IP addresses are accepted:

| Range | Description |
|-------|-------------|
| `192.168.x.x` | Common home/office networks |
| `10.x.x.x` | Private networks |
| `172.16.x.x` - `172.31.x.x` | Private networks |
| `127.x.x.x` | Localhost |

### Testing Network Printer Connection

You can test the printer connection using the artisan command:

```bash
php artisan pos:test-local-device {user_id} {order_id}
```

Replace `{user_id}` with the user ID configured for the device and `{order_id}` with an existing order ID to test with.

## Receipt Content

The printed receipt includes:
- Store logo (if enabled)
- Store name, address, and contact information
- Order number and date/time
- Cashier name (if enabled)
- Customer name (if enabled)
- List of purchased items with:
  - Product name
  - Quantity
  - Unit price
  - Line total
- Subtotal
- Tax amount (if enabled)
- Discounts (if applied)
- Shipping (if applicable)
- Grand total
- Payment method

## Troubleshooting

### Browser Printing Issues

| Problem | Solution |
|---------|----------|
| Receipt doesn't print automatically | Enable **Auto Print** in POS Settings |
| Text is cut off on edges | Check receipt width matches your paper size |
| Receipt appears too small or large | Adjust receipt width setting (58mm, 80mm, or A4) |
| Logo not showing on receipt | Enable **Show Logo** and ensure logo is uploaded in store settings |
| Blank receipt | Check that the order was completed successfully |
| Print dialog shows wrong printer | Set your receipt printer as the default in OS settings |

### Network Printing Issues

| Problem | Solution |
|---------|----------|
| Printer not responding | Verify printer IP is correct and reachable (try `ping {ip}`) |
| Connection timeout | Check printer is powered on and connected to network |
| Orders not printing | Verify print server application is running |
| "Invalid IP" error | Only private/local IP addresses are supported |
| Intermittent printing | Check network stability and printer connection |
| Wrong content printed | Verify print server is correctly parsing the JSON data |

### General Tips

1. **Test before going live**: Always test printing with a few orders before using in production
2. **Keep printer drivers updated**: Ensure your printer drivers are up to date
3. **Check paper supply**: Low paper can cause printing issues
4. **Network stability**: For IP printers, ensure stable network connection
5. **Browser compatibility**: Use Chrome or Firefox for best browser printing support

## Recommended Thermal Printers

POS Pro works with most ESC/POS compatible thermal printers:

### Paper Sizes
- **58mm printers**: Ideal for compact receipts, lower paper costs
- **80mm printers**: Standard size, more space for details, most common

### Popular Brands
- Epson TM series (TM-T20, TM-T88)
- Star Micronics
- MUNBYN
- Rongta
- Xprinter

::: tip
When purchasing a thermal printer, look for "ESC/POS compatible" in the specifications to ensure compatibility with print server software.
:::
