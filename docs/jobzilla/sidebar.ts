import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/jobzilla/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/jobzilla/releases' },
      { text: 'Upgrade Guide', link: '/jobzilla/upgrade' },
    ],
  },
  {
    text: 'Getting Started',
    items: [
      { text: 'Installation', link: '/jobzilla/installation' },
      { text: 'SSL', link: '/jobzilla/ssl' },
      { text: 'License', link: '/jobzilla/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Setup homepage', link: '/jobzilla/usage-homepage' },
      { text: 'Setup logo & favicon', link: '/jobzilla/usage-logo-favicon' },
      { text: 'Menu', link: '/jobzilla/usage-menu' },
      { text: 'Theme options', link: '/jobzilla/usage-theme-options' },
      { text: 'Widgets', link: '/jobzilla/usage-widgets' },
      { text: 'Custom CSS/JS', link: '/jobzilla/usage-custom-css-js' },
      { text: 'Translation', link: '/jobzilla/usage-translation' },
      { text: 'Multi-language', link: '/jobzilla/usage-multi-language' },
      { text: 'Google Analytics', link: '/jobzilla/usage-analytics' },
      { text: 'Media - Setup Amazon S3', link: '/jobzilla/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/jobzilla/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/jobzilla/usage-media-wasabi' },
      { text: 'Setup email', link: '/jobzilla/usage-email' },
      { text: 'Currencies', link: '/jobzilla/usage-currencies' },
      { text: 'Setup social login', link: '/jobzilla/usage-social-login' },
      { text: 'Setup cronjob', link: '/jobzilla/cronjob' },
      { text: 'Newsletter', link: '/jobzilla/usage-newsletter' },
    ],
  },
  {
    text: 'Development',
    items: [
      { text: 'Rename theme', link: '/jobzilla/theme-rename' },
    ]
  }
] satisfies DefaultTheme.SidebarItem[];
