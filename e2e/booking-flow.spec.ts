import { test, expect } from "@playwright/test";

const TOKEN = process.env.BOOKING_API_TOKEN ?? "test-token";

const seedAvailability = async (request: typeof test.request) => {
  const response = await request.post("/api/sync", {
    headers: { "x-booking-token": TOKEN },
  });
  expect(response.ok()).toBeTruthy();
};

test.describe("booking flow", () => {
  test("completes booking in German", async ({ page, request }) => {
    await seedAvailability(request);
    await page.goto("/");

    await page.getByLabel("Anreise").fill("2025-01-13");
    await page.getByLabel("Abreise").fill("2025-01-15");
    await page.getByLabel("Gäste").fill("2");
    await page.getByLabel("Notizen").fill("Bitte Erdgeschoss, falls möglich.");

    await page.getByRole("button", { name: "Verfügbarkeit prüfen" }).click();
    await expect(page.getByText("Der gewünschte Zeitraum ist verfügbar.")).toBeVisible();

    await page.getByRole("button", { name: "Jetzt buchen" }).click();
    await expect(page.getByText("Buchungsanfrage gesendet.")).toBeVisible();
  });

  test("completes booking in English", async ({ page, request }) => {
    await seedAvailability(request);
    await page.goto("/en/");

    await page.getByLabel("Check-in date").fill("2025-01-13");
    await page.getByLabel("Check-out date").fill("2025-01-15");
    await page.getByLabel("Guests").fill("2");
    await page.getByLabel("Notes").fill("Ground floor if possible.");

    await page.getByRole("button", { name: "Check availability" }).click();
    await expect(page.getByText("Your dates are available.")).toBeVisible();

    await page.getByRole("button", { name: "Book now" }).click();
    await expect(page.getByText("Booking request submitted.")).toBeVisible();
  });
});
