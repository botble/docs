# Shippo Integration Plugin Documentation

## Overview

The Shippo integration plugin provides multi-carrier shipping rates and address validation for Botble CMS ecommerce stores. It integrates with the Shippo API to offer real-time shipping rates from multiple carriers including USPS, FedEx, UPS, DHL, and many others.

## Features

- **Multi-carrier shipping rates**: Get real-time rates from 50+ carriers
- **Address validation**: Validate shipping addresses before processing
- **Label generation**: Create shipping labels directly from the admin panel
- **Package tracking**: Track shipments with automatic status updates via webhooks
- **Sandbox/Production modes**: Test integration before going live
- **Caching**: Cache shipping rates to improve performance
- **Logging**: Comprehensive logging for debugging and monitoring

## Installation & Setup

### Prerequisites

- Botble CMS with Ecommerce plugin enabled
- Shippo account and API keys
- Location plugin enabled (for address management)

### Configuration

1. **API Keys Setup**:
   - Get your API keys from Shippo dashboard
   - Navigate to Admin → Plugins → Ecommerce → Shipping → Shippo
   - Enter your Test API Key and Production API Key
   - Enable/disable Sandbox mode

2. **Basic Settings**:
   - Enable Shippo shipping method
   - Configure logging (recommended for debugging)
   - Enable response caching for better performance
   - Configure webhook settings

3. **Store Address**:
   - Ensure your store's origin address is properly configured
   - This is used as the "from" address for rate calculations

### Quick Setup Command

Use the initialization command to quickly set up Shippo with sample data:

```bash
php artisan cms:shippo:init --key=your_test_api_key
```

This command will:
- Enable required location settings
- Set up sample addresses
- Configure basic Shippo settings

## Architecture & Internal Workings

### Core Components

#### 1. Main Shippo Class (`src/Shippo.php`)

The central service class that handles all Shippo API interactions:

```php
class Shippo
{
    // API configuration
    protected ?string $liveApiToken;
    protected ?string $testApiToken;
    protected bool $sandbox;
    
    // Caching and logging
    protected Cache $cache;
    protected LoggerInterface $logger;
    
    // Core methods
    public function getRates(array $params): array
    public function createTransaction(string $rateId): array
    public function validateAddress(array $address): array
}
```

**Key Methods**:
- `getRates()`: Fetches shipping rates from Shippo API
- `createTransaction()`: Creates shipping labels
- `validateAddress()`: Validates shipping addresses
- `retrieveRate()`: Gets detailed rate information

#### 2. Controllers

**ShippoController** (`src/Http/Controllers/ShippoController.php`):
- Handles admin panel interactions
- Creates shipping transactions
- Manages rate selection
- Generates shipping labels

**ShippoWebhookController** (`src/Http/Controllers/ShippoWebhookController.php`):
- Processes webhook notifications from Shippo
- Updates shipment tracking status
- Handles transaction updates

**ShippoSettingController** (`src/Http/Controllers/ShippoSettingController.php`):
- Manages plugin configuration
- Validates API credentials
- Handles settings updates

#### 3. Service Providers

**ShippoServiceProvider**: Main service provider that:
- Registers routes and middleware
- Sets up logging configuration
- Publishes assets and configurations

**HookServiceProvider**: Integrates with Botble's hook system:
- Adds Shippo to shipping methods enum
- Handles shipping fee calculations
- Adds admin interface elements

### API Flow & Integration

#### 1. Shipping Rate Calculation Flow

```
Customer Checkout → Cart Calculation → HookServiceProvider::handleShippingFee() 
→ Shippo::getRates() → Shippo API → Cache Results → Return Rates to Frontend
```

**Detailed Process**:

1. **Trigger**: When customer views cart/checkout or changes shipping address
2. **Data Preparation**: 
   - Extract cart items (weight, dimensions, value)
   - Get origin address from store settings
   - Get destination address from customer input
   - Prepare package information

3. **API Call**:
   - Create shipment object via Shippo API
   - Include package details, addresses, and preferences
   - Handle insurance and signature requirements

4. **Rate Processing**:
   - Receive available rates from multiple carriers
   - Filter rates based on service levels
   - Apply COD restrictions if applicable
   - Cache results for performance

5. **Response**: Return formatted rates to checkout page

#### 2. Order Processing & Label Creation

```
Order Placed → Admin Creates Shipment → Select Rate → Create Transaction 
→ Generate Label → Update Shipment Status → Webhook Updates
```

**Process Details**:

