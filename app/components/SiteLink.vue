<script setup lang="ts">
import { isExternalUrl, linkAttributes } from '#shared/utils/links'
// Consume target so callers cannot override the site-wide same/new-tab rule.
const props = defineProps<{ href?: string; rel?: string; target?: string }>()
</script>
<template>
  <a
    :href="href"
    v-bind="linkAttributes(href, rel)"
    :aria-description="isExternalUrl(props.href) ? $t('a11y.newTab') : undefined"
  ><slot /></a>
</template>
