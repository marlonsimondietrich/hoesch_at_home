export const isAuthorized = (request: Request): boolean => {
  const token = process.env.BOOKING_API_TOKEN;
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
