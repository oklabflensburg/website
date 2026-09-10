import { test, expect } from '@playwright/test'
import { site } from '../../shared/config/site'

test('localized routes reload, switch translated slugs and expose reciprocal SEO', async ({ page, request, isMobile }) => {
  const paths = ['/ueber-uns', '/da/om-os', '/en/about', '/da/deltag', '/en/join', '/da/arrangementer', '/en/events', '/da/projekter', '/en/projects']
  for (const path of paths) {
    await page.goto(path)
    await page.reload()
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', site.url + path)
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', site.url + path)
  }
  for (const [start, english, danish] of [
    ['/projekte/spielplatzkarte', '/en/projects/playground-map', '/da/projekter/legepladskort'],
    ['/blog/offene-daten-verstehen', '/en/blog/understanding-open-data', '/da/blog/forstaa-aabne-data'],
  ]) {
    await page.goto(start!)
    await expect(page.locator('link[hreflang="en-GB"]')).toHaveAttribute('href', site.url + english)
    if (isMobile) await page.getByRole('button', { name: 'Menü öffnen' }).click()
    await page.getByRole('link', { name: 'English', exact: true }).click()
    await expect(page).toHaveURL(english!)
    await page.reload()
    await expect(page.locator('link[hreflang="de-DE"]')).toHaveAttribute('href', site.url + start)
    if (isMobile) await page.getByRole('button', { name: 'Open menu' }).click()
    await page.getByRole('link', { name: 'Dansk', exact: true }).click()
    await expect(page).toHaveURL(danish!)
    await expect(page.locator('link[hreflang="en-GB"]')).toHaveAttribute('href', site.url + english)
    // Headers must already be correct in SSR, before a browser hydrates.
    const html = await (await request.get(danish!)).text()
    expect(html).toContain(`href="${site.url + english}"`)
  }
  for (const [old, target] of [
    ['/en/ueber-uns', '/en/about'], ['/da/veranstaltungen', '/da/arrangementer'],
    ['/en/projekte/spielplatzkarte?q=map', '/en/projects/playground-map?q=map'],
    ['/da/blog/offene-daten-verstehen', '/da/blog/forstaa-aabne-data'],
  ]) {
    const response = await request.get(old!, { maxRedirects: 0 })
    expect(response.status()).toBe(301)
    expect(response.headers().location).toBe(target)
  }
  const xml = await (await request.get('/sitemap.xml')).text()
  const sitemap = await page.evaluate((source) => {
    const doc = new DOMParser().parseFromString(source, 'application/xml')
    return { errors: doc.querySelectorAll('parsererror').length, entries: [...doc.querySelectorAll('url')].map((node) => ({
      loc: node.querySelector('loc')?.textContent,
      alternates: [...node.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'link')].map((link) => link.getAttribute('href')),
    })) }
  }, xml)
  expect(sitemap.errors).toBe(0)
  expect(sitemap.entries.find((entry) => entry.loc === site.url + '/projekte/spielplatzkarte')?.alternates).toEqual(expect.arrayContaining([
    site.url + '/en/projects/playground-map', site.url + '/da/projekter/legepladskort',
  ]))
  const rss = await (await request.get('/rss.xml?lang=en')).text()
  expect(rss).toContain(site.url + '/en/blog/understanding-open-data')
  expect(rss).not.toContain('/en/blog/offene-daten-verstehen')
})
