# Table Builder

## Introduction

The Table Builder is a powerful feature in Botble CMS that allows you to create and customize data tables with minimal effort. It provides a fluent API for defining columns, actions, filters, and more. Tables are used throughout the admin panel to display and manage data.

The table system is built on top of [DataTables](https://datatables.net/) and provides a clean, consistent interface for displaying and interacting with your data.

## Basic Usage

All tables in Botble CMS extend the `Botble\Table\Abstracts\TableAbstract` class. To create a table, you need to:

1. Create a new class that extends `TableAbstract`
2. Implement the `setup()` method to configure your table

Here's a basic example:

```php
<?php

namespace YourPlugin\Tables;

use Botble\Table\Abstracts\TableAbstract;
use Botble\Table\Columns\IdColumn;
use Botble\Table\Columns\NameColumn;
use Botble\Table\Columns\CreatedAtColumn;
use Botble\Table\Columns\StatusColumn;
use Botble\Table\Actions\EditAction;
use Botble\Table\Actions\DeleteAction;
use Botble\Table\BulkActions\DeleteBulkAction;
use Botble\Table\HeaderActions\CreateHeaderAction;
use YourPlugin\Models\YourModel;
use Illuminate\Database\Eloquent\Builder;

class YourModelTable extends TableAbstract
{
    public function setup(): void
    {
        $this
            ->model(YourModel::class)
            ->addColumns([
                IdColumn::make(),
                NameColumn::make()->route('your-model.edit'),
                CreatedAtColumn::make(),
                StatusColumn::make(),
            ])
            ->addHeaderAction(CreateHeaderAction::make()->route('your-model.create'))
            ->addActions([
                EditAction::make()->route('your-model.edit'),
                DeleteAction::make()->route('your-model.destroy'),
            ])
            ->addBulkAction(DeleteBulkAction::make()->permission('your-model.destroy'))
            ->addBulkChanges([
                NameBulkChange::make(),
                StatusBulkChange::make(),
                CreatedAtBulkChange::make(),
            ])
            ->queryUsing(function (Builder $query) {
                return $query
                    ->select([
                        'id',
                        'name',
                        'created_at',
                        'status',
                    ]);
            });
    }
}
```

## Table Configuration

### Setting the Model

Use the `model()` method to specify which model the table should use:

```php
$this->model(YourModel::class)
```

### Default Sorting

You can set the default sorting column and direction:

```php
$this->defaultSortColumnName = 'created_at';
$this->defaultSortDirection = 'desc';
```

## Columns

Columns are the core components of your table. Botble CMS provides several pre-built column types to make it easy to display different types of data.

### Adding Columns

Use the `addColumns()` method to add columns to your table:

```php
$this->addColumns([
    IdColumn::make(),
    NameColumn::make()->route('your-model.edit'),
    CreatedAtColumn::make(),
    StatusColumn::make(),
]);
```

### Available Column Types

Botble CMS provides many built-in column types:

- `IdColumn`: Displays the ID of the record
- `NameColumn`: Displays the name of the record (usually linked to the edit page)
- `ImageColumn`: Displays an image
- `CreatedAtColumn`: Displays the creation date
- `UpdatedAtColumn`: Displays the last update date
- `StatusColumn`: Displays the status with appropriate styling
- `FormattedColumn`: A customizable column that can display formatted data
- `LinkableColumn`: A column that can be linked to a route
- `Column`: A basic column that can be customized

### Customizing Columns

Each column type provides methods for customization:

```php
FormattedColumn::make('categories_name')
    ->title(trans('plugins/blog::posts.categories')) // Set column title
    ->width(150) // Set column width
    ->orderable(false) // Disable ordering
    ->searchable(false) // Disable searching
    ->getValueUsing(function (FormattedColumn $column) {
        // Custom logic to get the value
        return $column->getItem()->some_relation->name;
    })
    ->withEmptyState() // Show an empty state when no value is available
```

## Actions

Actions allow users to interact with the data in your table. There are three types of actions:

1. **Row Actions**: Actions that apply to a single row (e.g., Edit, Delete)
2. **Bulk Actions**: Actions that apply to multiple selected rows
3. **Header Actions**: Actions that appear in the table header (e.g., Create New)

### Row Actions

Add row actions using the `addActions()` method:

```php
$this->addActions([
    EditAction::make()->route('your-model.edit'),
    DeleteAction::make()->route('your-model.destroy'),
]);
```

### Bulk Actions

Add bulk actions using the `addBulkActions()` method:

```php
$this->addBulkActions([
    DeleteBulkAction::make()->permission('your-model.destroy'),
]);
```

### Header Actions

Add header actions using the `addHeaderAction()` method:

```php
$this->addHeaderAction(CreateHeaderAction::make()->route('your-model.create'));
```

## Bulk Changes

Bulk changes allow users to update multiple records at once. Add bulk changes using the `addBulkChanges()` method:

```php
$this->addBulkChanges([
    NameBulkChange::make(),
    StatusBulkChange::make(),
    CreatedAtBulkChange::make(),
    SelectBulkChange::make()
        ->name('category')
        ->title(trans('plugins/blog::posts.category'))
        ->searchable()
        ->choices(fn () => Category::query()->pluck('name', 'id')->all()),
]);
```

## Query Customization

### Basic Query Customization

Use the `queryUsing()` method to customize the query that fetches data for your table:

```php
$this->queryUsing(function (Builder $query) {
    return $query
        ->with(['relation1', 'relation2']) // Eager load relations
        ->select([
            'id',
            'name',
            'created_at',
            'status',
        ]);
});
```

### Advanced Query Customization

For more advanced query customization, you can use the `onAjax()` method:

```php
$this->onAjax(function (self $table) {
    return $table->toJson(
        $table
            ->table
            ->eloquent($table->query())
            ->filter(function ($query) {
                if ($keyword = $this->request->input('search.value')) {
                    $keyword = '%' . $keyword . '%';
                    return $query
                        ->where('name', 'LIKE', $keyword)
                        ->orWhereHas('relation', function ($subQuery) use ($keyword) {
                            return $subQuery->where('name', 'LIKE', $keyword);
                        });
                }
                return $query;
            })
    );
});
```

### Custom Filtering

Use the `onFilterQuery()` method to handle custom filtering:

```php
$this->onFilterQuery(
    function (
        EloquentBuilder|QueryBuilder|EloquentRelation $query,
        string $key,
        string $operator,
        ?string $value
    ) {
        if (!$value || $key !== 'custom_filter') {
            return false;
        }

        return $query->whereHas(
            'relation',
            fn (BaseQueryBuilder $query) => $query->where('relation.field', $value)
        );
    }
);
```

## Real-World Example

Here's a real-world example from the Blog plugin's PostTable:

```php
class PostTable extends TableAbstract
{
    public function setup(): void
    {
        $this->defaultSortColumnName = 'created_at';

        $this
            ->model(Post::class)
            ->addHeaderAction(CreateHeaderAction::make()->route('posts.create'))
            ->addActions([
                EditAction::make()->route('posts.edit'),
                DeleteAction::make()->route('posts.destroy'),
            ])
            ->addColumns([
                IdColumn::make(),
                ImageColumn::make(),
                NameColumn::make()->route('posts.edit'),
                FormattedColumn::make('categories_name')
                    ->title(trans('plugins/blog::posts.categories'))
                    ->width(150)
                    ->orderable(false)
                    ->searchable(false)
                    ->getValueUsing(function (FormattedColumn $column) {
                        $categories = $column
                            ->getItem()
                            ->categories
                            ->sortBy('name')
                            ->map(function (Category $category) {
                                return Html::link(route('categories.edit', $category->getKey()), $category->name, ['target' => '_blank']);
                            })
                            ->all();

                        return implode(', ', $categories);
                    })
                    ->withEmptyState(),
                FormattedColumn::make('author_id')
                    ->title(trans('plugins/blog::posts.author'))
                    ->width(150)
                    ->orderable(false)
                    ->searchable(false)
                    ->getValueUsing(function (FormattedColumn $column) {
                        return $column->getItem()->author_name;
                    })
                    ->renderUsing(function (FormattedColumn $column) {
                        $url = $column->getItem()->author_url;

                        if (! $url) {
                            return null;
                        }

                        return Html::link($url, $column->getItem()->author_name, ['target' => '_blank']);
                    })
                    ->withEmptyState(),
                CreatedAtColumn::make(),
                StatusColumn::make(),
            ])
            ->addBulkActions([
                DeleteBulkAction::make()->permission('posts.destroy'),
            ])
            ->addBulkChanges([
                NameBulkChange::make(),
                StatusBulkChange::make(),
                CreatedAtBulkChange::make(),
                SelectBulkChange::make()
                    ->name('category')
                    ->title(trans('plugins/blog::posts.category'))
                    ->searchable()
                    ->choices(fn () => Category::query()->pluck('name', 'id')->all()),
                IsFeaturedBulkChange::make(),
            ])
            ->queryUsing(function (Builder $query) {
                return $query
                    ->with([
                        'categories' => function (BelongsToMany $query): void {
                            $query->select(['categories.id', 'categories.name']);
                        },
                        'author',
                    ])
                    ->select([
                        'id',
                        'name',
                        'image',
                        'created_at',
                        'status',
                        'updated_at',
                        'author_id',
                        'author_type',
                    ]);
            });
    }
}
```

## Conclusion

The Table Builder in Botble CMS provides a powerful and flexible way to create and customize data tables. By leveraging the provided column types, actions, and query customization methods, you can create rich, interactive tables with minimal effort.

For more examples, look at the table implementations in the core plugins, such as the Blog, Page, and User plugins.
