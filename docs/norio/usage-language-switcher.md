# Language Switcher

How Norio shows the language switcher and handles right-to-left languages. To add languages and translate content, see [Multi-language](./usage-multi-language.md).

## Where the Switcher Appears

Once the site has two or more languages, the language list appears at the top of the **overlay menu**, directly under
the logo row and above the menu links. Every header style (1 to 5) and the bottom navigation open that same overlay, so
visitors can switch language from any page. The active language is highlighted, the links are keyboard reachable, and
each link points to the same page in the target language (translated slugs are followed, for example
`/vi/services/chien-luoc-thuong-hieu` links to `/services/brand-strategy` for English). When a page has no translation, the link follows the Language plugin's "show default item if current version does not exist" setting.

What controls it:

| Where | Setting | Effect |
| --- | --- | --- |
| Settings → Languages → Settings | **Language display** | Flag + name (All), flag only, or name only |
| Settings → Languages → Settings | **Hide languages** | Removes a language from the list without deleting it |
| Settings → Languages → Settings | **Hide default language in URL** | Changes the URL prefix only; the default language stays in the list |
| Appearance → Theme Options → Overlay menu | **Hide language switcher in header** | Turns the list off completely. Off by default |

The list is also hidden automatically when the Language plugin is inactive or only one language exists.

## Right-to-Left (RTL) Languages

Languages flagged **RTL** in **Settings → Languages** (Arabic is seeded as RTL) render with `<html dir="rtl">`. Norio then
loads an extra stylesheet that mirrors the layout, the overlay menu and slide-in animations, flips directional arrows,
removes letter-spacing so Arabic letters stay joined, and keeps counters such as "25+" reading left to right. No
theme option is needed; it follows the language.
