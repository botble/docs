# API

## Overview

Botble CMS includes a REST API package that lets you interact with your application data from mobile apps, third-party services, or any HTTP client. It uses [Laravel Sanctum](https://laravel.com/docs/12.x/sanctum) for token-based authentication and supports optional API key protection, push notifications via Firebase Cloud Messaging (FCM), and user settings management.

The API is managed at **Admin > Settings > API** (`/admin/settings/api`).

## API Settings

### Enabling the API

Go to **Admin > Settings > API** and toggle **Enable API**. When disabled, all `/api/v1/*` endpoints return `503 Service Unavailable`.

### API Key Protection

API key protection adds a second layer of security on top of Sanctum tokens. When enabled, every request must include an `X-API-KEY` header.

1. In **Admin > Settings > API**, enable **API Key Protection**.
2. Copy the generated key (or click **Generate** to create a new one).
3. Add the header to all requests:

```bash
curl -X GET https://your-domain.com/api/v1/posts \
  -H "Authorization: Bearer your-sanctum-token" \
  -H "X-API-KEY: your-api-key" \
  -H "Content-Type: application/json"
```

Without a valid key, the API returns `401 Unauthorized`:

```json
{
  "message": "Invalid or missing API key. Please provide a valid X-API-KEY header.",
  "error": "Unauthorized"
}
```

::: tip
Think of the API key as a gate key for your entire app, while the Sanctum token identifies individual users. The API key prevents unauthorized clients from accessing the API at all; the Sanctum token controls what each user can do.
:::

**Common use cases:**

- Restrict API access to only your official mobile app
- Revoke all access instantly by rotating the key, without invalidating user sessions
- Add a layer of protection against scrapers or unauthorized integrations

### Sanctum Token Management

Admins can create and manage server-side API tokens at **Admin > Settings > API > API Tokens**. These tokens are useful for server-to-server integration (e.g., syncing data from an ERP).

- Click **Create** to generate a named token. The plain-text token is shown **only once** — copy it immediately.
- Tokens can be deleted individually from the table.

## Authentication

### Login

```bash
POST /api/v1/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

**Response:**

```json
{
  "error": false,
  "data": {
    "token": "1|abc123...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com"
    }
  },
  "message": null
}
```

### Register

```bash
POST /api/v1/register
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "user@example.com",
  "password": "secret123",
  "password_confirmation": "secret123",
  "phone": "+1234567890"
}
```

### Using the Token

Include the token in the `Authorization` header for all authenticated requests:

```bash
curl -X GET https://your-domain.com/api/v1/me \
  -H "Authorization: Bearer 1|abc123..." \
  -H "Content-Type: application/json"
```

### Logout

```bash
GET /api/v1/logout
Authorization: Bearer your-token
```

This revokes all tokens for the authenticated user.

### Password Reset

```bash
# Request reset link
POST /api/v1/password/forgot
{ "email": "user@example.com" }

# Reset password (using token from email)
POST /api/v1/password/reset
{ "email": "user@example.com", "token": "reset-token", "password": "new-password", "password_confirmation": "new-password" }
```

### Email Verification

If email verification is enabled in the API config, unverified users can request a new verification email:

```bash
POST /api/v1/resend-verify-account-email
{ "email": "user@example.com" }
```

## Available Endpoints

### Authentication (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/register` | Register new user |
| POST | `/api/v1/login` | Login and get token |
| POST | `/api/v1/email/check` | Check if email exists |
| POST | `/api/v1/password/forgot` | Send password reset link |
| POST | `/api/v1/resend-verify-account-email` | Resend verification email |
| POST | `/api/v1/device-tokens` | Register device token |

### Profile (Authenticated)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/me` | Get user profile |
| PUT | `/api/v1/me` | Update profile (name, email, phone, DOB, gender) |
| POST | `/api/v1/update/avatar` | Upload user avatar |
| PUT | `/api/v1/update/password` | Change password (requires current password) |
| GET | `/api/v1/logout` | Logout and revoke tokens |

