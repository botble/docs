# API Integration

The Botble JobBoard app talks to a Botble backend running the **job-board** plugin over its REST API. Every screen (job listings, the companies directory, the apply flow, the candidate resume builder, the employer portal, blog) is fed by this API. This page documents the base URL, headers, response envelope, and the endpoints the app calls.

## Base URL / environment

- `API_BASE_URL` (`.env`, e.g. `http://jobbox.test`) is the Botble backend's site root. `app.config.js` appends `/api/v1` to build `appConfig.api.baseUrl` (used for every request) and keeps the raw root as `appConfig.api.siteUrl` (used to resolve relative media URLs and to build the employer checkout WebView URL).
- Do **not** put `/api/v1` in `API_BASE_URL` yourself; it is appended automatically. Use no trailing slash, and `https://` in production.
- All endpoints live **directly under `/api/v1`** (e.g. `/api/v1/jobs`, `/api/v1/companies`, `/api/v1/account/applications`). There is **no** `/job-board` path segment.
- `API_KEY` (`.env`, optional) is sent as the `X-API-KEY` header. Only set this if an API key is configured in Botble admin under **Settings → API**.
- Values are resolved at runtime via `expo-constants` (`Constants.expoConfig.extra.appConfig`, injected by `app.config.js` from `process.env` at build/start time) and read through `src/config/app.ts` (`appConfig`).

See [API Base URL](06_api_base_url.md) for the full configuration walkthrough.

## Test the connection

Open this URL in a browser (replace the host):

```
http://jobbox.test/api/v1/jobs
```

You should get a JSON response with a `data` array of jobs. If not, check:

- `404`: the job-board plugin/API is not installed or enabled.
- `401`: an API key is required but `API_KEY` is missing or wrong.
- `503`: the API is disabled in admin (**Settings → API → API enabled**) or the site is in maintenance mode. Note: when the API is turned off, **every** `/api/v1/*` route returns `503`.
- Empty `data`: no jobs are published/available on the backend.

## Response envelope

Every plugin endpoint wraps its payload in the same envelope:

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

Enum scalar fields (job `status`/`moderation_status`/`salary_type`/`salary_range`, application `status`, account `type`, invoice `status`) come back **normalized to `{ value, label }`** by the backend's `HasEnumOption` trait — flatten with `src/lib/api-enum.ts#enumValue()` when only the raw value is needed.

## Auth headers

`createHeaders(token?)` in `apiClient.ts` builds every request's headers:

| Header | When set |
|---|---|
| `Content-Type: application/json` | Always, unless the body is `FormData` (fetch sets its own multipart boundary) |
| `Accept: application/json` | Always |
| `User-Agent: <AppName>/<version> (<os> <ver>)` | Always. Identifies the app so Cloudflare-fronted backends don't 403 it as an unknown bot |
| `X-LANGUAGE: <code>` | Always. Cached language code (`SettingsContext`), seeded from the device locale |
| `X-CURRENCY: <code>` | Always. Cached currency code (default `USD`). Botble uses it for currency-aware pricing |
| `X-API-KEY: <key>` | Only if `appConfig.api.apiKey` is configured |
| `Authorization: Bearer <token>` | If an explicit `token` arg is passed, else the in-memory cached auth token (`setAuthToken`, kept in sync by `AuthContext`) |

Changing the language or currency invalidates the React Query cache (see `SettingsContext`) so every request re-issues with the new header.

**Auth model:** Botble job-board `Account` auth (guard `account`) over Laravel Sanctum personal access tokens. `login` / `register` return `{ account, token, token_type }`; the token is persisted in `expo-secure-store` and sent as a Bearer token on every authenticated request. The API's authenticated groups bridge the Sanctum token onto the `account` guard server-side. Social login (`POST /auth/{provider}`) is served by the shared **social-login** plugin — the provider token is sent under a per-provider field (`identityToken` for Google/Apple OIDC, `accessToken` for Facebook) with `guard: "account"`, and `socialLogin()` then fetches the full profile with the returned token.

## Error handling

- `4xx` / other non-2xx: `extractApiError()` parses the JSON body. Laravel validation errors (`{ errors: { field: [msg] } }`) surface the **first** message as `ApiError.message`, with the raw `errors` map attached. Otherwise it falls back to `body.message` or a generic `"Request failed: <status> <statusText>"`.
- `401` on a request that carried a bearer token: notifies `AuthContext` to clear the stale session. A failed login, which sends no token, does not trigger this.
- `503`: treated as maintenance / API-disabled. Notifies `AppStatusContext` listeners with `"maintenance"` and throws `ApiError`.
- `5xx` (other): a failing **GET** notifies listeners with `"server_error"` (the full-screen outage gate); a `5xx` from a write surfaces as a normal `ApiError`.
- All errors throw `ApiError extends Error` (`status: number`, `errors?: Record<string, string[]>`).
- Requests time out after 30s (`AbortController`).

