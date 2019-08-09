# Configuration

```php

return [
    'layout' => 'layouts.app',
    'section-content' => 'content',
    'default' => 'vendor/avatar/images/default-avatar.jpg',
    'folder' => [
        'upload' => public_path('uploads'),
        'container_dir' => 'avatars',
    ],
    // assets libraries, you can remove if it's existed on your project
    'library' => [
        'stylesheets' => [
            'bootstrap',
            'cropper',
        ],
        'javascript' => [
            'jquery',
            'bootstrap',
            'cropper',
        ],
    ],
];
```