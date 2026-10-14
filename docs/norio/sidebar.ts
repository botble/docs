import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/norio/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/norio/releases' },
      { text: 'Upgrade Guide', link: '/norio/upgrade' },
      { text: 'FAQ', link: '/norio/faq' },
    ],
  },
  {
    text: 'Getting Started',
    items: [
      {
        text: 'Installation',
        items: [
          { text: 'Requirements', link: '/norio/installation-requirements' },
          { text: 'Using web interface', link: '/norio/installation-web-interface' },
          { text: 'Using command line', link: '/norio/installation-command-line' },
          { text: 'Using Docker', link: '/norio/installation-using-docker' },
        ],
      },
      { text: 'SSL', link: '/norio/ssl' },
      { text: 'License', link: '/norio/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Setup homepage', link: '/norio/usage-homepage' },
      { text: 'Menu', link: '/norio/usage-menus' },
      { text: 'UI Blocks', link: '/norio/usage-ui-block' },
      { text: 'Theme options', link: '/norio/usage-theme-options' },
      { text: 'Dark mode', link: '/norio/usage-dark-mode' },
      { text: 'Logo customization', link: '/norio/usage-logo-customization' },
      { text: 'Portfolio', link: '/norio/usage-portfolio' },
      { text: 'Team', link: '/norio/usage-team' },
      { text: 'Careers', link: '/norio/usage-careers' },
      { text: 'Widgets', link: '/norio/usage-widgets' },
      { text: 'Newsletter popup', link: '/norio/usage-newsletter-popup' },
      { text: 'Newsletter', link: '/norio/usage-newsletter' },
      { text: 'Backup', link: '/norio/plugin-backup' },
      { text: 'Translation', link: '/norio/plugin-translation' },
      { text: 'Multi-language', link: '/norio/usage-multi-language' },
      { text: 'Custom CSS/JS', link: '/norio/usage-custom-css-js' },
      { text: 'Google Analytics', link: '/norio/usage-analytics' },
      { text: 'Media - Setup Amazon S3', link: '/norio/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/norio/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/norio/usage-media-wasabi' },
      { text: 'Setup email', link: '/norio/usage-email' },
      { text: 'Setup cronjob', link: '/norio/cronjob' },
    ],
  },
  {
    text: 'Migration',
    items: [
      { text: 'Subfolder to root domain', link: '/norio/migration-subfolder-to-root' },
    ],
  },
  {
    text: 'Development',
    items: [
      { text: 'Rename theme', link: '/norio/theme-rename' },
      { text: 'API', link: '/norio/api' },
    ],
  },
] satisfies DefaultTheme.SidebarItem[]
