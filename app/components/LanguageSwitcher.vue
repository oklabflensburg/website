<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()
const { locales, locale } = useI18n()
</script>
<template>
  <nav class="languages" :aria-label="$t('a11y.language')">
    <NuxtLink
      v-for="language in locales"
      :key="language.code"
      :to="switchLocalePath(language.code)"
      :lang="language.code"
      :hreflang="language.language"
      :aria-current="locale === language.code ? 'true' : undefined"
      :aria-label="language.name"
      >{{ language.code.toUpperCase() }}</NuxtLink
    >
  </nav>
</template>
