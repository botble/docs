# Changing Theme Colors

## Overview

Flex Home's brand colors are configured through the `.env` file, so you can rebrand the app's primary color without touching code. The three env values flow through `app.config.js` (into `extra.appConfig`), are read by `src/config/app.ts`, and are ultimately consumed by the theme in `src/lib/theme.ts`.

## Brand Colors Configuration

Brand colors are set in your `.env` file using hex values **without** the leading `#`.

### Primary Colors

Open your `.env` file and set these three keys:

```bash
# Primary Color: main brand color (buttons, active states, highlights, links)
# Default: 161E2D (Flex Home lime green)
PRIMARY_COLOR=161E2D

# Primary Dark Color: darker shade for pressed/active states
# Default: 4d7c0f
PRIMARY_DARK_COLOR=4d7c0f

# On Primary Color: text/icons shown on top of the primary color (button labels)
# Use FFFFFF (white) for dark primaries, 000000 (black) for light primaries
# Default: FFFFFF
ON_PRIMARY_COLOR=FFFFFF
```

**Examples:**
- Orange theme: `PRIMARY_COLOR=f97316` and `PRIMARY_DARK_COLOR=c2410c`
- Blue theme: `PRIMARY_COLOR=2563eb` and `PRIMARY_DARK_COLOR=1d4ed8`
- Red theme: `PRIMARY_COLOR=dc2626` and `PRIMARY_DARK_COLOR=991b1b`
- Purple theme: `PRIMARY_COLOR=7c3aed` and `PRIMARY_DARK_COLOR=5b21b6`

## How the values flow

1. **`.env`**: You set `PRIMARY_COLOR`, `PRIMARY_DARK_COLOR`, `ON_PRIMARY_COLOR` (hex without `#`).
2. **`app.config.js`**: Reads them and injects them into `extra.appConfig`:
   ```js
   primaryColor: process.env.PRIMARY_COLOR || "161E2D",
   primaryDarkColor: process.env.PRIMARY_DARK_COLOR || "4d7c0f",
   onPrimaryColor: process.env.ON_PRIMARY_COLOR || "FFFFFF",
   ```
3. **`src/config/app.ts`**: Exposes them on `appConfig.primaryColor`, `appConfig.primaryDarkColor`, `appConfig.onPrimaryColor` (falling back to the same defaults if unset).
4. **`src/lib/theme.ts`**: The light **and** dark palettes read those values directly. `primary`, `primaryDark`, and `primaryForeground` come straight from `.env` (the same brand color is used in both modes), and `primaryLight` (the pale badge tint) is derived from it automatically. Components pick this up through `SettingsContext` (no per-component re-import needed).
5. **`src/lib/brand-vars.ts`**: The few screens that use Tailwind/NativeWind utility classes (`bg-primary`, `text-primary`) get the same brand color. `brandCssVars` overrides the `--color-primary*` CSS variables at runtime from the `.env` values, applied on the root view in `app/_layout.tsx`.

You do **not** need to edit `src/lib/theme.ts` to rebrand. The three `.env` keys drive the whole app's brand color in both light and dark mode.

## Light & Dark themes

The full color palettes live in `src/lib/theme.ts` as two exported objects:

- `lightColors` is used in light mode
- `darkColors` is used in dark mode

Both define the same token keys (`primary`, `primaryDark`, `primaryForeground`, `background`, `card`, `foreground`, `border`, `success`, `error`, `warning`, `info`, `star`, and more). Light/dark switching is handled through `SettingsContext` (`themeColors` / `themeShadow`), so components read the active palette without importing static values directly.

The default theme mode is controlled by `DEFAULT_THEME_MODE` in `.env` (`light` | `dark` | `system`).

### Configurable vs. deeper tokens

- The **primary** tokens are what the `.env` brand colors map to. Change those via `.env`.
- **Deeper tokens** (backgrounds, borders, text shades, status colors like `success` / `error` / `warning` / `info`, star colors) are defined directly in `lightColors` / `darkColors` in `src/lib/theme.ts`. To adjust them, edit those objects. Remember to update both `lightColors` and `darkColors` so both modes stay consistent.

Other design tokens also live in `theme.ts`: `spacing`, `fontSize`, `borderRadius`, `createShadow`, and `animation`.

## Worked example: change the primary to a hex color

Say you want an orange brand (`#f97316`).

1. Edit `.env`:
   ```bash
   PRIMARY_COLOR=f97316
   PRIMARY_DARK_COLOR=c2410c
   ON_PRIMARY_COLOR=FFFFFF
   ```
2. Optionally match the splash/launch background (this key **does** include the `#`):
   ```bash
   SPLASH_BACKGROUND_COLOR=#f97316
   ```
3. Restart the dev server so the new env values are read:
   ```bash
   npm start
   ```

That's it. The primary color updates across both light and dark mode and both the `themeColors.*` and `bg-primary`/`text-primary` consumers. You only touch `src/lib/theme.ts` if you want to change the **deeper** tokens (backgrounds, borders, text shades, status colors), which are not part of the `.env` brand set.

**Important:** environment values are baked into `extra.appConfig` at build/start time. Restart Expo (stop and re-run `npm start`) after editing `.env`. A Fast Refresh will not pick up `.env` changes. For native builds, re-run `npx expo prebuild` and rebuild.

## Color Picker Tools

Need help choosing colors? Try:
- [Coolors](https://coolors.co/)
- [Adobe Color](https://color.adobe.com/)
- [Tailwind Color Reference](https://tailwindcss.com/docs/customizing-colors) (Flex Home's palette is Tailwind-derived)
