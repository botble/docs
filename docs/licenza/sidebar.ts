import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/licenza/' },
    {
        text: 'For Developers',
        items: [
            { text: 'Quick Start (5 min)', link: '/licenza/quick-start' },
            { text: 'Integration Examples', link: '/licenza/examples' },
            { text: 'Integration Guide', link: '/licenza/integration' },
            { text: 'API Reference', link: '/licenza/api' },
            { text: 'Demo Playground', link: '/licenza/demo-playground' },
            { text: 'Webhooks', link: '/licenza/webhooks' },
            { text: 'Gumroad Integration', link: '/licenza/gumroad-integration' },
        ],
    },
    {
        text: 'Server Setup',
        items: [
            { text: 'Requirements', link: '/licenza/installation-requirements' },
            { text: 'Install via Web', link: '/licenza/installation-web-interface' },
            { text: 'Install via CLI', link: '/licenza/installation-command-line' },
            { text: 'Install via Docker', link: '/licenza/installation-using-docker' },
            { text: 'SSL', link: '/licenza/ssl' },
            { text: 'Upgrade Guide', link: '/licenza/upgrade' },
            { text: 'Cronjob', link: '/licenza/cronjob' },
            { text: 'Commands', link: '/licenza/commands' },
        ],
    },
    {
        text: 'Admin Guide',
        items: [
            { text: 'Products', link: '/licenza/products' },
            { text: 'Licenses', link: '/licenza/licenses' },
            { text: 'Activations', link: '/licenza/activations' },
            { text: 'Customers', link: '/licenza/customers' },
            { text: 'PHP Obfuscator', link: '/licenza/php-obfuscator' },
        ],
    },
    {
        text: 'More',
        items: [
            { text: 'FAQ', link: '/licenza/faq' },
            { text: 'Troubleshooting', link: '/licenza/troubleshooting' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];
