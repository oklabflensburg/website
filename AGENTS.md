# Working in this repository

This is the multilingual OK Lab Flensburg website for civic tech, open data and community participation. DatenSindDaten e.V. is the supporting association; Code for Germany is the network.

## Canonical architecture

This repository has one canonical Nuxt 4 architecture. Do not introduce legacy variants, parallel implementations, v2 components, duplicate content sources, old/new feature flags, or compatibility layers unless strictly required and explicitly approved in the task.

- Extend existing components. When replacing one, remove the superseded implementation and unused styles, tests and assets. No `FooNew.vue`, `FooV2.vue` or `LegacyFoo.vue`.
- Use Vue 3, TypeScript, Tailwind CSS 4, `@nuxtjs/i18n` 10, `@nuxt/content` 3 and `@nuxt/image` 2. Preserve SSR and Nitro's `node-server` output; no client-only replacement or second static application.
- [package.json](package.json) defines dependency ranges and commands; `pnpm-lock.yaml` pins exact versions. Use Node >=22.22.0 and pnpm 10.15.1. Vite 8 is shared by Nuxt, Tailwind and Vitest; Content uses Node's native SQLite connector.

| Location | Responsibility |
| --- | --- |
| `app/pages/`, `app/components/` | Routes and reusable Vue UI; `app/app.vue` owns the shared shell |
| `app/composables/` | Shared SEO and hydration-dependent interaction helpers |
| `app/assets/css/main.css` | Tailwind theme tokens, base styles and shared component/prose styles |
| `content/{de,da,en}/` | Canonical `projects/*.md`, `blog/*.md`, `pages/*.md`, `events/*.yml` |
| `content/team/` | Manually approved multilingual team profiles (`*.yml`) |
| `i18n/locales/` | UI dictionaries: `de.json`, `da.json`, `en.json` |
| `shared/config/site.ts` | Organisation, domain, brand paths, contact, regular meeting and route allowlist |
| `shared/config/content.ts`, `content.config.ts` | Zod schemas and one collection per source: projects, blog, pages, events, team |
| `shared/utils/`, `server/routes/` | Pure helpers; RSS, sitemap and robots handlers using the same Content/config |
| `public/`, `scripts/generate-brand-assets.mjs` | Local assets and reproducible branding derivatives |
| `tests/`, `tests/e2e/`, `docs/` | Vitest, Playwright and design/editorial documentation |

Do not hand-edit or commit generated runtime/tooling directories: `.nuxt/`, `.output/`, `.data/`, `playwright-report/`, `test-results/`. Reviewed brand derivatives and `docs/screenshots/` are intentionally tracked.

## Content and translations

- Content is the only editorial source of truth: no Vue project arrays, JSON mappings, project descriptions in UI dictionaries or second blog engine. Query collections by `locale` and stable `slug`.
- Keep matching filenames and slugs across DE/DA/EN. Slugs use lowercase ASCII words separated by hyphens. Project/blog/page descriptions and project image descriptions must exceed 20 characters to satisfy the current content tests.
- `@nuxtjs/i18n` is the only UI translation/router solution. Add keys to all three dictionaries; no hard-coded UI copy in reusable components. Runtime missing-key warnings are disabled, so explicitly verify key parity with `pnpm test`; fallback is not a completed translation.
- German uses `/`, Danish `/da`, English `/en`; path segments remain the same. Use `useLocalePath` and `useSwitchLocalePath` in Vue; internal Markdown links are localized by [ProseA](app/components/content/ProseA.vue). The shared `localizedPath` helper is for server/pure utilities. Preserve detail-page language switching and the cookie-free locale strategy.

### Add or update a project

1. Verify its purpose, source, links and status. Create `content/{de,da,en}/projects/<slug>.md` for all three locales; follow [open-city-planner.md](content/de/projects/open-city-planner.md).
2. Required frontmatter: `locale`, `slug`, `title`, `description`, `status`, nonempty `categories`, `technologies` (array), `image`, `imageAlt`, `links` (object) and `source` (URL). `links.website` and `links.github` are optional URLs. `featured` defaults to false; `featuredOrder` defaults to 0 and must be a nonnegative integer.
3. Status is `development`, `seeking-contributors`, `completed` or `unknown`. Reuse category keys; add labels in every UI dictionary for a new category. Keep technical fields and asset references consistent across translations.
4. Add one distinct, text-free signet at `public/images/projects/<slug>.svg`; set `image` to `/images/projects/<slug>.svg` and write a descriptive `imageAlt` in each language. Follow the 1024-square geometry, safe SVG and palette rules in [project-logo-system.md](docs/project-logo-system.md). No photos, screenshots, embedded text or generic organisation logo as a project signet. Display the complete image with `object-contain`.
5. Write the Markdown body, run `pnpm brand:generate`, and review/commit the derived project social card with the Content and SVG. The generator reads the existing German Content records; do not add a separate project list.

