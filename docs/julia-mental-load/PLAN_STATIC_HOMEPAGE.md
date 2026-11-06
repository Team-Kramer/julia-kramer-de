# Julia Kramer — Static Homepage Implementation Plan (julia-kramer.de)

**Updated:** 2026-11-06  
**Owner:** Product (Martin Kramer) + implementation agent  
**Overall status:** Implementation in progress — static site, blog pipeline, SEO basics, and client-side check are built and verified; editorial/legal approvals and deployment remain open
**Scope:** Public, non-commercial Mental Load Labor homepage and client-side tools. A future SaaS/API is explicitly out of scope.

## Objective

Turn **julia-kramer.de** into the **Mental Load Labor**: a calm, useful, non-commercial public site that makes Julia's systems-based thinking tangible. It should earn trust and authority with people carrying a high mental load, help them see their situation without blame, and let them discover relevant articles and tools without being pushed into a sales funnel.

The first tool is the **Mental-Load-Check**, a five-minute, 15-question reflection with a client-side summary across organizational, emotional, and anticipatory load. It is not a diagnosis, scorecard, or measure of a person's worth. The existing question catalog is the content source for v1.

**Positioning:** “Mental Load reduzieren – mit System statt Schuldgefühlen.” The site presents an open laboratory: practical tools, honest models, and small experiments for making invisible work visible and more manageable.

**Strategic path:** useful public tools → trust and repeat visits → an unobtrusive invitation to optional human support → possible future SaaS planner. Nothing in v1 should require an account, collect individual answers, or depend on a server.

### Hard constraints

1. **Non-commercial first:** no aggressive sales funnel, lead gate, scarcity messaging, or purchase flow.
2. **Static and privacy-preserving:** pages are statically generated; the Mental-Load-Check runs in the browser. Do not send answers to a server or analytics service.
3. **No diagnosis or ranking:** describe patterns neutrally; avoid labels such as “overloaded” as an automated verdict, percentages that imply clinical precision, and gamification.
4. **Future-compatible, not prematurely built:** keep tool definitions and scoring separate from UI so they can later be reused behind an API, but do not add API infrastructure now.
5. **Design source of truth:** follow [`design.md`](./design.md): warm cream, petrol/teal, sparing terracotta, clear typography, ample whitespace, adult and non-coaching tone.
6. **German v1:** public copy, navigation, tool content, metadata, and legal pages are German.

## Source discipline

| Source | Role |
|---|---|
| This plan and the supplied Mental Load Labor brief | Product intent, information architecture, non-commercial boundary, tool roadmap, and expected visitor experience |
| [`design.md`](./design.md) | Binding visual and interaction direction: colors, typography, spacing, components, and restrained motion |
| [`00-Mental-Load-Check-Fragen.md`](./00-Mental-Load-Check-Fragen.md) | Existing v1 questionnaire, dimensions, example reflection copy, result structure, and client-side/privacy requirements |
| Existing `julia-kramer-de` repository | Current custom domain and static homepage baseline; preserve domain configuration and selectively reuse suitable assets/content |
| `felix-kramer-saas/PLAN_STATIC_HOMEPAGE.md` and `hannah-kramer-saas/PLAN_STATIC_HOMEPAGE.md` | Structure and implementation-planning references only; Julia's product, tone, and design remain distinct |

**Precedence:** privacy and non-diagnostic language > non-commercial user experience > this product brief > `design.md` > implementation convenience. If a design or conversion choice conflicts with these boundaries, keep the tool useful and the choice unobtrusive.

## Status

