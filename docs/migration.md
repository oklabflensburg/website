# Repository analysis and migration

## Baseline

The starting branch `feat/nuxt4-contributor-website` already used Nuxt 4, Vue 3, Tailwind 4 and Nuxt i18n. It contained a large homepage plus a contributor route, a hard-coded project array, UI translations holding project descriptions, and automatic GitHub member/contributor collection. Parcel HTML/JavaScript/CSS remained in `src/` and was publicly served under `/legacy/`. `static/index.html` supplied a second entry point. Old lint configuration and a Lighthouse workflow against a deployed domain remained alongside the Nuxt CI.

## Migration plan

1. Retain verified content and reusable licensed brand/map assets; identify unknown legal details.
2. Replace the onepager with a common Nuxt app shell and routed project, blog and editorial pages.
3. Move project and editorial text to Nuxt Content, use DE without a prefix and DA/EN with prefixes, and centralise organisation details.
4. Remove the Parcel implementation, old content arrays, automatic people collection, superseded components, styles, assets and tooling.
5. Add SSR metadata, feeds, tests, CI and author documentation.
6. Validate production and mobile/desktop behaviour, perform the final audit, commit and open the review PR.

## Content decisions and provenance

- The [Code for Germany lab profile](https://codefor.de/flensburg/) provides lab context and the confirmed weekly venue. Text was reorganised, not its HTML/CSS/templates.
- Project Markdown records its individual source URL. Adapted descriptions are attributed to Code for Germany under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- [kulturbytes](https://codefor.de/projekte/fl-kulturbytes/) is a cultural listings platform; the previous array wrongly associated it with the completed Kulturnacht map. These now have distinct records and destinations.
- [Open City Planner](https://github.com/oklabflensburg/open-city-planner) is confirmed by its public repository; no usage metrics are claimed.
- The Open Data Day entry is treated as an event initiative, not an application project. The undated reference is linked from documentation; no future date was inferred.
- Logos and used map previews came from this repository. Retained brand assets retain their existing provenance; third-party marks are not relicensed by the site's code licence. Manrope retains `OFL.txt`.
- Newly written introductory blog posts and proposed conduct text are identified in the editorial checklist.

## Removed legacy code

- **Components:** `AboutLabSection`, `ContributorCard`, `ContributorsSection`, `FeaturedProject`, `HeroSection`, `OpenTasksSection`, `ProjectGrid`, `TechnologyPaths`, `VolunteerSection`. Header, footer, language switcher, meeting and project card were replaced in their existing canonical paths.
- **Pages:** `app/pages/contributors.vue`; Parcel `src/index.html`, `src/impressum.html`, `src/lizenz.html`; `static/index.html`. The old homepage was replaced in place.
- **Styles:** old `app/assets/css/main.css` implementation and palette; `src/main.css`. One replacement Tailwind stylesheet remains.
- **Scripts/data:** `src/main.js`, `src/imprint.js`, `src/env.js`, `app/data/projects.ts`, `app/data/contributors.json`, `app/types/content.ts`, `scripts/update-contributors.ts`, `scripts/contributor-utils.ts`, `scripts/validate-generated.mjs`, `contributors.config.json`.
- **Dependencies:** `@nuxt/icon` and `tsx`; no UI framework was present. SQLite uses Node's built-in driver, with no extra native package.
- **Configuration:** Parcel public-assets mapping, static root redirect file and generation route list; old SEO composable; obsolete ESLint, HTMLHint, Stylelint and Prettier files; contributor-token `.env.example`; old gitignore entries and generated report page.
- **Workflows:** deployed-site `lighthouse.yml`; CI rewritten for the PR's production build, CodeQL modernised in place.
- **Assets:** all unused TTF/WOFF/font variants, arrows, event photographs and unused map previews. Retained files moved to `public/`; `static/` and `src/` are gone.
- **Tests:** contributor scraping and previous route/structure tests; replaced with schema/utility tests and production browser coverage.

Only specific permanent redirects for previously exposed root, contributor and `.html` URLs remain. There is no alternative page implementation.

## Final audit

Completed on 2026-09-10 against the final working tree:

- `src/`, `static/`, `app/data/` and the previous `scripts/` tree are absent. The obsolete local `dist` symlink was removed too.
- Every application component has a reference. `ProseA` is Nuxt Content's conventional renderer override. No unreferenced public assets or custom CSS class tokens were found.
- One stylesheet, one Nuxt app shell, one Nuxt i18n configuration, one collection mapping and one project source remain. Nine editorial slugs share one validated page renderer.
- The 19 project identities, nine editorial pages and two blog articles have matching DE/DA/EN translations. There are no extra JSON/Vue project records or alternative blog engines.
- Nuxt, Tailwind and Vitest share Vite 8; Vitest 5 removes the conflicting Vite 7 test dependency. TypeScript uses the four Nuxt 4 project references.
- Dependency use was checked against modules, imports and package scripts; automatic contributor tooling and its dependencies are absent.
- The requested case-insensitive pattern search found only intentional references: `legacy: false` selects Vue-i18n's Composition API; an E2E request verifies that `/legacy/impressum.html` returns 404; ESLint's `singleline-html-element-content-newline` is a rule name; migration/agent documentation explains the removed code. The Danish word `hovedindhold`, licence words such as `Holder`/`sold` and SVG `enable-background="new …"` metadata are not website variants. The lockfile has 133 pattern hits: 118 integrity hashes, two upstream deprecation notices and 13 dependency identifiers/references (`character-entities-legacy`, `fnv1a-64`, `serve-placeholder`, `strip-final-newline`). These are parser/tool dependencies, not retained website code. The two upstream notices concern transitive `@types/parse-path` and `glob`, not unused direct dependencies.
- `pnpm install --frozen-lockfile`, lint, typecheck and production build passed. Vitest: **22 passed**. Playwright: **20 passed**, with two device-specific skips (desktop omits the mobile test; mobile omits the tablet test). All 14 required route forms were exercised in DE/DA/EN on desktop and mobile, including SSR and absence of hydration errors.
- axe WCAG A/AA checks passed on home, projects, join, association and a blog article. Keyboard, tablet navigation, locale retention, no-JavaScript content/navigation, XML endpoints, 301s and 404s passed.
- Desktop and mobile screenshots were visually reviewed and are stored in `docs/screenshots/`.

Known editorial work is explicitly listed in `docs/editorial-todos.md`; no unverified legal details, team profiles or one-off event dates were substituted.
