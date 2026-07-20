# Installation

## Requirements

- **Node.js LTS** (18 or newer) and npm
- **Xcode** + an iOS Simulator (Mac only, for iOS)
- **Android Studio** + an emulator or a connected device (for Android)
- **Watchman** (optional, macOS): improves file-watching. Install with `brew install watchman`

You do not need the Expo Go app for a full build. This project uses native modules (Google Sign-In, Facebook SDK, secure store), so run it as a dev or native build.

## Steps

### 1. Get the source

Download the Flex Home source from CodeCanyon and extract it, then open a terminal in the project folder:

```bash
cd path/to/flexhome-mobile-apps
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

::: warning Use `--legacy-peer-deps`
The `--legacy-peer-deps` flag is required, because some native modules declare strict peer ranges that npm 7+ would otherwise reject.
:::

### 3. Configure `.env`

```bash
cp .env.example .env
```

Open `.env` and set at least:

```bash
API_BASE_URL=http://homzen.test        # your Botble backend, no trailing /api/v1
API_KEY=                                # only if configured in Botble admin
APP_NAME=Real Estate
LICENSE_CODE=                           # your Envato purchase code (dev only)
```

`.env` is read at build/start time through `app.config.js` (`extra.appConfig`). See [Configuration](configuration.md) and [API URL & key](06_api_base_url.md) for the full reference.

### 4. Prebuild native projects (when needed)

The `ios/` and `android/` native folders are generated from `app.config.js`. Regenerate them whenever you change native config (app name, bundle id, plugins, icons, splash):

```bash
npx expo prebuild
```

### 5. First run

The easiest first run is the iOS Simulator, which needs **no** Apple signing certificate:

```bash
npm run ios:sim          # iOS Simulator (no signing cert needed)
```

Other targets:

```bash
npm run android          # Android emulator or connected device
npm start                # Metro dev server (open on device/simulator)
```

## Common errors

- **`npm install` peer-dependency errors**: You omitted `--legacy-peer-deps`. Re-run with the flag.
- **"No code signing certificates are available"**: You ran `npm run ios` (device build) without a certificate. Use `npm run ios:sim` for the Simulator instead.
- **No simulator found**: Start one from Xcode → Open Developer Tool → Simulator, or run `xcrun simctl list devices available`.
- **`.env` change has no effect**: Metro caches the config. Stop the dev server and rebuild (see [Configuration](configuration.md)).

## Next steps

- [Configuration](configuration.md)
- [Social Login Setup](16_social_login_configuration.md)
- [Running the app](08_running_app.md)
- [Complete Setup & Publishing Guide](complete-setup-and-publishing-guide.md)
- [Troubleshooting](troubleshooting.md)
