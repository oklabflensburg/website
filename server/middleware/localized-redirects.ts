import { publicTranslations } from '../utils/translations'
import { translationRedirect } from '#shared/utils/translations'

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  // Ignore assets, APIs and unrelated endpoints. Only public page routes migrate.
  if (!/^\/(?:da|en)(?:\/|$)|^\/(?:projekte|blog)\//.test(url.pathname) || /\.[a-z0-9]+$/i.test(url.pathname)) return
  const target = translationRedirect(await publicTranslations(event), url.pathname)
  if (target) return sendRedirect(event, target + url.search, 301)
})
