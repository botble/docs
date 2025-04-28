# Advanced Components

This guide covers the advanced components that can be used in a Botble CMS plugin.

## Source Code

The `src` directory contains the PHP source code for your plugin, organized into subdirectories by purpose.

### Models

Models represent database tables and define relationships between entities. They are located in the `src/Models` directory.

Example (`src/Models/Item.php`):

```php
<?php

namespace Botble\Foo\Models;

use Botble\Base\Casts\SafeContent;
use Botble\Base\Enums\BaseStatusEnum;
use Botble\Base\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Item extends BaseModel
{
    protected $table = 'foo_items';

    protected $fillable = [
        'name',
        'description',
        'content',
        'status',
        'user_id',
        'image',
    ];

    protected $casts = [
        'status' => BaseStatusEnum::class,
        'name' => SafeContent::class,
        'description' => SafeContent::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(\Botble\ACL\Models\User::class, 'user_id');
    }
}
```

### Controllers

Controllers handle HTTP requests and return responses. They are located in the `src/Http/Controllers` directory.

Example (`src/Http/Controllers/ItemController.php`):

```php
<?php

namespace Botble\Foo\Http\Controllers;

use Botble\Base\Events\CreatedContentEvent;
use Botble\Base\Events\DeletedContentEvent;
use Botble\Base\Events\UpdatedContentEvent;
use Botble\Base\Http\Controllers\BaseController;
use Botble\Base\Http\Responses\BaseHttpResponse;
use Botble\Foo\Forms\ItemForm;
use Botble\Foo\Http\Requests\ItemRequest;
use Botble\Foo\Models\Item;
use Botble\Foo\Tables\ItemTable;
use Exception;
use Illuminate\Http\Request;

class ItemController extends BaseController
{
    public function index(ItemTable $table)
    {
        $this->pageTitle(trans('plugins/foo::items.name'));

        return $table->renderTable();
    }

    public function create()
    {
        $this->pageTitle(trans('plugins/foo::items.create'));

        return ItemForm::create()->renderForm();
    }

    public function store(ItemRequest $request, BaseHttpResponse $response)
    {
        $item = Item::query()->create($request->validated());

        event(new CreatedContentEvent(FOO_MODULE_SCREEN_NAME, $request, $item));

        return $response
            ->setPreviousUrl(route('foo.index'))
            ->setNextUrl(route('foo.edit', $item->id))
            ->setMessage(trans('core/base::notices.create_success_message'));
    }

    public function edit(Item $item)
    {
        $this->pageTitle(trans('plugins/foo::items.edit') . ' "' . $item->name . '"');

        return ItemForm::createFromModel($item)->renderForm();
    }

    public function update(Item $item, ItemRequest $request, BaseHttpResponse $response)
    {
        $item->update($request->validated());

        event(new UpdatedContentEvent(FOO_MODULE_SCREEN_NAME, $request, $item));

        return $response
            ->setPreviousUrl(route('foo.index'))
            ->setMessage(trans('core/base::notices.update_success_message'));
    }

    public function destroy(Item $item, Request $request, BaseHttpResponse $response)
    {
        try {
            $item->delete();

            event(new DeletedContentEvent(FOO_MODULE_SCREEN_NAME, $request, $item));

            return $response->setMessage(trans('core/base::notices.delete_success_message'));
        } catch (Exception $exception) {
            return $response
                ->setError()
                ->setMessage($exception->getMessage());
        }
    }
}
```

### Requests

Requests handle validation of form submissions. They are located in the `src/Http/Requests` directory.

Example (`src/Http/Requests/ItemRequest.php`):

```php
<?php

namespace Botble\Foo\Http\Requests;

use Botble\Base\Enums\BaseStatusEnum;
use Botble\Support\Http\Requests\Request;
use Illuminate\Validation\Rule;

class ItemRequest extends Request
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:400',
            'content' => 'nullable|string',
            'status' => Rule::in(BaseStatusEnum::values()),
            'image' => 'nullable|string|max:255',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => trans('plugins/foo::items.form.name'),
            'description' => trans('plugins/foo::items.form.description'),
            'content' => trans('plugins/foo::items.form.content'),
            'status' => trans('core/base::tables.status'),
            'image' => trans('core/base::forms.image'),
        ];
    }
}
```

