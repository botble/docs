import { defineConfig } from 'vitepress'
import cmsSidebar from '../cms/sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Botble Documentation",
  description: "Documentation for all Botble's products",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    editLink: {
      pattern: ({ relativePath }) => {
        const path = relativePath.split('/')

        return `https://github.com/botble/${path[0]}-docs/edit/master/${path[1]}`
      }
    },

    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Documentation',
        items: [
          { text: 'Botble', link: '/cms/' },
          { text: 'HASA', link: '/hasa/' },
          { text: 'Flex Home', link: '/flex-home/' },
          { text: 'LaraMag', link: '/lara-mag/' },
          { text: 'Miranda', link: '/miranda/' },
          { text: 'Shopwise', link: '/shopwise/' },
          { text: 'Martfury', link: '/martfury/' },
          { text: 'Stories', link: '/stories/' },
          { text: 'Wowy', link: '/wowy/' },
          { text: 'Nest', link: '/nest/' },
          { text: 'Farmart', link: '/farmart/' },
          { text: 'Jobcy', link: '/jobcy/' },
          { text: 'JobZilla', link: '/jobzilla/' },
        ],
      },
      { text: 'Support', link: 'https://botble.ticksy.com' },
      { text: 'Our Products', link: 'https://codecanyon.net/user/botble/portfolio' },
      { text: 'Contact', link: 'https://botble.com/contact' },
    ],

    sidebar: {
        '/cms/': cmsSidebar,
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      copyright: `Built with Laravel and developed by Botble Technologies © ${new Date().getFullYear()}.`,
    }
  },
})
