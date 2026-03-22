# General API

SnapCart provides RESTful APIs for integrating with external systems and building custom applications.

## Authentication

API requests require authentication using a Bearer token. To obtain a token:

```bash
POST /api/v1/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password"
}
```

The response includes an access token:

```json
{
    "data": {
        "token": "your-access-token"
    }
}
```

## Using the Token

Include the token in the `Authorization` header for all subsequent requests:

```bash
GET /api/v1/resource
Authorization: Bearer your-access-token
```

## Available Endpoints

### Pages

- `GET /api/v1/pages` - List all pages
- `GET /api/v1/pages/{id}` - Get a specific page

### Blog Posts

- `GET /api/v1/posts` - List all posts
- `GET /api/v1/posts/{id}` - Get a specific post

### Categories

- `GET /api/v1/categories` - List all categories

For ecommerce-specific API endpoints, see [Ecommerce API](./usage-ecommerce-api.md).

::: warning
Never expose your API tokens in client-side code. Always make API calls from your server.
:::
