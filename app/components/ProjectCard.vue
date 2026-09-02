<script setup lang="ts">
import type { Project } from '~/types/content'
defineProps<{ project: Project }>()
</script>

<template>
  <article class="project-card">
    <div v-if="project.image" class="project-image">
      <img :src="project.image" :alt="$t('a11y.projectPreview', { title: project.title })" loading="lazy" width="640" height="360">
    </div>
    <div v-else class="map-grid project-placeholder" aria-hidden="true"><Icon name="lucide:map" size="48" /></div>
    <div class="project-body">
      <div class="project-meta">
        <span>{{ $t(`project.category.${project.categoryKey}`) }}</span>
        <span class="status" :data-status="project.status"><i />{{ $t(`project.status.${project.status}`) }}</span>
      </div>
      <h3>{{ project.title }}</h3>
      <p>{{ $t(`project.description.${project.descriptionKey}`) }}</p>
      <div class="tag-list"><span v-for="tech in project.technologies.slice(0, 4)" :key="tech">{{ tech }}</span></div>
      <div class="project-links">
        <a v-if="project.websiteUrl" :href="project.websiteUrl">{{ $t('common.discover') }} <Icon name="lucide:arrow-up-right" /></a>
        <a v-if="project.repositoryUrl" :href="project.repositoryUrl" :aria-label="`${$t('common.repository')}: ${project.title}`"><Icon name="lucide:github" /> {{ $t('common.repository') }}</a>
      </div>
    </div>
  </article>
</template>
