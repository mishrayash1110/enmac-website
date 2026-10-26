# ENMAC — Implementation and QA Report

Prepared: 22 October 2026

## Delivered in source

- Eight main areas: homepage, about, loan index, business finance, property finance, knowledge hub, calculators, contact/apply. Business and property finance resolve through dedicated dynamic service URLs with specialized content.
- Nine data-backed dedicated service routes, twelve data-backed educational article routes, four legal draft pages, a thank-you information page, a custom 404 page and loading state.
- Desktop/mobile navigation, a mega-menu, service discovery tabs, category search/filter, 3-step purpose-based loan finder, 8-node financial network, interactive process timeline, FAQ accordions and a searchable Knowledge Hub.
- Four financial planning tools: EMI with amortization visualization, two-scenario fee-inclusive comparison, extra-payment scenario planner, and conditional document checklist.
- Short enquiry and four-step individual/business applications with conditional fields, validation, review, consent and real API response handling.
- Node.js Next API routes for validation and optional PostgreSQL lead recording; database schema in `docs/schema.sql`. When no database exists, submit returns HTTP 503 rather than a simulated success.
- Responsive CSS layout with mobile-specific controls, SEO metadata, sitemap, robots, accessible markup intentions and reduced-motion CSS.

## Tests actually executed in the authoring environment

- Original source: **13 tests passed**. Following the 23 October 2026 dependency repair, `node --test tests/*.test.mjs`: **14 tests passed** (including the regression check preventing Recharts dependency reintroduction).
- TypeScript TS/TSX syntax transpilations with the globally installed TypeScript compiler: **41 source files parsed without syntactic error** in the repaired project; local aliases checked against file paths.

## Tests NOT executed / not verified

- `npm install` could not access the public npm registry (`EAI_AGAIN` DNS error). The environment did not contain Next.js or React packages. A subsequent `npm run build` attempt exited 127 with `next: not found` (see `docs/build-attempt.log`). A `npm run typecheck` attempt exited 2, with unresolved `next`, `react/jsx-runtime` and many consequent JSX typing diagnostics (see abbreviated `docs/typecheck-attempt.log`).
- Consequently a real framework `next build`, `tsc --noEmit` with project dependencies, ESLint and Playwright/browser end-to-end run **have not been successfully performed**. The failed build/typecheck attempts must not be interpreted as product-code QA results. Do not treat the project as verified production-ready.
- Full package-lock resolution is pending npm installation in an online environment. Do not invent registry integrity checksums.
- Visual screenshots could not be generated from a running Next.js server because dependencies were unavailable.
- Browser form submission/CRM integration is not verified; PostgreSQL credentials, schema setup and controlled production safeguards are pending.

## Publication blockers

1. Real original ENMAC logo and approved photos absent. Abstract illustration placeholders remain.
2. Confirm exact business profile, services, operational areas, contact details, lender relationships (if any) and financing claims.
3. Review privacy, DPDP, applicable RBI/intermediary rules, fees, grievance and other draft policy pages with counsel.
4. Connect secured PostgreSQL, apply migration, set consent/retention access and backups; install shared API rate limiter and bot protection.
5. Run `npm.cmd install`, `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd test` and `npm.cmd run build` in an online Node 22 environment.
6. Perform real responsive, accessibility, keyboard, SEO, form and browser coverage before deployment.

## 23 October 2026 — User-reported dependency repair

The user's Windows Next.js log reported multiple `Module not found` errors inside Recharts for `es-toolkit/compat/get`, `isEqual`, `sortBy`, `range`, `throttle`, `uniqBy`, and `../dist/compat/object/get.js`; the homepage responded with HTTP 500.

Repair: removed `recharts` from `package.json` and replaced its sole use (the EMI amortization chart) with a responsive inline SVG in `CalculatorSuite.tsx`, preserving the underlying finance math. Added regression test `tests/recharts-independence.test.mjs`. The fix avoids the entire failing dependency tree.

Package installation, framework type-check and build remain unverified in this environment because the npm registry returns `EAI_AGAIN`; run the README clean-install commands on a network-connected Windows machine.
