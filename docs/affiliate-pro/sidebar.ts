import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/affiliate-pro/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/affiliate-pro/installation' },
            { text: 'Configuration', link: '/affiliate-pro/configuration' },
        ],
    },
    {
        text: 'Admin Guide',
        items: [
            { text: 'Overview', link: '/affiliate-pro/usage-guide' },
            { text: 'Managing Affiliates', link: '/affiliate-pro/usage-affiliates' },
            { text: 'Commissions', link: '/affiliate-pro/usage-commissions' },
            { text: 'Withdrawals', link: '/affiliate-pro/usage-withdrawals' },
            { text: 'Member Levels', link: '/affiliate-pro/usage-member-levels' },
            { text: 'Coupons & Short Links', link: '/affiliate-pro/usage-coupons-short-links' },
            { text: 'Reports', link: '/affiliate-pro/usage-reports' },
            { text: 'Email Notifications', link: '/affiliate-pro/usage-email-notifications' },
            { text: 'Marketplace Integration', link: '/affiliate-pro/marketplace-integration' },
        ],
    },
    {
        text: 'Affiliate Guide',
        items: [
            { text: 'Affiliate Dashboard', link: '/affiliate-pro/affiliate-dashboard' },
        ],
    },
    {
        text: 'Updates',
        items: [
            { text: 'Release Notes', link: '/affiliate-pro/releases' },
            { text: 'Upgrade Guide', link: '/affiliate-pro/upgrade' },
        ],
    },
    {
        text: 'Support',
        items: [
            { text: 'Troubleshooting', link: '/affiliate-pro/troubleshooting' },
            { text: 'FAQ', link: '/affiliate-pro/faq' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];
