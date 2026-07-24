# Botble JobBoard Documentation Images

This directory contains screenshot placeholders for Botble JobBoard documentation.

## Expected Screenshot Files

The following image files are referenced in the documentation. Real screenshots should be captured from the running simulator and placed here:

### Home & Search
- `jobboard-home-light.png` - Candidate home screen with featured jobs (light theme)
- `jobboard-home-dark.png` - Candidate home screen with featured jobs (dark theme)
- `jobboard-search.png` - Job search with filters (category, job type, salary, location)
- `jobboard-search-map.png` - Map-based job search view (jobs near me)

### Jobs & Companies
- `jobboard-job-detail.png` - Single job detail with employment info + apply CTA
- `jobboard-company-profile.png` - Company profile with open jobs and reviews
- `jobboard-jobs-list.png` - Jobs listing view with job cards
- `jobboard-compare.png` - Job comparison tool

### Candidate Features
- `jobboard-login.png` - Login / authentication screen (candidate/employer role toggle on register)
- `jobboard-profile.png` - Candidate profile management page
- `jobboard-saved-jobs.png` - Saved jobs list
- `jobboard-apply.png` - Job application form (cover letter + resume/CV)
- `jobboard-resume-builder.png` - Resume builder (education, experience, languages, skills)

### Employer Portal
- `jobboard-employer-dashboard.png` - Employer dashboard overview with metrics
- `jobboard-employer-jobs.png` - Employer job listings management (post/edit)
- `jobboard-employer-applicants.png` - Applicants inbox with status updates
- `jobboard-employer-finance.png` - Packages, invoices and transactions

### Settings & Theme
- `jobboard-theme.png` - Theme customization (light / dark)
- `jobboard-language.png` - Language selection (incl. Arabic RTL)
- `jobboard-currency.png` - Currency switcher
- `jobboard-notifications.png` - Notification inbox

### Image Specifications
- Format: PNG, high quality
- Dimensions: portrait phone screenshot (e.g. iPhone 16 Plus). For CodeCanyon submission, normalize to **700–900px high** (Envato rejects raw full-resolution captures).
- Rounded corners: 18px border-radius in docs CSS
- Include both light and dark theme variants where applicable
- No sensitive data (blank names, use demo data)

## Naming Convention

All image files use the `jobboard-` prefix.

When referencing images in markdown:
```markdown
![Description](./images/jobboard-feature-name.png)
```

When displayed in HTML with rounded corners:
```html
<img src="./images/jobboard-feature-name.png" alt="Feature" style="width:31%; max-width:240px; border-radius:18px;" />
```