| Phase | Status | Notes |
|---|---|---|
| 0. Decisions | In progress | GitHub Pages is confirmed as the host; legal contact/provider facts and editorial approvals remain open |
| 1. Static foundation and design tokens | Complete | App, tokens, prerendering, CNAME output, and validation CI are in place; deployment remains intentionally unchanged |
| 2. Tool model and scoring | Complete | Versioned question data, guarded scoring, and unit tests implemented |
| 3. Shared UI and navigation | In progress | Shared responsive shell and accessible controls implemented; manual assistive-technology review remains |
| 4. Core pages and tool discovery | In progress | Core routes, route metadata, and legal working drafts are built; editorial and legal review remain |
| 5. Mental-Load-Check | In progress | Client-side flow passes end-to-end browser checks; manual accessibility and device QA remain |
| 6. Denklabor and editorial foundation | In progress | Validated Markdown pipeline, static article routes, and category filters are implemented; article approval remains |
| 7. Quality, legal, SEO, and launch | In progress | Build, route smoke tests, sitemap, robots, and hosting research are complete; legal, accessibility, and release gates remain |

## Current state

- The target repository is `/Users/kram030/git/julia-kramer-de`, on branch `feature/mental-load`, with origin `Team-Kramer/julia-kramer-de`.
- The original root-level Solo export (`index.html`, `assets/`, `images/`, `img/`) is still preserved and untouched. It is not copied into the SvelteKit build output.
- A SvelteKit + TypeScript + Tailwind v4 static app now lives in the repository root. All implemented routes prerender, and `static/CNAME` carries `julia-kramer.de` into `build/`.
- The existing prototype under `docs/julia-mental-load/src/` remains untouched. The production app implementation is in the root `src/`; decide later whether the docs prototype should be archived or removed after review.
- `docs/julia-mental-load/design.md` and `00-Mental-Load-Check-Fragen.md` remain the product/design source of truth. Existing photos were not reused because their rights and fit have not been verified.
- GitHub Pages is confirmed as the host, configured for the legacy build from `main` at `/`, with `julia-kramer.de` and HTTPS enforcement. A validation-only GitHub Actions workflow was added; deployment configuration was deliberately not changed.
- Local verification passes: `pnpm check` (0 errors/warnings), 11 unit tests, `pnpm build`, and production-preview checks for all 9 prerendered HTML routes, the sitemap, robots file, `CNAME`, and the 404 response. Browser checks cover category filtering and completing/restarting the check.
- About Julia now draws on the existing master profile. Impressum and Datenschutz are researched working drafts using Martin's supplied address, remain `noindex`, and are not publishable until the unresolved provider/contact and hosting details are confirmed.

## Feature inventory

### A. Foundations and visual system (Phase 1)

- [x] SvelteKit static site using the `adapter-static` deployment model proposed in `design.md`.
- [x] German document language, route-level metadata, custom-domain `CNAME`, favicon, and canonical URLs on primary content pages.
- [x] CSS variables from `design.md`, including color, typography, spacing, and radii; no second competing token system.
- [x] Responsive page container, typography, buttons, cards, links, forms, and visible focus states.
- [x] Reduced-motion behavior; motion is decorative and never required to understand or use a tool.
- [x] No heavy animation or UI dependency was added.

### B. Mental-Load-Check (Phases 2 and 5)

- [x] 15 authored statements from the existing question catalog, grouped into three dimensions:
  - Organizational load (questions 1–5)
  - Emotional load (questions 6–10)
  - Anticipatory load (questions 11–15)
- [x] Consistent 1–5 response scale with clear, keyboard-operable controls and visible selected state.
- [x] Welcome/introduction that states this is reflection, not a test or diagnosis.
- [x] Progress indication that communicates remaining questions without pressure or gamification.
- [x] User can move backward and change answers before viewing results.
- [x] Per-dimension averages calculated in the browser; incomplete answers are rejected, not treated as low scores.
- [x] Results use plain-language observations, not an overall “overload score,” ranking, or clinical category.
- [x] Next-step suggestion links to a relevant article and clearly states that the Weeks Load Distributor is in preparation.
- [x] Restart/reset action; no account, answer submission, tracking, or persistence.
- [x] Tool definition and scoring are versioned and separated from presentation for future API reuse.

