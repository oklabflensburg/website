<script setup lang="ts">
import contributorsData from '~/data/contributors.json'
import type { Contributor } from '~/types/content'
useLocalizedSeo('meta.contributorsTitle', 'meta.contributorsDescription')
const localePath = useLocalePath()
const contributors = contributorsData as Contributor[]
</script>

<template>
  <div class="site-page">
    <AppHeader />
    <main id="main-content" class="contributors-page">
      <section class="section-shell page-hero">
        <p class="eyebrow"><span />{{ $t('contributors.eyebrow') }}</p>
        <h1>{{ $t('contributors.pageTitle') }}</h1>
        <p>{{ $t('contributors.pageIntro') }}</p>
        <div class="button-row">
          <NuxtLink :to="`${localePath('/')}#tasks`" class="button button-mint">{{ $t('volunteer.tasks') }}</NuxtLink>
          <a href="mailto:info@oklabflensburg.de" class="button button-light">{{ $t('volunteer.contact') }}</a>
        </div>
      </section>
      <section class="section-shell contributor-explain">
        <article><h2>{{ $t('contributors.howTitle') }}</h2><p>{{ $t('contributors.howText') }}</p></article>
        <article><h2>{{ $t('contributors.listedTitle') }}</h2><p>{{ $t('contributors.listedText') }}</p></article>
        <article><h2>{{ $t('contributors.optOutTitle') }}</h2><p>{{ $t('contributors.optOutText') }}</p></article>
      </section>
      <section class="section-shell content-section">
        <div class="contributors-grid full">
          <ContributorCard v-for="contributor in contributors" :key="contributor.login" :contributor="contributor" />
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>
