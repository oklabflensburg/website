import { describe, expect, it } from 'vitest'
import { alternateLinks, findTranslationGroup, sitemapXml, translationGroups, translationRedirect, type DetailTranslationRecord } from '../shared/utils/translations'
import { localizedPath } from '../shared/config/site'
import { schemas } from '../shared/config/content'

const record = (locale: string, slug: string, extra: Partial<DetailTranslationRecord> = {}): DetailTranslationRecord => ({
  locale, slug, translationKey: 'map', ...extra,
})
const empty = { projects: [], blog: [], pages: [] }

describe('localized routes and translation identity', () => {
  it.each([
    ['datenschutz', '/datenschutz', '/da/privatliv', '/en/privacy'],
    ['impressum', '/impressum', '/da/kolofon', '/en/legal-notice'],
    ['ueber-uns', '/ueber-uns', '/da/om-os', '/en/about'],
    ['mitmachen', '/mitmachen', '/da/deltag', '/en/join'],
    ['veranstaltungen', '/veranstaltungen', '/da/arrangementer', '/en/events'],
  ])('routes slug-free editorial identity %s through the existing matrix', (translationKey, de, da, en) => {
    const groups = translationGroups({ ...empty, pages: ['de', 'da', 'en'].map((locale) => ({ locale, translationKey })) })
    const group = findTranslationGroup(groups, de!)
    expect(group?.variants.map((variant) => variant.path)).toEqual([de, da, en])
    expect(alternateLinks(group).map((link) => link.href)).toEqual([de, da, en].map((path) => `https://oklabflensburg.de${path}`))
    for (const path of [de, da, en]) expect(sitemapXml(groups)).toContain(`<loc>https://oklabflensburg.de${path}</loc>`)
    if (`/en/${translationKey}` !== en) expect(translationRedirect(groups, `/en/${translationKey}`)).toBe(en)
  })

  it('localizes every route family while preserving content slugs, queries and fragments', () => {
    expect(localizedPath('/projekte/own-slug', 'da')).toBe('/da/projekter/own-slug')
    expect(localizedPath('/ueber-uns', 'en')).toBe('/en/about')
    expect(localizedPath('/mitmachen', 'da')).toBe('/da/deltag')
    expect(localizedPath('/veranstaltungen', 'en')).toBe('/en/events')
    expect(localizedPath('/blog/article?tag=Open%20Data#section', 'en')).toBe('/en/blog/article?tag=Open%20Data#section')
    expect(localizedPath('/datenschutz', 'de')).toBe('/datenschutz')
    expect(() => localizedPath('/projekte', 'fr')).toThrow('Unsupported locale')
  })

  it('groups identical and different slugs by resource kind and stable identity', () => {
    const groups = translationGroups({ ...empty,
      projects: [record('de', 'karte'), record('en', 'map'), record('da', 'kort')],
      blog: [record('de', 'same'), record('en', 'same')],
    })
    expect(findTranslationGroup(groups, '/projekte/karte')?.variants.map((item) => item.path)).toEqual([
      '/projekte/karte', '/en/projects/map', '/da/projekter/kort',
    ])
    expect(findTranslationGroup(groups, '/en/blog/same')?.id).toBe('blog:map')
    expect(findTranslationGroup(groups, '/en/projects/map')?.id).toBe('projects:map')
  })

  it('omits absent and non-indexable variants without inventing a default language', () => {
    const groups = translationGroups({ ...empty,
      projects: [record('en', 'map')],
      pages: [{ locale: 'de', translationKey: 'ueber-uns' }, { locale: 'da', translationKey: 'ueber-uns', noindex: true }],
    })
    expect(alternateLinks(findTranslationGroup(groups, '/en/projects/map')).map((item) => item.hreflang)).toEqual(['en-GB'])
    expect(alternateLinks(findTranslationGroup(groups, '/ueber-uns')).map((item) => item.href)).toEqual(['https://oklabflensburg.de/ueber-uns'])
    const xml = sitemapXml(groups)
    expect(xml).not.toContain('x-default')
    expect(xml).not.toContain('/da/om-os')
    expect(xml).not.toContain('/en/about')
    expect(xml).not.toContain('/projekte/map')
  })

  it('redirects old prefixes and explicitly recorded slugs in one step', () => {
    const groups = translationGroups({ ...empty, projects: [record('en', 'playground-map', { aliases: ['spielplatzkarte'] })] })
    expect(translationRedirect(groups, '/en/projekte/spielplatzkarte')).toBe('/en/projects/playground-map')
    expect(translationRedirect(groups, '/en/projects/spielplatzkarte')).toBe('/en/projects/playground-map')
    expect(translationRedirect(groups, '/en/projects/playground-map')).toBeUndefined()
    expect(translationRedirect(groups, '/da/projekte/spielplatzkarte')).toBeUndefined()
  })

  it('rejects ambiguous identities, URLs and aliases', () => {
    expect(() => translationGroups({ ...empty, projects: [record('de', 'one'), record('de', 'two')] })).toThrow('Duplicate')
    expect(() => translationGroups({ ...empty, projects: [record('de', 'one'), record('de', 'two', { translationKey: 'another', aliases: ['one'] })] })).toThrow('Alias shadows')
    expect(schemas.projects.shape.translationKey.safeParse('invalid key').success).toBe(false)
    expect(schemas.blog.shape.translationKey.safeParse(undefined).success).toBe(false)
    expect(schemas.pages.shape.translationKey.safeParse('about-us').success).toBe(true)
  })

  it('serializes reciprocal XML alternates with escaped URLs', () => {
    const groups = translationGroups({ ...empty, blog: [record('de', 'bericht'), record('en', 'report')] })
    const xml = sitemapXml(groups)
    expect(xml).toContain('<loc>https://oklabflensburg.de/en/blog/report</loc>')
    expect(xml.match(/hreflang="en-GB" href="https:\/\/oklabflensburg.de\/en\/blog\/report"/g)).toHaveLength(2)
    expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"')
    const escaped = sitemapXml([{ id: 'test', variants: [{ locale: 'de', path: '/?a=1&b=2', aliases: [], indexable: true }] }])
    expect(escaped).toContain('?a=1&amp;b=2')
    expect(escaped).not.toContain('?a=1&b=2')
  })
})
