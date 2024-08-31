# Input Fields

## Text Field

The text input allows you to interact with a string:

```php
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\FieldOptions\TextFieldOption;

->add('name', TextField::class, TextFieldOption::make())
```

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

## Textarea Field

```php
use Botble\Base\Forms\Fields\TextareaField;
use Botble\Base\Forms\FieldOptions\TextareaFieldOption;

$this->add('description', TextareaField::class, TextareaFieldOption::make());
```

## Number Field

```php
use Botble\Base\Forms\Fields\NumberField;
use Botble\Base\Forms\FieldOptions\NumberFieldOption;

$this->add('limit', NumberField::class, NumberFieldOption::make());
```

## Password Field

```php
use Botble\Base\Forms\Fields\PasswordField;
use Botble\Base\Forms\FieldOptions\PasswordFieldOption;

$this->add('password', PasswordField::class, PasswordFieldOption::make());
```

::: info
The same as other input fields, you can use the same methods as the text field.
:::

...