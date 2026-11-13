import { Star } from "lucide-react";
import type { WorkSummary } from "./model";

export const OWN_WORK_LABEL = "Dodany opis własnej pracy";
const WORK_SUMMARY_HEADING = "Co kandydat zrobił sam";

/** Noninteractive fact pill for applications whose candidate describes their own work. */
export function OwnWorkLabel() {
  return (
    <span className="own-work-label">
      <Star aria-hidden="true" size={16} fill="currentColor" />
      {OWN_WORK_LABEL}
    </span>
  );
}

/** Bolds the leading "Nie opisuje…" clause when the candidate gives no own-work description. */
function OwnContribution({ work }: { work: WorkSummary }) {
  const split = work.own.indexOf(";");
  if (work.ownWork || split < 0) return work.own;
  return (
    <>
      <strong>{work.own.slice(0, split)}</strong>
      {work.own.slice(split)}
    </>
  );
}

/** Prepared three-part summary: own contribution, team contribution and project. */
export function WorkSummaryFacts({ work }: { work: WorkSummary }) {
  return (
    <dl className="work-summary">
      <div className="work-summary-own" data-own-work={work.ownWork}>
        <dt>Własny wkład</dt>
        <dd>
          <OwnContribution work={work} />
        </dd>
      </div>
      <div>
        <dt>Zespół</dt>
        <dd>{work.team}</dd>
      </div>
      <div>
        <dt>Projekt</dt>
        <dd>{work.project}</dd>
      </div>
    </dl>
  );
}

/** Highlighted list-card block: heading plus the three-part summary. */
export function WorkSummaryCard({ work }: { work: WorkSummary }) {
  return (
    <section className="work-summary-card" aria-label={WORK_SUMMARY_HEADING}>
      <p className="work-summary-heading" aria-hidden="true">
        {WORK_SUMMARY_HEADING}
      </p>
      <WorkSummaryFacts work={work} />
    </section>
  );
}

/** Employer-only detail block: summary plus questions for the first conversation. */
export function WorkSummaryDetail({ work }: { work: WorkSummary }) {
  return (
    <section className="work-summary-detail" aria-labelledby="work-summary-heading">
      <h3 id="work-summary-heading">{WORK_SUMMARY_HEADING}</h3>
      <p className="record-caption">
        Podsumowanie przygotowane w scenariuszu prototypu na podstawie odpowiedzi i CV.
      </p>
      <div className="work-summary-card">
        <WorkSummaryFacts work={work} />
      </div>
      <h3 id="work-questions-heading">Pytania na pierwszą rozmowę</h3>
      <ol className="work-questions" aria-labelledby="work-questions-heading">
        {work.questions.map((question) => (
          <li key={question}>{question}</li>
        ))}
      </ol>
    </section>
  );
}
