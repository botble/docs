# Language

## Apply multi language for your new plugin

- Open `/plugins/<your-plugin>/src/Providers/<YourPlugin>ServiceProvider.php`. Add below code to function `boot`

```php
if (defined('LANGUAGE_MODULE_SCREEN_NAME')) {
    \Language::registerModule([<YOUR_PLUGIN>_MODULE_SCREEN_NAME]);
}
```
## Language switcher

### Adding language switcher to your theme.

Add to your theme views.

```
{!! apply_filters('language_switcher') !!}
```

### Customize swicher.

If you want to custom language swicher, you can modify this file: `platform/plugins/language/resources/views/partials/switcher.blade.php`

If you have a fixed number of languages you can use hardcode HTML like this.

```
<ul>
    <li>
        <a href="{{ url('en') }}">
            <img src="{{ url('vendor/core/images/flags/us.png') }}" title="English" alt="English">                            <span>English</span>                        
        </a>
    </li>                    
    <li >
        <a href="{{ url('vi') }}">
            <img src="{{ url('vendor/core/images/flags/vn.png') }}" title="Tiếng Việt" alt="Tiếng Việt">                      <span>Tiếng Việt</span>                        
        </a>
    </li>
</ul>
        
```
