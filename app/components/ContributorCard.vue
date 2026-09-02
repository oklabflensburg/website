<script setup lang="ts">
import type { Contributor } from '~/types/content'
defineProps<{ contributor: Contributor }>()
</script>

<template>
  <article class="contributor-card">
    <img :src="contributor.avatarUrl" alt="" loading="lazy" width="88" height="88" referrerpolicy="no-referrer">
    <div>
      <h3>{{ contributor.name || contributor.login }}</h3>
      <a :href="contributor.profileUrl" :aria-label="$t('contributors.profile', { name: contributor.name || contributor.login })">@{{ contributor.login }} <Icon name="lucide:arrow-up-right" /></a>
    </div>
    <p v-if="contributor.organizationMember" class="member-label"><Icon name="lucide:badge-check" />{{ $t('contributors.memberLabel') }}</p>
    <div v-if="contributor.areas?.length" class="tag-list contributor-tags">
      <span v-for="area in contributor.areas" :key="area">{{ area }}</span>
    </div>
    <p v-if="contributor.repositories.length" class="contributor-projects"><strong>{{ $t('contributors.projectsLabel') }}:</strong> {{ contributor.repositories.slice(0, 3).join(' · ') }}</p>
  </article>
</template>
