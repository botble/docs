# Development Guide

This guide covers the technical aspects of customizing and extending the Botble Ecommerce Mobile App.

## Project Architecture

### Tech Stack
- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript (strict mode)
- **Navigation**: Expo Router v6 (file-based routing)
- **State Management**: React Query + Context API
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **HTTP Client**: Fetch API with custom wrapper
- **Storage**: Expo Secure Store (tokens), AsyncStorage (preferences)

### Directory Structure

```
├── app/                          # Expo Router pages
│   ├── (auth)/                   # Auth screens (login, register)
│   ├── (tabs)/                   # Tab navigation
│   │   ├── index.tsx            # Home
│   │   ├── categories.tsx       # Categories
│   │   ├── search.tsx           # Search
│   │   ├── cart.tsx             # Cart
│   │   ├── account.tsx          # Account
│   │   └── wishlist.tsx         # Wishlist
│   ├── account/                  # Account management
│   ├── product/                  # Product pages
│   └── _layout.tsx              # Root layout
│
├── src/
│   ├── components/              # Reusable components
│   │   ├── ui/                  # Base UI components
│   │   ├── home/                # Home page components
│   │   ├── products/            # Product components
│   │   ├── cart/                # Cart components
│   │   └── ...
│   ├── context/                 # React Contexts (6 total)
│   │   ├── AuthContext.tsx      # Authentication
│   │   ├── CartContext.tsx      # Shopping cart
│   │   ├── WishlistContext.tsx  # Wishlist
│   │   ├── SettingsContext.tsx  # Theme & language
│   │   ├── CompareContext.tsx   # Product comparison
│   │   └── AppStatusContext.tsx # Network & app status
│   ├── services/                # API services
│   │   ├── api.ts               # API endpoints
│   │   ├── apiClient.ts         # HTTP client
│   │   └── auth.ts              # Authentication helpers
│   ├── hooks/                   # Custom hooks
│   ├── lib/                     # Utilities
│   └── i18n/                    # Translations
```

## State Management

### React Query (Server State)

Used for all API data fetching with automatic caching:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetching data
const { data, isLoading, error } = useQuery({
  queryKey: ['products', categoryId],
  queryFn: () => fetchProducts(categoryId),
});

// Mutating data
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: addToCart,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['cart'] });
  },
});
```

### Context API (Client State)

Used for global app state:

```typescript
// Using auth context
const { user, token, login, logout } = useAuth();

// Using settings context
const { theme, language, setTheme, setLanguage, themeColors } = useSettings();

// Using cart context
const { items, addToCart, removeFromCart, cartTotal } = useCart();
```

## Adding New Pages

### File-Based Routing

With Expo Router, file paths become routes:

```
app/
├── index.tsx           → /
├── about.tsx           → /about
├── product/
│   └── [slug].tsx      → /product/:slug
└── (tabs)/
    └── cart.tsx        → /cart (in tab navigator)
```

### Creating a New Page

1. Create a new file in the `app/` directory:

```typescript
// app/my-page.tsx
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function MyPage() {
  return (
    <>
      <Stack.Screen options={{ title: 'My Page' }} />
      <View className="flex-1 bg-background p-4">
        <Text className="text-foreground">Hello World</Text>
      </View>
    </>
  );
}
```

2. Navigate to it:

```typescript
import { router } from 'expo-router';

router.push('/my-page');
```

## Adding New Components

### Component Structure

```typescript
// src/components/products/ProductPrice.tsx
import { View, Text } from 'react-native';
import { useSettings } from '@/context/SettingsContext';

interface ProductPriceProps {
  price: number;
  salePrice?: number;
}

export function ProductPrice({ price, salePrice }: ProductPriceProps) {
  const { themeColors } = useSettings();

  return (
    <View className="flex-row items-center gap-2">
      {salePrice && (
        <Text className="text-muted line-through">${price}</Text>
      )}
      <Text className="text-foreground font-bold">
        ${salePrice || price}
      </Text>
    </View>
  );
}
```

### Using Theme Colors

```typescript
import { useSettings } from '@/context/SettingsContext';

function MyComponent() {
  const { themeColors, isDarkMode } = useSettings();

  return (
    <View style={{ backgroundColor: themeColors.background }}>
      <Text style={{ color: themeColors.foreground }}>
        Hello
      </Text>
    </View>
  );
}
```

## API Integration

### Adding New API Endpoints

```typescript
// src/services/api.ts

export const fetchMyData = async (token: string) => {
  const response = await fetch(`${API_URL}/my-endpoint`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
```

### Using with React Query

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchMyData } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { token } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['myData', token],
    queryFn: () => fetchMyData(token!),
    enabled: !!token,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  return <DataDisplay data={data} />;
}
```

## Styling with NativeWind

### Tailwind Classes

```typescript
<View className="flex-1 bg-background p-4">
  <Text className="text-xl font-bold text-foreground mb-2">
    Title
  </Text>
  <Text className="text-muted">
    Description text
  </Text>
</View>
```

### Custom Theme Colors

Theme colors are defined in `global.css`:

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

## Internationalization

### Adding Translations

1. Add keys to locale files in `src/i18n/locales/`:

```json
// en.json
{
  "myFeature": {
    "title": "My Feature",
    "description": "This is my feature"
  }
}
```

2. Use in components:

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t('myFeature.title')}</Text>
      <Text>{t('myFeature.description')}</Text>
    </View>
  );
}
```

### Adding New Languages

1. Create new locale file: `src/i18n/locales/de.json`
2. Register in `src/i18n/index.ts`:

```typescript
import de from './locales/de.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  de: { translation: de }, // Add new language
};
```

## Testing

### Running Tests

```bash
npm test              # Run unit tests
npm run test:watch    # Watch mode
```

### Type Checking

```bash
npm run typecheck     # Check TypeScript types
```

## Best Practices

### Code Style
- Use TypeScript for all new files
- Use functional components with hooks
- Follow existing naming conventions
- Keep components small and focused

### Performance
- Use React Query for API calls (automatic caching)
- Use FlatList for long lists
- Debounce search inputs
- Lazy load screens when possible

### Security
- Never store sensitive data in AsyncStorage
- Use Expo Secure Store for tokens
- Validate user inputs
- Use HTTPS for all API calls

## Debugging

### React Native Debugger

1. Shake your device or press `Cmd+D` (iOS) / `Cmd+M` (Android)
2. Select "Debug Remote JS"

### Console Logging

```typescript
console.log('Debug info:', data);
console.warn('Warning message');
console.error('Error message');
```

### React Query DevTools

```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Add to your app
<ReactQueryDevtools initialIsOpen={false} />
```

## Need Help?

- Check the [API Integration Guide](api-integration.md)
- Read the [Troubleshooting Guide](troubleshooting.md)
- Contact support for assistance
