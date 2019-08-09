# Gallery

## How to add gallery to your plugin

- Open `/plugins/<your-plugin>/src/Providers/<YourPlugin>ServiceProvider.php`. Add below code to function `boot`

```php
\Gallery::registerModule([<YOUR_PLUGIN>_MODULE_SCREEN_NAME]);
```

## Render galleries

```php
render_galleries(8);
```

It will use template `plugins/gallery/resources/views/gallery.blade.php` to render gallery

```php
/**
 * @param $limit
 * @return mixed
 * @author Sang Nguyen
 */
function render_galleries($limit)
{
    Gallery::registerAssets();
    return view('plugins.gallery::gallery', compact('limit'));
}
```

If you need to custom display of list galleries, you just need to copy the content of `plugins/gallery/resources/views/gallery.blade.php` and customize it in your theme.
