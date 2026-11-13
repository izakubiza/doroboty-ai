export type SortKey = "score" | "date" | "name";
export type SortDir = "asc" | "desc";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "score", label: "Match Score" },
  { value: "date", label: "Data zgłoszenia" },
  { value: "name", label: "Imię i nazwisko" },
];

export const sortDirLabels: Record<SortKey, Record<SortDir, string>> = {
  score: { desc: "od najwyższego", asc: "od najniższego" },
  date: { desc: "od najnowszych", asc: "od najstarszych" },
  name: { desc: "Z–A", asc: "A–Z" },
};

export function isSortKey(value: string | null): value is SortKey {
  return sortOptions.some((x) => x.value === value);
}

/** Employer-chosen list order; ties fall back to candidate name A–Z. Never mutates input. */
export function sortApplications<
  T extends { score: number; candidateName: string; events: { at: string }[] },
>(items: T[], key: SortKey, dir: SortDir): T[] {
  const sign = dir === "asc" ? 1 : -1;
  const submittedAt = (x: T) => x.events[0]?.at ?? "";
  const byName = (a: T, b: T) => a.candidateName.localeCompare(b.candidateName, "pl");
  return [...items].sort((a, b) => {
    const primary =
      key === "score"
        ? a.score - b.score
        : key === "date"
          ? submittedAt(a).localeCompare(submittedAt(b))
          : byName(a, b);
    return sign * primary || byName(a, b);
  });
}
