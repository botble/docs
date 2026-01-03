# Configuring Translations

## Overview

The app uses `react-i18next` for internationalization with support for multiple languages including RTL (right-to-left) for Arabic.

## Supported Languages

| Language | Code | Direction |
|----------|------|-----------|
| English | `en` | LTR |
| Vietnamese | `vi` | LTR |
| Chinese | `zh` | LTR |
| Spanish | `es` | LTR |
| French | `fr` | LTR |
| German | `de` | LTR |
| Japanese | `ja` | LTR |
| Arabic | `ar` | RTL |

## Translation Files Location

```
src/i18n/locales/
├── en.json    # English
├── vi.json    # Vietnamese
├── zh.json    # Chinese
├── es.json    # Spanish
├── fr.json    # French
├── de.json    # German
├── ja.json    # Japanese
└── ar.json    # Arabic
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

Make sure to update all 8 locale files with the same keys.

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

Create `src/i18n/locales/ko.json` (Korean example):

```json
{
  "common": {
    "cancel": "취소",
    "save": "저장"
  }
}
```

### Step 2: Register the Language

Update `src/i18n/index.ts`:

```typescript
import ko from './locales/ko.json';

const resources = {
  // ... existing languages
  ko: { translation: ko },
};
```

### Step 3: Add to Settings

Update the language selector in settings to include the new language.

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
2. **Keep translations in sync**: Update all 8 languages when adding keys
3. **Test RTL layouts**: Arabic text should flow correctly
4. **Fallback handling**: Missing keys fall back to English

## Scanning for Missing Translations

```bash
npm run i18n:scan
```
