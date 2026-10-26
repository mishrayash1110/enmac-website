# ENMAC Asset Handoff — REQUIRED BEFORE PUBLIC RELEASE

The uploaded specification refers to **an original ENMAC logo** and **three approved photographs** (corporate consultation, family/home, growth/planning). The only file supplied with this coding request was a text specification. No verified image/logo binaries were accessible in the Project file search.

Because the specification forbids inventing branding or replacing approved photography, the current site has a CSS-drawn temporary ENMAC wordmark and clearly defined **original abstract financial illustrations** via `src/components/home/FinancialArt.tsx`. These are not claimed to be the uploaded images. The sample SVG in `public/branding/enmac-placeholder.svg` explicitly says PLACEHOLDER WORDMARK and is **not** the genuine logo.

## When approved files become available

1. Put the exact original logo under `public/branding/enmac-logo.png` or `.svg` and replace the temporary header/footer wordmark in `src/components/layout/Header.tsx` and `Footer.tsx` with a `next/image` (or an appropriate inline SVG if permitted). Preserve original proportions and colour.
2. Put approved consultation imagery in `public/images/hero/`, family/home imagery in `public/images/home/`, and growth/strategic planning imagery in `public/images/business/`.
3. Swap each `FinancialArt` placement with the approved image in these paths: homepage hero, About, home/property and corporate detail. Use `next/image`, descriptive alt text and responsive `sizes`, while retaining decorative treatment as needed.
4. Verify image cropping at widths 360, 390, 768, 1024, 1280 and 1440.
5. Obtain verified public company contact details, registration information and approved legal text before removing notices and setting legal pages indexable.

Do not claim these assets have been installed until the actual binaries exist.
