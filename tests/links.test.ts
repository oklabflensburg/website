import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { computed, createSSRApp, defineComponent, h, ref } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { parseFragment, type DefaultTreeAdapterTypes } from 'parse5'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import SiteLink from '../app/components/SiteLink.vue'
import ProseA from '../app/components/content/ProseA.vue'
import { internalLinkPath, isExternalUrl, linkAttributes } from '../shared/utils/links'
import { translationGroups } from '../shared/utils/translations'
import { site } from '../shared/config/site'

beforeEach(() => {
  vi.stubGlobal('computed', computed)
  vi.stubGlobal('useI18n', () => ({ locale: ref('en') }))
  vi.stubGlobal('useLocalePath', () => (path: string) => path)
  vi.stubGlobal('useTranslations', () => ({ groups: ref(translationGroups({
    projects: [
      { locale: 'de', slug: 'karte', translationKey: 'map' },
      { locale: 'en', slug: 'map', translationKey: 'map' },
      { locale: 'de', slug: 'ohne-uebersetzung', translationKey: 'untranslated' },
    ], blog: [], pages: [],
  })) }))
})
afterEach(() => vi.unstubAllGlobals())

async function render(component: typeof SiteLink | typeof ProseA, props: Record<string, string>) {
  const app = createSSRApp({ render: () => h(component, props, () => 'Link label') })
  app.config.globalProperties.$t = () => 'Opens in a new tab.'
  app.component('SiteLink', SiteLink)
  app.component('NuxtLink', defineComponent({
    props: ['to'], setup: (props, { slots }) => () => h('a', { href: props.to, 'data-nuxt-link': 'true' }, slots.default?.()),
  }))
  const html = await renderToString(app)
  const anchor = parseFragment(html).childNodes.find((node) => 'tagName' in node && node.tagName === 'a')
  function textContent(node: DefaultTreeAdapterTypes.Node): string {
    if ('value' in node) return node.value
    return 'childNodes' in node ? node.childNodes.map(textContent).join('') : ''
  }
  return { text: anchor ? textContent(anchor) : '', attrs: Object.fromEntries(anchor && 'attrs' in anchor ? anchor.attrs.map(({ name, value }) => [name, value]) : []) }
}

describe('one canonical origin rule', () => {
  it.each(['/projekte', '/projekte?q=a#map', site.url + '/projekte?q=a#map', '//oklabflensburg.de/blog', '#section', 'relative', 'mailto:info@example.org', 'tel:+49123', '', undefined, 'http://[invalid'])('keeps %s in the same tab', (href) => {
    expect(isExternalUrl(href)).toBe(false)
    expect(linkAttributes(href).target).toBeUndefined()
  })
  it.each(['https://github.com/oklabflensburg', 'https://norden.social/@oklabflensburg', 'https://www.openstreetmap.org/', '//example.org/path', 'http://oklabflensburg.de/', 'https://oklabflensburg.de:444/', 'https://oklabflensburg.de.example.org/'])('opens %s safely in a new tab', (href) => {
    expect(isExternalUrl(href)).toBe(true)
    expect(linkAttributes(href)).toEqual({ target: '_blank', rel: 'noopener noreferrer' })
  })
  it('uses origins rather than string prefixes and supports an explicit canonical base', () => {
    expect(isExternalUrl('https://EXAMPLE.org:443/a', 'https://example.org')).toBe(false)
    expect(internalLinkPath(site.url + '/projekte?q=a%20b#map')).toBe('/projekte?q=a%20b#map')
    expect(internalLinkPath('//github.com/oklabflensburg')).toBeUndefined()
  })
})

describe('rendered link components', () => {
  it('renders Markdown external anchors with safe attributes and intact query/fragment', async () => {
    const href = 'https://github.com/oklabflensburg?q=a%20b#readme'
    const { attrs, text } = await render(ProseA, { href, target: '_self', rel: 'opener' })
    expect(attrs).toMatchObject({ href, target: '_blank', rel: 'noopener noreferrer', 'aria-description': 'Opens in a new tab.' })
    expect(attrs['data-nuxt-link']).toBeUndefined()
    expect(text).toBe('Link label')
  })
  it.each(['/projekte/karte?q=a%20b#map', site.url + '/projekte/karte?q=a%20b#map'])('localizes %s with NuxtLink, query and fragment preserved', async (href) => {
    const { attrs } = await render(ProseA, { href, target: '_blank' })
    expect(attrs).toMatchObject({ href: '/en/projects/map?q=a%20b#map', 'data-nuxt-link': 'true' })
    expect(attrs.target).toBeUndefined()
  })
  it('keeps absent translations and document fragments real', async () => {
    expect((await render(ProseA, { href: '/projekte/ohne-uebersetzung?q=a#b' })).attrs.href).toBe('/projekte/ohne-uebersetzung?q=a#b')
    expect((await render(ProseA, { href: '#heading' })).attrs).toEqual({ href: '#heading' })
  })
  it('preserves identity verification and accessible names while preventing overrides', async () => {
    const { attrs } = await render(SiteLink, { href: site.social.mastodon, rel: 'me opener', target: '_self', 'aria-label': 'Mastodon' })
    expect(attrs).toMatchObject({ target: '_blank', rel: 'me noopener noreferrer', 'aria-label': 'Mastodon' })
    expect((await render(SiteLink, { href: site.url + '/blog', target: '_blank' })).attrs.target).toBeUndefined()
  })
})

it('all Vue anchors use SiteLink so future links inherit the rule', () => {
  function files(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)])
  }
  for (const path of files('app').filter((path) => path.endsWith('.vue') && !path.endsWith('/SiteLink.vue'))) {
    expect(readFileSync(path, 'utf8'), path).not.toMatch(/<a(?:\s|>)/)
  }
})
