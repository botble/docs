# API Integration

The Carento app talks to a Botble backend running the **car-manager** plugin over its REST API. Every screen (car listings, booking flow, dealers, blog) is fed by this API. This page documents the base URL, headers, response envelope, and the endpoints the app calls.

## Base URL / environment

- `API_BASE_URL` (`.env`, e.g. `http://carento.test`) is the Botble backend's site root. `app.config.js` appends `/api/v1` to build `appConfig.api.baseUrl` (used for every request) and keeps the raw root as `appConfig.api.siteUrl` (used to build the hosted-checkout WebView URL).
- Do **not** put `/api/v1` in `API_BASE_URL` yourself; it is appended automatically. Use no trailing slash, and `https://` in production.
- `API_KEY` (`.env`, optional) is sent as the `X-API-KEY` header. Only set this if an API key is configured in Botble admin under **Settings → API**.
- Values are resolved at runtime via `expo-constants` (`Constants.expoConfig.extra.appConfig`, injected by `app.config.js` from `process.env` at build/start time) and read through `src/config/app.ts` (`appConfig`).

See [API Base URL](06_api_base_url.md) for the full configuration walkthrough.

## Test the connection

Open this URL in a browser (replace the host):

```
http://carento.test/api/v1/car-manager/cars
```

You should get a JSON response with a `data` array of cars. If not, check:

- `404`: the car-manager plugin is not installed/enabled, or the API is turned off.
- `401`: an API key is required but `API_KEY` is missing or wrong.
- `503`: the API is disabled in admin or the site is in maintenance mode.
- Empty `data`: no cars are published/available on the backend.

## Response envelope

Every car-manager / plugin endpoint wraps its payload in the same envelope:

```ts
interface ApiResponse<T> {
  error: boolean;
  data: T;
  message: string;
}
```

List endpoints return a `PaginatedResponse<T>` instead. Same shape but `data: T[]` plus Laravel pagination `links`/`meta` siblings:

```ts
interface PaginatedResponse<T> {
  error: boolean;
  data: T[];
  links?: { first; last; prev; next };
  meta?: { current_page; from; last_page; path; per_page; to; total };
}
```

`src/services/apiClient.ts` (`api.get/post/put/patch/delete`) returns the raw parsed JSON body. Each `src/services/*.ts` function unwraps `res.data` (or `res.message` for confirmation-only endpoints) so screens and hooks work with plain domain types, not the envelope.

## Auth headers

`createHeaders(token?)` in `apiClient.ts` builds every request's headers:

| Header | When set |
|---|---|
| `Content-Type: application/json` | Always, unless the body is `FormData` (fetch sets its own multipart boundary) |
| `Accept: application/json` | Always |
| `X-LANGUAGE: <code>` | Always. Cached language code (`SettingsContext` / `initializeCacheFromStorage`), default from `appConfig.defaultLanguage` |
| `X-CURRENCY: <code>` | Always. Cached currency code (default `USD`). Botble uses it for currency-aware pricing |
| `X-API-KEY: <key>` | Only if `appConfig.api.apiKey` is configured |
| `Authorization: Bearer <token>` | If an explicit `token` arg is passed, else the in-memory cached auth token (`setAuthToken`, kept in sync by `AuthContext`) |

Changing the language or currency invalidates the React Query cache (see `SettingsContext`) so every request re-issues with the new header.

**Auth model:** Laravel Sanctum personal access tokens (customer guard). Login / register / social-login return an `AuthResponse.token`, which is persisted in `expo-secure-store` and sent as a Bearer token on every authenticated request.

## Error handling

- `4xx` / other non-2xx: `extractApiError()` parses the JSON body. Laravel validation errors (`{ errors: { field: [msg] } }`) surface the **first** message as `ApiError.message`, with the raw `errors` map attached. Otherwise it falls back to `body.message` or a generic `"Request failed: <status> <statusText>"`.
- `401` on a request that carried a bearer token: notifies `AuthContext` to clear the stale session. A failed login, which sends no token, does not trigger this.
- `503`: treated as maintenance / API-disabled. Notifies `AppStatusContext` listeners with `"maintenance"` and throws `ApiError`.
- `5xx` (other): notifies listeners with `"server_error"` and throws `ApiError`.
- All errors throw `ApiError extends Error` (`status: number`, `errors?: Record<string, string[]>`).
- Requests time out after 30s (`AbortController`).

