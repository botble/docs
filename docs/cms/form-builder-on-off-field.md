# On/Off Field

```php
use Botble\Base\Forms\Fields\OnOffCheckboxField;
use Botble\Base\Forms\FieldOptions\OnOffCheckboxFieldOption;

$this->add(
    'field_name', 
    OnOffCheckboxField::class, 
    OnOffCheckboxFieldOption::make()
        ->label(__('Field label'))
        ->checked($this->model ? $this->model->field_name : 1) // Default checked value
        ->required() // Add class "required" if that is mandatory field
        ->value(1) // Value when checked (optional, default is 1)
);
```