import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/velura/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/velura/releases' },
      { text: 'Upgrade Guide', link: '/velura/upgrade' },
      { text: 'FAQ', link: '/velura/faq' },
    ]
  },
  {
    text: 'Getting Started',
    items: [
      {
        text: 'Installation',
        items: [
          { text: 'Requirements', link: '/velura/installation-requirements' },
          { text: 'Using web interface', link: '/velura/installation-web-interface' },
          { text: 'Using command line', link: '/velura/installation-command-line' },
          { text: 'Using Docker', link: '/velura/installation-using-docker' },
        ],
      },
      { text: 'SSL', link: '/velura/ssl' },
      { text: 'License', link: '/velura/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Setup homepage', link: '/velura/usage-homepage' },
      { text: 'UI Block', link: '/velura/usage-ui-block' },
      { text: 'Spa Booking', link: '/velura/usage-spa-booking' },
      { text: 'Setup menus', link: '/velura/usage-menus' },
      { text: 'Setup theme options', link: '/velura/usage-theme-options' },
      { text: 'Widgets', link: '/velura/usage-widgets' },
      { text: 'Custom CSS/JS', link: '/cms/usage-custom-css-js' },
      { text: 'Translation', link: '/cms/plugin-translation' },
      { text: 'Google Analytics', link: '/cms/usage-analytics' },
      { text: 'Multi-language', link: '/cms/usage-multi-language' },
      { text: 'Media - Setup Amazon S3', link: '/cms/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/cms/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/cms/usage-media-wasabi' },
      { text: 'Setup email', link: '/cms/usage-email' },
      { text: 'Backup', link: '/cms/plugin-backup' },
    ],
  }
] satisfies DefaultTheme.SidebarItem[]
