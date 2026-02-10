# Payment Gateways

Payment gateways enable customers to complete purchases using various payment methods. Shofy supports multiple payment providers and offline payment options.

## Overview

### Available Payment Gateways

**Online Payment Processors:**
- **Stripe** - Credit/debit cards, Apple Pay, Google Pay
- **PayPal** - PayPal accounts and credit cards
- **Razorpay** - India-focused payment gateway
- **Mollie** - European payment methods
- **Paystack** - African payment gateway
- **SSLCommerz** - Bangladesh payment gateway

**Offline Payment Methods:**
- **Cash on Delivery (COD)** - Pay when receiving order
- **Bank Transfer** - Direct bank deposit

## Accessing Payment Settings

Navigate to `Settings` -> `Payment` -> `Payment methods`.

This page shows all available payment methods with:
- Status (Enabled/Disabled)
- Configuration fields for each gateway
- Test/Live mode indicators
- Payment fee settings

## Enabling Payment Gateways

### Plugin Activation

Before configuring, ensure the payment plugin is activated:

1. Navigate to `Plugins` in admin panel
2. Find the payment plugin (e.g., "Stripe Payment Gateway")
3. Click **Activate** if not already active

::: tip
The base "Payment" plugin must be activated first. Other payment gateways depend on it.
:::

### Gateway Activation

After plugin activation:

1. Go to `Settings` -> `Payment` -> `Payment methods`
2. Find the payment gateway
3. Toggle **Enable** to ON
4. Configure required settings (see gateway-specific sections below)
5. Click **Save settings**

## Common Payment Settings

All payment gateways share these configuration options:

### Method Name

Customize the display name shown to customers at checkout.

- Default: Gateway name (e.g., "Stripe", "PayPal")
- Example: "Credit Card", "Pay with PayPal", "Secure Payment"

### Description

Optional text displayed below the payment option at checkout.

- Use to explain payment method (e.g., "We accept Visa, MasterCard, American Express")
- Supports HTML for formatting
- Keep concise (1-2 sentences)

### Payment Fee

Add a fee for using this payment method:

- **Type**: Percentage or Fixed Amount
- **Value**: Fee amount (e.g., `3` for 3% or `2.50` for $2.50 fee)
- Automatically added to order total at checkout
- Shows as separate line item

Example:
```
Subtotal: $100
Payment fee (3%): $3
Total: $103
```

::: warning
Payment fees may be restricted or prohibited in some regions. Check local laws.
:::

### Payment Logo

Upload a custom logo to display at checkout.

- Recommended size: 60x40 pixels
- Formats: PNG, SVG (transparent backgrounds work best)
- Shown next to payment method name

### Available Countries

Restrict payment method to specific countries:

- **All countries** (default) - Available worldwide
- **Specific countries** - Select from list

Use case: Restrict "Cash on Delivery" to domestic orders only.

## Stripe Configuration

Stripe processes credit cards, Apple Pay, Google Pay, and more.

### Requirements

