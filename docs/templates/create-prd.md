# Rule: Generating a Product Requirements Document (PRD) for Static Website Elements

## Goal

To guide an AI assistant in creating a detailed Product Requirements Document (PRD) **specifically for static website elements**, written in Markdown format, based on an initial user prompt.

A PRD under this rule may describe **a single website element, section, subpage, homepage, or a standalone one-pager**. It should *not* assume ownership of an entire multi-page website unless explicitly stated.

The PRD must be clear, concrete, and actionable, enabling a **junior front-end or web developer** to implement the specified element using static technologies such as HTML, CSS, and JavaScript (with optional static site generators or build tools).

All PRDs generated under this rule **must explicitly account for multilingual support in English and German**.

---

## Scope Definition

For the purposes of this rule, a PRD may apply to:

- A single UI section (e.g., hero section, pricing table, FAQ)
- A reusable website component (e.g., header, footer, testimonial carousel)
- A single page (e.g., homepage, landing page, legal page)
- A complete one-page static website

The PRD **must not automatically expand scope** to include unrelated pages, global navigation systems, or full-site architecture unless explicitly requested by the user.

---

## Multilingual Requirement (Mandatory)

Every website element described in a PRD **must support both English (EN) and German (DE)**.

This includes, but is not limited to:

- All visible text content (headings, body text, labels, CTAs)
- Accessibility text (ARIA labels, alt text, screen reader copy)
- Form labels, placeholders, validation messages, and success/error states
- Static UI microcopy (e.g., buttons, tooltips, helper text)

The PRD must:
- Explicitly state that English and German versions are required
- Avoid hardcoding language-specific strings without a language mechanism
- Assume that translations will be provided or approved by the product owner

The PRD **does not** need to specify translation tooling or libraries unless the user explicitly asks for it.

---

## Process

1. **Receive Initial Prompt**
   The user provides a brief description of a static website element or page
   (e.g., “homepage hero section,” “pricing section,” “one-page marketing site”).

2. **Ask Clarifying Questions**
   Before writing the PRD, the AI **must** ask clarifying questions to understand:
   - Purpose of the element
   - Target audience
   - Content requirements
   - Expected behavior or interaction
   - Language nuances (e.g., tone differences between EN and DE)

   Questions must focus on **what the element should communicate and do**, not on implementation details (e.g., frameworks), unless strictly relevant.

   Questions must be presented using **numbered or lettered options** to enable concise user replies.

3. **Generate PRD**
   Using the user’s answers, generate a PRD scoped **only to the requested element or page**, including explicit bilingual requirements.

4. **Save PRD**
   Save the generated document as: ‘/tasks/[n]-prd-[element-or-page-name].md’


Where `n` is a zero-padded, four-digit sequence starting at `0001`.

---

## Clarifying Questions (Element-Focused, Multilingual)

The AI should adapt its questions to the prompt, but should typically cover the following areas:

### Purpose & Audience
- What is the primary goal of this element or page? (e.g., explain, convert, guide)
- Who is the intended audience?
- Should tone or wording differ between English and German audiences?

### Content
- What content must be included? (text, images, CTAs, links)
- Will English and German content be:
- Provided by the user
- Created later
- Translated from a single source language?

### Context & Placement
- Where does this element live?
- Standalone page
- Section within an existing page
- Reusable component across pages

### User Interaction
- Are there interactive behaviors?
- Buttons or links
- Forms
- Client-side animations or toggles
- Do any interactions include language-specific messaging?

### Visual & Brand Direction
- Is there an existing brand or style guide?
- Are there typography or layout considerations for German text length?
- Any accessibility or responsiveness requirements?

### Constraints & Non-Goals
- What should this element explicitly *not* do?
- Are there technical or content constraints (e.g., no JavaScript, no language switcher UI)?

---

## PRD Structure (Static Website Element)

The generated PRD must include the following sections:

### 1. Overview
- Brief description of the element or page
- Its purpose and intended value
- Where it fits within the broader site (if applicable)
- Explicit statement that the element is bilingual (EN / DE)

### 2. Goals
- Clear, measurable objectives specific to this element
(e.g., “Encourage newsletter signups,” “Explain pricing tiers clearly”)

### 3. Target Audience
- Description of the primary audience
- Any language-specific considerations (tone, formality, terminology)

### 4. User Stories
- Concise, element-level user stories
Example:
> As a visitor, I want to understand the value proposition in my language so that I can quickly decide whether the product is relevant to me.

### 5. Element Scope & Structure
- What is included in this PRD
- High-level structure of the element (subsections, content blocks)
- Identification of all text elements requiring EN and DE versions
- Explicit boundaries (what surrounding layout or elements are excluded)

### 6. Functional Requirements
Numbered, explicit requirements appropriate for static implementations, such as:
1. The element must render correctly on mobile, tablet, and desktop screens.
2. All visible text must be available in English and German.
3. Language-specific content must be switchable or selectable based on site language context.
4. CTA buttons must link to the specified destination URLs.
5. Any forms must submit data via a third-party service.

### 7. Non-Goals (Out of Scope)
Clearly state exclusions, such as:
- No backend logic
- No user authentication
- No dynamic server-rendered content
- No responsibility for translation quality or copywriting
- No requirement to design a global language switcher unless specified

### 8. Design & UX Considerations
- Layout and hierarchy expectations
- Accessibility requirements (e.g., semantic HTML, alt text in both languages)
- Handling of text expansion for German translations
- Performance expectations (e.g., minimal JavaScript)

### 9. Technical Considerations
- Static-only constraints (build-time rendering, client-side JS only)
- Assumptions about how language selection is determined (e.g., build-time, URL-based, config-based)
- Integration boundaries with the rest of the site

### 10. Success Metrics
- How success will be measured for this specific element
(e.g., click-through rate by language, form submissions, engagement)

### 11. Open Questions
- Any unresolved decisions or dependencies requiring clarification, especially related to language handling

---

## Target Audience for the PRD

The PRD is written for a **junior web developer** implementing a static website element.

Requirements must therefore be:

- Explicit and unambiguous
- Appropriately scoped
- Multilingual by default (English and German)
- Free of backend-specific jargon
- Focused on structure, content, and client-side behavior

---

## Final Instructions

1. Do **not** begin implementation.
2. Always ask clarifying questions before generating the PRD.
3. Scope the PRD strictly to the requested element, section, or page.
4. Ensure English and German language support is explicitly defined.
5. Incorporate the user’s answers into a refined, static-focused PRD.
6. Explicitly flag any requested functionality that violates static-site constraints.
