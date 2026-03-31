# Departments

Departments let you route tickets to the right team. Each ticket can belong to one department, and agents are assigned to one or more departments.

## Department Fields

| Field | Description |
|-------|-------------|
| Name | Department display name |
| Description | Short description of the department's purpose |
| Email | Department-specific email address (optional) |
| Default | If enabled, new tickets are automatically assigned to this department |
| Sort order | Display order in dropdowns and listings |
| Status | Published or Draft |

## Creating a Department

1. Navigate to **Admin → Support Desk → Departments**
2. Click **Create**
3. Fill in the name and description
4. Optionally set a department email
5. Enable **Is Default** if this should be the fallback department for new tickets
6. Set **Status** to Published
7. Click **Save**

## Default Department

Only one department can be marked as default. When a customer submits a ticket without selecting a department (or when a department is not required), the default department is used.

You can also set the default department in **Admin → Support Desk → Settings → General → Default department**.

## Assigning Agents to Departments

Agents are assigned to departments in one of two ways:

- When creating or editing an **Agent**, select the departments they belong to
- When viewing a department, the assigned agents are listed

Agents only see tickets from departments they are assigned to in the agent portal.

### Department-Based Ticket Visibility

By default, agents only see tickets assigned directly to them. You can optionally enable **department-based visibility** so that agents see all tickets in their assigned departments.

Enable this in **Admin → Support Desk → Settings → General → Enable department-based ticket visibility**. See [Agents](agents.md#department-based-visibility) for details.

## Assigning Tickets to Departments

- **On submission**: Customers select a department when submitting a ticket (if more than one department exists)
- **In admin panel**: Change the department from the ticket detail view
- **In agent portal**: Agents can update the department from the ticket detail view

## Deleting a Department

Deleting a department does not delete the tickets assigned to it. Tickets remain but lose their department association. Reassign tickets before deleting a department.
