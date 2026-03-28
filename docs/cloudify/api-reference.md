# API Reference

## Authentication

All API requests require authentication using an API token. Include the token in the request header:

```
X-API-KEY: your-api-token-here
```

## Base URL

```
https://your-domain.com/api/v1
```

## Pagination

All list endpoints support pagination with the following query parameters:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `per_page` | integer | 40 | Number of items per page (max: 100) |
| `page` | integer | 1 | Page number |

## Media Folders

### List Folders

Get a list of folders. By default, returns only root-level folders.

```http
GET /media/folders
```

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `folder_id` | string | No | Parent folder ID. When omitted, returns root-level folders only. Use this to get subfolders of a specific folder. |
| `include_files` | boolean | No | When `true`, returns both subfolders and files in the folder. Default: `false` (returns only subfolders). |
| `per_page` | integer | No | Number of items per page (default: 40, max: 100) |
| `page` | integer | No | Page number (default: 1) |

#### Examples

Get root-level folders:
```bash
curl -X GET "https://your-domain.com/api/v1/media/folders" \
  -H "X-API-KEY: your-api-token"
```

Get subfolders of a specific folder:
```bash
curl -X GET "https://your-domain.com/api/v1/media/folders?folder_id=9eccfc2c-1f49-490c-b8e3-..." \
  -H "X-API-KEY: your-api-token"
```

Get subfolders and files together:
```bash
curl -X GET "https://your-domain.com/api/v1/media/folders?folder_id=9eccfc2c-1f49-490c-b8e3-...&include_files=true&per_page=20" \
  -H "X-API-KEY: your-api-token"
```

#### Response (default)

When `include_files` is omitted or `false`, returns a flat array of subfolders:

```json
{
  "error": false,
  "data": [
    {
      "id": "a1001e23-99fb-4d7e-97e5-75d93d7086ce",
      "name": "Documents",
      "color": null,
      "created_at": "2026-02-04 15:26:17",
      "updated_at": "2026-02-04 15:26:17"
    }
  ],
  "message": null
}
```

#### Response (include_files=true)

When `include_files=true`, returns an object with `folders` and `files` keys:

```json
{
  "error": false,
  "data": {
    "folders": [
      {
        "id": "a1001e23-99fb-4d7e-97e5-75d93d7086ce",
        "name": "Sub Folder",
        "color": null,
        "created_at": "2026-02-04 15:26:17",
        "updated_at": "2026-02-04 15:26:17"
      }
    ],
    "files": [
      {
        "id": "9f48dfaf-2e1c-4306-98b8-ea64330142b0",
        "name": "image",
        "basename": "image.jpg",
        "url": "documents/image.jpg",
        "full_url": "https://your-domain.com/storage/documents/image.jpg",
        "type": "image",
        "thumb": "https://your-domain.com/storage/documents/image.jpg",
        "size": "522,10 KB",
        "mime_type": "image/jpeg",
        "created_at": "2025-07-01 14:03:12",
        "updated_at": "2025-07-01 14:03:12",
        "options": [],
        "folder_id": "9eccfc2c-1f49-490c-b8e3-...",
        "alt": "image"
      }
    ]
  },
  "message": null
}
```

### Create Folder

Create a new folder.

```http
POST /media/folders
```

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Folder name |
| `parent_id` | string | No | Parent folder ID (default: root) |

#### Example

```bash
curl -X POST "https://your-domain.com/api/v1/media/folders" \
  -H "X-API-KEY: your-api-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Projects",
    "parent_id": "a1001e23-99fb-4d7e-97e5-75d93d7086ce"
  }'
```

#### Response

```json
{
  "error": false,
  "data": {
    "id": "b2002f34-aa0c-5e8f-a8f6-86ea4e8197df",
    "name": "Projects",
    "color": null,
    "created_at": "2026-03-27 10:00:00",
    "updated_at": "2026-03-27 10:00:00"
  },
  "message": "Create folder successfully!"
}
```