### C. Tool roadmap (Phase 4 and follow-up)

| Tool | Purpose | v1 status |
|---|---|---|
| Mental-Load-Check | Five-minute reflection that makes three kinds of load visible | **Build first** |
| Weeks Load Distributor | Make responsibilities and ownership visible across a week | Directory teaser; implement after the check |
| Decision Filter | Explore whether a decision needs to be carried or made now | Directory teaser |
| Energy Day Log | Notice energy patterns without judging productivity | Directory teaser |
| “No” Phrasing Helper | Offer practical, adaptable wording for boundaries | Directory teaser |

Teasers must identify planned tools as planned; do not present non-functional cards as working tools. Each later tool should have its own small scope, consent/privacy decision, accessible interaction, and reusable data contract before implementation.

### D. Pages and editorial content (Phases 4 and 6)

- [x] `/` — Labor home: clear hero, approach, tool/article entry points, and a quiet optional support link.
- [x] `/werkzeuge` — directory with short descriptions and explicit availability states.
- [x] `/werkzeuge/mental-load-check` — welcome, questionnaire, results, and restart states.
- [ ] `/blog` — Denklabor index with all planned categories: Mental Load, Systeme, Paare, Unsichtbare Arbeit, Entscheidungen.
- [x] One initial `/blog/[slug]` article is statically rendered with long-form typography and a relevant tool link; a general content pipeline remains.
- [x] `/ueber` — approach and motivation; systems over motivation, clarity over optimization. Approved biographical details remain to be added.
- [x] `/begleitung` — calm description of optional support; it does not pretend a contact or booking flow is available.
- [ ] `/impressum` and `/datenschutz` routes exist as non-publishable placeholders; complete and review legal copy before launch.
- [x] Shared header/navigation and footer, with current-page state in the main navigation.

### E. Experience principles

- [ ] “Visibility before evaluation”: help the visitor notice work and patterns, without blaming a person or partner.
- [ ] No “5 tips to fix your chaos,” stock coaching language, urgency, gamified scores, or manipulative conversion patterns.
- [ ] The primary CTA starts a useful tool; support and future SaaS mentions remain secondary.
- [ ] Every tool works without registration and is usable on small touch screens.
- [ ] Use progressive disclosure; keep one question or decision understandable at a time.
- [ ] Respect visitors who do not want to share sensitive reflections; results remain on their device and can be discarded immediately.

## Phase 0 — Decisions

Resolve these before committing to the site rewrite. Recommendations are defaults, not claims that the decisions have already been approved.

### D1 — Platform and deployment

**Implementation choice:** SvelteKit + Tailwind v4 + `adapter-static`, matching `design.md`, with the existing custom domain preserved. The app builds to `build/`; no deployment workflow or hosting-setting change has been made until the active Pages configuration is confirmed.

| Option | Description | Trade-off |
|---|---|---|
| (a) SvelteKit static site (recommended) | Matches the design document and supports structured routes/content | Replaces the existing Solo export and introduces a build toolchain |
| (b) Extend the current HTML export | Minimal platform change | Becomes harder to maintain as the check and blog grow; conflicts with the documented technical direction |

**Owner:** Product / Frontend. **Status:** ✅ Implementation choice made; deployment host pending.

### D2 — Preserve or replace current homepage

**Implementation choice:** Build the Labor site as a separate SvelteKit static output and preserve the root-level Solo export as a rollback until the new deployment and content migration are reviewed. Keep `CNAME`; reuse no legacy media until rights and fit are confirmed.

**Owner:** Product / Content. **Status:** ✅ Preservation approach chosen; migration/launch approval pending.

### D3 — Contact, newsletter, and lead capture

**Recommendation:** v1 has no newsletter signup, answer email feature, or lead gate. The Begleitung page may offer a simple contact link only after the destination and privacy notice are confirmed. Keep the optional “save/send result” feature out of v1.

