import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { DatePicker } from "./DatePicker";
import { useBooking } from "../hooks/useBooking";
import type { CalendarContent } from "../../../i18n";

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

type BigCalendarProps = {
  strings: CalendarContent;
};

export function BigCalendar({ strings }: BigCalendarProps) {
  const [bookings, setBookings] = useState<CalendarBooking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [land, setLand] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [notes, setNotes] = useState("");
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
          setError(strings.loadErrorMessage);
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

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setStreet("");
    setHouseNumber("");
    setPostalCode("");
    setLand("");
    setGuestCount(1);
    setNotes("");
  };

  const handleOpenModal = () => {
    if (!selectedRange?.from || !selectedRange?.to) {
      return;
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedRange?.from || !selectedRange?.to) {
      return;
    }

    const startDate = toDateString(selectedRange.from);
    const endDate = toDateString(selectedRange.to);
    const result = await booking.submitBooking({
      startDate,
      endDate,
      guestCount,
      firstName,
      lastName,
      street,
      houseNumber,
      postalCode,
      land,
      notes,
    });

    if (result.ok) {
      setBookings((prev) => [
        ...prev,
        { startDate, endDate, source: "website", id: `local-${Date.now()}` },
      ]);
      setSelectedRange(undefined);
      setIsModalOpen(false);
      resetForm();
    }
  };

  return (
    <div className="space-y-6">
      {isLoading ? (
        <p className="text-sm text-slate-500">{strings.loadingLabel}</p>
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
                {strings.selectionLabel}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-700">
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {strings.fromLabel}
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {formatDate(selectedRange?.from)}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {strings.toLabel}
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
              onClick={handleOpenModal}
              disabled={!canBook || booking.status === "submitting"}
            >
              {booking.status === "submitting"
                ? strings.bookButtonLoadingLabel
                : strings.bookButtonLabel}
            </button>
            {booking.status === "success" ? (
              <p className="text-sm text-emerald-600">
                {strings.bookingSuccessMessage}
              </p>
            ) : null}
            {booking.status === "error" ? (
              <p className="text-sm text-rose-600">
                {strings.bookingErrorMessage}
              </p>
            ) : null}
          </div>
        </aside>
      </div>
      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-amber-700/80">
                  {strings.modalEyebrow}
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">
                  {strings.modalHeading}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {strings.modalDescription}
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                onClick={() => setIsModalOpen(false)}
              >
                {strings.modalCloseLabel}
              </button>
            </div>

            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  {strings.firstNameLabel}
                  <input
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className="rounded-xl border border-slate-300 bg-white/80 px-3 py-2 text-slate-900"
                    required
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  {strings.lastNameLabel}
                  <input
                    type="text"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    className="rounded-xl border border-slate-300 bg-white/80 px-3 py-2 text-slate-900"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  {strings.streetLabel}
                  <input
                    type="text"
                    value={street}
                    onChange={(event) => setStreet(event.target.value)}
                    className="rounded-xl border border-slate-300 bg-white/80 px-3 py-2 text-slate-900"
                    required
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  {strings.houseNumberLabel}
                  <input
                    type="text"
                    value={houseNumber}
                    onChange={(event) => setHouseNumber(event.target.value)}
                    className="rounded-xl border border-slate-300 bg-white/80 px-3 py-2 text-slate-900"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  {strings.postalCodeLabel}
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(event) => setPostalCode(event.target.value)}
                    className="rounded-xl border border-slate-300 bg-white/80 px-3 py-2 text-slate-900"
                    required
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  {strings.countryLabel}
                  <input
                    type="text"
                    value={land}
                    onChange={(event) => setLand(event.target.value)}
                    className="rounded-xl border border-slate-300 bg-white/80 px-3 py-2 text-slate-900"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1 text-sm text-slate-700">
                  {strings.guestCountLabel}
                  <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-2 py-2">
                    <button
                      type="button"
                      className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                      onClick={() => setGuestCount((value) => Math.max(1, value - 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={guestCount}
                      onChange={(event) => {
                        const nextValue = Number(event.target.value);
                        if (!Number.isNaN(nextValue)) {
                          setGuestCount(Math.max(1, Math.floor(nextValue)));
                        }
                      }}
                      className="w-full bg-transparent text-center text-sm font-semibold text-slate-900 focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                      onClick={() => setGuestCount((value) => value + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  {strings.notesLabel}
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    rows={3}
                    className="rounded-xl border border-slate-300 bg-white/80 px-3 py-2 text-slate-900"
                  />
                </label>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:text-slate-900"
                >
                  {strings.cancelLabel}
                </button>
                <button
                  type="submit"
                  disabled={booking.status === "submitting"}
                  className="rounded-full bg-amber-600 px-6 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {booking.status === "submitting"
                    ? strings.confirmBookingLoadingLabel
                    : strings.confirmBookingLabel}
                </button>
              </div>
              {booking.status === "error" ? (
                <p className="text-sm text-rose-600">
                  {strings.bookingErrorMessage}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
