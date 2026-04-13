---
title: REST API
description: Auxero REST API documentation with 50+ endpoints for mobile app integration.
---

# REST API

Auxero provides a comprehensive REST API with 50+ endpoints, using Laravel Sanctum for authentication. The API enables full mobile app integration for car listings, bookings, reviews, and customer management.

## Authentication

The API uses **Laravel Sanctum** token-based authentication.

### Register

```
POST /api/v1/register
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `first_name` | string | Yes | First name |
| `last_name` | string | Yes | Last name |
| `email` | string | Yes | Email address |
| `password` | string | Yes | Password (min 6 chars) |
| `password_confirmation` | string | Yes | Password confirmation |
| `phone` | string | No | Phone number |

### Login

```
POST /api/v1/login
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | Email address |
| `password` | string | Yes | Password |

Returns a bearer token for authenticated requests:

```json
{
  "data": {
    "token": "1|abc123...",
    "user": { ... }
  }
}
```

### Using the Token

Include the token in all authenticated requests:

```
Authorization: Bearer 1|abc123...
```

## Core Endpoints

### Cars

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/v1/cars` | No | List cars with filters |
| `GET` | `/api/v1/cars/{id}` | No | Get car details |
| `GET` | `/api/v1/cars/search` | No | Search cars |
| `GET` | `/api/v1/car-makes` | No | List car makes/brands |
| `GET` | `/api/v1/car-types` | No | List car types |
| `GET` | `/api/v1/car-categories` | No | List categories |

### Bookings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/v1/bookings` | Yes | List user bookings |
| `POST` | `/api/v1/bookings` | Yes | Create a booking |
| `GET` | `/api/v1/bookings/{id}` | Yes | Get booking details |
| `PUT` | `/api/v1/bookings/{id}/cancel` | Yes | Cancel a booking |

### Reviews

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/v1/cars/{id}/reviews` | No | Get car reviews |
| `POST` | `/api/v1/reviews` | Yes | Submit a review |
| `DELETE` | `/api/v1/reviews/{id}` | Yes | Delete own review |

### Wishlist

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/v1/wishlist` | Yes | List wishlist items |
| `POST` | `/api/v1/wishlist` | Yes | Add to wishlist |
| `DELETE` | `/api/v1/wishlist/{id}` | Yes | Remove from wishlist |

### Customer Profile

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/v1/me` | Yes | Get profile |
| `PUT` | `/api/v1/me` | Yes | Update profile |
| `PUT` | `/api/v1/me/password` | Yes | Change password |
| `POST` | `/api/v1/logout` | Yes | Logout |

### Compare

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/v1/compare` | No | List compared cars |
| `POST` | `/api/v1/compare` | No | Add to compare |
| `DELETE` | `/api/v1/compare/{id}` | No | Remove from compare |

### Locations

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/v1/countries` | No | List countries |
| `GET` | `/api/v1/states` | No | List states |
| `GET` | `/api/v1/cities` | No | List cities |

## Query Parameters for Car Listing

The `GET /api/v1/cars` endpoint supports these filter parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `car_makes[]` | array | Filter by make IDs |
| `car_categories[]` | array | Filter by category IDs |
| `car_types[]` | array | Filter by type IDs |
| `car_fuel_types[]` | array | Filter by fuel type IDs |
| `car_transmissions[]` | array | Filter by transmission IDs |
| `rental_rate_from` | integer | Minimum price |
| `rental_rate_to` | integer | Maximum price |
| `year_from` | integer | Minimum year |
| `year_to` | integer | Maximum year |
| `sort_by` | string | Sort: `recently_added`, `price_asc`, `price_desc` |
| `per_page` | integer | Items per page |
| `page` | integer | Page number |

## Response Format

All API responses follow this structure:

```json
{
  "data": { ... },
  "message": "Success",
  "error": false
}
```

Error responses:

```json
{
  "message": "Unauthenticated.",
  "error": true
}
```

::: tip
The API base URL is your site URL. For example: `https://auxero.botble.com/api/v1/cars`
:::
