<script setup lang="ts">
import { site } from '#shared/config/site'
// The SSR request is local to Nitro. Lazy fetching lets client navigation
// continue independently; a failed optional feed never throws a page error.
const { data: posts } = await useFetch('/api/social/mastodon', { key: 'mastodon', lazy: true, default: () => [] })
</script>
<template>
  <section class="mastodon-feed" aria-labelledby="mastodon-heading">
    <div class="section-heading"><h2 id="mastodon-heading">{{ $t('mastodon.heading') }}</h2></div>
    <div v-if="posts.length" class="grid gap-4">
      <MastodonPostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <p v-else>{{ $t('mastodon.empty') }}</p>
    <SiteLink :href="site.social.mastodon" class="text-link mt-4">{{ $t('mastodon.more') }} <AppIcon name="arrow" :size="16" /></SiteLink>
  </section>
</template>
