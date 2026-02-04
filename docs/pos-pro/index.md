# POS Pro - Point of Sale System for E-commerce

## Introduction

POS Pro is a comprehensive Point of Sale system designed for e-commerce stores built with Botble CMS. It provides a user-friendly interface for managing in-store sales, processing orders, handling refunds, and tracking cash register operations efficiently.

## Features

### Core Features

1. **User-Friendly Interface**
   - Split-screen layout with products on the left and cart on the right
   - Quick product search by name, SKU, or barcode
   - Responsive design for various screen sizes
   - Dark mode support for reduced eye strain
   - Full screen mode for distraction-free operation

2. **Product Management**
   - Display products with images, prices, and stock information
   - Support for product variations and attributes
   - Quick-shop modal for products with options
   - Infinite scrolling for product browsing
   - Barcode scanner support (camera and hardware)

3. **Cart Management**
   - Real-time cart updates
   - Quantity adjustment for cart items
   - Remove items from cart
   - Clear entire cart with one click

4. **Discount & Promotions**
   - Apply coupon codes
   - Add manual discounts (fixed amount or percentage)
   - Automatic discount application (configurable)
   - Automatic tax calculation

5. **Customer Management**
   - Select existing customers
   - Create new customers on the fly
   - Store customer information for future orders
   - Customer address management
   - Remember customer selection across sessions

6. **Payment Processing**
   - Multiple payment methods:
     - Cash
     - Card (with Stripe Terminal support)
     - Bank Transfer (with QR code generation)
     - Gift Card
     - Store Credit
     - Check
   - Split payments (multi-tender support)
   - Payment status tracking

7. **Cash Register Management**
   - Open and close register shifts
   - Track starting cash amount
   - Calculate expected cash at close
   - Record actual cash counted
   - Track cash variance (over/short)
   - Shift history and reporting

8. **Order Slots (Multiple Concurrent Orders)**
   - Work on up to 10 orders simultaneously
   - Switch between orders easily
   - Each order maintains its own cart state
   - Park and resume orders

9. **Refund Processing**
   - Lookup orders by code or ID
   - Full or partial refunds
   - Multiple refund methods:
     - Cash (from register)
     - Original tender
     - Store credit
   - Approval workflow for high-value refunds
   - Configurable refund window (days)
   - Automatic inventory restocking

10. **Receipt & Printing**
    - Thermal receipt printing (58mm, 80mm)
    - A4 paper support
    - Browser-based printing (USB printers)
    - Network printer support (IP-based)
    - Customizable receipt content
    - Auto-print option

11. **Reports & Analytics**
    - Sales reports with date filtering
    - Total sales and order count
    - Average order value
    - Sales by payment method
    - Top selling products
    - Sales trends over time

12. **Customer Display**
    - Separate screen for customer-facing display
    - Shows cart items and totals
    - Professional checkout experience

13. **Stripe Terminal Integration**
    - Connect physical card readers
    - Process card payments securely
    - Sync readers from Stripe account
    - Reader status monitoring
    - Support for multiple readers

14. **Bank Transfer QR Codes**
    - Generate QR codes for bank transfers
    - Integration with SePay gateway
    - Integration with PayFS gateway
    - Automatic charge ID generation

15. **Multi-language Support**
    - Available in 16+ languages
    - Easy to add new translations
    - In-app language switcher

16. **Multi-currency Support**
    - Currency switching in POS interface
    - Prices displayed in selected currency

### Marketplace/Vendor Features

When used with the Marketplace plugin:

- **Vendor POS Access**: Allow vendors to use POS from their dashboard
- **Separate Orders by Vendor**: Split multi-vendor carts into separate orders
- **Vendor Register Management**: Each vendor can manage their own cash register
- **Vendor Refunds**: Vendors can process refunds for their orders
- **Vendor Stripe Terminal**: Card reader access for vendors

## Requirements

- Botble CMS version 7.5.0 or higher
- PHP version 8.2 or higher
- Active E-commerce plugin

### Optional Integrations

- **Marketplace Plugin**: For vendor/multi-vendor POS features
- **Stripe Plugin**: For Stripe Terminal card reader support
- **SePay Plugin**: For bank transfer QR code generation
- **PayFS Plugin**: For bank transfer QR code generation

## Permissions

POS Pro includes granular permissions that can be assigned to user roles:

| Permission | Description |
|------------|-------------|
| POS Pro | Main permission group |
| POS | Access to the POS interface |
| Reports | Access to POS analytics and reports |
| Settings | Access to POS configuration |
| Devices | Manage printer/device configurations |
| Registers | Manage cash register operations |
| Orders | View POS orders |
| Refunds | Process refunds |
| Approve High-Value Refunds | Approve refunds above threshold |

## Botble Team

Visit us at [botble.com](https://botble.com).
