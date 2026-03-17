# Internal API

The internal API provides full admin-level CRUD operations. All endpoints require an **internal** API key via the `X-API-KEY` header.

**Base URL:** `/api/v1/internal`

## Connection Check

```
GET /api/v1/internal/connection-check
```

**Scope:** `connection:check`

**Response:**
```json
{
  "status": true,
  "message": "Connection check successful"
}
```

## Tickets

### List Tickets

```
GET /internal/tickets
```

**Scope:** `tickets:list`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `per_page` | integer | 15 | Items per page |
| `status` | string | — | Filter: `open`, `in_progress`, `on_hold`, `closed` |
| `priority` | string | — | Filter: `low`, `medium`, `high`, `critical` |
| `department_id` | integer | — | Filter by department |
| `customer_id` | integer | — | Filter by customer |
| `assigned_to` | integer | — | Filter by assigned agent (user ID) |

### Create Ticket

```
POST /internal/tickets
```

**Scope:** `tickets:create`

| Field | Rules |
|-------|-------|
| `customer_id` | required, must exist |
| `title` | required, string, max 500 |
| `content` | required, string |
| `department_id` | optional, must exist |
| `category_id` | optional, must exist |
| `product_id` | optional, must exist |
| `priority` | optional: `low`, `medium`, `high`, `critical` |

### Get Ticket

```
GET /internal/tickets/{id}
```

**Scope:** `tickets:read`

### Update Ticket

```
PUT /internal/tickets/{id}
```

**Scope:** `tickets:update`

| Field | Rules |
|-------|-------|
| `status` | optional: `open`, `in_progress`, `on_hold`, `closed` |
| `priority` | optional: `low`, `medium`, `high`, `critical` |
| `assigned_to` | optional, nullable, must exist as user |
| `department_id` | optional, must exist |
| `category_id` | optional, nullable, must exist |
| `product_id` | optional, nullable, must exist |
| `is_resolved` | optional, boolean |
| `is_locked` | optional, boolean |
| `labels` | optional, array of label IDs |

### Delete Ticket

```
DELETE /internal/tickets/{id}
```

**Scope:** `tickets:delete`

## Ticket Messages

### List Messages

```
GET /internal/tickets/{ticketId}/messages
```

**Scope:** `messages:list`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `per_page` | integer | 15 | Items per page |

### Create Message

```
POST /internal/tickets/{ticketId}/messages
```

**Scope:** `messages:create`

| Field | Rules |
|-------|-------|
| `content` | required, string |
| `is_internal` | optional, boolean |

The message is created with `sender_type = User` and `sender_id` from the API key. The ticket's `last_reply_at` is updated and `last_reply_by` set to `staff`.

## Departments

### List Departments

```
GET /internal/departments
```

**Scope:** `departments:list` | Sorted by `sort_order`

| Parameter | Type | Default |
|-----------|------|---------|
| `per_page` | integer | 15 |

### Create Department

```
POST /internal/departments
```

**Scope:** `departments:create`

| Field | Rules |
|-------|-------|
| `name` | required, string, max 250 |
| `description` | optional, string, max 1000 |
| `email` | optional, email, max 250 |
| `is_default` | optional, boolean |
| `status` | optional: `published`, `draft` |
| `sort_order` | optional, integer, min 0 |

### Get / Update / Delete Department

```
GET    /internal/departments/{id}    → departments:read
PUT    /internal/departments/{id}    → departments:update
DELETE /internal/departments/{id}    → departments:delete
```

Update uses the same fields as create.

## Categories

### Endpoints

```
GET    /internal/categories           → categories:list
POST   /internal/categories           → categories:create
GET    /internal/categories/{id}      → categories:read
PUT    /internal/categories/{id}      → categories:update
DELETE /internal/categories/{id}      → categories:delete
```

Sorted by `sort_order`.

### Fields

| Field | Rules |
|-------|-------|
| `name` | required, string, max 250 |
| `description` | optional, string, max 1000 |
| `parent_id` | optional, must exist as category |
| `status` | optional: `published`, `draft` |
| `sort_order` | optional, integer, min 0 |

