# What is custom fields?

Use the Custom Fields plugin to take full control of your Botble edit screens & custom field data.

Add fields on demand. Our field builder allows you to quickly and easily add fields to edit screens with only the click of a few buttons!

Fields can be added all over including posts, pages, categories, tags!

Show them everywhere. Load and display your custom field values in views file post.blade.php, page.blade.php, tag.blade.php, category.blade.php of your theme (/public/themes/<your theme>/views) with our hassle free developer friendly functions!

# How to use Custom Fields plugin

#### Active this plugin
Go through to **Admin Dashboard** --> **Plugins** --> Activate this plugin.
Currently, this plugin support **Pages** and **Blog**.

####View how to use it:

**get_field**: get a custom field from a model
```php
get_field($id, $screenName, $alias = null, $default = null)
```

Example:
```php
$page = Page:find(1);
$field = get_field($page->id, PAGE_MODULE_SCREEN_NAME, 'foo');
```

**has_field**: determine a model has custom field or not
```php
function has_field($id, $screenName, $alias = null)
```

Example:
```php
$page = Page:find(1);
$hasField = has_field($page->id, PAGE_MODULE_SCREEN_NAME, 'foo');
```

**get_sub_field**: get a repeater field from a parent field with the specified alias

```php
get_sub_field(array $parentField, $alias, $default = null)
```

Example:
```php
$page = Page:find(1);
foreach(get_field($page->id, PAGE_MODULE_SCREEN_NAME, 'foo_repeater') as $item) {
   $childField = get_sub_field($item, 'bar');
}
```

**has_sub_field**: determine the parent field has sub field with the specified alias

```php
has_sub_field(array $parentField, $alias)
```

Example:
```php
$page = Page:find(1);
foreach(get_field($page->id, PAGE_MODULE_SCREEN_NAME, 'foo_repeater') as $item) {
   $hasBar = has_sub_field($item, 'bar');
}
```
