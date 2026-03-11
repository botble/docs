# Frequently Asked Questions

## General

### Does Desk Hive require the Envato marketplace?

No. Envato integration is entirely optional. You can run Desk Hive without any Envato account. Purchase code verification is only active if you enable it in **Settings → Envato** and assign an Envato ID to a product.

### Can customers submit tickets without logging in?

No. Ticket submission requires a customer account. Customers can browse the knowledge base without logging in, but must register or log in to submit or view tickets.

### Can I disable customer self-registration?

Yes. Go to **Admin → Support Desk → Settings → Customer Portal** and turn off **Customer registration**. When disabled, only admin-created customer accounts can log in.

### What is the difference between agents and admin users?

Admin users access the full Botble CMS admin panel (`/admin`) and have access to all management features. Agents access only the dedicated agent portal (`/support/agent`) with a focused ticket-handling interface. Agents cannot access the admin panel.

### Can an agent also be an admin user?

No. Agents and admin users are separate account types with separate login credentials. A person who needs both admin and agent access would use two separate accounts.

### How many agents can I create?

There is no built-in limit on the number of agents.

## Tickets

### Can a ticket be assigned to multiple agents?

A ticket has one primary **Assigned To** field (an admin user), but can also be associated with multiple agents through the agent portal. Agents are linked to tickets via the `sd_ticket_agent` table, which is how the agent portal determines ticket visibility.

### What happens when a ticket is auto-closed?

When the **Auto close days** threshold is reached with no activity, the ticket status is set to **Closed**. The customer can reopen it by replying, which creates a new message and updates the ticket status back to **Open**.

### Can customers reopen a closed ticket?

Yes. When a customer posts a reply on a closed ticket, the ticket is automatically reopened.

### Are file attachments supported?

Yes. Both customers and agents can attach files when submitting or replying to tickets. Agents can also delete attachments. Downloads are served through authenticated endpoints to prevent unauthorised access.

## Knowledge Base

### Is the knowledge base visible to guests (not logged in)?

Yes. The knowledge base at `/support/knowledge-base` is publicly accessible. No login is required to browse categories, read articles, or search. Login is required to vote on whether an article was helpful.

### Can I have articles in multiple categories?

No. Each article belongs to exactly one category. If you need an article to appear in multiple places, consider linking to it from other articles or duplicating it.

## Envato Integration

### What does "require purchase code" mean?

When enabled, customers must enter a valid Envato purchase code when submitting a ticket for an Envato product. The code is verified against the Envato API using your personal token. If the code is invalid or belongs to a different item, the ticket is rejected.

### What does "block expired support" mean?

Envato purchases include a support period (typically 6 months). When this option is enabled, customers whose support period has expired cannot submit new tickets for that product.

### How do I get an Envato Personal Token?

Go to [build.envato.com](https://build.envato.com) and create a personal token with the **View and search Envato sites** and **View the user's items' purchase data** permissions.

## License Manager Integration

### What is the License Manager integration?

Desk Hive can connect to the [Botble License Manager](https://license-manager.botble.com) plugin to verify license codes before ticket submission. When enabled and a product has a License Manager Product ID set, customers must enter a valid, active license code to submit a ticket for that product.

### Can I use both Envato and License Manager verification?

Each product uses one verification provider — either `envato` or `license_manager`. You can have different products using different providers in the same installation.

## Email Notifications

### Which events trigger email notifications?

| Event | Who receives it |
|-------|----------------|
| New ticket submitted | Agents assigned to the department (if enabled) |
| Customer replies | Assigned agents (if enabled) |
| Agent replies | The ticket's customer (if enabled) |
| Status changes | The ticket's customer (if enabled) |
| Ticket assigned | The newly assigned agent |

### Can I override the sender email address?

Set the **Notification email** field in **Admin → Support Desk → Settings → Notifications** to override the default `FROM` address for outgoing notifications. If left empty, the system default mail address from your `.env` configuration is used.

## Social Login

### Can customers link a social account to an existing password account?

If a customer attempts social login with an email that already exists in the system, they are logged in to the existing account. The accounts are merged by email address automatically.

### What if a customer registered via social login and wants to set a password?

They can set a password from **Customer Portal → Settings → Password**. After setting a password, they can log in with either method.
