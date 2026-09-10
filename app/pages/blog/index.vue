<script setup lang="ts">
import { paginate } from '#shared/utils/pagination'
const { locale, t } = useI18n()
const route = useRoute()
const router = useRouter()
const ready = useInteractiveReady()
const { data: posts } = await useAsyncData(
  () => `blog-${locale.value}`,
  () =>
    queryCollection('blog')
      .where('locale', '=', locale.value)
      .where('draft', '=', false)
      .where('date', '<=', new Date().toISOString().slice(0, 10))
      .order('date', 'DESC')
      .order('slug', 'ASC')
      .all(),
)
const tags = computed(() =>
  [...new Set(posts.value?.flatMap((post) => post.tags))].sort(),
)
const tag = computed({
  get: () => (typeof route.query.tag === 'string' ? route.query.tag : ''),
  set: (value) => {
    router.replace({ query: { tag: value || undefined } })
  },
})
const filtered = computed(
  () =>
    posts.value?.filter(
      (post) => !tag.value || post.tags.includes(tag.value),
    ) ?? [],
)
const pagination = computed(() => paginate(filtered.value, route.query.page, 6))
usePageSeo(
  () => t('blog.title'),
  () => t('blog.description'),
)
</script>
<template>
  <div class="shell page">
    <Breadcrumbs :title="$t('nav.blog')" /><PageHeading
      :title="$t('blog.title')"
      :description="$t('blog.description')"
      :eyebrow="$t('nav.blog')"
    />
    <div class="filter-bar">
      <label for="blog-tag">{{ $t('common.tag') }}</label
      ><select id="blog-tag" v-model="tag" :disabled="!ready">
        <option value="">{{ $t('common.all') }}</option>
        <option v-for="item in tags" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
      <p role="status">
        {{ $t('common.results', { count: filtered.length }) }}
      </p>
    </div>
    <div class="blog-grid">
      <BlogCard v-for="post in pagination.items" :key="post.id" :post="post" />
    </div>
    <p v-if="!filtered.length" class="empty">{{ $t('common.empty') }}</p>
    <nav
      v-if="pagination.totalPages > 1"
      class="pagination"
      :aria-label="$t('blog.pagination')"
    >
      <NuxtLink
        v-if="pagination.page > 1"
        :to="{ query: { ...route.query, page: pagination.page - 1 } }"
        class="button button-secondary"
        >{{ $t('common.back') }}</NuxtLink
      ><span>{{
        $t('common.page', {
          page: pagination.page,
          total: pagination.totalPages,
        })
      }}</span
      ><NuxtLink
        v-if="pagination.page < pagination.totalPages"
        :to="{ query: { ...route.query, page: pagination.page + 1 } }"
        class="button button-secondary"
        >{{ $t('common.next') }}</NuxtLink
      >
    </nav>
  </div>
</template>
