# Dashboard Widgets

## Introduction

Dashboard widgets are customizable components that display information on the admin dashboard. Botble CMS provides two types of dashboard widgets:

1. **Stats Widgets**: Small, card-like widgets that display a single statistic with an icon, color, and optional link.
2. **Content Widgets**: Larger widgets that can display complex content, tables, charts, or other interactive elements.

Widgets are stored in the database and can be customized by users (enabled/disabled, reordered, etc.). The `DashboardWidgetInstance` class provides a fluent interface for creating and configuring widgets.

## Widget Architecture

Dashboard widgets are implemented using the following components:

- **DashboardWidget**: Model that stores basic widget information (name).
- **DashboardWidgetSetting**: Model that stores widget settings (status, order, user-specific settings).
- **DashboardWidgetInstance**: Helper class for creating and configuring widgets.

## Stats Widgets

Stats widgets display a single statistic with an icon and color. They are typically used to show counts or other key metrics.

### Creating a Stats Widget

To add a stats widget, use the `DashboardWidgetInstance` class with the `setType('stats')` method:

```php
use Botble\Dashboard\Supports\DashboardWidgetInstance;
use Illuminate\Support\Collection;

add_filter(DASHBOARD_FILTER_ADMIN_LIST, function (array $widgets, Collection $widgetSettings) {
    return (new DashboardWidgetInstance())
        ->setType('stats')
        ->setPermission('your.permission')
        ->setKey('widget_your_unique_key')
        ->setTitle(trans('your-plugin::your-plugin.widget_title'))
        ->setIcon('ti ti-chart-bar')
        ->setColor('primary')
        ->setStatsTotal(fn () => YourModel::query()->count())
        ->setRoute(route('your.route'))
        ->setColumn('col-12 col-md-6 col-lg-3')
        ->setPriority(99)
        ->init($widgets, $widgetSettings);
}, 99, 2);
```

#### Stats Widget Options

- **setType('stats')**: Specifies this is a stats widget (required for stats widgets).
- **setPermission()**: Permission required to view the widget.
- **setKey()**: Unique identifier for the widget (should start with 'widget_').
- **setTitle()**: Display name of the widget.
- **setIcon()**: Icon to display (using Tabler icons or Font Awesome).
- **setColor()**: Color of the widget (primary, success, warning, danger, info, etc.).
- **setStatsTotal()**: The statistic to display (can be a number or a closure that returns a number).
- **setRoute()**: URL to navigate to when the widget is clicked.
- **setColumn()**: Bootstrap column classes for responsive layout.
- **setPriority()**: Order priority (lower numbers appear first).

### Example Stats Widget

Here's a real-world example from the Users plugin:

```php
public static function addUserStatsWidget(array $widgets, Collection $widgetSettings): array
{
    $users = fn () => User::query()->count();

    return (new DashboardWidgetInstance())
        ->setType('stats')
        ->setPermission('users.index')
        ->setTitle(trans('core/acl::users.users'))
        ->setKey('widget_total_users')
        ->setIcon('ti ti-users')
        ->setColor('info')
        ->setStatsTotal($users)
        ->setRoute(route('users.index'))
        ->setColumn('col-12 col-md-6 col-lg-3')
        ->init($widgets, $widgetSettings);
}
```

## Content Widgets

Content widgets can display complex information such as tables, charts, or other interactive elements. They load their content via AJAX from a specified route.

### Creating a Content Widget

To add a content widget, use the `DashboardWidgetInstance` class without setting a type (the default type is 'widget'):

```php
use Botble\Dashboard\Supports\DashboardWidgetInstance;
use Illuminate\Support\Collection;

add_filter(DASHBOARD_FILTER_ADMIN_LIST, function (array $widgets, Collection $widgetSettings) {
    return (new DashboardWidgetInstance())
        ->setPermission('your.permission')
        ->setKey('widget_your_unique_key')
        ->setTitle(trans('your-plugin::your-plugin.widget_title'))
        ->setIcon('ti ti-list')
        ->setColor('success')
        ->setRoute(route('your.widget.data'))
        ->setBodyClass('scroll-table')
        ->setColumn('col-md-6 col-sm-6')
        ->setPriority(99)
        ->init($widgets, $widgetSettings);
}, 99, 2);
```

#### Content Widget Options

- **setPermission()**: Permission required to view the widget.
- **setKey()**: Unique identifier for the widget (should start with 'widget_').
- **setTitle()**: Display name of the widget.
- **setIcon()**: Icon to display in the widget header.
- **setColor()**: Color accent for the widget.
- **setRoute()**: AJAX route that will return the widget content.
- **setBodyClass()**: CSS classes to add to the widget body.
- **setColumn()**: Bootstrap column classes for responsive layout.
- **setPriority()**: Order priority (lower numbers appear first).
- **setHasLoadCallback(true)**: Indicates the widget has a JavaScript callback after loading.
- **setIsEqualHeight(false)**: Disables equal height enforcement for the widget.
- **setSettings()**: Additional settings for the widget.

### Creating the Widget Content Controller

You need to create a controller method to handle the AJAX request and return the widget content:

