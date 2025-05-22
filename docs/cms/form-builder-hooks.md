# Form Builder Hooks

## Introduction

Botble CMS provides a powerful form builder system that allows you to create and customize forms. One of the key features of this system is its extensibility through hooks. These hooks allow you to modify forms at different stages of their lifecycle without modifying the core code.

This document explains how to use the various hooks available in the form builder system to extend and customize forms in your plugins and themes.

## Available Hooks

The form builder system provides several hooks that you can use to modify forms:

1. **extend**: Add or modify fields in a form
2. **beforeRendering**: Modify a form before it is rendered
3. **afterRendering**: Modify the rendered output of a form
4. **beforeSaving**: Perform actions before a form is saved
5. **afterSaving**: Perform actions after a form is saved

## Using the `extend` Hook

The `extend` hook allows you to add, remove, or modify fields in a form. This is useful when you want to add custom fields to existing forms.

### Basic Usage

```php
use Botble\Base\Forms\FormAbstract;
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\FieldOptions\TextFieldOption;

FormAbstract::extend(function (FormAbstract $form): void {
    $model = $form->getModel();
    
    // Only extend specific forms
    if (! $model instanceof YourModel) {
        return;
    }
    
    // Add a new field
    $form->add('custom_field', TextField::class, TextFieldOption::make()->label('Custom Field'));
}, 120); // Priority (lower numbers run first)
```

### Adding Fields After or Before Existing Fields

```php
use Botble\Base\Forms\FormAbstract;
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\FieldOptions\TextFieldOption;

FormAbstract::extend(function (FormAbstract $form): void {
    $model = $form->getModel();
    
    if (! $model instanceof YourModel) {
        return;
    }
    
    // Add a field after an existing field
    $form->addAfter(
        'name', // Existing field name
        'custom_field', // New field name
        TextField::class, // Field type
        TextFieldOption::make()->label('Custom Field') // Field options
    );
    
    // Add a field before an existing field
    $form->addBefore(
        'content', // Existing field name
        'subtitle', // New field name
        TextField::class, // Field type
        TextFieldOption::make()->label('Subtitle') // Field options
    );
}, 120);
```

### Example: Adding a Banner Image Field to Post and Page Forms

```php
use Botble\Base\Forms\FormAbstract;
use Botble\Blog\Models\Post;
use Botble\Page\Models\Page;
use Botble\Base\Forms\Fields\MediaImageField;
use Botble\Base\Forms\FieldOptions\MediaImageFieldOption;

FormAbstract::extend(function (FormAbstract $form): void {
    $model = $form->getModel();
    
    if (! $model instanceof Post && ! $model instanceof Page) {
        return;
    }
    
    $form->addAfter(
        'image',
        'banner_image',
        MediaImageField::class,
        MediaImageFieldOption::make()->label('Banner image (1920x170px)')->metadata()
    );
}, 124);
```

## Using the `beforeRendering` Hook

The `beforeRendering` hook allows you to modify a form before it is rendered. This is useful for adding dynamic content, modifying form options, or conditionally changing form fields based on runtime conditions.

### Basic Usage

```php
use Botble\Base\Forms\FormAbstract;

FormAbstract::beforeRendering(function (FormAbstract $form): void {
    $model = $form->getModel();
    
    // Only modify specific forms
    if (! $model instanceof YourModel) {
        return;
    }
    
    // Modify form options
    $form->setFormOption('class', $form->getFormOption('class') . ' custom-class');
    
    // Conditionally modify fields
    if (some_condition()) {
        $form->remove('some_field');
    }
}, 120); // Priority
```

### Example: Adding CAPTCHA to Forms

```php
use Botble\Base\Forms\FormAbstract;
use Botble\Base\Forms\FormFront;

FormAbstract::beforeRendering(function (FormAbstract $form): void {
    if (! CaptchaFacade::isEnabled()) {
        return;
    }
    
    $fieldKey = 'submit';
    
    $attributes = [
        'colspan' => $form->getColumns('lg'),
    ];
    
    if ($form instanceof FormFront) {
        $fieldKey = $form->getFormEndKey() ?: ($form->has($fieldKey) ? $fieldKey : array_key_last($form->getFields()));
        
        if ($form->getFormInputWrapperClass()) {
            $attributes['wrapper'] = ['class' => $form->getFormInputWrapperClass()];
        }
    }
    
    $form->addBefore($fieldKey, 'captcha', 'captcha', $attributes);
}, 120);
```

