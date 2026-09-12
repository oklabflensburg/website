<script setup lang="ts">
import { findTranslationGroup } from '#shared/utils/translations'
import { internalLinkPath } from '#shared/utils/links'
const props = defineProps<{ href?: string; target?: string; rel?: string }>()
const localePath = useLocalePath()
const { locale } = useI18n()
const { groups } = useTranslations()
const internalPath = computed(() => internalLinkPath(props.href))
const target = computed(() => {
  if (!internalPath.value) return props.href
  const url = new URL(internalPath.value, 'https://local.invalid')
  const group = findTranslationGroup(groups.value ?? [], url.pathname)
  const variant = group?.variants.find((item) => item.locale === locale.value)
  // An absent translation keeps the real source-language link, never a guessed URL.
  return variant ? localePath(variant.path, variant.locale) + url.search + url.hash : internalPath.value
})
</script>
<template>
  <NuxtLink
    v-if="internalPath"
    :to="target"
    ><slot /></NuxtLink
  ><SiteLink v-else :href="href" :rel="rel"><slot /></SiteLink>
</template>
