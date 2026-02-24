# Widget

Widgets in Botble CMS allow you to add dynamic content blocks to your theme's sidebar areas. The widget system consists of two main components: widget areas (sidebars) and widgets themselves.

## Widget Areas (Sidebars)

Widget areas are regions in your theme where widgets can be placed. These are typically sidebars, footers, or other areas where you want to display dynamic content.

### Register Widget Area

Add the following code to `/platform/themes/your-theme/functions/functions.php` to register a new widget area:

```php
register_sidebar([
    'id' => 'sidebar_name',
    'name' => __('Sidebar Name'),
    'description' => __('This is the description for widget area'),
]);
```

You can register multiple widget areas in your theme by calling `register_sidebar()` multiple times with different IDs.

### Display Widget Area

To display a widget area in your theme, use the `dynamic_sidebar()` helper function:

```blade
{!! dynamic_sidebar('sidebar_name') !!}
```

This will render all widgets that have been assigned to the specified sidebar.

## Widgets

Widgets are reusable content blocks that can be placed in widget areas. Botble CMS comes with several built-in widgets, and you can create custom widgets for your theme.

### Built-in Widgets

Botble CMS includes several built-in widgets:

- **Text Widget**: Displays custom text or HTML content
- **Menu Widget**: Displays a custom menu
- **Recent Posts**: Shows a list of recent blog posts
- **Categories**: Displays a list of blog categories
- **Tags**: Shows a list of blog tags

### Create Custom Widget

::: warning
Dev tools are removed in the download package. You need to delete the `/vendor` folder and run `composer install` to reinstall it, then you can use dev commands.
:::

#### Creating a Widget

To create a new widget, use the following command:

```bash
php artisan cms:widget:create <widget_name>
```

This will create a new widget in `/platform/themes/<current active theme>/widgets/<widget_name>/`.

After creating the widget, go to `/admin/widgets` in the admin panel to see and configure your new widget.

::: tip
You can examine other widgets in the default themes (Ripple and NewsTV) as examples for creating your own widgets.
:::

#### Removing a Widget

To remove a widget, use the following command:

```bash
php artisan cms:widget:remove <widget_name>
```

### Widget Structure

A widget typically consists of two main components:

1. **Main Class File**: Initializes the widget, defines its properties, and provides the configuration form
   - Example: `/platform/themes/ripple/widgets/tags/tags.php`

2. **Frontend Template**: Displays the widget on the frontend
   - Example: `/platform/themes/ripple/widgets/tags/templates/frontend.blade.php`

> While you can use a separate `backend.blade.php` file for the admin configuration form, the recommended approach is to define the form directly in the widget class using the `settingForm()` method.

### Creating a Custom Widget Class

Here's an example of a basic widget class:

```php
<?php

use Botble\Base\Forms\FieldOptions\TextFieldOption;
use Botble\Base\Forms\FieldOptions\TextareaFieldOption;
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\Fields\TextareaField;
use Botble\Widget\AbstractWidget;
use Botble\Widget\Forms\WidgetForm;

class ExampleWidget extends AbstractWidget
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Example Widget',
            'description' => 'This is an example widget',
            // Default configuration values
            'title' => null,
            'content' => null,
        ]);
    }

    // Define the admin configuration form
    protected function settingForm(): WidgetForm|string|null
    {
        return WidgetForm::createFromArray($this->getConfig())
            ->add('title', TextField::class, TextFieldOption::make()
                ->label(__('Title'))
                ->placeholder(__('Enter widget title')))
            ->add('content', TextareaField::class, TextareaFieldOption::make()
                ->label(__('Content'))
                ->rows(4)
                ->placeholder(__('Enter widget content')));
    }

    // Optional: Define data to be passed to the widget templates
    public function data(): array
    {
        return [
            // Additional data for the widget templates
        ];
    }
}
```

### Widget Templates

#### Frontend Template

The frontend template (`frontend.blade.php`) defines how the widget appears on the website:

```blade
@if ($config['title'])
    <div class="widget-title">
        <h3>{{ $config['title'] }}</h3>
    </div>
@endif

<div class="widget-content">
    {!! BaseHelper::clean($config['content']) !!}
</div>
```

#### Admin Configuration Form

There are two ways to define the admin configuration form for your widget:

##### 1. Using the `settingForm()` method (Recommended)

The recommended approach is to define the form directly in your widget class by implementing the `settingForm()` method, as shown in the example above. This approach provides better type safety, IDE autocompletion, and a more consistent developer experience.

