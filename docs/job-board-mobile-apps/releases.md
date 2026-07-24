# Release Notes

## 1.0.0

Initial release — a whitelabel job-board mobile app built with Expo SDK 54 / React Native, connecting to a Botble backend running the job-board API.

**Candidate Portal**

- Browse jobs and companies, faceted search & filter (category, job type, salary range, location, career level), and a job detail screen with company profile, reviews, and related jobs.
- Interactive **map view** with a free, no-key MapLibre + OpenStreetMap engine by default (switchable to Apple/Google Maps via `MAP_PROVIDER`), showing jobs near the user's location with clustering and salary markers.
- **Resume builder**: Create and manage resumes with education, work experience, languages, and professional skills sections.
- **Job application flow**: Apply to jobs with resume upload, cover letter, and message (works for guests, no payment).
- Server-backed saved jobs wishlist and side-by-side job opportunity comparison.
- Companies directory with company detail, jobs listing, and reviews with 1–5 star ratings.
- Candidate profile management: edit profile, avatar upload, notification settings, language/theme preferences.
- Blog articles and news from the Botble blog plugin.
- My applications tracker: view all submitted applications and their status.

**Employer Portal (native)**

- Dashboard with metrics (views, applicants, revenue) and recent activity.
- Multi-step job create/edit: full taxonomy support (job type, category, career level, skills, job shift, functional area), salary specification (from/to, range type), dates, and image upload.
- Applicants management: view, filter, and update applicant status; preview CV/resume uploads.
- **Resume upload support**: Candidates can attach PDF resumes and employers receive file attachments.
- Credit packages: browse, subscribe, and handle free/paid package tiers with in-app WebView checkout on the backend's hosted payment page.
- Finance: transaction history, invoice management with signed PDF download, multi-company support.
- Company management: create, edit, and manage multiple employer accounts; upload company logo and images.
- Reviews: view and manage reviews received from candidates.

**Cross-cutting**

- Auth via Laravel Sanctum, plus Google, Apple, and Facebook social login, and biometric unlock (Face ID / Touch ID).
- Push notifications via Firebase Cloud Messaging (FCM HTTP v1), an in-app notification inbox with unread badges, app-icon badge count, and deep links from a push into the relevant screen (including cold start).
- Offline query-cache persistence.
- Localization in English, Vietnamese, Arabic (full RTL), and French.
- Dark mode (light / dark / system) and full whitelabel branding via `.env`.

For the latest changes, check the CodeCanyon portfolio: https://codecanyon.net/user/botble/portfolio
