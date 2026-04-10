import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/orisa/' },
  {
    text: 'Usage',
    items: [
      { text: 'Homepage', link: '/orisa/usage-homepage' },
      { text: 'Menus', link: '/orisa/usage-menus' },
      { text: 'Theme Options', link: '/orisa/usage-theme-options' },
      { text: 'UI Blocks', link: '/orisa/usage-ui-block' },
      { text: 'Widgets', link: '/orisa/usage-widgets' },
      { text: 'Custom CSS / JS', link: '/orisa/usage-custom-css-js' },
      { text: 'Google Analytics', link: '/orisa/usage-analytics' },
    ],
  },
  {
    text: 'Maintenance',
    items: [
      { text: 'Upgrade Guide', link: '/orisa/upgrade' },
      { text: 'SSL', link: '/orisa/ssl' },
      { text: 'License', link: '/orisa/license' },
      { text: 'Release Notes', link: '/orisa/releases' },
    ],
  },
] as DefaultTheme.SidebarItem[]
