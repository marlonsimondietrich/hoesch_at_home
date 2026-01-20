import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { DatePicker } from "./DatePicker";
import { useBooking } from "../hooks/useBooking";

type CalendarBooking = {
  startDate: string;
  endDate: string;
  source: string;
};

type CalendarResponse = {
  bookings: CalendarBooking[];
};

type BlockedRange = {
  from: Date;
  to: Date;
};

const toLocalDate = (value: string): Date | null => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }
  return new Date(`${value}T00:00:00`);
};

const toDateRange = (booking: CalendarBooking): BlockedRange | null => {
  const start = toLocalDate(booking.startDate);
  const end = toLocalDate(booking.endDate);
  if (!start || !end) {
    return null;
  }
  if (end < start) {
    return { from: end, to: start };
  }
  return { from: start, to: end };
};

export function BigCalendar() {
  const [bookings, setBookings] = useState<CalendarBooking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const booking = useBooking();

  useEffect(() => {
    let isActive = true;

    const loadBookings = async () => {
      try {
        const response = await fetch("/api/calendar-blocks");
        if (!response.ok) {
          throw new Error("Failed to load calendar data.");
        }
        const payload = (await response.json()) as CalendarResponse;
        if (isActive) {
          setBookings(Array.isArray(payload.bookings) ? payload.bookings : []);
        }
      } catch (loadError) {
        console.error(loadError);
        if (isActive) {
          setError("Calendar data could not be loaded.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadBookings();

    return () => {
      isActive = false;
    };
  }, []);

  const blockedRanges = useMemo(
    () =>
      bookings
        .map((booking) => toDateRange(booking))
        .filter((range): range is BlockedRange => Boolean(range)),
    [bookings]
  );

  const formatDate = (value?: Date) =>
    value ? value.toLocaleDateString() : "--";

  const toDateString = (value: Date): string => {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const canBook = Boolean(selectedRange?.from && selectedRange?.to);

  const handleSubmit = async () => {
    if (!selectedRange?.from || !selectedRange?.to) {
      return;
    }

    const startDate = toDateString(selectedRange.from);
    const endDate = toDateString(selectedRange.to);
    const result = await booking.submitBooking({
      startDate,
      endDate,
      guestCount: 1,
    });

    if (result.ok) {
      setBookings((prev) => [
        ...prev,
        { startDate, endDate, source: "website", id: `local-${Date.now()}` },
      ]);
      setSelectedRange(undefined);
    }
  };

  return (
    <div className="space-y-6">
      {isLoading ? (
        <p className="text-sm text-slate-500">Loading calendar...</p>
      ) : null}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="w-full flex-1">
          <DatePicker
            blockedRanges={blockedRanges}
            selectedRange={selectedRange}
            onSelectRange={setSelectedRange}
          />
        </div>
        <aside className="w-full max-w-sm shrink-0 rounded-3xl border border-amber-100 bg-white/70 p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-700/80">
                Auswahl
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-700">
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    From
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {formatDate(selectedRange?.from)}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    To
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {formatDate(selectedRange?.to)}
                  </p>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="w-full rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              onClick={handleSubmit}
              disabled={!canBook || booking.status === "submitting"}
            >
              {booking.status === "submitting" ? "Booking..." : "Book the house"}
            </button>
            {booking.status === "success" ? (
              <p className="text-sm text-emerald-600">
                Booking saved. We will be in touch soon.
              </p>
            ) : null}
            {booking.status === "error" ? (
              <p className="text-sm text-rose-600">
                Booking failed. Please try again or select new dates.
              </p>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
