# Production readiness fixes

## Intent

Remove the release blockers found by the production-readiness audit (docs/production-readiness.html) before the first Vercel deployment.

## Acceptance criteria

- Formatting passes for FEATURES.md, docs/quest/\*, docs/tasks/own-work-summary.md.
- An unexpected render error shows a Polish recovery screen instead of a blank page; it does not display error text or modify the stored save. FEATURES.md SYS-12 records it.
- docs/RELEASE.md describes the Vercel release, the post-release smoke check with a rollback condition, rollback and incident steps.
- Lint, types, unit tests and build pass; the audit is refreshed.

## Status

Implemented locally. Not committed or deployed. Playwright journeys were not run locally (no provisioned Chromium); they run in CI after push.

## Verification

- Error screen verified in the dev server with a temporary thrown error (removed afterwards): heading "Coś poszło nie tak", reload/home/download-copy actions, local save unchanged, "home" returns to a working page.
