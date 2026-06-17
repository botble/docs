import { DefaultTheme } from 'vitepress'

export default [
    { text: 'Overview', link: '/landing-funnel/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/landing-funnel/installation' },
            { text: 'Configuration', link: '/landing-funnel/configuration' },
        ],
    },
    {
        text: 'User Guide',
        items: [
            { text: 'Usage Overview', link: '/landing-funnel/usage/' },
            { text: 'Creating a Funnel', link: '/landing-funnel/usage/creating-funnels' },
            { text: 'Templates & Visual Styles', link: '/landing-funnel/usage/templates-and-styles' },
            { text: 'Checkout & COD Flow', link: '/landing-funnel/usage/checkout-and-cod' },
            { text: 'Tracking & Webhooks', link: '/landing-funnel/usage/tracking-and-webhooks' },
        ],
    },
    {
        text: 'Support',
        items: [
            { text: 'Troubleshooting', link: '/landing-funnel/troubleshooting' },
            { text: 'FAQ', link: '/landing-funnel/faq' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[]
