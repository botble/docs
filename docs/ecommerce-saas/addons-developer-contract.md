---
title: Add-on Developer Contract
description: The Botble filters an add-on plugin exposes so Ecommerce SaaS can run it safely on a multi-store platform.
---

# Add-on Developer Contract

This page is for plugin developers. It describes the hooks an add-on exposes so the
platform can adapt it to many stores. Everything is plain Botble filters with neutral
defaults, so the same plugin build runs unchanged on a single-site install, where nobody
answers the filters.

```
add-on plugin                        tenancy package
-------------                        ---------------
apply_filters(hook, default)  <----  add_filter(hook, platform answer)
(never references tenancy)           (never references the add-on's classes)
```

## Why an add-on needs a contract

Three facts about the platform break plugins written for one site:

1. **The store is identified by route middleware, after providers boot.** A `setting()` or
   database read in `register()`, `boot()` or a route file runs against the **central**
   database, and `route:cache` freezes whatever it read.
2. **Store identification is attached to the `web` route group only.** A route outside
   `web` — an inbound webhook, a CORS embed API, an `api` route — runs against the
   central database even when called on a store's domain.
3. **One worker serves every store.** Anything a singleton captures from the first store
   it saw (an API key, a prefix, a driver list) is served to the next store.

Plus two product decisions: stores never see licence screens (the platform owner licenses
an add-on once, centrally), and plugin cron tasks run per store from `tenancy:schedule`,
not from `schedule:run`.

## Hook reference

Define the constants in the plugin's `helpers/constants.php`, guarded, because several
add-ons define the same names:

```php
if (! defined('PLUGIN_FILTER_LICENSE_UI_ENABLED')) {
    define('PLUGIN_FILTER_LICENSE_UI_ENABLED', 'plugin_license_ui_enabled');
}

if (! defined('PLUGIN_FILTER_ADDON_REGISTRY')) {
    define('PLUGIN_FILTER_ADDON_REGISTRY', 'plugin_addon_registry');
}

if (! defined('PLUGIN_FILTER_SCHEDULE_TASKS')) {
    define('PLUGIN_FILTER_SCHEDULE_TASKS', 'plugin_schedule_tasks');
}

if (! defined('PLUGIN_FILTER_NATIVE_SCHEDULE_ENABLED')) {
    define('PLUGIN_FILTER_NATIVE_SCHEDULE_ENABLED', 'plugin_native_schedule_enabled');
}

if (! defined('PLUGIN_FILTER_OUTBOUND_URL_ALLOWED')) {
    define('PLUGIN_FILTER_OUTBOUND_URL_ALLOWED', 'plugin_outbound_url_allowed');
}

if (! defined('PLUGIN_FILTER_ROUTE_MIDDLEWARE')) {
    define('PLUGIN_FILTER_ROUTE_MIDDLEWARE', 'plugin_route_middleware');
}
```

`$pluginId` is always the plugin's folder name (`pos-pro`), never the marketplace product id.

| Hook | Arguments → return | Default | The add-on | The platform answers |
|---|---|---|---|---|
| `plugin_license_ui_enabled` | `(bool $enabled, string $pluginId): bool` | `true` | Hides its licence menu item / settings section and 404s every licence action when `false` | `false` |
| `plugin_addon_registry` | `(array $items): array` | `[]` | Adds one entry describing itself and its licence service | Reads it for **Operator console → Add-ons** |
| `plugin_schedule_tasks` | `(array $tasks): array` | `[]` | Appends every scheduled task it has | Runs them per store from `tenancy:schedule` |
| `plugin_native_schedule_enabled` | `(bool $enabled, string $pluginId): bool` | `true` | Registers its tasks with Laravel's `Schedule` only when `true` | `false` |
| `plugin_outbound_url_allowed` | `(bool $allowed, string $url, string $pluginId): bool` | `true` | Asks before saving **and** before calling any URL a store typed in | `false` for private, loopback, reserved, link-local and metadata addresses |
| `plugin_route_middleware` | `(array $middleware, string $pluginId, string $group): array` | `[]` | Merges the result into every route group that is not in `web` | Store identification, the store-active check and the disabled-app block |

Filters, not events: the plugin pulls the answer when it needs it, so nothing depends on
provider boot order or on whether a store has been identified yet.

## Licence

### Hide the licence UI

Check the filter **when the UI is built or the action runs**, never at boot:

