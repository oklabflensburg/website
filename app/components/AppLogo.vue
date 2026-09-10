<script setup lang="ts">
import { site } from '#shared/config/site'
withDefaults(defineProps<{
  size?: 'sm' | 'md'
  loading?: 'eager' | 'lazy'
}>(), { size: 'md', loading: 'eager' })
</script>
<template>
  <NuxtImg
    :src="site.logo"
    :alt="site.name"
    :width="size === 'sm' ? 36 : 44"
    :height="size === 'sm' ? 36 : 44"
    :loading="loading"
    format="png"
    class="app-logo shrink-0 object-contain"
    :class="size === 'sm' ? 'size-9' : 'size-10 md:size-11'"
  />
</template>
