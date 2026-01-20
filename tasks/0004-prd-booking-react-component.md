# PRD 0004: Booking React Component on Main Astro Page

## 1. Overview
- Add a React booking component to the main Astro page, placed at the bottom of the page.
- The component enables end-to-end availability selection and booking using the existing booking service from PRD 0002 and iCal aggregation from PRD 0003.
- The component is bilingual (EN/DE) and must render all visible and accessibility text in both languages.
- Implementation follows a feature-first approach (co-located feature module with UI, logic, and tests).

## 2. Goals
- Allow users to pick only available date ranges, select guests, add notes, and initiate booking.
- Ensure the booking flow is functional end-to-end in local dev with Playwright tests.
- Keep UI minimal and consistent with existing site styles.

## 3. Target Audience
- Primary: prospective guests looking to check availability and book.
- Language: English and German; text should be neutral and clear. German text may be longer.

## 4. User Stories
- As a visitor, I want to see only available dates so I do not attempt unavailable bookings.
- As a visitor, I want to select a date range and guest count so I can request the right booking.
- As a visitor, I want to add notes so I can provide special requests before booking.
- As a visitor, I want to start the booking process with a clear CTA in my language.

## 5. Element Scope & Structure
### In scope
- A React component embedded in the main Astro page footer area.
- Availability-aware date range picker.
- Guest count input and notes field.
- "Check availability" flow followed by "Book now" CTA.
- Integration with booking service and iCal availability aggregation.
- EN/DE text for all labels, helper text, error states, and ARIA labels.

### Out of scope
- Any site-wide redesign or new navigation.
- Payments, authentication, account creation, or admin tools.

### High-level structure
1. Section container (Astro page bottom).
2. React component root with:
   - Heading + short helper text.
   - Date range picker (availability-aware).
   - Guest count input.
   - Notes textarea.
   - Availability status / validation messaging.
   - Primary CTA: "Book now".

## 6. Functional Requirements
1. The component must render on the main Astro page at the bottom of the page.
2. The date picker must only allow selection of available dates based on aggregated iCal availability.
3. The flow must start with an explicit "Check availability" step before enabling the "Book now" CTA.
4. The CTA text is "Book now" (EN) and its German equivalent; CTA is disabled until availability is confirmed.
5. Inputs required: date range, guest count, notes (optional unless validation requires).
6. All visible text, aria labels, helper text, and validation messages must be available in EN and DE.
7. The component must use an env variable providing an array of iCal inputs used by the availability service.
8. Booking initiation must use the existing booking service APIs from PRD 0002.
9. The feature must be implemented using feature-first structure with co-located UI, logic, and tests.
10. The component must be usable on mobile and desktop.

## 7. Non-Goals (Out of Scope)
- Payments, invoicing, or refunds.
- User accounts, login, or profile management.
- Admin calendar management.
- Copywriting or translation quality; content will be provided later.

## 8. Design & UX Considerations
- Keep styling minimal and aligned with existing site styles.
- Ensure clear focus states and accessible labels.
- Handle German text length in labels and error messages.
- Provide clear validation feedback for incomplete or invalid selections.
- Avoid heavy UI complexity; prioritize functional correctness.

## 9. Technical Considerations
- Astro page embeds a React component (client-side hydration per existing project pattern).
- Availability comes from iCal aggregation (PRD 0003) and must reflect real-time aggregated results.
- Use an environment variable that provides an array of iCal inputs (format defined by PRD 0003).
- Feature-first structure example (adjust to project conventions):
  - `src/features/booking/` (React component, hooks/services, tests)
  - `src/features/booking/__tests__/` (Playwright or integration fixtures if needed)
- Date range picker must restrict selection to available dates only.
- Language selection should follow existing site language context (do not invent a global switcher).

## 10. Success Metrics
- Playwright E2E tests pass for the booking flow in local dev.
- Users can only select available dates and complete the booking initiation flow.
- CTA becomes enabled only after availability confirmation.

## 11. Open Questions
- Confirm the exact env var name and iCal input array format used by the availability service.
- Confirm where the site language context is stored or passed to React components.
- Confirm any existing booking API constraints (required fields, payload format).
