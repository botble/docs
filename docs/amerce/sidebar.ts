import { DefaultTheme } from 'vitepress'

export default [
    { text: 'Overview', link: '/amerce/' },
    {
        text: 'Prologue',
        items: [
            { text: 'Release Notes', link: '/amerce/releases' },
            { text: 'Upgrade Guide', link: '/amerce/upgrade' },
        ],
    },
    {
        text: 'Getting Started',
        items: [
            {
                text: 'Installation',
                items: [
                    { text: 'Requirements', link: '/amerce/installation-requirements' },
                    { text: 'Using web interface', link: '/amerce/installation-web-interface' },
                    { text: 'Using command line', link: '/amerce/installation-command-line' },
                    { text: 'Using Docker', link: '/amerce/installation-using-docker' },
                ],
            },
            { text: 'SSL', link: '/amerce/ssl' },
            { text: 'License', link: '/amerce/license' },
        ],
    },
    {
        text: 'Usage',
        items: [
            { text: 'Homepage', link: '/amerce/usage-homepage' },
            { text: 'Coming soon page', link: '/amerce/usage-coming-soon-page' },
            { text: 'Breadcrumb', link: '/amerce/usage-breadcrumb' },
            { text: 'UI Block', link: '/amerce/usage-ui-block' },
            { text: 'Menu', link: '/amerce/usage-menu' },
            { text: 'Theme options', link: '/amerce/usage-theme-options' },
            { text: 'Widgets', link: '/amerce/usage-widgets' },
            { text: 'Custom CSS/JS', link: '/amerce/usage-custom-css-js' },
            { text: 'Multi-language', link: '/amerce/usage-multi-language' },
            { text: 'Translation', link: '/amerce/plugin-translation' },
            { text: 'Facebook Pixel', link: '/amerce/usage-facebook-pixel' },
            { text: 'Google Tag Manager', link: '/amerce/usage-google-tag-manager' },
            { text: 'Google Analytics', link: '/amerce/usage-analytics' },
            { text: 'Media - Setup Amazon S3', link: '/amerce/usage-media-s3' },
            { text: 'Media - Setup BunnyCDN', link: '/amerce/usage-media-bunnycdn' },
            { text: 'Media - Setup Wasabi', link: '/amerce/usage-media-wasabi' },
            { text: 'Setup email', link: '/amerce/usage-email' },
            { text: 'Currencies', link: '/amerce/usage-currencies' },
            { text: 'Setup social login', link: '/amerce/usage-social-login' },
            { text: 'Location', link: '/amerce/usage-location' },
            { text: 'Invoice template', link: '/amerce/invoice-template' },
            { text: 'Ads', link: '/amerce/usage-ads' },
            { text: 'Setup cronjob', link: '/amerce/cronjob' },
            { text: 'Newsletter', link: '/amerce/usage-newsletter' },
            { text: 'Abandoned Carts', link: '/amerce/usage-abandoned-carts' },
            { text: 'Cart Persistence', link: '/amerce/usage-cart-persistence' },
            { text: 'Shipping by Location', link: '/amerce/usage-shipping-by-location' },
            { text: 'Shippo Integration', link: '/amerce/usage-shippo' },
            { text: 'Add to Cart via URL', link: '/amerce/usage-add-to-cart-url' },
        ],
    },
    {
        text: 'API',
        items: [
            { text: 'General API', link: '/amerce/api' },
            { text: 'Ecommerce API', link: '/amerce/usage-ecommerce-api' },
        ],
    },
    {
        text: 'Ecommerce',
        items: [
            { text: 'Discounts & Coupons', link: '/amerce/usage-discounts-coupons' },
            { text: 'Tax', link: '/amerce/usage-tax' },
            { text: 'Flash Sales', link: '/amerce/usage-flash-sales' },
            { text: 'Payment Gateways', link: '/amerce/usage-payment-gateways' },
            { text: 'Order Management', link: '/amerce/usage-order-management' },
            { text: 'Order Returns', link: '/amerce/usage-order-returns' },
            { text: 'Shipping Methods', link: '/amerce/usage-shipping-methods' },
            { text: 'Invoices', link: '/amerce/usage-invoices' },
            { text: 'Webhooks', link: '/amerce/usage-webhooks' },
            { text: 'Reset Test Data', link: '/amerce/usage-reset-test-data' },
        ],
    },
    {
        text: 'Products',
        items: [
            { text: 'Product Variations', link: '/amerce/usage-product-variations' },
            { text: 'Product Specifications', link: '/amerce/usage-product-specifications' },
            { text: 'Product Options', link: '/amerce/usage-product-options' },
            { text: 'Product Import/Export', link: '/amerce/usage-product-import-export' },
            { text: 'Digital Products', link: '/amerce/usage-digital-products' },
        ],
    },
    {
        text: 'Customers',
        items: [
            { text: 'Reviews', link: '/amerce/usage-reviews' },
            { text: 'Wishlist & Compare', link: '/amerce/usage-wishlist-compare' },
            { text: 'Customer Management', link: '/amerce/usage-customer-management' },
        ],
    },
    {
        text: 'Marketplace',
        items: [
            { text: 'Marketplace Setup', link: '/amerce/usage-marketplace-setup' },
            { text: 'Commissions', link: '/amerce/usage-marketplace-commissions' },
            { text: 'Vendor Withdrawals', link: '/amerce/usage-marketplace-withdrawals' },
        ],
    },
    {
        text: 'Developer',
        items: [
            { text: 'Product Detail Hooks', link: '/amerce/developer-product-detail-hooks' },
            { text: 'Payment Gateway Integration', link: '/amerce/developer-payment-gateway' },
            { text: 'Shipping Provider Integration', link: '/amerce/developer-shipping-provider' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[]
