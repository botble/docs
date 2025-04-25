# Meta Boxes

## Introduction

Meta boxes in Botble CMS provide a way to add custom fields and data to models. This concept is inspired by WordPress meta boxes but has been enhanced with Laravel's powerful features. Meta boxes allow you to extend existing models with additional fields without modifying the database schema.

Meta boxes are stored in the `meta_boxes` table with the following structure:
- `meta_key`: The key to identify the meta data
- `meta_value`: The value of the meta data (stored as JSON)
- `reference_id`: The ID of the model
- `reference_type`: The class name of the model

## Architecture

The meta box system consists of several components:

1. **MetaBox Class**: The main class that handles adding, retrieving, and saving meta boxes
2. **MetaBox Model**: The Eloquent model that represents the meta_boxes table
3. **HasMetadata Trait**: A trait that can be added to models to provide meta data functionality
4. **Form Integration**: Integration with the form builder for easy creation of meta box fields

## Adding Meta Boxes

### Using the Action Hook

The most common way to add a meta box is by using the `BASE_ACTION_META_BOXES` action hook:

```php
use Botble\Base\Facades\MetaBox;

add_action(BASE_ACTION_META_BOXES, function (string $context, $object) {
    if (is_plugin_active('blog') && $object instanceof \Botble\Blog\Models\Post && $context == 'advanced') {
        MetaBox::addMetaBox(
            'additional_post_fields',
            __('Additional Information'),
            'post_additional_fields',
            get_class($object),
            $context,
            'default'
        );
    }
}, 120, 2);
```

### MetaBox::addMetaBox Parameters

```php
MetaBox::addMetaBox(
    string $id,
    string $title,
    string|array|callable|Closure $callback,
    ?string $reference = null,
    string $context = 'advanced',
    string $priority = 'default',
    ?array $callbackArgs = null
);
```

- **$id**: (Required) Unique identifier for the meta box
- **$title**: (Required) Title displayed in the meta box header
- **$callback**: (Required) Function that renders the meta box content
- **$reference**: (Optional) The model class name where the meta box should appear
- **$context**: (Optional) The position of the meta box ('advanced', 'side', 'normal')
- **$priority**: (Optional) The priority within the context ('high', 'default', 'low')
- **$callbackArgs**: (Optional) Additional arguments passed to the callback function

### Creating the Callback Function

The callback function is responsible for rendering the meta box content:

```php
function post_additional_fields() {
    $videoLink = null;
    $args = func_get_args();

    if (!empty($args[0])) {
        $videoLink = MetaBox::getMetaData($args[0], 'video_link', true);
    }

    return Theme::partial('post-fields', compact('videoLink'));
}
```

The callback function receives the following arguments:
1. The model instance
2. The reference (model class name)
3. The meta box configuration

### Creating the View

Create a view file to render the meta box content:

```blade
{{-- your-theme/partials/post-fields.blade.php --}}
<div class="form-group mb-3">
    <label for="video-link" class="form-label">{{ __('Video URL') }}</label>
    <input type="text" name="video_link" value="{{ $videoLink }}" class="form-control" id="video-link">
</div>
```

::: tip
You can place the view in your theme's partials directory or in your plugin's views directory. If using a plugin view, replace `Theme::partial('post-fields')` with `view('plugins.your-plugin.partials.post-fields')`.
:::

## Saving Meta Box Data

To save meta box data, use the `BASE_ACTION_AFTER_CREATE_CONTENT` and `BASE_ACTION_AFTER_UPDATE_CONTENT` action hooks:

```php
use Botble\Base\Facades\MetaBox;

add_action([BASE_ACTION_AFTER_CREATE_CONTENT, BASE_ACTION_AFTER_UPDATE_CONTENT], function ($type, $request, $object) {
    if ($object instanceof \Botble\Blog\Models\Post) {
        MetaBox::saveMetaBoxData($object, 'video_link', $request->input('video_link'));
    }
}, 230, 3);
```

### MetaBox::saveMetaBoxData Parameters

```php
MetaBox::saveMetaBoxData(Model $object, string $key, $value, $options = null);
```

