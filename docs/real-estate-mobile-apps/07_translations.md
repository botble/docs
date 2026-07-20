# Configuring Translations

## Overview

Flex Home uses **react-i18next** for localization. Each language is a flat/nested JSON file under `src/i18n/locales/`, registered in `src/i18n/index.ts`. English (`en`) is the **source of truth**; every other locale must have exactly the same key set.

## Default Language Configuration

Set the default language and direction in your `.env` file:

```bash
# Default language code (en, vi, ar, fr)
DEFAULT_LANGUAGE=en

# Default language direction: ltr (left-to-right) or rtl (right-to-left)
DEFAULT_LANGUAGE_DIRECTION=ltr
```

At startup `src/i18n/index.ts` resolves the initial language from the device locale (via `expo-localization`) when it is one of the supported languages, otherwise it falls back to `DEFAULT_LANGUAGE`.

## Supported Languages

The app ships with four locales (500 keys each), all registered in `src/i18n/index.ts`:

| Language | Code | File | Direction |
|----------|------|------|-----------|
| English | `en` | `src/i18n/locales/en.json` | LTR (source of truth) |
| Vietnamese | `vi` | `src/i18n/locales/vi.json` | LTR |
| Arabic | `ar` | `src/i18n/locales/ar.json` | RTL |
| French | `fr` | `src/i18n/locales/fr.json` | LTR |

## Using Translations in Code

Call the `t` function from `react-i18next` with an **inline default** like `t("key", "Default")`. The default doubles as the English string that the extractor writes into `en.json`:

```tsx
import { useTranslation } from "react-i18next";

function Greeting() {
  const { t } = useTranslation();
  return <Text>{t("home.title", "Good morning")}</Text>;
}

// With interpolation
t("inquiry.pickupOn", "Pick-up on {{date}}", { date });
```

Keys are dot-separated and nested (e.g. `home.title`, `inquiry.pickupOn`).

## The app name (`{{appName}}`): white-labeling

The app name is never written literally in a translation. Every string that shows it
uses the `{{appName}}` variable, which is registered globally in `src/i18n/index.ts`
from `APP_NAME`:

```ts
interpolation: {
  escapeValue: false,
  defaultVariables: { appName: appConfig.name },
},
```

```tsx
t("auth.loginTitle", "Sign in to {{appName}}");   // → "Sign in to <APP_NAME>"
```

So a buyer rebrands the app name across every screen and every language by setting `APP_NAME` alone. No string edits needed. When you add strings that mention the app name, write `{{appName}}` (never the literal name), and keep the app name out of translation **keys** too (use generic keys like `auth.loginTitle`, not `auth.signInToFlex Home`).

This is enforced: `npm run i18n:check` (run in CI) fails if the brand literal appears
in any locale key or value, pointing you to use `{{appName}}`.

## Extract & verify workflow

Two npm scripts keep the locale files in sync:

```bash
# 1. Scan the app for t("key", "Default") calls and write them into en.json
npm run i18n:scan

# 2. Verify every locale has exactly the same key set as en.json
npm run i18n:check
```

- `npm run i18n:scan` runs **i18next-parser** (config in `i18next-parser.config.js`). It scans `app/**` and `src/**` and extracts every `t("key", "Default")` call, then updates `src/i18n/locales/en.json` (only `en` is extracted; keys are sorted). The inline default is used as the English value. If none is given, a readable label is derived from the last key segment.
- `npm run i18n:check` runs `scripts/check-i18n-locales.mjs`, which flattens each locale to dot-paths and compares against `en.json`. It reports any **missing** or **extra** keys and exits non-zero so CI fails on translation drift.

## Adding a New Language

To add, for example, Spanish (`es`):

1. **Create the JSON file** `src/i18n/locales/es.json`. The easiest start is to copy `en.json` and translate the values (keep every key so parity passes).

2. **Register it in `src/i18n/index.ts`**: Import the file and add it to the `resources` map:
   ```ts
   import es from "./locales/es.json";

   const resources = {
     en: { translation: en },
     ar: { translation: ar },
     fr: { translation: fr },
     vi: { translation: vi },
     es: { translation: es }, // ← new
   } as const;
   ```
   `SUPPORTED_LANGUAGES` is derived automatically from `Object.keys(resources)`, so the new code is picked up for device-locale detection.

3. **Add a flag/label**: The language picker (`app/settings/language.tsx`) shows an emoji flag from `src/lib/language-flags.ts`. Add an entry if the code isn't already mapped:
   ```ts
   const FLAG_BY_CODE: Record<string, string> = {
     // ...
     es: "🇪🇸",
   };
   ```

4. **Set RTL direction for RTL languages**: For a right-to-left language, register its code in `RTL_LANGUAGES` in `src/lib/rtl.ts` (it already contains `ar`, `he`, `fa`, `ur`). If it should be the app default, also set `DEFAULT_LANGUAGE_DIRECTION=rtl` in `.env`.

5. **Verify parity:**
   ```bash
   npm run i18n:check
   ```
   Fix any reported missing/extra keys until it prints `All locales match en.json (473 keys).`

## RTL (Right-to-Left) Support

Arabic (`ar`) is RTL. RTL is handled in `src/lib/rtl.ts`:

- `RTL_LANGUAGES` lists the RTL codes (`ar`, `he`, `fa`, `ur`); `isRtlLanguage(code)` checks membership.
- `applyLayoutDirection(shouldBeRTL)` calls `I18nManager.allowRTL` / `forceRTL`.

**Important:** React Native only applies `allowRTL` / `forceRTL` on the next app launch. Flipping direction at runtime does not re-layout the current session. `applyLayoutDirection` returns `true` when the direction actually changed, so the app can prompt the user to restart.

Build layouts with **logical layout props** (e.g. `marginStart` / `marginEnd`, `start` / `end`, `textAlign: "start"`) rather than hard-coded `left` / `right` so they mirror correctly under RTL.

## Important Notes

- `en.json` is the source of truth. Always extract with `npm run i18n:scan` and keep other locales at key parity.
- Use meaningful, nested keys and always pass an inline default: `t("key", "Default")`.
- After changing `.env` language settings, restart the dev server (`npm start`).
- A native RTL/LTR flip requires an app restart to take effect.
