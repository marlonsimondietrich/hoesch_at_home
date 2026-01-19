import { describe, expect, it, vi } from "vitest";
import type { Booking } from "../../features/bookings/types";

vi.mock("../../features/bookings/store", () => ({
  listBookings: vi.fn(),
}));

import { listBookings } from "../../features/bookings/store";
import { GET } from "./ical";

const mockedListBookings = vi.mocked(listBookings);

describe("GET /api/ical", () => {
  it("rejects unauthorized requests", async () => {
    process.env.ICAL_EXPORT_TOKEN = "secret";

    const response = await GET({
      request: new Request("http://localhost/api/ical"),
    } as never);

    expect(response.status).toBe(401);
  });

  it("returns an ICS feed with website bookings only", async () => {
    process.env.ICAL_EXPORT_TOKEN = "secret";
    const bookings: Booking[] = [
      {
        id: "web",
        startDate: "2025-05-01",
        endDate: "2025-05-05",
        source: "website",
        price: 0,
      },
      {
        id: "manual",
        startDate: "2025-05-10",
        endDate: "2025-05-12",
        source: "manual",
        price: 0,
      },
    ];
    mockedListBookings.mockResolvedValueOnce(bookings);

    const response = await GET({
      request: new Request("http://localhost/api/ical?token=secret"),
    } as never);

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/calendar");
    expect(response.headers.get("cache-control")).toBeTruthy();
    expect(response.headers.get("etag")).toBeTruthy();

    const body = await response.text();
    expect(body).toContain("UID:booking-web@hoesch-at-home");
    expect(body).not.toContain("UID:booking-manual@hoesch-at-home");
  });
});
