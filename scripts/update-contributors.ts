import { readFile, rename, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { Contributor } from '../app/types/content'
import { aggregateContributors, type CommitAuthor } from './contributor-utils'

interface Config {
  repositories: string[]
  exclude: string[]
  manual: Contributor[]
  featured: string[]
  areasByRepository: Record<string, string[]>
}

interface GitHubCommit {
  author: { login: string; avatar_url: string; html_url: string } | null
}

interface GitHubProfile {
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

async function update() {
  const authors: CommitAuthor[] = []
  for (const repository of config.repositories) {
    const commits = await github<GitHubCommit[]>(`/repos/oklabflensburg/${repository}/commits?since=${cutoff.toISOString()}&per_page=100`)
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
  for (const contributor of generated) {
    const profile = await github<GitHubProfile>(`/users/${contributor.login}`)
    if (profile.name) contributor.name = profile.name
    contributor.featured = config.featured.some(login => login.toLowerCase() === contributor.login.toLowerCase())
    contributor.areas = [...new Set(contributor.repositories.flatMap(repository => config.areasByRepository[repository] ?? []))].slice(0, 5)
  }

  const merged = new Map(generated.map(item => [item.login.toLowerCase(), item]))
  for (const manual of config.manual) merged.set(manual.login.toLowerCase(), manual)
  const result = [...merged.values()].sort((a, b) =>
    Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.login.localeCompare(b.login),
  )
  if (!result.length) throw new Error('GitHub returned no eligible contributors; keeping the existing file')

  const temporaryPath = `${outputPath}.tmp`
  await writeFile(temporaryPath, `${JSON.stringify(result, null, 2)}\n`, { mode: 0o644 })
  await rename(temporaryPath, outputPath)
  console.log(`Updated ${result.length} public contributors from ${config.repositories.length} repositories.`)
}

update().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : 'Contributor update failed')
  console.error('The last valid local contributor file was left unchanged.')
  process.exitCode = 1
})
