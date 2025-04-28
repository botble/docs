# Slug/Permalink Field

## Introduction

The Slug package in Botble CMS provides a powerful way to create and manage SEO-friendly URLs for your content. It automatically generates slugs from model names and provides a user-friendly interface for customizing permalinks.

The Slug system consists of several components:

1. **SlugHelper**: The main class that manages slug generation and retrieval
2. **Slug Model**: Stores slugs in the database with references to their parent models
3. **PermalinkField**: A form field for editing slugs in the admin panel
4. **SlugCompiler**: Handles dynamic variables in slug prefixes

## Basic Usage

### Registering a Model with SlugHelper

To add slug support to a model, you need to register it with the SlugHelper. Open your plugin's service provider and add the following code to the `boot` method:

```php
use Botble\Slug\Facades\SlugHelper;
use YourPlugin\Models\YourModel;

// In your service provider's boot method
SlugHelper::registerModule(YourModel::class);
SlugHelper::setPrefix(YourModel::class, 'your-prefix');
```

The `registerModule` method registers your model with the slug system, and the `setPrefix` method sets the URL prefix for your model's slugs. For example, if your prefix is `'products'`, the URL will be `http://your-domain.com/products/your-product-slug`.

### Using the Registering Callback

For better organization, you can use the `registering` method to group all your slug registrations:

```php
SlugHelper::registering(function (): void {
    SlugHelper::registerModule(YourModel::class, fn () => trans('your-plugin::base.your_models'));
    SlugHelper::setPrefix(YourModel::class, 'your-prefix');
});
```

### Setting a Custom Column for Slug Generation

By default, slugs are generated from the `name` column of your model. If you want to use a different column, you can specify it with the `setColumnUsedForSlugGenerator` method:

```php
SlugHelper::setColumnUsedForSlugGenerator(YourModel::class, 'title');
```

### Allowing Empty Prefixes

If you want to allow empty prefixes for your model (for example, for pages that should be at the root level), you can set the third parameter of `setPrefix` to `true`:

```php
SlugHelper::setPrefix(YourModel::class, null, true);
```

## Adding the Permalink Field to Forms

### Using Form Builder

If you're using the Form Builder, the permalink field will be added automatically to your forms for models that are registered with SlugHelper.

### Manual Integration

If you're not using Form Builder, you can add the permalink field manually:

#### For Creating Forms

```php
<div class="form-group @if ($errors->has('slug')) has-error @endif">
    {!! Form::permalink('slug', old('slug'), 0, 'your-prefix') !!}
    {!! Form::error('slug', $errors) !!}
</div>
```

#### For Editing Forms

```php
<div class="form-group @if ($errors->has('slug')) has-error @endif">
    {!! Form::permalink('slug', $data->slug, $data->id, SlugHelper::getPrefix(YourModel::class)) !!}
    {!! Form::error('slug', $errors) !!}
</div>
```

## Handling Slug Routes

To handle requests to your slugged URLs, you need to add a route and a controller method:

### Adding the Route

```php
Route::group(apply_filters(BASE_FILTER_GROUP_PUBLIC_ROUTE, []), function () {
    Route::get(SlugHelper::getPrefix(YourModel::class) . '/{slug}', [
        'as' => 'your-plugin.public.detail',
        'uses' => 'YourPlugin\Http\Controllers\PublicController@getDetail',
    ]);
});
```

### Controller Method

```php
use Botble\Slug\Models\Slug;
use YourPlugin\Models\YourModel;
use Botble\Theme\Facades\Theme;

public function getDetail(string $slug)
{
    $slugObj = Slug::query()->where([
        'key' => $slug,
        'reference_type' => YourModel::class,
    ])->first();

    if (!$slugObj) {
        abort(404);
    }

    $data = YourModel::query()->findOrFail($slugObj->reference_id);

    do_action(BASE_ACTION_PUBLIC_RENDER_SINGLE, YOUR_PLUGIN_MODULE_SCREEN_NAME, $data);

    return Theme::scope('your-plugin.detail', compact('data'))->render();
}
```

## Advanced Features

### Dynamic Prefixes with Variables

You can use variables in your prefixes that will be replaced dynamically:

```php
SlugHelper::setPrefix(YourModel::class, '%%year%%/%%month%%/your-prefix');
```

Available variables:
- `%%year%%`: Current year
- `%%month%%`: Current month
- `%%day%%`: Current day

You can add custom variables using the `cms_slug_variables` filter.

### Accessing the URL from a Model

Models registered with SlugHelper automatically get a `url` attribute that returns the full URL:

```php
$model = YourModel::find(1);
echo $model->url; // http://your-domain.com/your-prefix/your-slug
```

They also get a `slug` attribute that returns just the slug string:

```php
echo $model->slug; // your-slug
```

### Creating Slugs Programmatically

You can create slugs programmatically using the `createSlug` method:

```php
use Botble\Slug\Facades\SlugHelper;

$model = YourModel::find(1);
$slug = SlugHelper::createSlug($model, 'custom-slug');
```

If you don't provide a custom slug, it will be generated from the model's name (or the column specified with `setColumnUsedForSlugGenerator`).

### Customizing Slug Generation

You can customize how slugs are generated by using the `FILTER_SLUG_STRING` filter:

```php
add_filter(FILTER_SLUG_STRING, function ($slug, $model) {
    // Customize the slug
    return $slug;
}, 20, 2);
```

You can also handle slug conflicts with the `FILTER_SLUG_EXISTED_STRING` filter:

```php
add_filter(FILTER_SLUG_EXISTED_STRING, function ($slug, $baseSlug, $count, $model) {
    // Customize how duplicate slugs are handled
    return $baseSlug . '-' . $count;
}, 20, 4);
```

## Using HasSlug Trait

For models that don't need the full slug system (like internal models that don't have public URLs), you can use the `HasSlug` trait:

```php
use Botble\Base\Models\BaseModel;
use Botble\Base\Models\Concerns\HasSlug;

class YourModel extends BaseModel
{
    use HasSlug;

    protected $fillable = [
        'name',
        'slug',
        // other fields
    ];

    protected static function booted(): void
    {
        self::saving(function (self $model): void {
            $model->slug = self::createSlug($model->slug ?: $model->name, $model->getKey());
        });
    }
}
```

The `HasSlug` trait provides a simple `createSlug` method that ensures unique slugs within the model's table.

## Settings

The Slug package adds settings to the admin panel that allow users to customize permalinks for each registered model. These settings are available in the Settings section under the "Permalinks" tab.

Users can:

1. Set custom prefixes for each model
2. Enable/disable automatic URL translation into Latin
3. Set a custom ending for URLs (e.g., ".html")

## Best Practices

1. **Register Early**: Register your models with SlugHelper in your service provider's boot method to ensure the slug system is properly set up.

2. **Use Translations**: Use translation strings for model names when registering with SlugHelper for better localization.

3. **Consider SEO**: Choose meaningful prefixes that help with SEO and user navigation.

4. **Handle Redirects**: When slugs change, consider implementing redirects from old URLs to new ones to maintain SEO value.

5. **Validate Slugs**: Add validation rules for slugs to ensure they meet your requirements.
