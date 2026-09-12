<script setup lang="ts">
const localePath = useLocalePath()
const route = useRoute()
const open = ref(false)
const ready = useInteractiveReady()
const toggle = useTemplateRef('toggle')
const items = ['projekte', 'mitmachen', 'ueber-uns', 'blog', 'kontakt']
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
  <SiteLink class="skip-link" href="#main-content">{{ $t('a11y.skip') }}</SiteLink>
  <header class="header" @keydown.esc="escapeMenu">
    <div class="shell header-inner">
      <NuxtLink :to="localePath('/')" class="brand"><AppLogo /></NuxtLink>
      <nav class="desktop-nav" :aria-label="$t('a11y.mainNav')">
        <NuxtLink
          v-for="item in items"
          :key="item"
          :to="localePath(`/${item}`)"
          >{{ $t(`nav.${item}`) }}</NuxtLink
        >
      </nav>
      <div class="desktop-languages"><LanguageSwitcher /></div>
      <NuxtLink :to="`${localePath('/projekte')}#project-search`" class="icon-button hidden min-[1101px]:inline-flex" :aria-label="$t('common.search')"><AppIcon name="search" /></NuxtLink>
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
        <AppIcon :name="open ? 'close' : 'menu'" />
      </button>
    </div>
    <div v-show="open" id="mobile-navigation" class="mobile-panel shell">
      <nav :aria-label="$t('a11y.mainNav')">
        <NuxtLink
          v-for="item in [
            ...items,
            'veranstaltungen',
            'team',
            'daten-sind-daten',

          ]"
          :key="item"
          :to="localePath(`/${item}`)"
          >{{ $t(`nav.${item}`) }}</NuxtLink
        >
      </nav>
      <div class="flex items-center justify-between"><LanguageSwitcher /><NuxtLink :to="`${localePath('/projekte')}#project-search`" class="icon-button" :aria-label="$t('common.search')"><AppIcon name="search" /></NuxtLink></div>
    </div>
  </header>
</template>
