## Multi Check List Field

The multi check list field provides a list of checkboxes for selecting multiple options.

```php
use Botble\Base\Forms\Fields\MultiCheckListField;
use Botble\Base\Forms\FieldOptions\MultiCheckListFieldOption;

$this->add(
    'permissions', 
    MultiCheckListField::class, 
    MultiCheckListFieldOption::make()
        ->label(__('Permissions'))
        ->choices([
            'create' => __('Create'),
            'read' => __('Read'),
            'update' => __('Update'),
            'delete' => __('Delete'),
        ])
        ->value(['read', 'update']) // Default selected values
);
```

## Checkbox Field

The checkbox field provides a single checkbox for boolean values.

```php
use Botble\Base\Forms\Fields\CheckboxField;
use Botble\Base\Forms\FieldOptions\CheckboxFieldOption;

$this->add(
    'is_featured', 
    CheckboxField::class, 
    CheckboxFieldOption::make()
        ->label(__('Is Featured'))
        ->value(1)
        ->checked($this->model && $this->model->is_featured)
);
```

## Google Fonts Field

The Google Fonts field provides a select dropdown with all available Google Fonts.

```php
use Botble\Base\Forms\Fields\GoogleFontsField;
use Botble\Base\Forms\FieldOptions\GoogleFontsFieldOption;

$this->add(
    'font', 
    GoogleFontsField::class, 
    GoogleFontsFieldOption::make()
        ->label(__('Font'))
);
```

## UI Selector Field

The UI selector field provides a visual selection interface with images or icons.

```php
use Botble\Base\Forms\Fields\UiSelectorField;
use Botble\Base\Forms\FieldOptions\UiSelectorFieldOption;

$this->add(
    'layout', 
    UiSelectorField::class, 
    UiSelectorFieldOption::make()
        ->label(__('Layout'))
        ->choices([
            'layout-1' => [
                'label' => __('Layout 1'),
                'image' => url('images/layouts/layout-1.png'),
            ],
            'layout-2' => [
                'label' => __('Layout 2'),
                'image' => url('images/layouts/layout-2.png'),
            ],
        ])
);
```

## Tree Category Field

The tree category field provides a hierarchical tree view for selecting categories.

```php
use Botble\Base\Forms\Fields\TreeCategoryField;
use Botble\Base\Forms\FieldOptions\TreeCategoryFieldOption;

$this->add(
    'categories', 
    TreeCategoryField::class, 
    TreeCategoryFieldOption::make()
        ->label(__('Categories'))
        ->model(Category::class)
        ->selectedCategories($this->model ? $this->model->categories()->pluck('category_id')->all() : [])
);
```
