## Relevant Files

- `src/components/HomePage.astro` - Hero section markup and effect placement behind hero content.
- `src/pages/index.astro` - German home entry that renders `HomePage`.
- `src/pages/en/index.astro` - English home entry that renders `HomePage`.
- `src/components/HeroSparks.astro` - Client-only wrapper and canvas mount for the sparks effect.
- `src/scripts/heroSparks.ts` - Canvas animation, pointer drag, and spark configuration logic.
- `src/styles/global.css` - Hero layout and background layering styles.

### Notes

- There is no existing Jest setup in this repo; testing may be manual unless a test runner is introduced.

## Tasks

- [x] 1.0 Assess current home hero layout and determine the best integration point for a hero-only background effect.
  - [x] 1.1 Review `HomePage.astro` hero structure and decide where the effect should sit in the stacking context.
  - [x] 1.2 Confirm which container defines the hero area and how to clip the effect to it.
  - [x] 1.3 Decide on canvas vs. DOM-based rendering based on current site constraints and performance needs.
- [x] 2.0 Design and scaffold a dedicated HeroSparks component with configurable visual and motion parameters.
  - [x] 2.1 Create `HeroSparks.astro` with a hero-background wrapper and a client-only mount target.
  - [x] 2.2 Define a config object for particle count and at least two tunable properties for glow and sharp sparks.
  - [x] 2.3 Add CSS/utility classes to position the effect behind hero content and preserve legibility.
- [x] 3.0 Implement client-side animation logic for multi-layered orbiting sparks with pointer drag/inertia and pointer-device gating.
  - [x] 3.1 Build `heroSparks.ts` to initialize the renderer and manage lifecycle.
  - [x] 3.2 Implement pointer tracking with a target position and inertia/drag following behavior.
  - [x] 3.3 Render multi-layer circular orbits with mixed glow/sharp sparks per config.
  - [x] 3.4 Gate the effect to pointer-capable devices and handle cleanup on unmount.
- [x] 4.0 Integrate the effect into the home hero section in both locales, ensuring it renders only on the home page.
  - [x] 4.1 Import and render `HeroSparks` in `HomePage.astro`.
  - [x] 4.2 Ensure the effect is scoped to `src/pages/index.astro` and `src/pages/en/index.astro` only.
  - [x] 4.3 Verify the effect is clipped to the hero area and does not affect layout flow.
- [x] 5.0 Tune performance and visuals (particle count, glow/sharp properties, orbit speed/drag) to meet the FPS target.
  - [x] 5.1 Set initial default values for particle density and spark styling.
  - [x] 5.2 Adjust orbit speed/drag to achieve a snappy follow with noticeable drag.
  - [x] 5.3 Validate smoothness visually and reduce complexity if FPS drops below target.
