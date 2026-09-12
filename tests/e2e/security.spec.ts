import { expect, test } from '@playwright/test'
import { securityHeaders } from '../../server/utils/security'

test('production headers cover documents, APIs, redirects, errors and assets', async ({ request }) => {
  for (const [path, status] of [['/', 200], ['/da/om-os', 200], ['/en/privacy', 200], ['/api/translations', 200], ['/sitemap.xml', 200], ['/en/ueber-uns', 301], ['/de', 301], ['/missing-security-page', 404], ['/brand/oklabflensburg-logo.png', 200]] as const) {
    const response = await request.get(path, { maxRedirects: 0 })
    expect(response.status(), path).toBe(status)
    for (const [name, value] of Object.entries(securityHeaders)) expect(response.headers()[name], `${path}: ${name}`).toBe(value)
    expect(response.headers()['content-security-policy'], path).toContain("frame-ancestors 'none'")
    expect(response.headers()['content-security-policy'], path).not.toMatch(/\*|'unsafe-inline'|'unsafe-eval'/)
    expect(response.headers()['strict-transport-security']).toBeUndefined()
  }
})

test('CSP permits hydration, local assets and Content navigation while blocking injected scripts', async ({ page }) => {
  await page.addInitScript(() => {
    const violations: string[] = []
    Object.assign(window, { cspViolations: violations })
    document.addEventListener('securitypolicyviolation', (event) => violations.push(event.violatedDirective))
  })
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const path of ['/', '/da/om-os', '/en/privacy']) {
    await page.goto(path)
    await expect(page.locator('.menu-toggle')).toBeEnabled()
    await page.evaluate(() => document.fonts.ready)
    expect(await page.evaluate(() => (window as unknown as { cspViolations: string[] }).cspViolations)).toEqual([])
  }
  await page.goto('/')
  await page.locator('.project-card a[href="/projekte/open-city-planner"]').first().click()
  await expect(page.locator('h1')).toHaveText('Open City Planner')
  await page.goBack()
  await expect(page.locator('.project-card')).toHaveCount(3)
  expect(await page.evaluate(() => (window as unknown as { cspViolations: string[] }).cspViolations)).toEqual([])
  expect(errors).toEqual([])
  await page.evaluate(() => {
    const script = document.createElement('script')
    script.textContent = 'document.documentElement.dataset.injected = "yes"'
    document.body.append(script)
  })
  await expect.poll(() => page.evaluate(() => (window as unknown as { cspViolations: string[] }).cspViolations)).toContain('script-src-elem')
  await expect(page.locator('html')).not.toHaveAttribute('data-injected', 'yes')
})
