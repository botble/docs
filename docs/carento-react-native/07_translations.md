# Configuring Translations

## Overview

Carento uses **react-i18next** for localization. Each language is a flat/nested JSON file under `src/i18n/locales/`, registered in `src/i18n/index.ts`. English (`en`) is the **source of truth**; every other locale must have exactly the same key set.

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

The app ships with four locales (451 keys each), all registered in `src/i18n/index.ts`:

| Language | Code | File | Direction |
|----------|------|------|-----------|
| English | `en` | `src/i18n/locales/en.json` | LTR (source of truth) |
| Vietnamese | `vi` | `src/i18n/locales/vi.json` | LTR |
| Arabic | `ar` | `src/i18n/locales/ar.json` | RTL |
| French | `fr` | `src/i18n/locales/fr.json` | LTR |

## Using Translations in Code

Call the `t` function from `react-i18next` with an **inline default** — `t("key", "Default")`. The default doubles as the English string that the extractor writes into `en.json`:

```tsx
import { useTranslation } from "react-i18next";

function Greeting() {
  const { t } = useTranslation();
  return <Text>{t("home.title", "Good morning")}</Text>;
}

// With interpolation
t("booking.pickupOn", "Pick-up on {{date}}", { date });
```

Keys are dot-separated and nested (e.g. `home.title`, `booking.pickupOn`).

## Extract & verify workflow

Two npm scripts keep the locale files in sync:

```bash
# 1. Scan the app for t("key", "Default") calls and write them into en.json
npm run i18n:scan

# 2. Verify every locale has exactly the same key set as en.json
npm run i18n:check
```

- `npm run i18n:scan` runs **i18next-parser** (config in `i18next-parser.config.js`). It scans `app/**` and `src/**`, extracts every `t("key", "Default")` call, and updates `src/i18n/locales/en.json` (only `en` is extracted; keys are sorted). The inline default is used as the English value; if none is given, a readable label is derived from the last key segment.
- `npm run i18n:check` runs `scripts/check-i18n-locales.mjs`, which flattens each locale to dot-paths and compares against `en.json`. It reports any **missing** or **extra** keys and exits non-zero, so CI fails on translation drift.

## Adding a New Language

To add, for example, Spanish (`es`):

1. **Create the JSON file** `src/i18n/locales/es.json`. The easiest start is to copy `en.json` and translate the values (keep every key so parity passes).

2. **Register it in `src/i18n/index.ts`** — import the file and add it to the `resources` map:
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

3. **Add a flag/label** — the language picker (`app/settings/language.tsx`) shows an emoji flag from `src/lib/language-flags.ts`. Add an entry if the code isn't already mapped:
   ```ts
   const FLAG_BY_CODE: Record<string, string> = {
     // ...
     es: "🇪🇸",
   };
   ```

4. **Set RTL direction for RTL languages.** For a right-to-left language, register its code in `RTL_LANGUAGES` in `src/lib/rtl.ts` (it already contains `ar`, `he`, `fa`, `ur`). If it should be the app default, also set `DEFAULT_LANGUAGE_DIRECTION=rtl` in `.env`.

5. **Verify parity:**
   ```bash
   npm run i18n:check
   ```
   Fix any reported missing/extra keys until it prints `All locales match en.json (451 keys).`

## RTL (Right-to-Left) Support

Arabic (`ar`) is RTL. RTL is handled in `src/lib/rtl.ts`:

- `RTL_LANGUAGES` lists the RTL codes (`ar`, `he`, `fa`, `ur`); `isRtlLanguage(code)` checks membership.
- `applyLayoutDirection(shouldBeRTL)` calls `I18nManager.allowRTL` / `forceRTL`.

**Important:** React Native only applies `allowRTL` / `forceRTL` on the **next app launch** — flipping direction at runtime does not re-layout the current session. `applyLayoutDirection` returns `true` when the direction actually changed, so the app can prompt the user to restart.

Build layouts with **logical layout props** (e.g. `marginStart` / `marginEnd`, `start` / `end`, `textAlign: "start"`) rather than hard-coded `left` / `right` so they mirror correctly under RTL.

## Important Notes

- `en.json` is the source of truth — always extract with `npm run i18n:scan` and keep other locales at key parity.
- Use meaningful, nested keys and always pass an inline default: `t("key", "Default")`.
- After changing `.env` language settings, restart the dev server (`npm start`).
- A native RTL/LTR flip requires an app restart to take effect.
