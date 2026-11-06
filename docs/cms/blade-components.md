# Admin Blade Components

The base service provider registers anonymous components under `x-core::*` from `platform/core/base/resources/views/components/`. Use these in admin views loaded with the CMS styles and JavaScript. They provide the same controls used by the built-in forms and screens.

Pass dynamic props with `:prop="$value"`, boolean props with `:required="true"`, and camelCase props in kebab case (`helperText` becomes `helper-text`). Unconsumed attributes are forwarded as described below; they are not all applied to the outer wrapper.

## Buttons and Cards

```blade
<x-core::card>
    <x-core::card.header>
        <x-core::card.title :level="3">Plugin settings</x-core::card.title>
    </x-core::card.header>
    <x-core::card.body>
        <p>Manage your plugin configuration.</p>
        <x-core::button tag="a" :href="url('/admin')" color="primary" icon="ti ti-arrow-left">
            Dashboard
        </x-core::button>
    </x-core::card.body>
</x-core::card>
```

| Component | Props and defaults | Slots and attributes |
| --- | --- | --- |
| `button` | `type='button'`, `tag='button'`, `color=null`, `icon=null`, `iconPosition='left'`, `size=null`; `disabled`, `iconOnly`, `square`, `pill`, `outlined`, `loading`, `loadingOverlay`, `ghost` default to `false`; `tooltip=null`, `tooltipPlacement='top'` | Default slot is the label; attributes go on the button or chosen tag. `size` supports `sm`/`lg`. |
| `card` | `size=null` | Default slot; attributes on the card `<div>`. |
| `card.header`, `card.body`, `card.footer`, `card.actions` | Layout wrappers | Default slot and wrapper attributes. |
| `card.title` | `level=4` | Default slot; attributes on the heading. Levels 1–6 select the heading tag. |
| `card.subtitle` | Subtitle wrapper | Default slot and wrapper attributes. |

A button does not submit a form by default: specify `type="submit"`. For an icon-only button, provide a label or tooltip; a tooltip supplies an accessible name when the slot is empty.

## Forms and Controls

`x-core::form` delegates to `Form::open()` and `Form::close()`. It defaults to POST, includes CSRF for non-GET methods, and adds method spoofing for PUT/PATCH/DELETE. The component passes attributes as Form facade options, including `url`, `route`, `method`, and `files`.

```blade
<x-core::form :url="url()->current()" method="POST">
    <x-core::form.text-input
        name="title"
        label="Title"
        :value="old('title', setting('my_plugin_title'))"
        :required="true"
        helper-text="Shown above the plugin content."
    />
    <x-core::form.select
        name="enabled"
        label="Status"
        :options="['0' => 'Disabled', '1' => 'Enabled']"
        :value="setting('my_plugin_enabled', '0')"
    />
    <x-core::form.error key="enabled" />
    <x-core::button type="submit" color="primary" icon="ti ti-device-floppy">Save</x-core::button>
</x-core::form>
```

Serve this form from your plugin's own GET/POST routes, validate the request, and persist settings in the POST controller; the components only render markup.

| Component | Main props and defaults | Behavior |
| --- | --- | --- |
| `form.text-input` | `type='text'`, `name=null`, `id=null`, `label=null`, `value=old($name)`, `required=false`, `helperText=null`, `errorKey=$name` | Forwards attributes to the input. Shows invalid state and the error message. Supports `prepend`/`append` slots, `inputGroup`, and `inputIcon`. |
| `form.textarea` | `name=null`, `label=null`, `value=old($name)`, `errorKey=$name`, `helperText=null` | Attributes go on the textarea; default slot is fallback content. Shows errors. |
| `form.select` | `name=null`, `options=[]`, `value=null`, `searchable=false`, `required=false`, `helperText=null` | Attributes go on the select. Scalar values use `old($name, $value)`; arrays select matching option keys directly. Default slot supplies options when `options` is empty. Supports `prepend`/`append`. |
| `form.checkbox` | `name=null`, `value=null`, `checked=false`, `label=null`, `inline=false`, `helperText=null` | Uses `old($name, $checked)` for checked state; attributes go on the input. Does not add a hidden unchecked value. |
| `form.label` | Label markup | Can wrap label text through its default slot; use `for` to associate a control. |
| `form.error` | `key=null` | Renders the validation message in `invalid-feedback`; attributes go on that message. |
| `form.helper-text` | Help markup | Default slot for the help text. |
| `form-group` | Field wrapper | Default slot, wrapper attributes, and `default-class` for the wrapper's default classes. |

Text inputs and selects generate an ID when none is supplied. Give repeated controls explicit unique IDs. The select applies an invalid CSS class but does not render an error message itself; add `form.error` as above. Explicit `value` props on text inputs replace their default `old()` value, so use `old('key', $saved)` when passing saved data. Helper text accepts HTML: pass trusted markup.

