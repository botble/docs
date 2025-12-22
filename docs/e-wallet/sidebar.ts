import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/e-wallet/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/e-wallet/installation' },
            { text: 'Configuration', link: '/e-wallet/configuration' },
        ],
    },
    {
        text: 'User Guide',
        items: [
            { text: 'How to Use E-Wallet', link: '/e-wallet/usage/' },
        ],
    },
    {
        text: 'For Admins',
        items: [
            { text: 'Admin Dashboard', link: '/e-wallet/usage/admin-dashboard' },
            { text: 'Managing Wallets', link: '/e-wallet/usage/managing-wallets' },
            { text: 'Managing Transactions', link: '/e-wallet/usage/managing-transactions' },
            { text: 'Managing Top-ups', link: '/e-wallet/usage/managing-topups' },
            { text: 'Managing Withdrawals', link: '/e-wallet/usage/managing-withdrawals' },
        ],
    },
    {
        text: 'For Customers',
        items: [
            { text: 'Customer Guide', link: '/e-wallet/usage/customer-guide' },
            { text: 'Paying at Checkout', link: '/e-wallet/usage/checkout' },
        ],
    },
    {
        text: 'Updates',
        items: [
            { text: 'Release Notes', link: '/e-wallet/releases' },
            { text: 'Upgrade Guide', link: '/e-wallet/upgrade' },
        ],
    },
    {
        text: 'Support',
        items: [
            { text: 'Troubleshooting', link: '/e-wallet/troubleshooting' },
            { text: 'FAQ', link: '/e-wallet/faq' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];
