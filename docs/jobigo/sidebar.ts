import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/jobigo/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/jobigo/releases' },
      { text: 'Upgrade Guide', link: '/jobigo/upgrade' },
    ],
  },
  {
    text: 'Getting Started',
    items: [
      { text: 'Installation', link: '/jobigo/installation' },
      { text: 'SSL', link: '/jobigo/ssl' },
      { text: 'License', link: '/jobigo/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Setup homepage', link: '/jobigo/usage-homepage' },
      { text: 'Setup logo & favicon', link: '/jobigo/usage-logo-favicon' },
      { text: 'Menu', link: '/jobigo/usage-menu' },
      { text: 'Theme options', link: '/jobigo/usage-theme-options' },
      { text: 'Widgets', link: '/jobigo/usage-widgets' },
      { text: 'Custom CSS/JS', link: '/jobigo/usage-custom-css-js' },
      { text: 'Translation', link: '/jobigo/usage-translation' },
      { text: 'Multi-language', link: '/jobigo/usage-multi-language' },
      { text: 'Google Analytics', link: '/jobigo/usage-analytics' },
      { text: 'Media - Setup Amazon S3', link: '/jobigo/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/jobigo/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/jobigo/usage-media-wasabi' },
      { text: 'Setup email', link: '/jobigo/usage-email' },
      { text: 'Currencies', link: '/jobigo/usage-currencies' },
      { text: 'Setup social login', link: '/jobigo/usage-social-login' },
      { text: 'Setup cronjob', link: '/jobigo/cronjob' },
      { text: 'Newsletter', link: '/jobigo/usage-newsletter' },
    ],
  },
  {
    text: 'Development',
    items: [
      { text: 'Rename theme', link: '/jobigo/theme-rename' },
    ]
  }
] satisfies DefaultTheme.SidebarItem[];