## Using the `afterRendering` Hook

The `afterRendering` hook allows you to modify the rendered output of a form. This is useful for adding custom HTML or JavaScript after the form has been rendered.

### Basic Usage

```php
use Botble\Base\Forms\FormAbstract;

FormAbstract::afterRendering(function (FormAbstract $form, string $rendered): string {
    // Modify the rendered output
    return $rendered . '<div class="custom-footer">Custom footer content</div>';
}, 120); // Priority
```

## Using the `beforeSaving` Hook

The `beforeSaving` hook allows you to perform actions before a form is saved. This is useful for modifying data before it is saved to the database.

### Basic Usage

```php
use Botble\Base\Forms\FormAbstract;

FormAbstract::beforeSaving(function (FormAbstract $form): void {
    $model = $form->getModel();
    
    // Only process specific forms
    if (! $model instanceof YourModel) {
        return;
    }
    
    // Modify data before saving
    $request = $form->getRequest();
    $data = $request->input();
    
    // Perform custom validation or data transformation
    if (isset($data['custom_field'])) {
        $data['custom_field'] = transform_data($data['custom_field']);
        $request->merge(['custom_field' => $data['custom_field']]);
    }
}, 120); // Priority
```

## Using the `afterSaving` Hook

The `afterSaving` hook allows you to perform actions after a form is saved. This is useful for performing additional operations that depend on the saved data, such as saving related data or sending notifications.

### Basic Usage

```php
use Botble\Base\Forms\FormAbstract;

FormAbstract::afterSaving(function (FormAbstract $form): void {
    $model = $form->getModel();
    
    // Only process specific forms
    if (! $model instanceof YourModel) {
        return;
    }
    
    // Perform actions after saving
    $request = $form->getRequest();
    
    // Save related data
    if ($request->has('related_data')) {
        save_related_data($model, $request->input('related_data'));
    }
}, 120); // Priority
```

### Example: Saving Meta Data After Form Submission

```php
use Botble\Base\Forms\FormAbstract;
use Botble\Blog\Forms\PostForm;
use Botble\Blog\Models\Post;
use Botble\Base\Facades\MetaBox;

FormAbstract::afterSaving(function (FormAbstract $form): void {
    if (! $form instanceof PostForm) {
        return;
    }
    
    $request = $form->getRequest();
    
    // Validate additional fields
    $request->validate([
        'banner_image_input' => ['nullable', new MediaImageRule()],
    ]);
    
    /**
     * @var Post $model
     */
    $model = $form->getModel();
    
    // Save meta data
    $model->saveMetaDataFromFormRequest('banner_image', $request);
}, 175);
```

## Targeting Specific Form Classes

While the examples above show how to use hooks with `FormAbstract` to target all forms, you can also target specific form classes:

```php
use Botble\Blog\Forms\PostForm;

PostForm::beforeRendering(function (PostForm $form): void {
    // This will only run for PostForm instances
    // ...
}, 120);

PostForm::afterSaving(function (PostForm $form): void {
    // This will only run for PostForm instances
    // ...
}, 120);
```

## Best Practices

1. **Check Form Type**: Always check the form type or model type before making changes to ensure you're only modifying the intended forms.

2. **Use Appropriate Priority**: Choose a priority that makes sense for your hook. Lower numbers run earlier.

3. **Keep Hooks Focused**: Each hook should perform a specific task. Don't try to do too much in a single hook.

4. **Register Hooks in Service Providers**: Register your hooks in service providers' boot methods for better organization.

5. **Use Type Hints**: Use type hints in your closures to make your code more readable and maintainable.

6. **Return the Form**: When modifying a form in a hook, remember to return the form if required by the hook.

## Conclusion

Form hooks provide a powerful way to extend and customize forms in Botble CMS without modifying core code. By using these hooks, you can add custom fields, modify form behavior, and perform additional actions before and after form submission.

These hooks are essential for plugin developers who want to integrate with existing forms or extend the functionality of the form builder system.
