<script setup lang="ts">
import contributorsData from '~/data/contributors.json'
import type { Contributor } from '~/types/content'
const localePath = useLocalePath()
const contributors = (contributorsData as Contributor[]).slice(0, 4)
</script>

<template>
  <section id="contributors" class="content-section contributors-section">
    <div class="section-shell">
      <p class="eyebrow"><span />{{ $t('contributors.eyebrow') }}</p>
      <div class="section-heading">
        <h2>{{ $t('contributors.title') }}</h2>
        <p>{{ $t('contributors.intro') }}</p>
      </div>
      <div v-if="contributors.length" class="contributors-grid">
        <ContributorCard v-for="contributor in contributors" :key="contributor.login" :contributor="contributor" />
      </div>
      <div class="button-row">
        <NuxtLink :to="localePath('contributors')" class="button button-light">{{ $t('contributors.all') }}</NuxtLink>
        <a href="#tasks" class="button button-mint">{{ $t('contributors.cta') }}</a>
      </div>
    </div>
  </section>
</template>
