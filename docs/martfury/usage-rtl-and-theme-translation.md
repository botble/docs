# Right-to-Left and Theme Translation

Martfury supports right-to-left (RTL) languages such as Arabic, and ships translations for the theme's own text.

## Enable RTL

1. Go to `Settings` -> `General` and set **Front site language direction** to **Right to Left**. Save.
2. For each RTL language, go to `Settings` -> `Languages`, edit the language and set **Text direction** to **Right to left**.

When the front site direction is RTL, the theme loads its RTL stylesheet (`css/rtl.css`) on every page.

::: tip
Check the storefront in the RTL language after you save. Custom CSS written for left-to-right layouts may need its own RTL rules. See [Custom CSS/JS](./usage-custom-css-js.md).
:::

## Theme Translations

The theme ships 21 translation files in `platform/themes/martfury/lang/`, one JSON file per locale:

| Locale files |
|--------------|
| `ar`, `cs`, `de`, `en`, `es`, `fr`, `hi`, `id`, `it`, `ja`, `ko`, `nl`, `pl`, `pt`, `pt_BR`, `ru`, `sv`, `th`, `tr`, `vi`, `zh_CN` |

`en.json` is the source of the English text. To change a translated string, edit the matching file. For the translation workflow, see [Translation](./plugin-translation.md) and [Multi-language](./usage-multi-language.md).

## Demo Content Translations

The demo content of the homepage demos (product categories, attributes, pages, menus and theme option values) is translated into Arabic, Vietnamese, French, Indonesian and Turkish.
