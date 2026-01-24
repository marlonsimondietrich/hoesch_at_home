import {
  Booking,
  BookingErrorCode,
  BookingSource,
  BOOKING_SOURCES,
  NewBooking,
  compareDateStrings,
  isDateString,
} from "./types";

const isValidSource = (value: unknown): value is BookingSource =>
  typeof value === "string" && BOOKING_SOURCES.includes(value as BookingSource);

export type ValidationResult =
  | { ok: true; value: NewBooking }
  | { ok: false; code: BookingErrorCode };

export const validateBookingInput = (payload: unknown): ValidationResult => {
  if (!payload || typeof payload !== "object") {
    return { ok: false, code: "ERR_BAD_REQUEST" };
  }

  const data = payload as Record<string, unknown>;
  const startDate = data.startDate;
  const endDate = data.endDate;
  const source = data.source;
  const firstName = data.firstName;
  const lastName = data.lastName;
  const street = data.street;
  const houseNumber = data.houseNumber;
  const postalCode = data.postalCode;
  const land = data.land;
  const guestName = data.guestName;
  const guestCount = data.guestCount;
  const notes = data.notes;
  const price = data.price;

  if (!isDateString(startDate) || !isDateString(endDate)) {
    return { ok: false, code: "ERR_INVALID_DATE" };
  }

  if (compareDateStrings(startDate, endDate) > 0) {
    return { ok: false, code: "ERR_INVALID_RANGE" };
  }

  if (!isValidSource(source)) {
    return { ok: false, code: "ERR_BAD_REQUEST" };
  }

  if (firstName !== undefined && typeof firstName !== "string") {
    return { ok: false, code: "ERR_BAD_REQUEST" };
  }

  if (lastName !== undefined && typeof lastName !== "string") {
    return { ok: false, code: "ERR_BAD_REQUEST" };
  }

  if (street !== undefined && typeof street !== "string") {
    return { ok: false, code: "ERR_BAD_REQUEST" };
  }

  if (houseNumber !== undefined && typeof houseNumber !== "string") {
    return { ok: false, code: "ERR_BAD_REQUEST" };
  }

  if (postalCode !== undefined && typeof postalCode !== "string") {
    return { ok: false, code: "ERR_BAD_REQUEST" };
  }

  if (land !== undefined && typeof land !== "string") {
    return { ok: false, code: "ERR_BAD_REQUEST" };
  }

  if (guestName !== undefined && typeof guestName !== "string") {
    return { ok: false, code: "ERR_BAD_REQUEST" };
  }

  if (
    guestCount !== undefined &&
    (typeof guestCount !== "number" || Number.isNaN(guestCount))
  ) {
    return { ok: false, code: "ERR_BAD_REQUEST" };
  }

  if (notes !== undefined && typeof notes !== "string") {
    return { ok: false, code: "ERR_BAD_REQUEST" };
  }

  if (typeof price !== "number" || Number.isNaN(price)) {
    return { ok: false, code: "ERR_BAD_REQUEST" };
  }

  return {
    ok: true,
    value: {
      startDate,
      endDate,
      source,
      firstName,
      lastName,
      street,
      houseNumber,
      postalCode,
      land,
      guestName,
      guestCount,
      notes,
      price,
    },
  };
};

export const hasOverlap = (incoming: NewBooking, existing: Booking[]): boolean => {
  return existing.some((booking) => {
    const startsBeforeOrOnEnd =
      compareDateStrings(incoming.startDate, booking.endDate) <= 0;
    const endsAfterOrOnStart =
      compareDateStrings(incoming.endDate, booking.startDate) >= 0;
    return startsBeforeOrOnEnd && endsAfterOrOnStart;
  });
};
