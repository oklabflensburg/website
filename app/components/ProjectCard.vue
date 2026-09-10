<script setup lang="ts">
import type { ProjectsCollectionItem } from '@nuxt/content'
defineProps<{ project: ProjectsCollectionItem }>()
const localePath = useLocalePath()
</script>
<template>
  <article class="card project-card">
    <NuxtLink
      :to="localePath(`/projekte/${project.slug}`)"
      tabindex="-1"
      aria-hidden="true"
      class="project-picture"
      ><NuxtImg
        v-if="project.image"
        :src="project.image"
        alt=""
        width="640"
        height="360"
        sizes="sm:100vw md:50vw lg:33vw"
        loading="lazy" />
      <div v-else class="project-pattern">
        <span>{{ project.title.slice(0, 2).toUpperCase() }}</span
        ><span class="map-point" /></div
    ></NuxtLink>
    <div class="card-body">
      <div class="card-meta">
        <span>{{ $t(`categories.${project.categories[0]}`) }}</span
        ><span class="status-dot">{{ $t(`status.${project.status}`) }}</span>
      </div>
      <h2>
        <NuxtLink :to="localePath(`/projekte/${project.slug}`)"
          >{{ project.title }} <span aria-hidden="true">↗</span></NuxtLink
        >
      </h2>
      <p>{{ project.description }}</p>
      <div class="tags">
        <span v-for="tech in project.technologies.slice(0, 3)" :key="tech">{{
          tech
        }}</span>
      </div>
    </div>
  </article>
</template>
