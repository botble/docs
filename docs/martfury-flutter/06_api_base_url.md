# API Configuration

Configure two values in your `.env` file at the project root: `API_BASE_URL` and `API_KEY`.

## API_BASE_URL

The website URL the app connects to.

```bash
API_BASE_URL=https://your-domain.com
```

Rules:

- Use `https://` in production.
- No trailing slash.
- Default: `https://ecommerce-api.botble.com`.

`http://` is allowed only in development mode for `localhost`, `127.0.0.1`, `192.168.x.x`, `10.x.x.x`. Any other host must use `https://`.

## API_KEY

The app sends `API_KEY` as the `X-API-KEY` header on every request. It must match the key saved in your backend.

### Get the key

1. Open `https://your-domain.com/admin`
2. Go to **Settings → API Settings**
3. Click **Generate** if no key is shown, or copy the existing key

### Set the key

```bash
API_KEY=<paste-the-key-here>
```

Rebuild the app.

### Do not confuse with LICENSE_CODE

| Variable | Where it comes from | What it does |
|---|---|---|
| `API_KEY` | **Admin → Settings → API Settings** | Authenticates API calls. Wrong value → `401 Unauthorized`. |
| `LICENSE_CODE` | Envato purchase code | Development license check only. Never sent as the API key. |

Putting your Envato purchase code in `API_KEY` will return `401 — Invalid or missing API key`.
