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
  email: 'info@oklabflensburg.de',
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
export const staticPaths = [
  '/',
  '/projekte',
  '/blog',
  ...editorialSlugs.map((slug) => `/${slug}`),
]
export function localizedPath(path: string, locale: string) {
  return locale === 'de' ? path : `/${locale}${path === '/' ? '' : path}`
}
