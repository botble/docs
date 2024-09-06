# Input Fields

## Text Field

The text input allows you to interact with a string:

```php
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\FieldOptions\TextFieldOption;

$this
    ->add('name', TextField::class, TextFieldOption::make());
```

Result:

![Text Field](./images/form-text.png)

## Methods

```php
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\FieldOptions\TextFieldOption;

$this
    ->add(
        'name', 
        TextField::class, 
        TextFieldOption::make()
            ->required() // Required field
            ->label('Name') // Field label
            ->append('append') // Append text/HTML
            ->prepend('prepend') // Prepend text/HTML
            ->helpText('Helper text') // Instruction for user
            ->placeholder('Enter your name') // Placeholder text
            ->value('John Doe') // Default value
            ->labelAttributes(['class' => 'control-label']) // Label attributes
            ->attributes(['class' => 'form-control']) // Field attributes
            ->wrapperAttributes(['class' => 'form-group']) // Wrapper attributes
            ->metadata() // If it's a custom field, not in the model table, you can use this method to store it in table meta_boxes
            ->disabled() // Disable field
            ...
            
    );
```

::: info
The same as other input fields, you can use the same methods as the text field.
:::


## Textarea Field

```php
use Botble\Base\Forms\Fields\TextareaField;
use Botble\Base\Forms\FieldOptions\TextareaFieldOption;

$this->add('description', TextareaField::class, TextareaFieldOption::make());
```

Result:

![Textarea Field](./images/form-textarea.png)

## Number Field

```php
use Botble\Base\Forms\Fields\NumberField;
use Botble\Base\Forms\FieldOptions\NumberFieldOption;

$this->add('limit', NumberField::class, NumberFieldOption::make());
```

Result:

![Number Field](./images/form-number.png)

## Number field with jQuery input mask

```php
use Botble\Base\Facades\Assets;
use Botble\Base\Forms\Fields\TextField;
use Botble\Member\Forms\Fronts\Auth\FieldOptions\TextFieldOption;

public function setup(): void
{
    Assets::addScripts(['input-mask']); // add jQuery input mask
    
    $this->add(
        'price',
        TextField::class, // Must be a text field, not number field
        TextFieldOption::make()
            ->addAttribute('class', 'form-control input-mask-number')
    );
}
```

Result:

![Input mask number Field](./images/form-input-mask-number.png)

## Password Field

```php
use Botble\Base\Forms\Fields\PasswordField;
use Botble\Base\Forms\FieldOptions\TextFieldOption;

$this->add('password', PasswordField::class, TextFieldOption::make());
```

Result:

![Password Field](./images/form-password.png)

## Color Field

```php
use Botble\Base\Forms\Fields\ColorField;
use Botble\Base\Forms\FieldOptions\ColorFieldOption;

$this->add('color', ColorField::class, ColorFieldOption::make());
```

Result:

![Color Field](./images/form-color.png)

## Time Field

```php
use Botble\Base\Forms\Fields\TimeField;
use Botble\Base\Forms\FieldOptions\TextFieldOption;

$this->add('time', TimeField::class, TextFieldOption::make());
```

Result:

![Time Field](./images/form-time.png)

## Time field with jquery time picker

```php
use Botble\Base\Forms\Fields\TimePickerField;
use Botble\Base\Forms\FieldOptions\TextFieldOption;

$this->add('time', TimePickerField::class, TextFieldOption::make());
```

Result:

![Timepicker Field](./images/form-time-picker.png)

## Date picker field

```php
use Botble\Base\Forms\Fields\DatePickerField;
use Botble\Base\Forms\FieldOptions\DatePickerFieldOption;

$this->add('date', DatePickerField::class, DatePickerFieldOption::make());
```

Result:

![Datepicker Field](./images/form-date-picker.png)