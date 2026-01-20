# Hoesch@Home

Astro site with localized routes and JSON-based content strings.

## Project structure

```text
src/
  pages/
    index.astro               # default locale route (/)
    calendar.astro            # default locale route (/calendar)
    [locale]/index.astro      # localized routes (/en)
    [locale]/calendar.astro   # localized routes (/en/calendar)
  pages-templates/
    Home.astro                # shared markup for home page
    Calendar.astro            # shared markup for calendar page
  i18n/
    index.ts                  # getStrings + exports
    de.ts                     # loads de JSON
    en.ts                     # loads en JSON
    types.ts                  # locale types and content typing
  content/
    home/
      de.json                 # home page copy (DE)
      en.json                 # home page copy (EN)
    calendarDE.json           # calendar copy (DE)
    calendarEN.json           # calendar copy (EN)
    config.ts                 # content schema for home JSON
  components/
    HomePage.astro            # renders sections for home
    sections/
      homeSections.ts         # section registry for home page
      GallerySection.astro
      AmenitiesSection.astro
      BookingSection.astro
```

## How localization works

- Routing: Astro i18n uses `/` for the default locale and `/<locale>/...` for others.
- Pages: `src/pages/*` are thin wrappers that pass `currentLocale` to the shared templates.
- Content: locale strings live in JSON and are loaded via `getStrings(locale)` in `src/i18n/*`.
- Canonicals/alternates are set in `src/layouts/main.astro`.

## Add a new home section (step-by-step)

1. Create the section component.
   - Add a new file in `src/components/sections/`, e.g. `TestimonialsSection.astro`.
2. Register the section.
   - Update `src/components/sections/homeSections.ts`:
     - Add a new `contentKey` in the `SectionLabelKey` union.
     - Add a new entry to `baseSections` with a unique `id`, the `contentKey`, and your component.
3. Add copy fields to the schema.
   - Update `src/content/config.ts` and add any new fields your section needs.
4. Add localized text.
   - Update `src/content/home/de.json` and `src/content/home/en.json` with the new keys.
5. Use the content inside your section.
   - In your section component, accept `content: HomeContent` and read the fields you added.

Notes:
- `HomePage.astro` automatically renders all registered sections from `homeSections.ts`.
- The `section...Label` fields are used for navigation labels.

## Add or update translations (step-by-step)

1. Home page copy:
   - Edit `src/content/home/de.json` and `src/content/home/en.json`.
   - If you add new keys, also add them to `src/content/config.ts`.
2. Calendar page copy:
   - Edit `src/content/calendarDE.json` and `src/content/calendarEN.json`.
   - If you add new fields, update the `CalendarContent` type in `src/i18n/types.ts`.
3. Verify usage:
   - Make sure components or templates read from `getStrings(locale)` instead of hard-coded text.

## Commands

```sh
npm run dev
npm run build
npm run preview
```

## Environment variables

- `BOOKING_API_TOKEN`: Required for `/api/bookings` and `/api/sync` authorization.
- `PUBLIC_BOOKING_API_TOKEN`: Client-side token used by the booking widget in dev.
- `ICAL_SOURCE_URLS`: Comma-separated list of iCal feed URLs to sync.
- `LOCAL_TEST_ICAL_PATHS`: Comma-separated list of local `.ics` file paths for local sync.
- `AIRBNB_ICAL_URL` and `BOOKING_ICAL_URL`: Optional individual iCal feed URLs.

## Security note

`npm audit` currently reports moderate vulnerabilities in the dev-only `@astrojs/check` dependency chain
via the YAML language server and lodash. We accept this risk for local tooling and keep the current versions
until an upstream fix lands.
