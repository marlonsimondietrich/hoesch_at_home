# PRD — Hero Section for Bavarian Country Getaway (EN/DE)

## 1. Overview
- Hero section for a Bavarian countryside getaway website, using the provided `src/assets/hoeschathome-illustration.png` as the primary visual anchor within a split layout that pairs the illustration with warm, textured color behind copy.
- Purpose: encourage booking inquiries while setting a calm, wabi-sabi-inspired mood aligned with the brand essence (grounded, warm, human, natural; avoids luxury or salesy tone).
- Placement: top-of-page hero on the main landing experience; assumes surrounding site chrome (header/footer) exists elsewhere.
- Bilingual: all content, CTAs, alt text, and accessibility copy must support English (EN) and German (DE), with DE as the default and a local hero-level language toggle (hero-only scope).

## 2. Goals
- Drive booking inquiries from diverse visitor types.
- Convey the retreat’s calm, lived-in Bavarian character within first viewport.
- Provide clear primary and secondary next steps suited to booking intent and exploration.
- Maintain clarity and readability for both EN and DE without crowding or truncation.

## 3. Target Audience
- Audience includes city dwellers seeking weekend escapes, international travelers, remote workers, and families.
- Tone: consistent in EN and DE; informal “du” voice in German and relaxed familiarity in English. Avoid luxury or salesy language.
- Consider slightly longer German phrasing in layout spacing.

## 4. User Stories
- As a visitor, I want to see the retreat’s essence immediately so I know if it fits my escape.
- As a visitor, I want a clear path to inquire about a stay so I can plan my visit.
- As a visitor, I want to explore more details at my own pace without feeling pushed to book.
- As a bilingual visitor, I want to switch between EN and DE without losing context.

## 5. Element Scope & Structure
- Included: hero block only—headline, supporting copy, primary CTA, secondary CTA, illustration, background texture/gradient, language toggle (EN/DE), scroll cue (optional subtle indicator).
- Excluded: global navigation, footer, booking form, site-wide language switcher, downstream pages.
- Proposed structure (left/right swap acceptable on responsive):
  - Content column: eyebrow (optional), H1, short body copy (2–3 lines), primary CTA button, secondary CTA link/button, language toggle, scroll cue.
  - Visual column: `hoeschathome-illustration.png` framed with soft, warm background wash/texture; ensure responsive scaling, generous white space, and safe area.
- All textual elements require EN and DE strings; default render DE.

## 6. Functional Requirements
1. Render responsively on mobile, tablet, and desktop; maintain readable typography (Georgia per brand guide).
2. Provide bilingual content: all visible text, alt text, aria labels available in EN and DE; DE loads by default.
3. Include a local language toggle within the hero to switch content (headline, body, CTA labels, alt text) between EN and DE without page reload; must be keyboard/screen-reader accessible and persist focus after toggle.
4. Primary CTA: booking-oriented (e.g., “Buchungsanfrage starten” / “Start booking inquiry”) linking to booking/inquiry destination (URL configurable).
5. Secondary CTA: lower-emphasis exploration (e.g., “Mehr erfahren” / “Learn more”) linking to a details/rooms section anchor.
6. Use `hoeschathome-illustration.png` as the hero’s main image with appropriate alt text in both languages; ensure image is optimized and retains aspect ratio.
7. Apply a subtle textured/gradient background on the text side to convey warmth without high contrast; ensure sufficient contrast for accessibility (WCAG AA).
8. Provide semantic HTML structure (landmark, heading hierarchy, buttons/links), focus states, and ARIA labels for the language toggle and CTAs.
9. Avoid motion that feels flashy; if animation is used (e.g., gentle fade-in), keep it subtle and accessible (respect `prefers-reduced-motion`).
10. Performance: no heavy libraries; defer non-essential JS; ensure hero loads gracefully on slower connections; image should have width/height attributes to prevent layout shift.

## 7. Non-Goals (Out of Scope)
- No backend booking logic or form submission handling.
- No global site language switcher; only the hero-local toggle behavior.
- No responsibility for translation authoring quality beyond provided copy.
- No carousel/slider behavior for the illustration.
- No SEO schema or analytics wiring beyond basic attributes.

## 8. Design & UX Considerations
- Typography: use Georgia stack as primary for headlines and body (per brand style). Keep sizes generous but calm; avoid all-caps; line-height roomy to reflect “quiet, lived-in” feel.
- Layout: split layout with cozy texture/gradient behind text column; maintain breathing room. On mobile, stack with text above image; ensure padding keeps copy readable over texture.
- Tone: invitational, not salesy; avoid luxury clichés. Emphasize authenticity and calm.
- Buttons: primary has clear contrast and solid fill; secondary uses outline/ghost to stay subtle.
- Imagery: hero illustration anchored with soft edges; avoid hard drop shadows; ensure it reads well on light textured background. Respect safe area so key details are visible on mobile.
- Accessibility: color contrast AA; keyboard focus ring visible; alt text localized; toggle labeled (e.g., “Sprache wechseln” / “Switch language”).
- Text expansion: allow extra line height and spacing for DE copy; avoid truncation.
- Suggested background direction (refine as needed): warm off-white base with muted clay/terracotta wash; subtle noise/texture acceptable if it preserves text contrast.
- Optional microcopy examples (to be confirmed):
  - Eyebrow: DE “Zwischen Stadt und Alpen” / EN “Between city and Alps”
  - Headline: DE “Ein geerdeter Rückzugsort in Oberbayern” / EN “A grounded retreat in Upper Bavaria”
  - Body: DE 2–3 short lines describing calm, lived-in home; EN mirror tone.
  - Alt text: DE “Illustration eines bayerischen Landhauses in ruhiger Umgebung” / EN “Illustration of a Bavarian country home in a calm setting”

## 9. Technical Considerations
- Static implementation; language toggle can swap text via client-side data attributes or a simple state hook. No server round trips required; ensure copy is bundled for both languages.
- Language default: DE; store selection locally (optional) or use page-level context if available. If local storage is used, guard for availability and provide sane fallback.
- Asset usage: `src/assets/hoeschathome-illustration.png` served via existing asset pipeline; ensure responsive sizes and `loading="lazy"` when not in initial viewport (if above-the-fold, `loading="eager"` is acceptable).
- Assume site-level stylesheets available; hero-specific styles should be scoped to avoid bleed.
- If using a static site generator, ensure build-time availability of both EN/DE strings.
- Recommended content structure: simple JSON or object map of EN/DE strings keyed by element (eyebrow, headline, body, ctaPrimary, ctaSecondary, alt, ariaToggle).
- Safe defaults when JS fails: render DE copy statically with hidden toggle or non-functional toggle that still presents default language.

## 10. Success Metrics
- Primary CTA click-through rate (CTR) by language.
- Secondary CTA engagement (scroll or click) by language.
- Time to first paint / hero LCP for the illustration within performance budget.
- Toggle usage rate (EN ↔ DE) and post-toggle CTA engagement.
- Drop-off from hero to next section (scroll depth) segmented by language if available.

## 11. Open Questions
- Exact copy for EN and DE (headline, body, CTA labels, alt text)—will product owner provide, or should provided examples be used as initial draft?
- Destination URLs/anchors for primary and secondary CTAs?
- Preferred background treatment specifics (color stops/texture asset) beyond “warm, textured/gradient”? Any existing texture asset to reuse?
- Should language selection persist beyond hero (site-wide) or remain hero-local only? If site-wide, how should it integrate with any existing language context?
