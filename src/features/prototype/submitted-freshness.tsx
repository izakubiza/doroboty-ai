import { AlertTriangle, CheckCircle2, CircleMinus, Clock } from "lucide-react";
import { applicationAvailability, applicationFreshness } from "./application-freshness";
import type { Stage } from "./model";

const dateFormat = new Intl.DateTimeFormat("pl-PL", { dateStyle: "medium" });
const availabilityIcons = {
  current: CheckCircle2,
  ended: CircleMinus,
};

/**
 * Submission date, a filled day-count pill while the application awaits a decision, and an
 * outlined availability label (current / at risk / withdrawn). All are noninteractive.
 */
export function SubmittedFreshness({
  stage,
  submittedAt,
  now = new Date(),
}: {
  stage: Stage;
  submittedAt: string;
  now?: Date;
}) {
  const freshness = applicationFreshness(stage, submittedAt, now);
  const availability = applicationAvailability(stage);
  const AvailabilityIcon = availabilityIcons[availability.level];
  const FreshnessIcon = freshness?.level === "stale" ? AlertTriangle : Clock;
  return (
    <p className="submitted-freshness">
      <span>
        Zgłoszenie: <time dateTime={submittedAt}>{dateFormat.format(new Date(submittedAt))}</time>
      </span>
      {freshness && (
        <span className="freshness-label" data-freshness={freshness.level}>
          <FreshnessIcon aria-hidden="true" size={14} />
          {freshness.label}
        </span>
      )}
      <span className="availability-label" data-availability={availability.level}>
        <AvailabilityIcon aria-hidden="true" size={15} />
        {availability.label}
      </span>
    </p>
  );
}