## Labels

### Endpoints

```
GET    /internal/labels           → labels:list
POST   /internal/labels           → labels:create
GET    /internal/labels/{id}      → labels:read
PUT    /internal/labels/{id}      → labels:update
DELETE /internal/labels/{id}      → labels:delete
```

Sorted by `sort_order`.

### Fields

| Field | Rules |
|-------|-------|
| `name` | required, string, max 250 |
| `color` | required, valid hex color |
| `status` | optional: `published`, `draft` |
| `sort_order` | optional, integer, min 0 |

## Products

### Endpoints

```
GET    /internal/products           → products:list
POST   /internal/products           → products:create
GET    /internal/products/{id}      → products:read
PUT    /internal/products/{id}      → products:update
DELETE /internal/products/{id}      → products:delete
```

Sorted by `name`.

### Fields

| Field | Rules |
|-------|-------|
| `name` | required, string, max 250 |
| `envato_id` | optional, string, max 100, unique |
| `description` | optional, string |
| `price` | optional, numeric, min 0 |
| `status` | optional: `published`, `draft` |

## Customers

### Endpoints

```
GET  /internal/customers           → customers:list
POST /internal/customers           → customers:create
GET  /internal/customers/{id}      → customers:read
PUT  /internal/customers/{id}      → customers:update
```

::: info
Customers cannot be deleted via the API.
:::

Sorted by `name`.

### Fields

| Field | Rules |
|-------|-------|
| `name` | required, string, max 250 |
| `email` | required, email, max 250, unique |
| `phone` | optional, string, max 50 |
| `envato_username` | optional, string, max 250 |

## Agents

### Endpoints

```
GET    /internal/agents           → agents:list
POST   /internal/agents           → agents:create
GET    /internal/agents/{id}      → agents:read
PUT    /internal/agents/{id}      → agents:update
DELETE /internal/agents/{id}      → agents:delete
```

### Query Parameters (List)

| Parameter | Type | Description |
|-----------|------|-------------|
| `per_page` | integer | Default 15 |
| `department_id` | integer | Filter by department |
| `is_active` | boolean | Filter by active status |

### Fields

| Field | Rules |
|-------|-------|
| `name` | required, string, max 250 |
| `email` | required, email, max 250, unique |
| `password` | required on create, string, min 8 |
| `phone` | optional, string, max 50 |
| `locale` | optional, string, max 10 |
| `is_active` | optional, boolean |
| `departments` | optional, array of department IDs |

Password is hashed automatically. On update, password is optional.

## Knowledge Categories

### Endpoints

```
GET    /internal/knowledge-categories           → knowledge-categories:list
POST   /internal/knowledge-categories           → knowledge-categories:create
GET    /internal/knowledge-categories/{id}      → knowledge-categories:read
PUT    /internal/knowledge-categories/{id}      → knowledge-categories:update
DELETE /internal/knowledge-categories/{id}      → knowledge-categories:delete
```

List includes article count, sorted by `sort_order`.

### Fields

| Field | Rules |
|-------|-------|
| `name` | required, string, max 250 |
| `description` | optional, string, max 1000 |
| `icon` | optional, string, max 100 |
| `status` | optional: `published`, `draft` |
| `sort_order` | optional, integer, min 0 |

## Knowledge Articles

### Endpoints

```
GET    /internal/knowledge-articles           → knowledge-articles:list
POST   /internal/knowledge-articles           → knowledge-articles:create
GET    /internal/knowledge-articles/{id}      → knowledge-articles:read
PUT    /internal/knowledge-articles/{id}      → knowledge-articles:update
DELETE /internal/knowledge-articles/{id}      → knowledge-articles:delete
```

List includes category, sorted by latest.

### Fields

| Field | Rules |
|-------|-------|
| `title` | required, string, max 250 |
| `slug` | optional, string, max 250 |
| `content` | optional, string |
| `excerpt` | optional, string, max 500 |
| `category_id` | optional, must exist |
| `status` | optional: `published`, `draft` |

## Canned Responses

### Endpoints

