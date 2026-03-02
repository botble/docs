# Configuring Translations

The app uses `easy_localization` for managing multiple languages. Translations are stored in JSON files under the `assets/translations` directory.

## Default Language Configuration

Set your default language in the `.env` file:

```env
# Default language code (e.g., en, ar, vi, es, fr, hi, id, bn)
DEFAULT_LANGUAGE=en

# Default language direction: ltr (left-to-right) or rtl (right-to-left)
DEFAULT_LANGUAGE_DIRECTION=ltr
```

## Supported Languages

The app supports 29 languages, all registered in `main.dart`:

| Language | Code | Direction |
|----------|------|-----------|
| Arabic | `ar` | RTL |
| Bengali | `bn` | LTR |
| Czech | `cs` | LTR |
| German | `de` | LTR |
| Greek | `el` | LTR |
| English | `en` | LTR |
| Spanish | `es` | LTR |
| Persian | `fa` | RTL |
| Finnish | `fi` | LTR |
| French | `fr` | LTR |
| Hebrew | `he` | RTL |
| Hindi | `hi` | LTR |
| Indonesian | `id` | LTR |
| Italian | `it` | LTR |
| Japanese | `ja` | LTR |
| Korean | `ko` | LTR |
| Malay | `ms` | LTR |
| Dutch | `nl` | LTR |
| Polish | `pl` | LTR |
| Portuguese | `pt` | LTR |
| Brazilian Portuguese | `pt_BR` | LTR |
| Russian | `ru` | LTR |
| Swedish | `sv` | LTR |
| Thai | `th` | LTR |
| Turkish | `tr` | LTR |
| Ukrainian | `uk` | LTR |
| Vietnamese | `vi` | LTR |
| Chinese Traditional | `zh` | LTR |
| Chinese Simplified | `zh_CN` | LTR |

## Adding/Modifying Translations

1. Navigate to `assets/translations/`
2. Each language has its own JSON file (e.g., `en.json`, `vi.json`, `ar.json`)
3. Update or add new translations in the format:
   ```json
   {
     "key": "translated text",
     "nested": {
       "key": "nested translated text"
     }
   }
   ```

## Adding a New Language

To enable one of the available translation files or add a completely new language:

1. **Create or verify the JSON file** exists in `assets/translations/` (e.g., `ja.json` for Japanese)

2. **Register the locale** in `lib/main.dart`:
   ```dart
   supportedLocales: const [
     Locale('en'),
     Locale('vi'),
     Locale('ar'), // Arabic (RTL)
     Locale('bn'), // Bengali
     Locale('es'), // Spanish
     Locale('fr'), // French
     Locale('hi'), // Hindi
     Locale('id'), // Indonesian
     Locale('ja'), // Add Japanese
   ],
   ```

3. **Rebuild the app** (hot reload won't register new locales)

## Using Translations in Code

1. Import the translation package:
   ```dart
   import 'package:easy_localization/easy_localization.dart';
   ```

2. Use translations in your code:
   ```dart
   // Simple translation
   Text('hello'.tr())

   // Translation with parameters
   Text('welcome_user'.tr(args: ['John']))

   // Translation with named parameters
   Text('cart.items_count'.tr(namedArgs: {'count': '5'}))

   // Pluralization
   Text('items_count'.plural(5))
   ```

## RTL (Right-to-Left) Support

The app automatically handles RTL layout for languages like Arabic and Hebrew:

- Set `DEFAULT_LANGUAGE_DIRECTION=rtl` in `.env` for RTL default
- The app detects RTL languages and adjusts UI accordingly
- Test RTL layouts thoroughly before deploying

## Important Notes

- Always use meaningful keys for translations
- Keep translations organized in nested objects for better structure
- Test all supported languages after making changes
- Keep translation files in sync across all languages
- After changing `.env` settings, restart the app completely
