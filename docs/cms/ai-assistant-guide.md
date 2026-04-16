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

- **Backend**: Laravel 13+, PHP 8.3+
- **Frontend**: Vue.js 3, Bootstrap 5, jQuery
- **Build**: Vite (per-module `vite.build.mjs` descriptors, shared `vite-build.mjs` runner), npm workspaces. See [Asset Compilation](/cms/asset-compilation).
- **Database**: MySQL (SQLite for tests)
- **UI Framework**: [Tabler UI](https://docs.tabler.io/ui)

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| PHP files | `kebab-case.php` | `product-controller.php` |
| Classes/Enums | `PascalCase` | `ProductController` |
| Methods | `camelCase` | `getProductList()` |
| Variables/Properties | `snake_case` | `$product_name` |
| Constants/Enum Cases | `SCREAMING_SNAKE_CASE` | `PUBLISHED` |
| Translation keys | `dot.notation` | `plugins/blog::posts.create` |
| Route names | `dot.notation` | `my-plugin.index` |
| Config keys | `snake_case` | `max_upload_size` |

## Critical: Botble Enum Usage

::: danger IMPORTANT
Botble uses a **custom Enum class** (`Botble\Base\Supports\Enum`), NOT PHP 8.1 native enums. The `$value` property is **protected** and cannot be accessed directly. Direct `===` comparison between an enum instance and a constant always returns `false` (object vs string) — this is the **most common silent bug**.
:::

```php
// ❌ BAD - Will throw: "Cannot access protected property"
$type = $model->status->value;

// ❌ BAD - Always false! Object vs string comparison
if ($model->status === BaseStatusEnum::PUBLISHED) { }

// ✅ GOOD - Use getValue() method
$type = $model->status->getValue();

// ✅ GOOD - Use (string) cast
$type = (string) $model->status;

// ✅ GOOD - Compare using getValue()
if ($attribute->type->getValue() === 'checkbox') { }

// ✅ GOOD - Use static constant for comparison
if ($status->getValue() === BaseStatusEnum::PUBLISHED) { }

// ✅ GOOD - In match() expressions
match ($model->discount_type->getValue()) {
    DiscountTypeEnum::PERCENTAGE => ...,
};
```

`getValue()` is **NOT needed** when:
- Using `$request->input('field')` — already a raw string
- In `->where('status', SomeEnum::VALUE)` — Laravel handles query bindings
- Comparing local variables from enum constants directly

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

### Model Rules

- Always extend `Botble\Base\Models\BaseModel`, never plain `Model`
- `casts()` is a **method** (not property) in Laravel 12+: `protected function casts(): array`

### ID Type Support

Botble CMS supports both integer IDs and UUIDs. Every controller parameter, service method, and route must support both:

```php
// ❌ BAD - Only supports integer IDs
public function show(int $id): Response
Route::get('{id}', ...)->where('id', '[0-9]+');

// ✅ GOOD - Supports both integer and UUID
public function show(int|string $id): Response
Route::get('{id}', ...)->wherePrimaryKey();  // auto-handles int or UUID
```

Never cast `$id` to `(int)`. Use `$model->getKey()` instead of `$model->id` when type matters.

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

### Two Distinct Systems

| Context | Function | File type | Location |
|---------|----------|-----------|----------|
| Plugins/packages/core (admin) | `trans('plugins/blog::posts.create')` | PHP arrays | `resources/lang/{locale}/*.php` |
| Frontend themes only | `__('Home')` | JSON flat key-value | `lang/{locale}.json` |

::: danger
**NEVER** use `__()` in plugins — it won't resolve plugin translation namespaces. Always use `trans()` with the full namespace.
:::

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

### JSON Translation Rules (Themes)

- Flat key-value only — no nesting
- Keys = English strings
- Preserve `:placeholders` exactly
- One file per language

### Supported Languages (42+)

`ar`, `bg`, `bn`, `cs`, `da`, `de`, `el`, `es`, `fa`, `fi`, `fr`, `he`, `hi`, `hu`, `id`, `it`, `ja`, `ko`, `lt`, `lv`, `ms`, `nb`, `nl`, `pl`, `pt`, `pt-BR`, `ro`, `ru`, `sk`, `sl`, `sr`, `sv`, `th`, `tr`, `uk`, `vi`, `zh`, `zh-TW`

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

### Multi-Column Forms

```php
$this
    ->columns(12)
    ->add('name', TextField::class, NameFieldOption::make()->colspan(8)->required()->toArray())
    ->add('status', SelectField::class, StatusFieldOption::make()->colspan(4)->toArray());
```

### Available Field Types

**Text & Input:** `TextField`, `EmailField`, `PasswordField`, `PhoneNumberField`, `NumberField`, `TextareaField`, `HiddenField`

**Rich Content:** `EditorField`, `CkEditorField`, `TinyMceField`, `CodeEditorField` (with `.mode('css'|'javascript'|'html'|'php')`)

**Selection:** `SelectField`, `RadioField`, `MultiCheckListField`, `OnOffField`, `TreeCategoryField`

**Media:** `MediaImageField`, `MediaImagesField`, `MediaFileField`, `FileField`

**Date & Time:** `DatePickerField` (with `.withTimePicker()`), `DateField`, `TimeField`, `TimePickerField`

**Special:** `ColorField`, `ColorSelectorField`, `TagField`, `RepeaterField`, `CoreIconField`, `GoogleFontsField`, `UiSelectorField`, `AutocompleteField`, `AlertField`, `HtmlField`, `LabelField`

### Select Field: `searchable()` vs `ajaxSearch()`

::: warning
These use different CSS classes and **cannot be combined**.
:::

- `searchable()` → `select-search-full` — local search, preloads all choices
- `ajaxSearch()` → `select-search-ajax` — remote AJAX search via `data-url`

Built-in AJAX search routes: `admin.ajax.search-products`, `admin.ajax.search-categories`, `tags.all`

### Extending Another Plugin's Form via Hooks

```php
add_filter(BASE_FILTER_BEFORE_RENDER_FORM, function ($form, $data) {
    if ($data instanceof \Botble\Blog\Models\Post) {
        $form->add('custom_field', TextField::class, ...);
    }
    return $form;
}, 120, 2);
```

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

### FormattedColumn vs Column

::: danger CRITICAL
`Column::make()` **silently ignores** `getValueUsing()` and `renderUsing()`. You MUST use `FormattedColumn::make()` for custom render logic. Type-hints in closures must match the actual column class.
:::

```php
// ❌ WRONG — renderUsing silently ignored
Column::make('price')->renderUsing(function (Column $col, $value) { ... });

// ✅ CORRECT
FormattedColumn::make('price')
    ->formatted(fn ($value) => format_price($value));

// ❌ WRONG type-hint — TypeError
ImageColumn::make('image')->getValueUsing(fn (Column $col) => ...);

// ✅ CORRECT type-hint
ImageColumn::make('image')->getValueUsing(fn (ImageColumn $col) => ...);
```

### Product Image Eager Loading

::: warning
The `image` accessor depends on the `images` field as fallback. Always include both.
:::

```php
// ❌ WRONG — image accessor may return null
->with('product:id,name,image')

// ✅ CORRECT
->with('product:id,name,image,images')
```

### All Column Types

`IdColumn`, `NameColumn`, `ImageColumn`, `StatusColumn`, `CreatedAtColumn`, `UpdatedAtColumn`, `FormattedColumn`, `EnumColumn`, `LinkableColumn`, `EmailColumn`, `PhoneColumn`, `YesNoColumn`, `CheckboxColumn`

### Column Customization Methods

```php
$column
    ->visible(false)
    ->orderable(false)
    ->searchable(false)
    ->exportable(false)
    ->getValueUsing(fn ($col) => ...)
    ->renderUsing(fn ($col, $value) => ...)
    ->append(fn ($col) => '<span>...</span>')
    ->alignStart() / ->alignCenter() / ->alignEnd()
    ->withColor('success')
    ->withIcon('ti ti-check')
    ->withEmptyState('N/A')
    ->copyable()
    ->blur()
```

### Disabling the Operations Column

For read-only tables (audit logs, stock movements):

```php
class MyReadOnlyTable extends TableAbstract
{
    protected $hasOperations = false;  // ✅ CORRECT
    // NOT ->addActions([]) — empty array doesn't disable it
}
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

### Common Base Hooks

| Hook | Type | Purpose |
|------|------|---------|
| `BASE_ACTION_META_BOXES` | Action | Render meta boxes |
| `BASE_FILTER_BEFORE_RENDER_FORM` | Filter | Before form renders |
| `BASE_ACTION_AFTER_CREATE_CONTENT` | Action | After content created |
| `BASE_ACTION_AFTER_UPDATE_CONTENT` | Action | After content updated |
| `BASE_ACTION_AFTER_DELETE_CONTENT` | Action | After content deleted |
| `DASHBOARD_FILTER_ADMIN_LIST` | Filter | Dashboard widgets |
| `BASE_FILTER_ENUM_ARRAY` | Filter | Extend enum values |
| `BASE_FILTER_ENUM_LABEL` | Filter | Customize enum labels |
| `BASE_FILTER_ENUM_HTML` | Filter | Enum HTML badge |

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

### Route Model Binding (Preferred)

Automatically resolves both int and UUID IDs. Route parameter name in `parameters()` must match controller method parameter name:

```php
public function edit(MyModel $item)     // auto-resolved, auto-404
public function destroy(MyModel $item)  // cleaner, no findOrFail()
```

### Public/Theme Routes

```php
use Botble\Theme\Facades\Theme;

Theme::registerRoutes(function(): void {
    Route::get('search', ['as' => 'public.search', 'uses' => 'PublicController@getSearch']);
});
```

### Controller Response Helpers

```php
return $this->httpResponse()
    ->setNextRoute('my-plugin.edit', $form->getModel())
    ->withCreatedSuccessMessage();

return $this->httpResponse()->withUpdatedSuccessMessage();
return $this->httpResponse()->withDeletedSuccessMessage();
```

## Security Best Practices

### XSS Prevention in Blade

```php
// For HTML contexts - use BaseHelper::clean()
{!! BaseHelper::clean($userContent) !!}

// For JavaScript contexts - use @json directive
// <script> var data = @json($variable); </script>

// Default - auto-escapes HTML
// Use Blade double curly braces: {{ $variable }}
```

### CSRF in AJAX

```javascript
headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
```

### Cookie Security

```php
// ❌ WRONG
$mode = $_COOKIE['theme_mode'];

// ✅ CORRECT — with allowlist validation
$mode = request()->cookie('theme_mode');
$mode = in_array($mode, ['light', 'dark']) ? $mode : 'light';
```

```js
// JS cookie must have security flags
document.cookie = `theme_mode=${mode}; path=/; Secure; SameSite=Lax; max-age=31536000`;
```

## Frontend Asset & Code Rules

::: danger MANDATORY
These rules are enforced across all Botble CMS code. Violations cause bugs, security issues, or build failures.
:::

| # | Rule | Details |
|---|------|---------|
| 1 | No CDN assets | Bundle locally via npm. No `googleapis`, `jsdelivr`, `unpkg`, `cdnjs` links |
| 2 | XSS whitelist only | All `{!! !!}` must use `BaseHelper::clean()` |
| 3 | jQuery `.on()` only | Never `.click()`, `.bind()`, `.hover()`, `.submit()` — deprecated methods |
| 4 | No inline JS/CSS | No `onclick=`, `onsubmit=`, inline `style=` (unless dynamic values) |
| 5 | No dead code | Delete unused code — never comment out. No `// TODO` leftovers |
| 6 | Latest libraries | Keep dependencies up to date. Run `npm outdated` periodically |

### Google Fonts

```php
// ❌ WRONG — direct CDN link
<link href="https://fonts.googleapis.com/...">

// ✅ CORRECT — caches locally via proxy
{!! BaseHelper::googleFonts('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap') !!}

// ✅ BEST — use Theme::typography() which handles everything automatically
Theme::typography()->registerFontFamilies([...]);
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
│   ├── general.php
│   └── permissions.php
├── database/migrations/
├── resources/
│   ├── lang/en/{plugin}.php
│   ├── views/
│   ├── js/
│   └── sass/
├── routes/
│   ├── web.php
│   └── api.php (optional)
├── src/
│   ├── Database/
│   ├── Enums/
│   ├── Forms/
│   ├── Http/
│   │   ├── Controllers/
│   │   └── Requests/
│   ├── Models/
│   ├── Providers/
│   │   ├── {Name}ServiceProvider.php
│   │   └── EventServiceProvider.php
│   ├── Repositories/
│   ├── Services/
│   ├── Tables/
│   ├── Widgets/
│   └── Plugin.php
└── plugin.json
```

### Artisan Scaffolding Commands

```bash
# Create new plugin scaffold
php artisan cms:plugin:create my-plugin

# Scaffold individual components
php artisan cms:make:model {Name} --no-interaction
php artisan cms:make:form {Name} --no-interaction
php artisan cms:make:table {Name} --no-interaction
php artisan cms:make:controller {Name} --no-interaction
php artisan cms:make:request {Name} --no-interaction
php artisan cms:make:route {Name} --no-interaction

# Plugin management
php artisan cms:plugin:activate my-plugin
php artisan cms:plugin:deactivate my-plugin
```

### Plugin.php Lifecycle

::: danger
`removed()` MUST drop ALL tables and clean up ALL settings. Partial cleanup fails the uninstall contract.
:::

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
    }

    public static function removed(): void
    {
        // MUST drop ALL tables and clean up ALL data
        Schema::dropIfExists('my_models');
        // Also delete settings, meta, etc.
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
        $this
            ->setNamespace('plugins/my-plugin')
            ->loadAndPublishConfigurations(['permissions'])
            ->loadAndPublishViews()
            ->loadAndPublishTranslations()
            ->loadRoutes()
            ->loadMigrations()
            ->publishAssets();

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

### Permissions Config

```php
// config/permissions.php
return [
    ['name' => 'My Plugin', 'flag' => 'my-plugin.index', 'parent_flag' => 'core.cms'],
    ['name' => 'Create',    'flag' => 'my-plugin.create',  'parent_flag' => 'my-plugin.index'],
    ['name' => 'Edit',      'flag' => 'my-plugin.edit',    'parent_flag' => 'my-plugin.index'],
    ['name' => 'Delete',    'flag' => 'my-plugin.destroy', 'parent_flag' => 'my-plugin.index'],
];
```

### Key Plugin Registrations (in Service Provider boot())

```php
SlugHelper::registerModule(MyModel::class, 'My Items');
SlugHelper::setPrefix(MyModel::class, 'items');
SeoHelper::registerModule([MyModel::class]);

if (is_plugin_active('language') && is_plugin_active('language-advanced')) {
    LanguageAdvancedManager::registerModule(MyModel::class, ['name', 'description', 'content']);
}
```

## Theme Development

### Theme Structure

```
/platform/themes/my-theme/
├── assets/               # Source assets (sass, js)
├── config.php            # Theme configuration
├── functions/
│   ├── functions.php     # Theme helper functions
│   └── shortcodes.php    # Shortcode registrations
├── lang/
│   ├── en.json           # English translations (JSON)
│   └── vi.json           # Vietnamese translations
├── layouts/              # Layout templates
├── partials/
│   └── shortcodes/{name}/
│       ├── index.blade.php   # Frontend render
│       └── admin.blade.php   # Admin config form
├── views/                # Page views
├── widgets/{name}/templates/
│   ├── frontend.blade.php
│   └── backend.blade.php
├── public/               # Compiled public assets
├── screenshot.png        # Theme preview image
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

### Built-in Theme Getters (Prefer Over Raw `theme_option()`)

```php
Theme::getSiteTitle()         // not theme_option('site_title')
Theme::getLogo()              // not theme_option('logo')
Theme::getLogo('logo_light')  // alt logo variant
Theme::getLogoImage(['alt' => Theme::getSiteTitle()])
Theme::getSiteCopyright()
Theme::formatDate($date)
BaseHelper::getHomepageUrl()
```

### RvMedia: ALWAYS Use for Images

```php
// ❌ WRONG — raw path in img src
// <img src="{{ $product->image }}">
// <img src="/storage/{{ $post->image }}">

// ✅ CORRECT
RvMedia::getImageUrl($model->image)
RvMedia::getImageUrl($model->image, 'thumb')
{!! RvMedia::image($model->image, $model->name, 'thumb') !!}
// Disable lazy loading for above-fold images
{!! RvMedia::image($model->image, $model->name, null, true, [], null, false) !!}
```

### Theme Support Helpers

Register in `functions.php`:

```php
ThemeSupport::registerSocialLinks();
ThemeSupport::registerToastNotification();
ThemeSupport::registerPreloader();
ThemeSupport::registerSiteCopyright();
ThemeSupport::registerDateFormatOption();
ThemeSupport::registerLazyLoadImages();
ThemeSupport::registerSocialSharing();
ThemeSupport::registerSiteLogoHeight();
```

### Shortcode Development

1. Register in `functions/shortcodes.php`
2. Create frontend view at `partials/shortcodes/{name}/index.blade.php`
3. Create admin config view at `partials/shortcodes/{name}/admin.blade.php`

### Shortcode Admin Field Types

```php
Shortcode::fields()->text('name', __('Label'), Arr::get($attributes, 'name'))
Shortcode::fields()->textarea('desc', __('Desc'), ...)
Shortcode::fields()->image('image', __('Image'), ...)
Shortcode::fields()->select('style', __('Style'), ..., ['s1' => 'Style 1'])
Shortcode::fields()->onOff('show_title', __('Show Title'), ..., 'yes')
Shortcode::fields()->number('limit', __('Limit'), ..., 6)
Shortcode::fields()->color('bg_color', __('Background'), ...)
Shortcode::fields()->tabs(Shortcode::fields()->tab('tabs', __('Tabs'), [...]))
```

### View Size & DRY Rules

- Max ~150 lines per Blade file — split into partials if exceeded
- No DB queries in header/footer partials — use a View Composer:

```php
View::composer('theme.my::partials.header', function ($view) {
    $counts = Cache::remember('header_counts', 60, fn () => [...]);
    $view->with('counts', $counts);
});
```

- JS utility functions: never duplicate across files — extract to `assets/js/utils/`
- Always clean up `setInterval`/`setTimeout` on page unload:

```js
const interval = setInterval(checkStatus, 5000);
window.addEventListener('beforeunload', () => clearInterval(interval));
```

### Slider Unique IDs (Multiple Shortcode Instances)

```php
@php($sliderUniqueId = 'product-slider-' . uniqid())
// Use $sliderUniqueId in Blade: id="{{ $sliderUniqueId }}"
// Button: class="slider-prev-{{ $sliderUniqueId }}"
```

## TailwindCSS v4 Themes

### No tailwind.config.js — All Config in CSS

```css
@import "tailwindcss";

@source "../../../../themes/my-theme/layouts/**/*.blade.php";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
    --color-primary-500: oklch(0.62 0.18 255);
    --font-sans: 'Inter', ui-sans-serif, system-ui;
}

