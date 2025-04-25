# Shortcode

## Introduction

Shortcodes are small pieces of code that can be inserted into page or post content to perform specific functions. They allow you to add dynamic content or complex features without writing HTML or PHP code directly in your content.

## Registering a Shortcode

There are two ways to register a shortcode in Botble CMS:

### Method 1: Using the `add_shortcode` Helper Function

```php
add_shortcode(string $key, ?string $name, ?string $description = null, $callback = null, string $previewImage = '')
```

Parameters:
- `$key`: (string) (Required) The shortcode tag name
- `$name`: (string) (Required) The title of the shortcode
- `$description`: (string) (Optional) Description of what the shortcode does
- `$callback`: (callable|string|array|null) (Required) Function to run when shortcode is found
- `$previewImage`: (string) (Optional) URL to an image that previews the shortcode output

Example:

```php
add_shortcode('my-block', 'My Block', 'Custom block for me', function ($shortcode) {
    // $shortcode object contains all attributes passed to the shortcode
    return 'This is my custom block. Title: ' . $shortcode->title;
});
```

### Method 2: Using the Shortcode Facade

```php
use Botble\Shortcode\Facades\Shortcode;

Shortcode::register('my-block', 'My Block', 'Custom block for me', function ($shortcode) {
    return 'This is my custom block. Title: ' . $shortcode->title;
});
```

::: tip
You can add shortcode registrations to `your-theme/functions/shortcodes.php` or in the `boot` method of your plugin service provider.
:::

## Using Shortcodes in Themes

### Automatic Shortcode Processing

By default, shortcodes are automatically processed in certain theme views: `index.blade.php`, `page.blade.php`, and `post.blade.php`. This is configured in your theme's `config.php` file:

```php
$theme->composer(['index', 'page', 'post'], function(View $view) {
    $view->withShortcodes();
});
```

This means you can add shortcodes to page or post content, and they will be automatically processed and displayed.

### Enabling Shortcodes in Other Views

If you want to enable shortcode processing in other views, add them to the theme view composer in your `config.php` file:

```php
$theme->composer(['index', 'page', 'post', 'custom-template'], function(View $view) {
    $view->withShortcodes();
});
```

### Manual Shortcode Processing

You can also manually process shortcodes using the `do_shortcode()` function:

```php
do_shortcode(string $content)
```

Parameters:
- `$content`: (string) (Required) Content containing shortcode tags to be processed

Example:

```php
{!! do_shortcode('[my-block title="Hello World"][/my-block]') !!}
```

You can also use the Blade directive:

```php
@shortcode('[my-block title="Hello World"][/my-block]')
```

::: warning
If there are no shortcode tags defined, then the content will be returned without any filtering. This might cause issues when plugins are disabled, but the shortcode will still show up in the post or content.
:::

## Generating Shortcode Tags

### Method 1: Using the Helper Function

```php
echo generate_shortcode('my-block', ['title' => 'Hello World']);
```

Parameters:
- First parameter: (string) (Required) The shortcode name
- Second parameter: (array) (Optional) Attributes for the shortcode
- Third parameter: (string) (Optional) Content between opening and closing tags
- Fourth parameter: (bool) (Optional) Enable lazy loading

### Method 2: Using the Shortcode Facade

```php
use Botble\Shortcode\Facades\Shortcode;

echo Shortcode::generateShortcode('my-block', ['title' => 'Hello World']);
```

Example with content and lazy loading:

```php
echo Shortcode::generateShortcode('my-block', ['title' => 'Hello World'], 'Content here', true);
// Outputs: [my-block title="Hello World" enable_lazy_loading="yes"]Content here[/my-block]
```

## Configuring Admin Interface for Shortcodes

Botble CMS provides a way to create admin configuration forms for your shortcodes, allowing users to configure shortcode parameters through a user-friendly interface in the admin panel.

### Setting Admin Config

```php
use Botble\Shortcode\Facades\Shortcode;
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\Fields\NumberField;
use Botble\Base\Forms\FieldOptions\TextFieldOption;
use Botble\Shortcode\Forms\ShortcodeForm;

Shortcode::setAdminConfig('my-block', function (array $attributes) {
    return ShortcodeForm::createFromArray($attributes)
        ->withLazyLoading()
        ->add('title', TextField::class, TextFieldOption::make()->label('Title'))
        ->add('limit', NumberField::class, TextFieldOption::make()->label('Limit')->defaultValue(5))
        ->withHtmlAttributes('#fff', '#666'); // Background color, text color
});
```

### Adding a Preview Image

You can set a preview image for your shortcode to make it more visually recognizable in the admin panel:

```php
use Botble\Shortcode\Facades\Shortcode;
use Botble\Theme\Facades\Theme;

Shortcode::setPreviewImage('my-block', Theme::asset()->url('images/shortcodes/my-block.png'));
```

### Available Form Fields

You can use any form field available in the Form Builder, including:

- TextField
- TextareaField
- NumberField
- EmailField
- PasswordField
- SelectField
- RadioField
- CheckboxField
- ColorField
- DateField
- TimeField
- EditorField
- MediaImageField
- And more...

### Advanced Form Configuration

For more complex shortcodes, you can create a dedicated form class:

