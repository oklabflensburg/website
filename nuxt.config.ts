import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-08-01',
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/icon'],
  devtools: { enabled: true },
  vite: { plugins: [tailwindcss()] },
  dir: { public: 'static' },
  app: {
    head: {
      htmlAttrs: { lang: 'de' },
      meta: [
        { name: 'theme-color', content: '#0069F6' },
        { name: 'description', content: 'Das OK Lab Flensburg entwickelt offene GIS-Anwendungen, Geodatenbanken und freie Software für die Region.' },
      ],
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },
  nitro: { prerender: { routes: ['/', '/de', '/da', '/en'] } },
})
