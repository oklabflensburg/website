<script setup lang="ts">
import { hasHostingProvider, optionalLegalFields } from '#shared/utils/legal'

const props = withDefaults(defineProps<{ kind?: 'provider' | 'privacy' | 'hosting' }>(), { kind: 'provider' })
const { contact, links } = useLegalContact()
const address = computed(() => props.kind === 'hosting' ? {
  name: contact.hostingProviderName,
  street: contact.hostingProviderStreet,
  houseNumber: contact.hostingProviderHouseNumber,
  postalCode: contact.hostingProviderPostalCode,
  city: contact.hostingProviderCity,
  country: contact.hostingProviderCountry,
} : contact)
const details = computed(() => optionalLegalFields.filter((field) =>
  field !== 'phone' && contact[field] && (props.kind === 'privacy'
    ? field === 'privacyContactPerson'
    : field !== 'privacyContactPerson'),
))
</script>

<template>
  <div v-if="kind !== 'hosting' || hasHostingProvider(contact)" class="legal-details mb-6" :data-legal-kind="kind">
    <slot />
    <address class="not-italic">
      <strong :data-legal-name="kind !== 'hosting' ? '' : undefined">{{ address.name }}</strong><br />
      {{ [address.street, address.houseNumber].filter(Boolean).join(' ') }}<br />
      {{ [address.postalCode, address.city].filter(Boolean).join(' ') }}<br />
      {{ address.country }}
    </address>
    <div v-if="kind === 'hosting' && contact.hostingDpa" class="mt-6" data-hosting-dpa>
      <slot name="dpa" />
    </div>
    <dl v-if="kind !== 'hosting'" class="mt-6 grid gap-4">
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
