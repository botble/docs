# Email Templates

## Adding Custom Tags to Email Templates

Based on analysis of the Botble CMS codebase, here's a comprehensive guide on how to add custom tags (variables) to email templates.

## Understanding the Email Template System

Botble CMS uses a sophisticated email template system built around the `EmailHandler` class. Email templates support both **static variables** (defined in configuration) and **dynamic variables** (set at runtime using filters and hooks).

## Method 1: Adding Static Variables via Configuration

### Step 1: Define Variables in Email Configuration

For existing email templates, you can add variables by modifying the email configuration file. For example, in a plugin:

```php
// platform/plugins/ecommerce/config/email.php
return [
    'name' => 'plugins/ecommerce::email.name',
    'description' => 'plugins/ecommerce::email.description',
    'templates' => [
        'welcome' => [
            'title' => 'plugins/ecommerce::email.welcome_title',
            'description' => 'plugins/ecommerce::email.welcome_description',
            'subject' => 'plugins/ecommerce::email.welcome_subject',
            'can_off' => true,
            'enabled' => false,
            'variables' => [
                'customer_name' => 'plugins/ecommerce::ecommerce.customer_name',
                'my_custom_tag' => 'My Custom Tag Description', // Add your custom variable here
            ],
        ],
    ],
];
```

### Step 2: Register Email Templates in Service Provider

```php
// In your service provider's boot method
$this->app->booted(function (): void {
    $emailConfig = config('plugins.ecommerce.email', []);
    EmailHandler::addTemplateSettings(ECOMMERCE_MODULE_SCREEN_NAME, $emailConfig);
});
```

## Method 2: Adding Dynamic Variables via Filters (Recommended)

This is the most flexible approach and allows you to add custom variables dynamically. **Important**: For variables to be rendered in Twig templates, they must be defined in the email template configuration first, then their values can be set dynamically via filters.

### Step 1: Create a Service Provider or Hook

Create a new service provider or add to an existing one:

```php
<?php

namespace App\Providers;

use Botble\Base\Facades\EmailHandler;
use Illuminate\Support\ServiceProvider;

class CustomEmailVariablesServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Hook into the email variable values filter
        add_filter('cms_email_variable_values', [$this, 'addCustomEmailVariables'], 10, 2);
        
        // For order-specific emails, you can also use this filter
        add_filter('ecommerce_order_email_variables', [$this, 'addOrderEmailVariables'], 10, 2);
    }

    /**
     * Add custom variables to all email templates
     */
    public function addCustomEmailVariables(array $variables, ?string $template): array
    {
        // Add global custom variables
        $customVariables = [
            'core' => [
                'my_custom_tag' => 'Hello from my custom tag!',
                'current_year' => date('Y'),
                'company_slogan' => 'Your trusted partner',
                'support_email' => 'support@yoursite.com',
            ]
        ];

        return array_merge_recursive($variables, $customVariables);
    }

    /**
     * Add custom variables specifically for order emails
     */
    public function addOrderEmailVariables(array $variables, $order): array
    {
        $variables['my_custom_tag'] = 'Order-specific custom content';
        $variables['order_custom_field'] = $order->custom_field ?? 'Default value';
        $variables['formatted_order_date'] = $order->created_at->format('F j, Y');
        
        return $variables;
    }
}
```

### Step 2: Register the Service Provider

Add your service provider to `config/app.php`:

```php
'providers' => [
    // Other providers...
    App\Providers\CustomEmailVariablesServiceProvider::class,
],
```

### Step 3: Set Variable Values When Sending Emails

When sending emails, you can also set variable values dynamically:

```php
EmailHandler::setModule(ECOMMERCE_MODULE_SCREEN_NAME)
    ->setVariableValues([
        'customer_name' => $customer->name,
        'my_custom_tag' => 'Welcome to our store!', // Your custom variable
    ])
    ->sendUsingTemplate('welcome', $customer->email);
```

## Method 3: Adding Variables to Specific Email Templates

### For Plugin-Specific Templates

If you're creating a custom plugin, define your email configuration:

```php
<?php
// config/email.php in your plugin

return [
    'name' => 'My Plugin Email Templates',
    'description' => 'Email templates for my custom plugin',
    'templates' => [
        'my_custom_template' => [
            'title' => 'My Custom Email Template',
            'description' => 'Description of my custom template',
            'subject' => 'Custom Email Subject',
            'can_off' => true,
            'enabled' => true,
            'variables' => [
                'my_custom_tag' => 'My Custom Tag',
                'user_name' => 'User Name',
                'custom_message' => 'Custom Message',
            ],
        ],
    ],
];
```

Then register it in your service provider:

```php
$this->app->booted(function (): void {
    EmailHandler::addTemplateSettings('my-plugin', config('my-plugin.email', []));
});
```

## Method 4: Using the EmailHandler Directly

