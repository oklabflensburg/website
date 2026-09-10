<script setup lang="ts">
const localePath = useLocalePath()
const route = useRoute()
const { current } = useTranslations()
const { locales, locale } = useI18n()
const available = computed(() => locales.value.flatMap((language) => {
  const variant = current.value?.variants.find((item) => item.locale === language.code)
  return variant ? [{ ...language, path: variant.path }] : []
}))
</script>
<template>
  <nav class="languages" :aria-label="$t('a11y.language')">
    <NuxtLink
      v-for="language in available"
      :key="language.code"
      :to="localePath({ path: language.path, query: route.query, hash: route.hash }, language.code)"
      :lang="language.code"
      :hreflang="language.language"
      :aria-current="locale === language.code ? 'true' : undefined"
      :aria-label="language.name"
      >{{ language.code.toUpperCase() }}</NuxtLink
    >
  </nav>
</template>
