# Theme

- [Create theme with artisan CLI](#command_generate)
- [Configuration](#configuration)
- [Basic usage](#basic-usage)
- [Partials](#partials)
- [Working with regions](#working-with-regions)
- [Preparing data to view](#preparing-data-to-view)
- [Using theme global](#using-theme-global)


<a name="command_generate"></a>
## Create theme with artisan CLI

The first time you have to create theme "default" structure, using the artisan command:

```bash
php artisan cms:theme:create default
```


To delete an existing theme, use the command:

```bash
php artisan cms:theme:remove default
```

<a name="configuration"></a>
##Configuration

After the config is published, you will see the config file in "config/theme", but all the configuration can be replaced by a config file inside a theme.

> {info} Theme config location: /public/themes/[theme]/config.php

The config is convenient for setting up basic CSS/JS, partial composer, breadcrumb template and also metas.

Example:

```php
'events' => [
    
    // Before event inherit from package config and the theme that call before,
    // you can use this event to set meta, breadcrumb template or anything
    // you want inheriting.
    'before' => function($theme)
    {
        // You can remove this line anytime.
        $theme->setTitle('Copyright ©  2017 - Botble CMS');
    },
    
    // Listen on event before render a theme,
    // this event should call to assign some assets,
    // breadcrumb template.
    'beforeRenderTheme' => function($theme)
    {
        // You may use this event to set up your assets.
        // $theme->asset()->usePath()->add('core', 'core.js');
        // $theme->asset()->add('jquery', 'vendor/jquery/jquery.min.js');
        // $theme->asset()->add('jquery-ui', 'vendor/jqueryui/jquery-ui.min.js', array('jquery'));
    
    
        // $theme->partialComposer('header', function($view)
        // {
        //     $view->with('auth', Sentinel::user());
        // });
    },
    
    // Listen on event before render a layout,
    // this should call to assign style, script for a layout.
    'beforeRenderLayout' => array(
    
        'default' => function($theme)
        {
            // $theme->asset()->usePath()->add('ipad', 'css/layouts/ipad.css');
        }
    
    )
]
```
    
<a name="basic-usage"></a>
## Basic usage

```php
namespace App\Http\Controllers;
    
use Theme;

class HomeController extends Controller {

    public function getIndex()
    {
        $theme = Theme::uses('default')->layout('mobile');

        $view = array(
            'name' => 'Botble'
        );

        // home.index will look up the path 'resources/views/home/index.php'
        return $theme->of('home.index', $view)->render();

        // Specific status code with render.
        return $theme->of('home.index', $view)->render(200);

        // home.index will look up the path 'resources/views/mobile/home/index.php'
        return $theme->ofWithLayout('home.index', $view)->render();

        // home.index will look up the path 'public/themes/default/views/home/index.php'
        return $theme->scope('home.index', $view)->render();

        // home.index will look up the path 'public/themes/default/views/mobile/home/index.php'
        return $theme->scopeWithLayout('home.index', $view)->render();

        // Looking for a custom path.
        return $theme->load('app.somewhere.viewfile', $view)->render();

        // Working with cookie.
        $cookie = Cookie::make('name', 'Tee');
        return $theme->of('home.index', $view)->withCookie($cookie)->render();
    }

}
```

> {info} Get only content "$theme->of('home.index')->content();".

Finding from both theme's view and application's view.
    
```php
$theme = Theme::uses('default')->layout('default');
    
return $theme->watch('home.index')->render();
```

To check whether a theme exists.

```php
// Returns boolean.
Theme::exists('themename');
```

To find the location of a view.

```php
$which = $theme->scope('home.index')->location();
    
echo $which; // themer::views.home.index

$which = $theme->scope('home.index')->location(true);

echo $which; // ./public/themes/name/views/home/index.blade.php
```

<a name="partials"></a>
### Partials

Render a partial in your layouts or views.

```php
// This will look up to "public/themes/[theme]/partials/header.php"
echo Theme::partial('header', array('title' => 'Header'));

// Partial with current layout specific.
// This will look up up to "public/themes/[theme]/partials/[CURRENT_LAYOUT]/header.php"
echo Theme::partialWithLayout('header', array('title' => 'Header'));
```

Finding from both theme's partial and application's partials.

```php
echo Theme::watchPartial('header', array('title' => 'Header'));
```

Partial composer.

```php
$theme->partialComposer('header', function($view) {
    $view->with('key', 'value');
});

// Working with partialWithLayout.
$theme->partialComposer('header', function($view) {
    $view->with('key', 'value');
}, 'layout-name');
```

<a name="working-with-regions"></a>
## Working with regions.

Theme has magic methods to set, prepend and append anything.

```php
$theme->setTitle('Your title');
    
$theme->appendTitle('Your appended title');

$theme->prependTitle('Hello: ....');

$theme->setAnything('anything');

$theme->setFoo('foo');

// or

$theme->set('foo', 'foo');
```

Render in your layout or view.

```php
Theme::getAnything();
    
Theme::getFoo();

// or use place.

Theme::place('anything');

Theme::place('foo', 'default-value-if-it-does-not-exist');

// or

Theme::get('foo');
```

Check if the place exists or not.

```php
@if (Theme::has('title'))
    {{ Theme::place('title') }}
@endif

// or

@if (Theme::hasTitle())
    {{ Theme::getTitle() }}
@endif
```

Get argument assigned to content in layout or region.

```php
Theme::getContentArguments();
    
// or

Theme::getContentArgument('name');

// To check if it exists

Theme::hasContentArgument('name');
```


> {info} Theme::place('content') is a reserve region to render sub-view.

<a name="preparing-data-to-view"></a>
## Preparing data to view

Sometimes you don't need to execute heavy processing, so you can prepare and use when you need it.

```php
$theme->bind('something', function() {
    return 'This is bound parameter.';
});
```

Using bound data on view.

```php
echo Theme::bind('something');
```

<a name="using-theme-global"></a>
## Using theme global

```php
use Botble\Theme\Contracts\Theme;
use App\Http\Controllers\Controller;

class BaseController extends Controller {

    /**
     * Theme instance.
     *
     * @var \Botble\Theme\Theme
     */
    protected $theme;

    /**
     * Construct
     *
     * @return void
     */
    public function __construct(Theme $theme)
    {
        // Using theme as a global.
        $this->theme = $theme->uses('default')->layout('ipad');
    }

}
```

To override theme or layout.

```php
public function getIndex()
{
    $this->theme->uses('newone');

    // or just override layout
    $this->theme->layout('desktop');

    $this->theme->of('somewhere.index')->render();
}
```