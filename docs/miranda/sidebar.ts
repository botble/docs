import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/miranda/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/miranda/releases' },
      { text: 'Upgrade Guide', link: '/miranda/upgrade' },
    ],
  },
  {
    text: 'Getting Started',
    items: [
      {
        text: 'Installation',
        items: [
          { text: 'Requirements', link: '/miranda/installation-requirements' },
          { text: 'Using web interface', link: '/miranda/installation-web-interface' },
          { text: 'Using command line', link: '/miranda/installation-command-line' },
          { text: 'Using Docker', link: '/miranda/installation-using-docker' },
        ],
      },
      { text: 'SSL', link: '/miranda/ssl' },
      { text: 'License', link: '/miranda/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Custom CSS/JS', link: '/miranda/usage-custom-css-js' },
      { text: 'Translation', link: '/miranda/plugin-translation' },
      { text: 'Multi-language', link: '/miranda/usage-multi-language' },
      { text: 'Google Analytics', link: '/miranda/usage-analytics' },
      { text: 'Media - Setup Amazon S3', link: '/miranda/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/miranda/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/miranda/usage-media-wasabi' },
      { text: 'Setup email', link: '/miranda/usage-email' },
      { text: 'Setup cronjob', link: '/miranda/cronjob' },
      { text: 'Newsletter', link: '/miranda/usage-newsletter' },
    ],
  },
  {
    text: 'Development',
    items: [
      { text: 'Rename theme', link: '/miranda/theme-rename' },
    ]
  }
] satisfies DefaultTheme.SidebarItem[];
