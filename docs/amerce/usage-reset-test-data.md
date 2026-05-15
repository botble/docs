# Reset Test Data

After testing your store, you may want to clear all test orders, shipments, and related data before going live.

::: warning
Always back up your database before running any of these queries.
:::

## Reset Orders & Related Data

Run the following SQL queries in phpMyAdmin or any database management tool:

```sql
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE ec_orders;
TRUNCATE TABLE ec_order_addresses;
TRUNCATE TABLE ec_order_product;
TRUNCATE TABLE ec_order_product_tax_components;
TRUNCATE TABLE ec_order_histories;
TRUNCATE TABLE ec_order_metadata;
TRUNCATE TABLE ec_order_tax_information;
TRUNCATE TABLE ec_order_returns;
TRUNCATE TABLE ec_order_return_items;
TRUNCATE TABLE ec_order_return_histories;
TRUNCATE TABLE ec_order_referrals;
TRUNCATE TABLE ec_shipments;
TRUNCATE TABLE ec_shipment_histories;
TRUNCATE TABLE ec_invoices;
TRUNCATE TABLE ec_invoice_items;
TRUNCATE TABLE ec_invoice_item_tax_components;
TRUNCATE TABLE ec_cart;
TRUNCATE TABLE ec_abandoned_carts;
TRUNCATE TABLE ec_reviews;
TRUNCATE TABLE ec_review_replies;

SET FOREIGN_KEY_CHECKS = 1;
```

This clears:

- All orders, order returns, and order histories
- Shipments and shipment histories
- Invoices
- Cart and abandoned cart data
- Product reviews

**Reports and dashboard stats** are generated from orders, so they reset automatically once orders are cleared.

After running the queries, go to **Admin → Platform administration → Cache management** and clear cache.

## Reset Product IDs

If you want product IDs to start from #1 again, you must remove all products first:

```sql
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE ec_products;
TRUNCATE TABLE ec_product_translations;
TRUNCATE TABLE ec_product_variations;
TRUNCATE TABLE ec_product_variation_items;

SET FOREIGN_KEY_CHECKS = 1;
```

::: tip
MySQL auto-increment counters only reset when a table is truncated or emptied. You cannot reset the ID sequence while existing products remain in the table.
:::

After truncating, re-add your products manually or via **Admin → Tools → Import/Export Data**.
