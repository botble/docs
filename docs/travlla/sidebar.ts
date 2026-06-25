import { DefaultTheme } from 'vitepress'

export default [
    { text: 'Overview', link: '/travlla/' },
    {
        text: 'Prologue',
        items: [
            { text: 'Release Notes', link: '/travlla/releases' },
            { text: 'Upgrade Guide', link: '/travlla/upgrade' },
        ]
    },
    {
        text: 'Getting Started',
        items: [
            {
                text: 'Installation',
                items: [
                    { text: 'Requirements', link: '/travlla/installation-requirements' },
                    { text: 'Using web interface', link: '/travlla/installation-web-interface' },
                    { text: 'Using command line', link: '/travlla/installation-command-line' },
                    { text: 'Using Docker', link: '/travlla/installation-using-docker' },
                ],
            },
            { text: 'SSL', link: '/travlla/ssl' },
            { text: 'License', link: '/travlla/license' },
        ],
    },
    {
        text: 'Usage',
        items: [
            { text: 'Setup homepage',  link: '/travlla/usage-homepage' },
            { text: 'UI Block',  link: '/travlla/usage-ui-block' },
            { text: 'Setup menus',  link: '/travlla/usage-menus' },
            { text: 'Setup theme options',  link: '/travlla/usage-theme-options' },
            { text: 'Widgets', link: '/travlla/usage-widgets' },
            { text: 'Custom CSS/JS', link: '/travlla/usage-custom-css-js' },
            { text: 'Translation', link: '/travlla/plugin-translation' },
            { text: 'Multi-language', link: '/travlla/usage-multi-language' },
            { text: 'Google Analytics', link: '/travlla/usage-analytics' },
            { text: 'Media - Setup Amazon S3', link: '/travlla/usage-media-s3' },
            { text: 'Media - Setup BunnyCDN', link: '/travlla/usage-media-bunnycdn' },
            { text: 'Media - Setup Wasabi', link: '/travlla/usage-media-wasabi' },
            { text: 'Setup email', link: '/travlla/usage-email' },
            { text: 'Setup cronjob', link: '/travlla/cronjob' },
            { text: 'Newsletter', link: '/travlla/usage-newsletter' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[]
