# Localized routes and translation identity

Nuxt i18n is the only router localization mechanism. `routePaths` in `shared/config/site.ts` supplies the public segments; `nuxt.config.ts` passes those paths as native i18n route metadata. Each editorial route entry renders the same `EditorialPage.vue`. The generic `[page].vue` was removed. Separate entries are necessary because i18n caches custom route options by component file; multiple differently translated routes sharing one file otherwise inherit the first route's paths.

## Public route matrix

| Page | DE | DA | EN |
| --- | --- | --- | --- |
| Home | `/` | `/da` | `/en` |
| About | `/ueber-uns` | `/da/om-os` | `/en/about` |
| Projects | `/projekte` | `/da/projekter` | `/en/projects` |
| Join | `/mitmachen` | `/da/deltag` | `/en/join` |
| Events | `/veranstaltungen` | `/da/arrangementer` | `/en/events` |
| Blog | `/blog` | `/da/blog` | `/en/blog` |
| Team | `/team` | `/da/team` | `/en/team` |
| Association | `/daten-sind-daten` | `/da/daten-sind-daten` | `/en/daten-sind-daten` |
| Contact | `/kontakt` | `/da/kontakt` | `/en/contact` |
| Legal notice | `/impressum` | `/da/kolofon` | `/en/legal-notice` |
| Privacy | `/datenschutz` | `/da/privatliv` | `/en/privacy` |
| Conduct | `/code-of-conduct` | `/da/adfaerdskodeks` | `/en/code-of-conduct` |

The association's proper name is retained. Detail routes append each locale's actual Content `slug` to its project or blog base. German canonical paths remain unchanged.

## Content migration

All project, blog and editorial records require an ASCII kebab-case `translationKey`. It is identical across translations of the same resource and independent of `slug` and filename. Identity is scoped to the collection, so a blog post and project may share a key. Duplicate keys per locale, duplicate canonical URLs and colliding aliases fail validation. Existing content files remain the only authored source; there is no project/blog translation mapping file.

The first migrated detail slugs demonstrate the complete flow:

| Resource / translationKey | DE slug | DA slug | EN slug |
| --- | --- | --- | --- |
| `spielplatzkarte` | `spielplatzkarte` | `legepladskort` | `playground-map` |
| `erster-beitrag` | `erster-beitrag` | `dit-foerste-bidrag` | `your-first-contribution` |
| `offene-daten-verstehen` | `offene-daten-verstehen` | `forstaa-aabne-data` | `understanding-open-data` |

The changed records store their former slug in `aliases`. Keep these aliases for existing inbound links. Project asset names use the stable translation key, so translating a slug does not duplicate images or social cards. The brand generator reads available project locales and deduplicates by key; it does not require a German translation.

Editorial route identities come from `editorialSlugs`; each existing locale record participates independently. Editorial frontmatter contains `locale` and `translationKey`, with no `slug`. Public paths come only from `routePaths`; filenames remain stable for translation pairing. Projects and blog posts still require their localized `slug`. UI-only home/project-index/blog-index pages exist in all three languages.

## Redirects and links

Nitro's `localized-redirects` middleware builds 301 redirects from the same Content view as SEO. Former DA/EN German base paths and recorded former detail slugs redirect directly to the final canonical URL, retaining the query string. For example:

- `/en/ueber-uns` → `/en/about`
- `/da/projekte` → `/da/projekter`
- `/en/projekte/spielplatzkarte?q=map` → `/en/projects/playground-map?q=map`
- `/da/blog/offene-daten-verstehen` → `/da/blog/forstaa-aabne-data`

Unknown paths and absent translations do not get invented destinations. Existing `.html` and contributor redirects remain. `useLocalePath` resolves UI navigation and breadcrumbs. Language switching and Markdown links select the actual translated Content path before using Nuxt i18n; absent translations are omitted from the language switcher, while Markdown retains a real source-language link. Language switching preserves query and fragment.

## SEO ownership

`server/utils/translations.ts` queries the existing Content collections and derives a minimal public translation index. `/api/translations` supplies it to SSR and the hydrated app; it is not a second content source. Draft and future blog posts never enter that index. Sitemap uses the same server utility.

Production shares one in-flight/resolved promise per Node process and UTC date across the API, redirects and sitemap. Deployment/restart clears it; there is no persisted or committed translation map. The first request after UTC midnight replaces the entry, preserving the existing date-based publication of scheduled posts without a deployment. Failures evict their own entry and retry on the next call. Development bypasses caching so Content edits appear immediately. Only the derived groups are cached, never request URLs, queries or legal runtime data. Each worker maintains its own bounded entry.

`usePageSeo` owns canonical, OpenGraph URL, WebPage data and actual hreflang alternates. `app/app.vue` uses `useLocaleHead({ seo: false })` only for HTML language attributes, avoiding a competing guessed slug-based alternate set. BlogPosting and breadcrumb URLs continue to use the resolved locale route. RSS uses the actual locale slug and the shared path serializer.

Only present, indexable translations appear in HTML hreflang and reciprocal sitemap alternates. `noindex` pages retain their canonical and navigation but stay out of sitemap/alternates. No `x-default` is emitted: the site has no language-neutral landing page, and missing German content must not imply one. XML URLs are escaped and browser tests parse the sitemap as XML.

## Verification

Vitest covers localized paths, same/different slugs, collection-scoped identity, absent translations (including absent German), noindex filtering, alias collisions, schema validation and reciprocal XML. Playwright covers direct SSR reloads, DE/DA/EN navigation, detail-language switching, 301 destinations/query preservation, canonical/OpenGraph/hreflang, parsed sitemap and localized RSS links on desktop and mobile. The existing suite also checks all static paths, structured data, accessibility, assets and screenshots.
