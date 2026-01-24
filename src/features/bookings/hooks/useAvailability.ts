import { useCallback, useState } from "react";
import type { AvailabilityResponse, DateString } from "../types";
import { compareDateStrings } from "../types";

const overlaps = (
  startDate: DateString,
  endDate: DateString,
  booking: { startDate: DateString; endDate: DateString }
): boolean => {
  const startsBeforeOrOnEnd = compareDateStrings(startDate, booking.endDate) <= 0;
  const endsAfterOrOnStart = compareDateStrings(endDate, booking.startDate) >= 0;
  return startsBeforeOrOnEnd && endsAfterOrOnStart;
};

export type AvailabilityStatus = "idle" | "loading" | "available" | "unavailable" | "error";

export const useAvailability = () => {
  const [status, setStatus] = useState<AvailabilityStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const checkAvailability = useCallback(async (startDate: DateString, endDate: DateString) => {
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/availability", {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Availability request failed: ${response.status}`);
      }

      const bookings = (await response.json()) as AvailabilityResponse;
      const hasConflict = bookings.some((booking) => overlaps(startDate, endDate, booking));

      if (hasConflict) {
        setStatus("unavailable");
        return { available: false } as const;
      }

      setStatus("available");
      return { available: true } as const;
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unknown error");
      return { available: false } as const;
    }
  }, []);

  return { status, error, checkAvailability };
};