**Owner:** Product. **Status:** ✅ Resolved for v1 — no signup, newsletter, answer sharing, or booking/contact flow.

### D4 — Interpretation of check results

**Implementation choice:** show one average per dimension with contextual, non-evaluative copy. Do not apply high/mid/low labels or score thresholds in v1. The check is not a validated measure or diagnosis; final copy still needs Julia's review.

**Owner:** Product / Content. **Status:** ✅ Non-classifying scoring implemented; content review pending.

### D5 — Blog authoring

**Recommendation:** store articles as local Markdown/content files and prerender them. No CMS is needed for v1. Confirm ownership and editorial cadence before writing placeholder articles as if they were published content.

**Owner:** Content / Frontend. **Status:** ⬜ Open — initial article is a static route; a reusable Markdown pipeline is not built.

### D6 — Existing media and brand assets

**Recommendation:** inventory the current image assets, confirm usage rights and relevance, and prefer no image over an unrelated or unlicensed stock photo. Use `design.md` tokens as the primary visual identity; avoid importing assets or effects from the other family sites without an explicit decision.

**Owner:** Design / Product. **Status:** ⬜ Open — legacy media has not been reused; rights inventory is still needed before selecting any asset.

## Phase 1 — Static foundation and design tokens
*Depends on: D1 and D2.*

### 1a. Repository scaffold

- [x] Initialize the agreed SvelteKit, TypeScript, Tailwind v4, and static adapter setup in the existing repository.
- [x] Preserve the current `CNAME` in the generated static output and retain the root-level export until the replacement is verified.
- [x] Configure prerendered routes, German base metadata, favicon, and canonical origin `https://julia-kramer.de/` for primary content pages.
- [x] Add package scripts for development, type checking, tests, and production build, following the selected tooling's conventions. Formatter/linter remain undecided.
- [x] Add CI validation for pull requests and feature-branch pushes; deployment remains gated until the live Pages source can be intentionally migrated.
- [x] Document local setup and the current static-output/rollback approach in `README.md`.

### 1b. Design system implementation

- [x] Translate `design.md` tokens into CSS custom properties with semantic names.
- [x] Implement shared typography, content widths, spacing, borders, button variants, card patterns, and links.
- [x] Use Inter/system sans for interface text and Source Serif 4/Georgia for editorial emphasis, with local system fallbacks and no third-party font request.
- [x] Provide visible focus indicators, semantic landmarks, and touch-sized controls. A full contrast/accessibility audit remains in Phase 7.
- [x] Implement responsive header/footer and navigation; keyboard and touch use do not depend on hover.
- [x] Honor `prefers-reduced-motion`; no scroll-triggered reveal is required.

**Done when:** the app builds as static output, retains the custom domain file, and the shared shell matches the visual direction at mobile and desktop widths.

## Phase 2 — Tool data model and scoring
*Depends on: D4. Can proceed alongside the basic design-system work.*

- [x] Define a typed, versioned questionnaire data shape with stable question IDs, question text, dimension, response scale, and content version.
- [x] Port the 15 questions from `00-Mental-Load-Check-Fragen.md` without changing meaning; any wording edits require content review.
- [x] Keep calculation functions pure and UI-independent: validate complete responses, calculate one average per dimension, and return a typed result model.
- [x] Reject incomplete response sets; never treat missing answers as zero.
- [x] Return contextual dimension copy without score-dependent high/mid/low classifications.
- [x] Do not imply diagnostic or scientific validity.
- [x] Add unit tests for averages, dimension order, missing/duplicate/unknown answers, invalid scale values, and non-classifying copy.
- [x] Do not add a network client, storage service, analytics event, or backend API in v1.

**Done when:** the tool model can be tested independently of Svelte components and its output contains only the intended dimension summaries and copy keys.

## Phase 3 — Shared UI and navigation
*Depends on: Phase 1. Parallel to Phase 2.*

