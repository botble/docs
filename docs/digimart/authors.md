---
title: Authors & Approvals
description: Manage sellers and product approvals
---

# Authors & Approvals

DigiMart distinguishes between two account types: **Customers** (buyers) and **Authors** (sellers). Manage author registrations, approvals, and account status from the admin panel.

**Access:** Admin → Authors & Approvals

## Author Account Types

| Type | Capabilities | Registration |
|------|--------------|---------------|
| **Customer** | Browse, download, and rate products | Auto-approved on signup |
| **Author** | Publish products, manage versions, view statistics | Must apply and be approved by admin |

## Approving Author Registrations

New author applications appear in the approvals queue and require admin review.

### Approve an Author

1. Go to **Authors & Approvals** → **Pending Approvals**
2. Click the author request to review details (bio, business info, etc.)
3. Click **Approve** to grant the Author role
4. Optionally add a message to the author

The applicant is notified of approval and can begin publishing products.

### Reject an Author Application

1. Go to **Authors & Approvals** → **Pending Approvals**
2. Click the author request
3. Click **Reject** and provide a reason
4. Click **Send**

The applicant receives the rejection reason and can reapply after addressing feedback.

## Managing Authors

### View All Authors

1. Go to **Authors & Approvals** → **Authors**
2. See list of all approved authors with:
   - Account information
   - Number of published products
   - Download count and revenue
   - Account status (Active, Banned)

### Edit Author Profile

1. Click an author's name
2. Modify:
   - Display name
   - Bio
   - Avatar
   - Business details (if applicable)
3. Click **Save**

### Ban an Author

To prevent an author from publishing and selling:

1. Click an author's name
2. Click **Ban Author**
3. Enter:
   - **Duration** — Ban period (days, or permanent if 0)
   - **Reason** — Why the author is being banned (shown to author)
4. Click **Confirm**

The author is notified and cannot publish new products or manage existing ones during the ban period.

### Unban an Author

1. Click a banned author's name
2. Click **Unban Author**
3. Click **Confirm**

The author regains access to their account.

## Approving Products

Authors must submit products for admin approval before they can be published.

### Review Pending Products

1. Go to **Products & Versions** (from sidebar)
2. Filter by status **In Review** or **Pending**
3. Click a product to review:
   - Product details (name, description, pricing)
   - Version files and virus scan status
   - Author information
   - Product dependencies

### Approve a Product

1. Review the product details
2. Verify virus scan passed (all versions marked Clean)
3. Click **Approve**
4. Optionally add approval notes
5. Click **Confirm**

The product is published immediately and appears in the marketplace catalog. The author is notified.

### Reject a Product

1. Click a product in review
2. Click **Reject**
3. Provide a detailed rejection reason
4. Click **Send**

The author is notified of the rejection and can revise and resubmit.

**Common rejection reasons:**
- Virus detected in files (automatic quarantine)
- Incomplete product information
- Copyright/licensing concerns
- Malicious or spam content
- Incompatible dependencies

## Product Submission Workflow

```
Author submits product
         ↓
Admin reviews (virus scan, quality, policy)
         ↓
    ✓ Approved → Published (visible in marketplace)
    ✗ Rejected → Author revises → Resubmit
```

## Author Statistics

View metrics for each author:

- **Products Published** — Count of approved products
- **Total Downloads** — Sum of all downloads across their products
- **Revenue** — Total earnings (if applicable)
- **Rating** — Average rating across their products
- **Member Since** — Account creation date

## Account Status

| Status | Meaning | Action |
|--------|---------|--------|
| **Active** | Author can publish and sell | Normal operation |
| **Banned** | Author cannot publish; existing products hidden | Temporary or permanent suspension |
| **Pending** | Application awaiting approval | Approve or reject |

::: tip
Monitor author quality and engagement. Regularly review rejected products to identify patterns or policy gaps. Consider featuring high-quality authors with many downloads.
:::

See [Becoming an Author](./become-author.md) for the author registration workflow.
