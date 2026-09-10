<script setup lang="ts">
import { site } from '#shared/config/site'
const route = useRoute()
const { locale, t } = useI18n()
const { data: post } = await useAsyncData(
  () => `post-${locale.value}-${route.params.slug}`,
  () =>
    queryCollection('blog')
      .where('locale', '=', locale.value)
      .where('slug', '=', String(route.params.slug))
      .where('draft', '=', false)
      .where('date', '<=', new Date().toISOString().slice(0, 10))
      .first(),
)
if (!post.value)
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
usePageSeo(
  () => post.value?.title ?? '',
  () => post.value?.description ?? '',
  { article: true, image: () => post.value?.image },
)
useHead(() => ({
  script: [
    {
      key: 'article',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.value?.title,
        description: post.value?.description,
        datePublished: post.value?.date,
        dateModified: post.value?.updated || post.value?.date,
        author: post.value?.authors.map((name) =>
          name === site.name
            ? { '@type': 'Organization', name, url: site.url }
            : { '@type': 'Person', name },
        ),
        publisher: { '@id': `${site.url}/#organization` },
        mainEntityOfPage: `${site.url}${route.path}`,
        inLanguage: locale.value,
        image: new URL(post.value?.image || '/social-card.png', site.url).href,
      }).replace(/</g, '\u003c'),
    },
  ],
}))
</script>
<template>
  <div v-if="post" class="shell page">
    <Breadcrumbs
      :title="post.title"
      :parent="{ title: t('nav.blog'), path: '/blog' }"
    />
    <article class="article-width">
      <PageHeading
        :title="post.title"
        :description="post.description"
        :eyebrow="$t('nav.blog')"
      />
      <div class="article-meta">
        <time :datetime="post.date">{{
          new Intl.DateTimeFormat(locale, {
            dateStyle: 'long',
            timeZone: 'Europe/Berlin',
          }).format(new Date(post.date))
        }}</time
        ><span>{{ $t('blog.by') }} {{ post.authors.join(', ') }}</span
        ><span v-if="post.updated"
          >{{ $t('common.updated') }}: {{ post.updated }}</span
        >
      </div>
      <div class="tags">
        <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
      </div>
      <NuxtImg
        v-if="post.image"
        :src="post.image"
        :alt="post.title"
        width="960"
        height="540"
        sizes="sm:100vw lg:800px"
        class="detail-image"
      /><ContentRenderer class="prose" :value="post" />
    </article>
  </div>
</template>
