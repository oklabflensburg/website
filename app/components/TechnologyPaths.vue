<script setup lang="ts">
import { technologyPaths } from '~/data/projects'
</script>

<template>
  <section id="technologies" class="content-section section-shell">
    <div class="section-heading">
      <h2>{{ $t('paths.title') }}</h2>
      <p>{{ $t('paths.intro') }}</p>
    </div>
    <div class="path-grid">
      <article v-for="path in technologyPaths" :key="path.slug" class="path-card">
        <Icon :name="`lucide:${path.icon}`" size="30" />
        <h3>{{ $t(`paths.${path.slug}.title`) }}</h3>
        <p>{{ $t(`paths.${path.slug}.text`) }}</p>
        <div class="tag-list"><span v-for="technology in path.technologies" :key="technology">{{ technology }}</span></div>
        <a href="#tasks">{{ $t('paths.cta') }} →</a>
      </article>
    </div>
  </section>
</template>
