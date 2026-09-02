<script setup lang="ts">
const tasks = [
  { key: 'postgis', url: 'https://github.com/oklabflensburg/open-city-planner/issues' },
  { key: 'etl', url: 'https://github.com/oklabflensburg/open-data-api/issues' },
  { key: 'maplibre', url: 'https://github.com/orgs/oklabflensburg/repositories' },
  { key: 'docs', url: 'https://github.com/orgs/oklabflensburg/repositories' },
]
</script>

<template>
  <section id="tasks" class="content-section section-shell">
    <div class="section-heading">
      <h2>{{ $t('tasks.title') }}</h2>
      <p>{{ $t('tasks.intro') }}</p>
    </div>
    <div class="task-grid">
      <a v-for="task in tasks" :key="task.key" :href="task.url">
        <span><strong>{{ $t(`tasks.items.${task.key}.title`) }}</strong><small>{{ $t(`tasks.items.${task.key}.meta`) }}</small></span>
        <Icon name="lucide:arrow-up-right" />
      </a>
    </div>
  </section>
</template>
