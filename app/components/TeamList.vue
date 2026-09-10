<script setup lang="ts">
const { locale } = useI18n()
const { data: members } = await useAsyncData('team', () =>
  queryCollection('team').order('name', 'ASC').all(),
)
</script>
<template>
  <div v-if="members?.length" class="project-grid section">
    <article v-for="member in members" :key="member.id" class="card card-body">
      <NuxtImg
        v-if="member.avatar"
        :src="member.avatar"
        :alt="member.name"
        width="160"
        height="160"
        loading="lazy"
      />
      <h2>{{ member.name }}</h2>
      <p class="eyebrow">{{ member.role[locale] }}</p>
      <p>{{ member.bio[locale] }}</p>
      <a v-if="member.github" :href="member.github" class="text-link"
        >GitHub ↗</a
      ><a
        v-for="link in member.links"
        :key="link.url"
        :href="link.url"
        class="text-link"
        >{{ link.label }} ↗</a
      >
    </article>
  </div>
</template>
