import { describe, expect, it } from "vitest";
import {
  applicationAvailability,
  applicationFreshness,
  daysSince,
  isCurrentApplication,
} from "./application-freshness";

const now = new Date(2026, 10, 7, 15, 0);
const at = (day: number) => new Date(2026, 10, day, 9, 30).toISOString();

describe("application freshness", () => {
  it("counts calendar days in local time", () => {
    expect(daysSince(at(7), now)).toBe(0);
    expect(daysSince(at(6), now)).toBe(1);
    expect(daysSince(new Date(2026, 9, 30, 23, 0).toISOString(), now)).toBe(8);
  });

  it("marks up to 3 days as fresh, 8 or more as stale, the rest as waiting", () => {
    expect(applicationFreshness("submitted", at(7), now)).toMatchObject({
      level: "fresh",
      label: "Nowe · dziś",
    });
    expect(applicationFreshness("submitted", at(6), now)?.label).toBe("Nowe · 1 dzień");
    expect(applicationFreshness("reviewed", at(4), now)).toMatchObject({
      level: "fresh",
      label: "Nowe · 3 dni",
    });
    expect(applicationFreshness("submitted", at(3), now)).toMatchObject({
      level: "waiting",
      label: "Czeka 4 dni",
    });
    expect(
      applicationFreshness("submitted", new Date(2026, 9, 30).toISOString(), now),
    ).toMatchObject({
      level: "stale",
      label: "Czeka 8 dni · ryzyko utraty kandydata",
    });
  });

  it("keeps long-waiting applications current; only withdrawal, rejection or hire end them", () => {
    for (const stage of ["submitted", "reviewed", "interview_invited", "continued"] as const) {
      expect(isCurrentApplication(stage)).toBe(true);
      expect(applicationAvailability(stage)).toEqual({ level: "current", label: "Aktualne" });
    }
    for (const stage of ["withdrawn", "rejected", "hired"] as const) {
      expect(isCurrentApplication(stage)).toBe(false);
      expect(applicationAvailability(stage)).toEqual({ level: "ended", label: "Nieaktualne" });
    }
  });

  it("hides the label once the employer has acted", () => {
    for (const stage of ["interview_invited", "rejected", "withdrawn", "hired"] as const)
      expect(applicationFreshness(stage, at(1), now)).toBeNull();
  });
});
