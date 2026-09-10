import { test, expect } from '@playwright/test'
import { site } from '../../shared/config/site'

test('header, footer and project attribution use the canonical organisation logo', async ({ page, request, isMobile }) => {
  for (const path of ['/', '/projekte', '/ueber-uns', '/mitmachen', '/projekte/open-city-planner']) {
    await page.goto(path)
    await expect(page.locator('.menu-toggle')).toBeEnabled()
    const logos = page.locator('img.app-logo')
    await expect(logos).toHaveCount(path.includes('/projekte/') ? 3 : 2)
    for (const logo of await logos.all()) {
      await expect(logo).toHaveAttribute('alt', site.name)
      await expect(logo).toHaveAttribute('src', new RegExp(site.logo.replaceAll('.', '\\.')))
      await expect(logo).toHaveCSS('object-fit', 'contain')
      await expect(logo).toHaveCSS('filter', 'none')
      await logo.scrollIntoViewIfNeeded()
      await logo.evaluate((img: HTMLImageElement) => img.decode())
      const dimensions = await logo.evaluate((img: HTMLImageElement) => ({
        width: img.naturalWidth, height: img.naturalHeight, display: img.getBoundingClientRect().toJSON(),
      }))
      expect(dimensions.width).toBeGreaterThan(0)
      expect(dimensions.width).toBe(dimensions.height)
      expect(dimensions.display.width).toBe(dimensions.display.height)
    }
    const organization = await page.locator('script[type="application/ld+json"]').evaluateAll((nodes) =>
      nodes.flatMap((node) => JSON.parse(node.textContent || '{}')['@graph'] || []).find((item) => item['@type'] === 'Organization'),
    )
    expect(organization.logo).toBe(new URL(site.logo, site.url).href)
    expect(await page.locator('img[src*="codefor-flensburg.svg"]').count()).toBe(0)
  }
  if (isMobile) {
    await page.getByRole('button', { name: 'Menü öffnen' }).click()
    await expect(page.locator('header img.app-logo')).toBeVisible()
    await expect(page.locator('#mobile-navigation')).toBeVisible()
  }
  for (const path of [site.logo, ...Object.values(site.favicons)]) {
    expect((await request.get(path)).status()).toBe(200)
  }
  for (const path of ['/', '/blog/erster-beitrag', '/projekte/open-city-planner']) {
    await page.goto(path)
    const expected = new URL(path.startsWith('/projekte/') ? `${site.projectSocialImages}/open-city-planner.png` : site.socialImage, site.url).href
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', expected)
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', expected)
    const response = await request.get(new URL(expected).pathname)
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('image/png')
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', site.favicons.apple)
  }
})
