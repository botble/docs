import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/nest/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/nest/releases' },
      { text: 'Upgrade Guide', link: '/nest/upgrade' },
    ],
  },
  {
    text: 'Getting Started',
    items: [
      {
        text: 'Installation',
        items: [
          { text: 'Requirements', link: '/nest/installation-requirements' },
          { text: 'Using web interface', link: '/nest/installation-web-interface' },
          { text: 'Using command line', link: '/nest/installation-command-line' },
          { text: 'Using Docker', link: '/nest/installation-using-docker' },
        ],
      },
      { text: 'SSL', link: '/nest/ssl' },
      { text: 'License', link: '/nest/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Setup homepage', link: '/nest/usage-homepage' },
      { text: 'Menu', link: '/nest/usage-menu' },
      { text: 'Theme options', link: '/nest/usage-theme-options' },
      { text: 'Widgets', link: '/nest/usage-widgets' },
      { text: 'Custom CSS/JS', link: '/nest/usage-custom-css-js' },
      { text: 'Translation', link: '/nest/plugin-translation' },
      { text: 'Multi-language', link: '/nest/usage-multi-language' },
      { text: 'Google Analytics', link: '/nest/usage-analytics' },
      { text: 'Media - Setup Amazon S3', link: '/nest/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/nest/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/nest/usage-media-wasabi' },
      { text: 'Setup email', link: '/nest/usage-email' },
      { text: 'Currencies', link: '/nest/usage-currencies' },
      { text: 'Setup social login', link: '/nest/usage-social-login' },
      { text: 'Location', link: '/nest/usage-location' },
      { text: 'Invoice template', link: '/nest/invoice-template' },
      { text: 'Ads', link: '/nest/usage-ads' },
      { text: 'Setup cronjob', link: '/nest/cronjob' },
      { text: 'Newsletter', link: '/nest/usage-newsletter' },
    ],
  },
  {
    text: 'Development',
    items: [
      { text: 'Rename theme', link: '/nest/theme-rename' },
    ]
  }
] satisfies DefaultTheme.SidebarItem[]
