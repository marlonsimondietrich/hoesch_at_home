import type { Booking, NewBooking } from "../types";

export const baseNewBooking: NewBooking = {
  startDate: "2025-05-01",
  endDate: "2025-05-05",
  source: "website",
  price: 150,
};

export const overlappingBooking: Booking = {
  id: "1",
  startDate: "2025-05-04",
  endDate: "2025-05-08",
  source: "manual",
  price: 200,
};

export const adjacentBooking: Booking = {
  id: "2",
  startDate: "2025-05-06",
  endDate: "2025-05-08",
  source: "manual",
  price: 200,
};
