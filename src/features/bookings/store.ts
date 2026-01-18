import { getFirestore } from "firebase-admin/firestore";
import { initFirebaseAdmin } from "../../lib/firebase";
import { Booking, BookingMetadata, NewBooking, toDateString } from "./types";

const BOOKINGS_COLLECTION = "bookings";
const METADATA_COLLECTION = "metadata";
const METADATA_DOC_ID = "bookings";

const getDb = () => {
  initFirebaseAdmin();
  return getFirestore();
};

export const listBookings = async (): Promise<Booking[]> => {
  const snapshot = await getDb()
    .collection(BOOKINGS_COLLECTION)
    // Ensure Firestore has an index on startDate for ordering queries.
    .orderBy("startDate", "asc")
    .get();

  return snapshot.docs
    .map((doc) => {
      const data = doc.data();
      const startDate = toDateString(data.startDate);
      const endDate = toDateString(data.endDate);

      if (!startDate || !endDate) {
        return null;
      }

      return {
        id: doc.id,
        startDate,
        endDate,
        source: data.source,
        guestName: typeof data.guestName === "string" ? data.guestName : undefined,
        price: data.price,
      } as Booking;
    })
    .filter((booking): booking is Booking => Boolean(booking));
};

export const createBooking = async (booking: NewBooking): Promise<Booking> => {
  const docRef = await getDb().collection(BOOKINGS_COLLECTION).add({
    startDate: booking.startDate,
    endDate: booking.endDate,
    source: booking.source,
    guestName: booking.guestName ?? null,
    price: booking.price,
  });

  return {
    id: docRef.id,
    ...booking,
  };
};

export const getBookingMetadata = async (): Promise<BookingMetadata | null> => {
  const doc = await getDb().collection(METADATA_COLLECTION).doc(METADATA_DOC_ID).get();
  if (!doc.exists) {
    return null;
  }
  const data = doc.data();
  if (!data || typeof data.lastSyncTimestamp !== "string") {
    return null;
  }
  return { lastSyncTimestamp: data.lastSyncTimestamp };
};

export const setBookingMetadata = async (
  metadata: BookingMetadata
): Promise<void> => {
  await getDb().collection(METADATA_COLLECTION).doc(METADATA_DOC_ID).set({
    lastSyncTimestamp: metadata.lastSyncTimestamp,
  });
};
