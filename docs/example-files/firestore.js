// Firestore bootstrapper using ADC (Application Default Credentials).
// Falls back to file-backed mode when disabled/misconfigured.
const { firestore: firestoreConfig } = require('./config');

let cachedDb = null;

function getFirestore() {
  if (cachedDb) return cachedDb;
  if (firestoreConfig.disabled) {
    console.warn('[firestore] Disabled via FIRESTORE_DISABLED');
    return null;
  }

  try {
    // Prefer firebase-admin for consistency with existing code.
    // eslint-disable-next-line global-require
    const admin = require('firebase-admin');
    const { applicationDefault } = require('firebase-admin/app');

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: applicationDefault(),
        projectId: firestoreConfig.projectId,
      });
    }

    const db = admin.firestore();
    const settings = {};
    if (firestoreConfig.databaseId) settings.databaseId = firestoreConfig.databaseId;
    if (firestoreConfig.emulatorHost) {
      settings.host = firestoreConfig.emulatorHost;
      settings.ssl = false;
    }
    if (Object.keys(settings).length) {
      db.settings(settings);
    }
    cachedDb = db;
    return cachedDb;
  } catch (err) {
    console.warn('[firestore] Disabled, firebase-admin not available or misconfigured:', err.message);
    return null;
  }
}

module.exports = getFirestore;
