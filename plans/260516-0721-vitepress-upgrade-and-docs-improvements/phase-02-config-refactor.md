# Phase 02 — Auto-discover products in `config.ts`

**Priority:** Medium
**Status:** Done (2026-05-16)
**Risk:** Medium — touches the file every product import flows through.

## Implementation note (2026-05-16)

The plan suggested `import.meta.glob`, but that API is Vite-only and is **not**
available inside `config.ts` (which is loaded by Node via esbuild, not Vite's
transform pipeline). Switched to `fs.readdirSync` + dynamic `import()` with
top-level await — works in ESM, no extra deps.

Final shape: 75-line `config.ts` + 20-line `product-labels.ts` (95 total, down from 206).
11 label overrides for slugs that don't title-case cleanly.

## Why

`docs/.vitepress/config.ts` is 215 lines, ~95% boilerplate:

- 47 hand-written `import xxxSidebar from '../xxx/sidebar'`
- 47 hand-written nav `{ text, link }` entries
- 47 hand-written `sidebar` mapping entries

Adding a new product requires four synchronized edits. Every recent
product (amerce, kyc, sms-gateways, orisa, snapcart, etc.) has had this
overhead. Vite's `import.meta.glob` can enumerate `*/sidebar.ts` and
`*/index.md` at build time, dropping the file to ~80 lines and making
new products zero-touch.

## Approach

Use eager glob import:

```ts
const sidebarModules = import.meta.glob<{ default: DefaultTheme.SidebarItem[] }>(
  '../*/sidebar.ts',
  { eager: true }
)

const indexModules = import.meta.glob<{ default: any }>(
  '../*/index.md',
  { eager: true }
)
```

Then derive both `sidebar` map and `nav` dropdown from the keys:

- Key extraction: `'../amerce/sidebar.ts'` → `'amerce'`
- Display name: read from each product's `index.md` frontmatter `title:` (add it where missing) OR keep a small `productTitles` override map for ones that don't follow the slug-titlecase rule (`bb-form-builder` → `BB Form Builder`, `pos-pro` → `POS Pro`, `kyc` → `KYC Verification`).

## Tasks

### 1. Add display-name override map

Small explicit map for the ~10 products whose display name doesn't slug-titlecase cleanly. All other products derive name from slug → titlecase.

### 2. Replace imports + nav + sidebar with derived structures

```ts
const products = Object.entries(sidebarModules)
  .map(([path, mod]) => {
    const slug = path.match(/\.\.\/([^/]+)\/sidebar\.ts$/)![1]
    return { slug, sidebar: mod.default, label: PRODUCT_LABELS[slug] ?? toTitle(slug) }
  })
  .sort((a, b) => a.label.localeCompare(b.label))

const nav = [
  { text: 'Home', link: '/' },
  {
    text: 'Documentation',
    items: products.map(p => ({ text: p.label, link: `/${p.slug}/` })),
  },
  // ...static items
]

const sidebar = Object.fromEntries(products.map(p => [p.slug, p.sidebar]))
```

### 3. Verify generated structure matches current config

Build a small diff script:

```bash
node -e "import('./.vitepress/config.ts').then(c => console.log(Object.keys(c.default.themeConfig.sidebar).sort().join('\n')))"
```

Compare with the current 47 keys list.

### 4. Decide on alphabetical vs curated nav order

Current order is roughly chronological-by-add (Amerce last, CMS first).
Alphabetical is more discoverable at 48 items. Recommend alphabetical
with **CMS pinned first** as a special case.

## Files

| File | Change |
|---|---|
| `docs/.vitepress/config.ts` | refactor: 215 → ~80 lines |
| `docs/.vitepress/product-labels.ts` | new — small override map |

## Validation

```bash
pnpm run docs:build
pnpm run docs:dev
```

Then:

- Inspect generated nav dropdown: 48 items present, alphabetical, CMS first.
- Click 5+ random products from nav — sidebar must load.
- Compare built `dist/index.html` byte-size before/after — should be identical or smaller.

## Risks

- `import.meta.glob` with `eager: true` works in VitePress (Vite-native), but the order of resolution differs from hand-listing — must explicitly sort.
- New products that ship without `sidebar.ts` would silently disappear from nav. Mitigate with a build-time assertion: `console.warn` if any directory under `docs/` has `index.md` but no `sidebar.ts`.
- Display names need a fallback rule that isn't ugly for slugs like `bb-form-builder`, `pos-pro`, `kyc`.

## Done when

- Adding a new product = drop directory with `index.md` + `sidebar.ts`. No `config.ts` edit required.
- All 47 existing products still render correctly.
- `config.ts` < 100 lines.
