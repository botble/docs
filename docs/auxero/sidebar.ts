import { DefaultTheme } from 'vitepress'

export default [
    { text: 'Overview', link: '/auxero/' },
    {
        text: 'Prologue',
        items: [
            { text: 'Release Notes', link: '/auxero/releases' },
            { text: 'Upgrade Guide', link: '/auxero/upgrade' },
        ]
    },
    {
        text: 'Getting Started',
        items: [
            {
                text: 'Installation',
                items: [
                    { text: 'Requirements', link: '/auxero/installation-requirements' },
                    { text: 'Using web interface', link: '/auxero/installation-web-interface' },
                    { text: 'Using command line', link: '/auxero/installation-command-line' },
                    { text: 'Using Docker', link: '/auxero/installation-using-docker' },
                ],
            },
            { text: 'SSL', link: '/auxero/ssl' },
            { text: 'License', link: '/auxero/license' },
        ],
    },
    {
        text: 'Usage',
        items: [
            { text: 'Setup homepage', link: '/auxero/usage-homepage' },
            { text: 'UI Block', link: '/auxero/usage-ui-block' },
            { text: 'Setup menus', link: '/auxero/usage-menus' },
            { text: 'Setup theme options', link: '/auxero/usage-theme-options' },
            { text: 'Widgets', link: '/auxero/usage-widgets' },
            { text: 'Custom CSS/JS', link: '/auxero/usage-custom-css-js' },
            { text: 'Translation', link: '/auxero/plugin-translation' },
            { text: 'Multi-language', link: '/auxero/usage-multi-language' },
            { text: 'Google Analytics', link: '/auxero/usage-analytics' },
            { text: 'Media - Setup Amazon S3', link: '/auxero/usage-media-s3' },
            { text: 'Media - Setup BunnyCDN', link: '/auxero/usage-media-bunnycdn' },
            { text: 'Media - Setup Wasabi', link: '/auxero/usage-media-wasabi' },
            { text: 'Setup email', link: '/auxero/usage-email' },
            { text: 'Setup cronjob', link: '/auxero/cronjob' },
            { text: 'Newsletter', link: '/auxero/usage-newsletter' },
        ],
    },
    {
        text: 'Car Manager',
        items: [
            { text: 'Car Management', link: '/auxero/usage-car-management' },
            { text: 'Booking & Rental', link: '/auxero/usage-booking-rental' },
            { text: 'Vendor System', link: '/auxero/usage-vendor-system' },
            { text: 'Payment & Tax', link: '/auxero/usage-payment-tax' },
            { text: 'Reviews & Messaging', link: '/auxero/usage-reviews-messaging' },
        ],
    },
    {
        text: 'API',
        items: [
            { text: 'REST API', link: '/auxero/usage-api' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[]
