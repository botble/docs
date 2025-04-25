# On/Off Field

Botble CMS provides two types of on/off fields: `OnOffField` and `OnOffCheckboxField`.

## OnOffField

The OnOffField provides a toggle switch for boolean values.

```php
use Botble\Base\Forms\Fields\OnOffField;
use Botble\Base\Forms\FieldOptions\OnOffFieldOption;

$this->add(
    'status',
    OnOffField::class,
    OnOffFieldOption::make()
        ->label(__('Status'))
        ->defaultValue(true)
);
```

Result:

![On/Off Field](./images/form-on-off.png)

## OnOffCheckboxField

The OnOffCheckboxField provides a checkbox styled as a toggle switch.

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

Result:

![On/Off Checkbox Field](./images/form-on-off-checkbox.png)