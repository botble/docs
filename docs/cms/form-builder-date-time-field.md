# Date & Time Fields

## Date Field

The date field provides a simple HTML5 date input.

```php
use Botble\Base\Forms\Fields\DateField;
use Botble\Base\Forms\FieldOptions\InputFieldOption;

$this->add(
    'date',
    DateField::class,
    InputFieldOption::make()
        ->label(__('Date'))
);
```

## Date Picker Field

The date picker field provides a date picker with a calendar interface using Flatpickr.

```php
use Botble\Base\Forms\Fields\DatePickerField;
use Botble\Base\Forms\FieldOptions\DatePickerFieldOption;

$this->add(
    'date',
    DatePickerField::class,
    DatePickerFieldOption::make()
        ->label(__('Date'))
);
```

Result:

![Date Picker Field](./images/form-date-picker.png)

### Date Picker with Time

To enable time selection alongside the date, use the `withTimePicker()` method:

```php
use Botble\Base\Forms\Fields\DatePickerField;
use Botble\Base\Forms\FieldOptions\DatePickerFieldOption;

$this->add(
    'published_at',
    DatePickerField::class,
    DatePickerFieldOption::make()
        ->label(__('Published At'))
        ->withTimePicker()
);
```

This will enable time selection with format `Y-m-d H:i:s`.

## Datetime Field

The datetime field provides a simple HTML5 datetime-local input.

```php
use Botble\Base\Forms\Fields\DatetimeField;
use Botble\Base\Forms\FieldOptions\InputFieldOption;

$this->add(
    'datetime',
    DatetimeField::class,
    InputFieldOption::make()
        ->label(__('Date & Time'))
);
```

::: tip
For a better user experience with calendar interface, use `DatePickerField` with `withTimePicker()` instead.
:::

## Time Field

The time field provides a simple HTML5 time input.

```php
use Botble\Base\Forms\Fields\TimeField;
use Botble\Base\Forms\FieldOptions\InputFieldOption;

$this->add(
    'time',
    TimeField::class,
    InputFieldOption::make()
        ->label(__('Time'))
);
```

## Time Picker Field

The time picker field provides a time picker with a dropdown interface.

```php
use Botble\Base\Forms\Fields\TimePickerField;
use Botble\Base\Forms\FieldOptions\InputFieldOption;

$this->add(
    'time',
    TimePickerField::class,
    InputFieldOption::make()
        ->label(__('Time'))
);
```

Result:

![Time Picker Field](./images/form-time-picker.png)
