# Ecommerce API

## Overview

The Ecommerce API provides RESTful endpoints for building mobile apps and custom storefronts. It covers the full shopping flow: browsing products, managing carts, applying coupons, checking out, and tracking orders.

All endpoints use the `/api/v1/ecommerce/` prefix. See the [API page](./api.md) for general authentication, API key protection, and response format details.

::: tip
The **cart does not store customer information** (name, email, address). Customer details are collected during checkout. This is a deliberate separation — the cart handles products and quantities, while checkout handles customer identity and shipping.
:::

## Common Headers

Every request should include:

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | `application/json` |
| `Accept` | Yes | `application/json` |
| `Authorization` | For auth endpoints | `Bearer {sanctum-token}` |
| `X-API-KEY` | If API key protection enabled | Your API key |
| `X-LANGUAGE` | No | Language code (`en`, `vi`, `fr`, etc.) |
| `X-CURRENCY` | No | Currency code (`USD`, `EUR`, `VND`, etc.) |

## Complete Purchase Flow

Here is the typical flow for a purchase, from browsing to order confirmation:

```
1. Browse products          GET  /products
2. Add to cart              POST /cart
3. Apply coupon (optional)  POST /coupon/apply
4. Proceed to checkout      GET  /checkout/cart/{cartId}  → redirects to web checkout
5. Submit order             (handled by the web checkout page)
6. View orders              GET  /orders
```

**For authenticated customers**, the flow includes syncing the cart:

```
1. Add items to cart (guest)     POST /cart           → returns cartId (UUID)
2. Customer logs in              POST /api/v1/login   → returns token
3. Sync guest cart to account    POST /cart/sync      → merges items
4. Apply coupon                  POST /coupon/apply
5. Checkout                      GET  /checkout/cart/{cartId}
```

---

## Products

### List Products

```
GET /api/v1/ecommerce/products
```

**Query parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (default: 1) |
| `per_page` | integer | Items per page (default: 10, max: 100) |
| `sort_by` | string | Sort field (`name`, `created_at`, `price`, etc.) |
| `order` | string | `asc` or `desc` |
| `categories[]` | array | Filter by category IDs |
| `brands[]` | array | Filter by brand IDs |
| `min_price` | number | Minimum price |
| `max_price` | number | Maximum price |
| `keyword` | string | Search keyword |

### Search Products

```
GET /api/v1/ecommerce/products/search
```

Same query parameters as listing, optimized for search.

### Get Product Details

```
GET /api/v1/ecommerce/products/{slug}
```

Returns full product data including variations, options, images, and pricing.

### Get Product Variation

```
GET /api/v1/ecommerce/product-variation/{id}
```

Returns a specific product variation by ID, including its price, stock, and images.

### Related Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products/{slug}/related` | Related products |
| GET | `/products/{slug}/cross-sale` | Cross-sell products |
| GET | `/products/{slug}/up-sale` | Up-sell products |
| GET | `/products/{slug}/reviews` | Product reviews |
| GET | `/products/{slug}/faqs` | Product FAQs |
| GET | `/products/{slug}/specifications` | Product specifications |
| GET | `/products/{slug}/flash-sale` | Flash sale info for product |

---

## Product Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/product-categories` | List all categories |
| GET | `/product-categories/{slug}` | Get category details |
| GET | `/product-categories/{id}/products` | List products in a category |

## Brands

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/brands` | List all brands |
| GET | `/brands/{slug}` | Get brand details |
| GET | `/brands/{id}/products` | List products by brand |

## Filters

```
GET /api/v1/ecommerce/filters
```

Returns available product filters (categories, brands, price range, attributes) for building filter UIs.

## Flash Sales

```
GET /api/v1/ecommerce/flash-sales
```

Returns active flash sale campaigns with discounted products.

---

## Cart

The cart supports both **guest** and **authenticated** users:

- **Guest users**: Cart is identified by a UUID (`cartId`). Store this ID on the client (e.g., AsyncStorage, localStorage) to persist the cart across sessions.
- **Authenticated users**: Cart is linked to the customer account. The UUID is not needed — the server uses the Sanctum token to identify the customer.

### Add Product to Cart

```
POST /api/v1/ecommerce/cart
POST /api/v1/ecommerce/cart/{cartId}
```

Use the first form to create a new cart. Use the second form to add items to an existing cart (pass the UUID returned from a previous call).

**Body parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `product_id` | integer | Yes | ID of the product to add |
| `qty` | integer | No | Quantity (default: 1, min: 1) |
| `options` | object | No | Product option selections (see below) |

**Product options** — If the product has configurable options (color, size, engraving text, etc.), pass them as an object keyed by option ID:

```json
{
  "product_id": 42,
  "qty": 2,
  "options": {
    "5": {
      "option_type": "dropdown",
      "values": "Red"
    },
    "8": {
      "option_type": "checkbox",
      "values": ["Gift wrap", "Include card"]
    },
    "12": {
      "option_type": "field",
      "values": "Happy Birthday!"
    }
  }
}
```

| Options field | Type | Description |
|---------------|------|-------------|
| `option_type` | string | `dropdown`, `radio`, `checkbox`, or `field` |
| `values` | string or array | Selected value(s). Use array for `checkbox` type. |

**Example request:**

```bash
curl -X POST https://your-domain.com/api/v1/ecommerce/cart \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "product_id": 1,
    "qty": 2
  }'
