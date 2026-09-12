import { editorialSlugs, locales, localeLanguages, localizedPath, routePaths, site, type SiteLocale } from '../config/site'
import { escapeXml } from './xml'

export interface TranslationRecord {
  translationKey: string
  locale: string
  noindex?: boolean
}
export interface DetailTranslationRecord extends TranslationRecord {
  slug: string
  aliases?: string[]
}
export interface TranslationContent {
  projects: DetailTranslationRecord[]
  blog: DetailTranslationRecord[]
  pages: TranslationRecord[]
}
export interface TranslationVariant {
  locale: SiteLocale
  path: string
  aliases: string[]
  indexable: boolean
}
export interface TranslationGroup {
  id: string
  variants: TranslationVariant[]
}

// This is a derived view of Content, never an independently maintained source.
export function translationGroups(content: TranslationContent): TranslationGroup[] {
  const groups = new Map<string, TranslationGroup>()
  const paths = new Set<string>()
  function add(id: string, variant: TranslationVariant) {
    const group = groups.get(id) ?? { id, variants: [] }
    if (group.variants.some((item) => item.locale === variant.locale) || paths.has(variant.path)) {
      throw new Error(`Duplicate translation identity or URL: ${id}/${variant.locale}`)
    }
    paths.add(variant.path)
    group.variants.push(variant)
    groups.set(id, group)
  }
  for (const key of ['index', 'projekte', 'blog'] as const) {
    for (const locale of locales) {
      const path = localizedPath(routePaths[key].de, locale)
      const old = locale === 'de' ? path : `/${locale}${routePaths[key].de === '/' ? '' : routePaths[key].de}`
      add(`static:${key}`, { locale, path, aliases: old === path ? [] : [old], indexable: true })
    }
  }
  for (const record of [
    ...content.projects.map((record) => ({ ...record, kind: 'projects' as const })),
    ...content.blog.map((record) => ({ ...record, kind: 'blog' as const })),
    ...content.pages.map((record) => ({ ...record, kind: 'pages' as const })),
  ]) {
    if (!locales.includes(record.locale as SiteLocale)) throw new Error(`Invalid locale: ${record.locale}`)
    const locale = record.locale as SiteLocale
    if (record.kind === 'pages' && !editorialSlugs.includes(record.translationKey as typeof editorialSlugs[number])) {
      throw new Error(`Unknown editorial identity: ${record.translationKey}`)
    }
    const logicalPath = record.kind === 'pages' ? `/${record.translationKey}` : `/${record.kind === 'projects' ? 'projekte' : 'blog'}/${record.slug}`
    const path = localizedPath(logicalPath, locale)
    const aliases = new Set<string>()
    const previous = record.kind === 'pages' ? [record.translationKey] : [record.slug, ...record.aliases ?? []]
    for (const slug of previous) {
      const old = record.kind === 'pages' ? `/${slug}` : `/${record.kind === 'projects' ? 'projekte' : 'blog'}/${slug}`
      aliases.add(locale === 'de' ? old : `/${locale}${old}`)
      aliases.add(localizedPath(old, locale))
    }
    aliases.delete(path)
    add(`${record.kind}:${record.translationKey}`, { locale, path, aliases: [...aliases], indexable: !record.noindex })
  }
  for (const group of groups.values()) {
    for (const variant of group.variants) {
      for (const alias of variant.aliases) {
        if (paths.has(alias)) throw new Error(`Alias shadows canonical URL: ${alias}`)
        paths.add(alias)
      }
    }
  }
  return [...groups.values()]
}

export function findTranslationGroup(groups: TranslationGroup[], path: string) {
  return groups.find((group) => group.variants.some((item) => item.path === path))
}

export function translationRedirect(groups: TranslationGroup[], path: string) {
  return groups.flatMap((group) => group.variants).find((variant) => variant.aliases.includes(path))?.path
}

export function alternateLinks(group?: TranslationGroup) {
  return group?.variants.filter((variant) => variant.indexable).map((variant) => ({
    rel: 'alternate' as const, hreflang: localeLanguages[variant.locale], href: new URL(variant.path, site.url).href,
  })) ?? []
}

export function sitemapXml(groups: TranslationGroup[]) {
  const urls = groups.flatMap((group) => {
    const alternates = alternateLinks(group).map((link) =>
      `<xhtml:link rel="alternate" hreflang="${link.hreflang}" href="${escapeXml(link.href)}"/>`,
    ).join('')
    return group.variants.filter((variant) => variant.indexable).map((variant) =>
      `<url><loc>${escapeXml(new URL(variant.path, site.url).href)}</loc>${alternates}</url>`,
    )
  }).join('')
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`
}
