import { compareDateStrings, type Booking } from "../bookings/types";

const CALENDAR_NAME = "Website bookings / Website Buchungen";
const SUMMARY_TEXT = "Booked / Gebucht";
const PROD_ID = "-//Hoesch at Home//iCal Export//EN";

const formatDateOnly = (dateString: string): string =>
  dateString.replace(/-/g, "");

const formatTimestamp = (date: Date): string =>
  date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

const escapeText = (value: string): string =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");

export const buildBookingUid = (booking: Booking): string =>
  `booking-${booking.id}@hoesch-at-home`;

const sortBookings = (bookings: Booking[]): Booking[] =>
  [...bookings].sort((a, b) => {
    const byStart = compareDateStrings(a.startDate, b.startDate);
    if (byStart !== 0) {
      return byStart;
    }
    const byEnd = compareDateStrings(a.endDate, b.endDate);
    if (byEnd !== 0) {
      return byEnd;
    }
    return a.id.localeCompare(b.id);
  });

export const buildIcalFeed = (
  bookings: Booking[],
  now: Date = new Date()
): string => {
  const timestamp = formatTimestamp(now);
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:${PROD_ID}`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(CALENDAR_NAME)}`,
  ];

  for (const booking of sortBookings(bookings)) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${buildBookingUid(booking)}`,
      `DTSTAMP:${timestamp}`,
      `LAST-MODIFIED:${timestamp}`,
      `DTSTART;VALUE=DATE:${formatDateOnly(booking.startDate)}`,
      `DTEND;VALUE=DATE:${formatDateOnly(booking.endDate)}`,
      `SUMMARY:${escapeText(SUMMARY_TEXT)}`,
      "STATUS:CONFIRMED",
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");
  return `${lines.join("\r\n")}\r\n`;
};
