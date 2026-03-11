# Installation via Web Interface

DeskHive includes a web-based installer for easy setup.

## Step 1: Upload Files

1. Download the package from CodeCanyon
2. Extract and upload all files to your server
3. Set directory permissions:

```bash
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

## Step 2: Run Web Installer

Access the installer at:

```
https://your-domain.com/install
```

The installer will guide you through:

1. **System Requirements Check** - Verifies PHP version, extensions, and permissions
2. **Database Configuration** - Enter MySQL/MariaDB credentials
3. **Admin Account Setup** - Create your administrator account
4. **Installation Complete** - Database tables created and configured

## Step 3: Activate the Plugin

After installation, activate the Support Desk plugin:

1. Navigate to **Admin → Plugins**
2. Find **Support Desk** in the list
3. Click **Activate**

The plugin creates all required database tables on activation.

## Step 4: Initial Configuration

After activation, configure DeskHive at **Admin → Support Desk → Settings**:

### General Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Default department | None | Department automatically assigned to new tickets |
| Default priority | None | Priority automatically assigned to new tickets |
| Auto close days | 0 | Days of inactivity before a ticket is auto-closed (0 = disabled) |
| Enable auto-assign | On | Automatically assign tickets to agents |
| Tickets per page | 20 | Number of tickets shown per page |

### Customer Portal Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Customer registration | On | Allow customers to self-register |
| Show Tickets page | On | Display the Tickets page in customer portal |
| Show Knowledge Base page | On | Display the Knowledge Base page in customer portal |
| Max tickets per day | 5 | Maximum tickets a customer can submit per day (0 = unlimited) |

### Notification Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Notify staff on new ticket | On | Email agents when a new ticket is created |
| Notify staff on customer reply | On | Email agents when a customer replies |
| Notify customer on staff reply | On | Email customer when an agent replies |
| Notify customer on status change | On | Email customer when ticket status changes |
| Notification email | Empty | Override email address for outgoing notifications |

## Step 5: Setup Cron Job

Follow the [Botble CMS Cronjob Setup Guide](https://docs.botble.com/cms/cronjob.html) to configure scheduled tasks for auto-closing inactive tickets.

## Permissions

Configure user permissions in **Admin → Settings → Roles**. Edit the desired role and enable Support Desk permissions:

- Tickets (Index, Edit, Delete)
- Categories (Index, Create, Edit, Delete)
- Departments (Index, Create, Edit, Delete)
- Knowledge Articles (Index, Create, Edit, Delete)
- Labels (Index, Create, Edit, Delete)
- Custom Fields (Index, Create, Edit, Delete)
- Products (Index, Create, Edit, Delete)
- Canned Responses (Index, Create, Edit, Delete)
- Agents (Index, Create, Edit, Delete)
- Customers (Index, Edit, Delete)
- Activity Logs (Index)

::: tip
After installation, delete the `/install` directory for security.
:::
