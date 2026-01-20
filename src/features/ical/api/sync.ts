import type { APIRoute } from "astro";
import { isAuthorized } from "../../bookings/auth";
import { jsonError, jsonResponse } from "../../bookings/api/response";
import { listBookings, setBookingMetadata } from "../../bookings/store";
import { hasOverlap } from "../../bookings/validation";
import type { Booking, NewBooking } from "../../bookings/types";
import { parseIcalText } from "../parser";
import { loadIcalSources } from "../sources";
import { createExternalBookings, deleteExternalBookings } from "../store";

const isProtectedSource = (booking: Booking): boolean =>
  booking.source === "website" || booking.source === "manual";

export const handleSyncPost: APIRoute = async ({ request }) => {
  if (!isAuthorized(request)) {
    return jsonError("ERR_UNAUTHORIZED", 401);
  }

  let payloads: string[];
  try {
    payloads = await loadIcalSources();
  } catch (error) {
    console.warn("[ical] Failed to load sources", error);
    return jsonError("ERR_BAD_REQUEST", 400);
  }

  const incoming = payloads.flatMap((payload) => parseIcalText(payload));
  const existing = await listBookings();
  const protectedBookings = existing.filter(isProtectedSource);

  const toImport: NewBooking[] = [];
  const skipped: NewBooking[] = [];

  for (const booking of incoming) {
    if (hasOverlap(booking, protectedBookings)) {
      console.warn(
        `[ical] Conflict detected for ${booking.startDate} to ${booking.endDate}`
      );
      skipped.push(booking);
      continue;
    }
    toImport.push(booking);
  }

  const deletedExternal = await deleteExternalBookings();
  const created = await createExternalBookings(toImport);

  const timestamp = new Date().toISOString();
  await setBookingMetadata({ lastSyncTimestamp: timestamp });

  return jsonResponse(
    JSON.stringify({
      imported: created.length,
      skipped: skipped.length,
      deletedExternal,
      lastSyncTimestamp: timestamp,
    }),
    { status: 200 }
  );
};
