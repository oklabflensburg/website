<script setup lang="ts">
import { site } from '#shared/config/site'
const props = defineProps<{
  title: string
  parent?: { title: string; path: string }
}>()
const localePath = useLocalePath()
const route = useRoute()
const { t } = useI18n()
const items = computed(() => [
  { title: t('nav.home'), path: localePath('/') },
  ...(props.parent
    ? [{ title: props.parent.title, path: localePath(props.parent.path) }]
    : []),
  { title: props.title, path: route.path },
])
useHead(() => ({
  script: [
    {
      key: 'breadcrumbs',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.value.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.title,
          item: `${site.url}${item.path}`,
        })),
      }).replace(/</g, '\u003c'),
    },
  ],
}))
</script>
<template>
  <nav class="breadcrumbs" :aria-label="$t('a11y.breadcrumbs')">
    <ol>
      <li v-for="(item, i) in items" :key="item.path">
        <NuxtLink v-if="i < items.length - 1" :to="item.path">{{
          item.title
        }}</NuxtLink
        ><span v-else aria-current="page">{{ item.title }}</span>
      </li>
    </ol>
  </nav>
</template>