@plugin "@tailwindcss/forms";
```

### Dark Mode

Toggle `.dark` class on `<html>`. Use `dark:` prefix on all affected classes. Persist to cookie with `SameSite=Lax`.

### Build Pipeline

```bash
npm run dev     # development
npm run watch   # watch mode
npm run prod    # production (minifies + copies to public/)
php artisan cms:publish:assets  # always run after prod build
```

## UI Components (Tabler)

### Badge Rule

::: danger IMPORTANT
Always use BOTH `bg-{color}` AND `text-{color}-fg` together. Never use `bg-{color}` alone — text becomes invisible.
:::

```html
<!-- ❌ WRONG -->
<span class="badge bg-green">Active</span>

<!-- ✅ CORRECT -->
<span class="badge bg-green text-green-fg">Active</span>
```

Available colors: `blue`, `azure`, `indigo`, `purple`, `pink`, `red`, `orange`, `yellow`, `lime`, `green`, `teal`, `cyan`

Light variants: append `-lt` (e.g., `bg-green-lt`) — these don't need the `-fg` suffix.

Do NOT use Bootstrap colors (`bg-success`, `bg-danger`) for badges in Tabler UI.

### Dashboard Widget Pattern

```php
add_filter(DASHBOARD_FILTER_ADMIN_LIST, function (array $widgets, Collection $widgetSettings) {
    return (new DashboardWidgetInstance())
        ->setType('stats')
        ->setPermission('my-plugin.index')
        ->setKey('widget_my_plugin_count')
        ->setTitle(trans('...'))
        ->setIcon('ti ti-chart-bar')
        ->setColor('primary')
        ->setStatsTotal(fn () => MyModel::query()->count())
        ->setRoute(route('my-plugin.index'))
        ->setColumn('col-12 col-md-6 col-lg-3')
        ->setPriority(99)
        ->init($widgets, $widgetSettings);
}, 99, 2);
```

### Common Admin Icons

```
ti ti-home          Dashboard          ti ti-chart-bar     Analytics
ti ti-box           Products/Items     ti ti-mail          Email/Messages
ti ti-users         Users/Customers    ti ti-photo         Media/Images
ti ti-shopping-cart  Cart/Orders       ti ti-tag           Tags/Labels
ti ti-settings      Settings           ti ti-folder        Categories
ti ti-credit-card   Payments           ti ti-truck         Shipping
ti ti-star          Reviews/Featured
```

## Ecommerce

### Key Models Hierarchy

```
Product (configurable or simple)
├── ProductVariation → ProductVariationItem
├── ProductAttributeSet → ProductAttribute
├── SpecificationGroup → SpecificationAttribute
├── FlashSale
└── ProductCategory, ProductTag, ProductCollection
```

### Order Lifecycle

```
PENDING → PROCESSING → COMPLETED
PENDING → PROCESSING → CANCELED
COMPLETED → PARTIAL_RETURNED → RETURNED
```

### Key Ecommerce Enums

```php
OrderStatusEnum:    PENDING, PROCESSING, COMPLETED, CANCELED, PARTIAL_RETURNED, RETURNED
PaymentStatusEnum:  PENDING, APPROVED, FAILED, REFUNDED
ShippingStatusEnum: PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, FAILED
ProductTypeEnum:    PHYSICAL, DIGITAL
StockStatusEnum:    IN_STOCK, OUT_OF_STOCK, LOW_STOCK
```

Always use `->getValue()` for ALL ecommerce enum comparisons.

### Key Ecommerce Hooks

| Hook | Type | Purpose |
|------|------|---------|
| `ACTION_AFTER_ORDER_STATUS_COMPLETED_ECOMMERCE` | Action | Order completed |
| `PAYMENT_ACTION_PAYMENT_PROCESSED` | Action | Payment recorded |
| `ecommerce_create_order_from_data` | Action | Order created |
| `PAYMENT_FILTER_AFTER_POST_CHECKOUT` | Filter | After checkout |
| `ecommerce_cart_data_for_response` | Filter | Cart response |
| `ecommerce_products_filter` | Filter | Products query |
| `ecommerce_calculate_shipping_fee` | Filter | Shipping fee |
| `ecommerce_invoice_header/footer` | Filter | Invoice customization |

### EcommerceHelper Facade

```php
EcommerceHelper::isCartEnabled()
EcommerceHelper::withProductEagerLoadingRelations($query)
EcommerceHelper::viewPath('includes.filters')
EcommerceHelper::jsAttributes('add-to-cart', $product)
EcommerceHelper::jsAttributes('quick-shop', $product)
```

### Payment Gateway Integration (6-Step Pattern)

1. Create `helpers/constants.php` defining `MY_GATEWAY_PAYMENT_METHOD_NAME`
2. Register 8 filters in `HookServiceProvider` (checkout UI, process, settings, 3 enum filters, service class, detail)
3. Implement `MyGatewayPaymentService` with `execute()` + `refundOrder()` + `PaymentErrorTrait`
4. Add webhook controller with signature verification + idempotency check
5. Routes: webhook must bypass CSRF with `->withoutMiddleware([VerifyCsrfToken::class])`, plus success/error routes
6. Settings form extending `PaymentMethodForm` with `paymentFeeField()`

### Infinite Scroll Pattern

```php
// Blade template for infinite scroll
// <div class="bb-infinite-products-grid" data-url="{{ $products->nextPageUrl() }}">
// <button class="bb-load-more-btn">Load More</button>
```

## API Development

### API Structure

```
src/Http/
├── Controllers/API/{Resource}Controller.php  (extends BaseApiController)
├── Resources/API/{Resource}Resource.php       (JsonResource)
└── Requests/API/{Resource}Request.php
```

### API Response Format

```json
{ "error": false, "data": {...}, "message": null }
{ "error": true, "data": null, "message": "Not found" }
```

Use `$this->httpResponse()->setData(...)->setMessage(...)->toApiResponse()`.

### Middleware Reference

| Middleware | Purpose |
|-----------|---------|
| `auth:sanctum` | Require authentication |
| `api.optional.auth` | Guest or authenticated (cart/wishlist) |
| `ForceJsonResponse` | Ensure JSON responses |
| `ThrottleRequests::using('name')` | Rate limiting |
| `ApiCurrencyMiddleware` | Read `X-CURRENCY` header |
| `api.language.ecommerce` | Read `X-LANGUAGE` header |

### Mobile App Custom Headers

```
X-API-KEY        App authentication
X-CURRENCY       User-selected currency (e.g., 'USD')
X-LANGUAGE       User-selected language (e.g., 'vi')
X-API-IP         Client IP for geolocation
Authorization    Bearer {sanctum-token}
```

### Guest Cart with Optional Auth

```php
Route::group(['middleware' => 'api.optional.auth'], function (): void {
    Route::post('cart/add', [CartController::class, 'addToCart']);
});

