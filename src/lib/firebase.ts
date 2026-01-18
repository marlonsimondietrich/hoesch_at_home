import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";

export const initFirebaseAdmin = () => {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  return initializeApp({
    credential: applicationDefault(),
  });
};
