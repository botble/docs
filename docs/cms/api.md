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