### User Settings (Authenticated)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/settings` | Get user settings |
| PUT | `/api/v1/settings` | Update user settings |

**Available settings:**

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `biometric_enabled` | boolean | `false` | Enable biometric authentication |
| `notification_enabled` | boolean | `true` | Enable push notifications |
| `language` | string | `en` | Preferred language |
| `currency` | string | `USD` | Preferred currency |
| `theme` | string | `light` | Theme preference (`light`, `dark`, `auto`) |
| `timezone` | string | `UTC` | User timezone |

### Device Tokens (Authenticated)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/device-tokens` | Register or update a device token |
| GET | `/api/v1/device-tokens` | List user's active device tokens |
| PUT | `/api/v1/device-tokens/{id}` | Update device token metadata |
| DELETE | `/api/v1/device-tokens/{id}` | Delete device token |
| DELETE | `/api/v1/device-tokens/by-token` | Delete by token value |
| POST | `/api/v1/device-tokens/{id}/deactivate` | Deactivate without deleting |

### Notifications (Authenticated)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/notifications` | List notifications (paginated) |
| GET | `/api/v1/notifications/stats` | Get notification statistics |
| POST | `/api/v1/notifications/mark-all-read` | Mark all as read |
| POST | `/api/v1/notifications/{id}/read` | Mark one as read |
| POST | `/api/v1/notifications/{id}/clicked` | Mark as clicked |
| DELETE | `/api/v1/notifications/{id}` | Delete notification |

**Query parameters for listing:**

| Parameter | Description |
|-----------|-------------|
| `page` | Page number |
| `per_page` | Items per page (max 50) |
| `unread_only` | Only return unread notifications |
| `type` | Filter by type (`general`, `order`, `promotion`, `system`) |

### Blog Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/posts` | List blog posts |
| GET | `/api/v1/posts/{id}` | Get a blog post |
| GET | `/api/v1/categories` | List blog categories |
| GET | `/api/v1/categories/{id}` | Get a blog category |
| GET | `/api/v1/tags` | List blog tags |
| GET | `/api/v1/tags/{id}` | Get a blog tag |

### Page Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/pages` | List pages |
| GET | `/api/v1/pages/{id}` | Get a page |

### Plugin Endpoints

Depending on installed plugins, additional endpoints may be available for:

- E-commerce (products, orders, customers, carts, wishlists)
- Galleries
- Contact forms
- And more

## Request Parameters

### Pagination

```
GET /api/v1/posts?page=2&per_page=15
```

- `page` — Page number (default: 1)
- `per_page` — Items per page (default: 10, max: 100)

### Filtering

```
GET /api/v1/posts?status=published&category_id=5
```

### Sorting

```
GET /api/v1/posts?sort_by=created_at&order=desc
```

### Including Relations

```
GET /api/v1/posts?include=categories,tags,author
```

## Response Format

### Success (single resource)

```json
{
  "error": false,
  "data": {
    "id": 1,
    "name": "Example"
  },
  "message": null
}
```

### Success (paginated)

```json
{
  "data": [...],
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 5,
    "per_page": 10,
    "to": 10,
    "total": 50
  },
  "links": {
    "first": "https://your-domain.com/api/v1/posts?page=1",
    "last": "https://your-domain.com/api/v1/posts?page=5",
    "prev": null,
    "next": "https://your-domain.com/api/v1/posts?page=2"
  }
}
```

### Error

```json
{
  "error": true,
  "data": null,
  "message": "Error description"
}
```

