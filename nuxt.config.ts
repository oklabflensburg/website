import tailwindcss from '@tailwindcss/vite'
import { site } from './shared/config/site'

export default defineNuxtConfig({
  compatibilityDate: '2026-08-01',
  ssr: true,
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/i18n', '@nuxt/content', '@nuxt/image', '@nuxt/eslint'],
  vite: { plugins: [tailwindcss()] },
  app: {
    head: {
      link: [{ rel: 'icon', href: '/favicon.ico' }],
      meta: [{ name: 'theme-color', content: '#0758ce' }],
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
