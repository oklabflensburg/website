import { site } from '#shared/config/site'
export function usePageSeo(
  title: MaybeRefOrGetter<string>,
  description: MaybeRefOrGetter<string>,
  options: {
    image?: MaybeRefOrGetter<string | undefined>
    article?: boolean
    noindex?: MaybeRefOrGetter<boolean>
  } = {},
) {
  const route = useRoute()
  const { locale } = useI18n()
  const canonical = computed(() => `${site.url}${route.path}`)
  const image = computed(
    () => new URL(toValue(options.image) || '/social-card.png', site.url).href,
  )
  useSeoMeta({
    title: () => `${toValue(title)} · ${site.name}`,
    description: () => toValue(description),
    ogTitle: () => toValue(title),
    ogDescription: () => toValue(description),
    ogType: options.article ? 'article' : 'website',
    ogUrl: canonical,
    ogImage: image,
    ogLocale: () => ({ de: 'de_DE', da: 'da_DK', en: 'en_GB' })[locale.value],
    twitterCard: 'summary_large_image',
    twitterTitle: () => toValue(title),
    twitterDescription: () => toValue(description),
    twitterImage: image,
    robots: () =>
      toValue(options.noindex) ? 'noindex, follow' : 'index, follow',
  })
  useHead(() => ({
    script: [
      {
        key: 'webpage',
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${canonical.value}#webpage`,
          url: canonical.value,
          name: toValue(title),
          description: toValue(description),
          inLanguage: locale.value,
          isPartOf: { '@id': `${site.url}/#website` },
        }).replace(/</g, '\u003c'),
      },
    ],
  }))
}
