# Media Management

## Introduction

Botble CMS provides a powerful media management system that allows you to upload, organize, and manipulate various types of files. The media manager supports images, videos, documents, and other file types, with features like thumbnails generation, watermarking, and integration with various cloud storage providers.

## Media Settings

You can configure media settings by going to **Admin Panel** → **Settings** → **Media**. Here you can set:

- Storage driver (Local, Amazon S3, DigitalOcean Spaces, Wasabi, BunnyCDN, Cloudflare R2, Backblaze B2)
- Image processing library (GD or Imagick)
- Thumbnail sizes
- Watermark settings
- File type restrictions
- Chunk upload settings

## Troubleshooting

### Image uploaded successfully but doesn't display

Make sure you have done the following steps:

- Make sure `APP_URL` in `.env` is correct
- Make sure PHP extension `GD` or `Imagick` is enabled
- Chmod folder `public/storage` to make it writeable
- Go to **Admin** → **Settings** → **Media** and set Driver to `Local`
- Run `php artisan storage:link` to create the symbolic link

## Change media image sizes

### Option 1: Override media config

Copy `platform/core/media/config/media.php` to `config/media.php` and change the media sizes.

```php
<?php

return [
    ...
    'sizes' => [
        'thumb'    => '150x150',
        'featured' => '560x380',
        'medium'   => '540x360',
    ],
    ...
];

```

### Option 2: Modify it from your theme, media sizes will depend on your theme.

Add to `platform/themes/your-theme/functions/functions.php` or in your plugin service providers.

```php
\RvMedia::addSize('featured', 560, 380);
```

Add many sizes:

```php
\RvMedia::addSize('featured', 560, 380)
    ->addSize(<name>, <width>, <height>)
    ...
```

After that, you need to run command to regenerate thumbnails.

```bash
php artisan cms:media:thumbnail:generate
```

How to use:

```php
{{ RvMedia::getImageUrl($post->image, 'post-small') }}
```

## Supported File Types

By default, media management supports the following file extensions:

```
jpg,jpeg,png,gif,txt,docx,zip,mp3,bmp,csv,xls,xlsx,ppt,pptx,pdf,mp4,m4v,doc,mpga,wav,webp,webm,mov,jfif,avif,rar,x-rar
```

### Adding Custom File Extensions

You can add more file extensions by setting the `RV_MEDIA_ALLOWED_MIME_TYPES` environment variable in your `.env` file:

```bash
RV_MEDIA_ALLOWED_MIME_TYPES=jpg,jpeg,png,gif,txt,docx,zip,mp3,bmp,csv,xls,xlsx,ppt,pptx,pdf,mp4,doc,mpga,wav,webp,custom-extension
```

### File Type Categories

Files are categorized into different types in the media manager:

- **Images**: png, jpg, jpeg, gif, bmp, webp, svg, avif, jfif
- **Videos**: mp4, m4v, mov, webm
- **Documents**: doc, docx, pdf, txt, csv, xls, xlsx, ppt, pptx
- **Audio**: mp3, wav, mpga

## Custom upload

You can create your custom upload with `RvMedia` facade.

Ex:

```php
\RvMedia::handleUpload(request()->file('file'), 0, 'your-folder');
```

## Get image by size

To get image by size, you can use `RvMedia::getImageUrl($url, $size = null, $relative_path = false, $default = null)`.

Ex:

```php
RvMedia::getImageUrl($post->image, 'thumb');
```

If you have registered other size, you can change `thumb` by your size's name.

## Upload file from a path

You can fake a file upload from a path with `UploadedFile` and upload it using `RvMedia::handleUpload()`

Ex:

```php
$folder = \Botble\Media\Models\MediaFolder::create([
    'name' => 'Example',
    'slug' => 'example',
]);
$fileUpload = new \Illuminate\Http\UploadedFile(database_path('files/example.png'), 'example.png', 'image/png', null, true);
$image = \RvMedia::handleUpload($fileUpload, $folder->id);
```

## Increase upload file size

- The Maximum file size is 2MB by default.

