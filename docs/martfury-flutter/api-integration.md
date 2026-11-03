# API Integration

The app talks to the Botble e-commerce REST API. The full reference is at [https://ecommerce-api.botble.com/docs](https://ecommerce-api.botble.com/docs).

Before anything else, turn the API on in your website admin panel - see [Enable the API on your website](backend-api-setup.md). It is off by default.

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

- `503` — the API is disabled. Turn it on at **Admin → Settings → API Settings**.
- `404` — the API package is not installed; update the CMS to the latest version.
- `401` — `API_KEY` is missing or wrong.
- Empty / no data — no products are published on the website.

## Endpoints used by the app

The app calls many endpoints; the most important groups are:

| Group | Examples |
|---|---|
| Auth | `POST /api/v1/login`, `POST /api/v1/register`, `POST /api/v1/password/forgot` |
| Social login | `POST /api/v1/auth/google`, `/auth/facebook`, `/auth/apple`, `/auth/twitter` |
| Products | `GET /api/v1/ecommerce/products`, `/products/{slug}`, `/product-categories`, `/brands`, `/flash-sales` |
| Cart | `POST /api/v1/ecommerce/cart`, `GET` / `PUT` / `DELETE /api/v1/ecommerce/cart/{id}`, `POST /cart/sync`, `POST /cart/refresh` |
| Orders | `GET /api/v1/ecommerce/orders`, `/orders/{id}`, `/order-returns`, `/orders/tracking` |
| Wishlist | `POST /api/v1/ecommerce/wishlist`, `GET` / `POST` / `DELETE /api/v1/ecommerce/wishlist/{id}` |
| Profile | `GET /api/v1/me`, `PUT /api/v1/me`, `PUT /api/v1/update/password` |
| Push | `POST /api/v1/device-tokens`, `DELETE /api/v1/device-tokens/by-token`, `GET /api/v1/notifications` |

For the full list, see the API reference linked above.

## Checkout

Checkout runs in a WebView. The app loads `{API_BASE_URL}/api/v1/ecommerce/checkout/cart/{id}` in the WebView (sending the `X-API-KEY`, `X-LANGUAGE`, `X-CURRENCY` and, when signed in, `Authorization` headers), so all backend payment gateways and shipping plugins keep working without app changes.

## Common errors

| Symptom | Cause | Fix |
|---|---|---|
| `503 API is currently disabled` | API turned off on the website | Enable it at **Admin → Settings → API Settings** |
| `401 Invalid or missing API key` | Wrong / empty `API_KEY` | Get the key from **Admin → Settings → API Settings** |
| `404` on every endpoint | CMS too old to include the API package | Update the CMS to the latest version |
| Connection error | Wrong `API_BASE_URL` or site down | Verify the URL in a browser |
| `419` / CSRF errors | `APP_URL` mismatch on backend | Set `APP_URL` to the live domain in the backend `.env` |

See [Troubleshooting](troubleshooting.md) for more.
