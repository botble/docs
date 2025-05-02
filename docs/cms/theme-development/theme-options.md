# Theme Options

Theme options allow you to customize your theme's appearance and functionality through the admin panel. This documentation covers how to create, manage, and use theme options in Botble CMS.

## Basic Usage of Theme Options

### Adding Theme Options

You can add theme options in your theme's `functions/theme-options.php` file. There are two approaches to creating theme options: using the array-based approach or using the fluent API with dedicated classes.

#### Approach 1: Using ThemeOptionSection Class (Recommended)

```php
use Botble\Theme\ThemeOption\ThemeOptionSection;
use Botble\Theme\ThemeOption\Fields\TextField;
use Botble\Theme\ThemeOption\Fields\MediaImageField;

app('events')->listen(RenderingThemeOptionSettings::class, function (): void {
    ThemeOption::setSection(
        ThemeOptionSection::make('opt-text-subsection-general')
            ->title(__('General'))
            ->description(__('General settings'))
            ->icon('ti ti-home')
            ->priority(0)
            ->fields([
                TextField::make()
                    ->name('copyright')
                    ->label(__('Copyright'))
                    ->defaultValue('© ' . now()->year . ' Your Company. All rights reserved.')
                    ->placeholder(__('Change copyright'))
                    ->maxLength(120)
                    ->helperText(__('Copyright on footer of site')),
            ])
    );

    ThemeOption::setSection(
        ThemeOptionSection::make('opt-text-subsection-logo')
            ->title(__('Logo'))
            ->description(__('Change logo'))
            ->icon('ti ti-photo')
            ->priority(1)
            ->fields([
                MediaImageField::make()
                    ->name('logo')
                    ->label(__('Logo'))
                    ->helperText(__('Upload your logo here')),
            ])
    );
});
```

#### Approach 2: Using Array-Based Configuration

```php
app('events')->listen(RenderingThemeOptionSettings::class, function (): void {
    theme_option()
        ->setSection([ // Set section with no field
            'title' => __('General'),
            'desc' => __('General settings'),
            'id' => 'opt-text-subsection-general',
            'subsection' => true,
            'icon' => 'ti ti-home',
        ])
        ->setSection([ // Set section with some fields
            'title' => __('Logo'),
            'desc' => __('Change logo'),
            'id' => 'opt-text-subsection-logo',
            'subsection' => true,
            'icon' => 'ti ti-photo',
            'fields' => [
                [
                    'id' => 'logo',
                    'type' => 'mediaImage',
                    'label' => __('Logo'),
                    'attributes' => [
                        'name' => 'logo',
                        'value' => null,
                    ],
                ],
            ],
        ])
        ->setField([ // Set field for section
            'id' => 'copyright',
            'section_id' => 'opt-text-subsection-general',
            'type' => 'text',
            'label' => __('Copyright'),
            'attributes' => [
                'name' => 'copyright',
                'value' => '© ' . now()->year . ' Your Company. All rights reserved.',
                'options' => [
                    'class' => 'form-control',
                    'placeholder' => __('Change copyright'),
                    'data-counter' => 120,
                ]
            ],
            'helper' => __('Copyright on footer of site'),
        ]);
});
```

### Displaying Theme Options

To display theme options in your theme, use the `theme_option()` helper function:

```blade
{{-- For plain text --}}
{{ theme_option('option_name') }}

{{-- For HTML content --}}
{!! theme_option('option_name') !!}

{{-- With default value if option is not set --}}
{{ theme_option('option_name', 'Default value') }}
```

### Checking if a Theme Option Exists

```php
if (theme_option('option_name')) {
    // Option exists and has a non-empty value
}
```

### Saving Theme Options

You can programmatically set theme options:

```php
Theme::setOption('option_name', 'option_value');
Theme::saveOptions(); // Save to database
```

## Supported Fields

Botble CMS supports various field types for theme options. You can use either the object-oriented approach (recommended) or the array-based approach.

### Text Field

#### Object-Oriented Approach

```php
use Botble\Theme\ThemeOption\Fields\TextField;

TextField::make()
    ->name('field_name')
    ->label(__('Field label'))
    ->defaultValue('Default value')
    ->placeholder(__('Placeholder (optional)'))
    ->maxLength(120)
    ->helperText(__('Helper text (optional)'))
```

