# External API

The external API provides agent-facing endpoints for ticket handling, replies, and notifications. All endpoints require an **external** API key (with an associated agent) via the `X-API-KEY` header.

**Base URL:** `/api/v1/external`

## Authentication

External API keys must be linked to an active agent. If the agent is inactive or not found, a `401 Unauthorized` response is returned.

Agents can only access tickets they are assigned to.

## Connection Check

```
GET /external/connection-check
```

```json
{
  "status": true,
  "message": "Connection check successful"
}
```

## Dashboard

```
GET /external/dashboard
```

Returns aggregate ticket statistics for the authenticated agent.

**Response:**
```json
{
  "status": true,
  "data": {
    "open_tickets": 12,
    "in_progress_tickets": 5,
    "needs_response": 3,
    "closed_today": 8
  }
}
```

## Tickets

### List Tickets

```
GET /external/tickets
```

Returns tickets assigned to the authenticated agent.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `per_page` | integer | 15 | Items per page |
| `status` | string | — | Filter: `open`, `in_progress`, `on_hold`, `closed` |
| `priority` | string | — | Filter: `low`, `medium`, `high`, `critical` |
| `department_id` | integer | — | Filter by department |

### Get Ticket

```
GET /external/tickets/{id}
```

### Update Ticket

```
PUT /external/tickets/{id}
```

| Field | Rules |
|-------|-------|
| `status` | optional: `open`, `in_progress`, `on_hold`, `closed` |
| `priority` | optional: `low`, `medium`, `high`, `critical` |
| `labels` | optional, array of label IDs |

### Get Ticket Messages

```
GET /external/tickets/{id}/messages
```

| Parameter | Type | Default |
|-----------|------|---------|
| `per_page` | integer | 30 |

### Reply to Ticket

```
POST /external/tickets/{id}/messages
```

| Field | Rules |
|-------|-------|
| `content` | required, string |
| `is_internal` | optional, boolean (default: false) |

Returns `201 Created` on success. Returns `403 Forbidden` if the ticket is locked.

### Close Ticket

```
POST /external/tickets/{id}/close
```

### Toggle Like on Message

```
POST /external/tickets/{ticketId}/messages/{messageId}/like
```

**Response:**
```json
{
  "status": true,
  "data": {
    "liked": true,
    "count": 3
  }
}
```

### Ticket Resource Structure

```json
{
  "id": 1,
  "reference_id": "#1001",
  "title": "Cannot access my account",
  "content": "I'm unable to log in...",
  "status": "open",
  "priority": "high",
  "department": { "id": 1, "name": "Technical Support" },
  "category": { "id": 2, "name": "Account Issues" },
  "product": { "id": 1, "name": "SaaS Platform" },
  "customer": { "id": 5, "name": "John Doe", "email": "john@example.com" },
  "labels": [
    { "id": 1, "name": "Bug", "color": "#e74c3c" }
  ],
  "assigned_to": { "id": 3, "name": "Agent Smith" },
  "agents": [
    { "id": 3, "name": "Agent Smith" }
  ],
  "custom_fields": [
    { "id": 1, "label": "Browser", "type": "text", "value": "Chrome 120" }
  ],
  "is_resolved": false,
  "is_locked": false,
  "last_reply_at": "2026-03-15T14:30:00Z",
  "closed_at": null,
  "created_at": "2026-03-14T09:00:00Z",
  "updated_at": "2026-03-15T14:30:00Z"
}
```

## Canned Responses

```
GET /external/canned-responses
```

Returns all active canned responses, sorted by `sort_order` then `title`. No pagination — returns the full list.

**Response item:**
```json
{
  "id": 1,
  "title": "Greeting",
  "content": "Hello! Thank you for contacting support...",
  "category": "General",
  "shortcut": "/greet",
  "is_active": true,
  "sort_order": 0
}
```

## Knowledge Base Search

```
GET /external/knowledge-base/search
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string (min 2 chars) | Search query |

Searches article title, content, and excerpt. Returns max 20 published articles.

**Response item:**
```json
{
  "id": 1,
  "title": "How to reset your password",
  "slug": "how-to-reset-your-password",
  "excerpt": "Follow these steps to reset...",
  "content": "...",
  "category": { "id": 1, "name": "Account" },
  "views": 142,
  "status": "published",
  "created_at": "2026-01-10T08:00:00Z"
}
```

## Profile

### Get Profile

```
GET /external/profile
```

**Response:**
```json
{
  "status": true,
  "data": {
    "id": 3,
    "name": "Agent Smith",
    "email": "agent@example.com",
    "phone": "+1234567890",
    "locale": "en",
    "avatar_url": "https://...",
    "notification_settings": {},
    "is_active": true,
    "created_at": "2026-01-01T00:00:00Z"
  }
}
```

### Update Profile

```
PUT /external/profile
```

| Field | Rules |
|-------|-------|
| `name` | optional, string, max 250 |
| `phone` | optional, nullable, string, max 50 |
| `locale` | optional, nullable, string, max 10 |
| `notification_settings` | optional, array |

## Notifications

### List Notifications

```
GET /external/notifications
```

| Parameter | Type | Default |
|-----------|------|---------|
| `per_page` | integer | 20 |

**Response item:**
```json
{
  "id": 1,
  "type": "ticket_reply",
  "title": "New reply on #1001",
  "message": "Customer replied to your ticket",
  "ticket_id": 42,
  "sender_name": "John Doe",
  "sender_avatar": "https://...",
  "is_read": false,
  "created_at": "2026-03-15T14:35:00Z"
}
```

### Unread Count

```
GET /external/notifications/unread-count
```

```json
{
  "status": true,
  "data": {
    "unread_count": 5
  }
}
```

### Mark as Read

```
POST /external/notifications/{id}/read
```
