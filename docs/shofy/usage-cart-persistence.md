# Cart Persistence & Cross-Device Sync

The cart persistence feature ensures customers never lose their cart items, even when closing the browser, switching devices, or logging in from different locations.

## Overview

The system provides:

1. **Guest cart persistence** - Cart saved to database with cookie-based identifier (30 days)
2. **Customer cart sync** - Logged-in customers see the same cart across all devices
3. **Cart merge on login** - Guest cart merges with customer cart when logging in
4. **Automatic cleanup** - Expired carts removed daily to prevent database bloat

## How It Works

### Guest Users

When a guest adds items to cart:

1. A unique identifier (UUID) is stored in a cookie (`guest_cart_id`)
2. Cart is saved to database linked to this identifier
3. Cookie expires after 30 days
4. On return visits, cart is automatically restored from database

### Logged-In Customers

When a customer logs in:

1. Their existing cart is restored from database
2. If they had a guest cart, items are merged
3. Cart syncs across all devices (30-second cache for performance)
4. After checkout, cart is cleared from both session and database

### Cart Merge Flow

```
Guest adds items → Logs in → Guest cart merged into customer cart
                           → Guest cart deleted
                           → Cookie cleared
```

When the same product exists in both carts, quantities are combined.

## Configuration

### Retention Periods

The cart cleanup job uses these default retention periods:

| Cart Type | Retention | Description |
|-----------|-----------|-------------|
| Guest carts | 30 days | Carts without customer_id |
| Customer carts | 90 days | Carts linked to customer accounts |

### Cleanup Command

The cleanup runs automatically via daily scheduled task. You can also run it manually:

```bash
# Run cleanup with defaults
php artisan cms:cleanup-expired-carts

# View statistics only
php artisan cms:cleanup-expired-carts --stats

# Custom retention periods
php artisan cms:cleanup-expired-carts --guest-days=14 --customer-days=60
```

### Cache Settings

The cart restoration uses a 30-second cache to optimize performance:

- Database is only queried when cache expires
- Timestamp comparison ensures only newer carts are restored
- Reduces database load on high-traffic sites

## Technical Details

### Database Schema

Carts are stored in the `ec_cart` table:

| Column | Type | Description |
|--------|------|-------------|
| identifier | string | UUID for guests, customer ID for logged-in |
| instance | string | Cart instance (e.g., "cart", "wishlist") |
| content | text | Serialized cart items |
| customer_id | bigint | NULL for guests, customer ID for logged-in |
| created_at | timestamp | When cart was first created |
| updated_at | timestamp | When cart was last modified |

### Cookie Details

| Cookie | Value | Expiration | Purpose |
|--------|-------|------------|---------|
| `guest_cart_id` | UUID | 30 days | Identifies guest cart in database |

### Events & Listeners

The system uses Laravel events for cart operations:

| Event | Listener | Action |
|-------|----------|--------|
| `Login` | `SyncCartOnLogin` | Restore customer cart, merge guest cart |
| `Registered` | `LinkCartOnRegistration` | Link guest cart to new customer |
| `Logout` | `PersistCartOnLogout` | Save cart to database |

### Middleware

`RestoreCustomerCartMiddleware` runs on every frontend request:

1. Checks if user is logged in
2. For customers: Restores cart if database is newer than session
3. For guests: Restores cart using cookie identifier
4. Uses 30-second cache to minimize database queries

## Troubleshooting

### Cart not persisting for guests

1. **Check cookies** - Ensure browser accepts cookies
2. **Verify middleware** - `RestoreCustomerCartMiddleware` must be registered
3. **Check database** - Look for records in `ec_cart` with `customer_id = NULL`

### Cart not syncing across devices

1. **Same account** - Ensure logging into same customer account
2. **Check timestamps** - Database cart must have newer `updated_at` than session
3. **Cache timing** - Changes may take up to 30 seconds to sync

### Cart not merging on login

1. **Check cookie** - `guest_cart_id` cookie must exist before login
2. **Verify listener** - `SyncCartOnLogin` listener must be registered
3. **Check database** - Guest cart must exist in `ec_cart` table

### Cart not cleared after checkout

1. **Check order completion** - Order must be successfully processed
2. **Verify cleanup code** - `OrderHelper::processOrder()` should delete cart
3. **For guests** - Cookie should be cleared after checkout

## Best Practices

1. **Don't extend guest cookie** - 30 days is industry standard (Magento, Shopify)

2. **Run cleanup daily** - Prevents database bloat from abandoned carts

3. **Monitor cart table size** - Check `ec_cart` table growth periodically

4. **Consider Redis sessions** - For high-traffic sites, improves session performance

## Comparison with Industry Standards

| Feature | Amazon | Shopify | Magento | Shofy |
|---------|--------|---------|---------|-------|
| Guest cart persistence | 90 days | 10 days | 30 days | 30 days |
| Cross-device sync | Yes | Yes | Yes | Yes |
| Cart merge on login | Yes | Yes | Yes | Yes |
| Real-time persistence | Yes | Yes | Yes | Yes |
| Automatic cleanup | Yes | Yes | Yes | Yes |

## Related Features

- [Abandoned Carts](./usage-abandoned-carts.md) - Email recovery for unpurchased carts
- [Add to Cart via URL](./usage-add-to-cart-url.md) - Share product URLs with cart action
