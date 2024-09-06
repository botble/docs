import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/transp/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/transp/releases' },
      { text: 'Upgrade Guide', link: '/transp/upgrade' },
    ]
  },
  {
    text: 'Getting Started',
    items: [
      {
        text: 'Installation',
        items: [
          { text: 'Requirements', link: '/transp/installation-requirements' },
          { text: 'Using web interface', link: '/transp/installation-web-interface' },
          { text: 'Using command line', link: '/transp/installation-command-line' },
          { text: 'Using Docker', link: '/transp/installation-using-docker' },
        ],
      },
      { text: 'SSL', link: '/transp/ssl' },
      { text: 'License', link: '/transp/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Setup homepage',  link: '/transp/usage-homepage' },
      { text: 'Setup menus',  link: '/transp/usage-menus' },
      { text: 'Setup theme options',  link: '/transp/usage-theme-options' },
      { text: 'Widgets', link: '/transp/usage-widgets' },
      { text: 'Custom CSS/JS', link: '/transp/usage-custom-css-js' },
      { text: 'Translation', link: '/transp/usage-translation' },
      { text: 'Multi-language', link: '/transp/usage-multi-language' },
      { text: 'Google Analytics', link: '/transp/usage-analytics' },
      { text: 'Media - Setup Amazon S3', link: '/transp/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/transp/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/transp/usage-media-wasabi' },
      { text: 'Setup email', link: '/transp/usage-email' },
      { text: 'Setup cronjob', link: '/transp/cronjob' },
      { text: 'Newsletter', link: '/transp/usage-newsletter' },
    ],
  },
  {
    text: 'Development',
    items: [
      { text: 'Rename theme', link: '/transp/theme-rename' },
    ]
  }
] satisfies DefaultTheme.SidebarItem[]
