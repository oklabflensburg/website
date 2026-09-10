import { readFile, readdir, mkdir, writeFile, unlink } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { parse } from 'yaml'
import { site, locales } from '../shared/config/site.ts'

// All derived branding assets read the single, unmodified organisation master.
// Project identities are read directly from canonical Content, not a second list.
const publicDir = fileURLToPath(new URL('../public/', import.meta.url))
const contentDir = fileURLToPath(new URL('../content/', import.meta.url))
const logo = await readFile(`${publicDir}${site.logo}`)
const transparent = { r: 255, g: 255, b: 255, alpha: 0 }
const icon = (size) => sharp(logo).resize(size, size, { fit: 'contain', background: transparent }).png().toBuffer()
for (const [size, path] of [[16, site.favicons.small], [32, site.favicons.medium], [180, site.favicons.apple]]) {
  await writeFile(`${publicDir}${path}`, await icon(size))
}

// ICO directory with PNG frames. No independent artwork or extra source files.
const sizes = [16, 32, 48, 256]
const frames = await Promise.all(sizes.map(icon))
const directory = Buffer.alloc(6 + 16 * sizes.length)
directory.writeUInt16LE(1, 2)
directory.writeUInt16LE(sizes.length, 4)
let offset = directory.length
for (const [index, size] of sizes.entries()) {
  const entry = 6 + index * 16
  directory[entry] = directory[entry + 1] = size === 256 ? 0 : size
  directory.writeUInt16LE(1, entry + 4)
  directory.writeUInt16LE(32, entry + 6)
  directory.writeUInt32LE(frames[index].length, entry + 8)
  directory.writeUInt32LE(offset, entry + 12)
  offset += frames[index].length
}
await writeFile(`${publicDir}${site.favicons.ico}`, Buffer.concat([directory, ...frames]))

const canvas = () => sharp({ create: { width: 1200, height: 630, channels: 4, background: '#ffffff' } })
await canvas().composite([{ input: await icon(420), left: 390, top: 105 }]).png().toFile(`${publicDir}${site.socialImage}`)

const outputDir = `${publicDir}${site.projectSocialImages}`
await mkdir(outputDir, { recursive: true })
const expected = new Set()
const projects = new Map()
for (const locale of locales) {
  for (const file of (await readdir(`${contentDir}/${locale}/projects`)).filter((name) => name.endsWith('.md')).sort()) {
    const project = parse((await readFile(`${contentDir}/${locale}/projects/${file}`, 'utf8')).split('---')[1])
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.translationKey) || project.image !== `/images/projects/${project.translationKey}.svg`) {
      throw new Error(`Invalid project identity: ${locale}/${file}`)
    }
    projects.set(project.translationKey, project)
  }
}
for (const [key, project] of [...projects].sort(([a], [b]) => a.localeCompare(b))) {
  const filename = `${key}.png`
  expected.add(filename)
  const signet = await sharp(`${publicDir}${project.image}`).resize(440, 440, { fit: 'contain' }).png().toBuffer()
  await canvas().composite([
    { input: await icon(240), left: 120, top: 195 },
    { input: { create: { width: 2, height: 390, channels: 4, background: '#dfe7ee' } }, left: 480, top: 120 },
    { input: signet, left: 640, top: 95 },
  ]).png().toFile(`${outputDir}/${filename}`)
}
// This directory contains generated social cards only. Remove obsolete outputs
// when a project is removed from Content, avoiding stale public identities.
for (const file of await readdir(outputDir)) {
  if (file.endsWith('.png') && !expected.has(file)) await unlink(`${outputDir}/${file}`)
}
console.log(`Derived favicons, default social card and ${expected.size} project social cards from ${site.logo}.`)
