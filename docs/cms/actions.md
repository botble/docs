# Actions

## Introduction

Actions in Botble CMS are hooks that allow you to execute custom code at specific points during the application's execution. This concept is inspired by WordPress hooks but has been enhanced with Laravel's powerful features.

Actions are used throughout Botble CMS to allow plugins and themes to interact with the core system without modifying core files. They provide a way to extend functionality in a modular and maintainable way.

## Using Actions

### Adding an Action

To hook into an action, use the `add_action()` function:

```php
add_action(string|array $tag, callable $callback, int $priority = 20, int $accepted_args = 1)
```

#### Parameters

- **$tag**: (string|array) The name of the action(s) to hook into. Can be a single action name or an array of action names.
- **$callback**: (callable) The function or method to be called when the action is fired.
- **$priority**: (int) Optional. Used to specify the order in which callbacks are executed. Lower numbers = earlier execution. Default is 20.
- **$accepted_args**: (int) Optional. The number of arguments your callback accepts. Default is 1.

#### Example

```php
// In a service provider's boot method or theme functions.php
add_action('base_action_public_render_single', function ($screen, $data) {
    if ($screen === 'post' && $data instanceof \Botble\Blog\Models\Post) {
        // Do something with the post data
        echo '<div class="custom-post-meta">Views: ' . $data->views . '</div>';
    }
}, 20, 2);
```

### Firing an Action

To fire an action (usually done in core code), use the `do_action()` function:

```php
do_action(string $tag, ...$args)
```

#### Parameters

- **$tag**: (string) The name of the action to fire.
- **$args**: (mixed) Optional. Additional arguments to pass to the callbacks hooked to the action.

#### Example

```php
// In a controller or service
public function show($id)
{
    $post = Post::findOrFail($id);

    // Fire an action with the post data
    do_action('blog_post_viewed', $post);

    return view('blog.show', compact('post'));
}
```

### Removing an Action

To remove a previously added action, use the `remove_action()` function:

```php
remove_action(string $tag)
```

#### Example

```php
// Remove all callbacks for an action
remove_action('base_action_public_render_single');
```

## Common Action Hooks

Botble CMS provides many action hooks that you can use in your plugins and themes. Here are some of the most commonly used ones:

### Content Actions

- **BASE_ACTION_META_BOXES**: Fired when rendering meta boxes on edit screens.
  ```php
  add_action(BASE_ACTION_META_BOXES, function ($context, $object) {
      // Add custom meta boxes
  }, 20, 2);
  ```

- **BASE_ACTION_AFTER_CREATE_CONTENT**: Fired after content is created.
  ```php
  add_action(BASE_ACTION_AFTER_CREATE_CONTENT, function ($type, $request, $object) {
      // Do something after content is created
  }, 20, 3);
  ```

- **BASE_ACTION_AFTER_UPDATE_CONTENT**: Fired after content is updated.
  ```php
  add_action(BASE_ACTION_AFTER_UPDATE_CONTENT, function ($type, $request, $object) {
      // Do something after content is updated
  }, 20, 3);
  ```

- **BASE_ACTION_AFTER_DELETE_CONTENT**: Fired after content is deleted.
  ```php
  add_action(BASE_ACTION_AFTER_DELETE_CONTENT, function ($type, $object) {
      // Do something after content is deleted
  }, 20, 2);
  ```

- **BASE_ACTION_BEFORE_EDIT_CONTENT**: Fired before displaying the edit form.
  ```php
  add_action(BASE_ACTION_BEFORE_EDIT_CONTENT, function ($request, $object) {
      // Do something before editing content
  }, 20, 2);
  ```

### Form Actions

- **BASE_ACTION_FORM_ACTIONS**: Fired when rendering form actions.
  ```php
  add_action(BASE_ACTION_FORM_ACTIONS, function ($form, $model) {
      // Add custom form actions
  }, 20, 2);
  ```

