# Changing App Font

## Overview

Carento pairs two Google Fonts, loaded through Expo's `@expo-google-fonts/*` packages:

- **Inter** — body text
- **Instrument Sans** — display / headings

Fonts are centralized in **one seam** so a rebrand touches as few files as possible:

- `src/lib/fonts.ts` — imports the font modules and exposes `fontAssets` (the map passed to `useFonts`).
- `src/lib/theme.ts` — the `fonts` map (family-name strings) plus `fontFamilyFor` (numeric weight → Inter family).
- `app/_layout.tsx` — calls `useFonts(fontAssets)` to load the fonts at startup.
- `src/lib/setup-typography.ts` — applies the Inter body font app-wide.

## How it fits together

1. `src/lib/fonts.ts` imports the weighted font modules and collects them:
   ```ts
   import {
     Inter_400Regular, Inter_500Medium, Inter_600SemiBold,
     Inter_700Bold, Inter_800ExtraBold,
   } from "@expo-google-fonts/inter";
   import {
     InstrumentSans_400Regular, InstrumentSans_500Medium,
     InstrumentSans_600SemiBold, InstrumentSans_700Bold,
   } from "@expo-google-fonts/instrument-sans";

   export const fontAssets = {
     Inter_400Regular, Inter_500Medium, Inter_600SemiBold,
     Inter_700Bold, Inter_800ExtraBold,
     InstrumentSans_400Regular, InstrumentSans_500Medium,
     InstrumentSans_600SemiBold, InstrumentSans_700Bold,
   } as const;
   ```

2. `app/_layout.tsx` loads them:
   ```ts
   import { useFonts } from "@expo-google-fonts/inter";
   import { fontAssets } from "@/lib/fonts";
   // ...
   const [fontsLoaded] = useFonts(fontAssets);
   ```

3. `src/lib/theme.ts` names the families used in styles:
   ```ts
   export const fonts = {
     // Body — Inter
     regular: "Inter_400Regular",
     medium: "Inter_500Medium",
     semibold: "Inter_600SemiBold",
     bold: "Inter_700Bold",
     extrabold: "Inter_800ExtraBold",
     // Display / headings — Instrument Sans
     display: "InstrumentSans_600SemiBold",
     displayMedium: "InstrumentSans_500Medium",
     displaySemibold: "InstrumentSans_600SemiBold",
     displayBold: "InstrumentSans_700Bold",
   } as const;
   ```

4. `src/lib/setup-typography.ts` patches React Native's `<Text>` / `<TextInput>` once (from the root layout) to apply the correct weighted **Inter** family app-wide — choosing the variant from each element's `fontWeight` via `fontFamilyFor`. Any element that already sets an explicit `fontFamily` (e.g. an Instrument Sans heading) is left untouched.

## Changing the font

To swap the typeface (say, Inter → **Poppins**):

1. **Install the new Google Fonts package:**
   ```bash
   npx expo install @expo-google-fonts/poppins
   ```

2. **Update `src/lib/fonts.ts`** — change the imports and the `fontAssets` keys to the new family's weighted modules:
   ```ts
   import {
     Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold,
     Poppins_700Bold, Poppins_800ExtraBold,
   } from "@expo-google-fonts/poppins";

   export const fontAssets = {
     Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold,
     Poppins_700Bold, Poppins_800ExtraBold,
     // ...keep or replace the display family too
   } as const;
   ```

3. **Update `src/lib/theme.ts`** — set the `fonts` map to the new family-name strings, and update `fontFamilyFor` so each numeric weight returns the matching family:
   ```ts
   export const fonts = {
     regular: "Poppins_400Regular",
     medium: "Poppins_500Medium",
     semibold: "Poppins_600SemiBold",
     bold: "Poppins_700Bold",
     extrabold: "Poppins_800ExtraBold",
     // ...display families
   } as const;
   ```

   The keys in `fontAssets` **must exactly match** the family strings referenced in `theme.ts`.

4. **Restart** the dev server (stop and re-run `npm start`). Nothing else references the font packages directly, so these are the only files you touch.

Browse available typefaces at [Google Fonts](https://fonts.google.com/); each has a matching `@expo-google-fonts/<family>` package.
