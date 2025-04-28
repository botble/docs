# Frontend Integration

This guide covers how to integrate your plugin with the frontend of a Botble CMS website.

## Public Controllers

To display your plugin's content on the frontend, you'll need to create public controllers. These controllers handle requests from the frontend and return views.

Example public controller (`src/Http/Controllers/PublicController.php`):

```php
<?php

namespace Botble\Foo\Http\Controllers;

use Botble\Base\Facades\BaseHelper;
use Botble\Foo\Models\Item;
use Botble\SeoHelper\Facades\SeoHelper;
use Botble\Theme\Facades\Theme;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class PublicController extends Controller
{
    public function index(Request $request)
    {
        SeoHelper::setTitle(trans('plugins/foo::foo.name'));

        $items = Item::query()
            ->where('status', 'published')
            ->orderBy('created_at', 'DESC')
            ->paginate(10, ['*'], 'page', $request->integer('page', 1));

        Theme::breadcrumb()
            ->add(trans('plugins/foo::foo.name'), route('public.foo.index'));

        return Theme::scope('foo.index', compact('items'))->render();
    }

    public function detail($slug)
    {
        $item = Item::query()
            ->where([
                'slug' => $slug,
                'status' => 'published',
            ])
            ->first();

        if (!$item) {
            abort(404);
        }

        SeoHelper::setTitle($item->name)
            ->setDescription($item->description);

        Theme::breadcrumb()
            ->add(trans('plugins/foo::foo.name'), route('public.foo.index'))
            ->add($item->name, route('public.foo.detail', $item->slug));

        return Theme::scope('foo.detail', compact('item'))->render();
    }
}
```

## Theme Views

To display your plugin's content in the theme, you'll need to create theme views. These views are located in the theme's directory, not in your plugin.

Example theme view structure:

```
platform/themes/your-theme/views/foo/
├── index.blade.php
└── detail.blade.php
```

Example index view (`platform/themes/your-theme/views/foo/index.blade.php`):

```php
@php
    Theme::set('page', 'foo-items');
@endphp

{!! Theme::partial('page-header', ['title' => __('plugins/foo::foo.name')]) !!}

<div class="container">
    <div class="row">
        <div class="col-md-9">
            @if ($items->count() > 0)
                <div class="row">
                    @foreach ($items as $item)
                        <div class="col-md-4 mb-4">
                            <div class="card h-100">
                                <a href="{{ route('public.foo.detail', $item->slug) }}">
                                    <img src="{{ RvMedia::getImageUrl($item->image, 'medium', false, RvMedia::getDefaultImage()) }}" class="card-img-top" alt="{{ $item->name }}">
                                </a>
                                <div class="card-body">
                                    <h5 class="card-title">
                                        <a href="{{ route('public.foo.detail', $item->slug) }}">{{ $item->name }}</a>
                                    </h5>
                                    <p class="card-text">{{ Str::limit($item->description, 100) }}</p>
                                </div>
                                <div class="card-footer">
                                    <small class="text-muted">{{ $item->created_at->diffForHumans() }}</small>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>

                {!! $items->links() !!}
            @else
                <div class="alert alert-info">
                    {{ __('No items found') }}
                </div>
            @endif
        </div>
        <div class="col-md-3">
            {!! Theme::partial('sidebar') !!}
        </div>
    </div>
</div>
```

Example detail view (`platform/themes/your-theme/views/foo/detail.blade.php`):

```php
@php
    Theme::set('page', 'foo-detail');
@endphp

{!! Theme::partial('page-header', ['title' => $item->name]) !!}

<div class="container">
    <div class="row">
        <div class="col-md-9">
            <div class="card mb-4">
                @if ($item->image)
                    <img src="{{ RvMedia::getImageUrl($item->image, 'large', false, RvMedia::getDefaultImage()) }}" class="card-img-top" alt="{{ $item->name }}">
                @endif
                <div class="card-body">
                    <h1 class="card-title">{{ $item->name }}</h1>
                    <p class="card-text">{{ $item->description }}</p>
                    <div class="card-text">
                        {!! BaseHelper::clean($item->content) !!}
                    </div>
                </div>
                <div class="card-footer">
                    <small class="text-muted">{{ __('Posted') }}: {{ $item->created_at->diffForHumans() }}</small>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            {!! Theme::partial('sidebar') !!}
        </div>
    </div>
</div>
```

## Adding Custom Shortcodes

Shortcodes allow you to add dynamic content to pages and posts. To add a custom shortcode:

1. Register the shortcode in your service provider
2. Create a view for the shortcode

Example shortcode registration:

