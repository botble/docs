# Reservation System

Restoria includes a comprehensive table reservation system that allows customers to book tables online, helping you manage your restaurant's capacity efficiently.

## Reservation Form Styles

Restoria offers 3 different reservation form styles to match your website design:

1. **Style 1** - Classic form with date/time pickers
2. **Style 2** - Modern step-by-step booking process
3. **Style 3** - Compact sidebar reservation widget

## Setting Up Reservations

### Enable Reservation System

1. Navigate to **Admin Panel** → **Restaurant** → **Reservation Settings**
2. Toggle **Enable Online Reservations** to ON
3. Configure basic settings:
   - **Booking Lead Time**: Minimum hours in advance for reservations
   - **Maximum Party Size**: Largest group you can accommodate
   - **Booking Window**: How far in advance customers can book (e.g., 30 days)

### Configure Restaurant Hours

Set your operating hours for each day:

1. Go to **Restaurant** → **Operating Hours**
2. For each day, set:
   - Opening time
   - Closing time
   - Last reservation time
   - Break periods (if applicable)
   - Special hours for holidays

### Table Management

Define your restaurant's seating capacity:

1. Navigate to **Restaurant** → **Table Management**
2. Add tables with details:
   - **Table Number/Name**
   - **Capacity** (number of seats)
   - **Location** (indoor, outdoor, private room)
   - **Availability Status**
   - **Special Features** (window view, wheelchair accessible)

## Reservation Form Configuration

### Required Fields

Standard reservation form fields:

- **Name** (required)
- **Email** (required)
- **Phone** (required)
- **Date** (required)
- **Time** (required)
- **Number of Guests** (required)
- **Special Requests** (optional)

### Additional Custom Fields

Add custom fields as needed:

- Occasion (Birthday, Anniversary, Business)
- Dietary Requirements
- Preferred Seating Area
- Children/High Chairs needed
- Accessibility Requirements

## Managing Reservations

### Reservation Dashboard

Access the reservation dashboard at **Restaurant** → **Reservations**

Features include:
- Calendar view of all reservations
- List view with filters
- Quick status updates
- Guest information and history
- Table assignment tools

### Reservation Statuses

- **Pending** - New reservation awaiting confirmation
- **Confirmed** - Reservation confirmed by restaurant
- **Seated** - Guest has arrived and been seated
- **Completed** - Guest has finished dining
- **Cancelled** - Reservation cancelled
- **No-show** - Guest didn't arrive

### Email Notifications

Configure automatic email notifications:

1. **Confirmation Email** - Sent when reservation is confirmed
2. **Reminder Email** - Sent 24 hours before reservation
3. **Cancellation Email** - Sent if reservation is cancelled
4. **Thank You Email** - Sent after dining experience

Customize email templates in **Restaurant** → **Email Templates**

## Reservation Rules & Policies

### Booking Rules

Set up booking rules in **Reservation Settings**:

- **Minimum Party Size**: Smallest group accepted
- **Maximum Party Size**: Largest group accepted
- **Time Slots**: Available booking times (e.g., every 15/30 minutes)
- **Duration**: Default reservation duration (e.g., 2 hours)
- **Buffer Time**: Time between reservations for table turnover

### Cancellation Policy

Define your cancellation policy:

1. Go to **Restaurant** → **Policies**
2. Set cancellation terms:
   - Cancellation deadline (e.g., 24 hours)
   - Cancellation fee (if applicable)
   - No-show policy
   - Modification rules

### Special Days & Blackout Dates

Manage special occasions and closures:

1. Navigate to **Restaurant** → **Special Days**
2. Add entries for:
   - Holidays with special hours
   - Private events (restaurant closed)
   - Special menus (Valentine's Day, New Year's Eve)
   - Blackout dates (no reservations accepted)

## Displaying Reservation Forms

### Using Shortcodes

Add reservation forms to any page:

```
[reservation-form style="1"]
[reservation-form style="2" show-capacity="true"]
[reservation-form style="3" redirect="/thank-you"]
```

### Widget Areas

Add reservation widgets to:
- Sidebar
- Header
- Footer
- Pop-up modal

### Dedicated Reservation Page

Create a dedicated booking page:

1. Create new page: **Pages** → **Add New**
2. Title: "Reserve a Table" or "Book Online"
3. Add reservation shortcode
4. Include additional information:
   - Restaurant policies
   - Special offers
   - Contact information
   - Location map

## Advanced Features

### Capacity Management

Automatically manage restaurant capacity:

- Real-time availability checking
- Overbooking prevention
- Waitlist management
- Peak time restrictions

### Integration Options

Connect with external services:

- **Google Calendar** - Sync reservations
- **SMS Notifications** - Text message confirmations
- **POS Systems** - Integration with point-of-sale
- **CRM Systems** - Guest management

### Reporting & Analytics

Access reservation analytics:

1. Go to **Restaurant** → **Reports**
2. View metrics:
   - Total reservations by period
   - No-show rate
   - Average party size
   - Peak booking times
   - Popular days/times
   - Guest retention rate

## Best Practices

1. **Confirm Quickly**: Confirm or respond to reservations within 2 hours
2. **Clear Policies**: Display cancellation and booking policies clearly
3. **Accurate Availability**: Keep table availability updated
4. **Follow Up**: Send confirmation and reminder emails
5. **Collect Feedback**: Request reviews after dining
6. **Manage No-shows**: Track and address no-show patterns

::: warning
Always maintain accurate availability to avoid overbooking. Consider keeping some tables unreserved for walk-in customers.
:::

::: tip
Enable SMS notifications for last-minute bookings to ensure staff are immediately aware of new reservations.
:::