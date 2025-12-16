import {DefaultTheme} from 'vitepress';

export default [
    { text: 'Overview', link: '/bb-form-builder/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/bb-form-builder/installation' },
            { text: 'Configuration', link: '/bb-form-builder/configuration' },
        ],
    },
    {
        text: 'User Guide',
        items: [
            { text: 'Creating Forms', link: '/bb-form-builder/creating-forms' },
            { text: 'Field Types', link: '/bb-form-builder/field-types' },
            { text: 'Multi-Step Forms', link: '/bb-form-builder/multi-step-forms' },
            { text: 'Form Actions', link: '/bb-form-builder/form-actions' },
            { text: 'Managing Submissions', link: '/bb-form-builder/submissions' },
            { text: 'Embedding Forms', link: '/bb-form-builder/embedding-forms' },
            { text: 'Reports & Analytics', link: '/bb-form-builder/reports' },
            { text: 'Best Practices', link: '/bb-form-builder/best-practices' },
        ],
    },
    {
        text: 'Integration',
        items: [
            { text: 'Botble CMS Sites', link: '/bb-form-builder/integration' },
        ],
    },
    {
        text: 'Updates',
        items: [
            { text: 'Release Notes', link: '/bb-form-builder/releases' },
            { text: 'Upgrade Guide', link: '/bb-form-builder/upgrade' },
        ],
    },
    {
        text: 'Support',
        items: [
            { text: 'Troubleshooting', link: '/bb-form-builder/troubleshooting' },
            { text: 'FAQ', link: '/bb-form-builder/faq' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];
