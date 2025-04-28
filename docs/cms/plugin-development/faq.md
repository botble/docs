# Frequently Asked Questions

This page provides answers to common questions about plugin development in Botble CMS.

## General Questions

### How do I add a settings page for my plugin?

To add a settings page:

1. Create a controller method to handle the settings form
2. Register a route for the settings page
3. Add the settings page to the CMS settings menu

Example controller methods:

```php
public function getSettings()
{
    $this->pageTitle(trans('plugins/foo::foo.settings'));

    return view('plugins/foo::settings', [
        'itemsPerPage' => setting('foo_items_per_page', 10),
        'displayAuthor' => setting('foo_display_author', true),
    ]);
}

public function postSettings(Request $request, BaseHttpResponse $response)
{
    setting([
        'foo_items_per_page' => $request->input('foo_items_per_page'),
        'foo_display_author' => $request->input('foo_display_author'),
    ])->save();

    return $response
        ->setMessage(trans('core/base::notices.update_success_message'));
}
```

Add to settings menu in your service provider:

```php
if (defined('SETTING_MODULE_SCREEN_NAME')) {
    add_filter('cms_settings_pages', function ($pages) {
        return array_merge($pages, [
            'foo' => [
                'name' => 'plugins/foo::foo.settings',
                'icon' => 'ti ti-box',
                'view' => 'plugins/foo::settings',
                'route' => 'foo.settings',
            ],
        ]);
    });
}
```

### How do I add custom validation rules?

To add custom validation rules:

1. Create a rule class in the `src/Rules` directory
2. Use the rule in your request classes

Example rule (`src/Rules/UniqueItemSlug.php`):

```php
<?php

namespace Botble\Foo\Rules;

use Botble\Foo\Models\Item;
use Illuminate\Contracts\Validation\Rule;

class UniqueItemSlug implements Rule
{
    protected int $itemId;

    public function __construct(int $itemId = 0)
    {
        $this->itemId = $itemId;
    }

    public function passes($attribute, $value): bool
    {
        $item = Item::query()->where('slug', $value)->first();

        if (!$item) {
            return true;
        }

        if ($item->id === $this->itemId) {
            return true;
        }

        return false;
    }

    public function message(): string
    {
        return trans('plugins/foo::validation.slug_unique');
    }
}
```

Usage in a request class:

```php
public function rules(): array
{
    return [
        'slug' => ['required', 'string', 'max:255', new UniqueItemSlug($this->route('item'))],
    ];
}
```

### How do I add a custom action button to a table?

To add a custom action button to a table:

1. Create a custom action class in the `src/Tables/Actions` directory
2. Add the action to your table's `addActions()` method

Example custom action (`src/Tables/Actions/DuplicateAction.php`):

```php
<?php

namespace Botble\Foo\Tables\Actions;

use Botble\Table\Actions\Action;

class DuplicateAction extends Action
{
    public static function make(string $name = 'duplicate'): static
    {
        return parent::make($name)
            ->label(trans('plugins/foo::foo.duplicate'))
            ->color('primary')
            ->icon('ti ti-copy')
            ->attributes([
                'data-action' => 'duplicate',
            ]);
    }
}
```

Add to your table class:

```php
public function setup(): void
{
    $this
        ->model(Item::class)
        ->addActions([
            EditAction::make()
                ->route('foo.edit'),
            DuplicateAction::make()
                ->route('foo.duplicate'),
            DeleteAction::make()
                ->route('foo.destroy'),
        ]);
}
```

### How do I add a relationship between my plugin's models?

To add relationships between models:

1. Define the relationship methods in your model classes
2. Set up the necessary foreign keys in your migrations

Example one-to-many relationship:

In your migration:

```php
Schema::create('foo_categories', function (Blueprint $table) {
    $table->id();
    $table->string('name', 255);
    $table->string('slug', 255)->unique();
    $table->string('status', 60)->default('published');
    $table->timestamps();
});

Schema::create('foo_items', function (Blueprint $table) {
    $table->id();
    $table->string('name', 255);
    $table->string('description', 400)->nullable();
    $table->longText('content')->nullable();
    $table->string('status', 60)->default('published');
    $table->foreignId('category_id')->nullable()->references('id')->on('foo_categories')->onDelete('set null');
    $table->timestamps();
});
```

