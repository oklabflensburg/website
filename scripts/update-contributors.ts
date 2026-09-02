import { readFile, rename, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { Contributor } from '../app/types/content'
import { aggregateContributors, type CommitAuthor } from './contributor-utils'

interface Config {
  organization: string
  repositories: string[]
  exclude: string[]
  manual: Contributor[]
  featured: string[]
  areasByRepository: Record<string, string[]>
}

interface GitHubCommit {
  author: GitHubUser | null
}

interface GitHubUser {
  login: string
  avatar_url: string
  html_url: string
}

interface GitHubProfile extends GitHubUser {
  name: string | null
}

const root = resolve(import.meta.dirname, '..')
const outputPath = resolve(root, 'app/data/contributors.json')
const config: Config = JSON.parse(await readFile(resolve(root, 'contributors.config.json'), 'utf8'))
const token = process.env.GITHUB_TOKEN
const headers: HeadersInit = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'oklabflensburg-website-contributor-generator',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
}
const cutoff = new Date()
cutoff.setUTCFullYear(cutoff.getUTCFullYear() - 2)

async function github<T>(path: string): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, { headers })
  if (!response.ok) throw new Error(`GitHub API request failed (${response.status}) for ${path}`)
  return response.json() as Promise<T>
}

async function githubPages<T>(path: string): Promise<T[]> {
  const items: T[] = []
  for (let page = 1; ; page += 1) {
    const separator = path.includes('?') ? '&' : '?'
    const result = await github<T[]>(`${path}${separator}per_page=100&page=${page}`)
    items.push(...result)
    if (result.length < 100) return items
  }
}

async function update() {
  const authors: CommitAuthor[] = []
  for (const repository of config.repositories) {
    const commits = await githubPages<GitHubCommit>(
      `/repos/${config.organization}/${repository}/commits?since=${cutoff.toISOString()}`,
    )
    for (const commit of commits) {
      if (!commit.author) continue
      authors.push({
        login: commit.author.login,
        avatarUrl: commit.author.avatar_url,
        profileUrl: commit.author.html_url,
        repository,
      })
    }
  }

  const generated = aggregateContributors(authors, config.exclude)
  const merged = new Map(generated.map(item => [item.login.toLowerCase(), item]))
  const publicMembers = await githubPages<GitHubUser>(`/orgs/${config.organization}/public_members`)

  for (const member of publicMembers) {
    const key = member.login.toLowerCase()
    const existing = merged.get(key) ?? {
      login: member.login,
      avatarUrl: member.avatar_url,
      profileUrl: member.html_url,
      contributions: 0,
      repositories: [],
    }
    existing.organizationMember = true
    merged.set(key, existing)
  }

  for (const contributor of merged.values()) {
    const profile = await github<GitHubProfile>(`/users/${contributor.login}`)
    if (profile.name) contributor.name = profile.name
    contributor.featured = config.featured.some(login => login.toLowerCase() === contributor.login.toLowerCase())
    contributor.areas = [...new Set(
      contributor.repositories.flatMap(repository => config.areasByRepository[repository] ?? []),
    )].slice(0, 5)
  }

  for (const manual of config.manual) {
    const key = manual.login.toLowerCase()
    merged.set(key, { ...merged.get(key), ...manual })
  }

  const result = [...merged.values()]
    .filter(contributor => !config.exclude.some(login => login.toLowerCase() === contributor.login.toLowerCase()))
    .sort((a, b) =>
      Number(Boolean(b.featured)) - Number(Boolean(a.featured))
      || Number(Boolean(b.organizationMember)) - Number(Boolean(a.organizationMember))
      || a.login.localeCompare(b.login),
    )

  if (!result.length) throw new Error('GitHub returned no eligible people; keeping the existing file')

  const temporaryPath = `${outputPath}.tmp`
  await writeFile(temporaryPath, `${JSON.stringify(result, null, 2)}\n`, { mode: 0o644 })
  await rename(temporaryPath, outputPath)
  console.log(
    `Updated ${publicMembers.length} public organization members and ${generated.length} recent contributors.`,
  )
}

update().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : 'Contributor update failed')
  console.error('The last valid local contributor file was left unchanged.')
  process.exitCode = 1
})