```php
protected function settingForm(): WidgetForm|string|null
{
    return WidgetForm::createFromArray($this->getConfig())
        ->add('title', TextField::class, TextFieldOption::make()
            ->label(__('Title')))
        ->add('content', TextareaField::class, TextareaFieldOption::make()
            ->label(__('Content'))
            ->rows(4));
}
```

This method uses the Form Builder to create a structured form with proper validation and styling.

##### 2. Using a Backend Template (Legacy Approach)

Alternatively, you can create a `backend.blade.php` file in the `templates` directory of your widget. This approach is less recommended but may be found in older widgets:

```blade
<div class="form-group">
    <label for="widget-title">{{ __('Title') }}</label>
    <input type="text" class="form-control" name="title" value="{{ $config['title'] }}">
</div>

<div class="form-group">
    <label for="widget-content">{{ __('Content') }}</label>
    <textarea class="form-control" rows="4" name="content">{{ $config['content'] }}</textarea>
</div>
```

### Extending Existing Widgets

You can extend existing widgets from plugins. For example, to use the Blog Categories widget from the Blog plugin:

```php
<?php

use Botble\Base\Forms\FieldOptions\NameFieldOption;
use Botble\Base\Forms\FieldOptions\SelectFieldOption;
use Botble\Base\Forms\Fields\SelectField;
use Botble\Base\Forms\Fields\TextField;
use Botble\Blog\Widgets\Fronts\Categories;
use Botble\Widget\Forms\WidgetForm;

class BlogCategoriesWidget extends Categories
{
    // You can override the settingForm method to customize the admin form
    protected function settingForm(): WidgetForm|string|null
    {
        // Get the parent form and add additional fields or modify existing ones
        return parent::settingForm()
            ->add('custom_class', TextField::class, NameFieldOption::make()
                ->label(__('Custom CSS Class'))
                ->placeholder(__('Add custom CSS class for this widget')));
    }

    // You can also override the data method to provide additional data to the template
    protected function data(): array
    {
        $data = parent::data();

        // Add additional data
        $data['custom_class'] = $this->getConfig('custom_class');

        return $data;
    }
}
```

### Registering Widgets

To register your widget, create a `registration.php` file in your widget directory:

```php
<?php

require_once __DIR__ . '/example-widget.php';

register_widget(ExampleWidget::class);
```

Or register it directly in your theme's `functions/functions.php` file:

```php
register_widget(ExampleWidget::class);
```

### Available Form Fields

When creating your widget's admin configuration form using the `settingForm()` method, you can use various field types from the Form Builder. Here are some commonly used field types:

```php
// Text field
->add('title', TextField::class, TextFieldOption::make()->label(__('Title')))

// Textarea field
->add('content', TextareaField::class, TextareaFieldOption::make()->rows(4))

// Editor (WYSIWYG) field
->add('content', EditorField::class, EditorFieldOption::make())

// Number field
->add('limit', NumberField::class, NumberFieldOption::make()->label(__('Number of items')))

// Select field
->add('style', SelectField::class, SelectFieldOption::make()
    ->label(__('Style'))
    ->choices([
        'style-1' => __('Style 1'),
        'style-2' => __('Style 2'),
        'style-3' => __('Style 3'),
    ])
)

// On/Off switch
->add('show_title', OnOffField::class, OnOffFieldOption::make()->label(__('Show title')))

// Radio field
->add('display', RadioField::class, RadioFieldOption::make()
    ->label(__('Display'))
    ->choices([
        'horizontal' => __('Horizontal'),
        'vertical' => __('Vertical'),
    ])
)

// Checkbox field
->add('features', CheckboxField::class, CheckboxFieldOption::make()
    ->label(__('Features'))
    ->choices([
        'feature-1' => __('Feature 1'),
        'feature-2' => __('Feature 2'),
    ])
)
```

For more field types and options, refer to the Form Builder documentation.

## Multi-language Widget Fallback

When the [Language plugin](/cms/usage-multi-language) is active, widgets are stored per language using a theme name suffix (e.g., `shofy` for the default language, `shofy-fr` for French).

If no widgets have been configured for a non-default language, the system automatically falls back to the default language's widgets. An informational banner is shown in the admin panel when this inheritance is active, letting editors know they are viewing the default language's widgets.

This fallback applies to both the admin widget management page and the frontend rendering.

## Video Tutorials

- Widget Overview: https://www.youtube.com/watch?v=FXQwT_95jdA
