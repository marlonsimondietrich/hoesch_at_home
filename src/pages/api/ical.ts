import type { APIRoute } from "astro";
import { createHash } from "node:crypto";
import { listBookings } from "../../features/bookings/store";
import { buildIcalFeed } from "../../features/ical/export";

const CACHE_CONTROL = "public, max-age=900, s-maxage=3600, stale-while-revalidate=3600";

const getExportToken = (): string | undefined =>
  process.env.ICAL_EXPORT_TOKEN ??
  (import.meta.env?.ICAL_EXPORT_TOKEN as string | undefined);

const isAuthorized = (request: Request): boolean => {
  const token = getExportToken();
  if (!token) {
    return false;
  }
  const requestToken = new URL(request.url).searchParams.get("token");
  return Boolean(requestToken && requestToken === token);
};

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  if (!isAuthorized(request)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const allBookings = await listBookings();
  const bookings = allBookings.filter((booking) => booking.source === "website");
  const body = buildIcalFeed(bookings);
  const etag = `W/"${createHash("sha1").update(body).digest("hex")}"`;
  const lastModified = new Date().toUTCString();

  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, {
      status: 304,
      headers: {
        "Cache-Control": CACHE_CONTROL,
        ETag: etag,
        "Last-Modified": lastModified,
      },
    });
  }

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Cache-Control": CACHE_CONTROL,
      ETag: etag,
      "Last-Modified": lastModified,
    },
  });
};
