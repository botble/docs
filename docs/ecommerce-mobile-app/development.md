# Development Guide

## Tech stack

- React Native + Expo SDK 54
- TypeScript (strict)
- Expo Router v6 (file-based routing)
- React Query (server state) + Context API (client state)
- NativeWind (Tailwind for React Native)
- Fetch API via custom client (`src/services/apiClient.ts`)
- Expo Secure Store (tokens), AsyncStorage (preferences)

## Project structure

```
app/                          Expo Router screens
├── (auth)/                   login, register
├── (tabs)/                   home, categories, search, cart, account, wishlist
├── account/                  account management
├── product/                  product detail
└── _layout.tsx               root layout

src/
├── components/               UI components (ui/, home/, products/, cart/, ...)
├── context/                  Auth, Cart, Wishlist, Settings, Compare, AppStatus
├── services/                 api.ts, apiClient.ts, auth.ts
├── hooks/                    custom hooks
├── lib/                      utilities
└── i18n/                     translations
```

## Run

```bash
npm install
npm start                # Metro
npm run ios              # iOS simulator
npm run android          # Android emulator
```

`.env` is read at Metro start. Stop and rerun (`npm start -- --clear`) after editing.

## Add a screen

Expo Router uses file-based routing — file paths become URLs.

```tsx
// app/my-page.tsx
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function MyPage() {
  return (
    <>
      <Stack.Screen options={{ title: 'My Page' }} />
      <View className="flex-1 bg-background p-4">
        <Text className="text-foreground">Hello</Text>
      </View>
    </>
  );
}
```

Navigate with `router.push('/my-page')`.

## Add a component

```tsx
// src/components/products/ProductPrice.tsx
import { View, Text } from 'react-native';

export function ProductPrice({ price, salePrice }: { price: number; salePrice?: number }) {
  return (
    <View className="flex-row items-center gap-2">
      {salePrice && <Text className="text-muted line-through">${price}</Text>}
      <Text className="text-foreground font-bold">${salePrice ?? price}</Text>
    </View>
  );
}
```

For non-Tailwind styling, read theme colors from `useSettings()`:

```tsx
const { themeColors, isDarkMode } = useSettings();
```

## Add an API call

Use the central client — it handles `X-API-KEY`, `Authorization`, language, currency, timeout, and error parsing automatically.

```ts
// src/services/api.ts
import { api } from './apiClient';

export const fetchMyData = () => api.get('/my-endpoint');
```

Consume with React Query:

```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ['myData'],
  queryFn: fetchMyData,
});
```

For mutations, invalidate related queries on success:

```tsx
const mutation = useMutation({
  mutationFn: addToCart,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
});
```

See [API Integration](api-integration.md) for the full client API.

## Use contexts

```ts
const { user, token, login, logout } = useAuth();
const { theme, language, setTheme, setLanguage, themeColors } = useSettings();
const { items, addToCart, removeFromCart, cartTotal } = useCart();
```

## Theme colors

Defined in `global.css` and consumed by NativeWind:

```css
:root {
  --color-background: #f5ede6;
  --color-foreground: #171717;
  --color-primary: #000000;
  --color-muted: #737373;
}

.dark {
  --color-background: #121212;
  --color-foreground: #f5f5f5;
  --color-primary: #ffffff;
  --color-muted: #a3a3a3;
}
```

See [Theme Colors](01_theme_colors.md).

## Translations

Add keys to every locale in `src/i18n/locales/`:

```json
// en.json
{
  "myFeature": { "title": "My Feature", "description": "..." }
}
```

Use:

```tsx
const { t } = useTranslation();
<Text>{t('myFeature.title')}</Text>
```

Add a new language by creating `src/i18n/locales/<code>.json` and registering it in `src/i18n/index.ts`. See [Translations](06_translations.md).

## Tests

```bash
npm test              # all tests
npm run test:watch    # watch mode
npm run test:coverage # with coverage
npm run typecheck     # TypeScript check
```

Layout:

```
src/__tests__/                 integration tests
src/components/**/*.test.tsx   co-located component tests
src/hooks/__tests__/
src/lib/__tests__/
src/services/__tests__/
```

Coverage thresholds: statements 20%, branches 15%, functions 20%, lines 20%.

## Conventions

- Functional components with hooks. TypeScript everywhere.
- `FlatList` (not `ScrollView`) for long lists.
- Debounce search inputs.
- Tokens go in `expo-secure-store`, never in AsyncStorage.
- HTTPS for all API calls.

## Debug

- Shake the device or `Cmd+D` (iOS) / `Cmd+M` (Android) to open the dev menu.
- React Query devtools:

  ```tsx
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
  <ReactQueryDevtools initialIsOpen={false} />
  ```

## Build

```bash
eas build --platform android --profile preview
eas build --platform android --profile production
eas build --platform ios --profile production
```

See [Deploying the App](08_deploying_app.md). Production builds need EAS Secrets, not `.env` (see [Troubleshooting → Black screen](troubleshooting.md#black-screen-after-installing-apk-aab)).
