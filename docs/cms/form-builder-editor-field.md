# Editor Field

If you want to add an editor field in your form, you can use `EditorField` class. Here is an example:

```php
use Botble\Base\Forms\Fields\EditorField;
use Botble\Base\Forms\FieldOptions\EditorFieldOption;

$this->add(
    'content', 
    EditorField::class, 
    EditorFieldOption::make()
        ->allowedShortcodes() // If you want to allow UI Block (shortcodes) button in that editor
        ->maxLength(10000) // Default is 10000, you can change it if you wish
        ->rows(4) // Default is 4, you can change it if you wish
)
```

::: info
This editor field is using CkEditor or TinyMCE editor. You can configure it in Settings -> General.

If you need Trix editor, you can install it on https://marketplace.botble.com/products/FriendsOfBotble/fob-trix-editor
:::

## CKEditor

```php
use Botble\Base\Forms\Fields\CkEditorField;
use Botble\Base\Forms\FieldOptions\EditorFieldOption;

$this->add(
    'content', 
    CkEditorField::class, 
    EditorFieldOption::make()
)
```

## TinyMCE

```php
use Botble\Base\Forms\Fields\TinyMceField;
use Botble\Base\Forms\FieldOptions\EditorFieldOption;

$this->add(
    'content', 
    TinyMceField::class, 
    EditorFieldOption::make()
)
```