# PostHog analytics

## Intent

Connect PostHog to the published prototype and confirm that a pageview and an Autocapture click from the production URL reach PostHog (course quest Event Scout).

## Acceptance criteria

- posthog-js is initialised once at startup with Autocapture on and pageviews on hash route changes.
- Local builds and CI send nothing: the SDK starts only when `VITE_POSTHOG_PROJECT_TOKEN` is set at build time.
- Screens that show or collect personal data are excluded from Autocapture and hidden in session recordings; recordings mask all inputs.
- The privacy page says what is collected.
- The production URL serves the PostHog build and PostHog Activity → Live shows a Pageview and an Autocapture event from it.

## Implementation

- `src/lib/analytics.ts`: `initAnalytics()` with `autocapture: true`, `capture_pageview: "history_change"`, `person_profiles: "identified_only"`, session recording with `maskAllInputs` and `blockClass: "ph-no-capture"`. Host defaults to `https://eu.i.posthog.com`.
- `src/main.tsx` calls `initAnalytics()` before rendering.
- `src/features/prototype/app.tsx`: a `Private` wrapper (`ph-no-capture contents`, so layout is unchanged) around the apply, profile, profile preview, candidate applications, application detail, employer candidates, candidate detail and settings routes.
- Vercel environment variables (Production and Preview, type Config because the project token is public and write-only): `VITE_POSTHOG_PROJECT_TOKEN`, `VITE_POSTHOG_HOST`.
- In PostHog, Autocapture and session replay must also be enabled in the project settings.

## Status

Deployed on 2026-11-13: commit 50e1a23 pushed to `main`, Vercel production deployment Ready at https://doroboty-ai-blond.vercel.app. Waiting for the participant to confirm the Pageview and Autocapture events in PostHog Activity → Live.

## Verification

Local, before deploy (2026-11-13):

- Passed: Prettier check with `--end-of-line auto`, lint, typecheck, unit tests (8 files, 40 tests), production build.
- Failed for reasons outside this change, also failing on the unchanged checkout: plain Prettier check (CRLF line endings from `core.autocrlf=true`), `design-system:check` (agent-kit file hashes differ because of CRLF), `verify:packet` (same).
- Not run: browser journeys. Playwright Chromium is not installed on this machine (`chromium_headless_shell-1243` missing); all 34 tests failed at browser launch.

Production, after deploy (2026-11-13, built-in browser):

- The served bundle contains the project token and the EU host; PostHog loaded its config, recorder, dead-clicks and web-vitals scripts from eu-assets.i.posthog.com.
- After clicking "Zobacz oferty", the page sent event batches to `https://eu.i.posthog.com/i/v0/e/` and recording data to `https://eu.i.posthog.com/s/`. No console errors.
- `/#/app/settings` renders inside the `ph-no-capture` wrapper with computed `display: contents`.
- Not checked here: the events as shown inside PostHog (needs the participant's PostHog login).
