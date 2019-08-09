# Changelog

- [Botble Core 3.5](#version_3_5)
- [Botble Core 3.4](#version_3_4)

<a name="version_3_5"></a>
## Botble Core 3.5
### 30-05-2019
- Restructure asset files.
- Fix security issue in upload user's avatar.
- Change binding type for repositories from `singleton` to `bind`.
- Remove `@author` in comment docs.
- Fix dashboard widgets.
- Allow to create user without role.
- Refactor, clean migrations.

<a name="version_3_4"></a>
## Botble Core 3.4
### 28-03-2019
- Upgraded to the latest Laravel version 5.8
- Change folder structure: move folder /core into /platform folder.
- Improve admin UI.
- Made some change on `assets` module.
    + Refactor some methods.
        + `addJavascript` => `addScripts`
        + `removeJavascript` => `removeScripts`
        + `getJavascript` => `getScripts`
        + `addStylesheets` => `addStyles`
        + `removeStylesheets` => `removeStyles`
        + `getStylesheets` => `getStyles`
        + `addStylesheetsDirectly` => `addStylesDirectly`
        + `addJavascriptDirectly` => `addScriptsDirectly`

    + Change some config keys:
        + `javascript` => `scripts`
        + `stylesheets` => `styles`
        
- Change folder to upload to `storage/uploads`, you need to run command `php artisan storage:link` to create symlink.

- Change event to listen when adding admin menu.

Change `\Botble\Base\Events\SessionStarted::class` to `\Illuminate\Routing\Events\RouteMatched::class`

Example:

```php
\Event::listen(\Illuminate\Routing\Events\RouteMatched::class, function () {
    dashboard_menu()->registerItem([
        'id' => 'your-unique-id', // key of menu, it should unique
        'priority' => 5,
        'parent_id' => null,
        'name' => __('Your menu name'), // menu name, if you don't need translation, you can use the name in plain text
        'icon' => 'fa fa-camera',
        'url' => 'your-menu-url',
        'permissions' => ['permission to access this menu'], // permission should same with route name and it's stored in `permissions` table.
    ]);
});
```

## 3.3 (2018-08-26)

- First release

