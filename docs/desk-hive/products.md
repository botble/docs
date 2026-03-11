# Products

Products represent the software items your customers purchase and request support for. Associating a ticket with a product helps route and prioritise support, and enables purchase/license verification before ticket submission.

## Product Fields

| Field | Description |
|-------|-------------|
| Name | Product display name |
| Description | Short product description |
| Image | Product thumbnail |
| Site URL | Link to the product's website or marketplace listing |
| Price | Product price (display only) |
| Envato ID | Envato marketplace item ID (for Envato integration) |
| License Manager Product ID | Product ID from the Botble License Manager |
| Verification Provider | Source used to verify purchases (`envato` or `license_manager`) |
| Status | Published or Draft |
| Agents | Agents assigned to handle support for this product |

## Managing Products

Navigate to **Admin → Support Desk → Products**.

### Creating a Product

1. Navigate to **Admin → Support Desk → Products**
2. Click **Create**
3. Fill in name, description, and other details
4. Set the **Status** to Published
5. Assign agents who handle this product
6. Click **Save**

### Importing from Envato

If Envato integration is configured, you can import products directly from your Envato portfolio:

1. Navigate to **Admin → Support Desk → Products**
2. Click **Import from Envato**
3. Your Envato items are fetched using your personal token and imported as products

Imported products have their **Envato ID** pre-filled and the verification provider set to `envato`.

## Purchase Verification

When a customer submits a ticket for a product, DeskHive can require them to verify ownership before the ticket is accepted.

### Envato Verification

Requires a valid Envato purchase code for the selected product.

**Setup:**
1. Navigate to **Admin → Support Desk → Settings → Envato**
2. Enable **Envato Integration**
3. Enter your **Envato Personal Token** (generated at [build.envato.com](https://build.envato.com))
4. Optionally enable **Require purchase code** — customers must enter a purchase code when submitting a ticket for an Envato product
5. Optionally enable **Block expired support** — tickets are rejected if the customer's support period has expired

When a purchase code is submitted, DeskHive calls the Envato API to verify it belongs to the correct item and records the verification data on the ticket.

### License Manager Verification

Requires a valid license code verified against the [Botble License Manager](https://license-manager.botble.com).

**Setup:**
1. Navigate to **Admin → Support Desk → Settings → License Manager**
2. Enable **License Manager Integration**
3. Enter the **API URL** of your License Manager instance (e.g., `https://licenses.example.com`)
4. Enter the **API Key** (an internal API key from your License Manager)
5. Optionally enable **Require license code** — customers must enter a license code when submitting a ticket for a License Manager product

When a license code is submitted, DeskHive calls the License Manager API to verify it is valid and active, then records the license data on the ticket.

## Assigning Agents to Products

Each product can have one or more agents assigned to it. In the agent portal, agents see tickets for products they are assigned to. Assign agents when creating or editing a product.

## Viewing Product Tickets

From the admin ticket list, filter by product to see all tickets related to a specific product. The product name is also shown on each ticket detail page.