- [x] Build reusable header/navigation, footer, page container, section heading, card, button/link, status label, and callout patterns.
- [x] Build accessible form controls for the five-point response scale, with a persistent question label and programmatically exposed selected state.
- [ ] Add shared empty/error/completion states that use plain German language and keep a clear path forward.
- [ ] Add tests for navigation links, current-page indication, keyboard operation, and responsive menu interaction.
- [x] Avoid a general component framework or elaborate animation layer; add components only for repeated patterns in this site.

**Done when:** shared site chrome and tool controls are accessible, responsive, and covered by focused component checks.

## Phase 4 — Core pages and tool discovery
*Depends on: Phases 1 and 3. Tool directory can be built before the interactive check is complete.*

- [x] Build `/` with the hero headline **“Mental Load reduzieren – mit System statt Schuldgefühlen”**, a short approach, tool/article entry points, and a low-pressure support link.
- [x] Build `/werkzeuge` with the Mental-Load-Check first and an accurate status for each planned tool.
- [x] Build `/ueber` around the approach and principles “Systeme > Motivation” and “Klarheit > Optimierung”, using details from the existing master profile; Julia's final editorial approval remains.
- [x] Build `/begleitung` as a brief, factual, non-sales invitation; no pricing, urgency, booking, or unsupported outcomes.
- [x] Add unique page titles/descriptions and social preview metadata to public routes; legal drafts are explicitly `noindex`.
- [x] Add static Impressum and Datenschutz working drafts based on official sources. Their publication remains blocked until provider, contact, and data-processing facts are confirmed.

**Done when:** all core pages prerender, navigation is coherent, and the visitor can reach the first working tool from home and the tool directory.

## Phase 5 — Mental-Load-Check
*Depends on: Phases 2–4.*

### 5a. Flow

- [x] Welcome screen uses the approved text: the check is not a test or evaluation and has no right or wrong answers.
- [x] Present the 15 questions in a calm sequence with a 1–5 scale, readable labels, and clear progress.
- [x] Allow back navigation and answer changes; all answers stay in the current in-memory session.
- [x] Validate that every required answer exists before calculating results; keep progression disabled and explain the required answer inline.
- [x] Calculate results client-side and show three clearly named dimensions with values/visual indicators and nonjudgmental explanatory copy.
- [x] Include the closing idea from the draft: “Mental Load ist keine Charaktereigenschaft. Er ist verteilt – oder eben nicht.”
- [x] Offer a restart action that clears answers and results from application memory.
- [x] Link to a relevant article and clearly label the Weeks Load Distributor as in preparation.

### 5b. Accessibility and privacy

- [x] Group each response scale semantically using fieldset and legend.
- [ ] Ensure full keyboard interaction, visible focus, screen-reader announcements for question/progress/result changes, and no color-only meaning. Native radio controls, progress announcements, and focus on step/result changes are in place; manual assistive-technology review remains.
- [ ] Test at narrow mobile widths, browser zoom, and with reduced motion enabled.
- [x] Keep responses in memory only for v1; do not write to local storage, cookies, URL parameters, logs, or analytics.
- [x] Make privacy explicit near the start of the check: answers stay in this browser and are not sent to Julia.
- [x] Avoid language that diagnoses, guarantees relief, or treats the averages as validated clinical measurement.

**Done when:** a visitor can complete, review, understand, and restart the check using touch, keyboard, and a screen reader, while network inspection confirms that answers are not transmitted.

## Phase 6 — Denklabor and editorial foundation
*Depends on: Phase 1; can proceed in parallel with Phases 4–5.*

- [x] Implement a minimal Markdown/content pipeline that prerenders the blog index and individual posts.
- [x] Add frontmatter validation for title, slug, date, description, category, and optional social image.
- [x] Implement categories: Mental Load, Systeme, Paare, Unsichtbare Arbeit, Entscheidungen.
- [ ] Review and approve the initial substantive article before publishing; do not add filler or “5 tips” listicles.
- [x] The initial article offers a clear model and ends with a subtle link to the relevant tool.
- [x] Add publication date and reusable metadata to the article; long-form typography, reading width, and heading hierarchy are in place.
- [x] Keep newsletter capture out of scope for v1.

