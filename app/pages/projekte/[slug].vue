<script setup lang="ts">
import { site } from '#shared/config/site'
const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const { data: project } = await useAsyncData(
  () => `project-${locale.value}-${route.params.slug}`,
  () =>
    queryCollection('projects')
      .where('locale', '=', locale.value)
      .where('slug', '=', String(route.params.slug))
      .first(),
)
if (!project.value)
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
usePageSeo(
  () => project.value?.title ?? '',
  () => project.value?.description ?? '',
  { image: () => project.value ? `${site.projectSocialImages}/${project.value.translationKey}.png` : undefined },
)
</script>
<template>
  <div v-if="project" class="shell page">
    <Breadcrumbs
      :title="project.title"
      :parent="{ title: t('nav.projekte'), path: '/projekte' }"
    /><PageHeading
      :title="project.title"
      :description="project.description"
      :eyebrow="$t(`categories.${project.categories[0]}`)"
    />
    <div class="detail-grid">
      <article>
        <div class="detail-visual"><img
          class="detail-image"
          :src="project.image"
          :alt="project.imageAlt"
          width="1024"
          height="1024"
        /></div><ContentRenderer class="prose" :value="project" />
      </article>
      <aside class="card detail-aside">
        <NuxtLink :to="localePath('/ueber-uns')" class="mb-2 flex items-center justify-between gap-4 border-b border-border pb-4 text-sm text-text-muted no-underline hover:text-brand">
          <span>{{ $t('brand.projectBy') }}</span>
          <AppLogo size="sm" />
        </NuxtLink>
        <h2>{{ $t('common.status') }}</h2>
        <p>{{ $t(`status.${project.status}`) }}</p>
        <h2 v-if="project.technologies.length">
          {{ $t('common.technologies') }}
        </h2>
        <div class="tags">
          <span v-for="tech in project.technologies" :key="tech">{{
            tech
          }}</span>
        </div>
        <a
          v-if="project.links.website"
          :href="project.links.website"
          class="button"
          >{{ $t('common.website') }} ↗</a
        ><a
          v-if="project.links.github"
          :href="project.links.github"
          class="text-link"
          >{{ $t('common.github') }} ↗</a
        ><a :href="project.source" class="text-link"
          >{{ $t('common.source') }} ↗</a
        ><NuxtLink :to="localePath('/mitmachen')" class="text-link"
          >{{ $t('nav.mitmachen') }} →</NuxtLink
        >
      </aside>
    </div>
  </div>
</template>
