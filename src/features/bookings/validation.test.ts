import { describe, expect, it } from "vitest";
import { baseNewBooking, adjacentBooking, overlappingBooking } from "./__fixtures__/bookings";
import { hasOverlap, validateBookingInput } from "./validation";

describe("validateBookingInput", () => {
  it("accepts valid payloads", () => {
    const result = validateBookingInput(baseNewBooking);
    expect(result.ok).toBe(true);
  });

  it("rejects invalid date formats", () => {
    const result = validateBookingInput({ ...baseNewBooking, startDate: "05-01-2025" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("ERR_INVALID_DATE");
    }
  });

  it("rejects inverted ranges", () => {
    const result = validateBookingInput({
      ...baseNewBooking,
      startDate: "2025-05-10",
      endDate: "2025-05-01",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("ERR_INVALID_RANGE");
    }
  });
});

describe("hasOverlap", () => {
  it("detects overlap for intersecting ranges", () => {
    const incoming = baseNewBooking;
    const existing = [overlappingBooking];
    expect(hasOverlap(incoming, existing)).toBe(true);
  });

  it("allows adjacent non-overlapping ranges", () => {
    const incoming = baseNewBooking;
    const existing = [adjacentBooking];
    expect(hasOverlap(incoming, existing)).toBe(false);
  });
});
