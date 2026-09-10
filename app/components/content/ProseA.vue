<script setup lang="ts">
defineProps<{ href?: string }>()
const localePath = useLocalePath()
</script>
<template>
  <NuxtLink
    v-if="href?.startsWith('/') && !href.startsWith('//')"
    :to="localePath(href)"
    ><slot /></NuxtLink
  ><a v-else :href="href"><slot /></a>
</template>
