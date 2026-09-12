<script setup lang="ts">
import { site } from '#shared/config/site'
import type { TranslationGroup } from '#shared/utils/translations'
const requestFetch = useRequestFetch()
await useAsyncData('translations', () => requestFetch<TranslationGroup[]>('/api/translations'))
// Content-aware canonical/alternate links are owned by usePageSeo.
const localeHead = useLocaleHead({ seo: false })
// Load once in the shared shell, only on the public site's production hostname.
// Plausible handles History API navigation; an extra router hook would double count.
if (!import.meta.dev && useRequestURL().hostname === new URL(site.url).hostname) {
  useHead({
    script: [
      {
        key: 'plausible-init',
        tagPriority: 1,
        innerHTML: 'window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)};window.plausible.init=window.plausible.init||function(i){window.plausible.o=i||{}};window.plausible.init();',
      },
      { key: 'plausible', tagPriority: 2, async: true, src: site.analytics.script },
    ],
  })
}
useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
}))
useHead({
  script: [
    {
      key: 'organization',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${site.url}/#organization`,
            name: site.name,
            url: site.url,
            logo: new URL(site.logo, site.url).href,
            // This Organization describes the Lab, not its runtime legal operator.
            email: site.contact.email,
            sameAs: [site.github, site.network.url, site.social.mastodon],
          },
          {
            '@type': 'WebSite',
            '@id': `${site.url}/#website`,
            name: site.name,
            url: site.url,
            inLanguage: ['de', 'da', 'en'],
            publisher: { '@id': `${site.url}/#organization` },
          },
        ],
      }),
    },
  ],
})
</script>
<template>
  <NuxtRouteAnnouncer />
  <AppHeader />
  <main id="main-content" tabindex="-1"><NuxtPage /></main>
  <AppFooter />
</template>
