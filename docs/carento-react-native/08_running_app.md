# Running the App

Carento is an Expo (SDK 54) React Native app. During development you run a Metro
bundler and load the app onto a simulator, emulator, or a physical device.

Before you start, install dependencies once:

```bash
npm install --legacy-peer-deps
```

Copy the environment template and fill in at least `API_BASE_URL` (your Botble
car-rental backend):

```bash
cp .env.example .env
```

## Start Metro (Expo dev server)

```bash
npm start
```

This runs `expo start` and opens the Metro bundler. From the terminal you can
press `i` to launch iOS, `a` for Android, or `w` for web. Metro watches your
JavaScript/TypeScript and hot-reloads changes as you save.

If you use the Expo Go sandbox app instead of a development build:

```bash
npm run start:go
```

## Run on iOS

```bash
npm run ios
```

`expo run:ios` compiles the native iOS project and installs it on a connected device or simulator. Running on a physical device requires a valid Apple signing certificate. If you don't have one, use the simulator-only script below.

### Simulator only (no Apple signing certificate)

```bash
npm run ios:sim                 # default: iPhone 16 Plus
npm run ios:sim "iPhone 17 Pro" # pick another simulator by name
```

This runs `scripts/run-ios-sim.sh`, which builds with `CODE_SIGNING_ALLOWED=NO` and installs straight onto the iOS Simulator. Because simulator builds are never signed, this avoids the "No code signing certificates are available" error from `expo run:ios`. It's the best choice when you have no Apple developer certificate. The script boots the named simulator, starts Metro if it is not already running on port 8081, builds the `Carento.xcworkspace` with `xcodebuild`, then installs and launches `com.carento.mobile`.

## Run on Android

```bash
npm run android
```

`expo run:android` builds the native Android project and installs it on a
connected device or running emulator.

## Run in the browser

```bash
npm run web
```

Runs `expo start --web` for a quick look at screens in a desktop browser. Note
that native-only modules (Apple Sign-In, secure storage, notifications) behave
differently or are unavailable on web.

## Clearing the Metro cache

If you see stale bundles, missing env changes, or odd module-resolution errors,
restart Metro with a clean cache:

```bash
npx expo start -c
```

`.env` values are read through `app.config.js` at bundle time. After editing `.env`, you must restart the dev server (a clean start with `-c` is safest). Hot reload alone does not pick up new environment values.

## When native configuration changes

Anything that alters the native project (adding or removing an Expo config plugin, changing the app icon, the splash image, `SPLASH_BACKGROUND_COLOR`, bundle identifier, or other `app.config.js` native fields) requires regenerating the native `ios/` and `android/` folders before it takes effect:

```bash
npx expo prebuild
```

Add `--clean` to regenerate the native projects from scratch:

```bash
npx expo prebuild --clean
```

After prebuild, run `npm run ios` / `npm run android` (or `npm run ios:sim`)
again so the native change is compiled into the app.

## Common issues

1. **`.env` changes not applied**: Restart Metro, ideally with `npx expo start -c`. Hot reload does not re-read environment values.

2. **Stale bundle or module not found**: Clear the cache:
   ```bash
   npx expo start -c
   ```

3. **"No code signing certificates are available" on iOS**: Use the simulator-only path:
   ```bash
   npm run ios:sim
   ```

4. **Native change not showing up**: Run `npx expo prebuild` (add `--clean` if needed), then rebuild.

5. **Reinstall dependencies from scratch**:
   ```bash
   rm -rf node_modules && npm install --legacy-peer-deps
   ```
