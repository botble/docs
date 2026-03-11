# Custom Fields

Custom fields extend the ticket submission form with additional inputs. Use them to collect structured information from customers upfront — reducing back-and-forth replies.

## Field Types

| Type | HTML Input | Use Case |
|------|-----------|----------|
| Text | `text` | Short free-form input |
| Textarea | `textarea` | Multi-line free-form input |
| Email | `email` | Email address with format validation |
| Number | `number` | Numeric input |
| URL | `url` | Web address with format validation |
| Tel | `tel` | Phone number |
| Date | `date` | Date picker |
| Time | `time` | Time picker |
| Date & Time | `datetime-local` | Combined date and time picker |

## Custom Field Properties

| Field | Description |
|-------|-------------|
| Label | Field label shown to the customer |
| Description | Optional helper text shown below the field |
| Type | Input type (see table above) |
| Required | Whether the field must be filled before ticket submission |
| Sort order | Display order on the ticket form |
| Status | Published (active) or Draft (hidden) |

## Managing Custom Fields

Navigate to **Admin → Support Desk → Custom Fields**.

### Creating a Custom Field

1. Navigate to **Admin → Support Desk → Custom Fields**
2. Click **Create**
3. Enter a label and select a field type
4. Add a description if the field needs explanation
5. Enable **Required** if the field is mandatory
6. Set the sort order to control where it appears in the form
7. Set **Status** to Published
8. Click **Save**

### Editing a Custom Field

1. Click **Edit** on a field row
2. Update the properties
3. Click **Save**

### Deleting a Custom Field

1. Click **Delete** on a field row
2. Confirm deletion

::: warning
Deleting a custom field also deletes all values previously submitted for that field across all tickets. This action cannot be undone.
:::

### Reordering Fields

Set the **Sort order** value on each field to control the order they appear in the ticket submission form. Lower numbers appear first.

## Customer Experience

Active custom fields appear on the ticket submission form at `/support/tickets/create`, between the standard fields and the submit button. Required fields are marked with an asterisk and must be filled before the form can be submitted.

## Viewing Custom Field Values

Custom field values are displayed on the ticket detail page in both the admin panel and the agent portal, alongside the standard ticket information.
