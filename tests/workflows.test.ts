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

it('keeps GitHub Actions pins eligible for automated dependency updates', () => {
  const config = yaml('.github/dependabot.yml')
  expect(config.version).toBe(2)
  expect(config.updates).toContainEqual({
    'package-ecosystem': 'github-actions', directory: '/', schedule: { interval: 'weekly' },
  })
})
