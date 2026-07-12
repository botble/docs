# API Configuration

Carento connects to a Botble Laravel backend running the **car-manager** plugin. Configure two values in your `.env` file at the project root: `API_BASE_URL` and `API_KEY`.

## API_BASE_URL

The **site URL** of your Botble backend — **without** the trailing `/api/v1`.

```bash
# Local Botble backend example
API_BASE_URL=http://carento.test
```

In `app.config.js` the app derives two values from this one key:

```js
api: {
  baseUrl: process.env.API_BASE_URL
    ? `${process.env.API_BASE_URL}/api/v1`   // API calls go here
    : "",
  siteUrl: process.env.API_BASE_URL || "",   // bare site URL (web links, images)
  apiKey: process.env.API_KEY || "",
},
```

- `baseUrl` — the app **appends `/api/v1`** automatically, so all API requests target `<API_BASE_URL>/api/v1`.
- `siteUrl` — the bare value is kept as-is and used to resolve relative web links (e.g. Help Center pages) and images.

Rules:

- Do **not** include `/api/v1` yourself — it is appended for you.
- No trailing slash.
- Use `https://` in staging/production.

### Local development & plain HTTP

Local Botble sites often run over plain `http://` (e.g. `http://carento.test` or `http://192.168.1.10:8000`). iOS blocks plain HTTP by default, so `app.config.js` only relaxes App Transport Security when `APP_ENV=development`:

```js
NSAppTransportSecurity: {
  NSAllowsArbitraryLoads: (process.env.APP_ENV || "development") === "development",
  NSAllowsLocalNetworking: true,
},
```

This means:
- `APP_ENV=development` → plain HTTP to your local backend is allowed.
- `APP_ENV=staging` / `production` → HTTPS is required (arbitrary loads are **off**).

Set `APP_ENV` in `.env`:

```bash
# development | staging | production
APP_ENV=development
```

## API_KEY

Only required if an API key is configured on the backend. It authenticates the app's API calls.

```bash
# Optional — leave blank if no API key is set in Botble admin
API_KEY=
```

### Get the key

1. Open your backend admin, e.g. `http://carento.test/admin`
2. Go to **Settings → API**
3. Copy the API key (or generate one if none exists)

### Set the key

```bash
API_KEY=<paste-the-key-here>
```

## Applying Changes

Environment values are baked into `extra.appConfig` when Expo starts, so after editing `.env`:

1. Stop the dev server and re-run `npm start` (a Fast Refresh will not pick up `.env` changes).
2. For a native/device build, re-run `npx expo prebuild` and rebuild — the `NSAppTransportSecurity` setting above is written into the native iOS project at prebuild time.

## Do not confuse API_KEY with LICENSE_CODE

| Variable | Where it comes from | What it does |
|---|---|---|
| `API_KEY` | **Admin → Settings → API** | Authenticates API calls to the Botble backend. |
| `LICENSE_CODE` | Envato/CodeCanyon purchase code | Development-only license check against license.botble.com (`src/services/license-service.ts`). Never sent as the API key; leave blank in production. |
