# Plausible Analytics

The shared shell in `app/app.vue` installs the supplied Plausible bootstrap and asynchronous script once. The script URL has one source in `shared/config/site.ts`. Initialization precedes the loader. The integration runs only in a production build on the hostname from `site.url` (`oklabflensburg.de`); development, localhost and other preview hosts do not load the script. The reverse proxy must preserve the public `Host` header.

The [production CSP](security-headers.md) permits this origin only for scripts and connections, with an exact hash for the inline initializer. It does not require `unsafe-inline` or ordinary JavaScript `unsafe-eval`. Nginx must pass through Nitro's policy without a conflicting second CSP.

Plausible handles initial pageviews, `pushState` and back/forward navigation itself. Do not add a second router hook or manual pageview calls. No Nuxt module, package dependency, tracking proxy or consent banner is added. Blocking the script leaves the site usable.

## Current script and data flow

The supplied URL is `https://plausible.oklabflensburg.de/js/pa-kAVDHPi3E6v_DQyTEdWt-.js`. The script inspected on 2026-09-11 sends to `https://plausible.oklabflensburg.de/api/event` with domain `oklabflensburg.de`. Besides automatic pageviews, its generated defaults enable outbound-link, file-download and form-submission measurement. The website has no contact form. Engagement events include time spent and scroll depth. No custom event names, properties or revenue events are added by this repository.

The browser payload includes the visited URL and referrer; outbound/download events include their destination. Do not assume query parameters are removed before transmission. IP address and User-Agent also reach the service as part of HTTP requests. The inspected script does not write cookies or browser identifiers; it reads an optional existing `localStorage.plausible_ignore` value. Separately, Nuxt Content caches editorial collection data and checksums in LocalStorage (`content_collection_*`, `content_checksum_*`) after client navigation. These are content caches, not analytics identifiers; they were missed by the earlier audit of fresh page loads. The privacy pages now describe them. Provider claims about server-side aggregation, IP handling or retention do not establish this particular instance's configuration.

The DE/DA/EN privacy pages describe the integration. Confirm the instance operator, legal basis, recipients, retention, infrastructure and any processing agreements before publication; track that review in [editorial-todos.md](editorial-todos.md). A hostname under the Lab domain alone does not establish who hosts the analytics server. Changes in Plausible's dashboard can alter the served script's defaults without a repository change, so review the privacy text when changing those settings.

## Verification

`tests/e2e/analytics.spec.ts` routes the public hostname to the local production server and stubs the remote script. It verifies SSR placement, bootstrap ordering, one loader across client navigation/back, and operation when the script is blocked. All non-site requests are intercepted, so CI never sends analytics events. The ordinary browser suite uses localhost and verifies that analytics is omitted there.

For a check of the actual supplied script, fetch it for local inspection and intercept all analytics requests in the browser before executing it. Verify one pageview per initial load, client route change and back navigation. Plausible excludes automated browsers by default; its `window.__plausible` test marker can enable this isolated check. Never send synthetic events to the live dashboard. The live dashboard's receipt of production traffic is a deployment check, not something an offline browser test proves.

References: [SPA support](https://plausible.io/docs/spa-support), [script options](https://plausible.io/docs/script-extensions), [Plausible data policy](https://plausible.io/data-policy). These describe Plausible; the actual supplied script and deployment remain authoritative for this integration.