## Endpoints → service functions

Base path for car-manager endpoints: `/car-manager` (relative to `{API_BASE_URL}/api/v1`).

### Auth & profile

| Method + Endpoint | Service function | File |
|---|---|---|
| `POST /car-manager/auth/login` | `login(payload)` | `src/services/auth.ts` |
| `POST /car-manager/auth/register` | `register(payload)` | `src/services/auth.ts` |
| `POST /car-manager/auth/forgot-password` | `forgotPassword(email)` | `src/services/auth.ts` |
| `POST /car-manager/auth/reset-password` | `resetPassword(payload)` | `src/services/auth.ts` |
| `POST /car-manager/auth/logout` | `logout(token?)` | `src/services/auth.ts` |
| `POST /auth/{provider}` | `socialLogin(provider, payload)` | `src/services/auth.ts` |
| `GET /car-manager/profile` | `getProfile(token?)` / `fetchProfile(token?)` | `src/services/auth.ts` · `profile.ts` |
| `PUT /car-manager/profile` | `updateProfile(payload, token?)` | `src/services/profile.ts` |
| `POST /car-manager/profile/change-password` | `changePassword(payload, token?)` | `src/services/profile.ts` |
| `POST /car-manager/profile/avatar` (multipart) | `uploadAvatar(imageUri, token?)` | `src/services/profile.ts` |

### Cars & search

| Method + Endpoint | Service function | File |
|---|---|---|
| `GET /car-manager/cars` | `fetchCars(params?)` | `src/services/cars.ts` |
| `GET /car-manager/cars/search` | `searchCars(params?)` | `src/services/cars.ts` |
| `GET /car-manager/cars/filters` | `fetchCarFilters()` | `src/services/cars.ts` |
| `GET /car-manager/cars/{slug}` | `fetchCarBySlug(slug)` | `src/services/cars.ts` |
| `GET /car-manager/cars/id/{id}` | `fetchCarById(id)` | `src/services/cars.ts` |
| `GET /car-manager/cars/id/{id}/similar` | `fetchSimilarCars(id)` | `src/services/cars.ts` |
| `GET /car-manager/cars/id/{id}/availability` | `checkAvailability(id, pickupDate, returnDate)` | `src/services/cars.ts` |
| `GET /car-manager/cars/{carId}/reviews` | `fetchCarReviews(carId)` | `src/services/cars.ts` |
| `POST /car-manager/reviews` | `createReview(payload, token?)` | `src/services/reviews.ts` |

### Bookings (incl. guest lookup)

| Method + Endpoint | Service function | File |
|---|---|---|
| `GET /car-manager/bookings` | `fetchBookings(token?)` | `src/services/bookings.ts` |
| `POST /car-manager/bookings` | `createBooking(payload, token?)` | `src/services/bookings.ts` |
| `GET /car-manager/bookings/{id}` | `fetchBooking(id, token?)` | `src/services/bookings.ts` |
| `GET /car-manager/bookings/lookup?booking_number=&email=` | `lookupGuestBooking(bookingNumber, email)` | `src/services/bookings.ts` |
| `PUT /car-manager/bookings/{id}` | `updateBooking(id, payload, token?)` | `src/services/bookings.ts` |
| `POST /car-manager/bookings/{id}/cancel` | `cancelBooking(id, token?)` | `src/services/bookings.ts` |
| `GET /car-manager/bookings/{id}/invoice` | `fetchBookingInvoice(id, token?)` | `src/services/bookings.ts` |
| `POST /car-manager/calculate-price` | `calculatePrice(payload)` | `src/services/pricing.ts` |
| `POST /car-manager/coupons/validate` | `validateCoupon(code, totalAmount, carId?)` | `src/services/pricing.ts` |

**Guest booking lookup:** the `/car-manager/bookings/{id}` route is auth-scoped (a signed-in customer can only see their own bookings). Guests who just checked out resolve their booking with `lookupGuestBooking()`, which requires **both** the booking number and the email; the id alone is rejected. `getBookingForViewer()` picks the authed path when a token is present and the guest path otherwise.

### Favorites

| Method + Endpoint | Service function | File |
|---|---|---|
| `GET /car-manager/favorites` | `listFavorites(token?)` | `src/services/favorites.ts` |
| `POST /car-manager/favorites/{carId}` | `addFavorite(carId, token?)` | `src/services/favorites.ts` |
| `DELETE /car-manager/favorites/{carId}` | `removeFavorite(carId, token?)` | `src/services/favorites.ts` |

