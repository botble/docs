import { DefaultTheme } from 'vitepress'

export default [
    { text: 'Overview', link: '/homzen/' },
    {
        text: 'Prologue',
        items: [
            { text: 'Release Notes', link: '/homzen/releases' },
            { text: 'Upgrade Guide', link: '/homzen/upgrade' },
        ],
    },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/homzen/installation' },
            { text: 'SSL', link: '/homzen/ssl' },
            { text: 'License', link: '/homzen/license' },
            { text: 'API', link: '/homzen/api' },
        ],
    },
    {
        text: 'Usage',
        items: [
            { text: 'Homepage', link: '/homzen/usage-homepage' },
            { text: 'Theme Options', link: '/homzen/usage-theme-options' },
            { text: 'Menu', link: '/homzen/usage-menu' },
            { text: 'Widgets', link: '/homzen/usage-widgets' },
            { text: 'Custom CSS/JS', link: '/homzen/usage-custom-css-js' },
            { text: 'Translation', link: '/homzen/usage-translation' },
            { text: 'Multi-language', link: '/homzen/usage-multi-language' },
            { text: 'Real Estate', link: '/homzen/real-estate' },
            { text: 'Google Analytics', link: '/homzen/usage-analytics' },
            { text: 'Media - Setup Amazon S3', link: '/homzen/usage-media-s3' },
            { text: 'Media - Setup BunnyCDN', link: '/homzen/usage-media-bunnycdn' },
            { text: 'Media - Setup Wasabi', link: '/homzen/usage-media-wasabi' },
            { text: 'Setup email', link: '/homzen/usage-email' },
            { text: 'Setup social login', link: '/homzen/usage-social-login' },
            { text: 'Setup cronjob', link: '/homzen/cronjob' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[]