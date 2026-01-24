import type { APIRoute } from "astro";
import { jsonResponse } from "../../features/bookings/api/response";
import { listBookings } from "../../features/bookings/store";
import { loadIcalSources } from "../../features/ical/sources";
import { parseIcalText } from "../../features/ical/parser";

type CalendarBooking = {
  id: string;
  startDate: string;
  endDate: string;
  source: string;
};

const loadExternalBookings = async (): Promise<CalendarBooking[]> => {
  try {
    const payloads = await loadIcalSources();
    const external = payloads.flatMap((payload) => parseIcalText(payload));
    return external.map((booking, index) => ({
      id: `external-${index}`,
      startDate: booking.startDate,
      endDate: booking.endDate,
      source: booking.source,
    }));
  } catch (error) {
    console.warn("[calendar] Failed to load external iCal sources", error);
    return [];
  }
};

export const GET: APIRoute = async () => {
  const [dbBookings, externalBookings] = await Promise.all([
    listBookings(),
    loadExternalBookings(),
  ]);

  const bookings: CalendarBooking[] = [
    ...dbBookings.map((booking) => ({
      id: booking.id,
      startDate: booking.startDate,
      endDate: booking.endDate,
      source: booking.source,
    })),
    ...externalBookings,
  ];

  return jsonResponse(JSON.stringify({ bookings }), { status: 200 });
};

export const prerender = false;
