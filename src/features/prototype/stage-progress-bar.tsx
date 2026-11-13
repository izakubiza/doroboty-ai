import type { Stage } from "./model";
import { mainStages, shortStageLabels, stageProgress } from "./stage-progress";

/**
 * Noninteractive recruiting progress: a readable "Etap N z 6" sentence plus a decorative
 * six-segment bar (done = ink, current = pink, ended early = red contour, ahead = neutral).
 */
export function StageProgressBar({
  stage,
  history,
}: {
  stage: Stage;
  history: { stage: Stage }[];
}) {
  const progress = stageProgress(stage, history);
  return (
    <div className="stage-progress" data-outcome={progress.outcome}>
      <p className="stage-progress-label">{progress.label}</p>
      <ol className="stage-progress-steps" aria-hidden="true">
        {mainStages.map((name, index) => {
          const position = index + 1;
          const state =
            position < progress.step ? "done" : position === progress.step ? "current" : "ahead";
          return (
            <li key={name} data-state={state}>
              <span className="stage-progress-segment" />
              <span className="stage-progress-name">{shortStageLabels[name]}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
