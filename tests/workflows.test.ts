import { readFileSync, readdirSync } from 'node:fs'
import { expect, it } from 'vitest'
import { parseDocument } from 'yaml'

function yaml(path: string) {
  const document = parseDocument(readFileSync(path, 'utf8'), { uniqueKeys: true })
  expect(document.errors, path).toEqual([])
  return document.toJS()
}

it('pins every workflow action to a full commit SHA with a release comment', () => {
  const files = readdirSync('.github/workflows').filter((file) => /\.ya?ml$/.test(file))
  expect(files.length).toBeGreaterThan(0)
  for (const file of files) {
    const path = `.github/workflows/${file}`
    const source = readFileSync(path, 'utf8')
    function check(value: unknown) {
      if (!value || typeof value !== 'object') return
      for (const [key, child] of Object.entries(value)) {
        if (key === 'uses') {
          expect(child, path).toMatch(/^[\w.-]+\/[\w./-]+@[a-f0-9]{40}$/)
          expect(source.split('\n').some((line) => line.includes(`uses: ${child} # `) && /# v\d+\.\d+\.\d+\s*$/.test(line)), `${path}: release comment for ${child}`).toBe(true)
        } else check(child)
      }
    }
    check(yaml(path))
  }
})

it('uses the same CodeQL release for initialization and analysis', () => {
  const workflow = yaml('.github/workflows/codeql.yml')
  const steps = workflow.jobs.analyze.steps as { uses?: string }[]
  const init = steps.find((step) => step.uses?.startsWith('github/codeql-action/init@'))?.uses
  const analyze = steps.find((step) => step.uses?.startsWith('github/codeql-action/analyze@'))?.uses
  expect(init).toBeDefined()
  expect(analyze).toBeDefined()
  expect(analyze?.split('@')[1]).toBe(init?.split('@')[1])
})

it('keeps GitHub Actions pins eligible for automated dependency updates', () => {
  const config = yaml('.github/dependabot.yml')
  expect(config.version).toBe(2)
  expect(config.updates).toContainEqual({
    'package-ecosystem': 'github-actions', directory: '/', schedule: { interval: 'weekly' },
    groups: { codeql: { patterns: ['github/codeql-action/*'] } },
  })
})
