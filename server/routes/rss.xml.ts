import { queryCollection } from '@nuxt/content/server'
import { locales, localizedPath, site } from '#shared/config/site'
import { escapeXml } from '#shared/utils/xml'

export default defineEventHandler(async (event) => {
  const requested = getQuery(event).lang ?? 'de'
  if (!locales.some((locale) => locale === requested))
    throw createError({
      statusCode: 400,
      statusMessage: 'Unsupported language',
    })
  const locale = String(requested)
  const posts = await queryCollection(event, 'blog')
    .where('locale', '=', locale)
    .where('draft', '=', false)
    .where('date', '<=', new Date().toISOString().slice(0, 10))
    .order('date', 'DESC')
    .all()
  const items = posts
    .map((post) => {
      const url = escapeXml(
        `${site.url}${localizedPath(`/blog/${post.slug}`, locale)}`,
      )
      return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(post.description)}</description><pubDate>${new Date(post.date).toUTCString()}</pubDate>${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('')}</item>`
    })
    .join('')
  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${site.name}</title><link>${site.url}${localizedPath('/blog', locale)}</link><description>${site.name} Blog</description><language>${locale}</language><atom:link href="${site.url}/rss.xml?lang=${locale}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`
})
