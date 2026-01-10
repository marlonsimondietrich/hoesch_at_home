# House Page (/house) PRD

## 1. Introduction/Overview
Create a static `/house` page that showcases a single vacation rental in a layout inspired by the provided Airbnb-style reference. The page emphasizes visual appeal (hero photo collage), quick property facts, and bilingual copy (German primary, English secondary) without booking or pricing functionality.

## 2. Goals
- Deliver an informational landing page for one house listing at route `/house`.
- Mirror the reference layout enough to feel familiar while allowing visual flexibility aligned to the site’s existing styles.
- Present bilingual text blocks (DE first, EN second) for key content sections.
- Ship with placeholder images and copy that can be swapped easily.
- Ensure responsive behavior for desktop, tablet, and mobile.

## 3. User Stories
1. As a prospective renter, I want to see a large hero photo and supporting photos so I can quickly gauge the property’s vibe.
2. As a prospective renter, I want clear property facts (beds, bath, occupancy, size, amenities) so I can decide if it fits my needs.
3. As a prospective renter, I want to read a short highlight/quote about what guests love so I can trust the stay’s quality.
4. As a site visitor, I want the page to work on mobile and desktop so I can browse comfortably on any device.

## 4. Functional Requirements
1. Route: Add a `/house` page accessible via direct URL.
2. Header info block: Display title, rating badge, tag text (e.g., “Fantastisch”), review count, location string. All content is static and bilingual (DE/EN shown together or in paired lines).
3. Hero photo collage: Large primary image on the left and a grid of smaller supporting images on the right (at least four placeholders). Images can be static placeholders; file paths configurable in content.
4. Guest highlight callout: Small overlay-style text block near the hero area with a short quote/what-guests-love line, bilingual.
5. Property facts row: Icons + labels for bedrooms, bathrooms, pets policy, occupancy, Wi‑Fi, size, property type. Text shown in German first, English second.
6. Gallery CTA placeholder: A button/label “Alle Bilder ansehen” linking to a non-functional anchor or placeholder section (no modal/lightbox required).
7. Content source: All copy and image paths stored as static data (e.g., JSON/TS object) for easy updates.
8. Accessibility: Provide alt text for all images, readable badges, and proper heading hierarchy.
9. Responsiveness: Photo layout collapses gracefully (e.g., stacked images on small screens); ensure tap targets remain usable.

## 5. Non-Goals (Out of Scope)
- Booking/pricing widgets, availability calendar, or date pickers.
- Checkout or reservation flows.
- Reviews list, ratings input, or review submission.
- Maps, host profile, messaging, or location directions.
- Dynamic data fetching or CMS integration.
- Authentication or user accounts.

## 6. Design Considerations
- Layout: Left-dominant hero image with right-hand supporting grid; white/light background with generous spacing similar to the reference.
- Visual language: Match existing site typography/colors where possible; reference layout is “inspired” not pixel-perfect.
- Badges: Simple pill/badge for rating + descriptor; subtle dividers between metadata (review count, location).
- Cards/overlays: Guest-highlight callout styled as a lightweight card over or adjacent to the hero.
- Mobile: Consider a vertical photo stack and property facts in two columns or a scrollable row.

## 7. Technical Considerations
- Framework: Follow current stack conventions in the repo (likely Astro/TS). Keep page static.
- Data structure: Single config object exporting bilingual strings and image paths; ensure easy swap for real assets later.
- Assets: Use placeholder images stored locally (e.g., `public/house/*.jpg`) or existing placeholder assets; no remote fetch.
- Routing: Register the page in the site’s routing mechanism (e.g., `src/pages/house.astro` if using Astro defaults).
- Localization approach: Since static, show German first with English directly below/alongside; no locale switching required.

## 8. Success Metrics
- Page renders at `/house` with reference-inspired layout and bilingual content.
- Responsive layout verified at desktop (~1280px) and mobile (~375–430px) widths.
- All text available in both languages; placeholders clearly marked for replacement.
- No runtime data calls; build remains static.

## 9. Open Questions
- Do you want a simple “Kontakt/Contact” link even without booking, or keep purely informational?
- Should the gallery CTA scroll to a gallery section or simply be a static label?
- Any specific icon set to use for property facts (existing library vs. bespoke SVGs)?
- Preferred placeholder image set/paths? Should we include an “all photos” grid below the fold?
