# Asset Compilation (Vite)

Botble CMS compiles plugin and theme assets through **[Vite](https://vite.dev)**. The build pipeline replaces the legacy Laravel Mix setup — it is faster, has no security advisories, and ships zero webpack in the dependency tree.

This guide explains how to ship JS/SCSS assets from your own plugins, themes, and packages so they plug into the pipeline automatically.

## TL;DR

- Each project has one **runner**: `vite-build.mjs` at the repo root. You never edit it.
- Each **module** (plugin, package, theme) ships one **descriptor**: `vite.build.mjs` inside the module directory. You edit this when your module's asset list changes.
- The runner discovers every descriptor via `platform/*/*/vite.build.mjs` and builds them all in parallel.
- Run `npm run production` (or `npm run dev`) from the project root.

```text
<project-root>/
├── vite-build.mjs                                    # shared runner — don't touch
├── package.json                                      # devDeps + scripts
└── platform/
    ├── core/<module>/vite.build.mjs                  # descriptor per module
    ├── packages/<module>/vite.build.mjs
    ├── plugins/<module>/vite.build.mjs               # your plugin's descriptor lives here
    └── themes/<theme>/vite.build.mjs                 # your theme's descriptor lives here
```

## Descriptor Anatomy

Every `vite.build.mjs` is a **data-only** ES module that exports a single object. No imports, no runtime code — just your module's build surface.

```js
// platform/plugins/<your-plugin>/vite.build.mjs
export default {
    js: [...],            // JS entries
    sass: [...],          // SCSS entries
    combine: {...},       // legacy file concatenation (rare)
    vendor: [...],        // node_modules → dist file copies (rare)
    vue: true,            // opt-in when you import .vue SFCs
}
```

All keys are optional. A SCSS-only plugin just sets `sass`. A JS-only plugin just sets `js`.

### `js` — JavaScript entries

Each entry becomes its own self-contained IIFE bundle. Rollup never shares chunks between entries, so your files load standalone from `<script>` tags in Blade.

Two forms:

```js
// Short form — a bare string resolves to `resources/js/<name>.js` → dist/js/<name>.js
js: ['admin', 'frontend', 'settings']

// Explicit form — when your source layout or output path is non-standard
js: [
    // Nested output path (ships under dist/js/dashboard/script.js)
    { src: 'resources/js/dashboard/script.js', out: 'dashboard/script.js' },
    // Non-standard source folder (common in themes: assets/ instead of resources/)
    { src: 'assets/js/main.js', out: 'main.js' },
]
```

**Default behaviour**: if your source is `resources/js/front/checkout.js` and you use the string form, Vite writes `dist/js/checkout.js` (basename). Pass the explicit form if you want nested output.

Each entry **must be self-contained**: it is compiled on its own, so sharing imports between entries does not deduplicate. Put shared code in a separate file that each entry imports.

### `sass` — Stylesheet entries

Each entry is compiled with Dart Sass, piped through PostCSS (autoprefixer + cssnano in production), and written to `dist/css/`.

```js
sass: [
    { src: 'resources/sass/admin.scss', out: 'admin.css' },
    // Nested output is supported — useful when the plugin ships multiple CSS files in subdirs
    { src: 'resources/sass/dashboard/style.scss', out: 'dashboard/style.css' },
    // RTL variant generated via rtlcss post-processing
    { src: 'resources/sass/theme.scss', out: 'theme.css', rtl: 'theme.rtl.css' },
]
```

The optional `rtl` key generates a sibling `.rtl.css` automatically by running the compiled CSS through [`rtlcss`](https://github.com/MohammadYounes/rtlcss). The RTL file ends up in the same directory as its LTR counterpart.

### `vue` — Vue 3 SFC support

Set this to `true` if any of your JS entries imports a `.vue` Single File Component.

```js
export default {
    vue: true,
    js: ['admin-panel'],  // admin-panel.js does `import Dashboard from './components/Dashboard.vue'`
}
```

When `vue: true` is set, the runner:
- Enables `@vitejs/plugin-vue` so `.vue` files compile
- Externalizes `vue` as `window.Vue` — the Vue runtime is **not** bundled into your JS (it is loaded globally from `vue.global.min.js`)
- **Inlines** SFC `<style scoped>` blocks into the JS bundle as a runtime `document.createElement('style')` injection, matching the legacy Laravel Mix behaviour — no separate CSS file needs to be loaded

If you forget `vue: true` while importing a `.vue` file, the build fails with a clear error.

### `combine` — Legacy file concatenation

For shipping legacy jQuery plugins that mutate window globals and cannot be imported as ES modules. Concatenates the listed files and (in production) minifies with esbuild.

```js
combine: {
    srcs: [
        'resources/js/jquery-validation/jquery.validate.js',
        'resources/js/helpers.js',
        'resources/js/validations.js',
    ],
    out: 'js/my-plugin-bundle.js',
}
```

You almost certainly don't need this. Use `js` entries unless you're porting a `mix.combine([...])` call from an old webpack.mix.js.

### `vendor` — Ship files from node_modules

Copies files verbatim from `node_modules/` into your `dist/`. Used by `core/base` to ship `jquery.min.js` and `vue.global.min.js`.

```js
vendor: [
    { from: 'some-pkg/dist/some-pkg.min.js', to: 'libraries/some-pkg.min.js' },
]
```

Extremely rare for ordinary plugins. Ignore unless you have a specific reason.

## Common Recipes

### Plugin with JS + SCSS

```js
// platform/plugins/my-plugin/vite.build.mjs
export default {
    js: ['my-plugin'],
    sass: [{ src: 'resources/sass/my-plugin.scss', out: 'my-plugin.css' }],
}
```

### Plugin with multiple entries

```js
export default {
    js: ['admin', 'frontend', 'settings'],
    sass: [
        { src: 'resources/sass/admin.scss',    out: 'admin.css' },
        { src: 'resources/sass/frontend.scss', out: 'frontend.css' },
    ],
}
```

### Plugin with a Vue SFC

```js
export default {
    vue: true,
    js: ['dashboard'],   // dashboard.js imports ./components/Dashboard.vue
}
```

### Theme (assets/ layout)

Most themes ship sources under `assets/` instead of `resources/`. Use the explicit entry form so the runner knows the real source path:

```js
// platform/themes/my-theme/vite.build.mjs
export default {
    js:   [{ src: 'assets/js/theme.js',       out: 'theme.js' }],
    sass: [{ src: 'assets/sass/style.scss',   out: 'style.css' }],
}
```

### SCSS-only plugin

```js
export default {
    sass: [{ src: 'resources/sass/style.scss', out: 'style.css' }],
}
```

## How Output Paths Are Derived

The runner writes to two places:

1. **Project-wide `public/`** — where Laravel serves assets from:
    - `platform/plugins/<name>/...` → `public/vendor/core/plugins/<name>/`
    - `platform/packages/<name>/...` → `public/vendor/core/packages/<name>/`
    - `platform/core/<name>/...` → `public/vendor/core/core/<name>/`
    - `platform/themes/<name>/...` → `public/themes/<name>/`
2. **Module-local `public/`** — the `public/` folder inside your module, so compiled assets ship with the plugin zip (Envato packaging contract):
    - `platform/plugins/<name>/public/js/<file>.js`
    - `platform/plugins/<name>/public/css/<file>.css`

The second mirror happens **only in production builds** (`NODE_ENV=production`). Development builds skip the mirror to keep iteration fast.

Your Blade templates reference assets by path under `public/`:

```blade
<link rel="stylesheet" href="{{ asset('vendor/core/plugins/my-plugin/css/my-plugin.css') }}">
<script src="{{ asset('vendor/core/plugins/my-plugin/js/my-plugin.js') }}"></script>
```

These URLs **do not change** from the Laravel Mix era — migrating is transparent to Blade.

## Running Builds

```bash
# Development build — unminified, with source maps
npm run dev

# Production build — minified, with plugin-public mirror
npm run production
```

Both commands discover every descriptor and build all modules in parallel. Expect a full build to take around 3–5 seconds wall clock on modern hardware.

There is **no watch mode and no dev server**. Botble admin pages are rendered server-side by Blade, so Vite's dev server is unnecessary — `npm run dev` produces files that can be served directly.

## Migrating From Laravel Mix

If your plugin/theme currently ships a `webpack.mix.js`, here is the mechanical conversion:

### Step 1 — Replace `webpack.mix.js` with `vite.build.mjs`

```js
// BEFORE: webpack.mix.js
const mix = require('laravel-mix')
const path = require('path')

const directory = path.basename(path.resolve(__dirname))
const source = `platform/plugins/${directory}`
const dist = `public/vendor/core/plugins/${directory}`

mix
    .js(`${source}/resources/js/my-plugin.js`, `${dist}/js`)
    .sass(`${source}/resources/sass/my-plugin.scss`, `${dist}/css`)

if (mix.inProduction()) {
    mix
        .copy(`${dist}/js/my-plugin.js`, `${source}/public/js`)
        .copy(`${dist}/css/my-plugin.css`, `${source}/public/css`)
}
```

```js
// AFTER: vite.build.mjs
export default {
    js: ['my-plugin'],
    sass: [{ src: 'resources/sass/my-plugin.scss', out: 'my-plugin.css' }],
}
```

The entire `source` + `dist` + `inProduction` ceremony is gone. The runner handles dist path derivation and plugin-public mirroring uniformly for every module.

### Step 2 — Delete the old `webpack.mix.js`

```bash
rm platform/plugins/your-plugin/webpack.mix.js
```

### Step 3 — Build

```bash
npm run production
```

### Mix pattern → Vite descriptor cheat sheet

| Laravel Mix | Vite descriptor |
|---|---|
| `.js(src, dst/js)` | `js: ['name']` or `js: [{ src, out }]` |
| `.sass(src, dst/css)` | `sass: [{ src, out }]` |
| `.vue()` | `vue: true` |
| `.postCss(dst/x.css, dst/x.rtl.css, [require('rtlcss')])` | `sass: [{ src, out, rtl: 'x.rtl.css' }]` |
| `.combine([...], dst/bundle.js)` | `combine: { srcs: [...], out: 'js/bundle.js' }` |
| `.copy('node_modules/X', dst/lib/X)` | `vendor: [{ from: 'X', to: 'lib/X' }]` |
| Production `.copy(dist/X, source/public/X)` | **automatic** — runner mirrors all descriptor outputs to plugin-public in production |
| Looped `scripts.forEach(s => mix.js(...))` | Flatten into the `js` array |
| `externals: { vue: 'Vue' }` | Implicit when `vue: true` |
| `mix.webpackConfig({...})` | Not available. Custom Rollup config → talk to the CMS maintainer. |

## Gotchas

### `const X = X || {}` — Temporal Dead Zone

Older Botble source files sometimes use:

```js
// This throws "Cannot access 'X' before initialization"
const Theme = Theme || {}
window.Theme = Theme
```

This worked in Laravel Mix only because Babel transpiled `const` to `var`. Vite preserves `const` at ES2017, so the JS-spec TDZ error surfaces at runtime. Fix:

```js
window.Theme = window.Theme || {}
const Theme = window.Theme
```

Grep your plugin for `const \([A-Z][A-Za-z]*\) = \1 \|\|` and rewrite any hit.

### `require('lodash')` in an ES module

Works, but only because the runner enables `commonjsOptions.transformMixedEsModules`. Prefer `import _ from 'lodash'` in new code — more portable and clearer intent.

### jQuery is a bare global

`$` is provided as `window.$` on every admin page. It is declared external in the runner, so `rollup` will not try to bundle it when your code references it. You do not need to import jQuery.

### Vue is a bare global (with `vue: true`)

When `vue: true` is set, `import ... from 'vue'` compiles to a reference to `window.Vue`. This is how system-update, plugin-management, and other admin panels load Vue components without shipping the 160 KB Vue runtime in every bundle.

Do **not** bundle your own Vue. The `core/base` module copies `vue.global.min.js` into `public/vendor/core/core/base/libraries/`, and admin layouts load it before any plugin JS.

### Code splitting doesn't happen

Rollup's IIFE format used by the runner cannot code-split. Every entry produces exactly one `.js` file. If you have shared helpers between entries, duplicate cost is the trade-off for standalone `<script>`-loadable files.

### No HMR / dev server

Iterate with `npm run dev` in one terminal and refresh your browser manually. A full rebuild is typically under a second.

## Troubleshooting

::: warning Build fails with "Name in package.json is required"
You probably copied a descriptor from an older guide that set `lib.name` manually. Delete the manual `lib:` config — the runner sets it for you. The current descriptor format is **only the keys documented above** (`js`, `sass`, `combine`, `vendor`, `vue`).
:::

::: warning Build succeeds but assets don't load in the browser
Check the URL path. Vite writes to `public/vendor/core/<type>/<name>/...` — the same layout Laravel Mix used. If you recently renamed the module directory, the URL changed.
:::

::: warning Build fails with "Cannot find package 'vite'"
The project's `node_modules` is missing or stale. Run `npm install` from the project root.
:::

::: warning "Cannot access 'X' before initialization" at runtime
Classic Temporal Dead Zone (see Gotchas above). Rewrite `const X = X || {}` to go through `window.X`.
:::

::: warning Vue component doesn't render
Verify:
1. The descriptor sets `vue: true`
2. Your JS entry does `import Component from './Component.vue'`
3. You register the component via `vueApp.booting(app => app.component('name', Component))`
4. `core/base` is installed — it provides the Vue runtime (`vue.global.min.js`)
:::

## Advanced: What the Runner Actually Does

The runner is a single file at the project root (`vite-build.mjs`). It is identical across all Botble projects — you never edit it.

On each run, the runner:

1. Globs `platform/*/*/vite.build.mjs` to discover every module's descriptor
2. For each descriptor, runs these steps in parallel per module:
    - Copies declared vendor files from `node_modules/`
    - Builds every JS entry as an independent Vite lib-mode IIFE bundle
    - Compiles every SCSS entry through Sass → PostCSS (autoprefixer + cssnano) → disk, with optional rtlcss sibling
    - Runs the `combine` concatenation+minify pass if declared
    - In production, mirrors the generated outputs to the module's local `public/` folder
3. Aggregates per-module timings and exits non-zero if any module failed

The file is 500 lines and well-commented — read it if you need to understand the internals.

## Further Reading

- [Child Theme Development](/cms/child-theme-development) — how to ship a child theme with its own assets
- [Theme Assets](/cms/theme-development/theme-assets) — where to put source files in a theme
- [Plugin Development](/cms/plugin-development/) — end-to-end plugin authoring
- [Vite documentation](https://vite.dev/guide/) — for advanced customization scenarios
