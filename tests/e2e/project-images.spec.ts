import { test, expect } from '@playwright/test'
import { readdirSync, readFileSync } from 'node:fs'
import { parse } from 'yaml'
import AxeBuilder from '@axe-core/playwright'
import { localizedPath, site } from '../../shared/config/site'

const translations = ['de', 'da', 'en'].flatMap((locale) =>
  readdirSync(`content/${locale}/projects`).filter((file) => file.endsWith('.md')).map((file) =>
    parse(readFileSync(`content/${locale}/projects/${file}`, 'utf8').split('---')[1]!),
  ),
)

for (const locale of ['de', 'da', 'en']) {
  test(`${locale}: project articles, links, SEO and uncropped signets render`, async ({ page, request }, testInfo) => {
    test.setTimeout(180000)
    await page.setViewportSize({ width: testInfo.project.name === 'mobile' ? 390 : 1440, height: 1000 })
    const projects = translations.filter((project) => project.locale === locale)
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
      const path = localizedPath(`/projekte/${project.slug}`, locale)
      const response = await page.goto(path)
      expect(response?.status(), path).toBe(200)
      const html = await response!.text()
      const article = page.locator('article .prose')
      expect(await article.locator('h2').count()).toBeGreaterThanOrEqual(3)
      expect(await article.locator('p').count()).toBeGreaterThanOrEqual(5)
      await expect(article).not.toContainText(/(^|\n)\s*(?:##|---)|\[[^\]]+\]\(https?:/)
      // Confirm article content exists in the server response before hydration.
      const firstParagraph = await article.locator('p').first().innerText()
      const serverText = await page.evaluate((source) => new DOMParser().parseFromString(source, 'text/html').querySelector('article .prose')?.textContent, html)
      expect(serverText).toContain(firstParagraph)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', project.description)
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', site.url + path)
      for (const [language, tag] of [['de', 'de-DE'], ['da', 'da-DK'], ['en', 'en-GB']]) {
        const translated = translations.find((item) => item.translationKey === project.translationKey && item.locale === language)
        const alternate = page.locator(`link[hreflang="${tag}"]`)
        if (translated) await expect(alternate).toHaveAttribute('href', site.url + localizedPath(`/projekte/${translated.slug}`, language!))
        else await expect(alternate).toHaveCount(0)
      }
      for (const url of new Set([project.links.website, project.links.github, project.source].filter(Boolean))) {
        await expect(page.locator(`.detail-aside a[href="${url}"]`).first()).toBeVisible()
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path).toBe(true)
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
      if (['badestellenkarte', 'open-data-api', 'kulturbytes', 'kulturnacht-karte', 'open-city-planner'].includes(project.translationKey)) {
        await page.evaluate(() => document.fonts.ready)
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
        expect(results.violations, path).toEqual([])
        await page.screenshot({ path: `docs/screenshots/${testInfo.project.name}-${locale}-project-${project.translationKey}.png`, fullPage: true, scale: 'css' })
      }
      await page.goto(localizedPath('/projekte', locale))
    }
  })
}
