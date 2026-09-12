# Production HTTP security headers

## Ownership and deployment

**Nitro owns application headers; the HTTPS reverse proxy owns TLS, HTTP-to-HTTPS redirects and HSTS.** `server/plugins/security-headers.ts` applies the policy to the production Node server, including static assets, APIs, redirects and error responses. Development and Content's internal build prerender bypass it. Runtime `NODE_ENV` cannot disable a built production policy.

The read-only audit on 2026-09-12 found Nginx serving `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `X-XSS-Protection: 1; mode=block` and `X-UA-Compatible: IE=Edge`, with no CSP, Referrer-Policy, Permissions-Policy or HSTS. The live proxy configuration is outside this repository. Coordinate the following when deploying this change:

- Remove Nginx's application `add_header` directives (including inherited includes), especially the old frame/MIME headers, obsolete X-XSS-Protection and X-UA-Compatible. Do not add another CSP or hide Nitro's headers.
- Proxy all application paths, including assets, to Nitro and preserve `Host` as required by [Plausible](analytics.md). If a CDN or Nginx serves files directly, its responses must meet the same smoke checks before switching traffic.
- Configure the HTTPS virtual host with `add_header Strict-Transport-Security "max-age=31536000" always;`. Cover proxy-generated errors as well. Review Nginx's `add_header` inheritance if a nested location defines any headers. Keep the HTTP virtual host as a redirect to HTTPS.
- HSTS is host-only: no `includeSubDomains` or preload commitment is made for services not audited here. Nitro does not emit HSTS behind plain HTTP or infer transport from untrusted forwarded headers.
- Deploy the complete `.output/` and restart the Node process. No new environment variables or deployment identities are introduced. Do not independently cache/transform HTML headers and bodies: the CSP hashes must match the delivered bytes.

## Application policy

| Header/directive | Decision |
| --- | --- |
| CSP `default-src` | Same origin only; no wildcard, broad HTTPS, data or blob sources |
| `script-src` | Local Nuxt scripts, the configured Plausible origin and hashes of exact inline Nuxt/Unhead script blocks |
| `wasm-unsafe-eval` | Required by Nuxt Content 3's browser-side SQLite WebAssembly on client navigation; ordinary `unsafe-eval` is forbidden |
| `script-src-attr` | `none`; inline event handlers are forbidden |
| `style-src` | Local CSS and hashes of framework-rendered inline style blocks |
| `style-src-attr` | `unsafe-hashes` with exact rendered values: NuxtRouteAnnouncer's accessible hiding styles and Vue `v-show` for the mobile menu; no blanket `unsafe-inline` |
| `connect-src` | Same origin for Content/payloads and the configured Plausible origin for `/api/event` |
| `img-src`, `font-src` | Same origin only; Manrope and imagery stay local |
| `object-src`, `base-uri`, `frame-src`, `frame-ancestors` | `none`; no plugins, base URL injection, embedded frames or framing of this site |
| `form-action` | Same origin; cross-origin form submissions are blocked |
| X-Frame-Options | `DENY`, consistent with `frame-ancestors 'none'` |
| X-Content-Type-Options | `nosniff` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | Deny camera, microphone, geolocation, payment and USB; none are used |
| Cross-Origin-Opener-Policy | `same-origin`; there is no cross-origin popup authentication/integration |
| Cross-Origin-Resource-Policy | Intentionally omitted: these are public resources, including reusable logos/social images; no cross-origin isolation is needed |
| Cross-Origin-Embedder-Policy | Omitted; do not impose isolation requirements on Plausible or public asset consumers |

Hashes are calculated per SSR response from Nuxt/Unhead's head and body-end slots, which hold the runtime-config bootstrap and Plausible initializer. Scripts in rendered page bodies are never authorized. JSON payloads/JSON-LD are inert data, and receive no script permissions. Request-specific runtime values therefore need no hard-coded hash or deployment identity. Script/style source changes require the regular production browser checks. There is no public HTML upload or untrusted script authoring facility; continue escaping data and reviewing Content, since CSP complements those boundaries.

## Verification

`pnpm test tests/security.test.ts` checks the allowlist and exact hashes. After `pnpm build`, `pnpm test:e2e tests/e2e/security.spec.ts tests/e2e/analytics.spec.ts` checks production responses, browser enforcement, DE/DA/EN hydration, local fonts, Content navigation and injected-script blocking. Analytics tests intercept the loader and event endpoint under the production hostname; they never send synthetic traffic to the live service. The full suite also exercises keyboard/menu behavior, accessibility, images, RSS, sitemap and legal configuration.

After deployment, run the read-only TLS/proxy smoke check:

```sh
node --experimental-strip-types scripts/check-security-headers.mjs
```

An optional HTTPS origin argument checks a staging proxy. Run the script after proxy changes as well; it checks missing/conflicting headers, HSTS, redirects, errors, APIs and a public asset. Local browser success does not establish that the live proxy has been updated or that the Plausible dashboard has received real traffic.

References: [CSP Level 3](https://www.w3.org/TR/CSP3/), [Nuxt runtime hooks](https://nuxt.com/docs/4.x/api/advanced/hooks), [Nginx header inheritance](https://nginx.org/en/docs/http/ngx_http_headers_module.html).
