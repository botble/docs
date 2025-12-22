# Configuring E-Wallet

This guide will walk you through the process of configuring the E-Wallet plugin for your Botble E-commerce store.

## Accessing E-Wallet Settings

1. Log in to your admin panel
2. Navigate to **Settings** > **E-Wallet**
3. You will see the E-Wallet configuration page

![E-Wallet Settings](https://botble.com/storage/envato/e-wallet/e-wallet-settings-page.png)

## General Settings

### Enable E-Wallet

Toggle to enable or disable the entire e-wallet functionality. When disabled:
- Customers cannot access their wallets
- Wallet payment method is hidden at checkout
- Top-ups and withdrawals are disabled
- Existing wallet balances are preserved

### Allow Negative Balance

Configure whether wallet balances can go below zero. This is useful for:
- Credit/installment payment scenarios
- Buy now, pay later (BNPL) integrations
- Overdraft facilities

::: warning
Enabling this removes balance validation. Ensure you have proper credit limit controls in place.
:::

## Top-up Settings

### Enable Top-up

Toggle to allow or disallow customers from adding funds to their wallet via payment gateways.

### Minimum Top-up Amount

The minimum amount customers can add in a single top-up transaction.

**Example**: Set to 10 to require at least $10 per top-up.

### Maximum Top-up Amount

The maximum amount customers can add in a single top-up transaction.

**Example**: Set to 10000 to limit top-ups to $10,000 maximum.

### Allowed Payment Methods for Top-ups

Select which payment methods customers can use to top-up their wallet. If none are selected, all enabled payment methods will be available.

::: tip Note
The "Wallet" payment method is automatically excluded from top-up options to prevent circular payments.
:::

## Withdrawal Settings

### Enable Withdrawal

Toggle to allow or disallow customers from requesting withdrawals from their wallet balance.

### Minimum Withdrawal Amount

The minimum amount customers can withdraw in a single request.

### Maximum Withdrawal Amount

The maximum amount customers can withdraw in a single request.

### Payout Methods

Select which payout methods are available for withdrawals:

| Method | Description | Required Details |
|--------|-------------|------------------|
| **Bank Transfer** | Customer provides bank account details | Bank name, Account number, Account holder, Routing number, SWIFT code |
| **PayPal** | Customer provides PayPal email | PayPal email address |
| **Other** | Custom payout method | Free-form payment details |

## Payment Method Settings

The wallet can be used as a payment method at checkout. This is configured separately in the payment methods settings.

### Enable Wallet Payment

1. Navigate to **Admin** > **Payments** > **Payment methods**
2. Find "Wallet" in the list
3. Click **Edit**
4. Check **Enable**
5. Configure the following:
   - **Name**: Display name (default: "Wallet")
   - **Description**: Customer-facing description
   - **Instructions**: Payment instructions shown to customers

## Refund Behavior

::: warning Important
When E-Wallet is enabled, ALL refunds are automatically credited to the customer's wallet. This behavior is mandatory and cannot be changed.
:::

Customers can:
- Use the refunded balance for future purchases
- Request a withdrawal to get the money back

## Permissions

E-Wallet includes comprehensive permissions that can be assigned to user roles:

### Core Permissions

| Permission | Description |
|------------|-------------|
| `e-wallet.index` | Access to E-Wallet menu |
| `e-wallet.wallets.index` | View wallets |
| `e-wallet.wallets.adjust` | Adjust wallet balances manually |
| `e-wallet.transactions.index` | View transaction history |

### Top-up Permissions

| Permission | Description |
|------------|-------------|
| `e-wallet.topups.index` | View top-up requests |
| `e-wallet.topups.complete` | Complete pending top-ups |
| `e-wallet.topups.cancel` | Cancel top-ups |

### Withdrawal Permissions

| Permission | Description |
|------------|-------------|
| `e-wallet.withdrawals.index` | View withdrawal requests |
| `e-wallet.withdrawals.approve` | Approve withdrawals |
| `e-wallet.withdrawals.reject` | Reject withdrawals |

### Settings Permission

| Permission | Description |
|------------|-------------|
| `e-wallet.settings` | Access to e-wallet settings |

### Managing Permissions

1. Go to **Users** > **Roles**
2. Edit a role (e.g., "Staff", "Manager")
3. Find the "E-Wallet" section in permissions
4. Check/uncheck permissions based on role requirements
5. Save changes

## Testing Your Configuration

After configuring the plugin, test the following:

### 1. Top-up Test

1. Log in as a customer
2. Navigate to wallet page
3. Click "Top Up Wallet"
4. Enter an amount within configured limits
5. Select a payment method
6. Complete payment
7. Verify wallet balance is updated

### 2. Checkout Payment Test

1. Ensure test customer has sufficient wallet balance
2. Add products to cart
3. Proceed to checkout
4. Select "Wallet" as payment method
5. Complete the order
6. Verify wallet balance is deducted correctly

### 3. Refund Test

1. Create and complete a test order
2. Process a refund from admin panel
3. Verify refund amount is credited to customer wallet
4. Check transaction history shows refund

### 4. Withdrawal Test

1. Ensure test customer has wallet balance
2. Navigate to wallet page
3. Click "Withdraw"
4. Enter withdrawal amount and details
5. Submit request
6. As admin, approve or reject the request
7. Verify balance is updated accordingly

## Troubleshooting Configuration Issues

### Settings Not Saving

- Verify file permissions on `storage/` directory
- Clear cache: `php artisan cache:clear`
- Check database connection
- Review error logs

### Wallet Payment Not Showing

- Verify E-Wallet is enabled in settings
- Verify Wallet payment method is enabled in payment methods
- Ensure customer is logged in
- Check that customer has sufficient balance
- Clear cache

### Top-up Payment Methods Not Appearing

- Verify at least one payment gateway is configured
- Check that payment gateways are enabled
- Verify `topup_payment_methods` setting
- Ensure Wallet method is excluded

### Minimum/Maximum Limits Not Working

- Clear browser cache and refresh
- Verify settings are saved correctly
- Check for JavaScript errors in browser console
- Review validation error messages

## Configuration Best Practices

### 1. Set Appropriate Limits

- Set minimum amounts to prevent micro-transactions
- Set maximum amounts based on your risk tolerance
- Consider fraud prevention when setting limits

### 2. Payment Method Selection

- Only enable trusted payment gateways for top-ups
- Test each payment method thoroughly
- Monitor for failed transactions

### 3. Withdrawal Approval Process

- Implement a manual approval process for large withdrawals
- Set up email notifications for withdrawal requests
- Verify customer identity for first-time withdrawals

### 4. Regular Monitoring

- Review wallet balances periodically
- Monitor transaction patterns for anomalies
- Check for failed top-ups and resolve issues

## Configuration Checklist

Use this checklist when setting up the plugin:

- [ ] Enable E-Wallet
- [ ] Set minimum top-up amount
- [ ] Set maximum top-up amount
- [ ] Select allowed payment methods for top-ups
- [ ] Enable withdrawal functionality
- [ ] Set minimum withdrawal amount
- [ ] Set maximum withdrawal amount
- [ ] Select available payout methods
- [ ] Enable wallet payment method
- [ ] Test top-up flow
- [ ] Test payment flow
- [ ] Test withdrawal flow
- [ ] Test refund flow
- [ ] Configure admin permissions
- [ ] Set up email notifications

If you continue to encounter configuration issues, please refer to the [Troubleshooting](/e-wallet/troubleshooting) section or contact our support team.
