import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/bb-popup/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/bb-popup/installation' },
            { text: 'Configuration', link: '/bb-popup/configuration' },
        ],
    },
    {
        text: 'User Guide',
        items: [
            { text: 'Creating a Popup', link: '/bb-popup/usage/creating-a-popup' },
            { text: 'Design', link: '/bb-popup/usage/design' },
            { text: 'Triggers & Behaviour', link: '/bb-popup/usage/triggers-and-behaviour' },
            { text: 'Display Rules', link: '/bb-popup/usage/display-rules' },
            { text: 'Email Capture', link: '/bb-popup/usage/email-capture' },
            { text: 'A/B Testing', link: '/bb-popup/usage/ab-testing' },
            { text: 'Reports', link: '/bb-popup/usage/reports' },
            { text: 'Shortcode & Embed', link: '/bb-popup/usage/shortcode-and-embed' },
            { text: 'Import & Export', link: '/bb-popup/usage/import-export' },
        ],
    },
    {
        text: 'Updates',
        items: [
            { text: 'Release Notes', link: '/bb-popup/releases' },
        ],
    },
    {
        text: 'Support',
        items: [
            { text: 'Troubleshooting', link: '/bb-popup/troubleshooting' },
            { text: 'Backend Configuration Errors', link: '/bb-popup/backend-configuration-errors' },
            { text: 'FAQ', link: '/bb-popup/faq' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];
