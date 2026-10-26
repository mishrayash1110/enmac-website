# ENMAC — Financial Advisory Website

> **Current deployment mode: static frontend export.** See [static deployment instructions](docs/STATIC_DEPLOYMENT.md) for the current build, domain setup and remaining launch requirements. Server/email instructions below describe the previous backend implementation.

Production-oriented **Next.js App Router / React / TypeScript** multi-page website source code for ENMAC's Indian financial advisory and loan-consultancy business. Designed around transparent financing discovery for individuals, MSMEs and corporate borrowers.

> **Status: full source implementation prepared, but not independently production verified.** Project dependencies could not be downloaded in the authoring environment (npm DNS `EAI_AGAIN`). Approved original brand/photo files were not supplied. Enquiry and application delivery now uses Gmail; see `docs/EMAIL_SETUP.md` for activation and current verification details. See `docs/QA_REPORT.md` and `docs/ASSETS_TO_ADD.md`.

## Run locally — Windows PowerShell

Requirements: Node.js 22 and working internet access to npm.

```powershell
cd "C:\path\to\enmac-website"
Get-ChildItem package.json
npm.cmd install
Copy-Item .env.example .env.local
npm.cmd run dev
```

Open `http://localhost:3000`.

**Important:** Run commands from the **folder that contains `package.json`**. Do not run from a parent Downloads folder, or npm will report `ENOENT package.json`.

For verification after dependencies install:

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd run start
```

The first online `npm.cmd install` will generate a properly resolved `package-lock.json`. Commit that real lockfile before deployment; the authoring environment could not generate verified lockfile integrity records offline.

## Implemented pages

| Page | Route |
|---|---|
| Homepage | `/` |
| About ENMAC | `/about` |
| Loan solution discovery | `/loans` |
| Business & MSME finance | `/loans/business` |
| Property & secured finance | `/loans/property` |
| Other dedicated solutions | `/loans/personal`, `/loans/home`, `/loans/securities`, `/loans/working-capital`, `/loans/corporate`, `/loans/business-term-loan`, `/loans/trade-finance` |
| Knowledge Hub | `/guides` |
| 12 guide pages | `/guides/[slug]` |
| Calculators & tools | `/calculators` |
| Contact and apply | `/apply` |
| Legal drafts | `/privacy-policy`, `/terms`, `/fee-disclosure`, `/grievance-redressal` |
| Informational success-page fallback | `/thank-you` |
| APIs | `GET /api/loan-categories`, `POST /api/enquiries`, `POST /api/applications` |

A custom not-found page is included.

## Working client-side interaction features

- Accessible-aimed sticky responsive navigation with desktop mega-menu and mobile menu.
- Personal vs business loan categories, indexed service routes, service search/filter and empty state.
- Three-question loan discovery assistant with category explanations. This is **not** lender eligibility scoring.
- Responsive 8-node financing network with details on hover, focus and click; mobile category controls.
- Clickable five-step advisory timeline, FAQ disclosures, knowledge search and category filtering.
- EMI calculator with dependency-free SVG amortization chart, hypothetical loan-cost comparison including modeled fees, prepayment planner and applicant-based preparation checklist. All free and available without collecting private data.
- Quick enquiry and stepwise application form with honest API response handling. Do **not** use a success-page visit as submission confirmation.

## Email delivery and optional PostgreSQL storage

Both forms deliver to **enmacrfs@gmail.com**. Set the server-only `GMAIL_USER`, `GMAIL_APP_PASSWORD` and `ENMAC_LEADS_EMAIL` values; see [Gmail setup](docs/EMAIL_SETUP.md). The ignored `.env.local` has the ENMAC addresses prefilled; its app password must be added privately. Email-only delivery does not require a database.

Optional database copy:

1. Provision a private PostgreSQL database with TLS, restricted service credentials, encryption-at-rest arrangements, backups and an approved data-retention plan.
2. Apply `docs/schema.sql` in that database, manually and securely.
3. Set `DATABASE_URL` in `.env.local` (local) or a protected server-side deployment secret (production). **Never** use `NEXT_PUBLIC_DATABASE_URL` and never commit `.env.local`.
4. Restart the server. Submissions are accepted only after validation, the configured database insert (if any), and Gmail SMTP acceptance succeed; the server then returns a unique reference UUID.
5. Install a distributed rate limiter, WAF/bot controls, operational alerts, authorized CRM access, audit logging and consent/retention controls before serving real customer PII. The included in-memory throttle is **not sufficient** as a production distributed rate limit.
6. Implement approved lead-routing/assignment and admin follow-up separately; there is deliberately no public endpoint for viewing leads.

When `DATABASE_URL` is absent, delivery uses email only. Missing Gmail configuration or failed email delivery returns HTTP 503 rather than a false confirmation.

## Design and source structure

- `src/app/`: Next routes, metadata, SEO, APIs.
- `src/components/layout/`: navigation and footer.
- `src/components/home/`: loan finder, financial network, financial art, service exploration.
- `src/components/calculators/`: four financial planning tools.
- `src/components/forms/`: individual and business enquiry flows.
- `src/data/services.ts`: service definitions, documentation and related paths.
- `src/data/guides.ts`: 12 educational articles.
- `src/lib/finance/core.mjs`: independently testable finance formulas.
- `src/lib/validations/`: server-side form schemas.
- `tests/`: node:test coverage for finance and project structure.
- `docs/`: SQL schema, asset handoff and QA report.

White/ENMAC blue/sky-blue theme, deliberate whitespace, financial illustrations, brand accent controls and bespoke responsive sections. Tailwind 4 is configured; custom design CSS lives in `src/app/globals.css`.

## Verification and legal notes

This is a website for a financial **intermediary adviser**, not a direct lender. No guarantee of approval, fake rate, fabricated partner logo, fictitious success statistic or website payment flow is included. The services listed in the brief are informational pending company confirmation, especially specialty corporate and foreign-bank funding. Legal policy pages are explicit drafts, with `noindex` metadata pending client review.

**Do not publish or collect live customer data until** original branding/assets, company details, privacy disclosures, applicable regulatory checks, database controls and full QA have been approved and deployed. The authoring environment did not run the actual Next production build; see QA report for precise status.

## Recharts / es-toolkit build error (resolved in patched source)

This project no longer imports `recharts`. The EMI chart is rendered with a small, accessible native SVG component in `src/components/calculators/CalculatorSuite.tsx`. This eliminates the `es-toolkit/compat/*` missing-module errors from the calculator and avoids dependence on the Recharts package tree.

When replacing an older project extract with this patched source, stop the dev server (`Ctrl+C`), then run these commands from the folder containing `package.json` in Windows PowerShell:

```powershell
if (Test-Path node_modules) { Remove-Item node_modules -Recurse -Force }
if (Test-Path .next) { Remove-Item .next -Recurse -Force }
if (Test-Path package-lock.json) { Remove-Item package-lock.json -Force }
npm.cmd install
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npm.cmd run dev
```

If Windows reports files in use while removing `node_modules`, close Next.js/Node processes or extract the patched ZIP into a new directory instead. Do not remove or overwrite `.env.local` if it contains your local configuration.
