# SEO Helper

## Introduction

The SEO Helper package in Botble CMS provides a comprehensive set of tools for managing SEO metadata, Open Graph tags, Twitter cards, and more. It integrates seamlessly with the Theme package and other core components to ensure your website is optimized for search engines and social media sharing.

## Architecture

The SEO Helper package consists of several components:

1. **SeoHelper**: The main class that coordinates all SEO-related functionality.
2. **SeoMeta**: Manages basic meta tags like title, description, robots, etc.
3. **SeoOpenGraph**: Handles Open Graph tags for social media sharing.
4. **SeoTwitter**: Manages Twitter card metadata.

## SEO Meta Box

### Adding SEO Meta Box to Your Plugin

To add an SEO meta box to your plugin's forms, register your model with the SEO Helper:

```php
use Botble\SeoHelper\Facades\SeoHelper;

// In your plugin's service provider boot method
SeoHelper::registerModule([YourModel::class]);
```

This will add an SEO meta box to your model's edit page, allowing users to set custom SEO title, description, image, and indexing options.

### Supported Models

You can check which models are currently supported by the SEO Helper:

```php
$supportedModels = SeoHelper::supportedModules();
```

### Removing Support for a Model

```php
SeoHelper::removeModule(YourModel::class);
```

## Basic SEO Settings

### Setting Title and Description

```php
SeoHelper::setTitle('Your Page Title')
    ->setDescription('Your page description goes here. Keep it under 160 characters for best results.');
```

The title will be used for the `<title>` tag and the description for the `<meta name="description">` tag.

### Getting Title and Description

```php
$title = SeoHelper::getTitle(); // Gets the full title with site name
$titleOnly = SeoHelper::getTitleOnly(); // Gets just the page title without site name
$description = SeoHelper::getDescription();
```

### Adding Custom Meta Tags

```php
SeoHelper::meta()->addMeta('robots', 'index, follow');
SeoHelper::meta()->addMeta('author', 'Your Name');
SeoHelper::meta()->addMeta('copyright', 'Your Company ' . date('Y'));
```

You can chain multiple `addMeta` calls:

```php
SeoHelper::meta()
    ->addMeta('robots', 'index, follow')
    ->addMeta('author', 'Your Name')
    ->addMeta('copyright', 'Your Company ' . date('Y'));
```

## Open Graph Tags

Open Graph tags help control how your content appears when shared on social media platforms like Facebook.

### Basic Open Graph Tags

```php
SeoHelper::openGraph()
    ->setTitle('Your Open Graph Title')
    ->setDescription('Your Open Graph description')
    ->setUrl(url()->current())
    ->setType('article')
    ->setImage(RvMedia::getImageUrl('path/to/image.jpg'));
```

### Additional Open Graph Properties

```php
SeoHelper::openGraph()
    ->addProperty('locale', 'en_US')
    ->addProperty('site_name', 'Your Site Name')
    ->addProperty('image:width', '1200')
    ->addProperty('image:height', '630');
```

### Using a Custom Open Graph Instance

```php
use Botble\SeoHelper\SeoOpenGraph;

$openGraph = new SeoOpenGraph();
$openGraph->setTitle('Custom Open Graph Title')
    ->setDescription('Custom Open Graph Description')
    ->setUrl(url()->current())
    ->setType('website')
    ->setImage('path/to/image.jpg');

SeoHelper::setSeoOpenGraph($openGraph);
```

## Twitter Cards

Twitter Cards provide a rich media experience when your content is shared on Twitter.

### Setting Up Twitter Card

```php
SeoHelper::twitter()
    ->setTitle('Your Twitter Card Title')
    ->setDescription('Your Twitter Card Description')
    ->setUrl(url()->current())
    ->setType('summary_large_image')
    ->addImage(RvMedia::getImageUrl('path/to/image.jpg'));
```

### Setting Twitter Site and Creator

```php
SeoHelper::twitter()
    ->setSite('@YourTwitterHandle')
    ->setCreator('@AuthorTwitterHandle');
```

## Integration with Themes

### Theme Options

The SEO Helper integrates with Theme Options to provide site-wide SEO settings:

- **SEO Title**: Set in Theme Options under General settings
- **SEO Description**: Set in Theme Options under General settings
- **SEO Open Graph Image**: Default image for social sharing
- **SEO Index**: Control whether search engines should index your site

### Adding SEO Meta to Templates

In your theme's templates, you can add custom SEO meta tags:

```blade
@php
    SeoHelper::meta()->addMeta('robots', 'index, follow');

    if (isset($post) && $post->image) {
        SeoHelper::setImage(RvMedia::getImageUrl($post->image));
    }
@endphp
```

### Using Hooks

You can use the `BASE_ACTION_PUBLIC_RENDER_SINGLE` hook to add SEO meta tags to specific pages:

```php
// In platform/themes/your-theme/functions/functions.php
add_action(BASE_ACTION_PUBLIC_RENDER_SINGLE, function ($screen, $data) {
    if (in_array($screen, [PAGE_MODULE_SCREEN_NAME, POST_MODULE_SCREEN_NAME])) {
        SeoHelper::meta()->addMeta('robots', 'index, follow');

        SeoHelper::openGraph()
            ->addProperty('image:width', '1200')
            ->addProperty('image:height', '630');

        if ($data->image) {
            SeoHelper::twitter()->addImage(RvMedia::getImageUrl($data->image));
            SeoHelper::openGraph()->setImage(RvMedia::getImageUrl($data->image));
        }

        // Add structured data
        if ($screen === POST_MODULE_SCREEN_NAME) {
            echo '<script type="application/ld+json">' . json_encode([
                '@context' => 'https://schema.org',
                '@type' => 'Article',
                'headline' => $data->name,
                'description' => $data->description,
                'image' => RvMedia::getImageUrl($data->image),
                'datePublished' => $data->created_at->toIso8601String(),
                'dateModified' => $data->updated_at->toIso8601String(),
                'author' => [
                    '@type' => 'Person',
                    'name' => $data->author->name,
                ],
            ]) . '</script>';
        }
    }
}, 120, 2);
```

## Rendering SEO Meta

The SEO Helper is automatically rendered in the theme's header. If you need to render it manually, you can use:

```blade
{!! SeoHelper::render() !!}
```

Or simply:

```blade
{!! SeoHelper() !!}
```

## Advanced Usage

### Saving Custom SEO Meta Data

If you need to save custom SEO meta data for a model:

```php
SeoHelper::saveMetaData($screen, $request, $object);
```

Where:
- `$screen` is the screen name (e.g., 'post')
- `$request` is the current request object
- `$object` is the model instance

### Deleting SEO Meta Data

```php
SeoHelper::deleteMetaData($screen, $object);
```

### Customizing SEO Meta Box

You can customize the SEO meta box by extending the `SeoForm` class and registering your custom form in a service provider.

## Best Practices

1. **Keep Titles Concise**: Aim for titles under 60 characters to ensure they display properly in search results.

2. **Optimize Descriptions**: Write compelling descriptions under 160 characters that include relevant keywords.

3. **Use High-Quality Images**: For Open Graph and Twitter Cards, use images with dimensions of at least 1200x630 pixels.

4. **Set Canonical URLs**: For pages with duplicate content, set a canonical URL to avoid SEO penalties.

5. **Use Structured Data**: Implement structured data (JSON-LD) for rich search results.

6. **Monitor Indexing**: Use the robots meta tag to control how search engines index your content.

7. **Test Social Sharing**: Regularly test how your pages appear when shared on social media platforms.
