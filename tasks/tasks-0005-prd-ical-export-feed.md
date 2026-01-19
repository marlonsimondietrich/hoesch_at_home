## Relevant Files

- `src/pages/api/ical.ts` - API route serving the outbound iCal feed with auth and caching.
- `src/pages/api/ical.test.ts` - Tests for auth and filtering behavior on the iCal endpoint.
- `src/features/bookings/store.ts` - Data access for listing bookings from Firestore.
- `src/features/bookings/types.ts` - Booking data types and date helpers used for export mapping.
- `src/features/ical/export.ts` - ICS generation utilities (calendar + event formatting).
- `src/features/ical/export.test.ts` - Unit tests for ICS formatting, UID stability, and field mapping.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Define the outbound iCal export API shape and access control
- [x] 1.1 Confirm env var name and query param name for the token (default: `ICAL_EXPORT_TOKEN` + `token`).
- [x] 1.2 Decide on the calendar display name (`X-WR-CALNAME`) and bilingual SUMMARY strings.
- [x] 1.3 Outline which booking fields are exported and which are explicitly excluded (PII).
- [x] 2.0 Implement deterministic ICS generation for website bookings
- [x] 2.1 Add `src/features/ical/export.ts` to build VCALENDAR/VEVENT strings.
- [x] 2.2 Map `Booking` records to all-day VEVENTs with stable UID, DTSTART/DTEND, SUMMARY, and timestamps.
- [x] 2.3 Ensure stable ordering of events and deterministic output for a given booking set.
- [x] 3.0 Add cache headers and response metadata for iCal consumers
- [x] 3.1 Create `src/pages/api/ical.ts` with token auth, content-type, and error handling.
- [x] 3.2 Add cache headers (`Cache-Control`) and optional `Last-Modified`/`ETag` if feasible.
- [x] 3.3 Filter bookings to `source: "website"` only and return the ICS body.
- [x] 4.0 Add automated coverage for export behavior and edge cases
- [x] 4.1 Test that unauthorized requests are rejected and authorized requests return ICS.
- [x] 4.2 Test that only website bookings appear and PII fields are excluded.
- [x] 4.3 Test UID stability and event date formatting for all-day events.
