<script setup lang="ts">
const menuOpen = ref(false)
const localePath = useLocalePath()
const homePath = computed(() => localePath('/'))
const navItems = computed(() => [
  { key: 'projects', to: `${homePath.value}#projects` },
  { key: 'technologies', to: `${homePath.value}#technologies` },
  { key: 'contributors', to: localePath('contributors') },
  { key: 'tasks', to: `${homePath.value}#tasks` },
  { key: 'join', to: `${homePath.value}#join` },
  { key: 'about', to: `${homePath.value}#about` },
])

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <a class="skip-link" href="#main-content">{{ $t('a11y.skip') }}</a>
  <header class="site-header">
    <div class="header-inner">
      <NuxtLink :to="homePath" class="brand" @click="closeMenu">
        <img src="/logos/codefor-flensburg.svg" alt="" width="52" height="60">
        <span>OK Lab Flensburg</span>
      </NuxtLink>
      <nav class="desktop-nav" :aria-label="$t('a11y.mainNav')">
        <NuxtLink v-for="item in navItems" :key="item.key" :to="item.to">{{ $t(`nav.${item.key}`) }}</NuxtLink>
      </nav>
      <LanguageSwitcher class="desktop-languages" />
      <NuxtLink :to="`${homePath}#join`" class="button button-mint header-cta">{{ $t('nav.join') }}</NuxtLink>
      <button
        class="menu-button"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="mobile-navigation"
        :aria-label="$t(menuOpen ? 'a11y.closeMenu' : 'a11y.openMenu')"
        @click="menuOpen = !menuOpen"
      >
        <Icon :name="menuOpen ? 'lucide:x' : 'lucide:menu'" size="24" />
      </button>
    </div>
    <div v-show="menuOpen" id="mobile-navigation" class="mobile-panel">
      <nav :aria-label="$t('a11y.mainNav')">
        <NuxtLink v-for="item in navItems" :key="item.key" :to="item.to" @click="closeMenu">{{ $t(`nav.${item.key}`) }}</NuxtLink>
      </nav>
      <LanguageSwitcher @click="closeMenu" />
    </div>
  </header>
</template>