1. Stripe account ([signup at stripe.com](https://stripe.com))
2. Verified business information
3. Bank account for payouts

### Configuration Fields

Navigate to `Settings` -> `Payment` -> `Payment methods` -> **Stripe**.

| Field | Description | Where to Find |
|-------|-------------|---------------|
| **Publishable key** | Public API key (starts with `pk_`) | Stripe Dashboard -> Developers -> API keys |
| **Secret key** | Private API key (starts with `sk_`) | Stripe Dashboard -> Developers -> API keys |
| **Payment type** | Stripe API Charge or Stripe Checkout | Choose integration method |
| **Webhook secret** | Webhook signing secret (starts with `whsec_`) | Stripe Dashboard -> Developers -> Webhooks |

### Payment Type Options

**Stripe API Charge (Recommended):**
- Checkout stays on your site
- Supports saved cards
- More customization options

**Stripe Checkout:**
- Redirects to Stripe-hosted page
- PCI compliance handled by Stripe
- Supports more payment methods (Alipay, etc.)

### Test vs Live Mode

Stripe provides separate keys for testing:

**Test Mode Keys:**
- Publishable: `pk_test_...`
- Secret: `sk_test_...`
- Use test card: `4242 4242 4242 4242`

**Live Mode Keys:**
- Publishable: `pk_live_...`
- Secret: `sk_live_...`
- Processes real payments

::: warning
Never use live keys in test/development environments. Use test keys until you're ready to accept real payments.
:::

### Setting Up Webhooks

Webhooks notify your store of payment events (success, failure, refunds).

1. Go to Stripe Dashboard -> Developers -> Webhooks
2. Click **Add endpoint**
3. Endpoint URL: `https://yourstore.com/stripe/webhook`
4. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copy the **Signing secret** (starts with `whsec_`)
6. Paste into **Webhook secret** field in settings

### Testing Stripe

Use these test cards:

| Card Number | Scenario |
|-------------|----------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 9995 | Declined card |
| 4000 0000 0000 3220 | 3D Secure authentication required |

Use any future expiry date and any 3-digit CVC.

## PayPal Configuration

PayPal allows customers to pay with PayPal accounts or credit cards.

### Requirements

1. PayPal Business account ([signup at paypal.com](https://paypal.com))
2. Verified email and bank account
3. API credentials from PayPal Developer

### Configuration Fields

| Field | Description | Where to Find |
|-------|-------------|---------------|
| **Client ID** | PayPal REST API client ID | PayPal Developer -> My Apps & Credentials |
| **Client Secret** | PayPal REST API secret | PayPal Developer -> My Apps & Credentials |
| **Mode** | Live Mode (ON) or Sandbox (OFF) | Toggle for testing vs production |

### Getting PayPal API Credentials

1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Navigate to **My Apps & Credentials**
3. Choose **Sandbox** (testing) or **Live** (production)
4. Click **Create App**
5. Copy **Client ID** and **Secret**

### Sandbox vs Live Mode

**Sandbox Mode (Mode = OFF):**
- Use sandbox credentials
- Test with fake PayPal accounts
- No real money processed

**Live Mode (Mode = ON):**
- Use live credentials
- Processes real payments
- Requires verified business account

### Testing PayPal

1. Create sandbox account at [PayPal Developer](https://developer.paypal.com)
2. Create test buyer and seller accounts
3. Use sandbox credentials in payment settings
4. Test checkout with sandbox buyer account

## Razorpay Configuration

Razorpay is popular in India for UPI, cards, net banking, and wallets.

### Requirements

1. Razorpay account ([signup at razorpay.com](https://razorpay.com))
2. KYC verification
3. Bank account details

### Configuration Fields

| Field | Description | Where to Find |
|-------|-------------|---------------|
| **Key ID** | Razorpay API key | Razorpay Dashboard -> Settings -> API Keys |
| **Key Secret** | Razorpay API secret | Razorpay Dashboard -> Settings -> API Keys |

### Getting Razorpay Credentials

1. Log into Razorpay Dashboard
2. Go to **Settings** -> **API Keys**
3. Generate keys (if not already generated)
4. Copy **Key ID** and **Key Secret**

### Test Mode

Razorpay automatically provides test keys:
- Test Key ID: Starts with `rzp_test_`
- Live Key ID: Starts with `rzp_live_`

Use test keys during development.

## Mollie Configuration

Mollie supports European payment methods including iDEAL, Bancontact, and more.

### Requirements

1. Mollie account ([signup at mollie.com](https://mollie.com))
2. Verified business (for live mode)

### Configuration Fields

| Field | Description | Where to Find |
|-------|-------------|---------------|
| **API Key** | Mollie API key | Mollie Dashboard -> Developers -> API keys |
| **Mode** | Test or Live | Toggle based on API key type |

### Getting Mollie API Key

1. Log into Mollie Dashboard
2. Go to **Developers** -> **API keys**
3. Copy **Test API key** or **Live API key**

Test keys start with `test_`, live keys start with `live_`.

## Paystack Configuration

Paystack is widely used in Nigeria and other African countries.

### Requirements

1. Paystack account ([signup at paystack.com](https://paystack.com))
2. Business verification
3. Bank account for settlements

### Configuration Fields

| Field | Description | Where to Find |
|-------|-------------|---------------|
| **Public Key** | Paystack public key | Paystack Dashboard -> Settings -> API Keys & Webhooks |
| **Secret Key** | Paystack secret key | Paystack Dashboard -> Settings -> API Keys & Webhooks |

### Getting Paystack Credentials

1. Log into Paystack Dashboard
2. Go to **Settings** -> **API Keys & Webhooks**
3. Copy **Public Key** and **Secret Key**

Test keys available in test mode (toggle at top of dashboard).

## SSLCommerz Configuration

SSLCommerz is the leading payment gateway in Bangladesh.

### Requirements

1. SSLCommerz merchant account ([signup at sslcommerz.com](https://sslcommerz.com))
2. Business documents
3. Bank account

### Configuration Fields

| Field | Description | Where to Find |
|-------|-------------|---------------|
| **Store ID** | Merchant store ID | SSLCommerz merchant panel |
| **Store Password** | API store password | SSLCommerz merchant panel |
| **Mode** | Sandbox or Live | Toggle for testing |

### Sandbox Testing

SSLCommerz provides sandbox credentials for testing. Use test cards provided in their documentation.

## Cash on Delivery (COD)

COD allows customers to pay when they receive the order.

### Configuration

Navigate to `Settings` -> `Payment` -> `Payment methods` -> **Cash on Delivery**.

- **Method name** - Display name (e.g., "Pay on Delivery")
- **Description** - Instructions (e.g., "Pay cash to courier when you receive your order")
- **Payment fee** - Optional handling fee
- **Logo** - Custom icon
- **Available countries** - Restrict to specific countries

### Best Practices for COD

1. **Limit to verified customers** - Reduce fake orders
2. **Add COD fee** - Cover handling costs (2-5%)
3. **Restrict by location** - Only offer in serviceable areas
4. **Set minimum order** - Avoid small COD orders
5. **Verify phone number** - Call customers before shipping

::: warning
COD has higher return rates. Consider adding verification steps or minimum order amounts.
:::

## Bank Transfer

Bank transfer allows customers to manually transfer payment to your bank account.

### Configuration

Navigate to `Settings` -> `Payment` -> `Payment methods` -> **Bank Transfer**.

- **Method name** - Display name (e.g., "Direct Bank Transfer")
- **Description** - Bank details and instructions
- **Payment fee** - Usually none
- **Logo** - Bank logo or custom icon

### Setting Up Bank Transfer Instructions

In the **Description** field, include:

```
Please transfer to:
Bank: ABC Bank
Account Name: Your Store Name
Account Number: 1234567890
IBAN: GB00ABCD12345678901234 (if applicable)
Swift Code: ABCDGB2L (for international)

Reference: Use your order number as reference
Processing: Orders ship after payment confirmation (1-3 business days)
```

### Bank Transfer Workflow

1. Customer selects "Bank Transfer" at checkout
2. Order created with "Pending" status
3. Customer sees bank details on confirmation page
4. Customer emails payment receipt
5. Admin verifies payment manually
6. Admin changes order status to "Processing"
7. Order ships

::: tip
Use order notes to track when payment is received. Consider automated email reminders if payment not received within 48 hours.
:::

## Payment Method Priority

Control the order payment methods appear at checkout:

1. Methods are sorted by activation order
2. Use drag-and-drop to reorder (if theme supports)
3. Most common method should appear first

Recommended order:
1. Credit Card (Stripe)
2. PayPal
3. Other online gateways
4. Bank Transfer
5. Cash on Delivery

## Managing Payments

### Viewing Payment Logs

Navigate to `Payments` -> `Transactions` to view:
- Transaction ID
- Amount
- Status (success, pending, failed)
- Customer information
- Gateway used
- Date/time

### Refunding Payments

To refund a payment:

1. Navigate to `Ecommerce` -> `Orders`
2. Click on the order
3. Click **Refund** button
4. Select refund amount (full or partial)
5. Confirm refund

::: tip
Refunds process through the original payment gateway. Ensure API credentials are configured for refunds to work.
:::

### Failed Payments

When a payment fails:
- Order created with "Pending" status
- Customer sees error message
- Admin receives notification (if enabled)
- Customer can retry payment from order page

## Default Payment Method

To set a default payment method:

1. Go to `Settings` -> `Payment` -> `Payment methods`
2. Enable your preferred method
3. It automatically becomes available at checkout
4. Customers choose their preferred method

::: tip
You cannot force a specific default. Customers always choose at checkout. Consider using payment fees to encourage preferred methods.
:::

## Testing Payment Integration

### Pre-Launch Checklist

Before going live:

1. **Enable test mode** - Use sandbox/test credentials for all gateways
2. **Test checkout flow** - Complete test orders with each payment method
3. **Verify webhooks** - Ensure order status updates automatically
4. **Test refunds** - Process test refund through each gateway
5. **Check emails** - Verify payment confirmation emails send correctly
6. **Test failures** - Use invalid cards to ensure error handling works
7. **Mobile testing** - Test checkout on mobile devices

### Common Test Scenarios

- Successful payment
- Declined card
- Insufficient funds
- Network timeout
- 3D Secure authentication
- Partial refund
- Full refund
- Multiple items in cart
- Discount codes with payment
- International cards

### Switching to Live Mode

When ready to accept real payments:

1. **Update credentials** - Replace test keys with live keys
2. **Test once more** - Make one real test purchase (then refund)
3. **Monitor closely** - Watch first few live transactions
4. **Verify payouts** - Ensure funds reach your bank account

::: warning
Never test with live credentials. Always use test mode for development and staging.
:::

## Troubleshooting

### Payment method not showing at checkout

1. **Gateway enabled?** - Check toggle is ON in settings
2. **Plugin activated?** - Verify plugin is active
3. **Credentials configured?** - Ensure API keys entered
4. **Country restrictions?** - Check available countries setting
5. **Cart total?** - Some methods have minimum amounts
6. **Cache cleared?** - Clear site and browser cache

### Payment failing at checkout

1. **Test mode?** - Verify using correct credentials (test vs live)
2. **API keys valid?** - Check keys haven't expired or been regenerated
3. **Webhook configured?** - Verify webhook URL and secret
4. **SSL certificate?** - Payment gateways require HTTPS
5. **Gateway status?** - Check if payment provider has downtime
6. **Error logs?** - Check `storage/logs` for detailed errors

### Webhook not working

1. **URL accessible?** - Webhook URL must be publicly accessible
2. **Correct URL?** - Verify exact webhook URL in gateway dashboard
3. **Secret configured?** - Webhook secret must match
4. **Firewall/IP?** - Whitelist gateway's webhook IP addresses
5. **SSL issues?** - Ensure valid SSL certificate

### Refund not processing

1. **Credentials correct?** - Refund API requires same credentials
2. **Time limit?** - Some gateways limit refund window (e.g., 180 days)
3. **Sufficient balance?** - Account must have funds for refund
4. **Gateway support?** - Verify gateway supports API refunds

## Security Best Practices

1. **Never share API keys** - Keep credentials secret
2. **Use environment variables** - Store keys in `.env` file
3. **HTTPS required** - All payment pages must use SSL
4. **PCI compliance** - Never store credit card numbers
5. **Regular updates** - Keep payment plugins updated
6. **Audit logs** - Review payment logs regularly
7. **Test mode separation** - Never mix test and live credentials
8. **Access control** - Limit who can view/edit payment settings

## Frequently Asked Questions

### Can customers use multiple payment methods for one order?

No, customers must choose one payment method per order. For split payments, customers would need to place multiple orders.

### How do I offer payment plans or installments?

Use payment gateways that support installments natively (e.g., Affirm, Klarna). These require separate integration or plugins.

### Can I disable credit card payments but keep PayPal?

Yes, just disable Stripe (or other card gateway) and leave PayPal enabled. Customers see only PayPal option.

### What fees do payment gateways charge?

Varies by gateway:
- Stripe: ~2.9% + $0.30 per transaction
- PayPal: ~2.9% + $0.30 per transaction
- Razorpay: ~2% per transaction
- Mollie: Varies by payment method
- Paystack: ~1.5% + fees

Check each provider's pricing page for exact rates in your country.

### How long until I receive payment?

**Online gateways:** 2-7 days (varies by provider and country)
**Bank transfer:** 1-3 days after customer pays
**COD:** When courier remits collected cash (5-15 days)

### Can I set different payment methods for different countries?

Yes, use the **Available countries** setting for each payment method to restrict by location.

### Do payment gateways work with subscriptions?

Depends on the gateway. Stripe and PayPal support recurring payments. Check gateway documentation for subscription support.

### What if customer's country isn't supported by any gateway?

Consider:
- Adding more payment gateways (Mollie for Europe, Paystack for Africa)
- Enabling Bank Transfer (works internationally)
- Using multi-currency processors
- Manually processing via email/phone

### Can I change payment gateway after getting orders?

Yes, but:
- Existing orders still reference old gateway
- Refunds must go through original gateway
- Customers with saved cards must re-enter
- Update checkout instructions if changing

### How do I handle chargebacks?

Chargebacks are handled by the payment gateway. You'll receive notification from the gateway (not your store). Respond with order documentation to dispute fraudulent chargebacks.

### Can I use multiple Stripe accounts?

No, only one Stripe account per store. For multiple brands, use Stripe Connect or separate store installations.
