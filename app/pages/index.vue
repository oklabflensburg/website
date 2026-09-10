<script setup lang="ts">
import { site } from '#shared/config/site'
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { data } = await useAsyncData(
  () => `home-${locale.value}`,
  async () => ({
    projects: await queryCollection('projects')
      .where('locale', '=', locale.value)
      .where('featured', '=', true)
      .order('slug', 'ASC')
      .all(),
    posts: await queryCollection('blog')
      .where('locale', '=', locale.value)
      .where('draft', '=', false)
      .where('date', '<=', new Date().toISOString().slice(0, 10))
      .order('date', 'DESC')
      .order('slug', 'ASC')
      .limit(2)
      .all(),
  }),
)
usePageSeo(
  () => `${t('hero.line1')} ${t('hero.line2')}`,
  () => t('hero.intro'),
)
</script>
<template>
  <div>
    <section class="hero shell">
      <div class="hero-copy">
        <p class="eyebrow"><span class="live-dot" />{{ $t('hero.eyebrow') }}</p>
        <h1>
          {{ $t('hero.line1') }}<br /><span>{{ $t('hero.line2') }}</span>
        </h1>
        <p class="lead">{{ $t('hero.intro') }}</p>
        <div class="button-row">
          <NuxtLink :to="localePath('/mitmachen')" class="button"
            >{{ $t('nav.mitmachen') }}
            <span aria-hidden="true">↗</span></NuxtLink
          ><NuxtLink
            :to="localePath('/projekte')"
            class="button button-secondary"
            >{{ $t('hero.explore') }}
            <span aria-hidden="true">→</span></NuxtLink
          >
        </div>
        <p class="hero-footnote">{{ $t('hero.label') }}</p>
      </div>
      <div class="hero-visual">
        <div class="visual-top">
          <span class="live-dot" />{{ $t('hero.map')
          }}<span aria-hidden="true">↗</span>
        </div>
        <svg viewBox="0 0 480 380" aria-hidden="true" class="region-map">
          <defs>
            <pattern
              id="grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="#bed3e3"
                stroke-width=".7"
              />
            </pattern>
          </defs>
          <rect width="480" height="380" fill="url(#grid)" />
          <path
            d="M290-10C260 50 330 60 310 115S200 135 245 195 335 190 340 250 290 300 345 390H500V-10Z"
            fill="#b8def3"
          />
          <g stroke="#fff" stroke-width="10" fill="none">
            <path
              d="M-20 95 85 135 125 80 200 120 290 85M50 400 140 290 90 200 205 160 270 200M-10 285 140 290 245 250 320 310M125 80 100-20M205 160 200 120"
            />
          </g>
          <g stroke="#809bac" stroke-width="1.5" fill="none">
            <path
              d="M-20 95 85 135 125 80 200 120 290 85M50 400 140 290 90 200 205 160 270 200M-10 285 140 290 245 250 320 310M125 80 100-20M205 160 200 120"
            />
          </g>
          <g fill="#c0dec4">
            <rect
              x="20"
              y="170"
              width="46"
              height="66"
              rx="14"
              transform="rotate(-12 20 170)"
            />
            <rect x="160" y="204" width="42" height="42" rx="10" />
            <rect x="162" y="30" width="50" height="43" rx="12" />
          </g>
          <g fill="#0758ce" stroke="white" stroke-width="4">
            <circle cx="205" cy="160" r="11" />
            <circle cx="140" cy="290" r="9" />
            <circle cx="85" cy="135" r="9" />
            <circle cx="270" cy="200" r="9" />
          </g>
          <circle
            cx="205"
            cy="160"
            r="27"
            stroke="#0758ce"
            stroke-width="1"
            fill="none"
            opacity=".4"
          />
          <path
            d="m85 135 120 25 65 40M205 160 140 290"
            fill="none"
            stroke="#0758ce"
            stroke-width="2"
            stroke-dasharray="5 5"
          />
        </svg>
        <div class="map-label">
          <span aria-hidden="true">⌘</span>
          <div>
            Open Data<small>{{ $t('hero.caption') }}</small>
          </div>
        </div>
        <div class="visual-bottom">
          <span>54°47′ N &nbsp; 9°26′ E</span
          ><span aria-hidden="true">+ &nbsp; −</span>
        </div>
      </div>
    </section>
    <section class="pillars shell" :aria-label="$t('nav.ueber-uns')">
      <article
        v-for="(pillar, index) in ['data', 'source', 'civic', 'community']"
        :key="pillar"
      >
        <span class="pillar-icon" aria-hidden="true">{{
          ['{ }', '⌘', '↗', '◎'][index]
        }}</span>
        <h2>{{ $t(`pillars.${pillar}.title`) }}</h2>
        <p>{{ $t(`pillars.${pillar}.text`) }}</p>
      </article>
    </section>
    <section class="section shell">
      <div class="section-heading">
        <div>
          <p class="eyebrow">{{ $t('nav.projekte') }}</p>
          <h2>{{ $t('home.projects') }}</h2>
          <p>{{ $t('home.projectsIntro') }}</p>
        </div>
        <NuxtLink :to="localePath('/projekte')" class="text-link"
          >{{ $t('home.allProjects') }} →</NuxtLink
        >
      </div>
      <div class="project-grid">
        <ProjectCard
          v-for="project in data?.projects"
          :key="project.id"
          :project="project"
        />
      </div>
    </section>
    <div class="shell"><MeetingSection /></div>
    <section class="section shell">
      <div class="section-heading">
        <div>
          <p class="eyebrow">{{ $t('nav.blog') }}</p>
          <h2>{{ $t('home.blog') }}</h2>
        </div>
        <NuxtLink :to="localePath('/blog')" class="text-link"
          >{{ $t('home.allPosts') }} →</NuxtLink
        >
      </div>
      <div class="blog-grid">
        <BlogCard v-for="post in data?.posts" :key="post.id" :post="post" />
      </div>
    </section>
    <section class="join-band">
      <div class="shell join-inner">
        <div>
          <p class="eyebrow">{{ $t('nav.mitmachen') }}</p>
          <h2>{{ $t('home.joinTitle') }}</h2>
          <p>{{ $t('home.joinText') }}</p>
        </div>
        <NuxtLink :to="localePath('/mitmachen')" class="button button-light"
          >{{ $t('nav.mitmachen') }} ↗</NuxtLink
        >
      </div>
    </section>
    <section class="shell association-strip">
      <div>
        <p class="eyebrow">{{ site.association.name }}</p>
        <p>{{ $t('home.associationText') }}</p>
      </div>
      <NuxtLink :to="localePath('/daten-sind-daten')" class="text-link"
        >{{ $t('home.associationLink') }} →</NuxtLink
      >
    </section>
  </div>
</template>
