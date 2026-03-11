import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/qore/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/qore/releases' },
      { text: 'Upgrade Guide', link: '/qore/upgrade' },
    ]
  },
  {
    text: 'Getting Started',
    items: [
      {
        text: 'Installation',
        items: [
          { text: 'Requirements', link: '/qore/installation-requirements' },
          { text: 'Using web interface', link: '/qore/installation-web-interface' },
          { text: 'Using command line', link: '/qore/installation-command-line' },
          { text: 'Using Docker', link: '/qore/installation-using-docker' },
        ],
      },
      { text: 'SSL', link: '/qore/ssl' },
      { text: 'License', link: '/qore/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Setup Homepage', link: '/qore/usage-homepage' },
      { text: 'UI Block (Shortcodes)', link: '/qore/usage-ui-block' },
      { text: 'Setup Menus', link: '/qore/usage-menus' },
      { text: 'Theme Options', link: '/qore/usage-theme-options' },
      { text: 'Widgets', link: '/qore/usage-widgets' },
      { text: 'Animations', link: '/qore/usage-animations' },
      { text: 'Contact Pages', link: '/qore/usage-contact-pages' },
      { text: 'Custom CSS/JS', link: '/qore/usage-custom-css-js' },
      { text: 'Translation', link: '/qore/plugin-translation' },
      { text: 'Google Analytics', link: '/qore/usage-analytics' },
      { text: 'Multi-language', link: '/qore/usage-multi-language' },
      { text: 'Media - Setup Amazon S3', link: '/qore/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/qore/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/qore/usage-media-wasabi' },
      { text: 'Setup email', link: '/qore/usage-email' },
      { text: 'Backup', link: '/qore/plugin-backup' },
    ],
  },
] satisfies DefaultTheme.SidebarItem[]
