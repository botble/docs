import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/farmart/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/farmart/releases' },
      { text: 'Upgrade Guide', link: '/farmart/upgrade' },
    ],
  },
  {
    text: 'Getting Started',
    items: [
      {
        text: 'Installation',
        items: [
          { text: 'Requirements', link: '/farmart/installation-requirements' },
          { text: 'Using web interface', link: '/farmart/installation-web-interface' },
          { text: 'Using command line', link: '/farmart/installation-command-line' },
          { text: 'Using Docker', link: '/farmart/installation-using-docker' },
        ],
      },
      { text: 'SSL', link: '/farmart/ssl' },
      { text: 'License', link: '/farmart/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Setup homepage', link: '/farmart/usage-homepage' },
      { text: 'Menu', link: '/farmart/usage-menu' },
      { text: 'Theme options', link: '/farmart/usage-theme-options' },
      { text: 'Widgets', link: '/farmart/usage-widgets' },
      { text: 'Custom CSS/JS', link: '/farmart/usage-custom-css-js' },
      { text: 'Translation', link: '/farmart/usage-translation' },
      { text: 'Multi-language', link: '/farmart/usage-multi-language' },
      { text: 'Google Analytics', link: '/farmart/usage-analytics' },
      { text: 'Media - Setup Amazon S3', link: '/farmart/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/farmart/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/farmart/usage-media-wasabi' },
      { text: 'Setup email', link: '/farmart/usage-email' },
      { text: 'Currencies', link: '/farmart/usage-currencies' },
      { text: 'Setup social login', link: '/farmart/usage-social-login' },
      { text: 'Location', link: '/farmart/usage-location' },
      { text: 'Invoice template', link: '/farmart/invoice-template' },
      { text: 'Setup cronjob', link: '/farmart/cronjob' },
      { text: 'Newsletter', link: '/farmart/usage-newsletter' },
    ],
  },
  {
    text: 'Development',
    items: [
      { text: 'Rename theme', link: '/farmart/theme-rename' },
    ]
  }
] satisfies DefaultTheme.SidebarItem[];
