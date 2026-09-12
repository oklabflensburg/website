import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// Editorial validation only: fenced/inline code and HTML comments can document
// examples intentionally. Replace excluded spans with spaces so removal cannot
// assemble new markup/tokens. Frontmatter stays included because titles render too.
function publicationPlaceholders(markdown: string) {
  const prose = markdown
    .replace(/^ {0,3}(`{3,}|~{3,})[^\n]*\n[\s\S]*?^ {0,3}\1[ \t]*$/gm, ' ')
    .replace(/<!--[^]*?--!?>/g, ' ')
    .replace(/(`+)[^]*?\1/g, ' ')
  return prose.match(/\b(?:TODO|TBD|placeholder|changeme|replace-me)\b|\{\{[^}]+\}\}|\$\{[^}]+\}|<%[^]*?%>|\[(?:insert|replace)[^\]]*\]/gi) ?? []
}

function markdownFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? markdownFiles(path) : entry.name.endsWith('.md') ? [path] : []
  })
}

describe('publication-facing Markdown', () => {
  it.each(markdownFiles('content'))('%s contains no editorial placeholders', (path) => {
    expect(publicationPlaceholders(readFileSync(path, 'utf8'))).toEqual([])
  })

  it.each(['TODO: confirm board', 'TBD', 'Placeholder', 'changeme', 'replace-me', '{{name}}', '${NAME}', '<%= name %>', '[insert name]'])('rejects %s in prose', (text) => {
    expect(publicationPlaceholders(text)).not.toEqual([])
  })

  it('keeps excluded examples separated from adjacent prose', () => {
    expect(publicationPlaceholders('TO`example`DO and TB<!-- note -->D and <!-- TODO --!>')).toEqual([])
  })

  it('allows documented code examples and ignores comments without hiding later prose', () => {
    expect(publicationPlaceholders('```ts\n// TODO example\n```\n~~~yaml\nname: TBD\n~~~\nUse `{{name}}`.\n<!-- TODO internal -->')).toEqual([])
    expect(publicationPlaceholders('```ts\n// TODO example\n```\nTODO: publish')).toEqual(['TODO'])
    expect(publicationPlaceholders('Mastodon and OpenStreetMap')).toEqual([])
  })
})
