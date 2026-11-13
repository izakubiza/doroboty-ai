import { describe, expect, it } from "vitest";
import { stageProgress } from "./stage-progress";
import type { Stage } from "./model";

const history = (...stages: Stage[]) => stages.map((stage) => ({ stage }));

describe("recruiting stage progress", () => {
  it("places open applications on the main path", () => {
    expect(stageProgress("submitted", history("submitted"))).toEqual({
      step: 1,
      total: 6,
      outcome: "open",
      label: "Etap 1 z 6: Nowe zgłoszenie",
    });
    expect(
      stageProgress("interview_invited", history("submitted", "reviewed", "interview_invited")),
    ).toMatchObject({ step: 3, outcome: "open", label: "Etap 3 z 6: Zaproszenie wysłane" });
  });

  it("keeps the furthest stage reached when the process ends early", () => {
    expect(stageProgress("withdrawn", history("submitted", "withdrawn"))).toMatchObject({
      step: 1,
      outcome: "withdrawn",
      label: "Wycofane przez kandydata na etapie 1 z 6 (Nowe)",
    });
    expect(
      stageProgress("rejected", history("submitted", "reviewed", "interview_invited", "rejected")),
    ).toMatchObject({
      step: 3,
      outcome: "rejected",
      label: "Odrzucone na etapie 3 z 6 (Zaproszenie)",
    });
  });

  it("completes the path on hire", () => {
    expect(
      stageProgress(
        "hired",
        history(
          "submitted",
          "reviewed",
          "interview_invited",
          "first_conversation_held",
          "continued",
          "hired",
        ),
      ),
    ).toMatchObject({ step: 6, outcome: "hired", label: "Etap 6 z 6: Zatrudnienie" });
  });
});
