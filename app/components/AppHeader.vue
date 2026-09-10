<script setup lang="ts">
import { site } from '#shared/config/site'
const localePath = useLocalePath()
const route = useRoute()
const open = ref(false)
const ready = useInteractiveReady()
const toggle = useTemplateRef('toggle')
const items = ['projekte', 'ueber-uns', 'veranstaltungen', 'blog']
watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)
function escapeMenu() {
  if (open.value) {
    open.value = false
    toggle.value?.focus()
  }
}
</script>
<template>
  <a class="skip-link" href="#main-content">{{ $t('a11y.skip') }}</a>
  <header class="header" @keydown.esc="escapeMenu">
    <div class="shell header-inner">
      <NuxtLink :to="localePath('/')" class="brand"
        ><img
          src="/logos/codefor-flensburg.svg"
          alt=""
          width="34"
          height="40"
        /><span
          >{{ site.name }}<small>{{ $t('brand.subline') }}</small></span
        ></NuxtLink
      >
      <nav class="desktop-nav" :aria-label="$t('a11y.mainNav')">
        <NuxtLink
          v-for="item in items"
          :key="item"
          :to="localePath(`/${item}`)"
          >{{ $t(`nav.${item}`) }}</NuxtLink
        >
      </nav>
      <div class="desktop-languages"><LanguageSwitcher /></div>
      <NuxtLink :to="localePath('/mitmachen')" class="button header-join"
        >{{ $t('nav.mitmachen') }} <span aria-hidden="true">↗</span></NuxtLink
      >
      <button
        ref="toggle"
        :disabled="!ready"
        class="menu-toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="mobile-navigation"
        @click="open = !open"
      >
        {{ $t(open ? 'a11y.closeMenu' : 'a11y.openMenu') }}
        <span aria-hidden="true">{{ open ? '×' : '☰' }}</span>
      </button>
    </div>
    <div v-show="open" id="mobile-navigation" class="mobile-panel shell">
      <nav :aria-label="$t('a11y.mainNav')">
        <NuxtLink
          v-for="item in [
            ...items,
            'mitmachen',
            'team',
            'daten-sind-daten',
            'kontakt',
          ]"
          :key="item"
          :to="localePath(`/${item}`)"
          >{{ $t(`nav.${item}`) }}</NuxtLink
        >
      </nav>
      <LanguageSwitcher />
    </div>
  </header>
</template>
