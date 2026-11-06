# Julia Kramer — Mental Load Labor

The public, German-language site for julia-kramer.de. It is built with SvelteKit and prerendered as a static site; the Mental-Load-Check runs entirely in the visitor's browser.

## Development

Requirements: Node.js 22+ and pnpm 10+.

```sh
pnpm install
pnpm dev
```

## Validation and build

```sh
pnpm check
pnpm test
pnpm build
pnpm preview
```

The static output is written to `build/`. `static/CNAME` preserves the custom domain in that output. The previous root-level Solo export is intentionally retained until the Pages deployment source is switched and the new site is verified.

## Mental-Load-Check

Question text and dimension IDs live in `src/lib/mental-load/questions.ts`; `scoring.ts` contains the pure, versioned client-side calculation. Answers are held in memory only. They are not submitted, persisted, or sent to analytics.

The existing content draft and design source remain in `docs/julia-mental-load/`. Keep those references aligned when reviewing questionnaire wording or visual decisions.
