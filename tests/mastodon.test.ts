import { afterEach, describe, expect, it, vi } from 'vitest'
import { createMastodonFeed, mapMastodonPosts, mastodonPlainText } from '../server/utils/mastodon'
import { mastodonStatus, mastodonStatuses } from './fixtures/mastodon'

const config = { profileUrl: 'https://norden.social/@oklabflensburg' }
const json = (value: unknown) => new Response(JSON.stringify(value), { headers: { 'Content-Type': 'application/json' } })
afterEach(() => vi.useRealTimers())

describe('Mastodon text and minimal DTO', () => {
  it('filters replies, boosts and non-public posts, deduplicates and sorts at most three posts', () => {
    const posts = mapMastodonPosts([...mastodonStatuses].reverse().concat(mastodonStatus(), mastodonStatus('119', { created_at: '2020-01-01T00:00:00Z' })))
    expect(posts.map((post) => post.id)).toEqual(['125', '124', '123'])
    expect(posts[0]).toEqual({ id: '125', url: 'https://norden.social/@oklabflensburg/125', createdAt: '2026-09-03T10:30:00Z', contentText: 'Open data & community.\n\nVisit our project.\nEveryone welcome.', spoilerText: '', sensitive: false, language: 'en' })
    expect(posts[1]).toMatchObject({ spoilerText: 'Discussion of sensitive topics', sensitive: true })
  })
  it.each(['private', 'direct', 'unlisted'])('excludes %s posts', (visibility) => {
    expect(mapMastodonPosts([mastodonStatus('123', { visibility })])).toEqual([])
  })
  it('discards markup, attributes and active subtrees and decodes entities', () => {
    expect(mastodonPlainText('<p onclick="attack()">Hello &amp; &#x1f30d;<br>world</p><iframe>bad</iframe><style>bad</style><svg><text>bad</text></svg><template>bad</template><script>bad</script>')).toBe('Hello & 🌍\nworld')
    expect(mastodonPlainText('<p>&lt;script&gt;literal&lt;/script&gt;</p>')).toBe('<script>literal</script>')
    expect(mastodonPlainText('<p>Unclosed <b>text')).toBe('Unclosed text')
  })
  it('handles malformed responses, invalid dates and unsafe URLs without throwing', () => {
    for (const value of [null, {}, 'bad', [null, {}, mastodonStatus('1', { url: 'javascript:alert(1)' }), mastodonStatus('2', { created_at: 'bad' }), mastodonStatus('3', { url: 'https://user:password@example.org/' })]]) expect(mapMastodonPosts(value)).toEqual([])
  })
})

describe('server feed cache and resilience', () => {
  it('coalesces requests, caches the lookup and refreshes statuses after ten minutes', async () => {
    vi.useFakeTimers()
    const fetcher = vi.fn<typeof fetch>().mockResolvedValueOnce(json({ id: '42' })).mockImplementation(async () => json(mastodonStatuses))
    const feed = createMastodonFeed(config, fetcher)
    const [first, concurrent] = await Promise.all([feed(), feed()])
    expect(first).toBe(concurrent)
    expect(await feed()).toBe(first)
    expect(fetcher).toHaveBeenCalledTimes(2)
    expect(String(fetcher.mock.calls[0]![0])).toBe('https://norden.social/api/v1/accounts/lookup?acct=oklabflensburg')
    expect(String(fetcher.mock.calls[1]![0])).toContain('/42/statuses?limit=10&exclude_replies=true&exclude_reblogs=true')
    vi.advanceTimersByTime(10 * 60_000)
    await feed()
    expect(fetcher).toHaveBeenCalledTimes(3)
    expect(String(fetcher.mock.calls[2]![0])).toContain('/42/statuses')
  })
  it('uses a configured server-only account ID and API base', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(json([]))
    await createMastodonFeed({ ...config, baseUrl: 'http://127.0.0.1:3200', accountId: '42' }, fetcher)()
    expect(fetcher).toHaveBeenCalledTimes(1)
    expect(String(fetcher.mock.calls[0]![0])).toContain('http://127.0.0.1:3200/api/v1/accounts/42/statuses')
  })
  it('returns stale posts on failure and backs off for a minute before recovery', async () => {
    vi.useFakeTimers()
    const fetcher = vi.fn<typeof fetch>().mockResolvedValueOnce(json(mastodonStatuses)).mockRejectedValueOnce(new Error('DNS failure')).mockResolvedValueOnce(json([]))
    const feed = createMastodonFeed({ ...config, accountId: '42' }, fetcher)
    const first = await feed()
    vi.advanceTimersByTime(10 * 60_000)
    expect(await feed()).toBe(first)
    expect(await feed()).toBe(first)
    expect(fetcher).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(60_000)
    expect(await feed()).toEqual([])
  })
  it.each(['network', 'http', 'shape', 'lookup'])('returns an empty cold fallback for %s failure', async (failure) => {
    const fetcher = vi.fn<typeof fetch>().mockImplementation(async () => {
      if (failure === 'network') throw new Error('unavailable')
      return failure === 'http' ? new Response('', { status: 500 }) : json({ invalid: true })
    })
    const feed = createMastodonFeed({ ...config, accountId: failure === 'lookup' ? '' : '42' }, fetcher)
    expect(await feed()).toEqual([])
    expect(await feed()).toEqual([])
    expect(fetcher).toHaveBeenCalledTimes(1)
  })
  it('aborts a hanging upstream with one short deadline and falls back', async () => {
    const fetcher = vi.fn<typeof fetch>().mockImplementation((_url, options) => new Promise((_resolve, reject) => {
      options!.signal!.addEventListener('abort', () => reject(options!.signal!.reason), { once: true })
    }))
    const start = Date.now()
    expect(await createMastodonFeed(config, fetcher)()).toEqual([])
    expect(Date.now() - start).toBeLessThan(3000)
    expect(fetcher.mock.calls[0]![1]?.signal?.aborted).toBe(true)
  })
})
