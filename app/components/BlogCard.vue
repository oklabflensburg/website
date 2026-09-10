<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'
defineProps<{ post: BlogCollectionItem }>()
const localePath = useLocalePath()
const { locale } = useI18n()
</script>
<template>
  <article class="card blog-card">
    <div class="card-body">
      <div class="card-meta">
        <time :datetime="post.date">{{
          new Intl.DateTimeFormat(locale, {
            dateStyle: 'medium',
            timeZone: 'Europe/Berlin',
          }).format(new Date(post.date))
        }}</time
        ><span>{{ post.tags[0] }}</span>
      </div>
      <h2>
        <NuxtLink :to="localePath(`/blog/${post.slug}`)"
          >{{ post.title }} <span aria-hidden="true">↗</span></NuxtLink
        >
      </h2>
      <p>{{ post.description }}</p>
      <p class="byline">{{ post.authors.join(', ') }}</p>
    </div>
  </article>
</template>
