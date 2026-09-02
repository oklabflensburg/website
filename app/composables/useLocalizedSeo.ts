export function useLocalizedSeo(titleKey: string, descriptionKey: string) {
  const { t, locale } = useI18n()
  const route = useRoute()
  const localeHead = useLocaleHead({ seo: true })
  const siteUrl = 'https://oklabflensburg.de'
  const canonical = computed(() => `${siteUrl}${route.path}`)
  const ogLocale = computed(() => ({ de: 'de_DE', da: 'da_DK', en: 'en_GB' })[locale.value] ?? 'de_DE')

  useHead(() => ({
    htmlAttrs: localeHead.value.htmlAttrs,
    link: localeHead.value.link,
    meta: localeHead.value.meta,
  }))
  useSeoMeta({
    title: () => t(titleKey),
    description: () => t(descriptionKey),
    ogTitle: () => t(titleKey),
    ogDescription: () => t(descriptionKey),
    ogType: 'website',
    ogUrl: canonical,
    ogLocale,
  })
  useHead(() => ({ link: [{ rel: 'canonical', href: canonical.value }] }))
}
