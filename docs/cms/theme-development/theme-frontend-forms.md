# Theme Frontend Forms

The FormFront system provides a base class for building styled frontend forms. Plugins like Contact, Member (login/register), and Newsletter use this system to render forms that respect the active theme's styling.

## Overview

- **`FormFront`** — Abstract base class extending `FormAbstract`, adds frontend-specific styling and rendering
- **`FormFrontManager`** — Static registry that maps `FormFront` classes to their `Request` validation classes

## Creating a Frontend Form

### Step 1: Create the Form Class

```php
namespace Theme\YourTheme\Forms;

use Botble\Base\Forms\FieldOptions\TextFieldOption;
use Botble\Base\Forms\FieldOptions\TextareaFieldOption;
use Botble\Base\Forms\Fields\EmailField;
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\Fields\TextareaField;
use Botble\Theme\FormFront;

class ContactForm extends FormFront
{
    public function setup(): void
    {
        $this
            ->setFormInputWrapperClass('mb-3')
            ->setFormInputClass('form-control')
            ->setFormLabelClass('form-label')
            ->addAsteriskToMandatoryFields()
            ->contentOnly()
            ->add('name', TextField::class, TextFieldOption::make()
                ->label(__('Name'))
                ->required()
                ->placeholder(__('Your name')))
            ->add('email', EmailField::class, TextFieldOption::make()
                ->label(__('Email'))
                ->required()
                ->placeholder(__('Your email')))
            ->add('message', TextareaField::class, TextareaFieldOption::make()
                ->label(__('Message'))
                ->required()
                ->rows(5)
                ->placeholder(__('Your message')));
    }
}
```

### Step 2: Create the Request Class

```php
namespace Theme\YourTheme\Http\Requests;

use Botble\Support\Http\Requests\Request;

class ContactRequest extends Request
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:60'],
            'message' => ['required', 'string', 'max:1000'],
        ];
    }
}
```

### Step 3: Register the Form

Register in your theme's `functions/functions.php` or a plugin's service provider:

```php
use Botble\Theme\FormFrontManager;
use Theme\YourTheme\Forms\ContactForm;
use Theme\YourTheme\Http\Requests\ContactRequest;

FormFrontManager::register(ContactForm::class, ContactRequest::class);
```

## Styling Options

### CSS Class Customization

```php
$this
    // Wraps each input field in a <div> with this class
    ->setFormInputWrapperClass('mb-3 form-group')

    // Applied to input/textarea/select elements
    ->setFormInputClass('form-control form-control-lg')

    // Applied to <label> elements
    ->setFormLabelClass('form-label fw-bold')

    // Adds * to placeholder text of required fields
    ->addAsteriskToMandatoryFields();
```

### How Styling Is Applied

When `renderForm()` is called, the system automatically:

1. Adds the input class to all text, textarea, email, number, select, date, and datetime fields
2. Handles checkbox/radio fields separately (removes `form-control` class)
3. Wraps each field in a `<div>` with the wrapper class
4. Appends `*` to placeholder text of mandatory fields (if enabled)

## Rendering the Form

### In Blade Templates

```blade
{!! app(Theme\YourTheme\Forms\ContactForm::class)->renderForm() !!}
```

### With Custom Rendering Options

```php
$form = app(ContactForm::class);

// Render only fields (no form tags)
echo $form->renderForm(showStart: false, showEnd: false);

// Render specific parts
echo $form->renderForm(showStart: true, showFields: true, showEnd: false);
```

## Form Hooks

The FormFront system provides filter hooks for customization:

| Hook | Description |
|------|-------------|
| `form_front_form_start` | Modify the opening `<form>` tag HTML |
| `form_front_form_end` | Modify the closing form HTML |
| `form_front_before_submit_button` | Insert content before the submit button |

## FormFrontManager API

```php
use Botble\Theme\FormFrontManager;

// Register a form with its validation request
FormFrontManager::register(ContactForm::class, ContactRequest::class);

// Remove a registered form
FormFrontManager::remove(ContactForm::class);

// Get all registered form classes
$forms = FormFrontManager::forms();

// Get the Request class for a form
$requestClass = FormFrontManager::formRequestOf(ContactForm::class);

// Find which form uses a given Request class
$formClass = FormFrontManager::formByRequest(ContactRequest::class);
```

## Built-in Frontend Forms

Several plugins provide their own `FormFront` implementations:

| Plugin | Form Class | Purpose |
|--------|-----------|---------|
| Contact | `ContactForm` | Contact form |
| Member | `LoginForm`, `RegisterForm` | Authentication forms |
| Newsletter | `NewsletterForm` | Email subscription |

These forms automatically adapt their styling to the active theme's CSS classes.
