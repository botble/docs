# API

## Overview

Botble CMS provides a powerful API system that allows you to interact with your application data programmatically. The API package is located in `/vendor/botble/api` (it's installed from https://github.com/botble/api) and uses Laravel Sanctum for authentication. You can learn more about Laravel Sanctum here: https://laravel.com/docs/12.x/sanctum.

## Authentication

The API uses token-based authentication with Laravel Sanctum. Here's how to authenticate:

### Obtaining an API Token

To get an API token, make a POST request to the `/api/v1/auth/login` endpoint with your credentials:

```bash
curl -X POST http://your-domain.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","password":"your-password"}'
```

The response will include an access token:

```json
{
  "data": {
    "token": "your-api-token",
    "user": {
      "id": 1,
      "name": "Your Name",
      "email": "your-email@example.com",
      ...
    }
  }
}
```

### Using the API Token

Include the token in the `Authorization` header for all subsequent requests:

```bash
curl -X GET http://your-domain.com/api/v1/me \
  -H "Authorization: Bearer your-api-token" \
  -H "Content-Type: application/json"
```

## Available Endpoints

The API provides endpoints for various resources in your application. Here are some of the common endpoints:

### User Endpoints

- `GET /api/v1/me` - Get the authenticated user's information
- `PUT /api/v1/me` - Update the authenticated user's information
- `POST /api/v1/auth/login` - Login and get an API token
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/logout` - Logout and invalidate the API token
- `POST /api/v1/auth/forgot-password` - Send a password reset link
- `POST /api/v1/auth/reset-password` - Reset password using a token

### Blog Endpoints

- `GET /api/v1/posts` - Get a list of blog posts
- `GET /api/v1/posts/{id}` - Get a specific blog post
- `GET /api/v1/categories` - Get a list of blog categories
- `GET /api/v1/categories/{id}` - Get a specific blog category
- `GET /api/v1/tags` - Get a list of blog tags
- `GET /api/v1/tags/{id}` - Get a specific blog tag

### Page Endpoints

- `GET /api/v1/pages` - Get a list of pages
- `GET /api/v1/pages/{id}` - Get a specific page

### Other Endpoints

Depending on the plugins you have installed, additional endpoints may be available for resources like:

- E-commerce (products, orders, customers)
- Galleries
- Contact forms
- Custom fields
- And more

## Request Parameters

Many API endpoints support various request parameters for filtering, sorting, and pagination:

### Pagination

- `page` - The page number (default: 1)
- `per_page` - Number of items per page (default: 10, max: 100)

```
GET /api/v1/posts?page=2&per_page=15
```

### Filtering

You can filter results using query parameters:

```
GET /api/v1/posts?status=published&category_id=5
```

### Sorting

Sort results using the `sort_by` and `order` parameters:

```
GET /api/v1/posts?sort_by=created_at&order=desc
```

### Including Relations

Some endpoints support eager loading of related data using the `include` parameter:

```
GET /api/v1/posts?include=categories,tags,author
```

## Response Format

API responses follow a consistent format:

```json
{
  "data": [...],  // The requested data
  "meta": {      // Metadata (for paginated responses)
    "current_page": 1,
    "from": 1,
    "last_page": 5,
    "per_page": 10,
    "to": 10,
    "total": 50
  },
  "links": {     // Pagination links (for paginated responses)
    "first": "http://your-domain.com/api/v1/posts?page=1",
    "last": "http://your-domain.com/api/v1/posts?page=5",
    "prev": null,
    "next": "http://your-domain.com/api/v1/posts?page=2"
  }
}
```

For single resource requests, the response will just include the `data` object:

```json
{
  "data": {
    "id": 1,
    "name": "Example Post",
    ...
  }
}
```

## Error Handling

When an error occurs, the API returns an appropriate HTTP status code and a JSON response with error details:

```json
{
  "error": {
    "message": "The error message",
    "code": 404,          // HTTP status code
    "details": [...],     // Optional additional details
    "validation_errors": {...} // Validation errors (for 422 responses)
  }
}
```

## Custom API Endpoints

You can create custom API endpoints by adding routes to the `/platform/packages/api/routes/api.php` file or by creating a new API controller in your plugin.

### Example: Adding a Custom API Endpoint in a Plugin

1. Create an API controller in your plugin:

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

    public function show($id)
    {
        $item = YourModel::query()->findOrFail($id);

        return $this->respondWithData(new YourModelResource($item));
    }
}
```

2. Create a resource class to transform your model data:

```php
<?php

namespace Botble\YourPlugin\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class YourModelResource extends JsonResource
{
    public function toArray($request)
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

3. Register your API routes in your plugin's service provider:

```php
<?php

namespace Botble\YourPlugin\Providers;

use Illuminate\Support\ServiceProvider;
use Route;

class YourPluginServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Register API routes
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

## Generate API Documentation

To generate API documentation for your Botble CMS application, follow these simple steps:

1. Install the Scribe package:

```bash
composer require knuckleswtf/scribe
```

2. Generate the API documentation:

```bash
php artisan scribe:generate
```

3. Access your API documentation at:

```
http://your-domain.com/docs
```

That's it! You now have comprehensive API documentation for your application.

## API Versioning

Botble CMS supports API versioning through URL prefixes. The default version is `v1` and is accessible at `/api/v1/`. If you need to create a new version of the API, you can create a new set of controllers and routes with a different version prefix (e.g., `/api/v2/`).

## API Settings (Admin Panel)

Navigate to **Admin > Settings > API** (`/admin/settings/api`) to configure the API system.

### Enabling/Disabling the API

Toggle the REST API on or off. When disabled, all API endpoints will be inaccessible and return `403` responses.

### API Key Protection

API Key Protection adds an extra security layer on top of Sanctum token authentication.

When enabled:
- All API requests **must** include the `X-API-KEY` header with the configured API key.
- Requests without a valid API key are rejected before reaching any controller logic.

**How to use it:**

1. Go to **Admin > Settings > API**.
2. Enable **API Key Protection**.
3. Copy the generated API key (or click **Generate** to create a new one).
4. Include the key in every API request:

```bash
curl -X GET http://your-domain.com/api/v1/posts \
  -H "Authorization: Bearer your-sanctum-token" \
  -H "X-API-KEY: your-api-key" \
  -H "Content-Type: application/json"
```

**Use cases for ecommerce:**
- Secure communication between your mobile app and the backend.
- Protect API access from unauthorized third-party tools or scripts.
- Rate-limit or revoke access by rotating the API key without affecting user tokens.

::: tip
The API key protects the **entire API surface**. Individual user authentication is still handled by Sanctum tokens. Think of the API key as a "gate key" for your app, and the Sanctum token as user identity.
:::

### Push Notifications (FCM v1 API)

Botble CMS supports Firebase Cloud Messaging (FCM) for sending push notifications to mobile app users.

#### Setup

1. **Create a Firebase project** at [Firebase Console](https://console.firebase.google.com).
2. Go to **Project Settings > Service Accounts** and click **Generate new private key** to download a JSON file.
3. Upload the JSON file in **Admin > Settings > API > Push Notifications** (or place it manually in `storage/app/firebase/`).
4. Enter your **Firebase Project ID**.
5. Enable **Push Notifications**.

#### Device Tokens

Device tokens are registered automatically when users open your mobile app. Each token represents a unique device that can receive push notifications.

**"No active device tokens found"** means no mobile app has registered with your backend yet. This is expected if:
- Your mobile app has not been built or deployed yet.
- No users have opened the app after FCM integration was added.
- The app is not sending the device token to your API.

Your mobile app must call the device token registration endpoint after obtaining an FCM token from Firebase:

```bash
POST /api/v1/device-tokens
Authorization: Bearer your-sanctum-token
Content-Type: application/json

{
  "token": "firebase-device-token",
  "platform": "android"  // or "ios"
}
```

Once devices are registered, you can send notifications from the admin panel.

#### Sending Notifications

In **Admin > Settings > API**, use the **Send Custom Notification** form to push messages to devices:

| Field | Description |
|---|---|
| **Title** (required) | Notification title shown on the device |
| **Message** (required) | Notification body text (max 500 characters) |
| **Target Devices** | All Devices, Android only, iOS only, or Customers only |
| **Action URL** (optional) | URL to open when the notification is tapped |
| **Image URL** (optional) | Image to display in the notification |

::: warning
Notifications will only be delivered to devices with active, valid tokens. If you see "No active device tokens found", ensure your mobile app is registering tokens via the API.
:::
