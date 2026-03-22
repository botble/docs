import { DefaultTheme } from 'vitepress'

export default [
    { text: 'Overview', link: '/snapcart/' },
    {
        text: 'Prologue',
        items: [
            { text: 'Release Notes', link: '/snapcart/releases' },
            { text: 'Upgrade Guide', link: '/snapcart/upgrade' },
        ],
    },
    {
        text: 'Getting Started',
        items: [
            {
                text: 'Installation',
                items: [
                    { text: 'Requirements', link: '/snapcart/installation-requirements' },
                    { text: 'Using web interface', link: '/snapcart/installation-web-interface' },
                    { text: 'Using command line', link: '/snapcart/installation-command-line' },
                    { text: 'Using Docker', link: '/snapcart/installation-using-docker' },
                ],
            },
            { text: 'SSL', link: '/snapcart/ssl' },
            { text: 'License', link: '/snapcart/license' },
        ],
    },
    {
        text: 'Usage',
        items: [
            { text: 'Homepage', link: '/snapcart/usage-homepage' },
            { text: 'UI Block', link: '/snapcart/usage-ui-block' },
            { text: 'Menu', link: '/snapcart/usage-menu' },
            { text: 'Theme Options', link: '/snapcart/usage-theme-options' },
            { text: 'Widgets', link: '/snapcart/usage-widgets' },
            { text: 'Custom CSS/JS', link: '/snapcart/usage-custom-css-js' },
            { text: 'Multi-language', link: '/snapcart/usage-multi-language' },
            { text: 'Translation', link: '/snapcart/plugin-translation' },
            { text: 'Facebook Pixel', link: '/snapcart/usage-facebook-pixel' },
            { text: 'Google Tag Manager', link: '/snapcart/usage-google-tag-manager' },
            { text: 'Google Analytics', link: '/snapcart/usage-analytics' },
            { text: 'Media - Setup Amazon S3', link: '/snapcart/usage-media-s3' },
            { text: 'Media - Setup BunnyCDN', link: '/snapcart/usage-media-bunnycdn' },
            { text: 'Media - Setup Wasabi', link: '/snapcart/usage-media-wasabi' },
            { text: 'Setup email', link: '/snapcart/usage-email' },
            { text: 'Currencies', link: '/snapcart/usage-currencies' },
            { text: 'Setup social login', link: '/snapcart/usage-social-login' },
            { text: 'Location', link: '/snapcart/usage-location' },
            { text: 'Invoice template', link: '/snapcart/invoice-template' },
            { text: 'Ads', link: '/snapcart/usage-ads' },
            { text: 'Setup cronjob', link: '/snapcart/cronjob' },
            { text: 'Newsletter', link: '/snapcart/usage-newsletter' },
            { text: 'Floating Contact', link: '/snapcart/usage-floating-contact' },
            { text: 'Delivery Time Picker', link: '/snapcart/usage-delivery-time-picker' },
            { text: 'Shipping by Location', link: '/snapcart/usage-shipping-by-location' },
            { text: 'Shippo Integration', link: '/snapcart/usage-shippo' },
            { text: 'Add to Cart via URL', link: '/snapcart/usage-add-to-cart-url' },
        ],
    },
    {
        text: 'API',
        items: [
            { text: 'General API', link: '/snapcart/api' },
            { text: 'Ecommerce API', link: '/snapcart/usage-ecommerce-api' },
        ],
    },
    {
        text: 'Ecommerce',
        items: [
            { text: 'Discounts & Coupons', link: '/snapcart/usage-discounts-coupons' },
            { text: 'Tax', link: '/snapcart/usage-tax' },
            { text: 'Flash Sales', link: '/snapcart/usage-flash-sales' },
            { text: 'Payment Gateways', link: '/snapcart/usage-payment-gateways' },
            { text: 'Order Management', link: '/snapcart/usage-order-management' },
            { text: 'Order Returns', link: '/snapcart/usage-order-returns' },
            { text: 'Shipping Methods', link: '/snapcart/usage-shipping-methods' },
            { text: 'Invoices', link: '/snapcart/usage-invoices' },
            { text: 'Webhooks', link: '/snapcart/usage-webhooks' },
        ],
    },
    {
        text: 'Products',
        items: [
            { text: 'Product Variations', link: '/snapcart/usage-product-variations' },
            { text: 'Product Specifications', link: '/snapcart/usage-product-specifications' },
            { text: 'Product Options', link: '/snapcart/usage-product-options' },
            { text: 'Product Import/Export', link: '/snapcart/usage-product-import-export' },
        ],
    },
    {
        text: 'Customers',
        items: [
            { text: 'Reviews', link: '/snapcart/usage-reviews' },
            { text: 'Wishlist & Compare', link: '/snapcart/usage-wishlist-compare' },
            { text: 'Customer Management', link: '/snapcart/usage-customer-management' },
        ],
    },
] satisfies DefaultTheme.SidebarItem[]