## Endpoints → service functions

All paths below are relative to `{API_BASE_URL}/api/v1`. Jobs, companies and other records are addressed **by numeric id** (there is no slug-based lookup).

### Auth & profile — `src/services/auth.ts`, `src/services/profile.ts`

| Method + Endpoint | Service function | File |
|---|---|---|
| `POST /auth/login` | `login(payload)` | `auth.ts` |
| `POST /auth/register` | `register(payload)` (sends `type`: `job-seeker` \| `employer`) | `auth.ts` |
| `POST /auth/forgot-password` | `forgotPassword(email)` | `auth.ts` |
| `POST /auth/reset-password` | `resetPassword(payload)` | `auth.ts` |
| `POST /auth/logout` | `logout(token?)` | `auth.ts` |
| `POST /auth/{provider}` | `socialLogin(provider, token)` | `auth.ts` |
| `GET /account/profile` | `getProfile(token?)` / `fetchProfile(token?)` | `auth.ts` · `profile.ts` |
| `PUT /account/profile` | `updateProfile(payload, token?)` | `profile.ts` |
| `PUT /account/password` | `changePassword(payload, token?)` | `profile.ts` |
| `POST /account/avatar` (multipart) | `uploadAvatar(imageUri, token?)` | `profile.ts` |
| `DELETE /account/avatar` | `deleteAvatar(token?)` | `profile.ts` |
| `DELETE /account` | `deleteAccount(password, token?)` | `profile.ts` |

Employer registration is gated by the `settings.features.register_as_employer` flag; the backend still enforces it server-side.

### Jobs & search — `src/services/jobs.ts`

| Method + Endpoint | Service function |
|---|---|
| `GET /jobs` | `fetchJobs(params?)` |
| `GET /jobs/{id}` | `fetchJobById(id)` |
| `GET /jobs/{id}/related` | `fetchRelatedJobs(id, limit?)` |
| `GET /jobs/featured` | `fetchFeaturedJobs(limit?)` |
| `GET /jobs/recent` | `fetchRecentJobs(params?)` |
| `GET /jobs/popular` | `fetchPopularJobs(params?)` |

`GET /jobs` reads the free-text search param as **`keyword`** (not `k`), plus `company_id`, `categories[]`, `job_types[]`, `job_experiences[]`, `job_skills[]`, `salary_from`, `salary_to`, `date_posted`, `city_id`, `state_id`, `location`, `page`, `per_page`. `latitude`/`longitude` are only present on jobs when the location plugin is active (used for the map view).

### Applications & saved jobs — `src/services/applications.ts`, `src/services/saved-jobs.ts`

| Method + Endpoint | Service function | File |
|---|---|---|
| `POST /jobs/{id}/apply` (multipart: `resume`, `cover_letter` files + `message`) | `applyToJob(jobId, payload, token)` | `applications.ts` |
| `GET /account/applications` | `fetchMyApplications(token, params?)` | `applications.ts` |
| `GET /account/applications/{id}` | `fetchMyApplication(id, token)` | `applications.ts` |
| `DELETE /account/applications/{id}` | `withdrawApplication(id, token)` | `applications.ts` |
| `GET /account/saved-jobs` | `fetchSavedJobs(token, params?)` | `saved-jobs.ts` |
| `POST /account/saved-jobs/{jobId}` | `saveJob(jobId, token)` | `saved-jobs.ts` |
| `DELETE /account/saved-jobs/{jobId}` | `unsaveJob(jobId, token)` | `saved-jobs.ts` |

For a job with `apply_url` set the apply form collapses to an external redirect (email + message only). Saved jobs return the same `Job` shape as the public list.

### Companies — `src/services/companies.ts`

| Method + Endpoint | Service function |
|---|---|
| `GET /companies` | `fetchCompanies(params?)` |
| `GET /companies/{id}` | `fetchCompanyById(id)` |
| `GET /companies/{id}/jobs` | `fetchCompanyJobs(id, params?)` |
| `GET /companies/featured` | `fetchFeaturedCompanies(params?)` |
| `GET /companies/search?q=` | `searchCompanies(query, limit?)` |

### Candidate resume & profile — `src/services/candidate/resume.ts`, `src/services/candidate/profile.ts`

