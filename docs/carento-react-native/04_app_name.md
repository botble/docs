# Changing App Name

## Quick Configuration

The app display name is set in your `.env` file:

```bash
APP_NAME=Carento
```

In `app.config.js` this single value drives both:

- the Expo project `name`:
  ```js
  name: process.env.APP_NAME || "Carento",
  ```
- the iOS home-screen name via `CFBundleDisplayName`:
  ```js
  ios: {
    infoPlist: {
      CFBundleDisplayName: process.env.APP_NAME || "Carento",
    },
  },
  ```

It is also exposed to the JS side as `appConfig.name` (via `extra.appConfig.name`) for in-app display.

## Applying Changes

Unlike JS-only config, the native home-screen name lives in the generated iOS/Android projects, so a plain restart is not enough:

1. Edit `APP_NAME` in `.env`.
2. Regenerate the native projects:
   ```bash
   npx expo prebuild
   ```
3. Rebuild and run the app:
   ```bash
   npm run ios     # or: npm run android
   ```

## Important Notes

- **In-app display** (`appConfig.name`) updates as soon as Expo re-reads `.env` — restart the dev server (`npm start`).
- **Native home-screen / store name** only updates after `npx expo prebuild` and a rebuild, because it is written into the native iOS `Info.plist` (`CFBundleDisplayName`) and the Android project.
- Keep `APP_NAME` consistent so the in-app name and the installed app name match.