### Validation Error (422)

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email field is required."]
  }
}
```

## Push Notifications (FCM)

Botble CMS integrates with Firebase Cloud Messaging (FCM v1 API) to send push notifications to mobile app users.

### Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com).
2. Go to **Project Settings > Service Accounts**.
3. Click **Generate new private key** to download the service account JSON file.
4. In **Admin > Settings > API**, under **Push Notifications**:
   - Enable **Push Notifications**
   - Enter your **Firebase Project ID**
   - Upload the service account JSON file

The file is stored in `storage/app/firebase/` and validated for required fields (`project_id`, `private_key`, `client_email`).

### Device Token Registration

Your mobile app must register its FCM token with the API after obtaining it from Firebase SDK:

```bash
POST /api/v1/device-tokens
Content-Type: application/json

{
  "token": "fcm-device-token-from-firebase-sdk",
  "platform": "android",
  "device_id": "unique-device-identifier",
  "app_version": "1.0.0"
}
```

- `token` (required) — The FCM registration token
- `platform` — `android` or `ios`
- `device_id` — Unique device identifier (for deduplication)
- `app_version` — Your app version

If the token already exists, it updates the existing record instead of creating a duplicate.

### "No active device tokens found"

This message in the admin panel means no mobile app has registered a device token yet. This is normal if:

- The mobile app hasn't been built or released yet
- No users have opened the app since FCM integration was added
- The app isn't calling the `/api/v1/device-tokens` endpoint

Device tokens appear automatically once users open the mobile app and the app registers its FCM token.

### Sending Notifications from Admin

Use the **Send Custom Notification** form at **Admin > Settings > API**:

| Field | Required | Description |
|-------|----------|-------------|
| Title | Yes | Notification title (max 100 characters) |
| Message | Yes | Notification body (max 500 characters) |
| Target Devices | — | All Devices, Android only, iOS only, or Customers only |
| Action URL | No | URL to open when notification is tapped |
| Image URL | No | Image to display in the notification |

### Sending Notifications via Command Line

```bash
php artisan api:send-notification --title="Sale!" --message="50% off all items today"
```

### Notification Tracking

Each notification tracks:

- **Sent count** — How many devices received the message
- **Failed count** — How many deliveries failed
- **Delivered count** — Confirmed deliveries
- **Read count** — How many users read the notification

Users can retrieve their notifications via the `/api/v1/notifications` endpoints and mark them as read or clicked.

### Scheduled Notifications

Notifications can be scheduled for future delivery. A command processes due notifications:

```bash
php artisan schedule:run
```

Ensure your [cronjob](/cms/cronjob) is configured for scheduled notifications to work.

## Custom API Endpoints

You can add custom endpoints in your plugin:

### 1. Create an API Controller

```php
<?php

namespace Botble\YourPlugin\Http\Controllers\API;

use Botble\Api\Http\Controllers\ApiController;
use Botble\YourPlugin\Models\YourModel;
use Botble\YourPlugin\Http\Resources\YourModelResource;
use Illuminate\Http\Request;

class YourModelController extends ApiController
{
    public function index(Request $request)
    {
        $data = YourModel::query()
            ->paginate($request->input('per_page', 10));

        return $this->respondWithData(YourModelResource::collection($data));
    }

    public function show(int|string $id)
    {
        $item = YourModel::query()->findOrFail($id);

        return $this->respondWithData(new YourModelResource($item));
    }
}
```

### 2. Create a Resource

```php
<?php

namespace Botble\YourPlugin\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class YourModelResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
```

### 3. Register Routes

```php
<?php

namespace Botble\YourPlugin\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class YourPluginServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Route::group([
            'prefix' => 'api/v1',
            'namespace' => 'Botble\YourPlugin\Http\Controllers\API',
            'middleware' => ['api', 'auth:sanctum'],
        ], function () {
            Route::apiResource('your-models', 'YourModelController');
        });
    }
}
```

## API Documentation Generation

Generate browsable API documentation using [Scribe](https://scribe.knuckles.wtf/):

```bash
composer require knuckleswtf/scribe
php artisan scribe:generate
```

Access documentation at `https://your-domain.com/docs`.

## API Versioning

All endpoints use the `/api/v1/` prefix. To create a new API version, add a separate set of controllers and routes with a `/api/v2/` prefix.
