## Relevant Files

- `src/features/bookings/types.ts` - Booking data model, error codes, and TypeScript interfaces for standardized booking format.
- `src/features/bookings/store.ts` - Firestore access layer for reading/writing bookings and metadata.
- `src/features/bookings/validation.ts` - Overlap checks and request validation logic for new bookings.
- `src/features/bookings/auth.ts` - Token/auth guard for protected POST endpoint.
- `src/features/bookings/api/availability.ts` - GET handler returning sorted availability data with cache headers.
- `src/features/bookings/api/bookings.ts` - POST handler for creating bookings with validation and auth.
- `src/features/bookings/api/response.ts` - Shared JSON response helpers for API handlers.
- `src/pages/api/availability.ts` - Astro API route delegating to booking availability handler.
- `src/pages/api/bookings.ts` - Astro API route delegating to booking creation handler.
- `src/lib/firebase.ts` - Firebase Admin initialization and configuration.
- `src/features/bookings/__fixtures__/bookings.ts` - Shared fixtures for booking edge cases in tests.
- `src/features/bookings/types.test.ts` - Unit tests for data model and error codes.
- `src/features/bookings/validation.test.ts` - Unit tests for overlap and validation logic.
- `src/features/bookings/api/availability.test.ts` - API handler tests for availability endpoint behavior.
- `src/features/bookings/api/bookings.test.ts` - API handler tests for bookings endpoint behavior.
- `vitest.config.ts` - Vitest configuration for running unit tests.
- `package.json` - Adds firebase-admin and vitest dependencies plus test script.
- `package-lock.json` - Lockfile updates for new dependencies.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npm test` to run the Vitest suite. Running without a path executes all tests found by the Vitest configuration.

## Tasks

- [x] 1.0 Define booking data model and filesystem layout (Firestore schema mapping, TS interfaces, error codes, date format rules)
  - [x] 1.1 Draft filesystem layout under `src/features/bookings/` (including `api/` subfolder) for data, validation, and endpoints
  - [x] 1.2 Define TypeScript interfaces for `Booking`, `BookingSource`, `BookingErrorCode`, and `AvailabilityResponse`
  - [x] 1.3 Specify date format rules (`YYYY-MM-DD`) and add parse/format helpers or constraints
  - [x] 1.4 Map Firestore schema fields to TS types and add metadata model for `lastSyncTimestamp`
  - [x] 1.5 Document error code mapping for multilingual frontend handling
- [x] 2.0 Add Firebase Admin setup and Firestore data access layer for bookings/metadata
  - [x] 2.1 Add Firebase Admin initialization in `src/lib/firebase.ts` (env config, singleton)
  - [x] 2.2 Implement `bookings` collection read/query helpers in `src/features/bookings/store.ts`
  - [x] 2.3 Implement create booking helper for Firestore writes
  - [x] 2.4 Implement `metadata` collection read/write for `lastSyncTimestamp`
  - [x] 2.5 Add Firestore index assumptions if sorting by `startDate`
- [x] 3.0 Implement GET `/api/availability` endpoint with sorting and cache headers
  - [x] 3.1 Create `src/pages/api/availability.ts` that delegates to `src/features/bookings/api/availability.ts`
  - [x] 3.2 Load bookings via store, sort by `startDate`, and return standardized JSON array
  - [x] 3.3 Add cache headers (e.g., `Cache-Control`, `ETag` or `Last-Modified`)
  - [x] 3.4 Ensure response uses `YYYY-MM-DD` and excludes private fields
- [x] 4.0 Implement POST `/api/bookings` endpoint with overlap validation and auth/token guard
  - [x] 4.1 Create `src/pages/api/bookings.ts` that delegates to `src/features/bookings/api/bookings.ts`
  - [x] 4.2 Implement token-based auth in `src/features/bookings/auth.ts` and validate header
  - [x] 4.3 Validate request body against schema (required fields, date format, source enum)
  - [x] 4.4 Implement overlap check in `src/features/bookings/validation.ts` against existing bookings
  - [x] 4.5 Return standardized error codes (e.g., `ERR_DATE_OCCUPIED`) on failure
  - [x] 4.6 Create booking in Firestore and return created booking payload
- [x] 5.0 Add tests/fixtures for booking validation and API behavior
  - [x] 5.1 Add fixtures for bookings with edge cases (adjacent dates, overlap, different sources)
  - [x] 5.2 Unit test overlap detection and date format validation
  - [x] 5.3 Unit test error code mapping and response shape
  - [x] 5.4 Add API handler tests or lightweight integration tests for GET/POST endpoints
  - [x] 5.5 Add Vitest configuration and test script
