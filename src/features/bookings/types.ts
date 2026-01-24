export const BOOKING_SOURCES = ["website", "manual", "external"] as const;
export type BookingSource = (typeof BOOKING_SOURCES)[number];

export const BOOKING_ERROR_CODES = [
  "ERR_BAD_REQUEST",
  "ERR_DATE_OCCUPIED",
  "ERR_INVALID_DATE",
  "ERR_INVALID_RANGE",
  "ERR_UNAUTHORIZED",
  "ERR_INTERNAL",
] as const;
export type BookingErrorCode = (typeof BOOKING_ERROR_CODES)[number];

export type DateString = string;

export interface Booking {
  id: string;
  startDate: DateString;
  endDate: DateString;
  source: BookingSource;
  firstName?: string;
  lastName?: string;
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  land?: string;
  guestName?: string;
  guestCount?: number;
  notes?: string;
  price: number;
}

export interface NewBooking {
  startDate: DateString;
  endDate: DateString;
  source: BookingSource;
  firstName?: string;
  lastName?: string;
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  land?: string;
  guestName?: string;
  guestCount?: number;
  notes?: string;
  price: number;
}

export interface BookingMetadata {
  lastSyncTimestamp: string;
}

export type AvailabilityResponse = Booking[];

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const isDateString = (value: unknown): value is DateString =>
  typeof value === "string" && DATE_REGEX.test(value);

export const compareDateStrings = (a: DateString, b: DateString): number =>
  a.localeCompare(b);

export const toDateString = (value: unknown): DateString | null => {
  if (typeof value === "string") {
    return isDateString(value) ? value : null;
  }
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "object" && value && "toDate" in value) {
    const maybeDate = (value as { toDate?: () => Date }).toDate?.();
    if (maybeDate instanceof Date && !Number.isNaN(maybeDate.getTime())) {
      return maybeDate.toISOString().slice(0, 10);
    }
  }
  return null;
};

export const serializeBooking = (booking: Booking): Booking => ({
  id: booking.id,
  startDate: booking.startDate,
  endDate: booking.endDate,
  source: booking.source,
  firstName: booking.firstName,
  lastName: booking.lastName,
  street: booking.street,
  houseNumber: booking.houseNumber,
  postalCode: booking.postalCode,
  land: booking.land,
  guestName: booking.guestName,
  guestCount: booking.guestCount,
  notes: booking.notes,
  price: booking.price,
});
