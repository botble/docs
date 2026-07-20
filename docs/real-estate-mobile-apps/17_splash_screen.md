# Splash Screen (JS Splash Hold)

Flex Home keeps the branded splash on screen a little longer than the OS would, so the first frame users see is your styled home screen. There's never a white flash of unstyled content while fonts and cached settings load.

This page covers the **JavaScript splash hold** implemented with
`expo-splash-screen` in `app/_layout.tsx`. For the underlying **native launch
screen** defined in `app.config.js`, see
[Loading Screen (Launch Screen)](18_loading_screen.md).

## How it works

`app/_layout.tsx` uses `expo-splash-screen` to hold and then release the splash:

```tsx
import * as SplashScreen from "expo-splash-screen";

// Keep the native splash up until fonts + cache are ready, so the first frame is
// the branded splash rather than a white flash of unstyled content.
SplashScreen.preventAutoHideAsync().catch(() => {});
```

`preventAutoHideAsync()` is called **at module load**, before the component tree mounts. This keeps the splash up from the very first moment.

The root layout then loads the brand fonts (`useFonts`) and initializes the
API client cache (language / currency / token) from storage:

```tsx
const [cacheReady, setCacheReady] = useState(false);
const [fontsLoaded] = useFonts(fontAssets);
const ready = cacheReady && fontsLoaded;

useEffect(() => {
  initializeCacheFromStorage().finally(() => setCacheReady(true));
}, []);
```

Only once **both fonts and cache are ready** does it hide the splash, from the root view's `onLayout` callback. This ensures the handoff goes straight to the styled first screen with no white flash:

```tsx
const onLayoutRootView = useCallback(() => {
  if (ready) SplashScreen.hideAsync().catch(() => {});
}, [ready]);

if (!ready) return null;

return (
  <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
    {/* providers + navigator */}
  </GestureHandlerRootView>
);
```

In short: `preventAutoHideAsync` at load → wait for fonts + cache →
`hideAsync` in `onLayout` when `ready`.

## The splash image and background color

The splash visuals come from the `splash` block in `app.config.js`:

```js
splash: {
  image: "./assets/splash-icon.png",
  resizeMode: "contain",
  // Native launch + JS splash background. Defaults to the brand primary.
  backgroundColor: process.env.SPLASH_BACKGROUND_COLOR || "#161E2D",
},
```

- **Image**: `assets/splash-icon.png`.
- **Background**: The `SPLASH_BACKGROUND_COLOR` environment variable, defaulting to the brand primary `#161E2D`.

### Changing the background color

Set the variable in your `.env` (hex **with** the `#`):

```bash
# .env
SPLASH_BACKGROUND_COLOR=#0f172a
```

This same value backs both the native launch screen and the JS splash hold, so
the color stays consistent across the whole startup sequence.

## Replacing the splash image

1. **Prepare your image**: Use a PNG with a transparent background if possible. Since `resizeMode` is `contain`, the whole image is shown centered without being cropped. Keep the logo comfortably inside the canvas.

2. **Replace the file**, keeping the same name:

   ```
   assets/splash-icon.png
   ```

   (Or point `splash.image` in `app.config.js` at a different path.)

3. **Regenerate the native projects**: The splash image is baked into the native launch screen, so a change requires a prebuild:

   ```bash
   npx expo prebuild
   ```

   Add `--clean` if the old image persists:

   ```bash
   npx expo prebuild --clean
   ```

4. **Rebuild and run** (`npm run ios` / `npm run android`, or
   `npm run ios:sim`).

## Notes

- `SPLASH_BACKGROUND_COLOR` is read at bundle time. Restart Metro (ideally `npx expo start -c`) after changing it.
- A change to the splash image or its background color affects the native launch screen too and always requires `npx expo prebuild`. A JS-only reload is not enough.
- The JS splash hold only controls **timing** (how long the splash stays up). It reuses the native launch screen's image and color, so the two never visibly differ during handoff.
