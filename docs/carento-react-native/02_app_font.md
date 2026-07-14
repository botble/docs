# Changing App Font

## Overview

Carento's fonts are **`.env`-driven**. Two roles are configured independently:

- **`APP_FONT_BODY`**: body text (default `Inter`)
- **`APP_FONT_HEADING`**: display / headings (default `InstrumentSans`)

```bash
# .env
APP_FONT_BODY=Inter
APP_FONT_HEADING=InstrumentSans
```

Each value must name a font **registered** in `src/lib/fonts.ts`. Two families ship
bundled: `Inter` and `InstrumentSans`. Because Expo bundles fonts at build time (it
can't fetch an arbitrary font by name at runtime), adding a new typeface means adding
its package to the registry once. After that it is only an `.env` value.

## How it fits together

- `src/lib/fonts.ts`: The **registry**. A `FAMILIES` map holds each family's weighted font modules and its weight→family-name table. `APP_FONT_BODY` / `APP_FONT_HEADING` (via `appConfig.fonts`) select which registered family is used for each role. Exposes `fontAssets` (every bundled asset, passed to `useFonts`) plus `bodyFamilyFor(weight)` / `headingFamilyFor(weight)` which resolve a weight to the loaded family name. When a family lacks a weight, it falls back to the nearest weight (e.g. Instrument Sans has no 800).
- `src/lib/theme.ts`: Builds the `fonts` map (`regular`/`medium`/…/`display`/…) and `fontFamilyFor` from those resolvers, so every component follows the selected fonts.
- `app/_layout.tsx`: `useFonts(fontAssets)` loads all bundled fonts at startup.
- `src/lib/setup-typography.ts`: Applies the body font to `<Text>`/`<TextInput>` app-wide. Headings that set an explicit display family are left untouched.

## Switching between bundled fonts

To swap body and heading (both `Inter` and `InstrumentSans` are already bundled), just
edit `.env` and restart the dev server:

```bash
APP_FONT_BODY=InstrumentSans
APP_FONT_HEADING=Inter
```

No native rebuild is needed. Both families are bundled, so a JS reload is enough.

## Adding a new font (e.g. Poppins)

1. **Install the package:**
   ```bash
   npx expo install @expo-google-fonts/poppins
   ```

2. Register it in `src/lib/fonts.ts`: import the weighted modules and add a
   `FAMILIES` entry (the key is what you'll put in `.env`):
   ```ts
   import {
     Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold,
     Poppins_700Bold, Poppins_800ExtraBold,
   } from "@expo-google-fonts/poppins";

   const FAMILIES = {
     // ...Inter, InstrumentSans
     Poppins: {
       assets: {
         Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold,
         Poppins_700Bold, Poppins_800ExtraBold,
       },
       weights: {
         "400": "Poppins_400Regular",
         "500": "Poppins_500Medium",
         "600": "Poppins_600SemiBold",
         "700": "Poppins_700Bold",
         "800": "Poppins_800ExtraBold",
       },
     },
   };
   ```

3. **Point `.env` at it:**
   ```bash
   APP_FONT_HEADING=Poppins
   ```

4. **Rebuild** (`npx expo prebuild` then `npm run ios` / `android`) so the new font
   package is bundled into the native app. Switching among already-bundled families
   only needs a restart; adding a new package needs a rebuild.

Browse typefaces at [Google Fonts](https://fonts.google.com/); each has a matching
`@expo-google-fonts/<family>` package.
