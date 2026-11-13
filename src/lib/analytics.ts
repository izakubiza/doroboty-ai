import posthog from "posthog-js";

// PostHog product analytics. The project API key is a public, write-only key;
// it is read from the build environment so local builds and CI stay silent.
const key = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN as string | undefined;
const host =
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ?? "https://eu.i.posthog.com";

// Elements (and their children) with this class are skipped by Autocapture and
// hidden in session recordings. Use it on areas that show or collect private data.
export const NO_CAPTURE = "ph-no-capture";

export function initAnalytics() {
  if (!key) return;
  posthog.init(key, {
    api_host: host,
    defaults: "2025-11-30",
    autocapture: true,
    // Hash routes change the URL through the History API.
    capture_pageview: "history_change",
    person_profiles: "identified_only",
    session_recording: {
      maskAllInputs: true,
      blockClass: NO_CAPTURE,
    },
  });
}