Additional controls include `form.radio`, `form.radio-list`, `form.toggle`, `form.on-off`, `form.on-off.checkbox`, `form.image`, `form.images`, `form.code-editor`, `form.color-picker`, and `form.color-selector`. Their props are defined in the corresponding component templates; use the [Form Builder](./form-builder-get-started.md) when you need model binding and field option classes.

## Alerts and Modals

```blade
<x-core::alert type="warning" title="Review settings" :dismissible="true">
    Changes affect the public website.
</x-core::alert>

<x-core::button data-bs-toggle="modal" data-bs-target="#plugin-confirm">Open confirmation</x-core::button>
<x-core::modal id="plugin-confirm" title="Confirm changes" :form-action="url()->current()">
    <p>Save the current configuration?</p>
    <x-slot:footer>
        <x-core::button data-bs-dismiss="modal">Cancel</x-core::button>
        <x-core::button type="submit" color="primary">Confirm</x-core::button>
    </x-slot:footer>
</x-core::modal>
```

`alert` defaults to `type='info'`, `title=null`, `dismissible=false`, and `important=false`. It chooses a default icon by type. The default slot is its content; `additional` is an optional slot. Attributes go on the alert container.

`modal` accepts `id`, `title`, `size`, `type`, `formAction`, `formMethod='POST'`, `hasForm=false`, `formAttrs=[]`, `contentAttrs=[]`, and `bodyAttrs=[]`. `blur`, `closeButton`, and `centered` default to `true`; `scrollable` defaults to `false`. Attributes go on the outer modal. The default slot is the body and `footer` is a named slot.

Setting `form-action` or `has-form` wraps the content in a form and adds CSRF. The modal writes `formMethod` directly; for DELETE/PUT/PATCH use POST plus `@method('DELETE')` (or the required method) inside the slot. It does not automatically add a method-spoofing input. Explicit footer submit buttons work without custom JavaScript; the optional `buttonId`/`buttonLabel` generated action button defaults to `type="button"`.

## Dropdowns and Tabs

```blade
<x-core::dropdown label="Actions" position="end">
    <x-core::dropdown.item :href="url('/admin')" icon="ti ti-home">Dashboard</x-core::dropdown.item>
    <x-core::dropdown.item type="button">Custom action</x-core::dropdown.item>
</x-core::dropdown>

<x-core::tab>
    <x-core::tab.item id="plugin-general" label="General" :is-active="true" />
    <x-core::tab.item id="plugin-help" label="Help" />
</x-core::tab>
<x-core::tab.content>
    <x-core::tab.pane id="plugin-general" :is-active="true">General settings</x-core::tab.pane>
    <x-core::tab.pane id="plugin-help">Help content</x-core::tab.pane>
</x-core::tab.content>
```

`dropdown` requires `label` and accepts `icon`, `position`, `wrapperClass`, `hasArrow=false`, and `trigger`. An `items` slot overrides the default menu-content slot; a `trigger` slot replaces the trigger button. Attributes go on the default trigger button. `dropdown.item` uses an anchor when `href` is set, otherwise a button; its props include `label`, `icon`, `active=false`, and `iconPlacement='left'`.

`tab.item` requires `id`, accepts `label`, `icon`, and `isActive=false`, and renders the tab link. `tab.pane` uses the matching `id` and `isActive` for the content pane. Put tab text in `label`; the item does not render a default slot. Bootstrap's admin JavaScript handles switching tabs and opening dropdowns/modals.

## Tables, Empty States, and Loading

```blade
<x-core::table :striped="true" :hover="true">
    <x-core::table.header>
        <x-core::table.header.cell>Name</x-core::table.header.cell>
    </x-core::table.header>
    <x-core::table.body>
        <x-core::table.body.row>
            <x-core::table.body.cell>Example</x-core::table.body.cell>
        </x-core::table.body.row>
    </x-core::table.body>
</x-core::table>

<x-core::empty-state title="No results" subtitle="Try another search.">
    <x-slot:action>
        <x-core::button tag="a" :href="url()->current()">Reset</x-core::button>
    </x-slot:action>
</x-core::empty-state>
<x-core::loading aria-label="Loading results" />
```

`table` defaults to `nowrap=false`, `hover=true`, `striped=true`, forwards attributes to `<table>`, and renders its default slot. `table.header`, `table.body`, `table.body.row`, and their `cell` components supply the corresponding markup; `table.header` wraps its cells in a row. Footer counterparts are also available. These are markup components, not the AJAX [Table Builder](./table-builder.md).

`empty-state` accepts `title=null`, `subtitle=null`, `icon='ti ti-ghost'`, and an `action` slot. Its title and subtitle render HTML, so escape user-provided values. `loading` renders a spinner `<div>` and forwards attributes; show or hide it in your own request lifecycle.
