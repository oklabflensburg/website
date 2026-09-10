import { expect, test } from '@playwright/test'

const pages = ['/', '/projekte', '/projekte/open-city-planner', '/blog', '/blog/offene-daten-verstehen', '/ueber-uns', '/mitmachen', '/daten-sind-daten', '/kontakt', '/impressum', '/datenschutz', '/team', '/veranstaltungen']

test('body copy and controls remain readable across page types', async ({ page, isMobile }) => {
  await page.setViewportSize({ width: isMobile ? 390 : 1440, height: 1000 })
  for (const path of pages) {
    await page.goto(path)
    await page.evaluate(() => document.fonts.ready)
    const smallCopy = await page.locator('.prose p, .prose li, .card p:not(.byline):not(.eyebrow), .lead, .meeting-panel p, .join-card p, .button, .text-link, .filter-bar input, .filter-bar select').evaluateAll((nodes) =>
      nodes.filter((node) => parseFloat(getComputedStyle(node).fontSize) < 16).map((node) => node.textContent),
    )
    expect(smallCopy, path).toEqual([])
    const prose = page.locator('.prose')
    if (await prose.count()) {
      await expect(prose).toHaveCSS('font-size', isMobile ? '16px' : '18px')
      await expect(prose).toHaveCSS('line-height', isMobile ? '28px' : '32px')
      expect(await prose.evaluate((node) => node.getBoundingClientRect().width)).toBeLessThanOrEqual(768)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path).toBe(true)
  }
  await page.goto('/')
  if (isMobile) {
    await page.getByRole('button', { name: 'Menü öffnen' }).click()
    await expect(page.locator('#mobile-navigation nav:not(.languages) a').first()).toHaveCSS('font-size', '18px')
  } else {
    await expect(page.locator('.desktop-nav a').first()).toHaveCSS('font-size', '16px')
  }
  const undersizedTargets = await page.locator('.button, .menu-toggle, .icon-button, .languages a').evaluateAll((nodes) =>
    nodes.filter((node) => node.getBoundingClientRect().width > 0 && node.getBoundingClientRect().height < 44).map((node) => node.outerHTML),
  )
  expect(undersizedTargets).toEqual([])
})

test('zoom-equivalent and narrow viewports reflow without clipped content', async ({ page, isMobile }) => {
  test.skip(isMobile)
  // A 1440 px desktop at 200% browser zoom has a 720 CSS-pixel viewport.
  // Also check 320 CSS pixels for narrow-screen reflow, without hiding overflow.
  for (const width of [720, 320]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const path of [...pages, '/da', '/en', '/da/projekter', '/en/projects']) {
      await page.goto(path)
      await page.evaluate(() => document.fonts.ready)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}: ${path}`).toBe(true)
      const clipped = await page.locator('.card, .button, .prose, .meeting-panel, .join-card').evaluateAll((nodes) =>
        nodes.filter((node) => node.scrollWidth > node.clientWidth + 1).map((node) => node.className),
      )
      expect(clipped, `${width}: ${path}`).toEqual([])
    }
    await page.goto('/')
    await page.getByRole('button', { name: 'Menü öffnen' }).click()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.locator('#mobile-navigation').getByRole('link', { name: 'Mitmachen', exact: true }).click()
    await expect(page).toHaveURL('/mitmachen')
  }
})