```

**Response:**

```json
{
  "error": false,
  "data": {
    "id": "e5a9bf3d-9f2c-4a1b-b73f-917f9b9d9a7c",
    "message": "Added product to cart successfully!",
    "status": true,
    "content": { ... },
    "cart_items": [
      {
        "id": 1,
        "row_id": "abc123",
        "name": "Product Name",
        "quantity": 2,
        "price": 29.99,
        "price_formatted": "$29.99",
        "original_price": 39.99,
        "original_price_formatted": "$39.99",
        "subtotal": 59.98,
        "subtotal_formatted": "$59.98",
        "tax_price": 3.00,
        "tax_price_formatted": "$3.00",
        "image_url": "https://your-domain.com/storage/products/image.jpg",
        "product_type": "physical",
        "variation_attributes": {},
        "options": [],
        "option_values": []
      }
    ],
    "count": 1,
    "sub_total": 59.98,
    "sub_total_formatted": "$59.98",
    "raw_total": 59.98,
    "raw_total_formatted": "$59.98",
    "tax_amount": 6.00,
    "tax_amount_formatted": "$6.00",
    "promotion_discount_amount": 0,
    "promotion_discount_amount_formatted": "$0.00",
    "coupon_discount_amount": 0,
    "coupon_discount_amount_formatted": "$0.00",
    "applied_coupon_code": null,
    "order_total": 65.98,
    "order_total_formatted": "$65.98"
  },
  "message": null
}
```

::: tip
**Save the `id` field** (UUID) from the response. You need it for all subsequent cart operations as a guest user.
:::

### Get Cart

```
GET /api/v1/ecommerce/cart/{cartId}
```

Returns the current cart contents with totals.

**For authenticated users**, the `{cartId}` is optional — the server identifies the cart from the auth token.

### Update Quantity

```
PUT /api/v1/ecommerce/cart/{cartId}
```

**Body parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `product_id` | integer | Yes | ID of the product to update |
| `qty` | integer | Yes | New quantity |

```bash
curl -X PUT https://your-domain.com/api/v1/ecommerce/cart/e5a9bf3d-9f2c-4a1b-b73f-917f9b9d9a7c \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "product_id": 1,
    "qty": 3
  }'
```

### Remove Item from Cart

```
DELETE /api/v1/ecommerce/cart/{cartId}
```

**Body parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `product_id` | integer | Yes | ID of the product to remove |

### Refresh Cart

Validates stock availability and recalculates prices for all items. Useful when the customer changes currency or returns to the cart after some time.

```
POST /api/v1/ecommerce/cart/refresh
```

**Body parameters:**

```json
{
  "products": [
    { "product_id": 1, "quantity": 2 },
    { "product_id": 3, "quantity": 1 }
  ]
}
```

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "slug": "product-slug",
      "name": "Product Name",
      "quantity": 10,
      "is_out_of_stock": false,
      "price": 29.99,
      "price_formatted": "$29.99"
    }
  ],
  "out_of_stock_products": [],
  "cart_total": 59.98,
  "cart_total_formatted": "$59.98"
}
```

### Sync Guest Cart to Customer Account

After a guest user logs in, merge their guest cart with their customer account cart.

```
POST /api/v1/ecommerce/cart/sync
Authorization: Bearer {token}
```

**Body parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `guest_cart_id` | string | No | UUID of the guest cart to merge |

**Response:**

```json
{
  "error": false,
  "data": {
    "id": "customer-id",
    "authenticated": true,
    "message": "Cart synced",
    "cart_items": [ ... ],
    "count": 3,
    "order_total": 89.97,
    "order_total_formatted": "$89.97"
  }
}
```