#### Array-Based Approach

```php
->setField([
    'id' => 'field_name',
    'section_id' => 'opt-text-subsection-section-id',
    'type' => 'text', // text, password, email, number
    'label' => __('Field label'),
    'attributes' => [
        'name' => 'field_name',
        'value' => null, // default value
        'options' => [
            'class' => 'form-control',
            'placeholder' => __('Placeholder (optional)'),
            'data-counter' => 120,
        ]
    ],
    'helper' => __('Helper text (optional)'),
])
```

### Select Field

#### Object-Oriented Approach

```php
use Botble\Theme\ThemeOption\Fields\SelectField;

SelectField::make()
    ->name('field_name')
    ->label(__('Field label'))
    ->options([
        0 => __('No'),
        1 => __('Yes'),
    ])
    ->defaultValue(1)
    ->helperText(__('Helper text (optional)'))
```

#### Array-Based Approach

```php
->setField([
    'id' => 'field_name',
    'section_id' => 'opt-text-subsection-section-id',
    'type' => 'select', // select or customSelect
    'label' => __('Field label'),
    'attributes' => [
        'name' => 'field_name',
        'data' => [ // Array options for select
            0 => __('No'),
            1 => __('Yes'),
        ],
        'value' => null, // default value
        'options' => [
            'class' => 'form-control',
        ],
    ],
])
```

### Media Image Field

#### Object-Oriented Approach

```php
use Botble\Theme\ThemeOption\Fields\MediaImageField;

MediaImageField::make()
    ->name('banner_ads')
    ->label(__('Banner Image'))
    ->helperText(__('Select an image for the banner'))
```

#### Array-Based Approach

```php
->setField([
    'id' => 'banner_ads',
    'section_id' => 'opt-text-subsection-section-id',
    'type' => 'mediaImage',
    'label' => __('Banner Image'),
    'attributes' => [
        'name' => 'banner_ads',
        'value' => null,
    ],
    'helper' => __('Select an image for the banner'),
])
```

### Editor Field

#### Object-Oriented Approach

```php
use Botble\Theme\ThemeOption\Fields\EditorField;

EditorField::make()
    ->name('field_name')
    ->label(__('Field label'))
    ->defaultValue('<p>Default content</p>')
    ->rows(10)
    ->helperText(__('Helper for this field (optional)'))
```

#### Array-Based Approach

```php
->setField([
    'id' => 'field_name',
    'section_id' => 'opt-text-subsection-section-id',
    'type' => 'editor',
    'label' => __('Field label'),
    'attributes' => [
        'name' => 'field_name',
        'value' => null, // Default value
        'options' => [ // Optional
            'class' => 'form-control theme-option-textarea',
            'row' => '10',
        ],
    ],
    'helper' => __('Helper for this field (optional)'),
])
```

### Radio Field

#### Object-Oriented Approach

```php
use Botble\Theme\ThemeOption\Fields\RadioField;

RadioField::make()
    ->name('field_name')
    ->label(__('Field label'))
    ->options([
        0 => __('No'),
        1 => __('Yes'),
    ])
    ->defaultValue(1)
    ->inline(true) // Display options inline
    ->helperText(__('Helper for this field (optional)'))
```

#### Array-Based Approach

```php
->setField([
    'id' => 'field_name',
    'section_id' => 'opt-text-subsection-section-id',
    'type' => 'onOff',
    'label' => __('Field label'),
    'attributes' => [
        'name' => 'field_name',
        'value' => 1,
        'data' => [
            0 => __('No'),
            1 => __('Yes'),
        ],
        'options' => [],// Optional
    ],
    'helper' => __('Helper for this field (optional)'),
]);
```

### Custom Radio Field

#### Object-Oriented Approach

```php
use Botble\Theme\ThemeOption\Fields\RadioField;

RadioField::make()
    ->name('field_name')
    ->label(__('Field label'))
    ->options([
        'left' => __('Left'),
        'right' => __('Right'),
        'center' => __('Center'),
    ])
    ->defaultValue('left')
    ->helperText(__('Helper for this field (optional)'))
```

#### Array-Based Approach

