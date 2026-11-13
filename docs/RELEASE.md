# Release, smoke check, rollback and incidents

Target: Vercel, static site for course participants and testers. Owner: the project owner (repository izakubiza/doroboty-ai). Readiness evidence: [production-readiness.html](production-readiness.html).

The app is static: no server, accounts, database, environment variables or external runtime requests. All scenario data lives in each visitor's browser (localStorage, per domain).

## 1. Release a known version

1. Commit the exact files to release on `main` and push. Vercel deploys only committed code.
2. Wait for GitHub Actions **CI** to pass on that commit (`./scripts/verify`: format, design-system check, lint, types, unit tests, packet check, build, Playwright journeys). Do not release a red commit.
3. Vercel project settings (first time only):
   - Import the GitHub repository; framework preset **Vite**.
   - Build command `npm run build`, output directory `dist`, install command `npm ci`.
   - Node.js version 24 (also declared in `package.json` engines and `.nvmrc`).
   - No environment variables and no `vercel.json` are needed: hash routing (`/#/...`) and `base: "./"` work without rewrites.
4. Note the released commit SHA and the Vercel deployment URL in the readiness report.

## 2. Smoke check right after publishing (about 5 minutes)

Run on the production URL in a private browser window (empty localStorage):

1. The address opens over HTTPS without certificate warnings; the home page shows offers.
2. `/#/oferty` lists jobs; one job detail and one company page open.
3. Choose Karolina → add and publish a test offer.
4. Choose Anna → apply to that offer; submitting without approval shows the approval message; with approval it is sent.
5. Choose Karolina → open the candidate → mark reviewed → send the interview invitation; reload and the stage stays.
6. Choose Tomasz → the same candidate URL shows "Nie znaleziono strony".
7. Open a CV PDF from Anna's profile.
8. Browser DevTools: no console errors; Network shows requests only to the Vercel domain.
9. Check on a phone-width window that navigation works.

**Rollback condition:** if step 1, 3, 4 or 5 fails, or the console shows errors on these steps, roll back (section 3) and investigate before trying again.

Finally, clear the test data: Ustawienia → reset.

## 3. Roll back

- **First release:** there is no previous version. If the smoke check fails, stop sharing the link and either fix forward or pause the project in Vercel (Project Settings) until fixed.
- **Later releases:** Vercel dashboard → project → Production Deployment tile → **Instant Rollback** → choose the previous deployment → **Confirm Rollback**. On the Hobby plan only the immediately previous production deployment is available.
- After a rollback Vercel stops promoting new pushes automatically. Once a fix is deployed, use **Manage** on the Production Deployment tile (or `vercel promote <deployment-url>`) to promote it and restore automatic promotion.
- Data impact: none on the server. Testers keep their browser saves. An older version that cannot read a newer save shows the incompatible-save screen and does not overwrite it; testers can export it in Ustawienia.

Source: Vercel docs "Performing an Instant Rollback on a Deployment" (checked 2026-11-13).

## 4. Incident: what to do when the app does not work

1. Confirm: open the production URL in a private window. Note what fails and when.
2. Check the latest Vercel deployment status and build log, and the CI run for that commit.
3. If the last release caused it, roll back (section 3).
4. If a single tester is affected, ask them to reload; if the "Coś poszło nie tak" screen appears, ask them to download the data copy and describe what they did (no real personal data).
5. Tell testers (course channel) that the app is unavailable and when it is back.
6. Record the cause and the fix in `docs/tasks/`.

Owner: the project owner, who needs access to the Vercel project and the GitHub repository.
