<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
const { t } = useI18n()
const localePath = useLocalePath()
useSeoMeta({ title: () => t('error.title'), robots: 'noindex, follow' })
</script>
<template>
  <main class="shell page">
    <p class="eyebrow">{{ error.statusCode }}</p>
    <PageHeading :title="$t('error.title')" :description="$t('error.text')" /><SiteLink
      :href="localePath('/')"
      class="button"
      >{{ $t('error.home') }}</SiteLink
    >
  </main>
</template>
