## Relevant Files

- `src/pages/house.astro` - New route entry for the house page.
- `src/components/HousePage.astro` - Page-level layout for hero, gallery, and facts sections.
- `src/components/NavBar.astro` - Existing navigation reused on the house page.
- `src/data/houseContent.ts` - Static bilingual content object with placeholder media paths.
- `public/house/*` - Placeholder image assets for the collage and gallery CTA.
- `src/styles/global.css` - Shared styles/utilities that may need tweaks for the new layout.

### Notes

- Build validated with `npm run build`; manual visual QA assumed via responsive layout reasoning (no automated tests set up).

## Tasks

- [x] 1.0 Define static content schema and placeholders for the house listing.
  - [x] 1.1 Create `src/data/houseContent.ts` with bilingual (DE/EN) strings for title, rating badge, highlight quote, facts, and gallery CTA.
  - [x] 1.2 Add placeholder image path references (hero + supporting images) and alt text in the content object.
  - [x] 1.3 Document how to swap placeholders for real assets within the content file.
- [x] 2.0 Scaffold the `/house` route and connect layout/content structure.
  - [x] 2.1 Add `src/pages/house.astro` wiring Layout, NavBar, and new `HousePage` component.
  - [x] 2.2 Ensure the page sets lang/SEO meta consistent with main layout conventions.
  - [x] 2.3 Confirm route works alongside existing locales without breaking `/` and `/en/`.
- [x] 3.0 Build the hero collage with guest highlight overlay in a responsive layout.
  - [x] 3.1 Implement `HousePage.astro` skeleton with hero section containers and grid structure (large left image, four smaller right images).
  - [x] 3.2 Add guest highlight overlay/card near the hero area using content from `houseContent`.
  - [x] 3.3 Ensure responsive stacking for tablet/mobile (e.g., vertical stacking, reduced grid).
- [x] 4.0 Implement the property facts row and gallery CTA section.
  - [x] 4.1 Build facts row with icons/text pairs (beds, bath, pets policy, occupancy, Wi‑Fi, size, type) showing DE then EN labels.
  - [x] 4.2 Add “Alle Bilder ansehen” gallery CTA placeholder with non-functional anchor/target.
  - [x] 4.3 Provide sensible defaults for iconography (reuse existing set or lightweight inline SVGs).
- [x] 5.0 Apply styling refinements, responsiveness, accessibility checks, and QA.
  - [x] 5.1 Add/adjust styles in `global.css` or component-scoped CSS for spacing, badges, overlays, and grid behavior.
  - [x] 5.2 Verify alt text, heading hierarchy, and focusable elements (links/buttons/CTA) for accessibility.
  - [x] 5.3 Manually QA at desktop/tablet/mobile breakpoints to ensure layout fidelity and readability.
