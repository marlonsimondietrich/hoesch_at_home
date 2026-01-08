## Relevant Files

- `src/components/HomePage.astro` - Main home layout; renders hero with locale-aware data and alternate locale link.
- `src/components/Hero.astro` - Dedicated hero section with split layout, illustration, and hero-local language toggle.
- `src/data/homeContent.ts` - EN/DE content source for hero/nav strings (eyebrow, headline, body, CTAs, alt, toggle labels).
- `src/assets/hoeschathome-illustration.png` - Required hero illustration asset.
- `src/styles/` (e.g., `global.css` or equivalents) - Styling tokens; add hero-specific styles or utility classes if needed.
- `src/components/NavBar.astro` / `Footer.astro` - Ensure hero placement respects surrounding chrome spacing.
- `src/pages/index.astro`, `src/pages/en/index.astro` - Page entrypoints to render hero with correct locale default (DE) and alternate locale links.
- `src/components` (new file: `Hero.astro`) - Dedicated hero component for reuse across locales.
- `tasks/0001-prd-hero-section.md` - Source PRD for reference.

### Notes

- Unit tests (if added) should live alongside components (e.g., `Hero.test.tsx` if using a test runner).
- Respect brand guide typography (Georgia) and tone; ensure DE is default render.

## Tasks

- [x] 1.0 Define bilingual hero content, CTA destinations, and alt text based on PRD (DE default, EN variant).
  - [x] 1.1 Draft EN/DE copy for eyebrow (optional), headline, body (2–3 lines), primary CTA, secondary CTA, alt text, and toggle labels using PRD tone; confirm “du” in DE.
  - [x] 1.2 Confirm destination URLs/anchors for primary (booking inquiry) and secondary (learn more/rooms section) CTAs.
  - [x] 1.3 Decide language persistence scope (hero-local vs. site-wide) and default (DE); document fallback when JS unavailable.
- [x] 2.0 Implement hero layout with split structure, illustration anchoring, and hero-local language toggle.
  - [x] 2.1 Create or update hero component (e.g., `Hero.astro`) with semantic structure: eyebrow, H1, body, primary CTA button, secondary CTA link/button, language toggle, scroll cue (optional).
  - [x] 2.2 Integrate `hoeschathome-illustration.png` on visual side with safe area and responsive scaling; add width/height to prevent layout shift.
  - [x] 2.3 Add hero-local language toggle that swaps EN/DE strings client-side without page reload; ensure focus remains on toggle after switching.
  - [x] 2.4 Wire component into `HomePage.astro` (and `index.astro`/`en/index.astro`) with correct locale defaults (DE default, EN alternate link).
- [x] 3.0 Apply brand-aligned styling (Georgia), warm textured background, and responsive behavior for EN/DE text length.
  - [x] 3.1 Apply Georgia typography stack and spacious line-height; avoid all-caps; ensure text balance on desktop and stacked layout on mobile.
  - [x] 3.2 Add warm off-white base with muted clay/terracotta wash or subtle noise texture behind text; verify contrast for readability.
  - [x] 3.3 Adjust spacing to allow DE text expansion without truncation; verify button sizing and wrapping in both locales.
- [x] 4.0 Ensure accessibility, semantics, and performance (contrast, focus, prefers-reduced-motion, image sizing).
  - [x] 4.1 Use semantic landmarks, heading hierarchy, aria labels for toggle and CTAs; provide localized alt text.
  - [x] 4.2 Ensure keyboard focus styles, toggle operable via keyboard, and respect `prefers-reduced-motion`; keep any animation subtle.
  - [x] 4.3 Set image width/height, appropriate `loading` strategy, and lightweight JS; avoid heavy libraries.
- [x] 5.0 Wire analytics/metrics hooks for CTAs and toggle usage as outlined in PRD, and verify integration on homepage(s).
  - [x] 5.1 Add tracking hooks or data attributes for primary/secondary CTA clicks and toggle usage (by language).
  - [x] 5.2 Validate rendering and interactions on DE and EN pages; confirm alternate locale links and toggle behavior.
