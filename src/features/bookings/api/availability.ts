import type { APIRoute } from "astro";
import { createHash } from "node:crypto";
import { listBookings } from "../store";
import { compareDateStrings, serializeBooking } from "../types";
import { jsonResponse } from "./response";

const CACHE_CONTROL = "public, max-age=60, s-maxage=300, stale-while-revalidate=300";

export const handleAvailabilityGet: APIRoute = async ({ request }) => {
  const bookings = await listBookings();
  const sorted = bookings.sort((a, b) =>
    compareDateStrings(a.startDate, b.startDate)
  );
  const payload = JSON.stringify(sorted.map(serializeBooking));
  const etag = `W/"${createHash("sha1").update(payload).digest("hex")}"`;

  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, {
      status: 304,
      headers: {
        "Cache-Control": CACHE_CONTROL,
        ETag: etag,
      },
    });
  }

  return jsonResponse(payload, {
    status: 200,
    headers: {
      "Cache-Control": CACHE_CONTROL,
      ETag: etag,
    },
  });
};