```
GET    /internal/canned-responses           → canned-responses:list
POST   /internal/canned-responses           → canned-responses:create
GET    /internal/canned-responses/{id}      → canned-responses:read
PUT    /internal/canned-responses/{id}      → canned-responses:update
DELETE /internal/canned-responses/{id}      → canned-responses:delete
```

Sorted by `sort_order`.

### Fields

| Field | Rules |
|-------|-------|
| `title` | required, string, max 250 |
| `content` | optional, string |
| `category` | optional, string, max 100 |
| `shortcut` | optional, string, max 100 |
| `is_active` | optional, boolean |
| `sort_order` | optional, integer, min 0 |

## Custom Fields

### Endpoints

```
GET    /internal/custom-fields           → custom-fields:list
POST   /internal/custom-fields           → custom-fields:create
GET    /internal/custom-fields/{id}      → custom-fields:read
PUT    /internal/custom-fields/{id}      → custom-fields:update
DELETE /internal/custom-fields/{id}      → custom-fields:delete
```

Sorted by `sort_order`.

### Fields

| Field | Rules |
|-------|-------|
| `label` | required, string, max 250 |
| `description` | optional, string, max 1000 |
| `type` | required: `date`, `datetime_local`, `email`, `number`, `tel`, `text`, `textarea`, `time`, `url` |
| `is_required` | optional, boolean |
| `sort_order` | optional, integer, min 0 |
| `status` | optional: `published`, `draft` |

## Activity Logs

```
GET /internal/activity-logs
```

**Scope:** `activity-logs:list`

| Parameter | Type | Default |
|-----------|------|---------|
| `per_page` | integer | 15 |

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "description": "Ticket #1001 status changed to closed",
      "user": { "id": 1, "name": "Admin" },
      "ip_address": "127.0.0.1",
      "created_at": "2026-03-15T10:30:00Z"
    }
  ],
  "meta": { "current_page": 1, "last_page": 1, "per_page": 15, "total": 1 }
}
```

## Reports

### Overview Report

```
GET /internal/reports/overview
```

**Scope:** `reports:overview`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `start_date` | date (ISO 8601) | 30 days ago | Period start |
| `end_date` | date (ISO 8601) | today | Period end |

### Agents Report

```
GET /internal/reports/agents
```

**Scope:** `reports:agents` | Same parameters as overview.

### Departments Report

```
GET /internal/reports/departments
```

**Scope:** `reports:departments` | Same parameters as overview.

## Settings

### Get Settings

```
GET /internal/settings
```

**Scope:** `settings:read`

### Update Settings

```
PUT /internal/settings
```

**Scope:** `settings:update`

| Field | Rules |
|-------|-------|
| `sd_default_department_id` | optional, nullable, must exist |
| `sd_default_priority` | optional, nullable, string |
| `sd_auto_close_days` | optional, integer, min 0 |
| `sd_tickets_per_page` | optional, integer, 1–200 |
| `sd_notification_email` | optional, nullable, email, max 250 |
| `sd_customer_registration_enabled` | optional, boolean |
| `sd_customer_max_tickets_per_day` | optional, integer, min 0 |
| `sd_enable_auto_assign` | optional, boolean |
| `sd_enable_envato_integration` | optional, boolean |

## API Keys

### Endpoints

```
GET    /internal/api-keys           → api-keys:list
POST   /internal/api-keys           → api-keys:create
GET    /internal/api-keys/{id}      → api-keys:read
PUT    /internal/api-keys/{id}      → api-keys:update
DELETE /internal/api-keys/{id}      → api-keys:delete
```

### Fields

| Field | Rules |
|-------|-------|
| `name` | required, string, max 250 |
| `type` | required: `internal`, `external` |
| `scopes` | optional, array of scope strings |
| `agent_id` | optional, nullable, must exist (for external keys) |
| `expires_at` | optional, nullable, date, must be in the future |

::: warning
The raw API key is only returned **once** on creation. Store it securely.
:::

::: info
Deleting an API key sets `revoked = true` (soft revoke). The record is not hard-deleted.
:::
