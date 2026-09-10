<script setup lang="ts">
import { site } from '#shared/config/site'
const localeHead = useLocaleHead({ seo: true })
useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  link: localeHead.value.link,
  meta: localeHead.value.meta,
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
