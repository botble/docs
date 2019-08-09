## How to add new admin menu for new plugin?

- Open `/plugins/<your-plugin>/src/Providers/<YourPlugin>ServiceProvider.php`. Add below code to function `boot`

```php
\Event::listen(\Illuminate\Routing\Events\RouteMatched::class, function () {
    dashboard_menu()->registerItem([
        'id' => 'cms-plugins-<your-plugin>', // key of menu, it should unique
        'priority' => 5,
        'parent_id' => null,
        'name' => 'Your plugin name', // It should be a translation key. Ex: plugins/test::test.name
        'icon' => 'fa fa-camera',
        'url' => route('<plugins>.list'), // route to your plugin list.
        'permissions' => ['<plugins>.list'], // permission should same with route name, you can see that flag in Plugin.php
    ]);
});
```

## How to add new language to admin panel?

- Add your language in /resources/lang directory, copy all files /resources/lang/en and paste to your language folder and translate it to your language.

- You can use Laravel language https://github.com/caouecs/Laravel-lang/tree/master/src to quick translate.

## How to add new post format

- Add below code to your themes /functions/functions.php

```php
register_post_format([
    'post-format-key' => [
        'key' => 'post-format-key',
        'name' => 'Post Format Name',
    ],
]);
```

## How to share data between theme's views?

You can use `Theme::set()` and `Theme::get()` for partials views (using `Theme::partial('...')`).

Example:
In `public/themes/ripple/views/post.blade.php` you can add bellow code to share $post data.

```php
@php
    Theme::set('current_post', $post);
@endphp
```

And if you want to use it in `public/themes/ripple/partials/header.blade.php`.

```php
@php
    $current_post = Theme::get('current_post');
@endphp
```

You can pass data like normal if you're using @include.

Example:

```php
@include('theme.ripple::partials.header', ['current_post' => $post])
```
