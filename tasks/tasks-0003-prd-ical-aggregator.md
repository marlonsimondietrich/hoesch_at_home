## Relevant Files

- `src/features/ical/api/sync.ts` - Sync handler for iCal aggregation and booking import.
- `src/features/ical/api/sync.test.ts` - Tests for sync flow, idempotency, and conflicts.
- `src/features/ical/parser.ts` - iCal parsing and mapping into `NewBooking`.
- `src/features/ical/parser.test.ts` - Tests for iCal parsing and mapping behavior.
- `src/features/ical/sources.ts` - Loads iCal payloads from env-configured URLs or local paths.
- `src/features/ical/store.ts` - Utilities for clearing/importing external bookings and metadata updates.
- `src/pages/api/sync.ts` - Astro API route delegating to the sync handler.
- `src/features/bookings/store.ts` - Existing Firestore access layer to reuse for bookings/metadata.
- `src/features/bookings/types.ts` - Booking data model and date helpers for mapping.
- `src/features/bookings/validation.ts` - Overlap detection for conflict checks.
- `src/features/bookings/auth.ts` - Shared token-based auth for the sync endpoint.
- `src/features/ical/__fixtures__/` - Local ICS fixtures for tests.
- `package.json` - Adds the `node-ical` dependency and type definitions.
- `package-lock.json` - Lockfile updates for new dependencies.
- `tasks/tasks-0003-prd-ical-aggregator.md` - Task checklist for iCal aggregator implementation.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npm test` to run the Vitest suite. Running without a path executes all tests found by the Vitest configuration.

## Tasks

- [x] 1.0 Define iCal ingestion contract and mapping to `NewBooking`
  - [x] 1.1 Confirm required fields (`startDate`, `endDate`, `source`, `price`) and defaults (`price: 0`)
  - [x] 1.2 Specify how `guestName` is derived from iCal summary/description when available
  - [x] 1.3 Document handling for all-day events vs. timed events and normalize to `YYYY-MM-DD`
  - [x] 1.4 Define environment inputs: `AIRBNB_ICAL_URL`, `BOOKING_ICAL_URL`, `LOCAL_TEST_ICAL_PATHS`
- [x] 2.0 Build sync endpoint with auth and idempotent external import
  - [x] 2.1 Implement `/api/sync` handler delegating to `src/features/ical/api/sync.ts`
  - [x] 2.2 Reuse `src/features/bookings/auth.ts` to enforce token-based auth
  - [x] 2.3 Fetch iCal sources (remote or local) and parse events into `NewBooking[]`
  - [x] 2.4 Delete existing `source: "external"` bookings before inserting new ones
  - [x] 2.5 Write external bookings to Firestore via booking store helpers
- [x] 3.0 Implement conflict detection and logging for external overlaps
  - [x] 3.1 Load existing bookings before deletion for conflict comparison
  - [x] 3.2 Use `hasOverlap` to detect collisions with `source: "website"` or `source: "manual"`
  - [x] 3.3 Skip conflicting external entries and log warnings with date ranges
- [x] 4.0 Add fixtures and unit tests for parser and sync flow
  - [x] 4.1 Add ICS fixtures covering blocked ranges and summary text
  - [x] 4.2 Test parser mapping (dates, summary -> guestName, price defaults)
  - [x] 4.3 Test sync idempotency (external entries replaced on re-run)
  - [x] 4.4 Test conflict handling (external overlap is skipped and logged)
- [x] 5.0 Wire API route and update metadata timestamp
  - [x] 5.1 Update `metadata/bookings.lastSyncTimestamp` on successful sync
  - [x] 5.2 Ensure response payload communicates counts (imported/skipped) and timestamp
