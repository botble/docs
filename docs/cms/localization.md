# Localization

## Introduction

Botble CMS provides a comprehensive localization system that allows you to create multilingual websites. The localization functionality is built on top of Laravel's localization features and extended with additional capabilities specific to Botble CMS.

There are two main components to the localization system:

1. **Basic Localization**: Built into the core of Botble CMS, this allows you to translate static text in your themes and admin panel.

2. **Advanced Localization**: Provided by the Language and Language Advanced plugins, this allows you to create fully multilingual websites with translated content, URLs, and more.

## Basic Localization

### Translating Themes

To translate your theme's text to different languages, you can use JSON translation files. These files should be placed in one of these locations:

- `resources/lang/`
- `platform/themes/your-theme/lang/`

#### Example

Create a file `resources/lang/es.json` for Spanish translations:

```json
{
  "Home": "Inicio",
  "Contact": "Contacto",
  "About us": "Sobre nosotros",
  "Welcome to our website": "Bienvenido a nuestro sitio web"
}
```

#### Using Translations in Blade Templates

```blade
<h1>{{ __('Welcome to our website') }}</h1>
<ul>
    <li><a href="/">{{ __('Home') }}</a></li>
    <li><a href="/about">{{ __('About us') }}</a></li>
    <li><a href="/contact">{{ __('Contact') }}</a></li>
</ul>
```

#### Using Translations in PHP

```php
echo __('Welcome to our website');
```

### Translating Admin Panel

The admin panel uses Laravel's localization with PHP arrays. To add a new language:

1. **Manual Method**: Copy the entire `resources/lang/en` directory to your language code, e.g., `resources/lang/es`, and translate all the files.

2. **Using Artisan Command**: Run the following command to quickly create a new locale:

```bash
php artisan cms:locale:create <locale>
```

For example, to add Spanish:

```bash
php artisan cms:locale:create es
```

### Removing a Locale

To remove a locale, you can either:

1. Delete the locale directory in `resources/lang`
2. Run the command:

```bash
php artisan cms:locale:remove <locale>
```

## Advanced Localization with Language Plugin

The Language plugin provides advanced localization features for creating fully multilingual websites.

### Installing the Language Plugin

Go to **Admin Panel > Plugins** and activate the **Language** plugin.

### Adding Languages

1. Go to **Settings > Languages**
2. Click **Add New Language**
3. Select a language from the dropdown and fill in the required information
4. Click **Save**

### Language Settings

In **Settings > Languages > Settings**, you can configure:

- **Default language**: The default language for your website
- **Hide default language from URL**: Whether to hide the default language code from URLs
- **Use language switcher**: Enable/disable the language switcher
- **Hide languages from switcher**: Select languages to hide from the language switcher
- **Language display**: How to display languages in the switcher (flag, name, or both)
- **Language switcher display**: Where to display the language switcher

### Using the Language Switcher

The language switcher can be added to your theme using the `{!! Theme::partial('language-switcher') !!}` helper.

You can also create a custom language switcher using the `Language` facade:

```php
use Botble\Language\Facades\Language;

$currentLocale = Language::getCurrentLocale();
$supportedLocales = Language::getSupportedLocales();

foreach ($supportedLocales as $localeCode => $properties) {
    if ($localeCode === $currentLocale) {
        continue;
    }

    $url = Language::getSwitcherUrl($localeCode, $properties['lang_code']);
    $name = $properties['lang_name'];
    $flag = $properties['lang_flag'];

    // Generate your language switcher HTML here
}
```

## Content Translation with Language Advanced Plugin

The Language Advanced plugin extends the Language plugin to provide content translation capabilities.

### Installing the Language Advanced Plugin

Go to **Admin Panel > Plugins** and activate the **Language Advanced** plugin. Note that the Language plugin must be activated first.

### Translating Content

Once the Language Advanced plugin is activated, you'll see a language selector in the edit forms for supported content types (Pages, Posts, etc.).

1. Create or edit content in your default language
2. Save the content
3. Select another language from the language selector
4. Translate the content fields
5. Save the translated content

### Programmatically Working with Translations

#### Registering Models for Translation

You can register your custom models for translation using the `LanguageAdvancedManager`:

```php
use Botble\LanguageAdvanced\Supports\LanguageAdvancedManager;

LanguageAdvancedManager::registerModule(YourModel::class, [
    'name',
    'description',
    'content',
    // Add other translatable fields
]);
```

#### Getting Translated Content

Translated content is automatically retrieved based on the current locale. You don't need to write any special code to get translated content.

## Helper Functions

### Language Flag

The `language_flag()` helper function generates an SVG flag for a language:

```php
{!! language_flag('us', 'English', 24) !!}
```

Parameters:
- `$flag`: The flag code (e.g., 'us', 'fr', 'de')
- `$name`: The language name (optional)
- `$width`: The width of the flag in pixels (default: 16)

## Best Practices

1. **Use Translation Keys**: Instead of hardcoding text, always use translation functions (`__()`, `trans()`) with appropriate keys.

2. **Organize Translations**: Keep your translations organized by context or feature to make them easier to maintain.

3. **Default Language Content**: Always create content in your default language first, then translate it to other languages.

4. **Test All Languages**: Regularly test your website in all supported languages to ensure everything is translated correctly.

5. **RTL Support**: If you support RTL languages (Arabic, Hebrew, etc.), ensure your theme has proper RTL styling.

## Troubleshooting

### Missing Translations

If translations are missing:

1. Check that the translation files exist in the correct location
2. Clear the cache: `php artisan cache:clear`
3. Restart the queue worker if you're using queues

### URL Issues

If you're having issues with localized URLs:

1. Check the Language plugin settings
2. Make sure the language is active
3. Clear the route cache: `php artisan route:clear`

### Performance Considerations

Translations are cached for performance. If you update translations, clear the cache:

```bash
php artisan cache:clear
```
