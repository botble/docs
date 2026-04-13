---
title: REST API
description: Auxero REST API documentation for mobile app integration.
---

# REST API

Auxero ships with a REST API powered by Laravel Sanctum. All car-manager endpoints live under the `api/v1/car-manager` prefix.

**Base URL:** `https://your-site.com/api/v1/car-manager`

## Authentication

Auxero uses **Laravel Sanctum** bearer tokens. Register or log in to get a token, then pass it with every authenticated request.

### Register

```
POST /api/v1/car-manager/auth/register
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Customer name |
| `email` | string | Yes | Email address (unique) |
| `password` | string | Yes | Password |
| `password_confirmation` | string | Yes | Must match `password` |
| `phone` | string | No | Phone number |
| `dob` | date | No | Date of birth |
| `is_vendor` | boolean | No | Register as a vendor |

Response includes `customer`, `token`, and `token_type: Bearer`.

### Login

```
POST /api/v1/car-manager/auth/login
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | Email address |
| `password` | string | Yes | Password |

### Forgot / Reset Password

```
POST /api/v1/car-manager/auth/forgot-password
POST /api/v1/car-manager/auth/reset-password
```

### Logout

```
POST /api/v1/car-manager/auth/logout
```

Requires `Authorization: Bearer {token}` header.

### Using the Token

```
Authorization: Bearer 1|abc123...
```

## Public Endpoints

### Cars

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/cars` | List cars (supports filters & pagination) |
| `GET` | `/cars/search` | Search cars by criteria |
| `GET` | `/cars/filters` | Get available filter options |
| `GET` | `/cars/{slug}` | Get car by slug |
| `GET` | `/cars/id/{id}` | Get car by ID |
| `GET` | `/cars/id/{id}/availability` | Check availability for date range |
| `GET` | `/cars/id/{id}/similar` | Get similar cars |

### Taxonomies

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/car-makes` | List car makes/brands |
| `GET` | `/car-types` | List car types |
| `GET` | `/car-categories` | List categories |
| `GET` | `/car-transmissions` | List transmissions |
| `GET` | `/car-fuels` | List fuel types |
| `GET` | `/car-amenities` | List amenities |

### Locations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/locations` | List locations |
| `GET` | `/locations/search` | Search locations |

### Reviews (read-only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/cars/{car_id}/reviews` | Get reviews for a car |

### Pricing & Coupons (public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/calculate-price` | Calculate booking price |
| `POST` | `/coupons/validate` | Validate a coupon code |

### Inquiries

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/inquiries` | Submit a customer inquiry |

## Bookings

Bookings are accessible to both guest and authenticated users.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/bookings` | List bookings |
| `POST` | `/bookings` | Create a booking |
| `GET` | `/bookings/{id}` | Get booking details |
| `PUT` | `/bookings/{id}` | Update a booking |
| `POST` | `/bookings/{id}/cancel` | Cancel a booking |
| `GET` | `/bookings/{id}/invoice` | Get booking invoice |

## Authenticated Endpoints

All endpoints below require `Authorization: Bearer {token}`.

### Profile

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/profile` | Get current profile |
| `PUT` | `/profile` | Update profile |
| `POST` | `/profile/avatar` | Upload avatar |
| `POST` | `/profile/change-password` | Change password |

### Reviews (write)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/reviews` | Submit a review |

### Favorites / Wishlist

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/favorites` | List favorites |
| `POST` | `/favorites/{car_id}` | Add to favorites |
| `DELETE` | `/favorites/{car_id}` | Remove from favorites |

### Coupons (apply)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/coupons/apply` | Apply a coupon |
| `POST` | `/coupons/remove` | Remove an applied coupon |

## Vendor Endpoints

Vendor endpoints require an authenticated user with vendor verification. Prefix: `/vendor`.

### Vendor Profile

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/vendor/profile` | Get vendor profile |
| `PUT` | `/vendor/profile` | Update vendor profile |

### Vendor Cars

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/vendor/cars` | List vendor's cars |
| `POST` | `/vendor/cars` | Add a car |
| `GET` | `/vendor/cars/{id}` | Get car details |
| `PUT` | `/vendor/cars/{id}` | Update car |
| `DELETE` | `/vendor/cars/{id}` | Delete car |
| `POST` | `/vendor/cars/{id}/images` | Upload car images |

### Vendor Bookings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/vendor/bookings` | List vendor's bookings |
| `GET` | `/vendor/bookings/{id}` | Get booking details |
| `PUT` | `/vendor/bookings/{id}/status` | Update booking status |
| `POST` | `/vendor/bookings/{id}/complete` | Mark booking complete |

### Vendor Dashboard, Reviews & Earnings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/vendor/dashboard` | Dashboard summary |
| `GET` | `/vendor/reviews` | List received reviews |
| `POST` | `/vendor/reviews/{id}/reply` | Reply to a review |
| `GET` | `/vendor/earnings` | Earnings summary |

## Filter Parameters for `GET /cars`

| Parameter | Type | Description |
|-----------|------|-------------|
| `make_id` | int | Filter by make ID |
| `type_id` | int | Filter by vehicle type ID |
| `transmission_id` | int | Filter by transmission ID |
| `fuel_id` | int | Filter by fuel type ID |
| `min_price` | int | Minimum rental rate |
| `max_price` | int | Maximum rental rate |
| `seats` | int | Minimum number of seats |
| `year_from` | int | Minimum year |
| `year_to` | int | Maximum year |
| `location` | string | Filter by location text |
| `amenities` | array/csv | Filter by amenity IDs |
| `search` | string | Full-text search |
| `sort_by` | string | One of `created_at`, `name`, `rental_rate`, `year` |
| `sort_order` | string | `asc` or `desc` |
| `per_page` | int | Items per page (max 50, default 12) |
| `page` | int | Page number |

## Response Format

Successful response:

```json
{
  "error": false,
  "data": { },
  "message": ""
}
```

Error response:

```json
{
  "error": true,
  "data": null,
  "message": "Error description"
}
```

::: tip
Example full URL: `https://auxero.botble.com/api/v1/car-manager/cars?make_id=1&min_price=50`
:::
