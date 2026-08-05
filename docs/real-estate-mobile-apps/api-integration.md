# API Integration

The Flex Home app talks to a Botble backend running the **real-estate** plugin over its REST API. Every screen (property listings, projects, agents, consultations, blog, the agent portal) is fed by this API. This page documents the base URL, headers, response envelope, and the endpoints the app calls.

## Base URL / environment

- `API_BASE_URL` (`.env`, e.g. `http://homzen.test`) is the Botble backend's site root. `app.config.js` appends `/api/v1` to build `appConfig.api.baseUrl` (used for every request) and keeps the raw root as `appConfig.api.siteUrl` (used to build the hosted-checkout WebView URL).
- Do **not** put `/api/v1` in `API_BASE_URL` yourself; it is appended automatically. Use no trailing slash, and `https://` in production.
- `API_KEY` (`.env`, optional) is sent as the `X-API-KEY` header. Only set this if an API key is configured in Botble admin under **Settings → API**.
- Values are resolved at runtime via `expo-constants` (`Constants.expoConfig.extra.appConfig`, injected by `app.config.js` from `process.env` at build/start time) and read through `src/config/app.ts` (`appConfig`).

See [API Base URL](06_api_base_url.md) for the full configuration walkthrough.

## Test the connection

Open this URL in a browser (replace the host):

```
http://homzen.test/api/v1/properties
```

You should get a JSON response with a `data` array of properties. If not, check:

- `404`: the real-estate API is not installed/enabled, or the API is turned off.
- `401`: an API key is required but `API_KEY` is missing or wrong.
- `503`: the API is disabled in admin or the site is in maintenance mode.
- Empty `data`: no properties are published on the backend.

## Response envelope

Every endpoint wraps its payload in the same envelope:

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

`src/services/apiClient.ts` (`api.get/post/put/patch/delete/request`) returns the raw parsed JSON body. Each `src/services/*.ts` function unwraps `res.data` (or `res.message` for confirmation-only endpoints) so screens and hooks work with plain domain types, not the envelope.

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

All paths below are relative to `{API_BASE_URL}/api/v1`. There is **no** plugin path prefix — property endpoints live at `/properties`, not `/real-estate/properties`.

### Auth

| Method + Endpoint | Service function | File |
|---|---|---|
| `POST /auth/login` | `login(payload)` | `src/services/auth.ts` |
| `POST /auth/register` | `register(payload)` | `src/services/auth.ts` |
| `POST /auth/forgot-password` | `forgotPassword(email)` | `src/services/auth.ts` |
| `POST /auth/reset-password` | `resetPassword(payload)` | `src/services/auth.ts` |
| `POST /auth/logout` | `logout(token?)` | `src/services/auth.ts` |
| `POST /auth/{provider}` | `socialLogin(provider, payload)` | `src/services/auth.ts` |

`resendVerificationEmail(email)` calls the backend's **web** confirmation route by absolute URL (not an `/api/v1` endpoint); `api.request` passes absolute URLs through unchanged.

### Account & profile

| Method + Endpoint | Service function | File |
|---|---|---|
| `GET /account/profile` | `getProfile(token?)` / `fetchProfile(token?)` | `src/services/auth.ts` · `profile.ts` |
| `PUT /account/profile` | `updateProfile(payload, token?)` | `src/services/profile.ts` |
| `PUT /account/password` | `changePassword(payload, token?)` | `src/services/profile.ts` |
| `POST /account/avatar` (multipart) | `uploadAvatar(imageUri, token?)` | `src/services/profile.ts` |
| `DELETE /account` | `deleteAccount(token?)` | `src/services/profile.ts` |

### Properties & search

| Method + Endpoint | Service function | File |
|---|---|---|
| `GET /properties` | `fetchProperties(params?)` | `src/services/properties.ts` |
| `GET /properties/search?q=` | `searchProperties(query)` | `src/services/properties.ts` |
| `GET /properties/filters` | `fetchPropertyFilters()` | `src/services/properties.ts` |
| `GET /properties/{slug}` | `fetchPropertyBySlug(slug)` | `src/services/properties.ts` |
| `GET /properties/id/{id}` | `fetchPropertyById(id)` | `src/services/properties.ts` |

`fetchSimilarProperties(property, limit)` is **not** a dedicated endpoint — it is a client-side heuristic (same category, same city, excluding the current listing) layered on `fetchProperties()`.

`searchProperties` / `searchProjects` return HTTP 200 with `error: true, data: null` on a zero-result search rather than throwing; both services normalize that to an empty result set.

### Projects

| Method + Endpoint | Service function | File |
|---|---|---|
| `GET /projects` | `fetchProjects(params?)` | `src/services/projects.ts` |
| `GET /projects/search?q=` | `searchProjects(query)` | `src/services/projects.ts` |
| `GET /projects/filters` | `fetchProjectFilters(params?)` | `src/services/projects.ts` |
| `GET /projects/{slug}` | `fetchProjectBySlug(slug)` | `src/services/projects.ts` |
| `GET /projects/id/{id}` | `fetchProjectById(id)` | `src/services/projects.ts` |
| `GET /projects/{id}/properties` | `fetchProjectProperties(id, params?)` | `src/services/projects.ts` |

