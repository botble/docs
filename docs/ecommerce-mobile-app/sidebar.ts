import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/ecommerce-mobile-app/' },
    { text: 'App Overview', link: '/ecommerce-mobile-app/overview' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/ecommerce-mobile-app/installation' },
            { text: 'License Activation', link: '/ecommerce-mobile-app/13_license_activation' },
            { text: 'Configuration', link: '/ecommerce-mobile-app/configuration' },
            { text: 'Development Guide', link: '/ecommerce-mobile-app/development' },
            { text: 'API Integration', link: '/ecommerce-mobile-app/api-integration' },
        ],
    },
    {
        text: 'Quick Setup (5-15 min each)',
        items: [
            { text: '1. Theme Colors', link: '/ecommerce-mobile-app/01_theme_colors' },
            { text: '2. App Font', link: '/ecommerce-mobile-app/02_app_font' },
            { text: '3. App Name', link: '/ecommerce-mobile-app/03_app_name' },
            { text: '4. App Logo', link: '/ecommerce-mobile-app/04_app_logo' },
            { text: '5. API Base URL', link: '/ecommerce-mobile-app/05_api_base_url' },
            { text: '6. Translations', link: '/ecommerce-mobile-app/06_translations' },
            { text: '7. Running App', link: '/ecommerce-mobile-app/07_running_app' },
            { text: '8. Deploying App', link: '/ecommerce-mobile-app/08_deploying_app' },
            { text: '9. Version Management', link: '/ecommerce-mobile-app/09_version_management' },
            { text: '10. Help Center', link: '/ecommerce-mobile-app/10_help_center' },
            { text: '11. Social Login', link: '/ecommerce-mobile-app/11_social_login_setup' },
            { text: '12. Onboarding', link: '/ecommerce-mobile-app/12_onboarding' },
        ],
    },
    {
        text: 'Help & Support',
        items: [
            { text: 'Support & Contact', link: '/ecommerce-mobile-app/support' },
            { text: 'FAQ', link: '/ecommerce-mobile-app/faq' },
            { text: 'Troubleshooting', link: '/ecommerce-mobile-app/troubleshooting' },
            { text: 'Upgrade Guide', link: '/ecommerce-mobile-app/upgrade' },
            { text: 'Release Notes', link: '/ecommerce-mobile-app/releases' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];
