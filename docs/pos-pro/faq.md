# Frequent Questions

## General Questions

### What is POS Pro?

POS Pro is a comprehensive Point of Sale system designed for e-commerce stores built with Botble CMS. It provides a user-friendly interface for managing in-store sales, processing orders, handling refunds, and tracking cash register operations.

### What are the system requirements?

- Botble CMS version 7.5.0 or higher
- PHP version 8.2 or higher
- Active E-commerce plugin

### Can I use POS Pro on multiple devices?

Yes, POS Pro is web-based and can be accessed from any device with a modern web browser, including desktops, laptops, tablets, and smartphones. The interface is responsive and adapts to different screen sizes.

### Does POS Pro work offline?

No, POS Pro requires an internet connection to function. All data is stored on the server and transactions are processed in real-time.

### Can multiple cashiers use POS Pro simultaneously?

Yes, each logged-in user can work independently. With order slots, a single user can even work on up to 10 orders simultaneously.

## Features and Functionality

### What payment methods does POS Pro support?

POS Pro supports:
- Cash
- Card (via Stripe Terminal)
- Bank Transfer (with QR code)
- Gift Card
- Store Credit
- Check

You can also split payments across multiple methods.

### Does POS Pro support barcode scanning?

Yes, POS Pro supports both:
- Camera-based scanning using your device's camera
- Hardware barcode scanners (USB or Bluetooth)

See the [Barcode Scanner](usage-barcode-scanner.md) guide for details.

### Can I process refunds through POS?

Yes, POS Pro has full refund capabilities including:
- Full or partial refunds
- Multiple refund methods (cash, original tender, store credit)
- Approval workflow for high-value refunds
- Automatic inventory restocking

See the [Refunds](usage-refunds.md) guide for details.

### Does POS Pro track cash drawers?

Yes, the cash register feature allows you to:
- Open and close shifts
- Track starting cash
- Calculate expected cash at close
- Record actual cash counted
- Track variances

See the [Cash Register](usage-cash-register.md) guide for details.

### Can I work on multiple orders at once?

Yes, POS Pro supports up to 10 concurrent order slots. You can start an order, park it, serve another customer, and return to the first order later.

### Does POS Pro support product variations?

Yes, when adding a product with variations (size, color, etc.) to the cart, a modal appears to select the desired options.

### Can I apply discounts?

Yes, you can:
- Apply coupon codes
- Add manual discounts (fixed amount or percentage)
- Configure automatic discount application

## Printing

### What printers are supported?

POS Pro supports:
- USB thermal printers (via browser printing)
- Network thermal printers (via IP)
- Regular printers (A4 paper)

Thermal paper sizes: 58mm and 80mm.

### Do I need special software for printing?

For USB printers, no additional software is needed - it uses browser printing. For network printers, you need a print server application that can receive HTTP requests.

See the [Printer Setup](usage-printer-setup.md) guide for details.

### Can I customize receipts?

Yes, you can:
- Choose paper size (58mm, 80mm, A4)
- Toggle logo display
- Toggle store information
- Toggle tax display
- Toggle cashier name
- Toggle customer name
- Add custom footer text

### Can receipts print automatically?

Yes, enable "Auto Print" in settings to automatically open the print dialog after checkout.

## Card Payments

### Does POS Pro support card payments?

Yes, through Stripe Terminal integration. You need:
- Active Stripe account with Terminal enabled
- Stripe-certified card reader
- Stripe plugin installed

See the [Stripe Terminal](usage-stripe-terminal.md) guide for details.

### What card readers are supported?

POS Pro works with Stripe-certified readers including:
- BBPOS WisePOS E
- Stripe Reader M2
- BBPOS Chipper 2X BT
- Verifone P400

### Can I process card refunds?

Yes, refunds for card payments are processed automatically through Stripe when you select "Original Tender" as the refund method.

## Multi-vendor / Marketplace

### Does POS Pro work with Marketplace plugin?

Yes, when the Marketplace plugin is active, you can enable:
- Vendor POS access
- Automatic order splitting by vendor
- Vendor register management
- Vendor refund processing

See the [Marketplace Integration](usage-marketplace.md) guide for details.

### Can vendors use their own card readers?

Yes, if both Stripe Terminal and vendor Stripe Terminal access are enabled, vendors can use card readers from their dashboard.

## Technical Questions

### How do I update POS Pro?

1. Download the latest version from CodeCanyon
2. Extract and replace files in `platform/plugins/pos-pro`
3. Run: `php artisan migrate`
4. Clear cache: `php artisan cache:clear`
5. Rebuild assets: `npm run build`

See the [Upgrading](upgrade.md) guide for details.

### Can I customize the receipt template?

Yes, the receipt template is at:
`platform/plugins/pos-pro/resources/views/receipt-print.blade.php`

Note: Custom changes may be overwritten during updates.

### Is POS Pro compatible with other Botble plugins?

Yes, POS Pro integrates with:
- E-commerce plugin (required)
- Marketplace plugin (optional)
- Stripe plugin (optional, for card payments)
- SePay/PayFS plugins (optional, for bank transfer QR)

### What permissions does POS Pro have?

| Permission | Description |
|------------|-------------|
| POS Pro | Main permission group |
| POS | Access to POS interface |
| Reports | Access to analytics |
| Settings | Access to configuration |
| Devices | Manage printers/devices |
| Registers | Manage cash registers |
| Orders | View POS orders |
| Refunds | Process refunds |
| Approve High-Value Refunds | Approve large refunds |

### How do I add a new language?

1. Copy an existing language folder in `platform/plugins/pos-pro/resources/lang/`
2. Rename to your language code (e.g., `de` for German)
3. Translate the strings in `pos.php`
4. The language will be available in the language switcher

## Troubleshooting

### Why aren't products showing?

Check that:
- Products are published (not draft)
- Products have stock (if stock management is enabled)
- Products have prices set
- User has POS permission

### Why can't I complete checkout?

Ensure:
- At least one item is in the cart
- A customer is selected
- A payment method is chosen
- Register is open (if required)

### Why isn't my printer working?

For USB printers:
- Check printer is connected and set as default
- Allow browser popups for the site
- Try a different browser

For network printers:
- Verify IP address is correct
- Ping the printer IP
- Check print server is running

See [Troubleshooting](troubleshooting.md) for more help.

### Where can I get support?

- Documentation: [https://docs.botble.com/pos-pro](https://docs.botble.com/pos-pro)
- Support Email: [support@botble.com](mailto:support@botble.com)
- Support Forum: [https://botble.com/forum](https://botble.com/forum)
