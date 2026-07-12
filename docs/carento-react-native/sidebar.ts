import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/carento-react-native/' },
    { text: 'App Overview', link: '/carento-react-native/overview' },
    { text: '⭐ Complete Setup & Publishing Guide', link: '/carento-react-native/complete-setup-and-publishing-guide' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/carento-react-native/installation' },
            { text: 'Configuration', link: '/carento-react-native/configuration' },
            { text: 'Development Guide', link: '/carento-react-native/development' },
            { text: 'API Integration', link: '/carento-react-native/api-integration' },
            { text: 'License Activation', link: '/carento-react-native/license-activation' },
        ],
    },
    {
        text: 'Quick Setup (5-15 min each)',
        items: [
            { text: '1. Theme Colors', link: '/carento-react-native/01_theme_colors' },
            { text: '2. App Font', link: '/carento-react-native/02_app_font' },
            { text: '3. App Name', link: '/carento-react-native/04_app_name' },
            { text: '4. App Logo', link: '/carento-react-native/05_app_logo' },
            { text: '5. API Base URL', link: '/carento-react-native/06_api_base_url' },
            { text: '6. Translations', link: '/carento-react-native/07_translations' },
            { text: '7. Running App', link: '/carento-react-native/08_running_app' },
            { text: '8. Deploying App', link: '/carento-react-native/09_deploying_app' },
            { text: '9. Version Management', link: '/carento-react-native/10_version_management' },
            { text: '10. Profile Links', link: '/carento-react-native/11_profile_links' },
            { text: '11. Splash Screen', link: '/carento-react-native/17_splash_screen' },
            { text: '12. Loading Screen', link: '/carento-react-native/18_loading_screen' },
            { text: '13. Onboarding', link: '/carento-react-native/onboarding' },
            { text: '14. Push Notifications', link: '/carento-react-native/push_notifications' },
        ],
    },
    {
        text: 'Social Login (30-60 min each)',
        items: [
            { text: 'Apple Sign-In', link: '/carento-react-native/13_apple_login_setup' },
            { text: 'Google Login', link: '/carento-react-native/14_google_login_setup' },
            { text: 'Facebook Login', link: '/carento-react-native/15_facebook_login_setup' },
            { text: 'Social Login Configuration', link: '/carento-react-native/16_social_login_configuration' },
        ],
    },
    {
        text: 'Help & Support',
        items: [
            { text: 'Support & Contact', link: '/carento-react-native/support' },
            { text: 'FAQ', link: '/carento-react-native/faq' },
            { text: 'Troubleshooting', link: '/carento-react-native/troubleshooting' },
            { text: 'Upgrade Guide', link: '/carento-react-native/upgrade' },
            { text: 'Release Notes', link: '/carento-react-native/releases' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];
