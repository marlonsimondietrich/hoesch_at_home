import * as ical from "node-ical";
import { NewBooking, toDateString } from "../bookings/types";

type IcalEvent = {
  type?: string;
  start?: Date;
  end?: Date;
  summary?: string;
  description?: string;
  datetype?: string;
};

const isAllDayEvent = (event: IcalEvent): boolean => {
  if (event.datetype === "date") {
    return true;
  }
  if (!event.start || !event.end) {
    return false;
  }
  return (
    event.start.getUTCHours() === 0 &&
    event.start.getUTCMinutes() === 0 &&
    event.start.getUTCSeconds() === 0 &&
    event.end.getUTCHours() === 0 &&
    event.end.getUTCMinutes() === 0 &&
    event.end.getUTCSeconds() === 0
  );
};

const toLocalDateString = (value: Date): string => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const adjustAllDayEnd = (end: Date): Date => {
  const adjusted = new Date(end.getTime());
  adjusted.setDate(adjusted.getDate() - 1);
  return adjusted;
};

const extractGuestName = (event: IcalEvent): string | undefined => {
  const candidates = [event.summary, event.description];
  for (const candidate of candidates) {
    if (typeof candidate === "string") {
      const trimmed = candidate.trim();
      if (trimmed) {
        return trimmed;
      }
    }
  }
  return undefined;
};

const mapEventToBooking = (event: IcalEvent): NewBooking | null => {
  if (!event.start) {
    return null;
  }
  const rawEnd = event.end ?? event.start;
  const isAllDay = isAllDayEvent(event);
  const startDate = isAllDay
    ? toLocalDateString(event.start)
    : toDateString(event.start);
  const endDate = isAllDay
    ? toLocalDateString(adjustAllDayEnd(rawEnd))
    : toDateString(rawEnd);

  if (!startDate || !endDate) {
    return null;
  }

  return {
    startDate,
    endDate,
    source: "external",
    guestName: extractGuestName(event),
    price: 0,
  };
};

export const parseIcalText = (icsText: string): NewBooking[] => {
  const parsed = ical.parseICS(icsText);
  return Object.values(parsed)
    .filter((entry) => entry && (entry as IcalEvent).type === "VEVENT")
    .map((entry) => mapEventToBooking(entry as IcalEvent))
    .filter((booking): booking is NewBooking => Boolean(booking));
};
