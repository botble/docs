---
title: Job Board Integration (Employer + Candidate)
description: Dual-scope KYC for Botble job-board themes — Jobcy, Jobzilla. Covers employer business verification and optional candidate identity checks.
---

# Job Board Integration

This guide applies to Botble job-board themes that ship on `plugins/job-board` — for example **Jobcy** and **Jobzilla**. You get **two** independent verification scopes:

- **`jobboard_company`** — employer business verification before posting jobs
- **`jobboard_candidate`** — optional candidate identity verification before applying to jobs

Both scopes sit behind the same `account` guard and are disambiguated by the `Account.type` enum. The plugin ships a **plugin-owned standalone UI**.

## Prerequisites

- `plugins/job-board` installed and active
- `plugins/kyc` installed and active (`php artisan cms:plugin:activate kyc`)

![KYC settings page — the Job Board KYC section appears when plugins/job-board is installed](../images/kyc-settings.png)

## Step 1 — Enable both scopes

In **Admin → KYC Verification → Settings** the **Job Board KYC** section appears automatically when the host plugin is installed:

- **Enable employer company KYC** → `ON` — buyer identity check
- **Require KYC to post jobs** (optional) → `ON` to block the job-post action until the company is approved
- **Enable candidate identity KYC** → `ON` only if you want to gate applications on candidate ID verification
- **Require KYC to apply to jobs** (optional) → `ON` for regulated job categories

On save, the plugin registers macros on both `Botble\JobBoard\Models\Company` and `Botble\JobBoard\Models\Account`. **No host-plugin file is modified.**

## Step 2 — Employer dashboard link

Open your theme's employer dashboard view — typically `platform/themes/{theme}/views/job-board/dashboard.blade.php`. Add:

```blade
@if (setting('kyc_jobboard_company_enabled')
    && auth('account')->check()
    && auth('account')->user()->isEmployer())
    @php $company = auth('account')->user()->companies->first(); @endphp
    @if ($company)
        <div class="card">
            <div class="card-body">
                <h5>
                    {{ trans('plugins/kyc::kyc.name') }}
                    {!! $company->kycStatusBadge('jobboard_company') !!}
                </h5>
                <a href="{{ route('kyc.submission.index', ['subjectKey' => 'jobboard_company']) }}"
                   class="btn btn-primary">
                    {{ trans('plugins/kyc::kyc.action.verify_company') ?? 'Verify your company' }}
                </a>
            </div>
        </div>
    @endif
@endif
```

## Step 3 — Candidate dashboard link

Open the candidate applied-jobs view (typically `.../account/jobs/applied.blade.php`):

```blade
@if (setting('kyc_jobboard_candidate_enabled')
    && auth('account')->check()
    && auth('account')->user()->isJobSeeker())
    <div class="alert alert-info d-flex align-items-center">
        <div>
            <strong>{{ trans('plugins/kyc::kyc.name') }}</strong>
            {!! auth('account')->user()->kycStatusBadge('jobboard_candidate') !!}
            <a href="{{ route('kyc.submission.index', ['subjectKey' => 'jobboard_candidate']) }}"
               class="btn btn-sm btn-primary ms-3">
                {{ trans('plugins/kyc::kyc.action.verify_identity') ?? 'Verify your identity' }}
            </a>
        </div>
    </div>
@endif
```

## Step 4 — Optional gates

Wrap the host-plugin routes with the `kyc.required` middleware:

```php
// Block job posting until the employer's company is verified
Route::middleware(['kyc.required:jobboard_company:posting'])->group(function () {
    Route::post('account/jobs', [AccountJobController::class, 'store'])
        ->name('public.account.jobs.store');
});

// Optionally block job applications until the candidate is verified
Route::middleware(['kyc.required:jobboard_candidate:applying'])->group(function () {
    Route::post('jobs/apply/{id}', [PublicController::class, 'postApplyJob'])
        ->name('public.job.apply');
});
```

## Multi-company employers

Employers belong to zero-or-more companies via the `jb_companies_accounts` many-to-many pivot. The KYC resolver walks this pivot and picks the subject according to:

| Situation | What happens |
|---|---|
| Account owns **0** companies | Resolver returns null → the dashboard link block is hidden by the `@if ($company)` guard. Prompt the employer to create a company first. |
| Account owns **1** company | The sole company is used automatically. |
| Account owns **2+** companies | The resolver uses `->first()` by default. To target a specific company pass `?company_id={id}` on the submission URL — the ID must be in the authenticated account's owned set or the request 403s. |

Example dashboard card for a multi-company employer:

```blade
@foreach (auth('account')->user()->companies as $company)
    <div class="card">
        <div class="card-body">
            <h5>{{ $company->name }} {!! $company->kycStatusBadge('jobboard_company') !!}</h5>
            <a href="{{ route('kyc.submission.index', [
                'subjectKey' => 'jobboard_company',
                'company_id' => $company->id,
            ]) }}" class="btn btn-primary">
                Verify this company
            </a>
        </div>
    </div>
@endforeach
```

## Host column mirror

On `KycApproved` for the employer scope, the plugin writes back to `jb_companies.is_verified + verified_at + verified_by + verification_note` so the existing job-board admin badge reflects the KYC decision without any host edits.

On `KycRejected`, the plugin reverts `is_verified = false` **only when no other approved `jobboard_company` submission remains for the same company**. A multi-submission renewal flow (employer re-submits before the previous approval is rejected) keeps the company verified as long as at least one approval still stands.

Candidate scope has no host column to mirror — `Botble\JobBoard\Models\Account` doesn't expose an `is_verified` attribute.

## Type filter (candidate scope)

Both scopes share the same Account model. The candidate scope's `type_filter` rejects the request when `Account.type !== JOB_SEEKER`, so an employer trying to open the candidate URL gets a clean error page rather than a silent mis-route.

## What this plugin does NOT modify

- `plugins/job-board` — untouched
- `Botble\JobBoard\Models\Company` / `Account` — untouched (runtime macros)
- Your theme views — untouched except for the two dashboard link blocks above
- `MustVerifyEmail` flow — KYC is an **additional** identity layer, not a replacement

## Compatibility note

`plugins/job-board` binds the Laravel `account` guard at service-provider boot. `plugins/real-estate` also binds `account`. A single Botble installation can therefore run **either** job-board **or** real-estate — not both simultaneously. This is a pre-existing Botble constraint, not a KYC limitation.

## Troubleshooting

- **"Employer dashboard link doesn't show"** — the authenticated account must be of `type = EMPLOYER` and own at least one company. Accounts that haven't completed company onboarding yet have no company, so the gated link stays hidden by design.
- **"Candidate link shows for an employer"** — the Blade snippet must include `auth('account')->user()->isJobSeeker()`. Without it, the template will render for both role types.
- **"`?company_id=5` returns 403"** — the employer does not own company 5. Verify via `auth('account')->user()->companies` in tinker. The resolver rejects requested IDs that aren't in the owned pivot set.
- **"Reject cleared `is_verified` even though another approval existed"** — run `php artisan tinker` and query `KycSubmission::where('submission_type','jobboard_company')->where('verifiable_id', $id)->where('status','approved')->count()`. The listener only reverts when that count is zero.

## Next step

- [Checkout & Listing Gates](./gates.md) — full middleware reference
- [Car Rental / Listing](./car-rental.md) — Auxero / Carento integration