In your Category model:

```php
public function items(): HasMany
{
    return $this->hasMany(Item::class, 'category_id');
}
```

In your Item model:

```php
public function category(): BelongsTo
{
    return $this->belongsTo(Category::class, 'category_id');
}
```

### How do I create a plugin that depends on another plugin?

To create a plugin that depends on another plugin:

1. Check for the dependency in your plugin's service provider
2. Register your plugin's services conditionally

Example dependency check:

```php
public function register(): void
{
    if (!is_plugin_active('other-plugin')) {
        return;
    }

    // Register your plugin's services here
}
```

## Frontend Integration

### How do I display my plugin's content on the frontend?

To display your plugin's content on the frontend:

1. Create a public controller in your plugin
2. Register routes for the public controller
3. Create views in the theme directory

Example public controller:

```php
<?php

namespace Botble\Foo\Http\Controllers;

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

        return Theme::scope('foo.index', compact('items'))->render();
    }
}
```

### How do I add custom meta boxes to my plugin's forms?

To add custom meta boxes:

1. Add the meta box fields to your form class
2. Create a migration for the meta data table
3. Add the meta data relationship to your model

Example meta box in form:

```php
->add('metadata', 'custom_html', [
    'label' => trans('plugins/foo::foo.metadata'),
    'wrapper' => [
        'class' => 'form-group col-md-12',
    ],
    'html' => '<div class="row"><div class="col-md-6">',
])
->add('meta_title', 'text', [
    'label' => trans('core/base::forms.meta_title'),
    'wrapper' => [
        'class' => 'form-group col-md-6',
    ],
    'value' => $this->getModel()->meta_title,
])
->add('meta_description', 'textarea', [
    'label' => trans('core/base::forms.meta_description'),
    'wrapper' => [
        'class' => 'form-group col-md-6',
    ],
    'value' => $this->getModel()->meta_description,
    'attributes' => [
        'rows' => 3,
    ],
])
->add('meta_keywords', 'text', [
    'label' => trans('core/base::forms.meta_keywords'),
    'wrapper' => [
        'class' => 'form-group col-md-6',
    ],
    'value' => $this->getModel()->meta_keywords,
])
->add('metadata_end', 'custom_html', [
    'html' => '</div></div>',
])
```

In your model, add the meta attributes:

```php
/**
 * @var array
 */
protected $fillable = [
    'name',
    'description',
    'content',
    'status',
    'category_id',
    'image',
    'meta_title',
    'meta_description',
    'meta_keywords',
];
```

## Advanced Questions

### How do I add a custom filter to a table?

To add a custom filter to a table:

1. Override the `getFilters()` method in your table class
2. Add your custom filter logic

Example custom filter:

```php
public function getFilters(): array
{
    return [
        'category_id' => [
            'title' => trans('plugins/foo::foo.category'),
            'type' => 'select',
            'choices' => app(CategoryInterface::class)->pluck('name', 'id'),
            'validate' => 'required|integer',
        ],
        'status' => [
            'title' => trans('core/base::tables.status'),
            'type' => 'select',
            'choices' => BaseStatusEnum::labels(),
            'validate' => 'required|in:' . implode(',', BaseStatusEnum::values()),
        ],
        'created_at' => [
            'title' => trans('core/base::tables.created_at'),
            'type' => 'date',
        ],
    ];
}

public function applyFilterCondition($query, string $key, string $operator, ?string $value)
{
    switch ($key) {
        case 'category_id':
            if (!$value) {
                break;
            }

            return $query->whereHas('categories', function ($query) use ($value) {
                return $query->where('foo_item_categories.category_id', $value);
            });

        default:
            return parent::applyFilterCondition($query, $key, $operator, $value);
    }
}
```

### How do I add a custom widget area?

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

### How do I add custom CSS and JavaScript to my plugin?

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

### How do I add a custom shortcode?

To add a custom shortcode:

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
