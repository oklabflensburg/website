import { z } from 'zod'
const localeIdentity = {
  locale: z.enum(['de', 'da', 'en']),
}
const slugIdentity = {
  ...localeIdentity,
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
}
const editorial = {
  ...localeIdentity,
  translationKey: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  description: z.string().min(20),
}
export const schemas = {
  projects: z.object({
    ...editorial,
    ...slugIdentity,
    aliases: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).default([]),
    status: z.enum([
      'development',
      'seeking-contributors',
      'completed',
      'unknown',
    ]),
    featured: z.boolean().default(false),
    featuredOrder: z.number().int().min(0).default(0),
    categories: z.array(z.string()).min(1),
    technologies: z.array(z.string()),
    image: z.string().regex(/^\/images\/projects\/[a-z0-9]+(?:-[a-z0-9]+)*\.svg$/),
    imageAlt: z.string().min(20),
    links: z.object({
      website: z.string().url().optional(),
      github: z.string().url().optional(),
    }),
    source: z.string().url(),
  }),
  blog: z.object({
    ...editorial,
    ...slugIdentity,
    aliases: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).default([]),
    date: z.iso.date(),
    updated: z.iso.date().optional(),
    authors: z.array(z.string()).min(1),
    tags: z.array(z.string()),
    image: z.string().optional(),
    draft: z.boolean().default(true),
  }),
  pages: z.object({ ...editorial, noindex: z.boolean().default(false) }),
  events: z.object({
    ...slugIdentity,
    title: z.string(),
    description: z.string(),
    kind: z.enum([
      'meetup',
      'open-data-day',
      'workshop',
      'talk',
      'hackathon',
      'community',
    ]),
    start: z.string().datetime({ offset: true }),
    end: z.string().datetime({ offset: true }),
    location: z.string(),
    address: z.string(),
    url: z.string().url(),
    registrationUrl: z.string().url().optional(),
    status: z.enum(['scheduled', 'cancelled', 'postponed']),
  }),
  team: z.object({
    name: z.string(),
    github: z.string().url().optional(),
    avatar: z.string().optional(),
    role: z.object({ de: z.string(), da: z.string(), en: z.string() }),
    bio: z.object({ de: z.string(), da: z.string(), en: z.string() }),
    links: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
    consent: z.literal(true),
  }),
}
