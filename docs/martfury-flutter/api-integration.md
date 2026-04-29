# API Integration

The app talks to the Botble e-commerce REST API. The full reference is at [https://ecommerce-api.botble.com/docs](https://ecommerce-api.botble.com/docs).

## Configure

In `.env`:

```bash
API_BASE_URL=https://your-domain.com
API_KEY=<from Admin → Settings → API Settings>
```

`API_KEY` is sent as the `X-API-KEY` header on every request. See [API Configuration](06_api_base_url.md) for details.

## Test the connection

Open this URL in a browser (replace the host):

```
https://your-domain.com/api/v1/ecommerce/products
```

You should get a JSON response with products. If you do not:

- `404` — the API plugin is not installed or not enabled.
- `401` — `API_KEY` is missing or wrong.
- Empty / no data — no products are published on the website.

## Endpoints used by the app

The app calls many endpoints; the most important groups are:

| Group | Examples |
|---|---|
| Auth | `POST /api/v1/auth/login`, `POST /api/v1/auth/register`, `POST /api/v1/auth/forgot-password` |
| Social login | `POST /api/v1/auth/social/google`, `/facebook`, `/apple`, `/twitter` |
| Products | `GET /api/v1/ecommerce/products`, `/products/{slug}`, `/categories`, `/brands`, `/flash-sales` |
| Cart | `GET /api/v1/ecommerce/cart`, `POST /api/v1/ecommerce/cart`, `PATCH`, `DELETE` |
| Orders | `GET /api/v1/ecommerce/orders`, `POST /api/v1/ecommerce/checkout/cart/{id}` |
| Wishlist | `GET /api/v1/ecommerce/wishlist`, `POST /api/v1/ecommerce/wishlist` |
| Profile | `GET /api/v1/me`, `PATCH /api/v1/me` |

For the full list, see the API reference linked above.

## Checkout

Checkout runs in a WebView. The app calls `POST /api/v1/ecommerce/checkout/cart/{id}` and opens the redirect URL in a WebView so all backend payment gateways and shipping plugins keep working without app changes.

## Common errors

| Symptom | Cause | Fix |
|---|---|---|
| `401 Invalid or missing API key` | Wrong / empty `API_KEY` | Get the key from **Admin → Settings → API Settings** |
| `404` on every endpoint | API plugin disabled | Enable the API plugin on the backend |
| Connection error | Wrong `API_BASE_URL` or site down | Verify the URL in a browser |
| `419` / CSRF errors | `APP_URL` mismatch on backend | Set `APP_URL` to the live domain in the backend `.env` |

See [Troubleshooting](troubleshooting.md) for more.
