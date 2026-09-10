<script setup lang="ts">
import { findTranslationGroup } from '#shared/utils/translations'
const props = defineProps<{ href?: string }>()
const localePath = useLocalePath()
const { locale } = useI18n()
const { groups } = useTranslations()
const target = computed(() => {
  if (!props.href?.startsWith('/') || props.href.startsWith('//')) return props.href
  const url = new URL(props.href, 'https://local.invalid')
  const group = findTranslationGroup(groups.value ?? [], url.pathname)
  const variant = group?.variants.find((item) => item.locale === locale.value)
  // An absent translation keeps the real source-language link, never a guessed URL.
  return variant ? localePath(variant.path, variant.locale) + url.search + url.hash : props.href
})
</script>
<template>
  <NuxtLink
    v-if="href?.startsWith('/') && !href.startsWith('//')"
    :to="target"
    ><slot /></NuxtLink
  ><a v-else :href="href"><slot /></a>
</template>