// In controller
$customerId = auth('sanctum')->check() ? auth('sanctum')->id() : null;
$cartIdentifier = $customerId ?? (string) Str::uuid();
```

## Seeder Development

### Core Rules

1. **NO** `fake()` / `Faker` for user-visible content — use real names, real descriptions
2. All seeded content must support multi-language via JSON translation files
3. Real images from `database/seeders/files/`, not placeholder URLs
4. Use `Arr::random()` for variety

### When `fake()` IS Acceptable

- Passwords: `bcrypt('12345678')`
- Random selection from real data: `Arr::random($realProducts)`
- Random counts: `rand(3, 8)`
- Random booleans: `rand(0, 1)` for `is_featured`

### Architecture

```
database/seeders/
├── DatabaseSeeder.php
├── TranslationSeeder.php
├── contents/          HTML content files
├── files/             Seed images/media
├── translations/
│   └── {locale}/
│       ├── ec_products.json
│       └── {model}-content.html
└── Themes/
    └── Main/          Per-variant seeders
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
php artisan cms:publish:assets      # After prod build
```

### Pre-commit Verification

```bash
php -l path/to/file.php                   # Syntax check
./vendor/bin/pint path/to/file.php        # Format
php artisan test platform/plugins/{plugin}/tests
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
9. **Max ~150 lines** per Blade view, ~200 lines per PHP class
10. **No DB queries** in header/footer partials — use View Composers

