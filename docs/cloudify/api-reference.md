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

## Media Folders

### List Folders

Get a list of folders. By default, returns only root-level folders.

```http
GET /media/folders
```

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `folder_id` | integer | No | Parent folder ID. When omitted, returns root-level folders only. Use this to get subfolders of a specific folder. |

#### Examples

Get root-level folders:
```bash
curl -X GET "https://your-domain.com/api/v1/media/folders" \
  -H "X-API-KEY: your-api-token"
```

Get subfolders of folder ID 5:
```bash
curl -X GET "https://your-domain.com/api/v1/media/folders?folder_id=5" \
  -H "X-API-KEY: your-api-token"
```

#### Response

```json
[
  {
    "id": 1,
    "name": "Documents",
    "slug": "documents",
    "parent_id": 0,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
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
| `parent_id` | integer | No | Parent folder ID (default: 0 for root) |

#### Example

```bash
curl -X POST "https://your-domain.com/api/v1/media/folders" \
  -H "X-API-KEY: your-api-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Projects",
    "parent_id": 0
  }'
```

### Get Folder Details

Get details of a specific folder including its files.

```http
GET /media/folders/{folder_id}
```

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `folder_id` | integer | Yes | The folder ID |

#### Example

```bash
curl -X GET "https://your-domain.com/api/v1/media/folders/5" \
  -H "X-API-KEY: your-api-token"
```

#### Response

```json
{
  "id": 5,
  "name": "Projects",
  "slug": "projects",
  "parent_id": 0,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z",
  "files": [
    {
      "id": 10,
      "name": "document.pdf",
      "url": "https://storage.googleapis.com/...",
      "size": 1024000,
      "mime_type": "application/pdf"
    }
  ]
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
| `folder_id` | integer | Yes | The folder ID to trash |

#### Example

```bash
curl -X PATCH "https://your-domain.com/api/v1/media/folders/5/trash" \
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
| `folder_id` | integer | Yes | The folder ID to delete |

#### Example

```bash
curl -X DELETE "https://your-domain.com/api/v1/media/folders/5" \
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
    "folders": ["5", "6", "7"]
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
| `folder_id` | integer | No | Folder ID to list files from (default: 0 for root) |
| `page` | integer | No | Page number for pagination |
| `limit` | integer | No | Number of items per page |

#### Example

```bash
curl -X GET "https://your-domain.com/api/v1/media/files?folder_id=5" \
  -H "X-API-KEY: your-api-token"
```

#### Response

```json
[
  {
    "id": 10,
    "name": "image.jpg",
    "url": "https://storage.googleapis.com/...",
    "size": 204800,
    "mime_type": "image/jpeg",
    "folder_id": 5,
    "created_at": "2024-01-01T00:00:00Z"
  }
]
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
| `folder_id` | integer | No | Target folder ID (default: 0 for root) |

#### Example

```bash
curl -X POST "https://your-domain.com/api/v1/media/files" \
  -H "X-API-KEY: your-api-token" \
  -F "file=@/path/to/file.pdf" \
  -F "folder_id=5"
```

#### Response

```json
{
  "id": 11,
  "name": "file.pdf",
  "url": "https://storage.googleapis.com/...",
  "size": 1024000,
  "mime_type": "application/pdf",
  "folder_id": 5,
  "created_at": "2024-01-01T00:00:00Z"
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
| `file_id` | integer | Yes | The file ID to trash |

#### Example

```bash
curl -X PATCH "https://your-domain.com/api/v1/media/files/10/trash" \
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
| `file_id` | integer | Yes | The file ID to delete |

#### Example

```bash
curl -X DELETE "https://your-domain.com/api/v1/media/files/10" \
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
    "files": ["10", "11", "12"]
  }'
```

## Error Responses

All endpoints return standard HTTP status codes:

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Missing or invalid API token
- `403 Forbidden` - Token lacks required permissions
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation errors
- `500 Internal Server Error` - Server error

Error response format:

```json
{
  "message": "Error description",
  "errors": {
    "field_name": ["Validation error message"]
  }
}
```

## Rate Limiting

API requests are rate-limited. Default limits:
- 60 requests per minute for standard tokens
- 120 requests per minute for internal tokens

Rate limit headers are included in responses:
- `X-RateLimit-Limit` - Maximum requests per window
- `X-RateLimit-Remaining` - Remaining requests in current window
- `X-RateLimit-Reset` - Unix timestamp when limit resets