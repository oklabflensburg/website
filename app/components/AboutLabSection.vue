<script setup lang="ts">
const steps = ['find', 'understand', 'prepare', 'publish', 'learn']
</script>

<template>
  <section id="about-lab" class="content-section about-lab">
    <div class="section-shell">
      <p class="eyebrow"><span />{{ $t('aboutLab.eyebrow') }}</p>
      <div class="section-heading">
        <h2>{{ $t('aboutLab.title') }}</h2>
        <p>{{ $t('aboutLab.intro') }}</p>
      </div>

      <div class="about-grid">
        <article>
          <Icon name="lucide:users" size="30" />
          <h3>{{ $t('aboutLab.community.title') }}</h3>
          <p>{{ $t('aboutLab.community.text') }}</p>
        </article>
        <article>
          <Icon name="lucide:database-zap" size="30" />
          <h3>{{ $t('aboutLab.work.title') }}</h3>
          <p>{{ $t('aboutLab.work.text') }}</p>
        </article>
        <article>
          <Icon name="lucide:landmark" size="30" />
          <h3>{{ $t('aboutLab.impact.title') }}</h3>
          <p>{{ $t('aboutLab.impact.text') }}</p>
        </article>
      </div>

      <div class="lab-process">
        <div>
          <p class="featured-label blue">{{ $t('aboutLab.process.eyebrow') }}</p>
          <h3>{{ $t('aboutLab.process.title') }}</h3>
          <p>{{ $t('aboutLab.process.text') }}</p>
        </div>
        <ol>
          <li v-for="(step, index) in steps" :key="step">
            <span>{{ index + 1 }}</span>
            {{ $t(`aboutLab.process.steps.${step}`) }}
          </li>
        </ol>
      </div>

      <div class="button-row about-actions">
        <a href="#meeting" class="button button-mint">{{ $t('aboutLab.meeting') }}</a>
        <a href="https://codefor.de/flensburg/" class="button button-light">{{ $t('aboutLab.codeFor') }} <Icon name="lucide:arrow-up-right" /></a>
      </div>
    </div>
  </section>
</template>
