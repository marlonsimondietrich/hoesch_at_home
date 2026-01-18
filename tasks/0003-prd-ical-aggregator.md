
# PRD: iCal Aggregator & Sync Service

## 1. Overview

Dieser Service ist für die Kommunikation mit der Außenwelt zuständig. Er holt Daten von Airbnb und Booking.com ab, parst diese und gleicht sie mit dem `Booking Core` ab. Er läuft isoliert als Hintergrund-Task.

## 2. Goals

* Abruf externer iCal-Feeds über konfigurierbare URLs.
* Transformation von iCal-Events in das interne Firestore-Format.
* Identifizierung und Auflösung von Buchungskonflikten.

## 3. Functional Requirements

1. **iCal Ingestion:**
* Fetching der URLs aus den Umgebungsvariablen (`AIRBNB_ICAL_URL`, `BOOKING_ICAL_URL`).
* Parsing mit `node-ical`.


2. **Sync Logic (`/api/sync`):**
* Markiert alle bestehenden Dokumente mit `source: "external"` als "stale" oder löscht sie vor dem Neu-Import (Idempotenz).
* Extrahiert nur blockierte Zeiträume (auch ohne Gast-Details).


3. **Conflict Detection:**
* Wenn ein iCal-Eintrag eine bestehende `source: "website"` Buchung überschneidet, wird ein Warn-Log ausgegeben, aber die Website-Buchung bleibt bestehen.


4. **Environment-Testing:**
* Unterstützung von `LOCAL_TEST_ICAL`-Pfaden für die Simulation von Buchungen ohne echte API-Aufrufe.



## 4. Test-Ablauf (Mocking)

1. **Setup:** In `.env.test` wird `AIRBNB_ICAL_URL` auf eine lokale `.ics`-Testdatei gesetzt.
2. **Execution:** Aufruf von `/api/sync?secret=XYZ`.
3. **Validation:** Prüfung in Firestore, ob exakt die Daten aus der Testdatei mit dem Flag `source: "external"` angelegt wurden.