**Done when:** articles are statically rendered, discoverable by category, and each has a relevant, non-pushy next step.

## Phase 7 — Quality, legal, SEO, and launch
*Depends on: Phases 1–6.*

### 7a. Accessibility

- [ ] Run automated accessibility checks on each route and the check flow.
- [ ] Manually test keyboard-only navigation, focus visibility, labels/errors, heading order, contrast, zoom, and reduced motion.
- [ ] Ensure status text and result indicators remain understandable without color.

### 7b. Privacy and legal

- [x] Confirm the hosting platform and available documentation about request logs and third-party resources; the privacy draft describes known behavior and flags unverified retention/transfer terms.
- [x] Ensure the questionnaire makes no external requests containing answer data.
- [ ] Do not add analytics, cookies, external form processors, or newsletter providers without an explicit decision, consent review where applicable, and matching disclosures.
- [ ] Verify Impressum and Datenschutz reflect the live site and current contact/hosting details before release.

### 7c. SEO and discoverability

- [x] German locale and meaningful page titles/descriptions; no duplicate titles or missing canonical URLs.
- [x] Open Graph metadata with an approved image or a safe text-only fallback.
- [x] Generate a sitemap and robots file for public static routes.
- [ ] Add structured data only where accurate (for example, `Person` and `Article`); do not add product or medical claims.
- [x] Verify internal links, custom domain output, HTTPS configuration, sitemap/robots, and not-found behavior in the production preview; live deployment remains pending.

### 7d. Performance and deployment

- [x] Production build and static preview succeed; clean-install verification remains.
- [ ] Avoid shipping unused legacy assets or large dependencies; optimize any approved images.
- [ ] Check mobile and desktop rendering, largest-contentful paint, layout stability, and the check's initial interaction readiness.
- [ ] Deploy to a preview/staging target first if the host supports it; confirm the custom domain and `CNAME` survive deployment.
- [ ] Verify the production site and all routes after deployment; retain a rollback copy of the previous static export until acceptance.

### 7e. Content and tone review

- [ ] Review all visible text for calm, adult, clear, nonjudgmental German. The current copy follows that direction but still needs Julia's editorial approval.
- [ ] Remove unsupported promises, coach clichés, pressure tactics, and ambiguous “high load” verdicts.
- [ ] Ask a representative user to find and complete the check without explanation, then review comprehension and emotional tone.

**Done when:** production checks pass, privacy and legal copy match actual behavior, the custom domain works, and the site remains useful without any paid service.

## Quality and embedding strategy

- **Static-first:** home, tool directory, About, Begleitung, articles, and legal content are prerendered. The check is browser-only.
- **Reusable tool core:** versioned question content and pure scoring logic are independent of components; a future API may adopt the contract without changing v1 behavior.
- **No premature API:** the existence of future SaaS plans does not justify adding a server, account system, database, or network calls now.
- **No automatic persistence:** avoid storing sensitive answers. A later save/share feature requires a separate product and privacy decision.
- **Content remains portable:** article and tool definitions live in repository-owned files rather than a proprietary CMS.

## Open decisions

| ID | Decision | Recommendation | Status |
|---|---|---|---|
| D1 | Confirm static deployment host and Pages source | GitHub Pages, legacy `main` root source, custom domain, and HTTPS are confirmed; keep deployment unchanged until migration is approved | Resolved |
| D2 | Choose replacement/migration scope for the existing Solo export | New output is separate; keep old export until reviewed and verified | In progress |
| D3 | Decide whether v1 has contact, newsletter, or result-sharing | No signup, newsletter, answer sharing, or booking/contact flow in v1 | Resolved for prototype |
| D4 | Approve result interpretation and copy | Averages plus contextual descriptions only; no thresholds or diagnosis | Review pending |
| D5 | Select and approve launch articles | One article draft exists in the Markdown pipeline; Julia's editorial approval is still needed | Review pending |
| D6 | Approve reuse of existing text, photos, and media | No legacy assets used; confirm rights before migration | Open |

