<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <section class="hero">
    <div class="map-grid hero-map" aria-hidden="true" />
    <div class="section-shell">
      <p class="eyebrow"><span />{{ $t('hero.eyebrow') }}</p>
      <h1>{{ $t('hero.title') }}</h1>
      <p class="hero-intro">{{ $t('hero.intro') }}</p>
      <div class="button-row">
        <NuxtLink :to="`${localePath('/')}#tasks`" class="button button-mint">{{ $t('hero.find') }} <Icon name="lucide:arrow-right" /></NuxtLink>
        <NuxtLink :to="`${localePath('/')}#projects`" class="button button-light">{{ $t('hero.explore') }}</NuxtLink>
      </div>
      <div class="hero-tags">
        <span><Icon name="lucide:map" /> GIS & OpenStreetMap</span>
        <span><Icon name="lucide:database" /> PostgreSQL & PostGIS</span>
        <span><Icon name="lucide:users" /> {{ $t('hero.localRemote') }}</span>
      </div>
    </div>
  </section>
</template>
