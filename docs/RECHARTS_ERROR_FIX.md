# Resolution: Recharts / es-toolkit module-not-found errors

## Error reported (23 October 2026)

The user-provided Next.js browser log showed failure to resolve `es-toolkit/compat/get`, `es-toolkit/compat/isEqual`, `range`, `sortBy`, `throttle`, `uniqBy`, and `../dist/compat/object/get.js`. All import traces passed through `recharts` and `src/components/calculators/CalculatorSuite.tsx`, causing `GET /` HTTP 500.

## Patch

- Removed `recharts` from `package.json` (it was only needed for one illustration).
- Replaced the Recharts-only amortization chart with a native SVG responsive balance chart inside `CalculatorSuite.tsx`.
- Kept EMI calculations, financial inputs, totals, principal/interest progress bar, and chart data.
- Added a regression test ensuring no Recharts dependency remains in the calculator.

## Verification performed

- `npm test`: 14/14 passed.
- Independent TypeScript parse and local alias import resolution: 41 source files, 0 syntax/import errors.
- `npm install` and `next build`: **not verified** in this environment because registry.npmjs.org DNS lookup fails with `EAI_AGAIN`. Full functional/visual browser testing must be run on the target development machine.

## How to upgrade safely on Windows

1. Extract the **fixed** archive into a new folder, ensuring the terminal is in the nested `enmac-website` directory that contains `package.json`.
2. Copy your existing `.env.local` into the new folder, only if you already configured one. Never include secrets when sharing source code.
3. Close your existing Next.js process with `Ctrl+C`.
4. In the new folder, run:

```powershell
npm.cmd install
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npm.cmd run dev
```

The new folder will install dependencies without Recharts or its `es-toolkit` dependency chain. If using the old folder instead, replace **all** patched source files, clear `node_modules` and `.next`, delete the old lockfile, then reinstall as described in `README.md`.
