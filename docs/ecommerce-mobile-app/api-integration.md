# API Integration

The app talks to the Botble e-commerce REST API. Full reference: [https://ecommerce-api.botble.com/docs](https://ecommerce-api.botble.com/docs).

![API Integration](./images/api-integration.png)

## Configure

```bash
API_BASE_URL=https://your-domain.com
API_KEY=<from Admin → Settings → API Settings>
```

The app appends `/api/v1` to `API_BASE_URL` for API calls. `API_KEY` is sent as the `X-API-KEY` header on every request. See [API Configuration](05_api_base_url.md).

## API client

`src/services/apiClient.ts` is the centralized client. Highlights:

- Auto-injects `X-LANGUAGE`, `X-CURRENCY`, `X-API-KEY`, and `Authorization`
- Memory cache for language, currency, and auth token (synced with `AsyncStorage` on startup)
- 30s timeout via `AbortController`
- Extracts validation errors (`{errors: {field: ["msg"]}}` → `msg`)
- Maps `503` → maintenance mode UI; `500/502/504` → server-error state

```typescript
import { api } from '@/services/apiClient';

const products = await api.get('/ecommerce/products');
const result = await api.post('/ecommerce/cart/add', { product_id: 123, quantity: 1 });
const data = await api.get('/ecommerce/profile', customToken);
```

## Authentication

```
POST /api/v1/ecommerce/login
POST /api/v1/ecommerce/register
```

Login response:

```json
{
  "error": false,
  "data": {
    "token": "eyJhbGci...",
    "user": { "id": 1, "name": "John Doe", "email": "user@example.com" }
  }
}
```

Tokens are stored with Expo Secure Store:

```typescript
import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('auth_token', token);
const token = await SecureStore.getItemAsync('auth_token');
await SecureStore.deleteItemAsync('auth_token');
```

## Endpoints

| Group | Endpoint |
|---|---|
| Products | `GET /ecommerce/products`, `/products/{slug}`, `/categories`, `/brands`, `/products?keyword=...` |
| Cart | `GET /ecommerce/cart`, `POST /cart/add`, `PUT /cart/update`, `DELETE /cart/remove/{rowId}` |
| Coupons | `POST /ecommerce/coupon/apply`, `POST /ecommerce/coupon/remove` (`cart_id` always required) |
| Wishlist | `GET /ecommerce/wishlist`, `POST /wishlist`, `DELETE /wishlist/{product_id}` |
| Orders | `GET /ecommerce/orders`, `/orders/{id}`, `POST /orders/{id}/cancel` |
| Addresses | `GET/POST /addresses`, `PUT/DELETE /addresses/{id}`, `GET /countries` |

Product list query params: `page`, `per_page`, `categories[]`, `brands[]`, `min_price`, `max_price`, `sort_by` (`name`/`price`/`created_at`), `order_by` (`asc`/`desc`).

## Checkout

WebView-based:

```
GET /checkout/cart/{cartId}?token={authToken}
```

This loads the website's checkout in a WebView so all backend payment gateways and shipping plugins work without app changes.

## Errors

Standard response:

```json
{
  "error": true,
  "message": "Error description",
  "errors": { "field_name": ["Validation error message"] }
}
```

| Status | Meaning | App behavior |
|---|---|---|
| 400 | Bad Request | Show message |
| 401 | Invalid / expired token | Redirect to login |
| 403 | Forbidden | Show message |
| 404 | Not Found | Show message |
| 422 | Validation error | Show first field message |
| 500 / 502 / 504 | Server error | server-error UI |
| 503 | Maintenance | maintenance UI |

Message resolution order: `errors[firstField][0]` → `message` → `"API request failed: {status} {statusText}"`.

```typescript
import { ApiError } from '@/services/apiClient';

try {
  const data = await api.get('/ecommerce/products');
} catch (error) {
  if (error instanceof ApiError) {
    if (error.status === 401) logout();
    else showToast(error.message);
  }
}
```

## React Query

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/services/api';

const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
  staleTime: 5 * 60 * 1000,
});
```

Mutations invalidate related queries:

```typescript
const mutation = useMutation({
  mutationFn: addToCart,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  onError: (error) => showToast(error.message),
});
```

## Test the connection

```bash
curl https://your-domain.com/api/v1/ecommerce/products

curl -X POST https://your-domain.com/api/v1/ecommerce/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

| Result | Cause |
|---|---|
| 401 on every request | `API_KEY` missing or wrong |
| 404 on every request | API plugin disabled on the backend |
| Connection error | `API_BASE_URL` typo or site down |

See [Troubleshooting](troubleshooting.md) for more.
