<script setup lang="ts">
import { site } from '#shared/config/site'
import { nextMeeting } from '#shared/utils/meeting'
const { locale, t } = useI18n()
const localePath = useLocalePath()
const now = useState('calendar-now', () => new Date().toISOString())
const meeting = computed(() => nextMeeting(new Date(now.value)))
const { data: events } = await useAsyncData(
  () => `events-${locale.value}`,
  () =>
    queryCollection('events')
      .where('locale', '=', locale.value)
      .order('start', 'ASC')
      .all(),
)
const upcoming = computed(
  () =>
    events.value
      ?.filter((event) => Date.parse(event.end) >= Date.parse(now.value))
      .sort((a, b) => Date.parse(a.start) - Date.parse(b.start)) ?? [],
)
const past = computed(
  () =>
    events.value
      ?.filter((event) => Date.parse(event.end) < Date.parse(now.value))
      .sort((a, b) => Date.parse(b.start) - Date.parse(a.start)) ?? [],
)
useHead(() => ({
  script: [
    {
      key: 'events',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Event',
            name: t('events.regular'),
            description: t('meeting.note'),
            startDate: meeting.value.start,
            endDate: meeting.value.end,
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode:
              'https://schema.org/OfflineEventAttendanceMode',
            location: {
              '@type': 'Place',
              name: site.meeting.location,
              address: {
                '@type': 'PostalAddress',
                streetAddress: site.meeting.street,
                postalCode: site.meeting.postalCode,
                addressLocality: site.meeting.city,
                addressCountry: site.meeting.country,
              },
            },
            organizer: { '@id': `${site.url}/#organization` },
            url: `${site.url}${localePath('/veranstaltungen')}`,
          },
          ...upcoming.value.map((event) => ({
            '@type': 'Event',
            name: event.title,
            description: event.description,
            startDate: event.start,
            endDate: event.end,
            url: event.url,
            eventStatus: `https://schema.org/${{ scheduled: 'EventScheduled', cancelled: 'EventCancelled', postponed: 'EventPostponed' }[event.status]}`,
            location: {
              '@type': 'Place',
              name: event.location,
              address: event.address,
            },
            organizer: { '@id': `${site.url}/#organization` },
          })),
        ],
      }).replace(/</g, '\\u003c'),
    },
  ],
}))
</script>
<template>
  <section class="section">
    <h2>{{ $t('events.title') }}</h2>
    <p v-if="!upcoming.length" class="muted">{{ $t('events.empty') }}</p>
    <EventCard
      v-for="event in upcoming"
      :key="event.id"
      :event="event"
    /><template v-if="past.length"
      ><h2>{{ $t('events.past') }}</h2>
      <EventCard v-for="event in past" :key="event.id" :event="event"
    /></template>
  </section>
</template>
