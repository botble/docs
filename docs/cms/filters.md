# Filters

## Introduction

Filters in Botble CMS are hooks that allow you to modify data during the execution of the application. Unlike actions, which simply execute code at specific points, filters are designed to transform data and return a modified version.

Filters are used throughout Botble CMS to allow plugins and themes to modify content, settings, and other data without changing core files. They provide a powerful way to customize the behavior of the CMS in a modular and maintainable way.

## Using Filters

### Adding a Filter

To hook into a filter, use the `add_filter()` function:

```php
add_filter(string|array $tag, callable $callback, int $priority = 20, int $accepted_args = 1)
```

#### Parameters

- **$tag**: (string|array) The name of the filter(s) to hook into. Can be a single filter name or an array of filter names.
- **$callback**: (callable) The function or method to be called when the filter is applied.
- **$priority**: (int) Optional. Used to specify the order in which callbacks are executed. Lower numbers = earlier execution. Default is 20.
- **$accepted_args**: (int) Optional. The number of arguments your callback accepts. Default is 1.

#### Example

```php
// In a service provider's boot method or theme functions.php
add_filter('base_filter_public_single_data', function ($data, $model) {
    if ($model instanceof \Botble\Blog\Models\Post) {
        // Modify post data
        $data['custom_field'] = get_meta_data($model, 'custom_field', true);
    }

    return $data;
}, 20, 2);
```

### Applying a Filter

To apply a filter (usually done in core code), use the `apply_filters()` function:

```php
$modified_value = apply_filters(string $tag, mixed $value, ...$args)
```

#### Parameters

- **$tag**: (string) The name of the filter to apply.
- **$value**: (mixed) The value to filter.
- **$args**: (mixed) Optional. Additional arguments to pass to the callbacks hooked to the filter.

#### Example

```php
// In a controller or service
public function getData($id)
{
    $post = Post::findOrFail($id);
    $data = $post->toArray();

    // Apply a filter to the data
    $data = apply_filters('blog_post_data', $data, $post);

    return $data;
}
```

### Removing a Filter

To remove a previously added filter, use the `remove_filter()` function:

```php
remove_filter(string $tag)
```

#### Example

```php
// Remove all callbacks for a filter
remove_filter('base_filter_public_single_data');
```

## Common Filter Hooks

Botble CMS provides many filter hooks that you can use in your plugins and themes. Here are some of the most commonly used ones:

### Content Filters

- **BASE_FILTER_PUBLIC_SINGLE_DATA**: Modify data for a single item on the front end.
  ```php
  add_filter(BASE_FILTER_PUBLIC_SINGLE_DATA, function ($data, $model) {
      // Modify single item data
      return $data;
  }, 20, 2);
  ```

- **BASE_FILTER_BEFORE_GET_SINGLE**: Modify query before getting a single item.
  ```php
  add_filter(BASE_FILTER_BEFORE_GET_SINGLE, function ($query, $model) {
      // Modify query
      return $query;
  }, 20, 2);
  ```

- **BASE_FILTER_BEFORE_GET_BY_SLUG**: Modify query before getting an item by slug.
  ```php
  add_filter(BASE_FILTER_BEFORE_GET_BY_SLUG, function ($query, $model, $slug) {
      // Modify query
      return $query;
  }, 20, 3);
  ```

### Form Filters

- **BASE_FILTER_BEFORE_RENDER_FORM**: Modify form before rendering.
  ```php
  add_filter(BASE_FILTER_BEFORE_RENDER_FORM, function ($form, $data) {
      // Modify form
      return $form;
  }, 20, 2);
  ```

- **BASE_FILTER_AFTER_FORM_CREATED**: Modify form after creation.
  ```php
  add_filter(BASE_FILTER_AFTER_FORM_CREATED, function ($form, $data) {
      // Modify form
      return $form;
  }, 20, 2);
  ```

- **BASE_FILTER_FORM_EDITOR_BUTTONS**: Modify editor buttons.
  ```php
  add_filter(BASE_FILTER_FORM_EDITOR_BUTTONS, function ($buttons) {
      // Add or remove buttons
      $buttons[] = 'myCustomButton';
      return $buttons;
  }, 20, 1);
  ```

### Dashboard Filters

