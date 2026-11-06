# Settings Storage API

Settings store site-wide values in the database. Use a plugin prefix such as `my_plugin_` to keep keys separate from core settings. Theme options use their own API; see [Theme Options](./theme-development/theme-options.md).

## Reading and Writing

`setting()` returns the setting store. `setting('key', $default)` reads a value and returns the default if the helper encounters an exception. The store's `get()` method reads directly without that exception fallback.

```php
$enabled = setting('my_plugin_enabled', '0');
$exists = setting()->has('my_plugin_enabled');
$value = setting()->get('my_plugin_title', 'Latest updates');

setting()->set([
    'my_plugin_enabled' => '1',
    'my_plugin_title' => 'Latest updates',
])->save();

// A single value uses the same store.
setting()->set('my_plugin_limit', '5')->save();
```

`set(string|array $key, mixed $value = null, bool $force = false)` changes the loaded store. `save()` writes pending values and returns `false` when there were no pending changes. Database values are generally strings; cast values when reading them.

## Arrays and Deletion

Direct store arrays use Laravel dot notation: the database writer flattens nested arrays and the reader reconstructs them. For a list that should occupy one database row, serialize it explicitly:

```php
setting()->set('my_plugin_sections', json_encode(['news', 'events']))->save();
$sections = json_decode(setting('my_plugin_sections', '[]'), true);
```

`forget($key)` removes a value from the loaded store. The database writer updates and inserts keys but does not delete rows omitted from that store; `forget()->save()` is therefore not a persistent deletion. Use `delete()` for explicit database deletion, then reload the store if you need to read it again in the same request:

```php
setting()->delete(['my_plugin_sections', 'my_plugin_limit']);
setting()->load(true);
```

`delete(array|string $keys = [], array $except = [], bool $force = false)` deletes matching database rows immediately. With only `except`, it deletes every row except those keys; with neither argument it returns `false`. Use an explicit list of your plugin's keys for routine cleanup.

## Guarded Keys

The store guards keys including `theme`, `activated_plugins`, `licensed_to`, `media_random_hash`, and admin custom CSS/JavaScript settings. Normal `set()` and `forget()` skip guarded keys. `forceSet()` intentionally bypasses the write guard; reserve it for trusted code that owns the setting, never a raw request payload.

```php
// Trusted internal code only: replacing the active theme setting.
setting()->forceSet('theme', 'your-theme')->save();
```

`forceDelete()` bypasses the deletion guard. In the current database store, do not rely on the normal `delete()` guard to protect a numeric list of keys: its guard loop checks array indexes. Keep deletion lists limited to keys your plugin owns.

## Settings Controllers

The `InteractsWithSettings` trait provides `performUpdate()` and a protected `saveSettings()` method. Pass validated fields and a prefix, as in a settings controller extending the CMS base controller:

```php
use Botble\Base\Http\Controllers\BaseController;
use Botble\Base\Http\Responses\BaseHttpResponse;
use Botble\Setting\Http\Controllers\Concerns\InteractsWithSettings;
use Illuminate\Http\Request;

class PluginSettingsController extends BaseController
{
    use InteractsWithSettings;

    public function update(Request $request): BaseHttpResponse
    {
        $data = $request->validate([
            'enabled' => ['required', 'boolean'],
            'title' => ['required', 'string', 'max:255'],
        ]);

        return $this->performUpdate($data, 'my_plugin_');
    }
}
```

The trait strips `_token` and `_method`, JSON-encodes arrays after `array_filter()`, casts values to strings, saves, and clears dashboard menu caches. That array filtering removes falsey entries, including `0`. Its `$forceSaveSettings` property defaults to `false`.

## Extension Hooks

Register these in a service provider's `boot()` method:

```php
add_action('core_before_update_settings', function (array $data, string $prefix): void {
    if ($prefix === 'my_plugin_') {
        logger()->debug('Updating plugin settings', ['keys' => array_keys($data)]);
    }
}, 20, 2);

add_action('core_after_update_settings', function (array $data, string $prefix): void {
    if ($prefix === 'my_plugin_') {
        cache()->forget('my_plugin_summary');
    }
}, 20, 2);

add_filter(SETTINGS_PREPARE_INSERT_DATA, function (array $rows): array {
    // Rows contain key/value, plus id when string IDs are enabled.
    return $rows;
}, 20, 1);
```

The actions run around `performUpdate()` and receive the original, unprefixed data plus the prefix. They are not dispatched by direct `setting()->save()` calls. Actions execute from higher to lower priority; return values do not transform the data. `SETTINGS_PREPARE_INSERT_DATA` is an ascending-priority filter for **new rows only**, not updates to existing settings.