### Cart Endpoints Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/cart/{cartId?}` | Optional | Get cart contents |
| POST | `/cart` | Optional | Add item to new cart |
| POST | `/cart/{cartId}` | Optional | Add item to existing cart |
| PUT | `/cart/{cartId?}` | Optional | Update item quantity |
| DELETE | `/cart/{cartId?}` | Optional | Remove item from cart |
| POST | `/cart/refresh` | Optional | Validate stock and recalculate prices |
| POST | `/cart/sync` | Required | Merge guest cart to customer account |

---

## Coupons

### List Available Coupons

```
GET /api/v1/ecommerce/coupons
```

**Query parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `coupon_ids` | string | Comma-separated coupon IDs to filter |

### Apply Coupon

```
POST /api/v1/ecommerce/coupon/apply
```

**Body parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `coupon_code` | string | Yes | Coupon code (3-20 characters) |
| `cart_id` | string | Yes | Cart UUID |

```bash
curl -X POST https://your-domain.com/api/v1/ecommerce/coupon/apply \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "coupon_code": "SUMMER2024",
    "cart_id": "e5a9bf3d-9f2c-4a1b-b73f-917f9b9d9a7c"
  }'
```

**Response:**

```json
{
  "error": false,
  "data": {
    "cart_items": [ ... ],
    "coupon_discount_amount": 5.99,
    "coupon_discount_amount_formatted": "$5.99",
    "applied_coupon_code": "SUMMER2024",
    "order_total": 53.99,
    "order_total_formatted": "$53.99"
  },
  "message": "Coupon applied successfully"
}
```

### Remove Coupon

```
POST /api/v1/ecommerce/coupon/remove
```

**Body parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `coupon_code` | string | Yes | Coupon code to remove |
| `cart_id` | string | Yes | Cart UUID |

---

## Checkout

Checkout is handled via a **web-based checkout page**. The API provides an endpoint that redirects the user to the checkout form where they enter shipping address, billing info, and payment details.

### Process Checkout

```
GET /api/v1/ecommerce/checkout/cart/{cartId}
```

This endpoint:
1. Restores the cart using the provided ID (or from the authenticated customer's account)
2. Applies any coupon code stored in the cart
3. Generates a checkout session token
4. **Redirects (302)** to the web checkout page

**For mobile apps**, open this URL in a WebView and pass authentication headers:

```javascript
// React Native example
<WebView
  source={{
    uri: `${API_BASE_URL}/ecommerce/checkout/cart/${cartId}`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-LANGUAGE': 'en',
      'X-CURRENCY': 'USD',
    }
  }}
/>
```

**Checkout page collects:**

| Field | Required | Description |
|-------|----------|-------------|
| `address[name]` | Yes | Customer full name |
| `address[email]` | Yes | Email address |
| `address[phone]` | Yes | Phone number |
| `address[country]` | Depends on config | Country |
| `address[state]` | Depends on config | State/province |
| `address[city]` | Depends on config | City |
| `address[address]` | Depends on config | Street address |
| `address[zip_code]` | Depends on config | ZIP/postal code |
| `address[address_id]` | No | Use saved address (authenticated users) |
| `shipping_method` | For physical products | Selected shipping method |
| `payment_method` | Yes | Payment method (cod, bank_transfer, paypal, stripe, etc.) |

**Detecting order completion** — Watch for URL changes in the WebView:
- **Success**: URL contains `/checkout/*/success` or `/thank-you` or `/order-success`
- **Continue shopping**: URL contains `/products` or `/shop` or `/home`

### Calculate Tax

```
POST /api/v1/ecommerce/checkout/taxes/calculate
```

Calculate tax for products based on shipping address before completing checkout.

---

## Addresses (Authenticated)

Manage saved shipping addresses for the authenticated customer.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/addresses` | List saved addresses |
| POST | `/addresses` | Create new address |
| PUT | `/addresses/{id}` | Update address |
| DELETE | `/addresses/{id}` | Delete address |

### Create/Update Address

**Body parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Recipient name (max 191) |
| `phone` | string | Yes | Phone number |
| `email` | string | No | Email address |
| `country` | string | No | Country (max 120) |
| `state` | string | No | State/province (max 120) |
| `city` | string | No | City (max 120) |
| `address` | string | No | Street address (max 191) |
| `zip_code` | string | No | ZIP/postal code (max 20) |
| `is_default` | boolean | No | Set as default address |

```bash
curl -X POST https://your-domain.com/api/v1/ecommerce/addresses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "name": "John Doe",
    "phone": "+1234567890",
    "email": "john@example.com",
    "country": "United States",
    "state": "California",
    "city": "Los Angeles",
    "address": "123 Main Street",
    "zip_code": "90001",
    "is_default": true
  }'