- **DASHBOARD_FILTER_ADMIN_LIST**: Modify dashboard widgets.
  ```php
  add_filter(DASHBOARD_FILTER_ADMIN_LIST, function ($widgets, $widgetSettings) {
      // Add or modify dashboard widgets
      return $widgets;
  }, 20, 2);
  ```

- **DASHBOARD_FILTER_ADMIN_NOTIFICATIONS**: Modify dashboard notifications.
  ```php
  add_filter(DASHBOARD_FILTER_ADMIN_NOTIFICATIONS, function ($notifications) {
      // Add or modify notifications
      return $notifications . '<div class="alert alert-info">Custom notification</div>';
  }, 20, 1);
  ```

### Table Filters

- **BASE_FILTER_TABLE_HEADINGS**: Modify table headings.
  ```php
  add_filter(BASE_FILTER_TABLE_HEADINGS, function ($headings, $table) {
      // Modify table headings
      return $headings;
  }, 20, 2);
  ```

- **BASE_FILTER_TABLE_BUTTONS**: Modify table buttons.
  ```php
  add_filter(BASE_FILTER_TABLE_BUTTONS, function ($buttons, $table) {
      // Add or modify table buttons
      return $buttons;
  }, 20, 2);
  ```

- **BASE_FILTER_GET_LIST_DATA**: Modify data for tables.
  ```php
  add_filter(BASE_FILTER_GET_LIST_DATA, function ($data, $model) {
      // Modify list data
      return $data;
  }, 20, 2);
  ```

### Menu Filters

- **BASE_FILTER_DASHBOARD_MENU**: Modify dashboard menu.
  ```php
  add_filter(BASE_FILTER_DASHBOARD_MENU, function ($menu) {
      // Modify dashboard menu
      return $menu;
  }, 20, 1);
  ```

- **BASE_FILTER_APPEND_MENU_NAME**: Append text to menu names.
  ```php
  add_filter(BASE_FILTER_APPEND_MENU_NAME, function ($name, $menuId) {
      // Append text to menu name
      if ($menuId === 'cms-plugins-blog') {
          return $name . ' <span class="badge badge-success">New</span>';
      }
      return $name;
  }, 20, 2);
  ```

### Enum Filters

- **BASE_FILTER_ENUM_ARRAY**: Modify enum values.
  ```php
  add_filter(BASE_FILTER_ENUM_ARRAY, function ($values, $class) {
      if ($class === \Botble\Base\Enums\BaseStatusEnum::class) {
          $values['PENDING'] = 'pending';
      }
      return $values;
  }, 20, 2);
  ```

- **BASE_FILTER_ENUM_LABEL**: Modify enum labels.
  ```php
  add_filter(BASE_FILTER_ENUM_LABEL, function ($label, $class, $value) {
      if ($class === \Botble\Base\Enums\BaseStatusEnum::class && $value === 'pending') {
          return 'Waiting for approval';
      }
      return $label;
  }, 20, 3);
  ```

## Best Practices

1. **Always Return a Value**: Filters must always return a value, even if you don't modify it.

2. **Use Appropriate Priority**: Choose a priority that makes sense for your filter. Lower numbers run earlier.

3. **Accept Only Needed Arguments**: Only specify the number of arguments your callback actually needs.

4. **Check Types**: Always check the type of data you're filtering to avoid errors.

5. **Document Your Filters**: If you're creating new filter hooks, document them clearly for other developers.

6. **Use Service Providers**: Register your filter hooks in service providers' boot methods for better organization.

## Creating Custom Filter Hooks

You can create your own filter hooks in your plugins or themes:

```php
// In your controller or service
public function getData($id)
{
    $data = YourModel::findOrFail($id)->toArray();

    // Apply a custom filter
    $data = apply_filters('my_plugin_get_data', $data, $id);

    return $data;
}
```

Other developers can then hook into your custom filter:

```php
add_filter('my_plugin_get_data', function ($data, $id) {
    // Modify the data
    $data['custom_field'] = 'Custom value';

    return $data;
}, 20, 2);
```

## Request Class Filters

Botble CMS provides several filters in the `Botble\Support\Http\Requests\Request` class that allow you to modify validation rules, messages, attributes, and data before validation occurs. These filters are particularly useful for plugins that need to extend or modify form validation behavior without modifying core files.

### Available Request Filters