### Get Folder Details

Get details of a specific folder including its files.

```http
GET /media/folders/{folder_id}
```

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `folder_id` | string | Yes | The folder ID |

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `per_page` | integer | No | Number of files per page (default: 40, max: 100) |
| `page` | integer | No | Page number (default: 1) |

#### Example

```bash
curl -X GET "https://your-domain.com/api/v1/media/folders/9eccfc2c-1f49-490c-b8e3-...?per_page=10" \
  -H "X-API-KEY: your-api-token"
```

#### Response

```json
{
  "error": false,
  "data": {
    "id": "9eccfc2c-1f49-490c-b8e3-...",
    "name": "Documents",
    "color": null,
    "created_at": "2026-01-01 00:00:00",
    "updated_at": "2026-01-01 00:00:00",
    "files": [
      {
        "id": "9f48dfaf-2e1c-4306-98b8-ea64330142b0",
        "name": "document",
        "basename": "document.pdf",
        "url": "documents/document.pdf",
        "full_url": "https://your-domain.com/storage/documents/document.pdf",
        "type": "document",
        "size": "1,00 MB",
        "mime_type": "application/pdf",
        "created_at": "2026-01-01 00:00:00",
        "updated_at": "2026-01-01 00:00:00",
        "folder_id": "9eccfc2c-1f49-490c-b8e3-...",
        "alt": "document"
      }
    ]
  },
  "message": null
}
```

### Trash Folder

Move a folder to trash (soft delete).

```http
PATCH /media/folders/{folder_id}/trash
```

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `folder_id` | string | Yes | The folder ID to trash |

#### Example

```bash
curl -X PATCH "https://your-domain.com/api/v1/media/folders/9eccfc2c-1f49-490c-b8e3-.../trash" \
  -H "X-API-KEY: your-api-token"
```

### Delete Folder

Permanently delete a folder.

```http
DELETE /media/folders/{folder_id}
```

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `folder_id` | string | Yes | The folder ID to delete |

#### Example

```bash
curl -X DELETE "https://your-domain.com/api/v1/media/folders/9eccfc2c-1f49-490c-b8e3-..." \
  -H "X-API-KEY: your-api-token"
```

### Bulk Delete Folders

Delete multiple folders at once.

```http
POST /media/folders/deletes
```

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `folders` | array | Yes | Array of folder IDs to delete |

#### Example

```bash
curl -X POST "https://your-domain.com/api/v1/media/folders/deletes" \
  -H "X-API-KEY: your-api-token" \
  -H "Content-Type: application/json" \
  -d '{
    "folders": ["9eccfc2c-...", "a1001e23-...", "b2002f34-..."]
  }'
```

## Media Files

### List Files

Get a list of files in a specific folder.

```http
GET /media/files
```

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `folder_id` | string | No | Folder ID to list files from (default: root) |
| `per_page` | integer | No | Number of items per page (default: 40, max: 100) |
| `page` | integer | No | Page number (default: 1) |

#### Example

```bash
curl -X GET "https://your-domain.com/api/v1/media/files?folder_id=9eccfc2c-1f49-490c-b8e3-...&per_page=10&page=1" \
  -H "X-API-KEY: your-api-token"
```

#### Response

```json
{
  "error": false,
  "data": [
    {
      "id": "9f48dfaf-2e1c-4306-98b8-ea64330142b0",
      "name": "image",
      "basename": "image.jpg",
      "url": "documents/image.jpg",
      "full_url": "https://your-domain.com/storage/documents/image.jpg",
      "type": "image",
      "thumb": "https://your-domain.com/storage/documents/image.jpg",
      "size": "204,80 KB",
      "mime_type": "image/jpeg",
      "created_at": "2026-01-01 00:00:00",
      "updated_at": "2026-01-01 00:00:00",
      "options": [],
      "folder_id": "9eccfc2c-1f49-490c-b8e3-...",
      "alt": "image"
    }
  ],
  "message": null
}
```