1. **Order Creation**: Standard Botble ecommerce order flow
2. **Shipment Creation**: Admin creates shipment record
3. **Rate Selection**: Admin selects from available rates
4. **Transaction Creation**:
   - Call `Shippo::createTransaction()`
   - Generate shipping label (PDF)
   - Get tracking number and URL
   - Update shipment with tracking info

5. **Status Updates**: Webhook handles automatic status updates

#### 3. Webhook Processing

Shippo sends webhook notifications for:
- **transaction_updated**: Label creation, refunds
- **track_updated**: Delivery status changes

**Webhook Flow**:
```
Shippo Event → Webhook URL → WebhookMiddleware (Auth) → ShippoWebhookController 
→ Update Shipment Status → Create History Record
```

### Database Integration

The plugin doesn't create custom tables but uses existing Botble ecommerce tables:

#### Shipment Table Fields Used:
- `rate_id`: Stores selected Shippo rate ID
- `tracking_id`: Shippo transaction object ID
- `tracking_link`: Carrier tracking URL
- `label_url`: PDF label download URL
- `metadata`: JSON storage for transaction details
- `status`: Shipment status (integrated with Botble enums)

#### ShipmentHistory Table:
- Tracks all shipment events
- Records webhook updates
- Stores admin actions

### Caching Strategy

**Rate Caching**:
- Cache key based on package details and addresses
- Configurable cache duration
- Automatic cache invalidation
- Improves checkout performance

**Address Caching**:
- Validated addresses cached to avoid re-validation
- Reduces API calls for repeat customers

### Error Handling & Logging

**Logging Levels**:
- API requests and responses
- Error conditions and exceptions
- Webhook events
- Cache operations

**Log Files**:
- `storage/logs/shippo-YYYY-MM-DD.log`
- Viewable from admin settings page
- Configurable logging levels

### Security Features

**Webhook Security**:
- Token-based authentication
- Middleware validation
- Request origin verification

**API Security**:
- Separate test/production keys
- Sandbox mode for testing
- Secure credential storage

## Integration with Botble Modules

### Ecommerce Module Integration

**Shipping Methods**:
- Registers as shipping method enum value
- Integrates with shipping fee calculation
- Supports shipping rules and restrictions

**Order Management**:
- Seamless integration with order workflow
- Shipment creation and tracking
- Status synchronization

**Admin Interface**:
- Adds Shippo-specific buttons to shipment details
- Rate selection interface
- Label generation tools

### Location Plugin Integration

**Address Management**:
- Uses Location plugin for country/state/city data
- Address validation integration
- Geocoding support

**Store Configuration**:
- Origin address from store locator
- Multi-store support (marketplace)

### Marketplace Plugin Integration

**Vendor Support**:
- Per-vendor shipping configuration
- Vendor-specific origin addresses
- Access control for vendor users

## Events & Hooks

### Laravel Events Used

**RouteMatched Event**:
- Registers webhook middleware
- Sets up route aliases

### Botble Hooks Used

**handle_shipping_fee**:
- Priority: 11
- Calculates Shippo shipping rates
- Integrates with checkout process

**SHIPPING_METHODS_SETTINGS_PAGE**:
- Adds Shippo settings to shipping configuration
- Displays log files and status

**BASE_FILTER_ENUM_ARRAY & BASE_FILTER_ENUM_LABEL**:
- Registers Shippo as shipping method
- Provides human-readable labels

**shipment_buttons_detail_order**:
- Adds Shippo-specific action buttons
- Integrates with order detail page

### Custom Events

The plugin doesn't define custom events but responds to:
- Order status changes
- Shipment creation
- Webhook notifications

## Configuration Options

### API Settings
- `shipping_shippo_status`: Enable/disable plugin
- `shipping_shippo_test_key`: Test API key
- `shipping_shippo_production_key`: Production API key
- `shipping_shippo_sandbox`: Sandbox mode toggle

### Operational Settings
- `shipping_shippo_logging`: Enable logging
- `shipping_shippo_cache_response`: Enable rate caching
- `shipping_shippo_webhooks`: Enable webhook processing

### Package Types & Service Levels

The plugin supports 100+ package types and service levels from major carriers:

**Major Carriers Supported**:
- USPS (Priority, Express, First Class, etc.)
- FedEx (Ground, 2Day, Overnight, International)
- UPS (Ground, Express, International)
- DHL (Express, eCommerce)
- Canada Post, Australia Post
- Regional carriers (OnTrac, LSO, etc.)

**Package Types Include**:
- Standard parcels
- Carrier-specific envelopes and boxes
- Flat rate options
- International shipping containers
- Specialized packaging (tubes, paks, etc.)

## Usage Examples

### Basic Rate Calculation

