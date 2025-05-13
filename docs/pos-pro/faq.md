# Frequent Questions

## General Questions

### What is POS Pro?

POS Pro is a comprehensive Point of Sale system designed for e-commerce stores built with Botble CMS. It provides a user-friendly interface for managing in-store sales, processing orders, and handling customer transactions efficiently.

### What are the system requirements for POS Pro?

- Botble CMS version 7.5.0 or higher
- PHP version 8.2 or higher
- Active e-commerce plugin

### Can I use POS Pro on multiple devices?

Yes, POS Pro is web-based and can be accessed from any device with a web browser, including desktops, laptops, tablets, and smartphones. The interface is responsive and adapts to different screen sizes.

## Features and Functionality

### Does POS Pro support barcode scanning?

Yes, POS Pro supports barcode scanning. You can search for products by barcode using the search bar in the POS interface. If you have a barcode scanner connected to your device, it will work seamlessly with the POS system.

### Can I create new customers in POS Pro?

Yes, you can create new customers directly from the POS interface. Click the "Create Customer" button, fill in the required information, and save. The new customer will be immediately available for selection.

### Does POS Pro support product variations?

Yes, POS Pro fully supports product variations. When adding a product with variations to the cart, you'll be prompted to select the desired attributes (like size, color, etc.) before adding it to the cart.

### Can I apply discounts to orders?

Yes, POS Pro allows you to apply both coupon codes and manual discounts. You can apply a fixed amount or percentage discount to the entire order.

## Technical Questions

### How do I update POS Pro to the latest version?

To update POS Pro:
1. Download the latest version from CodeCanyon
2. Extract the files
3. Replace the files in the `platform/plugins/pos-pro` directory
4. Clear the application cache using `php artisan cache:clear`

### Can I customize the receipt template?

Yes, you can customize the receipt template by modifying the view file located at `platform/plugins/pos-pro/resources/views/partials/receipt.blade.php`.

### Is POS Pro compatible with other Botble plugins?

Yes, POS Pro is designed to work seamlessly with other Botble plugins, especially the E-commerce plugin which is required for POS Pro to function.

## Troubleshooting

### The POS interface is not loading properly

If the POS interface is not loading properly:
- Clear your browser cache
- Make sure JavaScript is enabled in your browser
- Check for any JavaScript errors in the browser console
- Verify that all required assets are loading correctly

### Orders created in POS are not showing in the admin panel

If orders created in POS are not appearing in the admin panel:
- Check if the orders were successfully completed
- Verify that the database connection is working properly
- Check for any errors in the Laravel logs
- Make sure the user has the necessary permissions to create orders