- **$object**: (Required) The model instance to save meta data for
- **$key**: (Required) The meta key
- **$value**: (Required) The meta value
- **$options**: (Optional) Additional options for the meta data

## Retrieving Meta Box Data

### Getting a Single Value

```php
$videoLink = MetaBox::getMetaData($post, 'video_link', true);
```

### Getting Multiple Values

```php
$metaValues = MetaBox::getMetaData($post, 'gallery_images');
```

### MetaBox::getMetaData Parameters

```php
MetaBox::getMetaData(
    Model $object,
    string $key,
    bool $single = false,
    array $select = ['meta_value']
);
```

- **$object**: (Required) The model instance
- **$key**: (Required) The meta key
- **$single**: (Optional) Whether to return a single value or an array
- **$select**: (Optional) The columns to select from the meta_boxes table

## Deleting Meta Box Data

```php
MetaBox::deleteMetaData($post, 'video_link');
```

## Advanced Usage

### Using with Form Builder

You can integrate meta boxes with the Form Builder by using the `BASE_FILTER_BEFORE_RENDER_FORM` filter:

```php
use Botble\Base\Facades\MetaBox;
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\FieldOptions\TextFieldOption;

add_filter(BASE_FILTER_BEFORE_RENDER_FORM, function ($form, $data) {
    if ($data instanceof \Botble\Blog\Models\Post) {
        $metaValue = MetaBox::getMetaData($data, 'custom_field', true);

        $form
            ->add(
                'custom_field',
                TextField::class,
                TextFieldOption::make()
                    ->label(__('Custom Field'))
                    ->value($metaValue)
            );
    }

    return $form;
}, 120, 2);

add_action([BASE_ACTION_AFTER_CREATE_CONTENT, BASE_ACTION_AFTER_UPDATE_CONTENT], function ($screen, $request, $data) {
    if ($data instanceof \Botble\Blog\Models\Post) {
        MetaBox::saveMetaBoxData($data, 'custom_field', $request->input('custom_field'));
    }
}, 120, 3);
```

### Using with HasMetadata Trait

Models can implement the `HasMetadata` trait to directly access meta data:

```php
namespace App\Models;

use Botble\Base\Models\BaseModel;
use Botble\Base\Models\Concerns\HasMetadata;

class CustomModel extends BaseModel
{
    use HasMetadata;

    // ... other model code
}
```

Then you can access meta data directly from the model:

```php
$model = CustomModel::find(1);
$value = $model->getMetaData('custom_field', true);
```

### Creating Complex Meta Boxes

For more complex meta boxes, you can use closures as callbacks:

```php
MetaBox::addMetaBox(
    'seo_wrap',
    __('SEO Configuration'),
    function () {
        $args = func_get_args();
        $model = $args[0];

        $meta = [
            'seo_title' => null,
            'seo_description' => null,
            'seo_image' => null,
        ];

        if ($model->id) {
            $metadata = MetaBox::getMetaData($model, 'seo_meta', true);
            if ($metadata && is_array($metadata)) {
                $meta = array_merge($meta, $metadata);
            }
        }

        return view('plugins.seo.meta-box', compact('meta', 'model'))->render();
    },
    get_class($model)
);
```

## Real-World Examples

### Gallery Meta Box

The Gallery plugin uses meta boxes to store images for various models:

```php
MetaBox::addMetaBox(
    'gallery_wrap',
    __('Gallery'),
    [$this, 'galleryMetaField'],
    $object::class,
    'advanced'
);

// Callback method
public function galleryMetaField($object)
{
    $value = gallery_meta_data($object);

    return view('plugins.gallery.gallery-box', compact('value', 'object'))->render();
}

// Saving the data
add_action(BASE_ACTION_AFTER_CREATE_CONTENT, function ($type, $request, $object) {
    if (in_array(get_class($object), Gallery::getSupportedModules()) && $request->has('gallery')) {
        MetaBox::saveMetaBoxData($object, 'gallery', $request->input('gallery'));
    }
}, 230, 3);
```