### Blog, pages, events and team

- Blog: `content/{de,da,en}/blog/<slug>.md`; required `locale`, `slug`, `title`, `description`, quoted `date: 'YYYY-MM-DD'`, nonempty `authors`, and `tags` (array). Optional `updated` date and local `image`; set `draft: true` explicitly while preparing a post (also the schema default). Publish only after editorial confirmation. Draft/future posts must stay out of detail routes, listings, RSS and sitemap. All blog social previews use the branded default; an optional article image is content imagery.
- Editorial pages: `content/{de,da,en}/pages/<slug>.md`, with `locale`, `slug`, `title`, `description` and optional `noindex` (default false). `app/pages/[page].vue` accepts only `editorialSlugs` from the site config; update that allowlist and locale navigation keys together when adding a route. Unknown paths must remain 404s.
- One-off events: `content/{de,da,en}/events/<slug>.yml`; required `locale`, `slug`, `title`, `description`, `kind`, `start`, `end`, `location`, `address`, `url`, `status`; optional `registrationUrl`. Use schema enums and ISO timestamps with explicit timezone offsets; retain cancellation/postponement and past-event information. The regular meeting comes only from `site.meeting` and `shared/utils/meeting.ts`, not duplicated event files or editorial addresses/schedules.
- Team: `content/team/<name>.yml` with `name`, translated `role` and `bio` objects (`de`, `da`, `en`), and `consent: true`; optional `github`, local `avatar`, and `links` array of `{ label, url }`. Document consent in review without publishing private evidence. Never scrape or automatically publish GitHub membership. Empty team/event collections are legitimate; do not populate them with invented examples.
- Never invent people, events, metrics, legal/provider details, association officers or funding terms. Record missing facts in [editorial-todos.md](docs/editorial-todos.md). The meetup venue is not a verified legal address. Preserve `noindex` on incomplete legal/conduct pages until editorial completion.

## Design, typography and branding

