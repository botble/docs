# Offcanvas menu (side panel)

The offcanvas menu is the side panel that slides in when visitors click the hamburger / menu icon in the
header. It contains a greeting, contact details, an optional gallery, and your social links.

![Offcanvas drawer](./images/usage-offcanvas-menu.png)

## Where to edit

In admin panel, go to `Appearance` -> `Theme Options` -> `Offcanvas menu`.

All fields are optional — empty fields are skipped at render time, and empty sections disappear entirely.

## Fields

### Description (Howdy! intro)

Short paragraph shown under the **Howdy!** heading. Use it for a one-line tagline or company motto.

The **Howdy!** title itself is a translatable string — to change it, override `Howdy!` in your translation
file or via `lang/en.json`.

### Phone

Visitor-facing phone number. Rendered as a `tel:` link so mobile devices can dial directly.

### Email

Visitor-facing email address. Rendered as a `mailto:` link.

### Address

Free-form address. HTML is allowed (use `<br>` for line breaks).

### Gallery image 1 – Gallery image 5

Up to 5 small thumbnail images displayed in a horizontal row. Common uses:

- Recent project covers
- Team avatars
- Client logos
- Behind-the-scenes photos

Leave any slot empty to hide that thumbnail. If all 5 slots are empty, the entire gallery row is hidden.

::: tip
Recommended thumbnail size: **120 × 120 px**, square. The theme renders them with `object-fit: cover`,
so off-square images get cropped — supply pre-cropped squares for the cleanest look.
:::

## Follow Us (social links)

The **Follow Us** section in the offcanvas drawer reads from a different setting:
`Appearance` -> `Theme Options` -> `Social links`.

Each social link has three properties:

- **Name** — displayed text (e.g. "Instagram")
- **Icon** — Tabler icon class (e.g. `ti-brand-instagram`)
- **URL** — the full link (e.g. `https://instagram.com/yourhandle`)

Click **Add** to append more platforms (TikTok, YouTube, Threads, etc.). Empty URLs are skipped.

## After saving

After any change, clear the cache so the side panel reflects the latest values:

`Admin` -> `Platform Administration` -> `Cache Management` -> `Clear all caches`.

Then hard-refresh your browser (`Ctrl+Shift+R` on Windows/Linux, `Cmd+Shift+R` on macOS).