```php
use Botble\Base\Http\Responses\BaseHttpResponse;
use Illuminate\Http\Request;

public function getWidgetData(Request $request, BaseHttpResponse $response)
{
    // Get data for the widget
    $data = YourModel::query()
        ->latest()
        ->with('relation')
        ->limit(10)
        ->get();

    // Return the rendered view as the widget content
    return $response->setData(view('your-plugin::widgets.your-widget', compact('data'))->render());
}
```

### Example Content Widget

Here's a real-world example from the Request Log plugin:

```php
public function registerDashboardWidgets(array $widgets, Collection $widgetSettings): array
{
    if (! Auth::guard()->user()->hasPermission('request-log.index')) {
        return $widgets;
    }

    Assets::addScriptsDirectly(['vendor/core/plugins/request-log/js/request-log.js']);

    return (new DashboardWidgetInstance())
        ->setPermission('request-log.index')
        ->setKey('widget_request_errors')
        ->setTitle(trans('plugins/request-log::request-log.widget_request_errors'))
        ->setRoute(route('request-log.widget.request-errors'))
        ->setColumn('col-md-6 col-sm-6')
        ->init($widgets, $widgetSettings);
}
```

And the corresponding controller method:

```php
public function getRequestErrors(Request $request, BaseHttpResponse $response)
{
    $limit = $request->integer('limit', 10);
    $limit = $limit > 0 ? $limit : 10;

    $requests = RequestLog::query()
        ->orderBy('created_at', 'desc')
        ->limit($limit)
        ->get();

    return $response->setData(view('plugins/request-log::widgets.request-errors', compact('requests', 'limit'))->render());
}
```

## Widget Settings

Widgets can have settings that allow users to customize their behavior. These settings are stored in the `dashboard_widget_settings` table.

### Adding Settings to a Widget

Use the `setSettings()` method to add default settings to a widget:

```php
->setSettings([
    'show_predefined_ranges' => true,
    'limit' => 10,
    'state' => 'expanded',
])
```

### Date Range Settings

For widgets that display time-based data, you can add predefined date ranges:

```php
->setSettings(['show_predefined_ranges' => true])
->setPredefinedRanges([
    'today' => [
        'key' => 'today',
        'label' => trans('core/dashboard::dashboard.predefined_ranges.today'),
        'startDate' => Carbon::today()->startOfDay(),
        'endDate' => Carbon::today()->endOfDay(),
    ],
    'this_week' => [
        'key' => 'this_week',
        'label' => trans('core/dashboard::dashboard.predefined_ranges.this_week'),
        'startDate' => Carbon::now()->startOfWeek(),
        'endDate' => Carbon::now()->endOfWeek(),
    ],
])
```

### Saving Widget Settings

You can save widget settings programmatically using the `saveSettings()` method:

```php
$widgetInstance = new DashboardWidgetInstance();
$widgetInstance->saveSettings('widget_your_unique_key', [
    'limit' => 20,
    'state' => 'collapsed',
]);
```

## Managing Widgets

### Removing a Widget by ID

To remove a specific widget:

```php
add_filter(DASHBOARD_FILTER_ADMIN_LIST, function (array $widgets) {
    \Illuminate\Support\Arr::forget($widgets, 'widget_your_unique_key');

    return $widgets;
}, 120, 1);
```

### Removing a content widget

```php
app('events')->listen(\Botble\Dashboard\Events\RenderingDashboardWidgets::class, function (): void {
    add_filter(DASHBOARD_FILTER_ADMIN_LIST, function (array $widgets) {
        foreach ($widgets as $key => $widget) {
            if (str_contains($widget['view'], 'id="widget_posts_recent"')) {
                unset($widgets[$key]);
            }
        }

        return $widgets;
    }, 120);
});
```

### Removing All Widgets

To remove all dashboard widgets:

```php
remove_filter(DASHBOARD_FILTER_ADMIN_LIST);
```

## Widget Events and Actions

Botble CMS provides events and actions for dashboard widgets:

- **RenderingDashboardWidgets**: Event dispatched before rendering dashboard widgets.
- **DASHBOARD_FILTER_ADMIN_LIST**: Filter to add or modify dashboard widgets.
- **DASHBOARD_ACTION_REGISTER_SCRIPTS**: Action to register additional scripts for dashboard widgets.

### Example: Adding Scripts for Widgets

```php
add_action(DASHBOARD_ACTION_REGISTER_SCRIPTS, function () {
    Assets::addScriptsDirectly(['vendor/core/plugins/your-plugin/js/your-widget.js']);
});
```

## Best Practices

1. **Unique Keys**: Always use unique keys for your widgets, preferably prefixed with 'widget_' and your plugin name.

2. **Permissions**: Always check permissions to ensure users only see widgets they have access to.

3. **Responsive Design**: Use appropriate column classes to ensure widgets look good on all screen sizes.

4. **Performance**: For stats widgets that query the database, consider using closures to defer execution until needed.

5. **Caching**: For widgets with expensive data operations, consider caching the results.

6. **Asset Management**: Register any required CSS or JavaScript files using the DASHBOARD_ACTION_REGISTER_SCRIPTS action.

7. **Translations**: Use translation strings for widget titles and content for better localization support.
