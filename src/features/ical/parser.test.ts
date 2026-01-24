import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { parseIcalText } from "./parser";

describe("parseIcalText", () => {
  it("maps iCal events into external bookings", async () => {
    const payload = await readFile(
      new URL("./__fixtures__/basic.ics", import.meta.url),
      "utf8"
    );

    const bookings = parseIcalText(payload);

    expect(bookings).toHaveLength(2);
    expect(bookings[0]).toMatchObject({
      startDate: "2025-01-10",
      endDate: "2025-01-11",
      source: "external",
      guestName: "John Doe",
      price: 0,
    });
    expect(bookings[1]).toMatchObject({
      startDate: "2025-01-20",
      endDate: "2025-01-22",
      source: "external",
      guestName: "Blocked",
      price: 0,
    });
  });
});
