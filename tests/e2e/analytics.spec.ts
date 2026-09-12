import { test, expect } from '@playwright/test'
import { locales, localizedPath, site } from '../../shared/config/site'

test.afterEach(async ({ page, context }) => {
  await page.goto('about:blank')
  await context.unrouteAll({ behavior: 'wait' })
})

for (const blocked of [false, true]) {
  test(`public hostname installs Plausible once and navigation works; blocked=${blocked}`, async ({ page, context, request }) => {
    const host = new URL(site.url).hostname
    for (const locale of locales) {
      const response = await request.get(localizedPath('/datenschutz', locale), { headers: { host } })
      expect(response.status()).toBe(200)
      const html = await response.text()
      expect(html.split(`src="${site.analytics.script}"`)).toHaveLength(2)
      expect(html.indexOf('window.plausible.init();')).toBeLessThan(html.indexOf(`src="${site.analytics.script}"`))
    }

    let scriptRequests = 0
    let eventRequests = 0
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.addInitScript(() => {
      document.addEventListener('securitypolicyviolation', (event) => console.error(`CSP violation: ${event.violatedDirective}`))
    })
    page.on('console', (message) => {
      if (message.text().startsWith('CSP violation:')) errors.push(message.text())
    })
    // Serve the public origin from the local production build. Never send test
    // events to the real analytics service or fetch a mutable script in CI.
    await context.route('**/*', async (route) => {
      const url = new URL(route.request().url())
      if (url.origin === site.url) {
        const response = await route.fetch({
          url: `http://127.0.0.1:3100${url.pathname}${url.search}`,
          headers: { ...route.request().headers(), host },
        })
        await route.fulfill({ response })
      } else if (url.href === site.analytics.script) {
        scriptRequests++
        if (blocked) await route.abort('blockedbyclient')
        else await route.fulfill({
          contentType: 'application/javascript',
          body: `if(typeof window.plausible!=="function"||!window.plausible.o)throw new Error("Missing Plausible initialization");window.plausible.integrationReady=true;fetch("${new URL('/api/event', site.analytics.script).href}",{method:"POST",body:"isolated-test"});`,
        })
      } else if (url.href === new URL('/api/event', site.analytics.script).href) {
        eventRequests++
        await route.fulfill({ status: 202, headers: { 'access-control-allow-origin': site.url }, body: '' })
      } else {
        errors.push(`Unexpected external request: ${url.origin}`)
        await route.abort()
      }
    })
    await page.goto(site.url)
    await expect(page.locator('.menu-toggle')).toBeEnabled()
    await expect.poll(() => scriptRequests).toBe(1)
    const loader = page.locator(`script[src="${site.analytics.script}"]`)
    await expect(loader).toHaveCount(1)
    await expect(loader).toHaveAttribute('async', '')
    if (!blocked) {
      await expect.poll(() => eventRequests).toBe(1)
      await expect.poll(() => page.evaluate(() => (window as unknown as {
        plausible: { integrationReady?: boolean }
      }).plausible.integrationReady)).toBe(true)
    }
    else expect(eventRequests).toBe(0)
    await page.evaluate(() => { document.documentElement.dataset.analyticsDocument = 'initial' })
    await page.locator('.project-card a[href="/projekte/open-city-planner"]').first().click()
    await expect(page).toHaveURL(`${site.url}/projekte/open-city-planner`)
    await expect(page.locator('h1')).toHaveText('Open City Planner')
    await page.goBack()
    await expect(page).toHaveURL(`${site.url}/`)
    await expect(page.locator('.project-card')).toHaveCount(3)
    await expect(page.locator('html')).toHaveAttribute('data-analytics-document', 'initial')
    await expect(loader).toHaveCount(1)
    expect(scriptRequests).toBe(1)
    expect(await context.cookies()).toEqual([])
    const storage = await page.evaluate(() => ({ local: Object.keys(localStorage), session: sessionStorage.length }))
    expect(storage.session).toBe(0)
    // Nuxt Content caches collections during client navigation, independently
    // of analytics. No identifiers or other storage keys may be introduced.
    for (const key of storage.local) expect(key).toMatch(/^content_(checksum|collection)_(projects|blog)$/)
    expect(errors).toEqual([])
  })
}