```

---

## Orders (Authenticated)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/orders` | List customer's orders (paginated) |
| GET | `/orders/{id}` | Get order details |
| POST | `/orders/{id}/cancel` | Cancel an order |
| GET | `/orders/{id}/invoice` | Download order invoice |
| POST | `/orders/{id}/confirm-delivery` | Confirm order delivery |

### Order Tracking (Public)

Track orders without authentication using order ID and email.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/orders/tracking/settings` | Get tracking page settings |
| POST | `/orders/tracking` | Track order by ID and email |
| GET | `/orders/token/{token}` | Get order by token |

### Order Proof of Payment

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/orders/{id}/upload-proof` | Yes | Upload payment proof |
| GET | `/orders/{id}/download-proof` | Yes | Download payment proof |
| GET | `/orders/download-proof/{token}/{order_id}` | No | Download proof via token |

---

## Order Returns (Authenticated)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/order-returns` | List return requests |
| GET | `/order-returns/{id}` | Get return request details |
| POST | `/order-returns` | Create return request |
| GET | `/orders/{order_id}/returns` | Get return for a specific order |

---

## Wishlist

Wishlist supports both guest (UUID-based) and authenticated usage.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/wishlist/{id}` | Get wishlist items |
| POST | `/wishlist` | Add product to new wishlist |
| POST | `/wishlist/{id}` | Add product to existing wishlist |
| DELETE | `/wishlist/{id}` | Remove product from wishlist |

The `{id}` is a UUID for guest users, similar to how the cart works.

## Compare

Product comparison supports both guest (UUID-based) and authenticated usage.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/compare/{id}` | Get compare list |
| POST | `/compare` | Add product to new compare list |
| POST | `/compare/{id}` | Add product to existing compare list |
| DELETE | `/compare/{id}` | Remove product from compare list |

---

## Reviews (Authenticated)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/reviews` | List customer's reviews |
| POST | `/reviews` | Submit a product review |
| DELETE | `/reviews/{id}` | Delete a review |

---

## Downloads (Authenticated)

For digital products that have been purchased.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/downloads` | List available downloads |
| GET | `/downloads/{id}` | Download a purchased file |
| GET | `/download/{token}/{order_id}` | Download via token (public) |

---

## Currencies & Countries

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/currencies` | List available currencies |
| GET | `/currencies/current` | Get current active currency |
| GET | `/countries` | List available countries |

---

## Account Deletion (Authenticated)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/delete-account` | Request account deletion |
| POST | `/delete-account/verify` | Verify deletion with confirmation code |

---

## FAQ

### How do I send customer info when creating a cart?

You don't. The cart API only handles **products and quantities**. Customer information (name, email, phone, address) is collected during **checkout**, not when adding items to the cart.

The typical flow is:
1. **Cart phase**: Add products → the API returns a cart UUID
2. **Checkout phase**: Open the checkout URL in a WebView → the checkout page collects customer details, shipping address, and payment info

If you need to pre-fill customer information during checkout, either:
- **Authenticate the user** before checkout — their saved addresses will be available on the checkout page
- **Save addresses beforehand** using `POST /addresses` — the checkout page will show saved addresses for selection

### How does guest checkout work?

1. Add items to cart without authentication → you get a cart UUID
2. Open `GET /checkout/cart/{cartId}` in a WebView (no auth header needed)
3. The checkout page lets the guest enter their details and complete the purchase
4. Optionally, the guest can create an account during checkout

### How do I handle currency switching?

1. Send the `X-CURRENCY` header with every request (e.g., `X-CURRENCY: EUR`)
2. After switching currency, call `POST /cart/refresh` with your cart items to get updated prices
3. All price fields in responses will reflect the selected currency

### How do I handle multi-language?

Send the `X-LANGUAGE` header with every request (e.g., `X-LANGUAGE: vi`). Product names, descriptions, and all translatable content will be returned in the requested language.

### What is the difference between `cart` and `cart/{cartId}`?

- `POST /cart` — Creates a **new cart** and returns a UUID. Use this for the first item.
- `POST /cart/{cartId}` — Adds an item to an **existing cart**. Use this for subsequent items.

Both return the same response format. The only difference is whether a new cart is created or an existing one is used.
