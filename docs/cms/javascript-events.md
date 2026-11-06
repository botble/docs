# Admin JavaScript Events

Admin screens can insert forms and widgets through AJAX. Listen for the CMS lifecycle events to initialize custom controls when those elements appear. Native events below are dispatched on `document`; register with `document.addEventListener()`.

## Native Events and Payloads

| Event | When it fires | `event.detail` |
| --- | --- | --- |
| `core-init-resources` | At the end of `Botble.initResources()` | `null` (no payload) |
| `core-editor-init` | Inside the editor manager constructor, before editors are initialized | The editor manager instance, not a DOM element or individual editor |
| `core-insert-media` | A media integration dispatches a custom insertion, including image-picker selection | `{ files, element }`: selected file objects and the triggering jQuery element |
| `core-media-loaded` | When the media integration script has loaded | `null` (no payload) |
| `core-insert-shortcode` | Shortcode insertion when the built-in CKEditor/TinyMCE paths are not used | `{ shortcode }`: the complete shortcode string |
| `core-shortcode-config-loaded` | After shortcode configuration HTML is inserted and resources initialized | `{ shortcode, name, description, update, element }`: key, display name, description, update flag, and the response HTML string |

These events are notifications, not filters: return values do not change the operation. They do not replay for listeners registered later. Load an editor customization script before the editor bundle; a `DOMContentLoaded` listener can be too late for constructor-time events.

## Initialize Controls After AJAX

Make initialization idempotent so repeated resource or widget events do not attach duplicate handlers:

```js
function initPluginControls() {
    document.querySelectorAll('[data-my-plugin-control]').forEach((element) => {
        if (element.dataset.myPluginReady === '1') return
        element.dataset.myPluginReady = '1'

        element.addEventListener('change', () => {
            element.classList.toggle('has-value', element.value !== '')
        })
    })
}

document.addEventListener('core-init-resources', initPluginControls)
document.addEventListener('core-shortcode-config-loaded', initPluginControls)

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPluginControls)
} else {
    initPluginControls()
}
```

Register listeners once in your plugin bundle, rather than each time AJAX content loads. A scan of `document` also covers the shortcode configuration event, whose `element` property is HTML text rather than an element to query.

## Configure Editors

The manager exposes callbacks for configuration and initialization. This example must run before the editor manager is constructed:

```js
document.addEventListener('core-editor-init', ({ detail: editor }) => {
    editor.tinyMceConfigUsing((config) => {
        config.height = 400
        return config
    })
})
```

## Media and Shortcode Insertion

Custom integrations can consume insertion events. The media event's `element` is a jQuery object; file entries include fields such as `url`, `full_url`, and `thumb`, depending on the media response.

```js
document.addEventListener('core-insert-media', ({ detail }) => {
    const { files, element } = detail
    if (!element.is('[data-my-plugin-media]')) return

    console.debug('Plugin media selected', files)
})

document.addEventListener('core-insert-shortcode', ({ detail }) => {
    const input = document.querySelector('[data-my-plugin-shortcode-target]')
    if (!input) return

    input.value += detail.shortcode
    input.dispatchEvent(new Event('change', { bubbles: true }))
})
```

`core-insert-shortcode` is the fallback insertion path; it does not fire for every shortcode inserted through the built-in editors. `core-media-loaded` signals script availability, not a completed upload or media selection.

## Widget Reloads Use jQuery

`widgets:reloaded` is triggered with jQuery after widget changes. It has no custom payload and should use jQuery's event API:

```js
$(document).on('widgets:reloaded', initPluginControls)
```

A native `addEventListener('widgets:reloaded', ...)` does not subscribe to this jQuery-triggered event. Use the same idempotent initializer for both native resource events and widget reloads.