```php
namespace YourPlugin\Forms;

use Botble\Base\Forms\FieldOptions\TextFieldOption;
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\Fields\SelectField;
use Botble\Base\Forms\FieldOptions\SelectFieldOption;
use Botble\Shortcode\Forms\ShortcodeForm;

class YourShortcodeForm extends ShortcodeForm
{
    public function setup(): void
    {
        parent::setup();

        $this
            ->withLazyLoading()
            ->add('title', TextField::class, TextFieldOption::make()->label('Title'))
            ->add(
                'style',
                SelectField::class,
                SelectFieldOption::make()
                    ->label('Style')
                    ->choices([
                        'style-1' => 'Style 1',
                        'style-2' => 'Style 2',
                        'style-3' => 'Style 3',
                    ])
            );
    }
}
```

Then register it:

```php
Shortcode::setAdminConfig('your-shortcode', YourShortcodeForm::class);
```

## Advanced Shortcode Features

### Tabs in Shortcodes

You can create tabbed interfaces in your shortcode admin forms using the `tabs` method from the `ShortcodeField` class:

```php
use Botble\Shortcode\Facades\Shortcode;

Shortcode::setAdminConfig('tabs-shortcode', function (array $attributes, ?string $content) {
    return ShortcodeForm::createFromArray($attributes)
        ->add('title', TextField::class, TextFieldOption::make()->label('Title'))
        ->add(
            'tabs',
            'tabs',
            [
                'fields' => [
                    'title',
                    'content',
                ],
                'attributes' => $attributes,
                'min' => 1,
                'max' => 10,
            ]
        );
});
```

In your shortcode callback, you can retrieve the tabs data:

```php
Shortcode::register('tabs-shortcode', 'Tabs', 'Create tabs content', function ($shortcode) {
    $tabs = shortcode()->fields()->getTabsData(['title', 'content'], $shortcode);

    return view('theme.shortcodes.tabs', compact('shortcode', 'tabs'));
});
```

### Lazy Loading Shortcodes

You can enable lazy loading for shortcodes to improve page load performance:

```php
ShortcodeForm::createFromArray($attributes)
    ->withLazyLoading()
    // other fields...
```

This will add the `enable_lazy_loading` attribute to the shortcode, which you can check in your shortcode callback to implement lazy loading behavior.

## Complete Example

Here's a complete example of creating a featured posts shortcode with admin configuration:

```php
use Botble\Base\Forms\FieldOptions\NumberFieldOption;
use Botble\Base\Forms\FieldOptions\SelectFieldOption;
use Botble\Base\Forms\FieldOptions\TextFieldOption;
use Botble\Base\Forms\Fields\NumberField;
use Botble\Base\Forms\Fields\SelectField;
use Botble\Base\Forms\Fields\TextField;
use Botble\Shortcode\Compilers\Shortcode as ShortcodeCompiler;
use Botble\Shortcode\Facades\Shortcode;
use Botble\Shortcode\Forms\ShortcodeForm;
use Botble\Theme\Facades\Theme;

// Register the shortcode
Shortcode::register(
    'featured-posts',
    'Featured Posts',
    'Display featured blog posts',
    function (ShortcodeCompiler $shortcode) {
        // Get posts from the database
        $posts = get_featured_posts((int) $shortcode->limit ?: 5, [
            'author',
        ]);

        if ($posts->isEmpty()) {
            return null;
        }

        // Render the shortcode view
        return Theme::partial('shortcodes.featured-posts', compact('posts', 'shortcode'));
    }
);

// Set a preview image for the shortcode
Shortcode::setPreviewImage('featured-posts', Theme::asset()->url('images/shortcodes/featured-posts.png'));

// Configure the admin interface
Shortcode::setAdminConfig('featured-posts', function (array $attributes) {
    return ShortcodeForm::createFromArray($attributes)
        ->withLazyLoading()
        ->add(
            'title',
            TextField::class,
            TextFieldOption::make()->label('Title')
        )
        ->add(
            'limit',
            NumberField::class,
            NumberFieldOption::make()->label('Number of posts')->defaultValue(5)
        )
        ->add(
            'style',
            SelectField::class,
            SelectFieldOption::make()
                ->label('Style')
                ->choices([
                    'style-1' => 'Grid',
                    'style-2' => 'List',
                    'style-3' => 'Carousel',
                ])
                ->defaultValue('style-1')
        )
        ->withHtmlAttributes('#f8f9fa', '#333');
});
```

And here's an example of the view file (`views/theme/shortcodes/featured-posts.blade.php`):

```php
<div class="featured-posts {{ $shortcode->style ?? 'style-1' }}">
    @if ($shortcode->title)
        <h2 class="section-title">{{ $shortcode->title }}</h2>
    @endif

    <div class="posts-wrapper">
        @foreach ($posts as $post)
            <div class="post-item">
                <div class="post-thumb">
                    <a href="{{ $post->url }}">
                        <img src="{{ RvMedia::getImageUrl($post->image) }}" alt="{{ $post->name }}">
                    </a>
                </div>
                <div class="post-content">
                    <h3 class="post-title">
                        <a href="{{ $post->url }}">{{ $post->name }}</a>
                    </h3>
                    <div class="post-meta">
                        <span class="post-date">{{ $post->created_at->format('M d, Y') }}</span>
                        @if ($post->author)
                            <span class="post-author">by {{ $post->author->name }}</span>
                        @endif
                    </div>
                    <div class="post-excerpt">
                        {{ Str::limit($post->description, 120) }}
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>
```