## File change summary

### Existing repository `/Users/kram030/git/julia-kramer-de` — modify

- Root `src/`, `static/`, package/config files, and `README.md` — new SvelteKit static implementation.
- `index.html`, `assets/`, `images/`, `img/` — existing export retained as rollback; selectively migrate only after inventory and deployment verification.
- `CNAME` — retained in root and copied to `static/CNAME` for generated output.
- `docs/julia-mental-load/design.md` — source of truth; edit only if an explicit design decision changes it.
- `docs/julia-mental-load/00-Mental-Load-Check-Fragen.md` — content source; edit only after review, keeping the questionnaire and implementation aligned.
- `docs/julia-mental-load/src/` — pre-existing prototype preserved; root app currently contains the buildable implementation. Decide whether to consolidate after review.

### Implemented and pending additions

- Implemented: SvelteKit/Tailwind project configuration, prerendered routes, shared shell, tool directory, Markdown article pipeline, sitemap/robots, social metadata, validation workflow, and static `CNAME`.
- Implemented: versioned questionnaire content, pure scoring module, and scoring tests.
- Pending: legal fact confirmation and review, article/bio approval, full accessibility/device review, clean-install verification, Pages migration/release decision, and production verification.

## Reference map

| Reference | Use |
|---|---|
| [`design.md`](./design.md) | Binding brand and technical foundation |
| [`00-Mental-Load-Check-Fragen.md`](./00-Mental-Load-Check-Fragen.md) | Mental-Load-Check v1 question and result content |
| `felix-kramer-saas/PLAN_STATIC_HOMEPAGE.md` | Static-site planning structure and implementation discipline |
| `hannah-kramer-saas/PLAN_STATIC_HOMEPAGE.md` | Static-site planning structure and phased delivery precedent |
| Existing `julia-kramer-de/index.html` and assets | Migration inventory; not the source of truth for the new product direction |

## Test inventory

| Area | Verification |
|---|---|
| Static build | `pnpm check` (0 errors/warnings), 11 unit tests, `pnpm build`, and local preview smoke tests passed; clean install remains |
| Questionnaire | Averages, dimension order, missing/duplicate/unknown answers, invalid scale values, non-classifying copy tested |
| Components | Type/a11y diagnostics pass; manual keyboard, screen-reader, focus, and responsive checks remain |
| Routes/content | All 9 prerendered HTML routes, sitemap, robots, and `CNAME` return HTTP 200; unknown routes return 404; editorial approval remains |
| Privacy | Browser flow and source confirm no answer submission or persistence; hosting docs were researched, but log retention/transfer details remain unverified |
| Accessibility | Automated scan plus keyboard, screen-reader, zoom, contrast, and reduced-motion review |
| Deployment | `CNAME`, HTTPS, custom domain, all routes, not-found handling, sitemap/robots |

## Success criteria

- [x] julia-kramer.de presents a clear, calm Mental Load Labor identity aligned with `design.md`.
- [x] Visitors can find the tools, Denklabor, About, and optional support without a sales funnel.
- [ ] The 15-question check works end-to-end on mobile and desktop, computes three understandable summaries, and can be restarted.
- [x] No answers are submitted or persisted by the site in v1; the privacy explanation matches the implementation.
- [x] The site statically builds and preserves the custom domain in its output; live deployment remains pending.
- [x] Blog and tool content are structured for future reuse without building SaaS/API infrastructure now.
- [ ] Accessibility, legal, privacy, SEO, and production deployment checks are complete before launch.
