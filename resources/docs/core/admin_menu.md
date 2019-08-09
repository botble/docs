## Admin menu

To integrate your existed app with Botble Core, you will need to register your menu to system.

### Add new menu
- Open `/app/Providers/AppServiceProvider.php`. Add below code to function `boot`

```php
\Event::listen(\Illuminate\Routing\Events\RouteMatched::class, function () {
    dashboard_menu()->registerItem([
        'id' => 'your-unique-id', // key of menu, it should unique
        'priority' => 5,
        'parent_id' => null,
        'name' => 'Your plugin name', // It should be a translation key. Ex: module.name
        'icon' => 'fa fa-camera',
        'url' => 'your-menu-url',
        'permissions' => ['permission to access this menu'], // permission should same with route name and it's stored in `permissions` table.
    ]);
});
```

### Remove existed menu.

- Open `/app/Providers/AppServiceProvider.php`. Add below code to function `boot`

```php
Event::listen(\Botble\Base\Events\SessionStarted::class, function () {
    dashboard_menu()->removeItem('menu-id');
});
```

You can see all available menus by using

```php
dashboard_menu()->getAll();
```
