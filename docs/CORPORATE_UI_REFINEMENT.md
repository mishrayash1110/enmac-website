# ENMAC corporate UI refinement

Implemented in the current project without importing a previous website or replacing its architecture.

## Visual changes

- Added a shared corporate presentation layer with white, `#F7F8F7` off-white, charcoal headings, slate body text, neutral borders, and restrained ENMAC blue actions.
- Reduced heading weights, excessive rounding, coloured surfaces, shadows, gradients, glowing shapes, and decorative rings.
- Retained the original ENMAC logo image without changing its file or colours. The financing network now uses that same logo.
- Reused the existing project imagery for the hero and supporting editorial photographs. No new stock imagery or libraries were added.
- Converted Why ENMAC into an editorial photograph-and-text layout, preserving its three benefit statements.
- Replaced decorative dashboard artwork with existing photography and readable captions.
- Refined loan cards, the business feature, calculators, forms, search, filters, process controls, FAQs, navigation, footer, legal pages, and utility states through shared styles.
- Added a keyboard skip link, retained visible focus indicators, and kept reduced-motion support.

## Modified and added files

| File | Change |
| --- | --- |
| `src/app/corporate.css` | Added corporate design tokens and shared presentation styles, including responsive rules. |
| `src/app/layout.tsx` | Loads the presentation layer, adds a scoped body class and keyboard skip link. Existing metadata is unchanged. |
| `src/app/page.tsx` | Reuses existing photography and composes the Why ENMAC section editorially. Original copy, tools, sections, and links remain. |
| `src/components/home/FinancialArt.tsx` | Replaces decorative dashboard graphics with existing image assets and captions. |
| `src/components/home/FinancialNetwork.tsx` | Uses the original ENMAC logo in the center; categories, state, events, and routes are unchanged. |
| `eslint.config.mjs` | Excludes the existing ignored `.ui-review` directory so browser profiles and local review snapshots are not linted as application code. |
| `docs/CORPORATE_UI_REFINEMENT.md` | This delivery and verification report. |

The previous global stylesheet is retained as the layout foundation. The new scoped stylesheet changes presentation without rewriting each page or removing existing customizations.

## Preservation checks

- Git was not available on PATH and no `.git` directory was present in this checkout. A local pre-edit source snapshot and SHA-256 manifest were created under `.ui-review/corporate-baseline/`; no Git restore or reset commands were used.
- All 15 protected files match the snapshot: finance calculations, form logic, validations, API handlers, service and guide data, package files, and Next configuration.
- Compared paragraphs in 34 generated HTML pages against the pre-edit rendered baseline: no original paragraph was removed or changed.
- The original logo and existing photography files were not edited.
- No changes to database configuration, formulas, business rules, validation, API contracts, SEO metadata, or service routes.

## Executed checks

| Check | Actual result |
| --- | --- |
| `npm run typecheck` | Passed. |
| ESLint on changed TSX files and ESLint configuration | Passed. |
| `npm run lint` | Reports the existing two `react-hooks/preserve-manual-memoization` errors in `CalculatorSuite.tsx` and one existing anonymous-default-export warning in `postcss.config.mjs`. These unrelated files were left unchanged. |
| `npm test` | All 14 existing tests passed. |
| `npm run build` | Passed; all 39 build entries generated successfully. |
| Chrome layout checks | 116 checks across 32 routes; no horizontal overflow. Main routes tested at 360, 390, 768, 1024, 1280, and 1440 pixels. Every remaining loan and article page tested at 390 and 1440 pixels. |
| Browser runtime | No JavaScript exceptions during the route and interaction review. |
| Menus and tools | Mobile menu, desktop dropdown, financing tabs, network selection, process navigation, FAQ, loan finder, loan search, guide search/filtering, and reduced-motion treatment verified. All eight financing network categories remain in source. |
| Calculators | EMI responded to a principal change (`₹25,357` to `₹10,143` using the existing rate and tenure), comparison and prepayment modes rendered, checklist state updated. Finance formulas remain unchanged. |
| Forms | Business application advanced through its existing steps and displayed the entered information in the review. Native enquiry validation worked. Both forms displayed the expected error when a 503 response was simulated. |

Form requests in the submission checks were intercepted and fulfilled in the browser before reaching the backend. No review records were written to the database. This verifies form UI behaviour, not a successful production database submission.

Desktop and mobile screenshots and browser reports are in `.ui-review/corporate/`. Examples: `home-desktop.png`, `home-mobile.png`, `why-desktop.png`, `business-feature-desktop.png`, `calculators-desktop.png`, `apply-mobile.png`, `report.json`, and `forms-report.json`. The source comparison is in `source.diff` in that directory.

## Existing limitations

- Full-project lint still has the pre-existing calculator errors and PostCSS warning described above.
- The build warns about multiple lockfiles and infers the parent workspace root. The production build succeeds; dependency files and Next configuration were preserved.
- Live enquiry/application storage still requires the existing secured PostgreSQL setup. Database write success was not claimed or tested.
- The existing legal pages remain marked as drafts, and unverified company contact details remain unfilled.
- Existing generated images are illustrative; they are not presented as photographs of actual ENMAC employees, offices, customers, or partners.

## Preview

The current development server is available at `http://localhost:3000`.

To start it again from the workspace root:

```powershell
cd enmac-website
npm run dev
```

For a production preview, run `npm run build`, then `npm run start` from `enmac-website` using a free port if the development server already occupies port 3000.
