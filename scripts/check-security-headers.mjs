import assert from 'node:assert/strict'
import { site } from '../shared/config/site.ts'

// Read-only post-deployment check. Does not execute scripts or send analytics.
const origin = new URL(process.argv[2] || site.url)
assert.equal(origin.protocol, 'https:', 'Use the public HTTPS origin to check TLS/HSTS ownership')
for (const path of ['/', '/da/om-os', '/en/privacy', '/api/translations', '/sitemap.xml', '/en/ueber-uns', '/de', '/missing-security-page', site.logo]) {
  const response = await fetch(new URL(path, origin), { redirect: 'manual' })
  const expectedStatus = ['/en/ueber-uns', '/de'].includes(path) ? 301 : path === '/missing-security-page' ? 404 : 200
  assert.equal(response.status, expectedStatus, `${path}: status`)
  for (const [header, value] of Object.entries({
    'x-frame-options': 'DENY',
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'strict-origin-when-cross-origin',
    'cross-origin-opener-policy': 'same-origin',
    'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  })) assert.equal(response.headers.get(header), value, `${path}: missing/duplicate ${header}`)
  const csp = response.headers.get('content-security-policy') || ''
  assert.ok(csp.includes("frame-ancestors 'none'"), `${path}: missing CSP`)
  assert.ok(csp.includes(`connect-src 'self' ${new URL(site.analytics.script).origin}`), `${path}: analytics connection blocked`)
  assert.ok(csp.includes(`script-src 'self' 'wasm-unsafe-eval' ${new URL(site.analytics.script).origin}`), `${path}: analytics/Content blocked`)
  assert.ok(!/\*|'unsafe-inline'|'unsafe-eval'|,/.test(csp), `${path}: broad or duplicate CSP`)
  const hsts = response.headers.get('strict-transport-security') || ''
  assert.match(hsts, /^max-age=31536000$/i, `${path}: expected host-only HSTS from TLS proxy`)
  assert.equal(response.headers.get('x-xss-protection'), null, `${path}: remove obsolete proxy X-XSS-Protection`)
  await response.body?.cancel()
  console.log(`${path}: HTTP ${response.status}, security headers and HSTS verified`)
}
