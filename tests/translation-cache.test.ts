import type { H3Event } from 'h3'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { alternateLinks, findTranslationGroup, sitemapXml, translationRedirect } from '../shared/utils/translations'

const { queryCollection } = vi.hoisted(() => ({ queryCollection: vi.fn() }))
vi.mock('@nuxt/content/server', () => ({ queryCollection }))

const event = {} as H3Event
const records = {
  projects: [{ locale: 'en', translationKey: 'map', slug: 'map', aliases: ['karte'] }],
  blog: [
    { locale: 'en', translationKey: 'published', slug: 'published', draft: false, date: '2026-09-12' },
    { locale: 'de', translationKey: 'draft', slug: 'draft', draft: true, date: '2026-09-12' },
    { locale: 'en', translationKey: 'scheduled', slug: 'scheduled', draft: false, date: '2026-09-13' },
  ],
  pages: [{ locale: 'en', translationKey: 'impressum', noindex: true }],
}

beforeEach(() => {
  vi.resetModules()
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-09-12T23:59:59Z'))
  queryCollection.mockReset().mockImplementation((_event, collection: keyof typeof records) => {
    let rows: Record<string, unknown>[] = records[collection]
    const query = {
      where: (key: string, operator: string, value: string | boolean) => {
        rows = rows.filter((row) => operator === '=' ? row[key] === value : String(row[key]) <= String(value))
        return query
      },
      select: () => query,
      all: async () => rows,
    }
    return query
  })
})
afterEach(() => { vi.useRealTimers() })

describe('shared server translation cache', () => {
  it('coalesces concurrent and consecutive consumers without caching request URLs', async () => {
    const { publicTranslations } = await import('../server/utils/translations')
    const [api, redirects] = await Promise.all([publicTranslations(event), publicTranslations({} as H3Event)])
    const sitemap = await publicTranslations({} as H3Event)
    expect(api).toBe(redirects)
    expect(sitemap).toBe(api)
    expect(queryCollection).toHaveBeenCalledTimes(3)
    expect(translationRedirect(redirects, '/en/projekte/karte')).toBe('/en/projects/map')
    expect(alternateLinks(findTranslationGroup(api, '/en/projects/map')).map((link) => link.hreflang)).toEqual(['en-GB'])
    expect(findTranslationGroup(api, '/en/legal-notice')).toBeDefined()
    const xml = sitemapXml(sitemap)
    expect(xml).toContain('/en/blog/published')
    for (const excluded of ['draft', 'scheduled', 'legal-notice', '/projekte/map']) expect(xml).not.toContain(excluded)
  })

  it('refreshes at UTC midnight so scheduled posts become public without redeployment', async () => {
    const { publicTranslations } = await import('../server/utils/translations')
    const before = await publicTranslations(event)
    vi.setSystemTime(new Date('2026-09-13T00:00:00Z'))
    const after = await publicTranslations(event)
    expect(findTranslationGroup(before, '/en/blog/scheduled')).toBeUndefined()
    expect(findTranslationGroup(after, '/en/blog/scheduled')).toBeDefined()
    expect(findTranslationGroup(after, '/blog/draft')).toBeUndefined()
    expect(queryCollection).toHaveBeenCalledTimes(6)
  })

  it('retries a failed load instead of retaining a rejected promise', async () => {
    queryCollection.mockImplementationOnce(() => { throw new Error('Temporary database failure') })
    const { publicTranslations } = await import('../server/utils/translations')
    await expect(publicTranslations(event)).rejects.toThrow('Temporary database failure')
    await expect(publicTranslations(event)).resolves.toEqual(expect.any(Array))
    expect(queryCollection).toHaveBeenCalledTimes(4)
  })

  it('starts empty in a new server module/process', async () => {
    const first = await import('../server/utils/translations')
    const previous = await first.publicTranslations(event)
    vi.resetModules()
    const next = await import('../server/utils/translations')
    expect(await next.publicTranslations(event)).toEqual(previous)
    expect(queryCollection).toHaveBeenCalledTimes(6)
  })
})
