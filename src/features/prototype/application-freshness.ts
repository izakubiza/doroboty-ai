import type { Stage } from "./model";

/**
 * Thresholds follow the case evidence: invitations within 3 days of applying were declined by
 * 4–6% of candidates, invitations after more than 8 days by 18–22%.
 */
export const FRESH_MAX_DAYS = 3;
export const STALE_MIN_DAYS = 8;

export type Freshness = "fresh" | "waiting" | "stale";

/** Stages in which the candidate still waits for the employer's first decision. */
const awaitingStages: Stage[] = ["submitted", "reviewed"];

/** Whole calendar days between submission and `now`, in the viewer's local time zone. */
export function daysSince(submittedAt: string, now: Date): number {
  const start = new Date(submittedAt);
  const from = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const to = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((to - from) / 86_400_000));
}

function dayCount(days: number) {
  return days === 0 ? "dziś" : days === 1 ? "1 dzień" : `${days} dni`;
}

export type Availability = "current" | "ended";

/** An application is current while its process is open: not withdrawn, rejected or hired. */
export function isCurrentApplication(stage: Stage): boolean {
  return stage !== "withdrawn" && stage !== "rejected" && stage !== "hired";
}

/**
 * Whether the application is still current. A long wait does not make it outdated; the risk of
 * losing the candidate is part of the day-count label instead.
 */
export function applicationAvailability(stage: Stage): { level: Availability; label: string } {
  // The stage bar explains why an application ended (withdrawn, rejected, hired).
  return isCurrentApplication(stage)
    ? { level: "current", label: "Aktualne" }
    : { level: "ended", label: "Nieaktualne" };
}

/** Freshness label for applications awaiting a decision; `null` once the employer has acted. */
export function applicationFreshness(
  stage: Stage,
  submittedAt: string,
  now: Date,
): { level: Freshness; label: string; days: number } | null {
  if (!awaitingStages.includes(stage)) return null;
  const days = daysSince(submittedAt, now);
  if (days <= FRESH_MAX_DAYS)
    return { level: "fresh", label: days === 0 ? "Nowe · dziś" : `Nowe · ${dayCount(days)}`, days };
  if (days >= STALE_MIN_DAYS)
    return {
      level: "stale",
      label: `Czeka ${dayCount(days)} · ryzyko utraty kandydata`,
      days,
    };
  return { level: "waiting", label: `Czeka ${dayCount(days)}`, days };
}
