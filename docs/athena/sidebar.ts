import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/athena/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/athena/releases' },
      { text: 'Upgrade Guide', link: '/athena/upgrade' },
    ]
  },
  {
    text: 'Getting Started',
    items: [
      { text: 'Installation', link: '/athena/installation' },
      { text: 'SSL', link: '/athena/ssl' },
      { text: 'License', link: '/athena/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Setup homepage',  link: '/athena/usage-homepage' },
      { text: 'UI Block',  link: '/athena/usage-ui-block' },
      { text: 'Setup menus',  link: '/athena/usage-menus' },
      { text: 'Setup theme options',  link: '/athena/usage-theme-options' },
      { text: 'Widgets', link: '/athena/usage-widgets' },
      { text: 'Custom CSS/JS', link: '/athena/usage-custom-css-js' },
      { text: 'Translation', link: '/athena/usage-translation' },
      { text: 'Google Analytics', link: '/athena/usage-analytics' },
      { text: 'Multi-language', link: '/athena/usage-multi-language' },
      { text: 'Media - Setup Amazon S3', link: '/athena/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/athena/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/athena/usage-media-wasabi' },
      { text: 'Setup email', link: '/athena/usage-email' },
      { text: 'Backup', link: '/athena/plugin-backup' },
      { text: 'Newsletter', link: '/athena/usage-newsletter' },
    ],
  }
] satisfies DefaultTheme.SidebarItem[]
