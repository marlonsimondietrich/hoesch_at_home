import type { APIRoute } from "astro";
import { isAuthorized } from "../auth";
import { listBookings, createBooking } from "../store";
import { hasOverlap, validateBookingInput } from "../validation";
import { jsonError, jsonResponse } from "./response";

export const handleBookingsPost: APIRoute = async ({ request }) => {
  if (!isAuthorized(request)) {
    return jsonError("ERR_UNAUTHORIZED", 401);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonError("ERR_BAD_REQUEST", 400);
  }

  const validation = validateBookingInput(payload);
  if (!validation.ok) {
    return jsonError(validation.code, 400);
  }

  const existing = await listBookings();
  if (hasOverlap(validation.value, existing)) {
    return jsonError("ERR_DATE_OCCUPIED", 409);
  }

  const created = await createBooking(validation.value);
  return jsonResponse(JSON.stringify(created), { status: 201 });
};
