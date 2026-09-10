import { site } from '#shared/config/site'
export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`
})
