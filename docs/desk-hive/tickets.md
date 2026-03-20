# Tickets

Tickets are the core of DeskHive. Customers submit tickets through the customer portal; agents respond through the agent portal; admins manage everything from the admin panel.

## Ticket Fields

| Field | Description |
|-------|-------------|
| Reference ID | Auto-generated unique identifier (e.g., `#1001`) |
| Title | Short description of the issue |
| Content | Full description of the issue |
| Department | Team responsible for the ticket |
| Category | Ticket category |
| Product | Associated product (optional) |
| Priority | Low, Medium, High, or Critical |
| Status | Open, In Progress, On Hold, or Closed |
| Assigned To | Admin user responsible for the ticket |
| Labels | One or more color-coded labels |
| Customer | The customer who submitted the ticket |

## Ticket Statuses

| Status | Color | Description |
|--------|-------|-------------|
| Open | Blue | Newly submitted, awaiting response |
| In Progress | Cyan | Being actively worked on |
| On Hold | Amber | Waiting for customer response or external action |
| Closed | Green | Resolved and closed |

## Ticket Priorities

| Priority | Color | Description |
|----------|-------|-------------|
| Low | Cyan | Non-urgent issue |
| Medium | Amber | Standard issue |
| High | Red | Urgent issue |
| Critical | Red | Severe issue requiring immediate attention |

## Admin Panel

Navigate to **Admin → Support Desk → Tickets**.

### Viewing Tickets

The ticket list shows all tickets with their status, priority, department, assigned agent, and last reply time. Use the filters to narrow down by status, priority, department, category, or date range.

### Viewing a Ticket

Click on any ticket to open the detail view. From here you can:

- Read the full ticket thread
- Post a reply
- Change status, priority, department, category, or product
- Assign to an agent
- Add or remove labels
- View custom field values
- See the activity log for the ticket

### Replying to a Ticket

1. Open the ticket
2. Type your reply in the message box
3. Attach files if needed
4. Click **Send**

The customer receives an email notification (if enabled in settings).

### Reply Reactions

Agents and customers can like individual replies in a ticket thread. The like count is displayed on each message. This helps highlight helpful responses and provides feedback to support agents.

### Assigning Tickets

Set the **Assigned To** field on a ticket to route it to a specific admin user. The assigned agent receives an email notification.

For automatic assignment, enable **Auto-assign** in **Settings → General**. Tickets are automatically assigned based on department membership.

### Changing Status

Change the ticket status from the detail view using the status dropdown. A **Closed** ticket can be reopened by the customer replying to it.

### Adding Labels

Labels provide additional tagging beyond categories. Assign one or more labels to a ticket from the detail view. Create labels at **Admin → Support Desk → Labels**.

### Locking Tickets

Lock a ticket to prevent further customer replies. Locked tickets are read-only for customers.

### Bulk Actions

From the ticket list, select multiple tickets and use the bulk action menu to:

- Change status
- Delete tickets

## Auto-Close

Tickets can be automatically closed after a configurable period of inactivity. Configure **Auto close days** in **Settings → General** (0 = disabled).

## Dashboard Widgets

The admin dashboard shows three ticket widgets:

| Widget | Description |
|--------|-------------|
| Open Tickets | Count of tickets with status "Open" |
| Tickets Today | Count of tickets created today |
| Unassigned Tickets | Count of open tickets with no assigned agent |

## Customer Portal

Customers access tickets at `/support/tickets`.

### Submitting a Ticket

1. Log in to the customer portal
2. Click **New Ticket**
3. Fill in the title, description, department, category, and any custom fields
4. If Envato integration is enabled, enter a purchase code when prompted
5. If License Manager integration is enabled, enter a license code when prompted
6. Attach files if needed
7. Click **Submit**

### Tracking a Ticket

Customers can view all their tickets and the full reply thread at `/support/tickets/{reference-id}`. They can post replies and download attachments.

## Agent Portal

Agents access tickets at `/support/agent/tickets`. See [Agents](agents.md) for details on the agent portal.
