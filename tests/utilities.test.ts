import { describe, expect, it } from 'vitest'
import { paginate } from '../shared/utils/pagination'
import { nextMeeting } from '../shared/utils/meeting'
import { escapeXml } from '../shared/utils/xml'
import { localizedPath } from '../shared/config/site'

describe('pagination', () => {
  const items = Array.from({ length: 14 }, (_, i) => i)
  it('slices distinct pages and clamps out-of-range requests', () => {
    expect(paginate(items, '2').items).toEqual([6, 7, 8, 9, 10, 11])
    expect(paginate(items, '999').items).toEqual([12, 13])
    for (const value of ['-1', '1.5', 'oops', ['2'], '999999999999999999999'])
      expect(paginate(items, value).page).toBe(1)
  })
  it('handles empty and invalid inputs', () => {
    expect(paginate([], '2')).toEqual({ items: [], page: 1, totalPages: 1 })
    expect(() => paginate(items, '1', 0)).toThrow(RangeError)
  })
})
describe('regular Berlin meetup', () => {
  it('uses summer time and keeps a meeting that is in progress', () => {
    expect(nextMeeting(new Date('2026-09-09T17:00:00Z'))).toEqual({
      start: '2026-09-09T16:00:00.000Z',
      end: '2026-09-09T19:00:00.000Z',
    })
  })
  it('advances at closing time and handles winter time', () => {
    expect(nextMeeting(new Date('2026-09-09T19:00:00Z')).start).toBe(
      '2026-09-16T16:00:00.000Z',
    )
    expect(nextMeeting(new Date('2026-12-01T12:00:00Z')).start).toBe(
      '2026-12-02T17:00:00.000Z',
    )
  })
  it('handles daylight-saving changes and local midnight', () => {
    expect(nextMeeting(new Date('2026-03-28T12:00:00Z')).start).toBe(
      '2026-04-01T16:00:00.000Z',
    )
    expect(nextMeeting(new Date('2026-10-24T12:00:00Z')).start).toBe(
      '2026-10-28T17:00:00.000Z',
    )
    expect(nextMeeting(new Date('2026-09-08T23:30:00Z')).start).toBe(
      '2026-09-09T16:00:00.000Z',
    )
  })
})
it('escapes content in RSS and sitemap XML', () => {
  expect(escapeXml(`A&B <C> "D" 'E'`)).toBe(
    'A&amp;B &lt;C&gt; &quot;D&quot; &apos;E&apos;',
  )
})
it('uses the canonical prefix strategy', () => {
  expect(localizedPath('/', 'de')).toBe('/')
  expect(localizedPath('/', 'da')).toBe('/da')
  expect(localizedPath('/projekte/a', 'en')).toBe('/en/projekte/a')
})
