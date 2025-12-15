import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/shopwise/' },
  {
    text: 'Prologue',
    items: [
      { text: 'Release Notes', link: '/shopwise/releases' },
      { text: 'Upgrade Guide', link: '/shopwise/upgrade' },
    ],
  },
  {
    text: 'Getting Started',
    items: [
      {
        text: 'Installation',
        items: [
          { text: 'Requirements', link: '/shopwise/installation-requirements' },
          { text: 'Using web interface', link: '/shopwise/installation-web-interface' },
          { text: 'Using command line', link: '/shopwise/installation-command-line' },
          { text: 'Using Docker', link: '/shopwise/installation-using-docker' },
        ],
      },
      { text: 'SSL', link: '/shopwise/ssl' },
      { text: 'License', link: '/shopwise/license' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Custom CSS/JS', link: '/shopwise/usage-custom-css-js' },
      { text: 'Translation', link: '/shopwise/plugin-translation' },
      { text: 'Multi-language', link: '/shopwise/usage-multi-language' },
      { text: 'Google Analytics', link: '/shopwise/usage-analytics' },
      { text: 'Media - Setup Amazon S3', link: '/shopwise/usage-media-s3' },
      { text: 'Media - Setup BunnyCDN', link: '/shopwise/usage-media-bunnycdn' },
      { text: 'Media - Setup Wasabi', link: '/shopwise/usage-media-wasabi' },
      { text: 'Setup email', link: '/shopwise/usage-email' },
      { text: 'Currencies', link: '/shopwise/usage-currencies' },
      { text: 'Setup social login', link: '/shopwise/usage-social-login' },
      { text: 'Location', link: '/shopwise/usage-location' },
      { text: 'Invoice template', link: '/shopwise/invoice-template' },
      { text: 'Setup cronjob', link: '/shopwise/cronjob' },
      { text: 'Newsletter', link: '/shopwise/usage-newsletter' },
    ],
  },
  {
    text: 'Development',
    items: [
      { text: 'Rename theme', link: '/shopwise/theme-rename' },
    ]
  }
] satisfies DefaultTheme.SidebarItem[];
