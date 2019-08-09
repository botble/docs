# Configuration

```php
<?php

return [
    'mode' => env('RV_MEDIA_MODE', 'advanced'), // Use "simple" or "advanced"

    // These sizes will be auto generate when upload an image
    'sizes' => [
        'thumb' => '150x150',
        'featured' => '560x380',
        'medium' => '540x360',
    ],
    'upload' => [
        'folder' => 'uploads', // Upload folder name
        'path' => public_path('uploads'), // Upload folder path
        // User will can not create folder with these name
        'reserved_names' => [
            // 'avatars',
        ],
    ],
    'permissions' => [
        'folders.create',
        'folders.edit',
        'folders.delete',
        'files.create',
        'files.edit',
        'files.delete',
    ],

    'route' => [
        'prefix' => 'media', // Media URL. Ex: media => http://laravel.dev/media
        'middleware' => ['web', 'auth'],
        'options' => [],
    ],
    'cache' => [
        'enable' => env('RV_MEDIA_ENABLE_CACHE', false), // true or false
        'cache_time' => env('RV_MEDIA_CACHE_TIME', 10),
        'stored_keys' => storage_path('media_cache_keys.json'), // Cache config
    ],
    'allow_external_services' => env('RV_MEDIA_ALLOW_EXTERNAL_SERVICES', false),
    'external_services' => [
        'youtube',
        'vimeo',
        'dailymotion',
        'instagram',
        'vine',
    ],
    // assets libraries, you can remove if it's existed on your project
    'libraries' => [
        'stylesheets' => [
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
            'vendor/media/packages/font-awesome/css/font-awesome.min.css',
            'vendor/media/packages/fancybox/dist/jquery.fancybox.css',
            'vendor/media/packages/toastr/toastr.min.css',
            'vendor/media/packages/jquery-context-menu/jquery.contextMenu.min.css',
            'vendor/media/packages/focuspoint/css/focuspoint.css',
            'vendor/media/css/media.css?v=' . time(),
        ],
        'javascript' => [
            'vendor/media/packages/underscore/underscore-min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js',
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
            'vendor/media/packages/clipboard/clipboard.min.js',
            'vendor/media/packages/fancybox/dist/jquery.fancybox.js',
            'vendor/media/packages/dropzone/dropzone.js',
            'vendor/media/packages/toastr/toastr.min.js',
            'vendor/media/packages/pace/pace.min.js',
            'vendor/media/packages/jquery-context-menu/jquery.ui.position.min.js',
            'vendor/media/packages/jquery-context-menu/jquery.contextMenu.min.js',
            'vendor/media/packages/focuspoint/js/jquery.focuspoint.min.js',
            'vendor/media/js/media.js?v=' . time(),
            'vendor/media/js/focus.js?v=' . time(),
        ],
    ],
    // Allowed mime types
    'allowed_mime_types' => 'jpg,jpeg,png,gif,txt,docx,zip,mp3,bmp,csv,docs,xls,xlsx,ppt,pptx,pdf,mp4',
    'mime_types' => [
        'image' => [
            'image/png',
            'image/jpeg',
            'image/gif',
            'image/bmp',
        ],
        'video' => [
            'video/mp4',
        ],
        'pdf' => [
            'application/pdf',
        ],
        'excel' => [
            'application/excel',
            'application/x-excel',
            'application/x-msexcel',
        ],
        'youtube' => [
            'youtube',
        ],
        'text' => [
            'text/plain',
        ],
    ],
    'max_file_size_upload' => 4 * 1024, // Maximum size to upload
    'default-img' => '/vendor/core/images/default-image.png', // Default image
    'sidebar_display' => env('RV_MEDIA_SIDEBAR_DISPLAY', 'vertical'), // Use "vertical" or "horizontal"
    'user_attributes' => 'users.id, users.name', // User ID and Full Name. Ex: 'users.id, CONCAT(users.first_name, " ", users.last_name) AS name',
    'layouts' => [
        'master' => 'layouts.app-no-header', // master layout of your project
        'main' => 'content', // main section content
        'header' => 'header', // header section
        'footer' => 'footer', // footer section
    ],
];
```