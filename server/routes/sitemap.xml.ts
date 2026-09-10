import { queryCollection } from '@nuxt/content/server'
import { locales, localizedPath, site, staticPaths } from '#shared/config/site'
import { escapeXml } from '#shared/utils/xml'

export default defineEventHandler(async (event) => {
  const [projects, posts, pages] = await Promise.all([
    queryCollection(event, 'projects').select('slug', 'locale').all(),
    queryCollection(event, 'blog')
      .where('draft', '=', false)
      .where('date', '<=', new Date().toISOString().slice(0, 10))
      .select('slug', 'locale')
      .all(),
    queryCollection(event, 'pages')
      .where('noindex', '=', true)
      .select('slug', 'locale')
      .all(),
  ])
  const paths = new Map<string, Set<string>>()
  function add(path: string, locale: string) {
    if (!paths.has(path)) paths.set(path, new Set())
    paths.get(path)!.add(locale)
  }
  for (const locale of locales)
    for (const path of staticPaths) {
      if (
        !pages.some(
          (page) => `/${page.slug}` === path && page.locale === locale,
        )
      )
        add(path, locale)
    }
  for (const project of projects)
    add(`/projekte/${project.slug}`, project.locale)
  for (const post of posts) add(`/blog/${post.slug}`, post.locale)
  const urls = [...paths]
    .flatMap(([path, languages]) =>
      [...languages].map((locale) => {
        const alternates = [...languages]
          .map(
            (language) =>
              `<xhtml:link rel="alternate" hreflang="${language}" href="${escapeXml(site.url + localizedPath(path, language))}"/>`,
          )
          .join('')
        return `<url><loc>${escapeXml(site.url + localizedPath(path, locale))}</loc>${alternates}</url>`
      }),
    )
    .join('')
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`
})