- Follow **“Variante 1 – klar & kartenbasiert”**: light, clear and friendly, with whitespace, subtle borders/shadows and small radii. No dark theme, neon, glassmorphism or pill buttons.
- Reuse Tailwind tokens and shared classes in `app/assets/css/main.css`; avoid arbitrary inline styling, a second CSS system or large UI frameworks. Keep the local Manrope font. See [design-reference.md](docs/design-reference.md) and [typography.md](docs/typography.md).
- Body and descriptions: at least 16 px, important desktop copy 18 px with 28/32 px line height. Use the existing `.prose` (max 48rem), not `prose-sm`. Card titles are 20 px; desktop navigation/buttons at least 16 px, mobile navigation 18 px. Keep secondary copy/tags/footer at 14 px; `text-xs` is reserved for genuine microinformation (currently map attribution). Do not shrink copy to force it into a layout; allow reflow and preserve text contrast.
- The sole organisation master is [public/brand/oklabflensburg-logo.png](public/brand/oklabflensburg-logo.png), unchanged from the [canonical upstream PNG](https://github.com/oklabflensburg/.github/blob/main/resources/oklabflensburg_logo_quadrat.png). Use `site.logo` through `AppLogo.vue`, including header/footer/mobile navigation. No redraw, vectorization, crop, stretch, filters, recolouring, duplicate source or extra wordmark.
- Keep organisation, individual project signets, supporting association and network identities distinct. The OK Lab logo is neither every project's icon nor the association/network logo.
- Keep images/fonts local and retain provenance/licences. Prefer `NuxtImg` with explicit dimensions and meaningful alt text; existing direct SVG project images remain valid. Use existing assets; no trackers or unnecessary third-party embeds.
- Favicons and social PNGs are generated derivatives, not editable logo sources. `pnpm brand:generate` uses Sharp and runs automatically before `pnpm build`; inspect generated changes before committing. Source hash, asset roles and generation rules are in [brand.md](docs/brand.md).

## SEO and accessibility

- Use `usePageSeo` for localized titles/descriptions, OpenGraph/Twitter and WebPage data. `app/app.vue` uses `useLocaleHead({ seo: true })` for language attributes, canonical and hreflang, plus Organization/WebSite data. Avoid competing head implementations.
- Keep `site.url` authoritative (currently `https://oklabflensburg.de`), including absolute logo/social/schema URLs. Preserve BlogPosting and Event data where applicable, correct publication filters, `noindex` exclusions and XML escaping in `server/routes/`. Check rendered metadata, sitemap, RSS and robots when changing routes or SEO.
- Use semantic HTML, one page `h1`, logical headings, descriptive links and appropriate alt text (empty for decoration). Keep the skip link, visible focus, route announcer, keyboard operation and mobile menu Escape/focus return. Use ARIA only where native semantics are insufficient; never communicate essential meaning by colour alone.
- Preserve readable contrast, at least 44 px high primary touch targets, mobile reflow and usability at 200% zoom. Do not hide overflowing content to pass a layout check. Existing reflow tests cover 320 CSS px and 720 CSS px (the layout width of a 1440 px window at 200% zoom); report this distinction accurately.

## Commands and required checks

Before editing: inspect `git status`, the relevant implementation, schemas and linked guidance; preserve unrelated user changes. Work on a feature branch. Install dependencies when needed with `pnpm install --frozen-lockfile` (enable Corepack first if necessary); intentional dependency changes must update the lockfile.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Nuxt development server |
| `pnpm lint` | Nuxt-generated ESLint configuration via `eslint.config.mjs` |
| `pnpm typecheck` | Nuxt/Vue TypeScript checks |
| `pnpm test` | Vitest 5: schemas, locale/content parity, assets, branding and pure utilities |
| `pnpm brand:generate` | Regenerate favicons and default/project social cards |
| `pnpm build` | Generate brand derivatives, then build the SSR application |
| `pnpm preview` | Preview the built application |
| `pnpm test:e2e` | Playwright desktop/mobile Chromium against the production build on port 3100 |

Install the browser with `pnpm exec playwright install chromium` (CI uses `--with-deps`). These install commands are package-manager/tool commands, not additional package scripts. `postinstall` runs `nuxt prepare`; do not edit generated Nuxt configs.

- For application, Content, assets, dependencies or configuration changes, run **lint → typecheck → test → build → test:e2e before committing/opening the PR**. Build before browser tests; do not test a stale server already running on port 3100. Add focused regression coverage for behavior changes and run affected checks again after fixes.
- For documentation-only changes (including this file and README), validate Markdown, local links/paths, documented commands and consistency with source/configuration. Application build/browser reruns are not required unless runtime code, Content, assets or configuration also changes. State exactly what ran.
- For UI changes, generate and visually review `/`, `/projekte`, `/ueber-uns`, `/mitmachen`, `/blog`, `/daten-sind-daten` at 1440 and 390 px; review relevant details/menu states too. Playwright writes `docs/screenshots/`. Check overflow, keyboard interaction, readable type and axe results, not screenshots alone.
- Audit replaced implementations and unused code/assets. Report failures, skips and editorial gaps explicitly; do not describe missing remote CI as a pass.

## GitHub Actions

- [Website CI](.github/workflows/ci.yml): `verify` job on PRs and pushes to `main`; frozen install, lint, typecheck, Vitest, build, Chromium install and Playwright. Uploads reports/screenshots as `browser-report-and-screenshots`.
- [CodeQL](.github/workflows/codeql.yml): JavaScript/TypeScript analysis on PRs, pushes to `main` and weekly schedule; `build-mode: none`.
- These are the only workflow files; Playwright/build run within Website CI, with no separate Dependency Review workflow. Repository-level Actions were re-enabled on 2026-09-10 after the audit in [ci-audit.md](docs/ci-audit.md). Both workflows target PRs against `main`. Check the current PR head and actual run conclusions when reporting CI; workflow presence alone is not a successful check. Local validation remains required.

## Git, commits and pull requests

- Never work directly on `main`. Branch from the current default branch; if a change depends on an unmerged branch, make that dependency explicit.
- Keep commits small and reviewable. Use meaningful `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `ci:` or `chore:` messages, optionally scoped. Review diffs and generated assets; never commit unrelated work, secrets or unreviewed bulk output.
- Submit larger changes through a PR. Describe the problem, resulting behavior, affected areas, validation, screenshots for UI work, outstanding TODOs and any breaking changes. Keep the description aligned with the final diff.
- Commit, push and create the actual PR when requested; report branch, commit and PR URL. Do not merge or deploy unless explicitly requested. Resolve production editorial gaps before publication.