```php
$shippo = app(Shippo::class);

$params = [
    'address_from' => [
        'street1' => '215 Clayton St.',
        'city' => 'San Francisco',
        'state' => 'CA',
        'zip' => '94117',
        'country' => 'US'
    ],
    'address_to' => [
        'street1' => '1 Market St.',
        'city' => 'San Francisco',
        'state' => 'CA',
        'zip' => '94105',
        'country' => 'US'
    ],
    'parcels' => [[
        'length' => 10,
        'width' => 10,
        'height' => 10,
        'distance_unit' => 'in',
        'weight' => 1,
        'mass_unit' => 'lb'
    ]]
];

$rates = $shippo->getRates($params);
```

### Creating Shipping Label

```php
// After rate selection
$transaction = $shippo->createTransaction($rateId);

if ($transaction['status'] === 'SUCCESS') {
    $labelUrl = $transaction['label_url'];
    $trackingNumber = $transaction['tracking_number'];
    // Update shipment record
}
```

### Address Validation

```php
$address = [
    'street1' => '1 Market St',
    'city' => 'San Francisco',
    'state' => 'CA',
    'zip' => '94105',
    'country' => 'US'
];

$validation = $shippo->validateAddress($address);
```

## Troubleshooting

### Common Issues

**1. No Rates Returned**:
- Check API credentials
- Verify origin/destination addresses
- Review package dimensions and weight
- Check carrier service availability

**2. Webhook Not Working**:
- Verify webhook URL accessibility
- Check middleware authentication
- Review webhook token configuration
- Examine webhook logs

**3. Label Generation Fails**:
- Ensure rate is still valid
- Check transaction status
- Verify API permissions
- Review error logs

### Debug Tools

**Log Analysis**:
- View logs from admin settings page
- Check `storage/logs/shippo-*.log`
- Enable detailed logging for debugging

**API Testing**:
- Use sandbox mode for testing
- Validate API credentials
- Test with known good addresses

**Cache Issues**:
- Clear shipping rate cache
- Disable caching temporarily
- Check cache configuration

## Best Practices

### Performance Optimization

1. **Enable Caching**: Cache shipping rates to reduce API calls
2. **Address Validation**: Validate addresses before rate calculation
3. **Batch Processing**: Group similar shipments when possible
4. **Error Handling**: Implement proper fallback mechanisms

### Security Considerations

1. **API Key Management**: Keep production keys secure
2. **Webhook Security**: Validate webhook authenticity
3. **Access Control**: Restrict admin access appropriately
4. **Logging**: Monitor for suspicious activity

### Operational Guidelines

1. **Testing**: Always test in sandbox before production
2. **Monitoring**: Monitor logs and webhook status
3. **Backup**: Keep configuration backups
4. **Updates**: Stay current with API changes

## API Reference

### Shippo Class Methods

#### `getRates(array $params): array`
Fetches shipping rates from Shippo API.

**Parameters**:
- `$params`: Array containing shipment details
  - `address_from`: Origin address
  - `address_to`: Destination address
  - `parcels`: Package information
  - `extra`: Additional options (insurance, signature, etc.)

**Returns**: Array of available shipping rates

#### `createTransaction(string $rateId): array`
Creates a shipping transaction and generates label.

**Parameters**:
- `$rateId`: Selected rate identifier

**Returns**: Transaction details including label URL and tracking info

#### `validateAddress(array $address): array`
Validates a shipping address.

**Parameters**:
- `$address`: Address to validate

**Returns**: Validation results and corrected address

### Webhook Events

#### transaction_updated
Triggered when transaction status changes.

**Payload**:
```json
{
    "event": "transaction_updated",
    "data": {
        "object_id": "transaction_id",
        "status": "SUCCESS|ERROR|REFUNDED",
        "tracking_number": "1234567890"
    }
}
```

#### track_updated
Triggered when shipment tracking status changes.

**Payload**:
```json
{
    "event": "track_updated",
    "data": {
        "tracking_status": {
            "object_id": "transaction_id",
            "status": "PRE_TRANSIT|TRANSIT|DELIVERED|RETURNED|FAILURE"
        }
    }
}
```

## Support & Resources

### Documentation Links
- [Shippo API Documentation](https://goshippo.com/docs/)
- [Botble CMS Documentation](https://docs.botble.com/)
- [Plugin Development Guide](https://docs.botble.com/plugin-development)

### Getting Help
- Check plugin logs for error details
- Review Shippo API status page
- Contact Botble support for integration issues
- Use sandbox mode for testing and debugging

This documentation provides a comprehensive overview of the Shippo integration plugin, covering its architecture, functionality, and usage within the Botble CMS ecosystem.