```php
Shortcode::register('foo-items', trans('plugins/foo::shortcodes.foo_items.name'), trans('plugins/foo::shortcodes.foo_items.description'), function ($shortcode) {
    $limit = $shortcode->limit ?: 6;
    $category = $shortcode->category;

    $items = Item::query()
        ->where('status', BaseStatusEnum::PUBLISHED)
        ->with('slugable')
        ->orderBy('created_at', 'DESC')
        ->limit($limit)
        ->withCount('comments')
        ->get();

    return view('plugins/foo::shortcodes.items', compact('items', 'shortcode'))->render();
}, [
    'name' => [
        'title' => trans('plugins/foo::shortcodes.foo_items.name'),
        'type' => 'text',
        'tab' => trans('core/base::forms.content'),
    ],
    'limit' => [
        'title' => trans('core/base::forms.limit'),
        'type' => 'number',
        'default_value' => 6,
        'tab' => trans('core/base::forms.content'),
    ],
    'category' => [
        'title' => trans('plugins/foo::shortcodes.foo_items.category'),
        'type' => 'customSelect',
        'source' => route('foo.categories.list'),
        'tab' => trans('core/base::forms.content'),
    ],
]);
```

Example shortcode view (`resources/views/shortcodes/items.blade.php`):

```php
<div class="foo-items">
    <h2>{{ $shortcode->name ?: trans('plugins/foo::foo.items') }}</h2>

    <div class="row">
        @foreach ($items as $item)
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <a href="{{ route('public.foo.detail', $item->slug) }}">
                        <img src="{{ RvMedia::getImageUrl($item->image, 'medium', false, RvMedia::getDefaultImage()) }}" class="card-img-top" alt="{{ $item->name }}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">
                            <a href="{{ route('public.foo.detail', $item->slug) }}">{{ $item->name }}</a>
                        </h5>
                        <p class="card-text">{{ Str::limit($item->description, 100) }}</p>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>
```

## Adding Custom Widgets

Widgets can be added to the dashboard or other areas of the admin panel. To add a widget:

1. Create a widget class in the `src/Widgets` directory
2. Register the widget in your service provider

Example widget (`src/Widgets/RecentItemsWidget.php`):

```php
<?php

namespace Botble\Foo\Widgets;

use Botble\Base\Widgets\Card;
use Botble\Foo\Models\Item;

class RecentItemsWidget extends Card
{
    public function __construct()
    {
        parent::__construct();

        $this->setTitle(trans('plugins/foo::foo.recent_items'));
        $this->setIcon('ti ti-box');
        $this->setColor('#f3c200');
        $this->setRoute(route('foo.index'));
        $this->setPermission('foo.index');
    }

    public function getStats(): int
    {
        return Item::query()->where('status', 'published')->count();
    }
}
```

Register in your service provider:

```php
public function boot(): void
{
    // ...

    add_filter(DASHBOARD_FILTER_ADMIN_LIST, function ($widgets) {
        return (new RecentItemsWidget())
            ->setColumn('col-md-3 col-sm-6')
            ->init($widgets);
    }, 9, 1);
}
```

## Adding Custom Widget Areas

To add a custom widget area:

1. Register the widget area in your service provider
2. Create a view for the widget area

Example widget area registration:

```php
if (is_plugin_active('widget')) {
    app(WidgetInterface::class)->registerSidebar([
        'id' => 'foo_sidebar',
        'name' => trans('plugins/foo::foo.widgets.sidebar_name'),
        'description' => trans('plugins/foo::foo.widgets.sidebar_description'),
    ]);
}
```

To display the widget area in your theme:

```php
{!! dynamic_sidebar('foo_sidebar') !!}
```

## Adding SEO Metadata

To add SEO metadata to your plugin's content:

1. Use the SeoHelper facade in your controllers
2. Add SEO fields to your forms

Example in a controller:

```php
public function show($slug)
{
    $item = Item::query()
        ->where(['slug' => $slug, 'status' => 'published'])
        ->first();

    if (!$item) {
        abort(404);
    }

    SeoHelper::setTitle($item->name)
        ->setDescription($item->description)
        ->setImage(RvMedia::getImageUrl($item->image))
        ->setUrl($item->url);

    return view('plugins/foo::themes.show', compact('item'));
}
```

Adding SEO fields to a form:

```php
->add('seo_meta', 'seoMeta', [
    'label' => trans('packages/seo-helper::seo-helper.meta_box_header'),
]);
```

## Adding Custom CSS and JavaScript

To add custom CSS and JavaScript:

1. Place your assets in the `public/vendor/your-plugin` directory
2. Register and load your assets in your service provider

Example in service provider:

```php
public function boot(): void
{
    // ...

    $this->app->booted(function () {
        add_action(BASE_ACTION_ENQUEUE_SCRIPTS, [$this, 'registerAssets'], 99);
    });
}

public function registerAssets(): void
{
    Assets::addStylesDirectly([
        'vendor/core/plugins/foo/css/foo.css',
    ])
    ->addScriptsDirectly([
        'vendor/core/plugins/foo/js/foo.js',
    ]);
}
```

To publish your assets during plugin installation:

```php
$this->publishes([
    __DIR__.'/../../resources/assets' => resource_path('vendor/core/plugins/foo'),
    __DIR__.'/../../public' => public_path('vendor/core/plugins/foo'),
], 'public');
```
