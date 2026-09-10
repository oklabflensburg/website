<script setup lang="ts">
import { site } from '#shared/config/site'
const localePath = useLocalePath()
</script>
<template>
  <section class="meeting-panel">
    <div class="meeting-symbol" aria-hidden="true">↗</div>
    <div>
      <p class="eyebrow">{{ $t('meeting.eyebrow') }}</p>
      <h2>{{ $t('meeting.title') }}</h2>
      <p class="meeting-time">
        {{ $t(`weekdays.${site.meeting.weekday}`) }} ·
        {{ site.meeting.start }}–{{ site.meeting.end }}
      </p>
      <p>
        {{ site.meeting.location }} · {{ $t('meeting.rear') }}<br />{{
          site.meeting.street
        }}, {{ site.meeting.postalCode }} {{ site.meeting.city }}
      </p>
      <p class="muted">{{ $t('meeting.note') }}</p>
    </div>
    <div class="meeting-actions">
      <NuxtLink :to="localePath('/mitmachen')" class="button"
        >{{ $t('meeting.cta') }} <span aria-hidden="true">→</span></NuxtLink
      ><a :href="site.meeting.map" class="text-link"
        >{{ $t('meeting.map') }} ↗</a
      >
    </div>
  </section>
</template>
