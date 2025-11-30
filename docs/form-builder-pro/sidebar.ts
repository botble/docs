import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/form-builder-pro/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/form-builder-pro/installation' },
            { text: 'Configuration', link: '/form-builder-pro/configuration' },
        ],
    },
    {
        text: 'User Guide',
        items: [
            { text: 'Creating Forms', link: '/form-builder-pro/creating-forms' },
            { text: 'Field Types', link: '/form-builder-pro/field-types' },
            { text: 'Multi-Step Forms', link: '/form-builder-pro/multi-step-forms' },
            { text: 'Form Actions', link: '/form-builder-pro/form-actions' },
            { text: 'Managing Submissions', link: '/form-builder-pro/submissions' },
            { text: 'Embedding Forms', link: '/form-builder-pro/embedding-forms' },
            { text: 'Reports & Analytics', link: '/form-builder-pro/reports' },
            { text: 'Best Practices', link: '/form-builder-pro/best-practices' },
        ],
    },
    {
        text: 'Updates',
        items: [
            { text: 'Release Notes', link: '/form-builder-pro/releases' },
            { text: 'Upgrade Guide', link: '/form-builder-pro/upgrade' },
        ],
    },
    {
        text: 'Support',
        items: [
            { text: 'Troubleshooting', link: '/form-builder-pro/troubleshooting' },
            { text: 'FAQ', link: '/form-builder-pro/faq' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];
