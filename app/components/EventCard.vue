<script setup lang="ts">
import type { EventsCollectionItem } from '@nuxt/content'
defineProps<{ event: EventsCollectionItem }>()
const { locale } = useI18n()
const format = (value: string) =>
  new Intl.DateTimeFormat(locale.value, {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin',
  }).format(new Date(value))
</script>
<template>
  <article class="card event-card">
    <p>
      <time :datetime="event.start">{{ format(event.start) }}</time> –
      <time :datetime="event.end">{{ format(event.end) }}</time>
    </p>
    <h2>{{ event.title }}</h2>
    <p>{{ event.description }}</p>
    <p>{{ event.location }} · {{ event.address }}</p>
    <p>{{ $t(`events.${event.status}`) }}</p>
    <SiteLink :href="event.url" class="text-link">{{ $t('events.details') }} ↗</SiteLink
    ><SiteLink
      v-if="event.registrationUrl && event.status === 'scheduled'"
      :href="event.registrationUrl"
      class="button"
      >{{ $t('events.register') }} ↗</SiteLink
    >
  </article>
</template>
