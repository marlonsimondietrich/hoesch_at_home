import { describe, expect, it, vi } from "vitest";
import type { Booking } from "../types";
import { adjacentBooking, overlappingBooking } from "../__fixtures__/bookings";

vi.mock("../store", () => ({
  listBookings: vi.fn(),
}));

import { listBookings } from "../store";
import { handleAvailabilityGet } from "./availability";

const mockedListBookings = vi.mocked(listBookings);

describe("handleAvailabilityGet", () => {
  it("returns sorted bookings and cache headers", async () => {
    const bookings: Booking[] = [adjacentBooking, overlappingBooking];
    mockedListBookings.mockResolvedValueOnce(bookings);

    const response = await handleAvailabilityGet({
      request: new Request("http://localhost/api/availability"),
    } as never);

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBeTruthy();
    expect(response.headers.get("etag")).toBeTruthy();

    const body = await response.json();
    expect(body[0].startDate).toBe("2025-05-04");
    expect(body[1].startDate).toBe("2025-05-06");
  });

  it("honors if-none-match", async () => {
    const bookings: Booking[] = [overlappingBooking];
    mockedListBookings.mockResolvedValueOnce(bookings);

    const first = await handleAvailabilityGet({
      request: new Request("http://localhost/api/availability"),
    } as never);

    const etag = first.headers.get("etag");
    mockedListBookings.mockResolvedValueOnce(bookings);

    const second = await handleAvailabilityGet({
      request: new Request("http://localhost/api/availability", {
        headers: { "if-none-match": etag ?? "" },
      }),
    } as never);

    expect(second.status).toBe(304);
  });
});
