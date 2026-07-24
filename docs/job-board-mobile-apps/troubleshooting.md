# Troubleshooting

Common issues when setting up and running the Botble JobBoard (Expo) app, and how to fix them.

> After changing `.env`, fully stop and restart the dev server. `.env` values are baked in by `app.config.js` at start/build time and are **not** picked up by Fast Refresh.

## Blank screens or no data

The most common cause of empty screens is a bad backend URL.

1. Open `.env` and confirm `API_BASE_URL` points at your running Botble JobBoard (Botble) backend, e.g. `http://jobbox.test`. No trailing slash and no `/api/v1` suffix (it is appended automatically).
2. Open `http://jobbox.test/api/v1/jobs` in a browser. You should get JSON with a `data` array of jobs.
3. Restart with `npx expo start -c`.

## `401` / API key missing

If your backend has an API key configured (**Admin → Settings → API**), the app must send it.

1. Copy the key from Botble admin.
2. Set it in `.env`:

   ```bash
   API_KEY=your-key-here
   ```

3. Restart the dev server.

Leave `API_KEY` blank if no key is configured on the backend. Do **not** put your Envato purchase code here; that goes in `LICENSE_CODE` only.

## iOS build fails with code-signing error

If you have no Apple Developer certificate on the machine, `npm run ios` (a full native build) will fail to sign. Run on the simulator instead, which needs no signing:

```bash
npm run ios:sim
```

This runs `scripts/run-ios-sim.sh`, which launches the app in the iOS Simulator without a signing certificate. For device builds and store distribution, use EAS Build. See [Deploying the App](09_deploying_app.md).

## Stale bundle or old code after changes

Clear the Metro cache with the `-c` flag:

```bash
npx expo start -c
```

The `-c` flag resets the Metro bundler cache. Use it whenever the app shows old code, `.env` changes don't appear, or you hit odd bundling errors after an upgrade.

## `npm install` peer-dependency conflict

Install with the legacy resolver:

```bash
npm install --legacy-peer-deps
```

The Expo SDK 54 dependency tree has peer ranges that npm's default strict resolver rejects. Always use `--legacy-peer-deps` for this project.

## License dialog appears in development

A license prompt in development is expected. The dev-only license check (`src/services/license-service.ts`) validates your Envato purchase code against `license.botble.com`.

1. Set your purchase code in `.env`:

   ```bash
   LICENSE_CODE=your-envato-purchase-code
   ```

2. Restart the dev server.

The check only runs when `APP_ENV=development`; production builds ship with `LICENSE_CODE` empty and do not perform the check.

## Plain-HTTP requests blocked

Plain `http://` traffic is only allowed for local development. `app.config.js` scopes iOS `NSAllowsArbitraryLoads` to `APP_ENV === "development"` (and Android edge-to-edge builds follow the same intent). If your backend is served over HTTP and requests are blocked:

- Use an `https://` `API_BASE_URL` for staging/preview/production, **or**
- Set `APP_ENV=development` in `.env` for local work against an HTTP backend.

## Backend is reachable but screens are empty

If the app connects but a section is empty, the data (or its relations) is missing on the backend, not in the app:

1. Confirm the backend has published/available jobs, employers (vendor customers), locations, and blog posts.
2. Confirm the job-board API is installed and enabled.
3. Confirm required relations are set (a job needs a type/category, images, and a location to render fully).
4. Pull to refresh on the affected screen.

## Social login not working

Open the matching setup guide and follow every step. Email login must work first.

- [Google Login](14_google_login_setup.md)
- [Facebook Login](15_facebook_login_setup.md)
- [Apple Sign-In](13_apple_login_setup.md)
- [Social Login Configuration](16_social_login_configuration.md)

A provider only appears when its keys are set in `.env` (`GOOGLE_WEB_CLIENT_ID`, `FACEBOOK_APP_ID`, etc.). Otherwise `app.config.js` disables it. After changing `.env`, fully stop and restart the app.

## Theme colors / app name / logo not updating

- **Colors:** `.env` (`PRIMARY_COLOR`, etc.) is read at start time. Stop and restart the dev server. See [Theme Colors](01_theme_colors.md).
- **App name:** set `APP_NAME` in `.env`; a native rebuild (or `npx expo prebuild --clean`) is needed for it to appear under the icon. See [App Name](04_app_name.md).
- **Logo / splash:** replace the files in `assets/`, then restart (rebuild for native icon/splash). See [App Logo](05_app_logo.md) and [Splash Screen](17_splash_screen.md).

## When asking for support

Include:

- What you did and the exact error message (screenshot of the Metro/console or network logs for API errors)
- Your website URL and `API_BASE_URL`
- Device / simulator and OS version
- `npx expo --version` output
- Steps already tried

Do not send passwords, API keys, or your full Envato purchase code. See [Support](support.md).
