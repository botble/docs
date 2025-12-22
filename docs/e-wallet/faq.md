# Frequently Asked Questions

## General Questions

### What is E-Wallet?

E-Wallet is a comprehensive digital wallet system designed for e-commerce stores built with Botble CMS. It enables customers to store funds, make payments, receive refunds, and request withdrawals, all within your online store.

### What are the system requirements for E-Wallet?

- Botble CMS version 7.5.0 or higher
- PHP version 8.2 or higher
- Active E-commerce plugin (required)
- MySQL 5.7+ or MariaDB 10.3+
- At least one payment gateway configured

### Does this plugin work with WooCommerce, Shopify, or other platforms?

No. E-Wallet is specifically designed to work **only with Botble e-commerce scripts** (MartFury, Shofy, Nest, Ninico, Farmart, Wowy, etc.). It is not compatible with other e-commerce platforms like WooCommerce, Shopify, Magento, or OpenCart.

### How does the wallet system work?

Customers can add funds (top-up) to their wallet using payment gateways. They can then use their wallet balance to pay for orders at checkout. Refunds are automatically credited to the wallet, and customers can request withdrawals to get money back.

## Wallet Top-ups

### How do customers add money to their wallet?

Customers can top-up their wallet by:
1. Going to their wallet page (`/customer/e-wallet`)
2. Clicking "Top Up Wallet"
3. Entering the desired amount
4. Selecting a payment method
5. Completing the payment

### What payment methods can be used for top-ups?

Any payment gateway configured in your store can be used for top-ups, except the wallet payment method itself (to prevent circular payments). Common options include credit cards, PayPal, bank transfers, etc.

### Is there a minimum or maximum top-up amount?

Yes, store owners can configure minimum and maximum top-up amounts in the settings. These limits help prevent micro-transactions and manage risk.

### How long does a top-up take to appear?

Top-ups are typically credited instantly once the payment is confirmed. For some payment methods, it may take a few minutes for the payment gateway to confirm.

## Wallet Payments

### How do customers pay with their wallet?

At checkout, customers who are logged in and have sufficient wallet balance will see "Wallet" or "Pay with E-Wallet" as a payment option. They simply select it and confirm the order.

### Can customers use partial wallet balance?

Currently, customers must pay the full order amount with one payment method. If their wallet balance is insufficient, they must either top-up or choose another payment method.

### What if a customer doesn't have enough balance?

If the wallet balance is insufficient, the wallet payment option will show a warning. Customers can either:
- Top-up their wallet with more funds
- Choose a different payment method

### Is wallet payment secure?

Yes. Wallet payments are protected by the customer's account password and the platform's security measures. Transactions use database locking to prevent race conditions.

## Refunds

### How do refunds work with E-Wallet?

When E-Wallet is enabled, ALL refunds are automatically credited to the customer's wallet. This behavior is mandatory when the plugin is active.

### Can customers get refunds to their original payment method?

No, when E-Wallet is enabled, refunds go to the wallet. However, customers can request a withdrawal to get the money back to their bank account or PayPal.

### How quickly do refunds appear in the wallet?

Refunds are credited instantly once processed by the admin. Customers can see the updated balance immediately.

## Withdrawals

### How do customers withdraw money?

Customers can request withdrawals by:
1. Going to their wallet page
2. Clicking "Withdraw"
3. Entering the withdrawal amount
4. Selecting a payout method
5. Providing payment details
6. Submitting the request

### What payout methods are available?

Store owners can configure the available payout methods. Common options include:
- Bank Transfer
- PayPal
- Other custom methods

### How long does a withdrawal take?

Withdrawals require admin approval. The typical timeline is:
- Admin review: 1-3 business days
- Bank Transfer: 3-5 business days after approval
- PayPal: 1-2 business days after approval

### What happens if a withdrawal is rejected?

If an admin rejects a withdrawal request, the funds are automatically refunded to the customer's wallet balance.

### Can I cancel a withdrawal request?

Customers can only cancel a withdrawal before it's approved. Once processing begins, it cannot be cancelled.

## Balance Management

### Can wallet balances go negative?

By default, no. However, store owners can enable "Allow Negative Balance" in settings for special cases like credit systems or installment payments.

### Do wallet balances expire?

By default, wallet balances do not expire. However, store owners may implement custom policies regarding inactive accounts.

### How can I check my wallet balance?

Customers can view their balance by:
- Logging into their account
- Going to "My Account" > "My Wallet" or visiting `/customer/e-wallet`

### How is the balance stored?

Balances are stored in cents (integers) for precision. For example, $10.50 is stored as 1050 cents. This prevents floating-point calculation errors.

## Technical Questions

### What currency does the wallet use?

The wallet uses your store's default currency. Each wallet is associated with a single currency.

### Can customers have multiple wallets?

Currently, each customer has one wallet tied to their account.

### How do I update E-Wallet to the latest version?

To update E-Wallet:
1. Download the latest version from CodeCanyon
2. Replace the files in `platform/plugins/e-wallet` directory
3. Run `php artisan migrate`
4. Clear the cache using `php artisan cache:clear`

See the [Upgrade Guide](/e-wallet/upgrade) for detailed instructions.

### Can I customize the wallet interface?

Yes, you can customize the views by modifying template files in your theme. The plugin uses standard Blade templates that can be overridden in your theme's views directory.

### Is E-Wallet compatible with other Botble plugins?

Yes, E-Wallet is designed to work seamlessly with other Botble plugins, especially the E-commerce plugin which is required.

### Does it support multiple languages?

Yes, E-Wallet includes translations for 30+ languages. You can also add your own translations or customize existing ones from the admin panel.

## Troubleshooting

### Top-up payment completed but wallet not credited

If the wallet wasn't credited:
- Wait a few minutes and refresh the page
- Check the Top-ups section in admin for pending items
- Admin can manually complete the top-up
- Contact support if the issue persists

### Wallet payment not showing at checkout

If customers can't see the wallet payment option:
- Verify E-Wallet is enabled in settings
- Verify Wallet payment method is enabled
- Ensure customer is logged in
- Check that customer has sufficient balance
- Clear cache and try again

### Balance doesn't match transaction history

If balances seem incorrect:
- Review all transactions, including pending/failed ones
- Check for admin adjustments
- Verify the math manually
- Contact technical support if still incorrect

### Withdrawal stuck in pending status

Withdrawals remain pending until an admin approves them:
- Check the Withdrawals section in admin
- Admin must click "Approve" to process
- Contact admin to review the request

For more detailed troubleshooting, see the [Troubleshooting Guide](/e-wallet/troubleshooting).
