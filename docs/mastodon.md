# Homepage Mastodon feed

The homepage displays up to three public posts beside the blog updates, followed by the join CTA. `MastodonFeed.vue` requests only `/api/social/mastodon` using Nuxt's SSR-aware `useFetch`; the browser receives the minimal DTO and does not fetch the social network. Client navigation can proceed while the optional feed loads.

## Configuration and API

`site.social.mastodon` is the canonical profile URL, currently `https://norden.social/@oklabflensburg`. The server derives the API origin and lookup handle from this value. There is no duplicate public runtime profile setting.

- `NUXT_MASTODON_ACCOUNT_ID`: optional numeric account ID, server-only. Without it, the server calls `/api/v1/accounts/lookup?acct=oklabflensburg` and retains the successful ID for the process lifetime. To configure it explicitly, retrieve the `id` from that lookup response on the configured instance.
- `NUXT_MASTODON_BASE_URL`: optional server API origin override; defaults to the profile origin. Intended for an alternate API deployment or local test upstream. Changing the account also requires updating the canonical profile, so the CTA and fetched identity agree.

Public retrieval uses the [Mastodon accounts API](https://docs.joinmastodon.org/methods/accounts/), without OAuth. The statuses request asks for ten entries with `exclude_replies=true` and `exclude_reblogs=true`. Server validation independently rejects replies, boosts, non-public or malformed statuses and unsafe status URLs. Valid entries are deduplicated, sorted newest first and limited to three.

## Cache and failure behavior

`server/utils/mastodon.ts` owns one in-memory cache per Nitro process, shared across locales and requests. Successful responses (including empty lists) are retained for ten minutes. Concurrent refreshes share one promise. The lookup and statuses request share a two-second deadline, with redirects and automatic retries disabled.

A failed refresh returns the last successful list, or an empty list on cold start, and delays the next attempt for one minute. The next request after expiry refreshes the cache; no background timer is required. Restarting the process clears both posts and the discovered account ID. Multiple server instances each have their own cache. A prolonged outage can leave older cached posts visible with their original dates until recovery or restart.

The API exposes no exception messages or raw upstream objects. A cold failure shows localized fallback copy plus the profile link; the homepage still renders normally.

## Content, privacy and accessibility

`parse5`, already present in the dependency graph and now declared as a direct server dependency, parses HTML for text extraction. Script, style, iframe, object, template, SVG and MathML subtrees are omitted. No upstream attributes, markup, embedded links or media are serialized. Paragraphs and line breaks are retained; entities are decoded and the resulting text is escaped by Vue interpolation. This is plain-text extraction, not an HTML sanitizer or a `v-html` path.

Original post text is not translated. UI labels and dates use DE/DA/EN; content language is retained when available. Content warnings and sensitive posts use keyboard-operable native `details`/`summary`, closed by default. No remote images, media proxies, iframes or widget scripts are used. The browser contacts Mastodon only when a visitor follows a link. Existing privacy prose and browser CSP allowlists therefore need no changes.

Every status/profile link uses `SiteLink`: external HTTP(S) origins open in a new tab with `noopener noreferrer` and a translated accessible description. `rel="me"` on the footer profile is preserved. `shared/utils/links.ts` is the sole external-link detector, based on `site.url`. `ProseA` uses the same rule and keeps actual translated internal routes, queries and fragments in same-tab Nuxt navigation.

## Deterministic verification

Unit tests cover filtering, minimal DTOs, malicious/malformed HTML, warnings, ordering, limits, timeout, fallback, cache expiry, lookup reuse and concurrent requests. Component SSR tests compile the real `SiteLink` and `ProseA` components with the Vue Vite plugin; their Nuxt navigation/composable dependencies are stubbed to verify both route selection and rendered attributes.

Playwright launches `tests/fixtures/serve-e2e.ts`, which serves fictional upstream responses locally and starts the production Nitro build against them. Fixtures are test-only and do not enter Content or application bundles. Browser coverage checks rendered SSR posts, DE/DA/EN labels/dates, disclosure keyboard interaction, safe links, no remote browser requests, axe and 320/720-pixel reflow. A separate production process with an unreachable local upstream verifies the cold failure path without JavaScript. Site-wide link assertions cover navigation, project/blog pages and all editorial routes. The source audit requires all Vue anchors to use `SiteLink`.

Homepage and disclosure screenshots contain fictional test posts, not a snapshot of the live account. Run the usual `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm test:e2e` sequence and `pnpm peers check` after dependency changes.
