export const site = {
  name: 'OK Lab Flensburg',
  logo: '/brand/oklabflensburg-logo.png',
  socialImage: '/social-card.png',
  projectSocialImages: '/social/projects',
  favicons: {
    ico: '/favicon.ico',
    small: '/favicon-16x16.png',
    medium: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  url: 'https://oklabflensburg.de',
  analytics: {
    script: 'https://plausible.oklabflensburg.de/js/pa-kAVDHPi3E6v_DQyTEdWt-.js',
  },
  // Public community inbox; legal/operator contact belongs to runtimeConfig.public.legal.
  contact: { email: 'info@oklabflensburg.de' },
  github: 'https://github.com/oklabflensburg',
  repository: 'https://github.com/oklabflensburg/website',
  social: { mastodon: 'https://norden.social/@oklabflensburg' },
  network: { name: 'Code for Germany', url: 'https://codefor.de/flensburg/' },
  association: { name: 'DatenSindDaten e.V.' },
  meeting: {
    weekday: 3,
    start: '18:00',
    end: '21:00',
    timezone: 'Europe/Berlin',
    location: 'Aktivitetshuset',
    street: 'Norderstraße 49',
    postalCode: '24939',
    city: 'Flensburg',
    country: 'DE',
    map: 'https://www.openstreetmap.org/search?query=Norderstra%C3%9Fe%2049%2C%20Flensburg',
  },
} as const
export const locales = ['de', 'da', 'en'] as const
export type SiteLocale = (typeof locales)[number]
export const editorialSlugs = [
  'mitmachen',
  'ueber-uns',
  'team',
  'daten-sind-daten',
  'veranstaltungen',
  'kontakt',
  'impressum',
  'datenschutz',
  'code-of-conduct',
] as const
// One typed route matrix drives Nuxt i18n and server-side URL serialization.
// Content slugs are not translation identities and are never stored here.
export const routePaths = {
  index: { de: '/', da: '/', en: '/' },
  projekte: { de: '/projekte', da: '/projekter', en: '/projects' },
  blog: { de: '/blog', da: '/blog', en: '/blog' },
  mitmachen: { de: '/mitmachen', da: '/deltag', en: '/join' },
  'ueber-uns': { de: '/ueber-uns', da: '/om-os', en: '/about' },
  team: { de: '/team', da: '/team', en: '/team' },
  'daten-sind-daten': { de: '/daten-sind-daten', da: '/daten-sind-daten', en: '/daten-sind-daten' },
  veranstaltungen: { de: '/veranstaltungen', da: '/arrangementer', en: '/events' },
  kontakt: { de: '/kontakt', da: '/kontakt', en: '/contact' },
  impressum: { de: '/impressum', da: '/kolofon', en: '/legal-notice' },
  datenschutz: { de: '/datenschutz', da: '/privatliv', en: '/privacy' },
  'code-of-conduct': { de: '/code-of-conduct', da: '/adfaerdskodeks', en: '/code-of-conduct' },
} as const satisfies Record<string, Record<SiteLocale, string>>
export const localeLanguages = { de: 'de-DE', da: 'da-DK', en: 'en-GB' } as const
export const staticPaths = Object.values(routePaths).map((paths) => paths.de)
export function localizedPath(path: string, locale: string) {
  if (!locales.includes(locale as SiteLocale)) throw new Error(`Unsupported locale: ${locale}`)
  const match = path.match(/^(\/[^/?#]*)(.*)$/)
  if (!match) throw new Error(`Expected a root-relative route: ${path}`)
  const base = Object.values(routePaths).find((paths) => paths.de === match[1])
  const translated = (base?.[locale as SiteLocale] ?? match[1]!) + match[2]!
  return locale === 'de' ? translated : `/${locale}${translated === '/' ? '' : translated}`
}