## Code Review Severity Guide

**Critical:** Enum comparisons without `getValue()`, XSS `{!! !!}` without `BaseHelper::clean()`, CDN assets, SQL injection, CSRF missing

**High:** Models not extending `BaseModel`, inline JS/CSS, dead code, DRY violations, view files >150 lines, controller >200 lines

**Medium:** ID params not `int|string`, hardcoded strings, `bigInteger` in migrations, cookie without allowlist, N+1 queries

**Low:** Missing `query()` builder, `setInterval` without cleanup, noisy comments

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
| `$model->status === Enum::VALUE` | Use `$model->status->getValue() === Enum::VALUE` |
| Using `DB::` facade | Use `Model::query()` |
| Hardcoding integer IDs in signatures | Use `int\|string` type |
| Nested array translations | Use flat string keys |
| `__()` in plugins | Use `trans('plugins/name::file.key')` |
| Unescaped apostrophes in translations | Escape with `\'` or use double quotes |
| Missing eager loading | Add `->with(['relation'])` |
| `Column::make()` with `renderUsing()` | Use `FormattedColumn::make()` |
| `->with('product:id,name,image')` | Include `images` field too |
| `bg-green` badge without `-fg` | Always add `text-green-fg` |
| CDN Google Fonts link | Use `BaseHelper::googleFonts()` |
| Skipping Pint formatting | Run `./vendor/bin/pint` before commit |
| Raw image path in `<img>` src | Use `RvMedia::getImageUrl()` |
| Plugin `removed()` without dropping tables | Must drop ALL tables and settings |
| `$_COOKIE` direct access | Use `request()->cookie()` with allowlist |

