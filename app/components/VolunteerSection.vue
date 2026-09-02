<script setup lang="ts">
const points = ['small', 'support', 'learn', 'impact']
</script>

<template>
  <section id="join" class="content-section section-shell">
    <div class="volunteer-panel">
      <div>
        <p class="featured-label blue">{{ $t('volunteer.eyebrow') }}</p>
        <h2>{{ $t('volunteer.title') }}</h2>
        <p>{{ $t('volunteer.intro') }}</p>
      </div>
      <ul>
        <li v-for="point in points" :key="point"><Icon name="lucide:circle-check" />{{ $t(`volunteer.points.${point}`) }}</li>
      </ul>
      <div class="button-row volunteer-actions">
        <a href="#tasks" class="button button-mint">{{ $t('volunteer.tasks') }}</a>
        <a href="https://github.com/orgs/oklabflensburg/repositories" class="button button-light">{{ $t('volunteer.github') }}</a>
        <a href="#meeting" class="button button-light">{{ $t('volunteer.meeting') }}</a>
        <a href="mailto:info@oklabflensburg.de" class="button button-light">{{ $t('volunteer.contact') }}</a>
      </div>
    </div>
  </section>
</template>
