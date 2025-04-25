# Botble Enum

## Introduction

Botble CMS provides a powerful Enum system that extends beyond PHP's native enums. The `Enum` class in Botble CMS offers a flexible way to define and work with enumerated values throughout your application. Enums are particularly useful for representing status values, types, and other fixed sets of options.

Botble Enums provide several advantages:

- Type safety and autocompletion in your IDE
- Consistent representation of values across your application
- Built-in translation support
- HTML rendering capabilities for admin interfaces
- Database casting for seamless model integration

## Creating a Custom Enum

To create a custom enum, extend the `Botble\Base\Supports\Enum` class:

```php
<?php

namespace App\Enums;

use Botble\Base\Supports\Enum;

/**
 * @method static PostFormatEnum TEXT()
 * @method static PostFormatEnum VIDEO()
 * @method static PostFormatEnum GALLERY()
 */
class PostFormatEnum extends Enum
{
    public const TEXT = 'text';
    public const VIDEO = 'video';
    public const GALLERY = 'gallery';

    // Define the language path for translations
    public static $langPath = 'app::enums.post-formats';
}
```

The `@method` docblocks are important as they provide IDE autocompletion for your enum values.

## Using Enums

### Basic Usage

```php
// Get an enum instance
$format = PostFormatEnum::TEXT();

// Get the enum value
$value = $format->getValue(); // 'text'

// Convert to string
$string = (string) $format; // 'text'

// Check if a value is valid
PostFormatEnum::isValid('text'); // true
PostFormatEnum::isValid('invalid'); // false

// Get all possible values
$values = PostFormatEnum::toArray();
// ['TEXT' => 'text', 'VIDEO' => 'video', 'GALLERY' => 'gallery']

// Get all enum keys
$keys = PostFormatEnum::keys();
// ['TEXT', 'VIDEO', 'GALLERY']
```

### Labels and Translations

Botble Enums support automatic translation of enum values. Define translations in a language file that matches your `$langPath`:

```php
// resources/lang/en/app/enums.php
return [
    'post-formats' => [
        'text' => 'Text',
        'video' => 'Video',
        'gallery' => 'Gallery',
    ],
];
```

Then you can get the translated label:

```php
// Get a translated label for a single value
$label = PostFormatEnum::getLabel('text'); // 'Text'

// Get all labels
$labels = PostFormatEnum::labels();
// ['text' => 'Text', 'video' => 'Video', 'gallery' => 'Gallery']
```

### HTML Rendering

You can customize how enum values are rendered as HTML by overriding the `toHtml()` method:

```php
use Botble\Base\Facades\Html;
use Illuminate\Support\HtmlString;

public function toHtml(): HtmlString|string
{
    return match ($this->value) {
        self::TEXT => Html::tag('span', self::TEXT()->label(), ['class' => 'badge bg-primary']),
        self::VIDEO => Html::tag('span', self::VIDEO()->label(), ['class' => 'badge bg-info']),
        self::GALLERY => Html::tag('span', self::GALLERY()->label(), ['class' => 'badge bg-success']),
        default => parent::toHtml(),
    };
}
```

Then you can render the HTML in your views:

```php
{!! PostFormatEnum::TEXT()->toHtml() !!}
```

## Using Enums with Models

Botble Enums can be used with Eloquent models through the `$casts` property:

```php
protected $casts = [
    'status' => BaseStatusEnum::class,
    'format' => PostFormatEnum::class,
];
```

This allows you to work with enum objects directly:

```php
$post = Post::find(1);

// Get the enum object
$status = $post->status; // BaseStatusEnum instance

// Check the status
if ($post->status->getValue() === BaseStatusEnum::PUBLISHED) {
    // Do something
}

// Or more simply
if ($post->status === BaseStatusEnum::PUBLISHED()) {
    // Do something
}

// Set the status
$post->status = BaseStatusEnum::DRAFT();
$post->save();
```

## Using Enums in Forms

Botble Enums work seamlessly with form fields:

```php
use Botble\Base\Forms\Fields\SelectField;
use Botble\Base\Forms\FieldOptions\SelectFieldOption;

$this->add('format', SelectField::class, SelectFieldOption::make()
    ->label('Format')
    ->choices(PostFormatEnum::labels())
);
```

For radio buttons:

```php
use Botble\Base\Forms\Fields\RadioField;
use Botble\Base\Forms\FieldOptions\RadioFieldOption;

$this->add('format', RadioField::class, RadioFieldOption::make()
    ->label('Format')
    ->choices(PostFormatEnum::labels())
    ->defaultValue(PostFormatEnum::TEXT)
);
```

## Using Enums in Tables

Botble CMS provides an `EnumColumn` for displaying enum values in tables:

```php
use Botble\Table\Columns\EnumColumn;

$this->addColumns([
    // Other columns...
    EnumColumn::make('status')
        ->title(trans('core/base::tables.status'))
        ->width(100),
]);
```

The `EnumColumn` automatically renders the HTML representation of the enum value.

## Extending Existing Enums

You can extend existing enums by adding new values using filters:

```php
add_filter(BASE_FILTER_ENUM_ARRAY, function ($values, $class) {
    if ($class == \Botble\Base\Enums\BaseStatusEnum::class) {
        $values['DISABLED'] = 'disabled';
    }

    return $values;
}, 20, 2);
```

### Customizing Labels

You can customize the labels for enum values:

```php
add_filter(BASE_FILTER_ENUM_LABEL, function ($value, $class) {
    if ($class == \Botble\Base\Enums\BaseStatusEnum::class && $value == 'disabled') {
        $value = 'Disabled';
    }

    return $value;
}, 20, 2);
```

### Customizing HTML Rendering

You can customize how enum values are rendered as HTML:

```php
add_filter(BASE_FILTER_ENUM_HTML, function ($value, $class) {
    if ($class == \Botble\Base\Enums\BaseStatusEnum::class && $value == 'disabled') {
        $value = \Html::tag('span', \Botble\Base\Enums\BaseStatusEnum::getLabel($value), ['class' => 'badge bg-danger'])
            ->toHtml();
    }

    return $value;
}, 20, 2);
```

## Common Enums in Botble CMS

Botble CMS includes several built-in enums that you can use in your application:

### BaseStatusEnum

The most commonly used enum for status fields:

```php
use Botble\Base\Enums\BaseStatusEnum;

// Available values
BaseStatusEnum::PUBLISHED; // 'published'
BaseStatusEnum::DRAFT; // 'draft'
BaseStatusEnum::PENDING; // 'pending'
```

### Other Built-in Enums

- `UserStatusEnum`: For user status (activated, deactivated)
- `ContactStatusEnum`: For contact form submissions (read, unread)
- `NewsletterStatusEnum`: For newsletter subscriptions (subscribed, unsubscribed)

## Best Practices

1. **Use Constants**: Always define enum values as constants for better type safety and refactoring support.

2. **Add Method Annotations**: Include `@method` annotations for IDE autocompletion.

3. **Use Translation Keys**: Set up a proper `$langPath` and use translation files for labels.

4. **Override toHtml()**: Customize the HTML rendering for consistent UI representation.

5. **Use Type Hints**: Use proper type hints in method signatures to leverage IDE support.

6. **Use with Models**: Take advantage of Eloquent casting for seamless integration with models.
