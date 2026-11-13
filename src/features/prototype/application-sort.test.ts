import { describe, expect, it } from "vitest";
import { isSortKey, sortApplications } from "./application-sort";
import { initialState } from "./model";

const names = (items: { candidateName: string }[]) => items.map((x) => x.candidateName);

describe("employer candidate sorting", () => {
  const apps = initialState().applications;

  it("orders by Match Score, highest first by default direction desc", () => {
    const scores = sortApplications(apps, "score", "desc").map((x) => x.score);
    expect(scores).toEqual([...scores].sort((a, b) => b - a));
    expect(scores[0]).toBe(77);
  });

  it("reverses for ascending and breaks score ties by name", () => {
    const sorted = sortApplications(apps, "score", "asc");
    expect(sorted[0].score).toBe(70);
    const tied = sorted.filter((x) => x.score === 72);
    expect(names(tied)).toEqual(["Marek Nowak", "Oliwia Mazur"]);
  });

  it("orders by submission date and by Polish name collation", () => {
    expect(sortApplications(apps, "date", "desc")[0].candidateName).toBe("Bartosz Krawczyk");
    expect(sortApplications(apps, "date", "asc")[0].candidateName).toBe("Zofia Lewandowska");
    expect(sortApplications(apps, "name", "asc")[0].candidateName).toBe("Bartosz Krawczyk");
    expect(sortApplications(apps, "name", "desc")[0].candidateName).toBe("Zofia Lewandowska");
  });

  it("does not mutate input and rejects unknown keys", () => {
    const before = names(apps);
    sortApplications(apps, "score", "desc");
    expect(names(apps)).toEqual(before);
    expect(isSortKey("score")).toBe(true);
    expect(isSortKey("salary")).toBe(false);
    expect(isSortKey(null)).toBe(false);
  });
});
