# Development Guide

## Project structure

FlexHome is an Expo SDK 54 / React Native 0.81 app using **expo-router** for file-based navigation, **React Context** for app state, and **@tanstack/react-query** over a custom `fetch` wrapper for the API. TypeScript strict mode throughout.

```
app/                          expo-router routes (thin screens that delegate to hooks/services)
  _layout.tsx                 root: providers + Stack + AppGate
  (tabs)/                     Home, Search, Agents, Inquirys, Profile
  (auth)/                     login, register, forgot/reset password
  car/[slug].tsx              property detail
  car/[slug]/book.tsx         4-step inquiry flow
  inquiry/[id].tsx            inquiry detail/status
  checkout-webview.tsx        hosted payment WebView
  account/                    profile-edit, change-password, notifications, help, license
  settings/                   language, currency, theme pickers
  blog/, agent/[id].tsx, favorites.tsx, onboarding.tsx, ...

src/
  config/app.ts               env-driven config (reads expo-constants extra.appConfig)
  services/                   API layer: apiClient (fetch wrapper) + per-resource wrappers
  context/                    React Context providers (auth, settings, favorites, toast, app-status)
  types/                      domain types mirroring API resources
  lib/                        theme, storage, secure-storage, format, query-string, query-client
  components/ui/              shared UI kit (Button, Input, Card, Badge, StarRating, …)
  components/{properties,home,search,inquiry,agents,account,auth,blog,inquiries}/
  hooks/                      useDebounce, useBiometric, useSocialAuth, useAgents, usePushNotifications
  i18n/                       i18next setup (index.ts) + locale JSON (locales/*.json)

app.config.js                 Expo dynamic config (env → extra.appConfig, plugins)
eas.json                      EAS Build profiles (development / preview / production)
```

**Conventions:**

- **File naming**: Use kebab-case for TS files and component files. Exported component names are PascalCase.
- **Path alias**: `@/*` → `src/*` (configured in `tsconfig.json`, mirrored in Jest). Import via `@/...` from `app/` and across `src/` modules.
- **Theme-aware colors**: Never hardcode hex in screens. Read `themeColors`/`themeShadow` from `useSettings()` so light/dark switches correctly. `src/lib/theme.ts` is the design-token source of truth.
- **200-line guideline**: Split large screens into `components/{area}/` pieces and hooks.

## Run

```bash
npm install --legacy-peer-deps
npm run ios:sim          # iOS Simulator (no signing cert)
npm run android          # Android emulator/device
npm start                # Metro dev server
```

If anything fails to start, clear caches: `npm start -- --clear`. If native config changed, run `npx expo prebuild` first. See [Installation](installation.md).

## State management

- **Server state** goes through `@tanstack/react-query`. All reads/writes use `useQuery` / `useMutation` calling `src/services/*` functions. Never call a service directly from a component body. The shared `queryClient` (`src/lib/query-client.ts`) uses `staleTime: 5min`, `gcTime: 10min`, and only retries `5xx` errors (4xx never retries).
- **App state** lives in React Context (`src/context/`), mounted by `AppProviders.tsx` in this order: `QueryClient → Toast → Settings → AppStatus → Auth → Favorites`.

| Context | Provides |
|---|---|
| `AuthContext` | `customer`, `token`, `isAuthenticated`, session bootstrap/persist/logout |
| `SettingsContext` | `language`, `currency`, `themeMode`/`isDarkMode`, `themeColors`, RTL flag |
| `FavoritesContext` | Server-backed wishlist with optimistic toggle |
| `ToastContext` | `success` / `error` / `info` banners |
| `AppStatusContext` | `isMaintenance` / `isServerError` (driven by apiClient status pub/sub) |

Auth tokens are persisted to **expo-secure-store**; preferences to **async-storage**. See [API integration](api-integration.md) and the API reference for the full data flow.

## Add an API call

1. Add a wrapper in the matching `src/services/*.ts` that calls `api.get/post/...` and unwraps the Botble envelope (`res.data`):

```ts
// src/services/properties.ts
import { api } from "./apiClient";
import type { Property } from "@/types/car";

export async function fetchCarBySlug(slug: string): Promise<Car> {
  const res = await api.get(`/real-estate/properties/${slug}`);
  return res.data;
}
```

2. Consume it from a screen via react-query:

```ts
const { data: property } = useQuery({
  queryKey: ["car", slug],
  queryFn: () => fetchCarBySlug(slug),
});
```

The `apiClient` attaches headers (`X-LANGUAGE`, optional `X-API-KEY`, `Authorization: Bearer`) automatically. Full endpoint→function map: [API Integration](api-integration.md).

## Internationalization (i18n)

Locales are JSON files in `src/i18n/locales/` (`en.json`, `vi.json`, `ar.json`, `fr.json`), loaded by **react-i18next** with **expo-localization** for device-locale detection.

Add a key to `en.json` first, then to the other locales, and use it in code:

```tsx
import { useTranslation } from "react-i18next";

const { t } = useTranslation();
<Text>{t("properties.book_now")}</Text>
```

Tooling:

```bash
npm run i18n:scan        # extract keys from source (i18next-parser)
npm run i18n:check       # verify all locales have the same keys
```

See [Translations](07_translations.md).

## RTL notes

Arabic (`ar`) runs right-to-left. To keep layouts correct:

- Use **logical** layout props (`marginStart`/`marginEnd`, `start`/`end`, `textAlign: "left"` which flips automatically) instead of physical `left`/`right`.
- Direction is driven by `SettingsContext` (`DEFAULT_LANGUAGE_DIRECTION` / the selected language) and React Native's `I18nManager`. A direction change that requires `I18nManager.forceRTL()` needs an app reload to fully apply, so switching to/from an RTL language may prompt a restart.
- Test both directions when building new screens, and mirror icons (chevrons, back arrows) as needed.

## Tests

```bash
npm test                 # jest (jest-expo preset)
npm run test:watch       # watch mode
npm run test:coverage    # with coverage
npm run typecheck        # tsc --noEmit (strict)
```

- Config: `jest.config.js` uses `preset: "jest-expo"`, maps `@/*` → `src/`, and loads `jest.setup.js` (mocks for `expo-secure-store`, `async-storage`, `expo-localization`, and `expo-constants` with a fixed `extra.appConfig` fixture).
- Test files are **co-located** with source (`*.test.ts` / `*.test.tsx` next to the module).
- Prefer pure-function unit tests (`src/lib/*`) and `fetch`-mocked service tests; use `@testing-library/react-native`'s `render`/`renderHook` for Context and hook behavior.

Run `npm run typecheck` before committing.

## Build & deploy

Builds and store submissions go through **EAS** (cloud):

```bash
eas build -p ios --profile production
eas build -p android --profile production
eas submit -p ios --profile production
eas submit -p android --profile production
```

See [Running the app](08_running_app.md), [Deploying the App](09_deploying_app.md), and the [Complete Setup & Publishing Guide](complete-setup-and-publishing-guide.md).

## Common errors

- **`npm install` peer errors**: Add `--legacy-peer-deps`.
- **"No code signing certificates"**: Use `npm run ios:sim` (Simulator) instead of `npm run ios`.
- **`.env` change has no effect**: `.env` is not hot-reloaded. Restart Metro and rebuild.
- **Native change not showing**: Run `npx expo prebuild` (or `--clean`) to regenerate `ios/` and `android/`.

More: [Troubleshooting](troubleshooting.md).
