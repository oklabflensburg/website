<script setup lang="ts">
import { site } from '#shared/config/site'
import type { TranslationGroup } from '#shared/utils/translations'
const requestFetch = useRequestFetch()
await useAsyncData('translations', () => requestFetch<TranslationGroup[]>('/api/translations'))
// Content-aware canonical/alternate links are owned by usePageSeo.
const localeHead = useLocaleHead({ seo: false })
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
            email: site.email,
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
