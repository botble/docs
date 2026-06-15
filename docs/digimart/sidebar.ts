import { DefaultTheme } from 'vitepress';

export default [
    { text: 'Overview', link: '/digimart/' },
    {
        text: 'Getting Started',
        items: [
            { text: 'Requirements', link: '/digimart/installation-requirements' },
            { text: 'Install via Web', link: '/digimart/installation-web-interface' },
            { text: 'Install via CLI', link: '/digimart/installation-command-line' },
            { text: 'License Activation', link: '/digimart/license' },
        ],
    },
    {
        text: 'Admin Guide',
        items: [
            { text: 'Dashboard', link: '/digimart/admin-dashboard' },
            { text: 'Marketplace Settings', link: '/digimart/settings' },
            { text: 'Categories & Tags', link: '/digimart/categories-and-tags' },
            { text: 'Authors & Approvals', link: '/digimart/authors' },
            { text: 'Products & Versions', link: '/digimart/products' },
            { text: 'Ratings & Reviews', link: '/digimart/ratings' },
            { text: 'Product Licensing', link: '/digimart/licensing' },
            { text: 'Virus Scanning', link: '/digimart/virus-scanning' },
        ],
    },
    {
        text: 'Author Guide',
        items: [
            { text: 'Becoming an Author', link: '/digimart/become-author' },
            { text: 'Publishing Products', link: '/digimart/publishing-products' },
        ],
    },
    {
        text: 'Developer',
        items: [
            { text: 'REST API', link: '/digimart/api' },
            { text: 'Console Commands', link: '/digimart/commands' },
        ],
    },
    {
        text: 'More',
        items: [
            { text: 'FAQ', link: '/digimart/faq' },
            { text: 'Changelog', link: '/digimart/changelog' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[];
