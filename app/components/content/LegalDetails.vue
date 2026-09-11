<script setup lang="ts">
import { optionalLegalFields } from '#shared/utils/legal'

const props = withDefaults(defineProps<{ kind?: 'provider' | 'privacy' }>(), { kind: 'provider' })
const { contact, links } = useLegalContact()
const details = computed(() => optionalLegalFields.filter((field) =>
  field !== 'phone' && contact[field] && (props.kind === 'privacy'
    ? field === 'privacyContactPerson'
    : field !== 'privacyContactPerson'),
))
</script>

<template>
  <div class="legal-details mb-6" :data-legal-kind="kind">
    <address class="not-italic">
      <strong data-legal-name>{{ contact.name }}</strong><br />
      {{ [contact.street, contact.houseNumber].filter(Boolean).join(' ') }}<br />
      {{ [contact.postalCode, contact.city].filter(Boolean).join(' ') }}<br />
      {{ contact.country }}
    </address>
    <dl class="mt-6 grid gap-4">
      <div v-if="contact.email" data-legal-field="email">
        <dt class="font-bold text-text">{{ $t('legal.email') }}</dt>
        <dd><a v-if="links.email" :href="links.email">{{ contact.email }}</a><span v-else>{{ contact.email }}</span></dd>
      </div>
      <div v-if="contact.phone" data-legal-field="phone">
        <dt class="font-bold text-text">{{ $t('legal.phone') }}</dt>
        <dd><a v-if="links.phone" :href="links.phone">{{ contact.phone }}</a><span v-else>{{ contact.phone }}</span></dd>
      </div>
      <div v-for="field in details" :key="field" :data-legal-field="field">
        <dt class="font-bold text-text">{{ $t(`legal.${field}`) }}</dt>
        <dd>{{ contact[field] }}</dd>
      </div>
    </dl>
  </div>
</template>