### Upload File

Upload a new file.

```http
POST /media/files
```

#### Request Body (multipart/form-data)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | file | Yes | The file to upload |
| `folder_id` | string | No | Target folder ID (default: root) |
| `folder_slug` | string | No | Target folder slug (max: 191 characters). Creates folder if it doesn't exist. |
| `is_public` | boolean | No | File visibility (default: `true`) |

#### Example

```bash
curl -X POST "https://your-domain.com/api/v1/media/files" \
  -H "X-API-KEY: your-api-token" \
  -F "file=@/path/to/file.pdf" \
  -F "folder_id=9eccfc2c-1f49-490c-b8e3-..."
```

#### Response

```json
{
  "error": false,
  "data": {
    "id": "c3003g45-bb1d-6f9g-b9g7-97fb5f9208eg",
    "name": "file",
    "basename": "file.pdf",
    "url": "documents/file.pdf",
    "full_url": "https://your-domain.com/storage/documents/file.pdf",
    "type": "document",
    "size": "1,00 MB",
    "mime_type": "application/pdf",
    "created_at": "2026-03-27 10:00:00",
    "updated_at": "2026-03-27 10:00:00",
    "folder_id": "9eccfc2c-1f49-490c-b8e3-..."
  },
  "message": null
}
```

### Trash File

Move a file to trash (soft delete).

```http
PATCH /media/files/{file_id}/trash
```

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_id` | string | Yes | The file ID to trash |

#### Example

```bash
curl -X PATCH "https://your-domain.com/api/v1/media/files/9f48dfaf-2e1c-4306-98b8-.../trash" \
  -H "X-API-KEY: your-api-token"
```

### Delete File

Permanently delete a file.

```http
DELETE /media/files/{file_id}
```

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_id` | string | Yes | The file ID to delete |

#### Example

```bash
curl -X DELETE "https://your-domain.com/api/v1/media/files/9f48dfaf-2e1c-4306-98b8-..." \
  -H "X-API-KEY: your-api-token"
```

### Bulk Delete Files

Delete multiple files at once.

```http
POST /media/files/deletes
```

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `files` | array | Yes | Array of file IDs to delete |

#### Example

```bash
curl -X POST "https://your-domain.com/api/v1/media/files/deletes" \
  -H "X-API-KEY: your-api-token" \
  -H "Content-Type: application/json" \
  -d '{
    "files": ["9f48dfaf-...", "a2049eaf-...", "b3050fbg-..."]
  }'
```

## Folder Access Control

API keys can be restricted to specific folders. When an API key has `folder_ids` configured:

- The key can only access the specified folders and their descendants (subfolders)
- Attempting to access a restricted folder returns `403 Forbidden`
- Keys with no `folder_ids` restriction have unrestricted access to all folders

## Error Responses

All endpoints return a standard response format:

```json
{
  "error": true,
  "data": null,
  "message": "Error description"
}
```

HTTP status codes:

| Code | Description |
|------|-------------|
| `200` | Request successful |
| `400` | Invalid request parameters |
| `403` | Missing/invalid API token or insufficient permissions |
| `404` | Resource not found |
| `422` | Validation errors |
| `429` | Rate limit exceeded |
| `500` | Server error |

Validation error format:

```json
{
  "message": "The name field is required.",
  "errors": {
    "name": ["The name field is required."]
  }
}
```

## Rate Limiting

API requests are rate-limited to **300 requests per minute** by default (configurable via `CLOUDIFY_RATE_LIMIT_PER_MINUTE` environment variable).

Rate limit headers are included in responses:
- `X-RateLimit-Limit` - Maximum requests per window
- `X-RateLimit-Remaining` - Remaining requests in current window
- `X-RateLimit-Reset` - Unix timestamp when limit resets
