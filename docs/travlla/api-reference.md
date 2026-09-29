# API Reference

Travlla ships with a REST API for building mobile apps or integrations: tours, availability, pricing, bookings, customer accounts and vendor tools. This page covers the Travlla-specific endpoints. For enabling the API, tokens and general request format, see [API](/cms/api).

## Downloads

- [Interactive reference](/travlla/api-docs/index.html){target="_self"}: every endpoint with parameters, validation rules, example requests (cURL, JavaScript, PHP) and real example responses.
- [Postman collection](/travlla/api-docs/travlla-api.postman_collection.json){target="_self" download}: all endpoints with sample requests and responses.
- [OpenAPI 3 spec](/travlla/api-docs/travlla-api.openapi.yaml){target="_self" download}: for Swagger UI, Insomnia or client code generators.

### Using the Postman collection

1. Import the collection in Postman.
2. On the collection's **Variables** tab, set `baseUrl` to your site URL (for example `https://your-domain.com`).
3. Run **Authentication > Login customer** (or **Register a new customer**). The returned token is saved to the `token` variable automatically, and every authenticated request uses it.
4. If you set an API key in **Admin > Settings > API**, put it in the `apiKey` variable and enable the `X-API-KEY` header on the requests.

## Basics

- **Base path**: `https://your-domain.com/api/v1/tour-manager`
- **Enable the API**: **Admin > Settings > API**. Every endpoint returns `404` until it is enabled.
- **Headers**: send `Accept: application/json` on every request, and `Content-Type: application/json` for JSON bodies.
- **Authentication**: `POST /auth/login` or `POST /auth/register` returns `data.token`. Send it as `Authorization: Bearer {token}`. Vendor endpoints need a token from a vendor account.

### Response format

Every response uses the same envelope:

```json
{
  "error": false,
  "data": { },
  "message": null
}
```

List endpoints return paginated data and accept `per_page`.

### Errors

| Status | Meaning |
| --- | --- |
| `401` | Missing or invalid token. Vendor endpoints also return `401` (plain-text body) for non-vendor accounts. |
| `404` | The tour, booking or invoice was not found. |
| `422` | Validation failed. The response lists the errors for each field. |

Some business rules (for example "This tour requires a minimum of 2 person(s).") return HTTP `200` with `"error": true` and the reason in `message`. Always check the `error` field.

## Typical booking flow

1. `GET /tours` or `GET /tours/search` to list tours, `GET /tours/id/{id}` for details.
2. `GET /tours/id/{id}/availability` to get departures and pick a `departure_id`.
3. `POST /calculate-price` with `tour_id`, `departure_id`, `persons` (optional `hotel_rating`, `services`, `coupon_code`) to show the total.
4. `POST /bookings` with the same fields. Guests also send `customer_name` and `customer_email`; signed-in customers send their token instead.
5. `GET /bookings/{id}` to show the result (guests add `email`). Guests list their bookings with `GET /bookings?booking_code=...&email=...`.

Coupons are applied by passing `coupon_code` to `POST /calculate-price` and `POST /bookings`. `POST /coupons/validate` checks a code on its own.

## Endpoints

All paths are relative to `/api/v1/tour-manager`. **Optional** auth means the endpoint works for guests, and acts as the customer when a token is sent.

### Authentication

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/auth/register` | - | Register a new customer |
| POST | `/auth/login` | - | Login customer |
| POST | `/auth/forgot-password` | - | Send password reset link |
| POST | `/auth/reset-password` | - | Reset password |
| POST | `/auth/logout` | Bearer | Logout customer |

### Tours, catalog and bookings

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/tours` | - | List tours |
| GET | `/tours/search` | - | Search tours |
| GET | `/tours/filters` | - | Get tour filters |
| GET | `/tours/{slug}` | - | Find tour by slug |
| GET | `/tours/id/{id}` | - | Get tour details |
| GET | `/tours/id/{id}/availability` | - | Check tour availability |
| GET | `/tours/id/{id}/similar` | - | Get similar tours |
| GET | `/destinations` | - | List destinations |
| GET | `/tour-types` | - | List tour types |
| GET | `/tour-categories` | - | List tour categories |
| GET | `/tour-amenities` | - | List tour amenities |
| GET | `/locations` | - | List locations |
| GET | `/locations/search` | - | Search locations |
| GET | `/tours/{tour_id}/reviews` | - | Get tour reviews |
| POST | `/coupons/validate` | - | Validate a coupon code |
| GET | `/bookings` | Optional | List bookings (customer's own with a token; guests pass booking_code + email) |
| POST | `/bookings` | Optional | Create a new booking (supports both guest and authenticated users) |
| GET | `/bookings/{id}` | Optional | Get booking details |
| PUT | `/bookings/{id}` | Optional | Update booking |
| POST | `/bookings/{id}/cancel` | Optional | Cancel booking |
| GET | `/bookings/{id}/invoice` | Optional | Get booking invoice |
| POST | `/reviews` | Bearer | Create a review |

### Pricing

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/calculate-price` | - | Calculate tour pricing (per-person, per departure) |

### Customer profile

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/profile` | Bearer | Get customer profile |
| PUT | `/profile` | Bearer | Update customer profile |
| POST | `/profile/avatar` | Bearer | Update customer avatar |
| POST | `/profile/change-password` | Bearer | Change customer password |

### Favorites

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/favorites` | Bearer | List user's favorite tours |
| POST | `/favorites/{tour_id}` | Bearer | Add tour to favorites |
| DELETE | `/favorites/{tour_id}` | Bearer | Remove tour from favorites |

### Inquiries

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/inquiries` | - | Submit an inquiry |

### Vendor

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/vendor/profile` | Bearer | Get vendor profile |
| PUT | `/vendor/profile` | Bearer | Update vendor profile |
| GET | `/vendor/tours` | Bearer | List vendor tours |
| POST | `/vendor/tours` | Bearer | Create a new tour |
| GET | `/vendor/tours/{id}` | Bearer | Get tour details |
| PUT | `/vendor/tours/{id}` | Bearer | Update tour |
| DELETE | `/vendor/tours/{id}` | Bearer | Delete tour |
| POST | `/vendor/tours/{id}/images` | Bearer | Upload tour images |
| GET | `/vendor/bookings` | Bearer | List vendor bookings |
| GET | `/vendor/bookings/{id}` | Bearer | Get booking details |
| PUT | `/vendor/bookings/{id}/status` | Bearer | Update booking status |
| POST | `/vendor/bookings/{id}/complete` | Bearer | Complete booking |
| GET | `/vendor/dashboard` | Bearer | Get vendor dashboard data |
| GET | `/vendor/reviews` | Bearer | List vendor reviews |
| GET | `/vendor/earnings` | Bearer | Get vendor earnings list |

