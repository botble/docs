# API Configuration

Configure two values in `.env`: `API_BASE_URL` and `API_KEY`.

## API_BASE_URL

The website URL the app connects to. The app appends `/api/v1` for API calls and uses the bare value for the WebView checkout.

```bash
API_BASE_URL=https://your-domain.com
```

Rules:

- Use `https://` in production. SSL certificate must be valid.
- No trailing slash.
- `http://` is allowed only for local development:

| Target | Value |
|---|---|
| iOS Simulator | `http://localhost:8000` |
| Android Emulator | `http://10.0.2.2:8000` |
| Physical device | `http://<computer-LAN-IP>:8000` |

## API_KEY

The app sends `API_KEY` as the `X-API-KEY` header on every API request. It must match the key saved in your backend.

### Get the key

1. Open `https://your-domain.com/admin`
2. Go to **Settings → API Settings**
3. Click **Generate** if no key is shown, or copy the existing key

### Set the key

```bash
API_KEY=<paste-the-key-here>
```

Restart Metro: `npm start -- --clear`.

### Do not confuse with LICENSE_CODE

| Variable | Where it comes from | What it does |
|---|---|---|
| `API_KEY` | **Admin → Settings → API Settings** | Authenticates API calls. Wrong value → `401 Unauthorized`. |
| `LICENSE_CODE` | Envato purchase code | Development license check only. Never sent as the API key. |

Putting your Envato purchase code in `API_KEY` will return `401 — Invalid or missing API key`.

## Test the connection

```bash
curl https://your-domain.com/api/v1/ecommerce/products
```

You should get a JSON response with products. If you do not:

- `404` — the API plugin is not installed.
- `401` — `API_KEY` is missing or wrong (run with `-H "X-API-KEY: <key>"` to verify).
- Empty data — no products are published.

## Multi-environment setups

Use separate files (`.env.development`, `.env.staging`, `.env.production`) and load them at start:

```bash
API_BASE_URL=http://localhost:8000 npm start
```

## Production builds (EAS)

::: warning
`.env` is for local development only. Production EAS builds require **EAS Secrets**:

```bash
eas secret:create --name API_BASE_URL --value "https://your-domain.com"
eas secret:create --name API_KEY --value "<your-api-key>"
```

See [Deploying the App → Environment Variables](08_deploying_app.md#environment-variables-critical).
:::

## Apply changes

`.env` changes require a Metro restart:

```bash
npm start -- --clear
```

Hot reload does not pick up `.env`.
