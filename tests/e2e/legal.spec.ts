import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { createServer } from 'node:net'
import { legalFixture, legalFixtureEnvironment } from '../fixtures/legal'
import { legalFields, optionalLegalFields, type LegalContact } from '../../shared/utils/legal'
import { locales, localizedPath, site } from '../../shared/config/site'

for (const locale of locales) {
  test(`${locale}: legal identity is shared in SSR, hydration and localized SEO`, async ({ page, request }, testInfo) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error' || /hydration/i.test(message.text())) errors.push(message.text())
    })
    for (const key of ['impressum', 'datenschutz']) {
      const path = localizedPath(`/${key}`, locale)
      const response = await request.get(path)
      expect(response.status()).toBe(200)
      const html = await response.text()
      // Inspect the actual server-rendered element, not Nuxt's JSON payload.
      const address = html.match(/<address\b[^>]*>(.*?)<\/address>/s)?.[1]
      expect(address).toBeDefined()
      for (const field of ['name', 'street', 'houseNumber', 'postalCode', 'city', 'country'] as const) {
        expect(address).toContain(legalFixture[field])
      }
      expect(html).toContain(`href="mailto:${legalFixture.email}"`)
      expect(html).toContain('content="noindex, follow"')
      expect(html).toContain(`rel="canonical" href="${site.url + path}"`)
      expect(html.match(/<link\b[^>]*\bhreflang=/g) ?? []).toHaveLength(0)
      await page.goto(path)
      await expect(page.locator('.menu-toggle')).toBeEnabled()
      await expect(page.locator('[data-legal-name]')).toHaveText(legalFixture.name)
      await expect(page.locator('.legal-details a')).toHaveAttribute('href', `mailto:${legalFixture.email}`)
      for (const field of optionalLegalFields) await expect(page.locator(`[data-legal-field="${field}"]`)).toHaveCount(0)
      await expect(page.locator('.contact-panel')).toHaveCount(0)
      await expect(page.locator('main')).not.toContainText(/\b(?:TODO|undefined|null|example)\b|legal\.(?:email|phone)|\{\{/i)
      await expect(page).toHaveTitle(new RegExp(`${await page.locator('h1').innerText()} · OK Lab Flensburg`))
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', site.url + path)
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', site.url + path)
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
      await expect(page.locator('link[hreflang]')).toHaveCount(0)
      for (const width of [testInfo.project.name === 'mobile' ? 390 : 1440, 320, 720]) {
        await page.setViewportSize({ width, height: 1000 })
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      }
      await page.setViewportSize({ width: testInfo.project.name === 'mobile' ? 390 : 1440, height: 1000 })
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
      await page.evaluate(() => document.fonts.ready)
      await page.screenshot({ path: `docs/screenshots/${testInfo.project.name}-${locale}-${key}.png`, fullPage: true, scale: 'css' })
    }
    expect(errors).toEqual([])
  })
}

test('legal language switching retains the page despite noindex', async ({ page, isMobile, request }) => {
  for (const key of ['impressum', 'datenschutz']) {
    await page.goto(`/${key}`)
    if (isMobile) await page.getByRole('button', { name: 'Menü öffnen' }).click()
    await page.getByRole('link', { name: 'English', exact: true }).click()
    await expect(page).toHaveURL(localizedPath(`/${key}`, 'en'))
    if (isMobile) await page.getByRole('button', { name: 'Open menu' }).click()
    await page.getByRole('link', { name: 'Dansk', exact: true }).click()
    await expect(page).toHaveURL(localizedPath(`/${key}`, 'da'))
    await expect(page.locator('[data-legal-name]')).toHaveText(legalFixture.name)
  }
  const sitemap = await (await request.get('/sitemap.xml')).text()
  for (const locale of locales) {
    for (const key of ['impressum', 'datenschutz']) expect(sitemap).not.toContain(site.url + localizedPath(`/${key}`, locale))
  }
})