```php
->setField([
    'id' => 'field_name',
    'section_id' => 'opt-text-subsection-section-id',
    'type' => 'customRadio',
    'label' => __('Field label'),
    'attributes' => [
        'name' => 'field_name',
        'values' => [
            ['left', __('Left')],
            ['right', __('Right')],
            ['center', __('Center')],
        ],
        'selected' => 'left',
        'options' => [],// Optional
    ],
    'helper' => __('Helper for this field (optional)'),
]);
```

### Custom Select Field

#### Object-Oriented Approach

```php
use Botble\Theme\ThemeOption\Fields\SelectField;

SelectField::make()
    ->name('field_name')
    ->label(__('Field label'))
    ->options([
        'option1' => __('Option 1'),
        'option2' => __('Option 2'),
        'option3' => __('Option 3'),
    ])
    ->defaultValue('option1')
    ->helperText(__('Helper for this field (optional)'))
```

#### Array-Based Approach

```php
->setField([
    'id' => 'field_name',
    'section_id' => 'opt-text-subsection-section-id',
    'type' => 'customSelect',
    'label' => __('Field label'),
    'attributes' => [
        'values' => [
            ['field_name[]', 'option1', __('Option 1')],
            ['field_name[]', 'option2', __('Option 2')],
            ['field_name[]', 'option3', __('Option 3')],
        ],
        'name' => 'field_name',
    ],
    'helper' => __('Helper for this field (optional)'),
]);
```

### Repeater Field

#### Object-Oriented Approach

```php
use Botble\Theme\ThemeOption\Fields\RepeaterField;
use Botble\Theme\ThemeOption\Fields\TextField;
use Botble\Theme\ThemeOption\Fields\MediaImageField;
use Botble\Theme\ThemeOption\Fields\TextareaField;

RepeaterField::make()
    ->name('options_name')
    ->label(__('Repeater fields'))
    ->fields([
        TextField::make()
            ->name('text')
            ->label(__('Text'))
            ->maxLength(255),

        MediaImageField::make()
            ->name('image')
            ->label(__('Image')),

        TextareaField::make()
            ->name('textarea')
            ->label(__('Textarea'))
            ->rows(3)
            ->maxLength(255),
    ])
```

#### Array-Based Approach

```php
->setField([
    'id'         => 'options_name',
    'section_id' => 'opt-text-subsection-general',
    'type'       => 'repeater',
    'label'      => __('Repeater fields'),
    'attributes' => [
        'name'   => 'options_name',
        'value'  => null,
        'fields' => [
            [
                'type'       => 'text',
                'label'      => __('Text'),
                'attributes' => [
                    'name'    => 'text',
                    'value'   => null,
                    'options' => [
                        'class'        => 'form-control',
                        'data-counter' => 255,
                    ],
                ],
            ],
            [
                'type'       => 'mediaImage',
                'label'      => __('Image'),
                'attributes' => [
                    'name'  => 'image',
                    'value' => null,
                ],
            ],
            [
                'type'       => 'textarea',
                'label'      => __('Textarea'),
                'attributes' => [
                    'name'    => 'textarea',
                    'value'   => null,
                    'options' => [
                        'class'        => 'form-control',
                        'data-counter' => 255,
                        'rows'         => 3,
                    ],
                ],
            ],
        ],
    ],
])
```

### Additional Field Types

#### Color Picker

```php
use Botble\Theme\ThemeOption\Fields\ColorField;

ColorField::make()
    ->name('primary_color')
    ->label(__('Primary Color'))
    ->defaultValue('#AF0F26')
```

#### Icon Selector

```php
use Botble\Theme\ThemeOption\Fields\IconField;

IconField::make()
    ->name('social_icon')
    ->label(__('Social Icon'))
    ->defaultValue('ti ti-brand-facebook')
```

#### UI Selector

```php
use Botble\Theme\ThemeOption\Fields\UiSelectorField;

UiSelectorField::make()
    ->name('layout_style')
    ->label(__('Layout Style'))
    ->options([
        'layout-1' => [
            'label' => __('Layout 1'),
            'image' => Theme::asset()->url('images/layouts/layout-1.png'),
        ],
        'layout-2' => [
            'label' => __('Layout 2'),
            'image' => Theme::asset()->url('images/layouts/layout-2.png'),
        ],
    ])
    ->defaultValue('layout-1')
```
