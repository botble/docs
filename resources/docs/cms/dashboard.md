## Dashboard

### Register new dashboard widget

- Open your plugin service provider then add to the `boot` function.

```php
add_filter(DASHBOARD_FILTER_ADMIN_LIST, [$this, 'registerDashboardWidgets'], 1221, 2);
```

`1221` is the priority, it can be any number but must unique.

- Add function callback to your plugin service provider.

```php
public function registerDashboardWidgets($widgets, $widgetSettings)
{
    $widget = new DashboardWidgetInstance;

    $widget->permission = 'the permission key to check';
    $widget->key = 'widget_your_widget_key';
    $widget->title = __('Widget name');
    $widget->icon = 'fas fa-history';
    $widget->color = '#44b6ae';
    $widget->route = route('the-route-to-get-data');
    $widget->bodyClass = 'scroll-table';
    $widget->column = 'col-md-6 col-sm-6';

    return $widget->init($widgets, $widgetSettings);
}
```

- Create a controller to return main content for your widget, the route name is added in above code (Ex: `the-route-to-get-data`).

```php
public function getDataForWidget(Request $request, BaseHttpResponse $response)
{
    $content = 'The content can be a string or rendered from a blade view';
    
    // $content = view('plugins.your-plugin::widgets.sample', compact('data'))->render()
    return $response
        ->setError(false)
        ->setData($content);
}
```
