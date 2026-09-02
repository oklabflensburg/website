import { describe, expect, it } from 'vitest'
import { aggregateContributors, contributorsOrFallback, isBot } from '../scripts/contributor-utils'

const author = (login: string, repository: string) => ({
  login,
  repository,
  avatarUrl: `https://avatars.githubusercontent.com/${login}`,
  profileUrl: `https://github.com/${login}`,
})

describe('contributor generation', () => {
  it('deduplicates contributors by case-insensitive GitHub login', () => {
    const result = aggregateContributors([author('Example', 'one'), author('example', 'two')])
    expect(result).toHaveLength(1)
    expect(result[0]).toMatchObject({ contributions: 2, repositories: ['one', 'two'] })
  })

  it.each(['dependabot[bot]', 'renovate[bot]', 'github-actions[bot]', 'Copilot'])(
    'excludes automation account %s',
    (login) => expect(isBot(login)).toBe(true),
  )

  it('uses the last valid fallback when generated data is unavailable', () => {
    const fallback = aggregateContributors([author('human', 'project')])
    expect(contributorsOrFallback(undefined, fallback)).toEqual(fallback)
  })
})
