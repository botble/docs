import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/restoria/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/restoria/releases' },
      { text: 'Upgrade Guide', link: '/restoria/upgrade' },
      { text: 'FAQ', link: '/restoria/faq' },
    ]
  },
  {
    text: 'Getting Started',
    items: [
      {
        text: 'Installation',
        items: [
          { text: 'Requirements', link: '/restoria/installation-requirements' },
          { text: 'Using web interface', link: '/restoria/installation-web-interface' },
          { text: 'Using command line', link: '/restoria/installation-command-line' },
          { text: 'Using Docker', link: '/restoria/installation-using-docker' },
        ],
      },
      { text: 'SSL', link: '/restoria/ssl' },
      { text: 'License', link: '/restoria/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Setup homepage',  link: '/restoria/usage-homepage' },
      { text: 'UI Block',  link: '/restoria/usage-ui-block' },
      { text: 'Setup menus',  link: '/restoria/usage-menus' },
      { text: 'Restaurant Menu Management',  link: '/restoria/usage-restaurant-menus' },
      { text: 'Reservation System',  link: '/restoria/usage-reservations' },
      { text: 'Chef Profiles',  link: '/restoria/usage-chef-profiles' },
      { text: 'Gallery Management',  link: '/restoria/usage-galleries' },
      { text: 'Setup theme options',  link: '/restoria/usage-theme-options' },
      { text: 'Widgets', link: '/restoria/usage-widgets' },
      { text: 'Custom CSS/JS', link: '/restoria/usage-custom-css-js' },
      { text: 'Translation', link: '/restoria/usage-translation' },
      { text: 'Google Analytics', link: '/restoria/usage-analytics' },
      { text: 'Multi-language', link: '/restoria/usage-multi-language' },
      { text: 'Media - Setup Amazon S3', link: '/restoria/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/restoria/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/restoria/usage-media-wasabi' },
      { text: 'Setup email', link: '/restoria/usage-email' },
      { text: 'Backup', link: '/restoria/plugin-backup' },
    ],
  }
] satisfies DefaultTheme.SidebarItem[]