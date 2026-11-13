# First Vercel release

## Intent

Publish the prototype as a static site on Vercel under a public HTTPS production URL (course quest Deploy Pilot), following docs/RELEASE.md.

## Acceptance criteria

- A Vercel project exists with the settings from docs/RELEASE.md.
- The production URL opens without logging in to Vercel.
- One user journey works on the production URL.

## Status

Released on 2026-11-13.

- Production URL: https://doroboty-ai-blond.vercel.app
- Vercel project: izakubiza/doroboty-ai (Hobby), connected to GitHub izakubiza/doroboty-ai, production branch `main`. The GitHub connection was added in the dashboard after the first release, so pushes to `main` now deploy to production.
- Released commit: aeab3f0, deployed with the Vercel CLI (`vercel deploy --prod`), state Ready.
- Project settings: framework Vite, Node.js 24.x (Vercel defaulted to 26.x from `engines`; changed to match .nvmrc), install `npm ci`, build `npm run build`, output `dist`. No environment variables.
- `vercel link` added `.vercel` to .gitignore. It also wrote a `.env.local` with a Vercel OIDC token; that file was deleted because the static app does not use it (`.env*` is already ignored).

## Verification

Run on the production URL in the built-in browser with empty storage:

- HTTPS 200 with HSTS; no Vercel login required.
- Home page and `/#/oferty` show 6 offers.
- Choose Anna → AI Product Manager → Aplikuj. Submitting without approval is blocked with "Zatwierdź treść aplikacji i jej przesłanie pracodawcy." and focus moves to the checkbox. With approval the button shows "Wysłano!".
- After reload, Moje aplikacje lists the application with status "Aplikacja wysłana".
- Anna's CV PDF returns 200 application/pdf.
- No console errors; all network requests went to the Vercel domain.

Not run: the employer part of the RELEASE.md smoke check (Karolina publishes an offer and records a decision, Tomasz cannot see the candidate) and the phone-width check.

## Notes

- PowerShell on this machine blocks `.ps1` scripts; run the CLI as `vercel.cmd`.
- In Git Bash, `vercel api /v9/...` needs `MSYS_NO_PATHCONV=1`, otherwise the path is rewritten to a Windows path.
- FEATURES.md reviewed: no behavior change, no update needed.
