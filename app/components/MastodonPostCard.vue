<script setup lang="ts">
import { site } from '#shared/config/site'
import type { MastodonPost } from '#shared/types/mastodon'
defineProps<{ post: MastodonPost }>()
const { locale } = useI18n()
const formatDate = (date: string) => new Intl.DateTimeFormat(locale.value, { dateStyle: 'medium', timeStyle: 'short', timeZone: site.meeting.timezone }).format(new Date(date))
</script>
<template>
  <article class="card card-body mastodon-post">
    <h3 class="mb-3">
      <SiteLink :href="post.url" class="text-link">{{ $t('mastodon.post') }} <time class="text-sm font-normal" :datetime="post.createdAt">{{ formatDate(post.createdAt) }}</time></SiteLink>
    </h3>
    <details v-if="post.spoilerText || post.sensitive">
      <summary><span>{{ $t('mastodon.warning') }}</span><span v-if="post.spoilerText" :lang="post.language">: {{ post.spoilerText }}</span></summary>
      <p :lang="post.language" class="mastodon-text mt-3">{{ post.contentText }}</p>
    </details>
    <p v-else :lang="post.language" class="mastodon-text">{{ post.contentText }}</p>
  </article>
</template>
