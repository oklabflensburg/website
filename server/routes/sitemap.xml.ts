import { publicTranslations } from '../utils/translations'
import { sitemapXml } from '#shared/utils/translations'

export default defineEventHandler(async (event) => {
  const xml = sitemapXml(await publicTranslations(event))
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
