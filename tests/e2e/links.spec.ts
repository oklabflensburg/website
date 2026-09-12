import { test, expect } from '@playwright/test'
import { editorialSlugs, locales, localizedPath, site } from '../../shared/config/site'

// Inspect actual DOM URLs independently of the implementation helper, including
// anchors emitted by Content and every page/card/navigation renderer.
for (const locale of locales) {
  test(`${locale}: external links are safe new-tab links and internal links stay same-tab`, async ({ page }) => {
    let externalCount = 0
    let internalCount = 0
    const paths = ['/', '/projekte', '/projekte/open-city-planner', '/blog', ...editorialSlugs.map((slug) => `/${slug}`)]
    for (const path of paths) {
      await page.goto(localizedPath(path, locale))
      const links = await page.locator('a[href]').evaluateAll((nodes) => nodes.map((node) => ({ href: node.getAttribute('href')!, target: node.getAttribute('target'), rel: node.getAttribute('rel') })))
      for (const link of links) {
        const url = new URL(link.href, site.url)
        const external = ['http:', 'https:'].includes(url.protocol) && url.origin !== new URL(site.url).origin
        if (external) {
          externalCount++
          expect(link.target, link.href).toBe('_blank')
          expect(link.rel?.split(/\s+/), link.href).toEqual(expect.arrayContaining(['noopener', 'noreferrer']))
        } else {
          internalCount++
          expect(link.target, link.href).toBeNull()
        }
      }
    }
    expect(externalCount).toBeGreaterThan(20)
    expect(internalCount).toBeGreaterThan(50)
    await page.goto(localizedPath('/projekte/open-city-planner', locale))
    await expect(page.locator('.detail-aside a.button')).toHaveAttribute('target', '_blank')
    await expect(page.locator('.detail-aside a[href^="https://github.com/"]').first()).toHaveAttribute('target', '_blank')
    await page.goto(localizedPath('/mitmachen', locale))
    const markdownInternal = page.locator(`.prose a[href="${localizedPath('/projekte', locale)}"]`)
    await expect(markdownInternal).not.toHaveAttribute('target')
    await markdownInternal.click()
    await expect(page).toHaveURL(localizedPath('/projekte', locale))
    await page.goto(localizedPath('/blog', locale))
    await expect(page.locator('.blog-card h2 a').first()).not.toHaveAttribute('target')
    await page.locator('.blog-card h2 a').first().click()
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('.breadcrumbs a').first()).not.toHaveAttribute('target')
  })
}