You can also set variables directly using the EmailHandler:

```php
use Botble\Base\Facades\EmailHandler;

// Set a single variable
EmailHandler::setVariableValue('my_custom_tag', 'Custom value', 'module-name');

// Set multiple variables
EmailHandler::setVariableValues([
    'my_custom_tag' => 'Custom value',
    'another_tag' => 'Another value',
], 'module-name');
```

## Using Your Custom Tags in Email Templates

Once you've added your custom variables, you can use them in email templates using Twig syntax:

```twig
{{ header }}

<div class="bb-main-content">
    <table class="bb-box" cellpadding="0" cellspacing="0">
        <tbody>
            <tr>
                <td class="bb-content bb-text-center">
                    <h1>Welcome to {{ site_title }}!</h1>
                    <p>{{ my_custom_tag }}</p>
                    <p>Hello {{ customer_name }}, welcome to our store!</p>
                    <p>Support: {{ support_email }}</p>
                    <p>&copy; {{ current_year }} {{ company_slogan }}</p>
                </td>
            </tr>
        </tbody>
    </table>
</div>

{{ footer }}
```

## Advanced: Context-Aware Variables

For more advanced use cases, you can make your variables context-aware:

```php
public function addCustomEmailVariables(array $variables, ?string $template): array
{
    $customVariables = [
        'core' => []
    ];

    // Add different variables based on the template
    switch ($template) {
        case 'welcome':
            $customVariables['core']['my_custom_tag'] = 'Welcome message';
            break;
        case 'order_confirm':
            $customVariables['core']['my_custom_tag'] = 'Order confirmation message';
            break;
        default:
            $customVariables['core']['my_custom_tag'] = 'Default message';
    }

    return array_merge_recursive($variables, $customVariables);
}
```

## Available Hooks and Filters

1. **cms_email_variable_values** - Main filter for adding custom variables to all email templates
2. **ecommerce_order_email_variables** - Specific filter for order-related emails
3. **email_variable_value** - Action hook that fires when processing email variables

## Key Points to Remember

1. **Variable Definition vs Value Setting** - Variables must be defined in email template configuration to be rendered in Twig templates. Filters are used to set their values dynamically.

2. **Use filters for dynamic content** - The `cms_email_variable_values` filter is used to set values for variables, not to define new variables for Twig rendering.

3. **Module-specific variables** - Variables can be scoped to specific modules (plugins) for better organization.

4. **Template-specific logic** - You can add different variables based on the email template being rendered.

5. **Twig syntax** - Email templates use Twig templating engine, so use `{{ variable_name }}` syntax.

6. **Translation support** - Variable descriptions in configuration files should use translation keys for multi-language support.

7. **Performance** - Variables are processed every time an email is sent, so avoid heavy computations in the filter callbacks.

8. **Core variables** - Botble provides core variables like site_title, site_url, site_logo, etc. that are available in all templates.

## Example: Complete Implementation

Here's a complete example of adding a custom tag for displaying the current promotion:

```php
<?php
// app/Providers/CustomEmailServiceProvider.php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class CustomEmailServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        add_filter('cms_email_variable_values', function ($variables, $template) {
            $customVariables = [
                'core' => [
                    'current_promotion' => $this->getCurrentPromotion(),
                    'my_custom_tag' => 'Hello from my custom implementation!',
                ]
            ];

            return array_merge_recursive($variables, $customVariables);
        }, 10, 2);
    }

    private function getCurrentPromotion(): string
    {
        // Your logic to get current promotion
        return 'Get 20% off on all products this week!';
    }
}
```

## Recommended Workflow for Custom Variables

For variables that need to be rendered in Twig templates, follow this workflow:

1. **Define variables in configuration** (Method 1 or 3) to make them available for Twig rendering
2. **Set dynamic values using filters** (Method 2) to populate the variables with actual data
3. **Use direct EmailHandler methods** (Method 4) for one-off variable assignments

### Example: Complete Custom Variable Implementation

```php
// Step 1: Define in email configuration (config/email.php)
return [
    'templates' => [
        'welcome' => [
            'variables' => [
                'my_custom_tag' => 'My Custom Tag Description',
                'user_bonus' => 'User Welcome Bonus',
            ],
        ],
    ],
];

// Step 2: Set dynamic values via filter
add_filter('cms_email_variable_values', function ($variables, $template) {
    if ($template === 'welcome') {
        $variables['ecommerce']['my_custom_tag'] = 'Welcome to our store!';
        $variables['ecommerce']['user_bonus'] = 'Get 10% off your first order!';
    }
    return $variables;
}, 10, 2);

// Step 3: Use in Twig template
// {{ my_custom_tag }} and {{ user_bonus }} will now render correctly
```

The recommended approach is **Method 1 + Method 2** combination for Twig-rendered variables, and **Method 2** alone for variables used in PHP logic only.
