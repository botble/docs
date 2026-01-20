import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/qore/' },
  {
    text: 'Usage',
    items: [
      { text: 'Setup Homepage', link: '/qore/usage-homepage' },
      { text: 'UI Block', link: '/qore/usage-ui-block' },
      { text: 'Setup Menus', link: '/qore/usage-menus' },
      { text: 'Theme Options', link: '/qore/usage-theme-options' },
      { text: 'Widgets', link: '/qore/usage-widgets' },
      { text: 'Animations', link: '/qore/usage-animations' },
      { text: 'Contact Pages', link: '/qore/usage-contact-pages' },
    ],
  },
] satisfies DefaultTheme.SidebarItem[]
