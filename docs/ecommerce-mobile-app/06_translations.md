# Configuring Translations

## Overview

The app uses `react-i18next` for internationalization with support for multiple languages including RTL (right-to-left) for Arabic.

## Supported Languages

30 locale files ship in `src/i18n/locales/`:

`ar`, `bn`, `cs`, `de`, `el`, `en`, `es`, `fa`, `fi`, `fr`, `he`, `hi`, `id`, `it`, `ja`, `ko`, `ms`, `nl`, `pl`, `pt`, `pt_BR`, `ru`, `sq`, `sv`, `th`, `tr`, `uk`, `vi`, `zh`, `zh_CN`

The language picker lists the languages returned by your backend (`GET /api/v1/languages`), and RTL is taken from each language's RTL flag in Botble admin (for example Arabic, Persian, Hebrew).

## Translation Files Location

```
src/i18n/locales/
├── index.ts   # locale registry (one export per language)
├── en.json    # English
├── vi.json    # Vietnamese
├── ar.json    # Arabic
└── ...        # one JSON file per language
```

## Translation File Structure

```json
{
  "common": {
    "cancel": "Cancel",
    "save": "Save",
    "delete": "Delete",
    "loading": "Loading..."
  },
  "auth": {
    "login": "Login",
    "register": "Register",
    "logout": "Logout",
    "email": "Email",
    "password": "Password"
  },
  "cart": {
    "title": "Shopping Cart",
    "empty": "Your cart is empty",
    "checkout": "Proceed to Checkout",
    "total": "Total"
  }
}
```

## Modifying Translations

### Step 1: Open the Locale File

Edit `src/i18n/locales/en.json` (or other language):

```json
{
  "common": {
    "appName": "Your Store Name",
    "welcome": "Welcome to Your Store"
  }
}
```

### Step 2: Update All Languages

Make sure to update every locale file in `src/i18n/locales/` with the same keys.

### Step 3: Use in Components

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t('common.appName')}</Text>
    </View>
  );
}
```

## Adding a New Language

### Step 1: Create Locale File

Create `src/i18n/locales/sw.json` (Swahili example), easiest by copying `en.json` and translating the values:

```json
{
  "common": {
    "cancel": "Ghairi",
    "save": "Hifadhi"
  }
}
```

### Step 2: Register the Language

Add an export to the locale registry `src/i18n/locales/index.ts` (keep it alphabetical). `src/i18n/index.ts` builds its resources from every export automatically:

```typescript
export { default as sw } from "./sw.json";
```

### Step 3: Enable it on the backend

The language selector shows the languages returned by `GET /api/v1/languages`, so also add the language in Botble admin (**Settings → Languages**).

## RTL (Right-to-Left) Support

Arabic is automatically handled with RTL layout. The app detects RTL languages and adjusts the UI accordingly.

## Using Translations in Code

### Simple Translation
```typescript
const { t } = useTranslation();
<Text>{t('auth.login')}</Text>
```

### With Variables
```typescript
// In locale file: "welcome": "Welcome, {{name}}!"
<Text>{t('welcome', { name: 'John' })}</Text>
```

### Pluralization
```typescript
// In locale file:
// "items": "{{count}} item",
// "items_plural": "{{count}} items"
<Text>{t('items', { count: 5 })}</Text>
```

## Changing Language Programmatically

```typescript
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Button onPress={() => changeLanguage('vi')}>Tiếng Việt</Button>
  );
}
```

## Best Practices

1. **Use consistent keys**: Follow the existing naming convention
2. **Keep translations in sync**: Update all language files when adding keys
3. **Test RTL layouts**: Arabic text should flow correctly
4. **Fallback handling**: Missing keys fall back to English

## Scanning for Missing Translations

```bash
npm run i18n:scan
```
