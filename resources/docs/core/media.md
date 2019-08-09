## Media

Media in Botble Core is RvMedia, you can see the docs for it here: https://docs.botble.com/media

### Media thumbnail sizes
By default, all images will be auto cropped into 3 sizes

If you want to modify or add more crop size. Add to function `boot` of `App\Providers\AppServiceProvider`

```php
if (!function_exists('register_media_sizes')) {
    function register_media_sizes() {
        config([
            'media.sizes.post-featured' => '200x150',
            'media.sizes.other-size' => '400x400',
        ]);
    }
}

add_action('init', 'register_media_sizes', 96);
```

### Create a button to choose image

Your view have to extends from `core.base::layouts.master`

- Sample HTML:

```html
<input type="text" name="file" class="input-file">
<a class="btn_gallery">Choose file</a>

```
- JS:

```javascript
if (jQuery().rvMedia) {
    $('.btn_gallery').rvMedia({
        multiple: false,
        onSelectFiles: function (files, $el) {
            var firstItem = _.first(files);
            $('.input-file').val(firstItem.url);
        }
    });
}
```