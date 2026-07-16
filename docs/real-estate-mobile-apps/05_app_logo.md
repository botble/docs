# Changing App Logo & Icons

## Overview

FlexHome's app icon, adaptive icon, splash image, and web favicon are all configured in `app.config.js` and point at files in the `assets/` folder. To rebrand, replace the asset files (keeping the same filenames) and regenerate the native projects.

## Configured assets

From `app.config.js`:

| Purpose | Config key | Asset file |
|---|---|---|
| App icon (iOS + base) | `icon` | `./assets/icon.png` |
| Android adaptive icon (foreground) | `android.adaptiveIcon.foregroundImage` | `./assets/adaptive-icon.png` |
| Splash / launch image | `splash.image` | `./assets/splash-icon.png` |
| Web favicon | `web.favicon` | `./assets/favicon.png` |

```js
icon: "./assets/icon.png",
splash: {
  image: "./assets/splash-icon.png",
  resizeMode: "contain",
  backgroundColor: process.env.SPLASH_BACKGROUND_COLOR || "#84cc16",
},
android: {
  adaptiveIcon: {
    foregroundImage: "./assets/adaptive-icon.png",
    backgroundColor: "#84cc16",
  },
},
web: { favicon: "./assets/favicon.png" },
```

## Recommended sizes

| Asset | Recommended size | Notes |
|---|---|---|
| `icon.png` | 1024×1024 | Square PNG, no transparency for iOS. |
| `adaptive-icon.png` | 1024×1024 | Foreground layer; keep the logo centered within the safe zone (~66%), because Android masks it into a circle or squircle. Background comes from `adaptiveIcon.backgroundColor`. |
| `splash-icon.png` | 1024×1024 (or ~1284 wide) | Displayed `contain`ed over `splash.backgroundColor`. Keep it centered. |
| `favicon.png` | 48×48 (or 64×64) | Web browser tab icon. |

## Applying Changes

1. Replace the files in `assets/` (`icon.png`, `adaptive-icon.png`, `splash-icon.png`, `favicon.png`), keeping the **same filenames** so `app.config.js` still resolves them.
2. Regenerate the native projects so the new icons/splash are baked in:
   ```bash
   npx expo prebuild
   ```
3. Rebuild and run:
   ```bash
   npm run ios     # or: npm run android
   ```

The adaptive icon and splash backgrounds default to the FlexHome primary (`#84cc16`). Override the splash background with `SPLASH_BACKGROUND_COLOR` in `.env` (hex **with** `#`); the adaptive icon background is set directly in `app.config.js`.
