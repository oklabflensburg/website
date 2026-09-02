import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { projects } from '../app/data/projects'

const root = resolve(import.meta.dirname, '..')
const config = readFileSync(resolve(root, 'nuxt.config.ts'), 'utf8')
const header = readFileSync(resolve(root, 'app/components/AppHeader.vue'), 'utf8')
const switcher = readFileSync(resolve(root, 'app/components/LanguageSwitcher.vue'), 'utf8')
const locales = Object.fromEntries(['de', 'da', 'en'].map(code => [code, JSON.parse(readFileSync(resolve(root, `i18n/locales/${code}.json`), 'utf8'))]))

function componentSources(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = resolve(directory, entry.name)
    return entry.isDirectory() ? componentSources(path) : entry.name.endsWith('.vue') ? [readFileSync(path, 'utf8')] : []
  })
}

describe('localized static site', () => {
  it('generates all language roots and localized contributor pages', () => {
    for (const route of ['/de', '/da', '/en', '/de/mitwirkende', '/da/bidragsydere', '/en/contributors']) {
      expect(config).toContain(`'${route}'`)
    }
  })

  it('redirects the root to German on the server', () => {
    expect(config).toContain("'/': { redirect: { to: '/de', statusCode: 301 } }")
  })

  it('keeps the current subpage when switching locale and stores the preference', () => {
    expect(switcher).toContain('useSwitchLocalePath')
    expect(switcher).toContain('switchLocalePath(code)')
    expect(switcher).toContain("useCookie<string>('oklab_locale'")
  })

  it('fully translates the main navigation', () => {
    const keys = ['projects', 'technologies', 'contributors', 'tasks', 'join', 'about']
    for (const locale of Object.values(locales)) {
      expect(Object.keys(locale.nav)).toEqual(expect.arrayContaining(keys))
      for (const key of keys) expect(locale.nav[key]).toBeTruthy()
    }
  })

  it('provides an accessible mobile menu', () => {
    expect(header).toContain('aria-expanded')
    expect(header).toContain('aria-controls="mobile-navigation"')
    expect(header).toContain("menuOpen = !menuOpen")
  })

  it('contains every required project exactly once and no placeholder URLs', () => {
    expect(new Set(projects.map(project => project.slug)).size).toBe(projects.length)
    expect(projects).toHaveLength(19)
    for (const project of projects) {
      expect(project.websiteUrl).not.toBe('#')
      expect(project.repositoryUrl).not.toBe('#')
    }
    expect(componentSources(resolve(root, 'app')).join('\n')).not.toMatch(/href=["']#["']/)
  })
})
