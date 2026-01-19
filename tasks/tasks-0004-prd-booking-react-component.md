## Relevant Files

- `src/features/ical/sources.ts` - Adds support for a comma-separated list of iCal source URLs.
- `src/features/bookings/types.ts` - Extends booking payloads to include guest count and notes.
- `src/features/bookings/validation.ts` - Validates optional guest count and notes fields.
- `src/features/bookings/store.ts` - Persists guest count and notes to Firestore.
- `src/features/bookings/hooks/useAvailability.ts` - Client-side availability check against `/api/availability`.
- `src/features/bookings/hooks/useBooking.ts` - Client-side booking submission to `/api/bookings`.
- `src/features/bookings/ui/BookingWidget.tsx` - React booking component UI and state flow.
- `src/components/HomePage.astro` - Mounts the booking widget at the bottom of the homepage.
- `src/data/homeContent.ts` - Adds EN/DE booking copy placeholders.
- `playwright.config.ts` - Playwright configuration for local E2E runs.
- `e2e/booking-flow.spec.ts` - Playwright E2E coverage for the booking flow.
- `package.json` - Adds Playwright script and dependency.
- `package-lock.json` - Lockfile update for Playwright.
- `README.md` - Documents env vars for booking and iCal sources.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `BookingWidget.tsx` and `BookingWidget.test.tsx` in the same directory).
- Use `npm test` for Vitest unit tests. Use `npx playwright test` for E2E tests.

## Tasks

- [x] 1.0 Review existing booking + iCal services and define the availability/booking contract for the UI (including env var format for iCal source arrays).
  - [x] 1.1 Confirm `/api/availability` response fields and how bookings represent occupied ranges.
  - [x] 1.2 Confirm `/api/bookings` required fields, auth token header, and error codes.
  - [x] 1.3 Document the iCal source array env var format and local dev usage (e.g., `LOCAL_TEST_ICAL_PATHS`).
  - [x] 1.4 Define availability-to-date-picker mapping rules (blocked dates, edge inclusivity).
- [x] 2.0 Build the feature-first booking UI module (React component, state handling, EN/DE copy placeholders, validation messages).
  - [x] 2.1 Create `ui/` and `hooks/` folders under `src/features/bookings/` for the new UI feature slice.
  - [x] 2.2 Add EN/DE booking copy placeholders to `src/data/homeContent.ts`.
  - [x] 2.3 Implement `BookingWidget` with date range picker, guests, notes, and status messaging.
  - [x] 2.4 Add minimal validation and accessible labels (ARIA, helper text, error text).
- [x] 3.0 Implement client-side availability check + booking initiation flow (disable CTA until availability confirmed, handle errors).
  - [x] 3.1 Implement `useAvailability` to fetch bookings and convert to blocked date ranges.
  - [x] 3.2 Implement `useBooking` to submit booking requests with the required auth header.
  - [x] 3.3 Wire "Check availability" to validate inputs and enable "Book now" only on success.
  - [x] 3.4 Map API error codes to localized error messages and retry states.
- [x] 4.0 Integrate the booking component into the Astro homepage (DE/EN) at the bottom with minimal styling.
  - [x] 4.1 Embed `BookingWidget` in `src/components/HomePage.astro` below existing sections.
  - [x] 4.2 Pass `currentLocale` and localized copy into the React component.
  - [x] 4.3 Ensure hydration matches existing Astro React integration (client directive).
- [x] 5.0 Add Playwright E2E coverage for the full availability-to-booking flow in local dev.
  - [x] 5.1 Add Playwright config and scripts if missing.
  - [x] 5.2 Seed availability using local iCal files or a sync step (document env vars in test setup).
  - [x] 5.3 Write E2E test that selects available range, sets guests/notes, checks availability, and submits booking.
  - [x] 5.4 Validate localized strings for EN/DE in separate test runs or parameterized cases.
