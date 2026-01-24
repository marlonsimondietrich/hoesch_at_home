import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";

export const initFirebaseAdmin = () => {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const projectId =
    process.env.FIRESTORE_PROJECT_ID ??
    process.env.GOOGLE_CLOUD_PROJECT ??
    (import.meta.env?.FIRESTORE_PROJECT_ID as string | undefined) ??
    (import.meta.env?.GOOGLE_CLOUD_PROJECT as string | undefined);

  if (process.env.DEBUG_FIRESTORE === "1") {
    console.info("[firebase] Initializing admin", { projectId });
  }

  return initializeApp({
    credential: applicationDefault(),
    ...(projectId ? { projectId } : {}),
  });
};
