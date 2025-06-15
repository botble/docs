# Configuring Translations

The app uses `easy_localization` for managing multiple languages. Translations are stored in JSON files under the `assets/translations` directory.

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

## Supported Languages
The app currently supports:
- English (en)
- Vietnamese (vi)
- Arabic (ar)
- Bengali (bn)
- Spanish (es)
- French (fr)
- Hindi (hi)
- Indonesian (id)

## Adding a New Language

1. Create a new JSON file in `assets/translations/` (e.g., `fr.json` for French)
2. Add the new locale in `lib/main.dart`:
   ```dart
   supportedLocales: const [
     Locale('en'),
     Locale('vi'),
     Locale('ar'),
     // Add your new locale here
     Locale('fr'),
   ],
   ```

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

   // Pluralization
   Text('items_count'.plural(5))
   ```

## Important Notes
- Always use meaningful keys for translations
- Keep translations organized in nested objects for better structure
- Test all supported languages after making changes
- Consider RTL (Right-to-Left) support for languages like Arabic
- Keep translation files in sync across all languages