### Forms

Forms handle the creation and editing of models. They are located in the `src/Forms` directory.

Example (`src/Forms/ItemForm.php`):

```php
<?php

namespace Botble\Foo\Forms;

use Botble\Base\Enums\BaseStatusEnum;
use Botble\Base\Forms\FieldOptions\TextFieldOption;
use Botble\Base\Forms\FieldOptions\TextareaFieldOption;
use Botble\Base\Forms\FieldOptions\SelectFieldOption;
use Botble\Base\Forms\FieldOptions\MediaImageFieldOption;
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\Fields\TextareaField;
use Botble\Base\Forms\Fields\SelectField;
use Botble\Base\Forms\Fields\MediaImageField;
use Botble\Base\Forms\Fields\EditorField;
use Botble\Base\Forms\FormAbstract;
use Botble\Foo\Http\Requests\ItemRequest;
use Botble\Foo\Models\Item;

class ItemForm extends FormAbstract
{
    public function buildForm(): void
    {
        $this
            ->setupModel(new Item())
            ->setValidatorClass(ItemRequest::class)
            ->withCustomFields()
            ->add('name', TextField::class, TextFieldOption::make()
                ->label(trans('core/base::forms.name'))
                ->placeholder(trans('core/base::forms.name_placeholder'))
                ->required()
            )
            ->add('description', TextareaField::class, TextareaFieldOption::make()
                ->label(trans('core/base::forms.description'))
                ->placeholder(trans('core/base::forms.description_placeholder'))
                ->rows(4)
            )
            ->add('content', EditorField::class, [
                'label' => trans('core/base::forms.content'),
                'placeholder' => trans('core/base::forms.content_placeholder'),
                'rows' => 4,
            ])
            ->add('status', SelectField::class, SelectFieldOption::make()
                ->label(trans('core/base::tables.status'))
                ->choices(BaseStatusEnum::labels())
            )
            ->add('image', MediaImageField::class, MediaImageFieldOption::make()
                ->label(trans('core/base::forms.image'))
            )
            ->setBreakFieldPoint('status');
    }
}
```

### Tables

Tables handle the display of data in the admin panel. They are located in the `src/Tables` directory.

Example (`src/Tables/ItemTable.php`):

```php
<?php

namespace Botble\Foo\Tables;

use Botble\Base\Enums\BaseStatusEnum;
use Botble\Foo\Models\Item;
use Botble\Table\Abstracts\TableAbstract;
use Botble\Table\Actions\DeleteAction;
use Botble\Table\Actions\EditAction;
use Botble\Table\BulkActions\DeleteBulkAction;
use Botble\Table\Columns\CreatedAtColumn;
use Botble\Table\Columns\IdColumn;
use Botble\Table\Columns\NameColumn;
use Botble\Table\Columns\StatusColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;

class ItemTable extends TableAbstract
{
    public function setup(): void
    {
        $this
            ->model(Item::class)
            ->addActions([
                EditAction::make()
                    ->route('foo.edit'),
                DeleteAction::make()
                    ->route('foo.destroy'),
            ]);
    }

    public function columns(): array
    {
        return [
            IdColumn::make(),
            NameColumn::make()->route('foo.edit'),
            CreatedAtColumn::make(),
            StatusColumn::make(),
        ];
    }

    public function buttons(): array
    {
        return $this->addCreateButton(route('foo.create'));
    }

    public function bulkActions(): array
    {
        return [
            DeleteBulkAction::make()->permission('foo.destroy'),
        ];
    }

    public function getFilters(): array
    {
        return [
            'name' => [
                'title' => trans('core/base::tables.name'),
                'type' => 'text',
                'validate' => 'required|string|max:120',
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
}
```



## Creating Custom Database Seeders

Seeders are useful for populating your database with test data or default content. To create a custom seeder for your plugin:

1. Create a seeder class in the `database/seeders` directory
2. Register the seeder in your plugin's service provider

Example seeder registration in your service provider:

```php
if (app()->environment() !== 'production') {
    $this->app->register(
        \Botble\Foo\Database\Seeders\FooSeederProvider::class
    );
}
```

