import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import sharp from 'sharp'
import { parse } from 'yaml'
import { site } from '../shared/config/site'

const source = readFileSync(`public${site.logo}`)
const resizeLogo = (size: number) => sharp(source).resize(size, size, {
  fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 },
})
const projects = [...new Map(['de', 'da', 'en'].flatMap((locale) =>
  readdirSync(`content/${locale}/projects`).filter((file) => file.endsWith('.md')).map((file) =>
    parse(readFileSync(`content/${locale}/projects/${file}`, 'utf8').split('---')[1]!),
  ),
).map((project) => [project.translationKey, project])).values()]

describe('canonical organisation branding', () => {
  it('preserves the exact upstream PNG, including its alpha channel', async () => {
    expect(createHash('sha256').update(source).digest('hex')).toBe('67975c8d447eba997f53ba566b93ee2c38905e8edb0cc80b1a71b693e76e709e')
    const metadata = await sharp(source).metadata()
    expect([metadata.width, metadata.height, metadata.hasAlpha]).toEqual([512, 512, true])
    expect(readdirSync('public/brand')).toEqual([site.logo.split('/').at(-1)])
    expect(existsSync('public/logos/codefor-flensburg.svg')).toBe(false)
  })

  it('derives every PNG favicon from the unaltered master', async () => {
    for (const [size, path] of [[16, site.favicons.small], [32, site.favicons.medium], [180, site.favicons.apple]] as const) {
      const actual = sharp(`public${path}`)
      const metadata = await actual.metadata()
      expect([metadata.width, metadata.height]).toEqual([size, size])
      expect(await actual.ensureAlpha().raw().toBuffer()).toEqual(await resizeLogo(size).ensureAlpha().raw().toBuffer())
    }
  })

  it('contains valid ICO frames derived from the same master', async () => {
    const ico = readFileSync(`public${site.favicons.ico}`)
    expect(ico.readUInt16LE(2)).toBe(1)
    expect(ico.readUInt16LE(4)).toBe(4)
    for (const [index, size] of [16, 32, 48, 256].entries()) {
      const entry = 6 + 16 * index
      const length = ico.readUInt32LE(entry + 8)
      const offset = ico.readUInt32LE(entry + 12)
      const frame = sharp(ico.subarray(offset, offset + length))
      const metadata = await frame.metadata()
      expect([metadata.width, metadata.height]).toEqual([size, size])
      expect(await frame.ensureAlpha().raw().toBuffer()).toEqual(await resizeLogo(size).ensureAlpha().raw().toBuffer())
    }
  })

  it('brands the default and every project social card without cropping the logo', async () => {
    const cards = [
      { path: site.socialImage, size: 420, left: 390, top: 105 },
      ...projects.map((project) => ({ path: `${site.projectSocialImages}/${project.translationKey}.png`, size: 240, left: 120, top: 195 })),
    ]
    for (const card of cards) {
      const actual = sharp(`public${card.path}`)
      const metadata = await actual.metadata()
      expect([metadata.format, metadata.width, metadata.height]).toEqual(['png', 1200, 630])
      const logoRegion = await actual.extract({ left: card.left, top: card.top, width: card.size, height: card.size }).flatten({ background: '#ffffff' }).raw().toBuffer()
      // Compare actual pixels, not filenames: transparent pixels may be white
      // on a social canvas, but none of the logo may be recoloured or omitted.
      const expected = await sharp(await resizeLogo(card.size).png().toBuffer()).flatten({ background: '#ffffff' }).raw().toBuffer()
      expect(logoRegion.length).toBe(expected.length)
      // Alpha compositing and flattening round edge pixels differently by at
      // most one channel value; larger changes would alter the source artwork.
      let maxDifference = 0
      for (let index = 0; index < expected.length; index++) {
        maxDifference = Math.max(maxDifference, Math.abs(logoRegion[index]! - expected[index]!))
      }
      expect(maxDifference).toBeLessThanOrEqual(1)
    }
    expect(readdirSync(`public${site.projectSocialImages}`).sort()).toEqual(projects.map((project) => `${project.translationKey}.png`).sort())
  })
})
