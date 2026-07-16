# Loading Screen (Launch Screen)

The loading screen (also called the native launch screen) is what iOS and
Android draw the instant FlexHome is tapped, before the React Native/JS engine is
running. In an Expo app you do not hand-edit iOS storyboards or Android
`res/drawable` files; the launch screen is generated from the `splash` block in
`app.config.js` and materialized into the native projects by `expo prebuild`.

## Native launch screen vs. JS splash hold

These are two different things and it is worth keeping them straight:

| | Native launch screen (this page) | JS splash hold ([17](17_splash_screen.md)) |
|---|---|---|
| Drawn by | iOS / Android, before JS loads | `expo-splash-screen` in `app/_layout.tsx` |
| Defined in | `app.config.js` `splash` block | `preventAutoHideAsync` / `hideAsync` calls |
| Controls | the image + background at cold start | **how long** that splash stays up |
| Changing it needs | `npx expo prebuild` | JS reload (timing logic only) |

The native launch screen appears first; the JS splash hold then keeps that same
image on screen until fonts and cached settings are ready, before handing off to
the first app screen. Because both reuse the same `splash` config, the user sees
one continuous, flicker-free splash.

## Current implementation

From `app.config.js`:

```js
splash: {
  image: "./assets/splash-icon.png",
  resizeMode: "contain",
  // Native launch + JS splash background. Defaults to the brand primary.
  backgroundColor: process.env.SPLASH_BACKGROUND_COLOR || "#84cc16",
},
```

- **`image`**: `assets/splash-icon.png`, shown centered.
- **`resizeMode: "contain"`**: The entire image is fitted inside the screen without cropping (as opposed to `cover`, which fills and may crop).
- **`backgroundColor`**: The `SPLASH_BACKGROUND_COLOR` environment variable, defaulting to the brand primary `#84cc16`.

Expo applies this single `splash` block to **both** iOS and Android during prebuild, so the two platforms stay consistent automatically. There's no separate `colors.xml` or `LaunchScreen.storyboard` to maintain.

## Changing the background color

Set the variable in your `.env` (hex **with** the `#`):

```bash
# .env
SPLASH_BACKGROUND_COLOR=#0f172a
```

Then regenerate the native projects (see below). This color also drives the JS
splash hold, so the whole startup stays one color.

## Replacing the launch image

1. **Prepare your image**: Use a PNG, ideally with a transparent background. With `resizeMode: "contain"`, keep the logo comfortably within the canvas so it is not clipped on tall or short screens.

2. **Replace the file**, keeping the same name:

   ```
   assets/splash-icon.png
   ```

   (Or repoint `splash.image` in `app.config.js`.)

3. Regenerate the native launch screen. The image and color are compiled
   into the native projects, so you must prebuild:

   ```bash
   npx expo prebuild
   ```

   If the old asset lingers, do a clean regeneration:

   ```bash
   npx expo prebuild --clean
   ```

4. **Rebuild and run** (`npm run ios` / `npm run android`, or
   `npm run ios:sim`).

## Android edge-to-edge note

FlexHome enables Android edge-to-edge (`android.edgeToEdgeEnabled: true` in
`app.config.js`), so content draws behind the system status and navigation bars.
Keep the launch image centered and avoid placing critical elements near the very
top or bottom edges, where the system bars overlay. The `splash.backgroundColor`
fills the full screen including those inset areas, so a solid brand color reads
cleanly edge to edge.

## Notes

- `SPLASH_BACKGROUND_COLOR` is read at bundle time. Changing it means a rebuild (and a prebuild), not just a Metro restart.
- Any change to the launch image or its background requires `npx expo prebuild` followed by a native rebuild. A JS-only reload will not update the native launch screen.
- Optimize the PNG for size. A smaller launch image loads and renders faster at cold start.
