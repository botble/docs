# Color Field

The color field provides a color picker interface for selecting colors.

```php
use Botble\Base\Forms\Fields\ColorField;
use Botble\Base\Forms\FieldOptions\ColorFieldOption;

$this->add(
    'color', 
    ColorField::class, 
    ColorFieldOption::make()
        ->label(__('Color'))
        ->defaultValue('#000000')
);
```

## Color Selector Field

The color selector field provides a dropdown with predefined color options.

```php
use Botble\Base\Forms\Fields\ColorSelectorField;
use Botble\Base\Forms\FieldOptions\SelectFieldOption;

$this->add(
    'color_scheme', 
    ColorSelectorField::class, 
    SelectFieldOption::make()
        ->label(__('Color Scheme'))
        ->choices([
            'red' => __('Red'),
            'blue' => __('Blue'),
            'green' => __('Green'),
            'yellow' => __('Yellow'),
            'purple' => __('Purple'),
        ])
);
```