### Taxonomy & locations

| Method + Endpoint | Service function | File |
|---|---|---|
| `GET /car-manager/car-makes` | `fetchCarMakes()` | `src/services/taxonomy.ts` |
| `GET /car-manager/car-types` | `fetchCarTypes()` | `src/services/taxonomy.ts` |
| `GET /car-manager/car-categories` | `fetchCarCategories()` | `src/services/taxonomy.ts` |
| `GET /car-manager/car-transmissions` | `fetchCarTransmissions()` | `src/services/taxonomy.ts` |
| `GET /car-manager/car-fuels` | `fetchCarFuels()` | `src/services/taxonomy.ts` |
| `GET /car-manager/car-amenities` | `fetchCarAmenities()` | `src/services/taxonomy.ts` |
| `GET /car-manager/locations` | `fetchLocations()` | `src/services/taxonomy.ts` |
| `GET /car-manager/locations/search` | `searchLocations(query)` | `src/services/taxonomy.ts` |

### Dealers / vendors

There is intentionally **no** public `/car-manager/vendors` (dealer-list) endpoint. Dealers are vendor customers that surface nested inside car and booking data, so the Dealers tab derives its list from `fetchCars()` on the client (see `src/hooks/use-dealers.ts`). This is a known v1 limitation documented in the app's `docs/system-architecture.md`.

### Blog, content & misc

| Method + Endpoint | Service function | File |
|---|---|---|
| `GET /posts` | `fetchPosts(params?)` | `src/services/blog.ts` |
| `GET /posts/{slug}` | `fetchPostBySlug(slug)` | `src/services/blog.ts` |
| `GET /search` | `searchPosts(query)` | `src/services/blog.ts` |
| `GET /categories` | `fetchBlogCategories()` | `src/services/blog.ts` |
| `GET /simple-sliders` | `fetchSliders()` | `src/services/misc.ts` |
| `GET /languages` | `fetchLanguages()` | `src/services/misc.ts` |
| `GET /car-manager/currencies` | `fetchCurrencies()` | `src/services/misc.ts` |
| `POST /car-manager/inquiries` | `submitInquiry(payload)` | `src/services/misc.ts` |
| `POST /contacts` | `submitContact(payload)` | `src/services/misc.ts` |
| `POST /device-tokens` | `registerDeviceToken(token, deviceToken, platform)` | `src/services/misc.ts` |

Languages come from `GET /languages` and currencies from `GET /car-manager/currencies` (the currency picker). The active currency is sent as `X-CURRENCY` (default `USD`), and the API converts prices to it server-side. Both drive the localization headers described above.

## Query params

List / search endpoints build their query string via `src/lib/query-string.ts#buildQueryString`. It skips `null` / `undefined` / `""` values, serializes arrays as CSV (`amenities=1,2,3`), and URL-encodes keys and values.

## Client-side normalization

The app normalizes two things the backend can return loosely:

- Media URLs: image paths are resolved against `appConfig.api.siteUrl` so relative upload paths render correctly. The configured `CAR_IMAGE_THUMBNAIL_SIZE` (`small` | `medium` | `large`) selects the thumbnail variant used in list cells.
- Null slugs: records with a missing/null slug fall back to their numeric id (e.g. `fetchCarById` / `GET /car-manager/cars/id/{id}`), so navigation and detail lookups don't break on unslugged content.

## Checkout

The booking-create API returns a **PENDING** booking without a payment URL. Checkout is handled by loading the backend's hosted payment page in a WebView (`app/checkout-webview.tsx`), built from `appConfig.api.siteUrl`. This keeps every backend payment gateway and shipping plugin working without app changes.

## Common errors

| Symptom | Cause | Fix |
|---|---|---|
| Blank screens, no data | Wrong / missing `API_BASE_URL` | Verify the URL in a browser, no trailing slash |
| `401` on API-key sites | Wrong / empty `API_KEY` | Copy the key from **Admin → Settings → API** |
| `404` on every endpoint | car-manager plugin or API disabled | Enable the plugin and the API on the backend |
| `503` | API disabled in admin / maintenance mode | Re-enable the API in admin |
| Plain-HTTP request blocked | HTTP used outside `APP_ENV=development` | Use `https://`, or set `APP_ENV=development` for local |

See [Troubleshooting](troubleshooting.md) for more.
