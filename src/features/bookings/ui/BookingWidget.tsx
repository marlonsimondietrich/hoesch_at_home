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
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
        <header className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">{bookingHeading}</h2>
          <p className="mt-2 text-sm text-slate-600">{bookingDescription}</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              {bookingStartDateLabel}
              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900"
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
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900"
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
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900"
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
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCheckAvailability}
              disabled={!canCheckAvailability || availability.status === "loading"}
              className="rounded-full border border-slate-900 px-5 py-2 text-sm font-semibold text-slate-900 transition disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-400"
            >
              {availability.status === "loading"
                ? bookingAvailabilityChecking
                : bookingCheckAvailabilityLabel}
            </button>
            <button
              type="submit"
              disabled={!availabilityConfirmed || booking.status === "submitting"}
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-slate-400"
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
