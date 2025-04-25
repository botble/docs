# Special Fields

## Email Field

The email field provides an input specifically for email addresses with validation.

```php
use Botble\Base\Forms\Fields\EmailField;
use Botble\Base\Forms\FieldOptions\EmailFieldOption;

$this->add(
    'email', 
    EmailField::class, 
    EmailFieldOption::make()
        ->label(__('Email Address'))
);
```

## Password Field

The password field provides a masked input for password entry.

```php
use Botble\Base\Forms\Fields\PasswordField;
use Botble\Base\Forms\FieldOptions\PasswordFieldOption;

$this->add(
    'password', 
    PasswordField::class, 
    PasswordFieldOption::make()
        ->label(__('Password'))
);
```

## Hidden Field

The hidden field creates an input that is not visible to users but is included in form submissions.

```php
use Botble\Base\Forms\Fields\HiddenField;
use Botble\Base\Forms\FieldOptions\HiddenFieldOption;

$this->add(
    'secret_key', 
    HiddenField::class, 
    HiddenFieldOption::make()
        ->value('your-secret-value')
);
```

## HTML Field

The HTML field allows you to insert custom HTML content into your form.

```php
use Botble\Base\Forms\Fields\HtmlField;
use Botble\Base\Forms\FieldOptions\HtmlFieldOption;

$this->add(
    'custom_html', 
    HtmlField::class, 
    HtmlFieldOption::make()
        ->html('<div class="alert alert-info">This is a custom HTML content</div>')
);
```

## Label Field

The label field displays a label without an input field, useful for adding section headers or instructions.

```php
use Botble\Base\Forms\Fields\LabelField;
use Botble\Base\Forms\FieldOptions\LabelFieldOption;

$this->add(
    'section_title', 
    LabelField::class, 
    LabelFieldOption::make()
        ->label('<h3>Section Title</h3>')
);
```

## Number Field

The number field provides an input specifically for numeric values.

```php
use Botble\Base\Forms\Fields\NumberField;
use Botble\Base\Forms\FieldOptions\NumberFieldOption;

$this->add(
    'quantity', 
    NumberField::class, 
    NumberFieldOption::make()
        ->label(__('Quantity'))
        ->min(0)
        ->max(100)
        ->step(1)
);
```

## Phone Number Field

The phone number field provides an input with international phone number formatting and validation.

```php
use Botble\Base\Forms\Fields\PhoneNumberField;
use Botble\Base\Forms\FieldOptions\PhoneNumberFieldOption;

$this->add(
    'phone', 
    PhoneNumberField::class, 
    PhoneNumberFieldOption::make()
        ->label(__('Phone Number'))
);
```
