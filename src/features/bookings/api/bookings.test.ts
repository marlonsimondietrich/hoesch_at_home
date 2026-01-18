import { describe, expect, it, vi } from "vitest";
import { baseNewBooking, overlappingBooking } from "../__fixtures__/bookings";

vi.mock("../store", () => ({
  listBookings: vi.fn(),
  createBooking: vi.fn(),
}));

import { listBookings, createBooking } from "../store";
import { handleBookingsPost } from "./bookings";

const mockedListBookings = vi.mocked(listBookings);
const mockedCreateBooking = vi.mocked(createBooking);

const withAuth = (body: unknown) =>
  new Request("http://localhost/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.BOOKING_API_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

describe("handleBookingsPost", () => {
  it("rejects unauthorized requests", async () => {
    const response = await handleBookingsPost({
      request: new Request("http://localhost/api/bookings", { method: "POST" }),
    } as never);

    expect(response.status).toBe(401);
  });

  it("creates a booking when valid", async () => {
    process.env.BOOKING_API_TOKEN = "test-token";
    mockedListBookings.mockResolvedValueOnce([]);
    mockedCreateBooking.mockResolvedValueOnce({ id: "new", ...baseNewBooking });

    const response = await handleBookingsPost({
      request: withAuth(baseNewBooking),
    } as never);

    expect(response.status).toBe(201);
    expect(mockedCreateBooking).toHaveBeenCalled();
  });

  it("returns occupied error on overlap", async () => {
    process.env.BOOKING_API_TOKEN = "test-token";
    mockedListBookings.mockResolvedValueOnce([overlappingBooking]);

    const response = await handleBookingsPost({
      request: withAuth(baseNewBooking),
    } as never);

    expect(response.status).toBe(409);
    const body = await response.json();
    expect(body.error.code).toBe("ERR_DATE_OCCUPIED");
  });
});
