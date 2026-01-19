import { describe, expect, it } from "vitest";
import type { Booking } from "../bookings/types";
import { buildBookingUid, buildIcalFeed } from "./export";

describe("buildIcalFeed", () => {
  it("renders a deterministic calendar with all-day events", () => {
    const booking: Booking = {
      id: "abc123",
      startDate: "2025-05-01",
      endDate: "2025-05-05",
      source: "website",
      price: 0,
    };
    const now = new Date("2025-01-02T03:04:05Z");

    const body = buildIcalFeed([booking], now);

    expect(body).toContain("BEGIN:VCALENDAR");
    expect(body).toContain("END:VCALENDAR");
    expect(body).toContain(`UID:${buildBookingUid(booking)}`);
    expect(body).toContain("DTSTART;VALUE=DATE:20250501");
    expect(body).toContain("DTEND;VALUE=DATE:20250505");
    expect(body).toContain("DTSTAMP:20250102T030405Z");
    expect(body).toContain("SUMMARY:Booked / Gebucht");
  });

  it("orders events by start date, end date, and id", () => {
    const bookings: Booking[] = [
      {
        id: "b",
        startDate: "2025-06-10",
        endDate: "2025-06-12",
        source: "website",
        price: 0,
      },
      {
        id: "a",
        startDate: "2025-06-01",
        endDate: "2025-06-03",
        source: "website",
        price: 0,
      },
    ];

    const body = buildIcalFeed(bookings, new Date("2025-01-02T03:04:05Z"));
    const firstIndex = body.indexOf(`UID:${buildBookingUid(bookings[1])}`);
    const secondIndex = body.indexOf(`UID:${buildBookingUid(bookings[0])}`);

    expect(firstIndex).toBeGreaterThan(-1);
    expect(secondIndex).toBeGreaterThan(-1);
    expect(firstIndex).toBeLessThan(secondIndex);
  });
});
