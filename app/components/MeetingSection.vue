<script setup lang="ts">
import { site } from '#shared/config/site'
const localePath = useLocalePath()
</script>
<template>
  <section class="meeting-panel">
    <div>
      <h2>{{ $t('meeting.title') }}</h2>
      <div class="meeting-details">
        <AppIcon name="calendar" :size="28" />
        <div>
          <p class="meeting-time">{{ $t('meeting.every', { day: $t(`weekdays.${site.meeting.weekday}`) }) }}, {{ site.meeting.start }}–{{ site.meeting.end }}</p>
          <p>{{ site.meeting.location }}, {{ $t('meeting.rear') }}<br />{{ site.meeting.street }}, {{ site.meeting.city }}</p>
          <NuxtLink :to="localePath('/veranstaltungen')" class="button button-secondary">{{ $t('meeting.calendar') }} <AppIcon name="arrow" :size="16" /></NuxtLink>
        </div>
      </div>
    </div>
    <figure class="m-0">
      <NuxtImg src="/images/codefor-workshop.jpeg" :alt="$t('meeting.imageAlt')" width="440" height="280" sizes="sm:100vw md:35vw" loading="lazy" class="aspect-[11/7] w-full rounded-sm object-cover" />
      <figcaption class="mt-1 text-[10px] text-text-muted">{{ $t('meeting.imageCaption') }}</figcaption>
    </figure>
    <div class="meeting-note">
      <p>{{ $t('meeting.welcome') }}</p>
      <p class="!text-xs !text-text-muted">{{ $t('meeting.note') }}</p>
      <a :href="site.meeting.map" class="text-link">{{ $t('meeting.map') }} <AppIcon name="arrow" :size="16" /></a>
    </div>
  </section>
</template>
