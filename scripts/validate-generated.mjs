import { readFile, stat } from 'node:fs/promises'
import { resolve } from 'node:path'

const output = resolve('.output/public')
const pages = [
  ['de/index.html', 'lang="de-DE"', 'Hauptnavigation'],
  ['da/index.html', 'lang="da-DK"', 'Hovednavigation'],
  ['en/index.html', 'lang="en-GB"', 'Main navigation'],
  ['de/mitwirkende/index.html', 'lang="de-DE"', 'Mitwirken'],
  ['da/bidragsydere/index.html', 'lang="da-DK"', 'Bidrag'],
  ['en/contributors/index.html', 'lang="en-GB"', 'Contribute'],
]

for (const [file, language, copy] of pages) {
  const html = await readFile(resolve(output, file), 'utf8')
  if (!html.includes(language) || !html.includes(copy)) throw new Error(`Missing localized output in ${file}`)
  if (!html.includes('rel="canonical"') || !html.includes('hreflang="de"') || !html.includes('hreflang="da"') || !html.includes('hreflang="en"')) {
    throw new Error(`Missing SEO language links in ${file}`)
  }
}

const root = await readFile(resolve(output, 'index.html'), 'utf8')
if (!root.includes('url=/de')) throw new Error('Static root redirect to /de is missing')
await stat(resolve(output, 'legacy/impressum.html'))
await stat(resolve(output, 'legacy/lizenz.html'))

console.log(`Validated ${pages.length} localized pages, the root redirect and preserved legal pages.`)
