# API Overview

DeskHive provides a RESTful API for integrating with external systems. The API is split into two groups:

- **Internal API** — Full admin-level CRUD for tickets, departments, agents, customers, knowledge base, settings, and more.
- **External API** — Agent-facing endpoints for ticket handling, canned responses, notifications, and profile management.

## Base URL

```
https://your-domain.com/api/v1
```

## Authentication

All API endpoints (except `/api/v1/health-check`) require an API key passed via the `X-API-KEY` header:

```bash
curl -H "X-API-KEY: your-api-key" https://your-domain.com/api/v1/internal/tickets
```

### API Key Types

| Type | Prefix | Purpose |
|------|--------|---------|
| `internal` | `/api/v1/internal/` | Admin operations — full CRUD on all resources |
| `external` | `/api/v1/external/` | Agent operations — ticket handling, replies, notifications |

### Creating API Keys

API keys are managed in **Admin Panel > Support Desk > Settings > API Keys**, or via the [Internal API Keys endpoint](api-internal#api-keys).

When a key is created, the raw key is returned **once** — store it securely.

### Scopes

Internal API keys use scope-based authorization. Each endpoint requires a specific scope (e.g., `tickets:list`, `departments:create`). Keys with the `special` flag bypass scope checks.

## Rate Limiting

All API endpoints are rate-limited using the `support-desk` throttle configuration.

## Response Format

All responses are JSON. Successful responses follow this pattern:

```json
{
  "data": { ... },
  "message": "Optional message"
}
```

Paginated responses include metadata:

```json
{
  "data": [ ... ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 15,
    "total": 72
  }
}
```

## Error Responses

| Status | Meaning | Example |
|--------|---------|---------|
| `400` | Missing `X-API-KEY` header | `{"message": "Missing header: X-API-KEY"}` |
| `401` | Invalid or expired API key | `{"message": "Invalid API key"}` |
| `403` | Insufficient scope | `{"message": "Forbidden scope"}` |
| `404` | Resource not found | `{"message": "Not found"}` |
| `422` | Validation error | `{"message": "...", "errors": {...}}` |

## Health Check

A public endpoint (no auth required) to verify the API is running:

```
GET /api/v1/health-check
```

```json
{
  "message": "Health check successful"
}
```

## Quick Links

| Section | Description |
|---------|-------------|
| [Internal API](api-internal.md) | Admin-level CRUD endpoints |
| [External API](api-external.md) | Agent-facing endpoints |