## Quick Reference Card

```php
// Enum value access
$model->status->getValue()           // Get value
$model->status->label()              // Get label
(string) $model->status              // Cast to string
BaseStatusEnum::PUBLISHED            // Constant value
BaseStatusEnum::PUBLISHED()          // Enum instance

// Translations
trans('plugins/name::file.key')      // Admin (plugins/packages/core)
__('theme.key')                      // Frontend (themes only)

// Eloquent
Model::query()->where(...)->get()    // Always use query()
->with(['relation'])                 // Eager load

// Forms
NameFieldOption::make()->required()  // Field options
StatusFieldOption::make()            // Status select

// Tables
FormattedColumn::make('col')         // For custom render
    ->formatted(fn ($v) => ...)

// Security
BaseHelper::clean($html)             // Sanitize HTML
@json($data)                         // Safe JS embedding

// Images
RvMedia::getImageUrl($path)          // Always use for images
RvMedia::getImageUrl($path, 'thumb') // With size preset

// Routes
Route::get('{id}', ...)->wherePrimaryKey()  // Support int + UUID

// Response
$this->httpResponse()->withCreatedSuccessMessage()
```

### Public Cache Control

```bash
# .env
CMS_PUBLIC_CACHE_CONTROL_ENABLED=true
CMS_PUBLIC_CACHE_MAX_AGE=600
```

Pages with CSRF forms automatically get `Cache-Control: no-store`. Public pages get `Cache-Control: public, max-age=600`.
