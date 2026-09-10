# Working in this repository

> This repository has one canonical Nuxt 4 architecture.
> Do not introduce legacy variants, parallel implementations, `v2` components, compatibility layers, duplicate content sources, or old/new feature flags.

Extend existing components. When replacing a component, remove the superseded implementation and its unused styles, tests and assets once the migration works.

- Nuxt 4, Vue 3, TypeScript, Tailwind 4, Nuxt i18n, Nuxt Content and Nuxt Image; SSR is required.
- Application code lives in `app/`, server handlers in `server/`, shared configuration and pure utilities in `shared/`.
- UI text belongs to `i18n/locales/{de,da,en}.json`. Use Nuxt i18n for all locale navigation.
- Projects, blog and editorial pages live only in `content/{de,da,en}/`. Never add a second project or blog source.
- `shared/config/content.ts` defines the schemas. `content.config.ts` maps each source to exactly one collection.
- `shared/config/site.ts` is the only source for organisation and meeting details. Do not repeat the address or schedule in content files.
- Team profiles are manually curated in `content/team/` and require documented consent. Never scrape or publish GitHub organisation membership automatically.
- Do not invent legal details, people, project metrics or events. Record missing verified facts in `docs/editorial-todos.md`.
- Use existing assets with their provenance. Keep fonts and images local. No trackers or large UI frameworks.
- Before a PR: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm test:e2e`. Review desktop and mobile screenshots and audit removed architecture and unused code.
- Keep production changes on a feature branch; do not deploy or merge unless requested.
