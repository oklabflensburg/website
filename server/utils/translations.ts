import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'
import { translationGroups } from '#shared/utils/translations'

export async function publicTranslations(event: H3Event) {
  const [projects, blog, pages] = await Promise.all([
    queryCollection(event, 'projects').select('locale', 'slug', 'translationKey', 'aliases').all(),
    queryCollection(event, 'blog').where('draft', '=', false)
      .where('date', '<=', new Date().toISOString().slice(0, 10))
      .select('locale', 'slug', 'translationKey', 'aliases').all(),
    queryCollection(event, 'pages').select('locale', 'slug', 'translationKey', 'noindex').all(),
  ])
  return translationGroups({ projects, blog, pages })
}
