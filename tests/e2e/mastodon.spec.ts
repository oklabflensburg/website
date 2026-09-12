import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { legalFixtureEnvironment } from '../fixtures/legal'
import { locales, localizedPath, site } from '../../shared/config/site'

const labels = { de: ['Aus dem Fediverse', 'Mehr auf Mastodon'], da: ['Fra Fediverset', 'Mere på Mastodon'], en: ['From the Fediverse', 'More on Mastodon'] }
for (const locale of locales) {
  test(`${locale}: Mastodon renders safely during SSR, hydrates and makes no external browser requests`, async ({ page, request }, testInfo) => {
    const external: string[] = []
    const errors: string[] = []
    page.on('request', (request) => { if (new URL(request.url()).origin !== 'http://127.0.0.1:3100') external.push(request.url()) })
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => { if (/hydration/i.test(message.text())) errors.push(message.text()) })
    const response = await request.get(localizedPath('/', locale))
    expect(response.status()).toBe(200)
    const html = await response.text()
    expect(html.match(/<article[^>]*mastodon-post/g)).toHaveLength(3)
    expect(html).not.toContain('attack()')
    await page.goto(localizedPath('/', locale))
    await expect(page.locator('.menu-toggle')).toBeEnabled()
    const feed = page.locator('.mastodon-feed')
    await expect(feed.getByRole('heading', { name: labels[locale][0] })).toBeVisible()
    await expect(feed.locator('article')).toHaveCount(3)
    await expect(feed.locator('article a').first()).toHaveAttribute('href', site.social.mastodon + '/125')
    const date = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short', timeZone: site.meeting.timezone }).format(new Date('2026-09-03T10:30:00Z'))
    await expect(feed.locator('time').first()).toHaveText(date)
    for (const link of [feed.locator('article a').first(), feed.getByRole('link', { name: labels[locale][1], exact: true })]) {
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
    await expect(feed.getByRole('link', { name: labels[locale][1], exact: true })).toHaveAttribute('href', site.social.mastodon)
    await expect(feed.locator('script, iframe, img, [onclick], [onerror]')).toHaveCount(0)
    const details = feed.locator('details')
    await expect(details.locator('p')).toBeHidden()
    await expect(details.locator('summary')).toContainText('Discussion of sensitive topics')
    await details.locator('summary').focus()
    await page.keyboard.press('Enter')
    await expect(details.locator('p')).toBeVisible()
    for (const width of [320, 720, testInfo.project.name === 'mobile' ? 390 : 1440]) {
      await page.setViewportSize({ width, height: 1000 })
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    }
    if (locale === 'de') {
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
      await feed.screenshot({ path: `docs/screenshots/${testInfo.project.name}-mastodon-disclosure.png` })
      if (testInfo.project.name === 'mobile') {
        await page.getByRole('button', { name: 'Menü öffnen' }).click()
        await page.screenshot({ path: 'docs/screenshots/mobile-menu.png' })
      }
    }
    expect(errors).toEqual([])
    expect(external).toEqual([])
  })
}

test('homepage SSR still succeeds with an unavailable Mastodon upstream', async ({ browser }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop')
  const runtimeDirectory = await mkdtemp(join(tmpdir(), 'website-mastodon-'))
  const child = spawn(process.execPath, [resolve('.output/server/index.mjs')], {
    cwd: runtimeDirectory,
    env: { ...process.env, ...legalFixtureEnvironment(), HOST: '127.0.0.1', PORT: '0', NUXT_MASTODON_BASE_URL: 'http://127.0.0.1:1', NUXT_MASTODON_ACCOUNT_ID: '' },
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  const closed = once(child, 'close')
  let context
  try {
    const baseURL = await new Promise<string>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Fixture startup timed out')), 10000)
      child.once('exit', () => { clearTimeout(timeout); reject(new Error('Fixture exited')) })
      child.stdout.on('data', (chunk) => {
        const url = String(chunk).match(/Listening on (http:\/\/[^\s]+)/)?.[1]
        if (url) { clearTimeout(timeout); resolve(url) }
      })
      child.once('error', reject)
    })
    context = await browser.newContext({ baseURL, javaScriptEnabled: false })
    const page = await context.newPage()
    for (const locale of locales) {
      const response = await page.goto(localizedPath('/', locale))
      expect(response?.status()).toBe(200)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('.mastodon-post')).toHaveCount(0)
      await expect(page.locator('.mastodon-feed p')).toBeVisible()
      await expect(page.locator('.mastodon-feed a')).toHaveAttribute('href', site.social.mastodon)
      expect(await (await context.request.get('/api/social/mastodon')).json()).toEqual([])
    }
  } finally {
    await context?.close()
    child.kill('SIGTERM')
    await closed
    await rm(runtimeDirectory, { recursive: true, force: true })
  }
})
