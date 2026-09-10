import tailwindcss from '@tailwindcss/vite'
import { editorialSlugs, routePaths, site } from './shared/config/site'

export default defineNuxtConfig({
  compatibilityDate: '2026-08-01',
  ssr: true,
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/i18n', '@nuxt/content', '@nuxt/image', '@nuxt/eslint'],
  vite: { plugins: [tailwindcss()] },
  hooks: {
    'pages:extend'(pages) {
      for (const page of pages) {
        const editorialKey = editorialSlugs.find((key) => key === page.name)
        if (editorialKey) {
          page.meta = { ...page.meta, editorialKey, i18n: { paths: routePaths[editorialKey] } }
        }
        if (page.name === 'projekte' || page.name === 'projekte-slug') {
          const detail = page.name === 'projekte-slug'
          page.meta = { ...page.meta, i18n: { paths: Object.fromEntries(
            Object.entries(routePaths.projekte).map(([locale, path]) => [locale, `${path}${detail ? '/[slug]' : ''}`]),
          ) } }
        }
      }
    },
  },
  app: {
    head: {
      link: [
        { rel: 'icon', href: site.favicons.ico, sizes: 'any' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: site.favicons.medium },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: site.favicons.small },
        { rel: 'apple-touch-icon', sizes: '180x180', href: site.favicons.apple },
      ],
      meta: [{ name: 'theme-color', content: '#0b4f80' }],
    },
  },
  i18n: {
    baseUrl: site.url,
    defaultLocale: 'de',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    locales: [
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'da', language: 'da-DK', name: 'Dansk', file: 'da.json' },
      { code: 'en', language: 'en-GB', name: 'English', file: 'en.json' },
    ],
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts',
  },
  content: {
    experimental: { sqliteConnector: 'native' },
    build: { markdown: { highlight: false } },
  },
  image: { format: ['webp'], quality: 80 },
  nitro: { preset: 'node-server' },
  routeRules: {
    '/de': { redirect: { to: '/', statusCode: 301 } },
    '/de/mitwirkende': { redirect: { to: '/team', statusCode: 301 } },
    '/da/bidragsydere': { redirect: { to: '/da/team', statusCode: 301 } },
    '/en/contributors': { redirect: { to: '/en/team', statusCode: 301 } },
    '/impressum.html': { redirect: { to: '/impressum', statusCode: 301 } },
    '/lizenz.html': { redirect: { to: '/impressum', statusCode: 301 } },
  },
})
