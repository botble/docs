# AI Assistant Guide

This guide provides instructions for AI assistants (Claude, GPT, Copilot, etc.) working with Botble CMS codebases. Following these guidelines ensures consistent, high-quality code generation.

## Project Architecture

Botble CMS is a modular Laravel CMS with the following structure:

```
/platform/
├── core/      # Core modules (ACL, base, dashboard, media, settings, table)
├── packages/  # Packages (menu, page, SEO, theme, widget)
├── plugins/   # Feature plugins (blog, ecommerce, contact, gallery)
└── themes/    # Frontend themes
```

### Tech Stack

- **Backend**: Laravel 12+, PHP 8.2+
- **Frontend**: Vue.js 3, Bootstrap 5, jQuery
- **Build**: Laravel Mix, npm workspaces
- **Database**: MySQL (SQLite for tests)
- **UI Framework**: [Tabler UI](https://docs.tabler.io/ui)

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | `kebab-case.php` | `product-controller.php` |
| Classes/Enums | `PascalCase` | `ProductController` |
| Methods | `camelCase` | `getProductList()` |
| Variables/Properties | `snake_case` | `$product_name` |
| Constants/Enum Cases | `SCREAMING_SNAKE_CASE` | `PUBLISHED` |

## Critical: Botble Enum Usage

::: danger IMPORTANT
Botble uses a **custom Enum class** (`Botble\Base\Supports\Enum`), NOT PHP 8.1 native enums. The `$value` property is **protected** and cannot be accessed directly.
:::

```php
// ❌ BAD - Will throw: "Cannot access protected property"
$type = $model->status->value;

// ✅ GOOD - Use getValue() method
$type = $model->status->getValue();

// ✅ GOOD - Use (string) cast
$type = (string) $model->status;

// ✅ GOOD - Compare using getValue()
if ($attribute->type->getValue() === 'checkbox') { }

// ✅ GOOD - Use static constant for comparison
if ($status->getValue() === BaseStatusEnum::PUBLISHED) { }
```

### Enum Methods Reference

**Instance Methods:**
- `getValue()` - Get the raw value
- `label()` - Get translated label
- `getKey()` - Get constant name
- `equals($enum)` - Compare with another enum
- `toHtml()` - Get HTML representation

**Static Methods:**
- `toArray()` - Get all values as `['KEY' => 'value']`
- `labels()` - Get all labels as `['value' => 'Label']`
- `isValid($value)` - Check if value is valid
- `getLabel($value)` - Get translated label for value

## Database Conventions

### Standard Model Fields

All models typically include:
- `id` - Primary key (supports both integer and UUID)
- `name` or `title` - Display name
- `slug` - URL-friendly identifier
- `status` - Uses `BaseStatusEnum`
- `created_at`, `updated_at` - Timestamps
- `author_id`, `author_type` - Polymorphic author relation

### ID Type Support

Botble CMS supports both integer IDs and UUIDs:

```php
// ❌ BAD - Only supports integer IDs
public function show(int $id): Response

// ✅ GOOD - Supports both integer and UUID
public function show(int|string $id): Response
```

For migrations:
```php
// ❌ BAD - Hardcoded to big integer
$table->bigInteger('user_id')->unsigned();

// ✅ GOOD - Adapts to referenced table's ID type
$table->foreignId('user_id')->constrained();
```

## Eloquent Best Practices

```php
// ✅ Always use query() for Eloquent queries
User::query()->where('status', BaseStatusEnum::PUBLISHED)->get();

// ❌ Avoid raw DB facade
DB::table('users')->where(...);

// ✅ Use eager loading to prevent N+1
Post::query()->with(['author', 'categories'])->get();
```

## Translation System

### Admin Panel vs Frontend

```php
// Admin panel translations (core/packages/plugins)
trans('plugins/blog::posts.create')

// Frontend/theme translations
__('theme.home')
```

### Translation File Structure

```
platform/{core|packages|plugins}/*/resources/lang/{locale}/*.php
```

### Translation Best Practices

::: warning
- **NEVER** convert string translations to arrays (causes "Array to string conversion" errors)
- **ALWAYS** escape apostrophes in single-quoted strings
- Use flat string keys, not nested arrays
:::

```php
// ❌ BAD - Unescaped apostrophe
'message' => 'L'utilisateur n'existe pas',

// ✅ GOOD - Escaped apostrophes
'message' => 'L\'utilisateur n\'existe pas',

// ❌ BAD - Array value
'settings' => ['title' => 'Settings'],

// ✅ GOOD - Flat string keys
'settings_title' => 'Settings',
```

## Form Builder

### Modern Pattern with FieldOptions

```php
use Botble\Base\Forms\Fields\TextField;
use Botble\Base\Forms\Fields\SelectField;
use Botble\Base\Forms\FieldOptions\NameFieldOption;
use Botble\Base\Forms\FieldOptions\StatusFieldOption;

$this->setupModel(new MyModel)
    ->setValidatorClass(MyRequest::class)
    ->add('name', TextField::class, NameFieldOption::make()->required())
    ->add('status', SelectField::class, StatusFieldOption::make());
```

### Available Field Types

- `TextField`, `TextareaField`, `NumberField`, `PasswordField`
- `SelectField`, `RadioField`, `CheckboxField`
- `EditorField`, `MediaImageField`, `MediaImagesField`
- `OnOffField`, `ColorField`, `DatePickerField`, `TimePickerField`
- `TreeCategoryField`, `TagField`, `RepeaterField`

## Table Builder

```php
use Botble\Table\Columns\IdColumn;
use Botble\Table\Columns\NameColumn;
use Botble\Table\Columns\StatusColumn;
use Botble\Table\Columns\CreatedAtColumn;

$this->model(MyModel::class)
    ->addColumns([
        IdColumn::make(),
        NameColumn::make()->route('my-plugin.edit'),
        StatusColumn::make(),
        CreatedAtColumn::make(),
    ]);
```

## Hooks System

```php
// Actions - Execute code at specific points
do_action('event_name', $param1, $param2);
add_action('event_name', $callback, priority: 20);

// Filters - Modify values
$value = apply_filters('filter_name', $value, $param);
add_filter('filter_name', $callback, priority: 20);
```

**Common Hooks:**
- `BASE_ACTION_META_BOXES` - Add meta boxes
- `BASE_FILTER_BEFORE_RENDER_FORM` - Modify form before render
- `BASE_ACTION_AFTER_CREATE_CONTENT` - After content creation
- `BASE_FILTER_ENUM_ARRAY` - Extend enum values
- `BASE_FILTER_ENUM_LABEL` - Customize enum labels

## Routes

### Admin Routes

```php
use Botble\Base\Facades\AdminHelper;

AdminHelper::registerRoutes(function(): void {
    Route::group(['prefix' => 'my-plugin', 'as' => 'my-plugin.'], function(): void {
        Route::resource('', 'MyController')->parameters(['' => 'item']);
    });
});
```

### Public/Theme Routes

```php
use Botble\Theme\Facades\Theme;

Theme::registerRoutes(function(): void {
    Route::get('search', ['as' => 'public.search', 'uses' => 'PublicController@getSearch']);
});
```

## Security Best Practices

### XSS Prevention in Blade

```php
// For HTML contexts - use BaseHelper::clean()
{!! BaseHelper::clean($userContent) !!}

// For JavaScript contexts - use @json directive
<script>
var data = @json($variable);
</script>

// Default - auto-escapes HTML
{{ $variable }}
```

### CSRF in AJAX

```javascript
headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
```

## Plugin Development

### Learning Resources

::: tip Study Existing Plugins
Before creating new plugins, study example plugins from the community:
- **FriendsOfBotble**: https://github.com/orgs/FriendsOfBotble/repositories
- Contains well-structured plugins demonstrating best practices
- Examples: fob-comment, fob-wishlist, fob-compare, fob-faq, etc.
:::

### Plugin Structure

```
/platform/plugins/my-plugin/
├── config/
├── database/migrations/
├── resources/
│   ├── lang/
│   ├── views/
│   ├── js/
│   └── sass/
├── routes/
├── src/
│   ├── Database/
│   ├── Enums/
│   ├── Forms/
│   ├── Http/
│   │   ├── Controllers/
│   │   └── Requests/
│   ├── Models/
│   ├── Providers/
│   ├── Repositories/
│   ├── Services/
│   ├── Tables/
│   └── Plugin.php
└── plugin.json
```

### Creating a Plugin

```bash
# Create new plugin scaffold
php artisan cms:plugin:create my-plugin

# Activate plugin
php artisan cms:plugin:activate my-plugin

# Deactivate plugin
php artisan cms:plugin:deactivate my-plugin
```

### Plugin.php Lifecycle

```php
class Plugin extends PluginOperationAbstract
{
    public static function activate(): void
    {
        // Run when plugin is activated
        // Create tables, seed data, register permissions
    }

    public static function deactivate(): void
    {
        // Run when plugin is deactivated
        // Clean up if needed
    }

    public static function remove(): void
    {
        // Run when plugin is removed
        // Drop tables, clean up data
    }
}
```

### plugin.json Configuration

```json
{
    "id": "vendor/my-plugin",
    "name": "My Plugin",
    "namespace": "Vendor\\MyPlugin\\",
    "provider": "Vendor\\MyPlugin\\Providers\\MyPluginServiceProvider",
    "author": "Your Name",
    "url": "https://yoursite.com",
    "version": "1.0.0",
    "description": "Plugin description",
    "required_plugins": ["ecommerce"]
}
```

### Service Provider Pattern

```php
class MyPluginServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Load routes
        $this->loadRoutesFrom(__DIR__ . '/../../routes/web.php');

        // Load views
        $this->loadViewsFrom(__DIR__ . '/../../resources/views', 'my-plugin');

        // Load translations
        $this->loadTranslationsFrom(__DIR__ . '/../../resources/lang', 'plugins/my-plugin');

        // Register dashboard menu
        DashboardMenu::default()->beforeRetrieving(function (): void {
            DashboardMenu::make()
                ->registerItem([
                    'id' => 'cms-plugins-my-plugin',
                    'priority' => 5,
                    'name' => 'My Plugin',
                    'icon' => 'ti ti-box',
                    'url' => route('my-plugin.index'),
                    'permissions' => ['my-plugin.index'],
                ]);
        });
    }
}
```

## Theme Development

### Theme Structure

```
/platform/themes/my-theme/
├── assets/               # Source assets (sass, js)
├── config.php            # Theme configuration
├── functions/            # Theme helper functions
├── layouts/              # Layout templates
├── partials/             # Reusable partial views
├── views/                # Page views
├── widgets/              # Theme widgets
├── public/               # Compiled public assets
├── screenshot.png        # Theme preview (1200x900px)
├── theme.json            # Theme metadata
└── webpack.mix.js        # Asset compilation
```

### theme.json Configuration

```json
{
    "id": "vendor/my-theme",
    "name": "My Theme",
    "namespace": "Theme\\MyTheme\\",
    "author": "Your Name",
    "url": "https://yoursite.com",
    "version": "1.0.0",
    "description": "Theme description",
    "required_plugins": ["ecommerce"]
}
```

### config.php Events

```php
return [
    'inherit' => null,  // Parent theme name for child themes

    'events' => [
        'beforeRenderTheme' => function (Theme $theme): void {
            // Register CSS
            $theme->asset()->usePath()->add('theme', 'css/theme.css');

            // Register JS (in footer)
            $theme->asset()->container('footer')->usePath()->add(
                'theme',
                'js/theme.js',
                attributes: ['defer']
            );
        },
    ],
];
```

### Child Theme Development

Create child themes by setting `'inherit' => 'parent-theme'` in config.php:

```php
// platform/themes/my-child-theme/config.php
return [
    'inherit' => 'shofy',  // Parent theme folder name

    'events' => [
        'beforeRenderTheme' => function (Theme $theme): void {
            // Add child theme specific assets
            $theme->asset()->usePath()->add('child-styles', 'css/custom.css');
        },
    ],
];
```

Child themes only need files you want to override. Views are looked up in child theme first, then parent.

### Theme Commands

```bash
# Create new theme
php artisan cms:theme:create my-theme

# Activate theme
php artisan cms:theme:activate my-theme

# Remove theme
php artisan cms:theme:remove my-theme

# Publish theme assets
php artisan cms:theme:assets:publish
```

### Using Theme Facade

```php
use Botble\Theme\Facades\Theme;

// Render a view
Theme::scope('page', $data)->render();

// Load a partial
Theme::partial('header');

// Get theme option
theme_option('logo');

// Add breadcrumb
Theme::breadcrumb()->add('Home', '/')->add('Page', '/page');
```

## Development Commands

```bash
# Build assets
npm run dev|prod|watch

# Format code
./vendor/bin/pint [path]           # PHP (PSR-12)
npm run format                      # JS/Vue/Blade

# Quality checks
php artisan test                    # Run tests
./vendor/bin/phpstan analyse        # Static analysis

# CMS commands
php artisan cms:plugin:list
php artisan cms:plugin:activate {name}
php artisan cms:theme:activate {name}
```

## Code Quality Rules

1. **Always run Pint** on changed PHP files before committing
2. **Use Eloquent** over raw DB queries
3. **Avoid N+1** - use eager loading
4. **Use enums** for select/radio/checklist options
5. **Follow KISS/DRY/YAGNI** principles
6. **Remove unnecessary comments** - keep only `@var`, `@param`, `@return` docblocks
7. **Prefer editing** existing files over creating new ones
8. **Check for security vulnerabilities** - sanitize inputs, escape outputs

## Repository Pattern

```php
// Interface
interface MyInterface extends RepositoryInterface {}

// Implementation
class MyRepository extends RepositoriesAbstract implements MyInterface
{
    // Custom methods using $this->model
}

// Register in ServiceProvider
$this->app->bind(MyInterface::class, MyRepository::class);
```

## Request Validation

```php
class MyRequest extends Request
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:250'],
            'status' => Rule::in(BaseStatusEnum::values()),
        ];
    }

    public function attributes(): array
    {
        return ['name' => trans('plugins/my::my.form.name')];
    }
}
```

## Common Pitfalls to Avoid

| Pitfall | Solution |
|---------|----------|
| Accessing `$enum->value` directly | Use `$enum->getValue()` |
| Using `DB::` facade | Use `Model::query()` |
| Hardcoding integer IDs in signatures | Use `int\|string` type |
| Nested array translations | Use flat string keys |
| Unescaped apostrophes in translations | Escape with `\'` or use double quotes |
| Missing eager loading | Add `->with(['relation'])` |
| Skipping Pint formatting | Run `./vendor/bin/pint` before commit |

## Quick Reference Card

```php
// Enum value access
$model->status->getValue()           // Get value
$model->status->label()              // Get label
(string) $model->status              // Cast to string
BaseStatusEnum::PUBLISHED            // Constant value
BaseStatusEnum::PUBLISHED()          // Enum instance

// Translations
trans('plugins/name::file.key')      // Admin
__('theme.key')                      // Frontend

// Eloquent
Model::query()->where(...)->get()    // Always use query()
->with(['relation'])                 // Eager load

// Forms
NameFieldOption::make()->required()  // Field options
StatusFieldOption::make()            // Status select

// Security
BaseHelper::clean($html)             // Sanitize HTML
@json($data)                         // Safe JS embedding
```
