# Logo customization

Orisa supports four logo variants and four size controls — all configured from the admin panel without
custom CSS.

## Logo variants

### Primary logo

The main logo shown in the header on light backgrounds and on the homepage hero.

`Admin` -> `Settings` -> `General` -> upload to the **Logo** field.

### Dark-coloured logo (offcanvas / search panels)

Used on light surfaces inside the offcanvas drawer and the search overlay. Falls back to the primary logo
if not set.

`Appearance` -> `Theme Options` -> upload to the **Logo (dark variant)** field.

### Dark-mode logo

A light/white-coloured variant of your logo, swapped in automatically when the visitor enables dark mode.
Without this, a dark-coloured primary logo loses contrast on the dark header background.

`Appearance` -> `Theme Options` -> upload to the **Logo (dark mode)** field.

::: tip
Recolour your logo to white (or near-white) in any image editor (Figma, Photoshop, Canva, GIMP) before
uploading — the theme does **not** invert colours automatically.
:::

### Favicon

`Admin` -> `Settings` -> `General` -> upload to the **Favicon** field. Recommended size: **32 × 32 px** ICO or PNG.

## Logo size controls

`Appearance` -> `Theme Options` -> `Header` provides four numeric fields. All are optional — leave empty
to use the theme default.

| Field | What it controls |
|---|---|
| **Logo height on desktop (px)** | Height for screens ≥ 1200 px |
| **Logo height on tablet (px)** | Height for screens 768–1199 px (inherits desktop if empty) |
| **Logo height on mobile (px)** | Height for screens < 768 px (inherits tablet/desktop if empty) |
| **Logo max width (px)** | Caps the image width — useful for very wide horizontal logos |

### Recommended values

For a typical horizontal wordmark logo:

- **Desktop**: 50–70 px
- **Tablet**: 40–50 px
- **Mobile**: 32–40 px
- **Max width**: 200–240 px

For a square / icon-only logo:

- **Desktop**: 40–48 px
- **Tablet**: 36–42 px
- **Mobile**: 32–36 px
- **Max width**: leave empty

## Removing legacy custom CSS

If you previously sized the logo via `Appearance` -> `Custom CSS` (e.g. a rule like
`.at-header-logo img { height: 70px !important; }`), **remove that rule first**. The new fields generate
the same CSS for you, and a leftover hand-written rule fights the generated one.

## After saving

Clear the cache and hard-refresh:

`Admin` -> `Platform Administration` -> `Cache Management` -> `Clear all caches`, then `Ctrl+Shift+R`.
