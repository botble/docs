import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/wowy/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/wowy/releases' },
      { text: 'Upgrade Guide', link: '/wowy/upgrade' },
    ],
  },
  {
    text: 'Getting Started',
    items: [
      { text: 'Installation', link: '/wowy/installation' },
      { text: 'SSL', link: '/wowy/ssl' },
      { text: 'License', link: '/wowy/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Setup homepage', link: '/wowy/usage-homepage' },
      { text: 'Menu', link: '/wowy/usage-menu' },
      { text: 'Theme options', link: '/wowy/usage-theme-options' },
      { text: 'Widgets', link: '/wowy/usage-widgets' },
      { text: 'Custom CSS/JS', link: '/wowy/usage-custom-css-js' },
      { text: 'Translation', link: '/wowy/usage-translation' },
      { text: 'Multi-language', link: '/wowy/usage-multi-language' },
      { text: 'Google Analytics', link: '/wowy/usage-analytics' },
      { text: 'Media - Setup Amazon S3', link: '/wowy/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/wowy/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/wowy/usage-media-wasabi' },
      { text: 'Setup email', link: '/wowy/usage-email' },
      { text: 'Newsletter', link: '/wowy/usage-newsletter' },
      { text: 'Currencies', link: '/wowy/usage-currencies' },
      { text: 'Setup social login', link: '/wowy/usage-social-login' },
      { text: 'Location', link: '/wowy/usage-location' },
      { text: 'Invoice template', link: '/wowy/invoice-template' },
      { text: 'Setup cronjob', link: '/wowy/cronjob' },
      { text: 'Newsletter', link: '/wowy/usage-newsletter' },
    ],
  },
  {
    text: 'Development',
    items: [
      { text: 'Rename theme', link: '/wowy/theme-rename' },
    ]
  }
] satisfies DefaultTheme.SidebarItem[]
