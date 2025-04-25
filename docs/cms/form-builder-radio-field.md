# Radio Field

The Radio field provides a set of radio buttons for selecting a single option from multiple choices.

```php
use Botble\Base\Forms\Fields\RadioField;
use Botble\Base\Forms\FieldOptions\RadioFieldOption;

$this->add(
    'field_name',
    RadioField::class,
    RadioFieldOption::make()
        ->label(__('Field label'))
        ->choices([
            'value1' => 'Label 1',
            'value2' => 'Label 2',
            'value3' => 'Label 3',
        ])
        ->defaultValue('value1')
);
```

Result:

![Form radio](./images/form-radio.png)

## Using with Enums

You can use PHP enums with radio fields for better type safety:

```php
use Botble\Base\Forms\Fields\RadioField;
use Botble\Base\Forms\FieldOptions\RadioFieldOption;
use App\Enums\PostFormat;

$this->add(
    'format',
    RadioField::class,
    RadioFieldOption::make()
        ->label(__('Format'))
        ->choices(PostFormat::labels())
        ->defaultValue(PostFormat::TEXT->value)
);
```