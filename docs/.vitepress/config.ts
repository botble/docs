import { defineConfig, type DefaultTheme } from 'vitepress'
import { readdirSync, statSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { PRODUCT_LABELS, PINNED_PRODUCTS } from './product-labels'

const __dirname = dirname(fileURLToPath(import.meta.url))
const docsRoot = join(__dirname, '..')

const toTitle = (slug: string): string =>
  slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

type Product = { slug: string; label: string; sidebar: DefaultTheme.SidebarItem[] }

const productSlugs = readdirSync(docsRoot).filter(name => {
  const dir = join(docsRoot, name)
  return statSync(dir).isDirectory() && existsSync(join(dir, 'sidebar.ts'))
})

const allProducts: Product[] = await Promise.all(
  productSlugs.map(async slug => {
    const mod = await import(`../${slug}/sidebar.ts`)
    return {
      slug,
      label: PRODUCT_LABELS[slug] ?? toTitle(slug),
      sidebar: mod.default as DefaultTheme.SidebarItem[],
    }
  })
)

const pinned = PINNED_PRODUCTS
  .map(slug => allProducts.find(p => p.slug === slug))
  .filter((p): p is Product => Boolean(p))

const rest = allProducts
  .filter(p => !PINNED_PRODUCTS.includes(p.slug))
  .sort((a, b) => a.label.localeCompare(b.label))

const products = [...pinned, ...rest]

const sidebar = Object.fromEntries(products.map(p => [p.slug, p.sidebar]))

const nav: DefaultTheme.NavItem[] = [
  { text: 'Home', link: '/' },
  {
    text: 'Documentation',
    items: products.map(p => ({ text: p.label, link: `/${p.slug}/` })),
  },
  { text: 'Support', link: 'https://botble.ticksy.com' },
  { text: 'Our Products', link: 'https://codecanyon.net/user/botble/portfolio' },
  { text: 'Contact', link: 'https://botble.com/contact' },
]

export default defineConfig({
  title: 'Botble Documentation',
  description: "Documentation for all Botble's products",
  sitemap: { hostname: 'https://docs.botble.com' },
  vite: {
    build: { chunkSizeWarningLimit: 1500 },
  },
  markdown: {
    languageAlias: { env: 'bash' },
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-icon-180x180.png' }],
    ['link', { rel: 'manifest', href: '/favicon/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
  ],
  lastUpdated: false,
  themeConfig: {
    logo: 'logo.png',
    siteTitle: false,
    editLink: {
      pattern: ({ filePath }) => `https://github.com/botble/docs/edit/master/docs/${filePath}`,
    },
    nav,
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/botble' }],
    footer: {
      copyright: `Built with Laravel and developed by Botble Technologies © ${new Date().getFullYear()}.`,
    },
  },
})