Unlike `/properties/filters` (a facet payload), `/projects/filters` re-runs the filtered list.

### Agents

| Method + Endpoint | Service function | File |
|---|---|---|
| `GET /agents` | `fetchAgents(params?)` | `src/services/agents.ts` |
| `GET /agents/{id}` | `fetchAgentById(id)` | `src/services/agents.ts` |
| `GET /agents/{id}/properties` | `fetchAgentProperties(id, params?)` | `src/services/agents.ts` |
| `GET /agents/{id}/projects` | `fetchAgentProjects(id, params?)` | `src/services/agents.ts` |

### Saved properties (favorites)

| Method + Endpoint | Service function | File |
|---|---|---|
| `GET /account/saved-properties` | `listSavedProperties(token, params?)` | `src/services/saved-properties.ts` |
| `POST /properties/{id}/save` | `addSavedProperty(propertyId, token)` | `src/services/saved-properties.ts` |
| `DELETE /properties/{id}/save` | `removeSavedProperty(propertyId, token)` | `src/services/saved-properties.ts` |

### Consultations (inquiries)

| Method + Endpoint | Service function | File |
|---|---|---|
| `POST /consults` | `submitConsult(payload)` | `src/services/consults.ts` |
| `GET /consults/custom-fields` | `fetchConsultCustomFields()` | `src/services/consults.ts` |
| `GET /account/consults?type=sent` | `fetchMyInquiries(token, params?)` | `src/services/consults.ts` |

`POST /consults` accepts guest submissions (no token required). The signed-in customer's own sent consultations come from `/account/consults?type=sent`; the agent's received leads use the same route with `type=received`.

### Reviews

| Method + Endpoint | Service function | File |
|---|---|---|
| `GET /properties/{id}/reviews` | `fetchPropertyReviews(propertyId, params?)` | `src/services/reviews.ts` |
| `POST /properties/{id}/reviews` | `submitReview(propertyId, payload, token)` | `src/services/reviews.ts` |
| `PUT /reviews/{reviewId}` | `updateReview(reviewId, payload, token)` | `src/services/reviews.ts` |
| `DELETE /reviews/{reviewId}` | `deleteReview(reviewId, token)` | `src/services/reviews.ts` |

### Taxonomy & locations

| Method + Endpoint | Service function | File |
|---|---|---|
| `GET /categories` | `fetchCategories(params?)` | `src/services/taxonomy.ts` |
| `GET /categories/filters` | `fetchCategoryFilters()` | `src/services/taxonomy.ts` |
| `GET /categories/{slug}` | `fetchCategoryBySlug(slug)` | `src/services/taxonomy.ts` |
| `GET /categories/id/{id}` | `fetchCategoryById(id)` | `src/services/taxonomy.ts` |
| `GET /categories/{id}/properties` | `fetchCategoryProperties(id, params?)` | `src/services/taxonomy.ts` |
| `GET /features` · `GET /features/all` | `fetchFeatures(params?)` · `fetchAllFeatures()` | `src/services/taxonomy.ts` |
| `GET /facilities` · `GET /facilities/all` | `fetchFacilities(params?)` · `fetchAllFacilities()` | `src/services/taxonomy.ts` |
| `GET /cities` | `fetchCities(params?)` | `src/services/taxonomy.ts` |
| `GET /states` | `fetchStates(params?)` | `src/services/taxonomy.ts` |

### App config, home feed & misc

| Method + Endpoint | Service function | File |
|---|---|---|
| `GET /settings` | `fetchSettings()` | `src/services/config.ts` |
| `GET /currencies` | `fetchCurrencies()` | `src/services/config.ts` |
| `GET /home` | `fetchHomeFeed(limit?)` | `src/services/config.ts` |
| `GET /languages` | `fetchLanguages()` | `src/services/misc.ts` |
| `GET /simple-sliders` | `fetchSliders()` | `src/services/misc.ts` |
| `POST /contacts` | `submitContact(payload)` | `src/services/misc.ts` |
| `GET /referral` | `fetchReferral(token?)` | `src/services/referral.ts` |
| `GET /posts` · `GET /posts/{slug}` · `GET /search` | `fetchPosts` · `fetchPostBySlug` · `searchPosts` | `src/services/blog.ts` |

`GET /home` returns the composed home-screen feed in one request (featured properties, featured projects, agents, blog posts), sized by the `HOME_*_COUNT` env vars.

### Push notifications

