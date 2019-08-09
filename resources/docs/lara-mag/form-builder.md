# Form builder

We're using [kristijanhusak/laravel-form-builder](https://github.com/kristijanhusak/laravel-form-builder) to build form.
Visit official document for more information [http://kristijanhusak.github.io/laravel-form-builder](http://kristijanhusak.github.io/laravel-form-builder)

Example:

```php
$this
    ->setModuleName({PLUGIN}_MODULE_SCREEN_NAME)
    ->setValidatorClass({Plugin}Request::class)
    ->withCustomFields()
    ->add('field_name', 'text', [
        'label' => __('Field label'),
        'label_attr' => ['class' => 'control-label required'],
        'attr' => [
            'placeholder' => __('Placeholder'),
            'data-counter' => 120,
        ],
    ]);
```

## Form fields

If you want to show form field as mandatory field, add `required` class to label attributes.

### Input fields (Text, Password, Email, Number, Textarea...)

```php
->add('field_name', 'text', [ // you can change "text" to "password", "email", "number" or "textarea"
    'label' => __('Field name'),
    'label_attr' => ['class' => 'control-label required'], // Add class "required" if that is mandatory field
    'attr' => [
        'placeholder' => __('Placeholder'),
        'data-counter' => 120, // Maximum characters
    ],
])
```

### On/Off field

```php
->add('field_name', 'onOff', [
    'label' => __('Field label'),
    'label_attr' => ['class' => 'control-label'],
    'default_value' => false,
])
```

### Editor field

```php
->add('field_name', 'editor', [
    'label' => __('Field label'),
    'label_attr' => ['class' => 'control-label'],
    'attr' => [
        'with-short-code' => false,
    ],
])
```

### Select

```php
->add('field_name', 'select', [ // Change "select" to "customSelect" for better UI
    'label' => __('Field label'),
    'label_attr' => ['class' => 'control-label required'], // Add class "required" if that is mandatory field
    'choices' => [
        1 => __('Option 1'),
        2 => __('Option 2'),
    ],
])
```

### Radio

```php
->add('field_name', 'customRadio', [
    'label' => __('Field label'),
    'label_attr' => ['class' => 'control-label'],
    'choices' => [
        ["option1", "Option 1"],
        ["option2", "Option 2"],
    ],
])
```

### Image field 

```php
->add('field_name', 'mediaImage', [
    'label' => __('Field label'),
    'label_attr' => ['class' => 'control-label'],
])
```

### Color field

```php
->add('field_name', 'color', [
    'label' => __('Field label'),
    'label_attr' => ['class' => 'control-label'],
])
```

### Time field

```php
->add('field_name', 'time', [
    'label' => __('Field label'),
    'label_attr' => ['class' => 'control-label'],
])
```

## Form layouts

Default layout template for form is `core.base::forms.form`, you can set other layout for form.

Example:
```php
->setFormOption('template', 'core.base::forms.form-modal')
```

By default, a form will have 2 columns. It's separated by a breaking point. You can set it by using:

```php
->setBreakFieldPoint('field_name');
```