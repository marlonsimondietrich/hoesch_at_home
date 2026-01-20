import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Booking, NewBooking } from "../../bookings/types";

vi.mock("../../bookings/auth", () => ({
  isAuthorized: vi.fn(),
}));
vi.mock("../../bookings/store", () => ({
  listBookings: vi.fn(),
  setBookingMetadata: vi.fn(),
}));
vi.mock("../store", () => ({
  deleteExternalBookings: vi.fn(),
  createExternalBookings: vi.fn(),
}));
vi.mock("../parser", () => ({
  parseIcalText: vi.fn(),
}));
vi.mock("../sources", () => ({
  loadIcalSources: vi.fn(),
}));

import { isAuthorized } from "../../bookings/auth";
import { listBookings, setBookingMetadata } from "../../bookings/store";
import { createExternalBookings, deleteExternalBookings } from "../store";
import { parseIcalText } from "../parser";
import { loadIcalSources } from "../sources";
import { handleSyncPost } from "./sync";

const mockedIsAuthorized = vi.mocked(isAuthorized);
const mockedListBookings = vi.mocked(listBookings);
const mockedSetBookingMetadata = vi.mocked(setBookingMetadata);
const mockedDeleteExternalBookings = vi.mocked(deleteExternalBookings);
const mockedCreateExternalBookings = vi.mocked(createExternalBookings);
const mockedParseIcalText = vi.mocked(parseIcalText);
const mockedLoadIcalSources = vi.mocked(loadIcalSources);

describe("handleSyncPost", () => {
  beforeEach(() => {
    mockedIsAuthorized.mockReturnValue(true);
  });

  it("imports external bookings after clearing previous entries", async () => {
    const incoming: NewBooking[] = [
      {
        startDate: "2025-06-01",
        endDate: "2025-06-02",
        source: "external",
        price: 0,
      },
      {
        startDate: "2025-06-05",
        endDate: "2025-06-06",
        source: "external",
        price: 0,
      },
    ];
    const existing: Booking[] = [
      {
        id: "ext-1",
        startDate: "2025-05-01",
        endDate: "2025-05-02",
        source: "external",
        price: 0,
      },
    ];

    mockedLoadIcalSources.mockResolvedValueOnce(["ics"]);
    mockedParseIcalText.mockReturnValueOnce(incoming);
    mockedListBookings.mockResolvedValueOnce(existing);
    mockedDeleteExternalBookings.mockResolvedValueOnce(1);
    mockedCreateExternalBookings.mockImplementation(async (bookings) =>
      bookings.map((booking, index) => ({ id: String(index), ...booking }))
    );

    const response = await handleSyncPost({
      request: new Request("http://localhost/api/sync", { method: "POST" }),
    } as never);

    expect(mockedDeleteExternalBookings).toHaveBeenCalledTimes(1);
    expect(mockedCreateExternalBookings).toHaveBeenCalledWith(incoming);
    expect(mockedSetBookingMetadata).toHaveBeenCalledWith(
      expect.objectContaining({ lastSyncTimestamp: expect.any(String) })
    );

    const body = await response.json();
    expect(body).toMatchObject({
      imported: 2,
      skipped: 0,
      deletedExternal: 1,
    });
  });

  it("skips conflicts with website or manual bookings", async () => {
    const incoming: NewBooking[] = [
      {
        startDate: "2025-06-10",
        endDate: "2025-06-12",
        source: "external",
        price: 0,
      },
      {
        startDate: "2025-06-14",
        endDate: "2025-06-16",
        source: "external",
        price: 0,
      },
    ];
    const existing: Booking[] = [
      {
        id: "web-1",
        startDate: "2025-06-11",
        endDate: "2025-06-13",
        source: "website",
        price: 120,
      },
    ];

    mockedLoadIcalSources.mockResolvedValueOnce(["ics"]);
    mockedParseIcalText.mockReturnValueOnce(incoming);
    mockedListBookings.mockResolvedValueOnce(existing);
    mockedDeleteExternalBookings.mockResolvedValueOnce(0);
    mockedCreateExternalBookings.mockImplementation(async (bookings) =>
      bookings.map((booking, index) => ({ id: String(index), ...booking }))
    );

    const response = await handleSyncPost({
      request: new Request("http://localhost/api/sync", { method: "POST" }),
    } as never);

    expect(mockedCreateExternalBookings).toHaveBeenCalledWith([incoming[1]]);
    const body = await response.json();
    expect(body).toMatchObject({
      imported: 1,
      skipped: 1,
    });
  });
});