| Method + Endpoint | Service function | File |
|---|---|---|
| `POST /device-tokens` | `registerDeviceToken(token, deviceToken, platform)` | `src/services/misc.ts` |
| `DELETE /device-tokens/by-token` | `unregisterDeviceToken(...)` | `src/services/misc.ts` |
| `GET /notifications` | `fetchNotifications(params?, token?)` | `src/services/notifications.ts` |
| `GET /notifications/stats` | `fetchNotificationStats(token?)` | `src/services/notifications.ts` |
| `POST /notifications/mark-all-read` | `markAllNotificationsRead(token?)` | `src/services/notifications.ts` |
| `POST /notifications/{id}/read` | `markNotificationRead(id, token?)` | `src/services/notifications.ts` |
| `POST /notifications/{id}/clicked` | `markNotificationClicked(id, token?)` | `src/services/notifications.ts` |

### Agent portal

All agent-portal routes are authenticated and live under `/account`. Services are in `src/services/agent/`.

| Method + Endpoint | Service function | File |
|---|---|---|
| `GET /account/dashboard` | `fetchAgentDashboard(token)` | `agent/agent-dashboard.ts` |
| `GET /account/status` | `fetchAgentStatus(token)` | `agent/agent-dashboard.ts` |
| `GET /account/activity-logs` | `fetchAgentActivityLogs(token, params?)` | `agent/agent-dashboard.ts` |
| `GET /account/properties` | `fetchAgentProperties(token, params?)` | `agent/agent-properties.ts` |
| `GET /account/properties/{id}` | `fetchAgentProperty(id, token)` | `agent/agent-properties.ts` |
| `POST /account/properties` | `createAgentProperty(payload, token)` | `agent/agent-properties.ts` |
| `PUT /account/properties/{id}` | `updateAgentProperty(id, payload, token)` | `agent/agent-properties.ts` |
| `DELETE /account/properties/{id}` | `deleteAgentProperty(id, token)` | `agent/agent-properties.ts` |
| `POST /account/properties/{id}/renew` | `renewAgentProperty(id, token)` | `agent/agent-properties.ts` |
| `POST /account/properties/{id}/images` | `addAgentPropertyImages(...)` | `agent/agent-properties.ts` |
| `GET /account/properties/metadata` | `fetchAgentPropertyMetadata(token)` | `agent/agent-properties.ts` |
| `POST /account/upload` (multipart) | `uploadAgentFile(...)` | `agent/agent-properties.ts` |
| `GET /account/packages` | `fetchAgentPackages(token)` | `agent/agent-packages.ts` |
| `POST /account/packages/{id}/subscribe` | `subscribeAgentPackage(id, token)` | `agent/agent-packages.ts` |
| `GET /account/transactions` | `fetchAgentTransactions(token, params?)` | `agent/agent-finance.ts` |
| `GET /account/invoices` | `fetchAgentInvoices(token, params?)` | `agent/agent-finance.ts` |
| `GET /account/invoices/{id}` | `fetchAgentInvoice(id, token)` | `agent/agent-finance.ts` |
| `GET /account/invoices/{id}/download` | `fetchAgentInvoiceDownloadUrl(id, token)` | `agent/agent-finance.ts` |
| `GET /account/consults?type=received` | `fetchAgentLeads(token, params?)` | `agent/agent-leads.ts` |
| `GET /account/consults/{id}` | `fetchAgentLead(id, token)` | `agent/agent-leads.ts` |
| `GET /account/reviews` | `fetchAgentReviews(token, params?)` | `agent/agent-reviews.ts` |

## Query params

List / search endpoints build their query string via `src/lib/query-string.ts#buildQueryString`. It skips `null` / `undefined` / `""` values, URL-encodes keys and values, and supports both CSV and `brackets` array formats (project filters use `brackets`).

## Client-side normalization

The app normalizes two things the backend can return loosely:

- Media URLs: image paths are resolved against `appConfig.api.siteUrl` so relative upload paths render correctly. The configured `PROPERTY_IMAGE_THUMBNAIL_SIZE` (`small` | `medium` | `large`) selects the thumbnail variant used in list cells.
- Null slugs: records with a missing/null slug fall back to their numeric id (e.g. `fetchPropertyById` / `GET /properties/id/{id}`), so navigation and detail lookups don't break on unslugged content.

## Checkout (agent credit packages)

`POST /account/packages/{id}/subscribe` returns a hosted **checkout URL** rather than completing payment in-app. The app opens it in a WebView (`buildCheckoutWebViewUrl`, `app/web-view.tsx`), built from `appConfig.api.siteUrl`, and detects completion with `isCheckoutReturnUrl` / `isCheckoutFailureUrl`. This keeps every backend payment gateway working without a native SDK.

## Common errors

| Symptom | Cause | Fix |
|---|---|---|
| Blank screens, no data | Wrong / missing `API_BASE_URL` | Verify the URL in a browser, no trailing slash |
| `401` on API-key sites | Wrong / empty `API_KEY` | Copy the key from **Admin → Settings → API** |
| `404` on every endpoint | real-estate API or API disabled | Enable the plugin and the API on the backend |
| `503` | API disabled in admin / maintenance mode | Re-enable the API in admin |
| Plain-HTTP request blocked | HTTP used outside `APP_ENV=development` | Use `https://`, or set `APP_ENV=development` for local |

See [Troubleshooting](troubleshooting.md) for more.
