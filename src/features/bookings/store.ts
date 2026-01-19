import { getFirestore } from "firebase-admin/firestore";
import { initFirebaseAdmin } from "../../lib/firebase";
import { Booking, BookingMetadata, NewBooking, toDateString } from "./types";

const BOOKINGS_COLLECTION = "bookings";
const METADATA_COLLECTION = "metadata";
const METADATA_DOC_ID = "bookings";

const getDb = () => {
  const app = initFirebaseAdmin();
  const databaseId =
    process.env.FIRESTORE_DATABASE_ID ??
    (import.meta.env?.FIRESTORE_DATABASE_ID as string | undefined) ??
    "(default)";
  const db = getFirestore(app, databaseId);
  if (process.env.DEBUG_FIRESTORE === "1") {
    console.info("[firestore] Using database", {
      projectId: app.options.projectId,
      databaseId,
      settings: (db as { _settings?: unknown })._settings,
    });
  }
  return db;
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
        guestCount: typeof data.guestCount === "number" ? data.guestCount : undefined,
        notes: typeof data.notes === "string" ? data.notes : undefined,
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
    guestCount: booking.guestCount ?? null,
    notes: booking.notes ?? null,
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
