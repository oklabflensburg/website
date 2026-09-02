import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

export default defineNuxtConfig({
  compatibilityDate: '2026-08-01',
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/icon', '@nuxtjs/i18n'],
  devtools: { enabled: true },
  vite: { plugins: [tailwindcss()] },
  dir: { public: 'static' },
  app: {
    head: {
      meta: [
        { name: 'theme-color', content: '#0069F6' },
      ],
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },
  i18n: {
    baseUrl: 'https://oklabflensburg.de',
    defaultLocale: 'de',
    strategy: 'prefix',
    langDir: 'locales',
    locales: [
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'da', language: 'da-DK', name: 'Dansk', file: 'da.json' },
      { code: 'en', language: 'en-GB', name: 'English', file: 'en.json' },
    ],
    detectBrowserLanguage: false,
    customRoutes: 'config',
    pages: {
      contributors: {
        de: '/mitwirkende',
        da: '/bidragsydere',
        en: '/contributors',
      },
    },
    vueI18n: './i18n.config.ts',
  },
  routeRules: { '/': { redirect: { to: '/de', statusCode: 301 } } },
  nitro: {
    publicAssets: [{ dir: resolve('src'), baseURL: '/legacy' }],
    prerender: {
      routes: [
        '/', '/de', '/da', '/en',
        '/de/mitwirkende', '/da/bidragsydere', '/en/contributors',
      ],
    },
  },
})
