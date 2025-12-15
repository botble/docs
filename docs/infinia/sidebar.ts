import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/infinia/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/infinia/releases' },
      { text: 'Upgrade Guide', link: '/infinia/upgrade' },
    ]
  },
  {
    text: 'Getting Started',
    items: [
      {
        text: 'Installation',
        items: [
          { text: 'Requirements', link: '/infinia/installation-requirements' },
          { text: 'Using web interface', link: '/infinia/installation-web-interface' },
          { text: 'Using command line', link: '/infinia/installation-command-line' },
          { text: 'Using Docker', link: '/infinia/installation-using-docker' },
        ],
      },
      { text: 'SSL', link: '/infinia/ssl' },
      { text: 'License', link: '/infinia/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Setup homepage',  link: '/infinia/usage-homepage' },
      { text: 'UI Block',  link: '/infinia/usage-ui-block' },
      { text: 'Setup menus',  link: '/infinia/usage-menus' },
      { text: 'Setup theme options',  link: '/infinia/usage-theme-options' },
      { text: 'Widgets', link: '/infinia/usage-widgets' },
      { text: 'Custom CSS/JS', link: '/infinia/usage-custom-css-js' },
      { text: 'Translation', link: '/infinia/plugin-translation' },
      { text: 'Google Analytics', link: '/infinia/usage-analytics' },
      { text: 'Multi-language', link: '/infinia/usage-multi-language' },
      { text: 'Media - Setup Amazon S3', link: '/infinia/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/infinia/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/infinia/usage-media-wasabi' },
      { text: 'Setup email', link: '/infinia/usage-email' },
      { text: 'Backup', link: '/infinia/plugin-backup' },
    ],
  }
] satisfies DefaultTheme.SidebarItem[]
