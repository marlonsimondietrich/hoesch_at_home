import { useCallback, useState } from "react";
import type { BookingErrorCode, DateString } from "../types";

export type BookingStatus = "idle" | "submitting" | "success" | "error";

type BookingPayload = {
  startDate: DateString;
  endDate: DateString;
  guestCount: number;
  notes?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  land?: string;
};

const readErrorCode = async (response: Response): Promise<BookingErrorCode | null> => {
  try {
    const body = (await response.json()) as { error?: { code?: BookingErrorCode } };
    return body.error?.code ?? null;
  } catch {
    return null;
  }
};

export const useBooking = () => {
  const [status, setStatus] = useState<BookingStatus>("idle");
  const [errorCode, setErrorCode] = useState<BookingErrorCode | null>(null);

  const submitBooking = useCallback(async (payload: BookingPayload) => {
    setStatus("submitting");
    setErrorCode(null);

    const token = import.meta.env.PUBLIC_BOOKING_API_TOKEN as string | undefined;
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "x-booking-token": token } : {}),
      },
      body: JSON.stringify({
        startDate: payload.startDate,
        endDate: payload.endDate,
        source: "website",
        firstName: payload.firstName?.trim() || undefined,
        lastName: payload.lastName?.trim() || undefined,
        street: payload.street?.trim() || undefined,
        houseNumber: payload.houseNumber?.trim() || undefined,
        postalCode: payload.postalCode?.trim() || undefined,
        land: payload.land?.trim() || undefined,
        guestCount: payload.guestCount,
        notes: payload.notes?.trim() || undefined,
        price: 0,
      }),
    });

    if (!response.ok) {
      const code = await readErrorCode(response);
      setErrorCode(code ?? "ERR_INTERNAL");
      setStatus("error");
      return { ok: false } as const;
    }

    setStatus("success");
    return { ok: true } as const;
  }, []);

  return { status, errorCode, submitBooking };
};
