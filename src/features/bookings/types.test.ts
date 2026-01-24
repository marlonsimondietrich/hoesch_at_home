import { describe, expect, it } from "vitest";
import {
  BOOKING_ERROR_CODES,
  BOOKING_SOURCES,
  compareDateStrings,
  isDateString,
  toDateString,
} from "./types";

describe("booking types helpers", () => {
  it("accepts valid date strings", () => {
    expect(isDateString("2025-01-15")).toBe(true);
    expect(isDateString("2025-1-5")).toBe(false);
  });

  it("compares date strings lexicographically", () => {
    expect(compareDateStrings("2025-01-01", "2025-01-02")).toBeLessThan(0);
    expect(compareDateStrings("2025-01-02", "2025-01-01")).toBeGreaterThan(0);
  });

  it("coerces Date objects to date strings", () => {
    const date = new Date("2025-02-03T00:00:00.000Z");
    expect(toDateString(date)).toBe("2025-02-03");
  });

  it("exports expected source and error code lists", () => {
    expect(BOOKING_SOURCES).toContain("website");
    expect(BOOKING_ERROR_CODES).toContain("ERR_DATE_OCCUPIED");
  });
});
