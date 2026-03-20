# Customers

Customers are the end users who submit support tickets. DeskHive provides both admin management and a self-service customer portal.

## Customer Accounts

| Field | Description |
|-------|-------------|
| Name | Customer's display name |
| Email | Unique email address used for login |
| Password | Hashed authentication password |
| Phone | Optional phone number |
| Avatar | Profile photo |
| Envato Username | Linked Envato account username |
| Envato ID | Linked Envato account ID |
| Blocked | Whether the customer is blocked from submitting tickets |
| Block Reason | Reason shown when a blocked customer tries to act |

## Managing Customers

Navigate to **Admin → Support Desk → Customers**.

### Creating a Customer

Customers typically self-register through the customer portal. To create one manually:

1. Navigate to **Admin → Support Desk → Customers**
2. Click **Create**
3. Fill in name, email, and password
4. Click **Save**

### Editing a Customer

1. Click **Edit** on a customer row
2. Update fields as needed
3. Click **Save**

### Blocking a Customer

Blocking prevents a customer from submitting new tickets or posting replies.

1. Open a customer record
2. Click **Block**
3. Enter a reason for the block
4. Click **Confirm**

To unblock: open the customer record and click **Unblock**.

### Deleting a Customer

Deleting a customer does not delete their tickets. Tickets remain in the system without a customer association.

## Customer Portal

The customer portal is accessible at `/support`. Customers can log in, register, browse the knowledge base, submit tickets, and manage their account.

### Portal URLs

| Page | Path | Description |
|------|------|-------------|
| Homepage | `/support` | Public support homepage |
| Login | `/login` | Customer login |
| Register | `/register` | Customer registration |
| Forgot Password | `/forgot-password` | Password reset request |
| Dashboard | `/support/dashboard` | Customer dashboard |
| Tickets | `/support/tickets` | Ticket list and submission |
| Knowledge Base | `/support/knowledge-base` | Article browser |
| Settings | `/support/settings` | Account settings |

### Registration

If **Customer registration** is enabled in settings, customers can self-register at `/register`. To disable self-registration and require admin-created accounts, turn off **Customer registration** in **Admin → Support Desk → Settings → Customer Portal**.

### Portal Pages

Control which pages appear in the customer portal sidebar:

| Setting | Description |
|---------|-------------|
| Show Tickets page | Toggle the Tickets section in the portal |
| Show Knowledge Base page | Toggle the Knowledge Base section in the portal |

When a page is disabled, its sidebar link is hidden.

### Ticket Submission Limit

Set **Max tickets per day** in settings to limit how many tickets a customer can submit in a 24-hour period. Set to 0 for unlimited.

### Account Settings

Customers can update their profile at `/support/settings`:

- Name
- Email
- Password
- Avatar / profile photo
- Preferred language

## Authentication

### Login

Customers log in at `/login` with email and password.

### Social Login

Customers can also sign in with Google, Facebook, GitHub, LinkedIn, X (Twitter), or Envato. See [Social Login](social-login.md) for setup instructions.

### Password Reset

1. Click **Forgot Password** at the login page
2. Enter email address
3. Receive a reset link by email
4. Set a new password

## Email Notifications

Customers receive email notifications for:

- New ticket confirmation
- Agent reply on their ticket
- Ticket status change

Configure notification behaviour in **Admin → Support Desk → Settings → Notifications**.
