import { useEffect, useMemo, useState } from "react";
import type { BookingErrorCode } from "../types";
import type { HomeContent } from "../../../i18n";
import { compareDateStrings } from "../types";
import { useAvailability } from "../hooks/useAvailability";
import { useBooking } from "../hooks/useBooking";

export type BookingWidgetContent = Pick<
  HomeContent,
  | "bookingHeading"
  | "bookingDescription"
  | "bookingStartDateLabel"
  | "bookingEndDateLabel"
  | "bookingGuestsLabel"
  | "bookingNotesLabel"
  | "bookingNotesPlaceholder"
  | "bookingCheckAvailabilityLabel"
  | "bookingBookNowLabel"
  | "bookingAvailabilityAvailable"
  | "bookingAvailabilityUnavailable"
  | "bookingAvailabilityChecking"
  | "bookingAvailabilityError"
  | "bookingValidationError"
  | "bookingBookingError"
  | "bookingSuccessMessage"
>;

type BookingWidgetProps = {
  content: BookingWidgetContent;
};

const isValidRange = (startDate: string, endDate: string): boolean => {
  if (!startDate || !endDate) {
    return false;
  }
  return compareDateStrings(startDate, endDate) <= 0;
};

const mapBookingError = (
  code: BookingErrorCode | null,
  fallback: string,
  unavailableMessage: string
): string => {
  if (!code) {
    return fallback;
  }
  if (code === "ERR_DATE_OCCUPIED") {
    return unavailableMessage;
  }
  return fallback;
};

export const BookingWidget = ({ content }: BookingWidgetProps) => {
  const {
    bookingHeading,
    bookingDescription,
    bookingStartDateLabel,
    bookingEndDateLabel,
    bookingGuestsLabel,
    bookingNotesLabel,
    bookingNotesPlaceholder,
    bookingCheckAvailabilityLabel,
    bookingBookNowLabel,
    bookingAvailabilityAvailable,
    bookingAvailabilityUnavailable,
    bookingAvailabilityChecking,
    bookingAvailabilityError,
    bookingValidationError,
    bookingBookingError,
    bookingSuccessMessage,
  } = content;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [notes, setNotes] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [availabilityConfirmed, setAvailabilityConfirmed] = useState(false);

  const availability = useAvailability();
  const booking = useBooking();

  const parsedGuestCount = Number(guestCount);
  const isValidGuestCount = Number.isInteger(parsedGuestCount) && parsedGuestCount > 0;

  const canCheckAvailability = useMemo(() => {
    return isValidRange(startDate, endDate) && isValidGuestCount;
  }, [startDate, endDate, isValidGuestCount]);

  useEffect(() => {
    setAvailabilityConfirmed(false);
    setFeedback(null);
  }, [startDate, endDate, guestCount, notes]);

  const handleCheckAvailability = async () => {
    if (!canCheckAvailability) {
      setFeedback(bookingValidationError);
      return;
    }

    const result = await availability.checkAvailability(startDate, endDate);
    if (result.available) {
      setAvailabilityConfirmed(true);
      setFeedback(bookingAvailabilityAvailable);
    } else if (availability.status === "error") {
      setFeedback(bookingAvailabilityError);
    } else {
      setFeedback(bookingAvailabilityUnavailable);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!availabilityConfirmed || !canCheckAvailability) {
      setFeedback(bookingValidationError);
      return;
    }

    const result = await booking.submitBooking({
      startDate,
      endDate,
      guestCount: parsedGuestCount,
      notes,
    });

    if (!result.ok) {
      setFeedback(
        mapBookingError(
          booking.errorCode,
          bookingBookingError,
          bookingAvailabilityUnavailable
        )
      );
      setAvailabilityConfirmed(false);
      return;
    }

    setFeedback(bookingSuccessMessage);
  };

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="rounded-3xl border border-[#ead8cd] bg-[#f8f5f2]/90 p-6 shadow-[0_20px_60px_-45px_rgba(88,42,24,0.6)]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              {bookingStartDateLabel}
              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="rounded-xl border border-slate-300 bg-white/80 px-3 py-2 text-slate-900"
                required
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              {bookingEndDateLabel}
              <input
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                min={startDate || undefined}
                className="rounded-xl border border-slate-300 bg-white/80 px-3 py-2 text-slate-900"
                required
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              {bookingGuestsLabel}
              <input
                type="number"
                min={1}
                value={guestCount}
                onChange={(event) => setGuestCount(event.target.value)}
                className="rounded-xl border border-slate-300 bg-white/80 px-3 py-2 text-slate-900"
                required
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              {bookingNotesLabel}
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
                placeholder={bookingNotesPlaceholder}
                className="rounded-xl border border-slate-300 bg-white/80 px-3 py-2 text-slate-900"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCheckAvailability}
              disabled={!canCheckAvailability || availability.status === "loading"}
              className="rounded-full border border-slate-300 bg-white/70 px-5 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:text-slate-900 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
            >
              {availability.status === "loading"
                ? bookingAvailabilityChecking
                : bookingCheckAvailabilityLabel}
            </button>
            <button
              type="submit"
              disabled={!availabilityConfirmed || booking.status === "submitting"}
              className="rounded-full bg-[#B85E3C] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#a34f32] disabled:cursor-not-allowed disabled:bg-[#d4a18d]"
            >
              {bookingBookNowLabel}
            </button>
          </div>

          {feedback ? (
            <p className="text-sm text-slate-700" aria-live="polite">
              {feedback}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
};

export default BookingWidget;
