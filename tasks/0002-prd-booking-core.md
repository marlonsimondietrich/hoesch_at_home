# PRD: Booking Core & API Provider

## 1. Overview

Dieses Modul ist das Herzstück des Buchungssystems. Es verwaltet die Firestore-Datenbank und bietet eine konsolidierte API-Schnittstelle, die das Front-end nutzt, um die Belegung anzuzeigen. Es ist "Feature-First" konzipiert, sodass das Front-end sofort mit (manuellen) Daten arbeiten kann.

## 2. Goals

* Verwaltung lokaler Buchungen (Webseite/Manuell) in Firestore.
* Bereitstellung eines performanten Endpoints für das Front-end.
* Standardisierung des Datenformats für alle Buchungsquellen.

## 3. Functional Requirements

1. **Firestore Schema:**
* Kollektion `bookings`: Dokumente mit `startDate`, `endDate`, `source` (enum: website, manual, external), `guestName` (optional), `price`.
* Kollektion `metadata`: Speichert `lastSyncTimestamp`.


2. **API Endpoint `GET /api/availability`:**
* Liest alle Dokumente aus `bookings`.
* Gibt ein sortiertes JSON-Array zurück.
* Unterstützt Cache-Header, um Serverlast zu minimieren.


3. **API Endpoint `POST /api/bookings`:**
* Validiert neue Buchungsanfragen gegen bestehende Daten (keine Überlappung erlaubt).


4. **Multilingual Support:**
* Alle Fehlermeldungen (z.B. "Datum bereits belegt") werden als standardisierte Error-Codes (z.B. `ERR_DATE_OCCUPIED`) zurückgegeben.



## 4. Technical Considerations

* **Date Handling:** Alle Daten werden strikt in `YYYY-MM-DD` gespeichert, um Zeitzonenprobleme zu vermeiden.
* **Security:** Der POST-Endpoint muss durch eine einfache Auth oder ein Token geschützt sein.
