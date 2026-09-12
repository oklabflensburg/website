import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'
import { translationGroups, type TranslationGroup } from '../../shared/utils/translations'

let cache: { day: string, promise: Promise<TranslationGroup[]> } | undefined

export function publicTranslations(event: H3Event) {
  // Content changes with deployments; UTC publication dates can change while a
  // process is running. Keep one entry, and share in-flight work across consumers.
  const day = new Date().toISOString().slice(0, 10)
  if (import.meta.dev) return loadTranslations(event, day)
  if (cache?.day === day) return cache.promise
  const entry = { day, promise: loadTranslations(event, day) }
  cache = entry
  entry.promise.catch(() => {
    // A failed older request must not evict a newer day's successful entry.
    if (cache === entry) cache = undefined
  })
  return entry.promise
}

async function loadTranslations(event: H3Event, day: string) {
  const [projects, blog, pages] = await Promise.all([
    queryCollection(event, 'projects').select('locale', 'slug', 'translationKey', 'aliases').all(),
    queryCollection(event, 'blog').where('draft', '=', false)
      .where('date', '<=', day)
      .select('locale', 'slug', 'translationKey', 'aliases').all(),
    queryCollection(event, 'pages').select('locale', 'translationKey', 'noindex').all(),
  ])
  return translationGroups({ projects, blog, pages })
}
