import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/orisa/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/orisa/releases' },
      { text: 'Upgrade Guide', link: '/orisa/upgrade' },
    ],
  },
  {
    text: 'Getting Started',
    items: [
      {
        text: 'Installation',
        items: [
          { text: 'Requirements', link: '/orisa/installation-requirements' },
          { text: 'Using web interface', link: '/orisa/installation-web-interface' },
          { text: 'Using command line', link: '/orisa/installation-command-line' },
          { text: 'Using Docker', link: '/orisa/installation-using-docker' },
        ],
      },
      { text: 'SSL', link: '/orisa/ssl' },
      { text: 'License', link: '/orisa/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Setup homepage', link: '/orisa/usage-homepage' },
      { text: 'Menu', link: '/orisa/usage-menus' },
      { text: 'UI Blocks', link: '/orisa/usage-ui-block' },
      { text: 'Theme options', link: '/orisa/usage-theme-options' },
      { text: 'Logo customization', link: '/orisa/usage-logo-customization' },
      { text: 'Offcanvas menu', link: '/orisa/usage-offcanvas-menu' },
      { text: 'Newsletter popup', link: '/orisa/usage-newsletter-popup' },
      { text: 'Project metrics', link: '/orisa/usage-project-metrics' },
      { text: 'Widgets', link: '/orisa/usage-widgets' },
      { text: 'Custom CSS/JS', link: '/orisa/usage-custom-css-js' },
      { text: 'Translation', link: '/orisa/plugin-translation' },
      { text: 'Multi-language', link: '/orisa/usage-multi-language' },
      { text: 'Google Analytics', link: '/orisa/usage-analytics' },
      { text: 'Media - Setup Amazon S3', link: '/orisa/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/orisa/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/orisa/usage-media-wasabi' },
      { text: 'Setup email', link: '/orisa/usage-email' },
      { text: 'Currencies', link: '/orisa/usage-currencies' },
      { text: 'Setup social login', link: '/orisa/usage-social-login' },
      { text: 'Location', link: '/orisa/usage-location' },
      { text: 'Invoice template', link: '/orisa/invoice-template' },
      { text: 'Setup cronjob', link: '/orisa/cronjob' },
      { text: 'Newsletter', link: '/orisa/usage-newsletter' },
    ],
  },
  {
    text: 'Migration',
    items: [
      { text: 'Subfolder to root domain', link: '/orisa/migration-subfolder-to-root' },
    ],
  },
  {
    text: 'Development',
    items: [
      { text: 'Rename theme', link: '/orisa/theme-rename' },
    ],
  },
] satisfies DefaultTheme.SidebarItem[]
