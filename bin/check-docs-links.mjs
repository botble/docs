#!/usr/bin/env node
/**
 * Docs link checker for defects VitePress does NOT catch on its own.
 *
 * VitePress validates markdown links inside page content, but it never checks:
 *   1. sidebar.ts `link:` targets   -> nav entries can 404 while the build stays green
 *   2. sidebar links crossing into another product's namespace
 *   3. local image / asset references
 *   4. in-page anchors (#fragment)  -> verified against real `id="..."` in built HTML
 *
 * Usage:
 *   node bin/check-docs-links.mjs            # checks 1-3 (no build needed)
 *   node bin/check-docs-links.mjs --anchors  # also checks 4 (needs `npm run docs:build` first)
 *
 * Exits non-zero when any defect is found, so it can gate CI.
 */
import { readdirSync, statSync, existsSync, readFileSync } from 'node:fs'
import { join, dirname, resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs')
const DIST = join(ROOT, '.vitepress', 'dist')
const checkAnchors = process.argv.includes('--anchors')

const mdFiles = []
;(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) {
      if (name !== '.vitepress') walk(path)
    } else if (name.endsWith('.md')) {
      mdFiles.push(path)
    }
  }
})(ROOT)

// Fenced blocks and inline code hold Blade/JSX snippets that look like links but aren't.
const stripCode = (src) =>
  src.replace(/```[\s\S]*?```/g, '').replace(/~~~[\s\S]*?~~~/g, '').replace(/`[^`\n]*`/g, '')

const problems = []
const report = (kind, detail) => problems.push({ kind, detail })

// --- 1 & 2: sidebar link targets ------------------------------------------------
const products = readdirSync(ROOT).filter(
  (name) => statSync(join(ROOT, name)).isDirectory() && existsSync(join(ROOT, name, 'sidebar.ts'))
)

for (const product of products) {
  const sidebar = readFileSync(join(ROOT, product, 'sidebar.ts'), 'utf8')
  for (const match of sidebar.matchAll(/link:\s*['"`]([^'"`]+)['"`]/g)) {
    const link = match[1]
    if (/^https?:/.test(link)) continue

    const path = link.split('#')[0]
    const base = path.startsWith('/') ? join(ROOT, path) : resolve(ROOT, product, path)
    const target = path.endsWith('/') ? join(base, 'index.md') : `${base}.md`

    if (!existsSync(target)) {
      report('sidebar-404', `${product}/sidebar.ts -> ${link}`)
    } else if (!link.startsWith(`/${product}/`)) {
      report('sidebar-cross-product', `${product}/sidebar.ts -> ${link}`)
    }
  }
}

// --- 3: local asset references --------------------------------------------------
for (const file of mdFiles) {
  const src = stripCode(readFileSync(file, 'utf8'))
  const rel = relative(ROOT, file)
  const refs = [
    ...src.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g),
    ...src.matchAll(/<(?:img|source|video)[^>]*?\ssrc=["']([^"']+)["']/gi),
  ]
  for (const match of refs) {
    let url = match[1]
    if (/^(https?:)?\/\//.test(url) || url.startsWith('data:')) continue
    url = url.split('#')[0].split('?')[0]
    if (!url) continue
    const target = url.startsWith('/') ? join(ROOT, url) : resolve(dirname(file), url)
    if (!existsSync(target)) report('missing-asset', `${rel} -> ${match[1]}`)
  }
}

// --- 4: anchors, verified against ids in the built HTML -------------------------
if (checkAnchors) {
  if (!existsSync(DIST)) {
    console.error('--anchors needs a build first: npm run docs:build')
    process.exit(2)
  }

  // Re-deriving VitePress slugs by hand is unreliable (em dashes, `&`, leading
  // digits all behave unexpectedly), so read the ids VitePress actually emitted.
  const idCache = new Map()
  const idsFor = (rel) => {
    if (!idCache.has(rel)) {
      const html = join(DIST, rel.replace(/\.md$/, '.html'))
      idCache.set(
        rel,
        existsSync(html)
          ? new Set([...readFileSync(html, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))
          : null
      )
    }
    return idCache.get(rel)
  }

  for (const file of mdFiles) {
    const rel = relative(ROOT, file)
    const src = stripCode(readFileSync(file, 'utf8'))
    for (const match of src.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
      const url = match[1]
      if (/^(https?:|mailto:|data:)/.test(url) || !url.includes('#')) continue
      const [path, anchor] = url.split('#')
      if (!anchor) continue

      let target = rel
      if (path) {
        let file2 = path.startsWith('/') ? join(ROOT, path) : resolve(dirname(file), path)
        if (path.endsWith('/')) file2 = join(file2, 'index.md')
        else if (!file2.endsWith('.md')) file2 += '.md'
        if (!existsSync(file2)) continue // page-level breakage is VitePress's job
        target = relative(ROOT, file2)
      }

      const ids = idsFor(target)
      if (ids && !ids.has(decodeURIComponent(anchor))) {
        report('broken-anchor', `${rel} -> ${url}`)
      }
    }
  }
}

// --- output ---------------------------------------------------------------------
const LABELS = {
  'sidebar-404': 'Sidebar links pointing at a page that does not exist',
  'sidebar-cross-product': 'Sidebar links leaving their own product namespace',
  'missing-asset': 'Image/asset references with no file on disk',
  'broken-anchor': 'Anchors with no matching id in the built HTML',
}

for (const [kind, label] of Object.entries(LABELS)) {
  const hits = problems.filter((p) => p.kind === kind)
  if (kind === 'broken-anchor' && !checkAnchors) continue
  console.log(`\n${label}: ${hits.length}`)
  for (const hit of hits) console.log(`  ${hit.detail}`)
}

console.log(
  `\n${problems.length} problem(s) across ${mdFiles.length} pages and ${products.length} sidebars.`
)
if (!checkAnchors) console.log('Tip: run with --anchors after a build to also check #fragments.')

process.exit(problems.length ? 1 : 0)