- **core_request_rules**: Modify validation rules.
  ```php
  add_filter('core_request_rules', function ($rules, $request) {
      // Add or modify validation rules
      if ($request instanceof \Botble\Blog\Http\Requests\PostRequest) {
          $rules['title'] = 'required|max:255|min:10';
          $rules['custom_field'] = 'required|string';
      }
      return $rules;
  }, 20, 2);
  ```

- **core_request_messages**: Modify validation error messages.
  ```php
  add_filter('core_request_messages', function ($messages, $request) {
      // Add or modify validation messages
      if ($request instanceof \Botble\Blog\Http\Requests\PostRequest) {
          $messages['title.min'] = 'The title must be at least 10 characters.';
          $messages['custom_field.required'] = 'The custom field is required.';
      }
      return $messages;
  }, 20, 2);
  ```

- **core_request_attributes**: Modify attribute names used in validation messages.
  ```php
  add_filter('core_request_attributes', function ($attributes, $request) {
      // Add or modify attribute names
      if ($request instanceof \Botble\Blog\Http\Requests\PostRequest) {
          $attributes['custom_field'] = 'Custom Field';
      }
      return $attributes;
  }, 20, 2);
  ```

- **core_request_validation_data**: Modify the data to be validated.
  ```php
  add_filter('core_request_validation_data', function ($data, $request) {
      // Modify the data before validation
      if ($request instanceof \Botble\Blog\Http\Requests\PostRequest) {
          // Sanitize or transform input data
          if (isset($data['title'])) {
              $data['title'] = trim($data['title']);
          }

          // Add computed fields
          $data['slug'] = \Str::slug($data['title']);
      }
      return $data;
  }, 20, 2);
  ```

### How It Works

These filters are applied in the `createDefaultValidator` method of the `Request` class:

```php
protected function createDefaultValidator(ValidationFactory $factory)
{
    $rules = method_exists($this, 'rules') ? $this->container->call([$this, 'rules']) : [];

    $rules = apply_filters('core_request_rules', $rules, $this);

    $messages = apply_filters('core_request_messages', $this->messages(), $this);

    $attributes = apply_filters('core_request_attributes', $this->attributes(), $this);

    $validationData = apply_filters('core_request_validation_data', $this->validationData(), $this);

    // @phpstan-ignore-next-line
    $validator = $factory->make(
        $validationData,
        $rules,
        $messages,
        $attributes
    )->stopOnFirstFailure($this->stopOnFirstFailure);

    if ($this->isPrecognitive()) {
        $validator->setRules(
            $this->filterPrecognitiveRules($validator->getRulesWithoutPlaceholders())
        );
    }

    return $validator;
}
```

### Use Cases

1. **Adding Custom Validation Rules**: Add new validation rules to specific request types without modifying the original request classes.

2. **Modifying Validation Messages**: Customize error messages for specific fields or rules.

3. **Data Transformation**: Transform or sanitize input data before validation occurs.

4. **Dynamic Validation**: Add or remove validation rules based on runtime conditions.

5. **Plugin Integration**: Allow plugins to extend validation for core features.

### Example: Adding Custom Validation to a Post Request

```php
// In a service provider's boot method
public function boot()
{
    // Add SEO validation rules to Post requests
    add_filter('core_request_rules', function ($rules, $request) {
        if ($request instanceof \Botble\Blog\Http\Requests\PostRequest) {
            $rules['seo_title'] = 'nullable|string|max:60';
            $rules['seo_description'] = 'nullable|string|max:160';
        }
        return $rules;
    }, 20, 2);

    // Add custom validation messages
    add_filter('core_request_messages', function ($messages, $request) {
        if ($request instanceof \Botble\Blog\Http\Requests\PostRequest) {
            $messages['seo_title.max'] = 'SEO title should not exceed 60 characters for optimal display in search results.';
            $messages['seo_description.max'] = 'SEO description should not exceed 160 characters for optimal display in search results.';
        }
        return $messages;
    }, 20, 2);

    // Add custom attribute names
    add_filter('core_request_attributes', function ($attributes, $request) {
        if ($request instanceof \Botble\Blog\Http\Requests\PostRequest) {
            $attributes['seo_title'] = 'SEO Title';
            $attributes['seo_description'] = 'SEO Description';
        }
        return $attributes;
    }, 20, 2);
}
```
