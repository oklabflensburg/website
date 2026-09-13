import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { locales, localizedPath, site } from '../../shared/config/site'
import de from '../../i18n/locales/de.json' with { type: 'json' }
import da from '../../i18n/locales/da.json' with { type: 'json' }
import en from '../../i18n/locales/en.json' with { type: 'json' }

const messages = { de, da, en }

for (const locale of locales) {
  test(`${locale}: community footer has localized, accessible navigation and safe social links`, async ({ page }) => {
    await page.goto(localizedPath('/', locale))
    const footer = page.getByRole('contentinfo')
    const copy = messages[locale]
    await expect(footer.locator('.footer-tagline')).toHaveText(copy.footer.tagline)
    await expect(footer.locator('.footer-meeting')).toContainText(copy.weekdays[site.meeting.weekday])
    for (const value of [site.meeting.start, site.meeting.end, site.meeting.location]) {
      await expect(footer.locator('.footer-meeting')).toContainText(value)
    }
    await expect(footer.getByRole('link', { name: site.name, exact: true })).toHaveAttribute('href', localizedPath('/', locale))
    for (const [label, paths] of [
      [copy.footer.community, ['mitmachen', 'veranstaltungen', 'team', 'daten-sind-daten']],
      [copy.footer.explore, ['projekte', 'blog', 'ueber-uns', 'kontakt']],
      [copy.footer.legal, ['impressum', 'datenschutz', 'code-of-conduct']],
    ] as const) {
      const group = footer.getByRole('navigation', { name: label, exact: true })
      for (const path of paths) {
        const link = group.getByRole('link', { name: copy.nav[path], exact: true })
        await expect(link).toHaveAttribute('href', localizedPath(`/${path}`, locale))
        await expect(link).not.toHaveAttribute('target')
      }
    }
    const follow = footer.getByRole('navigation', { name: copy.footer.follow, exact: true })
    const mastodon = follow.getByRole('link', { name: 'Mastodon', exact: true })
    await expect(mastodon).toHaveAttribute('href', site.social.mastodon)
    await expect(mastodon).toHaveAttribute('rel', 'me noopener noreferrer')
    await expect(follow.getByRole('link', { name: 'GitHub', exact: true })).toHaveAttribute('href', site.github)
    for (const link of await footer.locator(`a[href="${site.github}"], a[href="${site.social.mastodon}"], a[href="${site.network.url}"]`).all()) {
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', /\bnoopener noreferrer\b/)
    }
    const rss = follow.getByRole('link', { name: 'RSS', exact: true })
    await expect(rss).toHaveAttribute('href', `/rss.xml?lang=${locale}`)
    await expect(rss).not.toHaveAttribute('target')
    const email = follow.getByRole('link', { name: copy.footer.email, exact: true })
    await expect(email).toHaveAttribute('href', `mailto:${site.contact.email}`)
    await expect(email).not.toHaveAttribute('target')
    await expect(footer.locator('.footer-meta').getByRole('link', { name: site.network.name })).toHaveAttribute('href', site.network.url)
    await expect(footer.locator('.footer-meta').getByRole('link', { name: site.association.name })).toHaveAttribute('href', localizedPath('/daten-sind-daten', locale))
    const join = footer.getByRole('link', { name: copy.footer.joinCta, exact: true })
    await join.focus()
    await page.keyboard.press('Tab')
    const githubCta = footer.getByRole('link', { name: copy.footer.githubCta, exact: true })
    await expect(githubCta).toBeFocused()
    await expect(githubCta).toHaveCSS('outline-style', 'solid')
    const undersized = await footer.locator('a').evaluateAll((links) => links.filter((link) => link.getBoundingClientRect().height < 44).map((link) => link.textContent))
    expect(undersized).toEqual([])
    for (const link of await footer.locator('.footer-group a').all()) await expect(link).toHaveCSS('font-size', '16px')
    expect((await new AxeBuilder({ page }).include('footer').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
    await join.click()
    await expect(page).toHaveURL(localizedPath('/mitmachen', locale))
  })
}

test('footer groups reflow from one to two to four columns', async ({ page, isMobile }) => {
  test.skip(isMobile)
  for (const [width, columns] of [[390, 1], [900, 2], [1440, 4]]) {
    await page.setViewportSize({ width: width!, height: 1000 })
    await page.goto('/')
    const grid = page.locator('.footer-inner')
    expect(await grid.evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(' ').length)).toBe(columns)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
})
