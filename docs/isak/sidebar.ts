import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/isak/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/isak/releases' },
      { text: 'Upgrade Guide', link: '/isak/upgrade' },
    ]
  },
  {
    text: 'Getting Started',
    items: [
      {
        text: 'Installation',
        items: [
          { text: 'Requirements', link: '/isak/installation-requirements' },
          { text: 'Using web interface', link: '/isak/installation-web-interface' },
          { text: 'Using command line', link: '/isak/installation-command-line' },
          { text: 'Using Docker', link: '/isak/installation-using-docker' },
        ],
      },
      { text: 'SSL', link: '/isak/ssl' },
      { text: 'License', link: '/isak/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Setup homepage',  link: '/isak/usage-homepage' },
      { text: 'UI Block (Shortcodes)',  link: '/isak/usage-ui-block' },
      { text: 'Setup menus',  link: '/isak/usage-menus' },
      { text: 'Setup theme options',  link: '/isak/usage-theme-options' },
      { text: 'Theme variants',  link: '/isak/usage-theme-variants' },
      { text: 'Dark/Light mode',  link: '/isak/usage-dark-light-mode' },
      { text: 'Widgets', link: '/isak/usage-widgets' },
      { text: 'Portfolio integration', link: '/isak/usage-portfolio' },
      { text: 'Custom CSS/JS', link: '/isak/usage-custom-css-js' },
      { text: 'Translation', link: '/isak/usage-translation' },
      { text: 'Google Analytics', link: '/isak/usage-analytics' },
      { text: 'Multi-language', link: '/isak/usage-multi-language' },
      { text: 'Media - Setup Amazon S3', link: '/isak/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/isak/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/isak/usage-media-wasabi' },
      { text: 'Setup email', link: '/isak/usage-email' },
      { text: 'Backup', link: '/isak/plugin-backup' },
    ],
  }
] satisfies DefaultTheme.SidebarItem[]
