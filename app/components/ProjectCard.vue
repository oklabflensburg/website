<script setup lang="ts">
import type { ProjectsCollectionItem } from '@nuxt/content'
withDefaults(defineProps<{ project: ProjectsCollectionItem; heading?: 'h2' | 'h3' }>(), { heading: 'h2' })
const localePath = useLocalePath()
</script>
<template>
  <article class="card project-card">
    <NuxtLink
      :to="localePath(`/projekte/${project.slug}`)"
      tabindex="-1"
      class="project-picture"
      ><img
        :src="project.image"
        :alt="project.imageAlt"
        width="1024"
        height="1024"
        loading="lazy"
        decoding="async"
    /></NuxtLink>
    <div class="card-body">
      <component :is="heading">
        <NuxtLink :to="localePath(`/projekte/${project.slug}`)">{{ project.title }}</NuxtLink>
      </component>
      <p>{{ project.description }}</p>
      <div class="tags">
        <span v-for="category in project.categories" :key="category">{{ $t(`categories.${category}`) }}</span>
        <span>{{ project.technologies.includes('GIS') || project.technologies.includes('PostGIS') ? 'GIS' : 'Open Data' }}</span>
      </div>
      <NuxtLink :to="localePath(`/projekte/${project.slug}`)" class="text-link" :aria-label="`${$t('common.learn')}: ${project.title}`">{{ $t('common.learn') }} <AppIcon name="arrow" :size="16" /></NuxtLink>
    </div>
  </article>
</template>
