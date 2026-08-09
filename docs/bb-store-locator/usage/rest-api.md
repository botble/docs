# REST API

A read-only JSON API for building your own front end, a mobile app, or feeding another system.

Controlled by **Settings → Store Locator (Map) → Enable API**, which is on by default. Turn it off to close the endpoints entirely.

::: tip Your site's API switch matters too
Botble has a global API toggle. If every endpoint answers `503 API is currently disabled`, that is the site-wide setting, not this plugin.
:::

## Endpoints

| Method | Path | Returns |
|---|---|---|
| `GET` | `/api/v1/store-locator/stores` | Paginated, filterable list of stores |
| `GET` | `/api/v1/store-locator/stores/{slug}` | One store |
| `GET` | `/api/v1/store-locator/categories` | Published categories |
| `GET` | `/api/v1/store-locator/suggest` | Address suggestions |
| `GET` | `/api/v1/store-locator/settings` | Public locator settings |

`stores` and `suggest` are rate limited to 60 requests per minute.

## Query parameters

| Parameter | Meaning |
|---|---|
| `lat`, `lng` | Search origin. Both are required together - half a pair is ignored |
| `radius` | Distance from the origin. Clamped to your configured maximum |
| `unit` | `km` or `mi` |
| `q` | Free-text search over name, address, city and postcode |
| `categories` | Comma-separated category ids |
| `country`, `state`, `city` | Region filters |
| `open_now` | `true` to return only stores open at the time of the request |
| `sort` | `distance`, `name`, `city`, `state`, `featured`, `random` |
| `limit`, `page` | Pagination. `limit` is capped by the results-limit setting |
| `facets` | `true` to include category and region counts |

`sort=distance` needs an origin. Without `lat`/`lng` it falls back to `featured`, so results stay in a stable order rather than an arbitrary one.

## Example

```bash
curl "https://example.com/api/v1/store-locator/stores?lat=51.5074&lng=-0.1278&radius=25&unit=km&open_now=true"
```

```json
{
  "data": [
    {
      "id": 1,
      "name": "Covent Garden",
      "address": "12 James Street, London, Greater London, WC2E 8BH, United Kingdom",
      "latitude": 51.5124,
      "longitude": -0.1225,
      "distance": 0.61,
      "phone": "020 7946 0958",
      "detail_url": "https://example.com/store-locations/covent-garden",
      "hours": {
        "is_open_now": true,
        "today": "09:00-20:00"
      }
    }
  ],
  "meta": {
    "total": 6,
    "page": 1,
    "per_page": 20,
    "last_page": 1,
    "unit": "km",
    "center": { "lat": 51.5074, "lng": -0.1278 }
  }
}
```

`distance` and `distance_label` are `null` unless the request supplies an origin.

## What is deliberately absent

The settings endpoint returns only what is safe to publish. Your geocoding key and Mapbox token are never included, in any response, under any parameter.

## Public search endpoints

The locator's own front end uses two lighter endpoints, which work whether or not the REST API is enabled:

- `GET /store-locator/search`
- `GET /store-locator/suggest`

They accept the same query parameters. They exist for the shortcode, but nothing stops you calling them.