```php
// Menu item — inside beforeRetrieving, so it is evaluated per request.
DashboardMenu::beforeRetrieving(function (): void {
    if (! apply_filters(PLUGIN_FILTER_LICENSE_UI_ENABLED, true, 'my-plugin')) {
        return;
    }

    DashboardMenu::registerItem([
        'id' => 'cms-plugins-my-plugin-license',
        // ...
    ]);
});
```

```php
// First line of every licence action — the page, activate and deactivate.
abort_unless(apply_filters(PLUGIN_FILTER_LICENSE_UI_ENABLED, true, 'my-plugin'), 404);
```

Keep registering the licence routes unconditionally: routes are registered at boot (before
the store is known) and may be cached. Gate licence routes and menu items to super users;
do not add a separate `<plugin>.license` permission flag, which would show up in every
store's role editor.

### Describe the add-on and its licence

Move the marketplace calls out of the licence controller into a service, then register it:

```php
add_filter(PLUGIN_FILTER_ADDON_REGISTRY, function (array $items): array {
    $license = app(LicenseService::class);

    $items['my-plugin'] = [
        'id' => 'my-plugin',              // the plugin folder name
        'product' => 'vendor/my-plugin',
        'name' => trans('plugins/my-plugin::my-plugin.name'),
        'license' => [
            'status' => fn (): array => $license->status(),
            'activate' => fn (string $purchaseCode): array => $license->activate($purchaseCode),
            'deactivate' => fn (): array => $license->deactivate(),
        ],
    ];

    return $items;
});
```

| Closure | Returns |
|---|---|
| `status()` | `['activated' => bool, 'activated_at' => ?string, 'masked_code' => ?string]` — show the last 4 characters only |
| `activate($code)` | `['error' => bool, 'message' => string]` |
| `deactivate()` | `['error' => bool, 'message' => string]` |

The platform calls these closures only from the operator console, on the central domain,
so they read and write the central settings. A closure that throws shows the licence as
"Unknown" instead of failing the screen; an entry whose `id` is not a plugin folder name (lowercase
letters, digits, hyphens) is ignored; an entry without all three closures is listed with nothing to activate. The
screen reads the version from the plugin's `plugin.json`.

## Scheduled tasks

Declare each task once, as data. The same list feeds Laravel's scheduler on a single site
and `tenancy:schedule` on the platform:

```php
class ScheduledTasks
{
    public static function all(): array
    {
        return [
            ['plugin' => 'my-plugin', 'command' => 'my-plugin:retry', 'frequency' => 'everyFiveMinutes', 'without_overlapping' => true],
            ['plugin' => 'my-plugin', 'command' => 'my-plugin:purge', 'frequency' => 'daily', 'at' => '03:00'],
            [
                'plugin' => 'my-plugin',
                'command' => 'my-plugin:poll',
                'frequency' => 'everyFifteenMinutes',
                // Read inside the store at run time — never at boot.
                'when' => fn (): bool => (bool) setting('my_plugin_polling', true),
            ],
        ];
    }
}
```

| Key | Required | Values |
|---|---|---|
| `plugin` | yes | the plugin's folder name |
| `command` | yes | an Artisan command name (not a class, not a closure) |
| `frequency` | yes | `everyMinute`, `everyTwoMinutes`, `everyFiveMinutes`, `everyFifteenMinutes`, `hourly`, `daily`, `weekly` |
| `at` | no | `'HH:MM'` for `daily` / `weekly` |
| `day` | no | ISO weekday for `weekly`, `1` = Monday … `7` = Sunday |
| `when` | no | closure returning `bool`, evaluated at run time inside the store |
| `without_overlapping` | no | `bool` |

Register the list for both paths from the service provider:

```php
add_filter(PLUGIN_FILTER_SCHEDULE_TASKS, fn (array $tasks): array => [...$tasks, ...ScheduledTasks::all()]);

$this->app->booted(function (): void {
    if (! apply_filters(PLUGIN_FILTER_NATIVE_SCHEDULE_ENABLED, true, 'my-plugin')) {
        return;
    }

    $schedule = $this->app->make(Schedule::class);

    foreach (ScheduledTasks::all() as $task) {
        $event = $schedule->command($task['command']);

        match ($task['frequency']) {
            'daily' => $event->dailyAt($task['at'] ?? '00:00'),
            // Laravel counts Sunday as 0; the contract uses ISO 7.
            'weekly' => $event->weeklyOn(($task['day'] ?? 1) % 7, $task['at'] ?? '00:00'),
            default => $event->{$task['frequency']}(),
        };

        if (isset($task['when'])) {
            $event->when($task['when']);
        }

        if (! empty($task['without_overlapping'])) {
            $event->withoutOverlapping();
        }
    }
});
```