- **BASE_ACTION_FORM_ACTIONS_TITLE**: Fired when rendering form action titles.
  ```php
  add_action(BASE_ACTION_FORM_ACTIONS_TITLE, function ($title) {
      // Modify form action title
      return $title . ' - Custom';
  }, 20, 1);
  ```

### Public Actions

- **BASE_ACTION_PUBLIC_RENDER_SINGLE**: Fired when rendering a single item on the front end.
  ```php
  add_action(BASE_ACTION_PUBLIC_RENDER_SINGLE, function ($screen, $object) {
      // Do something when rendering a single item
  }, 20, 2);
  ```

- **BASE_ACTION_ENQUEUE_SCRIPTS**: Fired when enqueuing scripts.
  ```php
  add_action(BASE_ACTION_ENQUEUE_SCRIPTS, function () {
      // Enqueue custom scripts
      Assets::addScripts(['my-custom-script']);
  }, 20, 0);
  ```

### User Actions

- **USER_ACTION_AFTER_UPDATE_PROFILE**: Fired after a user updates their profile.
  ```php
  add_action(USER_ACTION_AFTER_UPDATE_PROFILE, function ($user) {
      // Do something after user updates profile
  }, 20, 1);
  ```

- **USER_ACTION_AFTER_UPDATE_PASSWORD**: Fired after a user updates their password.
  ```php
  add_action(USER_ACTION_AFTER_UPDATE_PASSWORD, function ($user) {
      // Do something after user updates password
  }, 20, 1);
  ```

- **AUTH_ACTION_AFTER_LOGOUT_SYSTEM**: Fired after a user logs out.
  ```php
  add_action(AUTH_ACTION_AFTER_LOGOUT_SYSTEM, function ($user) {
      // Do something after user logs out
  }, 20, 1);
  ```

### Dashboard Actions

- **DASHBOARD_ACTION_REGISTER_SCRIPTS**: Fired when registering scripts for the dashboard.
  ```php
  add_action(DASHBOARD_ACTION_REGISTER_SCRIPTS, function () {
      // Register custom scripts for dashboard
      Assets::addScriptsDirectly(['vendor/core/plugins/my-plugin/js/dashboard.js']);
  }, 20, 0);
  ```

### System Initialization Actions

- **BASE_ACTION_INIT**: Fired when the application is initializing.
  ```php
  add_action(BASE_ACTION_INIT, function () {
      // Initialize plugin functionality
  }, 20, 0);
  ```

### Form Notification Actions

- **BASE_ACTION_TOP_FORM_CONTENT_NOTIFICATION**: Fired to display notifications at the top of forms.
  ```php
  add_action(BASE_ACTION_TOP_FORM_CONTENT_NOTIFICATION, function ($request, $data) {
      // Display form notifications
      echo '<div class="alert alert-info">Important notice</div>';
  }, 20, 2);
  ```

### Site Error Actions

- **BASE_ACTION_SITE_ERROR**: Fired when a site error occurs.
  ```php
  add_action(BASE_ACTION_SITE_ERROR, function ($exception) {
      // Handle site error, log, notify, etc.
  }, 20, 1);
  ```

## Best Practices

1. **Use Appropriate Priority**: Choose a priority that makes sense for your action. Lower numbers run earlier.

2. **Accept Only Needed Arguments**: Only specify the number of arguments your callback actually needs.

3. **Use Namespaced Functions**: When using closures or class methods, be mindful of scope and variable access.

4. **Check Conditions**: Always check conditions before executing your code to avoid errors.

5. **Document Your Hooks**: If you're creating new action hooks, document them clearly for other developers.

6. **Use Service Providers**: Register your action hooks in service providers' boot methods for better organization.

## Creating Custom Action Hooks

You can create your own action hooks in your plugins or themes:

```php
// In your controller or service
public function process()
{
    // Your code here

    // Fire a custom action
    do_action('my_plugin_after_process', $result);

    // More code
}
```

Other developers can then hook into your custom action:

```php
add_action('my_plugin_after_process', function ($result) {
    // React to the process completion
}, 20, 1);
```
