# Ecommerce API

SnapCart provides ecommerce-specific API endpoints for products, cart, orders, and customer management.

## Products

- `GET /api/v1/ecommerce/products` - List products with filters
- `GET /api/v1/ecommerce/products/{id}` - Get product details
- `GET /api/v1/ecommerce/product-categories` - List product categories
- `GET /api/v1/ecommerce/brands` - List brands

### Product Filters

```bash
GET /api/v1/ecommerce/products?category_id=1&min_price=10&max_price=100&sort_by=price_asc
```

## Cart

- `GET /api/v1/ecommerce/cart` - Get current cart
- `POST /api/v1/ecommerce/cart` - Add item to cart
- `PUT /api/v1/ecommerce/cart/{id}` - Update cart item
- `DELETE /api/v1/ecommerce/cart/{id}` - Remove cart item

## Orders

- `GET /api/v1/ecommerce/orders` - List customer orders
- `GET /api/v1/ecommerce/orders/{id}` - Get order details
- `POST /api/v1/ecommerce/orders/tracking` - Track an order

## Customer

- `GET /api/v1/ecommerce/customer/profile` - Get customer profile
- `PUT /api/v1/ecommerce/customer/profile` - Update profile
- `GET /api/v1/ecommerce/customer/addresses` - List addresses
- `POST /api/v1/ecommerce/customer/addresses` - Add address

## Wishlist

- `GET /api/v1/ecommerce/wishlist` - Get wishlist
- `POST /api/v1/ecommerce/wishlist` - Add to wishlist
- `DELETE /api/v1/ecommerce/wishlist/{id}` - Remove from wishlist

::: tip
Use the API to build custom mobile apps or integrate with third-party services like ERP or CRM systems.
:::
