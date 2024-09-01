# Select Field

```php

use Botble\Base\Forms\Fields\SelectField;
use Botble\Base\Forms\FieldOptions\SelectFieldOption;

$this->add(
    'status', 
    SelectField::class, 
    SelectFieldOption::make()
        ->label(__('Status'))
        ->choices([
            1 => __('Active'),
            0 => __('Inactive'),
        ])
        ->selected($this->model ? $this->model->status : 1) // Default selected value
        ->required() // Add class "required" if that is mandatory field 
        ->emptyValue(__('Please select status')) // Add empty value
        ->multiple() // If it is multiple select
        ->searchable() // Add searchable feature
        ->ajaxSearch() // If you want to load options via ajax
        ->ajaxUrl(route('your.route.name')) // Set ajax search url
        ->allowClear() // Add clear button (only work with searchable select)
)    

```