| Method + Endpoint | Service function |
|---|---|
| `GET/POST /account/educations`, `PUT/DELETE /account/educations/{id}` | education CRUD |
| `GET/POST /account/experiences`, `PUT/DELETE /account/experiences/{id}` | experience CRUD |
| `GET/POST /account/languages`, `DELETE /account/languages/{id}` | language CRUD (uses `language_level_id`) |
| `GET/PUT /account/skills` | favourite-skills read + sync |
| `POST/DELETE /account/resume` (multipart) | resume file upload / remove |

### Reviews & candidates — `src/services/reviews.ts`

| Method + Endpoint | Service function |
|---|---|
| `GET /reviews` (filter `reviewable_type`/`reviewable_id`/`rating`) | `fetchReviews(params?)` |
| `GET /reviews/{id}` | `fetchReviewById(id)` |
| `POST /reviews` (`reviewable_type`/`reviewable_id`/`rating`/`comment`) | `submitReview(payload, token)` |
| `GET /candidates`, `/candidates/{id}`, `/candidates/search?q=` | public candidate directory |

Review create only (no update/delete route); company reviews are read via `reviewable_type = Company`.

### Taxonomy & locations — `src/services/taxonomy.ts`

| Method + Endpoint | Service function |
|---|---|
| `GET /categories` (+ `/{id}/jobs`, `/featured`) | `fetchCategories` / `fetchCategoryJobs` |
| `GET /job-types`, `/job-skills`, `/career-levels`, `/degree-levels` | facet lists |
| `GET /functional-areas`, `/job-shifts`, `/job-experiences`, `/language-levels` | facet lists |
| `GET /tags` (+ `/{id}/jobs`), `/currencies` | tags + currencies |
| `GET /locations/countries`, `/locations/states/{countryId}`, `/locations/cities/{stateId}` | location plugin only |

Job-board has **no** aggregated facets endpoint — each taxonomy is its own list; the filter UI assembles them client-side. Array filters on `/jobs` (`categories`, `job_types`, `job_skills`, `job_experiences`) serialize with **bracket** notation (`job_types[]=1&job_types[]=2`).

### Config, home feed & currencies — `src/services/config.ts`

| Method + Endpoint | Service function |
|---|---|
| `GET /settings` | `fetchSettings()` |
| `GET /currencies` | `fetchCurrencies()` |
| `GET /home` | `fetchHomeFeed(limit?)` |

`GET /settings` (fetched once at startup by `SettingsContext`) carries feature flags (register, review, credits system, job approval, guest apply, location, lat/long, register-as-employer, …), enum option lists (`{value,label}`), the currency catalogue + default, `max_salary`, sort options, and contact info. `GET /home` is the curated Home-tab feed (banners, featured/latest jobs, featured companies, categories with active-job counts).

### Blog — `src/services/blog.ts`

| Method + Endpoint | Service function |
|---|---|
| `GET /posts` | `fetchPosts(params?)` |
| `GET /posts/{slug}` | `fetchPostBySlug(slug)` |
| `GET /search?q=` | `searchPosts(query)` |

### Languages, contact, device tokens & notifications — `src/services/misc.ts`, `src/services/notifications.ts`

| Method + Endpoint | Service function |
|---|---|
| `GET /languages` | `fetchLanguages()` (bare array, `lang_*` fields) |
| `POST /contacts` | `submitContact(payload)` |
| `POST /device-tokens` | `registerDeviceToken(token, deviceToken, platform)` |
| `DELETE /device-tokens/by-token` | `unregisterDeviceToken(token, deviceToken, platform)` |
| `GET /notifications` (+ `/stats`) | `fetchNotifications` / `fetchNotificationStats` |
| `POST /notifications/mark-all-read`, `/notifications/{id}/read`, `/notifications/{id}/clicked` | mark helpers |

Push `device-tokens` / `notifications` are provided by the `botble/api` package. The notification `{id}` is the recipient row id.

### Employer portal (account-scoped) — `src/services/employer/*.ts`

Every route below is server-scoped to the signed-in account's own companies; a non-owned id `404`s. All are **employer-gated** — a job-seeker token is `403`'d (`EnsureApiAccountIsEmployer`) — except `GET /account/status`, which any authenticated account may read.

