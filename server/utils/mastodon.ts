import { parseFragment, type DefaultTreeAdapterTypes } from 'parse5'
import { z } from 'zod'
import type { MastodonPost } from '../../shared/types/mastodon'

const statusSchema = z.object({
  id: z.string().regex(/^\d+$/),
  url: z.url().refine((value) => {
    const url = new URL(value)
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password
  }),
  created_at: z.iso.datetime({ offset: true }),
  content: z.string().max(100_000),
  spoiler_text: z.string().max(10_000),
  sensitive: z.boolean(),
  language: z.string().regex(/^[a-z]{2,3}(?:-[a-zA-Z0-9]{2,8})*$/).nullish(),
  visibility: z.literal('public'),
  in_reply_to_id: z.null(),
  in_reply_to_account_id: z.null(),
  reblog: z.null(),
})

// Parse HTML, then extract text only. No upstream markup or attributes are
// serialized. Vue interpolation escapes even entity-encoded markup as text.
export function mastodonPlainText(html: string): string {
  function text(node: DefaultTreeAdapterTypes.Node): string {
    if ('value' in node) return node.value
    if ('tagName' in node && ['script', 'style', 'iframe', 'object', 'template', 'svg', 'math'].includes(node.tagName)) return ''
    if ('tagName' in node && node.tagName === 'br') return '\n'
    const children = 'childNodes' in node ? node.childNodes.map(text).join('') : ''
    return 'tagName' in node && ['p', 'div', 'li', 'blockquote'].includes(node.tagName) ? children + '\n\n' : children
  }
  return text(parseFragment(html)).replace(/[\t\r ]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').trim()
}

export function mapMastodonPosts(value: unknown): MastodonPost[] {
  if (!Array.isArray(value)) return []
  const seen = new Set<string>()
  return value.flatMap((item): MastodonPost[] => {
    const parsed = statusSchema.safeParse(item)
    if (!parsed.success || seen.has(parsed.data.id)) return []
    const status = parsed.data
    seen.add(status.id)
    return [{
      id: status.id,
      url: status.url,
      createdAt: status.created_at,
      contentText: mastodonPlainText(status.content),
      spoilerText: mastodonPlainText(status.spoiler_text),
      sensitive: status.sensitive,
      ...(status.language ? { language: status.language } : {}),
    }]
  }).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 3)
}

export interface MastodonConfig {
  profileUrl: string
  baseUrl?: string
  accountId?: string
}

// One instance per Nitro process, shared across locales. Coalesce refreshes,
// retain the last successful response and back off after failures, including
// failures on a cold cache. No visitor/request data enters this cache.
export function createMastodonFeed(config: MastodonConfig, fetcher: typeof fetch = fetch) {
  let posts: MastodonPost[] = []
  let accountId = config.accountId || ''
  let refreshAfter = 0
  let pending: Promise<MastodonPost[]> | undefined

  async function refresh() {
    try {
      const profile = new URL(config.profileUrl)
      const base = new URL(config.baseUrl || profile.origin)
      if (!['https:', 'http:'].includes(base.protocol)) throw new Error('Invalid API origin')
      // A single deadline covers both lookup and statuses; no automatic retries.
      const signal = AbortSignal.timeout(2000)
      async function get(path: string) {
        const response = await fetcher(new URL(path, base), { signal, headers: { Accept: 'application/json' }, redirect: 'error' })
        if (!response.ok) throw new Error('Mastodon request failed')
        return response.json() as Promise<unknown>
      }
      if (!accountId) {
        const handle = profile.pathname.match(/^\/@([^/]+)\/?$/)?.[1]
        if (!handle) throw new Error('Invalid profile URL')
        const account = z.object({ id: z.string().regex(/^\d+$/) }).parse(await get(`/api/v1/accounts/lookup?acct=${encodeURIComponent(handle)}`))
        accountId = account.id
      }
      if (!/^\d+$/.test(accountId)) throw new Error('Invalid account ID')
      const response = await get(`/api/v1/accounts/${accountId}/statuses?limit=10&exclude_replies=true&exclude_reblogs=true`)
      if (!Array.isArray(response)) throw new Error('Invalid statuses response')
      posts = mapMastodonPosts(response)
      refreshAfter = Date.now() + 10 * 60_000
    } catch {
      refreshAfter = Date.now() + 60_000
    }
    return posts
  }

  return function getPosts(): Promise<MastodonPost[]> {
    if (pending) return pending
    if (Date.now() < refreshAfter) return Promise.resolve(posts)
    pending = refresh().finally(() => { pending = undefined })
    return pending
  }
}
