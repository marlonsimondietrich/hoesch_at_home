export const isAuthorized = (request: Request): boolean => {
  const token =
    process.env.BOOKING_API_TOKEN ??
    process.env.PUBLIC_BOOKING_API_TOKEN ??
    (import.meta.env?.BOOKING_API_TOKEN as string | undefined) ??
    (import.meta.env?.PUBLIC_BOOKING_API_TOKEN as string | undefined);
  if (!token) {
    return false;
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader) {
    const [scheme, value] = authHeader.split(" ");
    if (scheme?.toLowerCase() === "bearer" && value === token) {
      return true;
    }
  }

  const headerToken = request.headers.get("x-booking-token");
  return Boolean(headerToken && headerToken === token);
};