## Creating Commands

You can add custom Artisan commands to your plugin by creating command classes in the `src/Commands` directory.

Example command class (`src/Commands/GenerateFooCommand.php`):

```php
<?php

namespace Botble\Foo\Commands;

use Illuminate\Console\Command;

class GenerateFooCommand extends Command
{
    protected $signature = 'foo:generate {name : The name of the item}';

    protected $description = 'Generate a new foo item';

    public function handle(): int
    {
        $name = $this->argument('name');

        // Your command logic here
        $this->info("Generated new foo item: {$name}");

        return self::SUCCESS;
    }
}
```

Register the command in your service provider:

```php
if ($this->app->runningInConsole()) {
    $this->commands([
        \Botble\Foo\Commands\GenerateFooCommand::class,
    ]);
}
```

## Creating Events and Listeners

Events and listeners allow you to decouple various aspects of your application. To add events to your plugin:

1. Create event classes in the `src/Events` directory
2. Create listener classes in the `src/Listeners` directory
3. Register them in an event service provider

Example event (`src/Events/FooCreated.php`):

```php
<?php

namespace Botble\Foo\Events;

use Botble\Foo\Models\Item;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class FooCreated
{
    use Dispatchable, SerializesModels;

    public function __construct(public Item $item)
    {
    }
}
```

Example listener (`src/Listeners/SendFooCreatedNotification.php`):

```php
<?php

namespace Botble\Foo\Listeners;

use Botble\Foo\Events\FooCreated;

class SendFooCreatedNotification
{
    public function handle(FooCreated $event): void
    {
        // Send notification logic here
    }
}
```

Register in an event service provider (`src/Providers/EventServiceProvider.php`):

```php
<?php

namespace Botble\Foo\Providers;

use Botble\Foo\Events\FooCreated;
use Botble\Foo\Listeners\SendFooCreatedNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        FooCreated::class => [
            SendFooCreatedNotification::class,
        ],
    ];
}
```

Then register this provider in your main service provider:

```php
public function register(): void
{
    $this->app->register(EventServiceProvider::class);
}
```

## Creating Middleware

Middleware provides a convenient mechanism for filtering HTTP requests entering your application. To add middleware to your plugin:

1. Create middleware classes in the `src/Http/Middleware` directory
2. Register them in your service provider

Example middleware (`src/Http/Middleware/CheckFooPermission.php`):

```php
<?php

namespace Botble\Foo\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckFooPermission
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::user()->hasPermission('foo.index')) {
            return redirect()->route('dashboard.index');
        }

        return $next($request);
    }
}
```

Register in your service provider:

```php
protected function registerMiddlewares(): void
{
    $this->app['router']->aliasMiddleware('foo.permission', \Botble\Foo\Http\Middleware\CheckFooPermission::class);
}

public function boot(): void
{
    // ...
    $this->registerMiddlewares();
}
```

## Creating Facades

Facades provide a static interface to classes that are available in the application's service container. To create a facade for your plugin:

1. Create a facade class in the `src/Facades` directory
2. Register the underlying class in your service provider

Example facade (`src/Facades/FooHelper.php`):

```php
<?php

namespace Botble\Foo\Facades;

use Botble\Foo\Supports\FooHelper as FooHelperSupport;
use Illuminate\Support\Facades\Facade;

/**
 * @method static array getItems(array $args = [])
 *
 * @see \Botble\Foo\Supports\FooHelper
 */
class FooHelper extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'foo-helper';
    }
}
```

Implementation class (`src/Supports/FooHelper.php`):

```php
<?php

namespace Botble\Foo\Supports;

use Botble\Foo\Models\Item;

class FooHelper
{
    public function getItems(array $args = []): array
    {
        return Item::query()
            ->where('status', 'published')
            ->orderBy('created_at', 'DESC')
            ->with($args['with'] ?? [])
            ->limit($args['limit'] ?? 10)
            ->get()
            ->toArray();
    }
}
```

Register in your service provider:

```php
public function register(): void
{
    $this->app->bind('foo-helper', function () {
        return new FooHelper();
    });
}
```
