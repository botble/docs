# E-Wallet - Digital Payment System for E-commerce

## Introduction

E-Wallet is a comprehensive digital wallet system designed for e-commerce stores built with Botble CMS. It enables store owners to provide customers with a secure, convenient way to manage funds, make payments, receive refunds, top-up their balance, and request withdrawals. The plugin provides a complete solution for increasing customer convenience, faster checkouts, and streamlined refund management.

## Features

### Core Features

1. **Wallet Management**
   - Automatic wallet creation for customers
   - Real-time balance tracking
   - Balance stored in cents for precision
   - Single wallet per customer

2. **Top-up System**
   - Customers can add funds via payment gateways
   - Configurable minimum and maximum amounts
   - Multiple payment methods supported
   - Instant wallet credit on payment completion

3. **Wallet Payments**
   - Pay for orders using wallet balance at checkout
   - Instant payment processing
   - Secure balance deduction
   - Balance verification before payment

4. **Automatic Refunds**
   - All refunds automatically credited to wallet
   - Instant refund processing
   - Full audit trail for refund transactions
   - Customer notifications

5. **Withdrawal System**
   - Customer-initiated withdrawal requests
   - Multiple payout methods (Bank Transfer, PayPal)
   - Admin approval workflow
   - Automatic balance refund on rejection

6. **Transaction Management**
   - Six transaction types supported
   - Complete transaction history
   - Balance before/after tracking
   - Reference linking to orders

7. **Admin Dashboard**
   - Wallet statistics and analytics
   - Transaction reports
   - Balance adjustments
   - Top-up and withdrawal management

8. **Balance Adjustments**
   - Manual credit/debit by admins
   - Adjustment notes for audit trail
   - Admin action tracking

9. **Customer Dashboard**
   - View current balance
   - Transaction history
   - Top-up wallet
   - Request withdrawals

10. **Reports & Analytics**
    - Total wallets and active wallets
    - Balance in circulation
    - Credits and debits tracking
    - Transaction trends

11. **Security Features**
    - Transaction locking (prevents race conditions)
    - Idempotency keys (prevents duplicates)
    - Comprehensive audit trail
    - Role-based permissions

12. **Multi-language Support**
    - Available in 30+ languages
    - Easy translation from admin panel
    - Supports RTL languages

## Requirements

- Botble CMS version 7.5.0 or higher
- PHP version 8.2 or higher
- Active E-commerce plugin (required)
- MySQL 5.7+ or MariaDB 10.3+
- At least one payment gateway configured (for top-ups)

## Screenshots

### Settings Page
Configure wallet functionality, top-up limits, withdrawal settings, and payment methods.

![E-Wallet Settings](https://botble.com/storage/envato/e-wallet/e-wallet-settings-page.png)

### Customer Wallet
Customers can view their balance, transaction history, and manage their wallet.

![Customer Wallet](https://botble.com/storage/envato/e-wallet/customer-wallet-page.png)

### Checkout Payment
Customers can pay with their wallet balance at checkout.

![Checkout Payment](https://botble.com/storage/envato/e-wallet/wallet-checkout-payment.png)

### Admin Dashboard
Comprehensive analytics showing wallet program performance.

![Admin Dashboard](https://botble.com/storage/envato/e-wallet/e-wallet-admin-dashboard.png)

## Transaction Types

The E-Wallet plugin supports six transaction types:

| Type | Direction | Description |
|------|-----------|-------------|
| **Top-up** | Credit | Customer adds funds to wallet |
| **Payment** | Debit | Customer pays for order |
| **Refund** | Credit | Order refund credited to wallet |
| **Admin Adjustment** | Credit/Debit | Manual balance adjustment by admin |
| **Vendor Payout** | Debit | Payment to marketplace vendor |
| **Withdrawal** | Debit | Customer withdraws funds |

## Botble Team

Visit us at [botble.com](https://botble.com).
