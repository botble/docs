import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/stories/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/stories/releases' },
      { text: 'Upgrade Guide', link: '/stories/upgrade' },
    ],
  },
  {
    text: 'Getting Started',
    items: [
      {
        text: 'Installation',
        items: [
          { text: 'Requirements', link: '/stories/installation-requirements' },
          { text: 'Using web interface', link: '/stories/installation-web-interface' },
          { text: 'Using command line', link: '/stories/installation-command-line' },
          { text: 'Using Docker', link: '/stories/installation-using-docker' },
        ],
      },
      { text: 'SSL', link: '/stories/ssl' },
      { text: 'License', link: '/stories/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Custom CSS/JS', link: '/stories/usage-custom-css-js' },
      { text: 'Translation', link: '/stories/plugin-translation' },
      { text: 'Multi-language', link: '/stories/usage-multi-language' },
      { text: 'Google Analytics', link: '/stories/usage-analytics' },
      { text: 'Media - Setup Amazon S3', link: '/stories/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/stories/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/stories/usage-media-wasabi' },
      { text: 'Setup email', link: '/stories/usage-email' },
      { text: 'Setup cronjob', link: '/stories/cronjob' },
      { text: 'Newsletter', link: '/stories/usage-newsletter' },
    ],
  },
  {
    text: 'Development',
    items: [
      { text: 'Rename theme', link: '/stories/theme-rename' },
    ]
  }
] satisfies DefaultTheme.SidebarItem[];