### SEO Meta Box

The SEO Helper package uses meta boxes to store SEO configuration:

```php
MetaBox::addMetaBox(
    'seo_wrap',
    __('SEO Configuration'),
    [$this, 'seoMetaBox'],
    $object::class,
    'advanced',
    'low'
);

// Callback method
public function seoMetaBox()
{
    $args = func_get_args();
    $object = $args[0];

    $meta = [
        'seo_title' => null,
        'seo_description' => null,
        'seo_image' => null,
    ];

    if ($object->id) {
        $metadata = MetaBox::getMetaData($object, 'seo_meta', true);
        if ($metadata && is_array($metadata)) {
            $meta = array_merge($meta, $metadata);
        }
    }

    return view('packages.seo-helper.meta-box', compact('meta', 'object'))->render();
}

// Saving the data
public function saveMetaData($screen, $request, $object)
{
    if (in_array(get_class($object), config('packages.seo-helper.general.supported', []))) {
        MetaBox::saveMetaBoxData($object, 'seo_meta', $request->input('seo_meta', []));
    }
}
```

## Best Practices

1. **Use Unique Keys**: Always use unique meta keys to avoid conflicts with other plugins or themes.

2. **Validate Input**: Always validate user input before saving meta data.

3. **Use Namespaced Keys**: Consider prefixing your meta keys with your plugin or theme name to avoid conflicts.

4. **Check for Existence**: Always check if the model exists before saving meta data.

5. **Use Appropriate Hooks**: Use the correct action hooks for adding and saving meta boxes.

6. **Optimize Queries**: When retrieving multiple meta values, consider using a single query instead of multiple queries.

7. **Clean Up**: Delete meta data when the associated model is deleted to prevent orphaned records.

## Complete Example

Here's a complete example of adding a meta box to the Post model:

```php
// In your-theme/functions/functions.php or plugin service provider

use Botble\Base\Facades\MetaBox;
use Botble\Blog\Models\Post;
use Botble\Theme\Facades\Theme;

// Add the meta box
add_action(BASE_ACTION_META_BOXES, function (string $context, $object) {
    if ($object instanceof Post && $context == 'advanced') {
        MetaBox::addMetaBox(
            'additional_post_fields',
            __('Additional Information'),
            'post_additional_fields',
            get_class($object),
            $context,
            'default'
        );
    }
}, 24, 2);

// Callback function to render the meta box
function post_additional_fields() {
    $videoLink = null;
    $downloadLink = null;
    $args = func_get_args();

    if (!empty($args[0])) {
        $videoLink = MetaBox::getMetaData($args[0], 'video_link', true);
        $downloadLink = MetaBox::getMetaData($args[0], 'download_link', true);
    }

    return Theme::partial('post-fields', compact('videoLink', 'downloadLink'));
}

// Save the meta box data
add_action([BASE_ACTION_AFTER_CREATE_CONTENT, BASE_ACTION_AFTER_UPDATE_CONTENT], function ($type, $request, $object) {
    if ($object instanceof Post) {
        MetaBox::saveMetaBoxData($object, 'video_link', $request->input('video_link'));
        MetaBox::saveMetaBoxData($object, 'download_link', $request->input('download_link'));
    }
}, 230, 3);
```

And the view file:

```blade
{{-- your-theme/partials/post-fields.blade.php --}}
<div class="row">
    <div class="col-md-6">
        <div class="form-group mb-3">
            <label for="video-link" class="form-label">{{ __('Video URL') }}</label>
            <input type="text" name="video_link" value="{{ $videoLink }}" class="form-control" id="video-link">
            <small class="form-text text-muted">{{ __('YouTube or Vimeo video URL') }}</small>
        </div>
    </div>
    <div class="col-md-6">
        <div class="form-group mb-3">
            <label for="download-link" class="form-label">{{ __('Download Link') }}</label>
            <input type="text" name="download_link" value="{{ $downloadLink }}" class="form-control" id="download-link">
            <small class="form-text text-muted">{{ __('Link to downloadable file') }}</small>
        </div>
    </div>
</div>
```
