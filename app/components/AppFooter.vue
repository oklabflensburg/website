<script setup lang="ts">
import { site } from '#shared/config/site'
const localePath = useLocalePath()
const groups = [
  ['projekte', 'mitmachen', 'veranstaltungen', 'blog'],
  ['ueber-uns', 'team', 'daten-sind-daten', 'kontakt'],
  ['impressum', 'datenschutz', 'code-of-conduct'],
]
</script>
<template>
  <footer class="footer">
    <div class="shell footer-grid">
      <div>
        <NuxtLink :to="localePath('/')" class="brand">{{ site.name }}</NuxtLink>
        <p>{{ $t('footer.description') }}</p>
        <a :href="site.network.url"
          ><img
            src="/logos/code-for-germany.svg"
            :alt="site.network.name"
            width="130"
            height="66"
            loading="lazy"
        /></a>
      </div>
      <nav
        v-for="(group, i) in groups"
        :key="i"
        :aria-label="$t(`footer.group${i}`)"
      >
        <h2>{{ $t(`footer.group${i}`) }}</h2>
        <NuxtLink
          v-for="item in group"
          :key="item"
          :to="localePath(`/${item}`)"
          >{{ $t(`nav.${item}`) }}</NuxtLink
        >
      </nav>
    </div>
    <div class="shell footer-bottom">
      <span>{{ $t('footer.tagline') }}</span>
      <div>
        <a :href="site.github">GitHub ↗</a
        ><a :href="site.social.mastodon" rel="me">Mastodon ↗</a
        ><a :href="`/rss.xml?lang=${$i18n.locale}`">RSS ↗</a>
      </div>
    </div>
  </footer>
</template>
