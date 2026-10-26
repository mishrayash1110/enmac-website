# Frontend-only deployment

The default `npm run build` now exports the site into `out/`. Upload that directory to a static host with directory-index support. No Node server, database or Gmail credentials are needed for this export. Next image optimization is disabled because it needs a server; original image assets are exported instead.

The POST handlers are preserved under `src/backend-disabled/`, outside the App Router. The loan categories endpoint is exported as static JSON. Backend helper code remains in the repository for future use but is not a live submission service.

## Deployment-time configuration

Set `NEXT_PUBLIC_SITE_URL` to the final origin (for example, `https://your-domain.in`) **before building**. Rebuild when the domain changes: environment variables cannot be changed in already exported HTML. Blank or example.com values produce an empty sitemap and omit the sitemap reference from robots.txt. Invalid origins fail the build. Unapproved legal pages remain excluded from the sitemap and retain their existing noindex metadata.

## Still required before a public launch

- Connect the existing enquiry/application flows to the planned direct-email behavior and configure the recipient. The current forms are unchanged and still call `/api/enquiries` and `/api/applications`; these URLs do not accept submissions in the static export. The static build passing does not mean enquiry delivery works.
- Confirm the final domain, set `NEXT_PUBLIC_SITE_URL`, and rebuild.
- Obtain ENMAC approval for the four legal pages. Confirm the legal business identity, privacy contact, email enquiry handling/sharing/retention/deletion procedures, actual fees/commissions/refunds, grievance contact, response/escalation procedures and website terms. The repository does not contain enough verified information to finalize these. Draft labels and policy copy have deliberately been preserved; they are not approved production policies.
- Check navigation, images, mobile layouts and direct deep links on the selected static host, and verify the final email flow.

## Verification

Run `npm run verify` and `npm run lint`. Deploy `out/`, not `.next/`, and do not use `npm start` for static hosting. The previous README and EMAIL_SETUP instructions describe the older server-based delivery and do not apply to this frontend-only export.
