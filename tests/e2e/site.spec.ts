import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { editorialSlugs, localizedPath, site } from '../../shared/config/site'

for (const locale of ['de', 'da', 'en']) {
  test(`${locale}: all pages render on the server and hydrate cleanly`, async ({
    page,
    request,
  }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error' || /hydration/i.test(message.text()))
        errors.push(message.text())
    })
    for (const path of [
      '/',
      '/projekte',
      '/projekte/open-city-planner',
      '/blog',
      '/blog/offene-daten-verstehen',
      ...editorialSlugs.map((slug) => `/${slug}`),
    ]) {
      const url = localizedPath(path, locale)
      const response = await request.get(url)
      expect(response.status(), url).toBe(200)
      expect(await response.text()).toContain('<h1')
      await page.goto(url)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('html')).toHaveAttribute(
        'lang',
        new RegExp(`^${locale}`),
      )
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        site.url + (url === '/' ? '' : url),
      )
      await expect(page.locator('link[hreflang="en-GB"]')).toHaveCount(1)
      await expect(page.locator('main')).toBeVisible()
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        url,
      ).toBe(true)
    }
    expect(errors).toEqual([])
  })
}
test('navigation and language switching retain the detail page', async ({
  page,
  isMobile,
}) => {
  await page.goto('/projekte/denkmalkarte')
  if (isMobile) await page.getByRole('button', { name: 'Menü öffnen' }).click()
  await page.getByRole('link', { name: 'English', exact: true }).click()
  await expect(page).toHaveURL('/en/projekte/denkmalkarte')
  await expect(page.locator('h1')).toContainText('Denkmalkarte')
  if (isMobile) await page.getByRole('button', { name: 'Open menu' }).click()
  await page.getByRole('link', { name: 'Dansk', exact: true }).click()
  await expect(page).toHaveURL('/da/projekte/denkmalkarte')
  await page
    .locator('footer')
    .getByRole('link', { name: 'Vær med', exact: true })
    .click()
  await expect(page).toHaveURL('/da/mitmachen')
  await expect(page.locator('main')).toContainText('programmere')
})
test('mobile menu supports escape, focus return and closes after navigation', async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile)
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Menü öffnen' })
  await toggle.click()
  await expect(page.locator('#mobile-navigation')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(toggle).toBeFocused()
  await expect(page.locator('#mobile-navigation')).toBeHidden()
  await toggle.click()
  await page
    .locator('#mobile-navigation')
    .getByRole('link', { name: 'Projekte', exact: true })
    .click()
  await expect(page).toHaveURL('/projekte')
  await expect(page.locator('#mobile-navigation')).toBeHidden()
})
test('project filters and blog tags work with direct URLs', async ({
  page,
}) => {
  await page.goto('/projekte')
  const total = await page.locator('.project-card').count()
  await page.getByLabel('Kategorie', { exact: true }).selectOption('education')
  await expect(page.locator('.project-card')).toHaveCount(2)
  expect(total).toBeGreaterThan(12)
  await page.reload()
  await expect(page.locator('.project-card')).toHaveCount(2)
  await page.locator('.project-card h2 a').first().click()
  await expect(page).toHaveURL(/\/projekte\/bildungsatlas/)
  await page.goto('/blog?tag=Community')
  await expect(page.locator('.blog-card')).toHaveCount(1)
  await page.locator('.blog-card h2 a').click()
  await expect(page).toHaveURL('/blog/erster-beitrag')
  await expect
    .poll(() =>
      page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((nodes) =>
          nodes.map((node) => JSON.parse(node.textContent || '{}')['@type']),
        ),
    )
    .toContain('BlogPosting')
})
test('accessibility, skip link and local assets', async ({ page }) => {
  for (const path of [
    '/',
    '/projekte',
    '/mitmachen',
    '/daten-sind-daten',
    '/blog/offene-daten-verstehen',
  ]) {
    await page.goto(path)
    await page.evaluate(() => document.fonts.ready)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(results.violations, path).toEqual([])
  }
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(
    page.getByRole('link', { name: 'Zum Hauptinhalt springen' }),
  ).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  expect(await page.evaluate(() => document.cookie)).toBe('')
})
test('RSS, sitemap, robots, redirects and 404s', async ({ request }) => {
  for (const locale of ['de', 'da', 'en']) {
    const rss = await request.get(`/rss.xml?lang=${locale}`)
    expect(rss.status()).toBe(200)
    expect(await rss.text()).toContain(`<language>${locale}</language>`)
    expect(await rss.text()).toContain(
      localizedPath('/blog/offene-daten-verstehen', locale),
    )
  }
  expect((await request.get('/rss.xml?lang=fr')).status()).toBe(400)
  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.status()).toBe(200)
  expect(await sitemap.text()).toContain('/en/projekte/open-city-planner')
  expect(await sitemap.text()).not.toContain('/impressum')
  expect(await (await request.get('/robots.txt')).text()).toContain(
    'Sitemap: https://oklabflensburg.de/sitemap.xml',
  )
  expect((await request.get('/de', { maxRedirects: 0 })).status()).toBe(301)
  for (const path of [
    '/does-not-exist',
    '/projekte/does-not-exist',
    '/blog/does-not-exist',
    '/legacy/impressum.html',
  ])
    expect((await request.get(path)).status()).toBe(404)
})
test('review screenshots', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: testInfo.project.name === 'mobile' ? 390 : 1440, height: 1000 })
  for (const path of ['/', '/projekte', '/mitmachen', '/ueber-uns', '/blog', '/daten-sind-daten']) {
    await page.goto(path)
    await expect(page.locator('.menu-toggle')).toBeEnabled()
    await page.evaluate(() => document.fonts.ready)
    // Full-page captures include images below the browser's lazy-loading range.
    await page.locator('img').evaluateAll(async (images) => {
      await Promise.all(images.map((image) => {
        image.loading = 'eager'
        return image.decode()
      }))
    })
    await page.screenshot({
      path: `docs/screenshots/${testInfo.project.name}-${path === '/' ? 'home' : path.slice(1)}.png`,
      fullPage: true,
      scale: 'css',
    })
  }
})

