import { test, expect } from '@playwright/test'
import { readdirSync, readFileSync } from 'node:fs'
import { parse } from 'yaml'
import { localizedPath } from '../../shared/config/site'

for (const locale of ['de', 'da', 'en']) {
  test(`${locale}: every project signet loads uncropped in cards and detail pages`, async ({ page, request }) => {
    test.setTimeout(90000)
    const projects = readdirSync(`content/${locale}/projects`).map((file) =>
      parse(readFileSync(`content/${locale}/projects/${file}`, 'utf8').split('---')[1]!),
    )
    let releaseImages!: () => void
    const imageGate = new Promise<void>((resolve) => { releaseImages = resolve })
    await page.route('**/images/projects/*.svg', async (route) => {
      await imageGate
      await route.continue()
    })
    await page.goto(localizedPath('/projekte', locale), { waitUntil: 'domcontentloaded' })
    await expect(page.locator('.menu-toggle')).toBeEnabled()
    await page.evaluate(() => document.fonts.ready)
    const cards = page.locator('.project-card')
    await expect(cards).toHaveCount(projects.length)
    const framesBefore = await cards.evaluateAll((nodes) => nodes.map((node) => {
      const frame = node.querySelector('.project-picture')!.getBoundingClientRect()
      return { top: frame.top, width: frame.width, height: frame.height }
    }))
    releaseImages()
    await cards.locator('img').evaluateAll(async (images) => {
      await Promise.all(images.map((image) => {
        image.loading = 'eager'
        return image.decode()
      }))
    })
    const images = await cards.evaluateAll((nodes) => nodes.map((node) => {
      const image = node.querySelector('img')!
      const frame = node.querySelector('.project-picture')!.getBoundingClientRect()
      const bounds = image.getBoundingClientRect()
      return {
        src: image.currentSrc, width: image.naturalWidth, height: image.naturalHeight,
        top: frame.top, frameWidth: frame.width, frameHeight: frame.height,
        imageWidth: bounds.width, imageHeight: bounds.height, fit: getComputedStyle(image).objectFit,
      }
    }))
    expect(new Set(images.map((image) => image.src)).size).toBe(projects.length)
    for (const [index, image] of images.entries()) {
      expect(image.width).toBe(1024)
      expect(image.height).toBe(1024)
      expect(image.fit).toBe('contain')
      expect(image.frameWidth / image.frameHeight).toBeCloseTo(4 / 3, 2)
      expect(image.imageWidth).toBeLessThan(image.frameWidth)
      expect(image.imageHeight).toBeLessThan(image.frameHeight)
      expect(image.imageWidth / image.imageHeight).toBeCloseTo(1, 2)
      expect(image.top).toBeCloseTo(framesBefore[index]!.top, 1)
      expect(image.frameHeight).toBeCloseTo(framesBefore[index]!.height, 1)
    }
    for (const project of projects) {
      const card = cards.filter({ has: page.locator(`h2 a[href="${localizedPath(`/projekte/${project.slug}`, locale)}"]`) })
      await expect(card.getByRole('img', { name: project.imageAlt, exact: true })).toHaveCount(1)
      await expect(card.locator('img')).toHaveAttribute('src', project.image)
      await page.goto(localizedPath(`/projekte/${project.slug}`, locale))
      const hero = page.locator('.detail-image')
      await expect(hero).toHaveAttribute('alt', project.imageAlt)
      await expect(hero).toHaveAttribute('src', project.image)
      await hero.evaluate((image: HTMLImageElement) => image.decode())
      const size = await hero.boundingBox()
      expect(size!.width / size!.height).toBeCloseTo(1, 2)
      await expect(hero).toHaveCSS('object-fit', 'contain')
      // Share previews must remain raster images; SVG itself is the local master.
      if (project.slug === 'open-city-planner') {
        const previewUrl = await page.locator('meta[property="og:image"]').getAttribute('content')
        const response = await request.get(new URL(previewUrl!).pathname)
        expect(response.status()).toBe(200)
        expect(response.headers()['content-type']).toContain('image/png')
      }
      await page.goto(localizedPath('/projekte', locale))
    }
  })
}
