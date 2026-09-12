import { createHash } from 'node:crypto'
import { expect, it } from 'vitest'
import { contentSecurityPolicy } from '../server/utils/security'
import { site } from '../shared/config/site'

it('allows only local resources and the configured analytics origin', () => {
  const policy = contentSecurityPolicy()
  expect(policy).toContain(`connect-src 'self' ${new URL(site.analytics.script).origin}`)
  expect(policy).toContain(`script-src 'self' 'wasm-unsafe-eval' ${new URL(site.analytics.script).origin}`)
  expect(policy).not.toMatch(/\*|'unsafe-eval'|'unsafe-inline'|data:|blob:/)
  expect(policy).toContain("frame-ancestors 'none'")
  expect(policy).toContain("script-src-attr 'none'")
  expect(policy).toContain("img-src 'self'; font-src 'self'")
})

it('hashes exact trusted inline tags and style attributes, never body scripts', () => {
  const digest = (value: string) => `'sha256-${createHash('sha256').update(value).digest('base64')}'`
  const policy = contentSecurityPolicy({
    head: ['<script>window.plausible.init();</script><style>body{color:red}</style><script src="/app.js"></script>'],
    bodyAppend: ['<script>window.__NUXT__={};</script>'],
    bodyPrepend: [],
    body: ['<span style="position:absolute;"></span><script>untrusted()</script>'],
  })
  for (const value of ['window.plausible.init();', 'body{color:red}', 'window.__NUXT__={};', 'position:absolute;']) expect(policy).toContain(digest(value))
  expect(policy).not.toContain(digest('untrusted()'))
  expect(policy).not.toContain(digest('window.__NUXT__={}'))
  expect(policy).not.toContain("'unsafe-inline'")
})

it.each(['</script >', '</script ignored="value">', '</SCRIPT>', '</script/>'])('hashes script content before browser-recognized closing tag %s', (closing) => {
  const source = 'window.plausible.init();'
  const digest = `'sha256-${createHash('sha256').update(source).digest('base64')}'`
  const policy = contentSecurityPolicy({ head: [`<script>${source}${closing}`], body: [], bodyPrepend: [], bodyAppend: [] })
  expect(policy).toContain(digest)
})
