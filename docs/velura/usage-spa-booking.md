# Spa Booking

Velura is powered by the built-in **Spa Booking** system. It manages your service catalog, staff, packages,
memberships, and online appointments. Most of the spa-related [UI Blocks](./usage-ui-block.md) (Services, Packages,
Memberships, Staff, Reserve, Service Menu) pull their content from here, so it's the first thing to set up.

You can access it from the **Spa Booking** menu in the admin sidebar.

::: tip
If you installed the **Velura** sample data, the catalog below is already populated with demo services, staff,
packages, and memberships. You can edit them instead of starting from scratch.
:::

## Service Categories

Service categories group your treatments (for example *Massage*, *Facial*, *Nail Care*, *Hair*).

Go to `Spa Booking` -> `Service Categories` -> `Create`, then fill in:

- **Name** – the category title
- **Description** – short summary shown on the frontend
- **Image / Icon** – used by the *Spa Booking Menu* and *Services* blocks
- **Status** – Published / Draft

## Services

Services are the individual treatments clients can book.

Go to `Spa Booking` -> `Services` -> `Create`, then fill in:

- **Name** – the treatment name
- **Category** – the parent service category
- **Price** – the treatment price
- **Duration** – how long the treatment takes (used for scheduling)
- **Image** and **Description** – shown on the services and detail pages
- **Status** – Published / Draft

Services appear in the **Services Section**, **Special Offer**, and **Reserve Section** blocks.

## Staff

Staff are your specialists/therapists. Clients can pick a staff member when booking (optional).

Go to `Spa Booking` -> `Staff` -> `Create`, then fill in the name, role/title, photo, short bio, and status.
Staff appear in the **Staff Section** block and in the appointment form.

## Packages

Packages bundle several services together at a special price.

Go to `Spa Booking` -> `Packages` -> `Create`, then set the package name, price, included services, image, and
description. Packages appear in the **Packages Section** block.

## Memberships

Memberships are recurring plans that give clients ongoing benefits.

Go to `Spa Booking` -> `Memberships` -> `Create`, then set the plan name, price, billing period, feature list, and
status. Memberships appear in the **Memberships Section** block.

## Currencies

Go to `Spa Booking` -> `Currencies` to manage the currency (symbol, code, and formatting) used across the booking
system.

## Appointments

When a client submits the booking form on the frontend, a new appointment is created here.

Go to `Spa Booking` -> `Appointments` to review, confirm, or cancel requests. Each appointment records the selected
service, preferred staff, date/time, and the client's contact details.

## Booking Calendar

Go to `Spa Booking` -> `Booking Calendar` for a calendar overview of all upcoming appointments, making it easy to
manage your daily schedule at a glance.

## Settings

Go to `Spa Booking` -> `Settings` to configure global booking behavior such as working hours, notification emails,
and booking rules.

## The Reservation Form

The **Reserve Section** UI Block renders the appointment booking form in a modern split layout. Add it to any page
(the homepage presets already include it) and clients can:

1. Choose a service (and optionally a staff member)
2. Pick a preferred date and time
3. Enter their contact details
4. Submit the request

The submission then appears under **Appointments** and, if configured in **Settings**, triggers a confirmation email.
