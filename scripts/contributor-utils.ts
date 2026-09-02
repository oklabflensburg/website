import type { Contributor } from '../app/types/content'

export interface CommitAuthor {
  login: string
  avatarUrl: string
  profileUrl: string
  repository: string
}

const botPattern = /(?:\[bot\]$|dependabot|renovate|github-actions|copilot)/i

export const isBot = (login: string) => botPattern.test(login)

export const contributorsOrFallback = (value: unknown, fallback: Contributor[] = []): Contributor[] =>
  Array.isArray(value) ? value as Contributor[] : fallback

export function aggregateContributors(
  authors: CommitAuthor[],
  excluded: string[] = [],
): Contributor[] {
  const excludedLogins = new Set(excluded.map(login => login.toLowerCase()))
  const contributors = new Map<string, Contributor>()

  for (const author of authors) {
    const key = author.login.toLowerCase()
    if (isBot(author.login) || excludedLogins.has(key)) continue
    const existing = contributors.get(key)
    if (existing) {
      existing.contributions += 1
      if (!existing.repositories.includes(author.repository)) existing.repositories.push(author.repository)
      continue
    }
    contributors.set(key, {
      login: author.login,
      avatarUrl: author.avatarUrl,
      profileUrl: author.profileUrl,
      contributions: 1,
      repositories: [author.repository],
    })
  }

  return [...contributors.values()]
}