- To increase file upload size in PHP, you need to modify the `upload_max_filesize` and `post_max_size` variable’s in
  your php.ini file.
  If you can't change it, please contact your hosing provider to increase those values.

```ini
upload_max_filesize = 10M
post_max_size = 10M
```

## Watermarking

Botble CMS supports adding watermarks to uploaded images. To enable and configure watermarking:

1. Go to **Admin** → **Settings** → **Media**
2. Enable the watermark option
3. Upload a watermark image (preferably a PNG with transparency)
4. Configure watermark settings:
   - Size: Percentage of the watermark size relative to the image
   - Opacity: Transparency level of the watermark (0-100)
   - Position: Where to place the watermark (bottom-right, center, etc.)
   - X and Y coordinates: Fine-tune the watermark position
5. Select which folders should have watermarks applied

### Apply Watermark to Existing Images

To add watermarks to images that were uploaded before enabling the watermark feature:

```bash
php artisan cms:media:insert-watermark
```

## Cloud Storage Integration

Botble CMS supports multiple cloud storage providers for media files:

### Amazon S3

To configure Amazon S3:

1. Go to **Admin** → **Settings** → **Media**
2. Select `s3` as the driver
3. Enter your AWS credentials, bucket name, and region

For detailed setup instructions, see [Setting Up Amazon S3 for Storage](usage-media-s3.md).

### BunnyCDN

To configure BunnyCDN:

1. Go to **Admin** → **Settings** → **Media**
2. Select `bunnycdn` as the driver
3. Enter your BunnyCDN storage zone name, API key, region, and pull zone URL

For detailed setup instructions, see [Media - Setup BunnyCDN](usage-media-bunnycdn.md).

### Wasabi

To configure Wasabi:

1. Go to **Admin** → **Settings** → **Media**
2. Select `wasabi` as the driver
3. Enter your Wasabi access key, secret key, bucket name, and region

For detailed setup instructions, see [Media - Setup Wasabi](usage-media-wasabi.md).

### Other Supported Providers

- DigitalOcean Spaces
- Cloudflare R2
- Backblaze B2

## Chunk Upload

Botble CMS supports chunk upload for large files. To enable and configure chunk upload:

1. Go to **Admin** → **Settings** → **Media**
2. Enable the chunk upload option
3. Configure chunk size and maximum file size

This feature is particularly useful when uploading large files on servers with limited upload size restrictions.

## Media Optimization

Botble CMS includes several features to optimize media files and improve website performance:

### Image Processing Libraries

You can choose between two image processing libraries:

- **GD Library**: Default option, available on most PHP installations
- **Imagick**: More powerful with better image quality, but requires the ImageMagick PHP extension

To change the image processing library, go to **Admin** → **Settings** → **Media**.

### Optimize Package Integration

Botble CMS integrates with the Optimize package to improve media loading performance:

- **Inline CSS**: Embeds critical CSS directly in the HTML
- **Collapse Whitespace**: Removes unnecessary whitespace from HTML
- **Remove Comments**: Strips HTML comments to reduce file size
- **Elide Attributes**: Removes redundant attributes from HTML tags
- **Insert DNS Prefetch**: Adds DNS prefetch hints for external resources

These optimizations can be enabled in **Admin** → **Settings** → **Performance**.

## Using Media in Forms

Botble CMS provides form fields for easy media integration in your forms:

### Media Image Field

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

### Media Images Field (Multiple Images)

```php
use Botble\Base\Forms\Fields\MediaImagesField;
use Botble\Base\Forms\FieldOptions\MediaImagesFieldOption;

$this->add(
    'images[]',
    MediaImagesField::class,
    MediaImagesFieldOption::make()
        ->label(__('Gallery images'))
        ->values($this->model ? json_decode($this->model->images, true) : [])
);
```

### Media File Field

```php
use Botble\Base\Forms\Fields\MediaFileField;
use Botble\Base\Forms\FieldOptions\MediaFileFieldOption;

$this->add(
    'file',
    MediaFileField::class,
    MediaFileFieldOption::make()
        ->label(__('File'))
);
```

For more information about form fields, see [Form Builder - Media Image Field](form-builder-media-image-field.md).
