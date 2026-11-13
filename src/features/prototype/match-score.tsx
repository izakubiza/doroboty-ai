function scoreBand(score: number) {
  return score >= 80 ? "green" : score >= 60 ? "yellow" : score >= 40 ? "orange" : "red";
}

const RING_RADIUS = 24;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

/**
 * Noninteractive scenario score. `pill` is the inline metadata fact; `ring` is the list-card
 * gauge, so the score no longer competes with label pills on the same card.
 */
export function MatchScore({
  score,
  variant = "pill",
}: {
  score: number;
  variant?: "pill" | "ring";
}) {
  const band = scoreBand(score);
  if (variant === "ring")
    return (
      <span
        className="match-ring"
        data-score-band={band}
        role="img"
        aria-label={`Match Score: ${score}%`}
      >
        <svg viewBox="0 0 60 60" aria-hidden="true">
          <circle className="match-ring-track" cx="30" cy="30" r={RING_RADIUS} />
          <circle
            className="match-ring-value"
            cx="30"
            cy="30"
            r={RING_RADIUS}
            strokeDasharray={`${(score / 100) * RING_LENGTH} ${RING_LENGTH}`}
            transform="rotate(-90 30 30)"
          />
          <text x="30" y="30" dominantBaseline="central" textAnchor="middle">
            {score}%
          </text>
        </svg>
        <span aria-hidden="true" className="match-ring-caption">
          Match Score
        </span>
      </span>
    );
  return (
    <span className="match-score" data-score-band={band}>
      Match Score: {score}%
    </span>
  );
}
