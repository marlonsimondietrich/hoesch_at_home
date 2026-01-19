import { getFirestore } from "firebase-admin/firestore";
import { initFirebaseAdmin } from "../../lib/firebase";
import type { Booking, NewBooking } from "../bookings/types";
import { createBooking } from "../bookings/store";

const BOOKINGS_COLLECTION = "bookings";

const getDb = () => {
  const app = initFirebaseAdmin();
  const databaseId =
    process.env.FIRESTORE_DATABASE_ID ??
    (import.meta.env?.FIRESTORE_DATABASE_ID as string | undefined) ??
    "(default)";
  return getFirestore(app, databaseId);
};

export const deleteExternalBookings = async (): Promise<number> => {
  const db = getDb();
  const snapshot = await db
    .collection(BOOKINGS_COLLECTION)
    .where("source", "==", "external")
    .get();

  if (snapshot.empty) {
    return 0;
  }

  const batch = db.batch();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
  return snapshot.size;
};

export const createExternalBookings = async (
  bookings: NewBooking[]
): Promise<Booking[]> => {
  return Promise.all(bookings.map((booking) => createBooking(booking)));
};
