# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Environment variables

- `BOOKING_API_TOKEN`: Required for `/api/bookings` and `/api/sync` authorization.
- `PUBLIC_BOOKING_API_TOKEN`: Client-side token used by the booking widget in dev.
- `ICAL_SOURCE_URLS`: Comma-separated list of iCal feed URLs to sync.
- `LOCAL_TEST_ICAL_PATHS`: Comma-separated list of local `.ics` file paths for local sync.
- `AIRBNB_ICAL_URL` and `BOOKING_ICAL_URL`: Optional individual iCal feed URLs.

## Docker

Build and run locally:

```sh
docker build -t hoesch-at-home .
docker run --rm -p 8080:8080 \
  -e BOOKING_API_TOKEN=... \
  -e PUBLIC_BOOKING_API_TOKEN=... \
  -e ICAL_SOURCE_URLS=... \
  hoesch-at-home
```

## Google Cloud Run

```sh
gcloud builds submit --tag gcr.io/$GOOGLE_CLOUD_PROJECT/hoesch-at-home
gcloud run deploy hoesch-at-home \
  --image gcr.io/$GOOGLE_CLOUD_PROJECT/hoesch-at-home \
  --region europe-west3 \
  --allow-unauthenticated \
  --set-env-vars BOOKING_API_TOKEN=...,PUBLIC_BOOKING_API_TOKEN=...,ICAL_SOURCE_URLS=...
```

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Testing

```curl
curl -X POST http://localhost:4321/api/sync \
  -H "x-booking-token: 832eba50634914380562b2f685ab3646572b4fb47db355c1a55e45ed516fd02e"
```

```curl
GOOGLE_APPLICATION_CREDENTIALS=/Users/marlondietrich/Projects/hoesch_at_home/gen-lang-client-0140905626-0deb319731d0.json \
FIRESTORE_PROJECT_ID=gen-lang-client-0140905626 \
GOOGLE_CLOUD_PROJECT=gen-lang-client-0140905626 \
FIRESTORE_DATABASE_ID=hoeschathomedb \
BOOKING_API_TOKEN=832eba50634914380562b2f685ab3646572b4fb47db355c1a55e45ed516fd02e \
PUBLIC_BOOKING_API_TOKEN=832eba50634914380562b2f685ab3646572b4fb47db355c1a55e45ed516fd02e \
ICAL_SOURCE_URLS=https://calendar.google.com/calendar/ical/marlonsimondietrich%40gmail.com/private-5564cb236d2a5aba3b490175614186c2/basic.ics \
npm run dev
```