// These checks run once per suite. They use the same built artifact as the UI tests.
test('production startup rejects missing and example config without logging values', async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop')
  for (const overrides of [
    Object.fromEntries(legalFields.map((field) => [field, ''])),
    { name: 'Example Civic Lab', email: 'legal@example.invalid' },
    { representedBy: 'TODO' },
  ]) {
    const child = spawn(process.execPath, ['.output/server/index.mjs'], {
      env: { ...process.env, ...legalFixtureEnvironment(overrides), NODE_ENV: 'development', PORT: '0', HOST: '127.0.0.1' },
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    let output = ''
    child.stdout.on('data', (chunk) => { output += chunk })
    child.stderr.on('data', (chunk) => { output += chunk })
    const timeout = setTimeout(() => child.kill('SIGKILL'), 10000)
    const [code, signal] = await once(child, 'close')
    clearTimeout(timeout)
    expect(signal).toBeNull()
    expect(code).not.toBe(0)
    expect(output).toContain('Invalid legal configuration: NUXT_PUBLIC_LEGAL_')
    expect(output).not.toContain('Listening on')
    for (const value of [legalFixture.name, legalFixture.email, 'Example Civic Lab', 'legal@example.invalid']) expect(output).not.toContain(value)
  }
  expect((await request.get('/impressum')).status()).toBe(200)
})

test('the audited website uses local resources and no browser storage', async ({ page, context }) => {
  const external: string[] = []
  page.on('request', (request) => {
    if (new URL(request.url()).origin !== 'http://127.0.0.1:3100') external.push(request.url())
  })
  for (const path of ['/', '/projekte', '/datenschutz', '/en/privacy']) {
    await page.goto(path)
    await expect(page.locator('.menu-toggle')).toBeEnabled()
    await page.evaluate(() => document.fonts.ready)
    expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 })
  }
  expect(await context.cookies()).toEqual([])
  expect(external).toEqual([])
})

test('runtime overrides render all optional details with Vue escaping', async ({ browser }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop')
  const reservation = createServer()
  reservation.listen(0, '127.0.0.1')
  await once(reservation, 'listening')
  const address = reservation.address()
  if (!address || typeof address === 'string') throw new Error('No test port available')
  const port = address.port
  await new Promise<void>((resolve, reject) => reservation.close((error) => error ? reject(error) : resolve()))
  const optional: Partial<LegalContact> = {
    name: 'Küstenlabor & Prüfverein', phone: '+49 123 456789', representedBy: 'Robin Prüfperson',
    registerCourt: 'Amtsgericht Küstenstadt', registerNumber: 'VR 4242', vatId: 'DE123456789',
    privacyContactPerson: 'Kim Prüfperson', contentResponsible: 'Robin Prüfperson, Hafenweg 42, 12345 Küstenstadt',
  }
  const child = spawn(process.execPath, ['.output/server/index.mjs'], {
    env: { ...process.env, ...legalFixtureEnvironment(optional), PORT: String(port), HOST: '127.0.0.1' },
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  const closed = once(child, 'close')
  const context = await browser.newContext({ baseURL: `http://127.0.0.1:${port}`, javaScriptEnabled: false })
  try {
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Legal fixture server startup timed out')), 10000)
      child.once('exit', () => { clearTimeout(timeout); reject(new Error('Legal fixture server failed to start')) })
      child.stdout.on('data', (chunk) => {
        if (String(chunk).includes('Listening on')) { clearTimeout(timeout); resolve() }
      })
      child.once('error', reject)
    })
    const page = await context.newPage()
    for (const locale of locales) {
      for (const key of ['impressum', 'datenschutz']) {
        await page.goto(localizedPath(`/${key}`, locale))
        await expect(page.locator('[data-legal-name]')).toHaveText(optional.name!)
        await expect(page.locator('[data-legal-field="phone"] a')).toHaveAttribute('href', 'tel:+49123456789')
        for (const field of optionalLegalFields.filter((field) => field !== 'phone')) {
          const shown = key === 'datenschutz' ? field === 'privacyContactPerson' : field !== 'privacyContactPerson'
          const element = page.locator(`[data-legal-field="${field}"]`)
          if (shown) await expect(element.locator('dd')).toHaveText(optional[field]!)
          else await expect(element).toHaveCount(0)
        }
      }
    }
    const html = await (await context.request.get('/impressum')).text()
    expect(html).toContain('Küstenlabor &amp; Prüfverein')
  } finally {
    await context.close()
    child.kill('SIGTERM')
    await closed
  }
})
