<script setup lang="ts">
const { locale, t } = useI18n()
const route = useRoute()
const router = useRouter()
const ready = useInteractiveReady()
const { data: projects } = await useAsyncData(
  () => `projects-${locale.value}`,
  () =>
    queryCollection('projects')
      .where('locale', '=', locale.value)
      .order('title', 'ASC')
      .all(),
)
const categories = computed(() =>
  [...new Set(projects.value?.flatMap((project) => project.categories))].sort(),
)
const category = computed({
  get: () =>
    typeof route.query.category === 'string' ? route.query.category : '',
  set: (value) => {
    router.replace({ query: { ...route.query, category: value || undefined } })
  },
})
const filtered = computed(
  () =>
    projects.value?.filter(
      (project) =>
        !category.value || project.categories.includes(category.value),
    ) ?? [],
)
usePageSeo(
  () => t('projects.title'),
  () => t('projects.description'),
)
</script>
<template>
  <div class="shell page">
    <Breadcrumbs :title="$t('nav.projekte')" /><PageHeading
      :title="$t('projects.title')"
      :description="$t('projects.description')"
      :eyebrow="$t('nav.projekte')"
    />
    <div class="filter-bar">
      <label for="project-category">{{ $t('common.category') }}</label
      ><select id="project-category" v-model="category" :disabled="!ready">
        <option value="">{{ $t('common.all') }}</option>
        <option v-for="item in categories" :key="item" :value="item">
          {{ $t(`categories.${item}`) }}
        </option>
      </select>
      <p role="status">
        {{ $t('common.results', { count: filtered.length }) }}
      </p>
    </div>
    <div class="project-grid">
      <ProjectCard
        v-for="project in filtered"
        :key="project.id"
        :project="project"
      />
    </div>
    <p v-if="!filtered.length" class="empty">{{ $t('common.empty') }}</p>
  </div>
</template>
