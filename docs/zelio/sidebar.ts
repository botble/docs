import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/zelio/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/zelio/releases' },
      { text: 'Upgrade Guide', link: '/zelio/upgrade' },
    ]
  },
  {
    text: 'Getting Started',
    items: [
      {
        text: 'Installation',
        items: [
          { text: 'Requirements', link: '/zelio/installation-requirements' },
          { text: 'Using web interface', link: '/zelio/installation-web-interface' },
          { text: 'Using command line', link: '/zelio/installation-command-line' },
          { text: 'Using Docker', link: '/zelio/installation-using-docker' },
        ],
      },
      { text: 'SSL', link: '/zelio/ssl' },
      { text: 'License', link: '/zelio/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Setup homepage',  link: '/zelio/usage-homepage' },
      { text: 'UI Block',  link: '/zelio/usage-ui-block' },
      { text: 'Setup menus',  link: '/zelio/usage-menus' },
      { text: 'Setup theme options',  link: '/zelio/usage-theme-options' },
      { text: 'Widgets', link: '/zelio/usage-widgets' },
      { text: 'Custom CSS/JS', link: '/zelio/usage-custom-css-js' },
      { text: 'Translation', link: '/zelio/usage-translation' },
      { text: 'Google Analytics', link: '/zelio/usage-analytics' },
      { text: 'Multi-language', link: '/zelio/usage-multi-language' },
      { text: 'Media - Setup Amazon S3', link: '/zelio/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/zelio/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/zelio/usage-media-wasabi' },
      { text: 'Setup email', link: '/zelio/usage-email' },
      { text: 'Backup', link: '/zelio/plugin-backup' },
    ],
  }
] satisfies DefaultTheme.SidebarItem[]
