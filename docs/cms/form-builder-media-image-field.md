# Media Image Field

```php
use Botble\Base\Forms\Fields\MediaImageField;
use Botble\Base\Forms\FieldOptions\MediaImageFieldOption;

$this->add(
    'image', 
    MediaImageField::class, 
    MediaImageFieldOption::make()
        ->label(__('Image'))
);
```

Result:

![Form image](./images/form-image.png)

### List of images field

```php
use Botble\Base\Forms\Fields\MediaImageField;
use Botble\Base\Forms\FieldOptions\MediaImageFieldOption;

$this->add(
    'images[]', 
    MediaImagesField::class, 
    MediaImagesFieldOption::make()
        ->label(__('Gallery images'))
        ->values($this->model ? json_decode($this->field_name, true) : [])
);
```

Result:

![Form images](./images/form-images.png)

# Media File Field

```php
use Botble\Base\Forms\Fields\MediaFileField;
use Botble\Base\Forms\FieldOptions\MediaFileFieldOption;

$this->add(
    'test_file', 
    MediaFileField::class, 
    MediaFileFieldOption::make()
        ->label(__('File'))
);
```

![Form images](./images/form-file.png)

# File Field

Default file field is used to upload files.

```php
use Botble\Base\Forms\FieldOptions\InputFieldOption;

$this->add(
    'file',
    'file',
    InputFieldOption::make()
        ->label(__('File'))
);
```

![Form images](./images/form-file-default.png)