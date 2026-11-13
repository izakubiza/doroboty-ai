import { stageLabels, type Stage } from "./model";

/** Ordered main path of the recruiting process; rejected/withdrawn end it early. */
export const mainStages = [
  "submitted",
  "reviewed",
  "interview_invited",
  "first_conversation_held",
  "continued",
  "hired",
] as const satisfies readonly Stage[];

export const shortStageLabels: Record<(typeof mainStages)[number], string> = {
  submitted: "Nowe",
  reviewed: "Przejrzane",
  interview_invited: "Zaproszenie",
  first_conversation_held: "Rozmowa",
  continued: "Kontynuacja",
  hired: "Zatrudnienie",
};

export type StageProgress = {
  /** 1-based position of the furthest main stage reached. */
  step: number;
  total: number;
  outcome: "open" | "hired" | "rejected" | "withdrawn";
  label: string;
};

/** Derives the furthest main stage from the recorded history, also for ended processes. */
export function stageProgress(stage: Stage, history: { stage: Stage }[]): StageProgress {
  const total = mainStages.length;
  const reached = history.reduce((max, event) => {
    const index = (mainStages as readonly Stage[]).indexOf(event.stage);
    return Math.max(max, index);
  }, 0);
  const step = reached + 1;
  const outcome =
    stage === "hired"
      ? "hired"
      : stage === "rejected"
        ? "rejected"
        : stage === "withdrawn"
          ? "withdrawn"
          : "open";
  const label =
    outcome === "open" || outcome === "hired"
      ? `Etap ${step} z ${total}: ${stageLabels[stage]}`
      : `${stageLabels[stage]} na etapie ${step} z ${total} (${shortStageLabels[mainStages[reached]]})`;
  return { step, total, outcome, label };
}
