<script setup lang="ts">
import { site } from '#shared/config/site'
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { data } = await useAsyncData(
  () => `home-${locale.value}`,
  async () => ({
    projects: await queryCollection('projects').where('locale', '=', locale.value).where('featured', '=', true).order('featuredOrder', 'ASC').all(),
    projectCount: await queryCollection('projects').where('locale', '=', locale.value).count(),
    posts: await queryCollection('blog').where('locale', '=', locale.value).where('draft', '=', false).where('date', '<=', new Date().toISOString().slice(0, 10)).order('date', 'DESC').order('slug', 'ASC').limit(3).all(),
  }),
)
usePageSeo(() => `${t('hero.line1')} ${t('hero.line2')}`, () => t('hero.intro'))
</script>
<template>
  <div>
    <section class="hero shell">
      <div class="hero-copy">
        <h1>{{ $t('hero.line1') }}<br />{{ $t('hero.line2') }}</h1>
        <p class="lead">{{ $t('hero.intro') }}</p>
        <div class="button-row">
          <NuxtLink :to="localePath('/mitmachen')" class="button">{{ $t('nav.mitmachen') }} <AppIcon name="arrow" :size="18" /></NuxtLink>
          <NuxtLink :to="localePath('/projekte')" class="button button-secondary">{{ $t('hero.explore') }}</NuxtLink>
        </div>
      </div>
      <div class="hero-visual">
        <img src="/images/flensburg-map.svg" :alt="$t('hero.map')" width="800" height="680" fetchpriority="high" />
        <div class="hero-map-fade" /><span class="absolute top-[74%] left-[47%] text-base font-bold text-brand">{{ site.meeting.city }}</span>
        <p class="map-caption">{{ $t('hero.caption') }}</p>
        <a class="map-credit" href="https://www.openstreetmap.org/copyright">© OpenStreetMap</a>
      </div>
    </section>
    <section class="pillars" :aria-label="$t('nav.ueber-uns')">
      <div class="shell pillars-inner">
        <article><AppIcon name="box" class="pillar-icon" :size="26" /><div><h2>{{ data?.projectCount }}</h2><p>{{ $t('pillars.data.text') }}</p></div></article>
        <article><AppIcon name="code" class="pillar-icon" :size="26" /><div><h2>{{ $t('pillars.source.title') }}</h2><p>{{ $t('pillars.source.text') }}</p></div></article>
        <article><AppIcon name="users" class="pillar-icon" :size="26" /><div><h2>{{ $t('pillars.civic.title') }}</h2><p>{{ $t('pillars.civic.text') }}</p></div></article>
        <article><AppIcon name="heart" class="pillar-icon" :size="26" /><div><h2>{{ $t('meeting.every', { day: $t(`weekdays.${site.meeting.weekday}`) }) }}</h2><p>{{ site.meeting.start }}–{{ site.meeting.end }}</p></div></article>
      </div>
    </section>
    <section class="section shell">
      <div class="section-heading">
        <h2>{{ $t('home.projects') }}</h2>
        <NuxtLink :to="localePath('/projekte')" class="text-link">{{ $t('home.allProjects') }} <AppIcon name="arrow" :size="16" /></NuxtLink>
      </div>
      <div class="project-grid">
        <ProjectCard v-for="project in data?.projects" :key="project.id" :project="project" heading="h3" />
      </div>
    </section>
    <div class="shell"><MeetingSection /></div>
    <div class="shell home-updates">
      <section>
        <div class="section-heading">
          <h2>{{ $t('home.blog') }}</h2>
          <NuxtLink :to="localePath('/blog')" class="text-link">{{ $t('home.allPosts') }} <AppIcon name="arrow" :size="16" /></NuxtLink>
        </div>
        <ul class="news-list">
          <li v-for="post in data?.posts" :key="post.id">
            <AppIcon name="calendar" class="mt-1" />
            <div><NuxtLink :to="localePath(`/blog/${post.slug}`)">{{ post.title }}</NuxtLink>
              <time :datetime="post.date">{{ new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: site.meeting.timezone }).format(new Date(post.date)) }}</time>
            </div>
          </li>
        </ul>
      </section>
      <section class="join-card">
        <h2>{{ $t('home.joinTitle') }}</h2>
        <p>{{ $t('home.joinText') }}</p>
        <NuxtLink :to="localePath('/mitmachen')" class="button">{{ $t('common.learn') }} <AppIcon name="arrow" :size="16" /></NuxtLink>
      </section>
    </div>
  </div>
</template>