| Method + Endpoint | Service function | File |
|---|---|---|
| `GET /account/status` | `fetchAccountStatus(token)` (role, credits, `can_post`) | `employer/*` |
| `GET /account/dashboard` | `fetchEmployerDashboard(token)` | `employer/dashboard.ts` |
| `GET /account/metadata` | `fetchEmployerJobMetadata(token)` (job-form pickers + companies) | `employer/jobs.ts` |
| `GET /account/jobs` | `fetchEmployerJobs(token, params?)` | `employer/jobs.ts` |
| `POST /account/jobs` | `createEmployerJob(payload, token)` | `employer/jobs.ts` |
| `PUT /account/jobs/{id}` | `updateEmployerJob(id, payload, token)` | `employer/jobs.ts` |
| `DELETE /account/jobs/{id}` | `deleteEmployerJob(id, token)` | `employer/jobs.ts` |
| `GET /account/companies` (+ `/{id}`) | `fetchEmployerCompanies` / `fetchEmployerCompany` | `employer/companies.ts` |
| `POST /account/companies`, `PUT/DELETE /account/companies/{id}` (multipart: `logo_input`/`cover_image_input`) | company CRUD | `employer/companies.ts` |
| `GET /account/packages` | `fetchEmployerPackages(token)` (plain array) | `employer/packages.ts` |
| `PUT /account/packages/{id}/subscribe` | `subscribeEmployerPackage(id, token)` | `employer/packages.ts` |
| `GET /account/transactions`, `/account/invoices`, `/account/invoices/{id}`, `/account/invoices/{id}/download` | finance | `employer/finance.ts` |
| `GET /account/reviews` | `fetchEmployerReviews(token, params?)` | `employer/reviews.ts` |
| `GET /job-applications` (+ `/{id}`), `PUT /job-applications/{id}`, `DELETE /job-applications/{id}`, `GET /job-applications/{id}/download-cv` | applicants | `employer/applicants.ts` |

`POST /account/jobs` requires `company_id` (one of the employer's companies) and — when the credits system is on — a positive credit balance (`can_post`); it accepts the full field set (taxonomy id arrays `categories[]`/`job_types[]`/`skills[]`, the FKs `career_level_id`/`degree_level_id`/`functional_area_id`/`job_shift_id`/`job_experience_id`, `salary_from`/`salary_to`/`salary_range`, dates) and syncs the taxonomies server-side. Moderation status and `expire_date` are set server-side per the approval / expiry settings. `GET /account/invoices/{id}/download` returns a short-lived **signed** PDF URL — open it in the in-app browser, don't fetch it as JSON.

### License check (external, dev-only) — `src/services/license-service.ts`

`verifyLicense()` posts the Envato purchase code to `https://license.botble.com/api/external/license/check` (with `X-API-KEY`) — a **separate** license server, not the app backend. It runs only when `APP_ENV=development`, caches for 3 days, and fails open (any error is treated as valid) so a flaky license server can never block a developer.

## Client-side normalization

- Media URLs: relative upload paths are resolved against `appConfig.api.siteUrl` (`resolveUrl`) so images render correctly.
- `latitude`/`longitude` arrive as strings (`"43.6833"`) when present; the map view coerces them with `Number()` and drops invalid/`(0,0)` coords (`toValidCoord`), hiding the map when the result set has none.

## Employer package checkout

The candidate apply flow submits a free application — there is **no** consumer payment step. The only checkout in the app is an **employer** buying a credits package: `subscribeEmployerPackage()` settles a FREE package inline (`requires_payment:false` + refreshed account) and returns a `checkout_url` for a PAID one. The client appends the bearer token via `buildCheckoutWebViewUrl()` (only ever for a URL that provably belongs to the configured storefront host) and opens the backend's hosted payment page in `app/employer/checkout-webview.tsx` — a session-backed route so every gateway hop shares one browser session. Success is asserted from the credit delta (`GET /account/status`), never from the return URL alone. This keeps every backend payment gateway working without native SDK changes.

## Common errors

| Symptom | Cause | Fix |
|---|---|---|
| Blank screens, no data | Wrong / missing `API_BASE_URL` | Verify the URL in a browser, no trailing slash |
| `401` on API-key sites | Wrong / empty `API_KEY` | Copy the key from **Admin → Settings → API** |
| `404` on every endpoint | job-board plugin or API disabled | Enable the plugin and the API on the backend |
| `503` on every endpoint | API disabled in admin / maintenance mode | Re-enable the API in **Settings → API** |
| `403` on employer routes | Signed in as a job-seeker account | Employer routes require an `employer`-type account |
| Plain-HTTP request blocked | HTTP used outside `APP_ENV=development` | Use `https://`, or set `APP_ENV=development` for local |

See [Troubleshooting](troubleshooting.md) for more.
