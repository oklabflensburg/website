import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { parse } from 'yaml'
import { schemas } from '../shared/config/content'
import { locales, editorialSlugs } from '../shared/config/site'

const readContent = (file: string) =>
  parse(readFileSync(file, 'utf8').split('---')[1]!)
describe('canonical content', () => {
  for (const locale of locales) {
    for (const collection of ['projects', 'blog', 'pages'] as const) {
      it(`${locale}/${collection} validates and has unique identities`, () => {
        const dir = `content/${locale}/${collection}`
        const rows = readdirSync(dir)
          .filter((file) => file.endsWith('.md'))
          .map((file) => readContent(`${dir}/${file}`))
        expect(new Set(rows.map((row) => row.slug)).size).toBe(rows.length)
        expect(new Set(rows.map((row) => row.translationKey)).size).toBe(rows.length)
        for (const row of rows) {
          const result = schemas[collection].safeParse(row)
          expect(result.success, JSON.stringify(result)).toBe(true)
          expect(row.locale).toBe(locale)
          if (row.image) expect(existsSync(`public${row.image}`)).toBe(true)
          expect(row.description.length).toBeGreaterThan(20)
        }
      })
    }
    it(`${locale} editorial identities use the route allowlist`, () => {
      for (const file of readdirSync(`content/${locale}/pages`).filter((name) => name.endsWith('.md'))) {
        expect(editorialSlugs).toContain(readContent(`content/${locale}/pages/${file}`).translationKey)
      }
    })
  }
  it('publishes only deliberately approved team profiles', () => {
    for (const file of readdirSync('content/team').filter((file) =>
      file.endsWith('.yml'),
    )) {
      expect(
        schemas.team.safeParse(
          parse(readFileSync(`content/team/${file}`, 'utf8')),
        ).success,
      ).toBe(true)
    }
    expect(schemas.team.safeParse({ name: 'Unapproved' }).success).toBe(false)
  })
  it('keeps project technical facts and source links consistent across translations', () => {
    const projects = locales.flatMap((locale) => readdirSync(`content/${locale}/projects`)
      .filter((file) => file.endsWith('.md'))
      .map((file) => readContent(`content/${locale}/projects/${file}`)))
    for (const project of projects) {
      const variants = projects.filter((item) => item.translationKey === project.translationKey)
      for (const variant of variants) {
        for (const field of ['status', 'categories', 'technologies', 'links', 'source', 'image']) {
          expect(variant[field], `${project.translationKey}: ${field}`).toEqual(project[field])
        }
      }
    }
  })
  it('gives every project a distinct safe SVG signet and translated image descriptions', () => {
    const translations = locales.flatMap((locale) => readdirSync(`content/${locale}/projects`).filter((file) => file.endsWith('.md')).map((file) => readContent(`content/${locale}/projects/${file}`)))
    const projects = [...new Map(translations.map((project) => [project.translationKey, project])).values()]
    const hashes = new Set<string>()
    for (const project of projects) {
      expect(project.image).toBe(`/images/projects/${project.translationKey}.svg`)
      const bytes = readFileSync(`public${project.image}`)
      const svg = bytes.toString('utf8')
      expect(svg).toContain('width="1024" height="1024" viewBox="0 0 128 128"')
      expect(svg).not.toMatch(/<(?:text|image|script|foreignObject|filter)\b|(?:href|style|onload)=/i)
      // The supplied kulturbytes wordmark uses filled paths; the house signets use outlines.
      if (project.translationKey !== 'kulturbytes') expect(svg).toContain('stroke-width="3"')
      expect(svg).toContain('fill="#f3f7fa"')
      hashes.add(createHash('sha256').update(bytes).digest('hex'))
      const descriptions = new Set<string>()
      const variants = translations.filter((item) => item.translationKey === project.translationKey)
      for (const translation of variants) {
        expect(translation.image).toBe(project.image)
        expect(translation.imageAlt.length).toBeGreaterThan(20)
        expect(translation.imageAlt).not.toBe(translation.title)
        descriptions.add(translation.imageAlt)
      }
      expect(descriptions.size).toBe(variants.length)
      expect(schemas.projects.safeParse({ ...project, image: undefined }).success).toBe(false)
      expect(schemas.projects.safeParse({ ...project, imageAlt: '' }).success).toBe(false)
    }
    expect(hashes.size).toBe(projects.length)
    expect(readdirSync('public/images/projects').sort()).toEqual(
      projects.map((project) => `${project.translationKey}.svg`).sort(),
    )
  })
  it('has matching UI translation keys in all languages', () => {
    function keys(value: Record<string, unknown>, prefix = ''): string[] {
      return Object.entries(value)
        .flatMap(([key, child]) =>
          typeof child === 'object' && child !== null
            ? keys(child as Record<string, unknown>, `${prefix}${key}.`)
            : [`${prefix}${key}`],
        )
        .sort()
    }
    const de = JSON.parse(readFileSync('i18n/locales/de.json', 'utf8'))
    for (const locale of ['da', 'en']) {
      expect(
        keys(JSON.parse(readFileSync(`i18n/locales/${locale}.json`, 'utf8'))),
      ).toEqual(keys(de))

    }
  })
})

it('rejects invalid publication dates and event timestamps without a timezone', () => {
  const post = readContent('content/de/blog/erster-beitrag.md')
  expect(schemas.blog.safeParse({ ...post, date: 'not-a-date' }).success).toBe(false)
  expect(schemas.blog.safeParse({ ...post, authors: [] }).success).toBe(false)
  const event = {
    locale: 'de', slug: 'schema-test', title: 'Schema test', description: 'Test fixture, never published',
    kind: 'workshop', start: '2027-01-20T18:00:00+01:00', end: '2027-01-20T21:00:00+01:00',
    location: 'Test venue', address: 'Test address', url: 'https://example.org', status: 'cancelled',
  }
  expect(schemas.events.safeParse(event).success).toBe(true)
  expect(schemas.events.safeParse({ ...event, start: '2027-01-20T18:00:00' }).success).toBe(false)
})
