import { DefaultTheme } from 'vitepress'

export default [
    { text: 'Overview', link: '/shofy/' },
    {
        text: 'Prologue',
        items: [
            { text: 'Release Notes', link: '/shofy/releases' },
            { text: 'Upgrade Guide', link: '/shofy/upgrade' },
        ],
    },
    {
        text: 'Getting Started',
        items: [
            {
                text: 'Installation',
                items: [
                    { text: 'Requirements', link: '/shofy/installation-requirements' },
                    { text: 'Using web interface', link: '/shofy/installation-web-interface' },
                    { text: 'Using command line', link: '/shofy/installation-command-line' },
                    { text: 'Using Docker', link: '/shofy/installation-using-docker' },
                ],
            },
            { text: 'SSL', link: '/shofy/ssl' },
            { text: 'License', link: '/shofy/license' },
        ],
    },
    {
        text: 'Usage',
        items: [
            { text: 'Homepage', link: '/shofy/usage-homepage' },
            { text: 'Coming soon page', link: '/shofy/usage-coming-soon-page' },
            { text: 'Breadcrumb', link: '/shofy/usage-breadcrumb' },
            { text: 'UI Block', link: '/shofy/usage-ui-block' },
            { text: 'Menu', link: '/shofy/usage-menu' },
            { text: 'Theme options', link: '/shofy/usage-theme-options' },
            { text: 'Widgets', link: '/shofy/usage-widgets' },
            { text: 'Custom CSS/JS', link: '/shofy/usage-custom-css-js' },
            { text: 'Multi-language', link: '/shofy/usage-multi-language' },
            { text: 'Translation', link: '/shofy/plugin-translation' },
            { text: 'Facebook Pixel', link: '/shofy/usage-facebook-pixel' },
            { text: 'Google Tag Manager', link: '/shofy/usage-google-tag-manager' },
            { text: 'Google Analytics', link: '/shofy/usage-analytics' },
            { text: 'Media - Setup Amazon S3', link: '/shofy/usage-media-s3' },
            { text: 'Media - Setup BunnyCDN', link: '/shofy/usage-media-bunnycdn' },
            { text: 'Media - Setup Wasabi', link: '/shofy/usage-media-wasabi' },
            { text: 'Setup email', link: '/shofy/usage-email' },
            { text: 'Currencies', link: '/shofy/usage-currencies' },
            { text: 'Setup social login', link: '/shofy/usage-social-login' },
            { text: 'Location', link: '/shofy/usage-location' },
            { text: 'Invoice template', link: '/shofy/invoice-template' },
            { text: 'Ads', link: '/shofy/usage-ads' },
            { text: 'Setup cronjob', link: '/shofy/cronjob' },
            { text: 'Newsletter', link: '/shofy/usage-newsletter' },
            { text: 'Abandoned Carts', link: '/shofy/usage-abandoned-carts' },
            { text: 'Cart Persistence', link: '/shofy/usage-cart-persistence' },
            { text: 'Shipping by Location', link: '/shofy/usage-shipping-by-location' },
            { text: 'Shippo Integration', link: '/shofy/usage-shippo' },
            { text: 'Add to Cart via URL', link: '/shofy/usage-add-to-cart-url' },
        ],
    },
    {
        text: 'API',
        items: [
            { text: 'General API', link: '/shofy/api' },
            { text: 'Ecommerce API', link: '/shofy/usage-ecommerce-api' },
        ],
    },
    {
        text: 'Ecommerce',
        items: [
            { text: 'Discounts & Coupons', link: '/shofy/usage-discounts-coupons' },
            { text: 'Tax', link: '/shofy/usage-tax' },
            { text: 'Flash Sales', link: '/shofy/usage-flash-sales' },
            { text: 'Payment Gateways', link: '/shofy/usage-payment-gateways' },
            { text: 'Order Management', link: '/shofy/usage-order-management' },
            { text: 'Order Returns', link: '/shofy/usage-order-returns' },
            { text: 'Shipping Methods', link: '/shofy/usage-shipping-methods' },
            { text: 'Invoices', link: '/shofy/usage-invoices' },
            { text: 'Webhooks', link: '/shofy/usage-webhooks' },
        ],
    },
    {
        text: 'Products',
        items: [
            { text: 'Product Variations', link: '/shofy/usage-product-variations' },
            { text: 'Product Specifications', link: '/shofy/usage-product-specifications' },
            { text: 'Product Options', link: '/shofy/usage-product-options' },
            { text: 'Product Import/Export', link: '/shofy/usage-product-import-export' },
            { text: 'Digital Products', link: '/shofy/usage-digital-products' },
        ],
    },
    {
        text: 'Customers',
        items: [
            { text: 'Reviews', link: '/shofy/usage-reviews' },
            { text: 'Wishlist & Compare', link: '/shofy/usage-wishlist-compare' },
            { text: 'Customer Management', link: '/shofy/usage-customer-management' },
        ],
    },
    {
        text: 'Marketplace',
        items: [
            { text: 'Marketplace Setup', link: '/shofy/usage-marketplace-setup' },
            { text: 'Commissions', link: '/shofy/usage-marketplace-commissions' },
            { text: 'Vendor Withdrawals', link: '/shofy/usage-marketplace-withdrawals' },
        ],
    },
    {
        text: 'Developer',
        items: [
            { text: 'Payment Gateway Integration', link: '/shofy/developer-payment-gateway' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[]
