import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/martfury/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/martfury/releases' },
      { text: 'Upgrade Guide', link: '/martfury/upgrade' },
    ],
  },
  {
    text: 'Getting Started',
    items: [
      {
        text: 'Installation',
        items: [
          { text: 'Requirements', link: '/martfury/installation-requirements' },
          { text: 'Using web interface', link: '/martfury/installation-web-interface' },
          { text: 'Using command line', link: '/martfury/installation-command-line' },
          { text: 'Using Docker', link: '/martfury/installation-using-docker' },
        ],
      },
      { text: 'SSL', link: '/martfury/ssl' },
      { text: 'License', link: '/martfury/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Homepage demos', link: '/martfury/usage-homepage' },
      { text: 'Theme options', link: '/martfury/usage-theme-options' },
      { text: 'UI Blocks', link: '/martfury/usage-ui-block' },
      { text: 'Menus', link: '/martfury/usage-menus' },
      { text: 'Widgets', link: '/martfury/usage-widgets' },
      { text: 'Custom CSS/JS', link: '/martfury/usage-custom-css-js' },
      { text: 'Translation', link: '/martfury/plugin-translation' },
      { text: 'RTL and theme translation', link: '/martfury/usage-rtl-and-theme-translation' },
      { text: 'Multi-language', link: '/martfury/usage-multi-language' },
      { text: 'Google Analytics', link: '/martfury/usage-analytics' },
      { text: 'Media - Setup Amazon S3', link: '/martfury/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/martfury/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/martfury/usage-media-wasabi' },
      { text: 'Setup email', link: '/martfury/usage-email' },
      { text: 'Currencies', link: '/martfury/usage-currencies' },
      { text: 'Setup social login', link: '/martfury/usage-social-login' },
      { text: 'Location', link: '/martfury/usage-location' },
      { text: 'Invoice template', link: '/martfury/invoice-template' },
      { text: 'Setup cronjob', link: '/martfury/cronjob' },
      { text: 'Newsletter', link: '/martfury/usage-newsletter' },
      { text: 'Backup', link: '/martfury/plugin-backup' },
    ],
  },
  {
    text: 'Marketplace',
    items: [
      { text: 'Vendor Subscriptions', link: '/martfury/usage-marketplace-subscriptions' },
    ],
  },
  {
    text: 'Development',
    items: [
      { text: 'API', link: '/martfury/api' },
      { text: 'Rename theme', link: '/martfury/theme-rename' },
    ]
  }
] satisfies DefaultTheme.SidebarItem[];
