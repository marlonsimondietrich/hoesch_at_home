# PRD 0005: Public iCal Export Feed for Bookings

## 1. Overview
- Provide a public outbound iCal (ICS) feed that exposes website bookings as blocked dates.
- The feed is intended for any iCal consumer (e.g., Airbnb, Booking.com, Google Calendar).
- Access is via a URL that includes a secret token.
- The feed must be for any human-readable text fields (e.g., SUMMARY).

## 2. Goals
- Enable external channels to import website bookings and block availability.
- Ensure stable, update-safe events via deterministic UID generation.
- Avoid exposing personally identifiable information (PII).
- Keep the feed reliable and cacheable with sensible defaults.

## 3. Target Audience
- Channel managers/hosts using Airbnb, Booking.com, or other iCal consumers.
- Internal operators who share the feed URL with external platforms.
- Language considerations: human-readable text should be available in EN and DE, but external consumers may ignore it.

## 4. User Stories
- As a host, I want to import a URL into Airbnb so website bookings block my Airbnb availability.
- As a host, I want updates to existing bookings to update the same calendar event instead of creating duplicates.
- As an operator, I want the feed URL to be private so it can be shared only with trusted channels.

## 5. Element Scope & Structure
### In scope
- A new public endpoint `/api/ical` that returns `text/calendar`.
- Export only `source: "website"` bookings.
- Calendar-level metadata (PRODID, VERSION, CALSCALE, X-WR-CALNAME).
- Event-level fields: UID, DTSTART, DTEND, SUMMARY, DTSTAMP, LAST-MODIFIED.
- Access via secret token query param (e.g., `?token=...`).
- Cache headers suitable for importers (15–60 min).
- EN/DE support for any human-readable strings (e.g., SUMMARY).

### Out of scope
- Bidirectional sync or write-back to Airbnb/Booking.com.
- Any UI for managing tokens or viewing the feed.
- Guest details, pricing, notes, or internal instructions in the feed.
- Replacing the existing inbound `/api/sync` (external -> Firestore).

### High-level structure
1. API endpoint `/api/ical`.
2. Auth check for secret token query param.
3. Load website bookings from Firestore.
4. Map bookings to VEVENT entries.
5. Emit ICS with headers and cache metadata.

## 6. Functional Requirements
1. The endpoint must be available at `/api/ical`.
2. The endpoint must require a secret token query param, matched against a server-side env var.
3. The response must set `Content-Type: text/calendar; charset=utf-8`.
4. The response must include `BEGIN:VCALENDAR` and `END:VCALENDAR`.
5. Each booking must be emitted as a `VEVENT` with:
   - `UID`: stable, deterministic, and unique per booking.
   - `DTSTART;VALUE=DATE`: start date (check-in).
   - `DTEND;VALUE=DATE`: end date (check-out; exclusive).
   - `SUMMARY`: bilingual-ready string (EN/DE).
   - `DTSTAMP`: current timestamp.
   - `LAST-MODIFIED`: derived from booking creation or current timestamp if unavailable.
6. Only bookings with `source: "website"` are included.
7. The feed must not include guest PII, notes, pricing, or internal data.
8. Cache headers must be set (e.g., `Cache-Control: public, max-age=900`).
9. The feed must be deterministic for a given booking set (stable ordering and stable UIDs).
10. All human-readable text fields must be available in EN and DE.

## 7. Non-Goals (Out of Scope)
- No UI for language switching or token management.
- No automatic refresh scheduling or cron configuration.
- No OAuth or user authentication system.
- No support for time-based (non all-day) events.
- No inclusion of external bookings (source: "external").

## 8. Design & UX Considerations
- No UI changes required; this is an API-only feature.
- Text fields in the ICS (e.g., SUMMARY) must support EN/DE variants and avoid PII.
- Handle German text length if summaries differ.

## 9. Technical Considerations
- Implement as an Astro API route under `src/pages/api/ical.ts`.
- Reuse existing Firestore access in `src/features/bookings/store.ts`.
- Deterministic UID strategy (e.g., `booking.id` or a hash of source+dates).
- Use all-day date values (`VALUE=DATE`) to avoid timezone issues.
- Environment variable for token (e.g., `ICAL_EXPORT_TOKEN`).
- Include `PRODID`, `VERSION:2.0`, `CALSCALE:GREGORIAN`, and `X-WR-CALNAME`.
- Provide `ETag` or `Last-Modified` headers if feasible.

## 10. Success Metrics
- Airbnb/Booking.com can import the feed URL successfully.
- Website bookings appear as blocked dates in external calendars within the cache window.
- No duplicates after updates (UID stability validated).
- No PII appears in the exported feed.

## 11. Open Questions
- What exact env var name should hold the token? (Default proposal: `ICAL_EXPORT_TOKEN`.)
- Should `SUMMARY` be a fixed label (e.g., "Booked") or configurable?
- Is `LAST-MODIFIED` available from Firestore metadata or should it use current timestamp?
