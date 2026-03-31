# Agents

Agents are support staff who respond to tickets through the dedicated agent portal. They are separate from admin panel users and have a focused interface with only the tools they need.

## Agent Accounts

| Field | Description |
|-------|-------------|
| Name | Agent's display name |
| Email | Unique email address used for login |
| Password | Hashed authentication password |
| Phone | Optional phone number |
| Avatar | Profile photo (auto-generated from name if not set) |
| Active | Whether the agent can log in |
| Departments | Departments the agent belongs to |
| Products | Products the agent handles |
| Notification Settings | Per-agent email notification preferences |

## Managing Agents

Navigate to **Admin → Support Desk → Agents**.

### Creating an Agent

1. Navigate to **Admin → Support Desk → Agents**
2. Click **Create**
3. Fill in name, email, and password
4. Select the departments and products the agent handles
5. Set **Active** to enabled
6. Click **Save**

The agent receives login credentials and can access the agent portal at `/support/agent/dashboard`.

### Inviting an Agent

Instead of creating an agent manually, you can send an email invitation:

1. Navigate to **Admin → Support Desk → Agents**
2. Click **Invite**
3. Enter the agent's email address
4. Click **Send Invitation**

The agent receives an email with a link to set up their account. Invitations expire after a configurable period. Track invitation status (pending, accepted, rejected, expired) from the agent list.

### Editing an Agent

1. Click **Edit** on an agent row
2. Update fields, departments, or products
3. Click **Save**

### Deactivating an Agent

Set the agent's **Active** status to disabled to prevent login while preserving their ticket history and assignments.

## Agent Portal

The agent portal is a dedicated interface for support staff, separate from the admin panel. Agents access it at `/support/agent/dashboard`.

### Portal URLs

| Page | Path | Description |
|------|------|-------------|
| Dashboard | `/support/agent/dashboard` | Overview and stats |
| Tickets | `/support/agent/tickets` | Ticket queue |
| Ticket Detail | `/support/agent/tickets/{reference-id}` | Full ticket thread |
| Settings | `/support/agent/settings` | Agent account settings |

### Dashboard

The agent dashboard shows a summary of the agent's ticket workload including tickets needing response and recent activity.

### Ticket Queue

Agents see only tickets from their assigned departments. The ticket list supports filtering by status, priority, and other fields.

### Working with Tickets

From the ticket detail view, agents can:

- Read and reply to the ticket thread
- Insert canned responses using keyboard shortcuts
- Search the knowledge base and insert article links
- Update status, priority, department, category, product, and labels
- Close or delete tickets
- Mark tickets as needing response
- Mark tickets as favourites
- Download attachments
- Unassign themselves from a ticket (with confirmation and redirect)
- Like replies in the ticket thread
- Refresh Envato/license verification data

### Bulk Close

From the agent ticket list, select multiple tickets and use **Bulk Close** to close them all at once.

### Notifications

Agents receive in-portal notifications for:

- New tickets assigned to them
- Customer replies on their tickets
- Status changes on their tickets

The notification bell in the agent portal header shows the unread count. Agents can mark notifications as read individually or all at once.

Per-agent notification preferences are configurable in **Agent Portal → Settings → Notifications**.

### API Keys

Agents can generate personal API keys in **Agent Portal → Settings → API Keys**. These keys allow external integrations to act on behalf of the agent via the REST API.

### Agent Settings

Agents can update their own profile at `/support/agent/settings`:

- Name and phone
- Email
- Password
- Avatar
- Preferred language
- Notification preferences
- API keys

### Password Reset

Agents can reset their forgotten password:

1. Click **Forgot Password** on the agent login page
2. Enter their registered email
3. Receive a password reset link by email
4. Set a new password

The password reset flow is at `/support/agent/forgot-password`.

### Ticket Escalation

Agents can escalate tickets that need admin attention:

1. Open the ticket detail view
2. Click **Escalate** in the action bar
3. Choose an escalation level and enter a reason
4. The admin is notified via email and in-app alert

Escalated tickets show a badge in the agent portal. See [Tickets](tickets.md#ticket-escalation) for more details.

### Internal Chat

Agents can discuss escalated tickets privately using the internal chat feature. Access it from the ticket detail view — only agents can see these messages, not customers.

Navigate to **Agent Portal → Tickets → {ticket} → Internal Chat** to view and send messages.

## Assigning Tickets to Agents

- **Manual**: Set the **Assigned To** field on any ticket in the admin panel
- **Auto-assign**: Enable in **Admin → Support Desk → Settings → General** to automatically assign tickets to agents based on department

## Ticket Visibility

By default, agents only see tickets that are directly assigned to them.

### Department-Based Visibility

When enabled, agents see **all tickets** in their assigned departments — not just tickets assigned to them personally. This is useful for teams that share workload.

Enable this in **Admin → Support Desk → Settings → General → Enable department-based ticket visibility** (off by default).

::: tip
When department-based visibility is enabled and auto-assign is also enabled, agents see both their personally assigned tickets and all unassigned tickets in their departments.
:::
