# ENMAC Experience 2.0

Implemented directly on the current corporate-themed project. The earlier corporate stylesheet, brand assets, content data, and project architecture remain in place.

## Updated experiences

- **Homepage:** wide editorial hero with restrained entrance motion, existing photography and copy, and three direct pathways into personal finance, business finance, and planning tools.
- **Service discovery:** keyboard-accessible personal/business tabs, a featured service panel, selectable descriptions, direct links for every existing service, and inline selected-service details on mobile.
- **Financing network:** eight preserved categories, subtle desktop connectors, instant contextual panels, and large mobile category buttons instead of a scaled-down orbit.
- **Process:** connected, selectable stages with a progress indicator, previous/next controls, contextual actions, and the lender-decision disclaimer.
- **Calculators:** tenure slider, Indian currency preview, selectable principal/interest breakdown, reset controls for each tool, and keyboard navigation between tool tabs. Inputs retain focus during live calculations.
- **Loan catalogue:** featured-service composition, existing search/filter controls, and an announced results count.
- **Business finance:** six native expandable topics for progressive disclosure; the original explanations remain in the document.
- **Knowledge Hub:** featured reading composition, immediate search/filter feedback, polished transitions, and all existing article routes. Articles now provide a contextual financing link.
- **Forms:** native-rule inline validation with associated hints and errors, application progress, step-heading focus, and existing loading/error/success handling.
- **Shared interaction layer:** modest hover/pressed/focus feedback, keyboard dropdown controls, Escape/outside-click dismissal, subtle scroll reveals, and a scroll-aware header treatment that does not change header height.

No motion library was added. Content is visible by default; IntersectionObserver only starts short entrance animations. Reduced-motion settings disable animations and transitions. No autoplay, scroll hijacking, or continuous decorative movement was introduced.

## Modified files

| File | Purpose |
| --- | --- |
| `src/app/experience.css` | New experience compositions, responsive patterns, interaction states, and motion. |
| `src/app/layout.tsx` | Loads the experience layer and lightweight enhancement component. |
| `src/app/page.tsx` | Editorial hero composition and meaningful navigation pathways. |
| `src/components/ui/Experience.tsx` | New progressive scroll reveals and header enhancement. |
| `src/components/layout/Header.tsx` | Keyboard, dismissal, focus, and navigation refinements. |
| `src/components/home/FinanceTabs.tsx` | Featured service discovery and mobile inline details. |
| `src/components/home/FinancialNetwork.tsx` | Desktop connectors and mobile selector. |
| `src/components/home/ProcessTimeline.tsx` | Connected process storytelling and contextual actions. |
| `src/components/home/LoanCatalog.tsx` | Results feedback and transition boundary. |
| `src/components/home/GuideLibrary.tsx` | Featured article and search/filter feedback. |
| `src/components/calculators/CalculatorSuite.tsx` | Reset, tenure control, formatting preview, keyboard tabs, and visual feedback. |
| `src/components/calculators/RepaymentBreakdown.tsx` | New interactive repayment composition. |
| `src/components/forms/Field.tsx` | New reusable native-validation feedback wrapper. |
| `src/components/forms/LeadForms.tsx` | Feedback wrappers, busy state, step focus, and progress presentation. |
| `src/app/loans/[slug]/page.tsx` | Native business-topic disclosure. |
| `src/app/guides/[slug]/page.tsx` | Contextual links to existing financing categories. |
| `docs/EXPERIENCE_2_0.md` | This report. |

## Preservation

- Git is unavailable on PATH and this checkout has no `.git` directory. A fresh pre-edit snapshot and hash manifest were saved under `.ui-review/experience-baseline/` before shared components were changed.
- All 13 protected backend, validation, finance-core, data, dependency, and Next-configuration files match the snapshot.
- Both enquiry and application submission-handler implementations are byte-identical to the snapshot. Field constraints, API endpoints, payloads, consent rules, and success confirmation remain unchanged.
- The finance formulas in `src/lib/finance/core.mjs` were not modified. The old manual memoization in the EMI component was replaced with a direct call to the same bounded amortization function; its previous compiler lint errors are resolved.
- All existing services, articles, pages, legal wording, company information, metadata, original logo, and image files are retained. Service and topic text may now appear within selectors or expandable sections.
- Compared the main content of 34 generated HTML pages to the baseline: every original paragraph remains present, including descriptions moved into selection controls. All rendered homepage control-target IDs resolve.
- No new packages, stock assets, rates, eligibility promises, partnerships, or testimonials were added.

## Executed verification

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed. |
| `npm run lint` | Passed with zero errors and the existing single `postcss.config.mjs` anonymous-default-export warning. |
| `npm test` | All 14 existing tests passed. |
| `npm run build` | Passed; all 39 build entries generated successfully. |
| Responsive review | 103 initial checks across 32 routes, plus 15 focused follow-up checks. No horizontal overflow. Main routes tested at 360, 390, 768, 1024, and 1440 pixels; every remaining loan/article route at 390 and 1440 pixels. |
| Browser runtime | No JavaScript exceptions recorded in the route/interaction review. |
| Service discovery | Arrow-key tabs, selected service details, direct links, and mobile inline service expansion verified. |
| Network/process | All eight network selections and all five process stages verified. Mobile category selection verified. |
| Navigation | Mobile opening/Escape dismissal, desktop ArrowDown entry, Escape return to the trigger, and active controls verified. |
| Calculators | Principal change updates EMI from `₹25,357` to `₹10,143` under the existing default rate/tenure; tenure and chart updates, retained input focus, reset, breakdown selection, comparison, prepayment, checklist, and keyboard tabs verified. |
| Knowledge Hub | All 12 articles retained; featured layout, immediate search, empty result and clear-filter recovery verified. |
| Forms | Inline invalid-email feedback verified with actual focus/blur; valid enquiry inputs accepted. Business application progresses to the populated review. Step-heading focus verified. |
| Submission failures | Both forms display recoverable backend-unavailable errors. Requests were intercepted in Chrome and fulfilled with a simulated 503 response before reaching the backend; no records were written. |
| Motion/fallback | Reduced-motion hero and button states verified. Hero content and direct navigation links remain readable with client JavaScript disabled. |

Review artifacts are in `.ui-review/experience/`: `report.json`, `forms-report.json`, `final-checks.json`, `source.diff`, and desktop/mobile screenshots. The full project source remains outside this ignored review directory.

## Limitations and preview

- Live form storage still depends on the existing secured database configuration. A successful production database submission was not tested or claimed.
- The build still warns about the parent-directory lockfile when inferring the workspace root. The production build succeeds; configuration and dependency files were preserved.
- Existing draft legal pages and unverified contact placeholders remain as before.
- No production Core Web Vitals or Lighthouse score was measured. No dependencies were added, existing images were reused, and animation uses native CSS and one observer per route.

Preview the existing development server at `http://localhost:3000`. To restart it, run `npm run dev` from `enmac-website`. For a production preview, use `npm run build` followed by `npm run start` on an available port.
