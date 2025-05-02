# Breadcrumb

Breadcrumbs are an important navigation element that helps users understand their current location within a website's hierarchy. Botble CMS provides a flexible breadcrumb system that can be easily integrated into your theme.

## Adding Breadcrumb Items

Botble CMS automatically adds a "Home" item to the breadcrumb by default. You can add additional items to the breadcrumb trail using the following methods:

### Method 1: Adding Items Individually

```php
Theme::breadcrumb()->add('Category', route('category.index'))
    ->add('Post Title', route('post.show', ['id' => 1]));
```

### Method 2: Adding Multiple Items at Once

```php
Theme::breadcrumb()->add([
    [
        'label' => 'Category',
        'url'   => route('category.index')
    ],
    [
        'label' => 'Post Title',
        'url'   => route('post.show', ['id' => 1])
    ]
]);
```

## Rendering Breadcrumbs

### Default Rendering

To render breadcrumbs using the default template:

```php
{!! Theme::breadcrumb()->render() !!}
```

The default template is located at `platform/packages/theme/resources/views/partials/breadcrumb.blade.php` and uses Bootstrap's breadcrumb styling.

### Custom Rendering

You can customize how breadcrumbs are displayed by accessing the breadcrumb items directly:

```blade
<nav aria-label="breadcrumb">
    <ol class="breadcrumb custom-breadcrumb">
        @foreach (Theme::breadcrumb()->getCrumbs() as $i => $crumb)
            @if ($i != (count(Theme::breadcrumb()->getCrumbs()) - 1))
                <li class="breadcrumb-item">
                    <a href="{{ $crumb['url'] }}">{!! $crumb['label'] !!}</a>
                </li>
            @else
                <li class="breadcrumb-item active" aria-current="page">
                    {!! $crumb['label'] !!}
                </li>
            @endif
        @endforeach
    </ol>
</nav>
```

## Creating a Reusable Breadcrumb Partial

For consistency across your theme, you can create a dedicated partial for breadcrumbs:

1. Create a file at `platform/themes/your-theme/partials/breadcrumbs.blade.php`
2. Add your custom breadcrumb HTML to this file
3. Use the partial in your views:

```blade
{!! Theme::partial('breadcrumbs') !!}
```

### Example Breadcrumb Partial with Banner

Here's an example from the Ripple theme that includes a banner image with the breadcrumbs:

```blade
<section data-background="{{ Theme::get('breadcrumbBannerImage') ?: (theme_option('default_breadcrumb_banner_image') ? RvMedia::getImageUrl(theme_option('default_breadcrumb_banner_image')) : Theme::asset()->url('images/default-banner.jpg')) }}" class="section page-intro pt-50 pb-50 bg-cover">
    <div class="bg-overlay"></div>
    <div class="container">
        <h3 class="page-intro__title">{{ Theme::get('section-name') ?: SeoHelper::getTitle() }}</h3>
        {!! Theme::breadcrumb()->render() !!}
    </div>
</section>
```

## Enabling/Disabling Breadcrumbs

You can enable or disable breadcrumbs globally through the theme options. The breadcrumb system checks this setting before rendering:

```php
// Check if breadcrumbs are enabled
if (Theme::breadcrumb()->enabled()) {
    // Render breadcrumbs
}
```

The default value is controlled by the `theme_breadcrumb_enabled` theme option, which defaults to `1` (enabled).

## Structured Data for SEO

Botble CMS automatically generates structured data (JSON-LD) for breadcrumbs, which helps search engines understand your site structure. This is added to the page header when breadcrumbs are present.

The structured data follows the [BreadcrumbList schema](https://schema.org/BreadcrumbList) format and is automatically generated based on your breadcrumb items.

## Using Breadcrumbs in Controllers

In admin controllers, you can use the `HasBreadcrumb` trait to easily set up breadcrumbs:

```php
use Botble\Base\Http\Controllers\BaseController;
use Botble\Base\Supports\Breadcrumb;

class PostController extends BaseController
{
    protected function breadcrumb(): Breadcrumb
    {
        return parent::breadcrumb()
            ->add('Blog', route('blog.index'))
            ->add('Posts', route('posts.index'));
    }

    // Controller methods...
}
```
