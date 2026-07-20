# Version Management

Flex Home uses Expo's versioning, not `pubspec.yaml`. There are two numbers to
keep in mind:

- **`version`**: The public, human-readable version shown in the stores (Major.Minor.Patch, e.g. `1.2.0`).
- **Build number**: An internal counter that must increase for every store upload: iOS `buildNumber`, Android `versionCode`.

## The public version: `APP_VERSION`

In `app.config.js`, the Expo `version` is driven by the `APP_VERSION`
environment variable:

```js
version: process.env.APP_VERSION || "1.0.0",
```

So to change the public version, set it in your `.env`:

```bash
# .env
APP_VERSION=1.2.0
```

That value flows to the stores and is also exposed inside the app as
`appConfig.version` (via `extra.appConfig.version`), which is read in
`src/config/app.ts`.

Because `.env` is read at bundle time, **restart Metro after changing
`APP_VERSION`** (see [Running the App](08_running_app.md)). For a production
store build, set `APP_VERSION` before running `eas build`.

## Build numbers

You have two options.

### Option A: Let EAS auto-increment (recommended)

`eas.json` sets `autoIncrement` on the `production` profile and
`cli.appVersionSource: "remote"`:

```json
{
  "cli": { "version": ">= 13.0.0", "appVersionSource": "remote" },
  "build": {
    "production": {
      "autoIncrement": true,
      "env": { "APP_ENV": "production" }
    }
  }
}
```

With this, EAS stores the current build number on its servers and bumps it by 1 for every `eas build --profile production`. You do not manage `buildNumber` / `versionCode` by hand. Just bump `APP_VERSION` when the public version changes.

### Option B: Set build numbers explicitly in `app.config.js`

If you prefer to control them yourself, add them to the `ios` and `android`
blocks in `app.config.js` (and set `appVersionSource` to `local`):

```js
ios: {
  bundleIdentifier: "com.realestate.mobile",
  buildNumber: "5",           // iOS build number (string)
  // ...
},
android: {
  package: "com.realestate.mobile",
  versionCode: 5,             // Android version code (integer)
  // ...
},
```

Remember: the build number **must increase by at least 1 for every store
upload**, even when `APP_VERSION` is unchanged. iOS `buildNumber` is a string;
Android `versionCode` is an integer.

## Release checklist

1. Bump `APP_VERSION` in `.env` (or your CI environment) for the new public
   version.
2. Restart Metro / ensure the new value is in the production build environment.
3. Build: `eas build -p ios --profile production` and
   `eas build -p android --profile production`. Build numbers auto-increment.
4. Submit: `eas submit -p ios` / `eas submit -p android`.

## Tag the release

```bash
git tag -a v1.2.0 -m "Version 1.2.0"
git push origin v1.2.0
```