On the platform a task runs only in stores that have the add-on switched on, and never
more often than every five minutes (`everyMinute` and `everyTwoMinutes` run every five
minutes). `without_overlapping` takes a one-hour per-store lock. A task that throws is
logged and reported, and does not stop other tasks or stores; malformed entries are dropped. Every
command must be safe to run once per store: idempotent, chunked, and free of central-only
assumptions. A task that assumes a one-minute cadence (a heartbeat and its "stale"
threshold) must make that threshold filterable.

Which `tenancy:schedule` cron line runs each frequency, and why a task only runs if that line
exists: see [Add-ons → Scheduled tasks](./addons-overview.md#scheduled-tasks).

## Outbound URLs

Any URL a store owner types in — a webhook, a custom HTTP endpoint — can point the
platform's servers at their own private network. Ask before saving it and again before
every call (DNS can change in between):

```php
if (! apply_filters(PLUGIN_FILTER_OUTBOUND_URL_ALLOWED, true, $url, 'my-plugin')) {
    // On save: a validation error. On send: skip the call and log it.
}
```

The platform checks the host only; scheme rules stay the add-on's call. A hostname that does
not resolve is allowed (the call fails anyway), and `TENANCY_WEBHOOKS_ALLOW_PRIVATE_HOSTS=true`
turns the check off for local development.

**Never follow redirects** on a request to a store-entered URL. Laravel's HTTP client
follows redirects by default, so a public URL that answers
`302 Location: http://169.254.169.254/...` walks straight past the check above. Use
`Http::withoutRedirecting()`, or re-run the filter on every hop.

## Routes outside the `web` group

Every route group the add-on registers outside `web` must merge the filter, or it reads
and writes the central database on a store's domain. Keep the group's own middleware and
spread the filter's answer after it:

```php
Route::middleware([
    'throttle:120,1', // whatever the group already had
    ...apply_filters(PLUGIN_FILTER_ROUTE_MIDDLEWARE, [], 'my-plugin', 'webhooks'),
])
    ->prefix('my-plugin/webhooks')
    ->group(function (): void {
        // ...
    });
```

`$group` is a short label (`webhooks`, `embed-api`, `api`). The platform's answer does not
depend on the request, so this is safe under `route:cache`. On a single-site install the
filter returns `[]` and nothing changes.

## Rules

Beyond the hooks, an add-on is platform-ready when:

- **No settings or database reads in `register()`, `boot()` or route files.** Read inside
  the hook callback, middleware, controller or job that needs the value. Route paths built
  from a setting must be switchable to a fixed path by a plugin filter.
- **No store data in singletons.** Read API keys, prefixes and driver lists per call, or
  memoise them per database connection. Never call a static SDK setter such as
  `Stripe::setApiKey()`; build a client per call.
- **Queued work carries ids, not the request.** `auth()->user()` and `request()` are empty
  in a job. Document any named queue — the platform owner has to add it to the worker.
- **No explicit cookie domain.** The platform keeps cookies host-only so a cookie set by
  one store is never sent to another.
- **No files outside `storage_path()`** (per store) unless the file is deliberately shared,
  and then its location is a filter the platform answers.
- **Migrations are guarded** (`hasTable` / `hasColumn`), and `Plugin::remove()` drops every
  table and column the plugin created. Never `cache()->flush()`.

## Plugin-specific filters

Where a platform-wide value must override a store setting, the add-on exposes its own filter.
Current list:

| Plugin | Filter | Default | Platform answer |
|---|---|---|---|
| POS Pro | `pos_pro_stripe_terminal_env_fallback` | `true` | `false` - no shared `.env` Stripe keys |
| POS Pro | `pos_pro_local_device_enabled` | `true` | `false` - the server cannot reach a shop's LAN |
| Loyalty Points | `loyalty_points_custom_page_slug_enabled` | `true` | `false` - fixed customer page slug |
| Live Chat | `live_chat_geoip_database_path` | plugin storage path | `storage/app/geoip/GeoLite2-City.mmdb` in central storage, one file for all stores |
| Live Chat | `live_chat_poll_interval` | store setting | never below 5000 ms |
| SMS Gateways | `sms_heartbeat_stale_after_seconds` | `['warn' => 120, 'fail' => 600]` | `['warn' => 660, 'fail' => 1800]` - fits the five-minute cadence |

## Examples

POS Pro, Affiliate Pro, E-Wallet, Loyalty Points, Live Chat and SMS Gateways implement
this contract — see [Add-ons](./addons-overview.md).
