<script setup lang="ts">
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
  { image: () => project.value?.image },
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
        <NuxtImg
          v-if="project.image"
          class="detail-image"
          :src="project.image"
          :alt="project.title"
          width="960"
          height="540"
          sizes="sm:100vw lg:65vw"
        /><ContentRenderer class="prose" :value="project" />
      </article>
      <aside class="card detail-aside">
        <h2>{{ $t('common.status') }}</h2>
        <p class="status-dot">{{ $t(`status.${project.status}`) }}</p>
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
