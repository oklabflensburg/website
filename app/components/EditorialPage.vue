<script setup lang="ts">
import { site } from '#shared/config/site'
const route = useRoute()
const { locale } = useI18n()
const slug = computed(() => String(route.meta.editorialKey))
const { data: page } = await useAsyncData(
  () => `page-${locale.value}-${slug.value}`,
  () =>
    queryCollection('pages')
      .where('locale', '=', locale.value)
      .where('translationKey', '=', slug.value)
      .first(),
)
if (!page.value)
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
usePageSeo(
  () => page.value?.title ?? '',
  () => page.value?.description ?? '',
  { noindex: () => page.value?.noindex ?? false },
)
</script>
<template>
  <div v-if="page" class="shell page">
    <Breadcrumbs :title="$t(`nav.${slug}`)" /><PageHeading
      :title="page.title"
      :description="page.description"
      :eyebrow="$t(`nav.${slug}`)"
    />
    <div class="editorial-grid">
      <ContentRenderer class="prose" :value="page" />
      <aside
        v-if="slug === 'ueber-uns' || slug === 'daten-sind-daten'"
        class="card editorial-aside"
      >
        <AppIcon name="users" class="mb-4" :size="28" />
        <h2>
          {{ slug === 'ueber-uns' ? site.network.name : site.association.name }}
        </h2>
        <p>{{ $t(slug === 'ueber-uns' ? 'home.networkText' : 'home.associationText') }}</p>
        <a v-if="slug === 'ueber-uns'" :href="site.network.url" class="text-link"
          >{{ site.network.name }} ↗</a
        >
      </aside>
    </div>
    <TeamList v-if="slug === 'team'" /><EventsList
      v-if="slug === 'veranstaltungen'"
    />
    <div
      v-if="
        [
          'kontakt',
          'impressum',
          'datenschutz',
          'code-of-conduct',
          'daten-sind-daten',
        ].includes(slug)
      "
      class="contact-panel"
    >
      <h2>{{ $t('common.contact') }}</h2>
      <a :href="`mailto:${site.email}`" class="text-link">{{ site.email }} ↗</a
      ><a v-if="slug === 'kontakt'" :href="site.github" class="text-link"
        >GitHub ↗</a
      >
    </div>
    <MeetingSection
      v-if="['mitmachen', 'kontakt', 'veranstaltungen'].includes(slug)"
    />
  </div>
</template>
