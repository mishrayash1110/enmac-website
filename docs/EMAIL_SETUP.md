# ENMAC enquiry email integration

The existing Next.js 16 / React 19 static-export website posts JSON directly to https://formsubmit.co/ajax/b1b627427bf82c27b178b99237680236. No environment variables, SMTP credentials, database or email server are required. Existing disabled backend code is retained for compatibility but is not called by these forms.

## Forms connected
- Homepage compact quick enquiry.
- Contact quick enquiry at /apply.
- Guided individual and business loan application at /apply.
There is no separate callback or consultation form; existing links lead to /apply. Calculators and the loan finder do not submit customer enquiries and remain unchanged.

The subject is New ENMAC Website Enquiry. The email identifies the form and source pathname, contact information, category, amount, city and consent. Guided forms also send financing purpose and employment/business category when supplied. Reply-To is the customer's email. An explicit allowlist excludes income, turnover, obligations and other financial profile information. Never enter identity numbers, banking details or confidential records in free-text fields; frontend code cannot reliably detect every sensitive value typed into free text.

## Run locally and build
From the enmac-website directory:

```powershell
npm install
npm run dev
# Open http://localhost:3000
npm run typecheck
npm test
npm run build
```

Production output is out/. Serve that folder with a static HTTP host; next start is not supported by this project's static export. For a local production preview, run `python -m http.server 3001 --directory out` and open http://localhost:3001. Do not open HTML through file://. Any hosting CSP must permit connect-src https://formsubmit.co.

## One-time receiving email activation
1. Start the local website and submit a test enquiry using non-sensitive test details.
2. Open enmacrfs@gmail.com and find the FormSubmit activation email.
3. Confirm the receiving email using its activation link. This is a one-time receiving-address activation; follow any additional origin verification requested by the provider.
4. Submit another enquiry and verify the form source, subject, customer details and Reply-To in the inbox.
5. Repeat for the guided application and deployed website.

If activation mail is missing, check Spam, Promotions, All Mail, filters and blocked senders. Confirm the destination spelling and inspect the request in browser Network tools. Retry after a short wait; use FormSubmit support if activation remains unavailable. API success confirms provider acceptance, not final inbox delivery or activation. Provider activation failures that return an unsuccessful response show the standard error and preserve the form. The API may acknowledge an activation request without delivering an enquiry; activation and a second test are essential.

## Verification procedure
Use browser developer tools with only test data. Test the homepage, /apply quick form, and both individual/business guided applications.
1. Submit valid data; verify one POST to the fixed FormSubmit endpoint and check the allowlisted JSON. After confirmed success, the exact thank-you message appears and details clear. Start another guided application or refill the quick form.
2. Try empty fields, malformed email, a short/invalid Indian mobile, whitespace-only name/city/purpose, invalid amounts and an unchecked required declaration. No request should be sent; correct fields and retry. Guided final validation also checks earlier steps.
3. Throttle the network, submit, and double-click/press Enter repeatedly. The button should show Sending enquiry or Submitting and remain disabled; only one request should start while pending. Previous is disabled during guided submission.
4. Switch Network to Offline before submitting. The standard error must appear, fields must remain, and a retry after restoring connectivity must work.
5. Using a browser fetch override or request-interception tool in a test session, return HTTP 500, HTTP 200 with success:false, malformed JSON, and an unexpected empty object. Each must show the standard error and preserve data. Return HTTP 200 with {"success":"true"} or {"success":true}; only these acknowledged responses should clear the form. Mocked responses do not prove email delivery.
6. Delay the response beyond 20 seconds; verify the loading state ends with an error. Restore connectivity and retry. A timeout can occur after provider acceptance, so retries may duplicate an email; no automatic retries are performed.
7. Fill the hidden _honey field in developer tools; submission must fail locally without a request or false success.
8. At 375px and desktop widths, verify existing layout, loading/error/success feedback and guided navigation. No CSS, imagery, colors or layout rules were changed.
9. Run typecheck, tests and build. Serve out/ over HTTP and repeat the above against the production output and actual deployed domain.

## Limits and security
Honeypots and browser validation reduce accidental/bot submissions but cannot guarantee spam prevention. FormSubmit's supported _honey and table template are used; no CAPTCHA widget, secret key or browser SMTP is added. Default provider filtering is retained. FormSubmit handles third-party processing and retention; review its policy for production use. The public recipient endpoint can be found in client code. FormSubmit AJAX does not support customer autoresponse emails; this implementation provides immediate on-page feedback only. There is no delivery receipt, provider-independent rate limiter or cross-tab idempotency guarantee.

Official references: https://formsubmit.co/documentation and https://formsubmit.co/ajax-documentation.

Automated tests mock provider responses; real mailbox delivery has not been verified by this implementation task.

## Persistent activation troubleshooting
The integration sends the documented `_url` as the current origin and pathname, excluding query strings and fragments. Development console warnings distinguish activation rejection from network/response failures without logging customer data. Use the latest activation email matching the endpoint and form URL; an old consumed confirmation link can report Confirmation token not found. Do not repeatedly switch endpoints or reuse that old link. If the latest confirmation succeeds but submissions still return needs Activation, contact FormSubmit support with the form URL and provider response (no customer details). No successful live acceptance or inbox delivery has been confirmed.
