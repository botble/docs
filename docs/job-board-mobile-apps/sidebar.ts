import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/job-board-mobile-apps/' },
    { text: 'App Overview', link: '/job-board-mobile-apps/overview' },
    { text: '⭐ Complete Setup & Publishing Guide', link: '/job-board-mobile-apps/complete-setup-and-publishing-guide' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/job-board-mobile-apps/installation' },
            { text: 'Configuration', link: '/job-board-mobile-apps/configuration' },
            { text: 'Development Guide', link: '/job-board-mobile-apps/development' },
            { text: 'API Integration', link: '/job-board-mobile-apps/api-integration' },
            { text: 'License Activation', link: '/job-board-mobile-apps/license-activation' },
        ],
    },
    {
        text: 'Quick Setup (5-15 min each)',
        items: [
            { text: '1. Theme Colors', link: '/job-board-mobile-apps/01_theme_colors' },
            { text: '2. App Font', link: '/job-board-mobile-apps/02_app_font' },
            { text: '3. App Name', link: '/job-board-mobile-apps/04_app_name' },
            { text: '4. App Logo', link: '/job-board-mobile-apps/05_app_logo' },
            { text: '5. API Base URL', link: '/job-board-mobile-apps/06_api_base_url' },
            { text: '6. Translations', link: '/job-board-mobile-apps/07_translations' },
            { text: '7. Running App', link: '/job-board-mobile-apps/08_running_app' },
            { text: '8. Deploying App', link: '/job-board-mobile-apps/09_deploying_app' },
            { text: '9. Version Management', link: '/job-board-mobile-apps/10_version_management' },
            { text: '10. Profile Links', link: '/job-board-mobile-apps/11_profile_links' },
            { text: '11. Splash Screen', link: '/job-board-mobile-apps/17_splash_screen' },
            { text: '12. Loading Screen', link: '/job-board-mobile-apps/18_loading_screen' },
            { text: '13. Onboarding', link: '/job-board-mobile-apps/onboarding' },
            { text: '14. Push Notifications', link: '/job-board-mobile-apps/push_notifications' },
        ],
    },
    {
        text: 'Social Login (30-60 min each)',
        items: [
            { text: 'Apple Sign-In', link: '/job-board-mobile-apps/13_apple_login_setup' },
            { text: 'Google Login', link: '/job-board-mobile-apps/14_google_login_setup' },
            { text: 'Facebook Login', link: '/job-board-mobile-apps/15_facebook_login_setup' },
            { text: 'Social Login Configuration', link: '/job-board-mobile-apps/16_social_login_configuration' },
        ],
    },
    {
        text: 'Help & Support',
        items: [
            { text: 'Support & Contact', link: '/job-board-mobile-apps/support' },
            { text: 'FAQ', link: '/job-board-mobile-apps/faq' },
            { text: 'Troubleshooting', link: '/job-board-mobile-apps/troubleshooting' },
            { text: 'Upgrade Guide', link: '/job-board-mobile-apps/upgrade' },
            { text: 'Release Notes', link: '/job-board-mobile-apps/releases' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];
