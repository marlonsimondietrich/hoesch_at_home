import type { BookingErrorCode } from "../types";

export const jsonResponse = (
  body: string,
  init?: ResponseInit
): Response => {
  return new Response(body, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
};

export const jsonError = (code: BookingErrorCode, status = 400): Response => {
  return jsonResponse(JSON.stringify({ error: { code } }), { status });
};
