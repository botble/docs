import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/ninico/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/ninico/releases' },
      { text: 'Upgrade Guide', link: '/ninico/upgrade' },
    ],
  },
  {
    text: 'Getting Started',
    items: [
      { text: 'Installation', link: '/ninico/installation' },
      { text: 'SSL', link: '/ninico/ssl' },
      { text: 'License', link: '/ninico/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Setup homepage', link: '/ninico/usage-homepage' },
      { text: 'Menu', link: '/ninico/usage-menu' },
      { text: 'Theme options', link: '/ninico/usage-theme-options' },
      { text: 'Widgets', link: '/ninico/usage-widgets' },
      { text: 'Custom CSS/JS', link: '/ninico/usage-custom-css-js' },
      { text: 'Translation', link: '/ninico/usage-translation' },
      { text: 'Multi-language', link: '/ninico/usage-multi-language' },
      { text: 'Google Analytics', link: '/ninico/usage-analytics' },
      { text: 'Media - Setup Amazon S3', link: '/ninico/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/ninico/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/ninico/usage-media-wasabi' },
      { text: 'Setup email', link: '/ninico/usage-email' },
      { text: 'Currencies', link: '/ninico/usage-currencies' },
      { text: 'Setup social login', link: '/ninico/usage-social-login' },
      { text: 'Location', link: '/ninico/usage-location' },
      { text: 'Invoice template', link: '/ninico/invoice-template' },
      { text: 'Ads', link: '/ninico/usage-ads' },
      { text: 'Setup cronjob', link: '/ninico/cronjob' },
      { text: 'Newsletter', link: '/ninico/usage-newsletter' },
    ],
  },
  {
    text: 'Development',
    items: [
      { text: 'Rename theme', link: '/ninico/theme-rename' },
    ]
  }
] satisfies DefaultTheme.SidebarItem[]
