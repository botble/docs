# Stripe Terminal Integration

POS Pro integrates with Stripe Terminal to accept in-person card payments using physical card readers.

## Overview

Stripe Terminal allows you to:

- Accept chip, contactless, and swipe payments
- Use certified card readers
- Process secure, PCI-compliant transactions
- Handle refunds back to cards
- Support multiple readers per location

## Requirements

Before setting up Stripe Terminal:

1. **Stripe Account**: Active Stripe account with Terminal enabled
2. **Stripe Plugin**: Botble Stripe plugin must be installed and active
3. **Card Reader**: Stripe-certified card reader device
4. **Network**: Stable internet connection for readers

### Supported Card Readers

Stripe Terminal supports various readers:

| Reader | Type | Best For |
|--------|------|----------|
| **BBPOS WisePOS E** | Countertop | Full-featured checkout |
| **Stripe Reader M2** | Mobile | Portable payments |
| **BBPOS Chipper 2X BT** | Bluetooth | Mobile with existing device |
| **Verifone P400** | Countertop | High-volume retail |

Check [Stripe's documentation](https://stripe.com/docs/terminal/readers) for the latest supported devices.

## Configuration

### Step 1: Enable Stripe Terminal

1. Go to **POS** > **Settings**
2. Find the **Stripe Terminal Settings** section
3. Toggle **Enable Stripe Terminal** to ON

### Step 2: Enter API Credentials

1. **Stripe Secret Key**: Enter your Stripe secret API key
   - Find this in your Stripe Dashboard > Developers > API keys
   - Use the secret key (starts with `sk_`)

2. **Stripe Location ID** (Optional):
   - Create a location in Stripe Dashboard > Terminal > Locations
   - Enter the location ID (starts with `tml_`)
   - Useful for multi-location businesses

3. **Webhook Signing Secret** (Optional):
   - Set up a webhook endpoint in Stripe Dashboard
   - Enter the signing secret for validation

4. Click **Save Settings**

### Step 3: Register Your Reader

1. Follow Stripe's instructions to register your reader
2. Connect the reader to your network
3. The reader should appear in your Stripe Dashboard

## Syncing Readers

### First-Time Setup

1. Go to **POS** > **Settings** > **Stripe Terminal**
2. Click **Sync Readers**
3. POS Pro fetches all readers from your Stripe account
4. Readers appear in the reader list

### When to Sync

Sync readers when:
- Adding a new reader
- Reader not showing in POS
- After Stripe Dashboard changes
- Troubleshooting connection issues

## Managing Readers

### Viewing Reader Status

1. In POS, click the card reader icon
2. View list of available readers
3. Each reader shows:
   - Device name/label
   - Device type
   - Online/offline status
   - Last seen timestamp

### Setting Default Reader

1. Click the card reader icon
2. Find the reader you want as default
3. Click **Set as Default**
4. This reader is used automatically for card payments

### Reader Status Indicators

| Status | Meaning |
|--------|---------|
| **Online** | Reader is connected and ready |
| **Offline** | Reader is not reachable |
| **Busy** | Reader is processing a payment |

## Processing Card Payments

### Standard Card Payment

1. Add items to cart
2. Select **Card** as payment method
3. Click **Complete Order**
4. The reader displays the amount
5. Customer inserts, taps, or swipes card
6. Wait for authorization
7. Order completes on success

### Split Payment with Card

1. Click **Split Payment**
2. Add card tender with amount
3. Optionally add other tenders
4. Click **Complete Order**
5. Process card payment on reader
6. Complete remaining tenders

### Customer Interaction

Guide customers through:

1. **Insert Card**: For chip cards, insert into slot
2. **Tap Card**: For contactless, hold near reader
3. **Swipe Card**: For magnetic stripe, swipe through reader
4. **Enter PIN**: If required for the card
5. **Remove Card**: When prompted

## Handling Payment Scenarios

### Payment Approved

1. Reader shows "Approved"
2. POS marks payment as captured
3. Receipt prints (if enabled)
4. Order is complete

### Payment Declined

1. Reader shows decline reason
2. POS shows error message
3. Options:
   - Try a different card
   - Choose different payment method
   - Cancel the transaction

### Connection Lost

If the reader loses connection during payment:

1. POS shows connection error
2. Click **Retry** to attempt reconnection
3. Or **Cancel** to abort the payment
4. Check reader network connection

## Processing Card Refunds

For orders paid by card:

1. Go to refund screen
2. Select **Original Tender** as refund method
3. Process the refund
4. Refund is sent to Stripe automatically
5. Customer sees refund in 3-5 business days

::: info
Card refunds don't require the card to be present. The refund is processed to the original card used.
:::

## Cancelling a Payment

If you need to cancel a pending payment:

1. Click **Cancel Payment** in POS
2. The reader cancels the action
3. Customer can remove their card
4. Choose a different payment method or cancel order

## Webhook Setup (Optional)

For real-time payment updates:

### Creating a Webhook

1. Go to Stripe Dashboard > Developers > Webhooks
2. Click **Add endpoint**
3. Enter your webhook URL:
   ```
   https://yourdomain.com/pos/stripe/terminal/webhook
   ```
4. Select events:
   - `terminal.reader.action_failed`
   - `terminal.reader.action_succeeded`
5. Copy the signing secret
6. Enter it in POS Settings

### Webhook Benefits

- Real-time payment status updates
- Better error handling
- Automatic status synchronization

## Vendor Access (Marketplace)

If using Marketplace plugin:

1. Enable **Vendor Stripe Terminal Access** in POS Settings
2. Vendors can use card readers from their dashboard
3. Each vendor processes their own payments
4. Vendors need their own Stripe Terminal setup

## Troubleshooting

### Reader Not Showing

**Possible Causes**:
- Reader not registered in Stripe
- Reader not synced to POS
- Reader on different Stripe account

**Solutions**:
1. Check reader is registered in Stripe Dashboard
2. Click **Sync Readers** in POS
3. Verify correct Stripe API key

### Reader Offline

**Possible Causes**:
- Network connectivity issues
- Reader powered off
- Reader not configured

**Solutions**:
1. Check reader power and network
2. Restart the reader
3. Verify network settings on reader
4. Check firewall isn't blocking

### Payment Timeout

**Possible Causes**:
- Slow network connection
- Reader not responding
- Card reader busy

**Solutions**:
1. Check network connection
2. Restart the reader
3. Wait and retry
4. Try a different reader

### Payment Declined

**Common Decline Codes**:

| Code | Meaning | Action |
|------|---------|--------|
| `card_declined` | Card declined by issuer | Try different card |
| `insufficient_funds` | Not enough balance | Try different card |
| `expired_card` | Card has expired | Use valid card |
| `incorrect_pin` | Wrong PIN entered | Re-enter PIN |

### Refund Failed

**Possible Causes**:
- Original charge too old
- Charge already refunded
- Stripe account issue

**Solutions**:
1. Check original charge in Stripe Dashboard
2. Verify charge hasn't been fully refunded
3. Process refund directly in Stripe if needed

## Security Best Practices

### API Key Security

- Never share your secret key
- Use test keys for development
- Rotate keys periodically
- Restrict key permissions if possible

### Reader Security

- Place readers in secure locations
- Don't leave readers unattended
- Report lost/stolen readers to Stripe
- Use reader PINs if available

### Transaction Security

- Verify transaction amounts before processing
- Watch for suspicious behavior
- Review transactions regularly
- Enable Stripe Radar for fraud protection

## Testing

### Test Mode

1. Use Stripe test API keys
2. Use test card numbers:
   - `4242424242424242` - Successful payment
   - `4000000000000002` - Declined
   - `4000000000009995` - Insufficient funds
3. Test reader shows "TEST MODE"

### Going Live

1. Switch to live API keys
2. Remove test mode indicators
3. Process a small real transaction
4. Verify funds in Stripe Dashboard

## Permissions

Stripe Terminal requires:

| Permission | Allows |
|------------|--------|
| **POS** | Process card payments |
| **Settings** | Configure Stripe Terminal |

Assign these permissions in **Users** > **Roles**.
