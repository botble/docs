# Language

## Apply multi language for your new plugin

- Open `/plugins/<your-plugin>/src/Providers/<YourPlugin>ServiceProvider.php`. Add below code to function `boot`

```php
if (defined('LANGUAGE_MODULE_SCREEN_NAME')) {
    \Language::registerModule([<YOUR_PLUGIN>_MODULE_SCREEN_NAME]);
}
```
