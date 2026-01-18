# PRD: iCal Aggregator & Sync Service

## 1. Overview

Der Service synchronisiert externe iCal-Feeds (Airbnb, Booking.com) in das bestehende Booking-Core-System. Er läuft als on-demand API-Route und schreibt Buchungen in die Firestore-Collection `bookings` mit `source: "external"`.

## 2. Goals

- Externe iCal-Feeds abrufen und in das bestehende Booking-Datenmodell mappen.
- Idempotenter Sync: externe Buchungen werden bei jedem Lauf neu aufgebaut.
- Konflikte mit Website-/Manual-Buchungen erkennen und nur loggen.
- `lastSyncTimestamp` im bestehenden Metadata-Dokument pflegen.

## 3. Non-Goals

- Kein bidirektionaler Sync (keine Rückschreibung an Airbnb/Booking.com).
- Kein Echtzeit-Webhooking; Sync ist ein manuell/cron-getriggerter Pull.
- Kein Pricing-Import; externe Preise werden nicht aus iCal abgeleitet.

## 4. Functional Requirements

1. **iCal Ingestion**
   - URLs aus Umgebungsvariablen: `AIRBNB_ICAL_URL`, `BOOKING_ICAL_URL`.
   - Optionaler lokaler Testmodus über `LOCAL_TEST_ICAL_PATHS` (kommagetrennte Pfade).
   - Parsing via `node-ical`.

2. **Sync Endpoint (`/api/sync`)**
   - Auth analog zur Booking-API: `Authorization: Bearer <BOOKING_API_TOKEN>` oder `x-booking-token`.
   - Entfernt alle bestehenden Dokumente mit `source: "external"` vor dem Import (Idempotenz).
   - Schreibt neue Buchungen als `source: "external"` in `bookings`.
   - Aktualisiert `metadata/bookings.lastSyncTimestamp` nach erfolgreichem Lauf.

3. **Mapping & Datenmodell**
   - Datumsformat strikt `YYYY-MM-DD` (siehe `src/features/bookings/types.ts`).
   - Pflichtfelder: `startDate`, `endDate`, `source`, `price`.
   - `price` fuer externe Buchungen ist `0`.
   - `guestName` ist optional; wenn aus iCal verfügbar, wird es übernommen.

4. **Konfliktbehandlung**
   - Wenn ein externer Eintrag mit einer `source: "website"` oder `source: "manual"` Buchung überschneidet, wird ein Warn-Log geschrieben.
   - Externe Buchung wird in diesem Fall übersprungen (keine Überschreibung).

## 5. Feature-First Struktur (Anlehnung an Booking Core)

- `src/features/ical/`
  - `api/sync.ts` - Handler-Logik für iCal-Sync
  - `parser.ts` - iCal Parsing und Mapping in `NewBooking`
  - `store.ts` - Hilfsfunktionen für externes Löschen/Import (reused: `src/features/bookings/store.ts`)
  - `__fixtures__/` - Beispiel-ICS-Dateien für Tests
  - `*.test.ts` - Tests neben den jeweiligen Modulen
- `src/pages/api/sync.ts` delegiert an `src/features/ical/api/sync.ts`

## 6. Tests

- Unit Tests für Parser (Mapping von iCal -> `NewBooking`).
- Unit Tests für Sync-Flow (idempotent: externe Buchungen werden ersetzt).
- Konflikt-Tests mit Fixtures aus `src/features/bookings/__fixtures__/bookings.ts`.
- Nutzung von Vitest (bestehende Konfiguration).

## 7. Test-Ablauf (Mocking)

1. **Setup:** In `.env.test` `AIRBNB_ICAL_URL` auf lokale `.ics`-Datei setzen oder `LOCAL_TEST_ICAL_PATHS` verwenden.
2. **Execution:** `POST /api/sync` mit `Authorization: Bearer <BOOKING_API_TOKEN>`.
3. **Validation:** Firestore enthält exakt die Einträge aus den Test-ICS-Dateien mit `source: "external"` und `price: 0`.

## 8. Relevant Files

- `src/features/bookings/types.ts` - Datenmodell und Date-Helper.
- `src/features/bookings/store.ts` - Firestore Access und Metadata.
- `src/features/bookings/validation.ts` - Overlap-Logik.
- `src/features/bookings/auth.ts` - Token-Auth (wiederverwenden).
- `src/pages/api/availability.ts` - Referenz für API-Route-Delegation.
- `vitest.config.ts` - Test Setup.