test('tablet navigation exposes the language switcher', async ({ page, isMobile }) => {
  test.skip(isMobile)
  await page.setViewportSize({ width: 900, height: 1000 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Menü öffnen' }).click()
  await page.getByRole('link', { name: 'English', exact: true }).click()
  await expect(page).toHaveURL('/en')
})

test('content and navigation remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://127.0.0.1:3100' })
  const page = await context.newPage()
  await page.goto('/en/projekte/denkmalkarte')
  await expect(page.locator('h1')).toHaveText('Digitale Denkmalkarte')
  await expect(page.locator('.prose')).toContainText('Help improve it')
  await page.locator('footer').getByRole('link', { name: 'Get involved', exact: true }).click()
  await expect(page).toHaveURL('/en/mitmachen')
  await expect(page.locator('main')).toContainText('Norderstraße 49')
  await context.close()
})

test('header search filters projects and survives reload and clearing', async ({ page, isMobile }) => {
  await page.goto('/')
  if (isMobile) await page.getByRole('button', { name: 'Menü öffnen' }).click()
  await page.getByRole('link', { name: 'Projekte suchen', exact: true }).click()
  await expect(page).toHaveURL('/projekte#project-search')
  const search = page.getByRole('searchbox', { name: 'Projekte suchen' })
  await expect(search).toBeVisible()
  const total = await page.locator('.project-card').count()
  await search.fill('Biotop')
  await expect(page.locator('.project-card')).toHaveCount(1)
  await expect(page.locator('.project-card')).toContainText('Biotopkarte')
  await page.reload()
  await expect(search).toHaveValue('Biotop')
  await expect(page.locator('.project-card')).toHaveCount(1)
  await search.fill('no-matching-project')
  await expect(page.locator('.empty')).toBeVisible()
  await search.fill('')
  await expect(page.locator('.project-card')).toHaveCount(total)
})
