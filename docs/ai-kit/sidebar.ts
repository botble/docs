import { DefaultTheme } from 'vitepress'

export default [
  { text: 'Overview', link: '/ai-kit/' },
  {
    text: 'Getting Started',
    items: [
      { text: 'Installation', link: '/ai-kit/installation' },
      { text: 'Your First Task', link: '/ai-kit/getting-started' },
    ],
  },
  {
    text: 'Reference',
    items: [
      { text: 'Skills & Agents', link: '/ai-kit/skills' },
    ],
  },
  {
    text: 'Support',
    items: [
      { text: 'FAQ', link: '/ai-kit/faq' },
      { text: 'Changelog', link: '/ai-kit/changelog' },
    ],
  },
] satisfies DefaultTheme.SidebarItem[]
