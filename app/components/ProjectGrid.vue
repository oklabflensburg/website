<script setup lang="ts">
import { projects } from '~/data/projects'
</script>

<template>
  <section id="projects" class="content-section section-shell">
    <div class="section-heading">
      <h2>{{ $t('projectsSection.title') }}</h2>
      <p>{{ $t('projectsSection.intro') }}</p>
    </div>
    <div class="project-grid">
      <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
    </div>
  </section>
</template>
