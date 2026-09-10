import { defineCollection, defineContentConfig } from '@nuxt/content'
import { schemas } from './shared/config/content'
export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: '*/projects/*.md',
      schema: schemas.projects,
    }),
    blog: defineCollection({
      type: 'page',
      source: '*/blog/*.md',
      schema: schemas.blog,
    }),
    pages: defineCollection({
      type: 'page',
      source: '*/pages/*.md',
      schema: schemas.pages,
    }),
    events: defineCollection({
      type: 'data',
      source: '*/events/*.yml',
      schema: schemas.events,
    }),
    team: defineCollection({
      type: 'data',
      source: 'team/*.yml',
      schema: schemas.team,
    }),
  },
})
