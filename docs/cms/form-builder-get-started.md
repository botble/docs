# Form Builder - Get Started

We're utilizing the - [kristijanhusak/laravel-form-builder](https://github.com/kristijanhusak/laravel-form-builder) package for form construction. 
For more details, please refer to the official documentation - [here](https://kristijanhusak.github.io/laravel-form-builder).

## Creating a form

```
php artisan cms:make:form TodoForm
```

Result:

![Basic form](./images/basic-form.png)

## Adding fields to a form

```php
use Botble\Todo\Models\Todo;
use Botble\Todo\Http\Requests\TodoRequest;
use Botble\Base\Forms\Fields\EditorField;
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\Fields\TextareaField;
use Botble\Base\Forms\FieldOptions\TextFieldOption;
use Botble\Base\Forms\FieldOptions\TextareaFieldOption;
use Botble\Base\Forms\FieldOptions\EditorFieldOption;

$this
    ->setUpModel(new Todo()) // Model which will be used in form (data will be saved to this model)
    ->setValidatorClass(TodoRequest::class) // Will parse Laravel request rules in client side (using jquery validate)
    ->add('name', TextField::class, TextFieldOption::make()->required())
    ->add('description', TextareaField::class, TextareaFieldOption::make()->required())
    ->add('content', EditorField::class, EditorFieldOption::make()->required())
```

Result:

![Basic form](./images/demo-form.png)

## Displaying form

```php
{!! \Botble\Todo\Forms\TodoForm::create()->renderForm() !!}
```

### From controller, you can use:

```php
use Botble\Todo\Forms\TodoForm;

public function create(TodoForm $form)
{
    return $form->renderForm();
}
```

### Set model for form

```php
use Botble\Todo\Models\Todo;
use Botble\Todo\Forms\TodoForm;

public function edit(Todo $todo)
{
    return TodoForm::createFromModel($todo)->renderForm();
}
```

### Saving form data

```php

use Botble\Todo\Models\Todo;
use Botble\Todo\Forms\TodoForm;

public function store(Request $request)
{
    TodoForm::create()->setRequest($request)->save();
    
    return redirect()->route('todo.index');
}

public function update(Request $request, Todo $todo)
{
    TodoForm::createFromModel($todo)->setRequest($request)->save();
    
    return redirect()->route('todo.index');
}
```

### Form layouts

- 2 columns layout

```php
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\Fields\TextareaField;

$this
    ->columns() // Use 2 columns layout
    ->add('field1', TextField::class, TextFieldOption::make()->colspan(6))
    ->add('field2', TextField::class, TextFieldOption::make()->colspan(6));
```

![2 columns layout](./images/form-2-columns.png)

- 3 columns layout

```php
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\Fields\TextareaField;

$this
    ->columns(12) // Use 12 columns layout
    ->add('field1', TextField::class, TextFieldOption::make()->colspan(4))
    ->add('field2', TextField::class, TextFieldOption::make()->colspan(4))
    ->add('field3', TextField::class, TextFieldOption::make()->colspan(4));
```

![3 columns layout](./images/form-3-columns.png)

### Remove master layout from form

```php
use Botble\Base\Forms\Fields\TextField;

$this
    ->contentOnly() // Remove master layout from form
    ->add('field1', TextField::class, TextFieldOption::make())
    ->add('field2', TextField::class, TextFieldOption::make());
```

### Add tab to form
    
```php
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\FormTab;

$this
    ->add('title', TextField::class)
    ->addTab(FormTab::make()->label('General')->content('General information'))
    ->add(FormTab::make()->label('Tab 2')->content(view('your-view'))) // Can be loaded from a Blade view
```

![Tab layout](./images/form-tab.png)

## Available Field Types

Botble CMS provides 38 built-in field types for creating flexible forms. Below is a comprehensive list organized by category.

### Text Input Fields

#### TextField
Standard text input field for strings and short text.

```php
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\FieldOptions\TextFieldOption;

->add('name', TextField::class, TextFieldOption::make()
    ->label('Name')
    ->placeholder('Enter name')
    ->required()
    ->maxLength(255)
)
```

#### EmailField
Email input field with HTML5 validation.

```php
use Botble\Base\Forms\Fields\EmailField;
use Botble\Base\Forms\FieldOptions\EmailFieldOption;

->add('email', EmailField::class, EmailFieldOption::make()
    ->label('Email Address')
    ->required()
)
```

#### PasswordField
Password input field that hides the entered value.

```php
use Botble\Base\Forms\Fields\PasswordField;

->add('password', PasswordField::class, [
    'label' => 'Password',
    'required' => true,
])
```

#### PhoneNumberField
Phone number input field with formatting support.

```php
use Botble\Base\Forms\Fields\PhoneNumberField;
use Botble\Base\Forms\FieldOptions\PhoneNumberFieldOption;

->add('phone', PhoneNumberField::class, PhoneNumberFieldOption::make()
    ->label('Phone Number')
)
```

#### NumberField
Numeric input field for integers and decimals.

```php
use Botble\Base\Forms\Fields\NumberField;

->add('quantity', NumberField::class, [
    'label' => 'Quantity',
    'min' => 1,
    'max' => 1000,
    'step' => 1,
])
```

#### TextareaField
Multi-line text input field.

```php
use Botble\Base\Forms\Fields\TextareaField;
use Botble\Base\Forms\FieldOptions\TextareaFieldOption;

->add('description', TextareaField::class, TextareaFieldOption::make()
    ->label('Description')
    ->rows(5)
    ->placeholder('Enter description')
)
```

### Date and Time Fields

#### DateField
Standard date input field.

```php
use Botble\Base\Forms\Fields\DateField;

->add('published_date', DateField::class, [
    'label' => 'Published Date',
    'format' => 'YYYY-MM-DD',
])
```

#### DatePickerField
Interactive date picker with calendar.

```php
use Botble\Base\Forms\Fields\DatePickerField;

->add('event_date', DatePickerField::class, [
    'label' => 'Event Date',
])
```

#### TimeField
Standard time input field.

```php
use Botble\Base\Forms\Fields\TimeField;

->add('event_time', TimeField::class, [
    'label' => 'Event Time',
    'format' => 'HH:mm',
])
```

#### TimePickerField
Interactive time picker.

```php
use Botble\Base\Forms\Fields\TimePickerField;

->add('event_time', TimePickerField::class, [
    'label' => 'Event Time',
])
```

#### DatetimeField
Combined date and time input field.

```php
use Botble\Base\Forms\Fields\DatetimeField;

->add('event_datetime', DatetimeField::class, [
    'label' => 'Event Date and Time',
    'format' => 'YYYY-MM-DD HH:mm',
])
```

### Rich Content Fields

#### EditorField
Rich text editor (default WYSIWYG editor, configurable).

```php
use Botble\Base\Forms\Fields\EditorField;
use Botble\Base\Forms\FieldOptions\EditorFieldOption;

->add('content', EditorField::class, EditorFieldOption::make()
    ->label('Content')
    ->allowedShortcodes()
)
```

#### CkEditorField
CKEditor WYSIWYG editor for rich text editing.

```php
use Botble\Base\Forms\Fields\CkEditorField;

->add('content', CkEditorField::class, [
    'label' => 'Content',
])
```

#### TinyMceField
TinyMCE WYSIWYG editor.

```php
use Botble\Base\Forms\Fields\TinyMceField;

->add('content', TinyMceField::class, [
    'label' => 'Content',
])
```

#### CodeEditorField
Code editor with syntax highlighting.

```php
use Botble\Base\Forms\Fields\CodeEditorField;

->add('css_code', CodeEditorField::class, [
    'label' => 'Custom CSS',
    'mode' => 'css', // css, javascript, html, php, etc.
])
```

### Media Fields

#### MediaImageField
Single image upload and selection field.

```php
use Botble\Base\Forms\Fields\MediaImageField;
use Botble\Base\Forms\FieldOptions\MediaImageFieldOption;

->add('featured_image', MediaImageField::class, MediaImageFieldOption::make()
    ->label('Featured Image')
)
```

#### MediaImagesField
Multiple images upload and selection field.

```php
use Botble\Base\Forms\Fields\MediaImagesField;

->add('gallery_images', MediaImagesField::class, [
    'label' => 'Gallery Images',
])
```

#### MediaFileField
File upload and selection field using the media manager.

```php
use Botble\Base\Forms\Fields\MediaFileField;

->add('attachment', MediaFileField::class, [
    'label' => 'File Attachment',
])
```

#### FileField
Standard file upload field (without media manager).

```php
use Botble\Base\Forms\Fields\FileField;

->add('document', FileField::class, [
    'label' => 'Upload Document',
    'attr' => [
        'accept' => '.pdf,.doc,.docx',
    ],
])
```

### Selection Fields

#### SelectField
Dropdown select field for choosing one option from many.

```php
use Botble\Base\Forms\Fields\SelectField;
use Botble\Base\Forms\FieldOptions\SelectFieldOption;

->add('category', SelectField::class, SelectFieldOption::make()
    ->label('Category')
    ->choices([
        'tech' => 'Technology',
        'business' => 'Business',
        'lifestyle' => 'Lifestyle',
    ])
    ->searchable()
)
```

#### RadioField
Radio button field for selecting one option from many.

```php
use Botble\Base\Forms\Fields\RadioField;

->add('status', RadioField::class, [
    'label' => 'Status',
    'choices' => [
        'published' => 'Published',
        'draft' => 'Draft',
        'archived' => 'Archived',
    ],
])
```

#### CheckboxField
Single checkbox field for boolean selection.

```php
use Botble\Base\Forms\Fields\CheckboxField;

->add('is_featured', CheckboxField::class, [
    'label' => 'Featured',
    'value' => 1,
])
```

#### MultiCheckListField
Multiple checkboxes for selecting multiple options.

```php
use Botble\Base\Forms\Fields\MultiCheckListField;

->add('features', MultiCheckListField::class, [
    'label' => 'Features',
    'choices' => [
        'featured' => 'Featured',
        'popular' => 'Popular',
        'trending' => 'Trending',
    ],
])
```

#### OnOffField
Toggle switch for true/false selection.

```php
use Botble\Base\Forms\Fields\OnOffField;

->add('is_active', OnOffField::class, [
    'label' => 'Active',
])
```

#### OnOffCheckboxField
Toggle switch styled as checkbox.

```php
use Botble\Base\Forms\Fields\OnOffCheckboxField;

->add('is_visible', OnOffCheckboxField::class, [
    'label' => 'Visible',
])
```

#### TreeCategoryField
Hierarchical category selector for tree structures.

```php
use Botble\Base\Forms\Fields\TreeCategoryField;

->add('parent_category', TreeCategoryField::class, [
    'label' => 'Parent Category',
    'class' => 'Botble\Blog\Models\Category',
])
```

### Advanced Fields

#### TagField
Tag input field for entering comma-separated values or selecting from suggestions.

```php
use Botble\Base\Forms\Fields\TagField;

->add('tags', TagField::class, [
    'label' => 'Tags',
    'placeholder' => 'Add tags separated by commas',
])
```

#### AutocompleteField
Autocomplete field with suggestions from a data source.

```php
use Botble\Base\Forms\Fields\AutocompleteField;

->add('author', AutocompleteField::class, [
    'label' => 'Author',
    'minimum_input' => 2,
    'saving_key' => 'id',
    'url' => route('api.users.search'),
])
```

#### RepeaterField
Field for creating repeating groups of fields.

```php
use Botble\Base\Forms\Fields\RepeaterField;
use Botble\Base\Forms\Fields\TextField;

->add('benefits', RepeaterField::class, [
    'label' => 'Benefits',
    'fields' => [
        'title' => [
            'type' => TextField::class,
            'label' => 'Benefit Title',
        ],
        'description' => [
            'type' => TextareaField::class,
            'label' => 'Benefit Description',
        ],
    ],
])
```

### Color Fields

#### ColorField
Color picker field for selecting colors.

```php
use Botble\Base\Forms\Fields\ColorField;

->add('primary_color', ColorField::class, [
    'label' => 'Primary Color',
    'value' => '#000000',
])
```

#### ColorSelectorField
Advanced color selector with color palette.

```php
use Botble\Base\Forms\Fields\ColorSelectorField;

->add('theme_color', ColorSelectorField::class, [
    'label' => 'Theme Color',
])
```

#### GoogleFontsField
Google Fonts selector field.

```php
use Botble\Base\Forms\Fields\GoogleFontsField;

->add('body_font', GoogleFontsField::class, [
    'label' => 'Body Font',
])
```

### Special Fields

#### CoreIconField
Icon selector field for choosing icons from available icon sets.

```php
use Botble\Base\Forms\Fields\CoreIconField;

->add('icon', CoreIconField::class, [
    'label' => 'Icon',
])
```

#### UiSelectorField
UI element selector field.

```php
use Botble\Base\Forms\Fields\UiSelectorField;

->add('ui_element', UiSelectorField::class, [
    'label' => 'UI Element',
])
```

#### AlertField
Display an alert/notification message (read-only).

```php
use Botble\Base\Forms\Fields\AlertField;

->add('alert', AlertField::class, [
    'label' => 'Information',
    'content' => 'This is important information for users',
    'type' => 'info', // info, success, warning, danger
])
```

#### HtmlField
Render raw HTML (for display purposes).

```php
use Botble\Base\Forms\Fields\HtmlField;

->add('custom_html', HtmlField::class, [
    'html' => '<div class="alert alert-info">Custom HTML content</div>',
])
```

#### LabelField
Display a label or text (read-only).

```php
use Botble\Base\Forms\Fields\LabelField;

->add('info_label', LabelField::class, [
    'label' => 'Information',
    'content' => 'This is read-only information',
])
```

#### HiddenField
Hidden input field (not displayed in the form).

```php
use Botble\Base\Forms\Fields\HiddenField;

->add('hidden_value', HiddenField::class, [
    'value' => 'some-hidden-value',
])
```

### FieldOption Classes

All modern Botble CMS form fields use the `FieldOption` pattern for configuration. Here are the commonly available FieldOption classes:

- **NameFieldOption**: For name fields with label and placeholder
- **StatusFieldOption**: For status select fields
- **DescriptionFieldOption**: For description/textarea fields
- **ContentFieldOption**: For editor fields with shortcode support
- **MediaImageFieldOption**: For image upload fields
- **MediaImagesFieldOption**: For multiple image uploads
- **SelectFieldOption**: For select/dropdown fields
- **TextFieldOption**: For text input fields
- **TextareaFieldOption**: For textarea fields
- **EmailFieldOption**: For email input fields
- **PhoneNumberFieldOption**: For phone number fields
- **InputFieldOption**: Generic input field option
- **IsFeaturedFieldOption**: For boolean featured status
- **EditorFieldOption**: For editor fields with advanced options

Example usage:

```php
use Botble\Base\Forms\FieldOptions\StatusFieldOption;

->add('status', SelectField::class, StatusFieldOption::make()
    ->required()
)
```

All FieldOption classes support these common methods:

- `make()`: Static factory method to create an instance
- `label(string $label)`: Set field label
- `placeholder(string $placeholder)`: Set placeholder text
- `required(bool $required = true)`: Mark field as required
- `helpBlock(string $help)`: Add help text below field
- `attributes(array $attributes)`: Add HTML attributes
- `value(mixed $value)`: Set default value
- `colspan(int $cols)`: Set column span in form layout


## Add more columns into existed form

Check this video tutorial: https://youtu.be/5PC6mzssZ70

Add below code into `platform/themes/[your-theme]/functions/functions.php`

```php
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\FieldOptions\TextFieldOption;

add_filter(BASE_FILTER_BEFORE_RENDER_FORM, function ($form, $data) {
    if ($data instanceof \Botble\Blog\Models\Post) {
        $test = $data->getMetaData('test', true);
    
        $form
            ->add(
                'test', 
                TextField::class, 
                TextFieldOption::make()
                    ->label(__('Test Field'))
                    ->value($test)
            );
    }
    
    return $form;
}, 120, 2);

add_action([BASE_ACTION_AFTER_CREATE_CONTENT, BASE_ACTION_AFTER_UPDATE_CONTENT], function ($screen, $request, $data) {
    if ($data instanceof \Botble\Blog\Models\Post) {
        MetaBox::saveMetaBoxData($data, 'test', $request->input('test'));
    }
}, 120, 3);

```

Display the value of Test field in platform/themes/[your-theme]/views/post.blade.php.

```php
    $post->getMetaData('test', true);
```

## Modify form field

Example: change "Description" field in PostForm.php to rich text editor.

Add below code into `platform/themes/[your-theme]/functions/functions.php`

```php
use Botble\Base\Forms\Fields\EditorField;
use Botble\Base\Forms\FieldOptions\EditorFieldOption;

add_filter(BASE_FILTER_BEFORE_RENDER_FORM, function ($form, $data) {
    if ($data instanceof \Botble\Blog\Models\Post) {
        $form
            ->modify(
                'description',
                EditorField::class, 
                EditorFieldOption::make(),
            true);
    }

    return $form;
}, 120, 2);
```
