import { expect, test } from '@playwright/test'
import { locales, localizedPath, site } from '../../shared/config/site'
import { legalFixture } from '../fixtures/legal'

test('general and legal email retain separate ownership in SSR and hydration', async ({ page, request }) => {
  expect(site.contact.email).not.toBe(legalFixture.email)
  for (const locale of locales) {
    for (const key of ['kontakt', 'daten-sind-daten', 'code-of-conduct', 'impressum', 'datenschutz']) {
      const path = localizedPath(`/${key}`, locale)
      const response = await request.get(path)
      expect(response.status()).toBe(200)
      const html = await response.text()
      const legal = key === 'impressum' || key === 'datenschutz'
      // Assert rendered elements rather than finding addresses in Nuxt payloads.
      const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]
      expect(main).toContain(`href="mailto:${legal ? legalFixture.email : site.contact.email}"`)
      expect(main).not.toContain(`href="mailto:${legal ? site.contact.email : legalFixture.email}"`)
      expect(html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1]).toContain(`href="mailto:${site.contact.email}"`)
      const organization = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
        .flatMap((match) => JSON.parse(match[1]!)['@graph'] ?? []).find((item) => item['@type'] === 'Organization')
      expect(organization).toMatchObject({ name: site.name, email: site.contact.email })
      await page.goto(path)
      await expect(page.locator('.menu-toggle')).toBeEnabled()
      await expect(page.locator('main a[href^="mailto:"]')).toHaveAttribute('href', `mailto:${legal ? legalFixture.email : site.contact.email}`)
      await expect(page.locator('footer a[href^="mailto:"]')).toHaveAttribute('href', `mailto:${site.contact.email}`)
    }
  }
})
