const dotenv = require('dotenv');

// Load env vars when module is imported (handy for scripts/tests)
dotenv.config();

function toInt(value, fallback) {
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toBool(value, fallback = false) {
  if (value === undefined || value === null) return fallback;
  if (typeof value === 'boolean') return value;
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
}

const gemini = {
  apiKey: process.env.GEMINI_API_KEY,
  projectId: process.env.GEMINI_PROJECT_ID,
  location: process.env.GEMINI_LOCATION || 'us-central1',
  deepResearchAgent: process.env.GEMINI_DEEP_RESEARCH_AGENT || 'deep-research-pro-preview-12-2025',
  // Use a generally available model for generateContent (v1beta).
  model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
  fakeMode: toBool(process.env.GEMINI_FAKE_MODE, false),
};

const newsletter = {
  defaultLocale: process.env.DEFAULT_LOCALE || 'en',
  researchTimeWindowDays: toInt(process.env.RESEARCH_TIME_WINDOW_DAYS, 7),
  maxConcurrentSegments: toInt(process.env.MAX_CONCURRENT_SEGMENTS, 2),
  cron: process.env.NEWSLETTER_CRON || 'manual', // "manual" to disable scheduling
  dryRun: toBool(process.env.DRY_RUN, true),
  apiKey: process.env.NEWSLETTER_API_KEY || '',
  enableFeedbackCta: toBool(process.env.ENABLE_FEEDBACK_CTA, true),
  enablePersonalizedContent: toBool(process.env.ENABLE_PERSONALIZED_CONTENT, true),
  enableModularSections: toBool(process.env.ENABLE_MODULAR_SECTIONS, false),
  enableGenericFirstSends: toBool(process.env.ENABLE_GENERIC_FIRST_SENDS, true),
};

const firestore = {
  projectId: process.env.FIRESTORE_PROJECT_ID || process.env.GCLOUD_PROJECT || 'gen-lang-client-0140905626',
  databaseId: process.env.FIRESTORE_DATABASE_ID || 'newsletterdatabase',
  emulatorHost: process.env.FIRESTORE_EMULATOR_HOST || null,
  disabled: toBool(process.env.FIRESTORE_DISABLED, false),
};

function validateConfig() {
  if (!gemini.fakeMode && !gemini.apiKey) {
    throw new Error('GEMINI_API_KEY is required unless GEMINI_FAKE_MODE=true');
  }
  return true;
}

module.exports = {
  gemini,
  newsletter,
  firestore,
  validateConfig,
};
